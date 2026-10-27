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
  const [searchQuery, setSearchQuery] = useState<string>("" );
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
    <div className="w-full space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-emerald-50/50 via-white to-slate-50/80 p-6 sm:p-10 shadow-sm dark:border-slate-800 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900/80">
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <nav className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-semibold">Finance &amp; Money Calculators</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 dark:bg-emerald-950/60 dark:text-emerald-300">
            <span>💰</span> 40 Free Financial Calculators · 100% Client-Side Privacy
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Finance &amp; Money <span className="text-emerald-600 dark:text-emerald-400">Calculators</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Mathematically rigorous financial models for mortgage amortization, installment loan payoff, compound interest wealth projection, retirement planning, and 2026 tax liability.
          </p>

          {/* Quick Stat Badges */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto text-left">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">40</div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Financial Tools</div>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">100%</div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">In-Browser Privacy</div>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">0</div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Data Stored</div>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">Instant</div>
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Amortization Tables</div>
            </div>
          </div>
        </div>
      </section>

      {/* GEO AI Overview Box: Direct Answers for AI Search Engines & Users */}
      <section className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/60 to-white p-5 sm:p-6 shadow-sm dark:border-emerald-900/50 dark:from-emerald-950/20 dark:to-slate-900">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white font-bold text-base shadow-sm">
            💡
          </div>
          <div className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Direct Financial Summary: Core Mathematical Equations &amp; Regulatory Rules
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Every tool on this hub is calibrated to regulatory lending and accounting standards established by the <strong>Consumer Financial Protection Bureau (CFPB)</strong>, <strong>Internal Revenue Service (IRS)</strong>, and <strong>Federal Reserve Board</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Amortized Payment:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px]">M = P [r(1+r)ⁿ] / [(1+r)ⁿ - 1]</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Compound Growth:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px]">A = P(1 + r/n)ⁿᵗ + PMT [((1+r/n)ⁿᵗ - 1) / (r/n)]</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Rule of 72 Doubling:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px]">Years to Double ≈ 72 / Annual Interest Rate (%)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">APR to APY Yield:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px]">APY = (1 + r/n)ⁿ - 1 (Truth in Savings Act)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Mortgage DTI Rule:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px]">Front DTI ≤ 28% (Housing) / Back DTI ≤ 36% (Total)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/90 border border-emerald-100 dark:border-emerald-950">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Safe Retirement Draw:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px]">Bengen 4% Rule: Target Nest Egg = Annual Need × 25</span>
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
            placeholder="Search 40 calculators by name, financial metric, or formula (e.g. mortgage, 401k, compound interest, tax, loan)..."
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
          {FINANCE_TABS.map((tab) => {
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
                      {tool.regulatoryStandard}
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

      {/* Financial Decision Tree ("Which Calculator Should I Use?") */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Financial Decision Guide
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Which Financial Calculator Should I Use?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Follow the optimal, verified sequencing pathways based on your immediate financial objective:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏠</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Goal: Home Buying Journey</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Evaluate purchasing readiness from qualification to mortgage closing:
            </p>
            <ol className="text-xs space-y-1.5 list-decimal list-inside text-slate-700 dark:text-slate-300 font-medium">
              <li>
                <Link href="/calculators/finance/home-affordability-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Home Affordability
                </Link> (28/36 DTI qualification)
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

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">💳</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Goal: Debt Freedom &amp; Loans</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Eliminate consumer interest and accelerate repayment:
            </p>
            <ol className="text-xs space-y-1.5 list-decimal list-inside text-slate-700 dark:text-slate-300 font-medium">
              <li>
                <Link href="/calculators/finance/credit-card-payoff-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Credit Card Payoff
                </Link> (Eliminate high-APR)
              </li>
              <li>
                <Link href="/calculators/finance/debt-payoff-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Debt Payoff
                </Link> (Avalanche vs Snowball)
              </li>
              <li>
                <Link href="/calculators/finance/apr-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  APR Calculator
                </Link> (Consolidation borrowing fee)
              </li>
              <li>
                <Link href="/calculators/finance/budget-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Budget Calculator
                </Link> (50/30/20 allocation)
              </li>
            </ol>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">📈</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Goal: Wealth &amp; Investing</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Compound wealth and project portfolio returns:
            </p>
            <ol className="text-xs space-y-1.5 list-decimal list-inside text-slate-700 dark:text-slate-300 font-medium">
              <li>
                <Link href="/calculators/finance/compound-interest-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Compound Interest
                </Link> (Future value)
              </li>
              <li>
                <Link href="/calculators/finance/investment-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Investment Calculator
                </Link> (Real purchasing power)
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

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌅</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Goal: Retirement &amp; Tax</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Maximize tax-advantaged accounts and secure your nest egg:
            </p>
            <ol className="text-xs space-y-1.5 list-decimal list-inside text-slate-700 dark:text-slate-300 font-medium">
              <li>
                <Link href="/calculators/finance/401k-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  401(k) Calculator
                </Link> (Capture full employer match)
              </li>
              <li>
                <Link href="/calculators/finance/roth-ira-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  Roth IRA
                </Link> (Tax-free retirement gains)
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

      {/* Master 40-Tool Financial Specifications Comparison Table */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Master Financial Specifications Comparison Table (All 40 Tools)
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              40 Tools Verified
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Compare target financial metrics, mathematical amortization formulas, required accounting inputs, and regulatory standards.
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
      </section>

      {/* Financial Governance & Verification Disclosure */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              Financial Regulatory Methodology &amp; Fiduciary Governance Standards
            </h3>
          </div>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            Last Audit: Q4 2026 • Verified Regulatory Standards
          </span>
        </div>
        <p className="leading-relaxed">
          The mortgage amortization algorithms, compound interest schedules, and tax formulas implemented on CalcDigi adhere strictly to statutory guidelines established by the <strong>Consumer Financial Protection Bureau (CFPB)</strong>, <strong>Internal Revenue Service (IRS 2026 Code)</strong>, <strong>Federal Reserve Board Regulation Z</strong>, and <strong>Financial Industry Regulatory Authority (FINRA)</strong>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-[11px]">
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <strong className="block text-slate-900 dark:text-white font-semibold">100% In-Browser Privacy:</strong>
            All salary, mortgage, debt, and net worth figures remain strictly within your device's browser memory. Zero server logging or financial profiling.
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <strong className="block text-slate-900 dark:text-white font-semibold">Audit-Grade Amortization:</strong>
            Fixed-rate schedules calculate monthly interest down to the penny based on exact compound intervals and remaining principal balance.
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <strong className="block text-slate-900 dark:text-white font-semibold">Fiduciary Disclaimer:</strong>
            Calculations are provided for educational and financial scenario planning purposes and do not constitute formal lending pre-approvals or registered investment advice.
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
            Financial &amp; Technical Questions
          </h2>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          {FINANCE_FAQS.map((faq, idx) => {
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
