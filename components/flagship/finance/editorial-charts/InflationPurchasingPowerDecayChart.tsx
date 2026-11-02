'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const INFLATION_DECAY_DATA = [
  { year: 'Yr 0', power2Pct: 100000, power35Pct: 100000, power5Pct: 100000 },
  { year: 'Yr 5', power2Pct: 90570, power35Pct: 84200, power5Pct: 78350 },
  { year: 'Yr 10', power2Pct: 82030, power35Pct: 70890, power5Pct: 61390 },
  { year: 'Yr 15', power2Pct: 74300, power35Pct: 59690, power5Pct: 48100 },
  { year: 'Yr 20', power2Pct: 67300, power35Pct: 50260, power5Pct: 37690 },
  { year: 'Yr 25', power2Pct: 60950, power35Pct: 42310, power5Pct: 29530 },
  { year: 'Yr 30', power2Pct: 55210, power35Pct: 35630, power5Pct: 23140 },
];

export function InflationPurchasingPowerDecayChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Inflation Purchasing Power Erosion: $100,000 Real Value Over 30 Years
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real purchasing power decay of uninvested cash under 2.0% (Fed Target), 3.5% (Historical Avg), and 5.0% inflation scenarios.
          </p>
        </div>
        <span className="self-start rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
          30-Yr Erosion: Up to −76.8%
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={INFLATION_DECAY_DATA} margin={{ top: 10, right: 10, left: -5, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="year" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `$${Math.round(val / 1000)}k`} />
            <Tooltip
              formatter={(val: any) => [`$${Number(val || 0).toLocaleString()}`, '']}
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                color: '#f8fafc',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
            <Line type="monotone" dataKey="power2Pct" name="2.0% Annual Inflation (Fed Target)" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="power35Pct" name="3.5% Historical Inflation" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="power5Pct" name="5.0% Elevated Inflation" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">At 2.0% in 30 Years</div>
          <div className="font-semibold text-blue-600 dark:text-blue-400">$55,210 Purchasing Value</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">At 3.5% in 30 Years</div>
          <div className="font-semibold text-amber-600 dark:text-amber-400">$35,630 (−64.4% Loss)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">At 5.0% in 30 Years</div>
          <div className="font-semibold text-rose-600 dark:text-rose-400">$23,140 (−76.9% Loss)</div>
        </div>
      </div>
    </div>
  );
}
