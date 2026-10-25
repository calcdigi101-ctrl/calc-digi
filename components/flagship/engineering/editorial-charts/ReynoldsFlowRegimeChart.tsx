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

interface FluidRegimeScenario {
  id: string;
  name: string;
  fluid: string;
  densityKgM3: number;
  viscosityPaS: number;
  pipeDiamMm: number;
  reAt1ms: number;
  criticalVelocityLaminarMs: number;
  application: string;
}

const REGIME_SCENARIOS: FluidRegimeScenario[] = [
  {
    id: 'water25',
    name: 'Water in DN25 (1" Pipe)',
    fluid: 'Clean Water @ 20°C',
    densityKgM3: 998,
    viscosityPaS: 0.001002,
    pipeDiamMm: 25,
    reAt1ms: 24900,
    criticalVelocityLaminarMs: 0.092,
    application: 'Commercial building domestic water supply lines and plumbing risers.',
  },
  {
    id: 'oil15',
    name: 'Hydraulic Oil in 15mm Line',
    fluid: 'ISO VG 46 Oil @ 40°C',
    densityKgM3: 870,
    viscosityPaS: 0.040,
    pipeDiamMm: 15,
    reAt1ms: 326,
    criticalVelocityLaminarMs: 7.05,
    application: 'Industrial CNC machine hydraulic cylinders and power steering lines (stays laminar).',
  },
  {
    id: 'air200',
    name: 'Air in 200mm HVAC Duct',
    fluid: 'Standard Air @ 20°C',
    densityKgM3: 1.204,
    viscosityPaS: 0.0000181,
    pipeDiamMm: 200,
    reAt1ms: 13304,
    criticalVelocityLaminarMs: 0.173,
    application: 'Commercial ventilation supply ducts and building return air plenums.',
  },
  {
    id: 'micro100',
    name: 'Microfluidic 100µm Channel',
    fluid: 'Water / Reagent @ 20°C',
    densityKgM3: 1000,
    viscosityPaS: 0.001,
    pipeDiamMm: 0.1,
    reAt1ms: 100,
    criticalVelocityLaminarMs: 23.0,
    application: 'Biomedical lab-on-a-chip diagnostic sensors and DNA sequencing cartridges.',
  },
];

export function ReynoldsFlowRegimeChart() {
  const [mounted, setMounted] = useState(false);
  const [selectedId, setSelectedId] = useState('water25');

  useEffect(() => {
    setMounted(false);
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  const active = REGIME_SCENARIOS.find((s) => s.id === selectedId) || REGIME_SCENARIOS[0];

  // Compute Reynolds number vs flow velocity (0.2 m/s to 3.0 m/s)
  const velocities = [0.2, 0.5, 0.8, 1.0, 1.5, 2.0, 2.5, 3.0];
  const chartData = velocities.map((v) => {
    const Re = (active.densityKgM3 * v * (active.pipeDiamMm / 1000)) / active.viscosityPaS;
    let regime = 'Laminar';
    if (Re > 4000) regime = 'Turbulent';
    else if (Re >= 2300) regime = 'Transitional';

    return {
      velocityLabel: `${v.toFixed(1)} m/s`,
      velocityNum: v,
      reynoldsNum: Math.round(Re),
      regime,
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
            Reynolds Number Flow Regime Continuum vs. Velocity
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Hydrodynamic boundary between laminar streamlines (Re &lt; 2,300) and chaotic turbulent mixing (Re &gt; 4,000)
          </p>
        </div>
        <span className="inline-flex self-start rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700 ring-1 ring-inset ring-cyan-600/20 dark:bg-cyan-950/40 dark:text-cyan-300">
          Moody &amp; Colebrook-White
        </span>
      </div>

      {/* Scenario Pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {REGIME_SCENARIOS.map((s) => (
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
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="reynoldsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0284c7" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="velocityLabel" tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip
              content={({ active: act, payload }) => {
                if (act && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-bold text-slate-900 dark:text-white">Velocity: {d.velocityLabel}</p>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold mt-1">
                        Reynolds Number: {d.reynoldsNum.toLocaleString()}
                      </p>
                      <p className="text-slate-600 dark:text-slate-300 font-medium">
                        Regime: {d.regime} Flow
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="reynoldsNum"
              stroke="#0284c7"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#reynoldsGradient)"
              name="Reynolds Number (Re)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Selected Scenario Stat Cards */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Re at 1.0 m/s Velocity</p>
          <p className="mt-1 text-base font-bold text-blue-600 dark:text-blue-400">
            {active.reAt1ms.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Critical Laminar Limit</p>
          <p className="mt-1 text-base font-bold text-emerald-600 dark:text-emerald-400">
            {active.criticalVelocityLaminarMs < 0.01 ? '< 0.01 m/s' : `${active.criticalVelocityLaminarMs.toFixed(2)} m/s`}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Internal Diameter (D)</p>
          <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
            {active.pipeDiamMm} mm
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Working Fluid</p>
          <p className="mt-1 text-xs font-bold text-slate-900 dark:text-white truncate" title={active.fluid}>
            {active.fluid}
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 italic">
        <strong>Flow Transport Application:</strong> {active.application}
      </p>
    </div>
  );
}
