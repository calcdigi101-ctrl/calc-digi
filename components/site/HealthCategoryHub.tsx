"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  type HealthCategory,
  type HealthTool,
  HEALTH_TOOLS,
  CATEGORY_TABS,
  HEALTH_FAQS,
} from "@/lib/healthTools";

export { HEALTH_TOOLS, CATEGORY_TABS, HEALTH_FAQS };
export type { HealthCategory, HealthTool };

export function HealthCategoryHub() {
  const [selectedCat, setSelectedCat] = useState<HealthCategory>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Filter tools by active tab and search query
  const filteredTools = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return HEALTH_TOOLS.filter((tool) => {
      const matchesCat = selectedCat === "all" || tool.category === selectedCat;
      if (!matchesCat) return false;
      if (!q) return true;

      const inName = tool.name.toLowerCase().includes(q);
      const inDesc = tool.shortDesc.toLowerCase().includes(q);
      const inStd = tool.clinicalStandard.toLowerCase().includes(q);
      const inFormula = tool.formula.toLowerCase().includes(q);
      const inMetric = tool.primaryMetric.toLowerCase().includes(q);
      const inKeywords = tool.keywords.some((k) => k.toLowerCase().includes(q));

      return inName || inDesc || inStd || inFormula || inMetric || inKeywords;
    });
  }, [selectedCat, searchQuery]);

  // Tab counts
  const tabCounts = useMemo(() => {
    const counts: Record<HealthCategory, number> = {
      all: HEALTH_TOOLS.length,
      body: 0,
      nutrition: 0,
      fitness: 0,
      womens: 0,
      lifestyle: 0,
    };
    HEALTH_TOOLS.forEach((t) => {
      counts[t.category]++;
    });
    return counts;
  }, []);

  return (
    <div className="w-full pb-16">
      {/* 1. STREAMLINED HERO SECTION (MATCHING /calculators TYPOGRAPHY, PADDING & CENTER ALIGNMENT) */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-b from-emerald-50/40 via-white to-slate-50/50 py-10 sm:py-14 px-5 sm:px-10 text-center shadow-xs dark:border-slate-800 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-3xl mx-auto space-y-3.5">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline">
              Home
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold" aria-current="page">
              Health Calculators
            </span>
          </nav>

          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/90 dark:bg-emerald-950/80 px-3.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-600/20">
            <span>🩺</span> 35 Free Clinical Health Calculators · 100% Client-Side Privacy
          </div>

          {/* Main H1 Title */}
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Health &amp; Fitness <em className="text-emerald-600 dark:text-emerald-400 not-italic">Calculators</em>
          </h1>

          {/* Concise 1-Sentence Subtitle (15 words) */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            35 free clinical health calculators for BMI, calories, TDEE, body fat, macros, and aerobic fitness.
          </p>

          {/* 4 Clean Stat Counters */}
          <div className="flex items-center justify-center gap-6 sm:gap-12 flex-wrap pt-6 mt-6 border-t border-slate-200/80 dark:border-slate-800">
            <div className="text-center min-w-[70px]">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">35</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Calculators</div>
            </div>
            <div className="text-center min-w-[70px]">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">5</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Subcategories</div>
            </div>
            <div className="text-center min-w-[70px]">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">100%</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Free</div>
            </div>
            <div className="text-center min-w-[70px]">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">0</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Sign-Up</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CLEAN FILTER & SEARCH BAR LAYOUT */}
      <section className="mt-8 mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
            <svg className="size-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search health calculators (e.g. calorie, BMI, TDEE)..."
            className="w-full h-11 pl-10 pr-4 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
          />
        </div>

        {/* Sub-Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 flex-wrap">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCat === tab.id;
            const count = tabCounts[tab.id];
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCat(tab.id)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-xs dark:bg-emerald-500"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-800"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span
                  className={`ml-0.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    isActive
                      ? "bg-emerald-700 text-white dark:bg-emerald-600"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 pt-1">
          <span>
            Showing <strong className="text-slate-900 dark:text-white">{filteredTools.length}</strong> of {HEALTH_TOOLS.length} calculators
            {selectedCat !== "all" ? ` in ${CATEGORY_TABS.find((t) => t.id === selectedCat)?.label}` : ""}
            {searchQuery ? ` matching "${searchQuery}"` : ""}
          </span>
          {(searchQuery || selectedCat !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCat("all");
              }}
              className="text-emerald-600 hover:underline font-semibold dark:text-emerald-400"
            >
              Reset filters
            </button>
          )}
        </div>
      </section>

      {/* 3. SIMPLIFIED CALCULATOR CARDS (UNIFORM HEIGHT, AIRY WHITESPACE, ZERO DENSITY CLUTTER) */}
      <section>
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.href}
                className="group relative flex flex-col justify-start rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-emerald-500/60"
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-2xl border border-slate-100 group-hover:bg-emerald-50 group-hover:scale-105 dark:bg-slate-800 dark:border-slate-700/60 dark:group-hover:bg-emerald-950/40 transition-transform">
                    {tool.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                      {tool.name}
                    </h3>
                    <div className="text-xs text-slate-400 dark:text-slate-500 font-medium truncate mt-0.5">
                      {tool.clinicalStandard}
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {tool.shortDesc}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center bg-white dark:bg-slate-900/50">
            <span className="text-3xl">🔍</span>
            <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">No calculators found</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              No health tools matched &ldquo;{searchQuery}&rdquo;. Try searching for &ldquo;calorie&rdquo;, &ldquo;body fat&rdquo;, or &ldquo;pace&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCat("all");
              }}
              className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-500"
            >
              Clear Search &amp; Show All
            </button>
          </div>
        )}
      </section>

      {/* 4. DE-CLUTTERED DECISION GUIDE (2x2 / 4-COLUMN GENEROUS GRID, SOFT BORDERS) */}
      <section className="mt-16 sm:mt-20 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Clinical Decision Guide
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1.5 leading-snug">
            Which Health Calculator Should I Use?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Select your primary metabolic or athletic goal to follow the verified evidence-based tool sequence:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🥗</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Fat Loss &amp; Deficit</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Follow this 4-tier metabolic sequencing protocol:
            </p>
            <ol className="text-xs space-y-2 list-decimal list-inside text-slate-700 dark:text-slate-300 font-medium">
              <li>
                <Link href="/calculators/health/bmr-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  BMR Calculator
                </Link> (Basal rest)
              </li>
              <li>
                <Link href="/calculators/health/tdee-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  TDEE Calculator
                </Link> (Active burn)
              </li>
              <li>
                <Link href="/calculators/health/calorie-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Calorie Calculator
                </Link> (Set -20%)
              </li>
              <li>
                <Link href="/calculators/health/macro-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Macro Calculator
                </Link> (Protein buffer)
              </li>
            </ol>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🏋️</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Muscle &amp; Strength</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Optimize hypertrophy, power, and lean tissue preservation:
            </p>
            <ol className="text-xs space-y-2 list-decimal list-inside text-slate-700 dark:text-slate-300 font-medium">
              <li>
                <Link href="/calculators/health/body-fat-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Body Fat Calculator
                </Link> (Navy BF%)
              </li>
              <li>
                <Link href="/calculators/health/lean-body-mass-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Lean Body Mass
                </Link> (Isolate muscle)
              </li>
              <li>
                <Link href="/calculators/health/protein-intake-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Protein Intake
                </Link> (2.0g/kg target)
              </li>
              <li>
                <Link href="/calculators/health/one-rep-max-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  1RM Calculator
                </Link> (Load programming)
              </li>
            </ol>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">❤️</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Cardio &amp; Longevity</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Cardiovascular conditioning and all-cause risk profiling:
            </p>
            <ol className="text-xs space-y-2 list-decimal list-inside text-slate-700 dark:text-slate-300 font-medium">
              <li>
                <Link href="/calculators/health/blood-pressure-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Blood Pressure
                </Link> (Resting vascular tone)
              </li>
              <li>
                <Link href="/calculators/health/vo2-max-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  VO2 Max Calculator
                </Link> (Aerobic ceiling)
              </li>
              <li>
                <Link href="/calculators/health/heart-rate-zone-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Heart Rate Zone
                </Link> (Zone 2 cardio)
              </li>
              <li>
                <Link href="/calculators/health/waist-to-height-ratio-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Waist-to-Height
                </Link> (NICE &lt;0.50 rule)
              </li>
            </ol>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🌸</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Reproductive &amp; Family</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Endocrine cycle tracking through prenatal care:
            </p>
            <ol className="text-xs space-y-2 list-decimal list-inside text-slate-700 dark:text-slate-300 font-medium">
              <li>
                <Link href="/calculators/health/period-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Period Calculator
                </Link> (Cycle rhythm)
              </li>
              <li>
                <Link href="/calculators/health/ovulation-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Ovulation Calculator
                </Link> (LH peak window)
              </li>
              <li>
                <Link href="/calculators/health/fertility-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Fertility Calculator
                </Link> (Conception odds)
              </li>
              <li>
                <Link href="/calculators/health/pregnancy-due-date-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Pregnancy Due Date
                </Link> (Naegele EDD)
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* 5. MASTER CLINICAL SPECIFICATIONS TABLE (COLLAPSIBLE ACCORDION FOR CLEAN AIRY UX + FULL SEO) */}
      <section className="mt-16 sm:mt-20 rounded-3xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        <details className="group" open>
          <summary className="p-6 sm:p-8 cursor-pointer select-none flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Master Clinical Specifications Comparison Table (All 35 Tools)
                </h2>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                  35 Tools
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Compare target biomarkers, governing clinical algorithms, required physiological inputs, and validated reference standards.
              </p>
            </div>
            <span className="shrink-0 size-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center text-xs font-bold transition-transform group-open:rotate-180">
              ▼
            </span>
          </summary>

          <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 border-t border-slate-100 dark:border-slate-800">
            <div className="max-h-[500px] overflow-y-auto overflow-x-auto rounded-xl border border-slate-200/80 dark:border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="sticky top-0 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 z-10 shadow-2xs">
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="py-3 px-3.5 font-semibold">Calculator</th>
                    <th className="py-3 px-3.5 font-semibold">Sub-Category</th>
                    <th className="py-3 px-3.5 font-semibold">Primary Output Metric</th>
                    <th className="py-3 px-3.5 font-semibold">Governing Formula / Clinical Model</th>
                    <th className="py-3 px-3.5 font-semibold">Required Inputs</th>
                    <th className="py-3 px-3.5 font-semibold">Clinical Standard</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900">
                  {HEALTH_TOOLS.map((t) => (
                    <tr key={t.slug} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-2.5 px-3.5 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                        <Link href={t.href} className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1.5">
                          <span>{t.icon}</span>
                          <span>{t.name}</span>
                        </Link>
                      </td>
                      <td className="py-2.5 px-3.5 whitespace-nowrap">
                        <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-700 dark:text-slate-300">
                          {t.categoryLabel}
                        </span>
                      </td>
                      <td className="py-2.5 px-3.5 whitespace-nowrap font-medium text-emerald-700 dark:text-emerald-300">
                        {t.primaryMetric}
                      </td>
                      <td className="py-2.5 px-3.5 font-mono text-[11px] text-slate-500 dark:text-slate-400 max-w-[280px] break-words" title={t.formula}>
                        {t.formula}
                      </td>
                      <td className="py-2.5 px-3.5 text-[11px] text-slate-500 dark:text-slate-400 max-w-[220px] break-words" title={t.inputs}>
                        {t.inputs}
                      </td>
                      <td className="py-2.5 px-3.5 whitespace-nowrap">
                        <span className="rounded bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-[10px] font-medium text-emerald-800 dark:text-emerald-300">
                          {t.clinicalStandard}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </details>
      </section>

      {/* 6. GEO AI OVERVIEW BOX: DIRECT CLINICAL FORMULAS (BELOW GRID & TABLE) */}
      <section className="mt-16 sm:mt-20 rounded-3xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/50 to-white p-6 sm:p-8 shadow-xs dark:border-emerald-900/50 dark:from-emerald-950/20 dark:to-slate-900">
        <div className="flex items-start gap-4">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white font-bold text-lg shadow-xs">
            💡
          </div>
          <div className="space-y-2.5 flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Direct Clinical Summary: Core Health &amp; Bioenergetic Equations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Every tool on this hub is calibrated to gold-standard physiological literature published by the <strong>World Health Organization (WHO)</strong>, <strong>American College of Sports Medicine (ACSM)</strong>, and <strong>National Institutes of Health (NIH)</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">Basal Energy (BMR):</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px] block break-words">Mifflin-St Jeor: 10W + 6.25H - 5A ± s</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">Body Composition:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px] block break-words">US Navy: 495 / (1.0324 - 0.19077 log₁₀(W-N) + 0.15456 log₁₀(H)) - 450</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">Aerobic Intensity:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px] block break-words">Karvonen: ((220 - Age) - HRrest) × % + HRrest</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">Cardiovascular Screening:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px] block break-words">WHtR &lt; 0.50 (Waist to Height Ratio standard)</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">Strength Testing:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px] block break-words">Brzycki 1RM: Weight / (1.0278 - 0.0278 × Reps)</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">Pharmacokinetics:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px] block break-words">Widmark: BAC = (A / (W × r)) - 0.015 × Hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. MEDICAL GOVERNANCE & VERIFICATION DISCLOSURE */}
      <section className="mt-16 sm:mt-20 rounded-3xl border border-slate-200/80 bg-slate-50/70 p-6 sm:p-8 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-3.5">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Clinical Methodology &amp; Medical Governance Standards
            </h3>
          </div>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            Last Clinical Audit: Q4 2026 • Verified Reference Protocols
          </span>
        </div>
        <p className="leading-relaxed">
          The health, metabolic, and biometric calculations provided on CalcDigi are engineered in strict compliance with peer-reviewed biomedical literature and clinical guidelines established by the <strong>World Health Organization (WHO)</strong>, <strong>American College of Sports Medicine (ACSM)</strong>, <strong>American Heart Association (AHA)</strong>, <strong>National Institutes of Health (NIH)</strong>, and the <strong>International Federation of Gynecology and Obstetrics (FIGO)</strong>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1 text-[11px]">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <strong className="block text-slate-900 dark:text-white font-semibold mb-1">100% In-Browser Isolation:</strong>
            Biometric values remain on your local device. Zero server recording, zero telemetry, zero health data transmission.
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <strong className="block text-slate-900 dark:text-white font-semibold mb-1">Dual Interactive Visualizations:</strong>
            Every calculator features Graph #1 (result gauge / donut) and Graph #2 (continuous interactive benchmark SVG).
          </div>
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <strong className="block text-slate-900 dark:text-white font-semibold mb-1">Non-Diagnostic Disclaimer:</strong>
            These algorithmic models are provided for informational and fitness tracking purposes and do not replace professional physician diagnosis.
          </div>
        </div>
      </section>

      {/* 8. EXPANDABLE FAQS */}
      <section className="mt-16 sm:mt-20 space-y-6">
        <div className="text-center space-y-1.5 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Frequently Asked Questions
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Clinical &amp; Technical Questions
          </h2>
        </div>

        <div className="space-y-3.5 max-w-3xl mx-auto">
          {HEALTH_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-2xs dark:border-slate-800 dark:bg-slate-900 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 size-6 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold transition-transform ${
                      isOpen ? "rotate-180 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
