import { JsonLd } from "@/components/flagship/shell";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { CATEGORIES, TOTAL_CALCULATOR_COUNT } from "@/lib/calculators";
import { TAX_YEAR } from "@/lib/tax";

export const metadata: Metadata = {
  title: "About Us: Calculation Methodology & Editorial Standards | CalcDigi",
  description: `About CalcDigi: ${TOTAL_CALCULATOR_COUNT} verified, free calculators engineered by Devcipator. Review our peer-reviewed calculation methodology, IRS/WHO compliance, and editorial standards.`,
  openGraph: {
    title: "About Us: Calculation Methodology & Editorial Standards | CalcDigi",
    description: `About CalcDigi: ${TOTAL_CALCULATOR_COUNT} verified calculators. Review our peer-reviewed calculation methodology, IRS/WHO compliance, and editorial standards.`,
    type: "website",
    url: "https://www.calcdigi.com/pages/about",
    images: [{ url: "https://www.calcdigi.com/og-image.png", width: 1200, height: 630, alt: "About CalcDigi" }]
  },
  alternates: { canonical: "/pages/about" },
};

const SCHEMA_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "About CalcDigi", item: `${SITE_URL}/pages/about` }
      ]
    },
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}/pages/about#aboutpage`,
      name: "About CalcDigi: Calculation Methodology & Editorial Standards",
      url: `${SITE_URL}/pages/about`,
      description: "Learn about CalcDigi mission, peer-reviewed calculation methodology, editorial policy, and verified mathematical standards.",
      inLanguage: "en-US",
      mainEntity: {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "CalcDigi",
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/og-image.png`,
        founder: {
          "@type": "Person",
          name: "Tassawar Hussain",
          jobTitle: "Founder & Lead Software Architect",
          sameAs: [
            "https://www.linkedin.com/in/calc-digi-b684a6449/",
            "https://x.com/CalcDigi"
          ]
        },
        parentOrganization: {
          "@type": "Organization",
          name: "Devcipator",
          url: "https://devcipator.com"
        },
        sameAs: [
          "https://x.com/CalcDigi",
          "https://www.linkedin.com/in/calc-digi-b684a6449/",
          "https://www.instagram.com/calc.digi"
        ],
        knowsAbout: [
          "Financial Underwriting & Tax Modeling",
          "Medical Anthropometry & Clinical Health Metrics",
          "Applied Mathematics & Statistical Algorithms",
          "Scientific Unit Conversions & Physical Constants"
        ]
      }
    }
  ]
};

export default function Page() {
  return (
    <>
      <JsonLd data={SCHEMA_DATA} />
      <style dangerouslySetInnerHTML={{ __html: `
.about-hero{background:linear-gradient(135deg,var(--c-accent-lt) 0%,var(--c-bg) 100%);padding:80px 0;text-align:center;border-bottom:1px solid var(--c-rule);}
.about-hero h1{font-family:var(--font-serif);font-size:clamp(2rem,5vw,3.2rem);color:var(--c-ink);margin-bottom:16px;}
.about-hero p{font-size:1.1rem;color:var(--c-ink2);max-width:680px;margin:0 auto;line-height:1.7;}
.about-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;margin:40px 0;}
.about-card{background:var(--c-surface);border-radius:16px;padding:28px 24px;border:1px solid var(--c-rule);text-align:center;transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease;}
.about-card:hover{transform:translateY(-4px);box-shadow:0 12px 28px rgba(0,0,0,0.08);border-color:var(--c-accent);}
.about-card .icon{font-size:2.2rem;margin-bottom:14px;}
.about-card h3{font-family:var(--font-serif);font-size:1.15rem;margin-bottom:8px;color:var(--c-ink);}
.about-card p{font-size:.88rem;color:var(--c-ink2);line-height:1.65;margin:0;}
.stat-bar{background:linear-gradient(135deg,var(--c-accent),#2d7a52);padding:50px 0;text-align:center;border-radius:20px;margin:40px 0;}
.stat-bar h2{color:#fff;font-family:var(--font-serif);margin-bottom:8px;}
.stat-bar p{color:rgba(255,255,255,.8);max-width:540px;margin:0 auto;}
.stats-row{display:flex;justify-content:center;gap:40px;margin-top:28px;flex-wrap:wrap;}
.stat-item{color:#fff;text-align:center;}
.stat-num{font-size:2.2rem;font-weight:700;font-family:var(--font-serif);}
.stat-label{font-size:.85rem;opacity:.85;margin-top:4px;}
.content-section{margin:48px 0;border-bottom:1px solid var(--c-rule);padding-bottom:40px;}
.content-section h2{font-family:var(--font-serif);font-size:1.8rem;color:var(--c-ink);margin-bottom:16px;}
.content-section h3{font-family:var(--font-serif);font-size:1.3rem;color:var(--c-ink);margin:24px 0 10px;}
.content-section p{font-size:1rem;color:var(--c-ink2);line-height:1.8;margin-bottom:16px;}
.content-section ul{list-style:disc;padding-left:24px;margin-bottom:20px;color:var(--c-ink2);line-height:1.75;}
.content-section li{margin-bottom:8px;}
.team-box{background:var(--c-surface);border:1px solid var(--c-rule);border-radius:18px;padding:32px;margin:28px 0;display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap;}
.team-avatar{width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--c-accent),#1e40af);color:#fff;font-size:2rem;font-weight:bold;display:flex;align-items:center;justify-content:center;shrink:0;}
.team-bio h3{font-family:var(--font-serif);font-size:1.3rem;color:var(--c-ink);margin-bottom:4px;}
.team-role{font-size:.88rem;color:var(--c-accent);font-weight:600;margin-bottom:10px;}
.team-text{font-size:.92rem;color:var(--c-ink2);line-height:1.7;margin:0;}
` }} />
      <div dangerouslySetInnerHTML={{ __html: `<div class="about-hero">
<div class="container">
<h1>Built for Real People. Trusted for Real Decisions.</h1>
<p>CalcDigi is a privacy-first calculation platform engineered to deliver instant, high-precision mathematical, financial, and clinical results — without ads, paywalls, or data collection.</p>
</div>
</div>
<main style="padding:60px 0 80px;">
<div class="container" style="max-width:920px;">

<div class="stat-bar">
<h2>Our Numbers</h2>
<p>Empowering millions of students, homeowners, professionals, and patients with accurate computation.</p>
<div class="stats-row">
<div class="stat-item"><div class="stat-num">__TOTAL__</div><div class="stat-label">Verified Calculators</div></div>
<div class="stat-item"><div class="stat-num">__CATS__</div><div class="stat-label">Subject Categories</div></div>
<div class="stat-item"><div class="stat-num">100%</div><div class="stat-label">Free &amp; Open Access</div></div>
<div class="stat-item"><div class="stat-num">0</div><div class="stat-label">User Data Stored</div></div>
</div>
</div>

<div class="content-section">
<h2>Our Mission</h2>
<p>At CalcDigi, we believe accurate mathematical computation is a fundamental public utility. In an internet overwhelmed by slow, ad-choked calculator websites, confusing subscription paywalls, and opaque financial estimations, CalcDigi delivers a fast, transparent, and private alternative.</p>
<p>Whether calculating a clinical BMI, sizing a 30-year fixed mortgage with property taxes, planning college study hours, or analyzing business margins, every tool on CalcDigi executes client-side in your browser. We never sell your personal data, never require an account, and never track your numbers.</p>
</div>

<div class="about-grid">
<div class="about-card">
<div class="icon">🔒</div>
<h3>Zero-Knowledge Privacy</h3>
<p>All calculations process locally in your browser session. No entered data is ever transmitted, logged, or stored on external servers.</p>
</div>
<div class="about-card">
<div class="icon">🎯</div>
<h3>Peer-Reviewed Precision</h3>
<p>Algorithms are calibrated directly against official standards from the IRS, WHO, CDC, CFPB, NIST, and academic research institutions.</p>
</div>
<div class="about-card">
<div class="icon">⚡</div>
<h3>Instant Computation</h3>
<p>Engineered with modern Next.js server pre-rendering and pure client-side mathematical evaluation for sub-millisecond response times.</p>
</div>
<div class="about-card">
<div class="icon">📱</div>
<h3>Universal Accessibility</h3>
<p>Designed with responsive, accessible layout engineering that works seamlessly on smartphones, tablets, and widescreen workstations.</p>
</div>
</div>

<div id="methodology" class="content-section">
<h2>Calculation Methodology &amp; Mathematical Standards</h2>
<p>To guarantee uncompromising precision across all 330+ digital tools, CalcDigi enforces strict algorithmic verification protocols based on statutory codes and authoritative scientific standards:</p>

<h3>1. Financial &amp; Tax Calculators</h3>
<ul>
  <li><strong>IRS Regulatory Alignment:</strong> Income tax brackets, standard deduction schedules, and capital gains rates are updated annually per official IRS Revenue Procedures (e.g., Rev. Proc. 2025-45 for tax year __TAXYEAR__).</li>
  <li><strong>Lending &amp; Amortization Compliance:</strong> Mortgage, auto loan, and personal loan amortizations strictly comply with Federal Reserve Regulation Z (Truth in Lending Act) and the Consumer Financial Protection Bureau (CFPB) standard compounding models.</li>
  <li><strong>Underwriting Benchmarks:</strong> Housing affordability algorithms follow Fannie Mae Selling Guide Section B3-6, evaluating front-end (28%) and back-end (36%) Debt-to-Income (DTI) underwriting boundaries.</li>
</ul>

<h3>2. Clinical &amp; Health Calculators</h3>
<ul>
  <li><strong>World Health Organization (WHO):</strong> BMI classifications and cardiometabolic cutoffs adhere to WHO Technical Report Series 894 &amp; 916, incorporating dedicated Asian and South Asian population thresholds.</li>
  <li><strong>Clinical Metabolic Equations:</strong> Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) models deploy the validated Mifflin-St Jeor equation and the Katch-McArdle formula for lean-mass body composition.</li>
  <li><strong>Pediatric &amp; Growth Models:</strong> Percentile calculations for child weight and height track CDC 2000 Growth Charts and WHO Child Growth Standards.</li>
</ul>

<h3>3. Scientific, Engineering &amp; Math Calculators</h3>
<ul>
  <li><strong>NIST Physical Constants:</strong> Universal physical, chemical, and thermodynamic constants match the 2022 CODATA recommended values published by the National Institute of Standards and Technology (NIST SP 330).</li>
  <li><strong>Standard Unit Normalization:</strong> Measurement and unit converters enforce ISO 80000-1 international dimensional standards and IEEE 754-2019 floating-point arithmetic precision.</li>
</ul>
</div>

<div id="editorial" class="content-section">
<h2>Editorial Policy &amp; Verification Workflow</h2>
<p>Every calculator, educational guide, and programmatic answer table on CalcDigi follows a mandatory 3-tier quality control lifecycle before deployment:</p>
<ul>
  <li><strong>Tier 1 — Canonical Source Derivation:</strong> Equations are derived from primary statutory documents, peer-reviewed medical publications (The Lancet, NEJM), or accredited engineering handbooks rather than third-party summaries.</li>
  <li><strong>Tier 2 — Automated Regression Testing:</strong> Each mathematical algorithm is backed by automated unit test suites verifying boundary values, edge conditions, leap years, zero-division safeguards, and multi-currency formats.</li>
  <li><strong>Tier 3 — Continuous Regulatory Audit:</strong> Fiscal rules (tax brackets, FICA ceilings, 401(k) contribution caps) and academic accreditation policies are re-audited annually to preserve real-world relevance.</li>
</ul>
</div>

<div id="team" class="content-section">
<h2>Engineering Studio &amp; Editorial Leadership</h2>
<p>CalcDigi is engineered, operated, and maintained by <strong>Devcipator Software Engineering Studio</strong>, an independent digital lab focused on algorithmic software, privacy-first web utilities, and high-performance computing.</p>

<div class="team-box">
<div class="team-avatar">TH</div>
<div class="team-bio">
<h3>Tassawar Hussain</h3>
<div class="team-role">Founder, Lead Software Architect &amp; Technical Director</div>
<p class="team-text">Tassawar is a software architect and computational systems engineer who designed CalcDigi's core calculation engine, schema infrastructure, and high-throughput web architecture. With extensive experience in full-stack software development, automated testing, and technical SEO/AEO systems, he ensures every calculator delivers validated accuracy and sub-millisecond execution without tracking cookies or user telemetry.</p>
</div>
</div>
</div>

<div class="content-section">
<h2>Medical &amp; Financial Disclaimer</h2>
<p>CalcDigi provides computational tools and educational content for informational and general modeling purposes only. Calculations do not constitute formal clinical diagnoses, personalized medical prescriptions, certified legal opinions, formal mortgage lending commitments, or registered financial investment advice. For critical health or legal decisions, always consult a licensed medical doctor, board-certified financial planner (CFP), or certified public accountant (CPA). Review our full <a href="/pages/disclaimer">Disclaimer</a> and <a href="/pages/terms-of-service">Terms of Service</a>.</p>
</div>

<div class="content-section" style="border-bottom:none;">
<h2>Contact &amp; Technical Inquiries</h2>
<p>We welcome technical bug reports, formula audit requests, academic collaborations, and feature suggestions from our global user community:</p>
<p>📧 <strong>Direct Inquiries:</strong> Reach our engineering team via our <a href="/pages/contact">Contact &amp; Support Form</a> or connect with our official verified profiles on <a href="https://x.com/CalcDigi" target="_blank" rel="noopener noreferrer">X (Twitter)</a> and <a href="https://www.linkedin.com/in/calc-digi-b684a6449/" target="_blank" rel="noopener noreferrer">LinkedIn</a>.</p>
</div>

</div>
</main>`.replaceAll("__TOTAL__", String(TOTAL_CALCULATOR_COUNT)).replaceAll("__CATS__", String(CATEGORIES.length)).replaceAll("__TAXYEAR__", String(TAX_YEAR)) }} />
    </>
  );
}
