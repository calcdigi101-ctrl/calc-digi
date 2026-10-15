import type { Metadata } from "next";
import Script from "next/script";
import CalculatorsExplorer from "@/components/CalculatorsExplorer";
import { HomeHero } from "@/components/flagship/HomeHero";
import { CATEGORIES, TOTAL_CALCULATOR_COUNT } from "@/lib/calculators";
import { getArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";
import { ArrowRight, Sparkles, MessageSquare, BookOpen, HelpCircle } from "lucide-react";

const DESCRIPTION = `${TOTAL_CALCULATOR_COUNT} free online calculators for health, finance, math and everyday life: BMI, mortgage, calorie, tax, loan and more. No sign-up.`;

export const metadata: Metadata = {
  title: "CalcDigi – The Smarter, Cleaner Way to Calculate Anything",
  description: DESCRIPTION,
  openGraph: {
    title: "CalcDigi – Free Online Precision Calculators",
    description: DESCRIPTION,
    type: "website",
    url: "/",
  },
  alternates: {
    canonical: "/",
  },
};

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Are CalcDigi calculators really 100% free?",
    a: "Yes. Every tool, chart, and calculation engine on CalcDigi is completely free. There are no subscriptions, paywalls, premium tiers, or hidden fees.",
  },
  {
    q: "Does CalcDigi store or track my personal financial or health data?",
    a: "No. All calculations are executed directly within your browser using client-side JavaScript. Your salaries, mortgage amounts, body measurements, and inputs never leave your device.",
  },
  {
    q: "How accurate are the financial and tax formulas?",
    a: "Our financial calculators are continuously audited against official regulatory guidelines, including current IRS tax brackets, standard compounding conventions, and standard 30-year fixed loan formulas.",
  },
  {
    q: "How does the AI Assistant work?",
    a: "The CalcDigi AI Assistant helps you discover the right calculator for complex real-world situations, explains mathematical formulas in plain English, and helps interpret results.",
  },
  {
    q: "Can I use CalcDigi on mobile devices?",
    a: "Yes. The entire platform is engineered to be 100% responsive, optimized for smartphones, tablets, laptops, and ultra-wide desktop monitors.",
  },
  {
    q: "Are health calculators like BMI and Calorie suitable for clinical diagnosis?",
    a: "Our health tools follow World Health Organization (WHO) and Mifflin-St Jeor formulas for general screening and educational benchmarks. They do not replace clinical physician consultation.",
  },
];

const SCENARIOS = [
  {
    icon: "🏡",
    title: "Buying a First Home",
    desc: "Calculate exact monthly mortgage payments with property taxes, home insurance, and PMI factored in.",
    linkText: "Mortgage Calculator",
    href: "/calculators/finance/mortgage-calculator",
    accent: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
  },
  {
    icon: "⚖️",
    title: "Reaching a Healthy Target Weight",
    desc: "Estimate daily caloric needs, TDEE, and safe timelines based on Mifflin-St Jeor metabolic equations.",
    linkText: "Calorie & TDEE Calculator",
    href: "/calculators/health/calorie-calculator",
    accent: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
  },
  {
    icon: "📈",
    title: "Planning Early Retirement (FIRE)",
    desc: "Visualize compound growth across decades with dynamic contribution rates and inflation adjustments.",
    linkText: "Compound Interest Calculator",
    href: "/calculators/finance/compound-interest-calculator",
    accent: "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300",
  },
];

export default async function Page() {
  const articles = (await getArticles()).slice(0, 3);

  return (
    <main id="main">
      {/* 1. Hero Section with Interactive Calculator */}
      <HomeHero />

      {/* 2. Explore All 20 Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#070b12] transition-colors" id="categories">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mb-3 border border-emerald-200/60 dark:border-emerald-800">
              ⚡ COMPREHENSIVE DIRECTORY
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Explore All Categories
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Browse 341+ precision tools organized by domain. Fast, accurate, and completely free.
            </p>
          </div>
          <CalculatorsExplorer categories={CATEGORIES} showAllCategoriesOption={true} defaultFilter="all" />
        </div>
      </section>

      {/* 3. Ask the Calculator Assistant Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800 bg-[#fbfdfc] dark:bg-[#080d17] transition-colors" id="ai-assistant">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mb-3 border border-emerald-200/60 dark:border-emerald-800">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>AI ASSISTANT</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Ask the Calculator Assistant
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Not sure which calculator to use or what a result means? Ask in plain English.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-[24px] bg-white dark:bg-slate-900 border-2 border-emerald-500/40 dark:border-emerald-500/30 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-2xl flex items-center justify-center mb-4">
                  📊
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                  Result Explainer
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Ask what your numbers mean, whether they fall in a healthy or typical range, and what steps to consider next.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-[24px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-2xl flex items-center justify-center mb-4">
                  💬
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                  Calculator Chat
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Ask questions like &quot;How much should I save for retirement?&quot; and get clear, plain-English guidance.
                </p>
              </div>
              <button type="button" data-open-ai className="w-full py-2 rounded-xl bg-[#046a38] hover:bg-[#03542c] text-white text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-1">
                <span>Try AI Chat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-6 rounded-[24px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-2xl flex items-center justify-center mb-4">
                  📐
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                  Formula Explainer
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Confused about how an equation works? Ask the assistant to walk through the formula step by step.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-[24px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-2xl flex items-center justify-center mb-4">
                  🧭
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                  Which Calculator?
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Describe what you&apos;re trying to solve and the assistant will point you directly to the best tool.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              data-open-ai
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#046a38] hover:bg-[#03542c] text-white font-semibold text-sm shadow-sm transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI a Question</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Real-World Scenarios Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#070b12] transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mb-3 border border-emerald-200/60 dark:border-emerald-800">
              💡 REAL-WORLD USE CASES
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              What People Use CalcDigi For
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Illustrative scenarios of everyday calculations made effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SCENARIOS.map((s) => (
              <div
                key={s.title}
                className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-100 dark:border-slate-800 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${s.accent} flex items-center justify-center text-2xl mb-4`}>
                    {s.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {s.desc}
                  </p>
                </div>
                <a
                  href={s.href}
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1"
                >
                  <span>{s.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Frequently Asked Questions (FAQ) Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800 bg-[#fbfdfc] dark:bg-[#080d17] transition-colors" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mb-3 border border-emerald-200/60 dark:border-emerald-800">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>GOT QUESTIONS?</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3.5">
            {FAQ_ITEMS.map((item, idx) => (
              <details
                key={item.q}
                className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 shadow-2xs open:shadow-xs transition-all"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  <span>{item.q}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg group-open:rotate-45 transition-transform duration-200 ml-4 shrink-0">
                    +
                  </span>
                </summary>
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Guides & Articles (Learning Center) Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#070b12] transition-colors" id="guides">
        <div className="max-w-6xl mx-auto">
          <div className="text-left mb-10">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-emerald-700 dark:text-emerald-400 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>LEARNING CENTER</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Guides &amp; Articles
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
              In-depth guides to help you understand your numbers and make smarter decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group hover:-translate-y-1">
              <div>
                <div className="h-44 bg-gradient-to-br from-blue-50 to-indigo-50/70 dark:from-slate-800/80 dark:to-indigo-950/40 flex items-center justify-center p-6 border-b border-slate-100 dark:border-slate-800/60">
                  <div className="w-16 h-16 rounded-2xl bg-white/90 dark:bg-slate-800/90 shadow-sm flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    📈
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[10px] font-bold tracking-widest uppercase text-emerald-700 dark:text-emerald-400 mb-2">
                    FINANCE
                  </div>
                  <h3 className="font-serif font-bold text-slate-900 dark:text-white text-base sm:text-lg mb-2 group-hover:text-emerald-600 transition-colors">
                    The Power of Compound Interest Explained
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    How compound interest works, why starting early matters so much, and worked examples showing how savings grow over time.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-1 text-[11px] text-slate-400 font-medium">
                6 min read • Finance
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group hover:-translate-y-1">
              <div>
                <div className="h-44 bg-gradient-to-br from-sky-50 to-blue-50/70 dark:from-slate-800/80 dark:to-sky-950/40 flex items-center justify-center p-6 border-b border-slate-100 dark:border-slate-800/60">
                  <div className="w-16 h-16 rounded-2xl bg-white/90 dark:bg-slate-800/90 shadow-sm flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    🏡
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[10px] font-bold tracking-widest uppercase text-emerald-700 dark:text-emerald-400 mb-2">
                    FINANCE
                  </div>
                  <h3 className="font-serif font-bold text-slate-900 dark:text-white text-base sm:text-lg mb-2 group-hover:text-emerald-600 transition-colors">
                    How Much House Can I Afford in 2026?
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    Use the 28/36 rule, your down payment and today&apos;s mortgage rates to estimate a safe home-buying budget.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-1 text-[11px] text-slate-400 font-medium">
                7 min read • Finance
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group hover:-translate-y-1">
              <div>
                <div className="h-44 bg-gradient-to-br from-teal-50 to-emerald-50/70 dark:from-slate-800/80 dark:to-teal-950/40 flex items-center justify-center p-6 border-b border-slate-100 dark:border-slate-800/60">
                  <div className="w-16 h-16 rounded-2xl bg-white/90 dark:bg-slate-800/90 shadow-sm flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    📊
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[10px] font-bold tracking-widest uppercase text-emerald-700 dark:text-emerald-400 mb-2">
                    HEALTH
                  </div>
                  <h3 className="font-serif font-bold text-slate-900 dark:text-white text-base sm:text-lg mb-2 group-hover:text-emerald-600 transition-colors">
                    What Is a Healthy BMI for Adults?
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    What your BMI number means, the adult BMI ranges, where BMI falls short, and when it&apos;s worth talking to a doctor.
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-1 text-[11px] text-slate-400 font-medium">
                5 min read • Health
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="/pages/blog"
              className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all inline-flex items-center gap-2 group"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Floating Back to Top Button */}
      <button 
        type="button" 
        id="back-top" 
        className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#18533b] hover:bg-[#12402d] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        title="Back to top"
      >
        <span className="text-base font-bold">↑</span>
      </button>
    </main>
  );
}
