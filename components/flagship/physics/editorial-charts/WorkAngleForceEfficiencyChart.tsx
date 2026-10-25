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

const WORK_EFFICIENCY_DATA = [
  { angle: '0° (Parallel)', cosTheta: 1.0, parallelPct: 100, perpPct: 0, effectiveWorkKJ: 50.0 },
  { angle: '15°', cosTheta: 0.966, parallelPct: 96.6, perpPct: 25.9, effectiveWorkKJ: 48.3 },
  { angle: '30°', cosTheta: 0.866, parallelPct: 86.6, perpPct: 50.0, effectiveWorkKJ: 43.3 },
  { angle: '45°', cosTheta: 0.707, parallelPct: 70.7, perpPct: 70.7, effectiveWorkKJ: 35.4 },
  { angle: '60°', cosTheta: 0.500, parallelPct: 50.0, perpPct: 86.6, effectiveWorkKJ: 25.0 },
  { angle: '75°', cosTheta: 0.259, parallelPct: 25.9, perpPct: 96.6, effectiveWorkKJ: 12.9 },
  { angle: '90° (Perp)', cosTheta: 0.0, parallelPct: 0.0, perpPct: 100.0, effectiveWorkKJ: 0.0 },
];

export function WorkAngleForceEfficiencyChart() {
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
          Mechanical Work Efficiency vs Force Angle (W = F·d·cosθ | F=1,000 N, d=50 m)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Effective work degrades with the cosine of the angle: perpendicular forces (90°) perform zero mechanical work.
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={WORK_EFFICIENCY_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="angle" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} unit=" kJ" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-semibold text-slate-900 dark:text-white">Applied Force Angle: {data.angle}</p>
                      <p className="mt-1 text-emerald-600 dark:text-emerald-400">Effective Work Done: {data.effectiveWorkKJ} kJ</p>
                      <p className="text-blue-600 dark:text-blue-400">Vector Efficiency Factor: {data.cosTheta}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }} />
            <Bar dataKey="effectiveWorkKJ" name="Effective Mechanical Work (kJ)" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
