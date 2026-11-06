import { NextResponse, type NextRequest } from "next/server";

/**
 * Universal Multi-Provider AI Assistant for CalcDigi.
 *
 * Supports:
 * 1. Groq (Meta Llama 3.3 70B / Llama 3.1 8B) - 100% Free Open Models via GROQ_API_KEY
 * 2. OpenRouter (Free Open Source Models pool) via OPENROUTER_API_KEY
 * 3. Google Gemini (Gemini 1.5/2.0 Flash) via GEMINI_API_KEY
 * 4. Anthropic Claude via ANTHROPIC_API_KEY
 * 5. Built-in Calculation Reasoning Engine (Zero API Key required - 100% Uptime Guaranteed)
 */

const SYSTEM =
  "You are CalcDigi AI, an expert assistant for a free calculator website. You help users understand calculations, " +
  "financial concepts, health metrics, and math, and explain how to use calculators. Keep answers concise (under 150 words), " +
  "clear, and friendly, in plain text without markdown. If relevant, suggest which CalcDigi calculator they should use. " +
  "For medical, legal, tax, or investment decisions, remind users to consult a qualified professional.";

const MAX_MESSAGE_CHARS = 1000;
const MAX_TURNS = 12;
const RATE_LIMIT = 20; // requests per window per IP
const RATE_WINDOW_MS = 60_000;

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
  if (out[0].role !== "user" || out[out.length - 1].role !== "user") {
    return "Conversation must start and end with a user message";
  }
  return out;
}

/** Built-in Expert Engine for instant answers without external API keys */
function getBuiltInAnswer(userQuery: string): string {
  const q = userQuery.toLowerCase();

  // Calorie, Macros, Diet, TDEE
  if (q.includes("calorie") || q.includes("macro") || q.includes("protein") || q.includes("diet") || q.includes("tdee")) {
    return (
      "For practical Calorie & Macro optimization:\n\n" +
      "1. Protein Target: Aim for 1.6 to 2.2 grams per kilogram (0.8–1.0g/lb) of body weight to preserve lean muscle tissue.\n" +
      "2. Healthy Fats: Allocate 20% to 30% of total calories to essential dietary fats for hormonal balance.\n" +
      "3. Carbohydrates: Use remaining calories for complex carbs to fuel daily performance and workouts.\n" +
      "4. Deficit vs Surplus: A 300–500 kcal deficit supports steady fat loss (~1 lb/week), while a 200–300 kcal surplus supports lean muscle growth.\n\n" +
      "Use our Calorie Calculator and Macro Calculator on CalcDigi for your exact personalized numbers!"
    );
  }

  // BMI & Healthy Weight
  if (q.includes("bmi") || q.includes("body mass") || q.includes("weight") || q.includes("obese") || q.includes("underweight")) {
    return (
      "Body Mass Index (BMI) evaluates weight relative to height:\n\n" +
      "• Underweight: < 18.5\n" +
      "• Healthy / Normal: 18.5 – 24.9\n" +
      "• Overweight: 25.0 – 29.9\n" +
      "• Obesity: 30.0 or higher\n\n" +
      "Formula: BMI = Weight (kg) / [Height (m)]².\n" +
      "Tip: For muscular athletes, BMI can be deceptively high because muscle is denser than fat. Check our BMI Calculator and Body Fat Calculator on CalcDigi for a complete analysis."
    );
  }

  // Loans, Mortgage, Amortization
  if (q.includes("loan") || q.includes("mortgage") || q.includes("interest") || q.includes("amortization") || q.includes("debt")) {
    return (
      "Loan & Mortgage Insights:\n\n" +
      "• Fixed Monthly Payment Formula: M = P × [r(1+r)ⁿ / ((1+r)ⁿ - 1)]\n" +
      "• Accelerated Payoff Hack: Paying just $100 to $200 extra per month toward your principal balance can eliminate 4 to 6 years off a standard 30-year mortgage and save tens of thousands in compound interest!\n\n" +
      "Compare 15 vs 30-year schedules on our Loan Calculator and Mortgage Calculator on CalcDigi."
    );
  }

  // Sales Tax & VAT
  if (q.includes("sales tax") || q.includes("tax") || q.includes("receipt") || q.includes("pre-tax") || q.includes("vat")) {
    return (
      "Sales Tax & Pre-Tax Formulas:\n\n" +
      "• Add Tax: Total = Pre-Tax Price × (1 + Tax Rate / 100)\n" +
      "• Reverse Tax: Pre-Tax Base = Receipt Total / (1 + Tax Rate / 100)\n" +
      "• Total Tax Paid = Receipt Total - Pre-Tax Base\n\n" +
      "For example, an $86.40 receipt with 8% sales tax has an $80.00 pre-tax base. Use our Sales Tax Calculator on CalcDigi to add or reverse taxes instantly."
    );
  }

  // Percentages, Discounts, Growth
  if (q.includes("percent") || q.includes("discount") || q.includes("increase") || q.includes("decrease") || q.includes("ratio")) {
    return (
      "Key Percentage Formulas:\n\n" +
      "• P% of a number: (P / 100) × Total\n" +
      "• Percentage Change: ((New Value - Original Value) / Original Value) × 100\n" +
      "• Reverse Discount: Original Price = Sale Price / (1 - Discount % / 100)\n\n" +
      "Check out our Percentage Calculator and Discount Calculator on CalcDigi for instant step-by-step visual calculations."
    );
  }

  // General Guidance
  return (
    "Hi! I'm your CalcDigi AI assistant. I can help explain formulas, financial concepts, health targets, and mathematical calculations.\n\n" +
    "You can ask me about:\n" +
    "• Health & Fitness (Calories, Macros, BMI, BMR, Ideal Weight)\n" +
    "• Finance & Loans (Mortgages, Loan Amortization, Compound Interest, Sales Tax, Inflation)\n" +
    "• Math & Science (Percentages, Fractions, Ratios, Speed & Unit Conversions)\n\n" +
    "Feel free to ask any specific calculation question!"
  );
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute and try again." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = parseMessages(body);
  if (typeof messages === "string") {
    return NextResponse.json({ error: messages }, { status: 400 });
  }

  const latestUserMessage = messages[messages.length - 1].content;

  // 1. Try Groq (Llama 3.3 70B / Llama 3.1 8B) - Open Model
  const groqKey = process.env.GROQ_API_KEY;
  if (groqKey) {
    try {
      const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
      const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groqKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "system", content: SYSTEM }, ...messages],
          max_tokens: 600,
          temperature: 0.6,
        }),
      });

      if (groqRes.ok) {
        const data = await groqRes.json();
        const reply = data.choices?.[0]?.message?.content?.trim();
        if (reply) return NextResponse.json({ reply });
      } else {
        console.warn("Groq API returned error status:", groqRes.status);
      }
    } catch (err) {
      console.warn("Groq API fetch error:", err);
    }
  }

  // 2. Try OpenRouter (Free Open Source Models)
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  if (openRouterKey) {
    try {
      const model = process.env.OPENROUTER_MODEL || "meta-llama/llama-3.3-70b-instruct:free";
      const orRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openRouterKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://www.calcdigi.com",
          "X-Title": "CalcDigi",
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "system", content: SYSTEM }, ...messages],
          max_tokens: 600,
          temperature: 0.6,
        }),
      });

      if (orRes.ok) {
        const data = await orRes.json();
        const reply = data.choices?.[0]?.message?.content?.trim();
        if (reply) return NextResponse.json({ reply });
      } else {
        console.warn("OpenRouter API returned error status:", orRes.status);
      }
    } catch (err) {
      console.warn("OpenRouter API fetch error:", err);
    }
  }

  // 3. Try Google Gemini (Free Gemini Flash)
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
      const geminiRes = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: messages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
          systemInstruction: { parts: [{ text: SYSTEM }] },
          generationConfig: { maxOutputTokens: 600, temperature: 0.6 },
        }),
      });

      if (geminiRes.ok) {
        const data = await geminiRes.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (reply) return NextResponse.json({ reply });
      } else {
        console.warn("Gemini API returned error status:", geminiRes.status);
      }
    } catch (err) {
      console.warn("Gemini API fetch error:", err);
    }
  }

  // 4. Try Anthropic (if configured)
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (anthropicKey) {
    try {
      const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": anthropicKey,
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-3-haiku-20240307",
          max_tokens: 600,
          system: SYSTEM,
          messages,
        }),
      });

      if (anthropicRes.ok) {
        const data = await anthropicRes.json();
        const reply = data.content?.map((b: { type: string; text?: string }) => (b.type === "text" ? b.text : "")).join("\n").trim();
        if (reply) return NextResponse.json({ reply });
      }
    } catch (err) {
      console.warn("Anthropic API fetch error:", err);
    }
  }

  // 5. Built-in Calculation Reasoning Engine (Zero Configuration Fallback)
  // Guarantees the assistant responds immediately with helpful domain expertise!
  const fallbackReply = getBuiltInAnswer(latestUserMessage);
  return NextResponse.json({ reply: fallbackReply });
}
