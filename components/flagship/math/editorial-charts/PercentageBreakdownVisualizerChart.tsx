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
  { pct: 0, label: 'Zero Whole', fraction: '0/1', decimal: '0.000', ratio: '0 : 100', description: 'Null baseline, 0 parts out of 100.', color: '#94a3b8' },
  { pct: 10, label: 'One-Tenth', fraction: '1/10', decimal: '0.100', ratio: '1 : 9', description: 'Standard decile, common base for basic tipping or tithes.', color: '#38bdf8' },
  { pct: 20, label: 'One-Fifth', fraction: '1/5', decimal: '0.200', ratio: '1 : 4', description: 'Standard gratuity or clearance margin.', color: '#0ea5e9' },
  { pct: 25, label: 'One Quarter (25%)', fraction: '1/4', decimal: '0.250', ratio: '1 : 3', description: 'Quarter share, primary fiscal quartile division.', color: '#10b981' },
  { pct: 33.33, label: 'One-Third (33.3%)', fraction: '1/3', decimal: '0.333', ratio: '1 : 2', description: 'Repeating fractional trisection of a unit whole.', color: '#059669' },
  { pct: 50, label: 'Halfway Median (50%)', fraction: '1/2', decimal: '0.500', ratio: '1 : 1', description: 'Perfect parity balance, exact bisecting threshold.', color: '#6366f1' },
  { pct: 66.67, label: 'Two-Thirds (66.7%)', fraction: '2/3', decimal: '0.667', ratio: '2 : 1', description: 'Super-majority threshold in governance and voting.', color: '#8b5cf6' },
  { pct: 75, label: 'Three Quarters (75%)', fraction: '3/4', decimal: '0.750', ratio: '3 : 1', description: 'Upper third quartile cutoff in statistical distributions.', color: '#d97706' },
  { pct: 90, label: 'Nine-Tenths (90%)', fraction: '9/10', decimal: '0.900', ratio: '9 : 1', description: 'P90 decile, high statistical certainty.', color: '#ea580c' },
  { pct: 100, label: 'Complete Whole (100%)', fraction: '1/1', decimal: '1.000', ratio: '100 : 0', description: 'Total totality, 100 parts out of 100.', color: '#10b981' },
];

export function PercentageBreakdownVisualizerChart() {
  const [activePct, setActivePct] = useState<number>(37.9);
  const [isDragging, setIsDragging] = useState(false);

  // Compact, responsive SVG coordinate space (94px height vs old 250px)
  const svgWidth = 600;
  const svgHeight = 94;
  const padLeft = 32;
  const padRight = 32;

  const plotW = svgWidth - padLeft - padRight;
  const scaleX = (p: number) => padLeft + (Math.max(0, Math.min(100, p)) / 100) * plotW;
  const activeX = scaleX(activePct);

  // Closest benchmark lookup
  let closest = PERCENT_BENCHMARKS[4]; // default near ~33-37%
  let minDiff = 999;
  for (const b of PERCENT_BENCHMARKS) {
    const diff = Math.abs(b.pct - activePct);
    if (diff < minDiff) {
      minDiff = diff;
      closest = b;
    }
  }

  // True responsive pointer scaling (screen pixels -> SVG viewBox units)
  const handlePointer = (clientX: number, rect: DOMRect) => {
    if (!rect.width) return;
    const screenX = clientX - rect.left;
    const svgX = (screenX / rect.width) * svgWidth;
    const clampedX = Math.max(padLeft, Math.min(svgWidth - padRight, svgX));
    const ratio = (clampedX - padLeft) / plotW;
    const newPct = Math.round(ratio * 100 * 10) / 10;
    setActivePct(Math.max(0, Math.min(100, newPct)));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActivePct((prev) => Math.min(100, Math.round((prev + 1) * 10) / 10));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActivePct((prev) => Math.max(0, Math.round((prev - 1) * 10) / 10));
    }
  };

  const remainderPct = Math.max(0, 100 - activePct);
  const decimalVal = (activePct / 100).toFixed(3);
  const remainderDecimal = (remainderPct / 100).toFixed(3);

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header with Title and Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
              Interactive Percentage &amp; Proportion Continuum
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Drag across the 0% to 100% spectrum to inspect real-time fraction reduction, decimal conversion, and proportional partition.
          </p>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap shrink-0">
          {[10, 25, 33.3, 50, 75].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setActivePct(preset)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                Math.abs(activePct - preset) < 0.2
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {preset}%
            </button>
          ))}
        </div>
      </div>

      {/* Sleek, Compact Interactive SVG Slider */}
      <div className="relative select-none touch-none py-1">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto cursor-pointer overflow-visible"
          tabIndex={0}
          role="slider"
          aria-label="Percentage and proportion slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={activePct}
          onKeyDown={handleKeyDown}
          onPointerDown={(e) => {
            (e.target as Element).setPointerCapture?.(e.pointerId);
            setIsDragging(true);
            handlePointer(e.clientX, e.currentTarget.getBoundingClientRect());
          }}
          onPointerMove={(e) => {
            if (isDragging || e.buttons === 1) {
              handlePointer(e.clientX, e.currentTarget.getBoundingClientRect());
            }
          }}
          onPointerUp={(e) => {
            (e.target as Element).releasePointerCapture?.(e.pointerId);
            setIsDragging(false);
          }}
        >
          {/* SVG Gradient */}
          <defs>
            <linearGradient id="percentContinuumGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="60%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>

          {/* Background Track Bar */}
          <rect
            x={padLeft}
            y={34}
            width={plotW}
            height={22}
            rx={11}
            className="fill-slate-100 dark:fill-slate-800"
          />

          {/* Active Filled Proportion Segment */}
          <rect
            x={padLeft}
            y={34}
            width={Math.max(0, activeX - padLeft)}
            height={22}
            rx={11}
            fill="url(#percentContinuumGradient)"
          />

          {/* Dividing Ticks & Labels */}
          {[0, 10, 25, 50, 75, 90, 100].map((tick) => {
            const x = scaleX(tick);
            return (
              <g key={tick}>
                <line
                  x1={x}
                  y1={34}
                  x2={x}
                  y2={56}
                  stroke="currentColor"
                  className="text-slate-300/80 dark:text-slate-700/80"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
                <text
                  x={x}
                  y={74}
                  textAnchor="middle"
                  fontSize="10"
                  fill="currentColor"
                  className="text-slate-400 dark:text-slate-500 font-mono font-medium"
                >
                  {tick}%
                </text>
              </g>
            );
          })}

          {/* Active Indicator Knob */}
          <circle
            cx={activeX}
            cy={45}
            r="10"
            fill="#ffffff"
            stroke="#10b981"
            strokeWidth="3.5"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
          />

          {/* Floating Tooltip Pill */}
          <g transform={`translate(${Math.max(padLeft, Math.min(svgWidth - padRight - 110, activeX - 55))}, 4)`}>
            <rect
              width="110"
              height="24"
              rx="6"
              fill="currentColor"
              className="text-slate-900 dark:text-white"
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
            />
            <text
              x="55"
              y="16"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="currentColor"
              className="text-white dark:text-slate-900 font-mono"
            >
              {activePct.toFixed(1)}% ({decimalVal})
            </text>
          </g>
        </svg>
      </div>

      {/* Responsive Stats Breakdown Grid (2x2 on mobile, 4 columns on sm+) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Selected Part
          </span>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
            {activePct.toFixed(1)}%
          </div>
          <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate block">
            {closest.label}
          </span>
        </div>

        <div>
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Decimal Value
          </span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5 font-mono">
            {decimalVal}
          </div>
          <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 block">
            Multiplication scalar
          </span>
        </div>

        <div>
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Closest Fraction
          </span>
          <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5 font-mono">
            {closest.fraction}
          </div>
          <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 block">
            Ratio: {closest.ratio}
          </span>
        </div>

        <div>
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Remainder (100 - X)
          </span>
          <div className="text-xl sm:text-2xl font-black text-slate-700 dark:text-slate-300 mt-0.5 font-mono">
            {remainderPct.toFixed(1)}%
          </div>
          <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 block">
            {remainderDecimal} of Whole
          </span>
        </div>
      </div>

      {/* Legend & Touch Instructions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
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
