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

const GRAVITY_INVERSE_DATA = [
  { distRatio: '1.0× (Surface)', distKm: 6371, forcePct: 100.0, gAcc: 9.81 },
  { distRatio: '1.5×', distKm: 9557, forcePct: 44.4, gAcc: 4.36 },
  { distRatio: '2.0×', distKm: 12742, forcePct: 25.0, gAcc: 2.45 },
  { distRatio: '3.0×', distKm: 19113, forcePct: 11.1, gAcc: 1.09 },
  { distRatio: '4.0×', distKm: 25484, forcePct: 6.3, gAcc: 0.61 },
  { distRatio: '5.0×', distKm: 31855, forcePct: 4.0, gAcc: 0.39 },
  { distRatio: '6.6× (Geo Orbit)', distKm: 42164, forcePct: 2.3, gAcc: 0.22 },
];

export function GravitationalInverseSquareChart() {
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
          Newtonian Gravitational Decay vs Planetary Separation (1/r² Law)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Gravitational attraction diminishes inversely with the square of distance from planetary center of mass (F ∝ 1/r²).
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={GRAVITY_INVERSE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="distRatio" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" tick={{ fontSize: 11 }} unit="%" />
            <YAxis yAxisId="right" orientation="right" stroke="#10b981" tick={{ fontSize: 11 }} unit=" m/s²" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-semibold text-slate-900 dark:text-white">Distance: {data.distKm.toLocaleString()} km ({data.distRatio})</p>
                      <p className="mt-1 text-blue-600 dark:text-blue-400">Relative Gravity Strength: {data.forcePct}%</p>
                      <p className="text-emerald-600 dark:text-emerald-400">Local Gravitational Pull: {data.gAcc} m/s²</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }} />
            <Line yAxisId="left" type="monotone" dataKey="forcePct" name="Gravity Force (% of Sea Level)" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line yAxisId="right" type="monotone" dataKey="gAcc" name="Local Acceleration (m/s²)" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
