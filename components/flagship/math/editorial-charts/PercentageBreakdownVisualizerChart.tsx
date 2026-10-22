'use client';

import React, { useState } from 'react';

interface BenchmarkPoint {
  pct: number;
  label: string;
  fraction: string;
  decimal: string;
  ratio: string;
  description: string;
  color: string;
}

const PERCENT_BENCHMARKS: BenchmarkPoint[] = [
  { pct: 0, label: 'Zero Whole', fraction: '0/1', decimal: '0.000', ratio: '0 : 100', description: 'Null baseline; 0 parts out of 100.', color: '#94a3b8' },
  { pct: 10, label: 'One-Tenth', fraction: '1/10', decimal: '0.100', ratio: '1 : 9', description: 'Standard decile; common base for basic tipping or tithes.', color: '#38bdf8' },
  { pct: 20, label: 'One-Fifth', fraction: '1/5', decimal: '0.200', ratio: '1 : 4', description: 'Standard restaurant gratuity or retail clearance margin.', color: '#0ea5e9' },
  { pct: 25, label: 'One Quarter (25%)', fraction: '1/4', decimal: '0.250', ratio: '1 : 3', description: 'Quarter share; primary fiscal quartile division.', color: '#10b981' },
  { pct: 33.33, label: 'One-Third (33⅓%)', fraction: '1/3', decimal: '0.333', ratio: '1 : 2', description: 'Repeating fractional trisection of a unit whole.', color: '#059669' },
  { pct: 50, label: 'Halfway Median (50%)', fraction: '1/2', decimal: '0.500', ratio: '1 : 1', description: 'Perfect parity balance; exact bisecting threshold.', color: '#6366f1' },
  { pct: 66.67, label: 'Two-Thirds (66⅔%)', fraction: '2/3', decimal: '0.667', ratio: '2 : 1', description: 'Super-majority threshold in governance and voting.', color: '#8b5cf6' },
  { pct: 75, label: 'Three Quarters (75%)', fraction: '3/4', decimal: '0.750', ratio: '3 : 1', description: 'Upper third quartile cutoff in statistical distributions.', color: '#d97706' },
  { pct: 90, label: 'Nine-Tenths (90%)', fraction: '9/10', decimal: '0.900', ratio: '9 : 1', description: 'P90 decile; high-confidence statistical certainty.', color: '#ea580c' },
  { pct: 100, label: 'Complete Whole (100%)', fraction: '1/1', decimal: '1.000', ratio: '100 : 0', description: 'Total totality; 100 parts out of 100.', color: '#10b981' },
];

export function PercentageBreakdownVisualizerChart() {
  const [activePct, setActivePct] = useState<number>(25);

  const svgWidth = 640;
  const svgHeight = 250;
  const padLeft = 45;
  const padRight = 45;
  const padTop = 35;
  const padBottom = 55;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const scaleX = (p: number) => padLeft + (Math.max(0, Math.min(100, p)) / 100) * plotW;
  const activeX = scaleX(activePct);

  // Closest benchmark info
  let closest = PERCENT_BENCHMARKS[3]; // default 25%
  let minDiff = 999;
  for (const b of PERCENT_BENCHMARKS) {
    const diff = Math.abs(b.pct - activePct);
    if (diff < minDiff) {
      minDiff = diff;
      closest = b;
    }
  }

  const handlePointer = (clientX: number, rect: DOMRect) => {
    const rawX = clientX - rect.left;
    const clampedX = Math.max(padLeft, Math.min(svgWidth - padRight, rawX));
    const ratio = (clampedX - padLeft) / plotW;
    const newPct = Math.round(ratio * 100 * 10) / 10;
    setActivePct(newPct);
  };

  const remainderPct = Math.max(0, 100 - activePct);
  const decimalVal = (activePct / 100).toFixed(3);
  const remainderDecimal = (remainderPct / 100).toFixed(3);

  return (
    <div className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden p-5 sm:p-6 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
              Interactive Percentage &amp; Proportion Continuum
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Drag across the 0% to 100% spectrum to inspect real-time fraction reduction, decimal conversion, and proportional partition.
          </p>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {[10, 25, 33.3, 50, 75].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setActivePct(preset)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                Math.abs(activePct - preset) < 0.2
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {preset}%
            </button>
          ))}
        </div>
      </div>

      {/* Interactive SVG Canvas */}
      <div className="relative select-none touch-none">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto cursor-crosshair overflow-visible"
          onMouseMove={(e) => handlePointer(e.clientX, e.currentTarget.getBoundingClientRect())}
          onTouchMove={(e) => {
            if (e.touches[0]) {
              handlePointer(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
            }
          }}
        >
          {/* Background Track Bar */}
          <rect
            x={padLeft}
            y={padTop + 20}
            width={plotW}
            height={36}
            rx={10}
            className="fill-slate-100 dark:fill-slate-800"
          />

          {/* Active Filled Proportion Segment */}
          <rect
            x={padLeft}
            y={padTop + 20}
            width={Math.max(0, activeX - padLeft)}
            height={36}
            rx={10}
            fill="url(#percentGradient)"
          />

          {/* SVG Gradient */}
          <defs>
            <linearGradient id="percentGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="60%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>

          {/* Dividing Ticks & Labels */}
          {[0, 10, 25, 50, 75, 90, 100].map((tick) => {
            const x = scaleX(tick);
            return (
              <g key={tick}>
                <line
                  x1={x}
                  y1={padTop + 14}
                  x2={x}
                  y2={padTop + 62}
                  stroke="currentColor"
                  className="text-slate-300 dark:text-slate-700"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
                <text
                  x={x}
                  y={padTop + 78}
                  textAnchor="middle"
                  fontSize="11"
                  fill="currentColor"
                  className="text-slate-500 dark:text-slate-400 font-mono font-medium"
                >
                  {tick}%
                </text>
              </g>
            );
          })}

          {/* Active Vertical Scrubber Line */}
          <line
            x1={activeX}
            y1={padTop + 10}
            x2={activeX}
            y2={padTop + 66}
            stroke="#0f172a"
            className="dark:stroke-white"
            strokeWidth="2.5"
          />

          {/* Active Indicator Knob */}
          <circle
            cx={activeX}
            cy={padTop + 38}
            r="12"
            fill="#ffffff"
            stroke="#10b981"
            strokeWidth="3.5"
            filter="drop-shadow(0 3px 6px rgba(0,0,0,0.2))"
          />

          {/* Floating Tooltip Pill */}
          <g transform={`translate(${Math.max(padLeft + 10, Math.min(svgWidth - padRight - 150, activeX - 75))}, ${padTop - 25})`}>
            <rect
              width="150"
              height="34"
              rx="8"
              fill="currentColor"
              className="text-slate-900 dark:text-white"
              filter="drop-shadow(0 4px 8px rgba(0,0,0,0.15))"
            />
            <text
              x="75"
              y="22"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="currentColor"
              className="text-white dark:text-slate-900 font-mono"
            >
              {activePct.toFixed(1)}% ({decimalVal})
            </text>
          </g>
        </svg>
      </div>

      {/* Stats Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Selected Part
          </span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
            {activePct.toFixed(1)}%
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {closest.label}
          </span>
        </div>

        <div>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Decimal Value
          </span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5 font-mono">
            {decimalVal}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Multiplication scalar
          </span>
        </div>

        <div>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Closest Fraction
          </span>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5 font-mono">
            {closest.fraction}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Ratio: {closest.ratio}
          </span>
        </div>

        <div>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Remainder (100 - X)
          </span>
          <div className="text-2xl font-black text-slate-700 dark:text-slate-300 mt-0.5 font-mono">
            {remainderPct.toFixed(1)}%
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {remainderDecimal} of Whole
          </span>
        </div>
      </div>

      {/* Legend & Instructions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Active Percentage
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" /> Remaining Balance
          </span>
        </div>
        <span className="text-[11px] italic">Scrub or tap anywhere on the bar to adjust percentage interactively.</span>
      </div>
    </div>
  );
}
