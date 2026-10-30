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
  const plotH = svgHeight - padTop - padBottom;

  const barH = 26;
  const barGap = 16;

  return (
    <div className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden p-5 shadow-sm space-y-4">
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
            <span className="w-3 h-3 rounded-sm bg-sky-500 inline-block" /> Carbs
          </span>
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <span className="w-3 h-3 rounded-sm bg-indigo-500 inline-block" /> Protein
          </span>
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block" /> Fats
          </span>
        </div>
      </div>

      {/* SVG Canvas with Interactive Stacked Bars */}
      <div className="relative select-none">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto overflow-visible">
          {DIET_ARCHETYPES.map((arch, idx) => {
            const y = padTop + idx * (barH + barGap);
            const isSelected = activeIdx === idx;

            const carbW = (arch.carbPct / 100) * (plotW - 140);
            const proteinW = (arch.proteinPct / 100) * (plotW - 140);
            const fatW = (arch.fatPct / 100) * (plotW - 140);

            const startX = padLeft + 140;

            return (
              <g
                key={arch.id}
                onClick={() => setActiveIdx(idx)}
                onTouchStart={() => setActiveIdx(idx)}
                className="cursor-pointer transition-opacity hover:opacity-90"
              >
                {/* Archetype Label */}
                <text
                  x={padLeft}
                  y={y + barH * 0.65}
                  className={`text-[11px] font-semibold transition-colors ${
                    isSelected ? 'fill-violet-600 dark:fill-violet-400' : 'fill-slate-700 dark:fill-slate-300'
                  }`}
                >
                  {arch.name}
                </text>

                {/* Background Selection Highlight */}
                {isSelected && (
                  <rect
                    x={padLeft - 6}
                    y={y - 4}
                    width={plotW + 12}
                    height={barH + 8}
                    rx="8"
                    fill="currentColor"
                    className="text-violet-500/10"
                  />
                )}

                {/* Stacked Bars: Carbs, Protein, Fat */}
                {/* Carbs */}
                <rect
                  x={startX}
                  y={y}
                  width={carbW}
                  height={barH}
                  rx={arch.proteinPct === 0 && arch.fatPct === 0 ? 6 : 0}
                  className="fill-sky-500"
                />
                {carbW > 25 && (
                  <text x={startX + carbW / 2} y={y + barH * 0.65} textAnchor="middle" className="text-[10px] font-bold fill-white">
                    {arch.carbPct}%
                  </text>
                )}

                {/* Protein */}
                <rect
                  x={startX + carbW}
                  y={y}
                  width={proteinW}
                  height={barH}
                  className="fill-indigo-500"
                />
                {proteinW > 25 && (
                  <text x={startX + carbW + proteinW / 2} y={y + barH * 0.65} textAnchor="middle" className="text-[10px] font-bold fill-white">
                    {arch.proteinPct}%
                  </text>
                )}

                {/* Fats */}
                <rect
                  x={startX + carbW + proteinW}
                  y={y}
                  width={fatW}
                  height={barH}
                  rx={6}
                  className="fill-amber-500"
                />
                {fatW > 25 && (
                  <text x={startX + carbW + proteinW + fatW / 2} y={y + barH * 0.65} textAnchor="middle" className="text-[10px] font-bold fill-white">
                    {arch.fatPct}%
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Clean wrap legend */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-sky-500" /> Carbohydrates (4 kcal/g)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-indigo-500" /> Dietary Protein (4 kcal/g)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-amber-500" /> Essential Lipids / Fats (9 kcal/g)
        </span>
      </div>

      <div className="bg-slate-50/80 dark:bg-slate-800/50 rounded-xl p-3.5 sm:p-4 border border-slate-200/80 dark:border-slate-800 text-xs w-full max-w-full overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
          <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
            {cur.name} ({cur.carbPct}% Carb · {cur.proteinPct}% Protein · {cur.fatPct}% Fat)
          </span>
          <span className="text-[11px] font-mono text-violet-600 dark:text-violet-400">
            {cur.primarySubstrate}
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
          {cur.idealFor}
        </p>
      </div>
    </div>
  );
}
