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

const TCO_DATA = [
  { year: 'Year 0', gasTco: 32000, evTco: 36500, cumulativeNetSavings: -4500 },
  { year: 'Year 1', gasTco: 34650, evTco: 37700, cumulativeNetSavings: -3050 },
  { year: 'Year 2', gasTco: 37400, evTco: 38950, cumulativeNetSavings: -1550 },
  { year: 'Year 3', gasTco: 40250, evTco: 40250, cumulativeNetSavings: 0 }, // Breakeven point
  { year: 'Year 4', gasTco: 43200, evTco: 41600, cumulativeNetSavings: 1600 },
  { year: 'Year 5', gasTco: 46250, evTco: 43000, cumulativeNetSavings: 3250 },
  { year: 'Year 6', gasTco: 49400, evTco: 44450, cumulativeNetSavings: 4950 },
  { year: 'Year 7', gasTco: 52650, evTco: 45950, cumulativeNetSavings: 6700 },
  { year: 'Year 8', gasTco: 56000, evTco: 47500, cumulativeNetSavings: 8500 },
  { year: 'Year 9', gasTco: 59450, evTco: 49100, cumulativeNetSavings: 10350 },
  { year: 'Year 10', gasTco: 63000, evTco: 50750, cumulativeNetSavings: 12250 },
];

export function ElectricVehicleVsGasTcoSavingsChart() {
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
          10-Year Total Cost of Ownership (TCO): Gasoline Vehicle vs. Electric Vehicle
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Cumulative spend including purchase delta, fuel, maintenance, and brake wear with Year 3 breakeven
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={TCO_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="gasColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="evColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} vertical={false} />
            <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 10, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-800 dark:bg-slate-950 text-xs">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">{data.year} Cumulative Spend</div>
                      <div className="text-red-600 dark:text-red-400">Gas Vehicle TCO: <span className="font-mono font-bold">${data.gasTco.toLocaleString()}</span></div>
                      <div className="text-emerald-600 dark:text-emerald-400">Electric Vehicle TCO: <span className="font-mono font-bold">${data.evTco.toLocaleString()}</span></div>
                      <div className="mt-1 pt-1 border-t border-slate-100 font-bold text-blue-600 dark:text-blue-400">
                        {data.cumulativeNetSavings >= 0 ? `Net EV Advantage: +$${data.cumulativeNetSavings.toLocaleString()}` : `Initial Premium Remaining: $${Math.abs(data.cumulativeNetSavings).toLocaleString()}`}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
            <Area type="monotone" dataKey="gasTco" name="Gasoline Vehicle Cumulative Cost" stroke="#ef4444" strokeWidth={2.2} fillOpacity={1} fill="url(#gasColor)" />
            <Area type="monotone" dataKey="evTco" name="EV Cumulative Cost" stroke="#10b981" strokeWidth={2.2} fillOpacity={1} fill="url(#evColor)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span>Assumes 13,500 mi/yr, $3.65/gal gasoline, $0.16/kWh charging, $450/yr maintenance advantage</span>
        <span>10-Year Net Wealth Gain: $12,250+</span>
      </div>
    </div>
  );
}
