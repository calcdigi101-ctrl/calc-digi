'use client';

import React, { useState } from 'react';

interface PushupAgePoint {
  age: number;
  maleExc: number;
  maleGood: number;
  malePoor: number;
  femExc: number;
  femGood: number;
}

const PUSHUP_AGE_DATA: PushupAgePoint[] = [
  { age: 20, maleExc: 38, maleGood: 25, malePoor: 16, femExc: 32, femGood: 18 },
  { age: 25, maleExc: 36, maleGood: 23, malePoor: 15, femExc: 30, femGood: 16 },
  { age: 30, maleExc: 32, maleGood: 20, malePoor: 13, femExc: 28, femGood: 14 },
  { age: 35, maleExc: 29, maleGood: 18, malePoor: 11, femExc: 26, femGood: 13 },
  { age: 40, maleExc: 26, maleGood: 16, malePoor: 10, femExc: 24, femGood: 11 },
  { age: 45, maleExc: 24, maleGood: 14, malePoor: 8, femExc: 22, femGood: 10 },
  { age: 50, maleExc: 22, maleGood: 12, malePoor: 7, femExc: 20, femGood: 8 },
  { age: 55, maleExc: 20, maleGood: 11, malePoor: 6, femExc: 18, femGood: 7 },
  { age: 60, maleExc: 18, maleGood: 9, malePoor: 5, femExc: 16, femGood: 5 },
  { age: 65, maleExc: 16, maleGood: 8, malePoor: 4, femExc: 14, femGood: 4 }
];

export function PushupFitnessStandardsChart() {
  const [activeAge, setActiveAge] = useState<number>(30);

  const activePoint = PUSHUP_AGE_DATA.find((d) => d.age === activeAge) || PUSHUP_AGE_DATA[2];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 55;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minAge = 20;
  const maxAge = 65;
  const minReps = 0;
  const maxReps = 45;

  const scaleX = (a: number) => padLeft + ((a - minAge) / (maxAge - minAge)) * plotW;
  const scaleY = (r: number) => padTop + plotH - ((r - minReps) / (maxReps - minReps)) * plotH;

  const makePath = (key: 'maleExc' | 'maleGood' | 'malePoor' | 'femExc' | 'femGood') => {
    return PUSHUP_AGE_DATA.map((d, i) => {
      const x = scaleX(d.age);
      const y = scaleY(d[key]);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  };

  const activeX = scaleX(activePoint.age);
  const activeYMaleExc = scaleY(activePoint.maleExc);
  const activeYMaleGood = scaleY(activePoint.maleGood);
  const activeYFemExc = scaleY(activePoint.femExc);

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            ACSM Muscular Endurance Standards & Harvard 40+ Longevity Threshold
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Standard continuous floor pushup repetitions to muscular failure across adult ages.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
            <span className="w-3 h-1 bg-emerald-500 rounded-full" /> Men: Excellent (90th%)
          </span>
          <span className="flex items-center gap-1.5 font-medium text-blue-600 dark:text-blue-400">
            <span className="w-3 h-1 bg-blue-500 rounded-full" /> Men: Good (Median)
          </span>
          <span className="flex items-center gap-1.5 font-medium text-purple-500">
            <span className="w-3 h-1 bg-purple-500 rounded-full" /> Women: Excellent
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
            const targetAge = Math.round(minAge + relX * (maxAge - minAge));
            const closest = PUSHUP_AGE_DATA.reduce((prev, curr) =>
              Math.abs(curr.age - targetAge) < Math.abs(prev.age - targetAge) ? curr : prev
            );
            setActiveAge(closest.age);
          }}
          onTouchMove={(e) => {
            if (!e.touches[0]) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = (e.touches[0].clientX - rect.left) / rect.width;
            const targetAge = Math.round(minAge + relX * (maxAge - minAge));
            const closest = PUSHUP_AGE_DATA.reduce((prev, curr) =>
              Math.abs(curr.age - targetAge) < Math.abs(prev.age - targetAge) ? curr : prev
            );
            setActiveAge(closest.age);
          }}
        >
          {/* Y Axis Grid lines */}
          {[10, 20, 30, 40].map((r) => (
            <g key={r}>
              <line
                x1={padLeft}
                y1={scaleY(r)}
                x2={svgWidth - padRight}
                y2={scaleY(r)}
                stroke="#e2e8f0"
                strokeDasharray="4 4"
                className="dark:stroke-slate-800"
              />
              <text
                x={padLeft - 8}
                y={scaleY(r) + 4}
                textAnchor="end"
                className="text-[10px] fill-slate-400 dark:fill-slate-500 font-mono"
              >
                {r} reps
              </text>
            </g>
          ))}

          {/* Harvard 40 Pushup Threshold Reference Line */}
          <line
            x1={padLeft}
            y1={scaleY(40)}
            x2={svgWidth - padRight}
            y2={scaleY(40)}
            stroke="#10b981"
            strokeDasharray="2 2"
            strokeWidth="1.5"
            opacity="0.8"
          />
          <text
            x={svgWidth - padRight - 5}
            y={scaleY(40) - 4}
            textAnchor="end"
            className="text-[9px] fill-emerald-600 dark:fill-emerald-400 font-bold"
          >
            Harvard Longevity Threshold (≥40 Reps = -96% CVD Risk)
          </text>

          {/* X Axis labels */}
          {PUSHUP_AGE_DATA.map((d) => (
            <text
              key={d.age}
              x={scaleX(d.age)}
              y={svgHeight - 12}
              textAnchor="middle"
              className={`text-[10px] font-mono transition-colors ${
                d.age === activeAge
                  ? 'fill-emerald-600 dark:fill-emerald-400 font-bold'
                  : 'fill-slate-400 dark:fill-slate-500'
              }`}
            >
              {d.age}y
            </text>
          ))}

          {/* Curves */}
          <path d={makePath('malePoor')} fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d={makePath('femGood')} fill="none" stroke="#c084fc" strokeWidth="2" strokeDasharray="2 2" />
          <path d={makePath('femExc')} fill="none" stroke="#a855f7" strokeWidth="2.5" />
          <path d={makePath('maleGood')} fill="none" stroke="#3b82f6" strokeWidth="2.5" />
          <path d={makePath('maleExc')} fill="none" stroke="#10b981" strokeWidth="3" />

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

          <circle cx={activeX} cy={activeYMaleExc} r="5" fill="#10b981" />
          <circle cx={activeX} cy={activeYMaleGood} r="4" fill="#3b82f6" />
          <circle cx={activeX} cy={activeYFemExc} r="4" fill="#a855f7" />

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
              Age {activePoint.age} Pushup Norms
            </text>
            <text x="10" y="36" fill="#34d399" className="text-[10px] font-medium">
              Men (Excellent): {activePoint.maleExc} reps
            </text>
            <text x="10" y="52" fill="#60a5fa" className="text-[10px] font-medium">
              Men (Good / Average): {activePoint.maleGood} reps
            </text>
            <text x="10" y="68" fill="#c084fc" className="text-[10px] font-medium">
              Women (Excellent): {activePoint.femExc} reps
            </text>
            <text x="10" y="82" fill="#94a3b8" className="text-[9px]">
              Men Lower Decile: &lt;{activePoint.malePoor} reps
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
          <div className="text-[10px] text-slate-500 font-medium">Age Group</div>
          <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Age {activePoint.age}</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Men Top Tier</div>
          <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{activePoint.maleExc}+ reps</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Men Median</div>
          <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{activePoint.maleGood} reps</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Women Top Tier</div>
          <div className="text-sm font-bold text-purple-600 dark:text-purple-400">{activePoint.femExc}+ reps</div>
        </div>
      </div>
    </div>
  );
}
