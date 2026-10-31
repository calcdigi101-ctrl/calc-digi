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

interface MapScaleTier {
  scaleLabel: string;
  shortLabel: string;
  denominatorN: number;
  metersPerCm: number;
  feetPerInch: number;
  km2PerCm2: number;
  category: string;
  primaryApplication: string;
  resolutionNote: string;
}

const SCALE_DATA: MapScaleTier[] = [
  {
    scaleLabel: '1:500 (Site Plan)',
    shortLabel: '1:500',
    denominatorN: 500,
    metersPerCm: 5,
    feetPerInch: 41.7,
    km2PerCm2: 0.000025,
    category: 'Ultra-Large Scale (Engineering)',
    primaryApplication: 'Architectural blueprints, civil property boundary surveys, utilities.',
    resolutionNote: 'Extreme detail showing individual trees, curb cuts, manholes, and building footprints to centimeter precision.',
  },
  {
    scaleLabel: '1:5,000 (City Cadastre)',
    shortLabel: '1:5k',
    denominatorN: 5000,
    metersPerCm: 50,
    feetPerInch: 416.7,
    km2PerCm2: 0.0025,
    category: 'Large Scale (Urban Planning)',
    primaryApplication: 'Municipal tax parcel zoning, city transit corridors, neighborhood mapping.',
    resolutionNote: 'Shows precise property parcel boundaries, street lane widths, and individual residential structures.',
  },
  {
    scaleLabel: '1:24,000 (USGS Topo 7.5-Min)',
    shortLabel: '1:24k',
    denominatorN: 24000,
    metersPerCm: 240,
    feetPerInch: 2000,
    km2PerCm2: 0.0576,
    category: 'Large Scale (National Standard)',
    primaryApplication: 'USGS Quadrangle standard, outdoor wilderness recreation, search & rescue.',
    resolutionNote: '1 inch = 2,000 feet exactly. Depicts 10-foot to 20-foot elevation contour lines, trails, and water springs.',
  },
  {
    scaleLabel: '1:50,000 (Standard Topographic)',
    shortLabel: '1:50k',
    denominatorN: 50000,
    metersPerCm: 500,
    feetPerInch: 4166.7,
    km2PerCm2: 0.25,
    category: 'Medium Scale (Military & Topo)',
    primaryApplication: 'NATO military gridded maps, national topographic series, forestry management.',
    resolutionNote: 'Standard metric topographic scale: 1 cm = 500 meters (2 cm = 1 km). 1 cm² on paper equals exactly 25 hectares.',
  },
  {
    scaleLabel: '1:100,000 (Regional County Map)',
    shortLabel: '1:100k',
    denominatorN: 100000,
    metersPerCm: 1000,
    feetPerInch: 8333.3,
    km2PerCm2: 1.0,
    category: 'Medium Scale (Regional Planning)',
    primaryApplication: 'Bureau of Land Management (BLM) land status, county emergency management.',
    resolutionNote: 'Clean metric baseline: 1 cm on paper equals exactly 1 kilometer on the ground. 1 cm² equals 1 km².',
  },
  {
    scaleLabel: '1:250,000 (State Road Atlas)',
    shortLabel: '1:250k',
    denominatorN: 250000,
    metersPerCm: 2500,
    feetPerInch: 20833.3,
    km2PerCm2: 6.25,
    category: 'Small Scale (State / Provincial)',
    primaryApplication: 'Highway road atlases, regional watershed basins, commercial logistics.',
    resolutionNote: 'Major transit networks and geographic regions. Minor country roads and buildings are omitted due to generalization.',
  },
  {
    scaleLabel: '1:500,000 (Aeronautical Sectional)',
    shortLabel: '1:500k',
    denominatorN: 50000,
    metersPerCm: 5000,
    feetPerInch: 41666.7,
    km2PerCm2: 25.0,
    category: 'Small Scale (Air Navigation)',
    primaryApplication: 'FAA Visual Flight Rules (VFR) aviation pilot sectional charts.',
    resolutionNote: 'Shows controlled airspace, radio navigation beacons, and major terrain elevations; 1 cm equals 5 kilometers.',
  },
  {
    scaleLabel: '1:1,000,000 (Continental Atlas)',
    shortLabel: '1:1M',
    denominatorN: 1000000,
    metersPerCm: 10000,
    feetPerInch: 83333.3,
    km2PerCm2: 100.0,
    category: 'Very Small Scale (Synoptic)',
    primaryApplication: 'International Map of the World (IMW), global climate and tectonic maps.',
    resolutionNote: '1 cm equals 10 kilometers. Entire countries fit on a single desk sheet; severe cartographic generalization applied.',
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

export function CartographicScaleDetailSpectrumChart() {
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(3); // 1:50,000 default

  useEffect(() => {
    setMounted(true);
  }, []);

  const cur = SCALE_DATA[activeIdx];

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all">
      {/* Chart Header */}
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🗺️</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              Cartographic Map Scale &amp; Spatial Ground Resolution Spectrum
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Representative Fraction (RF): Ground distance per centimeter (meters) across large-scale to synoptic scales
          </p>
        </div>
        <span className="self-start sm:self-auto rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 ring-1 ring-inset ring-indigo-600/20">
          USGS / NATO Military Standards
        </span>
      </div>

      {/* Scale Selector Pills */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Select Cartographic Scale Milestone:
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {SCALE_DATA.map((s, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={s.shortLabel}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-all min-h-[44px] flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 scale-[1.02] dark:bg-indigo-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <span>📐</span>
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
            <AreaChart data={SCALE_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="scaleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.7} vertical={false} />
              <XAxis dataKey="shortLabel" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={false} />
              <YAxis
                tickFormatter={(v) => `${v >= 1000 ? `${v / 1000}k` : v}m`}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={false}
                width={48}
              />
              <Tooltip
                {...tooltipStyle}
                formatter={(val, name, props) => [
                  `1 cm = ${Number(val).toLocaleString()} m (${(Number(val) / 1000).toFixed(2)} km)`,
                  props.payload.scaleLabel,
                ]}
                labelFormatter={(label) => `Scale: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="metersPerCm"
                name="Ground Meters per cm"
                stroke="#6366f1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#scaleGrad)"
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
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">1 cm on Paper Map =</span>
          <div className="mt-1">
            <span className="text-base font-bold text-indigo-600 dark:text-indigo-400">
              {cur.metersPerCm >= 1000 ? `${(cur.metersPerCm / 1000).toFixed(1)} km` : `${cur.metersPerCm} meters`}
            </span>
            <span className="text-xs text-slate-400 block font-normal">Ground distance</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">1 Inch on Paper Map =</span>
          <div className="mt-1">
            <span className="text-base font-bold text-slate-900 dark:text-white">
              {cur.feetPerInch >= 5280 ? `${(cur.feetPerInch / 5280).toFixed(2)} mi` : `${Math.round(cur.feetPerInch)} ft`}
            </span>
            <span className="text-[10px] text-slate-400 block">Imperial equivalent</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">1 cm² Map Area =</span>
          <div className="mt-1">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 leading-tight block">
              {cur.km2PerCm2 >= 1 ? `${cur.km2PerCm2} km²` : `${(cur.km2PerCm2 * 100).toFixed(1)} ha`}
            </span>
            <span className="text-[10px] text-slate-400 block break-words">Quadratic ground area</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Scale Tier</span>
          <div className="mt-1">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 leading-tight block break-words">
              {cur.category.split(' ')[0]}
            </span>
            <span className="text-[10px] text-slate-400 block break-words">{cur.category}</span>
          </div>
        </div>
      </div>

      {/* Cartography Callout Card */}
      <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-3 text-xs leading-relaxed text-slate-700 dark:border-indigo-900/30 dark:bg-indigo-950/20 dark:text-slate-300">
        <strong className="font-semibold text-indigo-800 dark:text-indigo-300">
          Cartographic Resolution &amp; Use Case ({cur.scaleLabel}):
        </strong>{' '}
        {cur.resolutionNote}
      </div>
    </div>
  );
}
