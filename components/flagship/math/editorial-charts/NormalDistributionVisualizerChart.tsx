'use client';

import React, { useState, useId } from 'react';

export function NormalDistributionVisualizerChart() {
  const [mean, setMean] = useState<number>(100);
  const [stdDev, setStdDev] = useState<number>(15);
  const [xVal, setXVal] = useState<number>(115);

  const meanId = useId();
  const stdDevId = useId();
  const xValId = useId();

  const zScore = stdDev > 0 ? (xVal - mean) / stdDev : 0;

  // Approximate standard normal CDF via error function approximation
  const erf = (x: number) => {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;
    const sign = x < 0 ? -1 : 1;
    const absX = Math.abs(x);
    const t = 1.0 / (1.0 + p * absX);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
    return sign * y;
  };

  const cumulativeProb = 0.5 * (1 + erf(zScore / Math.SQRT2));
  const percentile = (cumulativeProb * 100).toFixed(2);

  // Generate SVG path for normal curve
  const svgWidth = 500;
  const svgHeight = 160;
  const paddingX = 40;
  const plotWidth = svgWidth - paddingX * 2;
  const baselineY = svgHeight - 25;

  const points: { x: number; y: number }[] = [];
  const numSteps = 80;
  for (let i = 0; i <= numSteps; i++) {
    const z = -3.5 + (7 * i) / numSteps;
    const pdf = Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI);
    const px = paddingX + ((z + 3.5) / 7) * plotWidth;
    const py = baselineY - (pdf / 0.4) * (baselineY - 20);
    points.push({ x: px, y: py });
  }

  const linePath = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

  // Shaded area up to current z
  const clampedZ = Math.max(-3.5, Math.min(3.5, zScore));
  const cutoffPx = paddingX + ((clampedZ + 3.5) / 7) * plotWidth;
  const shadedPoints = points.filter((p) => p.x <= cutoffPx);
  const shadedPath = shadedPoints.length > 0
    ? `M ${shadedPoints[0].x.toFixed(1)} ${baselineY} ` +
      shadedPoints.map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') +
      ` L ${cutoffPx.toFixed(1)} ${baselineY} Z`
    : '';

  return (
    <div className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Interactive Standard Normal Distribution &amp; Empirical Rule Visualizer
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Dynamic bell curve showing probability density, empirical 68-95-99.7% intervals, and cumulative percentile rank.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            Z = {zScore >= 0 ? `+${zScore.toFixed(2)}` : zScore.toFixed(2)}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {percentile}th %ile
          </span>
        </div>
      </div>

      {/* SVG Bell Curve */}
      <div className="w-full overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 p-2 sm:p-4">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto max-h-52 select-none">
          {/* Grid lines for -3s, -2s, -1s, mean, +1s, +2s, +3s */}
          {[-3, -2, -1, 0, 1, 2, 3].map((s) => {
            const gx = paddingX + ((s + 3.5) / 7) * plotWidth;
            return (
              <g key={s}>
                <line
                  x1={gx}
                  y1={15}
                  x2={gx}
                  y2={baselineY}
                  stroke={s === 0 ? '#10b981' : '#cbd5e1'}
                  strokeDasharray={s === 0 ? undefined : '2,2'}
                  strokeWidth={s === 0 ? 1.5 : 1}
                  className="dark:stroke-slate-700"
                />
                <text
                  x={gx}
                  y={baselineY + 16}
                  textAnchor="middle"
                  className="text-[10px] fill-slate-400 dark:fill-slate-500 font-mono font-medium"
                >
                  {s === 0 ? 'μ' : s > 0 ? `+${s}σ` : `${s}σ`}
                </text>
              </g>
            );
          })}

          {/* Shaded Cumulative Region */}
          {shadedPath && (
            <path d={shadedPath} fill="rgba(16, 185, 129, 0.25)" className="dark:fill-emerald-500/20" />
          )}

          {/* Bell Curve Line */}
          <path d={linePath} fill="none" stroke="#10b981" strokeWidth={2.5} strokeLinecap="round" />

          {/* Current x cutoff pointer */}
          <line
            x1={cutoffPx}
            y1={10}
            x2={cutoffPx}
            y2={baselineY}
            stroke="#059669"
            strokeWidth={2}
            className="dark:stroke-emerald-400"
          />
          <circle cx={cutoffPx} cy={baselineY} r={4} fill="#059669" className="dark:fill-emerald-400" />
        </svg>
      </div>

      {/* Sliders Control Deck */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor={meanId} className="font-semibold text-slate-700 dark:text-slate-300">Mean (μ)</label>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{mean}</span>
          </div>
          <input
            id={meanId}
            type="range"
            min="0"
            max="200"
            step="1"
            value={mean}
            onChange={(e) => setMean(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor={stdDevId} className="font-semibold text-slate-700 dark:text-slate-300">Std Dev (σ)</label>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{stdDev}</span>
          </div>
          <input
            id={stdDevId}
            type="range"
            min="1"
            max="50"
            step="1"
            value={stdDev}
            onChange={(e) => setStdDev(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor={xValId} className="font-semibold text-slate-700 dark:text-slate-300">Observation (x)</label>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{xVal}</span>
          </div>
          <input
            id={xValId}
            type="range"
            min={mean - stdDev * 3.5}
            max={mean + stdDev * 3.5}
            step="0.5"
            value={xVal}
            onChange={(e) => setXVal(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
          />
        </div>
      </div>

      {/* Empirical Rule Summary Chips */}
      <div className="grid grid-cols-1 min-[360px]:grid-cols-3 gap-2.5 pt-2 text-center text-xs">
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div className="font-bold text-slate-900 dark:text-white">68.27%</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">μ ± 1σ [{mean - stdDev}, {mean + stdDev}]</div>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div className="font-bold text-slate-900 dark:text-white">95.45%</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">μ ± 2σ [{mean - 2 * stdDev}, {mean + 2 * stdDev}]</div>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div className="font-bold text-slate-900 dark:text-white">99.73%</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">μ ± 3σ [{mean - 3 * stdDev}, {mean + 3 * stdDev}]</div>
        </div>
      </div>
    </div>
  );
}
