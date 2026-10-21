"use client";

import { useState } from "react";

interface Sheen {
  id: string;
  name: string;
  sheenPct: string;
  scrubbability: string;
  bestFor: string;
  flawHiding: string;
  color: string;
}

const SHEENS: Sheen[] = [
  { id: "flat", name: "Flat / Matte", sheenPct: "0% – 5%", scrubbability: "Low (Dabs only)", bestFor: "Ceilings, Adult Bedrooms, Low-Traffic Areas", flawHiding: "Maximum (Hides drywall flaws)", color: "#64748b" },
  { id: "eggshell", name: "Eggshell", sheenPct: "10% – 25%", scrubbability: "Medium (Wipeable)", bestFor: "Living Rooms, Dining Rooms, Home Offices", flawHiding: "High (Gentle soft glow)", color: "#0ea5e9" },
  { id: "satin", name: "Satin", sheenPct: "25% – 35%", scrubbability: "High (Easily washable)", bestFor: "Hallways, Kids Bedrooms, Foyers", flawHiding: "Moderate (Shows minor bumps)", color: "#10b981" },
  { id: "semigloss", name: "Semi-Gloss", sheenPct: "35% – 70%", scrubbability: "Very High (Moisture resistant)", bestFor: "Kitchens, Bathrooms, Doors, Baseboard Trim", flawHiding: "Low (Highlights imperfections)", color: "#f59e0b" },
  { id: "highgloss", name: "High-Gloss", sheenPct: "70% – 90%+", scrubbability: "Maximum (Commercial scrub)", bestFor: "Cabinets, Architectural Millwork, Front Doors", flawHiding: "Lowest (Mirror-like reflection)", color: "#ec4899" },
];

export function PaintSheenSpectrumChart() {
  const [active, setActive] = useState<Sheen | null>(null);
  const display = active || SHEENS[1]; // Default to Eggshell
  const isHovering = active !== null;

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-3.5 sm:p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Paint Sheen Spectrum (Reflectivity vs Scrubbability &amp; Application Guide)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isHovering
              ? `Inspecting ${display.name} (${display.sheenPct} reflectivity) — Best for: ${display.bestFor}`
              : "Visual benchmark comparing light reflectance value (LRV) and washability across 5 core paint finishes. Hover to inspect."}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 max-w-full break-words dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            {display.name}: {display.sheenPct} Sheen · {display.scrubbability.split("(")[0].trim()} Washability
          </span>
        </div>
      </div>

      <div className="grid gap-2.5 pt-2 sm:grid-cols-2 lg:grid-cols-5">
        {SHEENS.map((s) => {
          const isSel = display.id === s.id;
          return (
            <div
              key={s.id}
              className={`cursor-pointer rounded-xl p-3.5 transition-all text-center border ${
                isSel
                  ? "border-emerald-500 bg-emerald-50/60 shadow-md ring-2 ring-emerald-500/20 dark:bg-emerald-950/30 dark:border-emerald-500"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/60"
              }`}
              onMouseEnter={() => setActive(s)}
              onTouchStart={() => setActive(s)}
            >
              <span className="inline-block size-3 rounded-full mb-1" style={{ backgroundColor: s.color }} />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{s.name}</h4>
              <p className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white">{s.sheenPct}</p>
              <div className="mt-2 text-xs space-y-1 text-slate-600 dark:text-slate-300">
                <p>Wash: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{s.scrubbability}</span></p>
                <p className="text-[11px] text-slate-500 line-clamp-2" title={s.bestFor}>Rooms: {s.bestFor}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
