"use client";

import { useState } from "react";

interface Category {
  id: string;
  name: string;
  pct: number;
  kwh: number;
  cost: number;
  barW: number;
  color: string;
  tip: string;
}

const CATEGORIES: Category[] = [
  { id: "cooling", name: "Heating & Air Conditioning", pct: 44, kwh: 396, cost: 67.3, barW: 240, color: "#3b82f6", tip: "Use programmable thermostat to save 10%/yr" },
  { id: "water", name: "Water Heating", pct: 14, kwh: 126, cost: 21.4, barW: 105, color: "#06b6d4", tip: "Lower temperature to 120°F (49°C)" },
  { id: "appliances", name: "Major Appliances & Cooking", pct: 12, kwh: 108, cost: 18.4, barW: 90, color: "#10b981", tip: "Run dishwashers & laundry off-peak" },
  { id: "lighting", name: "Lighting & Fixtures", pct: 9, kwh: 81, cost: 13.8, barW: 70, color: "#f59e0b", tip: "Convert to LEDs (saves up to 75% energy)" },
  { id: "refrig", name: "Refrigeration", pct: 7, kwh: 63, cost: 10.7, barW: 55, color: "#8b5cf6", tip: "Keep coils clean and seal intact" },
  { id: "electronics", name: "Electronics & Vampire Draw", pct: 14, kwh: 126, cost: 21.4, barW: 105, color: "#ec4899", tip: "Use smart power strips to cut standby power" },
];

export function ElectricityBreakdownChart() {
  const [active, setActive] = useState<Category | null>(null);
  const display = active || CATEGORIES[0];
  const isHovering = active !== null;

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-3.5 sm:p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight dark:text-white">
            Where Home Electricity Goes: Typical Household Breakdown
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isHovering
              ? `Inspecting ${display.name} — ${display.pct}% of total bill ($${display.cost.toFixed(2)}/mo)`
              : "Percentage of total residential electricity consumption by end-use category (US EIA Survey). Hover bars to inspect."}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            {display.name}: {display.pct}% (${display.cost.toFixed(1)}/mo · {display.kwh} kWh)
          </span>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        {CATEGORIES.map((cat) => {
          const isSel = display.id === cat.id;
          return (
            <div
              key={cat.id}
              className={`group cursor-pointer rounded-xl p-2.5 transition-all ${
                isSel
                  ? "bg-slate-100 shadow-sm ring-1 ring-slate-900/10 dark:bg-slate-800 dark:ring-white/10"
                  : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
              }`}
              onMouseEnter={() => setActive(cat)}
              onTouchStart={() => setActive(cat)}
            >
              <div className="mb-1.5 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm gap-0.5 sm:gap-2">
                <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  {cat.name}
                </span>
                <span className="font-bold tabular-nums text-slate-900 dark:text-white">
                  {cat.pct}% ({cat.kwh} kWh/mo · ${cat.cost.toFixed(2)})
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden dark:bg-slate-700">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${cat.pct * 2.2}%`,
                    backgroundColor: cat.color,
                    filter: isSel ? "brightness(1.15)" : "none",
                  }}
                />
              </div>
              {isSel && (
                <p className="mt-1.5 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  💡 <span className="font-medium">{cat.tip}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
