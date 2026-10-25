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

interface FlightCorridor {
  route: string;
  shortLabel: string;
  distKm: number;
  distMiles: number;
  flightHours: number;
  antipodalPct: number;
  initialBearing: string;
  geodesicNote: string;
}

const CORRIDORS: FlightCorridor[] = [
  {
    route: 'London → Paris',
    shortLabel: 'LON–PAR',
    distKm: 343,
    distMiles: 213,
    flightHours: 1.1,
    antipodalPct: 1.7,
    initialBearing: '148° (SSE)',
    geodesicNote: 'Short European hop where spherical Earth curvature has under 0.05% deviation from Euclidean planar models.',
  },
  {
    route: 'New York → Los Angeles',
    shortLabel: 'NYC–LAX',
    distKm: 3940,
    distMiles: 2448,
    flightHours: 5.2,
    antipodalPct: 19.7,
    initialBearing: '264° (W)',
    geodesicNote: 'Transcontinental US route where great-circle path arcs northward through Pennsylvania and Iowa, saving 110 km.',
  },
  {
    route: 'Paris → Dubai',
    shortLabel: 'CDG–DXB',
    distKm: 5245,
    distMiles: 3259,
    flightHours: 6.5,
    antipodalPct: 26.2,
    initialBearing: '118° (ESE)',
    geodesicNote: 'Intercontinental Euro-Gulf corridor crossing Eastern Europe and Turkey along a smooth southeasterly geodesic arc.',
  },
  {
    route: 'New York → London',
    shortLabel: 'JFK–LHR',
    distKm: 5570,
    distMiles: 3461,
    flightHours: 6.8,
    antipodalPct: 27.8,
    initialBearing: '51° (NE)',
    geodesicNote: 'Classic North Atlantic track: great circle arcs northeast across Newfoundland and Ireland rather than straight east.',
  },
  {
    route: 'London → Tokyo',
    shortLabel: 'LHR–HND',
    distKm: 9560,
    distMiles: 5940,
    flightHours: 11.5,
    antipodalPct: 47.8,
    initialBearing: '33° (NNE)',
    geodesicNote: 'Polar corridor where Mercator maps deceive: flying over Scandinavia and the Arctic is 3,500 km shorter than flat east routes.',
  },
  {
    route: 'Los Angeles → Sydney',
    shortLabel: 'LAX–SYD',
    distKm: 12050,
    distMiles: 7488,
    flightHours: 14.5,
    antipodalPct: 60.2,
    initialBearing: '232° (SW)',
    geodesicNote: 'Transpacific long-haul traversing both hemispheres; aircraft cross the equator and international date line simultaneously.',
  },
  {
    route: 'Singapore → New York',
    shortLabel: 'SIN–JFK',
    distKm: 15350,
    distMiles: 9538,
    flightHours: 18.2,
    antipodalPct: 76.7,
    initialBearing: '23° (NNE)',
    geodesicNote: 'World\'s longest commercial airline flight; reaches over 76% of Earth\'s theoretical maximum antipodal separation.',
  },
  {
    route: 'Earth Antipodal Maximum',
    shortLabel: 'ANTIPODE',
    distKm: 20015,
    distMiles: 12437,
    flightHours: 23.0,
    antipodalPct: 100.0,
    initialBearing: '180° (S)',
    geodesicNote: 'Theoretical maximum straight surface distance between two antipodal points across exactly half Earth\'s circumference.',
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

export function GreatCircleDistanceRouteChart() {
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(3); // JFK to LHR default

  useEffect(() => {
    setMounted(true);
  }, []);

  const cur = CORRIDORS[activeIdx];

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition-all">
      {/* Chart Header */}
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">✈️</span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
              Great-Circle Orthodromic Flight Corridor Spectrum
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Haversine geodesic spherical distance vs. flight time (900 km/h cruising benchmark)
          </p>
        </div>
        <span className="self-start sm:self-auto rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 ring-1 ring-inset ring-blue-600/20">
          IUGG Geodetic Standard
        </span>
      </div>

      {/* Route Pills */}
      <div className="mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Select International Flight Corridor:
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {CORRIDORS.map((c, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <button
                key={c.shortLabel}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition-all min-h-[44px] flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02] dark:bg-blue-500'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <span>🌐</span>
                <span>{c.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="h-[250px] sm:h-[280px] w-full mb-4">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={CORRIDORS} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="distGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.7} vertical={false} />
              <XAxis dataKey="shortLabel" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={false} />
              <YAxis
                tickFormatter={(v) => `${Math.round(v / 1000)}k km`}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={false}
                width={50}
                domain={[0, 22000]}
              />
              <Tooltip
                {...tooltipStyle}
                formatter={(val, name, props) => [
                  name === 'distKm'
                    ? `${Number(val).toLocaleString()} km (${props.payload.distMiles.toLocaleString()} miles)`
                    : `${val} hrs`,
                  props.payload.route,
                ]}
                labelFormatter={(label) => `Corridor: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="distKm"
                name="Distance (km)"
                stroke="#2563eb"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#distGrad)"
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
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Great-Circle Distance</span>
          <div className="mt-1">
            <span className="text-base font-bold text-blue-600 dark:text-blue-400">
              {cur.distKm.toLocaleString()} km
            </span>
            <span className="text-xs text-slate-400 block font-normal">({cur.distMiles.toLocaleString()} miles)</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Est. Jet Air Time</span>
          <div className="mt-1">
            <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
              {cur.flightHours.toFixed(1)} hrs
            </span>
            <span className="text-[10px] text-slate-400 block">@ 900 km/h (486 kt) cruise</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Initial Compass Heading</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight block">
              {cur.initialBearing}
            </span>
            <span className="text-[10px] text-slate-400 block">True forward azimuth</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Antipodal Ratio</span>
          <div className="mt-1">
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 leading-tight block">
              {cur.antipodalPct.toFixed(1)}%
            </span>
            <span className="text-[10px] text-slate-400 block">of max 20,015 km</span>
          </div>
        </div>
      </div>

      {/* Navigation Callout Card */}
      <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3 text-xs leading-relaxed text-slate-700 dark:border-blue-900/30 dark:bg-blue-950/20 dark:text-slate-300">
        <strong className="font-semibold text-blue-800 dark:text-blue-300">
          Flight Navigation Route Insight ({cur.route}):
        </strong>{' '}
        {cur.geodesicNote}
      </div>
    </div>
  );
}
