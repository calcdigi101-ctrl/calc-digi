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

const PE_ELEVATION_DATA = [
  { heightM: 10, peEarthKJ: 9.81, peMarsKJ: 3.72, peMoonKJ: 1.62, peJupiterKJ: 24.79 },
  { heightM: 25, peEarthKJ: 24.52, peMarsKJ: 9.30, peMoonKJ: 4.06, peJupiterKJ: 61.98 },
  { heightM: 50, peEarthKJ: 49.03, peMarsKJ: 18.60, peMoonKJ: 8.11, peJupiterKJ: 123.95 },
  { heightM: 75, peEarthKJ: 73.55, peMarsKJ: 27.90, peMoonKJ: 12.17, peJupiterKJ: 185.93 },
  { heightM: 100, peEarthKJ: 98.07, peMarsKJ: 37.20, peMoonKJ: 16.22, peJupiterKJ: 247.90 },
  { heightM: 150, peEarthKJ: 147.10, peMarsKJ: 55.80, peMoonKJ: 24.33, peJupiterKJ: 371.85 },
];

export function PotentialEnergyElevationChart() {
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
          Gravitational Potential Energy (PE = mgh) by Planetary Gravity (Mass = 100 kg)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Comparing energy storage capacity across celestial gravity fields: Earth (9.81), Mars (3.72), Moon (1.62), and Jupiter (24.79 m/s²).
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={PE_ELEVATION_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="heightM" tick={{ fontSize: 11 }} unit="m" />
            <YAxis tick={{ fontSize: 11 }} unit=" kJ" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-semibold text-slate-900 dark:text-white">Height: {data.heightM} meters</p>
                      <p className="mt-1 text-blue-600 dark:text-blue-400">Earth (9.81 m/s²): {data.peEarthKJ} kJ</p>
                      <p className="text-amber-600 dark:text-amber-400">Mars (3.72 m/s²): {data.peMarsKJ} kJ</p>
                      <p className="text-slate-500 dark:text-slate-400">Moon (1.62 m/s²): {data.peMoonKJ} kJ</p>
                      <p className="text-rose-600 dark:text-rose-400">Jupiter (24.8 m/s²): {data.peJupiterKJ} kJ</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }} />
            <Line type="monotone" dataKey="peEarthKJ" name="Earth (9.81 m/s²)" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="peMarsKJ" name="Mars (3.72 m/s²)" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="peMoonKJ" name="Moon (1.62 m/s²)" stroke="#94a3b8" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="peJupiterKJ" name="Jupiter (24.8 m/s²)" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
