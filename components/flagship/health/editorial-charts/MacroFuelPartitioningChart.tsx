'use client';

import React, { useState } from 'react';

interface DietArchetype {
  id: string;
  name: string;
  carbPct: number;
  proteinPct: number;
  fatPct: number;
  primarySubstrate: string;
  pathway: string;
  idealFor: string;
  hormonalProfile: string;
}

const DIET_ARCHETYPES: DietArchetype[] = [
  {
    id: 'endurance',
    name: 'Endurance & Glycogen',
    carbPct: 60,
    proteinPct: 20,
    fatPct: 20,
    primarySubstrate: 'Intramuscular Glycogen & Blood Glucose',
    pathway: 'Aerobic Glycolysis & TCA Cycle',
    idealFor: 'Marathoners, triathletes, cyclists (>90 min high-intensity sessions).',
    hormonalProfile: 'Elevated postprandial insulin; maximally suppresses hepatic gluconeogenesis; optimizes muscle glycogen supercompensation.',
  },
  {
    id: 'balanced',
    name: 'Balanced / Zone',
    carbPct: 45,
    proteinPct: 25,
    fatPct: 30,
    primarySubstrate: 'Dual Fuel (Carbohydrate & Fatty Acids)',
    pathway: 'Substrate Flexibility / Mixed Oxidation',
    idealFor: 'General wellness, recreational fitness, hybrid athletes.',
    hormonalProfile: 'Stable euglycemia; moderate insulin spikes balanced by dietary lipids and fiber; highly sustainable long-term adherence.',
  },
  {
    id: 'hypertrophy',
    name: 'Bodybuilding / Hypertrophy',
    carbPct: 40,
    proteinPct: 35,
    fatPct: 25,
    primarySubstrate: 'Glucose + High Leucine Amino Acid Pool',
    pathway: 'Glycolysis + mTORC1 Protein Translation',
    idealFor: 'Natural bodybuilders, powerlifters, strength athletes in muscle accretion or cutting.',
    hormonalProfile: 'Maximizes muscular mTORC1 phosphorylation via repeated 3g+ leucine pulses every 3–4 hours while maintaining muscle fullness.',
  },
  {
    id: 'lowcarb',
    name: 'Low-Carb / Recomposition',
    carbPct: 20,
    proteinPct: 40,
    fatPct: 40,
    primarySubstrate: 'Free Fatty Acids & Gluconeogenic Amino Acids',
    pathway: 'Beta-Oxidation & Elevated Satiety Signaling',
    idealFor: 'Insulin-resistant individuals, sedentary fat loss, physique contest peaking.',
    hormonalProfile: 'Blunts diurnal insulin excursions; promotes high satiety via peptide YY (PYY) and cholecystokinin (CCK) gut peptide secretion.',
  },
  {
    id: 'keto',
    name: 'Ketogenic / High-Fat',
    carbPct: 5,
    proteinPct: 25,
    fatPct: 70,
    primarySubstrate: 'Ketone Bodies (Beta-Hydroxybutyrate & Acetoacetate)',
    pathway: 'Hepatic Ketogenesis & Mitochondrial Beta-Oxidation',
    idealFor: 'Epilepsy management, deep therapeutic metabolic state, ultra-endurance steady-state.',
    hormonalProfile: 'Near-complete suppression of insulin; upregulates hepatic CPT-1 enzyme allowing uninhibited mitochondrial fatty acid uptake.',
  },
];

export function MacroFuelPartitioningChart() {
  const [activeIdx, setActiveIdx] = useState<number>(2); // Hypertrophy default
  const cur = DIET_ARCHETYPES[activeIdx];

  const svgWidth = 640;
  const svgHeight = 280;
  const padLeft = 40;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;

  const barH = 26;
  const barGap = 16;

  return (
    <div className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden p-3.5 sm:p-5 shadow-sm space-y-4">
      {/* Header and Archetype Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              Macronutrient Substrate Partitioning &amp; Fuel Energetics
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Biochemical Energy Distribution across 5 Validated Dietary Archetypes
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <span className="w-2.5 h-2.5 rounded bg-amber-500" />
            Carbs (4 kcal/g)
          </span>
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
            Protein (4 kcal/g)
          </span>
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <span className="w-2.5 h-2.5 rounded bg-rose-500" />
            Fat (9 kcal/g)
          </span>
        </div>
      </div>

      {/* Archetype Quick Selector Pills */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        {DIET_ARCHETYPES.map((arch, idx) => (
          <button
            key={arch.id}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeIdx === idx
                ? 'bg-violet-600 text-white shadow-sm ring-2 ring-violet-400/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {arch.name}
          </button>
        ))}
      </div>

      {/* Stacked Macro SVG Canvas */}
      <div className="relative select-none w-full max-w-full overflow-hidden">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible max-w-full">
          {/* Axis grid */}
          {[0, 25, 50, 75, 100].map((pct) => {
            const x = padLeft + (pct / 100) * plotW;
            return (
              <g key={pct}>
                <line x1={x} y1={padTop} x2={x} y2={svgHeight - padBottom} stroke="currentColor" className="text-slate-100 dark:text-slate-800" />
                <text x={x} y={svgHeight - 14} textAnchor="middle" className="text-[10px] fill-slate-400 dark:fill-slate-500">
                  {pct}%
                </text>
              </g>
            );
          })}

          {/* 5 Stacked Macro Bars */}
          {DIET_ARCHETYPES.map((arch, i) => {
            const y = padTop + i * (barH + barGap);
            const carbW = (arch.carbPct / 100) * plotW;
            const proteinW = (arch.proteinPct / 100) * plotW;
            const fatW = (arch.fatPct / 100) * plotW;
            const isSelected = activeIdx === i;

            return (
              <g
                key={arch.id}
                onClick={() => setActiveIdx(i)}
                className="cursor-pointer transition-opacity hover:opacity-90"
              >
                {/* Active selection background glow */}
                {isSelected ? (
                  <rect
                    x={padLeft - 6}
                    y={y - 4}
                    width={plotW + 12}
                    height={barH + 8}
                    rx="6"
                    fill="currentColor"
                    className="text-violet-500/10 dark:text-violet-400/15"
                  />
                ) : null}

                {/* Bar segments */}
                <rect x={padLeft} y={y} width={carbW} height={barH} fill="#f59e0b" rx="3" />
                <rect x={padLeft + carbW} y={y} width={proteinW} height={barH} fill="#10b981" rx="0" />
                <rect x={padLeft + carbW + proteinW} y={y} width={fatW} height={barH} fill="#ef4444" rx="3" />

                {/* Percentage Labels Inside Bar Segments */}
                {arch.carbPct >= 10 ? (
                  <text x={padLeft + carbW / 2} y={y + 16} textAnchor="middle" className="text-[10px] font-bold fill-white">
                    {arch.carbPct}%
                  </text>
                ) : null}
                {arch.proteinPct >= 10 ? (
                  <text x={padLeft + carbW + proteinW / 2} y={y + 16} textAnchor="middle" className="text-[10px] font-bold fill-white">
                    {arch.proteinPct}%
                  </text>
                ) : null}
                {arch.fatPct >= 10 ? (
                  <text x={padLeft + carbW + proteinW + fatW / 2} y={y + 16} textAnchor="middle" className="text-[10px] font-bold fill-white">
                    {arch.fatPct}%
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Archetype Metabolic Profile Card */}
      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3.5 sm:p-4 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs w-full max-w-full">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              {cur.name} Metabolic Pathway:
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-violet-100/90 text-violet-800 dark:bg-violet-950 dark:text-violet-300">
              {cur.pathway}
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed break-words">
            {cur.hormonalProfile}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 sm:gap-3">
          <div className="px-3 py-1.5 sm:py-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 block">Primary Substrate</span>
            <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
              {cur.primarySubstrate.split(' ')[0]}
            </span>
          </div>
          <div className="px-3 py-1.5 sm:py-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-400 block">Ratio (C/P/F)</span>
            <span className="font-bold text-violet-600 dark:text-violet-400 text-xs sm:text-sm">
              {cur.carbPct}/{cur.proteinPct}/{cur.fatPct}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
