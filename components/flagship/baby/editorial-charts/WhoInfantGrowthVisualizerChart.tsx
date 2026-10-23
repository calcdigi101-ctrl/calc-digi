'use client';

import React, { useState, useEffect } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface GrowthPoint {
  month: number;
  label: string;
  boyP3: number;
  boyP50: number;
  boyP97: number;
  girlP3: number;
  girlP50: number;
  girlP97: number;
  dailyGain: string;
  milestone: string;
}

const WHO_DATA: GrowthPoint[] = [
  { month: 0, label: '0m', boyP3: 2.5, boyP50: 3.3, boyP97: 4.4, girlP3: 2.4, girlP50: 3.2, girlP97: 4.2, dailyGain: '5–10% birth drop', milestone: 'Birth weight; initial physiological fluid loss regained by day 10–14.' },
  { month: 1, label: '1m', boyP3: 3.4, boyP50: 4.5, boyP97: 5.8, girlP3: 3.2, girlP50: 4.2, girlP97: 5.5, dailyGain: '25–30 g/day', milestone: 'Rapid newborn growth phase; focus on hands; visual tracking at 8–12 inches.' },
  { month: 2, label: '2m', boyP3: 4.3, boyP50: 5.6, boyP97: 7.1, girlP3: 3.9, girlP50: 5.1, girlP97: 6.6, dailyGain: '25–30 g/day', milestone: 'Social smile emerges; head lifted 45° prone; vocal cooing active.' },
  { month: 4, label: '4m', boyP3: 5.6, boyP50: 7.0, boyP97: 8.7, girlP3: 5.0, girlP50: 6.4, girlP97: 8.2, dailyGain: '20–25 g/day', milestone: 'Doubling of birth weight achieved; rolls tummy to back; grasps objects.' },
  { month: 6, label: '6m', boyP3: 6.4, boyP50: 7.9, boyP97: 9.8, girlP3: 5.7, girlP50: 7.3, girlP97: 9.3, dailyGain: '15–20 g/day', milestone: 'Sits with minimal support; responds to name; introduction of solid foods.' },
  { month: 9, label: '9m', boyP3: 7.1, boyP50: 8.9, boyP97: 11.0, girlP3: 6.5, girlP50: 8.2, girlP97: 10.5, dailyGain: '12–15 g/day', milestone: 'Pincer grasp development; crawls on all fours; pulls up to stand.' },
  { month: 12, label: '12m', boyP3: 7.7, boyP50: 9.6, boyP97: 12.0, girlP3: 7.0, girlP50: 8.9, girlP97: 11.5, dailyGain: '10–12 g/day', milestone: 'First birthday: tripling of birth weight; first steps and first words.' },
  { month: 18, label: '18m', boyP3: 8.8, boyP50: 10.9, boyP97: 13.7, girlP3: 8.1, girlP50: 10.2, girlP97: 13.2, dailyGain: '8–10 g/day', milestone: 'Runs and climbs stairs; 10–20 single words; drinking from an open cup.' },
  { month: 24, label: '24m', boyP3: 9.7, boyP50: 12.2, boyP97: 15.3, girlP3: 9.0, girlP50: 11.5, girlP97: 14.8, dailyGain: '7–8 g/day', milestone: 'Two-year milestone: quadrupling of birth weight; ~50% of adult stature.' },
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

export function WhoInfantGrowthVisualizerChart() {
  const [mounted, setMounted] = useState(false);
  const [sex, setSex] = useState<'boy' | 'girl'>('boy');
  const [activeMonth, setActiveMonth] = useState<number>(6);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = WHO_DATA.map((d) => ({
    label: d.label,
    month: d.month,
    p3: sex === 'boy' ? d.boyP3 : d.girlP3,
    p50: sex === 'boy' ? d.boyP50 : d.girlP50,
    p97: sex === 'boy' ? d.boyP97 : d.girlP97,
  }));

  const cur = WHO_DATA.find((d) => d.month === activeMonth) || WHO_DATA[4];
  const curP3 = sex === 'boy' ? cur.boyP3 : cur.girlP3;
  const curP50 = sex === 'boy' ? cur.boyP50 : cur.girlP50;
  const curP97 = sex === 'boy' ? cur.boyP97 : cur.girlP97;

  const toLbs = (kg: number) => (kg * 2.20462).toFixed(1);

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all">
      {/* Header with Sex Switcher */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">⚖️</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              WHO Child Growth Standards Percentile Tunnel
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            World Health Organization (WHO) MGRS growth curves: 3rd, 50th (median), and 97th percentiles (0–24 months)
          </p>
        </div>

        {/* Sex Toggle */}
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
            👦 Boy Growth Curve
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
            👧 Girl Growth Curve
          </button>
        </div>
      </div>

      {/* Month Pills */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Select Age Milestone:
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {WHO_DATA.map((d) => {
            const isSelected = activeMonth === d.month;
            return (
              <button
                key={d.label}
                type="button"
                onClick={() => setActiveMonth(d.month)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-all min-h-[44px] flex items-center gap-1 ${
                  isSelected
                    ? sex === 'boy'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                      : 'bg-rose-600 text-white shadow-md shadow-rose-500/20 scale-[1.02]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <span>{d.month === 0 ? 'Birth' : `${d.month} Mo`}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recharts Area Chart showing 3rd to 97th percentile band */}
      <div className="h-[250px] sm:h-[280px] w-full mb-4">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="growthTunnelGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={sex === 'boy' ? '#3b82f6' : '#f43f5e'} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={sex === 'boy' ? '#3b82f6' : '#f43f5e'} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.7} vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={false} />
              <YAxis
                tickFormatter={(v) => `${v}kg`}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={false}
                width={45}
                domain={[2, 16]}
              />
              <Tooltip
                {...tooltipStyle}
                formatter={(val, name) => [
                  `${val} kg (${toLbs(Number(val))} lbs)`,
                  name === 'p97' ? '97th Percentile (Upper)' : name === 'p50' ? '50th Percentile (Median)' : '3rd Percentile (Lower)',
                ]}
                labelFormatter={(label) => `Age Milestone: ${label}`}
              />
              {/* 97th Percentile Area Top */}
              <Area
                type="monotone"
                dataKey="p97"
                name="p97"
                stroke={sex === 'boy' ? '#1d4ed8' : '#e11d48'}
                strokeWidth={2}
                strokeDasharray="4 4"
                fill="url(#growthTunnelGrad)"
              />
              {/* 50th Percentile Solid Line */}
              <Line
                type="monotone"
                dataKey="p50"
                name="p50"
                stroke={sex === 'boy' ? '#2563eb' : '#f43f5e'}
                strokeWidth={3}
                dot={{ r: 3 }}
              />
              {/* 3rd Percentile Lower Line */}
              <Line
                type="monotone"
                dataKey="p3"
                name="p3"
                stroke={sex === 'boy' ? '#60a5fa' : '#fda4af'}
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
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
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">50th Median Weight</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{curP50} kg</span>
            <span className="text-xs text-slate-400 block font-normal">({toLbs(curP50)} lbs)</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Normal Range (3rd–97th)</span>
          <div className="mt-1">
            <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight block">{curP3} – {curP97} kg</span>
            <span className="text-[10px] text-slate-400 block">({toLbs(curP3)} – {toLbs(curP97)} lbs)</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Expected Daily Gain</span>
          <div className="mt-1">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 leading-tight block">{cur.dailyGain}</span>
            <span className="text-[10px] text-slate-400 block">normal velocity</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Biological Sex Cohort</span>
          <div className="mt-1">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 leading-tight block">{sex === 'boy' ? 'Male Infant' : 'Female Infant'}</span>
            <span className="text-[10px] text-slate-400 block">WHO MGRS dataset</span>
          </div>
        </div>
      </div>

      {/* Clinical Guidance Box */}
      <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3.5 text-xs dark:border-emerald-900/40 dark:bg-emerald-950/20">
        <div className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 mb-1">
          <span>👶</span>
          <span>{cur.month === 0 ? 'Birth' : `${cur.month}-Month`} Developmental Milestone:</span>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {cur.milestone}
        </p>
      </div>
    </div>
  );
}
