"use client";

import { useState } from "react";

interface Pattern {
  id: string;
  name: string;
  wastePct: number;
  layout: string;
  orderSqFtOn1000: number;
  scrapSqFt: number;
  difficulty: string;
  color: string;
}

const PATTERNS: Pattern[] = [
  { id: "5", name: "Simple Rectangular (Straight Grid)", wastePct: 5, layout: "Standard parallel plank / square tiles", orderSqFtOn1000: 1050, scrapSqFt: 50, difficulty: "Beginner / DIY Friendly", color: "#10b981" },
  { id: "10", name: "Standard Offset / 1/3 Running Bond", wastePct: 10, layout: "Classic staggered joints for planks and subway tile", orderSqFtOn1000: 1100, scrapSqFt: 100, difficulty: "Moderate DIY", color: "#06b6d4" },
  { id: "15", name: "Diagonal 45° Angle", wastePct: 15, layout: "Diamonds or angled planks making rooms feel wider", orderSqFtOn1000: 1150, scrapSqFt: 150, difficulty: "Experienced DIY / Pro", color: "#f59e0b" },
  { id: "20", name: "Herringbone / Chevron / Intricate", wastePct: 20, layout: "90° or 45° interlocking geometric patterns", orderSqFtOn1000: 1200, scrapSqFt: 200, difficulty: "Master Craftsman / Pro Only", color: "#ec4899" },
];

export function FlooringWastePatternChart() {
  const [active, setActive] = useState<Pattern | null>(null);
  const display = active || PATTERNS[1]; // Default to Standard 10%
  const isHovering = active !== null;

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Installation Pattern Waste Comparison (Scrap Factor vs Usable Area)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isHovering
              ? `Inspecting ${display.name} — ${display.wastePct}% scrap buffer (${display.scrapSqFt} sq ft waste on 1k sq ft room)`
              : "Visual breakdown of material purchased vs installed coverage across 4 standard flooring layouts. Hover to inspect."}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            {display.wastePct}% Waste: Order {display.orderSqFtOn1000} sq ft (+{display.scrapSqFt} sq ft cuts)
          </span>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        {PATTERNS.map((p) => {
          const isSel = display.id === p.id;
          return (
            <div
              key={p.id}
              className={`cursor-pointer rounded-xl p-3 transition-all ${
                isSel
                  ? "bg-slate-100 shadow-sm ring-1 ring-slate-900/10 dark:bg-slate-800 dark:ring-white/10"
                  : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
              }`}
              onMouseEnter={() => setActive(p)}
              onTouchStart={() => setActive(p)}
            >
              <div className="mb-1 flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  {p.name}
                </span>
                <span className="font-bold tabular-nums text-slate-900 dark:text-white">
                  {p.wastePct}% Waste ({p.orderSqFtOn1000} sq ft)
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden dark:bg-slate-700 flex">
                <div className="h-full bg-blue-600" style={{ width: `${(1000 / p.orderSqFtOn1000) * 100}%` }} title="Usable floor area" />
                <div className="h-full" style={{ width: `${(p.scrapSqFt / p.orderSqFtOn1000) * 100}%`, backgroundColor: p.color }} title="Scrap offcuts" />
              </div>
              {isSel && (
                <div className="mt-2 flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                  <p>Layout: {p.layout}</p>
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400">Skill: {p.difficulty}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
