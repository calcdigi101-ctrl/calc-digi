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
} from "lucide-react";
import { JsonLd } from "@/components/flagship/shell";
import { SITE_URL } from "@/lib/site";
import { CATEGORIES } from "@/lib/calculators";
import { TAX_YEAR } from "@/lib/tax";

export const metadata: Metadata = {
  title: "About CalcDigi: Methodology & Editorial Standards",
  description:
    "About CalcDigi: 341+ verified calculators. Review our peer-reviewed calculation methodology, IRS/WHO compliance, and editorial standards.",
  openGraph: {
    title: "About CalcDigi: Methodology & Editorial Standards",
    description:
      "About CalcDigi: 341+ verified calculators. Review our peer-reviewed calculation methodology, IRS/WHO compliance, and editorial standards.",
    type: "website",
    url: `${SITE_URL}/pages/about`,
    siteName: "CalcDigi",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: "About CalcDigi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About CalcDigi: Methodology & Editorial Standards",
    description:
      "About CalcDigi: 341+ verified calculators. Review our peer-reviewed calculation methodology, IRS/WHO compliance, and editorial standards.",
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
      lastReviewed: "2026-11-01",
      about: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "CalcDigi",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/og-image.png`,
      parentOrganization: {
        "@type": "Organization",
        name: "Devcipator Software Agency",
        url: "https://devcipator.com",
      },
      sameAs: [
        "https://x.com/CalcDigi",
        "https://www.linkedin.com/in/calc-digi-b684a6449/",
        "https://www.instagram.com/calc.digi",
        "https://www.producthunt.com/@calcdigi",
        "https://alternativeto.net/software/calcdigi/",
      ],
      founder: [
        { "@id": `${SITE_URL}/pages/about#ali-zain` },
        { "@id": `${SITE_URL}/pages/about#tassawar-hussain` },
      ],
      knowsAbout: [
        "Financial Underwriting & Tax Modeling",
        "Medical Anthropometry & Clinical Health Metrics",
        "Applied Mathematics & Statistical Algorithms",
        "Scientific Unit Conversions & Physical Constants",
      ],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/pages/about#ali-zain`,
      name: "Ali Zain",
      jobTitle: "Founder, Product Director & Editorial Lead",
      worksFor: {
        "@type": "Organization",
        name: "CalcDigi",
        url: `${SITE_URL}/`,
      },
      sameAs: [
        "https://x.com/CalcDigi",
        "https://www.linkedin.com/in/calc-digi-b684a6449/",
      ],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/pages/about#tassawar-hussain`,
      name: "Tassawar Hussain",
      jobTitle: "Co-Founder, Lead Software Architect & Technical Director",
      worksFor: {
        "@type": "Organization",
        name: "CalcDigi",
        url: `${SITE_URL}/`,
      },
      sameAs: [
        "https://x.com/CalcDigi",
        "https://www.linkedin.com/in/calc-digi-b684a6449/",
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <JsonLd data={SCHEMA_DATA} />

      <main className="min-h-screen bg-[#fafbfc] dark:bg-slate-950 text-slate-800 dark:text-slate-100">
        {/* Breadcrumb Navigation Bar */}
        <div className="border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 backdrop-blur-md">
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

        {/* Hero Section with Vibrant Green Ambient Light & Grid */}
        <section className="hero-bg-glow relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800 pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
          {/* Glowing Green Light Spotlights (Behind Title) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] lg:w-[1100px] h-[380px] sm:h-[500px] bg-gradient-to-tr from-emerald-400/30 via-emerald-300/35 to-teal-400/25 dark:from-emerald-600/30 dark:via-emerald-500/25 dark:to-teal-500/20 blur-[120px] rounded-full -z-10"
          />

          {/* Subtle Grid Texture */}
          <div className="hero-grid-bg pointer-events-none opacity-60 dark:opacity-40" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-100/90 dark:bg-emerald-950/80 border border-emerald-300/80 dark:border-emerald-700/80 text-emerald-900 dark:text-emerald-200 mb-6 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="tracking-wide uppercase">PEER-REVIEWED &amp; ZERO-KNOWLEDGE ARCHITECTURE</span>
            </div>

            {/* Single H1 Heading */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.12] max-w-4xl mx-auto">
              Built for Real People. <br className="hidden sm:inline" />
              <span className="text-[#18533b] dark:text-emerald-400">
                Trusted for Real Decisions.
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
              CalcDigi is a privacy-first calculation platform engineered to deliver instant,
              high-precision mathematical, financial, and clinical results — without ads, paywalls, or
              personal data collection.
            </p>

            {/* 4 Clean Responsive Metric Badges */}
            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
              <div className="rounded-2xl border border-slate-200/90 bg-white/90 backdrop-blur-xs p-5 sm:p-6 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900/90 transition-all hover:border-emerald-500/40 hover:shadow-sm">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                  341+
                </div>
                <div className="mt-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Verified Tools
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200/90 bg-white/90 backdrop-blur-xs p-5 sm:p-6 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900/90 transition-all hover:border-emerald-500/40 hover:shadow-sm">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                  {CATEGORIES.length}
                </div>
                <div className="mt-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Categories
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200/90 bg-white/90 backdrop-blur-xs p-5 sm:p-6 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900/90 transition-all hover:border-emerald-500/40 hover:shadow-sm">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                  100%
                </div>
                <div className="mt-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Free &amp; Open
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200/90 bg-white/90 backdrop-blur-xs p-5 sm:p-6 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900/90 transition-all hover:border-emerald-500/40 hover:shadow-sm">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                  0
                </div>
                <div className="mt-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Data Stored
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spacious Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 flex flex-col gap-12 sm:gap-16 lg:gap-20">
          {/* Section: Our Mission (H2) */}
          <section className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-10 lg:p-12 shadow-xs dark:border-slate-800 dark:bg-slate-900/90">
            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">
              <Target className="w-4 h-4" />
              <span>Core Mission</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Pure Computation as a Public Utility
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
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

          {/* 4 Core Pillars Grid (H3 Subheadings) */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 transition-all hover:border-emerald-500/50 hover:shadow-md flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-5 border border-emerald-200/60 dark:border-emerald-800/60">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Zero-Knowledge Privacy
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  All calculations process locally in your browser session. No entered numbers, financial
                  figures, or health metrics are ever transmitted, logged, or stored on external servers.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 transition-all hover:border-emerald-500/50 hover:shadow-md flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-5 border border-emerald-200/60 dark:border-emerald-800/60">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Peer-Reviewed Precision
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Algorithms are calibrated directly against official statutory codes and standards from the
                  IRS, WHO, CDC, CFPB, NIST, and academic research institutions.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 transition-all hover:border-emerald-500/50 hover:shadow-md flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-5 border border-emerald-200/60 dark:border-emerald-800/60">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Instant Speed
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Engineered with modern Next.js server pre-rendering and pure client-side mathematical
                  evaluation for sub-millisecond response times with zero network latency.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 transition-all hover:border-emerald-500/50 hover:shadow-md flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-5 border border-emerald-200/60 dark:border-emerald-800/60">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Universal Access
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Designed with responsive, accessible layout engineering conforming to WCAG AA guidelines
                  that works seamlessly across smartphones, tablets, and desktop workstations.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Calculation Methodology & Mathematical Standards (H2) */}
          <section id="methodology" className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-10 lg:p-12 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                <Award className="w-4 h-4" />
                <span>Rigorous Protocols</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                Calculation Methodology &amp; Mathematical Standards
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300 max-w-4xl">
                To guarantee uncompromising precision across all 341+ digital tools, CalcDigi enforces
                strict algorithmic verification protocols based on statutory codes and authoritative
                scientific standards:
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
              {/* Card 1: Financial & Tax */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-6 sm:p-7 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    IRS TAX YEAR {TAX_YEAR}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                  1. Financial &amp; Tax Calculators
                </h3>
                <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-300 pl-4 list-disc leading-relaxed">
                  <li>
                    <strong className="text-slate-800 dark:text-slate-100">IRS Alignment:</strong> Income
                    tax brackets, standard deduction schedules, and capital gains rates updated per official{" "}
                    <a
                      href="https://www.irs.gov"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-slate-300 dark:decoration-slate-600 hover:text-emerald-600 dark:hover:text-emerald-400 hover:decoration-emerald-500 transition-colors font-medium"
                    >
                      IRS Rev. Proc. 2025-45
                    </a>{" "}
                    for tax year {TAX_YEAR}.
                  </li>
                  <li>
                    <strong className="text-slate-800 dark:text-slate-100">Regulation Z Compliance:</strong>{" "}
                    <Link
                      href="/calculators/finance/mortgage-calculator"
                      className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
                    >
                      Mortgage
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/calculators/finance/auto-loan-calculator"
                      className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
                    >
                      auto loan amortizations
                    </Link>{" "}
                    strictly comply with Federal Reserve Truth in Lending Act and{" "}
                    <a
                      href="https://www.consumerfinance.gov"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-slate-300 dark:decoration-slate-600 hover:text-emerald-600 dark:hover:text-emerald-400 hover:decoration-emerald-500 transition-colors font-medium"
                    >
                      CFPB
                    </a>{" "}
                    actuarial models.
                  </li>
                  <li>
                    <strong className="text-slate-800 dark:text-slate-100">Actuarial Compound Growth:</strong> Continuous
                    and periodic interest models enforce exact Actual/365 and 30/360 bond-basis day counts.
                  </li>
                </ul>
              </div>

              {/* Card 2: Clinical & Anthropometric */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-6 sm:p-7 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    WHO &amp; CDC
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                  2. Clinical &amp; Anthropometric
                </h3>
                <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-300 pl-4 list-disc leading-relaxed">
                  <li>
                    <strong className="text-slate-800 dark:text-slate-100">Body Mass Formulas:</strong>{" "}
                    <Link
                      href="/calculators/health/bmi-calculator"
                      className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
                    >
                      Body Mass Index (BMI)
                    </Link>{" "}
                    computations implement{" "}
                    <a
                      href="https://www.who.int"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-slate-300 dark:decoration-slate-600 hover:text-emerald-600 dark:hover:text-emerald-400 hover:decoration-emerald-500 transition-colors font-medium"
                    >
                      World Health Organization (WHO)
                    </a>{" "}
                    international weight classifications.
                  </li>
                  <li>
                    <strong className="text-slate-800 dark:text-slate-100">Metabolic Basal Rate:</strong> Calorie
                    and TDEE estimators apply the clinically validated Mifflin-St Jeor and Katch-McArdle equations
                    to compute{" "}
                    <Link
                      href="/calculators/health/bmr-calculator"
                      className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
                    >
                      Metabolic Basal Rate (BMR)
                    </Link>
                    .
                  </li>
                  <li>
                    <strong className="text-slate-800 dark:text-slate-100">Pediatric Growth Models:</strong> Percentile
                    calculations track{" "}
                    <a
                      href="https://www.cdc.gov/growthcharts/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-slate-300 dark:decoration-slate-600 hover:text-emerald-600 dark:hover:text-emerald-400 hover:decoration-emerald-500 transition-colors font-medium"
                    >
                      CDC 2000 Growth Charts
                    </a>{" "}
                    and WHO Child Growth Standards.
                  </li>
                </ul>
              </div>

              {/* Card 3: Scientific & Math */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-6 sm:p-7 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                    NIST &amp; ISO
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                  3. Scientific &amp; Math Calculators
                </h3>
                <ul className="flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-300 pl-4 list-disc leading-relaxed">
                  <li>
                    <strong className="text-slate-800 dark:text-slate-100">NIST Constants:</strong> Physical and
                    chemical constants match 2022 CODATA values published by{" "}
                    <a
                      href="https://www.nist.gov"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-slate-300 dark:decoration-slate-600 hover:text-emerald-600 dark:hover:text-emerald-400 hover:decoration-emerald-500 transition-colors font-medium"
                    >
                      NIST (NIST SP 330)
                    </a>
                    .
                  </li>
                  <li>
                    <strong className="text-slate-800 dark:text-slate-100">Standard Normalization:</strong>{" "}
                    <Link
                      href="/calculators/measurements/length-converter"
                      className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
                    >
                      Measurement converters
                    </Link>{" "}
                    enforce{" "}
                    <a
                      href="https://www.iso.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-slate-300 dark:decoration-slate-600 hover:text-emerald-600 dark:hover:text-emerald-400 hover:decoration-emerald-500 transition-colors font-medium"
                    >
                      ISO 80000-1
                    </a>{" "}
                    dimensional standards.
                  </li>
                  <li>
                    <strong className="text-slate-800 dark:text-slate-100">IEEE 754 Precision:</strong> Mathematical
                    functions implement 64-bit double precision floating-point arithmetic.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Editorial Policy & 3-Tier Quality Control (H2) */}
          <section id="editorial" className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-10 lg:p-12 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                <FileText className="w-4 h-4" />
                <span>Editorial Integrity</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                Editorial Policy &amp; 3-Tier Verification Workflow
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300 max-w-4xl">
                Every calculator, educational guide, and benchmark matrix table on CalcDigi follows a mandatory
                3-tier quality control lifecycle before deployment:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 flex flex-col gap-3">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Tier 1
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                  Canonical Derivation
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Equations are derived directly from primary statutory documents, peer-reviewed medical
                  publications (The Lancet, NEJM), or accredited engineering handbooks rather than secondary
                  summaries.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 flex flex-col gap-3">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Tier 2
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                  Automated Regression
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Each mathematical algorithm is backed by automated unit test suites verifying boundary
                  conditions, edge values, leap years, zero-division safeguards, and multi-currency formats.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 flex flex-col gap-3">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Tier 3
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                  Continuous Audit
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Fiscal rules (tax brackets, FICA ceilings, 401(k) contribution caps) and academic
                  accreditation policies are re-audited annually to preserve real-world relevance.
                </p>
              </div>
            </div>

            {/* Content Freshness Signal (Audit Timestamp) */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Last Algorithmic &amp; Statutory Audit: November 2026</span>
              </div>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                Quarterly Editorial &amp; Algorithmic Compliance Cycle
              </span>
            </div>
          </section>

          {/* Section: Leadership Team (H2) */}
          <section id="team" className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-10 lg:p-12 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Executive Leadership</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                Engineering Studio &amp; Leadership
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300 max-w-4xl">
                CalcDigi is engineered, operated, and maintained by{" "}
                <strong className="text-slate-900 dark:text-white font-semibold">
                  Devcipator Software Agency
                </strong>
                , an independent digital lab focused on algorithmic software, privacy-first web utilities,
                and high-performance computing.
              </p>
            </div>

            {/* Side-by-Side 2-Column Grid for Founders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 pt-2">
              {/* Ali Zain Profile */}
              <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-7 sm:p-8 flex flex-col justify-between shadow-xs hover:border-emerald-500/40 transition-all">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-bold text-2xl flex items-center justify-center shrink-0 shadow-sm">
                      AZ
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                          Ali Zain
                        </h3>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          <CheckCircle2 className="w-3 h-3" /> Founder &amp; Creator
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                        Founder, Product Director &amp; Editorial Lead
                      </div>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
                    Ali Zain is the founder, creator, and visionary behind CalcDigi. Driven by a mission to
                    democratize institutional-grade calculation tools for consumers, students, homeowners, and
                    entrepreneurs, Ali conceived and directs CalcDigi&apos;s product roadmap, user experience
                    standards, and editorial integrity — ensuring every digital tool remains 100% free, private,
                    and ad-free forever.
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-slate-200/60 dark:border-slate-800/80 mt-6">
                  <a
                    href="https://x.com/CalcDigi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-2xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>X (Twitter)</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/calc-digi-b684a6449/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/50 transition-all shadow-2xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Tassawar Hussain Profile */}
              <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-7 sm:p-8 flex flex-col justify-between shadow-xs hover:border-blue-500/40 transition-all">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-2xl flex items-center justify-center shrink-0 shadow-sm">
                      TH
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                          Tassawar Hussain
                        </h3>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                          <CheckCircle2 className="w-3 h-3" /> Co-Founder
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                        Co-Founder, Lead Software Architect &amp; Technical Director
                      </div>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
                    Tassawar is a computational systems engineer and software architect who co-founded
                    CalcDigi and engineered its core calculation algorithms, structured data schemas, and
                    high-throughput web infrastructure. With deep expertise in algorithmic precision, automated
                    unit testing, and technical SEO/AEO performance, he oversees formula validation and
                    continuous regulatory compliance.
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-slate-200/60 dark:border-slate-800/80 mt-6">
                  <a
                    href="https://x.com/CalcDigi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/50 transition-all shadow-2xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>X (Twitter)</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/calc-digi-b684a6449/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/50 transition-all shadow-2xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Medical & Financial Disclaimer (H3) */}
          <section className="rounded-3xl border border-amber-200/80 bg-amber-50/70 p-7 sm:p-9 dark:border-amber-900/50 dark:bg-amber-950/25">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                  Medical &amp; Financial Disclaimer
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
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

          {/* Section: Contact & Technical Inquiries (H3) */}
          <section className="rounded-3xl border border-slate-200/80 bg-white p-8 sm:p-10 lg:p-12 shadow-xs dark:border-slate-800 dark:bg-slate-900/90 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                <Mail className="w-4 h-4" />
                <span>Direct Access</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Have a Question or Formula Feedback?
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl">
                We welcome bug reports, formula audit requests, academic collaborations, and feature suggestions
                from our global user community.
              </p>
            </div>
            <Link
              href="/pages/contact"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 shrink-0"
            >
              <span>Contact Engineering Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
