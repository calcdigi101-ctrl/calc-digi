'use client';

import React, { useState } from 'react';

interface EnergyTrajectoryPoint {
  deltaKcal: number; // Deficit or surplus
  weeklyChangeLbs: number;
  weeklyChangeKg: number;
  metabolicAdaptationRisk: 'High' | 'Moderate' | 'Low' | 'None';
  strategyTier: string;
  proteinRecommendation: string;
  clinicalGuidance: string;
}

const ENERGY_TRAJECTORY_DATA: EnergyTrajectoryPoint[] = [
  { deltaKcal: -1000, weeklyChangeLbs: -2.0, weeklyChangeKg: -0.91, metabolicAdaptationRisk: 'High', strategyTier: 'Aggressive Hypocaloric Deficit', proteinRecommendation: '2.2 – 2.6 g/kg (1.0–1.2 g/lb)', clinicalGuidance: 'High risk of NEAT downregulation, muscle catabolism, and acute leptin collapse; recommend limiting to 4–6 week blocks with planned diet refeeds.' },
  { deltaKcal: -750, weeklyChangeLbs: -1.5, weeklyChangeKg: -0.68, metabolicAdaptationRisk: 'Moderate', strategyTier: 'Substantial Fat Loss Deficit', proteinRecommendation: '2.0 – 2.4 g/kg (0.9–1.1 g/lb)', clinicalGuidance: 'Rapid fat loss suitable for individuals with higher initial adiposity (BMI > 28); preserves lean mass when paired with heavy resistance training.' },
  { deltaKcal: -500, weeklyChangeLbs: -1.0, weeklyChangeKg: -0.45, metabolicAdaptationRisk: 'Low', strategyTier: 'Gold Standard Fat Loss Deficit', proteinRecommendation: '1.8 – 2.2 g/kg (0.8–1.0 g/lb)', clinicalGuidance: 'The clinical sweet spot for fat oxidation: minimizes thyroid T3 suppression, maintains gym performance, and preserves >95% lean skeletal mass.' },
  { deltaKcal: -250, weeklyChangeLbs: -0.5, weeklyChangeKg: -0.23, metabolicAdaptationRisk: 'None', strategyTier: 'Gentle / Contest Prep Recomposition', proteinRecommendation: '1.6 – 2.0 g/kg (0.7–0.9 g/lb)', clinicalGuidance: 'Excellent for already-lean athletes seeking minimal hunger and zero strength loss during prolonged cutting phases.' },
  { deltaKcal: 0, weeklyChangeLbs: 0.0, weeklyChangeKg: 0.0, metabolicAdaptationRisk: 'None', strategyTier: 'Iso-Caloric Maintenance', proteinRecommendation: '1.4 – 1.8 g/kg (0.6–0.8 g/lb)', clinicalGuidance: 'Perfect energy balance; optimal for athletic recovery, hormone homeostasis, glycogen replenishment, and body recomposition.' },
  { deltaKcal: +250, weeklyChangeLbs: +0.5, weeklyChangeKg: +0.23, metabolicAdaptationRisk: 'None', strategyTier: 'Lean Hypertrophic Surplus', proteinRecommendation: '1.6 – 2.2 g/kg (0.7–1.0 g/lb)', clinicalGuidance: 'The optimal surplus for natural muscular hypertrophy: fuels muscle protein synthesis (mTOR) while minimizing unwanted de novo lipogenesis.' },
  { deltaKcal: +500, weeklyChangeLbs: +1.0, weeklyChangeKg: +0.45, metabolicAdaptationRisk: 'Low', strategyTier: 'Accelerated Mass Gain', proteinRecommendation: '1.6 – 2.0 g/kg (0.7–0.9 g/lb)', clinicalGuidance: 'Maximizes muscular leverage and strength gains; suitable for underweight trainees, but carries approximately 40–50% fat gain proportion in trained lifters.' },
  { deltaKcal: +750, weeklyChangeLbs: +1.5, weeklyChangeKg: +0.68, metabolicAdaptationRisk: 'Moderate', strategyTier: 'Hyper-Caloric Surplus', proteinRecommendation: '1.4 – 1.8 g/kg (0.6–0.8 g/lb)', clinicalGuidance: 'Substantial caloric excess; muscle protein synthesis peaks well below this threshold; surplus beyond +300–400 kcal predominantly partitions into subcutaneous adipose.' },
];

export function CalorieMacroDeficitTrajectoryChart() {
  const [activeIdx, setActiveIdx] = useState<number>(2); // -500 kcal default
  const cur = ENERGY_TRAJECTORY_DATA[activeIdx];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 60;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minKcal = -1000;
  const maxKcal = 750;
  const minLbs = -2.5;
  const maxLbs = 2.0;

  const getX = (kcal: number) => padLeft + ((kcal - minKcal) / (maxKcal - minKcal)) * plotW;
  const getY = (lbs: number) => padTop + plotH - ((lbs - minLbs) / (maxLbs - minLbs)) * plotH;

  const activeX = getX(cur.deltaKcal);
  const activeY = getY(cur.weeklyChangeLbs);

  const isLeft = activeX > 380;
  const tooltipX = Math.max(10, Math.min(svgWidth - 195, isLeft ? activeX - 200 : activeX + 15));

  const handlePointer = (clientX: number, rect: DOMRect) => {
    const rawX = clientX - rect.left;
    const clampedX = Math.max(padLeft, Math.min(svgWidth - padRight, rawX));
    const ratio = (clampedX - padLeft) / plotW;
    const targetKcal = minKcal + ratio * (maxKcal - minKcal);

    let closestIdx = 0;
    let minDiff = Infinity;
    ENERGY_TRAJECTORY_DATA.forEach((d, idx) => {
      const diff = Math.abs(d.deltaKcal - targetKcal);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    setActiveIdx(closestIdx);
  };

  const curvePath = ENERGY_TRAJECTORY_DATA.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.deltaKcal).toFixed(1)} ${getY(d.weeklyChangeLbs).toFixed(1)}`).join(' ');

  return (
    <div className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              Energy Balance Trajectory &amp; Weekly Somatic Velocity
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Wishnofsky Energy Equation, Metabolic Adaptation Risks, and Lean Mass Partitioning
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-medium">
            Golden Fat Loss: -500 kcal/day
          </span>
        </div>
      </div>

      {/* SVG Canvas with Interactive Scrubbing */}
      <div className="relative select-none touch-none w-full max-w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto cursor-crosshair overflow-hidden"
          onMouseMove={(e) => handlePointer(e.clientX, e.currentTarget.getBoundingClientRect())}
          onTouchMove={(e) => {
            if (e.touches[0]) {
              handlePointer(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
            }
          }}
        >
          <defs>
            <linearGradient id="energyGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="40%" stopColor="#10b981" />
              <stop offset="60%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Zero Change Homeostasis Reference Line */}
          <line
            x1={padLeft}
            y1={getY(0)}
            x2={svgWidth - padRight}
            y2={getY(0)}
            stroke="currentColor"
            className="text-slate-300 dark:text-slate-700"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text x={padLeft + 8} y={getY(0) - 6} className="text-[10px] fill-slate-400 font-medium">
            Zero Balance (Maintenance)
          </text>

          {/* Grid lines (lbs/week) */}
          {[-2.0, -1.0, 0.0, +1.0].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line x1={padLeft} y1={y} x2={svgWidth - padRight} y2={y} stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeDasharray="3 3" />
                <text x={padLeft - 8} y={y + 3} textAnchor="end" className="text-[10px] fill-slate-400 dark:fill-slate-500">
                  {val > 0 ? `+${val.toFixed(1)}` : val.toFixed(1)} lbs
                </text>
              </g>
            );
          })}

          {/* Caloric Delta Axis labels */}
          {ENERGY_TRAJECTORY_DATA.map((d) => {
            const x = getX(d.deltaKcal);
            return (
              <text key={d.deltaKcal} x={x} y={svgHeight - 14} textAnchor="middle" className="text-[9.5px] fill-slate-500 dark:fill-slate-400 font-medium">
                {d.deltaKcal > 0 ? `+${d.deltaKcal}` : d.deltaKcal}
              </text>
            );
          })}

          {/* Trajectory Path */}
          <path d={curvePath} fill="none" stroke="url(#energyGrad)" strokeWidth="3" strokeLinecap="round" />

          {/* Data Points */}
          {ENERGY_TRAJECTORY_DATA.map((d) => (
            <circle
              key={d.deltaKcal}
              cx={getX(d.deltaKcal)}
              cy={getY(d.weeklyChangeLbs)}
              r="4"
              fill="#ffffff"
              stroke="#0ea5e9"
              strokeWidth="2"
            />
          ))}

          {/* Active scrub crosshair */}
          <line
            x1={activeX}
            y1={padTop}
            x2={activeX}
            y2={svgHeight - padBottom}
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
          <circle cx={activeX} cy={activeY} r="6" fill="#f59e0b" stroke="#fff" strokeWidth="2.5" />

          {/* Dynamic Inverted Tooltip */}
          <g transform={`translate(${tooltipX}, ${Math.min(activeY, svgHeight - padBottom - 95)})`}>
            <rect width="185" height="92" rx="8" className="fill-slate-900/95 dark:fill-slate-800/95 shadow-xl" />
            <text x="12" y="20" className="text-[11px] font-bold fill-white">
              Delta: {cur.deltaKcal > 0 ? `+${cur.deltaKcal}` : cur.deltaKcal} kcal / day
            </text>
            <text x="12" y="38" className="text-[10px] fill-slate-300">
              Weekly Rate: <tspan className="font-semibold fill-amber-400">{cur.weeklyChangeLbs > 0 ? `+${cur.weeklyChangeLbs}` : cur.weeklyChangeLbs} lbs ({cur.weeklyChangeKg > 0 ? `+${cur.weeklyChangeKg}` : cur.weeklyChangeKg} kg)</tspan>
            </text>
            <text x="12" y="54" className="text-[10px] fill-slate-300">
              Adaptation Risk: <tspan className={cur.metabolicAdaptationRisk === 'High' ? 'fill-rose-400 font-bold' : cur.metabolicAdaptationRisk === 'Moderate' ? 'fill-amber-300' : 'fill-emerald-400'}>{cur.metabolicAdaptationRisk}</tspan>
            </text>
            <text x="12" y="69" className="text-[9.5px] fill-sky-300 font-mono">
              Protein: {cur.proteinRecommendation.split('(')[0].trim()}
            </text>
            <text x="12" y="83" className="text-[8.5px] fill-slate-400">
              {cur.strategyTier}
            </text>
          </g>
        </svg>
      </div>

      {/* Selected Delta Physiological Summary Card */}
      <div className="bg-slate-50/80 dark:bg-slate-800/50 rounded-xl p-3.5 sm:p-4 border border-slate-200/80 dark:border-slate-800 text-xs w-full max-w-full overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
          <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
            {cur.strategyTier}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100/80 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
              Pace: {cur.weeklyChangeLbs > 0 ? `+${cur.weeklyChangeLbs}` : cur.weeklyChangeLbs} lbs/wk
            </span>
            <span className={cur.metabolicAdaptationRisk === "High" ? "px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300" : "px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"}>
              Risk: {cur.metabolicAdaptationRisk}
            </span>
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
          {cur.clinicalGuidance}
        </p>
        <div className="grid grid-cols-2 gap-2 mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px]">
          <div className="flex items-center justify-between px-2.5 py-1.5 bg-white dark:bg-slate-900/80 rounded-lg border border-slate-200/60 dark:border-slate-800 min-w-0">
            <span className="text-slate-500 shrink-0">Weekly Delta</span>
            <span className="font-semibold text-slate-900 dark:text-white truncate ml-1">{cur.weeklyChangeKg > 0 ? `+${cur.weeklyChangeKg}` : cur.weeklyChangeKg} kg/wk</span>
          </div>
          <div className="flex items-center justify-between px-2.5 py-1.5 bg-white dark:bg-slate-900/80 rounded-lg border border-slate-200/60 dark:border-slate-800 min-w-0">
            <span className="text-slate-500 shrink-0">Protein Goal</span>
            <span className="font-semibold text-amber-600 dark:text-amber-400 truncate ml-1">{cur.proteinRecommendation.split('(')[0].trim()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
