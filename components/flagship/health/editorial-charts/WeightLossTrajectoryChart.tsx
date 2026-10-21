'use client';

import React, { useState } from 'react';

interface WeekPoint {
  week: number;
  linearWeight: number; // lbs
  adaptiveWeight: number;
  crashReboundWeight: number;
  phase: string;
}

const TRAJECTORY_DATA: WeekPoint[] = [
  { week: 0, linearWeight: 200, adaptiveWeight: 200, crashReboundWeight: 200, phase: 'Baseline' },
  { week: 2, linearWeight: 198, adaptiveWeight: 197.5, crashReboundWeight: 193, phase: 'Initial Glycogen & Water Shift' },
  { week: 4, linearWeight: 196, adaptiveWeight: 195.2, crashReboundWeight: 188, phase: 'Steady Adipose Mobilization' },
  { week: 6, linearWeight: 194, adaptiveWeight: 193.1, crashReboundWeight: 185, phase: 'Steady Adipose Mobilization' },
  { week: 8, linearWeight: 192, adaptiveWeight: 191.2, crashReboundWeight: 183.5, phase: 'Early Metabolic Downregulation' },
  { week: 10, linearWeight: 190, adaptiveWeight: 189.4, crashReboundWeight: 183, phase: 'Metabolic Adaptation Peak' },
  { week: 12, linearWeight: 188, adaptiveWeight: 187.8, crashReboundWeight: 184, phase: 'Plateau & Diet Fatigue' },
  { week: 16, linearWeight: 184, adaptiveWeight: 184.9, crashReboundWeight: 189, phase: 'Post-Diet Rebound Risk' },
  { week: 20, linearWeight: 180, adaptiveWeight: 182.4, crashReboundWeight: 196, phase: 'Long-Term Stabilization' },
  { week: 24, linearWeight: 176, adaptiveWeight: 180.2, crashReboundWeight: 202, phase: 'Maintenance Lifestyle' }
];

export function WeightLossTrajectoryChart() {
  const [activeWeek, setActiveWeek] = useState<number>(12);

  const activePoint = TRAJECTORY_DATA.find((d) => d.week === activeWeek) || TRAJECTORY_DATA[6];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 55;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minWeek = 0;
  const maxWeek = 24;
  const minLbs = 170;
  const maxLbs = 205;

  const scaleX = (w: number) => padLeft + ((w - minWeek) / (maxWeek - minWeek)) * plotW;
  const scaleY = (lbs: number) => padTop + ((maxLbs - lbs) / (maxLbs - minLbs)) * plotH;

  const makePath = (key: 'linearWeight' | 'adaptiveWeight' | 'crashReboundWeight') => {
    return TRAJECTORY_DATA.map((d, i) => {
      const x = scaleX(d.week);
      const y = scaleY(d[key]);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  };

  const activeX = scaleX(activePoint.week);
  const activeYAdaptive = scaleY(activePoint.adaptiveWeight);
  const activeYLinear = scaleY(activePoint.linearWeight);
  const activeYCrash = scaleY(activePoint.crashReboundWeight);

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            24-Week Weight Loss Trajectory: Theoretical vs Adaptive vs Crash Diet
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            NIH Kevin Hall Dynamic Energy Balance Model vs Wishnofsky 3,500 kcal Rule.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
            <span className="w-3 h-1 bg-emerald-500 rounded-full" /> NIH Adaptive Model (Realistic)
          </span>
          <span className="flex items-center gap-1.5 font-medium text-blue-600 dark:text-blue-400">
            <span className="w-3 h-1 bg-blue-500 rounded-full" /> Linear Wishnofsky Model
          </span>
          <span className="flex items-center gap-1.5 font-medium text-rose-500">
            <span className="w-3 h-1 bg-rose-400 rounded-full" /> Crash Diet & Rebound
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
            const targetWeek = Math.round(minWeek + relX * (maxWeek - minWeek));
            const closest = TRAJECTORY_DATA.reduce((prev, curr) =>
              Math.abs(curr.week - targetWeek) < Math.abs(prev.week - targetWeek) ? curr : prev
            );
            setActiveWeek(closest.week);
          }}
          onTouchMove={(e) => {
            if (!e.touches[0]) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = (e.touches[0].clientX - rect.left) / rect.width;
            const targetWeek = Math.round(minWeek + relX * (maxWeek - minWeek));
            const closest = TRAJECTORY_DATA.reduce((prev, curr) =>
              Math.abs(curr.week - targetWeek) < Math.abs(prev.week - targetWeek) ? curr : prev
            );
            setActiveWeek(closest.week);
          }}
        >
          {/* Y Grid lines */}
          {[175, 185, 195, 205].map((lbs) => (
            <g key={lbs}>
              <line
                x1={padLeft}
                y1={scaleY(lbs)}
                x2={svgWidth - padRight}
                y2={scaleY(lbs)}
                stroke="#e2e8f0"
                strokeDasharray="4 4"
                className="dark:stroke-slate-800"
              />
              <text
                x={padLeft - 8}
                y={scaleY(lbs) + 4}
                textAnchor="end"
                className="text-[10px] fill-slate-400 dark:fill-slate-500 font-mono"
              >
                {lbs} lbs
              </text>
            </g>
          ))}

          {/* X Axis labels */}
          {TRAJECTORY_DATA.map((d) => (
            <text
              key={d.week}
              x={scaleX(d.week)}
              y={svgHeight - 12}
              textAnchor="middle"
              className={`text-[10px] font-mono transition-colors ${
                d.week === activeWeek
                  ? 'fill-emerald-600 dark:fill-emerald-400 font-bold'
                  : 'fill-slate-400 dark:fill-slate-500'
              }`}
            >
              Wk {d.week}
            </text>
          ))}

          {/* Trajectory Curves */}
          <path d={makePath('linearWeight')} fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
          <path d={makePath('crashReboundWeight')} fill="none" stroke="#f43f5e" strokeWidth="2" />
          <path d={makePath('adaptiveWeight')} fill="none" stroke="#10b981" strokeWidth="3" />

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

          {/* Points */}
          <circle cx={activeX} cy={activeYAdaptive} r="5.5" fill="#10b981" />
          <circle cx={activeX} cy={activeYLinear} r="4" fill="#3b82f6" />
          <circle cx={activeX} cy={activeYCrash} r="4" fill="#f43f5e" />

          {/* Tooltip */}
          <g transform={`translate(${activeX > 380 ? activeX - 185 : activeX + 15}, ${padTop + 10})`}>
            <rect
              width="170"
              height="88"
              rx="8"
              fill="rgba(15, 23, 42, 0.92)"
              className="backdrop-blur shadow-xl border border-slate-700"
            />
            <text x="10" y="18" fill="#f8fafc" className="text-[11px] font-bold">
              Week {activePoint.week}: {activePoint.phase}
            </text>
            <text x="10" y="36" fill="#34d399" className="text-[10px] font-bold">
              NIH Adaptive Model: {activePoint.adaptiveWeight} lbs
            </text>
            <text x="10" y="52" fill="#60a5fa" className="text-[10px]">
              Linear Wishnofsky: {activePoint.linearWeight} lbs
            </text>
            <text x="10" y="68" fill="#fb7185" className="text-[10px]">
              Crash Dieting: {activePoint.crashReboundWeight} lbs
            </text>
            <text x="10" y="82" fill="#94a3b8" className="text-[9px]">
              Adaptive Deficit: -{(200 - activePoint.adaptiveWeight).toFixed(1)} lbs lost
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
          <div className="text-[10px] text-slate-500 font-medium">Timeline Progress</div>
          <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Week {activePoint.week}</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Realistic Weight</div>
          <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{activePoint.adaptiveWeight} lbs</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Linear Model</div>
          <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{activePoint.linearWeight} lbs</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Physiological State</div>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">{activePoint.phase}</div>
        </div>
      </div>
    </div>
  );
}
