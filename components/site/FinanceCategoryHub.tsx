"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  type FinanceCategory,
  type FinanceTool,
  FINANCE_TOOLS,
  FINANCE_TABS,
  FINANCE_FAQS,
} from "@/lib/financeTools";

export { FINANCE_TOOLS, FINANCE_TABS, FINANCE_FAQS };
export type { FinanceCategory, FinanceTool };

export function FinanceCategoryHub() {
  const [selectedCat, setSelectedCat] = useState<FinanceCategory>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Filter tools by active tab and search query
  const filteredTools = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return FINANCE_TOOLS.filter((tool) => {
      const matchesCat = selectedCat === "all" || tool.category === selectedCat;
      if (!matchesCat) return false;
      if (!q) return true;

      const inName = tool.name.toLowerCase().includes(q);
      const inDesc = tool.shortDesc.toLowerCase().includes(q);
      const inStd = tool.regulatoryStandard.toLowerCase().includes(q);
      const inFormula = tool.formula.toLowerCase().includes(q);
      const inMetric = tool.primaryMetric.toLowerCase().includes(q);
      const inKeywords = tool.keywords.some((k) => k.toLowerCase().includes(q));

      return inName || inDesc || inStd || inFormula || inMetric || inKeywords;
    });
  }, [selectedCat, searchQuery]);

  // Tab counts
  const tabCounts = useMemo(() => {
    const counts: Record<FinanceCategory, number> = {
      all: FINANCE_TOOLS.length,
      mortgages: 0,
      loans: 0,
      investing: 0,
      retirement: 0,
      taxes: 0,
      business: 0,
    };
    FINANCE_TOOLS.forEach((t) => {
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
              Finance Calculators
            </span>
          </nav>

          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/90 dark:bg-emerald-950/80 px-3.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300 ring-1 ring-emerald-600/20">
            <span>💰</span> 40 Free Financial Calculators · 100% Client-Side Privacy
          </div>

          {/* Main H1 Title */}
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
            Finance &amp; Money <em className="text-emerald-600 dark:text-emerald-400 not-italic">Calculators</em>
          </h1>

          {/* Concise 1-Sentence Subtitle (15 words) */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            40 free, instant financial calculators for mortgages, loans, compound interest, retirement planning, and 2026 taxes.
          </p>

          {/* 4 Clean Stat Counters */}
          <div className="flex items-center justify-center gap-6 sm:gap-12 flex-wrap pt-6 mt-6 border-t border-slate-200/80 dark:border-slate-800">
            <div className="text-center min-w-[70px]">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">40</div>
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-1">Calculators</div>
            </div>
            <div className="text-center min-w-[70px]">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">6</div>
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
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search financial calculators (e.g. Mortgage, 401k, Loan, Tax)..."
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-medium outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-2xs transition-all"
            aria-label="Search financial calculators"
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

        {/* Sub-category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {FINANCE_TABS.map((tab) => {
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
            Showing <strong className="text-slate-900 dark:text-white">{filteredTools.length}</strong> of {FINANCE_TOOLS.length} calculators
            {selectedCat !== "all" ? ` in ${FINANCE_TABS.find((t) => t.id === selectedCat)?.label}` : ""}
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
                      {tool.regulatoryStandard}
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
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center">
            <span className="text-3xl">🔍</span>
            <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">No calculators found</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              No financial tools matched &ldquo;{searchQuery}&rdquo;. Try searching for &ldquo;mortgage&rdquo;, &ldquo;loan&rdquo;, or &ldquo;compound interest&rdquo;.
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

      {/* 4. FINANCIAL DECISION GUIDE (GENEROUS 4-COLUMN CARD GRID WITH py-12 SECTION PADDING) */}
      <section className="mt-16 sm:mt-20 py-8 sm:py-12 border-t border-slate-200/80 dark:border-slate-800">
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Financial Decision Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Which Financial Calculator Should I Use?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            Follow the optimal, verified sequencing pathways based on your immediate financial objective:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3.5">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🏠</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Home Buying Journey</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Evaluate purchasing readiness from qualification to mortgage closing:
            </p>
            <ol className="text-xs space-y-2 list-decimal list-inside text-slate-700 dark:text-slate-300 font-medium">
              <li>
                <Link href="/calculators/finance/home-affordability-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Home Affordability
                </Link> (28/36 DTI limit)
              </li>
              <li>
                <Link href="/calculators/finance/down-payment-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Down Payment
                </Link> (Target 20% vs PMI)
              </li>
              <li>
                <Link href="/calculators/finance/mortgage-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Mortgage Calculator
                </Link> (PITI &amp; Amortization)
              </li>
              <li>
                <Link href="/calculators/finance/rent-vs-buy-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Rent vs Buy
                </Link> (Break-even horizon)
              </li>
            </ol>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3.5">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">💳</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Debt Payoff &amp; Credit</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Eliminate high-interest obligations and accelerate freedom:
            </p>
            <ol className="text-xs space-y-2 list-decimal list-inside text-slate-700 dark:text-slate-300 font-medium">
              <li>
                <Link href="/calculators/finance/credit-card-payoff-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Credit Card Payoff
                </Link> (Interest savings)
              </li>
              <li>
                <Link href="/calculators/finance/debt-payoff-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Debt Payoff
                </Link> (Avalanche vs Snowball)
              </li>
              <li>
                <Link href="/calculators/finance/apr-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  APR Calculator
                </Link> (Borrowing cost fee)
              </li>
              <li>
                <Link href="/calculators/finance/budget-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Budget Calculator
                </Link> (50/30/20 allocation)
              </li>
            </ol>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3.5">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">📈</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Wealth &amp; Investing</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Compound wealth and project long-term portfolio returns:
            </p>
            <ol className="text-xs space-y-2 list-decimal list-inside text-slate-700 dark:text-slate-300 font-medium">
              <li>
                <Link href="/calculators/finance/compound-interest-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Compound Interest
                </Link> (Future value)
              </li>
              <li>
                <Link href="/calculators/finance/investment-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Investment Calculator
                </Link> (Purchasing power)
              </li>
              <li>
                <Link href="/calculators/finance/dividend-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Dividend Calculator
                </Link> (DRIP compounding)
              </li>
              <li>
                <Link href="/calculators/finance/net-worth-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Net Worth Tracker
                </Link> (Assets vs Liabilities)
              </li>
            </ol>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-3.5">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🌅</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Retirement &amp; Tax</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Maximize tax-advantaged accounts and secure your nest egg:
            </p>
            <ol className="text-xs space-y-2 list-decimal list-inside text-slate-700 dark:text-slate-300 font-medium">
              <li>
                <Link href="/calculators/finance/401k-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  401(k) Calculator
                </Link> (Capture employer match)
              </li>
              <li>
                <Link href="/calculators/finance/roth-ira-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Roth IRA
                </Link> (Tax-free retirement)
              </li>
              <li>
                <Link href="/calculators/finance/retirement-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Retirement Calculator
                </Link> (4% rule nest egg)
              </li>
              <li>
                <Link href="/calculators/finance/social-security-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Social Security
                </Link> (Age 62 vs 70 benefit)
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* 5. MASTER 40-TOOL COMPARISON TABLE (WRAPPED IN COLLAPSIBLE ACCORDION TO AVOID ENDLESS PAGE STRETCH) */}
      <section className="mt-16 sm:mt-20">
        <details className="group rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 overflow-hidden shadow-2xs">
          <summary className="flex cursor-pointer items-center justify-between p-5 sm:p-6 font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors select-none">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📊</span>
              <div className="text-left">
                <h2 className="text-base sm:text-lg font-bold">
                  Master Financial Specifications Comparison Table (All 40 Tools)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                  Complete regulatory formulas, mathematical definitions, and standards benchmark
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                40 Tools
              </span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform text-xs">▼</span>
            </div>
          </summary>

          <div className="border-t border-slate-200 dark:border-slate-800 p-5 sm:p-6 max-h-[500px] overflow-y-auto overflow-x-auto scrollbar-thin">
            <div className="mb-3 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Scroll horizontally or vertically to review specifications for all 40 verified calculators.</span>
            </div>
            <table className="w-full min-w-[700px] text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300">
                  <th className="py-3 px-3 font-semibold">Calculator</th>
                  <th className="py-3 px-3 font-semibold">Sub-Category</th>
                  <th className="py-3 px-3 font-semibold">Primary Output Metric</th>
                  <th className="py-3 px-3 font-semibold">Governing Formula / Financial Model</th>
                  <th className="py-3 px-3 font-semibold">Required Inputs</th>
                  <th className="py-3 px-3 font-semibold">Regulatory Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                {FINANCE_TOOLS.map((t) => (
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
                        {t.regulatoryStandard}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </section>

      {/* 6. CORE MATHEMATICAL EQUATIONS & REGULATORY RULES (MOVED BELOW GRID) */}
      <section className="mt-16 sm:mt-20 rounded-2xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/50 to-white p-6 sm:p-8 shadow-2xs dark:border-emerald-900/50 dark:from-emerald-950/20 dark:to-slate-900">
        <div className="flex items-start gap-3.5">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-lg shadow-xs">
            💡
          </div>
          <div className="space-y-3 flex-1 min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Direct Financial Summary: Core Mathematical Equations &amp; Regulatory Rules
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Every tool on this hub is calibrated to regulatory lending and accounting standards established by the <strong>Consumer Financial Protection Bureau (CFPB)</strong>, <strong>Internal Revenue Service (IRS)</strong>, and <strong>Federal Reserve Board</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">Amortized Payment:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-xs">M = P [r(1+r)ⁿ] / [(1+r)ⁿ - 1]</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">Compound Growth:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-xs">A = P(1 + r/n)ⁿᵗ + PMT [((1+r/n)ⁿᵗ - 1) / (r/n)]</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">Rule of 72 Doubling:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-xs">Years to Double ≈ 72 / Annual Interest Rate (%)</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">Debt-to-Income (DTI):</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-xs">Back-End DTI = Total Monthly Debt / Gross Income ≤ 36%–43%</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">Roth IRA &amp; 401(k) Limits:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-xs">2026 401(k) Limit $23,500 | IRA Limit $7,000 (+$1,000 age 50+)</span>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">Cap Rate &amp; ROI:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-xs">Cap Rate = Net Operating Income (NOI) / Current Asset Value</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINANCIAL GOVERNANCE & VERIFICATION DISCLOSURE */}
      <section className="mt-16 sm:mt-20 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700/80 pb-3">
          <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <span>🛡️</span> Financial Governance, Algorithmic Auditing &amp; Statutory Standards
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Audit Benchmark: CFPB Reg Z · IRS Rev. Proc. 2025-52 · Q4 2026
          </div>
        </div>
        <p className="leading-relaxed">
          CalcDigi financial calculation engines implement exact amortization formulas and statutory rules governing consumer credit disclosure under the <strong>Truth in Lending Act (TILA / Regulation Z)</strong>, <strong>Real Estate Settlement Procedures Act (RESPA)</strong>, and <strong>Internal Revenue Code (IRC Sections 401, 408A, 1031)</strong>. Tax brackets reflect official 2026 cost-of-living adjustments published by the IRS.
        </p>
        <p className="leading-relaxed">
          All calculations are processed 100% on client-side WebAssembly and JavaScript engines. No personal financial details, account numbers, or calculation results are ever transmitted to external servers or stored in persistent databases.
        </p>
      </section>

      {/* 8. EXPANDABLE FAQS */}
      <section className="mt-16 sm:mt-20 space-y-4">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Financial Calculations &amp; Methodology FAQ
          </h2>
        </div>

        <div className="space-y-3 max-w-4xl mx-auto">
          {FINANCE_FAQS.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-5 text-left font-bold text-slate-900 dark:text-white text-sm sm:text-base flex items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <span className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}>
                    ▾
                  </span>
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 mt-2">
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
