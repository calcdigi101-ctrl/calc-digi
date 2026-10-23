'use client';

import React, { useState, useEffect } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface DiaperStage {
  stage: string;
  shortLabel: string;
  weightRange: string;
  durationMonths: number;
  dailyChanges: number;
  totalDiapers: number;
  cumStore: number;
  cumPremium: number;
  cumCloth: number;
  clinicalMilestone: string;
}

const DIAPER_DATA: DiaperStage[] = [
  {
    stage: 'Newborn (NB)',
    shortLabel: 'NB',
    weightRange: '< 10 lbs',
    durationMonths: 1.5,
    dailyChanges: 11,
    totalDiapers: 500,
    cumStore: 95,
    cumPremium: 175,
    cumCloth: 450,
    clinicalMilestone: 'Umbilical cord notch cut-out; high change frequency protects delicate newborn acid mantle.',
  },
  {
    stage: 'Size 1',
    shortLabel: 'Sz 1',
    weightRange: '8–14 lbs',
    durationMonths: 2.5,
    dailyChanges: 9,
    totalDiapers: 675,
    cumStore: 220,
    cumPremium: 415,
    cumCloth: 505,
    clinicalMilestone: 'Rapid infant growth spurt; elastic leg cuffs prevent liquid blowout leaks.',
  },
  {
    stage: 'Size 2',
    shortLabel: 'Sz 2',
    weightRange: '12–18 lbs',
    durationMonths: 3.0,
    dailyChanges: 8,
    totalDiapers: 720,
    cumStore: 360,
    cumPremium: 685,
    cumCloth: 570,
    clinicalMilestone: 'Rolling and active kicking; flexible contoured waistband accommodates motility.',
  },
  {
    stage: 'Size 3',
    shortLabel: 'Sz 3',
    weightRange: '16–28 lbs',
    durationMonths: 7.0,
    dailyChanges: 6,
    totalDiapers: 1260,
    cumStore: 635,
    cumPremium: 1205,
    cumCloth: 705,
    clinicalMilestone: 'Longest diaper stage; crawling and solid food introduction increases core absorbency demands.',
  },
  {
    stage: 'Size 4',
    shortLabel: 'Sz 4',
    weightRange: '22–37 lbs',
    durationMonths: 8.0,
    dailyChanges: 5,
    totalDiapers: 1200,
    cumStore: 930,
    cumPremium: 1765,
    cumCloth: 855,
    clinicalMilestone: 'Walking and climbing; dedicated 12-hour overnight absorption core prevents sleep wakings.',
  },
  {
    stage: 'Size 5 / 6 (Potty Training)',
    shortLabel: 'Sz 5/6',
    weightRange: '27+ lbs',
    durationMonths: 8.0,
    dailyChanges: 4,
    totalDiapers: 960,
    cumStore: 1195,
    cumPremium: 2255,
    cumCloth: 975,
    clinicalMilestone: 'Pull-on training pants; readiness for independent daytime toilet mastery (~30 mo).',
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

export function DiaperStageExpenseTimelineChart() {
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(3); // Size 3 default

  useEffect(() => {
    setMounted(true);
  }, []);

  const cur = DIAPER_DATA[activeIdx];

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🧷</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              Cumulative Diaper Cost Curve (Birth to 30 Months)
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-world consumer expenditure curves: Store Brand vs Premium Brand vs Reusable Cloth Systems
          </p>
        </div>
        <span className="self-start sm:self-auto rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 ring-1 ring-inset ring-emerald-600/20">
          Consumer Economics Data
        </span>
      </div>

      {/* Stage Pills */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Select Diaper Size:
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {DIAPER_DATA.map((s, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={s.shortLabel}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-all min-h-[44px] flex items-center gap-1 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 scale-[1.02] dark:bg-emerald-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <span>{s.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="h-[250px] sm:h-[280px] w-full mb-4">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DIAPER_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="storeBrandGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.7} vertical={false} />
              <XAxis dataKey="shortLabel" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={false} />
              <YAxis
                tickFormatter={(v) => `$${v}`}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={false}
                width={50}
                domain={[0, 2400]}
              />
              <Tooltip
                {...tooltipStyle}
                formatter={(val, name) => [`$${val}`, name === 'cumPremium' ? 'Premium Brand' : name === 'cumStore' ? 'Store Brand' : 'Cloth System']}
                labelFormatter={(label) => `Stage: ${label}`}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
              <Area
                type="monotone"
                dataKey="cumPremium"
                name="Premium Brand"
                stroke="#9333ea"
                strokeWidth={2.5}
                fillOpacity={0.1}
                fill="#9333ea"
              />
              <Area
                type="monotone"
                dataKey="cumStore"
                name="Store Brand"
                stroke="#059669"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#storeBrandGrad)"
              />
              <Line
                type="monotone"
                dataKey="cumCloth"
                name="Cloth System"
                stroke="#3b82f6"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{ r: 3 }}
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
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Cumulative Store Cost</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">${cur.cumStore}</span>
            <span className="text-xs text-slate-400 block font-normal">through {cur.stage.split(' ')[0]}</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Premium Outlay</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-purple-600 dark:text-purple-400">${cur.cumPremium}</span>
            <span className="text-xs text-slate-400 block font-normal">through {cur.stage.split(' ')[0]}</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Total Diapers in Stage</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight block">{cur.totalDiapers.toLocaleString()} units</span>
            <span className="text-xs text-slate-400 block font-normal">{cur.dailyChanges} changes/day</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Net Stage Savings</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">Save ${cur.cumPremium - cur.cumStore}</span>
            <span className="text-xs text-slate-400 block font-normal">using store brand</span>
          </div>
        </div>
      </div>

      {/* Clinical Guidance Box */}
      <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3.5 text-xs dark:border-emerald-900/40 dark:bg-emerald-950/20">
        <div className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 mb-1">
          <span>👶</span>
          <span>Pediatric Stage Milestone ({cur.stage}):</span>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {cur.clinicalMilestone}
        </p>
      </div>
    </div>
  );
}
