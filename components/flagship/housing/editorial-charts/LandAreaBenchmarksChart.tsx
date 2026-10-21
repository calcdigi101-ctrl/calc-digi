"use client";

import { useState } from "react";

interface LandParcel {
  id: string;
  name: string;
  acres: number;
  sqft: number;
  sqm: number;
  comparison: string;
  color: string;
}

const PARCELS: LandParcel[] = [
  { id: "qtr", name: "1/4 Acre Lot", acres: 0.25, sqft: 10890, sqm: 1012, comparison: "Standard suburban single-family home lot", color: "#3b82f6" },
  { id: "half", name: "1/2 Acre Lot", acres: 0.5, sqft: 21780, sqm: 2023, comparison: "Spacious estate lot with room for pool & workshop", color: "#0ea5e9" },
  { id: "acre", name: "1.0 Full Acre", acres: 1.0, sqft: 43560, sqm: 4047, comparison: "Nearly equivalent to an NFL football field (~48,000 sq ft)", color: "#10b981" },
  { id: "five", name: "5.0 Acre Homestead", acres: 5.0, sqft: 217800, sqm: 20234, comparison: "Small hobby farm, equestrian paddocks, or orchard", color: "#f59e0b" },
  { id: "ten", name: "10.0 Acre Ranch", acres: 10.0, sqft: 435600, sqm: 40469, comparison: "Commercial livestock, hunting tract, or private timber parcel", color: "#8b5cf6" },
];

export function LandAreaBenchmarksChart() {
  const [active, setActive] = useState<LandParcel | null>(null);
  const display = active || PARCELS[2]; // Default to 1 Acre
  const isHovering = active !== null;

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-3.5 sm:p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Land Parcel Scale Benchmarks (Visual Size Comparison)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isHovering
              ? `Inspecting ${display.name} — ${display.sqft.toLocaleString()} sq ft (${display.sqm.toLocaleString()} m²)`
              : "Visual scale comparison of standard residential lots against 1 full acre and an NFL football field. Hover to inspect."}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 max-w-full break-words dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            {display.name}: {display.sqft.toLocaleString()} sq ft ({display.acres} acres)
          </span>
        </div>
      </div>

      <div className="grid gap-2.5 pt-2 sm:grid-cols-2 lg:grid-cols-5">
        {PARCELS.map((p) => {
          const isSel = display.id === p.id;
          return (
            <div
              key={p.id}
              className={`cursor-pointer rounded-xl p-3.5 transition-all text-center border ${
                isSel
                  ? "border-emerald-500 bg-emerald-50/60 shadow-md ring-2 ring-emerald-500/20 dark:bg-emerald-950/30 dark:border-emerald-500"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/60"
              }`}
              onMouseEnter={() => setActive(p)}
              onTouchStart={() => setActive(p)}
            >
              <span className="inline-block size-3 rounded-full mb-1" style={{ backgroundColor: p.color }} />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{p.name}</h4>
              <p className="mt-1 text-xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                {p.sqft.toLocaleString()}
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400"> sq ft</span>
              </p>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">{p.sqm.toLocaleString()} m²</p>
              <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{p.comparison}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
