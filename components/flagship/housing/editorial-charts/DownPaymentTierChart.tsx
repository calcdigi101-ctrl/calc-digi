"use client";

import { useState } from "react";

interface Tier {
  id: string;
  label: string;
  pct: string;
  downCash: number;
  loanAmt: number;
  monthlyPI: number;
  monthlyPMI: number;
  totalInterest30Yr: number;
  x: number;
  barH: number;
  barY: number;
}

const TIERS: Tier[] = [
  { id: "3", label: "3% Down", pct: "3%", downCash: 12000, loanAmt: 388000, monthlyPI: 2519, monthlyPMI: 275, totalInterest30Yr: 518840, x: 70, barH: 155, barY: 45 },
  { id: "5", label: "5% Down", pct: "5%", downCash: 20000, loanAmt: 380000, monthlyPI: 2467, monthlyPMI: 238, totalInterest30Yr: 508120, x: 215, barH: 145, barY: 55 },
  { id: "10", label: "10% Down", pct: "10%", downCash: 40000, loanAmt: 360000, monthlyPI: 2337, monthlyPMI: 165, totalInterest30Yr: 481320, x: 360, barH: 125, barY: 75 },
  { id: "20", label: "20% Down", pct: "20%", downCash: 80000, loanAmt: 320000, monthlyPI: 2077, monthlyPMI: 0, totalInterest30Yr: 427720, x: 505, barH: 95, barY: 105 },
];

export function DownPaymentTierChart() {
  const [active, setActive] = useState<Tier | null>(null);
  const display = active || TIERS[3]; // Default to 20% down
  const isHovering = active !== null;

  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            30-Year Total Financing Cost by Down Payment Tier ($400,000 Purchase)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isHovering
              ? `Inspecting ${display.label} — Monthly P&I: $${display.monthlyPI}/mo | PMI: $${display.monthlyPMI}/mo`
              : "Visual benchmark comparing upfront cash vs total 30-year interest and PMI paid (at 6.75% interest). Hover bars to inspect."}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-300">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span>
            {display.label} (${(display.downCash / 1000).toFixed(0)}k Cash): 30-Yr Interest ${(display.totalInterest30Yr / 1000).toFixed(0)}k
          </span>
        </div>
      </div>

      <div className="relative overflow-x-auto select-none">
        <svg
          className="w-full min-w-[620px] cursor-pointer touch-none"
          viewBox="0 0 720 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onMouseLeave={() => setActive(null)}
        >
          {/* Gridlines */}
          <line x1="50" y1="30" x2="680" y2="30" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="80" x2="680" y2="80" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="130" x2="680" y2="130" stroke="#e2e8f0" strokeDasharray="3 3" className="dark:stroke-slate-800" />
          <line x1="50" y1="200" x2="680" y2="200" stroke="#94a3b8" strokeWidth="1.5" className="dark:stroke-slate-700" />

          {/* Y-axis labels */}
          <text x="40" y="34" fontSize="11" fill="#64748b" textAnchor="end">$550k</text>
          <text x="40" y="84" fontSize="11" fill="#64748b" textAnchor="end">$500k</text>
          <text x="40" y="134" fontSize="11" fill="#64748b" textAnchor="end">$450k</text>
          <text x="40" y="204" fontSize="11" fill="#64748b" textAnchor="end">$0</text>

          {/* Render Bars */}
          {TIERS.map((t) => {
            const isSel = display.id === t.id;
            const barFill = isSel ? "#10b981" : "#3b82f6";
            return (
              <g
                key={t.id}
                className="transition-all duration-200"
                onMouseEnter={() => setActive(t)}
                onTouchStart={() => setActive(t)}
              >
                {/* Clickable hit area */}
                <rect x={t.x - 10} y="20" width="130" height="200" fill="transparent" />

                {/* Main 30-Yr Interest Bar */}
                <rect
                  x={t.x}
                  y={t.barY}
                  width="110"
                  height={t.barH}
                  rx="6"
                  fill={barFill}
                  opacity={isSel ? 1 : isHovering ? 0.45 : 0.85}
                  stroke={isSel ? "#ffffff" : "none"}
                  strokeWidth="2"
                  className="transition-all duration-200"
                />

                {/* Bar Header Text */}
                <text
                  x={t.x + 55}
                  y={t.barY - 8}
                  fontSize="12"
                  fontWeight="bold"
                  fill="currentColor"
                  className="text-slate-900 dark:text-slate-100"
                  textAnchor="middle"
                >
                  ${(t.totalInterest30Yr / 1000).toFixed(0)}k Interest
                </text>

                {/* X-axis Label */}
                <text
                  x={t.x + 55}
                  y="220"
                  fontSize="12"
                  fontWeight="bold"
                  fill="currentColor"
                  className={isSel ? "text-emerald-600 dark:text-emerald-400 font-extrabold" : "text-slate-700 dark:text-slate-300"}
                  textAnchor="middle"
                >
                  {t.label}
                </text>
                <text
                  x={t.x + 55}
                  y="236"
                  fontSize="10"
                  fill="#64748b"
                  textAnchor="middle"
                >
                  (${t.downCash.toLocaleString()} Cash)
                </text>
              </g>
            );
          })}

          {/* Floating Tooltip Box */}
          <g transform={`translate(${Math.min(Math.max(display.x - 20, 50), 500)}, ${Math.max(20, display.barY - 85)})`}>
            <rect width="180" height="74" rx="8" fill="rgba(15, 23, 42, 0.94)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
            <text x="12" y="18" fill="#f8fafc" fontSize="11" fontWeight="bold">
              {display.label} Breakdown
            </text>
            <text x="12" y="34" fill="#cbd5e1" fontSize="10">
              Loan Amount: <tspan fill="#ffffff" fontWeight="bold">${display.loanAmt.toLocaleString()}</tspan>
            </text>
            <text x="12" y="48" fill="#cbd5e1" fontSize="10">
              Monthly P&amp;I: <tspan fill="#34d399" fontWeight="bold">${display.monthlyPI}/mo</tspan>
            </text>
            <text x="12" y="62" fill="#cbd5e1" fontSize="10">
              PMI Fee: <tspan fill={display.monthlyPMI === 0 ? "#34d399" : "#f87171"} fontWeight="bold">{display.monthlyPMI === 0 ? "$0 (No PMI!)" : `$${display.monthlyPMI}/mo`}</tspan>
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-emerald-500" /> 20% Down Eliminates Private Mortgage Insurance (PMI)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-blue-500" /> Total 30-Year Financing Interest at 6.75% Fixed Rate
        </span>
      </div>
    </div>
  );
}
