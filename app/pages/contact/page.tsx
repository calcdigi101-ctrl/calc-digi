import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | CalcDigi",
  description: "Contact CalcDigi with feedback, bug reports, calculator suggestions or privacy questions. We read every message.",
  openGraph: {
    title: "Contact Us | CalcDigi",
    description: "Contact CalcDigi with feedback, bug reports, calculator suggestions or privacy questions. We read every message.",
    type: "website",
  },
  alternates: { canonical: "/pages/contact" },
};

const STYLE = "\n.contact-hero{background:linear-gradient(135deg,var(--c-accent-lt),var(--c-bg));padding:64px 0 48px;text-align:center;border-bottom:1px solid var(--c-rule);}\n.contact-hero h1{font-family:var(--font-serif);font-size:clamp(1.8rem,4vw,2.8rem);margin-bottom:12px;}\n.contact-hero p{color:var(--c-ink2);font-size:1rem;max-width:520px;margin:0 auto;}\n.contact-layout{display:grid;grid-template-columns:1fr 1.5fr;gap:48px;margin-top:48px;}\n@media(max-width:768px){.contact-layout{grid-template-columns:1fr;}}\n.contact-info h2{font-family:var(--font-serif);font-size:1.4rem;margin-bottom:20px;}\n.contact-item{display:flex;gap:14px;align-items:flex-start;margin-bottom:24px;}\n.ci-icon{font-size:1.4rem;margin-top:2px;}\n.ci-body strong{display:block;font-weight:600;margin-bottom:2px;}\n.ci-body span,.ci-body a{color:var(--c-ink2);font-size:.9rem;text-decoration:none;}\n.ci-body a:hover{color:var(--c-accent-text);}\n.contact-form{background:var(--c-surface);border:1px solid var(--c-rule);border-radius:16px;padding:32px;}\n.contact-form h2{font-family:var(--font-serif);font-size:1.4rem;margin-bottom:24px;}\n.cf-group{margin-bottom:18px;}\n.cf-group label{display:block;font-size:.85rem;font-weight:600;margin-bottom:6px;color:var(--c-ink);}\n.cf-group input,.cf-group select,.cf-group textarea{width:100%;padding:10px 14px;border:1.5px solid var(--c-rule);border-radius:8px;font-family:var(--font-sans);font-size:.95rem;color:var(--c-ink);background:var(--c-bg);box-sizing:border-box;transition:border-color .2s;}\n.cf-group input:focus,.cf-group select:focus,.cf-group textarea:focus{outline:none;border-color:var(--c-accent);}\n.cf-group textarea{resize:vertical;min-height:120px;}\n.cf-btn{width:100%;padding:14px;background:var(--c-accent);color:#fff;border:none;border-radius:10px;font-size:1rem;font-weight:600;cursor:pointer;font-family:var(--font-sans);transition:background .2s;}\n.cf-btn:hover{background:#14472e;}\n.success-msg{display:none;background:var(--c-accent-lt);border:1.5px solid var(--c-accent);border-radius:10px;padding:16px;margin-top:16px;text-align:center;color:var(--c-accent);font-weight:600;}\n.cf-error{background:#fef2f2;border:1.5px solid #dc2626;border-radius:10px;padding:14px;margin-top:16px;text-align:center;color:#991b1b;font-weight:600;}\nbody.dark .cf-error{background:#2a0f12;color:#fca5a5;}\n.success-msg.cf-show{display:block;color:var(--c-accent-text);}\n.cf-btn:disabled{opacity:.7;cursor:wait;}\n";

const REASONS: [string, string, string][] = [
  ["💬", "General feedback", "Tell us what works and what doesn't."],
  ["🐛", "Bug reports", "Include the calculator's URL and the values you entered."],
  ["💡", "Calculator suggestions", "Describe the calculation you need and who it's for."],
  ["🔒", "Privacy & legal", "Choose \"Privacy Question\" as the topic."],
];

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div className="contact-hero">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>Have feedback, found a bug, or want to suggest a new calculator? We&apos;d love to hear from you.</p>
        </div>
      </div>
      <main style={{ padding: "0 0 80px" }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="contact-layout">
            <div className="contact-info">
              <h2>How We Can Help</h2>
              {REASONS.map(([icon, title, text]) => (
                <div key={title} className="contact-item">
                  <div className="ci-icon" aria-hidden>
                    {icon}
                  </div>
                  <div className="ci-body">
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 32, padding: 20, background: "var(--c-rule2)", borderRadius: 12, border: "1px solid var(--c-rule)" }}>
                <p style={{ fontSize: ".85rem", color: "var(--c-ink2)", margin: 0, lineHeight: 1.7 }}>
                  <strong>Note:</strong> CalcDigi calculators are for informational purposes only. For medical emergencies, call 911. For
                  financial advice, consult a licensed professional.
                </p>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </main>
    </>
  );
}
