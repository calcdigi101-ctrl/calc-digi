'use client';

import React, { useState, useEffect } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const VALUE_DATA = [
  { medium: 'Live Service Game', hours: 300, cost: 70, costPerHour: 0.23, category: 'Gaming' },
  { medium: 'Open World RPG', hours: 80, cost: 70, costPerHour: 0.88, category: 'Gaming' },
  { medium: 'Action Adventure', hours: 35, cost: 70, costPerHour: 2.00, category: 'Gaming' },
  { medium: 'Linear Campaign', hours: 15, cost: 60, costPerHour: 4.00, category: 'Gaming' },
  { medium: 'Movie Theater Outing', hours: 2.5, cost: 28, costPerHour: 11.20, category: 'Cinema' },
  { medium: 'Live Concert Night', hours: 4.0, cost: 170, costPerHour: 42.50, category: 'Live Music' },
];

export function VideoGameCostPerHourValueChart() {
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
          Entertainment Cost-Per-Hour Comparison ($ USD / Hour of Enjoyment)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Comparing video games against traditional entertainment mediums like movie theaters and live concerts
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={VALUE_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} vertical={false} />
            <XAxis dataKey="medium" tick={{ fontSize: 9.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} unit="$" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900 text-xs">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">{data.medium}</div>
                      <div className="text-blue-600 font-bold">${data.costPerHour.toFixed(2)} / Hour of Entertainment</div>
                      <div className="text-slate-600 dark:text-slate-300">Total Purchase: ${data.cost} for ~{data.hours} hours</div>
                      <div className="text-slate-400 mt-1">Medium: {data.category}</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="costPerHour" name="Cost Per Hour ($/hr)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Open-World RPG</span>
          <strong className="text-emerald-600 dark:text-emerald-400">$0.88 / Hour Value</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Action Campaign</span>
          <strong className="text-blue-600 dark:text-blue-400">$2.00 / Hour Value</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Movie Cinema</span>
          <strong className="text-amber-600 dark:text-amber-400">$11.20 / Hour</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Live Concerts</span>
          <strong className="text-rose-600 dark:text-rose-400">$42.50 / Hour</strong>
        </div>
      </div>
    </div>
  );
}
