"use client";

import { useState, useRef, useCallback } from "react";

interface PitchPoint {
  pitch: string;
  angle: string;
  x: number;
  multiplier: number;
  curveY: number;
  sqftActual: number;
  safety: string;
}

const DATA: PitchPoint[] = [
  { pitch: "3/12", angle: "14.0°", x: 70, multiplier: 1.031, curveY: 180, sqftActual: 2062, safety: "Walkable (Low Slope)" },
  { pitch: "4/12", angle: "18.4°", x: 155, multiplier: 1.054, curveY: 165, sqftActual: 2108, safety: "Standard Walkable" },
  { pitch: "6/12", angle: "26.6°", x: 250, multiplier: 1.118, curveY: 130, sqftActual: 2236, safety: "Caution (Steep)" },
  { pitch: "8/12", angle: "33.7°", x: 350, multiplier: 1.202, curveY: 90, sqftActual: 2404, safety: "Toe Boards Required" },
  { pitch: "10/12", angle: "39.8°", x: 450, multiplier: 1.302, curveY: 52, sqftActual: 2604, safety: "Roof Jacks Required" },
  { pitch: "12/12", angle: "45.0°", x: 540, multiplier: 1.414, curveY: 20, sqftActual: 2828, safety: "Full Safety Harness Only" },
];

export function RoofPitchMultiplierChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [active, setActive] = useState<PitchPoint | null>(null);

  const handlePointer = useCallback((clientX: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relativeX = (clientX - rect.left) * (720 / rect.width);
    const clampedX = Math.max(70, Math.min(540, relativeX));

    let closest = DATA[0];
    let minDiff = Infinity;
    for (const pt of DATA) {
      const diff = Math.abs(pt.x - clampedX);
      if (diff < minDiff) {
        minDiff = diff;
        closest = pt;
      }
    }
    setActive(closest);
  }, []);

  const display = active || DATA[2]; // Default to 6/12
  const isHovering = active !== null;

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Roof Pitch Slope Multipliers (Flat Footprint vs Actual Sloped Surface)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isHovering
              ? `Inspecting ${display.pitch} slope (${display.angle}) — Multiplier: ${display.multiplier}x (+${display.sqftActual - 2000} sq ft extra area)`
              : "Visual benchmark showing how steepness increases total surface area over horizontal ground dimensions. Move mouse to inspect."}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            {display.pitch} Pitch: {display.multiplier}x Area ({display.sqftActual.toLocaleString()} sq ft on 2k base)
          </span>
        </div>
      </div>

      <div className="relative overflow-x-auto select-none">
        <svg
          ref={svgRef}
          className="w-full min-w-[620px] cursor-crosshair touch-none"
          viewBox="0 0 720 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onMouseMove={(e) => handlePointer(e.clientX)}
          onTouchMove={(e) => e.touches.length > 0 && handlePointer(e.touches[0].clientX)}
          onMouseLeave={() => setActive(null)}
        >
          {/* Gridlines */}
          <line x1="50" y1="20" x2="680" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="70" x2="680" y2="70" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="120" x2="680" y2="120" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="170" x2="680" y2="170" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="200" x2="680" y2="200" stroke="#94a3b8" strokeWidth="1.5" className="dark:stroke-slate-700" />

          {/* Y-axis labels */}
          <text x="40" y="24" fontSize="11" fill="#64748b" textAnchor="end">1.45x</text>
          <text x="40" y="74" fontSize="11" fill="#64748b" textAnchor="end">1.30x</text>
          <text x="40" y="124" fontSize="11" fill="#64748b" textAnchor="end">1.15x</text>
          <text x="40" y="174" fontSize="11" fill="#64748b" textAnchor="end">1.05x</text>
          <text x="40" y="204" fontSize="11" fill="#64748b" textAnchor="end">1.00x</text>

          {/* X-axis labels */}
          {DATA.map((d) => (
            <text key={d.pitch} x={d.x} y="218" fontSize="11" fill="#64748b" textAnchor="middle">
              {d.pitch}
            </text>
          ))}

          {/* Roof multiplier curve */}
          <path
            d="M70 180 L155 165 L250 130 L350 90 L450 52 L540 20"
            stroke="#10b981"
            strokeWidth="3.5"
            fill="none"
          />

          {/* End Callout */}
          <text x="550" y="22" fontSize="11" fill="#10b981" fontWeight="bold">12/12 Pitch (1.414x Multiplier)</text>

          {/* LIVE HOVER INDICATOR */}
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
          <circle cx={display.x} cy={display.curveY} r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />

          {/* Dynamic Tooltip */}
          <g transform={`translate(${Math.min(Math.max(display.x - 85, 50), 500)}, ${Math.max(15, display.curveY - 72)})`}>
            <rect width="175" height="66" rx="8" fill="rgba(15, 23, 42, 0.94)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
            <text x="10" y="18" fill="#f8fafc" fontSize="11" fontWeight="bold">
              Pitch {display.pitch} ({display.angle})
            </text>
            <circle cx="14" cy="33" r="3.5" fill="#10b981" />
            <text x="24" y="36" fill="#cbd5e1" fontSize="10">
              Multiplier: <tspan fill="#34d399" fontWeight="bold">{display.multiplier}x</tspan>
            </text>
            <text x="10" y="49" fill="#cbd5e1" fontSize="10">
              Actual area: <tspan fill="#60a5fa" fontWeight="bold">{display.sqftActual.toLocaleString()} sq ft</tspan>
            </text>
            <text x="10" y="61" fill="#f59e0b" fontSize="9" fontWeight="bold">
              Safety: {display.safety}
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-emerald-500" /> Pitch Multiplier Curve = √(1 + [Rise/Run]²)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-slate-400" /> Flat Ground Footprint = 2,000 sq ft baseline
        </span>
      </div>
    </div>
  );
}
