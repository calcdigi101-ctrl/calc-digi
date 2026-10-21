"use client";

import { useState } from "react";

interface GlaCategory {
  id: string;
  name: string;
  shortName: string;
  badgeText: string;
  countedInGla: boolean;
  valuePerSqFtPct: string;
  ansiRule: string;
  typicalSqFt: number;
  color: string;
  activeColor: string;
}

const CATEGORIES: GlaCategory[] = [
  {
    id: "above_grade",
    name: "Finished Above-Grade Living Area",
    shortName: "Above-Grade Living Area",
    badgeText: "100% Official GLA",
    countedInGla: true,
    valuePerSqFtPct: "100% of Base Square Foot Value",
    ansiRule: "Heated, finished, continuous with house, min 7-ft ceilings.",
    typicalSqFt: 2200,
    color: "#10b981",
    activeColor: "#059669"
  },
  {
    id: "finished_bsmt",
    name: "Finished Walkout / Daylight Basement",
    shortName: "Finished Basement",
    badgeText: "Separate Value (50-70%)",
    countedInGla: false,
    valuePerSqFtPct: "50% – 70% of Above-Grade Value",
    ansiRule: "Any space with earth above ground level on ANY wall is Below-Grade.",
    typicalSqFt: 900,
    color: "#3b82f6",
    activeColor: "#2563eb"
  },
  {
    id: "garage",
    name: "Attached 2-Car Garage",
    shortName: "Attached Garage",
    badgeText: "Separate Utility Value",
    countedInGla: false,
    valuePerSqFtPct: "$25 – $45 / sq ft Lump Sum Utility Value",
    ansiRule: "Unfinished vehicle storage space; strictly excluded from residential GLA.",
    typicalSqFt: 480,
    color: "#64748b",
    activeColor: "#475569"
  },
  {
    id: "porch",
    name: "Covered / Screened Porch",
    shortName: "Covered Porch",
    badgeText: "Exterior Amenity (20-35%)",
    countedInGla: false,
    valuePerSqFtPct: "20% – 35% of Living Area Value",
    ansiRule: "Must be fully enclosed and climate-controlled with permanent HVAC to qualify.",
    typicalSqFt: 200,
    color: "#f59e0b",
    activeColor: "#d97706"
  },
];

export function SquareFootageGlaChart() {
  const [active, setActive] = useState<GlaCategory | null>(null);
  const display = active || CATEGORIES[0];
  const isHovering = active !== null;

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-3.5 sm:p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      {/* Header */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
            Gross Living Area (GLA) vs Non-Finished Spaces (ANSI Z765 Standards)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {isHovering
              ? `Inspecting ${display.shortName} — ${display.countedInGla ? "COUNTED in official GLA" : "EXCLUDED from official GLA"}`
              : "Visual blueprint of what certified appraisers count towards official heated residential square footage. Tap sections to inspect."}
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 max-w-full dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="truncate">
            {display.shortName}: {display.countedInGla ? "✓ Official GLA (100%)" : "✗ Appraised Separately"}
          </span>
        </div>
      </div>

      {/* Visual House Blueprint / Cross-Section Diagram */}
      <div className="relative w-full rounded-xl border border-slate-200/80 bg-slate-100/50 p-2 sm:p-3 select-none dark:border-slate-800 dark:bg-slate-950/50">
        <svg
          className="w-full h-auto cursor-pointer touch-none"
          viewBox="0 0 680 230"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sky / Background hints */}
          <rect x="0" y="0" width="680" height="150" fill="#f8fafc" className="dark:fill-slate-900/40" rx="6" />
          <rect x="0" y="150" width="680" height="80" fill="#f1f5f9" className="dark:fill-slate-950/80" rx="0" />

          {/* Grade Line (Ground Level) */}
          <line x1="20" y1="150" x2="660" y2="150" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 3" />
          <text x="650" y="145" fontSize="10" fontWeight="600" fill="#64748b" textAnchor="end">
            Ground Grade Line
          </text>
          <text x="25" y="166" fontSize="10" fontWeight="bold" fill="#3b82f6">
            ▼ BELOW-GRADE ZONE (Excluded from Official GLA)
          </text>
          <text x="25" y="140" fontSize="10" fontWeight="bold" fill="#10b981">
            ▲ ABOVE-GRADE ZONE (Qualifies for GLA)
          </text>

          {/* Roof Gable */}
          <polygon
            points="140,46 290,14 440,46"
            fill="#e2e8f0"
            stroke="#cbd5e1"
            strokeWidth="1.5"
            className="dark:fill-slate-800 dark:stroke-slate-700"
          />
          <text x="290" y="38" fontSize="10" fill="#64748b" textAnchor="middle" fontWeight="500">
            Unfinished Attic / Pitch (Excluded)
          </text>

          {/* 1. Covered Porch (Left) */}
          <g
            className="cursor-pointer transition-opacity"
            onMouseEnter={() => setActive(CATEGORIES[3])}
            onTouchStart={() => setActive(CATEGORIES[3])}
            opacity={display.id === "porch" ? 1 : 0.82}
          >
            <polygon points="40,96 140,78 140,96" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" className="dark:fill-amber-950/30" />
            <rect
              x="40"
              y="96"
              width="100"
              height="54"
              rx="4"
              fill={display.id === "porch" ? "#fef3c7" : "#fffbeb"}
              stroke="#f59e0b"
              strokeWidth={display.id === "porch" ? "2.5" : "1.5"}
              className="dark:fill-amber-950/40"
            />
            <text x="90" y="120" fontSize="11" fontWeight="bold" fill="#b45309" textAnchor="middle" className="dark:fill-amber-400">
              Covered Porch
            </text>
            <text x="90" y="135" fontSize="9" fontWeight="600" fill="#d97706" textAnchor="middle" className="dark:fill-amber-500">
              200 sq ft · ✗ Not GLA
            </text>
          </g>

          {/* 2. Above-Grade 2nd Floor (Main House) */}
          <g
            className="cursor-pointer transition-opacity"
            onMouseEnter={() => setActive(CATEGORIES[0])}
            onTouchStart={() => setActive(CATEGORIES[0])}
            opacity={display.id === "above_grade" ? 1 : 0.88}
          >
            <rect
              x="146"
              y="46"
              width="288"
              height="48"
              rx="4"
              fill={display.id === "above_grade" ? "#d1fae5" : "#ecfdf5"}
              stroke="#10b981"
              strokeWidth={display.id === "above_grade" ? "2.5" : "1.5"}
              className="dark:fill-emerald-950/50"
            />
            <text x="290" y="68" fontSize="11" fontWeight="bold" fill="#047857" textAnchor="middle" className="dark:fill-emerald-300">
              2nd Floor Living Area (Bedrooms &amp; Baths)
            </text>
            <text x="290" y="83" fontSize="9.5" fontWeight="600" fill="#059669" textAnchor="middle" className="dark:fill-emerald-400">
              1,100 sq ft · ✓ 100% Official GLA
            </text>
          </g>

          {/* 3. Above-Grade 1st Floor (Main House) */}
          <g
            className="cursor-pointer transition-opacity"
            onMouseEnter={() => setActive(CATEGORIES[0])}
            onTouchStart={() => setActive(CATEGORIES[0])}
            opacity={display.id === "above_grade" ? 1 : 0.88}
          >
            <rect
              x="146"
              y="98"
              width="288"
              height="52"
              rx="4"
              fill={display.id === "above_grade" ? "#d1fae5" : "#ecfdf5"}
              stroke="#10b981"
              strokeWidth={display.id === "above_grade" ? "2.5" : "1.5"}
              className="dark:fill-emerald-950/50"
            />
            <text x="290" y="122" fontSize="11" fontWeight="bold" fill="#047857" textAnchor="middle" className="dark:fill-emerald-300">
              1st Floor Main Living (Kitchen, Dining, Family)
            </text>
            <text x="290" y="137" fontSize="9.5" fontWeight="600" fill="#059669" textAnchor="middle" className="dark:fill-emerald-400">
              1,100 sq ft · ✓ 100% Official GLA
            </text>
          </g>

          {/* 4. Attached 2-Car Garage (Right) */}
          <g
            className="cursor-pointer transition-opacity"
            onMouseEnter={() => setActive(CATEGORIES[2])}
            onTouchStart={() => setActive(CATEGORIES[2])}
            opacity={display.id === "garage" ? 1 : 0.82}
          >
            <polygon points="440,78 610,64 610,78" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" className="dark:fill-slate-800" />
            <rect
              x="440"
              y="78"
              width="170"
              height="72"
              rx="4"
              fill={display.id === "garage" ? "#e2e8f0" : "#f1f5f9"}
              stroke="#64748b"
              strokeWidth={display.id === "garage" ? "2.5" : "1.5"}
              className="dark:fill-slate-800/60"
            />
            <rect x="456" y="94" width="138" height="56" rx="2" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" className="dark:fill-slate-700/60" />
            <line x1="456" y1="108" x2="594" y2="108" stroke="#94a3b8" strokeWidth="1" />
            <line x1="456" y1="122" x2="594" y2="122" stroke="#94a3b8" strokeWidth="1" />
            <line x1="456" y1="136" x2="594" y2="136" stroke="#94a3b8" strokeWidth="1" />
            <text x="525" y="118" fontSize="10.5" fontWeight="bold" fill="#334155" textAnchor="middle" className="dark:fill-slate-200">
              Attached 2-Car Garage
            </text>
            <text x="525" y="132" fontSize="9" fontWeight="600" fill="#475569" textAnchor="middle" className="dark:fill-slate-300">
              480 sq ft · ✗ Excluded from GLA
            </text>
          </g>

          {/* 5. Finished Basement (Below Ground) */}
          <g
            className="cursor-pointer transition-opacity"
            onMouseEnter={() => setActive(CATEGORIES[1])}
            onTouchStart={() => setActive(CATEGORIES[1])}
            opacity={display.id === "finished_bsmt" ? 1 : 0.85}
          >
            <rect
              x="146"
              y="156"
              width="288"
              height="62"
              rx="4"
              fill={display.id === "finished_bsmt" ? "#dbeafe" : "#eff6ff"}
              stroke="#3b82f6"
              strokeWidth={display.id === "finished_bsmt" ? "2.5" : "1.5"}
              className="dark:fill-blue-950/50"
            />
            <text x="290" y="184" fontSize="11" fontWeight="bold" fill="#1d4ed8" textAnchor="middle" className="dark:fill-blue-300">
              Finished Walkout / Daylight Basement
            </text>
            <text x="290" y="200" fontSize="9.5" fontWeight="600" fill="#2563eb" textAnchor="middle" className="dark:fill-blue-400">
              900 sq ft · ✗ Below-Grade (Valued at 50%–70% of GLA)
            </text>
          </g>
        </svg>
      </div>

      {/* Category Cards - Clean, Responsive, Zero Badge Wrapping */}
      <div className="grid gap-2.5 pt-3 sm:grid-cols-2">
        {CATEGORIES.map((cat) => {
          const isSel = display.id === cat.id;
          return (
            <div
              key={cat.id}
              className={`cursor-pointer rounded-xl p-3 sm:p-3.5 transition-all border ${
                isSel
                  ? "border-emerald-500 bg-emerald-50/70 shadow-sm ring-1 ring-emerald-500/30 dark:bg-emerald-950/40 dark:border-emerald-500"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/60"
              }`}
              onMouseEnter={() => setActive(cat)}
              onTouchStart={() => setActive(cat)}
            >
              {/* Card Header with non-wrapping pill badge */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: cat.color }} />
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {cat.name}
                  </h4>
                </div>
                <span
                  className={`shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] sm:text-[11px] font-bold ${
                    cat.countedInGla
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                  }`}
                >
                  {cat.badgeText}
                </span>
              </div>

              {/* Appraisal Value */}
              <p className="mt-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                Appraisal Value:{" "}
                <span className={cat.countedInGla ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-blue-600 dark:text-blue-400 font-semibold"}>
                  {cat.valuePerSqFtPct}
                </span>
              </p>

              {/* ANSI Rule */}
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                <span className="font-medium text-slate-600 dark:text-slate-300">ANSI Rule:</span> {cat.ansiRule}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
