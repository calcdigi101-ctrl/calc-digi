'use client';

import React, { useState } from 'react';

interface EraNamingMetric {
  era: string;
  years: string;
  topBoy: string;
  topGirl: string;
  top10SharePct: number; // percentage of all newborns who received a top-10 name
  diversityIndex: number; // unique names per 1,000 babies
  softVowelEndingsPct: number;
  characteristics: string;
}

const NAMING_ERAS: EraNamingMetric[] = [
  {
    era: 'Victorian Classic',
    years: '1880–1910',
    topBoy: 'John / William',
    topGirl: 'Mary / Anna',
    top10SharePct: 34.5,
    diversityIndex: 28,
    softVowelEndingsPct: 42,
    characteristics: 'Biblical and royal continuity; 1 in 3 babies shared a top-10 national moniker; extreme family naming tradition.',
  },
  {
    era: 'Mid-Century Baby Boom',
    years: '1945–1965',
    topBoy: 'Michael / James',
    topGirl: 'Linda / Mary',
    top10SharePct: 27.2,
    diversityIndex: 44,
    softVowelEndingsPct: 49,
    characteristics: 'Broad consensus naming; postwar optimism; patriotic and traditional 2-syllable anchors.',
  },
  {
    era: 'Millennial Pop Wave',
    years: '1980–1999',
    topBoy: 'Michael / Christopher',
    topGirl: 'Jessica / Ashley',
    top10SharePct: 18.6,
    diversityIndex: 78,
    softVowelEndingsPct: 62,
    characteristics: 'Television, media, and celebrity naming cues; explosive rise of lyrical 3-syllable girls names and -er boys names.',
  },
  {
    era: '100-Year Vintage Revival',
    years: '2000–2019',
    topBoy: 'Jacob / Noah',
    topGirl: 'Emily / Emma',
    top10SharePct: 11.4,
    diversityIndex: 125,
    softVowelEndingsPct: 74,
    characteristics: 'Great-grandparent namesake revival (the 100-year cycle); soft consonants (L, M, N) and classical Latinate endings.',
  },
  {
    era: 'Modern Eclectic & Nature',
    years: '2020–2026',
    topBoy: 'Liam / Noah',
    topGirl: 'Olivia / Amelia',
    top10SharePct: 6.8,
    diversityIndex: 184,
    softVowelEndingsPct: 86,
    characteristics: 'Highest uniqueness in recorded history; nature, celestial, and gender-neutral monikers; under 7% receive top-10 names.',
  },
];

export function BabyNamePopularityEraSpectrumChart() {
  const [activeIdx, setActiveIdx] = useState<number>(4); // Modern era default
  const cur = NAMING_ERAS[activeIdx];

  const svgWidth = 640;
  const svgHeight = 240;
  const padLeft = 60;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const maxShare = 40;
  const scaleX = (i: number) => padLeft + (i / (NAMING_ERAS.length - 1)) * plotW;
  const scaleY = (pct: number) => padTop + plotH - (pct / maxShare) * plotH;

  const points = NAMING_ERAS.map((d, i) => `${scaleX(i)},${scaleY(d.top10SharePct)}`).join(' ');
  const areaPoints = `${scaleX(0)},${scaleY(0)} ${points} ${scaleX(NAMING_ERAS.length - 1)},${scaleY(0)}`;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>✨</span> Historical Baby Name Concentration Spectrum (1880–2026)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Percentage of all US newborns sharing a Top 10 Name: The 140-year diversification collapse (SSA Data)
          </p>
        </div>
        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
          SSA Historic Registry
        </span>
      </div>

      {/* Buttons */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {NAMING_ERAS.map((e, idx) => (
          <button
            key={e.era}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
              activeIdx === idx
                ? 'bg-amber-600 text-white shadow-sm dark:bg-amber-500'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {e.era.split(' ')[0]} ({e.years.split('–')[0]})
          </button>
        ))}
      </div>

      {/* SVG Chart */}
      <div className="relative overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full min-w-[540px] select-none text-xs"
        >
          <defs>
            <linearGradient id="namingAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d97706" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[10, 20, 30].map((val) => (
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
                {val}%
              </text>
            </g>
          ))}

          {/* Area */}
          <polygon points={areaPoints} fill="url(#namingAreaGrad)" />

          {/* Polyline */}
          <polyline
            points={points}
            fill="none"
            stroke="#d97706"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Nodes */}
          {NAMING_ERAS.map((e, i) => {
            const cx = scaleX(i);
            const cy = scaleY(e.top10SharePct);
            const isSelected = activeIdx === i;
            return (
              <g key={e.era} onClick={() => setActiveIdx(i)} className="cursor-pointer">
                {isSelected && (
                  <line
                    x1={cx}
                    y1={padTop}
                    x2={cx}
                    y2={padTop + plotH}
                    stroke="#d97706"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                )}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 6 : 4}
                  fill={isSelected ? '#b45309' : '#d97706'}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <text
                  x={cx}
                  y={padTop + plotH + 18}
                  textAnchor="middle"
                  className={`font-mono text-[10px] ${
                    isSelected ? 'fill-amber-600 font-bold dark:fill-amber-400' : 'fill-slate-500'
                  }`}
                >
                  {e.years.split('–')[0]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Era Detail Card */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-xl border border-amber-100 bg-amber-50/50 p-3.5 text-xs dark:border-amber-900/50 dark:bg-amber-950/20">
        <div>
          <span className="block text-slate-500 dark:text-slate-400">Top 10 Moniker Share:</span>
          <span className="text-sm font-bold text-amber-700 dark:text-amber-300">
            {cur.top10SharePct}% of newborns
          </span>
        </div>
        <div>
          <span className="block text-slate-500 dark:text-slate-400">Leading Boy / Girl:</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {cur.topBoy.split(' / ')[0]} &amp; {cur.topGirl.split(' / ')[0]}
          </span>
        </div>
        <div>
          <span className="block text-slate-500 dark:text-slate-400">Uniqueness Diversity Index:</span>
          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
            {cur.diversityIndex} names / 1k
          </span>
        </div>
        <div>
          <span className="block text-slate-500 dark:text-slate-400">Vowel Ending Phonetics:</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {cur.softVowelEndingsPct}% of names
          </span>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">
        <strong>Linguistic &amp; Sociological Era Dynamics:</strong> {cur.characteristics}
      </p>
    </div>
  );
}
