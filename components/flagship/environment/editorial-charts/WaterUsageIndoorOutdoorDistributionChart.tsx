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

const WATER_BREAKDOWN_DATA = [
  { category: 'Showers', standard: 85, waterSense: 58, savingsPct: 32 },
  { category: 'Toilets', standard: 32, waterSense: 23, savingsPct: 28 },
  { category: 'Laundry', standard: 27, waterSense: 12, savingsPct: 56 },
  { category: 'Faucets / Sinks', standard: 48, waterSense: 28, savingsPct: 42 },
  { category: 'Dishwasher', standard: 5, waterSense: 3, savingsPct: 40 },
  { category: 'Lawn Irrigation', standard: 75, waterSense: 45, savingsPct: 40 },
];

export function WaterUsageIndoorOutdoorDistributionChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/50 animate-pulse h-80" />
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Household Daily Water Usage: Standard Fixtures vs. EPA WaterSense (Gallons/Day)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Family of 4 consumption breakdown across end-uses highlighting 38% whole-home conservation potential
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={WATER_BREAKDOWN_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} vertical={false} />
            <XAxis dataKey="category" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} unit=" gal" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-800 dark:bg-slate-950 text-xs">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">{data.category} Usage</div>
                      <div className="text-amber-600 dark:text-amber-400">Standard Fixtures: <span className="font-mono font-bold">{data.standard} gal/day</span></div>
                      <div className="text-cyan-600 dark:text-cyan-400">WaterSense Efficient: <span className="font-mono font-bold">{data.waterSense} gal/day</span></div>
                      <div className="mt-1 pt-1 border-t border-slate-100 font-bold text-emerald-600 dark:text-emerald-400">
                        Conserved: -{data.standard - data.waterSense} gal/day ({data.savingsPct}% reduction)
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
            <Bar dataKey="standard" name="Standard Fixtures (gal/day)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="waterSense" name="EPA WaterSense (gal/day)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span>Upgrading to WaterSense fixtures saves ~37,000 gallons and $420+ annually per household</span>
        <span>Source: US EPA WaterSense & Water Research Foundation (WRF)</span>
      </div>
    </div>
  );
}
