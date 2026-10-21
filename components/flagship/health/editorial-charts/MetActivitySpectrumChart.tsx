'use client';

import React, { useState } from 'react';

interface MetActivityPoint {
  id: string;
  name: string;
  met: number;
  burn70kgPerHour: number;
  fatPct: number;
  carbPct: number;
  intensity: string;
}

const MET_SPECTRUM_DATA: MetActivityPoint[] = [
  { id: 'rest', name: 'Rest / Sedentary Sitting', met: 1.0, burn70kgPerHour: 74, fatPct: 70, carbPct: 30, intensity: 'Basal (Zone 0)' },
  { id: 'light_walk', name: 'Light Stroll (2.0 mph)', met: 2.5, burn70kgPerHour: 184, fatPct: 65, carbPct: 35, intensity: 'Very Light' },
  { id: 'brisk_walk', name: 'Brisk Walking (3.5 mph)', met: 4.3, burn70kgPerHour: 316, fatPct: 55, carbPct: 45, intensity: 'Moderate Aerobic' },
  { id: 'weights', name: 'Strength / Resistance Training', met: 5.5, burn70kgPerHour: 404, fatPct: 40, carbPct: 60, intensity: 'Anaerobic / Mixed' },
  { id: 'cycling', name: 'Moderate Road Cycling', met: 7.5, burn70kgPerHour: 551, fatPct: 35, carbPct: 65, intensity: 'Aerobic Threshold' },
  { id: 'basketball', name: 'Full-Court Basketball', met: 8.5, burn70kgPerHour: 625, fatPct: 25, carbPct: 75, intensity: 'Vigorous Mixed' },
  { id: 'running_fast', name: 'Vigorous Running (7.5 mph)', met: 11.5, burn70kgPerHour: 845, fatPct: 15, carbPct: 85, intensity: 'Lactate Threshold' },
  { id: 'sprints', name: 'High-Intensity Sprints / HIIT', met: 14.0, burn70kgPerHour: 1029, fatPct: 5, carbPct: 95, intensity: 'VO2 Max / Glycolytic' }
];

export function MetActivitySpectrumChart() {
  const [activeIdx, setActiveIdx] = useState<number>(4);

  const activePoint = MET_SPECTRUM_DATA[activeIdx];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 55;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minMet = 0;
  const maxMet = 15;
  const minKcal = 0;
  const maxKcal = 1100;

  const scaleX = (idx: number) => padLeft + (idx / (MET_SPECTRUM_DATA.length - 1)) * plotW;
  const scaleY = (kcal: number) => padTop + plotH - ((kcal - minKcal) / (maxKcal - minKcal)) * plotH;

  const linePath = MET_SPECTRUM_DATA.map((d, i) => {
    const x = scaleX(i);
    const y = scaleY(d.burn70kgPerHour);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const activeX = scaleX(activeIdx);
  const activeY = scaleY(activePoint.burn70kgPerHour);

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            MET Intensity Spectrum & Hourly Energy Burn (70kg Baseline)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Ainsworth Compendium of Physical Activities with metabolic fuel crossover curve.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
            <span className="w-3 h-1 bg-emerald-500 rounded-full" /> Total Calories / Hour
          </span>
          <span className="flex items-center gap-1.5 font-medium text-amber-500">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> Fat Fuel %
          </span>
          <span className="flex items-center gap-1.5 font-medium text-blue-500">
            <span className="w-2 h-2 rounded-full bg-blue-400" /> Carb Fuel %
          </span>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto select-none touch-none"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = (e.clientX - rect.left) / rect.width;
            const targetIdx = Math.round(relX * (MET_SPECTRUM_DATA.length - 1));
            const clamped = Math.max(0, Math.min(MET_SPECTRUM_DATA.length - 1, targetIdx));
            setActiveIdx(clamped);
          }}
          onTouchMove={(e) => {
            if (!e.touches[0]) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = (e.touches[0].clientX - rect.left) / rect.width;
            const targetIdx = Math.round(relX * (MET_SPECTRUM_DATA.length - 1));
            const clamped = Math.max(0, Math.min(MET_SPECTRUM_DATA.length - 1, targetIdx));
            setActiveIdx(clamped);
          }}
        >
          {/* Y Axis Grid lines */}
          {[200, 400, 600, 800, 1000].map((k) => (
            <g key={k}>
              <line
                x1={padLeft}
                y1={scaleY(k)}
                x2={svgWidth - padRight}
                y2={scaleY(k)}
                stroke="#e2e8f0"
                strokeDasharray="4 4"
                className="dark:stroke-slate-800"
              />
              <text
                x={padLeft - 8}
                y={scaleY(k) + 4}
                textAnchor="end"
                className="text-[10px] fill-slate-400 dark:fill-slate-500 font-mono"
              >
                {k} kcal
              </text>
            </g>
          ))}

          {/* Area fill under curve */}
          <path
            d={`${linePath} L ${scaleX(MET_SPECTRUM_DATA.length - 1)},${scaleY(0)} L ${scaleX(0)},${scaleY(0)} Z`}
            fill="url(#metGradient)"
            opacity="0.25"
          />

          <defs>
            <linearGradient id="metGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Curve */}
          <path d={linePath} fill="none" stroke="#10b981" strokeWidth="3" />

          {/* X Axis Labels */}
          {MET_SPECTRUM_DATA.map((d, i) => (
            <text
              key={d.id}
              x={scaleX(i)}
              y={svgHeight - 12}
              textAnchor="middle"
              className={`text-[9px] font-mono transition-colors ${
                i === activeIdx
                  ? 'fill-emerald-600 dark:fill-emerald-400 font-bold'
                  : 'fill-slate-400 dark:fill-slate-500'
              }`}
            >
              {d.met}M
            </text>
          ))}

          {/* Active scrubber line */}
          <line
            x1={activeX}
            y1={padTop}
            x2={activeX}
            y2={padTop + plotH}
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />

          <circle cx={activeX} cy={activeY} r="5.5" fill="#10b981" />

          {/* Smart Tooltip */}
          <g transform={`translate(${activeX > 380 ? activeX - 185 : activeX + 15}, ${padTop + 10})`}>
            <rect
              width="170"
              height="88"
              rx="8"
              fill="rgba(15, 23, 42, 0.92)"
              className="backdrop-blur shadow-xl border border-slate-700"
            />
            <text x="10" y="18" fill="#f8fafc" className="text-[11px] font-bold">
              {activePoint.name}
            </text>
            <text x="10" y="36" fill="#34d399" className="text-[10px] font-bold">
              Burn: {activePoint.burn70kgPerHour} kcal / hour
            </text>
            <text x="10" y="52" fill="#fbbf24" className="text-[10px]">
              Fat Fuel Oxidation: {activePoint.fatPct}%
            </text>
            <text x="10" y="66" fill="#60a5fa" className="text-[10px]">
              Carb Glycolysis: {activePoint.carbPct}%
            </text>
            <text x="10" y="80" fill="#94a3b8" className="text-[9px] uppercase tracking-wider">
              {activePoint.intensity}
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
          <div className="text-[10px] text-slate-500 font-medium">Activity</div>
          <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 truncate">{activePoint.name}</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">MET Intensity</div>
          <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{activePoint.met} &times; Rest</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Energy Rate</div>
          <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{activePoint.burn70kgPerHour} kcal/hr</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Fuel Source</div>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">{activePoint.fatPct}% Fat / {activePoint.carbPct}% Carb</div>
        </div>
      </div>
    </div>
  );
}
