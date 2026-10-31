'use client';

import React, { useState } from 'react';

interface BpBenchmark {
  label: string;
  sys: number;
  dia: number;
  stage: string;
  color: string;
  map: number;
  action: string;
}

const BP_BENCHMARKS: BpBenchmark[] = [
  { label: 'Optimal Normal', sys: 115, dia: 75, stage: 'Normal', color: '#10b981', map: 88, action: 'Maintain healthy lifestyle habits' },
  { label: 'Elevated Pre-HTN', sys: 125, dia: 78, stage: 'Elevated', color: '#eab308', map: 94, action: 'DASH diet & sodium restriction' },
  { label: 'Stage 1 Moderate', sys: 135, dia: 84, stage: 'Stage 1 HTN', color: '#f59e0b', map: 101, action: 'Lifestyle + possible medication' },
  { label: 'Stage 2 Moderate', sys: 148, dia: 92, stage: 'Stage 2 HTN', color: '#ef4444', map: 111, action: 'Combination pharmacotherapy required' },
  { label: 'Severe Stage 2', sys: 165, dia: 102, stage: 'Stage 2 Severe', color: '#dc2626', map: 123, action: 'Urgent physician evaluation' },
  { label: 'Crisis Warning', sys: 185, dia: 122, stage: 'Hypertensive Crisis', color: '#991b1b', map: 143, action: 'Emergency medical intervention' }
];

export function BloodPressureStageChart() {
  const [activeIdx, setActiveIdx] = useState<number>(2);

  const activePoint = BP_BENCHMARKS[activeIdx];

  const svgWidth = 640;
  const svgHeight = 290;
  const padLeft = 60;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minDia = 60;
  const maxDia = 130;
  const minSys = 90;
  const maxSys = 200;

  const scaleX = (dia: number) => padLeft + ((dia - minDia) / (maxDia - minDia)) * plotW;
  const scaleY = (sys: number) => padTop + plotH - ((sys - minSys) / (maxSys - minSys)) * plotH;

  const activeX = scaleX(activePoint.dia);
  const activeY = scaleY(activePoint.sys);

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            2017 ACC / AHA Blood Pressure Classification Map
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            2D hemodynamic coordinate spectrum comparing Systolic vs Diastolic thresholds (mmHg).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Normal (&lt;120/80)
          </span>
          <span className="flex items-center gap-1.5 font-medium text-amber-500">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Stage 1 (130-139)
          </span>
          <span className="flex items-center gap-1.5 font-medium text-rose-500">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Stage 2 (&ge;140/90)
          </span>
          <span className="flex items-center gap-1.5 font-medium text-red-700">
            <span className="w-2.5 h-2.5 rounded-full bg-red-700" /> Crisis (&gt;180/120)
          </span>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto select-none touch-none"
        >
          {/* Background Zone Fills */}
          {/* Normal Zone */}
          <rect
            x={scaleX(60)}
            y={scaleY(120)}
            width={scaleX(80) - scaleX(60)}
            height={scaleY(90) - scaleY(120)}
            fill="#10b981"
            opacity="0.15"
          />

          {/* Elevated Zone */}
          <rect
            x={scaleX(60)}
            y={scaleY(129)}
            width={scaleX(80) - scaleX(60)}
            height={scaleY(120) - scaleY(129)}
            fill="#eab308"
            opacity="0.2"
          />

          {/* Stage 1 Zone */}
          <rect
            x={scaleX(60)}
            y={scaleY(139)}
            width={scaleX(89) - scaleX(60)}
            height={scaleY(129) - scaleY(139)}
            fill="#f59e0b"
            opacity="0.2"
          />

          {/* Stage 2 Zone */}
          <rect
            x={scaleX(60)}
            y={scaleY(180)}
            width={scaleX(120) - scaleX(60)}
            height={scaleY(139) - scaleY(180)}
            fill="#ef4444"
            opacity="0.2"
          />

          {/* Hypertensive Crisis Zone */}
          <rect
            x={scaleX(60)}
            y={scaleY(200)}
            width={plotW}
            height={scaleY(180) - scaleY(200)}
            fill="#991b1b"
            opacity="0.25"
          />

          {/* Grid lines - Systolic Y Axis */}
          {[100, 120, 140, 160, 180, 200].map((sys) => (
            <g key={sys}>
              <line
                x1={padLeft}
                y1={scaleY(sys)}
                x2={svgWidth - padRight}
                y2={scaleY(sys)}
                stroke="#cbd5e1"
                strokeDasharray="4 4"
                className="dark:stroke-slate-800"
              />
              <text
                x={padLeft - 8}
                y={scaleY(sys) + 4}
                textAnchor="end"
                className="text-[10px] fill-slate-400 dark:fill-slate-500 font-mono"
              >
                {sys}
              </text>
            </g>
          ))}

          {/* Grid lines - Diastolic X Axis */}
          {[60, 70, 80, 90, 100, 110, 120].map((dia) => (
            <g key={dia}>
              <line
                x1={scaleX(dia)}
                y1={padTop}
                x2={scaleX(dia)}
                y2={padTop + plotH}
                stroke="#cbd5e1"
                strokeDasharray="4 4"
                className="dark:stroke-slate-800"
              />
              <text
                x={scaleX(dia)}
                y={svgHeight - 12}
                textAnchor="middle"
                className="text-[10px] fill-slate-400 dark:fill-slate-500 font-mono"
              >
                {dia}
              </text>
            </g>
          ))}

          {/* Axis Titles */}
          <text
            x={padLeft + 10}
            y={padTop + 14}
            className="text-[10px] fill-slate-500 font-bold uppercase tracking-wider"
          >
            Systolic (mmHg) ↑
          </text>
          <text
            x={svgWidth - padRight - 5}
            y={svgHeight - 26}
            textAnchor="end"
            className="text-[10px] fill-slate-500 font-bold uppercase tracking-wider"
          >
            Diastolic (mmHg) →
          </text>

          {/* Plotted Benchmark Points */}
          {BP_BENCHMARKS.map((pt, i) => {
            const x = scaleX(pt.dia);
            const y = scaleY(pt.sys);
            const isSelected = i === activeIdx;

            return (
              <g
                key={pt.label}
                className="cursor-pointer"
                onClick={() => setActiveIdx(i)}
                onMouseEnter={() => setActiveIdx(i)}
                onTouchStart={() => setActiveIdx(i)}
              >
                {isSelected && (
                  <circle cx={x} cy={y} r="12" fill={pt.color} opacity="0.3" className="animate-pulse" />
                )}
                <circle cx={x} cy={y} r={isSelected ? '6.5' : '5'} fill={pt.color} stroke="#ffffff" strokeWidth="2" />
                <text
                  x={x}
                  y={y - 10}
                  textAnchor="middle"
                  className={`text-[9px] font-bold ${
                    isSelected ? 'fill-slate-900 dark:fill-white font-extrabold' : 'fill-slate-600 dark:fill-slate-400'
                  }`}
                >
                  {pt.sys}/{pt.dia}
                </text>
              </g>
            );
          })}

          {/* Floating Dynamic Tooltip with Left/Right Inversion */}
          <g transform={`translate(${activeX > 380 ? activeX - 185 : activeX + 15}, ${activeY > 150 ? activeY - 95 : activeY + 15})`}>
            <rect
              width="170"
              height="85"
              rx="8"
              fill="rgba(15, 23, 42, 0.92)"
              className="backdrop-blur shadow-xl border border-slate-700"
            />
            <text x="10" y="18" fill="#f8fafc" className="text-[11px] font-bold">
              {activePoint.sys} / {activePoint.dia} mmHg
            </text>
            <text x="10" y="34" fill={activePoint.color} className="text-[10px] font-bold uppercase tracking-wide">
              {activePoint.stage}
            </text>
            <text x="10" y="50" fill="#cbd5e1" className="text-[10px]">
              Mean Arterial Pressure (MAP): {activePoint.map} mmHg
            </text>
            <text x="10" y="68" fill="#94a3b8" className="text-[9px]">
              Action: {activePoint.action}
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Selected Reading</div>
          <div className="text-sm font-bold text-slate-900 dark:text-slate-100">{activePoint.sys} / {activePoint.dia} mmHg</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Clinical Category</div>
          <div className="text-sm font-bold break-words leading-tight" style={{ color: activePoint.color }}>{activePoint.stage}</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">MAP Perfusion</div>
          <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{activePoint.map} mmHg</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-500 font-medium">Clinical Pathway</div>
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 break-words leading-snug">{activePoint.action}</div>
        </div>
      </div>
    </div>
  );
}
