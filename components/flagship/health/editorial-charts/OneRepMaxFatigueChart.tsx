'use client';

import React, { useState } from 'react';

interface DataPoint {
  rep: number;
  epley: number;
  brzycki: number;
  lander: number;
  nsca: number;
  zone: string;
}

const FATIGUE_DATA: DataPoint[] = [
  { rep: 1, epley: 100.0, brzycki: 100.0, lander: 98.6, nsca: 100.0, zone: 'Max Strength (1RM)' },
  { rep: 2, epley: 93.8, brzycki: 97.2, lander: 96.0, nsca: 95.0, zone: 'Max Strength' },
  { rep: 3, epley: 90.9, brzycki: 94.4, lander: 93.3, nsca: 93.0, zone: 'Max Strength / Power' },
  { rep: 4, epley: 88.2, brzycki: 91.7, lander: 90.6, nsca: 90.0, zone: 'Strength / Hypertrophy' },
  { rep: 5, epley: 85.7, brzycki: 88.9, lander: 87.9, nsca: 87.0, zone: 'Strength / Hypertrophy' },
  { rep: 6, epley: 83.3, brzycki: 86.1, lander: 85.3, nsca: 85.0, zone: 'Optimal Hypertrophy' },
  { rep: 7, epley: 81.1, brzycki: 83.3, lander: 82.6, nsca: 83.0, zone: 'Optimal Hypertrophy' },
  { rep: 8, epley: 78.9, brzycki: 80.6, lander: 79.9, nsca: 80.0, zone: 'Optimal Hypertrophy' },
  { rep: 9, epley: 76.9, brzycki: 77.8, lander: 77.3, nsca: 77.0, zone: 'Hypertrophy' },
  { rep: 10, epley: 75.0, brzycki: 75.0, lander: 74.6, nsca: 75.0, zone: 'Hypertrophy / Muscular Base' },
  { rep: 12, epley: 71.4, brzycki: 69.4, lander: 69.2, nsca: 70.0, zone: 'Endurance Transition' },
  { rep: 15, epley: 66.7, brzycki: 61.1, lander: 61.2, nsca: 65.0, zone: 'Muscular Endurance' }
];

export function OneRepMaxFatigueChart() {
  const [activeRep, setActiveRep] = useState<number>(5);

  const activePoint = FATIGUE_DATA.find((d) => d.rep === activeRep) || FATIGUE_DATA[4];

  // SVG dimensions
  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 55;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minRep = 1;
  const maxRep = 15;
  const minPct = 55;
  const maxPct = 105;

  const scaleX = (r: number) => padLeft + ((r - minRep) / (maxRep - minRep)) * plotW;
  const scaleY = (p: number) => padTop + plotH - ((p - minPct) / (maxPct - minPct)) * plotH;

  const makePath = (key: 'epley' | 'brzycki' | 'lander' | 'nsca') => {
    return FATIGUE_DATA.map((d, i) => {
      const x = scaleX(d.rep);
      const y = scaleY(d[key]);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  };

  const activeX = scaleX(activePoint.rep);
  const activeYEpley = scaleY(activePoint.epley);
  const activeYNsca = scaleY(activePoint.nsca);

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Repetition Fatigue & Strength Retention Curve
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare load percentage drop-off across NSCA guidelines, Epley, and Brzycki equations (1–15 reps).
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
            <span className="w-3 h-1 bg-emerald-500 rounded-full" /> NSCA Standard
          </span>
          <span className="flex items-center gap-1.5 font-medium text-blue-600 dark:text-blue-400">
            <span className="w-3 h-1 bg-blue-500 rounded-full" /> Epley
          </span>
          <span className="flex items-center gap-1.5 font-medium text-amber-500">
            <span className="w-3 h-1 bg-amber-500 rounded-full" /> Brzycki
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
            const targetRep = Math.round(minRep + relX * (maxRep - minRep));
            const closest = FATIGUE_DATA.reduce((prev, curr) =>
              Math.abs(curr.rep - targetRep) < Math.abs(prev.rep - targetRep) ? curr : prev
            );
            setActiveRep(closest.rep);
          }}
          onTouchMove={(e) => {
            if (!e.touches[0]) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = (e.touches[0].clientX - rect.left) / rect.width;
            const targetRep = Math.round(minRep + relX * (maxRep - minRep));
            const closest = FATIGUE_DATA.reduce((prev, curr) =>
              Math.abs(curr.rep - targetRep) < Math.abs(prev.rep - targetRep) ? curr : prev
            );
            setActiveRep(closest.rep);
          }}
        >
          {/* Y Axis Grid lines */}
          {[60, 70, 80, 90, 100].map((pct) => (
            <g key={pct}>
              <line
                x1={padLeft}
                y1={scaleY(pct)}
                x2={svgWidth - padRight}
                y2={scaleY(pct)}
                stroke="#e2e8f0"
                strokeDasharray="4 4"
                className="dark:stroke-slate-800"
              />
              <text
                x={padLeft - 8}
                y={scaleY(pct) + 4}
                textAnchor="end"
                className="text-[10px] fill-slate-400 dark:fill-slate-500 font-mono"
              >
                {pct}%
              </text>
            </g>
          ))}

          {/* X Axis labels */}
          {FATIGUE_DATA.map((d) => (
            <text
              key={d.rep}
              x={scaleX(d.rep)}
              y={svgHeight - 12}
              textAnchor="middle"
              className={`text-[10px] font-mono transition-colors ${
                d.rep === activeRep
                  ? 'fill-emerald-600 dark:fill-emerald-400 font-bold'
                  : 'fill-slate-400 dark:fill-slate-500'
              }`}
            >
              {d.rep}R
            </text>
          ))}

          {/* Curves */}
          <path d={makePath('brzycki')} fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
          <path d={makePath('epley')} fill="none" stroke="#3b82f6" strokeWidth="2.5" />
          <path d={makePath('nsca')} fill="none" stroke="#10b981" strokeWidth="3" />

          {/* Active Rep Cursor Line */}
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
          <circle cx={activeX} cy={activeYNsca} r="5" fill="#10b981" className="shadow-lg" />
          <circle cx={activeX} cy={activeYEpley} r="4" fill="#3b82f6" />

          {/* Floating Tooltip Box with smart left/right flipping */}
          <g transform={`translate(${activeX > 380 ? activeX - 170 : activeX + 15}, ${padTop + 10})`}>
            <rect
              width="155"
              height="80"
              rx="8"
              fill="rgba(15, 23, 42, 0.92)"
              className="backdrop-blur shadow-xl border border-slate-700"
            />
            <text x="10" y="20" fill="#f8fafc" className="text-[11px] font-bold">
              {activePoint.rep} Reps Max Capacity
            </text>
            <text x="10" y="38" fill="#34d399" className="text-[10px] font-medium">
              NSCA Guideline: {activePoint.nsca}% of 1RM
            </text>
            <text x="10" y="52" fill="#60a5fa" className="text-[10px] font-medium">
              Epley Formula: {activePoint.epley}%
            </text>
            <text x="10" y="68" fill="#fbbf24" className="text-[9px] font-semibold uppercase tracking-wider">
              Zone: {activePoint.zone}
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
          <div className="text-[10px] text-slate-500 font-medium">Selected Rep</div>
          <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{activePoint.rep} Reps</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">NSCA Load %</div>
          <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{activePoint.nsca}% of 1RM</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Epley Estimate</div>
          <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{activePoint.epley}% of 1RM</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Training Focus</div>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 break-words leading-tight">{activePoint.zone}</div>
        </div>
      </div>
    </div>
  );
}
