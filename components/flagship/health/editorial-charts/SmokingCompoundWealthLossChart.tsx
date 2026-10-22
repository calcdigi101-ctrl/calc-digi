'use client';

import React, { useState } from 'react';

interface WealthLossPoint {
  year: number;
  directCash: number;
  compoundedWealth: number;
  cigsSmoked: number;
  healthMilestone: string;
}

const WEALTH_DATA: WealthLossPoint[] = [
  { year: 1, directCash: 3285, compoundedWealth: 3515, cigsSmoked: 7300, healthMilestone: 'Excess coronary heart disease risk drops to half that of a continuing smoker.' },
  { year: 2, directCash: 6570, compoundedWealth: 7276, cigsSmoked: 14600, healthMilestone: 'Arterial endothelial function restored; peripheral circulation normalized.' },
  { year: 3, directCash: 9855, compoundedWealth: 11300, cigsSmoked: 21900, healthMilestone: 'Risk of myocardial infarction drops by over 60% compared to baseline.' },
  { year: 5, directCash: 16425, compoundedWealth: 20210, cigsSmoked: 36500, healthMilestone: 'Stroke risk plummets to equal that of a lifetime non-smoker.' },
  { year: 7, directCash: 22995, compoundedWealth: 31050, cigsSmoked: 51100, healthMilestone: 'Substantial decline in oral, laryngeal, and esophageal cancer risks.' },
  { year: 10, directCash: 32850, compoundedWealth: 48600, cigsSmoked: 73000, healthMilestone: 'Lung cancer mortality rate drops to half that of a continuing smoker.' },
  { year: 15, directCash: 49275, compoundedWealth: 82500, cigsSmoked: 109500, healthMilestone: 'Coronary heart disease risk drops to equivalent level of an individual who never smoked.' },
  { year: 20, directCash: 65700, compoundedWealth: 134600, cigsSmoked: 146000, healthMilestone: 'Life expectancy extended by up to a full decade compared to continued smoking.' },
  { year: 25, directCash: 82125, compoundedWealth: 207700, cigsSmoked: 182500, healthMilestone: 'Total systemic recovery from tobacco toxicant exposure.' },
  { year: 30, directCash: 98550, compoundedWealth: 310300, cigsSmoked: 219000, healthMilestone: 'Over $310,000 in compounded retirement security preserved.' },
];

export function SmokingCompoundWealthLossChart() {
  const [activeIdx, setActiveIdx] = useState<number>(5); // 10 years default

  const cur = WEALTH_DATA[activeIdx];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 65;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const minYear = 1;
  const maxYear = 30;
  const minVal = 0;
  const maxVal = 320000;

  const scaleX = (yr: number) => padLeft + ((yr - minYear) / (maxYear - minYear)) * plotW;
  const scaleY = (val: number) => padTop + plotH - (val / maxVal) * plotH;

  const directPath = WEALTH_DATA.map((d, i) => {
    const x = scaleX(d.year);
    const y = scaleY(d.directCash);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const compoundPath = WEALTH_DATA.map((d, i) => {
    const x = scaleX(d.year);
    const y = scaleY(d.compoundedWealth);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const activeX = scaleX(cur.year);
  const activeYDirect = scaleY(cur.directCash);
  const activeYCompound = scaleY(cur.compoundedWealth);

  const handlePointer = (clientX: number, rect: DOMRect) => {
    const rawX = clientX - rect.left;
    const clampedX = Math.max(padLeft, Math.min(svgWidth - padRight, rawX));
    const ratio = (clampedX - padLeft) / plotW;
    const targetYr = minYear + ratio * (maxYear - minYear);

    let bestIdx = 0;
    let minDiff = 999;
    WEALTH_DATA.forEach((pt, i) => {
      const diff = Math.abs(pt.year - targetYr);
      if (diff < minDiff) {
        minDiff = diff;
        bestIdx = i;
      }
    });
    setActiveIdx(bestIdx);
  };

  const fmtCurrency = (num: number) => `$${num.toLocaleString()}`;

  return (
    <div className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden p-5 sm:p-6 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
              Direct Cash Spent vs. Compounded Investment Opportunity Cost
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Comparing cumulative pack expenditures ($9/pack, 1 pack/day) against an index fund compounding at 7% annual S&amp;P 500 returns.
          </p>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {[5, 10, 20, 30].map((yr) => (
            <button
              key={yr}
              type="button"
              onClick={() => {
                const idx = WEALTH_DATA.findIndex((d) => d.year === yr);
                if (idx !== -1) setActiveIdx(idx);
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                cur.year === yr
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Year {yr}
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
          {[50000, 100000, 200000, 300000].map((val) => {
            const y = scaleY(val);
            return (
              <g key={val}>
                <line x1={padLeft} y1={y} x2={svgWidth - padRight} y2={y} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />
                <text x={padLeft - 10} y={y + 4} textAnchor="end" fontSize="11" fill="currentColor" className="text-slate-400 font-mono">
                  ${val / 1000}k
                </text>
              </g>
            );
          })}

          {/* X Axis years */}
          {WEALTH_DATA.map((pt) => {
            const x = scaleX(pt.year);
            return (
              <g key={pt.year}>
                <line x1={x} y1={padTop + plotH} x2={x} y2={padTop + plotH + 5} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
                <text x={x} y={padTop + plotH + 18} textAnchor="middle" fontSize="10" fill="currentColor" className="text-slate-400 font-mono">
                  Yr {pt.year}
                </text>
              </g>
            );
          })}

          {/* Direct Cash Curve (Red dashed) */}
          <path d={directPath} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4 2" strokeLinecap="round" />

          {/* Compound Wealth Opportunity Curve (Emerald green) */}
          <path d={compoundPath} fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />

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

          {/* Active Points */}
          <circle cx={activeX} cy={activeYDirect} r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
          <circle cx={activeX} cy={activeYCompound} r="6.5" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />

          {/* Floating dynamic tooltip */}
          <g transform={`translate(${activeX > 380 ? activeX - 195 : activeX + 15}, ${Math.min(activeYCompound, 110)})`}>
            <rect
              width="180"
              height="88"
              rx="10"
              fill="currentColor"
              className="text-white dark:text-slate-900"
              stroke="currentColor"
              strokeWidth="1.5"
              filter="drop-shadow(0 6px 16px rgba(0,0,0,0.12))"
            />
            <text x="12" y="22" fontSize="12" fontWeight="700" fill="currentColor" className="text-slate-900 dark:text-white">
              Year {cur.year} Opportunity
            </text>
            <text x="12" y="40" fontSize="11" fontWeight="700" fill="#10b981">
              Invested Savings: {fmtCurrency(cur.compoundedWealth)}
            </text>
            <text x="12" y="56" fontSize="11" fontWeight="600" fill="#ef4444">
              Direct Cash Outflow: {fmtCurrency(cur.directCash)}
            </text>
            <text x="12" y="72" fontSize="10" fill="currentColor" className="text-slate-500 dark:text-slate-400">
              Cigarettes: {cur.cigsSmoked.toLocaleString()} avoided
            </text>
          </g>
        </svg>
      </div>

      {/* Scrub stats card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            7% Compounded Opportunity Cost
          </span>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
            {fmtCurrency(cur.compoundedWealth)}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Direct cash burned: <strong className="text-rose-600 dark:text-rose-400">{fmtCurrency(cur.directCash)}</strong> ({cur.cigsSmoked.toLocaleString()} cigarettes).
          </p>
        </div>
        <div>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            CDC Health Recovery Milestone
          </span>
          <div className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
            Year {cur.year} Physiological Status
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
            {cur.healthMilestone}
          </p>
        </div>
      </div>

      {/* Legend & Instructions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> S&amp;P 500 Compounded Wealth (7% return)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Cumulative Direct Cash Outflow
          </span>
        </div>
        <span className="text-[11px] italic">Hover or scrub across graph to view multi-year projection.</span>
      </div>
    </div>
  );
}
