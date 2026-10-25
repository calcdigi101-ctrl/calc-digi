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

interface BeamScenario {
  id: string;
  name: string;
  spanM: number;
  depthMm: number;
  maxDeflectionMm: number;
  allowableL360Mm: number;
  peakMomentKNm: number;
  application: string;
}

const SCENARIOS: BeamScenario[] = [
  {
    id: 'joist3m',
    name: '3.0m Joist (Timber / Light Steel)',
    spanM: 3.0,
    depthMm: 200,
    maxDeflectionMm: 3.2,
    allowableL360Mm: 8.33,
    peakMomentKNm: 5.6,
    application: 'Residential bedroom floor timber rafter or composite deck joist.',
  },
  {
    id: 'beam5m',
    name: '5.0m Main Beam (W8×31 Section)',
    spanM: 5.0,
    depthMm: 250,
    maxDeflectionMm: 7.8,
    allowableL360Mm: 13.89,
    peakMomentKNm: 21.9,
    application: 'Standard open-plan residential living room steel support girder.',
  },
  {
    id: 'girder8m',
    name: '8.0m Commercial Girder (W12×50)',
    spanM: 8.0,
    depthMm: 350,
    maxDeflectionMm: 14.5,
    allowableL360Mm: 22.22,
    peakMomentKNm: 56.0,
    application: 'Commercial retail floor beam spanning between structural concrete columns.',
  },
  {
    id: 'span12m',
    name: '12.0m Long-Span Roof Girder (W18×76)',
    spanM: 12.0,
    depthMm: 460,
    maxDeflectionMm: 23.4,
    allowableL360Mm: 33.33,
    peakMomentKNm: 135.0,
    application: 'Clear-span industrial warehouse or sports pavilion primary roof girder.',
  },
];

export function BeamDeflectionStressSpectrumChart() {
  const [mounted, setMounted] = useState(false);
  const [selectedId, setSelectedId] = useState('beam5m');

  useEffect(() => {
    setMounted(false);
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  const active = SCENARIOS.find((s) => s.id === selectedId) || SCENARIOS[1];

  // Generate deflection parabolic curve data along beam span (0 to 100% of length)
  const chartData = [
    { station: '0% (Support A)', deflectionMm: 0, momentRatioPct: 0 },
    { station: '10% Span', deflectionMm: Number((active.maxDeflectionMm * 0.31).toFixed(2)), momentRatioPct: 36 },
    { station: '20% Span', deflectionMm: Number((active.maxDeflectionMm * 0.59).toFixed(2)), momentRatioPct: 64 },
    { station: '30% Span', deflectionMm: Number((active.maxDeflectionMm * 0.81).toFixed(2)), momentRatioPct: 84 },
    { station: '40% Span', deflectionMm: Number((active.maxDeflectionMm * 0.95).toFixed(2)), momentRatioPct: 96 },
    { station: '50% (Midspan)', deflectionMm: active.maxDeflectionMm, momentRatioPct: 100 },
    { station: '60% Span', deflectionMm: Number((active.maxDeflectionMm * 0.95).toFixed(2)), momentRatioPct: 96 },
    { station: '70% Span', deflectionMm: Number((active.maxDeflectionMm * 0.81).toFixed(2)), momentRatioPct: 84 },
    { station: '80% Span', deflectionMm: Number((active.maxDeflectionMm * 0.59).toFixed(2)), momentRatioPct: 64 },
    { station: '90% Span', deflectionMm: Number((active.maxDeflectionMm * 0.31).toFixed(2)), momentRatioPct: 36 },
    { station: '100% (Support B)', deflectionMm: 0, momentRatioPct: 0 },
  ];

  if (!mounted) {
    return (
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="h-6 w-56 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-4 h-64 w-full animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800/50" />
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Beam Elastic Deflection &amp; Bending Moment Spectrum
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Parabolic elastic sag curve vs. L/360 code deflection threshold across clear spans
          </p>
        </div>
        <span className="inline-flex self-start rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-950/40 dark:text-blue-300">
          AISC 360 &amp; Eurocode 3
        </span>
      </div>

      {/* Interactive Scenario Selection Pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSelectedId(s.id)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              selectedId === s.id
                ? 'bg-blue-600 text-white shadow-sm dark:bg-blue-500'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Recharts Area Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="deflectionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="station" tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis
              unit=" mm"
              domain={[0, Math.ceil(active.allowableL360Mm * 1.15)]}
              tick={{ fontSize: 11, fill: '#64748b' }}
            />
            <Tooltip
              content={({ active: act, payload }) => {
                if (act && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-bold text-slate-900 dark:text-white">{d.station}</p>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold mt-1">
                        Deflection: {d.deflectionMm} mm
                      </p>
                      <p className="text-slate-500 dark:text-slate-400">
                        Relative Moment: {d.momentRatioPct}% of Peak
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="deflectionMm"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#deflectionGradient)"
              name="Deflection"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stat Metric Cards */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Peak Midspan Deflection</p>
          <p className="mt-1 text-base font-bold text-blue-600 dark:text-blue-400">
            {active.maxDeflectionMm} mm
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Allowable L/360 Limit</p>
          <p className="mt-1 text-base font-bold text-emerald-600 dark:text-emerald-400">
            {active.allowableL360Mm.toFixed(2)} mm
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Maximum Bending Moment</p>
          <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
            {active.peakMomentKNm} kN·m
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Clear Span Length</p>
          <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
            {active.spanM} meters
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 italic">
        <strong>Application Context:</strong> {active.application}
      </p>
    </div>
  );
}
