'use client';

import React, { useState } from 'react';

interface SpeedPoint {
  speedMph: number;
  flatWatts: number;
  mildClimbWatts: number;
  steepClimbWatts: number;
  aeroSharePct: number;
}

const CYCLING_DATA: SpeedPoint[] = [
  { speedMph: 10, flatWatts: 42, mildClimbWatts: 135, steepClimbWatts: 258, aeroSharePct: 45 },
  { speedMph: 12, flatWatts: 65, mildClimbWatts: 175, steepClimbWatts: 322, aeroSharePct: 58 },
  { speedMph: 14, flatWatts: 96, mildClimbWatts: 224, steepClimbWatts: 395, aeroSharePct: 68 },
  { speedMph: 16, flatWatts: 138, mildClimbWatts: 284, steepClimbWatts: 479, aeroSharePct: 76 },
  { speedMph: 18, flatWatts: 191, mildClimbWatts: 355, steepClimbWatts: 574, aeroSharePct: 82 },
  { speedMph: 20, flatWatts: 258, mildClimbWatts: 440, steepClimbWatts: 682, aeroSharePct: 86 },
  { speedMph: 22, flatWatts: 340, mildClimbWatts: 540, steepClimbWatts: 805, aeroSharePct: 89 },
  { speedMph: 24, flatWatts: 439, mildClimbWatts: 657, steepClimbWatts: 944, aeroSharePct: 91 },
  { speedMph: 26, flatWatts: 556, mildClimbWatts: 792, steepClimbWatts: 1102, aeroSharePct: 93 },
  { speedMph: 28, flatWatts: 694, mildClimbWatts: 948, steepClimbWatts: 1280, aeroSharePct: 94 },
  { speedMph: 30, flatWatts: 854, mildClimbWatts: 1126, steepClimbWatts: 1481, aeroSharePct: 95 }
];

export function CyclingPowerSpeedCurveChart() {
  const [activeSpeed, setActiveSpeed] = useState<number>(18);

  const activePoint = CYCLING_DATA.find((d) => d.speedMph === activeSpeed) || CYCLING_DATA[4];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 60;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minSpeed = 10;
  const maxSpeed = 30;
  const minWatts = 0;
  const maxWatts = 800;

  const scaleX = (s: number) => padLeft + ((s - minSpeed) / (maxSpeed - minSpeed)) * plotW;
  const scaleY = (w: number) => padTop + plotH - ((w - minWatts) / (maxWatts - minWatts)) * plotH;

  const makePath = (key: 'flatWatts' | 'mildClimbWatts' | 'steepClimbWatts') => {
    return CYCLING_DATA.map((d, i) => {
      const x = scaleX(d.speedMph);
      const y = scaleY(Math.min(maxWatts, d[key]));
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  };

  const activeX = scaleX(activePoint.speedMph);
  const activeYFlat = scaleY(activePoint.flatWatts);
  const activeYClimb = scaleY(Math.min(maxWatts, activePoint.mildClimbWatts));

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Cubic Aerodynamic Drag & Gradient Power Curve
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Power required (Watts) across riding speeds on flat vs 3% vs 6% road gradients (75kg rider).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
            <span className="w-3 h-1 bg-emerald-500 rounded-full" /> Flat Road (0%)
          </span>
          <span className="flex items-center gap-1.5 font-medium text-blue-600 dark:text-blue-400">
            <span className="w-3 h-1 bg-blue-500 rounded-full" /> Mild Grade (+3%)
          </span>
          <span className="flex items-center gap-1.5 font-medium text-rose-500">
            <span className="w-3 h-1 bg-rose-400 rounded-full" /> Steep (+6%)
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
            const targetSpeed = Math.round(minSpeed + relX * (maxSpeed - minSpeed));
            const closest = CYCLING_DATA.reduce((prev, curr) =>
              Math.abs(curr.speedMph - targetSpeed) < Math.abs(prev.speedMph - targetSpeed) ? curr : prev
            );
            setActiveSpeed(closest.speedMph);
          }}
          onTouchMove={(e) => {
            if (!e.touches[0]) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = (e.touches[0].clientX - rect.left) / rect.width;
            const targetSpeed = Math.round(minSpeed + relX * (maxSpeed - minSpeed));
            const closest = CYCLING_DATA.reduce((prev, curr) =>
              Math.abs(curr.speedMph - targetSpeed) < Math.abs(prev.speedMph - targetSpeed) ? curr : prev
            );
            setActiveSpeed(closest.speedMph);
          }}
        >
          {/* Y Axis Grid lines */}
          {[100, 200, 300, 400, 500, 600, 700].map((w) => (
            <g key={w}>
              <line
                x1={padLeft}
                y1={scaleY(w)}
                x2={svgWidth - padRight}
                y2={scaleY(w)}
                stroke="#e2e8f0"
                strokeDasharray="4 4"
                className="dark:stroke-slate-800"
              />
              <text
                x={padLeft - 8}
                y={scaleY(w) + 4}
                textAnchor="end"
                className="text-[10px] fill-slate-400 dark:fill-slate-500 font-mono"
              >
                {w}W
              </text>
            </g>
          ))}

          {/* X Axis labels */}
          {CYCLING_DATA.filter((_, i) => i % 2 === 0).map((d) => (
            <text
              key={d.speedMph}
              x={scaleX(d.speedMph)}
              y={svgHeight - 12}
              textAnchor="middle"
              className={`text-[10px] font-mono transition-colors ${
                d.speedMph === activeSpeed
                  ? 'fill-emerald-600 dark:fill-emerald-400 font-bold'
                  : 'fill-slate-400 dark:fill-slate-500'
              }`}
            >
              {d.speedMph} mph
            </text>
          ))}

          {/* Curves */}
          <path d={makePath('steepClimbWatts')} fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
          <path d={makePath('mildClimbWatts')} fill="none" stroke="#3b82f6" strokeWidth="2.5" />
          <path d={makePath('flatWatts')} fill="none" stroke="#10b981" strokeWidth="3" />

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

          <circle cx={activeX} cy={activeYFlat} r="5.5" fill="#10b981" />
          <circle cx={activeX} cy={activeYClimb} r="4.5" fill="#3b82f6" />

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
              {activePoint.speedMph} mph ({(activePoint.speedMph * 1.609344).toFixed(1)} km/h)
            </text>
            <text x="10" y="36" fill="#34d399" className="text-[10px] font-bold">
              Flat Road: {activePoint.flatWatts} Watts ({(activePoint.flatWatts / 75).toFixed(2)} W/kg)
            </text>
            <text x="10" y="52" fill="#60a5fa" className="text-[10px]">
              +3% Grade: {activePoint.mildClimbWatts} Watts
            </text>
            <text x="10" y="68" fill="#fb7185" className="text-[10px]">
              +6% Climb: {activePoint.steepClimbWatts} Watts
            </text>
            <text x="10" y="82" fill="#94a3b8" className="text-[9px]">
              Aero Drag Share: {activePoint.aeroSharePct}% of total power
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
          <div className="text-[10px] text-slate-500 font-medium">Selected Speed</div>
          <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{activePoint.speedMph} mph</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Flat Power</div>
          <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{activePoint.flatWatts} Watts</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Power-to-Weight</div>
          <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{(activePoint.flatWatts / 75).toFixed(2)} W/kg</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Aero Share</div>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">{activePoint.aeroSharePct}% Aerodynamic</div>
        </div>
      </div>
    </div>
  );
}
