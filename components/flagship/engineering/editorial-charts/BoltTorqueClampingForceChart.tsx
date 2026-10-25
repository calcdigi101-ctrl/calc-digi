'use client';

import React, { useState, useEffect } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface BoltBenchmark {
  size: string;
  name: string;
  proofLoad88Kn: number;
  torqueOiled88Nm: number;
  torqueDry88Nm: number;
  torqueAntiseize88Nm: number;
  clampingForceKn: number;
  commonRole: string;
}

const BOLT_DATA: BoltBenchmark[] = [
  {
    size: 'M6',
    name: 'M6 (Pitch 1.0)',
    proofLoad88Kn: 11.7,
    torqueOiled88Nm: 9.5,
    torqueDry88Nm: 12.6,
    torqueAntiseize88Nm: 7.6,
    clampingForceKn: 8.7,
    commonRole: 'Sheet metal enclosures, small brackets, motorcycle fairings.',
  },
  {
    size: 'M8',
    name: 'M8 (Pitch 1.25)',
    proofLoad88Kn: 21.2,
    torqueOiled88Nm: 23.0,
    torqueDry88Nm: 30.6,
    torqueAntiseize88Nm: 18.4,
    clampingForceKn: 15.9,
    commonRole: 'Automotive engine water pumps, valve covers, conveyor guides.',
  },
  {
    size: 'M10',
    name: 'M10 (Pitch 1.5)',
    proofLoad88Kn: 33.6,
    torqueOiled88Nm: 45.4,
    torqueDry88Nm: 60.5,
    torqueAntiseize88Nm: 36.3,
    clampingForceKn: 25.2,
    commonRole: 'Alternator brackets, suspension sway bar end-links, machinery mounts.',
  },
  {
    size: 'M12',
    name: 'M12 (Pitch 1.75)',
    proofLoad88Kn: 48.9,
    torqueOiled88Nm: 79.2,
    torqueDry88Nm: 105.6,
    torqueAntiseize88Nm: 63.4,
    clampingForceKn: 36.7,
    commonRole: 'Suspension control arms, transmission bellhousings, structural brackets.',
  },
  {
    size: 'M16',
    name: 'M16 (Pitch 2.0)',
    proofLoad88Kn: 91.1,
    torqueOiled88Nm: 196.8,
    torqueDry88Nm: 262.4,
    torqueAntiseize88Nm: 157.4,
    clampingForceKn: 68.3,
    commonRole: 'Heavy truck wheel hubs, civil structural steel connections, cranes.',
  },
  {
    size: 'M20',
    name: 'M20 (Pitch 2.5)',
    proofLoad88Kn: 142.1,
    torqueOiled88Nm: 383.7,
    torqueDry88Nm: 511.6,
    torqueAntiseize88Nm: 306.9,
    clampingForceKn: 106.6,
    commonRole: 'High-pressure industrial pipe flanges, foundation anchor hold-down bolts.',
  },
];

export function BoltTorqueClampingForceChart() {
  const [mounted, setMounted] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M12');

  useEffect(() => {
    setMounted(false);
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  const active = BOLT_DATA.find((b) => b.size === selectedSize) || BOLT_DATA[3];

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
            Fastener Tightening Torque vs. Surface Friction Condition
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Impact of thread lubrication on required torque (N·m) to reach 75% proof preload (ISO 898-1 Class 8.8)
          </p>
        </div>
        <span className="inline-flex self-start rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-950/40 dark:text-amber-300">
          ISO 898-1 &amp; VDI 2230
        </span>
      </div>

      {/* Size Selector Pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {BOLT_DATA.map((b) => (
          <button
            key={b.size}
            type="button"
            onClick={() => setSelectedSize(b.size)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              selectedSize === b.size
                ? 'bg-blue-600 text-white shadow-sm dark:bg-blue-500'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {b.size} ({b.clampingForceKn} kN clamp)
          </button>
        ))}
      </div>

      {/* Recharts Bar Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={BOLT_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="size" tick={{ fontSize: 11, fill: '#64748b' }} />
            <YAxis unit=" Nm" tick={{ fontSize: 11, fill: '#64748b' }} />
            <Tooltip
              content={({ active: act, payload }) => {
                if (act && payload && payload.length) {
                  const d = payload[0].payload as BoltBenchmark;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-bold text-slate-900 dark:text-white">{d.name}</p>
                      <p className="text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                        Clamp Preload: {d.clampingForceKn} kN ({(d.clampingForceKn * 224.8).toFixed(0)} lbf)
                      </p>
                      <div className="mt-1 space-y-0.5 text-slate-600 dark:text-slate-300">
                        <p>• Oiled (K=0.15): {d.torqueOiled88Nm} N·m ({(d.torqueOiled88Nm * 0.7376).toFixed(1)} lb·ft)</p>
                        <p>• Dry (K=0.20): {d.torqueDry88Nm} N·m ({(d.torqueDry88Nm * 0.7376).toFixed(1)} lb·ft)</p>
                        <p>• Anti-Seize (K=0.12): {d.torqueAntiseize88Nm} N·m</p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
              formatter={(value) => <span className="text-slate-600 dark:text-slate-400">{value}</span>}
            />
            <Bar dataKey="torqueOiled88Nm" name="Lightly Oiled (K=0.15)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="torqueDry88Nm" name="Dry Zinc (K=0.20)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="torqueAntiseize88Nm" name="Anti-Seize Paste (K=0.12)" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Selected Fastener Stat Cards */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Target Preload Force</p>
          <p className="mt-1 text-base font-bold text-emerald-600 dark:text-emerald-400">
            {active.clampingForceKn} kN ({(active.clampingForceKn * 224.8).toFixed(0)} lbf)
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Shop Oiled Torque</p>
          <p className="mt-1 text-base font-bold text-blue-600 dark:text-blue-400">
            {active.torqueOiled88Nm} N·m ({(active.torqueOiled88Nm * 0.7376).toFixed(1)} lb·ft)
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Dry Unlubricated Torque</p>
          <p className="mt-1 text-base font-bold text-amber-600 dark:text-amber-400">
            {active.torqueDry88Nm} N·m ({(active.torqueDry88Nm * 0.7376).toFixed(1)} lb·ft)
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">Bolt Proof Load</p>
          <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
            {active.proofLoad88Kn} kN (Class 8.8)
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 italic">
        <strong>Standard Joint Application:</strong> {active.commonRole}
      </p>
    </div>
  );
}
