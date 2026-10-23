'use client';

import React, { useState, useEffect } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface GrowthPhase {
  stage: string;
  shortLabel: string;
  ageSpan: string;
  velocityCmYr: number;
  velocityInYr: number;
  hormones: string;
  plateStatus: string;
  clinicalNote: string;
}

const PHASES_DATA: GrowthPhase[] = [
  {
    stage: 'Infancy (Rapid Phase)',
    shortLabel: 'Infancy',
    ageSpan: '0–12 mo',
    velocityCmYr: 25,
    velocityInYr: 9.8,
    hormones: 'Nutrition, Thyroid, Insulin',
    plateStatus: 'Wide cartilaginous physis',
    clinicalNote: 'Fastest post-natal linear growth velocity of lifetime; infant gains ~50% in standing length.',
  },
  {
    stage: 'Toddlerhood',
    shortLabel: 'Toddler',
    ageSpan: '1–3 yrs',
    velocityCmYr: 12,
    velocityInYr: 4.7,
    hormones: 'Growth Hormone (GH) & Thyroid',
    plateStatus: 'Transition to genetic channel',
    clinicalNote: 'Growth decelerates toward childhood baseline; child shifts toward parental genetic percentile channel.',
  },
  {
    stage: 'Mid-Childhood Steady',
    shortLabel: 'Childhood',
    ageSpan: '4–9 yrs',
    velocityCmYr: 6,
    velocityInYr: 2.4,
    hormones: 'Pulsatile GH & IGF-1 Axis',
    plateStatus: 'Linear chondrocyte proliferation',
    clinicalNote: 'Predictable steady linear growth of ~2 inches per year; deviation indicates nutritional or endocrine issues.',
  },
  {
    stage: 'Pubertal Spurt (Peak Velocity)',
    shortLabel: 'Puberty',
    ageSpan: '10–14 yrs',
    velocityCmYr: 9.5,
    velocityInYr: 3.7,
    hormones: 'Estrogen, Testosterone & GH',
    plateStatus: 'Maximum chondrocyte hypertrophy',
    clinicalNote: 'Peak Height Velocity (PHV); girls gain ~8–9 cm/yr; boys gain ~9–10 cm/yr over longer duration.',
  },
  {
    stage: 'Epiphyseal Fusion (Final Stature)',
    shortLabel: 'Adult Fusion',
    ageSpan: '16–19 yrs',
    velocityCmYr: 0,
    velocityInYr: 0,
    hormones: 'High Estrogen in both sexes',
    plateStatus: 'Complete ossification & plate closure',
    clinicalNote: 'Chondrocytes exhausted; epiphyseal cartilage completely calcifies into solid bone; adult stature locked.',
  },
];

const COLORS = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#64748b'];

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

export function ChildHeightGrowthPlateVisualizer() {
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(3); // Pubertal spurt default

  useEffect(() => {
    setMounted(true);
  }, []);

  const cur = PHASES_DATA[activeIdx];

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📏</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              Linear Growth Velocity &amp; Pubertal Spurt Curve
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Tanner pediatric endocrinology standards: Annual skeletal elongation velocity (cm/year) by developmental stage
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
          {PHASES_DATA.map((p, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={p.shortLabel}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-all min-h-[44px] flex items-center gap-1 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02] dark:bg-blue-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <span>{p.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recharts Bar Chart */}
      <div className="h-[250px] sm:h-[280px] w-full mb-4">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={PHASES_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.7} vertical={false} />
              <XAxis dataKey="shortLabel" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={false} />
              <YAxis
                tickFormatter={(v) => `${v}cm`}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={false}
                width={48}
                domain={[0, 28]}
              />
              <Tooltip
                {...tooltipStyle}
                formatter={(val) => [`${val} cm/year (${(Number(val) / 2.54).toFixed(1)} in/yr)`, 'Growth Velocity']}
                labelFormatter={(label) => `Stage: ${label}`}
              />
              <Bar dataKey="velocityCmYr" name="Linear Velocity" radius={[8, 8, 0, 0]}>
                {PHASES_DATA.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === activeIdx ? '#2563eb' : COLORS[index % COLORS.length]}
                    opacity={index === activeIdx ? 1 : 0.75}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
        )}
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 mb-4">
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Annual Velocity</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{cur.velocityCmYr} cm / yr</span>
            <span className="text-xs text-slate-400 block font-normal">({cur.velocityInYr} in / year)</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Stage Duration</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight block">{cur.ageSpan}</span>
            <span className="text-xs text-slate-400 block font-normal">pediatric window</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Hormonal Drivers</span>
          <div className="mt-1">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 leading-tight block">{cur.hormones}</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Growth Plate Status</span>
          <div className="mt-1">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 leading-tight block">{cur.plateStatus}</span>
          </div>
        </div>
      </div>

      {/* Clinical Guidance Box */}
      <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3.5 text-xs dark:border-blue-900/40 dark:bg-blue-950/20">
        <div className="font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5 mb-1">
          <span>🦴</span>
          <span>Endocrinology Growth Insight ({cur.stage}):</span>
        </div>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {cur.clinicalNote}
        </p>
      </div>
    </div>
  );
}
