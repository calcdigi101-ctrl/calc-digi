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
    <div className="w-full space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-emerald-50/50 via-white to-slate-50/80 p-6 sm:p-10 shadow-sm dark:border-slate-800 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900/80">
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <nav className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-semibold">Health &amp; Fitness Calculators</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 dark:bg-emerald-950/60 dark:text-emerald-300">
            <span>🩺</span> 35 Clinical Calculators · 100% Free · No Sign-Up
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Health &amp; Fitness <span className="text-emerald-600 dark:text-emerald-400">Calculators</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Clinically calibrated biomedical calculators for body composition, metabolic expenditure, endurance conditioning, prenatal health, and all-cause longevity.
          </p>

          {/* Quick Stat Badges */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto text-left">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">35</div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Clinical Tools</div>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">100%</div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Client-Side Privacy</div>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">0</div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Data Stored</div>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">Dual</div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Interactive Charts</div>
            </div>
          </div>
        </div>
      </section>

      {/* GEO AI Overview Box: Direct Clinical Answers for AI Engines & Users */}
      <section className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/60 to-white p-5 sm:p-6 shadow-sm dark:border-emerald-900/50 dark:from-emerald-950/20 dark:to-slate-900">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white font-bold text-base shadow-sm">
            💡
          </div>
          <div className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Direct Clinical Summary: Core Health &amp; Bioenergetic Equations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Every tool on this hub is calibrated to gold-standard physiological literature published by the <strong>World Health Organization (WHO)</strong>, <strong>American College of Sports Medicine (ACSM)</strong>, and <strong>National Institutes of Health (NIH)</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Basal Energy (BMR):</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px]">Mifflin-St Jeor: 10W + 6.25H - 5A ± s</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Body Composition:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px]">US Navy: 495 / (1.0324 - 0.19077 log₁₀(W-N) + 0.15456 log₁₀(H)) - 450</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Aerobic Intensity:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px]">Karvonen: ((220 - Age) - HRrest) × % + HRrest</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Cardiovascular Screening:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px]">WHtR &lt; 0.50 (Waist to Height Ratio standard)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Strength Testing:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px]">Brzycki 1RM: Weight / (1.0278 - 0.0278 × Reps)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Pharmacokinetics:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px]">Widmark: BAC = (A / (W × r)) - 0.015 × Hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-Time Filter & Search Toolbar */}
      <section className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 35 calculators by name, biomarker, or formula (e.g. BMR, body fat, VO2 max, pregnancy)..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear search"
            >
              <span className="text-sm font-bold bg-slate-100 dark:bg-slate-800 rounded-full size-5 flex items-center justify-center">✕</span>
            </button>
          )}
        </div>

        {/* Sub-category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCat === tab.id;
            const count = tabCounts[tab.id];
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCat(tab.id)}
                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600/30 dark:bg-emerald-500"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-800"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                <span
                  className={`ml-0.5 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
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
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
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
              className="text-emerald-600 hover:underline font-medium dark:text-emerald-400"
            >
              Reset filters
            </button>
          )}
        </div>
      </section>

      {/* Calculators Card Grid */}
      <section>
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.href}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/60 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-emerald-500/50"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-slate-50 text-2xl border border-slate-100 group-hover:scale-105 group-hover:bg-emerald-50 dark:bg-slate-800 dark:border-slate-700/60 dark:group-hover:bg-emerald-950/40 transition-transform">
                      {tool.icon}
                    </div>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      {tool.categoryLabel}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                    <span>{tool.name}</span>
                    <span className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </h3>

                  <div className="mt-1 mb-2">
                    <span className="inline-block rounded-md bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-[10px] font-medium text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-600/20">
                      {tool.clinicalStandard}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {tool.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="truncate font-mono">{tool.primaryMetric}</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 group-hover:underline">
                    Calculate
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center">
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

      {/* Clinical Decision Tree ("Which Calculator Should I Use?") */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Clinical Decision Guide
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Which Health Calculator Should I Use?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Select your primary metabolic or athletic goal to follow the verified evidence-based tool sequence:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🥗</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Goal: Fat Loss &amp; Deficit</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Follow this 4-tier metabolic sequencing protocol:
            </p>
            <ol className="text-xs space-y-1.5 list-decimal list-inside text-slate-700 dark:text-slate-300 font-medium">
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

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏋️</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Goal: Muscle &amp; Strength</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Optimize hypertrophy, power, and lean tissue preservation:
            </p>
            <ol className="text-xs space-y-1.5 list-decimal list-inside text-slate-700 dark:text-slate-300 font-medium">
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

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">❤️</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Goal: Cardio &amp; Longevity</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Cardiovascular conditioning and all-cause risk profiling:
            </p>
            <ol className="text-xs space-y-1.5 list-decimal list-inside text-slate-700 dark:text-slate-300 font-medium">
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

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌸</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Goal: Reproductive &amp; Family</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Endocrine cycle tracking through prenatal care:
            </p>
            <ol className="text-xs space-y-1.5 list-decimal list-inside text-slate-700 dark:text-slate-300 font-medium">
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

      {/* Master 35-Tool Clinical Comparison Table */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Master Clinical Specifications Comparison Table (All 35 Tools)
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              35 Tools Verified
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Compare target biomarkers, governing clinical algorithms, required physiological inputs, and validated reference standards.
          </p>
          <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium sm:hidden">
            Scroll table horizontally →
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300">
                <th className="py-3 px-3 font-semibold">Calculator</th>
                <th className="py-3 px-3 font-semibold">Sub-Category</th>
                <th className="py-3 px-3 font-semibold">Primary Output Metric</th>
                <th className="py-3 px-3 font-semibold">Governing Formula / Clinical Model</th>
                <th className="py-3 px-3 font-semibold">Required Inputs</th>
                <th className="py-3 px-3 font-semibold">Clinical Standard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
              {HEALTH_TOOLS.map((t) => (
                <tr key={t.slug} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                    <Link href={t.href} className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1.5">
                      <span>{t.icon}</span>
                      <span>{t.name}</span>
                    </Link>
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-700 dark:text-slate-300">
                      {t.categoryLabel}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap font-medium text-emerald-700 dark:text-emerald-300">
                    {t.primaryMetric}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500 dark:text-slate-400 max-w-[280px] truncate" title={t.formula}>
                    {t.formula}
                  </td>
                  <td className="py-2.5 px-3 text-[11px] text-slate-500 dark:text-slate-400 max-w-[220px] truncate" title={t.inputs}>
                    {t.inputs}
                  </td>
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    <span className="rounded bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-[10px] font-medium text-emerald-800 dark:text-emerald-300">
                      {t.clinicalStandard}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Medical Governance & Verification Disclosure */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700/80 pb-3">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-[11px]">
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <strong className="block text-slate-900 dark:text-white font-semibold">100% In-Browser Isolation:</strong>
            Biometric values remain on your local device. Zero server recording, zero telemetry, zero health data transmission.
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <strong className="block text-slate-900 dark:text-white font-semibold">Dual Interactive Visualizations:</strong>
            Every calculator features Graph #1 (result gauge / donut) and Graph #2 (continuous interactive benchmark SVG).
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <strong className="block text-slate-900 dark:text-white font-semibold">Non-Diagnostic Disclaimer:</strong>
            These algorithmic models are provided for informational and fitness tracking purposes and do not replace professional physician diagnosis.
          </div>
        </div>
      </section>

      {/* Expandable FAQs */}
      <section className="space-y-4">
        <div className="text-center space-y-1 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Clinical &amp; Technical Questions
          </h2>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {HEALTH_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs dark:border-slate-800 dark:bg-slate-900"
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
