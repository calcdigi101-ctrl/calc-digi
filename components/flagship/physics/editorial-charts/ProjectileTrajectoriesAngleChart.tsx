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

const TRAJECTORY_ANGLE_DATA = [
  { angle: '15°', horizontalRangeM: 63.7, apexHeightM: 4.3, flightTimeS: 1.88, color: '#f59e0b' },
  { angle: '30°', horizontalRangeM: 110.3, apexHeightM: 15.9, flightTimeS: 3.57, color: '#3b82f6' },
  { angle: '45° (Max Range)', horizontalRangeM: 127.4, apexHeightM: 31.9, flightTimeS: 5.05, color: '#10b981' },
  { angle: '60°', horizontalRangeM: 110.3, apexHeightM: 47.8, flightTimeS: 6.18, color: '#8b5cf6' },
  { angle: '75°', horizontalRangeM: 63.7, apexHeightM: 59.4, flightTimeS: 6.89, color: '#ec4899' },
];

export function ProjectileTrajectoriesAngleChart() {
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
          Ballistic Range & Apex Altitude by Launch Angle (Initial v₀ = 35 m/s)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Complementary angles (30° & 60°, 15° & 75°) yield identical horizontal range, but higher angles produce higher apex and prolonged flight time.
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={TRAJECTORY_ANGLE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="angle" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} unit="m" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-700 dark:bg-slate-800 text-xs">
                      <p className="font-semibold text-slate-900 dark:text-white">Launch Angle: {data.angle}</p>
                      <p className="mt-1 text-emerald-600 dark:text-emerald-400">Horizontal Range: {data.horizontalRangeM} m</p>
                      <p className="text-indigo-600 dark:text-indigo-400">Maximum Apex: {data.apexHeightM} m</p>
                      <p className="text-slate-500">Flight Time: {data.flightTimeS} seconds</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }} />
            <Bar dataKey="horizontalRangeM" name="Horizontal Range (m)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="apexHeightM" name="Apex Altitude (m)" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
