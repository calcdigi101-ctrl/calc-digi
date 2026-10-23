'use client';

import React, { useState } from 'react';

interface DiaperStage {
  stage: string;
  weightRange: string;
  durationMonths: number;
  dailyChanges: number;
  totalDiapers: number;
  storeCost: number;
  premiumCost: number;
  clothCost: number;
  clinicalMilestone: string;
}

const STAGES: DiaperStage[] = [
  {
    stage: 'Newborn (NB)',
    weightRange: 'Up to 10 lbs (< 4.5 kg)',
    durationMonths: 1.5,
    dailyChanges: 11,
    totalDiapers: 500,
    storeCost: 95,
    premiumCost: 175,
    clothCost: 45,
    clinicalMilestone: 'Umbilical notch cut-out; high change frequency protects fragile newborn epidermal skin barrier.',
  },
  {
    stage: 'Size 1',
    weightRange: '8–14 lbs (3.6–6.4 kg)',
    durationMonths: 2.5,
    dailyChanges: 9,
    totalDiapers: 675,
    storeCost: 125,
    premiumCost: 240,
    clothCost: 55,
    clinicalMilestone: 'Fastest post-natal growth spurt; elastic leg cuffs prevent liquid blowout leaks.',
  },
  {
    stage: 'Size 2',
    weightRange: '12–18 lbs (5.4–8.2 kg)',
    durationMonths: 3.0,
    dailyChanges: 8,
    totalDiapers: 720,
    storeCost: 140,
    premiumCost: 270,
    clothCost: 65,
    clinicalMilestone: 'Rolling and active leg kicking; flexible elastic waistband accommodates infant motility.',
  },
  {
    stage: 'Size 3',
    weightRange: '16–28 lbs (7.3–12.7 kg)',
    durationMonths: 7.0,
    dailyChanges: 6,
    totalDiapers: 1260,
    storeCost: 275,
    premiumCost: 520,
    clothCost: 135,
    clinicalMilestone: 'Longest infant diaper stage; crawling and solid food introduction increases absorbency demands.',
  },
  {
    stage: 'Size 4',
    weightRange: '22–37 lbs (10.0–16.8 kg)',
    durationMonths: 8.0,
    dailyChanges: 5,
    totalDiapers: 1200,
    storeCost: 295,
    premiumCost: 560,
    clothCost: 150,
    clinicalMilestone: 'Walking and active climbing; dedicated 12-hour overnight absorption core becomes essential.',
  },
  {
    stage: 'Size 5 / 6 (Training)',
    weightRange: '27+ lbs (12.2+ kg)',
    durationMonths: 8.0,
    dailyChanges: 4,
    totalDiapers: 960,
    storeCost: 265,
    premiumCost: 490,
    clothCost: 120,
    clinicalMilestone: 'Transition to pull-on training pants; readiness for independent daytime toilet mastery (~30 mo).',
  },
];

export function DiaperStageExpenseTimelineChart() {
  const [activeIdx, setActiveIdx] = useState<number>(3); // Size 3 default
  const cur = STAGES[activeIdx];

  // Cumulative costs
  let runStore = 0;
  let runPremium = 0;
  let runCloth = 0;
  STAGES.forEach((s, idx) => {
    if (idx <= activeIdx) {
      runStore += s.storeCost;
      runPremium += s.premiumCost;
      runCloth += s.clothCost;
    }
  });

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🧷</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              Diaper Size Progression &amp; Cost Curve Visualizer
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-world unit economics from newborn to potty training: Store brand vs Name brand vs Cloth systems
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
          {STAGES.map((s, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={s.stage}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-all min-h-[44px] flex items-center gap-1 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 scale-[1.02] dark:bg-emerald-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <span>{s.stage.split(' (')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cumulative Outlay Comparison Card */}
      <div className="mb-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-200 mb-2.5">
          <span>Cumulative Spend through <strong>{cur.stage}</strong>:</span>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
            Save ${(runPremium - runStore).toLocaleString()} with Store Brand
          </span>
        </div>

        {/* Brand Comparison Bars (Mobile Friendly) */}
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-[11px] mb-1 font-medium">
              <span className="text-slate-600 dark:text-slate-400">Store Brand (Costco/Target):</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-mono">${runStore}</strong>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${Math.min(100, (runStore / 2400) * 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1 font-medium">
              <span className="text-slate-600 dark:text-slate-400">Premium / Eco Brand:</span>
              <strong className="text-purple-600 dark:text-purple-400 font-mono">${runPremium}</strong>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all duration-300"
                style={{ width: `${Math.min(100, (runPremium / 2400) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 mb-4">
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Weight Range</span>
          <div className="mt-1">
            <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight block">{cur.weightRange}</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Daily Changes</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{cur.dailyChanges} changes</span>
            <span className="text-xs text-slate-400 block font-normal">per 24 hours</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Diapers in Stage</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-slate-900 dark:text-white">{cur.totalDiapers.toLocaleString()}</span>
            <span className="text-xs text-slate-400 block font-normal">approx {cur.durationMonths} months</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Stage Savings</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">-${cur.premiumCost - cur.storeCost}</span>
            <span className="text-xs text-slate-400 block font-normal">by choosing store brand</span>
          </div>
        </div>
      </div>

      {/* Clinical Guidance Card */}
      <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3.5 text-xs dark:border-emerald-900/40 dark:bg-emerald-950/20">
        <div className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 mb-1">
          <span>👶</span>
          <span>Pediatric Developmental Note ({cur.stage}):</span>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {cur.clinicalMilestone}
        </p>
      </div>
    </div>
  );
}
