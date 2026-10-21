'use client';

import React, { useState } from 'react';

interface DistancePoint {
  id: string;
  name: string;
  distMiles: number;
  sub3Pace: number; // min/mi
  sub4Pace: number;
  recPace: number;
  sub3Time: string;
  sub4Time: string;
  recTime: string;
}

const DISTANCE_DATA: DistancePoint[] = [
  { id: '1mi', name: '1 Mile', distMiles: 1.0, sub3Pace: 5.4, sub4Pace: 7.2, recPace: 8.8, sub3Time: '5m 24s', sub4Time: '7m 12s', recTime: '8m 48s' },
  { id: '5k', name: '5K (3.1 mi)', distMiles: 3.11, sub3Pace: 6.0, sub4Pace: 8.0, recPace: 9.8, sub3Time: '18m 40s', sub4Time: '24m 53s', recTime: '30m 29s' },
  { id: '10k', name: '10K (6.2 mi)', distMiles: 6.21, sub3Pace: 6.3, sub4Pace: 8.35, recPace: 10.3, sub3Time: '39m 08s', sub4Time: '51m 51s', recTime: '1h 03m' },
  { id: '15k', name: '15K (9.3 mi)', distMiles: 9.32, sub3Pace: 6.5, sub4Pace: 8.6, recPace: 10.6, sub3Time: '1h 00m', sub4Time: '1h 20m', recTime: '1h 38m' },
  { id: 'half', name: 'Half Marathon', distMiles: 13.11, sub3Pace: 6.65, sub4Pace: 8.85, recPace: 10.9, sub3Time: '1h 27m', sub4Time: '1h 56m', recTime: '2h 22m' },
  { id: 'marathon', name: 'Full Marathon', distMiles: 26.22, sub3Pace: 6.86, sub4Pace: 9.15, recPace: 11.3, sub3Time: '2h 59m', sub4Time: '3h 59m', recTime: '4h 56m' }
];

export function PaceDistanceCurveChart() {
  const [activeIdx, setActiveIdx] = useState<number>(4); // default half marathon

  const activePoint = DISTANCE_DATA[activeIdx];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 60;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minPace = 4.5;
  const maxPace = 12.5;

  const scaleX = (idx: number) => padLeft + (idx / (DISTANCE_DATA.length - 1)) * plotW;
  const scaleY = (p: number) => padTop + ((p - minPace) / (maxPace - minPace)) * plotH;

  const makePath = (key: 'sub3Pace' | 'sub4Pace' | 'recPace') => {
    return DISTANCE_DATA.map((d, i) => {
      const x = scaleX(i);
      const y = scaleY(d[key]);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  };

  const activeX = scaleX(activeIdx);
  const activeYSub3 = scaleY(activePoint.sub3Pace);
  const activeYSub4 = scaleY(activePoint.sub4Pace);
  const activeYRec = scaleY(activePoint.recPace);

  const fmtPaceDec = (val: number) => {
    const m = Math.floor(val);
    const s = Math.round((val - m) * 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Race Distance Pacing Decay & Fatigue Spectrum
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Peter Riegel aerobic decay exponent (1.06) across competitive performance brackets.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
            <span className="w-3 h-1 bg-emerald-500 rounded-full" /> Sub-3 Marathon Tier
          </span>
          <span className="flex items-center gap-1.5 font-medium text-blue-600 dark:text-blue-400">
            <span className="w-3 h-1 bg-blue-500 rounded-full" /> Sub-4 Marathon Tier
          </span>
          <span className="flex items-center gap-1.5 font-medium text-amber-500">
            <span className="w-3 h-1 bg-amber-500 rounded-full" /> Recreational Tier
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
            const targetIdx = Math.round(relX * (DISTANCE_DATA.length - 1));
            const clamped = Math.max(0, Math.min(DISTANCE_DATA.length - 1, targetIdx));
            setActiveIdx(clamped);
          }}
          onTouchMove={(e) => {
            if (!e.touches[0]) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = (e.touches[0].clientX - rect.left) / rect.width;
            const targetIdx = Math.round(relX * (DISTANCE_DATA.length - 1));
            const clamped = Math.max(0, Math.min(DISTANCE_DATA.length - 1, targetIdx));
            setActiveIdx(clamped);
          }}
        >
          {/* Y Grid lines (Pace min/mile) */}
          {[5, 6, 7, 8, 9, 10, 11, 12].map((p) => (
            <g key={p}>
              <line
                x1={padLeft}
                y1={scaleY(p)}
                x2={svgWidth - padRight}
                y2={scaleY(p)}
                stroke="#e2e8f0"
                strokeDasharray="4 4"
                className="dark:stroke-slate-800"
              />
              <text
                x={padLeft - 8}
                y={scaleY(p) + 4}
                textAnchor="end"
                className="text-[10px] fill-slate-400 dark:fill-slate-500 font-mono"
              >
                {p}:00/mi
              </text>
            </g>
          ))}

          {/* X Axis Labels */}
          {DISTANCE_DATA.map((d, i) => (
            <text
              key={d.id}
              x={scaleX(i)}
              y={svgHeight - 12}
              textAnchor="middle"
              className={`text-[10px] font-mono transition-colors ${
                i === activeIdx
                  ? 'fill-emerald-600 dark:fill-emerald-400 font-bold'
                  : 'fill-slate-400 dark:fill-slate-500'
              }`}
            >
              {d.name.split(' ')[0]}
            </text>
          ))}

          {/* Curves */}
          <path d={makePath('recPace')} fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
          <path d={makePath('sub4Pace')} fill="none" stroke="#3b82f6" strokeWidth="2.5" />
          <path d={makePath('sub3Pace')} fill="none" stroke="#10b981" strokeWidth="3" />

          {/* Active distance vertical bar */}
          <line
            x1={activeX}
            y1={padTop}
            x2={activeX}
            y2={padTop + plotH}
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />

          <circle cx={activeX} cy={activeYSub3} r="5" fill="#10b981" />
          <circle cx={activeX} cy={activeYSub4} r="4.5" fill="#3b82f6" />
          <circle cx={activeX} cy={activeYRec} r="4" fill="#f59e0b" />

          {/* Smart Tooltip Box */}
          <g transform={`translate(${activeX > 380 ? activeX - 180 : activeX + 15}, ${padTop + 10})`}>
            <rect
              width="165"
              height="88"
              rx="8"
              fill="rgba(15, 23, 42, 0.92)"
              className="backdrop-blur shadow-xl border border-slate-700"
            />
            <text x="10" y="18" fill="#f8fafc" className="text-[11px] font-bold">
              {activePoint.name} Pacing
            </text>
            <text x="10" y="36" fill="#34d399" className="text-[10px] font-medium">
              Sub-3: {fmtPaceDec(activePoint.sub3Pace)}/mi ({activePoint.sub3Time})
            </text>
            <text x="10" y="52" fill="#60a5fa" className="text-[10px] font-medium">
              Sub-4: {fmtPaceDec(activePoint.sub4Pace)}/mi ({activePoint.sub4Time})
            </text>
            <text x="10" y="68" fill="#fbbf24" className="text-[10px] font-medium">
              Rec: {fmtPaceDec(activePoint.recPace)}/mi ({activePoint.recTime})
            </text>
            <text x="10" y="82" fill="#94a3b8" className="text-[9px]">
              Distance: {activePoint.distMiles} miles
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
          <div className="text-[10px] text-slate-500 font-medium">Selected Race</div>
          <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{activePoint.name}</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Sub-3 Tier</div>
          <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{fmtPaceDec(activePoint.sub3Pace)} / mi</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Sub-4 Tier</div>
          <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{fmtPaceDec(activePoint.sub4Pace)} / mi</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Target Time</div>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">{activePoint.sub4Time}</div>
        </div>
      </div>
    </div>
  );
}
