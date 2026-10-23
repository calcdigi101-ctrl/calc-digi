'use client';

import React, { useState } from 'react';

interface NamingEra {
  era: string;
  timeSpan: string;
  topBoy: string;
  topGirl: string;
  top10SharePct: number;
  diversityPer1k: number;
  keyTrend: string;
  linguisticDriver: string;
}

const ERAS: NamingEra[] = [
  {
    era: 'Victorian Classic',
    timeSpan: '1880 – 1910',
    topBoy: 'John / William',
    topGirl: 'Mary / Anna',
    top10SharePct: 34.5,
    diversityPer1k: 28,
    keyTrend: 'High consensus; 1 in 3 babies shared a top-10 moniker.',
    linguisticDriver: 'Biblical heritage, royal family namesake, patronymic family tradition.',
  },
  {
    era: 'Postwar Baby Boom',
    timeSpan: '1945 – 1965',
    topBoy: 'Michael / James',
    topGirl: 'Linda / Mary',
    top10SharePct: 27.2,
    diversityPer1k: 44,
    keyTrend: 'Patriotic consensus; strong two-syllable masculine anchors.',
    linguisticDriver: 'Postwar optimism, broad cultural homogeneity, traditional Anglo-Saxon roots.',
  },
  {
    era: 'Gen X & Millennial Wave',
    timeSpan: '1975 – 1999',
    topBoy: 'Michael / Christopher',
    topGirl: 'Jessica / Ashley',
    top10SharePct: 18.6,
    diversityPer1k: 78,
    keyTrend: 'Media & pop culture wave; lyrical 3-syllable feminine names.',
    linguisticDriver: 'Television/film celebrity influence; emergence of modern soft vowel endings.',
  },
  {
    era: '100-Year Vintage Revival',
    timeSpan: '2000 – 2019',
    topBoy: 'Jacob / Noah',
    topGirl: 'Emily / Emma',
    top10SharePct: 11.4,
    diversityPer1k: 125,
    keyTrend: 'Great-grandparent namesake revival; liquid consonants (L, M, N).',
    linguisticDriver: 'Four-generation cyclical resurgence; desire for grounded historic elegance.',
  },
  {
    era: 'Modern Eclectic & Nature',
    timeSpan: '2020 – 2026',
    topBoy: 'Liam / Noah',
    topGirl: 'Olivia / Amelia',
    top10SharePct: 6.8,
    diversityPer1k: 184,
    keyTrend: 'Highest uniqueness in history; under 7% receive top-10 names.',
    linguisticDriver: 'Botanical, celestial, and gender-neutral monikers; global phonetic portability.',
  },
];

export function BabyNamePopularityEraSpectrumChart() {
  const [activeIdx, setActiveIdx] = useState<number>(4); // Modern Eclectic default
  const cur = ERAS[activeIdx];

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              Historical Baby Name Diversification Spectrum (1880–2026)
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            US Social Security Administration (SSA) historical registry: 140-year concentration collapse
          </p>
        </div>
        <span className="self-start sm:self-auto rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 ring-1 ring-inset ring-amber-600/20">
          SSA Historical Registry
        </span>
      </div>

      {/* Era Pills */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Select Historical Era:
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {ERAS.map((e, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={e.era}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-all min-h-[44px] flex items-center gap-1 ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20 scale-[1.02] dark:bg-amber-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <span>{e.era.split(' ')[0]} ({e.timeSpan.split(' ')[0]})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Concentration Collapse Meter */}
      <div className="mb-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-200 mb-2">
          <span>Top 10 Moniker Concentration ({cur.era}):</span>
          <span className="font-bold text-amber-600 dark:text-amber-400">{cur.top10SharePct}% of all newborns</span>
        </div>
        <div className="h-3.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-300"
            style={{ width: `${(cur.top10SharePct / 40) * 100}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono">
          <span>0%</span>
          <span>10% (Modern Diversity)</span>
          <span>25% (Mid-Century)</span>
          <span>35% (Victorian Peak)</span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 mb-4">
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Leading Boy Name</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 leading-tight block">{cur.topBoy}</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Leading Girl Name</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-rose-600 dark:text-rose-400 leading-tight block">{cur.topGirl}</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Diversity Index</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 leading-tight block">{cur.diversityPer1k} names</span>
            <span className="text-xs text-slate-400 block font-normal">per 1,000 babies</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Era Time Horizon</span>
          <div className="mt-1">
            <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight block">{cur.timeSpan}</span>
          </div>
        </div>
      </div>

      {/* Guidance Card */}
      <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-3.5 text-xs dark:border-amber-900/40 dark:bg-amber-950/20">
        <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mb-1">
          <span>📜</span>
          <span>Sociological Naming Dynamics ({cur.era}):</span>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-1">
          {cur.keyTrend}
        </p>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
          <strong>Linguistic Drivers:</strong> {cur.linguisticDriver}
        </p>
      </div>
    </div>
  );
}
