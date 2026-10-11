import type { Metadata } from "next";
import Script from "next/script";
import { BadgeCheck, Ban, Lock, Smartphone, Sparkles } from "lucide-react";
import CalculatorsExplorer from "@/components/CalculatorsExplorer";
import { HomeHero } from "@/components/flagship/HomeHero";
import { CATEGORIES, TOTAL_CALCULATOR_COUNT } from "@/lib/calculators";
import { getArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";
import { TAX_YEAR } from "@/lib/tax";

const DESCRIPTION = `${TOTAL_CALCULATOR_COUNT} free online calculators for health, finance, math and everyday life: BMI, mortgage, calorie, tax, loan and more. No sign-up.`;

export const metadata: Metadata = {
  title: "CalcDigi – Free Online Calculators for Finance, Health & Math",
  description: DESCRIPTION,
  openGraph: {
    title: "CalcDigi – Free Online Calculators",
    description: DESCRIPTION,
    type: "website",
    url: "/",
  },
  alternates: {
    canonical: "/",
  },
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "Are CalcDigi calculators free to use?",
    a: "Yes, 100% free. All calculators on CalcDigi are completely free with no sign-up, subscription, or hidden fees. You can use them as often as you like, including the AI assistant.",
  },
  {
    q: "How does the AI assistant work?",
    a: "Open the AI assistant from the header and ask a question in plain English, such as how a formula works or what a result means. Your question is sent to our AI provider to generate an answer. Don't include personal or sensitive information. Calculator inputs themselves are never sent anywhere.",
  },
  {
    q: "How accurate are the health calculators?",
    a: "Our health calculators use the same evidence-based formulas used by medical professionals, including Mifflin-St Jeor for BMR/TDEE, NIH formulas for BMI, and the US Navy method for body fat. Results are estimates and should not replace professional medical advice.",
  },
  {
    q: "Are the financial calculators up to date?",
    a: `Yes. Our tax and paycheck calculators use the ${TAX_YEAR} IRS federal income tax brackets, standard deductions and contribution limits. Mortgage and loan calculators use standard amortization formulas and let you enter current interest rates for accurate results.`,
  },
  {
    q: "Do you store any data I enter into the calculators?",
    a: "No. All calculations happen directly in your browser. We do not collect, store, or share any values you enter into our calculators. See our Privacy Policy for full details.",
  },
  {
    q: "Can I use these calculators on my phone?",
    a: "Absolutely. CalcDigi is fully responsive and optimized for all devices including smartphones, tablets, laptops, and desktops.",
  },
];

const USE_CASES: { icon: string; title: string; text: string; href: string; link: string }[] = [
  {
    icon: "🏠",
    title: "Checking a mortgage before applying",
    text: "Enter the home price, down payment and a current rate quote to see the monthly payment, total interest and a full amortization schedule, then compare a 15- vs 30-year term.",
    href: "/calculators/finance/mortgage-calculator",
    link: "Mortgage calculator",
  },
  {
    icon: "🥗",
    title: "Setting a daily calorie target",
    text: "Estimate your maintenance calories from age, height, weight and activity level, then see the intake that matches a realistic weekly weight-change goal.",
    href: "/calculators/health/calorie-calculator",
    link: "Calorie calculator",
  },
  {
    icon: "📋",
    title: "Estimating take-home pay",
    text: `Work out federal income tax, Social Security and Medicare for ${TAX_YEAR} from a salary or hourly wage to see what actually lands in each paycheck.`,
    href: "/calculators/finance/take-home-pay-calculator",
    link: "Take-home pay calculator",
  },
];

const TRUST = [
  { icon: Lock, label: "SSL Secured" },
  { icon: BadgeCheck, label: "No Sign-Up" },
  { icon: Sparkles, label: "AI Assistant" },
  { icon: Smartphone, label: "Mobile-Friendly" },
  { icon: Ban, label: "No Ads" },
];

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CalcDigi",
  url: SITE_URL,
  description: "Free online calculators for health, finance, math and everyday use",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default async function Page() {
  const articles = (await getArticles()).slice(0, 3);

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <HomeHero />
      <section className="section" id="calculators">
        <div className="container">
          <div className="section-header">
            <div className="section-label">📋 All Calculators</div>
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-desc">Filter calculators by category or browse them all below.</p>
          </div>
          <CalculatorsExplorer categories={CATEGORIES} showAllCategoriesOption={false} defaultFilter="health" />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-label">✨ AI Assistant</div>
            <h2 className="section-title">Ask the Calculator Assistant</h2>
            <p className="section-desc">Not sure which calculator to use or what a result means? Ask in plain English.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20, marginTop: 8 }}>
            <div className="calc-card" style={{ borderColor: "var(--c-accent)", background: "var(--c-accent-lt)" }}>
              <div className="card-icon" style={{ background: "var(--c-surface)", fontSize: 22 }}>🧠</div>
              <div className="card-title">Result Explainer</div>
              <div className="card-desc">Ask what your numbers mean, whether they fall in a healthy or typical range, and what to look at next.</div>
            </div>
            <div className="calc-card">
              <div className="card-icon icon-finance">💬</div>
              <div className="card-title">Calculator Chat</div>
              <div className="card-desc">
                Ask questions like &quot;How much should I save for retirement?&quot; or &quot;Is my BMI healthy?&quot; and get a short, plain-English answer.
              </div>
              <button type="button" data-open-ai className="btn btn-primary" style={{ marginTop: 4, width: "100%", justifyContent: "center" }}>
                Try AI Chat →
              </button>
            </div>
            <div className="calc-card">
              <div className="card-icon icon-math">📊</div>
              <div className="card-title">Formula Explainer</div>
              <div className="card-desc">Confused about how a calculation works? Ask the assistant to walk through the formula step by step.</div>
            </div>
            <div className="calc-card">
              <div className="card-icon" style={{ background: "var(--c-accent2-lt)" }}>💡</div>
              <div className="card-title">Which Calculator?</div>
              <div className="card-desc">Describe what you&apos;re trying to work out and the assistant will point you to the right CalcDigi calculator.</div>
            </div>
          </div>

          <div className="section-cta">
            <button type="button" data-open-ai className="btn btn-primary btn-lg">
              ✨ Ask AI a Question
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header centered">
            <div className="section-label">💡 Example Use Cases</div>
            <h2 className="section-title">What People Use CalcDigi For</h2>
            <p className="section-desc">Illustrative examples of common tasks. These are not customer reviews.</p>
          </div>

          <ul className="trust-row" style={{ marginBottom: 32, listStyle: "none" }}>
            {TRUST.map(({ icon: Icon, label }) => (
              <li key={label} className="trust-badge">
                <Icon aria-hidden className="trust-badge-icon" width={20} height={20} strokeWidth={2} />
                {label}
              </li>
            ))}
          </ul>

          <div className="testimonials-grid">
            {USE_CASES.map((u) => (
              <div key={u.title} className="testimonial-card">
                <div className="card-icon" style={{ background: "var(--c-accent-lt)", marginBottom: 12 }} aria-hidden>
                  {u.icon}
                </div>
                <h3 className="card-title" style={{ marginBottom: 8 }}>
                  {u.title}
                </h3>
                <p className="card-desc" style={{ marginBottom: 12 }}>
                  {u.text}
                </p>
                <a href={u.href} className="card-cta">
                  {u.link} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header centered">
            <div className="section-label">Got Questions?</div>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list" style={{ maxWidth: 720, margin: "0 auto" }}>
            {FAQ.map((f) => (
              <div key={f.q} className="faq-item">
                <button type="button" className="faq-q">
                  {f.q} <span className="faq-icon" aria-hidden>+</span>
                </button>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {articles.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <div className="section-label">📖 Learning Center</div>
              <h2 className="section-title">Guides &amp; Articles</h2>
              <p className="section-desc">In-depth guides to help you understand your numbers and make smarter decisions.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
              {articles.map((a) => (
                <a key={a.slug} href={`/pages/blog/${a.slug}`} className="blog-card">
                  <div className="blog-card-img">{a.cover_emoji}</div>
                  <div className="blog-card-body">
                    <div className="blog-card-cat">{a.category}</div>
                    <div className="blog-card-title">{a.title}</div>
                    <div className="blog-card-desc">{a.excerpt}</div>
                    <div className="blog-card-meta">
                      <span>{a.read_minutes} min read</span>
                      <span>·</span>
                      <span>{a.category}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className="section-cta">
              <a href="/pages/blog" className="btn btn-outline btn-lg">
                View All Articles →
              </a>
            </div>
          </div>
        </section>
      )}
      <Script id="calc-script-index" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "initFAQ();initScrollReveal();" }} />
    </main>
  );
}
