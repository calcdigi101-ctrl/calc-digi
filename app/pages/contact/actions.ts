"use server";

import { headers } from "next/headers";

export type ContactState = { status: "idle" | "ok" | "error"; message: string; fields?: Record<string, string> };

const TOPICS = ["General Feedback", "Bug Report", "Calculator Suggestion", "Privacy Question", "Business Inquiry", "Other"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort per-instance limiter: 3 messages per IP per 10 minutes.
const recent = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const list = (recent.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  list.push(now);
  recent.set(ip, list);
  return list.length > 3;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Contact form handler: validates, then sends through Resend (RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL). */
export async function sendContactMessage(_prev: ContactState, form: FormData): Promise<ContactState> {
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const topic = String(form.get("topic") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();
  const fields = { name, email, topic, message };

  // Honeypot: real users never see or fill this field.
  if (String(form.get("website") ?? "")) return { status: "ok", message: "Thanks! Your message has been sent." };

  if (!name || name.length > 100) return { status: "error", message: "Please enter your name (up to 100 characters).", fields };
  if (!EMAIL_RE.test(email) || email.length > 200) return { status: "error", message: "Please enter a valid email address.", fields };
  if (!TOPICS.includes(topic)) return { status: "error", message: "Please choose a topic.", fields };
  if (message.length < 10 || message.length > 5000) return { status: "error", message: "Your message should be between 10 and 5,000 characters.", fields };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return { status: "error", message: "Too many messages. Please try again in a few minutes.", fields };

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "CalcDigi Contact <onboarding@resend.dev>";
  if (!key || !to) {
    console.error("Contact form is not configured (RESEND_API_KEY / CONTACT_TO_EMAIL missing)");
    return { status: "error", message: "Sorry, messages can't be sent right now. Please try again later.", fields };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[CalcDigi] ${topic} from ${name}`,
        text: `From: ${name} <${email}>\nTopic: ${topic}\n\n${message}`,
        html: `<p><strong>From:</strong> ${esc(name)} &lt;${esc(email)}&gt;<br><strong>Topic:</strong> ${esc(topic)}</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text().catch(() => ""));
      return { status: "error", message: "Sorry, your message couldn't be sent. Please try again later.", fields };
    }
  } catch (err) {
    console.error("Contact form send failed", err);
    return { status: "error", message: "Sorry, your message couldn't be sent. Please try again later.", fields };
  }
  return { status: "ok", message: "Thanks! Your message has been sent. We usually reply within 2–3 business days." };
}
