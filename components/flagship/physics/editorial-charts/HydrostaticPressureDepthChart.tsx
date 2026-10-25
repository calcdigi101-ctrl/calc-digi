'use client';

import React, { useState, useEffect } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const HYDROSTATIC_DATA = [
  { depthM: 0, depthFt: 0, atmBar: 1.01, hydroBar: 0.0, totalBar: 1.01, psi: 14.7 },
  { depthM: 10, depthFt: 33, atmBar: 1.01, hydroBar: 1.01, totalBar: 2.02, psi: 29.3 },
  { depthM: 20, depthFt: 66, atmBar: 1.01, hydroBar: 2.01, totalBar: 3.02, psi: 43.8 },
  { depthM: 30, depthFt: 98, atmBar: 1.01, hydroBar: 3.02, totalBar: 4.03, psi: 58.4 },
  { depthM: 40, depthFt: 131, atmBar: 1.01, hydroBar: 4.02, totalBar: 5.03, psi: 73.0 },
  { depthM: 60, depthFt: 197, atmBar: 1.01, hydroBar: 6.03, totalBar: 7.04, psi: 102.1 },
  { depthM: 100, depthFt: 328, atmBar: 1.01, hydroBar: 10.05, totalBar: 11.06, psi: 160.4 },
];

export function HydrostaticPressureDepthChart() {
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
          Underwater Absolute Pressure vs Seawater Depth (1 Bar per 10m Depth)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Total absolute subsea pressure equals atmospheric surface baseline plus linear hydrostatic gauge depth (P_total = P_atm + ρgh).
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={HYDROSTATIC_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="depthM" tick={{ fontSize: 11 }} unit="m" />
            <YAxis tick={{ fontSize: 11 }} unit=" bar" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-semibold text-slate-900 dark:text-white">Depth: {data.depthM} m ({data.depthFt} ft)</p>
                      <p className="mt-1 text-blue-600 dark:text-blue-400">Surface Atmospheric: {data.atmBar} bar</p>
                      <p className="text-emerald-600 dark:text-emerald-400">Hydrostatic Water Column: {data.hydroBar} bar</p>
                      <p className="font-bold text-slate-900 dark:text-white pt-1 border-t border-slate-200 mt-1">Total Pressure: {data.totalBar} bar ({data.psi} psi)</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }} />
            <Area type="monotone" dataKey="atmBar" name="Atmospheric Baseline (1 atm)" stackId="1" stroke="#3b82f6" fill="#dbeafe" />
            <Area type="monotone" dataKey="hydroBar" name="Hydrostatic Gauge (ρ·g·h)" stackId="1" stroke="#10b981" fill="#d1fae5" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
