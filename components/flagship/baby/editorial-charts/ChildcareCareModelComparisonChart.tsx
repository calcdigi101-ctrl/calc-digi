'use client';

import React, { useState } from 'react';

interface CareModel {
  model: string;
  monthlyAverage: number;
  annualGross: number;
  fsaTaxSavings: number;
  netAnnualOutOfPocket: number;
  ratio: string;
  pros: string;
  cons: string;
}

const CARE_MODELS: CareModel[] = [
  {
    model: 'Daycare Center (Infant)',
    monthlyAverage: 1450,
    annualGross: 17400,
    fsaTaxSavings: 1650,
    netAnnualOutOfPocket: 15750,
    ratio: '1 : 3 or 1 : 4 (strict state mandate)',
    pros: 'Licensed facilities, structured early curricula, peer socialization, reliable hours with back-up staff.',
    cons: 'Higher initial infant rates, strict exclusion policies for minor toddler illnesses.',
  },
  {
    model: 'Daycare Center (Toddler/Pre-K)',
    monthlyAverage: 1150,
    annualGross: 13800,
    fsaTaxSavings: 1650,
    netAnnualOutOfPocket: 12150,
    ratio: '1 : 6 to 1 : 10',
    pros: 'Reduced monthly expense as ratios expand; toilet training support and pre-kindergarten phonics.',
    cons: 'Large group sizes, potential noise fatigue, fixed pickup schedules.',
  },
  {
    model: 'Licensed Family Child Care (In-Home)',
    monthlyAverage: 920,
    annualGross: 11040,
    fsaTaxSavings: 1650,
    netAnnualOutOfPocket: 9390,
    ratio: '1 : 4 to 1 : 6 mixed-age',
    pros: 'Homelike environment, multi-age peer siblings, lower overall pricing, consistent caregiver bonding.',
    cons: 'Closure when the single home provider is sick or takes annual vacation.',
  },
  {
    model: 'Nanny Share (2 Families)',
    monthlyAverage: 1850,
    annualGross: 22200,
    fsaTaxSavings: 1650,
    netAnnualOutOfPocket: 20550,
    ratio: '1 : 2 infants',
    pros: 'In-home flexibility, customized infant feeding/nap pacing, peer companionship at 30% discount vs solo nanny.',
    cons: 'Requires co-parent host schedule alignment and shared payroll administration.',
  },
  {
    model: 'Private Dedicated Nanny (Solo)',
    monthlyAverage: 3200,
    annualGross: 38400,
    fsaTaxSavings: 1650,
    netAnnualOutOfPocket: 36750,
    ratio: '1 : 1 dedicated',
    pros: 'Ultimate parental schedule autonomy, 100% personalized attention, household support with infant laundry.',
    cons: 'Household employer legal tax compliance (Schedule H), worker comp, highest annual outlay.',
  },
];

export function ChildcareCareModelComparisonChart() {
  const [activeIdx, setActiveIdx] = useState<number>(0); // Infant center default
  const cur = CARE_MODELS[activeIdx];

  const svgWidth = 640;
  const svgHeight = 250;
  const padLeft = 140;
  const padRight = 40;
  const padTop = 25;
  const padBottom = 25;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const maxVal = 42000;
  const rowHeight = plotH / CARE_MODELS.length;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>🧸</span> Childcare Modality Spectrum: Annual Gross vs Net Out-of-Pocket
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Comparative national benchmarks across daycare centers, in-home programs, and private care with $5,000 FSA tax offset
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium">
          <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-500" />
            Net Out-of-Pocket
          </span>
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
            FSA Tax Shield ($1,650)
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {CARE_MODELS.map((m, idx) => (
          <button
            key={m.model}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
              activeIdx === idx
                ? 'bg-blue-600 text-white shadow-sm dark:bg-blue-500'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {m.model.split(' (')[0]}
          </button>
        ))}
      </div>

      {/* Horizontal Bar SVG Chart */}
      <div className="relative overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full min-w-[540px] select-none text-xs"
        >
          {CARE_MODELS.map((m, i) => {
            const y = padTop + i * rowHeight;
            const isSelected = activeIdx === i;
            const netBarW = (m.netAnnualOutOfPocket / maxVal) * plotW;
            const fsaBarW = (m.fsaTaxSavings / maxVal) * plotW;

            return (
              <g
                key={m.model}
                onClick={() => setActiveIdx(i)}
                className="cursor-pointer transition-opacity hover:opacity-90"
              >
                {/* Row background highlight */}
                {isSelected && (
                  <rect
                    x={0}
                    y={y - 2}
                    width={svgWidth}
                    height={rowHeight}
                    fill="currentColor"
                    className="text-blue-50/70 dark:text-blue-950/30"
                    rx={6}
                  />
                )}

                {/* Model Label */}
                <text
                  x={padLeft - 10}
                  y={y + rowHeight / 2 + 3}
                  textAnchor="end"
                  className={`text-[11px] ${
                    isSelected
                      ? 'fill-blue-600 font-bold dark:fill-blue-400'
                      : 'fill-slate-600 dark:fill-slate-300'
                  }`}
                >
                  {m.model.length > 20 ? m.model.slice(0, 19) + '…' : m.model}
                </text>

                {/* Net Out of pocket bar */}
                <rect
                  x={padLeft}
                  y={y + 6}
                  width={netBarW}
                  height={rowHeight - 12}
                  fill={isSelected ? '#2563eb' : '#3b82f6'}
                  rx={4}
                />

                {/* FSA Savings Bar Stack */}
                <rect
                  x={padLeft + netBarW}
                  y={y + 6}
                  width={fsaBarW}
                  height={rowHeight - 12}
                  fill="#10b981"
                  rx={4}
                />

                {/* Total Annual Value text */}
                <text
                  x={padLeft + netBarW + fsaBarW + 6}
                  y={y + rowHeight / 2 + 3}
                  className="fill-slate-700 font-mono text-[10px] font-semibold dark:fill-slate-300"
                >
                  ${(m.annualGross / 1000).toFixed(1)}k
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Model Card */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-xl border border-blue-100 bg-blue-50/50 p-3.5 text-xs dark:border-blue-900/50 dark:bg-blue-950/20">
        <div>
          <span className="block text-slate-500 dark:text-slate-400">Monthly Expense:</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            ${cur.monthlyAverage.toLocaleString()} / mo
          </span>
        </div>
        <div>
          <span className="block text-slate-500 dark:text-slate-400">Net Annual Cost (FSA Offset):</span>
          <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
            ${cur.netAnnualOutOfPocket.toLocaleString()} / yr
          </span>
        </div>
        <div>
          <span className="block text-slate-500 dark:text-slate-400">Caregiver-to-Child Ratio:</span>
          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
            {cur.ratio}
          </span>
        </div>
        <div>
          <span className="block text-slate-500 dark:text-slate-400">FSA Tax Relief Saved:</span>
          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
            -${cur.fsaTaxSavings.toLocaleString()} (IRC § 129)
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <p className="rounded-lg bg-slate-50 p-2.5 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
          <strong className="text-emerald-700 dark:text-emerald-400">Key Advantage:</strong> {cur.pros}
        </p>
        <p className="rounded-lg bg-slate-50 p-2.5 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
          <strong className="text-amber-700 dark:text-amber-400">Budget Tradeoff:</strong> {cur.cons}
        </p>
      </div>
    </div>
  );
}
