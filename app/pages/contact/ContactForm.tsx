"use client";

import { useActionState } from "react";
import { sendContactMessage, type ContactState } from "./actions";

const TOPICS = ["General Feedback", "Bug Report", "Calculator Suggestion", "Privacy Question", "Business Inquiry", "Other"];

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContactMessage, { status: "idle", message: "" });
  const f = state.status === "error" ? state.fields : undefined;

  return (
    <form className="contact-form" action={action} key={state.status === "ok" ? "sent" : "form"}>
      <h2>Send Us a Message</h2>
      <div className="cf-group">
        <label htmlFor="cf-name">Your Name</label>
        <input type="text" id="cf-name" name="name" required maxLength={100} autoComplete="name" defaultValue={f?.name} placeholder="Jane Smith" />
      </div>
      <div className="cf-group">
        <label htmlFor="cf-email">Email Address</label>
        <input type="email" id="cf-email" name="email" required maxLength={200} autoComplete="email" defaultValue={f?.email} placeholder="jane@example.com" />
      </div>
      <div className="cf-group">
        <label htmlFor="cf-subject">Subject</label>
        <select id="cf-subject" name="topic" required defaultValue={f?.topic ?? ""}>
          <option value="" disabled>
            — Select a topic —
          </option>
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="cf-group">
        <label htmlFor="cf-msg">Message</label>
        <textarea id="cf-msg" name="message" required minLength={10} maxLength={5000} defaultValue={f?.message} placeholder="Tell us what's on your mind..." />
      </div>
      {/* Honeypot for bots; hidden from people and assistive tech. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="cf-website">Website</label>
        <input type="text" id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="cf-btn" type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send Message"}
      </button>
      <div role="status" aria-live="polite">
        {state.message ? <div className={state.status === "ok" ? "success-msg cf-show" : "cf-error"}>{state.message}</div> : null}
      </div>
      <p style={{ fontSize: ".8rem", color: "var(--c-ink3)", marginTop: 16, textAlign: "center" }}>
        By submitting, you agree to our{" "}
        <a href="/pages/privacy-policy" style={{ color: "var(--c-accent-text)" }}>
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
