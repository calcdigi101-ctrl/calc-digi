'use client';

import React, { useState } from 'react';

interface GrowthPhase {
  stage: string;
  ageSpan: string;
  velocityCmYr: number;
  velocityInYr: number;
  hormones: string;
  plateStatus: string;
  clinicalNote: string;
}

const PHASES: GrowthPhase[] = [
  {
    stage: 'Infancy (Rapid Phase)',
    ageSpan: 'Birth to 12 months',
    velocityCmYr: 25,
    velocityInYr: 9.8,
    hormones: 'Nutrition, Thyroid, Insulin',
    plateStatus: 'Wide cartilaginous physis, rapid matrix synthesis',
    clinicalNote: 'Fastest post-natal linear growth velocity of lifetime; infant gains ~50% in standing length.',
  },
  {
    stage: 'Toddlerhood',
    ageSpan: '1 to 3 years old',
    velocityCmYr: 12,
    velocityInYr: 4.7,
    hormones: 'Growth Hormone (GH) & Thyroid',
    plateStatus: 'Transition to genetic growth channel',
    clinicalNote: 'Growth decelerates toward childhood baseline; child shifts toward parental genetic percentile channel.',
  },
  {
    stage: 'Mid-Childhood Steady',
    ageSpan: '4 to 9 years old',
    velocityCmYr: 6,
    velocityInYr: 2.4,
    hormones: 'Pulsatile GH & IGF-1 Axis',
    plateStatus: 'Linear chondrocyte proliferation',
    clinicalNote: 'Predictable steady linear growth of ~2 inches per year; deviation indicates nutritional or endocrine issues.',
  },
  {
    stage: 'Pubertal Spurt (Peak Velocity)',
    ageSpan: 'Girls: 10–13 | Boys: 12–15',
    velocityCmYr: 9.5,
    velocityInYr: 3.7,
    hormones: 'Estrogen, Testosterone & GH Synergy',
    plateStatus: 'Maximum chondrocyte hypertrophy',
    clinicalNote: 'Peak Height Velocity (PHV); girls gain ~8–9 cm/yr prior to menarche; boys gain ~9–10 cm/yr over longer duration.',
  },
  {
    stage: 'Epiphyseal Fusion (Final Stature)',
    ageSpan: 'Girls: 14–16 | Boys: 16–19',
    velocityCmYr: 0,
    velocityInYr: 0,
    hormones: 'High Estrogen in both sexes',
    plateStatus: 'Complete ossification & plate closure',
    clinicalNote: 'Chondrocytes exhausted; epiphyseal cartilage completely calcifies into solid bone; adult stature permanently locked.',
  },
];

export function ChildHeightGrowthPlateVisualizer() {
  const [activeIdx, setActiveIdx] = useState<number>(3); // Pubertal Spurt default
  const cur = PHASES[activeIdx];

  const maxVelocity = 25;
  const velocityPct = Math.round((cur.velocityCmYr / maxVelocity) * 100);

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📏</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              Linear Growth Velocity &amp; Epiphyseal Plate Timeline
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pediatric endocrinology benchmarks: Annual growth velocity (cm/year) and growth plate maturation
          </p>
        </div>
        <span className="self-start sm:self-auto rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 ring-1 ring-inset ring-emerald-600/20">
          Tanner Growth Standards
        </span>
      </div>

      {/* Stage Pills */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Select Childhood Stage:
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {PHASES.map((p, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={p.stage}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-all min-h-[44px] flex items-center gap-1 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02] dark:bg-blue-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <span>{p.stage.split(' (')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Annual Linear Velocity Meter */}
      <div className="mb-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-200 mb-2">
          <span>Annual Height Velocity: <strong>{cur.stage}</strong></span>
          <span className="font-bold text-blue-600 dark:text-blue-400">{cur.velocityCmYr} cm / year ({cur.velocityInYr} in/yr)</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-300"
            style={{ width: `${velocityPct}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono">
          <span>0 cm/yr (Adult)</span>
          <span>6 cm/yr (Steady Childhood)</span>
          <span>10 cm/yr (Pubertal Peak)</span>
          <span>25 cm/yr (Infant Peak)</span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 mb-4">
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Typical Age Span</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{cur.ageSpan}</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Primary Hormones</span>
          <div className="mt-1">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 leading-tight">{cur.hormones}</span>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Epiphyseal Status</span>
          <div className="mt-1">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 leading-tight">{cur.plateStatus}</span>
          </div>
        </div>
      </div>

      {/* Clinical Guidance Card */}
      <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3.5 text-xs dark:border-blue-900/40 dark:bg-blue-950/20">
        <div className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5 mb-1">
          <span>🦴</span>
          <span>Endocrinological Growth Note:</span>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {cur.clinicalNote}
        </p>
      </div>
    </div>
  );
}
