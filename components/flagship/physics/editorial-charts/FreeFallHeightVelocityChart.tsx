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

const FREE_FALL_CURVES = [
  { heightM: 5, timeS: 1.01, velocityMps: 9.9, velocityKmh: 35.6 },
  { heightM: 15, timeS: 1.75, velocityMps: 17.2, velocityKmh: 61.9 },
  { heightM: 30, timeS: 2.47, velocityMps: 24.3, velocityKmh: 87.5 },
  { heightM: 50, timeS: 3.19, velocityMps: 31.3, velocityKmh: 112.7 },
  { heightM: 75, timeS: 3.91, velocityMps: 38.4, velocityKmh: 138.2 },
  { heightM: 100, timeS: 4.52, velocityMps: 44.3, velocityKmh: 159.5 },
  { heightM: 150, timeS: 5.53, velocityMps: 54.2, velocityKmh: 195.1 },
  { heightM: 200, timeS: 6.39, velocityMps: 62.6, velocityKmh: 225.4 },
];

export function FreeFallHeightVelocityChart() {
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
          Vacuum Free Fall Duration & Impact Velocity vs Elevation (g = 9.81 m/s²)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Terminal impact speed scales with square root of height (v = √(2gh)), with descent duration t = √(2h/g).
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={FREE_FALL_CURVES} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="heightM" tick={{ fontSize: 11 }} unit="m" />
            <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" tick={{ fontSize: 11 }} unit="s" />
            <YAxis yAxisId="right" orientation="right" stroke="#10b981" tick={{ fontSize: 11 }} unit=" km/h" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-semibold text-slate-900 dark:text-white">Drop Height: {data.heightM} meters</p>
                      <p className="mt-1 text-blue-600 dark:text-blue-400">Descent Duration: {data.timeS} seconds</p>
                      <p className="text-emerald-600 dark:text-emerald-400">Terminal Velocity: {data.velocityMps} m/s ({data.velocityKmh} km/h)</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }} />
            <Line yAxisId="left" type="monotone" dataKey="timeS" name="Fall Time (Seconds)" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line yAxisId="right" type="monotone" dataKey="velocityKmh" name="Impact Velocity (km/h)" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
