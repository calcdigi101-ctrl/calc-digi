"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, CheckCircle2, Clock, Search, Sparkles, X } from "lucide-react";
import type { Article } from "@/lib/articles";

export function BlogDirectory({ articles }: { articles: Article[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => set.add(a.category));
    return ["All", ...Array.from(set)];
  }, [articles]);

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" || article.category.toLowerCase() === selectedCategory.toLowerCase();
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const featured = useMemo(() => {
    return articles.find((a) => a.featured) ?? articles[0];
  }, [articles]);

  const showFeaturedHero = selectedCategory === "All" && !searchQuery.trim() && featured;
  const gridArticles = showFeaturedHero
    ? filteredArticles.filter((a) => a.slug !== featured?.slug)
    : filteredArticles;

  return (
    <div className="space-y-12">
      {/* Search & Category Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, formulas, or topics..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Result Count Badge */}
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap self-end sm:self-center">
            Showing {filteredArticles.length} {filteredArticles.length === 1 ? "Guide" : "Guides"}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#18533b] text-white shadow-xs"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700"
                }`}
              >
                {cat === "All" ? `All Guides (${articles.length})` : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Editorial Hero (Visible on Default View) */}
      {showFeaturedHero && (
        <div className="relative overflow-hidden rounded-[28px] border border-emerald-200/80 dark:border-emerald-800/60 bg-gradient-to-br from-[#f2f9f5] via-white to-emerald-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20 p-6 sm:p-9 shadow-xs hover:shadow-md transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#18533b]/10 text-[#18533b] dark:bg-emerald-900/40 dark:text-emerald-300">
                ⭐ FEATURED EDITORIAL
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                {featured.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {featured.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5 text-emerald-600" />
                  {featured.read_minutes} min read
                </span>
                <span>•</span>
                <span className="font-semibold text-emerald-800 dark:text-emerald-300">{featured.category}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="size-3.5 text-emerald-600" />
                  Actuarial Verified
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Link
                  href={`/pages/blog/${featured.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#18533b] hover:bg-[#13422f] text-white font-semibold text-sm transition-all shadow-xs hover:shadow-md cursor-pointer"
                >
                  Read Full Guide
                  <ArrowRight className="size-4" />
                </Link>

                {featured.related_calculator_url && (
                  <Link
                    href={featured.related_calculator_url}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600 text-slate-700 dark:text-slate-200 font-medium text-sm transition-all"
                  >
                    <Calculator className="size-4 text-emerald-600" />
                    Open Calculator
                  </Link>
                )}
              </div>
            </div>

            {/* Right Graphic Box: 28/36 Rule Visual Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-white dark:bg-slate-800/90 rounded-2xl border border-emerald-100 dark:border-slate-700/80 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Underwriting Metric
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                    2026 Standards
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/50">
                    <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Front-End DTI
                    </div>
                    <div className="text-2xl font-bold text-[#18533b] dark:text-emerald-400">28%</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Max PITI Housing Cap
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-700/50">
                    <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                      Back-End DTI
                    </div>
                    <div className="text-2xl font-bold text-[#18533b] dark:text-emerald-400">36%</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Total Debt Ceiling
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal bg-emerald-50/50 dark:bg-slate-900/40 p-3 rounded-xl border border-emerald-100/60 dark:border-slate-700/40">
                  💡 <strong>Rule of Thumb:</strong> Lenders cap total monthly housing at 28% of gross income to ensure room for maintenance, emergency savings, and retirement.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Articles */}
      {gridArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridArticles.map((article) => (
            <article
              key={article.slug}
              className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Banner Header with Soft Gradient & Emoji */}
                <div className="h-36 bg-gradient-to-br from-emerald-50/70 via-slate-50 to-teal-50/50 dark:from-slate-800 dark:to-emerald-950/30 p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60">
                  <div className="w-14 h-14 rounded-2xl bg-white/95 dark:bg-slate-800/90 shadow-2xs border border-slate-100 dark:border-slate-700 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                    {article.cover_emoji}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    <Clock className="size-3 text-emerald-600" />
                    {article.read_minutes} min read
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="text-[11px] font-bold tracking-wider uppercase text-emerald-700 dark:text-emerald-400 mb-2">
                    {article.category}
                  </div>

                  <h3 className="font-serif font-bold text-slate-900 dark:text-white text-lg sm:text-[19px] mb-2.5 leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    <Link href={`/pages/blog/${article.slug}`}>{article.title}</Link>
                  </h3>

                  <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-auto flex items-center justify-between gap-2">
                <Link
                  href={`/pages/blog/${article.slug}`}
                  className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 group-hover:underline inline-flex items-center gap-1"
                >
                  Read Guide
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>

                {article.related_calculator_url && (
                  <Link
                    href={article.related_calculator_url}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-300 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200/80 dark:border-slate-700"
                  >
                    <Calculator className="size-3 text-emerald-600" />
                    Calculator
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <BookOpen className="size-12 mx-auto text-slate-300 dark:text-slate-600" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No articles found</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            We couldn't find any guides matching &ldquo;{searchQuery}&rdquo;. Try searching for mortgage, compound interest, BMI, or tax.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* AI Assistant Help Banner at Bottom */}
      <div
        className="rounded-[28px] text-white p-7 sm:p-10 shadow-md"
        style={{ background: "linear-gradient(135deg, #064e3b 0%, #18533b 60%, #042f2e 100%)" }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-emerald-100 border border-white/20">
              <Sparkles className="size-3.5 text-emerald-300" />
              Need Help With Your Specific Situation?
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">Ask the CalcDigi AI Assistant</h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
              Not sure which calculator fits your numbers or want an instant walkthrough of a formula? Our assistant is ready to help 24/7.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/#ai-assistant"
              style={{ color: "#18533b" }}
              className="whitespace-nowrap px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 font-bold text-sm shadow-sm transition-all"
            >
              Try AI Assistant →
            </Link>
            <Link
              href="/calculators"
              className="whitespace-nowrap px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
            >
              All 341+ Tools
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
