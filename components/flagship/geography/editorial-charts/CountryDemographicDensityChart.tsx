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

interface CountryDensity {
  country: string;
  code: string;
  flag: string;
  popM: number;
  areaKm2: number;
  density: number;
  densityTier: string;
  gdpPerCapita: number;
  clinicalNote: string;
}

const COUNTRY_DATA: CountryDensity[] = [
  {
    country: 'Monaco',
    code: 'MC',
    flag: '🇲🇨',
    popM: 0.039,
    areaKm2: 2.08,
    density: 18750,
    densityTier: 'Hyper-Dense City-State',
    gdpPerCapita: 234000,
    clinicalNote: 'Densely built Mediterranean microstate with virtually 100% urban land utilization and zero agricultural buffer.',
  },
  {
    country: 'Singapore',
    code: 'SG',
    flag: '🇸🇬',
    popM: 5.9,
    areaKm2: 734,
    density: 8038,
    densityTier: 'Hyper-Dense Island Nation',
    gdpPerCapita: 88000,
    clinicalNote: 'World leader in high-density urban planning, utilizing vertical green space, reclaimed coastlines, and master zoning.',
  },
  {
    country: 'Bangladesh',
    code: 'BD',
    flag: '🇧🇩',
    popM: 173,
    areaKm2: 147570,
    density: 1172,
    densityTier: 'Most Densely Populated Large Nation',
    gdpPerCapita: 2600,
    clinicalNote: 'Dense deltaic floodplain with fertile arable soil supporting intense agrarian and garment-manufacturing populations.',
  },
  {
    country: 'India',
    code: 'IN',
    flag: '🇮🇳',
    popM: 1430,
    areaKm2: 3287263,
    density: 435,
    densityTier: 'High Continental Density',
    gdpPerCapita: 2650,
    clinicalNote: 'World\'s most populous nation, characterized by concentrated river basin clusters (Indo-Gangetic plain exceeds 1,000/km²).',
  },
  {
    country: 'United Kingdom',
    code: 'GB',
    flag: '🇬🇧',
    popM: 68,
    areaKm2: 243610,
    density: 279,
    densityTier: 'Moderate European Island',
    gdpPerCapita: 48900,
    clinicalNote: 'Post-industrial nation with high urban concentration in Southeast England (Greater London exceeds 5,600/km²).',
  },
  {
    country: 'China',
    code: 'CN',
    flag: '🇨🇳',
    popM: 1410,
    areaKm2: 9596961,
    density: 147,
    densityTier: 'Moderate Dual-Zone Distribution',
    gdpPerCapita: 13100,
    clinicalNote: '94% of population lives east of the Heihe–Tengchong Line (effective density >400/km²), while west remains arid and sparse.',
  },
  {
    country: 'United States',
    code: 'US',
    flag: '🇺🇸',
    popM: 335,
    areaKm2: 9833517,
    density: 36,
    densityTier: 'Low Continental Density',
    gdpPerCapita: 81600,
    clinicalNote: 'Vast territorial expanse; 80% of citizens occupy urban clusters on 3% of land, leaving rural heartland lightly settled.',
  },
  {
    country: 'Canada',
    code: 'CA',
    flag: '🇨🇦',
    popM: 40,
    areaKm2: 9984670,
    density: 4.2,
    densityTier: 'Ultra-Sparse Sub-Arctic',
    gdpPerCapita: 53200,
    clinicalNote: '90% of citizens reside within 160 km (100 miles) of the southern US border due to Canadian Shield and Arctic climates.',
  },
  {
    country: 'Australia',
    code: 'AU',
    flag: '🇦🇺',
    popM: 27,
    areaKm2: 7692024,
    density: 3.5,
    densityTier: 'Ultra-Sparse Outback Continent',
    gdpPerCapita: 64700,
    clinicalNote: '85% coastal urbanized along East and Southeast coastlines; interior arid outback is among Earth\'s lowest habitable densities.',
  },
  {
    country: 'Mongolia',
    code: 'MN',
    flag: '🇲🇳',
    popM: 3.5,
    areaKm2: 1564116,
    density: 2.2,
    densityTier: 'World\'s Most Sparsely Populated Sovereign State',
    gdpPerCapita: 5300,
    clinicalNote: 'Half of total population resides in capital Ulaanbaatar, leaving the remaining vast steppe at less than 1 resident per km².',
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

export function CountryDemographicDensityChart() {
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(3); // India default

  useEffect(() => {
    setMounted(true);
  }, []);

  const cur = COUNTRY_DATA[activeIdx];

  // Visual scaled data (cubic root scaling to visualize Monaco 18k next to Mongolia 2 on same chart without collapsing)
  const chartData = COUNTRY_DATA.map((c) => ({
    name: c.country,
    code: c.code,
    density: c.density,
    scaledDensity: Math.round(Math.pow(c.density, 0.45) * 10),
  }));

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all">
      {/* Chart Header */}
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌍</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              Global Population Density Spectrum (People per km²)
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            UN Population Division &amp; World Bank data: Spatial demographic distribution across world nations
          </p>
        </div>
        <span className="self-start sm:self-auto rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 ring-1 ring-inset ring-emerald-600/20">
          UN World Factbook Verified
        </span>
      </div>

      {/* Nation Pills */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Select Benchmark Nation:
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {COUNTRY_DATA.map((c, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={c.code}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-all min-h-[44px] flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 scale-[1.02] dark:bg-emerald-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <span>{c.flag}</span>
                <span>{c.country}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="h-[250px] sm:h-[280px] w-full mb-4">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="densityGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.7} vertical={false} />
              <XAxis dataKey="code" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={false} />
              <YAxis
                tickFormatter={(v) => `${v}`}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={false}
                width={40}
              />
              <Tooltip
                {...tooltipStyle}
                formatter={(_, __, props) => [
                  `${props.payload.density.toLocaleString()} people / km²`,
                  `${props.payload.name} Density`,
                ]}
                labelFormatter={(label) => `Country Code: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="scaledDensity"
                name="Density Index"
                stroke="#059669"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#densityGrad)"
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
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Crude Population Density</span>
          <div className="mt-1">
            <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
              {cur.density.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 block font-normal">residents / km²</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Total Population</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight block">
              {cur.popM >= 1 ? `${cur.popM.toLocaleString()} million` : `${Math.round(cur.popM * 1000).toLocaleString()}k residents`}
            </span>
            <span className="text-[10px] text-slate-400 block">Land: {cur.areaKm2.toLocaleString()} km²</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">GDP per Capita</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 leading-tight block">
              ${cur.gdpPerCapita.toLocaleString()} USD
            </span>
            <span className="text-[10px] text-slate-400 block">Nominal annual output</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Spatial Demography</span>
          <div className="mt-1">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 leading-tight block">
              {cur.densityTier.split(' ')[0]}
            </span>
            <span className="text-[10px] text-slate-400 block truncate">{cur.densityTier}</span>
          </div>
        </div>
      </div>

      {/* Clinical / Geographic Callout Card */}
      <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3 text-xs leading-relaxed text-slate-700 dark:border-emerald-900/30 dark:bg-emerald-950/20 dark:text-slate-300">
        <strong className="font-semibold text-emerald-800 dark:text-emerald-300">
          {cur.flag} {cur.country} Demographic Profile:
        </strong>{' '}
        {cur.clinicalNote}
      </div>
    </div>
  );
}
