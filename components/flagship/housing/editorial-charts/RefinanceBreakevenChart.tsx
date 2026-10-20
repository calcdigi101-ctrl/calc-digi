"use client";

import { useState, useRef, useCallback } from "react";

interface RefinancePoint {
  month: number;
  monthLabel: string;
  x: number;
  savings: number;
  netY: number;
  netVal: number;
}

const DATA: RefinancePoint[] = [
  { month: 0, monthLabel: "Mo 0", x: 70, savings: 0, netY: 185, netVal: -5500 },
  { month: 12, monthLabel: "Mo 12", x: 165, savings: 3000, netY: 155, netVal: -2500 },
  { month: 22, monthLabel: "Mo 22 (Break-even)", x: 245, savings: 5500, netY: 120, netVal: 0 },
  { month: 36, monthLabel: "Mo 36", x: 355, savings: 9000, netY: 85, netVal: 3500 },
  { month: 48, monthLabel: "Mo 48", x: 450, savings: 12000, netY: 55, netVal: 6500 },
  { month: 60, monthLabel: "Mo 60", x: 540, savings: 15000, netY: 25, netVal: 9500 },
];

export function RefinanceBreakevenChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [active, setActive] = useState<RefinancePoint | null>(null);

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

  const display = active || DATA[2]; // Default to breakeven at Month 22
  const isHovering = active !== null;
  const isProfitable = display.netVal >= 0;

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Refinance Breakeven Horizon &amp; Cumulative Net Cash Savings
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isHovering
              ? `Inspecting Month ${display.month} — Cumulative net position: ${isProfitable ? "+$" : "-$"}${Math.abs(display.netVal).toLocaleString()}`
              : "Visual benchmark showing the crossover point where monthly payment savings surpass upfront closing fees ($5,500 fees at $250/mo savings). Move mouse to inspect."}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            {display.monthLabel}: {isProfitable ? "Net Profit +$" : "Net Cost -$"}{Math.abs(display.netVal).toLocaleString()}
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
          <line x1="50" y1="25" x2="680" y2="25" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="70" x2="680" y2="70" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="120" x2="680" y2="120" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="50" y1="170" x2="680" y2="170" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="200" x2="680" y2="200" stroke="#94a3b8" strokeWidth="1.5" className="dark:stroke-slate-700" />

          {/* Y-axis labels */}
          <text x="40" y="28" fontSize="11" fill="#64748b" textAnchor="end">+$10k</text>
          <text x="40" y="74" fontSize="11" fill="#64748b" textAnchor="end">+$5k</text>
          <text x="40" y="124" fontSize="11" fill="#10b981" fontWeight="bold" textAnchor="end">$0 (Break-even)</text>
          <text x="40" y="174" fontSize="11" fill="#64748b" textAnchor="end">-$5k</text>
          <text x="40" y="204" fontSize="11" fill="#64748b" textAnchor="end">Fees</text>

          {/* X-axis labels */}
          {DATA.map((d) => (
            <text key={d.month} x={d.x} y="218" fontSize="11" fill="#64748b" textAnchor="middle">
              {d.month === 22 ? "Mo 22" : d.monthLabel}
            </text>
          ))}

          {/* Breakeven zero baseline */}
          <line x1="50" y1="120" x2="680" y2="120" stroke="#94a3b8" strokeWidth="1" />

          {/* Trajectory Curve (Purple to Emerald) */}
          <path
            d="M70 185 L165 155 L245 120 L355 85 L450 55 L540 25"
            stroke="#10b981"
            strokeWidth="3.5"
            fill="none"
          />

          {/* Closing Cost Threshold line */}
          <line x1="70" y1="185" x2="540" y2="185" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x="550" y="188" fontSize="11" fill="#ef4444" fontWeight="semibold">-$5,500 Closing Fees</text>

          {/* Breakeven Marker */}
          <circle cx="245" cy="120" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
          <text x="255" y="114" fontSize="11" fill="#10b981" fontWeight="bold">Breakeven Crossover (Month 22)</text>
          <text x="550" y="28" fontSize="11" fill="#10b981" fontWeight="bold">+$9,500 Net Profit</text>

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
          <circle cx={display.x} cy={display.netY} r="6" fill="#6366f1" stroke="#ffffff" strokeWidth="2.5" />

          {/* Floating Tooltip */}
          <g transform={`translate(${Math.min(Math.max(display.x - 80, 50), 500)}, ${Math.max(15, display.netY - 72)})`}>
            <rect width="165" height="66" rx="8" fill="rgba(15, 23, 42, 0.94)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
            <text x="10" y="18" fill="#f8fafc" fontSize="11" fontWeight="bold">
              Timeline: Month {display.month}
            </text>
            <text x="10" y="34" fill="#cbd5e1" fontSize="10">
              Total monthly savings: <tspan fill="#34d399" fontWeight="bold">${display.savings.toLocaleString()}</tspan>
            </text>
            <text x="10" y="48" fill="#cbd5e1" fontSize="10">
              Net balance: <tspan fill={isProfitable ? "#34d399" : "#f87171"} fontWeight="bold">{isProfitable ? "+$" : "-$"}{Math.abs(display.netVal).toLocaleString()}</tspan>
            </text>
            <text x="10" y="60" fill={isProfitable ? "#34d399" : "#f59e0b"} fontSize="9" fontWeight="bold">
              {display.month >= 22 ? "✓ Pure profit territory" : "Amortizing closing costs"}
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-emerald-500" /> Net Wealth Created (Savings minus $5,500 closing costs)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-red-500" /> Upfront Closing Costs Out-of-Pocket
        </span>
      </div>
    </div>
  );
}
