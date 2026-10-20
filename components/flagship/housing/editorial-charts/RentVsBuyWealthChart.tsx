"use client";

import { useState, useRef, useCallback } from "react";

interface TrajectoryPoint {
  year: number;
  x: number;
  buyerY: number;
  buyerVal: number;
  renterY: number;
  renterVal: number;
}

const TRAJECTORY_DATA: TrajectoryPoint[] = [
  { year: 1, x: 70, buyerY: 178, buyerVal: 38000, renterY: 148, renterVal: 72000 },
  { year: 2, x: 120, buyerY: 165, buyerVal: 65000, renterY: 141, renterVal: 87000 },
  { year: 3, x: 170, buyerY: 152, buyerVal: 95000, renterY: 135, renterVal: 105000 },
  { year: 4, x: 220, buyerY: 133, buyerVal: 132000, renterY: 127, renterVal: 125000 },
  { year: 4.5, x: 270, buyerY: 118, buyerVal: 155000, renterY: 120, renterVal: 142000 },
  { year: 5, x: 300, buyerY: 108, buyerVal: 175000, renterY: 115, renterVal: 153000 },
  { year: 6, x: 350, buyerY: 88, buyerVal: 215000, renterY: 106, renterVal: 172000 },
  { year: 7, x: 400, buyerY: 65, buyerVal: 255000, renterY: 98, renterVal: 195000 },
  { year: 8, x: 450, buyerY: 48, buyerVal: 295000, renterY: 88, renterVal: 218000 },
  { year: 9, x: 495, buyerY: 34, buyerVal: 330000, renterY: 78, renterVal: 242000 },
  { year: 10, x: 540, buyerY: 22, buyerVal: 365000, renterY: 68, renterVal: 270000 },
];

export function RentVsBuyWealthChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [active, setActive] = useState<TrajectoryPoint | null>(null);

  const handlePointer = useCallback((clientX: number) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relativeX = (clientX - rect.left) * (720 / rect.width);

    // Clamp between first and last data point
    const clampedX = Math.max(70, Math.min(540, relativeX));

    // Find closest data point or interpolate
    let closest = TRAJECTORY_DATA[0];
    let minDiff = Infinity;
    for (const pt of TRAJECTORY_DATA) {
      const diff = Math.abs(pt.x - clampedX);
      if (diff < minDiff) {
        minDiff = diff;
        closest = pt;
      }
    }
    setActive(closest);
  }, []);

  const onMouseMove = (e: React.MouseEvent<SVGSVGElement>) => handlePointer(e.clientX);
  const onTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length > 0) handlePointer(e.touches[0].clientX);
  };
  const onLeave = () => setActive(null);

  const display = active || TRAJECTORY_DATA[4]; // Default to breakeven point (Year 4.5)
  const isHovering = active !== null;
  const buyerAhead = display.buyerVal >= display.renterVal;
  const diffVal = Math.abs(display.buyerVal - display.renterVal);

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            10-Year Net Wealth Trajectory: Home Equity vs Renter Investment Portfolio
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isHovering
              ? "Live tracking enabled — move mouse / drag finger across years to inspect wealth crossover."
              : "Visual benchmark showing the breakeven crossover point (typically between Year 4 and Year 5). Move mouse to inspect."}
          </p>
        </div>

        {/* Live Status Pill */}
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            Yr {display.year}: {buyerAhead ? "Buyer ahead +" : "Renter ahead +"}
            ${(diffVal / 1000).toFixed(0)}k
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
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
          onMouseLeave={onLeave}
        >
          {/* Background Gridlines */}
          <line x1="50" y1="20" x2="680" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="70" x2="680" y2="70" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="120" x2="680" y2="120" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="170" x2="680" y2="170" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="200" x2="680" y2="200" stroke="#94a3b8" strokeWidth="1.5" className="dark:stroke-slate-700" />

          {/* Y-axis labels */}
          <text x="40" y="24" fontSize="11" fill="#64748b" textAnchor="end">$300k</text>
          <text x="40" y="74" fontSize="11" fill="#64748b" textAnchor="end">$200k</text>
          <text x="40" y="124" fontSize="11" fill="#64748b" textAnchor="end">$100k</text>
          <text x="40" y="174" fontSize="11" fill="#64748b" textAnchor="end">$50k</text>
          <text x="40" y="204" fontSize="11" fill="#64748b" textAnchor="end">$0</text>

          {/* X-axis labels (Years) */}
          <text x="70" y="218" fontSize="11" fill="#64748b" textAnchor="middle">Yr 1</text>
          <text x="170" y="218" fontSize="11" fill="#64748b" textAnchor="middle">Yr 3</text>
          <text x="270" y="218" fontSize="11" fill="#64748b" textAnchor="middle">Yr 5</text>
          <text x="400" y="218" fontSize="11" fill="#64748b" textAnchor="middle">Yr 7</text>
          <text x="540" y="218" fontSize="11" fill="#64748b" textAnchor="middle">Yr 10</text>

          {/* Renter Portfolio Curve (Blue, starts higher due to down payment cash) */}
          <path
            d="M70 148 L120 141 L170 135 L220 127 L270 120 L300 115 L350 106 L400 98 L450 88 L495 78 L540 68"
            stroke="#2563eb"
            strokeWidth="3"
            strokeDasharray="4 4"
            fill="none"
          />

          {/* Buyer Home Equity Curve (Emerald, starts lower after closing fees, accelerates upward) */}
          <path
            d="M70 178 L120 165 L170 152 L220 133 L270 118 L300 108 L350 88 L400 65 L450 48 L495 34 L540 22"
            stroke="#10b981"
            strokeWidth="3.5"
            fill="none"
          />

          {/* Static Breakeven Marker */}
          <circle cx="270" cy="118" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
          <text x="280" y="114" fontSize="11" fill="#10b981" fontWeight="bold">
            Breakeven (Yr 4.5)
          </text>

          {/* End values */}
          <text x="550" y="22" fontSize="11" fill="#10b981" fontWeight="bold">Buyer Equity (~$365k)</text>
          <text x="550" y="68" fontSize="11" fill="#2563eb" fontWeight="semibold">Renter Portfolio (~$270k)</text>

          {/* LIVE HOVER / CURSOR CROSSHAIR & POINTS */}
          {/* Vertical cursor guide */}
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

          {/* Live tracking dots */}
          <circle
            cx={display.x}
            cy={display.buyerY}
            r="6"
            fill="#10b981"
            stroke="#ffffff"
            strokeWidth="2.5"
            className="transition-all duration-75"
          />
          <circle
            cx={display.x}
            cy={display.renterY}
            r="6"
            fill="#2563eb"
            stroke="#ffffff"
            strokeWidth="2.5"
            className="transition-all duration-75"
          />

          {/* Dynamic Tooltip Box right on SVG canvas */}
          <g transform={`translate(${Math.min(Math.max(display.x - 70, 50), 510)}, ${Math.max(15, Math.min(display.buyerY, display.renterY) - 75)})`}>
            <rect
              width="145"
              height="65"
              rx="8"
              fill="rgba(15, 23, 42, 0.94)"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
            />
            <text x="10" y="18" fill="#f8fafc" fontSize="11" fontWeight="bold">
              Year {display.year} Benchmark
            </text>
            <circle cx="14" cy="33" r="3.5" fill="#10b981" />
            <text x="24" y="36" fill="#cbd5e1" fontSize="10">
              Buyer: <tspan fill="#34d399" fontWeight="bold">${(display.buyerVal / 1000).toFixed(0)}k</tspan>
            </text>
            <circle cx="14" cy="49" r="3.5" fill="#3b82f6" />
            <text x="24" y="52" fill="#cbd5e1" fontSize="10">
              Renter: <tspan fill="#60a5fa" fontWeight="bold">${(display.renterVal / 1000).toFixed(0)}k</tspan>
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-emerald-500" /> Buyer Net Home Equity (After 6% Selling Costs)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-blue-600" /> Renter S&amp;P 500 Investment Portfolio (7% Annual Return)
        </span>
      </div>
    </div>
  );
}
