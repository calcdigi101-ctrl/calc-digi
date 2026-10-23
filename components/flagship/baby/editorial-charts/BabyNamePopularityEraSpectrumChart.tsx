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

interface NamingEra {
  era: string;
  shortLabel: string;
  timeSpan: string;
  topBoy: string;
  topGirl: string;
  top10SharePct: number;
  diversityPer1k: number;
  keyTrend: string;
  linguisticDriver: string;
}

const NAMING_DATA: NamingEra[] = [
  {
    era: 'Victorian Classic',
    shortLabel: '1880–1910',
    timeSpan: '1880 – 1910',
    topBoy: 'John / William',
    topGirl: 'Mary / Anna',
    top10SharePct: 34.5,
    diversityPer1k: 28,
    keyTrend: 'High consensus; 1 in 3 babies shared a top-10 moniker.',
    linguisticDriver: 'Biblical heritage, royal family namesake, patronymic continuity.',
  },
  {
    era: 'Postwar Baby Boom',
    shortLabel: '1945–1965',
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
    shortLabel: '1975–1999',
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
    shortLabel: '2000–2019',
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
    shortLabel: '2020–2026',
    timeSpan: '2020 – 2026',
    topBoy: 'Liam / Noah',
    topGirl: 'Olivia / Amelia',
    top10SharePct: 6.8,
    diversityPer1k: 184,
    keyTrend: 'Highest uniqueness in history; under 7% receive top-10 names.',
    linguisticDriver: 'Botanical, celestial, and gender-neutral monikers; global phonetic portability.',
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

export function BabyNamePopularityEraSpectrumChart() {
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(4); // Modern default

  useEffect(() => {
    setMounted(true);
  }, []);

  const cur = NAMING_DATA[activeIdx];

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
            US Social Security Administration (SSA) registry: 140-year collapse of naming concentration (% of newborns)
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
          {NAMING_DATA.map((e, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={e.shortLabel}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-all min-h-[44px] flex items-center gap-1 ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20 scale-[1.02] dark:bg-amber-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <span>{e.era.split(' ')[0]} ({e.shortLabel.split('–')[0]})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="h-[250px] sm:h-[280px] w-full mb-4">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={NAMING_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="namingCollapseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.7} vertical={false} />
              <XAxis dataKey="shortLabel" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={false} />
              <YAxis
                tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={false}
                width={45}
                domain={[0, 40]}
              />
              <Tooltip
                {...tooltipStyle}
                formatter={(val) => [`${val}% of newborns`, 'Top 10 Moniker Share']}
                labelFormatter={(label) => `Era: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="top10SharePct"
                name="Top 10 Name Share"
                stroke="#d97706"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#namingCollapseGrad)"
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
            <span className="text-xs text-slate-400 block font-normal">per 1,000 births</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Top 10 Moniker Share</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-amber-600 dark:text-amber-400 leading-tight block">{cur.top10SharePct}%</span>
            <span className="text-xs text-slate-400 block font-normal">of all newborns</span>
          </div>
        </div>
      </div>

      {/* Guidance Box */}
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
