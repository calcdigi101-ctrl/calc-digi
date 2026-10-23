'use client';

import React, { useState } from 'react';

interface DiaperStage {
  stage: string;
  weightLbs: string;
  durationMonths: number;
  diapersPerDay: number;
  totalDiapers: number;
  storeCost: number;
  premiumCost: number;
  clothCost: number;
  milestone: string;
}

const DIAPER_STAGES: DiaperStage[] = [
  {
    stage: 'Newborn (NB)',
    weightLbs: '< 10 lbs',
    durationMonths: 1.5,
    diapersPerDay: 11,
    totalDiapers: 500,
    storeCost: 90,
    premiumCost: 175,
    clothCost: 45,
    milestone: 'Umbilical cord notch cut-out; high change frequency prevents newborn moisture dermatitis.',
  },
  {
    stage: 'Size 1',
    weightLbs: '8–14 lbs',
    durationMonths: 2.5,
    diapersPerDay: 9,
    totalDiapers: 675,
    storeCost: 121,
    premiumCost: 236,
    clothCost: 55,
    milestone: 'Fastest infant weight gain; leg cuff elastic seal prevents liquid blowout leaks.',
  },
  {
    stage: 'Size 2',
    weightLbs: '12–18 lbs',
    durationMonths: 3.0,
    diapersPerDay: 8,
    totalDiapers: 720,
    storeCost: 136,
    premiumCost: 266,
    clothCost: 65,
    milestone: 'Stool consolidation begins; rolling and kicking requires flexible waistbands.',
  },
  {
    stage: 'Size 3',
    weightLbs: '16–28 lbs',
    durationMonths: 7.0,
    diapersPerDay: 6,
    totalDiapers: 1260,
    storeCost: 264,
    premiumCost: 504,
    clothCost: 135,
    milestone: 'Longest stage in infant diapering; crawling, sitting, and solid food introduction.',
  },
  {
    stage: 'Size 4',
    weightLbs: '22–37 lbs',
    durationMonths: 8.0,
    diapersPerDay: 5,
    totalDiapers: 1200,
    storeCost: 288,
    premiumCost: 552,
    clothCost: 150,
    milestone: 'Walking, climbing, active toddlers; overnight absorbency core becomes essential.',
  },
  {
    stage: 'Size 5 / 6 (Training)',
    weightLbs: '27+ lbs',
    durationMonths: 8.0,
    diapersPerDay: 4,
    totalDiapers: 960,
    storeCost: 259,
    premiumCost: 480,
    clothCost: 120,
    milestone: 'Transition to pull-on training pants; readiness for independent toilet training (approx 30 mo).',
  },
];

export function DiaperStageExpenseTimelineChart() {
  const [activeIdx, setActiveIdx] = useState<number>(3); // Size 3 default
  const cur = DIAPER_STAGES[activeIdx];

  const svgWidth = 640;
  const svgHeight = 260;
  const padLeft = 60;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  // Cumulative costs
  let runningStore = 0;
  let runningPremium = 0;
  const cumulativeData = DIAPER_STAGES.map((s) => {
    runningStore += s.storeCost;
    runningPremium += s.premiumCost;
    return {
      stage: s.stage,
      store: runningStore,
      premium: runningPremium,
    };
  });

  const maxCost = 2500;
  const scaleX = (i: number) => padLeft + (i / (DIAPER_STAGES.length - 1)) * plotW;
  const scaleY = (cost: number) => padTop + plotH - (cost / maxCost) * plotH;

  const storePoints = cumulativeData.map((d, i) => `${scaleX(i)},${scaleY(d.store)}`).join(' ');
  const premPoints = cumulativeData.map((d, i) => `${scaleX(i)},${scaleY(d.premium)}`).join(' ');

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>🧷</span> Diaper Size Progression &amp; Cumulative Expense Curve
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Cumulative financial outlay from birth to potty training (30 months): Store Brand vs Premium Brand
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium">
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Store Brand ($1,158)
          </span>
          <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-purple-500" />
            Premium Tier ($2,213)
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {DIAPER_STAGES.map((s, idx) => (
          <button
            key={s.stage}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
              activeIdx === idx
                ? 'bg-emerald-600 text-white shadow-sm dark:bg-emerald-500'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {s.stage}
          </button>
        ))}
      </div>

      {/* SVG Chart */}
      <div className="relative overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full min-w-[540px] select-none text-xs"
        >
          {/* Grid lines */}
          {[500, 1000, 1500, 2000].map((val) => (
            <g key={val}>
              <line
                x1={padLeft}
                y1={scaleY(val)}
                x2={padLeft + plotW}
                y2={scaleY(val)}
                stroke="currentColor"
                strokeDasharray="3 3"
                className="text-slate-200 dark:text-slate-800"
              />
              <text
                x={padLeft - 8}
                y={scaleY(val) + 4}
                textAnchor="end"
                className="fill-slate-400 font-mono text-[10px]"
              >
                ${val}
              </text>
            </g>
          ))}

          {/* Premium Polyline */}
          <polyline
            points={premPoints}
            fill="none"
            stroke="#9333ea"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Store Polyline */}
          <polyline
            points={storePoints}
            fill="none"
            stroke="#059669"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {DIAPER_STAGES.map((s, i) => {
            const cx = scaleX(i);
            const isSelected = activeIdx === i;
            return (
              <g key={s.stage} onClick={() => setActiveIdx(i)} className="cursor-pointer">
                {isSelected && (
                  <line
                    x1={cx}
                    y1={padTop}
                    x2={cx}
                    y2={padTop + plotH}
                    stroke="#059669"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                )}
                {/* Store Circle */}
                <circle
                  cx={cx}
                  cy={scaleY(cumulativeData[i].store)}
                  r={isSelected ? 5 : 3.5}
                  fill="#059669"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                {/* Premium Circle */}
                <circle
                  cx={cx}
                  cy={scaleY(cumulativeData[i].premium)}
                  r={isSelected ? 5 : 3.5}
                  fill="#9333ea"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                {/* X-axis label */}
                <text
                  x={cx}
                  y={padTop + plotH + 18}
                  textAnchor="middle"
                  className={`font-mono text-[10px] ${
                    isSelected ? 'fill-emerald-600 font-bold dark:fill-emerald-400' : 'fill-slate-500'
                  }`}
                >
                  {s.stage.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Stage Detail Card */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-xl border border-emerald-100 bg-emerald-50/50 p-3.5 text-xs dark:border-emerald-900/50 dark:bg-emerald-950/20">
        <div>
          <span className="block text-slate-500 dark:text-slate-400">Weight Range:</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">{cur.weightLbs}</span>
        </div>
        <div>
          <span className="block text-slate-500 dark:text-slate-400">Daily Frequency:</span>
          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
            {cur.diapersPerDay} changes / day
          </span>
        </div>
        <div>
          <span className="block text-slate-500 dark:text-slate-400">Total Diapers in Stage:</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {cur.totalDiapers.toLocaleString()} units
          </span>
        </div>
        <div>
          <span className="block text-slate-500 dark:text-slate-400">Stage Cost Difference:</span>
          <span className="text-sm font-bold text-purple-700 dark:text-purple-300">
            +${cur.premiumCost - cur.storeCost} for premium
          </span>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">
        <strong>Pediatric &amp; Practical Milestone:</strong> {cur.milestone}
      </p>
    </div>
  );
}
