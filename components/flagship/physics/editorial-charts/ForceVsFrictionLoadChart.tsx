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

const FRICTION_LOAD_DATA = [
  { surface: 'Ice/Teflon (μ=0.04)', normalForceN: 981, frictionForceN: 39, inertialForceN: 300, totalForceN: 339 },
  { surface: 'Polished Steel (μ=0.15)', normalForceN: 981, frictionForceN: 147, inertialForceN: 300, totalForceN: 447 },
  { surface: 'Hardwood (μ=0.30)', normalForceN: 981, frictionForceN: 294, inertialForceN: 300, totalForceN: 594 },
  { surface: 'Concrete (μ=0.60)', normalForceN: 981, frictionForceN: 589, inertialForceN: 300, totalForceN: 889 },
  { surface: 'Dry Rubber (μ=0.85)', normalForceN: 981, frictionForceN: 834, inertialForceN: 300, totalForceN: 1134 },
];

export function ForceVsFrictionLoadChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/50 animate-pulse h-80" />;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Surface Friction Drag vs Required Motive Force (Mass = 100 kg, Accel = 3.0 m/s²)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Total motive thrust must satisfy F_total = m·a + μ·m·g. High-friction interfaces drastically escalate drive energy demands.
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={FRICTION_LOAD_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="surface" tick={{ fontSize: 10 }} angle={-10} textAnchor="end" />
            <YAxis tick={{ fontSize: 11 }} unit=" N" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-semibold text-slate-900 dark:text-white">{data.surface}</p>
                      <p className="mt-1 text-blue-600 dark:text-blue-400">Inertial Force (ma): {data.inertialForceN} N</p>
                      <p className="text-rose-600 dark:text-rose-400">Friction Drag (μN): {data.frictionForceN} N</p>
                      <p className="font-bold text-slate-900 dark:text-white pt-1 border-t border-slate-200 mt-1">Total Motive Thrust: {data.totalForceN} N</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }} />
            <Bar dataKey="inertialForceN" name="Inertial Force (m·a)" fill="#3b82f6" stackId="a" />
            <Bar dataKey="frictionForceN" name="Frictional Drag (μ·m·g)" fill="#ef4444" stackId="a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
