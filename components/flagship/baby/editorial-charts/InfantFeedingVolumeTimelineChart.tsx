'use client';

import React, { useState } from 'react';

interface FeedingStage {
  label: string;
  ageWindow: string;
  dailyOz: number;
  feedsPerDay: number;
  ozPerFeed: string;
  stomachSize: string;
  stomachMl: number;
  stomachEmoji: string;
  milkPct: number;
  solidsPct: number;
  clinicalNote: string;
}

const FEEDING_STAGES: FeedingStage[] = [
  {
    label: 'Days 1–3',
    ageWindow: '0–3 days (Colostrum)',
    dailyOz: 3,
    feedsPerDay: 10,
    ozPerFeed: '0.2–0.5 oz (5–15 ml)',
    stomachSize: 'Size of a Cherry',
    stomachMl: 7,
    stomachEmoji: '🍒',
    milkPct: 100,
    solidsPct: 0,
    clinicalNote: 'High-immunoglobulin colostrum; micro-feedings protect kidneys and prevent neonatal hypoglycemia.',
  },
  {
    label: 'Weeks 1–2',
    ageWindow: '7–14 days (Transitional)',
    dailyOz: 16,
    feedsPerDay: 9,
    ozPerFeed: '1.5–2.5 oz (45–75 ml)',
    stomachSize: 'Size of a Walnut',
    stomachMl: 55,
    stomachEmoji: '🌰',
    milkPct: 100,
    solidsPct: 0,
    clinicalNote: 'Mature milk transition begins; birth fluid weight drop fully regained by day 10–14.',
  },
  {
    label: 'Month 1',
    ageWindow: '4 weeks old',
    dailyOz: 24,
    feedsPerDay: 8,
    ozPerFeed: '2.5–3.5 oz (75–105 ml)',
    stomachSize: 'Large Chicken Egg',
    stomachMl: 120,
    stomachEmoji: '🥚',
    milkPct: 100,
    solidsPct: 0,
    clinicalNote: 'AAP 2.5 oz/lb rule in full effect; steady weight gain of 25–30 grams per day expected.',
  },
  {
    label: 'Months 2–3',
    ageWindow: '8–12 weeks old',
    dailyOz: 28,
    feedsPerDay: 7,
    ozPerFeed: '4.0–5.0 oz (120–150 ml)',
    stomachSize: 'Baseball',
    stomachMl: 165,
    stomachEmoji: '⚾',
    milkPct: 100,
    solidsPct: 0,
    clinicalNote: 'Daytime feeds consolidate; longer nocturnal sleep stretch develops with circadian onset.',
  },
  {
    label: 'Months 4–5',
    ageWindow: '16–20 weeks old',
    dailyOz: 30,
    feedsPerDay: 6,
    ozPerFeed: '5.0–7.0 oz (150–210 ml)',
    stomachSize: 'Softball',
    stomachMl: 195,
    stomachEmoji: '🥎',
    milkPct: 100,
    solidsPct: 0,
    clinicalNote: 'Peak liquid volume phase; tongue-thrust reflex begins waning in anticipation of solid foods.',
  },
  {
    label: 'Months 6–8',
    ageWindow: '24–32 weeks (Solids Start)',
    dailyOz: 28,
    feedsPerDay: 5,
    ozPerFeed: '6.0–8.0 oz (180–240 ml)',
    stomachSize: 'Grapefruit',
    stomachMl: 225,
    stomachEmoji: '🍊',
    milkPct: 80,
    solidsPct: 20,
    clinicalNote: 'AAP complementary feeding start: single-ingredient iron-rich purées alongside continued milk.',
  },
  {
    label: 'Months 9–12',
    ageWindow: '36–48 weeks old',
    dailyOz: 24,
    feedsPerDay: 4,
    ozPerFeed: '6.0–8.0 oz (180–240 ml)',
    stomachSize: 'Miniature Adult Stomach',
    stomachMl: 270,
    stomachEmoji: '🍽️',
    milkPct: 60,
    solidsPct: 40,
    clinicalNote: 'Finger foods, family table meals, and open cup practice; milk continues supplying vital lipids.',
  },
];

export function InfantFeedingVolumeTimelineChart() {
  const [activeIdx, setActiveIdx] = useState<number>(3); // Months 2-3 default
  const cur = FEEDING_STAGES[activeIdx];

  const dailyMl = Math.round(cur.dailyOz * 29.5735);

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🍼</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              Infant Daily Feeding Volume &amp; Gastric Capacity
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            AAP pediatric guidelines for 24-hour milk volume, stomach expansion, and complementary solids (0–12 mo)
          </p>
        </div>
        <span className="self-start sm:self-auto rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 ring-1 ring-inset ring-blue-600/20">
          AAP Nutrition Benchmark
        </span>
      </div>

      {/* Touch-Friendly Horizontally Scrollable Age Pills */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Select Baby Age:
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {FEEDING_STAGES.map((s, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={s.label}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-all min-h-[44px] flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02] dark:bg-blue-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <span>{s.stomachEmoji}</span>
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Volume & Solids Progress Bar */}
      <div className="mb-5 rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
          <span>Diet Composition at <strong>{cur.ageWindow}</strong>:</span>
          <span>
            <strong className="text-blue-600 dark:text-blue-400">{cur.milkPct}% Milk</strong>
            {cur.solidsPct > 0 ? (
              <strong className="text-amber-600 dark:text-amber-400"> + {cur.solidsPct}% Solid Foods</strong>
            ) : null}
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 flex">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${cur.milkPct}%` }}
          />
          {cur.solidsPct > 0 ? (
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${cur.solidsPct}%` }}
            />
          ) : null}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono">
          <span>100% Liquid Diet</span>
          <span>Solids Introduction (6 mo)</span>
          <span>Table Foods (12 mo)</span>
        </div>
      </div>

      {/* Active Stage Metrics Grid (Mobile Responsive) */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 mb-4">
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Total 24-Hr Volume</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{cur.dailyOz} oz / day</span>
            <span className="text-xs text-slate-400 block font-normal">({dailyMl} ml)</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Average Bottle Size</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{cur.ozPerFeed}</span>
            <span className="text-xs text-slate-400 block font-normal">per single feed</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Feeding Frequency</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{cur.feedsPerDay} times</span>
            <span className="text-xs text-slate-400 block font-normal">per 24 hours</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Gastric Capacity</span>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="text-lg">{cur.stomachEmoji}</span>
            <div>
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block leading-tight">{cur.stomachSize}</span>
              <span className="text-[10px] text-slate-400 block">~{cur.stomachMl} ml capacity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Guidance Card */}
      <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3.5 text-xs dark:border-blue-900/40 dark:bg-blue-950/20">
        <div className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5 mb-1">
          <span>📋</span>
          <span>Pediatric Clinical Guidance: {cur.ageWindow}</span>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {cur.clinicalNote}
        </p>
      </div>
    </div>
  );
}
