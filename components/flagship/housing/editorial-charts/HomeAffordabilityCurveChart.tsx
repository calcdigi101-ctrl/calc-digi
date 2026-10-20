"use client";

import { useState, useRef, useCallback } from "react";

interface AffordabilityPoint {
  salary: number;
  salaryLabel: string;
  x: number;
  rate65Price: number;
  rate65Y: number;
  rate75Price: number;
  rate75Y: number;
}

const DATA: AffordabilityPoint[] = [
  { salary: 60000, salaryLabel: "$60k", x: 70, rate65Price: 242000, rate65Y: 172, rate75Price: 216000, rate75Y: 185 },
  { salary: 80000, salaryLabel: "$80k", x: 145, rate65Price: 323000, rate65Y: 146, rate75Price: 288000, rate75Y: 161 },
  { salary: 100000, salaryLabel: "$100k", x: 220, rate65Price: 404000, rate65Y: 118, rate75Price: 360000, rate75Y: 135 },
  { salary: 120000, salaryLabel: "$120k", x: 295, rate65Price: 485000, rate65Y: 90, rate75Price: 432000, rate75Y: 109 },
  { salary: 150000, salaryLabel: "$150k", x: 410, rate65Price: 606000, rate65Y: 52, rate75Price: 540000, rate75Y: 72 },
  { salary: 180000, salaryLabel: "$180k", x: 500, rate65Price: 727000, rate65Y: 28, rate75Price: 648000, rate75Y: 45 },
  { salary: 200000, salaryLabel: "$200k", x: 550, rate65Price: 808000, rate65Y: 18, rate75Price: 720000, rate75Y: 34 },
];

export function HomeAffordabilityCurveChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [active, setActive] = useState<AffordabilityPoint | null>(null);

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

  const display = active || DATA[3]; // Default to $120k
  const isHovering = active !== null;
  const priceDiff = display.rate65Price - display.rate75Price;

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Salary vs Home Purchasing Power Curve (6.5% vs 7.5% Mortgage Rate)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isHovering
              ? `Inspecting ${display.salaryLabel} salary — rate hike costs $${(priceDiff / 1000).toFixed(0)}k in buying power.`
              : "Visual benchmark showing how annual household income translates into maximum affordable home price. Move mouse to inspect."}
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
          <text x="40" y="24" fontSize="11" fill="#64748b" textAnchor="end">$800k</text>
          <text x="40" y="74" fontSize="11" fill="#64748b" textAnchor="end">$600k</text>
          <text x="40" y="124" fontSize="11" fill="#64748b" textAnchor="end">$400k</text>
          <text x="40" y="174" fontSize="11" fill="#64748b" textAnchor="end">$200k</text>
          <text x="40" y="204" fontSize="11" fill="#64748b" textAnchor="end">$0</text>

          {/* X-axis labels */}
          {DATA.map((d) => (
            <text key={d.salary} x={d.x} y="218" fontSize="11" fill="#64748b" textAnchor="middle">
              {d.salaryLabel}
            </text>
          ))}

          {/* 7.5% Rate Curve (Blue dashed) */}
          <path
            d="M70 185 L145 161 L220 135 L295 109 L410 72 L500 45 L550 34"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeDasharray="4 4"
            fill="none"
          />

          {/* 6.5% Rate Curve (Emerald solid) */}
          <path
            d="M70 172 L145 146 L220 118 L295 90 L410 52 L500 28 L550 18"
            stroke="#10b981"
            strokeWidth="3.5"
            fill="none"
          />

          {/* End Callouts */}
          <text x="560" y="20" fontSize="11" fill="#10b981" fontWeight="bold">6.5% Rate ($808k)</text>
          <text x="560" y="38" fontSize="11" fill="#3b82f6" fontWeight="semibold">7.5% Rate ($720k)</text>

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
          <circle cx={display.x} cy={display.rate65Y} r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
          <circle cx={display.x} cy={display.rate75Y} r="6" fill="#3b82f6" stroke="#ffffff" strokeWidth="2.5" />

          {/* Dynamic Tooltip */}
          <g transform={`translate(${Math.min(Math.max(display.x - 80, 50), 500)}, ${Math.max(15, display.rate65Y - 78)})`}>
            <rect width="165" height="68" rx="8" fill="rgba(15, 23, 42, 0.94)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
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

      <div className="mt-3 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400">
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
