'use client';

import React, { useState } from 'react';

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

const CARE_MODELS: CareModel[] = [
  {
    model: 'Daycare Center (Infant Room)',
    shortLabel: 'Daycare (Infant)',
    monthlyGross: 1450,
    annualGross: 17400,
    fsaTaxSavings: 1650,
    netAnnualOutOfPocket: 15750,
    ratio: '1:3 or 1:4 (strict state ratio)',
    keyAdvantage: 'Fully licensed facilities, structured early motor/sensory curriculum, backup teacher coverage.',
    budgetTradeoff: 'Highest infant pricing due to mandated staffing; strict exclusion rules for mild illnesses.',
  },
  {
    model: 'Daycare Center (Toddler / Pre-K)',
    shortLabel: 'Daycare (Toddler)',
    monthlyGross: 1150,
    annualGross: 13800,
    fsaTaxSavings: 1650,
    netAnnualOutOfPocket: 12150,
    ratio: '1:6 to 1:10 (expanded ratio)',
    keyAdvantage: '20% lower monthly tuition; peer socialization, language explosion, and toilet training support.',
    budgetTradeoff: 'Larger classroom group sizes; fixed morning drop-off and afternoon pickup schedules.',
  },
  {
    model: 'Licensed Family Child Care (In-Home)',
    shortLabel: 'In-Home Daycare',
    monthlyGross: 920,
    annualGross: 11040,
    fsaTaxSavings: 1650,
    netAnnualOutOfPocket: 9390,
    ratio: '1:4 to 1:6 (mixed age)',
    keyAdvantage: 'Homelike environment, consistent single-caregiver attachment, multi-age sibling companionship.',
    budgetTradeoff: 'Center closes when the sole provider takes annual vacation or experiences personal illness.',
  },
  {
    model: 'Nanny Share (Shared with 2nd Family)',
    shortLabel: 'Nanny Share',
    monthlyGross: 1850,
    annualGross: 22200,
    fsaTaxSavings: 1650,
    netAnnualOutOfPocket: 20550,
    ratio: '1:2 (infants)',
    keyAdvantage: 'In-home comfort, custom feeding/nap pacing, peer companionship at 35% savings vs solo nanny.',
    budgetTradeoff: 'Requires schedule and illness philosophy coordination between both host families.',
  },
  {
    model: 'Private Dedicated Nanny (Solo)',
    shortLabel: 'Solo Nanny',
    monthlyGross: 3200,
    annualGross: 38400,
    fsaTaxSavings: 1650,
    netAnnualOutOfPocket: 36750,
    ratio: '1:1 (dedicated)',
    keyAdvantage: 'Ultimate schedule autonomy, 100% bespoke care in your own home, infant laundry assistance.',
    budgetTradeoff: 'Highest annual expense; household employer tax compliance (Schedule H) and workers comp.',
  },
];

export function ChildcareCareModelComparisonChart() {
  const [activeIdx, setActiveIdx] = useState<number>(0); // Infant Daycare default
  const cur = CARE_MODELS[activeIdx];

  const maxVal = 40000;
  const netPct = Math.round((cur.netAnnualOutOfPocket / maxVal) * 100);
  const fsaPct = Math.round((cur.fsaTaxSavings / maxVal) * 100);

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🧸</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              Childcare Modality &amp; FSA Tax Shield Comparison
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            National average gross tuition vs net out-of-pocket with pre-tax Dependent Care FSA ($5,000 cap)
          </p>
        </div>
        <span className="self-start sm:self-auto rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 ring-1 ring-inset ring-blue-600/20">
          IRC § 129 FSA Verified
        </span>
      </div>

      {/* Model Pills */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Select Childcare Model:
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {CARE_MODELS.map((m, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={m.model}
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

      {/* Visual Annual Outlay vs Tax Shield Bar */}
      <div className="mb-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-200 mb-2">
          <span>Gross Annual Outlay: <strong>${cur.annualGross.toLocaleString()} / year</strong></span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">Save ${cur.fsaTaxSavings.toLocaleString()} in taxes</span>
        </div>

        {/* Stacked visual bar */}
        <div className="h-3.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 flex">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${netPct}%` }}
            title={`Net Out of Pocket: $${cur.netAnnualOutOfPocket}`}
          />
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${fsaPct}%` }}
            title={`FSA Tax Shield: $${cur.fsaTaxSavings}`}
          />
        </div>

        {/* Bar Legend */}
        <div className="mt-2.5 flex items-center justify-between text-xs font-medium">
          <span className="flex items-center gap-1.5 text-blue-700 dark:text-blue-300">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-600" />
            Net Out-of-Pocket: ${cur.netAnnualOutOfPocket.toLocaleString()}
          </span>
          <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            Tax Relief: -${cur.fsaTaxSavings.toLocaleString()}
          </span>
        </div>
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
            <span className="text-sm font-bold text-purple-600 dark:text-purple-400 leading-tight">{cur.ratio.split(' (')[0]}</span>
            <span className="text-xs text-slate-400 block font-normal">state licensed ratio</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Net Annual Expense</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 leading-tight">${cur.netAnnualOutOfPocket.toLocaleString()}</span>
            <span className="text-xs text-slate-400 block font-normal">after FSA tax offset</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">FSA Tax Shield</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 leading-tight">-${cur.fsaTaxSavings.toLocaleString()}</span>
            <span className="text-xs text-slate-400 block font-normal">IRC Section 129</span>
          </div>
        </div>
      </div>

      {/* Advantage and Tradeoff Cards */}
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
