"use client";

import { useState, useRef, useCallback } from "react";

interface AffordPoint {
  salary: number;
  salaryLabel: string;
  x: number;
  rate65Y: number;
  rate65Price: number;
  rate75Y: number;
  rate75Price: number;
}

const DATA: AffordPoint[] = [
  { salary: 50000, salaryLabel: "$50k", x: 70, rate65Y: 172, rate65Price: 195000, rate75Y: 185, rate75Price: 175000 },
  { salary: 75000, salaryLabel: "$75k", x: 145, rate65Y: 142, rate65Price: 295000, rate75Y: 161, rate75Price: 265000 },
  { salary: 100000, salaryLabel: "$100k", x: 220, rate65Y: 112, rate65Price: 395000, rate75Y: 135, rate75Price: 350000 },
  { salary: 125000, salaryLabel: "$125k", x: 295, rate65Y: 82, rate65Price: 495000, rate75Y: 109, rate75Price: 440000 },
  { salary: 150000, salaryLabel: "$150k", x: 410, rate65Y: 52, rate65Price: 595000, rate75Y: 72, rate75Price: 530000 },
  { salary: 175000, salaryLabel: "$175k", x: 500, rate65Y: 28, rate65Price: 695000, rate75Y: 45, rate75Price: 620000 },
  { salary: 200000, salaryLabel: "$200k", x: 550, rate65Y: 18, rate65Price: 795000, rate75Y: 34, rate75Price: 710000 },
];

export function HomeAffordabilityCurveChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [active, setActive] = useState<AffordPoint | null>(null);

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

  const display = active || DATA[2]; // Default to $100k
  const isHovering = active !== null;
  const priceDiff = display.rate65Price - display.rate75Price;

  const tooltipX = display.x > 360 ? display.x - 175 : display.x + 15;
  const tooltipY = Math.max(15, display.rate65Y - 78);

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-3.5 sm:p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
            Home Affordability Purchasing Power Curve: 6.5% vs 7.5% Mortgage Rate
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isHovering
              ? `Inspecting ${display.salaryLabel} income — 6.5% max home: $${(display.rate65Price / 1000).toFixed(0)}k | 7.5% max: $${(display.rate75Price / 1000).toFixed(0)}k`
              : "Visual benchmark demonstrating how +1.00% interest rate shift impacts total purchasing power. Move mouse/touch to inspect."}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            {display.salaryLabel} Income: Max ${(display.rate65Price / 1000).toFixed(0)}k (6.5%) vs ${(display.rate75Price / 1000).toFixed(0)}k (7.5%)
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
          <line x1="50" y1="70" x2="680" y2="70" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="120" x2="680" y2="120" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="170" x2="680" y2="170" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="200" x2="680" y2="200" stroke="#94a3b8" strokeWidth="1.5" className="dark:stroke-slate-700" />

          {/* Y-axis labels */}
          <text x="45" y="24" fontSize="11" fill="#64748b" textAnchor="end">$800k</text>
          <text x="45" y="74" fontSize="11" fill="#64748b" textAnchor="end">$600k</text>
          <text x="45" y="124" fontSize="11" fill="#64748b" textAnchor="end">$400k</text>
          <text x="45" y="174" fontSize="11" fill="#64748b" textAnchor="end">$200k</text>
          <text x="45" y="204" fontSize="11" fill="#64748b" textAnchor="end">$0</text>

          {/* X-axis labels */}
          {DATA.map((d) => (
            <text key={d.salary} x={d.x} y="218" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
              {d.salaryLabel}
            </text>
          ))}

          {/* 7.5% Rate Curve (Blue dashed) */}
          <path
            d="M70 185 L145 161 L220 135 L295 109 L410 72 L500 45 L550 34"
            stroke="#3b82f6"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            fill="none"
          />

          {/* 6.5% Rate Curve (Emerald solid) */}
          <path
            d="M70 172 L145 142 L220 112 L295 82 L410 52 L500 28 L550 18"
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
          <circle cx={display.x} cy={display.rate65Y} r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
          <circle cx={display.x} cy={display.rate75Y} r="6" fill="#3b82f6" stroke="#ffffff" strokeWidth="2.5" />

          {/* Dynamic Tooltip */}
          <g transform={`translate(${tooltipX}, ${tooltipY})`}>
            <rect width="170" height="68" rx="8" fill="rgba(15, 23, 42, 0.94)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
            <text x="10" y="18" fill="#f8fafc" fontSize="11" fontWeight="bold">
              Salary: {display.salaryLabel}/yr
            </text>
            <circle cx="14" cy="33" r="3.5" fill="#10b981" />
            <text x="24" y="36" fill="#cbd5e1" fontSize="10">
              6.5% Rate: <tspan fill="#34d399" fontWeight="bold">${(display.rate65Price / 1000).toFixed(0)}k</tspan>
            </text>
            <circle cx="14" cy="49" r="3.5" fill="#3b82f6" />
            <text x="24" y="52" fill="#cbd5e1" fontSize="10">
              7.5% Rate: <tspan fill="#60a5fa" fontWeight="bold">${(display.rate75Price / 1000).toFixed(0)}k</tspan>
            </text>
            <text x="10" y="63" fill="#f59e0b" fontSize="9" fontWeight="bold">
              Rate penalty: -${(priceDiff / 1000).toFixed(0)}k purchasing power
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-emerald-500" /> 6.5% 30-Year Fixed (28% Front-End DTI Cap)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-blue-500" /> 7.5% 30-Year Fixed (+1.00% Rate Stress Test)
        </span>
      </div>
    </div>
  );
}
