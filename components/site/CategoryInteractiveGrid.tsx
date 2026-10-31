"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { type Category, type CategoryId, categoryPath } from "@/lib/calculators";

interface CategoryInteractiveGridProps {
  currentCategoryId: CategoryId;
  category: Category;
  allCategories: Category[];
}

export function CategoryInteractiveGrid({
  currentCategoryId,
  category,
  allCategories,
}: CategoryInteractiveGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  // Filter calculators by search query
  const filteredCalculators = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return category.calculators;
    return category.calculators.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q)
    );
  }, [searchQuery, category.calculators]);

  return (
    <div className="w-full">
      {/* Search & Category Switcher Toolbar */}
      <div className="mb-6 space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
          {/* Category Switcher Dropdown Button */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-haspopup="true"
              className="w-full sm:w-auto h-11 px-3.5 sm:px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between sm:justify-start gap-2.5 shadow-2xs hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all cursor-pointer min-h-[44px]"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-base shrink-0">{category.emoji}</span>
                <span className="truncate max-w-[190px] sm:max-w-[210px]">{category.label}</span>
              </div>
              <span className={`text-xs text-slate-400 shrink-0 transition-transform ${menuOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>

            {/* 20-Category Dropdown Popover */}
            {menuOpen && (
              <div className="absolute left-0 sm:left-0 top-12 z-40 w-72 sm:w-80 max-h-[380px] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-xl space-y-1 transition-all">
                {/* All Calculators Link */}
                <Link
                  href="/calculators"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span>✨</span>
                    <span>All Calculators (341+ Tools)</span>
                  </div>
                  <span className="text-xs">→</span>
                </Link>

                <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
                  Switch Category (20 Hubs)
                </div>

                <div className="space-y-0.5 max-h-[260px] overflow-y-auto">
                  {allCategories.map((c) => {
                    const isCurrent = c.id === currentCategoryId;
                    return (
                      <Link
                        key={c.id}
                        href={categoryPath(c.id)}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center justify-between px-2.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                          isCurrent
                            ? "bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-semibold"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate min-w-0">
                          <span className="shrink-0">{c.emoji}</span>
                          <span className="truncate">{c.label}</span>
                        </div>
                        <span className="text-xs text-slate-400 dark:text-slate-500 ml-2 shrink-0">
                          {c.calculators.length}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Search Bar - 16px font on mobile to prevent iOS auto-zoom */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
              <svg className="size-4.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search in ${category.label} calculators...`}
              className="w-full h-11 pl-10 pr-9 text-base sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-slate-900 dark:text-white"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Results Counter / Filter Indicator */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1 pt-0.5">
          <span>
            Showing <strong className="text-slate-900 dark:text-white">{filteredCalculators.length}</strong> of {category.calculators.length} {category.label} calculators
            {searchQuery ? ` matching "${searchQuery}"` : ""}
          </span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-emerald-600 hover:underline font-semibold dark:text-emerald-400 min-h-[32px] inline-flex items-center"
            >
              Reset search
            </button>
          )}
        </div>
      </div>

      {/* Calculator Grid */}
      {filteredCalculators.length > 0 ? (
        <div className="calc-grid">
          {filteredCalculators.map((c) => (
            <Link key={c.href} href={c.href} className="cat-card group">
              <div className="cat-card-icon group-hover:scale-105 transition-transform" aria-hidden>
                {c.icon}
              </div>
              <div className="cat-card-name group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {c.name}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-8 text-center bg-white dark:bg-slate-900/50 my-4">
          <span className="text-3xl">🔍</span>
          <h3 className="mt-2 text-base font-bold text-slate-900 dark:text-white">
            No calculators found in {category.label}
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            No tools matched &ldquo;{searchQuery}&rdquo;. Try another search keyword or search across all 341+ calculators on CalcDigi.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 min-h-[36px]"
            >
              Clear Search
            </button>
            <Link
              href={`/calculators?q=${encodeURIComponent(searchQuery)}`}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-500 min-h-[36px] inline-flex items-center gap-1.5"
            >
              <span>Search All 341+ Calculators</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
