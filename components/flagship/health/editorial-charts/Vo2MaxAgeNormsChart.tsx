'use client';

import React, { useState } from 'react';

interface AgePoint {
  age: number;
  superior: number;
  good: number;
  average: number;
  poor: number;
}

const VO2_AGE_DATA: AgePoint[] = [
  { age: 20, superior: 56.5, good: 48.0, average: 42.5, poor: 35.0 },
  { age: 25, superior: 54.8, good: 46.5, average: 41.0, poor: 34.0 },
  { age: 30, superior: 53.0, good: 45.0, average: 39.5, poor: 32.5 },
  { age: 35, superior: 51.0, good: 43.5, average: 38.0, poor: 31.0 },
  { age: 40, superior: 49.0, good: 41.5, average: 36.2, poor: 29.5 },
  { age: 45, superior: 46.8, good: 39.5, average: 34.5, poor: 28.0 },
  { age: 50, superior: 44.5, good: 37.5, average: 32.5, poor: 26.2 },
  { age: 55, superior: 42.0, good: 35.2, average: 30.5, poor: 24.5 },
  { age: 60, superior: 39.5, good: 33.0, average: 28.5, poor: 22.8 },
  { age: 65, superior: 37.0, good: 31.0, average: 26.5, poor: 21.0 },
  { age: 70, superior: 34.5, good: 28.8, average: 24.5, poor: 19.2 },
  { age: 75, superior: 32.0, good: 26.5, average: 22.5, poor: 17.5 }
];

export function Vo2MaxAgeNormsChart() {
  const [activeAge, setActiveAge] = useState<number>(35);

  const activePoint = VO2_AGE_DATA.find((d) => d.age === activeAge) || VO2_AGE_DATA[3];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 55;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minAge = 20;
  const maxAge = 75;
  const minVo2 = 15;
  const maxVo2 = 60;

  const scaleX = (a: number) => padLeft + ((a - minAge) / (maxAge - minAge)) * plotW;
  const scaleY = (v: number) => padTop + plotH - ((v - minVo2) / (maxVo2 - minVo2)) * plotH;

  const makePath = (key: 'superior' | 'good' | 'average' | 'poor') => {
    return VO2_AGE_DATA.map((d, i) => {
      const x = scaleX(d.age);
      const y = scaleY(d[key]);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  };

  const activeX = scaleX(activePoint.age);
  const activeYSuperior = scaleY(activePoint.superior);
  const activeYGood = scaleY(activePoint.good);
  const activeYAvg = scaleY(activePoint.average);

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Cardiorespiratory Fitness & VO2 Max Longevity Trajectory
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            ACSM 50-year normative percentiles across aging adulthood (mL/kg/min).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 font-medium text-purple-600 dark:text-purple-400">
            <span className="w-3 h-1 bg-purple-500 rounded-full" /> Superior (95th%)
          </span>
          <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
            <span className="w-3 h-1 bg-emerald-500 rounded-full" /> Good (70th%)
          </span>
          <span className="flex items-center gap-1.5 font-medium text-blue-500">
            <span className="w-3 h-1 bg-blue-500 rounded-full" /> Average (50th%)
          </span>
          <span className="flex items-center gap-1.5 font-medium text-rose-500">
            <span className="w-3 h-1 bg-rose-400 rounded-full" /> Poor (&lt;20th%)
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
            const closest = VO2_AGE_DATA.reduce((prev, curr) =>
              Math.abs(curr.age - targetAge) < Math.abs(prev.age - targetAge) ? curr : prev
            );
            setActiveAge(closest.age);
          }}
          onTouchMove={(e) => {
            if (!e.touches[0]) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = (e.touches[0].clientX - rect.left) / rect.width;
            const targetAge = Math.round(minAge + relX * (maxAge - minAge));
            const closest = VO2_AGE_DATA.reduce((prev, curr) =>
              Math.abs(curr.age - targetAge) < Math.abs(prev.age - targetAge) ? curr : prev
            );
            setActiveAge(closest.age);
          }}
        >
          {/* Y Axis Grid lines */}
          {[20, 30, 40, 50, 60].map((v) => (
            <g key={v}>
              <line
                x1={padLeft}
                y1={scaleY(v)}
                x2={svgWidth - padRight}
                y2={scaleY(v)}
                stroke="#e2e8f0"
                strokeDasharray="4 4"
                className="dark:stroke-slate-800"
              />
              <text
                x={padLeft - 8}
                y={scaleY(v) + 4}
                textAnchor="end"
                className="text-[10px] fill-slate-400 dark:fill-slate-500 font-mono"
              >
                {v}
              </text>
            </g>
          ))}

          {/* Autonomy Baseline Reference Line at 18 mL/kg/min */}
          <line
            x1={padLeft}
            y1={scaleY(18)}
            x2={svgWidth - padRight}
            y2={scaleY(18)}
            stroke="#ef4444"
            strokeDasharray="2 2"
            strokeWidth="1"
            opacity="0.6"
          />
          <text
            x={svgWidth - padRight - 5}
            y={scaleY(18) - 4}
            textAnchor="end"
            className="text-[9px] fill-rose-500 font-semibold"
          >
            Critical Autonomy Floor (18 mL/kg/min)
          </text>

          {/* X Axis labels */}
          {VO2_AGE_DATA.map((d) => (
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

          {/* Trajectory Curves */}
          <path d={makePath('poor')} fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
          <path d={makePath('average')} fill="none" stroke="#3b82f6" strokeWidth="2" />
          <path d={makePath('good')} fill="none" stroke="#10b981" strokeWidth="2.5" />
          <path d={makePath('superior')} fill="none" stroke="#a855f7" strokeWidth="3" />

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

          {/* Data Points on active line */}
          <circle cx={activeX} cy={activeYSuperior} r="4.5" fill="#a855f7" />
          <circle cx={activeX} cy={activeYGood} r="4.5" fill="#10b981" />
          <circle cx={activeX} cy={activeYAvg} r="4" fill="#3b82f6" />

          {/* Dynamic Tooltip */}
          <g transform={`translate(${activeX > 380 ? activeX - 180 : activeX + 15}, ${padTop + 10})`}>
            <rect
              width="165"
              height="88"
              rx="8"
              fill="rgba(15, 23, 42, 0.92)"
              className="backdrop-blur shadow-xl border border-slate-700"
            />
            <text x="10" y="18" fill="#f8fafc" className="text-[11px] font-bold">
              Age {activePoint.age} Benchmarks
            </text>
            <text x="10" y="36" fill="#c084fc" className="text-[10px] font-medium">
              Superior (Top 5%): {activePoint.superior} mL/kg
            </text>
            <text x="10" y="52" fill="#34d399" className="text-[10px] font-medium">
              Good (70th%): {activePoint.good} mL/kg
            </text>
            <text x="10" y="68" fill="#60a5fa" className="text-[10px] font-medium">
              Average (50th%): {activePoint.average} mL/kg
            </text>
            <text x="10" y="82" fill="#fb7185" className="text-[9px] font-medium">
              Low Reserve: {activePoint.poor} mL/kg
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
          <div className="text-[10px] text-slate-500 font-medium">Age Benchmark</div>
          <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{activePoint.age} Years</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Superior Tier</div>
          <div className="text-sm font-bold text-purple-600 dark:text-purple-400">{activePoint.superior} mL/kg</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Good / Target Tier</div>
          <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{activePoint.good} mL/kg</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Average Median</div>
          <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{activePoint.average} mL/kg</div>
        </div>
      </div>
    </div>
  );
}
