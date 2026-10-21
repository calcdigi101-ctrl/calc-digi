'use client';

import React, { useState } from 'react';

interface StepPoint {
  steps: number;
  miles: number;
  burn130lbs: number;
  burn165lbs: number;
  burn200lbs: number;
  tier: string;
}

const STEP_DATA: StepPoint[] = [
  { steps: 2000, miles: 0.95, burn130lbs: 72, burn165lbs: 92, burn200lbs: 111, tier: 'Sedentary' },
  { steps: 4000, miles: 1.90, burn130lbs: 144, burn165lbs: 183, burn200lbs: 222, tier: 'Sedentary' },
  { steps: 6000, miles: 2.85, burn130lbs: 216, burn165lbs: 275, burn200lbs: 333, tier: 'Low Active' },
  { steps: 8000, miles: 3.80, burn130lbs: 288, burn165lbs: 366, burn200lbs: 444, tier: 'Somewhat Active' },
  { steps: 10000, miles: 4.75, burn130lbs: 360, burn165lbs: 458, burn200lbs: 556, tier: 'Active Baseline' },
  { steps: 12000, miles: 5.70, burn130lbs: 432, burn165lbs: 550, burn200lbs: 667, tier: 'Active' },
  { steps: 14000, miles: 6.65, burn130lbs: 504, burn165lbs: 641, burn200lbs: 778, tier: 'Highly Active' },
  { steps: 16000, miles: 7.60, burn130lbs: 576, burn165lbs: 733, burn200lbs: 889, tier: 'Highly Active' },
  { steps: 18000, miles: 8.55, burn130lbs: 648, burn165lbs: 824, burn200lbs: 1000, tier: 'Endurance Volume' },
  { steps: 20000, miles: 9.50, burn130lbs: 720, burn165lbs: 916, burn200lbs: 1111, tier: 'Endurance Volume' }
];

export function StepVolumeCalorieCurveChart() {
  const [activeSteps, setActiveSteps] = useState<number>(10000);

  const activePoint = STEP_DATA.find((d) => d.steps === activeSteps) || STEP_DATA[4];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 60;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minSteps = 2000;
  const maxSteps = 20000;
  const minKcal = 50;
  const maxKcal = 1150;

  const scaleX = (s: number) => padLeft + ((s - minSteps) / (maxSteps - minSteps)) * plotW;
  const scaleY = (k: number) => padTop + plotH - ((k - minKcal) / (maxKcal - minKcal)) * plotH;

  const makePath = (key: 'burn130lbs' | 'burn165lbs' | 'burn200lbs') => {
    return STEP_DATA.map((d, i) => {
      const x = scaleX(d.steps);
      const y = scaleY(d[key]);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  };

  const activeX = scaleX(activePoint.steps);
  const activeY200 = scaleY(activePoint.burn200lbs);
  const activeY165 = scaleY(activePoint.burn165lbs);
  const activeY130 = scaleY(activePoint.burn130lbs);

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Daily Step Volume vs. Caloric Energy Expenditure
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Linear locomotion energy expenditure across 130 lbs, 165 lbs, and 200 lbs body weights.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
            <span className="w-3 h-1 bg-emerald-500 rounded-full" /> 200 lbs (91 kg)
          </span>
          <span className="flex items-center gap-1.5 font-medium text-blue-600 dark:text-blue-400">
            <span className="w-3 h-1 bg-blue-500 rounded-full" /> 165 lbs (75 kg)
          </span>
          <span className="flex items-center gap-1.5 font-medium text-amber-500">
            <span className="w-3 h-1 bg-amber-500 rounded-full" /> 130 lbs (59 kg)
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
            const targetSteps = Math.round(minSteps + relX * (maxSteps - minSteps));
            const closest = STEP_DATA.reduce((prev, curr) =>
              Math.abs(curr.steps - targetSteps) < Math.abs(prev.steps - targetSteps) ? curr : prev
            );
            setActiveSteps(closest.steps);
          }}
          onTouchMove={(e) => {
            if (!e.touches[0]) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = (e.touches[0].clientX - rect.left) / rect.width;
            const targetSteps = Math.round(minSteps + relX * (maxSteps - minSteps));
            const closest = STEP_DATA.reduce((prev, curr) =>
              Math.abs(curr.steps - targetSteps) < Math.abs(prev.steps - targetSteps) ? curr : prev
            );
            setActiveSteps(closest.steps);
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

          {/* Tudor-Locke 10,000 Step Benchmark Vertical Line */}
          <line
            x1={scaleX(10000)}
            y1={padTop}
            x2={scaleX(10000)}
            y2={padTop + plotH}
            stroke="#10b981"
            strokeDasharray="2 2"
            strokeWidth="1"
            opacity="0.6"
          />

          {/* X Axis labels */}
          {STEP_DATA.filter((_, i) => i % 2 === 0).map((d) => (
            <text
              key={d.steps}
              x={scaleX(d.steps)}
              y={svgHeight - 12}
              textAnchor="middle"
              className={`text-[10px] font-mono transition-colors ${
                d.steps === activeSteps
                  ? 'fill-emerald-600 dark:fill-emerald-400 font-bold'
                  : 'fill-slate-400 dark:fill-slate-500'
              }`}
            >
              {(d.steps / 1000).toFixed(0)}k
            </text>
          ))}

          {/* Curves */}
          <path d={makePath('burn130lbs')} fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
          <path d={makePath('burn165lbs')} fill="none" stroke="#3b82f6" strokeWidth="2.5" />
          <path d={makePath('burn200lbs')} fill="none" stroke="#10b981" strokeWidth="3" />

          {/* Cursor line */}
          <line
            x1={activeX}
            y1={padTop}
            x2={activeX}
            y2={padTop + plotH}
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />

          <circle cx={activeX} cy={activeY200} r="5" fill="#10b981" />
          <circle cx={activeX} cy={activeY165} r="4.5" fill="#3b82f6" />
          <circle cx={activeX} cy={activeY130} r="4" fill="#f59e0b" />

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
              {activePoint.steps.toLocaleString()} Steps (~{activePoint.miles} miles)
            </text>
            <text x="10" y="36" fill="#34d399" className="text-[10px] font-bold">
              200 lbs: {activePoint.burn200lbs} kcal burned
            </text>
            <text x="10" y="52" fill="#60a5fa" className="text-[10px] font-medium">
              165 lbs: {activePoint.burn165lbs} kcal burned
            </text>
            <text x="10" y="68" fill="#fbbf24" className="text-[10px] font-medium">
              130 lbs: {activePoint.burn130lbs} kcal burned
            </text>
            <text x="10" y="82" fill="#94a3b8" className="text-[9px]">
              Tudor-Locke: {activePoint.tier}
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
          <div className="text-[10px] text-slate-500 font-medium">Step Volume</div>
          <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{activePoint.steps.toLocaleString()}</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">165 lb Burn</div>
          <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{activePoint.burn165lbs} kcal</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Distance Traversed</div>
          <div className="text-sm font-bold text-slate-800 dark:text-slate-200">~{activePoint.miles} miles</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Activity Category</div>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">{activePoint.tier}</div>
        </div>
      </div>
    </div>
  );
}
