'use client';

import React, { useState } from 'react';

interface SwimDistancePoint {
  id: string;
  name: string;
  distMeters: number;
  fastPaceSec: number; // sec per 100m
  interPaceSec: number;
  recPaceSec: number;
  fastTime: string;
  interTime: string;
  recTime: string;
}

const SWIM_DATA: SwimDistancePoint[] = [
  { id: '100m', name: '100m Sprint', distMeters: 100, fastPaceSec: 58, interPaceSec: 82, recPaceSec: 115, fastTime: '58s', interTime: '1m 22s', recTime: '1m 55s' },
  { id: '200m', name: '200m Free', distMeters: 200, fastPaceSec: 62, interPaceSec: 86, recPaceSec: 120, fastTime: '2m 04s', interTime: '2m 52s', recTime: '4m 00s' },
  { id: '400m', name: '400m Mid', distMeters: 400, fastPaceSec: 65, interPaceSec: 90, recPaceSec: 125, fastTime: '4m 20s', interTime: '6m 00s', recTime: '8m 20s' },
  { id: '800m', name: '800m Long', distMeters: 800, fastPaceSec: 68, interPaceSec: 94, recPaceSec: 129, fastTime: '9m 04s', interTime: '12m 32s', recTime: '17m 12s' },
  { id: '1500m', name: '1,500m Olympic', distMeters: 1500, fastPaceSec: 70, interPaceSec: 97, recPaceSec: 133, fastTime: '17m 30s', interTime: '24m 15s', recTime: '33m 15s' },
  { id: 'halfIron', name: 'Half Ironman (1.9km)', distMeters: 1900, fastPaceSec: 72, interPaceSec: 100, recPaceSec: 136, fastTime: '22m 48s', interTime: '31m 40s', recTime: '43m 04s' },
  { id: 'fullIron', name: 'Full Ironman (3.8km)', distMeters: 3800, fastPaceSec: 75, interPaceSec: 105, recPaceSec: 142, fastTime: '47m 30s', interTime: '1h 06m', recTime: '1h 30m' }
];

export function SwimPaceDistanceCurveChart() {
  const [activeIdx, setActiveIdx] = useState<number>(4); // default 1,500m

  const activePoint = SWIM_DATA[activeIdx];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 65;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minSec = 50;
  const maxSec = 150;

  const scaleX = (idx: number) => padLeft + (idx / (SWIM_DATA.length - 1)) * plotW;
  const scaleY = (sec: number) => padTop + ((sec - minSec) / (maxSec - minSec)) * plotH;

  const makePath = (key: 'fastPaceSec' | 'interPaceSec' | 'recPaceSec') => {
    return SWIM_DATA.map((d, i) => {
      const x = scaleX(i);
      const y = scaleY(d[key]);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  };

  const activeX = scaleX(activeIdx);
  const activeYFast = scaleY(activePoint.fastPaceSec);
  const activeYInter = scaleY(activePoint.interPaceSec);
  const activeYRec = scaleY(activePoint.recPaceSec);

  const fmtPace = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.round(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Hydrodynamic Pacing Decay & Fatigue Across Swim Distances
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pace per 100 meters comparison from 100m sprint to 3.8 km Ironman open water.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
            <span className="w-3 h-1 bg-emerald-500 rounded-full" /> National / Collegiate
          </span>
          <span className="flex items-center gap-1.5 font-medium text-blue-600 dark:text-blue-400">
            <span className="w-3 h-1 bg-blue-500 rounded-full" /> Competitive Triathlete
          </span>
          <span className="flex items-center gap-1.5 font-medium text-amber-500">
            <span className="w-3 h-1 bg-amber-500 rounded-full" /> Fitness Swimmer
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
            const targetIdx = Math.round(relX * (SWIM_DATA.length - 1));
            const clamped = Math.max(0, Math.min(SWIM_DATA.length - 1, targetIdx));
            setActiveIdx(clamped);
          }}
          onTouchMove={(e) => {
            if (!e.touches[0]) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = (e.touches[0].clientX - rect.left) / rect.width;
            const targetIdx = Math.round(relX * (SWIM_DATA.length - 1));
            const clamped = Math.max(0, Math.min(SWIM_DATA.length - 1, targetIdx));
            setActiveIdx(clamped);
          }}
        >
          {/* Y Grid lines (Pace / 100m) */}
          {[60, 80, 100, 120, 140].map((s) => (
            <g key={s}>
              <line
                x1={padLeft}
                y1={scaleY(s)}
                x2={svgWidth - padRight}
                y2={scaleY(s)}
                stroke="#e2e8f0"
                strokeDasharray="4 4"
                className="dark:stroke-slate-800"
              />
              <text
                x={padLeft - 8}
                y={scaleY(s) + 4}
                textAnchor="end"
                className="text-[10px] fill-slate-400 dark:fill-slate-500 font-mono"
              >
                {fmtPace(s)}/100m
              </text>
            </g>
          ))}

          {/* X Axis labels */}
          {SWIM_DATA.map((d, i) => (
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
              {d.name.split(' ')[0]}
            </text>
          ))}

          {/* Curves */}
          <path d={makePath('recPaceSec')} fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
          <path d={makePath('interPaceSec')} fill="none" stroke="#3b82f6" strokeWidth="2.5" />
          <path d={makePath('fastPaceSec')} fill="none" stroke="#10b981" strokeWidth="3" />

          {/* Active distance line */}
          <line
            x1={activeX}
            y1={padTop}
            x2={activeX}
            y2={padTop + plotH}
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />

          <circle cx={activeX} cy={activeYFast} r="5" fill="#10b981" />
          <circle cx={activeX} cy={activeYInter} r="4.5" fill="#3b82f6" />
          <circle cx={activeX} cy={activeYRec} r="4" fill="#f59e0b" />

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
              {activePoint.name} Pacing
            </text>
            <text x="10" y="36" fill="#34d399" className="text-[10px] font-medium">
              National: {fmtPace(activePoint.fastPaceSec)}/100m ({activePoint.fastTime})
            </text>
            <text x="10" y="52" fill="#60a5fa" className="text-[10px] font-medium">
              Triathlete: {fmtPace(activePoint.interPaceSec)}/100m ({activePoint.interTime})
            </text>
            <text x="10" y="68" fill="#fbbf24" className="text-[10px] font-medium">
              Fitness: {fmtPace(activePoint.recPaceSec)}/100m ({activePoint.recTime})
            </text>
            <text x="10" y="82" fill="#94a3b8" className="text-[9px]">
              Distance: {activePoint.distMeters} meters
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
          <div className="text-[10px] text-slate-500 font-medium">Selected Event</div>
          <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{activePoint.name}</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Collegiate Pace</div>
          <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{fmtPace(activePoint.fastPaceSec)} / 100m</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Triathlete Pace</div>
          <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{fmtPace(activePoint.interPaceSec)} / 100m</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Projected Time</div>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">{activePoint.interTime}</div>
        </div>
      </div>
    </div>
  );
}
