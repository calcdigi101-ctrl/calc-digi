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

interface ParallelMilestone {
  latitude: number;
  label: string;
  parallelName: string;
  kmPerDegLon: number;
  milesPerDegLon: number;
  metersPerSecondLon: number;
  representativeCity: string;
  clinicalNote: string;
}

const PARALLEL_DATA: ParallelMilestone[] = [
  {
    latitude: 0,
    label: '0° Equator',
    parallelName: 'The Equator (Null Island / Quito)',
    kmPerDegLon: 111.32,
    milesPerDegLon: 69.17,
    metersPerSecondLon: 30.92,
    representativeCity: 'Quito, Ecuador / Pontianak, Indonesia',
    clinicalNote: 'Maximum longitudinal width on Earth. Longitude parallels are parallel and furthest apart here; 1 nautical mile equals 1 minute of arc.',
  },
  {
    latitude: 15,
    label: '15° N/S',
    parallelName: 'Tropical Low Latitudes',
    kmPerDegLon: 107.55,
    milesPerDegLon: 66.83,
    metersPerSecondLon: 29.87,
    representativeCity: 'Bangkok, Thailand / Dakar, Senegal',
    clinicalNote: 'Meridian convergence begins subtly, losing only 3.4% of equatorial distance over the first 15 degrees of latitude.',
  },
  {
    latitude: 23.5,
    label: '23.5° Tropics',
    parallelName: 'Tropic of Cancer / Capricorn',
    kmPerDegLon: 102.11,
    milesPerDegLon: 63.45,
    metersPerSecondLon: 28.36,
    representativeCity: 'Havana, Cuba / Muscat, Oman',
    clinicalNote: 'The astronomical solar turnaround boundary; longitudinal degree width drops to ~102 km (~63.5 statute miles).',
  },
  {
    latitude: 30,
    label: '30° N/S',
    parallelName: 'Subtropical Horse Latitudes',
    kmPerDegLon: 96.49,
    milesPerDegLon: 59.96,
    metersPerSecondLon: 26.8,
    representativeCity: 'Houston, Texas / Cairo, Egypt',
    clinicalNote: '1 degree of longitude is now under 100 km; cosine rate of convergence accelerates through temperate mid-latitudes.',
  },
  {
    latitude: 45,
    label: '45° N/S',
    parallelName: 'Mid-Latitude Halfway Parallel',
    kmPerDegLon: 78.85,
    milesPerDegLon: 48.99,
    metersPerSecondLon: 21.9,
    representativeCity: 'Minneapolis, USA / Milan, Italy',
    clinicalNote: 'Exactly halfway between equator and pole. Cosine(45°) = 0.7071; longitude degree is precisely 70.7% of its equatorial length.',
  },
  {
    latitude: 60,
    label: '60° N/S',
    parallelName: 'Sub-Arctic Parallel',
    kmPerDegLon: 55.8,
    milesPerDegLon: 34.67,
    metersPerSecondLon: 15.5,
    representativeCity: 'Oslo, Norway / Anchorage, Alaska',
    clinicalNote: 'Cosine(60°) = 0.5000. Exactly half of equatorial width! Longitude degrees are compressed to 55.8 km (34.7 miles).',
  },
  {
    latitude: 66.5,
    label: '66.5° Arctic',
    parallelName: 'Arctic & Antarctic Circles',
    kmPerDegLon: 44.42,
    milesPerDegLon: 27.6,
    metersPerSecondLon: 12.34,
    representativeCity: 'Rovaniemi, Finland / Tromsø, Norway',
    clinicalNote: 'Polar circle threshold with 24-hour midnight sun / polar night; 1 hour of time difference spans only ~660 km of flight.',
  },
  {
    latitude: 75,
    label: '75° N/S',
    parallelName: 'High Arctic Tundra',
    kmPerDegLon: 28.9,
    milesPerDegLon: 17.96,
    metersPerSecondLon: 8.03,
    representativeCity: 'Svalbard, Norway / Resolute, Canada',
    clinicalNote: 'Extreme meridian convergence; circumpolar distances are short, causing aircraft to cross time zones every few minutes.',
  },
  {
    latitude: 90,
    label: '90° Poles',
    parallelName: 'North & South Terrestrial Poles',
    kmPerDegLon: 0.0,
    milesPerDegLon: 0.0,
    metersPerSecondLon: 0.0,
    representativeCity: 'Geographic North Pole (Arctic Ocean)',
    clinicalNote: 'All 360 meridians converge to a singular geographic point of zero dimensions. All time zones coincide at the pole.',
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

export function LatitudeLongitudeConvergenceChart() {
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(4); // 45° default

  useEffect(() => {
    setMounted(true);
  }, []);

  const cur = PARALLEL_DATA[activeIdx];

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all">
      {/* Chart Header */}
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📍</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              Meridian Convergence Spectrum: 1° Longitude Width by Latitude
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            WGS84 ellipsoidal mathematical decay: Physical distance (km) of 1 degree of longitude from Equator (0°) to Poles (90°)
          </p>
        </div>
        <span className="self-start sm:self-auto rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 ring-1 ring-inset ring-cyan-600/20">
          WGS84 Geodetic Model
        </span>
      </div>

      {/* Latitude Parallel Selector Pills */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Select Latitude Parallel:
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {PARALLEL_DATA.map((p, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-all min-h-[44px] flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20 scale-[1.02] dark:bg-cyan-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <span>🌐</span>
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="h-[250px] sm:h-[280px] w-full mb-4">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={PARALLEL_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="convergenceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0891b2" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0891b2" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.7} vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={false} />
              <YAxis
                tickFormatter={(v) => `${v}km`}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={false}
                width={48}
                domain={[0, 120]}
              />
              <Tooltip
                {...tooltipStyle}
                formatter={(val, name, props) => [
                  `${val} km (${props.payload.milesPerDegLon} miles)`,
                  `1° Lon at ${props.payload.label}`,
                ]}
                labelFormatter={(label) => `Latitude Parallel: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="kmPerDegLon"
                name="1° Lon (km)"
                stroke="#0891b2"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#convergenceGrad)"
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
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">1° Longitude Width</span>
          <div className="mt-1">
            <span className="text-base font-bold text-cyan-600 dark:text-cyan-400">
              {cur.kmPerDegLon} km
            </span>
            <span className="text-xs text-slate-400 block font-normal">({cur.milesPerDegLon} miles)</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">1 Second of Arc (Arcsec)</span>
          <div className="mt-1">
            <span className="text-base font-bold text-slate-900 dark:text-white">
              {cur.metersPerSecondLon} m
            </span>
            <span className="text-[10px] text-slate-400 block">GPS ground resolution</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Geographic Parallel</span>
          <div className="mt-1">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 leading-tight block">
              {cur.label}
            </span>
            <span className="text-[10px] text-slate-400 block break-words">{cur.parallelName}</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Sample Regional Anchor</span>
          <div className="mt-1">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 leading-tight block break-words">
              {cur.representativeCity.split('/')[0]}
            </span>
            <span className="text-[10px] text-slate-400 block">Typical latitude location</span>
          </div>
        </div>
      </div>

      {/* Geodesy Callout Card */}
      <div className="rounded-xl border border-cyan-100 bg-cyan-50/50 p-3 text-xs leading-relaxed text-slate-700 dark:border-cyan-900/30 dark:bg-cyan-950/20 dark:text-slate-300">
        <strong className="font-semibold text-cyan-800 dark:text-cyan-300">
          Geodetic Convergence Principle ({cur.label}):
        </strong>{' '}
        {cur.clinicalNote}
      </div>
    </div>
  );
}
