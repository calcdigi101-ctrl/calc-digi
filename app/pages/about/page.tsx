import Link from "next/link";
import type { Metadata } from "next";
import {
  ShieldCheck,
  Lock,
  Target,
  Zap,
  Smartphone,
  CheckCircle2,
  Award,
  FileText,
  Mail,
  ExternalLink,
  AlertTriangle,
  ArrowRight,
  Calculator,
  Layers,
  Sparkles,
} from "lucide-react";
import { JsonLd } from "@/components/flagship/shell";
import { SITE_URL } from "@/lib/site";
import { CATEGORIES, TOTAL_CALCULATOR_COUNT } from "@/lib/calculators";
import { TAX_YEAR } from "@/lib/tax";

export const metadata: Metadata = {
  title: "About CalcDigi: Methodology & Editorial Standards",
  description: `About CalcDigi: ${TOTAL_CALCULATOR_COUNT} verified calculators. Review our peer-reviewed calculation methodology, IRS/WHO compliance, and editorial standards.`,
  openGraph: {
    title: "About CalcDigi: Methodology & Editorial Standards",
    description: `About CalcDigi: ${TOTAL_CALCULATOR_COUNT} verified calculators. Review our peer-reviewed calculation methodology, IRS/WHO compliance, and editorial standards.`,
    type: "website",
    url: `${SITE_URL}/pages/about`,
    siteName: "CalcDigi",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "About CalcDigi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About CalcDigi: Methodology & Editorial Standards",
    description: `About CalcDigi: ${TOTAL_CALCULATOR_COUNT} verified calculators. Review our peer-reviewed calculation methodology, IRS/WHO compliance, and editorial standards.`,
    images: [`${SITE_URL}/og-image.png`],
    creator: "@CalcDigi",
    site: "@CalcDigi",
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
        { "@type": "ListItem", position: 2, name: "About CalcDigi", item: `${SITE_URL}/pages/about` },
      ],
    },
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}/pages/about#aboutpage`,
      name: "About CalcDigi: Calculation Methodology & Editorial Standards",
      url: `${SITE_URL}/pages/about`,
      description:
        "Learn about CalcDigi mission, peer-reviewed calculation methodology, editorial policy, and verified mathematical standards.",
      inLanguage: "en-US",
      datePublished: "2026-01-01",
      dateModified: "2026-11-08",
      author: {
        "@type": "Organization",
        name: "CalcDigi Editorial Team",
        url: `${SITE_URL}/pages/about`,
        sameAs: [
          "https://x.com/CalcDigi",
          "https://www.linkedin.com/in/calc-digi-b684a6449/",
          "https://www.instagram.com/calc.digi",
          "https://www.producthunt.com/@calcdigi",
          "https://alternativeto.net/software/calcdigi/",
        ],
      },
      mainEntity: {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "CalcDigi",
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/og-image.png`,
        founder: [
          {
            "@type": "Person",
            name: "Ali Zain",
            jobTitle: "Founder, Creator & Product Director",
            sameAs: [
              "https://x.com/CalcDigi",
              "https://www.linkedin.com/in/calc-digi-b684a6449/",
            ],
          },
          {
            "@type": "Person",
            name: "Tassawar Hussain",
            jobTitle: "Co-Founder & Lead Software Architect",
            sameAs: [
              "https://x.com/CalcDigi",
              "https://www.linkedin.com/in/calc-digi-b684a6449/",
            ],
          },
        ],
        parentOrganization: {
          "@type": "Organization",
          name: "Devcipator",
          url: "https://devcipator.com",
        },
        sameAs: [
          "https://x.com/CalcDigi",
          "https://www.linkedin.com/in/calc-digi-b684a6449/",
          "https://www.instagram.com/calc.digi",
          "https://www.producthunt.com/@calcdigi",
          "https://alternativeto.net/software/calcdigi/",
        ],
        knowsAbout: [
          "Financial Underwriting & Tax Modeling",
          "Medical Anthropometry & Clinical Health Metrics",
          "Applied Mathematics & Statistical Algorithms",
          "Scientific Unit Conversions & Physical Constants",
        ],
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={SCHEMA_DATA} />

      <main className="min-h-screen bg-[#fafbfc] dark:bg-slate-950 pb-28 text-slate-800 dark:text-slate-100">
        {/* Breadcrumb Navigation Bar (Standardized with Blog & Category Pages) */}
        <div className="border-b border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
            <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Link
                href="/"
                className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                About CalcDigi
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative pt-12 pb-10 sm:pt-16 sm:pb-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 mb-5 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="tracking-wide">PEER-REVIEWED &amp; ZERO-KNOWLEDGE ARCHITECTURE</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Built for Real People. <br className="hidden sm:inline" />
            <span className="text-[#18533b] dark:text-emerald-400">
              Trusted for Real Decisions.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            CalcDigi is a privacy-first calculation platform engineered to deliver instant,
            high-precision mathematical, financial, and clinical results — without ads, paywalls, or
            personal data collection.
          </p>

          {/* 4 Clean Responsive Metric Badges */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900/80">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {TOTAL_CALCULATOR_COUNT}+
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Verified Tools
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900/80">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {CATEGORIES.length}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Categories
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900/80">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                100%
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Free &amp; Open
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900/80">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                0
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Data Stored
              </div>
            </div>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Section: Our Mission */}
          <section className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 md:p-10 shadow-xs dark:border-slate-800 dark:bg-slate-900/90">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">
              <Target className="w-4 h-4" />
              <span>Our Mission</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Pure Computation as a Public Utility
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              <p>
                At CalcDigi, we believe accurate mathematical computation is a fundamental public
                utility. In an internet overwhelmed by slow, ad-choked calculator websites, confusing
                subscription paywalls, and opaque financial estimations, CalcDigi delivers a fast,
                transparent, and private alternative.
              </p>
              <p>
                Whether calculating a clinical BMI, sizing a 30-year fixed mortgage with property taxes,
                planning college study hours, or analyzing business margins, every tool on CalcDigi
                executes client-side in your browser. We never sell your personal data, never require an
                account, and never track your numbers.
              </p>
            </div>
          </section>

          {/* 4 Core Pillars Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 transition-all hover:border-emerald-500/50 hover:shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4 border border-emerald-200/60 dark:border-emerald-800/60">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mb-2">
                Zero-Knowledge Privacy
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                All calculations process locally in your browser session. No entered numbers, financial
                figures, or health metrics are ever transmitted, logged, or stored on external servers.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 transition-all hover:border-emerald-500/50 hover:shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4 border border-emerald-200/60 dark:border-emerald-800/60">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mb-2">
                Peer-Reviewed Precision
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Algorithms are calibrated directly against official statutory codes and standards from the
                IRS, WHO, CDC, CFPB, NIST, and academic research institutions.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 transition-all hover:border-emerald-500/50 hover:shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4 border border-emerald-200/60 dark:border-emerald-800/60">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mb-2">
                Instant Client-Side Speed
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Engineered with modern Next.js server pre-rendering and pure client-side mathematical
                evaluation for sub-millisecond response times with zero network latency.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 transition-all hover:border-emerald-500/50 hover:shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4 border border-emerald-200/60 dark:border-emerald-800/60">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mb-2">
                Universal Accessibility
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Designed with responsive, accessible layout engineering conforming to WCAG AA guidelines
                that works seamlessly across smartphones, tablets, and desktop workstations.
              </p>
            </div>
          </section>

          {/* Section: Calculation Methodology & Mathematical Standards */}
          <section id="methodology" className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 md:p-10 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Award className="w-4 h-4" />
              <span>Rigorous Protocols</span>
            </div>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Calculation Methodology &amp; Mathematical Standards
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                To guarantee uncompromising precision across all {TOTAL_CALCULATOR_COUNT}+ digital tools,
                CalcDigi enforces strict algorithmic verification protocols based on statutory codes and
                authoritative scientific standards:
              </p>
            </div>

            <div className="space-y-6 pt-2">
              <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    IRS TAX YEAR {TAX_YEAR}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
                    1. Financial &amp; Tax Calculators
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 pl-4 list-disc">
                  <li>
                    <strong className="text-slate-800 dark:text-slate-100">IRS Regulatory Alignment:</strong> Income
                    tax brackets, standard deduction schedules, and capital gains rates are updated annually
                    per official IRS Revenue Procedures (e.g., Rev. Proc. 2025-45 for tax year {TAX_YEAR}).
                  </li>
                  <li>
                    <strong className="text-slate-800 dark:text-slate-100">Lending &amp; Amortization Compliance:</strong> Mortgage,
                    auto loan, and personal loan amortizations strictly comply with Federal Reserve Regulation
                    Z (Truth in Lending Act) and CFPB actuarial formula models.
                  </li>
                  <li>
                    <strong className="text-slate-800 dark:text-slate-100">Actuarial Compound Growth:</strong> Continuous
                    and periodic compound interest models enforce exact day-count conventions (Actual/365 and
                    30/360 bond-basis).
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    WHO &amp; CDC
                  </span>
                  <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
                    2. Clinical, Health &amp; Anthropometric Calculators
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 pl-4 list-disc">
                  <li>
                    <strong className="text-slate-800 dark:text-slate-100">Anthropometric Body Mass Formulas:</strong> Body
                    Mass Index (BMI) computations implement World Health Organization (WHO) international
                    weight classifications.
                  </li>
                  <li>
                    <strong className="text-slate-800 dark:text-slate-100">Metabolic Basal Rate (BMR):</strong> Calorie
                    and TDEE estimators apply the clinically validated Mifflin-St Jeor equation alongside the
                    Katch-McArdle formula for lean-mass body composition.
                  </li>
                  <li>
                    <strong className="text-slate-800 dark:text-slate-100">Pediatric &amp; Growth Models:</strong> Percentile
                    calculations for child weight and height track CDC 2000 Growth Charts and WHO Child Growth
                    Standards.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                    NIST &amp; ISO
                  </span>
                  <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
                    3. Scientific, Engineering &amp; Math Calculators
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 pl-4 list-disc">
                  <li>
                    <strong className="text-slate-800 dark:text-slate-100">NIST Physical Constants:</strong> Universal
                    physical, chemical, and thermodynamic constants match the 2022 CODATA recommended values
                    published by the National Institute of Standards and Technology (NIST SP 330).
                  </li>
                  <li>
                    <strong className="text-slate-800 dark:text-slate-100">Standard Unit Normalization:</strong> Measurement
                    and unit converters enforce ISO 80000-1 international dimensional standards and IEEE
                    754-2019 floating-point arithmetic precision.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Editorial Policy & Verification Workflow */}
          <section id="editorial" className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 md:p-10 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <FileText className="w-4 h-4" />
              <span>Editorial Integrity</span>
            </div>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Editorial Policy &amp; Verification Workflow
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Every calculator, educational guide, and benchmark matrix table on CalcDigi follows a mandatory
                3-tier quality control lifecycle before deployment:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2">
                <div className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
                  Tier 1
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  Canonical Derivation
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Equations are derived directly from primary statutory documents, peer-reviewed medical
                  publications (The Lancet, NEJM), or accredited engineering handbooks rather than secondary
                  summaries.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2">
                <div className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
                  Tier 2
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  Automated Regression
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Each mathematical algorithm is backed by automated unit test suites verifying boundary
                  conditions, edge values, leap years, zero-division safeguards, and multi-currency formats.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2">
                <div className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">
                  Tier 3
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  Continuous Audit
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Fiscal rules (tax brackets, FICA ceilings, 401(k) contribution caps) and academic
                  accreditation policies are re-audited annually to preserve real-world relevance.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Engineering Studio & Leadership */}
          <section id="team" className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 md:p-10 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Leadership Team</span>
            </div>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Engineering Studio &amp; Leadership
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                CalcDigi is engineered, operated, and maintained by{" "}
                <strong className="text-slate-900 dark:text-white font-semibold">
                  Devcipator Software Engineering Studio
                </strong>
                , an independent digital lab focused on algorithmic software, privacy-first web utilities,
                and high-performance computing.
              </p>
            </div>

            <div className="space-y-5 pt-2">
              {/* Ali Zain Profile */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-6 sm:p-7 flex flex-col sm:flex-row gap-5 items-start">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-bold text-xl flex items-center justify-center shrink-0 shadow-sm">
                  AZ
                </div>
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                      Ali Zain
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      <CheckCircle2 className="w-3 h-3" /> Founder &amp; Creator
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Product Director &amp; Editorial Lead
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Ali Zain is the founder, creator, and visionary behind CalcDigi. Driven by a mission to
                    democratize institutional-grade calculation tools for consumers, students, homeowners, and
                    entrepreneurs, Ali conceived and directs CalcDigi&apos;s product roadmap, user experience
                    standards, and editorial integrity — ensuring every digital tool remains 100% free, private,
                    and ad-free forever.
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href="https://x.com/CalcDigi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>X (Twitter)</span>
                    </a>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <a
                      href="https://www.linkedin.com/in/calc-digi-b684a6449/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Tassawar Hussain Profile */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-6 sm:p-7 flex flex-col sm:flex-row gap-5 items-start">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-xl flex items-center justify-center shrink-0 shadow-sm">
                  TH
                </div>
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                      Tassawar Hussain
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                      <CheckCircle2 className="w-3 h-3" /> Co-Founder
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    Lead Software Architect &amp; Technical Director
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Tassawar is a computational systems engineer and software architect who co-founded
                    CalcDigi and engineered its core calculation algorithms, structured data schemas, and
                    high-throughput web infrastructure. With deep expertise in algorithmic precision, automated
                    unit testing, and technical SEO/AEO performance, he oversees formula validation and
                    continuous regulatory compliance.
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href="https://x.com/CalcDigi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>X (Twitter)</span>
                    </a>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <a
                      href="https://www.linkedin.com/in/calc-digi-b684a6449/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Medical & Financial Disclaimer */}
          <section className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-6 sm:p-7 dark:border-amber-900/50 dark:bg-amber-950/20">
            <div className="flex items-start gap-3.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Medical &amp; Financial Disclaimer
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  CalcDigi provides computational tools and educational content for informational and general
                  modeling purposes only. Calculations do not constitute formal clinical diagnoses,
                  personalized medical prescriptions, certified legal opinions, formal mortgage lending
                  commitments, or registered financial investment advice. For critical health or legal
                  decisions, always consult a licensed medical doctor, board-certified financial planner
                  (CFP), or certified public accountant (CPA). Review our full{" "}
                  <Link
                    href="/pages/disclaimer"
                    className="text-emerald-700 dark:text-emerald-400 underline font-semibold"
                  >
                    Disclaimer
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/pages/terms-of-service"
                    className="text-emerald-700 dark:text-emerald-400 underline font-semibold"
                  >
                    Terms of Service
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* Section: Contact & Technical Inquiries */}
          <section className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 md:p-10 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                <Mail className="w-4 h-4" />
                <span>Get in Touch</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Have a Question or Formula Feedback?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg">
                We welcome bug reports, formula audit requests, academic collaborations, and feature suggestions
                from our global community.
              </p>
            </div>
            <Link
              href="/pages/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors shadow-xs shrink-0"
            >
              <span>Contact Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
