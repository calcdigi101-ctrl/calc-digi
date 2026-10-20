"use client";

import { useState } from "react";

interface RemodelProject {
  id: string;
  name: string;
  cost: number;
  resaleAdded: number;
  roiPct: number;
  scope: string;
  color: string;
}

const PROJECTS: RemodelProject[] = [
  { id: "garage", name: "Garage Door Replacement", cost: 4300, resaleAdded: 4410, roiPct: 102.7, scope: "Exterior curb appeal", color: "#10b981" },
  { id: "entry", name: "Steel Entry Door", cost: 2200, resaleAdded: 2220, roiPct: 100.9, scope: "Security & energy efficiency", color: "#059669" },
  { id: "siding", name: "Fiber-Cement Siding", cost: 19500, resaleAdded: 17200, roiPct: 88.4, scope: "Whole-home weather envelope", color: "#0ea5e9" },
  { id: "kitchen_minor", name: "Minor Kitchen Remodel", cost: 26000, resaleAdded: 22300, roiPct: 85.7, scope: "Refacing cabinets & quartz tops", color: "#3b82f6" },
  { id: "deck", name: "Wood Deck Addition", cost: 17000, resaleAdded: 11600, roiPct: 68.2, scope: "16x20 pressure-treated outdoor living", color: "#f59e0b" },
  { id: "bath", name: "Midrange Bathroom Remodel", cost: 24500, resaleAdded: 16400, roiPct: 66.7, scope: "Tile surround, vanity & plumbing fixtures", color: "#8b5cf6" },
  { id: "kitchen_major", name: "Major Kitchen (Upscale)", cost: 79000, resaleAdded: 42600, roiPct: 53.9, scope: "Custom cabinets, layout shift & luxury appliances", color: "#ec4899" },
];

export function RenovationRoiChart() {
  const [active, setActive] = useState<RemodelProject | null>(null);
  const display = active || PROJECTS[0]; // Default to Garage Door
  const isHovering = active !== null;

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Remodeling Return on Investment (Cost vs Value Resale Recovery)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isHovering
              ? `Inspecting ${display.name} — ${display.roiPct}% recouped at resale ($${display.resaleAdded.toLocaleString()} value added on $${display.cost.toLocaleString()} cost)`
              : "National average percentage of project investment recouped at home resale. Hover projects to inspect."}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            {display.name}: {display.roiPct}% ROI (${display.resaleAdded.toLocaleString()} added on ${display.cost.toLocaleString()} spend)
          </span>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        {PROJECTS.map((proj) => {
          const isSel = display.id === proj.id;
          return (
            <div
              key={proj.id}
              className={`cursor-pointer rounded-xl p-2.5 transition-all ${
                isSel
                  ? "bg-slate-100 shadow-sm ring-1 ring-slate-900/10 dark:bg-slate-800 dark:ring-white/10"
                  : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
              }`}
              onMouseEnter={() => setActive(proj)}
              onTouchStart={() => setActive(proj)}
            >
              <div className="mb-1 flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: proj.color }} />
                  {proj.name}
                </span>
                <span className="font-bold tabular-nums text-slate-900 dark:text-white">
                  {proj.roiPct}% recouped (${proj.resaleAdded.toLocaleString()} / ${proj.cost.toLocaleString()})
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden dark:bg-slate-700">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, proj.roiPct)}%`,
                    backgroundColor: proj.color,
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
