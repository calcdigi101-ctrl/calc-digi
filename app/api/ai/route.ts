import Anthropic from "@anthropic-ai/sdk";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Server-side proxy for the AI assistant (public/js/main.js). The browser can't
 * call api.anthropic.com directly (CORS, and the key must never ship to the
 * client), so it posts here and we forward with ANTHROPIC_API_KEY.
 */

const MODEL = "claude-opus-5-5";
const MAX_MESSAGE_CHARS = 1000;
const MAX_TURNS = 12;
const RATE_LIMIT = 10; // requests…
const RATE_WINDOW_MS = 60_000; // …per minute, per IP

const SYSTEM =
  "You are CalcDigi AI, a helpful assistant for a free calculator website. You help users understand calculations, " +
  "financial concepts, health metrics and math, and explain how to use calculators. Keep answers concise (under 150 words), " +
  "clear and friendly, in plain text without markdown. If relevant, suggest which CalcDigi calculator they should use. " +
  "For medical, legal, tax or investment decisions, remind users to consult a qualified professional.";

// Best-effort, per-instance limiter. Serverless instances don't share memory,
// so this caps bursts from one client rather than enforcing a global quota.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(k);
  }
  return recent.length > RATE_LIMIT;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

function parseMessages(body: unknown): ChatMessage[] | string {
  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw) || raw.length === 0) return "messages must be a non-empty array";
  if (raw.length > MAX_TURNS) return `At most ${MAX_TURNS} messages are allowed`;
  const out: ChatMessage[] = [];
  for (const m of raw) {
    const role = (m as { role?: unknown })?.role;
    const content = (m as { content?: unknown })?.content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return "Invalid message";
    const text = content.trim();
    if (!text) return "Message is empty";
    if (text.length > MAX_MESSAGE_CHARS) return `Messages are limited to ${MAX_MESSAGE_CHARS} characters`;
    out.push({ role, content: text });
  }
  if (out[0].role !== "user" || out[out.length - 1].role !== "user") return "Conversation must start and end with a user message";
  return out;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please wait a minute and try again." }, { status: 429, headers: { "Retry-After": "60" } });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const messages = parseMessages(body);
  if (typeof messages === "string") return NextResponse.json({ error: messages }, { status: 400 });

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "The AI assistant is not configured." }, { status: 503 });
  }

  const client = new Anthropic();
  try {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 2000,
      system: SYSTEM,
      messages,
      output_config: { effort: "low" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
    });
    if (response.stop_reason === "refusal") {
      return NextResponse.json({ reply: "Sorry, I can't help with that one. Try asking about a calculation or one of our calculators." });
    }
    const reply = response.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("\n")
      .trim();
    return NextResponse.json({ reply: reply || "Sorry, I could not get a response." });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: "The assistant is busy right now. Please try again shortly." }, { status: 503 });
    }
    if (err instanceof Anthropic.APIError) {
      console.error("Anthropic API error", err.status, err.message);
      return NextResponse.json({ error: "The assistant is unavailable right now." }, { status: 502 });
    }
    console.error("AI route failed", err);
    return NextResponse.json({ error: "The assistant is unavailable right now." }, { status: 500 });
  }
}
