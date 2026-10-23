'use client';

import React, { useState } from 'react';

interface GrowthStage {
  ageLabel: string;
  month: number;
  boyP3: number;
  boyP50: number;
  boyP97: number;
  girlP3: number;
  girlP50: number;
  girlP97: number;
  dailyGainGrams: string;
  milestone: string;
}

const GROWTH_DATA: GrowthStage[] = [
  {
    ageLabel: 'Birth',
    month: 0,
    boyP3: 2.5,
    boyP50: 3.3,
    boyP97: 4.4,
    girlP3: 2.4,
    girlP50: 3.2,
    girlP97: 4.2,
    dailyGainGrams: '5–10% initial fluid loss',
    milestone: 'Newborn baseline; initial fluid loss regained by day 10–14 of life.',
  },
  {
    ageLabel: '1 Mo',
    month: 1,
    boyP3: 3.4,
    boyP50: 4.5,
    boyP97: 5.8,
    girlP3: 3.2,
    girlP50: 4.2,
    girlP97: 5.5,
    dailyGainGrams: '25–30 g / day',
    milestone: 'Rapid newborn growth phase; focus on hands; visual fixation at 8–12 inches.',
  },
  {
    ageLabel: '2 Mo',
    month: 2,
    boyP3: 4.3,
    boyP50: 5.6,
    boyP97: 7.1,
    girlP3: 3.9,
    girlP50: 5.1,
    girlP97: 6.6,
    dailyGainGrams: '25–30 g / day',
    milestone: 'Social smile emerges; head lifted 45 degrees prone; cooing vocalizations.',
  },
  {
    ageLabel: '4 Mo',
    month: 4,
    boyP3: 5.6,
    boyP50: 7.0,
    boyP97: 8.7,
    girlP3: 5.0,
    girlP50: 6.4,
    girlP97: 8.2,
    dailyGainGrams: '20–25 g / day',
    milestone: 'Birth weight doubled; rolls tummy to back; reaches intentionally for toys.',
  },
  {
    ageLabel: '6 Mo',
    month: 6,
    boyP3: 6.4,
    boyP50: 7.9,
    boyP97: 9.8,
    girlP3: 5.7,
    girlP50: 7.3,
    girlP97: 9.3,
    dailyGainGrams: '15–20 g / day',
    milestone: 'Sits with minimal support; responds to name; introduction of solid foods.',
  },
  {
    ageLabel: '9 Mo',
    month: 9,
    boyP3: 7.1,
    boyP50: 8.9,
    boyP97: 11.0,
    girlP3: 6.5,
    girlP50: 8.2,
    girlP97: 10.5,
    dailyGainGrams: '12–15 g / day',
    milestone: 'Pincer grasp development; crawls on all fours; pulls up to stand on furniture.',
  },
  {
    ageLabel: '12 Mo (1 Yr)',
    month: 12,
    boyP3: 7.7,
    boyP50: 9.6,
    boyP97: 12.0,
    girlP3: 7.0,
    girlP50: 8.9,
    girlP97: 11.5,
    dailyGainGrams: '10–12 g / day',
    milestone: 'Birth weight tripled; first intentional words; first independent steps.',
  },
  {
    ageLabel: '18 Mo',
    month: 18,
    boyP3: 8.8,
    boyP50: 10.9,
    boyP97: 13.7,
    girlP3: 8.1,
    girlP50: 10.2,
    girlP97: 13.2,
    dailyGainGrams: '8–10 g / day',
    milestone: 'Runs and climbs stairs; 10–20 single words; drinking proficiently from cup.',
  },
  {
    ageLabel: '24 Mo (2 Yr)',
    month: 24,
    boyP3: 9.7,
    boyP50: 12.2,
    boyP97: 15.3,
    girlP3: 9.0,
    girlP50: 11.5,
    girlP97: 14.8,
    dailyGainGrams: '7–8 g / day',
    milestone: 'Birth weight quadrupled; two-word phrases; approximately 50% of adult stature.',
  },
];

export function WhoInfantGrowthVisualizerChart() {
  const [sex, setSex] = useState<'boy' | 'girl'>('boy');
  const [activeIdx, setActiveIdx] = useState<number>(4); // 6 Months default

  const cur = GROWTH_DATA[activeIdx];
  const p3 = sex === 'boy' ? cur.boyP3 : cur.girlP3;
  const p50 = sex === 'boy' ? cur.boyP50 : cur.girlP50;
  const p97 = sex === 'boy' ? cur.boyP97 : cur.girlP97;

  const toLbs = (kg: number) => (kg * 2.20462).toFixed(1);

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all">
      {/* Header with Sex Toggle */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">⚖️</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              WHO Infant Growth Standards &amp; Percentile Bounds
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Official World Health Organization (WHO) MGRS weight-for-age benchmarks (0–24 months)
          </p>
        </div>

        {/* Sex Switcher */}
        <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setSex('boy')}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              sex === 'boy'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            👦 Boy Benchmarks
          </button>
          <button
            type="button"
            onClick={() => setSex('girl')}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              sex === 'girl'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            👧 Girl Benchmarks
          </button>
        </div>
      </div>

      {/* Age Pill Selector */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Select Age Milestone:
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {GROWTH_DATA.map((g, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={g.ageLabel}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-all min-h-[44px] flex items-center gap-1 ${
                  isSelected
                    ? sex === 'boy'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                      : 'bg-rose-600 text-white shadow-md shadow-rose-500/20 scale-[1.02]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <span>{g.ageLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Weight Distribution Range Bar */}
      <div className="mb-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-200 mb-2">
          <span>WHO Normal Population Band ({cur.ageLabel})</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">3rd to 97th Percentile</span>
        </div>

        {/* Visual Percentile Gradient Bar */}
        <div className="relative h-4 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <div className="absolute inset-y-0 left-[15%] right-[15%] bg-gradient-to-r from-blue-300 via-emerald-400 to-purple-400 dark:from-blue-600 dark:via-emerald-500 dark:to-purple-600" />
        </div>

        {/* Labels below bar */}
        <div className="mt-2.5 flex items-center justify-between text-xs">
          <div className="text-left">
            <span className="block text-[10px] text-slate-400">3rd Percentile (Lower)</span>
            <strong className="text-slate-800 dark:text-slate-200">{p3} kg ({toLbs(p3)} lbs)</strong>
          </div>
          <div className="text-center">
            <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">50th (Median)</span>
            <strong className="text-emerald-700 dark:text-emerald-300 text-sm">{p50} kg ({toLbs(p50)} lbs)</strong>
          </div>
          <div className="text-right">
            <span className="block text-[10px] text-slate-400">97th Percentile (Upper)</span>
            <strong className="text-slate-800 dark:text-slate-200">{p97} kg ({toLbs(p97)} lbs)</strong>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 mb-4">
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Median 50th Weight</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-slate-900 dark:text-white">{p50} kg</span>
            <span className="text-xs text-slate-400 block font-normal">({toLbs(p50)} lbs)</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Expected Daily Gain</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{cur.dailyGainGrams}</span>
            <span className="text-xs text-slate-400 block font-normal">average daily rate</span>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Normal Band Spread</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{(p97 - p3).toFixed(1)} kg</span>
            <span className="text-xs text-slate-400 block font-normal">({toLbs(p97 - p3)} lbs total span)</span>
          </div>
        </div>
      </div>

      {/* Milestone Card */}
      <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3.5 text-xs dark:border-emerald-900/40 dark:bg-emerald-950/20">
        <div className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 mb-1">
          <span>👶</span>
          <span>{cur.ageLabel} Developmental Milestone:</span>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {cur.milestone}
        </p>
      </div>
    </div>
  );
}
