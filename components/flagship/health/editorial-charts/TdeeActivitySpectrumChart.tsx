"use client";

import { useState, useRef, useCallback } from "react";

interface ActivityTier {
  id: string;
  name: string;
  shortName: string;
  pal: number;
  x: number;
  barH: number;
  tdee: number;
  neatDesc: string;
  workoutDesc: string;
  color: string;
}

const TIERS: ActivityTier[] = [
  { id: "sedentary", name: "Sedentary (Desk Job)", shortName: "Sedentary", pal: 1.2, x: 100, barH: 105, tdee: 1920, neatDesc: "< 5,000 steps/day", workoutDesc: "No structured exercise", color: "#94a3b8" },
  { id: "light", name: "Lightly Active", shortName: "Light", pal: 1.375, x: 230, barH: 125, tdee: 2200, neatDesc: "6,000 – 8,000 steps/day", workoutDesc: "1–3 light workouts/week", color: "#38bdf8" },
  { id: "moderate", name: "Moderately Active", shortName: "Moderate", pal: 1.55, x: 360, barH: 145, tdee: 2480, neatDesc: "8,000 – 11,000 steps/day", workoutDesc: "3–5 lifting / cardio sessions", color: "#10b981" },
  { id: "very", name: "Very Active", shortName: "Very Active", pal: 1.725, x: 490, barH: 165, tdee: 2760, neatDesc: "12,000+ steps/day", workoutDesc: "6–7 intense training days", color: "#f59e0b" },
  { id: "athlete", name: "Extremely Active / Athlete", shortName: "Athlete", pal: 1.9, x: 620, barH: 185, tdee: 3040, neatDesc: "Construction / Physical Labor", workoutDesc: "2x/day training or competitive athlete", color: "#ef4444" },
];

export function TdeeActivitySpectrumChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [active, setActive] = useState<ActivityTier | null>(null);

  const handlePointer = useCallback((clientX: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relativeX = (clientX - rect.left) * (720 / rect.width);
    const clampedX = Math.max(100, Math.min(620, relativeX));

    let closest = TIERS[0];
    let minDiff = Infinity;
    for (const pt of TIERS) {
      const diff = Math.abs(pt.x - clampedX);
      if (diff < minDiff) {
        minDiff = diff;
        closest = pt;
      }
    }
    setActive(closest);
  }, []);

  const display = active || TIERS[2]; // Default to Moderate
  const isHovering = active !== null;

  const tooltipX = display.x > 360 ? display.x - 180 : display.x + 15;
  const tooltipY = Math.max(15, 200 - display.barH - 45);

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-3.5 sm:p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
            Total Energy Expenditure vs Physical Activity Level (PAL Multipliers)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isHovering
              ? `Inspecting ${display.name} — ${display.pal}x PAL Multiplier | ${display.tdee} kcal/day on 1,600 kcal BMR`
              : "Visual comparison of daily caloric demand across 5 activity tiers based on ACSM Physical Activity Levels. Hover to inspect."}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 max-w-full break-words dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            {display.shortName}: {display.pal}x PAL ({display.tdee.toLocaleString()} kcal/day)
          </span>
        </div>
      </div>

      <div className="relative w-full select-none">
        <svg
          ref={svgRef}
          className="w-full h-auto cursor-crosshair touch-none overflow-visible"
          viewBox="0 0 720 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onMouseMove={(e) => handlePointer(e.clientX)}
          onTouchStart={(e) => { if (e.touches.length > 0) handlePointer(e.touches[0].clientX); }}
          onTouchMove={(e) => { if (e.touches.length > 0) handlePointer(e.touches[0].clientX); }}
          onMouseLeave={() => setActive(null)}
        >
          {/* Gridlines */}
          <line x1="50" y1="20" x2="680" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="65" x2="680" y2="65" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="110" x2="680" y2="110" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="155" x2="680" y2="155" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="200" x2="680" y2="200" stroke="#94a3b8" strokeWidth="1.5" className="dark:stroke-slate-700" />

          {/* Y-axis labels */}
          <text x="45" y="24" fontSize="11" fill="#64748b" textAnchor="end">3,200 kcal</text>
          <text x="45" y="69" fontSize="11" fill="#64748b" textAnchor="end">2,800 kcal</text>
          <text x="45" y="114" fontSize="11" fill="#64748b" textAnchor="end">2,400 kcal</text>
          <text x="45" y="159" fontSize="11" fill="#64748b" textAnchor="end">2,000 kcal</text>
          <text x="45" y="204" fontSize="11" fill="#64748b" textAnchor="end">1,600 kcal</text>

          {/* Activity Bars */}
          {TIERS.map((tier) => {
            const isSel = display.id === tier.id;
            const barW = 54;
            const y = 200 - tier.barH;
            return (
              <g key={tier.id} className="cursor-pointer">
                {/* Background Bar (Total TDEE) */}
                <rect
                  x={tier.x - (barW / 2)}
                  y={y}
                  width={barW}
                  height={tier.barH}
                  rx="6"
                  fill={tier.color}
                  opacity={isSel ? 0.95 : 0.75}
                  filter={isSel ? "drop-shadow(0 4px 6px rgb(0 0 0 / 0.15))" : "none"}
                />

                {/* BMR base indicator (1,600 kcal base mark) */}
                <line
                  x1={tier.x - (barW / 2)}
                  y1={200 - 80}
                  x2={tier.x + (barW / 2)}
                  y2={200 - 80}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />

                {/* Value on top of bar */}
                <text
                  x={tier.x}
                  y={y - 8}
                  fontSize="11"
                  fontWeight="bold"
                  fill="#0f172a"
                  className="dark:fill-slate-100"
                  textAnchor="middle"
                >
                  {tier.tdee}
                </text>

                {/* X-axis label */}
                <text
                  x={tier.x}
                  y="218"
                  fontSize="11"
                  fontWeight={isSel ? "bold" : "600"}
                  fill={isSel ? "#10b981" : "#64748b"}
                  textAnchor="middle"
                >
                  {tier.shortName}
                </text>
              </g>
            );
          })}

          {/* Dynamic Tooltip */}
          <g transform={`translate(${tooltipX}, ${tooltipY})`}>
            <rect width="180" height="70" rx="8" fill="rgba(15, 23, 42, 0.94)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
            <text x="10" y="18" fill="#f8fafc" fontSize="11" fontWeight="bold">
              {display.name} ({display.pal}x)
            </text>
            <text x="10" y="34" fill="#34d399" fontSize="10.5" fontWeight="bold">
              Daily TDEE: {display.tdee.toLocaleString()} kcal/day
            </text>
            <text x="10" y="48" fill="#cbd5e1" fontSize="9.5">
              NEAT Steps: {display.neatDesc}
            </text>
            <text x="10" y="62" fill="#93c5fd" fontSize="9.5">
              Workout Frequency: {display.workoutDesc}
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-emerald-500" /> Total Daily Burn (Resting Metabolism + NEAT + Exercise)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-slate-400" /> White Dashed Line: Base Resting BMR (1,600 kcal)
        </span>
      </div>
    </div>
  );
}
