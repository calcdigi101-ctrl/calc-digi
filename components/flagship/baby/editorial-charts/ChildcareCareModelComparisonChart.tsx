'use client';

import React, { useState, useEffect } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface CareModel {
  model: string;
  shortLabel: string;
  monthlyGross: number;
  annualGross: number;
  fsaTaxSavings: number;
  netAnnualOutOfPocket: number;
  ratio: string;
  keyAdvantage: string;
  budgetTradeoff: string;
}

const CARE_DATA: CareModel[] = [
  {
    model: 'Daycare Center (Infant Room)',
    shortLabel: 'Daycare (Infant)',
    monthlyGross: 1450,
    annualGross: 17400,
    fsaTaxSavings: 1650,
    netAnnualOutOfPocket: 15750,
    ratio: '1:3 or 1:4',
    keyAdvantage: 'Fully licensed facilities, structured early curriculum, backup teacher coverage.',
    budgetTradeoff: 'Highest infant pricing due to strict ratios; sickness exclusion rules.',
  },
  {
    model: 'Daycare Center (Toddler / Pre-K)',
    shortLabel: 'Daycare (Toddler)',
    monthlyGross: 1150,
    annualGross: 13800,
    fsaTaxSavings: 1650,
    netAnnualOutOfPocket: 12150,
    ratio: '1:6 to 1:10',
    keyAdvantage: '20% lower monthly tuition; peer socialization and toilet training support.',
    budgetTradeoff: 'Larger classroom group sizes; fixed drop-off and pickup schedules.',
  },
  {
    model: 'Licensed Family Child Care (In-Home)',
    shortLabel: 'In-Home Daycare',
    monthlyGross: 920,
    annualGross: 11040,
    fsaTaxSavings: 1650,
    netAnnualOutOfPocket: 9390,
    ratio: '1:4 to 1:6',
    keyAdvantage: 'Homelike setting, lower monthly tuition, multi-age peer modeling, strong bond.',
    budgetTradeoff: 'Center closes when sole home provider takes personal vacation or illness.',
  },
  {
    model: 'Nanny Share (2 Families)',
    shortLabel: 'Nanny Share',
    monthlyGross: 1850,
    annualGross: 22200,
    fsaTaxSavings: 1650,
    netAnnualOutOfPocket: 20550,
    ratio: '1:2 infants',
    keyAdvantage: 'In-home comfort, custom feeding/nap pacing, peer companionship at 35% savings.',
    budgetTradeoff: 'Requires schedule and sick-day alignment between both host families.',
  },
  {
    model: 'Private Dedicated Nanny (Solo)',
    shortLabel: 'Solo Nanny',
    monthlyGross: 3200,
    annualGross: 38400,
    fsaTaxSavings: 1650,
    netAnnualOutOfPocket: 36750,
    ratio: '1:1 dedicated',
    keyAdvantage: 'Ultimate schedule autonomy, 100% bespoke care in your own home, laundry help.',
    budgetTradeoff: 'Highest annual expense; household employer tax compliance (Schedule H).',
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

export function ChildcareCareModelComparisonChart() {
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(0); // Infant Daycare default

  useEffect(() => {
    setMounted(true);
  }, []);

  const cur = CARE_DATA[activeIdx];

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🧸</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              Childcare Modality &amp; FSA Tax Relief Spectrum
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Comparative national benchmarks: Gross Annual Tuition vs Net Out-of-Pocket with pre-tax Dependent Care FSA ($5,000 cap)
          </p>
        </div>
        <span className="self-start sm:self-auto rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 ring-1 ring-inset ring-blue-600/20">
          IRC § 129 FSA Verified
        </span>
      </div>

      {/* Model Pills */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Select Childcare Modality:
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {CARE_DATA.map((m, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={m.shortLabel}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-all min-h-[44px] flex items-center gap-1 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02] dark:bg-blue-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <span>{m.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recharts Bar Chart */}
      <div className="h-[250px] sm:h-[280px] w-full mb-4">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CARE_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.7} vertical={false} />
              <XAxis dataKey="shortLabel" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={false} />
              <YAxis
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={false}
                width={45}
                domain={[0, 42000]}
              />
              <Tooltip
                {...tooltipStyle}
                formatter={(val, name) => [`$${Number(val).toLocaleString()}/year`, name === 'annualGross' ? 'Gross Annual Tuition' : 'Net Out-of-Pocket (with FSA)']}
                labelFormatter={(label) => `Model: ${label}`}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
              <Bar dataKey="annualGross" name="Gross Tuition" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              <Bar dataKey="netAnnualOutOfPocket" name="Net Out-of-Pocket" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
        )}
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 mb-4">
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Monthly Tuition</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">${cur.monthlyGross.toLocaleString()}</span>
            <span className="text-xs text-slate-400 block font-normal">per month</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Staff-to-Child Ratio</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-purple-600 dark:text-purple-400 leading-tight">{cur.ratio}</span>
            <span className="text-xs text-slate-400 block font-normal">licensed ratio</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Net Annual Cost</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 leading-tight">${cur.netAnnualOutOfPocket.toLocaleString()}</span>
            <span className="text-xs text-slate-400 block font-normal">after FSA tax offset</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">FSA Tax Relief</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 leading-tight">-${cur.fsaTaxSavings.toLocaleString()}</span>
            <span className="text-xs text-slate-400 block font-normal">IRC Section 129</span>
          </div>
        </div>
      </div>

      {/* Advantage & Tradeoff Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 dark:border-emerald-900/40 dark:bg-emerald-950/20">
          <strong className="text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 mb-1">
            <span>✅</span> Operational Strength:
          </strong>
          <p className="text-slate-600 dark:text-slate-300">{cur.keyAdvantage}</p>
        </div>
        <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-3 dark:border-amber-900/40 dark:bg-amber-950/20">
          <strong className="text-amber-800 dark:text-amber-300 flex items-center gap-1.5 mb-1">
            <span>⚠️</span> Practical Tradeoff:
          </strong>
          <p className="text-slate-600 dark:text-slate-300">{cur.budgetTradeoff}</p>
        </div>
      </div>
    </div>
  );
}
