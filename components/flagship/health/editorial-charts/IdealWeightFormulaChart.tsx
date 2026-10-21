"use client";

import { useState, useRef, useCallback } from "react";

interface HeightPoint {
  heightStr: string;
  inches: number;
  x: number;
  devineLbs: number;
  robinsonLbs: number;
  millerLbs: number;
  hamwiLbs: number;
  devineY: number;
  whoMinLbs: number;
  whoMaxLbs: number;
}

const HEIGHT_DATA: HeightPoint[] = [
  { heightStr: "5'2\"", inches: 62, x: 70, devineLbs: 120, robinsonLbs: 123, millerLbs: 130, hamwiLbs: 118, devineY: 175, whoMinLbs: 101, whoMaxLbs: 136 },
  { heightStr: "5'4\"", inches: 64, x: 155, devineLbs: 130, robinsonLbs: 131, millerLbs: 136, hamwiLbs: 130, devineY: 155, whoMinLbs: 108, whoMaxLbs: 145 },
  { heightStr: "5'6\"", inches: 66, x: 250, devineLbs: 141, robinsonLbs: 140, millerLbs: 143, hamwiLbs: 142, devineY: 132, whoMinLbs: 115, whoMaxLbs: 155 },
  { heightStr: "5'8\"", inches: 68, x: 350, devineLbs: 151, robinsonLbs: 148, millerLbs: 149, hamwiLbs: 154, devineY: 110, whoMinLbs: 122, whoMaxLbs: 164 },
  { heightStr: "5'10\"", inches: 70, x: 450, devineLbs: 161, robinsonLbs: 156, millerLbs: 155, hamwiLbs: 166, devineY: 88, whoMinLbs: 129, whoMaxLbs: 174 },
  { heightStr: "6'0\"", inches: 72, x: 540, devineLbs: 171, robinsonLbs: 165, millerLbs: 161, hamwiLbs: 178, devineY: 66, whoMinLbs: 137, whoMaxLbs: 184 },
  { heightStr: "6'2\"", inches: 74, x: 630, devineLbs: 181, robinsonLbs: 173, millerLbs: 167, hamwiLbs: 190, devineY: 44, whoMinLbs: 144, whoMaxLbs: 194 },
];

export function IdealWeightFormulaChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [active, setActive] = useState<HeightPoint | null>(null);

  const handlePointer = useCallback((clientX: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relativeX = (clientX - rect.left) * (720 / rect.width);
    const clampedX = Math.max(70, Math.min(630, relativeX));

    let closest = HEIGHT_DATA[0];
    let minDiff = Infinity;
    for (const pt of HEIGHT_DATA) {
      const diff = Math.abs(pt.x - clampedX);
      if (diff < minDiff) {
        minDiff = diff;
        closest = pt;
      }
    }
    setActive(closest);
  }, []);

  const display = active || HEIGHT_DATA[3]; // Default to 5'8"
  const isHovering = active !== null;

  const tooltipX = display.x > 360 ? display.x - 180 : display.x + 15;
  const tooltipY = Math.max(15, display.devineY - 60);

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-3.5 sm:p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
            Ideal Body Weight Trajectory Across 4 Clinical Formulas (Height 5'2"–6'2")
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isHovering
              ? `Inspecting Height ${display.heightStr} — Devine: ${display.devineLbs} lbs | Robinson: ${display.robinsonLbs} lbs | Hamwi: ${display.hamwiLbs} lbs`
              : "Visual benchmark comparing Devine, Robinson, Miller, and Hamwi formulas against WHO Normal BMI ranges. Move mouse/touch to inspect."}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 max-w-full break-words dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            {display.heightStr}: Devine {display.devineLbs} lbs · WHO Normal ({display.whoMinLbs}–{display.whoMaxLbs} lbs)
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
          <text x="45" y="24" fontSize="11" fill="#64748b" textAnchor="end">200 lbs</text>
          <text x="45" y="69" fontSize="11" fill="#64748b" textAnchor="end">175 lbs</text>
          <text x="45" y="114" fontSize="11" fill="#64748b" textAnchor="end">150 lbs</text>
          <text x="45" y="159" fontSize="11" fill="#64748b" textAnchor="end">125 lbs</text>
          <text x="45" y="204" fontSize="11" fill="#64748b" textAnchor="end">100 lbs</text>

          {/* X-axis labels */}
          {HEIGHT_DATA.map((d) => (
            <text key={d.heightStr} x={d.x} y="218" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
              {d.heightStr}
            </text>
          ))}

          {/* Devine Formula Curve (Emerald Solid) */}
          <path
            d="M70 175 L155 155 L250 132 L350 110 L450 88 L540 66 L630 44"
            stroke="#10b981"
            strokeWidth="3.5"
            fill="none"
          />

          {/* Hamwi Formula Curve (Purple Dashed) */}
          <path
            d="M70 179 L155 155 L250 130 L350 104 L450 78 L540 52 L630 26"
            stroke="#8b5cf6"
            strokeWidth="2.5"
            strokeDasharray="4 2"
            fill="none"
          />

          {/* Robinson Formula Curve (Blue Dotted) */}
          <path
            d="M70 169 L155 153 L250 134 L350 116 L450 99 L540 80 L630 63"
            stroke="#3b82f6"
            strokeWidth="2.5"
            strokeDasharray="2 2"
            fill="none"
          />

          {/* Interactive Guide Line */}
          <line
            x1={display.x}
            y1="15"
            x2={display.x}
            y2="200"
            stroke="#6366f1"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            opacity={isHovering ? 0.9 : 0.4}
          />

          <circle cx={display.x} cy={display.devineY} r="5.5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />

          {/* Dynamic Tooltip */}
          <g transform={`translate(${tooltipX}, ${tooltipY})`}>
            <rect width="180" height="74" rx="8" fill="rgba(15, 23, 42, 0.94)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
            <text x="10" y="16" fill="#f8fafc" fontSize="11" fontWeight="bold">
              Height {display.heightStr} ({display.inches}″) Benchmarks
            </text>
            <text x="10" y="32" fill="#34d399" fontSize="10.5" fontWeight="bold">
              Devine (Gold Std): {display.devineLbs} lbs
            </text>
            <text x="10" y="46" fill="#c084fc" fontSize="9.5">
              Hamwi Formula: {display.hamwiLbs} lbs
            </text>
            <text x="10" y="58" fill="#93c5fd" fontSize="9.5">
              Robinson Formula: {display.robinsonLbs} lbs
            </text>
            <text x="10" y="70" fill="#fcd34d" fontSize="9">
              WHO Normal BMI: {display.whoMinLbs}–{display.whoMaxLbs} lbs
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-emerald-500" /> Devine (1974) Clinical Hospital Dosage Standard
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-purple-500" /> Hamwi (1964) Dietitian Guideline
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-blue-500" /> Robinson (1983) General Population Model
        </span>
      </div>
    </div>
  );
}
