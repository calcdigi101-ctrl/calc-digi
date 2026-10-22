'use client';

import React, { useState } from 'react';

interface BacTimelinePoint {
  hour: number;
  bac: number;
  impairmentStage: string;
  drivingLegal: 'Safe / Legal' | 'Impaired / Warning' | 'Illegal (Over 0.08%)' | 'Severely Intoxicated';
  neurologicalStatus: string;
  color: string;
}

const BAC_TIMELINE: BacTimelinePoint[] = [
  { hour: 0.0, bac: 0.000, impairmentStage: 'Baseline Sober', drivingLegal: 'Safe / Legal', neurologicalStatus: 'Unimpaired central nervous function.', color: '#10b981' },
  { hour: 0.5, bac: 0.065, impairmentStage: 'Rapid Absorption Phase', drivingLegal: 'Impaired / Warning', neurologicalStatus: 'Prefrontal inhibition lowered; reaction time begins to lag.', color: '#f59e0b' },
  { hour: 1.0, bac: 0.105, impairmentStage: 'Peak Intoxication', drivingLegal: 'Illegal (Over 0.08%)', neurologicalStatus: 'Slurred speech, impaired balance, slowed cognitive processing.', color: '#ef4444' },
  { hour: 2.0, bac: 0.090, impairmentStage: 'Active Hepatic Elimination', drivingLegal: 'Illegal (Over 0.08%)', neurologicalStatus: 'Motor coordination visibly compromised; over 0.08% statutory limit.', color: '#ef4444' },
  { hour: 3.0, bac: 0.075, impairmentStage: 'Sub-Threshold Impairment', drivingLegal: 'Impaired / Warning', neurologicalStatus: 'Reaction time slowed by 30%; driving judgment significantly compromised.', color: '#ea580c' },
  { hour: 4.0, bac: 0.060, impairmentStage: 'Moderate Elimination', drivingLegal: 'Impaired / Warning', neurologicalStatus: 'Mild euphoria fading into fatigue; visual tracking still degraded.', color: '#f59e0b' },
  { hour: 5.0, bac: 0.045, impairmentStage: 'Mild Residual Impairment', drivingLegal: 'Impaired / Warning', neurologicalStatus: 'Subtle motor ataxia remains; hangover metabolic byproducts accumulating.', color: '#eab308' },
  { hour: 6.0, bac: 0.030, impairmentStage: 'Low Residual Alcohol', drivingLegal: 'Impaired / Warning', neurologicalStatus: 'Minimal central sedation; acetaldehyde clearance underway.', color: '#0ea5e9' },
  { hour: 7.0, bac: 0.015, impairmentStage: 'Trace Concentrations', drivingLegal: 'Safe / Legal', neurologicalStatus: 'Approaching full sobriety; subtle sleep quality disruption persists.', color: '#059669' },
  { hour: 8.0, bac: 0.000, impairmentStage: 'Complete Sobriety (0.00% BAC)', drivingLegal: 'Safe / Legal', neurologicalStatus: 'Complete hepatic elimination of ethanol from blood.', color: '#10b981' },
  { hour: 10.0, bac: 0.000, impairmentStage: 'Post-Elimination Hangover', drivingLegal: 'Safe / Legal', neurologicalStatus: 'Ethanol cleared; potential dehydration, electrolyte deficit, and sleep debt.', color: '#10b981' },
];

export function BacMetabolismEliminationChart() {
  const [activeIdx, setActiveIdx] = useState<number>(2); // 1.0 hr peak default

  const cur = BAC_TIMELINE[activeIdx];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 60;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minHour = 0;
  const maxHour = 10;
  const minBac = 0.0;
  const maxBac = 0.13;

  const scaleX = (h: number) => padLeft + (h / maxHour) * plotW;
  const scaleY = (b: number) => padTop + plotH - (b / maxBac) * plotH;

  const bacCurvePath = BAC_TIMELINE.map((d, i) => {
    const x = scaleX(d.hour);
    const y = scaleY(d.bac);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const activeX = scaleX(cur.hour);
  const activeY = scaleY(cur.bac);
  const legalLimitY = scaleY(0.08);

  const handlePointer = (clientX: number, rect: DOMRect) => {
    const rawX = clientX - rect.left;
    const clampedX = Math.max(padLeft, Math.min(svgWidth - padRight, rawX));
    const ratio = (clampedX - padLeft) / plotW;
    const targetHour = ratio * maxHour;

    let bestIdx = 0;
    let minDiff = 999;
    BAC_TIMELINE.forEach((pt, i) => {
      const diff = Math.abs(pt.hour - targetHour);
      if (diff < minDiff) {
        minDiff = diff;
        bestIdx = i;
      }
    });
    setActiveIdx(bestIdx);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden p-5 sm:p-6 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
              Widmark Zero-Order Hepatic Elimination Curve
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pharmacokinetic model for 4 standard drinks consumed over 1 hour in a 170 lb adult (~0.015% BAC/hour clearance rate).
          </p>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {[1, 3, 5, 8].map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => {
                const idx = BAC_TIMELINE.findIndex((d) => d.hour === h);
                if (idx !== -1) setActiveIdx(idx);
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                cur.hour === h
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Hour {h}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive SVG Canvas */}
      <div className="relative select-none touch-none">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto cursor-crosshair overflow-visible"
          onMouseMove={(e) => handlePointer(e.clientX, e.currentTarget.getBoundingClientRect())}
          onTouchMove={(e) => {
            if (e.touches[0]) {
              handlePointer(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
            }
          }}
        >
          {/* Horizontal Grid lines */}
          {[0.02, 0.05, 0.08, 0.10].map((val) => {
            const y = scaleY(val);
            const isDui = val === 0.08;
            return (
              <g key={val}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={svgWidth - padRight}
                  y2={y}
                  stroke="currentColor"
                  className={isDui ? 'text-rose-400 dark:text-rose-500' : 'text-slate-200 dark:text-slate-800'}
                  strokeDasharray={isDui ? '5 3' : '3 3'}
                  strokeWidth={isDui ? 1.5 : 1}
                />
                <text x={padLeft - 8} y={y + 4} textAnchor="end" fontSize="10" fill="currentColor" className={isDui ? 'text-rose-600 font-bold' : 'text-slate-400 font-mono'}>
                  {val.toFixed(2)}%
                </text>
              </g>
            );
          })}

          {/* Legal limit 0.08% label */}
          <text x={svgWidth - padRight} y={legalLimitY - 6} textAnchor="end" fontSize="10" fontWeight="700" fill="#ef4444">
            0.08% Legal DUI Limit
          </text>

          {/* X Axis hours */}
          {BAC_TIMELINE.map((pt) => {
            const x = scaleX(pt.hour);
            return (
              <g key={pt.hour}>
                <line x1={x} y1={padTop + plotH} x2={x} y2={padTop + plotH + 5} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
                <text x={x} y={padTop + plotH + 18} textAnchor="middle" fontSize="10" fill="currentColor" className="text-slate-400 font-mono">
                  {pt.hour}h
                </text>
              </g>
            );
          })}

          {/* BAC Curve Area fill */}
          <path
            d={`${bacCurvePath} L ${scaleX(10)} ${padTop + plotH} L ${scaleX(0)} ${padTop + plotH} Z`}
            fill="url(#bacGradient)"
            opacity="0.15"
          />

          <defs>
            <linearGradient id="bacGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          {/* BAC Elimination Curve */}
          <path d={bacCurvePath} fill="none" stroke="#6366f1" strokeWidth="3.5" strokeLinecap="round" />

          {/* Active scrubber line */}
          <line
            x1={activeX}
            y1={padTop}
            x2={activeX}
            y2={padTop + plotH}
            stroke="currentColor"
            className="text-slate-400 dark:text-slate-500"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Active Circle Point */}
          <circle cx={activeX} cy={activeY} r="6.5" fill={cur.color} stroke="#ffffff" strokeWidth="2.5" />

          {/* Floating dynamic tooltip */}
          <g transform={`translate(${activeX > 380 ? activeX - 195 : activeX + 15}, ${Math.min(activeY, 110)})`}>
            <rect
              width="180"
              height="82"
              rx="10"
              fill="currentColor"
              className="text-white dark:text-slate-900"
              stroke="currentColor"
              strokeWidth="1.5"
              filter="drop-shadow(0 6px 16px rgba(0,0,0,0.12))"
            />
            <text x="12" y="20" fontSize="12" fontWeight="700" fill="currentColor" className="text-slate-900 dark:text-white">
              Hour {cur.hour} Post-Ingestion
            </text>
            <text x="12" y="38" fontSize="13" fontWeight="800" fill={cur.color}>
              BAC: {cur.bac.toFixed(3)}%
            </text>
            <text x="12" y="54" fontSize="11" fontWeight="600" fill={cur.bac >= 0.08 ? '#ef4444' : '#10b981'}>
              {cur.drivingLegal}
            </text>
            <text x="12" y="70" fontSize="10" fill="currentColor" className="text-slate-500 dark:text-slate-400">
              {cur.impairmentStage}
            </text>
          </g>
        </svg>
      </div>

      {/* Scrub stats card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Calculated Blood Alcohol (BAC)
          </span>
          <div className="text-2xl font-extrabold mt-0.5" style={{ color: cur.color }}>
            {cur.bac.toFixed(3)}% BAC
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Status: <strong className={cur.bac >= 0.08 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}>{cur.drivingLegal}</strong> ({cur.impairmentStage}).
          </p>
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Neurological State &amp; Reflexes
          </span>
          <div className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
            Hour {cur.hour} Clinical Impact
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {cur.neurologicalStatus}
          </p>
        </div>
      </div>

      {/* Legend & Instructions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Widmark Elimination Curve
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> 0.08% Legal DUI Limit
          </span>
        </div>
        <span className="text-[11px] italic">Scrub across timeline to inspect sobriety progression.</span>
      </div>
    </div>
  );
}
