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

interface PipeSpec {
  id: string;
  nominalName: string;
  boreMm: number;
  maxFlowLps: number;
  maxFlowGpm: number;
  headLossAt2ms: number; // meters / 100m pipe
  recommendedApp: string;
}

const PIPE_SPECS: PipeSpec[] = [
  {
    id: 'dn25',
    nominalName: 'DN25 (1" Pipe)',
    boreMm: 25,
    maxFlowLps: 1.18,
    maxFlowGpm: 18.7,
    headLossAt2ms: 16.3,
    recommendedApp: 'Residential plumbing risers, commercial branch washroom supplies.',
  },
  {
    id: 'dn50',
    nominalName: 'DN50 (2" Pipe)',
    boreMm: 50,
    maxFlowLps: 4.71,
    maxFlowGpm: 74.7,
    headLossAt2ms: 7.2,
    recommendedApp: 'Commercial potable water risers, hydronic heat pump circulation loops.',
  },
  {
    id: 'dn80',
    nominalName: 'DN80 (3" Pipe)',
    boreMm: 80,
    maxFlowLps: 12.06,
    maxFlowGpm: 191.2,
    headLossAt2ms: 4.2,
    recommendedApp: 'Building condenser chilled water loops, fire standpipe systems.',
  },
  {
    id: 'dn100',
    nominalName: 'DN100 (4" Pipe)',
    boreMm: 100,
    maxFlowLps: 18.85,
    maxFlowGpm: 298.8,
    headLossAt2ms: 3.1,
    recommendedApp: 'Municipal water distribution sub-mains, industrial cooling towers.',
  },
  {
    id: 'dn150',
    nominalName: 'DN150 (6" Pipe)',
    boreMm: 150,
    maxFlowLps: 42.41,
    maxFlowGpm: 672.2,
    headLossAt2ms: 1.9,
    recommendedApp: 'City trunk water distribution lines, primary sewer force mains.',
  },
];

export function PipeFlowHeadLossCurveChart() {
  const [mounted, setMounted] = useState(false);
  const [selectedId, setSelectedId] = useState('dn50');

  useEffect(() => {
    setMounted(false);
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  const active = PIPE_SPECS.find((p) => p.id === selectedId) || PIPE_SPECS[1];

  // Head loss scales quadratically with velocity: h_f = f * (L/D) * (v² / 2g)
  // Compute head loss (m per 100m) for velocities from 0.5 to 3.0 m/s
  const velocities = [0.5, 1.0, 1.5, 1.8, 2.0, 2.4, 2.7, 3.0];
  const chartData = velocities.map((v) => {
    // scale from baseline at 2.0 m/s
    const h = active.headLossAt2ms * Math.pow(v / 2.0, 2);
    const flowLps = ((Math.PI * Math.pow(active.boreMm / 1000, 2)) / 4) * v * 1000;
    return {
      velocityLabel: `${v.toFixed(1)} m/s`,
      velocityNum: v,
      headLossM: Number(h.toFixed(2)),
      flowLps: Number(flowLps.toFixed(2)),
      pressurePsi: Number((h * 1.42233).toFixed(1)),
    };
  });

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
            Pipe Friction Head Loss vs. Flow Velocity Spectrum
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Darcy-Weisbach head loss (meters of water column per 100m of pipe run)
          </p>
        </div>
        <span className="inline-flex self-start rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700 ring-1 ring-inset ring-cyan-600/20 dark:bg-cyan-950/40 dark:text-cyan-300">
          Darcy-Weisbach &amp; ASHRAE Standards
        </span>
      </div>

      {/* Diameter Selection Pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {PIPE_SPECS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelectedId(p.id)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              selectedId === p.id
                ? 'bg-blue-600 text-white shadow-sm dark:bg-blue-500'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {p.nominalName}
          </button>
        ))}
      </div>

      {/* Recharts Area Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="headLossGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="velocityLabel" tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis unit=" m" tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip
              content={({ active: act, payload }) => {
                if (act && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-bold text-slate-900 dark:text-white">
                        Velocity: {d.velocityLabel}
                      </p>
                      <p className="text-cyan-600 dark:text-cyan-400 font-semibold mt-1">
                        Head Loss: {d.headLossM} m / 100m ({d.pressurePsi} psi)
                      </p>
                      <p className="text-blue-600 dark:text-blue-400">
                        Discharge: {d.flowLps} L/s ({(d.flowLps * 15.85).toFixed(1)} GPM)
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {d.velocityNum <= 2.4 ? '✅ Optimal Flow Zone' : '⚠️ Erosion / Water Hammer Risk'}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="headLossM"
              stroke="#06b6d4"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#headLossGradient)"
              name="Head Loss (m/100m)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Metric Stat Cards */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Internal Bore Diameter</p>
          <p className="mt-1 text-base font-bold text-blue-600 dark:text-blue-400">
            {active.boreMm} mm ({(active.boreMm / 25.4).toFixed(2)} in)
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Max Design Flow (2.4 m/s)</p>
          <p className="mt-1 text-base font-bold text-emerald-600 dark:text-emerald-400">
            {active.maxFlowLps} L/s ({active.maxFlowGpm} GPM)
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Loss at 2.0 m/s Velocity</p>
          <p className="mt-1 text-base font-bold text-cyan-600 dark:text-cyan-400">
            {active.headLossAt2ms} m / 100m
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Standard Material</p>
          <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
            Schedule 40 / PVC
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 italic">
        <strong>Recommended Engineering Application:</strong> {active.recommendedApp}
      </p>
    </div>
  );
}
