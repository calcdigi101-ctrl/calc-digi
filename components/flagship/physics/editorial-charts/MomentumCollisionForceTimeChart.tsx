'use client';

import React, { useState, useEffect } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const COLLISION_FORCE_DATA = [
  { durationMs: 10, timeS: 0.010, impactForceKN: 375.0, gForce: 25.5 },
  { durationMs: 25, timeS: 0.025, impactForceKN: 150.0, gForce: 10.2 },
  { durationMs: 50, timeS: 0.050, impactForceKN: 75.0, gForce: 5.1 },
  { durationMs: 80, timeS: 0.080, impactForceKN: 46.9, gForce: 3.2 },
  { durationMs: 100, timeS: 0.100, impactForceKN: 37.5, gForce: 2.6 },
  { durationMs: 150, timeS: 0.150, impactForceKN: 25.0, gForce: 1.7 },
  { durationMs: 200, timeS: 0.200, impactForceKN: 18.8, gForce: 1.3 },
];

export function MomentumCollisionForceTimeChart() {
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
          Collision Impact Force vs Crumple Duration (Mass = 1,500 kg, v = 90 km/h)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Impulse-Momentum theorem (F_avg = Δp / Δt): extending collision duration tenfold from 10ms to 100ms reduces peak bodily impact force by 90%.
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={COLLISION_FORCE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="durationMs" tick={{ fontSize: 11 }} unit=" ms" />
            <YAxis yAxisId="left" orientation="left" stroke="#ef4444" tick={{ fontSize: 11 }} unit=" kN" />
            <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" tick={{ fontSize: 11 }} unit=" g" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-semibold text-slate-900 dark:text-white">Impact Duration: {data.durationMs} ms ({data.timeS} s)</p>
                      <p className="mt-1 text-rose-600 dark:text-rose-400">Average Force: {data.impactForceKN} kN</p>
                      <p className="text-blue-600 dark:text-blue-400">Deceleration G-Force: {data.gForce} g</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }} />
            <Line yAxisId="left" type="monotone" dataKey="impactForceKN" name="Impact Force (kN)" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line yAxisId="right" type="monotone" dataKey="gForce" name="Deceleration (g-force)" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
