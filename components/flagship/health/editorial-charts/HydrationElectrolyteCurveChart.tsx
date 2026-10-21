"use client";

import { useState, useRef, useCallback } from "react";

interface HydrationPoint {
  durationMin: number;
  x: number;
  temperateOz: number;
  warmOz: number;
  hotOz: number;
  temperateY: number;
  warmY: number;
  hotY: number;
  cups: number;
}

const DURATION_DATA: HydrationPoint[] = [
  { durationMin: 0, x: 70, temperateOz: 90, warmOz: 104, hotOz: 112, temperateY: 165, warmY: 145, hotY: 132, cups: 11 },
  { durationMin: 20, x: 155, temperateOz: 98, warmOz: 113, hotOz: 123, temperateY: 152, warmY: 130, hotY: 115, cups: 12 },
  { durationMin: 40, x: 250, temperateOz: 106, warmOz: 122, hotOz: 133, temperateY: 140, warmY: 116, hotY: 100, cups: 13 },
  { durationMin: 60, x: 350, temperateOz: 114, warmOz: 131, hotOz: 143, temperateY: 128, warmY: 102, hotY: 84, cups: 14 },
  { durationMin: 80, x: 450, temperateOz: 122, warmOz: 140, hotOz: 153, temperateY: 115, warmY: 88, hotY: 69, cups: 15 },
  { durationMin: 100, x: 540, temperateOz: 130, warmOz: 150, hotOz: 163, temperateY: 103, warmY: 74, hotY: 53, cups: 16 },
  { durationMin: 120, x: 630, temperateOz: 138, warmOz: 159, hotOz: 173, temperateY: 90, warmY: 60, hotY: 38, cups: 17 },
];

export function HydrationElectrolyteCurveChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [active, setActive] = useState<HydrationPoint | null>(null);

  const handlePointer = useCallback((clientX: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relativeX = (clientX - rect.left) * (720 / rect.width);
    const clampedX = Math.max(70, Math.min(630, relativeX));

    let closest = DURATION_DATA[0];
    let minDiff = Infinity;
    for (const pt of DURATION_DATA) {
      const diff = Math.abs(pt.x - clampedX);
      if (diff < minDiff) {
        minDiff = diff;
        closest = pt;
      }
    }
    setActive(closest);
  }, []);

  const display = active || DURATION_DATA[3]; // Default to 60 min workout
  const isHovering = active !== null;

  const tooltipX = display.x > 360 ? display.x - 180 : display.x + 15;
  const tooltipY = Math.max(15, display.hotY - 50);

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-3.5 sm:p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
            Fluid Requirements vs Exercise Duration &amp; Climate Zones
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isHovering
              ? `Inspecting ${display.durationMin} min exercise — Temperate: ${display.temperateOz} oz | Hot Summer: ${display.hotOz} oz (~${(display.hotOz / 8).toFixed(1)} cups)`
              : "Sweat loss and hydration volume trajectory across training durations from rest to 2 hours of exercise. Move mouse/touch to inspect."}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 max-w-full break-words dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            {display.durationMin} Min Workout: {display.temperateOz}–{display.hotOz} fl oz ({((display.temperateOz * 0.0295735)).toFixed(1)}–{((display.hotOz * 0.0295735)).toFixed(1)} L)
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
          <text x="45" y="24" fontSize="11" fill="#64748b" textAnchor="end">180 oz</text>
          <text x="45" y="69" fontSize="11" fill="#64748b" textAnchor="end">150 oz</text>
          <text x="45" y="114" fontSize="11" fill="#64748b" textAnchor="end">120 oz</text>
          <text x="45" y="159" fontSize="11" fill="#64748b" textAnchor="end">90 oz</text>
          <text x="45" y="204" fontSize="11" fill="#64748b" textAnchor="end">60 oz</text>

          {/* X-axis labels */}
          {DURATION_DATA.map((d) => (
            <text key={d.durationMin} x={d.x} y="218" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
              {d.durationMin === 0 ? "Rest / Baseline" : `${d.durationMin}m Workout`}
            </text>
          ))}

          {/* Hot / Desert Zone Curve (Amber Solid) */}
          <path
            d="M70 132 L155 115 L250 100 L350 84 L450 69 L540 53 L630 38"
            stroke="#f59e0b"
            strokeWidth="3"
            fill="none"
          />

          {/* Warm / Humid Curve (Blue Dashed) */}
          <path
            d="M70 145 L155 130 L250 116 L350 102 L450 88 L540 74 L630 60"
            stroke="#3b82f6"
            strokeWidth="2.5"
            strokeDasharray="4 2"
            fill="none"
          />

          {/* Temperate Baseline Curve (Emerald Solid) */}
          <path
            d="M70 165 L155 152 L250 140 L350 128 L450 115 L540 103 L630 90"
            stroke="#10b981"
            strokeWidth="3.5"
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

          <circle cx={display.x} cy={display.temperateY} r="5.5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
          <circle cx={display.x} cy={display.hotY} r="5.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />

          {/* Dynamic Tooltip */}
          <g transform={`translate(${tooltipX}, ${tooltipY})`}>
            <rect width="180" height="74" rx="8" fill="rgba(15, 23, 42, 0.94)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
            <text x="10" y="16" fill="#f8fafc" fontSize="11" fontWeight="bold">
              {display.durationMin} Min Physical Activity
            </text>
            <text x="10" y="32" fill="#34d399" fontSize="10.5" fontWeight="bold">
              Temperate Climate: {display.temperateOz} oz ({(display.temperateOz * 0.0295735).toFixed(1)} L)
            </text>
            <text x="10" y="46" fill="#93c5fd" fontSize="9.5">
              Warm/Humid: {display.warmOz} oz ({(display.warmOz * 0.0295735).toFixed(1)} L)
            </text>
            <text x="10" y="58" fill="#fcd34d" fontSize="9.5" fontWeight="bold">
              Extreme Heat/Desert: {display.hotOz} oz ({(display.hotOz * 0.0295735).toFixed(1)} L)
            </text>
            <text x="10" y="70" fill="#cbd5e1" fontSize="9">
              Electrolyte replenishment needed &gt; 60m
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-emerald-500" /> Temperate Baseline (Standard Indoor / Moderate Weather)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-blue-500" /> Warm / Humid (+15% Sweat Loss)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-amber-500" /> Extreme Heat (+25% Evaporative Perspiration)
        </span>
      </div>
    </div>
  );
}
