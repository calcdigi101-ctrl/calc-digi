"use client";

import { useState } from "react";

interface GlaCategory {
  id: string;
  name: string;
  countedInGla: boolean;
  valuePerSqFtPct: string;
  ansiRule: string;
  typicalSqFt: number;
  color: string;
}

const CATEGORIES: GlaCategory[] = [
  { id: "above_grade", name: "Finished Above-Grade Living Area", countedInGla: true, valuePerSqFtPct: "100% of Base Square Foot Value", ansiRule: "Heated, finished, continuous with house, min 7-ft ceilings.", typicalSqFt: 2200, color: "#10b981" },
  { id: "finished_bsmt", name: "Finished Walkout / Daylight Basement", countedInGla: false, valuePerSqFtPct: "50% – 70% of Above-Grade Value", ansiRule: "Any space with earth above ground level on ANY wall is Below-Grade.", typicalSqFt: 900, color: "#3b82f6" },
  { id: "garage", name: "Attached 2-Car Garage", countedInGla: false, valuePerSqFtPct: "$25 – $45 / sq ft Lump Sum Utility Value", ansiRule: "Unfinished vehicle storage space; strictly excluded from residential GLA.", typicalSqFt: 480, color: "#94a3b8" },
  { id: "porch", name: "Covered / Screened Porch", countedInGla: false, valuePerSqFtPct: "20% – 35% of Living Area Value", ansiRule: "Must be fully enclosed and climate-controlled with permanent HVAC to qualify.", typicalSqFt: 200, color: "#f59e0b" },
];

export function SquareFootageGlaChart() {
  const [active, setActive] = useState<GlaCategory | null>(null);
  const display = active || CATEGORIES[0];
  const isHovering = active !== null;

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-3.5 sm:p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Gross Living Area (GLA) vs Non-Finished Spaces (ANSI Z765 Standards)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isHovering
              ? `Inspecting ${display.name} — ${display.countedInGla ? "COUNTED in official GLA" : "EXCLUDED from official GLA"}`
              : "Visual breakdown of what certified appraisers count towards official heated residential square footage. Hover to inspect."}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 max-w-full break-words dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            {display.name.split("(")[0].trim()}: {display.countedInGla ? "✓ Official GLA (100%)" : "✗ Appraised Separately"}
          </span>
        </div>
      </div>

      <div className="grid gap-3 pt-2 sm:grid-cols-2">
        {CATEGORIES.map((cat) => {
          const isSel = display.id === cat.id;
          return (
            <div
              key={cat.id}
              className={`cursor-pointer rounded-xl p-4 transition-all border ${
                isSel
                  ? "border-emerald-500 bg-emerald-50/60 shadow-md ring-2 ring-emerald-500/20 dark:bg-emerald-950/30 dark:border-emerald-500"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/60"
              }`}
              onMouseEnter={() => setActive(cat)}
              onTouchStart={() => setActive(cat)}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                  <span className="size-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  {cat.name}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    cat.countedInGla
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                  }`}
                >
                  {cat.countedInGla ? "100% GLA" : "Separate Value"}
                </span>
              </div>
              <p className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                Appraisal Value: <span className="text-emerald-600 dark:text-emerald-400">{cat.valuePerSqFtPct}</span>
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                ANSI Rule: {cat.ansiRule}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
