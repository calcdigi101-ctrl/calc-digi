'use client';

import React, { useState, useEffect } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface FeedingData {
  ageLabel: string;
  shortLabel: string;
  dailyOz: number;
  dailyMl: number;
  stomachMl: number;
  stomachSize: string;
  stomachEmoji: string;
  feedsPerDay: number;
  ozPerFeed: string;
  solidFoodsPct: number;
  clinicalNote: string;
}

const FEEDING_DATA: FeedingData[] = [
  {
    ageLabel: 'Days 1–3 (Colostrum)',
    shortLabel: 'Day 1–3',
    dailyOz: 3,
    dailyMl: 90,
    stomachMl: 7,
    stomachSize: 'Size of a Cherry',
    stomachEmoji: '🍒',
    feedsPerDay: 10,
    ozPerFeed: '0.2–0.5 oz (5–15 ml)',
    solidFoodsPct: 0,
    clinicalNote: 'High-antibody colostrum; micro-feedings protect kidneys and prevent neonatal hypoglycemia.',
  },
  {
    ageLabel: 'Weeks 1–2 (Transitional)',
    shortLabel: 'Wk 1–2',
    dailyOz: 16,
    dailyMl: 470,
    stomachMl: 55,
    stomachSize: 'Size of a Walnut',
    stomachEmoji: '🌰',
    feedsPerDay: 9,
    ozPerFeed: '1.5–2.5 oz (45–75 ml)',
    solidFoodsPct: 0,
    clinicalNote: 'Mature milk transition begins; birth fluid weight drop fully regained by day 10–14.',
  },
  {
    ageLabel: 'Month 1',
    shortLabel: '1 Mo',
    dailyOz: 24,
    dailyMl: 710,
    stomachMl: 120,
    stomachSize: 'Large Chicken Egg',
    stomachEmoji: '🥚',
    feedsPerDay: 8,
    ozPerFeed: '2.5–3.5 oz (75–105 ml)',
    solidFoodsPct: 0,
    clinicalNote: 'AAP 2.5 oz/lb rule in full effect; steady daily weight gain of 25–30 grams expected.',
  },
  {
    ageLabel: 'Months 2–3',
    shortLabel: '2–3 Mo',
    dailyOz: 28,
    dailyMl: 830,
    stomachMl: 165,
    stomachSize: 'Baseball',
    stomachEmoji: '⚾',
    feedsPerDay: 7,
    ozPerFeed: '4.0–5.0 oz (120–150 ml)',
    solidFoodsPct: 0,
    clinicalNote: 'Daytime feeds consolidate; longer nocturnal sleep stretch develops with circadian melatonin onset.',
  },
  {
    ageLabel: 'Months 4–5',
    shortLabel: '4–5 Mo',
    dailyOz: 30,
    dailyMl: 890,
    stomachMl: 195,
    stomachSize: 'Softball',
    stomachEmoji: '🥎',
    feedsPerDay: 6,
    ozPerFeed: '5.0–7.0 oz (150–210 ml)',
    solidFoodsPct: 0,
    clinicalNote: 'Peak liquid volume phase; tongue-thrust reflex begins waning in preparation for solids.',
  },
  {
    ageLabel: 'Months 6–8 (Solids Intro)',
    shortLabel: '6–8 Mo',
    dailyOz: 28,
    dailyMl: 830,
    stomachMl: 225,
    stomachSize: 'Grapefruit',
    stomachEmoji: '🍊',
    feedsPerDay: 5,
    ozPerFeed: '6.0–8.0 oz (180–240 ml)',
    solidFoodsPct: 20,
    clinicalNote: 'AAP milestone: Iron-rich single-ingredient purées or finger foods start; milk supplies 80% calories.',
  },
  {
    ageLabel: 'Months 9–12',
    shortLabel: '9–12 Mo',
    dailyOz: 24,
    dailyMl: 710,
    stomachMl: 270,
    stomachSize: 'Miniature Adult Stomach',
    stomachEmoji: '🍽️',
    feedsPerDay: 4,
    ozPerFeed: '6.0–8.0 oz (180–240 ml)',
    solidFoodsPct: 40,
    clinicalNote: '3 table meals + snacks alongside milk; family foods supply expanding vitamins and motor chewing skills.',
  },
];

const tooltipStyle = {
  contentStyle: {
    borderRadius: '12px',
    border: '1px solid #cbd5e1',
    fontSize: '12px',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  },
};

export function InfantFeedingVolumeTimelineChart() {
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(3); // 2-3 Mo default

  useEffect(() => {
    setMounted(true);
  }, []);

  const cur = FEEDING_DATA[activeIdx];

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all">
      {/* Chart Header */}
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🍼</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              Daily Feeding Volume &amp; Liquid Nutrition Curve
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            AAP pediatric benchmarks: 24-hour milk consumption curve (oz/day) and stomach capacity expansion (0–12 mo)
          </p>
        </div>
        <span className="self-start sm:self-auto rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 ring-1 ring-inset ring-blue-600/20">
          AAP Nutrition Standards
        </span>
      </div>

      {/* Age Pills */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Select Infant Age:
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {FEEDING_DATA.map((d, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={d.shortLabel}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-all min-h-[44px] flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02] dark:bg-blue-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <span>{d.stomachEmoji}</span>
                <span>{d.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="h-[250px] sm:h-[280px] w-full mb-4">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={FEEDING_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="feedingVolGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.7} vertical={false} />
              <XAxis dataKey="shortLabel" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={false} />
              <YAxis
                tickFormatter={(v) => `${v}oz`}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={false}
                width={45}
                domain={[0, 36]}
              />
              <Tooltip
                {...tooltipStyle}
                formatter={(val) => [`${val} oz/day (${Math.round(Number(val) * 29.57)} ml)`, 'Daily Milk Volume']}
                labelFormatter={(label) => `Infant Stage: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="dailyOz"
                name="Daily Volume"
                stroke="#2563eb"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#feedingVolGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
        )}
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 mb-4">
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Total 24-Hr Volume</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{cur.dailyOz} oz / day</span>
            <span className="text-xs text-slate-400 block font-normal">({cur.dailyMl} ml daily)</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Per-Feed Bottle Size</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{cur.ozPerFeed}</span>
            <span className="text-xs text-slate-400 block font-normal">single portion</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Feed Frequency</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{cur.feedsPerDay} times</span>
            <span className="text-xs text-slate-400 block font-normal">per 24 hours</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Stomach Anatomy</span>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="text-lg">{cur.stomachEmoji}</span>
            <div>
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 leading-tight block">{cur.stomachSize}</span>
              <span className="text-[10px] text-slate-400 block">~{cur.stomachMl} ml capacity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Guidance Box */}
      <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3.5 text-xs dark:border-blue-900/40 dark:bg-blue-950/20">
        <div className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5 mb-1">
          <span>📋</span>
          <span>Pediatric Nutrition Note ({cur.ageLabel}):</span>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {cur.clinicalNote}
        </p>
      </div>
    </div>
  );
}
