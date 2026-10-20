"use client";

import { useState, useRef, useCallback } from "react";

interface ConcretePoint {
  sqft: number;
  label: string;
  x: number;
  depth4Y: number;
  depth4Yards: number;
  depth4Bags: number;
  depth6Y: number;
  depth6Yards: number;
  depth6Bags: number;
}

const DATA: ConcretePoint[] = [
  { sqft: 100, label: "100 sq ft", x: 70, depth4Y: 182, depth4Yards: 1.4, depth4Bags: 63, depth6Y: 172, depth6Yards: 2.1, depth6Bags: 95 },
  { sqft: 300, label: "300 sq ft", x: 165, depth4Y: 152, depth4Yards: 4.1, depth4Bags: 185, depth6Y: 128, depth6Yards: 6.2, depth6Bags: 279 },
  { sqft: 500, label: "500 sq ft", x: 260, depth4Y: 122, depth4Yards: 6.8, depth4Bags: 306, depth6Y: 84, depth6Yards: 10.2, depth6Bags: 459 },
  { sqft: 750, label: "750 sq ft", x: 375, depth4Y: 85, depth4Yards: 10.2, depth4Bags: 459, depth6Y: 42, depth6Yards: 15.3, depth6Bags: 689 },
  { sqft: 1000, label: "1,000 sq ft", x: 490, depth4Y: 48, depth4Yards: 13.6, depth4Bags: 612, depth6Y: 20, depth6Yards: 20.4, depth6Bags: 918 },
  { sqft: 1200, label: "1,200 sq ft", x: 550, depth4Y: 22, depth4Yards: 16.3, depth4Bags: 734, depth6Y: 14, depth6Yards: 24.5, depth6Bags: 1103 },
];

export function ConcreteVolumeCurveChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [active, setActive] = useState<ConcretePoint | null>(null);

  const handlePointer = useCallback((clientX: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relativeX = (clientX - rect.left) * (720 / rect.width);
    const clampedX = Math.max(70, Math.min(550, relativeX));

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

  const display = active || DATA[2]; // Default to 500 sq ft
  const isHovering = active !== null;

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Concrete Volume Curve: 4″ vs 6″ Slab Depth (Cubic Yards vs Surface Area)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isHovering
              ? `Inspecting ${display.label} — 4″ patio: ${display.depth4Yards} yd³ vs 6″ driveway: ${display.depth6Yards} yd³`
              : "Visual benchmark comparing required yardage (with 10% waste buffer) across typical residential footprint sizes. Move mouse to inspect."}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            {display.label}: {display.depth4Yards} yd³ (4″) vs {display.depth6Yards} yd³ (6″)
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
          <text x="40" y="24" fontSize="11" fill="#64748b" textAnchor="end">20 yd³</text>
          <text x="40" y="74" fontSize="11" fill="#64748b" textAnchor="end">15 yd³</text>
          <text x="40" y="124" fontSize="11" fill="#64748b" textAnchor="end">10 yd³</text>
          <text x="40" y="174" fontSize="11" fill="#64748b" textAnchor="end">5 yd³</text>
          <text x="40" y="204" fontSize="11" fill="#64748b" textAnchor="end">0 yd³</text>

          {/* X-axis labels */}
          {DATA.map((d) => (
            <text key={d.sqft} x={d.x} y="218" fontSize="11" fill="#64748b" textAnchor="middle">
              {d.sqft} sq ft
            </text>
          ))}

          {/* 6" Heavy Slab curve (Blue dashed) */}
          <path
            d="M70 172 L165 128 L260 84 L375 42 L490 20 L550 14"
            stroke="#2563eb"
            strokeWidth="3"
            strokeDasharray="4 4"
            fill="none"
          />

          {/* 4" Standard Slab curve (Emerald solid) */}
          <path
            d="M70 182 L165 152 L260 122 L375 85 L490 48 L550 22"
            stroke="#10b981"
            strokeWidth="3.5"
            fill="none"
          />

          {/* End Callouts */}
          <text x="560" y="18" fontSize="11" fill="#2563eb" fontWeight="bold">6″ Heavy Driveway (~24.5 yd³)</text>
          <text x="560" y="36" fontSize="11" fill="#10b981" fontWeight="bold">4″ Standard Patio (~16.3 yd³)</text>

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
          <circle cx={display.x} cy={display.depth4Y} r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
          <circle cx={display.x} cy={display.depth6Y} r="6" fill="#2563eb" stroke="#ffffff" strokeWidth="2.5" />

          {/* Dynamic Tooltip */}
          <g transform={`translate(${Math.min(Math.max(display.x - 80, 50), 500)}, ${Math.max(15, display.depth6Y - 78)})`}>
            <rect width="170" height="70" rx="8" fill="rgba(15, 23, 42, 0.94)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
            <text x="10" y="18" fill="#f8fafc" fontSize="11" fontWeight="bold">
              {display.sqft} sq ft Slab
            </text>
            <circle cx="14" cy="33" r="3.5" fill="#10b981" />
            <text x="24" y="36" fill="#cbd5e1" fontSize="10">
              4″ Depth: <tspan fill="#34d399" fontWeight="bold">{display.depth4Yards} yd³</tspan> ({display.depth4Bags} bags)
            </text>
            <circle cx="14" cy="49" r="3.5" fill="#3b82f6" />
            <text x="24" y="52" fill="#cbd5e1" fontSize="10">
              6″ Depth: <tspan fill="#60a5fa" fontWeight="bold">{display.depth6Yards} yd³</tspan> ({display.depth6Bags} bags)
            </text>
            <text x="10" y="64" fill="#f59e0b" fontSize="9" fontWeight="bold">
              Extra volume for 6″: +{(display.depth6Yards - display.depth4Yards).toFixed(1)} yd³ (+50%)
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-emerald-500" /> 4-Inch Depth (Patios, Walkways &amp; Shed Slabs)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-blue-600" /> 6-Inch Depth (Vehicle Driveways &amp; RV Pads)
        </span>
      </div>
    </div>
  );
}
