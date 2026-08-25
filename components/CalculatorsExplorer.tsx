"use client";

import { useMemo, useState } from "react";
import type { Category, CategoryId } from "@/lib/calculators";

interface CalculatorsExplorerProps {
  categories: Category[];
}

type FilterId = CategoryId | "all";

export default function CalculatorsExplorer({ categories }: CalculatorsExplorerProps) {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const allCalculators = useMemo(
    () => categories.flatMap((category) => category.calculators),
    [categories]
  );

  const categoryLabelById = useMemo(
    () => new Map(categories.map((category) => [category.id, category.label])),
    [categories]
  );

  const visibleCalculators = useMemo(
    () =>
      activeFilter === "all"
        ? allCalculators
        : allCalculators.filter((calc) => calc.category === activeFilter),
    [allCalculators, activeFilter]
  );

  return (
    <>
      <div className="cat-tabs" role="tablist" aria-label="Filter calculators by category">
        <button
          type="button"
          className={`cat-tab${activeFilter === "all" ? " active" : ""}`}
          role="tab"
          aria-selected={activeFilter === "all"}
          onClick={() => setActiveFilter("all")}
        >
          All ({allCalculators.length})
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`cat-tab${activeFilter === category.id ? " active" : ""}`}
            role="tab"
            aria-selected={activeFilter === category.id}
            onClick={() => setActiveFilter(category.id)}
          >
            {category.emoji} {category.label} ({category.calculators.length})
          </button>
        ))}
      </div>

      {visibleCalculators.length > 0 ? (
        <div className="health-all-grid">
          {visibleCalculators.map((calc) => (
            <a key={calc.href} href={calc.href} className="health-calc-card">
              <div className="health-calc-card-icon">{calc.icon}</div>
              <div>
                <div className="health-calc-card-name">{calc.name}</div>
                <div className="health-calc-card-cat">{categoryLabelById.get(calc.category)}</div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: 40, color: "var(--c-ink3)" }}>
          No calculators found in this category.
        </div>
      )}
    </>
  );
}
