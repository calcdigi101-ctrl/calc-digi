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

const ACCEL_BENCHMARK_DATA = [
  { vehicle: 'Top Fuel Dragster', zeroToHundredTime: 0.8, accelMps2: 34.7, gForce: 3.54, color: '#ef4444' },
  { vehicle: 'Formula 1 Car', zeroToHundredTime: 1.9, accelMps2: 14.6, gForce: 1.49, color: '#f97316' },
  { vehicle: 'Performance EV Plaid', zeroToHundredTime: 2.1, accelMps2: 13.2, gForce: 1.35, color: '#eab308' },
  { vehicle: 'Sports Coupe (911)', zeroToHundredTime: 3.6, accelMps2: 7.7, gForce: 0.79, color: '#10b981' },
  { vehicle: 'Typical Passenger Sedan', zeroToHundredTime: 8.5, accelMps2: 3.3, gForce: 0.33, color: '#3b82f6' },
  { vehicle: 'Freight Locomotive', zeroToHundredTime: 120.0, accelMps2: 0.23, gForce: 0.02, color: '#6366f1' },
];

export function AccelerationProfilesChart() {
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
          Linear Acceleration & Relative g-Force Across Vehicle Classes (0–100 km/h)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Comparing mean acceleration rate (m/s²) and sustained human g-force ratio during initial acceleration phase.
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ACCEL_BENCHMARK_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="vehicle" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" />
            <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" tick={{ fontSize: 11 }} unit=" m/s²" />
            <YAxis yAxisId="right" orientation="right" stroke="#ef4444" tick={{ fontSize: 11 }} unit=" g" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-semibold text-slate-900 dark:text-white">{data.vehicle}</p>
                      <p className="mt-1 text-blue-600 dark:text-blue-400">Mean Acceleration: {data.accelMps2} m/s²</p>
                      <p className="text-rose-600 dark:text-rose-400">Sustained G-Force: {data.gForce} g</p>
                      <p className="text-slate-500">0–100 km/h Elapsed: {data.zeroToHundredTime}s</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }} />
            <Bar yAxisId="left" dataKey="accelMps2" name="Acceleration (m/s²)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="gForce" name="Relative G-Force (g)" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
