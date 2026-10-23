'use client';

import React, { useState } from 'react';

interface FeedingStage {
  ageLabel: string;
  ageWeeksOrMonths: string;
  stomachSize: string;
  stomachCapacityMl: number;
  ozPerDay: number;
  feedsPerDay: number;
  ozPerFeed: string;
  solidFoodsShare: number; // percentage
  clinicalNote: string;
}

const FEEDING_STAGES: FeedingStage[] = [
  {
    ageLabel: 'Day 1–3 (Colostrum)',
    ageWeeksOrMonths: '0–3 days',
    stomachSize: 'Cherry (5–7 ml)',
    stomachCapacityMl: 7,
    ozPerDay: 3,
    feedsPerDay: 10,
    ozPerFeed: '0.2–0.5 oz (5–15 ml)',
    solidFoodsShare: 0,
    clinicalNote: 'High-antibody colostrum; small, frequent drops prevent neonatal hypoglycemia and hydrate stomach.',
  },
  {
    ageLabel: 'Week 1–2 (Transitional)',
    ageWeeksOrMonths: '7–14 days',
    stomachSize: 'Walnut (45–60 ml)',
    stomachCapacityMl: 55,
    ozPerDay: 16,
    feedsPerDay: 9,
    ozPerFeed: '1.5–2.5 oz (45–75 ml)',
    solidFoodsShare: 0,
    clinicalNote: 'Mature milk transitions in; infant regains physiological birth fluid loss by day 10–14.',
  },
  {
    ageLabel: 'Month 1',
    ageWeeksOrMonths: '4 weeks',
    stomachSize: 'Large Egg (80–150 ml)',
    stomachCapacityMl: 120,
    ozPerDay: 24,
    feedsPerDay: 8,
    ozPerFeed: '2.5–4.0 oz (75–120 ml)',
    solidFoodsShare: 0,
    clinicalNote: 'AAP standard rule: 2.5 oz per lb of body weight daily; rhythmic nutritive sucking established.',
  },
  {
    ageLabel: 'Months 2–3',
    ageWeeksOrMonths: '8–12 weeks',
    stomachSize: 'Baseball (150–180 ml)',
    stomachCapacityMl: 165,
    ozPerDay: 28,
    feedsPerDay: 7,
    ozPerFeed: '4.0–5.5 oz (120–160 ml)',
    solidFoodsShare: 0,
    clinicalNote: 'Stomach stretches safely; daytime feeds consolidate; longest nocturnal sleep stretch lengthens.',
  },
  {
    ageLabel: 'Months 4–5',
    ageWeeksOrMonths: '16–20 weeks',
    stomachSize: 'Softball (180–210 ml)',
    stomachCapacityMl: 195,
    ozPerDay: 30,
    feedsPerDay: 6,
    ozPerFeed: '5.0–7.0 oz (150–210 ml)',
    solidFoodsShare: 0,
    clinicalNote: 'Peak liquid volume phase; tongue-thrust reflex begins waning in preparation for solids readiness.',
  },
  {
    ageLabel: 'Months 6–8 (Solids Intro)',
    ageWeeksOrMonths: '24–32 weeks',
    stomachSize: 'Grapefruit (210–240 ml)',
    stomachCapacityMl: 225,
    ozPerDay: 28,
    feedsPerDay: 5,
    ozPerFeed: '6.0–8.0 oz (180–240 ml)',
    solidFoodsShare: 20,
    clinicalNote: 'AAP milestone: Iron-rich single-ingredient purées or finger foods start; milk still provides 80% calories.',
  },
  {
    ageLabel: 'Months 9–12',
    ageWeeksOrMonths: '36–48 weeks',
    stomachSize: 'Adult Miniature (240–300 ml)',
    stomachCapacityMl: 270,
    ozPerDay: 24,
    feedsPerDay: 4,
    ozPerFeed: '6.0–8.0 oz (180–240 ml)',
    solidFoodsShare: 45,
    clinicalNote: '3 meals + 2 snacks alongside milk; table foods supply expanding micronutrients and motor chewing skills.',
  },
];

export function InfantFeedingVolumeTimelineChart() {
  const [activeIdx, setActiveIdx] = useState<number>(3); // Months 2-3 default
  const cur = FEEDING_STAGES[activeIdx];

  const svgWidth = 640;
  const svgHeight = 260;
  const padLeft = 55;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const maxOz = 36;
  const scaleX = (i: number) => padLeft + (i / (FEEDING_STAGES.length - 1)) * plotW;
  const scaleY = (oz: number) => padTop + plotH - (oz / maxOz) * plotH;

  const points = FEEDING_STAGES.map((s, i) => `${scaleX(i)},${scaleY(s.ozPerDay)}`).join(' ');
  const areaPoints = `${scaleX(0)},${scaleY(0)} ${points} ${scaleX(FEEDING_STAGES.length - 1)},${scaleY(0)}`;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>🍼</span> Infant Daily Feeding Volume &amp; Stomach Capacity Spectrum
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Clinical AAP pediatric benchmarks: Total daily liquid volume (oz) and solid food transition curve (0–12 months)
          </p>
        </div>
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
          AAP Clinical Standard
        </span>
      </div>

      {/* Interactive Stage Selector Buttons */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {FEEDING_STAGES.map((s, idx) => (
          <button
            key={s.ageLabel}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
              activeIdx === idx
                ? 'bg-blue-600 text-white shadow-sm dark:bg-blue-500'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {s.ageLabel}
          </button>
        ))}
      </div>

      {/* SVG Interactive Visual Chart */}
      <div className="relative overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full min-w-[540px] select-none text-xs"
        >
          <defs>
            <linearGradient id="feedingAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[10, 20, 30].map((ozVal) => (
            <g key={ozVal}>
              <line
                x1={padLeft}
                y1={scaleY(ozVal)}
                x2={padLeft + plotW}
                y2={scaleY(ozVal)}
                stroke="currentColor"
                strokeDasharray="3 3"
                className="text-slate-200 dark:text-slate-800"
              />
              <text
                x={padLeft - 8}
                y={scaleY(ozVal) + 4}
                textAnchor="end"
                className="fill-slate-400 font-mono text-[10px]"
              >
                {ozVal} oz
              </text>
            </g>
          ))}

          {/* Area fill */}
          <polygon points={areaPoints} fill="url(#feedingAreaGrad)" />

          {/* Line curve */}
          <polyline
            points={points}
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* X axis labels & points */}
          {FEEDING_STAGES.map((s, i) => {
            const cx = scaleX(i);
            const cy = scaleY(s.ozPerDay);
            const isSelected = activeIdx === i;
            return (
              <g key={s.ageLabel} onClick={() => setActiveIdx(i)} className="cursor-pointer">
                {/* Vertical marker on active */}
                {isSelected && (
                  <line
                    x1={cx}
                    y1={padTop}
                    x2={cx}
                    y2={padTop + plotH}
                    stroke="#2563eb"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                )}
                {/* Node Circle */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 6 : 4}
                  fill={isSelected ? '#1d4ed8' : '#3b82f6'}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all"
                />
                {/* Label text */}
                <text
                  x={cx}
                  y={padTop + plotH + 18}
                  textAnchor="middle"
                  className={`font-mono text-[10px] ${
                    isSelected ? 'fill-blue-600 font-bold dark:fill-blue-400' : 'fill-slate-500'
                  }`}
                >
                  {s.ageWeeksOrMonths}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Stage Detail Card */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-xl border border-blue-100 bg-blue-50/50 p-3.5 text-xs dark:border-blue-900/50 dark:bg-blue-950/20">
        <div>
          <span className="block text-slate-500 dark:text-slate-400">Total Daily Volume:</span>
          <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
            {cur.ozPerDay} oz ({Math.round(cur.ozPerDay * 29.57)} ml)
          </span>
        </div>
        <div>
          <span className="block text-slate-500 dark:text-slate-400">Average Feed Size:</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">{cur.ozPerFeed}</span>
        </div>
        <div>
          <span className="block text-slate-500 dark:text-slate-400">Feeding Frequency:</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {cur.feedsPerDay} times / 24 hrs
          </span>
        </div>
        <div>
          <span className="block text-slate-500 dark:text-slate-400">Stomach Anatomy:</span>
          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
            {cur.stomachSize}
          </span>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">
        <strong>Pediatric Clinical Note:</strong> {cur.clinicalNote}
      </p>
    </div>
  );
}
