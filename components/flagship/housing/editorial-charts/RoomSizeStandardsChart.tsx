"use client";

import { useState } from "react";

interface RoomStandard {
  id: string;
  name: string;
  floorSqFt: number;
  wallArea8Ft: number;
  perimeterFt: number;
  paintGallons: number;
  color: string;
}

const ROOMS: RoomStandard[] = [
  { id: "living", name: "Living Room / Great Room (16×20)", floorSqFt: 320, wallArea8Ft: 576, perimeterFt: 72, paintGallons: 2, color: "#3b82f6" },
  { id: "primary_bed", name: "Primary Bedroom Suite (15×16)", floorSqFt: 240, wallArea8Ft: 496, perimeterFt: 62, paintGallons: 2, color: "#0ea5e9" },
  { id: "kitchen", name: "Family Kitchen & Breakfast (12×15)", floorSqFt: 180, wallArea8Ft: 432, perimeterFt: 54, paintGallons: 1.5, color: "#10b981" },
  { id: "bed2", name: "Secondary / Guest Bedroom (12×12)", floorSqFt: 144, wallArea8Ft: 384, perimeterFt: 48, paintGallons: 1, color: "#f59e0b" },
  { id: "bath_full", name: "Full Bathroom (5×8 Standard)", floorSqFt: 40, wallArea8Ft: 208, perimeterFt: 26, paintGallons: 1, color: "#8b5cf6" },
  { id: "powder", name: "Powder Room / Half Bath (4×5)", floorSqFt: 20, wallArea8Ft: 144, perimeterFt: 18, paintGallons: 0.5, color: "#ec4899" },
];

export function RoomSizeStandardsChart() {
  const [active, setActive] = useState<RoomStandard | null>(null);
  const display = active || ROOMS[0]; // Default to Living Room
  const isHovering = active !== null;

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Residential Room Size Standards (Floor Area &amp; Wall Surface Benchmark)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isHovering
              ? `Inspecting ${display.name} — Floor: ${display.floorSqFt} sq ft | 8-ft Wall Area: ${display.wallArea8Ft} sq ft`
              : "Comparison of floor space vs paintable wall area across standard 8-foot ceiling residential rooms. Hover to inspect."}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            {display.name.split("(")[0].trim()}: {display.floorSqFt} sq ft floor · {display.wallArea8Ft} sq ft walls
          </span>
        </div>
      </div>

      <div className="grid gap-2.5 pt-2 sm:grid-cols-2 lg:grid-cols-3">
        {ROOMS.map((r) => {
          const isSel = display.id === r.id;
          return (
            <div
              key={r.id}
              className={`cursor-pointer rounded-xl p-3.5 transition-all border ${
                isSel
                  ? "border-emerald-500 bg-emerald-50/60 shadow-md ring-2 ring-emerald-500/20 dark:bg-emerald-950/30 dark:border-emerald-500"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/60"
              }`}
              onMouseEnter={() => setActive(r)}
              onTouchStart={() => setActive(r)}
            >
              <span className="inline-block size-3 rounded-full mb-1" style={{ backgroundColor: r.color }} />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{r.name}</h4>
              <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                {r.floorSqFt}
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400"> sq ft floor</span>
              </p>
              <div className="mt-2 text-xs space-y-1 text-slate-600 dark:text-slate-300">
                <p>8-ft Wall Area: <span className="font-semibold text-blue-600 dark:text-blue-400">{r.wallArea8Ft} sq ft</span></p>
                <p>Baseboard Perimeter: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{r.perimeterFt} linear ft</span></p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
