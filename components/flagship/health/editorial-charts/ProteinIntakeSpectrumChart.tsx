"use client";

import { useState, useRef, useCallback } from "react";

interface ProteinTier {
  id: string;
  name: string;
  shortName: string;
  gPerKg: number;
  gPerLb: number;
  x: number;
  barH: number;
  dailyGrams79kg: number;
  perMeal4Meals: number;
  primaryBenefit: string;
  color: string;
}

const PROTEIN_TIERS: ProteinTier[] = [
  { id: "rda", name: "RDA Minimum Baseline", shortName: "RDA (0.8g)", gPerKg: 0.8, gPerLb: 0.36, x: 90, barH: 70, dailyGrams79kg: 63, perMeal4Meals: 16, primaryBenefit: "Prevents clinical nitrogen deficiency only", color: "#94a3b8" },
  { id: "senior", name: "Healthy Aging / Sarcopenia", shortName: "Aging (1.2g)", gPerKg: 1.2, gPerLb: 0.54, x: 210, barH: 100, dailyGrams79kg: 95, perMeal4Meals: 24, primaryBenefit: "Overcomes anabolic resistance in adults 50+", color: "#38bdf8" },
  { id: "endurance", name: "Endurance Athletes", shortName: "Endurance (1.5g)", gPerKg: 1.5, gPerLb: 0.68, x: 330, barH: 125, dailyGrams79kg: 119, perMeal4Meals: 30, primaryBenefit: "Repairs exercise muscle damage & mitochondrial enzymes", color: "#10b981" },
  { id: "hypertrophy", name: "Hypertrophy / Muscle Building", shortName: "Muscle (1.8g)", gPerKg: 1.8, gPerLb: 0.82, x: 450, barH: 155, dailyGrams79kg: 142, perMeal4Meals: 36, primaryBenefit: "Optimal ceiling for myofibrillar muscle synthesis", color: "#6366f1" },
  { id: "fatloss", name: "Cutting / Caloric Deficit", shortName: "Cutting (2.2g)", gPerKg: 2.2, gPerLb: 1.0, x: 570, barH: 180, dailyGrams79kg: 174, perMeal4Meals: 44, primaryBenefit: "Maximum muscle preservation & hunger satiety", color: "#ec4899" },
];

export function ProteinIntakeSpectrumChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [active, setActive] = useState<ProteinTier | null>(null);

  const handlePointer = useCallback((clientX: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relativeX = (clientX - rect.left) * (720 / rect.width);
    const clampedX = Math.max(90, Math.min(570, relativeX));

    let closest = PROTEIN_TIERS[0];
    let minDiff = Infinity;
    for (const pt of PROTEIN_TIERS) {
      const diff = Math.abs(pt.x - clampedX);
      if (diff < minDiff) {
        minDiff = diff;
        closest = pt;
      }
    }
    setActive(closest);
  }, []);

  const display = active || PROTEIN_TIERS[3]; // Default to Hypertrophy
  const isHovering = active !== null;

  const tooltipX = display.x > 360 ? display.x - 180 : display.x + 15;
  const tooltipY = Math.max(15, 200 - display.barH - 45);

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-3.5 sm:p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
            Daily Protein Intake Spectrum (Clinical RDA vs Athletic Hypertrophy)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isHovering
              ? `Inspecting ${display.name} — ${display.gPerKg} g/kg (${display.gPerLb} g/lb) | ${display.dailyGrams79kg}g daily on 175-lb body`
              : "Visual comparison of protein targets based on ISSN clinical consensus from sedentary minimums to maximal hypertrophy. Hover to inspect."}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 max-w-full break-words dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            {display.shortName}: {display.dailyGrams79kg}g/day (~{display.perMeal4Meals}g across 4 meals)
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
          <text x="45" y="24" fontSize="11" fill="#64748b" textAnchor="end">200g / day</text>
          <text x="45" y="69" fontSize="11" fill="#64748b" textAnchor="end">160g / day</text>
          <text x="45" y="114" fontSize="11" fill="#64748b" textAnchor="end">120g / day</text>
          <text x="45" y="159" fontSize="11" fill="#64748b" textAnchor="end">80g / day</text>
          <text x="45" y="204" fontSize="11" fill="#64748b" textAnchor="end">40g / day</text>

          {/* Protein Bars */}
          {PROTEIN_TIERS.map((tier) => {
            const isSel = display.id === tier.id;
            const barW = 54;
            const y = 200 - tier.barH;
            return (
              <g key={tier.id} className="cursor-pointer">
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

                {/* Leucine MPS Threshold Line (30g per meal indicator) */}
                <line
                  x1={tier.x - (barW / 2)}
                  y1={200 - 130}
                  x2={tier.x + (barW / 2)}
                  y2={200 - 130}
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
                  {tier.dailyGrams79kg}g
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
            <rect width="180" height="74" rx="8" fill="rgba(15, 23, 42, 0.94)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
            <text x="10" y="16" fill="#f8fafc" fontSize="11" fontWeight="bold">
              {display.name}
            </text>
            <text x="10" y="32" fill="#34d399" fontSize="10.5" fontWeight="bold">
              Daily Target: {display.dailyGrams79kg}g ({display.gPerKg} g/kg)
            </text>
            <text x="10" y="46" fill="#c084fc" fontSize="9.5">
              4-Meal Dose: ~{display.perMeal4Meals}g protein / meal
            </text>
            <text x="10" y="60" fill="#cbd5e1" fontSize="9" fontWeight="500">
              {display.primaryBenefit}
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-indigo-500" /> Optimal Hypertrophy Zone (1.6 to 2.2 g/kg / 0.8 to 1.0 g/lb)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-slate-400" /> White Dashed Line: Leucine MPS Trigger (120g daily across 4 meals)
        </span>
      </div>
    </div>
  );
}
