"use client";

import { useState } from "react";

interface StateTax {
  id: string;
  name: string;
  rate: number;
  annualTax400k: number;
  monthlyTax: number;
  rank: string;
  barW: number;
  color: string;
}

const STATES: StateTax[] = [
  { id: "nj", name: "New Jersey", rate: 2.23, annualTax400k: 8920, monthlyTax: 743, rank: "#1 Highest in US", barW: 540, color: "#ef4444" },
  { id: "il", name: "Illinois", rate: 2.08, annualTax400k: 8320, monthlyTax: 693, rank: "#2 in US", barW: 504, color: "#f87171" },
  { id: "tx", name: "Texas", rate: 1.68, annualTax400k: 6720, monthlyTax: 560, rank: "#6 (No State Income Tax)", barW: 407, color: "#fb923c" },
  { id: "us", name: "US National Average", rate: 1.02, annualTax400k: 4080, monthlyTax: 340, rank: "Benchmark Baseline", barW: 247, color: "#3b82f6" },
  { id: "fl", name: "Florida", rate: 0.91, annualTax400k: 3640, monthlyTax: 303, rank: "#27 (Save Our Homes Cap)", barW: 220, color: "#10b981" },
  { id: "ca", name: "California", rate: 0.71, annualTax400k: 2840, monthlyTax: 237, rank: "#36 (Prop 13 Base Cap)", barW: 172, color: "#06b6d4" },
  { id: "hi", name: "Hawaii", rate: 0.32, annualTax400k: 1280, monthlyTax: 107, rank: "#50 Lowest in US", barW: 78, color: "#10b981" },
];

export function PropertyTaxStateRankingsChart() {
  const [active, setActive] = useState<StateTax | null>(null);
  const display = active || STATES[0]; // Default to NJ
  const isHovering = active !== null;

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Effective Property Tax Rates by US State (Benchmark Comparison)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isHovering
              ? `Inspecting ${display.name} — ${display.rate}% effective rate | Annual tax on $400k home: $${display.annualTax400k.toLocaleString()}/yr`
              : "Effective percentage rate paid annually on median home values across high, moderate, and low-tax states. Hover bars to inspect."}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            {display.name}: {display.rate}% (${display.annualTax400k.toLocaleString()}/yr · ${display.monthlyTax}/mo)
          </span>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        {STATES.map((st) => {
          const isSel = display.id === st.id;
          return (
            <div
              key={st.id}
              className={`cursor-pointer rounded-xl p-2.5 transition-all ${
                isSel
                  ? "bg-slate-100 shadow-sm ring-1 ring-slate-900/10 dark:bg-slate-800 dark:ring-white/10"
                  : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
              }`}
              onMouseEnter={() => setActive(st)}
              onTouchStart={() => setActive(st)}
            >
              <div className="mb-1 flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: st.color }} />
                  {st.name} <span className="text-[11px] font-normal text-slate-500">({st.rank})</span>
                </span>
                <span className="font-bold tabular-nums text-slate-900 dark:text-white">
                  {st.rate}% (${st.annualTax400k.toLocaleString()}/yr · ${st.monthlyTax}/mo)
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden dark:bg-slate-700">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${(st.rate / 2.3) * 100}%`,
                    backgroundColor: st.color,
                    filter: isSel ? "brightness(1.15)" : "none",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
