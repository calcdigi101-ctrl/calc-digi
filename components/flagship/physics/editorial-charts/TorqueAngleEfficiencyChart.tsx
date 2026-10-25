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

const TORQUE_ANGLE_DATA = [
  { angle: '0° (Axial Pull)', sinTheta: 0.0, torqueNm: 0.0, efficiencyPct: 0 },
  { angle: '15°', sinTheta: 0.259, torqueNm: 38.8, efficiencyPct: 25.9 },
  { angle: '30°', sinTheta: 0.500, torqueNm: 75.0, efficiencyPct: 50.0 },
  { angle: '45°', sinTheta: 0.707, torqueNm: 106.1, efficiencyPct: 70.7 },
  { angle: '60°', sinTheta: 0.866, torqueNm: 129.9, efficiencyPct: 86.6 },
  { angle: '75°', sinTheta: 0.966, torqueNm: 144.9, efficiencyPct: 96.6 },
  { angle: '90° (Perpendicular)', sinTheta: 1.000, torqueNm: 150.0, efficiencyPct: 100.0 },
];

export function TorqueAngleEfficiencyChart() {
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
          Torque Generation vs Force Angle (τ = F·r·sinθ | F=250 N, r=0.60 m)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Rotational torque peaks at 90° (perpendicular to lever arm) and collapses to zero when force aligns with the wrench shaft.
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={TORQUE_ANGLE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="angle" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} unit=" N·m" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-semibold text-slate-900 dark:text-white">Wrench Angle: {data.angle}</p>
                      <p className="mt-1 text-emerald-600 dark:text-emerald-400">Torque: {data.torqueNm} N·m</p>
                      <p className="text-blue-600 dark:text-blue-400">Lever Efficiency: {data.efficiencyPct}%</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }} />
            <Bar dataKey="torqueNm" name="Torque Moment (N·m)" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
