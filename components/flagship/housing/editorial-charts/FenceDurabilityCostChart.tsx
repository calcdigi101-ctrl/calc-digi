"use client";

import { useState } from "react";

interface FenceMaterial {
  id: string;
  name: string;
  costFt: number;
  lifespan: number;
  maintenance: string;
  totalCost150Ft: number;
  color: string;
}

const MATERIALS: FenceMaterial[] = [
  { id: "chain", name: "Chain-Link", costFt: 18, lifespan: 20, maintenance: "Low (Rust inspection)", totalCost150Ft: 2700, color: "#94a3b8" },
  { id: "wood", name: "Wood (Cedar / Pine)", costFt: 26, lifespan: 15, maintenance: "High (Seal/stain every 2-3 yrs)", totalCost150Ft: 3900, color: "#d97706" },
  { id: "vinyl", name: "Vinyl / PVC", costFt: 36, lifespan: 30, maintenance: "Low (Hose wash only)", totalCost150Ft: 5400, color: "#0ea5e9" },
  { id: "aluminum", name: "Ornamental Aluminum", costFt: 44, lifespan: 45, maintenance: "Very Low (Powder coated)", totalCost150Ft: 6600, color: "#6366f1" },
  { id: "composite", name: "Composite (Trexx)", costFt: 54, lifespan: 35, maintenance: "Low (No rot, no paint)", totalCost150Ft: 8100, color: "#10b981" },
];

export function FenceDurabilityCostChart() {
  const [active, setActive] = useState<FenceMaterial | null>(null);
  const display = active || MATERIALS[2]; // Default to Vinyl
  const isHovering = active !== null;

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Fence Material Durability vs Installed Cost per Linear Foot
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isHovering
              ? `Inspecting ${display.name} — Installed cost: $${display.costFt}/linear ft | Lifespan: ${display.lifespan} years`
              : "Visual benchmark comparing lifespan against installed contractor cost per linear foot across 5 primary materials. Hover to inspect."}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            {display.name}: ${display.costFt}/ft · {display.lifespan}-Yr Life (${display.totalCost150Ft.toLocaleString()} on 150ft)
          </span>
        </div>
      </div>

      <div className="grid gap-2.5 pt-2 sm:grid-cols-2 lg:grid-cols-5">
        {MATERIALS.map((mat) => {
          const isSel = display.id === mat.id;
          return (
            <div
              key={mat.id}
              className={`cursor-pointer rounded-xl p-3.5 transition-all text-center border ${
                isSel
                  ? "border-emerald-500 bg-emerald-50/60 shadow-md ring-2 ring-emerald-500/20 dark:bg-emerald-950/30 dark:border-emerald-500"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/60"
              }`}
              onMouseEnter={() => setActive(mat)}
              onTouchStart={() => setActive(mat)}
            >
              <span className="inline-block size-3 rounded-full mb-1" style={{ backgroundColor: mat.color }} />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{mat.name}</h4>
              <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                ${mat.costFt}
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/ft</span>
              </p>
              <div className="mt-2 text-xs space-y-1 text-slate-600 dark:text-slate-300">
                <p>Lifespan: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{mat.lifespan} Yrs</span></p>
                <p className="text-[11px] text-slate-500 truncate" title={mat.maintenance}>{mat.maintenance}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
