"use client";

import { useState, useRef, useCallback } from "react";

interface RentPoint {
  salary: number;
  label: string;
  x: number;
  rent30Y: number;
  rent30Val: number;
  rent40xY: number;
  rent40xVal: number;
  takeHomeVal: number;
}

const DATA: RentPoint[] = [
  { salary: 40000, label: "$40k", x: 70, rent30Y: 175, rent30Val: 1000, rent40xY: 175, rent40xVal: 1000, takeHomeVal: 2750 },
  { salary: 60000, label: "$60k", x: 155, rent30Y: 145, rent30Val: 1500, rent40xY: 145, rent40xVal: 1500, takeHomeVal: 3950 },
  { salary: 80000, label: "$80k", x: 240, rent30Y: 115, rent30Val: 2000, rent40xY: 115, rent40xVal: 2000, takeHomeVal: 5100 },
  { salary: 100000, label: "$100k", x: 325, rent30Y: 85, rent30Val: 2500, rent40xY: 85, rent40xVal: 2500, takeHomeVal: 6200 },
  { salary: 120000, label: "$120k", x: 410, rent30Y: 55, rent30Val: 3000, rent40xY: 55, rent40xVal: 3000, takeHomeVal: 7300 },
  { salary: 150000, label: "$150k", x: 535, rent30Y: 20, rent30Val: 3750, rent40xY: 20, rent40xVal: 3750, takeHomeVal: 8900 },
];

export function RentBudgetCurveChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [active, setActive] = useState<RentPoint | null>(null);

  const handlePointer = useCallback((clientX: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relativeX = (clientX - rect.left) * (720 / rect.width);
    const clampedX = Math.max(70, Math.min(535, relativeX));

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

  const display = active || DATA[2]; // Default to $80k
  const isHovering = active !== null;

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Salary vs Maximum Rent Budget (30% Rule vs 40x Metro Rule)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isHovering
              ? `Inspecting ${display.label} salary — Maximum landlord approval rent: $${display.rent30Val}/mo`
              : "Visual benchmark showing how gross salary translates into maximum approved monthly rent. Move mouse to inspect."}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            {display.label} Salary: Max ${display.rent30Val}/mo Rent (Est. ${display.takeHomeVal}/mo net pay)
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
          <text x="40" y="24" fontSize="11" fill="#64748b" textAnchor="end">$4,000</text>
          <text x="40" y="74" fontSize="11" fill="#64748b" textAnchor="end">$3,000</text>
          <text x="40" y="124" fontSize="11" fill="#64748b" textAnchor="end">$2,000</text>
          <text x="40" y="174" fontSize="11" fill="#64748b" textAnchor="end">$1,000</text>
          <text x="40" y="204" fontSize="11" fill="#64748b" textAnchor="end">$0</text>

          {/* X-axis labels */}
          {DATA.map((d) => (
            <text key={d.salary} x={d.x} y="218" fontSize="11" fill="#64748b" textAnchor="middle">
              {d.label}
            </text>
          ))}

          {/* 30% Rule Curve */}
          <path
            d="M70 175 L155 145 L240 115 L325 85 L410 55 L535 20"
            stroke="#10b981"
            strokeWidth="3.5"
            fill="none"
          />

          {/* End Callout */}
          <text x="545" y="22" fontSize="11" fill="#10b981" fontWeight="bold">Max Rent ($3,750/mo)</text>

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
          <circle cx={display.x} cy={display.rent30Y} r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />

          {/* Dynamic Tooltip */}
          <g transform={`translate(${Math.min(Math.max(display.x - 80, 50), 500)}, ${Math.max(15, display.rent30Y - 72)})`}>
            <rect width="170" height="66" rx="8" fill="rgba(15, 23, 42, 0.94)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
            <text x="10" y="18" fill="#f8fafc" fontSize="11" fontWeight="bold">
              Salary: {display.label} / year
            </text>
            <circle cx="14" cy="33" r="3.5" fill="#10b981" />
            <text x="24" y="36" fill="#cbd5e1" fontSize="10">
              30% Rule Cap: <tspan fill="#34d399" fontWeight="bold">${display.rent30Val}/mo</tspan>
            </text>
            <circle cx="14" cy="48" r="3.5" fill="#3b82f6" />
            <text x="24" y="51" fill="#cbd5e1" fontSize="10">
              Est. Net Pay: <tspan fill="#60a5fa" fontWeight="bold">${display.takeHomeVal}/mo</tspan>
            </text>
            <text x="10" y="61" fill="#94a3b8" fontSize="9">
              Remaining after rent: ${(display.takeHomeVal - display.rent30Val).toLocaleString()}/mo
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-emerald-500" /> 30% Gross Income Standard (Max Recommended Ceiling)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-blue-500" /> 40x Monthly Rent Metro Landlord Qualifying Threshold
        </span>
      </div>
    </div>
  );
}
