"use client";

import { useEffect, useMemo, useState } from "react";
import type { Calculator, Category, CategoryId } from "@/lib/calculators";

interface CalculatorsExplorerProps {
  categories: Category[];
  showAllCategoriesOption?: boolean;
  defaultFilter?: CategoryId | "all";
}

type FilterId = CategoryId | "all";

const SEARCH_DEBOUNCE_MS = 250;
/** On phones only the first few cards show until "Show all" is pressed (CSS hides .is-extra). */
const MOBILE_PREVIEW_COUNT = 8;

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}

export default function CalculatorsExplorer({
  categories,
  showAllCategoriesOption = true,
  defaultFilter = "all",
}: CalculatorsExplorerProps) {
  const [activeFilter, setActiveFilter] = useState<FilterId>(defaultFilter);
  const [searchInput, setSearchInput] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedFor, setExpandedFor] = useState<string | null>(null);
  const debouncedSearch = useDebouncedValue(searchInput, SEARCH_DEBOUNCE_MS);

  const allCalculators = useMemo(
    () => categories.flatMap((category) => category.calculators),
    [categories]
  );

  const categoryLabelById = useMemo(
    () => new Map(categories.map((category) => [category.id, category.label])),
    [categories]
  );

  const activeCategory = activeFilter === "all" ? null : categories.find((c) => c.id === activeFilter) ?? null;

  const query = debouncedSearch.trim().toLowerCase();

  const visibleCalculators = useMemo(() => {
    const byCategory: Calculator[] =
      activeFilter === "all" ? allCalculators : allCalculators.filter((calc) => calc.category === activeFilter);

    if (!query) return byCategory;

    return byCategory.filter((calc) => {
      const label = categoryLabelById.get(calc.category) ?? "";
      return calc.name.toLowerCase().includes(query) || label.toLowerCase().includes(query);
    });
  }, [allCalculators, activeFilter, query, categoryLabelById]);

  const listKey = `${activeFilter}|${query}`;
  const expanded = expandedFor === listKey || query !== "";
  const hiddenOnMobile = expanded ? 0 : Math.max(0, visibleCalculators.length - MOBILE_PREVIEW_COUNT);

  const hasActiveFilters = activeFilter !== defaultFilter || searchInput.trim() !== "";

  const resetFilters = () => {
    setActiveFilter(defaultFilter);
    setSearchInput("");
  };

  const headingText = query
    ? `Search Results`
    : activeCategory
      ? `${activeCategory.emoji} ${activeCategory.label} Calculators`
      : "All Calculators";

  return (
    <div className="calc-explorer">
      <aside className="calc-sidebar">
        {/* Search Bar: Always visible on mobile main view & desktop sidebar */}
        <div className="calc-search-wrap">
          <svg
            className="calc-search-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search 341+ calculators…"
            aria-label="Search calculators by name or category"
          />
          {searchInput && (
            <button
              type="button"
              className="calc-search-clear"
              onClick={() => setSearchInput("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Mobile Filter Toggle: Shows selected category name & count */}
        <button
          type="button"
          className="calc-filter-toggle"
          aria-expanded={mobileFiltersOpen}
          onClick={() => setMobileFiltersOpen((open) => !open)}
        >
          <div className="cft-label-wrap">
            <span className="cft-icon">{activeCategory ? activeCategory.emoji : "🗂️"}</span>
            <span className="cft-name truncate">
              {activeCategory ? activeCategory.label : "All Categories"}
            </span>
          </div>
          <div className="cft-right-wrap">
            <span className="cft-badge">
              {visibleCalculators.length}
            </span>
            <span className="cft-chevron">▾</span>
          </div>
        </button>

        {/* Mobile quick action bar when a category is selected */}
        {activeCategory && (
          <div className="calc-mobile-active-category">
            <span className="cmac-current">
              Category: <strong>{activeCategory.label}</strong>
            </span>
            <div className="cmac-actions">
              <button
                type="button"
                className="cmac-reset-btn"
                onClick={() => {
                  setActiveFilter("all");
                  setMobileFiltersOpen(false);
                }}
              >
                ✕ All Categories
              </button>
              <button
                type="button"
                className="cmac-change-btn"
                onClick={() => setMobileFiltersOpen((open) => !open)}
              >
                Change ▾
              </button>
            </div>
          </div>
        )}

        <div className={`calc-sidebar-body${mobileFiltersOpen ? " open" : ""}`}>
          {hasActiveFilters && (
            <div className="calc-sidebar-meta">
              <span className="calc-meta-text">
                {activeCategory ? `${activeCategory.label} (${visibleCalculators.length})` : "Active Filter"}
              </span>
              <button type="button" className="calc-reset-btn" onClick={resetFilters}>
                Reset to All
              </button>
            </div>
          )}

          <ul className="calc-cat-list" role="list">
            {showAllCategoriesOption && (
              <li>
                <button
                  type="button"
                  className={`calc-cat-item${activeFilter === "all" ? " active" : ""}`}
                  aria-pressed={activeFilter === "all"}
                  onClick={() => {
                    setActiveFilter("all");
                    setMobileFiltersOpen(false);
                  }}
                >
                  <span className="calc-cat-item-label">
                    <span>🗂️</span>
                    <span>All Categories</span>
                  </span>
                  <span className="calc-cat-item-count">{allCalculators.length}</span>
                </button>
              </li>
            )}
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  type="button"
                  className={`calc-cat-item${activeFilter === category.id ? " active" : ""}`}
                  aria-pressed={activeFilter === category.id}
                  onClick={() => {
                    setActiveFilter(category.id);
                    setMobileFiltersOpen(false);
                  }}
                >
                  <span className="calc-cat-item-label">
                    <span>{category.emoji}</span>
                    <span>{category.label}</span>
                  </span>
                  <span className="calc-cat-item-count">{category.calculators.length}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="calc-main">
        <div className="calc-main-header">
          <h2>{headingText}</h2>
          <span className="calc-result-count">
            Showing {visibleCalculators.length} of {allCalculators.length} calculators
          </span>
        </div>

        {visibleCalculators.length > 0 ? (
          <>
          <div className="calc-results-grid">
            {visibleCalculators.map((calc, i) => (
              <a
                key={calc.href}
                href={calc.href}
                className={`health-calc-card${!expanded && i >= MOBILE_PREVIEW_COUNT ? " is-extra" : ""}`}
              >
                <div className="health-calc-card-icon">{calc.icon}</div>
                <div>
                  <div className="health-calc-card-name">{calc.name}</div>
                  <div className="health-calc-card-cat">{categoryLabelById.get(calc.category)}</div>
                </div>
              </a>
            ))}
          </div>
          {hiddenOnMobile > 0 && (
            <button type="button" className="calc-show-all" onClick={() => setExpandedFor(listKey)}>
              Show all {visibleCalculators.length} calculators
            </button>
          )}
          </>
        ) : (
          <div className="calc-empty-state">
            <div className="ces-icon">🔍</div>
            <h3>No Calculators Found</h3>
            <p>
              We couldn&apos;t find any calculators matching your search or filter. Try a different
              term or clear your filters.
            </p>
            <button type="button" className="calc-reset-btn" onClick={resetFilters}>
              Clear Search &amp; Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
