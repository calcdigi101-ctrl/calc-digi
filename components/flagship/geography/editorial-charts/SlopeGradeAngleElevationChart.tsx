'use client';

import React, { useState, useEffect } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface SlopeTier {
  gradePct: number;
  label: string;
  angleDeg: number;
  ratio: string;
  risePer100m: number;
  safetyTier: string;
  engineeringStandard: string;
  advisoryNote: string;
}

const SLOPE_TIERS: SlopeTier[] = [
  {
    gradePct: 0.5,
    label: '0.5%',
    angleDeg: 0.29,
    ratio: '1:200',
    risePer100m: 0.5,
    safetyTier: 'Minimum Drainage',
    engineeringStandard: 'AASHTO / ASTM Drainage',
    advisoryNote: 'Absolute minimum slope required on asphalt or concrete surfaces to prevent standing water ponding and hydroplaning.',
  },
  {
    gradePct: 2.0,
    label: '2.0%',
    angleDeg: 1.15,
    ratio: '1:50',
    risePer100m: 2.0,
    safetyTier: 'Freight Rail Max',
    engineeringStandard: 'AREMA Railway Limit',
    advisoryNote: 'Standard maximum gradient for heavy freight railroads; locomotives experience severe wheel-slip and friction loss above 2.2%.',
  },
  {
    gradePct: 5.0,
    label: '5.0%',
    angleDeg: 2.86,
    ratio: '1:20',
    risePer100m: 5.0,
    safetyTier: 'Gentle Highway',
    engineeringStandard: 'Standard Interstate Preferred',
    advisoryNote: 'Ideal cruising grade for high-speed highways and cycling; commercial vehicles maintain highway speed without downshifting.',
  },
  {
    gradePct: 6.0,
    label: '6.0%',
    angleDeg: 3.43,
    ratio: '1:16.7',
    risePer100m: 6.0,
    safetyTier: 'US Interstate Max',
    engineeringStandard: 'FHWA Interstate Highway Ceiling',
    advisoryNote: 'Federal Highway Administration strict ceiling for mountainous Interstate routes; warrants runaway truck escape ramps on long descents.',
  },
  {
    gradePct: 8.33,
    label: '8.33%',
    angleDeg: 4.76,
    ratio: '1:12',
    risePer100m: 8.33,
    safetyTier: 'ADA Ramp Limit',
    engineeringStandard: 'ADA Title III Compliance (1:12)',
    advisoryNote: 'Legal maximum slope for wheelchair accessibility ramps in commercial and civic buildings (requires landing every 30 inches rise).',
  },
  {
    gradePct: 12.0,
    label: '12.0%',
    angleDeg: 6.84,
    ratio: '1:8.3',
    risePer100m: 12.0,
    safetyTier: 'Steep Mountain Pass',
    engineeringStandard: 'State Mountain Highway',
    advisoryNote: 'Severe mountain gradient requiring lower transmission gears; braking systems overheat rapidly without engine compression braking.',
  },
  {
    gradePct: 18.0,
    label: '18.0%',
    angleDeg: 10.2,
    ratio: '1:5.6',
    risePer100m: 18.0,
    safetyTier: 'Cat 1 Alpine Climb',
    engineeringStandard: 'Tour de France Alpine Benchmark',
    advisoryNote: 'Brutal mountain incline found on legendary cycling passes (e.g., Mortirolo, Angliru); vehicles without AWD risk tire slip on gravel.',
  },
  {
    gradePct: 25.0,
    label: '25.0%',
    angleDeg: 14.04,
    ratio: '1:4',
    risePer100m: 25.0,
    safetyTier: 'Severe Traction Hazard',
    engineeringStandard: 'Emergency Access & Rural Track',
    advisoryNote: 'Exceeds standard 2WD traction capability on wet pavement; passenger vehicles will stall or spin tires without differential lock.',
  },
  {
    gradePct: 35.0,
    label: '35.0%',
    angleDeg: 19.29,
    ratio: '1:2.86',
    risePer100m: 35.0,
    safetyTier: 'World Record Public Road',
    engineeringStandard: 'Guinness World Record (Baldwin St)',
    advisoryNote: 'Baldwin Street in Dunedin, NZ; paved with grooved concrete because asphalt would melt and slide downhill during summer heat.',
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

export function SlopeGradeAngleElevationChart() {
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(4); // ADA 8.33% default

  useEffect(() => {
    setMounted(true);
  }, []);

  const cur = SLOPE_TIERS[activeIdx];

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all">
      {/* Chart Header */}
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📐</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              Elevation Grade &amp; Incline Angle Profile Spectrum
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Civil engineering slope standards: Percent grade (%) vs. slope angle (°) from drainage to extreme inclines
          </p>
        </div>
        <span className="self-start sm:self-auto rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 ring-1 ring-inset ring-amber-600/20">
          FHWA / ADA Compliant
        </span>
      </div>

      {/* Grade Selector Pills */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Select Engineering Incline Milestone:
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {SLOPE_TIERS.map((s, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={s.label}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-all min-h-[44px] flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-500/20 scale-[1.02] dark:bg-amber-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <span>⛰️</span>
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="h-[250px] sm:h-[280px] w-full mb-4">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SLOPE_TIERS} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="slopeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.7} vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={false} />
              <YAxis
                tickFormatter={(v) => `${v}°`}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={false}
                width={40}
                domain={[0, 22]}
              />
              <Tooltip
                {...tooltipStyle}
                formatter={(val, name, props) => [
                  `${val}° (${props.payload.gradePct}% grade | Ratio ${props.payload.ratio})`,
                  props.payload.safetyTier,
                ]}
                labelFormatter={(label) => `Incline Grade: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="angleDeg"
                name="Angle (°)"
                stroke="#d97706"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#slopeGrad)"
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
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Calculated Percent Grade</span>
          <div className="mt-1">
            <span className="text-base font-bold text-amber-600 dark:text-amber-400">
              {cur.gradePct}%
            </span>
            <span className="text-xs text-slate-400 block font-normal">Ratio {cur.ratio}</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Slope Incline Angle</span>
          <div className="mt-1">
            <span className="text-base font-bold text-slate-900 dark:text-white">
              {cur.angleDeg}°
            </span>
            <span className="text-[10px] text-slate-400 block">{cur.risePer100m}m rise per 100m run</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Engineering Benchmark</span>
          <div className="mt-1">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 leading-tight block">
              {cur.engineeringStandard.split(' ')[0]}
            </span>
            <span className="text-[10px] text-slate-400 block truncate">{cur.engineeringStandard}</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Classification</span>
          <div className="mt-1">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 leading-tight block">
              {cur.safetyTier}
            </span>
            <span className="text-[10px] text-slate-400 block">{cur.gradePct <= 8.33 ? 'ADA Compliant ✅' : 'Exceeds ADA ⚠️'}</span>
          </div>
        </div>
      </div>

      {/* Engineering Callout Card */}
      <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-3 text-xs leading-relaxed text-slate-700 dark:border-amber-900/30 dark:bg-amber-950/20 dark:text-slate-300">
        <strong className="font-semibold text-amber-800 dark:text-amber-300">
          Engineering &amp; Road Safety Assessment ({cur.label} Grade):
        </strong>{' '}
        {cur.advisoryNote}
      </div>
    </div>
  );
}
