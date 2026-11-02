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

const BREAK_EVEN_DATA = [
  { units: 0, totalRevenue: 0, totalCost: 24000, fixedCost: 24000 },
  { units: 200, totalRevenue: 15000, totalCost: 31000, fixedCost: 24000 },
  { units: 400, totalRevenue: 30000, totalCost: 38000, fixedCost: 24000 },
  { units: 600, totalRevenue: 45000, totalCost: 45000, fixedCost: 24000 },
  { units: 800, totalRevenue: 60000, totalCost: 52000, fixedCost: 24000 },
  { units: 1000, totalRevenue: 75000, totalCost: 59000, fixedCost: 24000 },
  { units: 1200, totalRevenue: 90000, totalCost: 66000, fixedCost: 24000 },
];

export function BreakEvenContributionMarginChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Cost-Volume-Profit (CVP) Analysis: Break-Even Crossover Point
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            $24,000 monthly fixed overhead, $75 unit selling price, and $35 variable cost per unit ($40 unit contribution margin).
          </p>
        </div>
        <span className="self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
          Break-Even: 600 Units ($45k)
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={BREAK_EVEN_DATA} margin={{ top: 10, right: 10, left: -5, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="units" stroke="#64748b" fontSize={11} tickLine={false} unit=" u" />
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
            <Line type="monotone" dataKey="totalRevenue" name="Total Revenue ($75/unit)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="totalCost" name="Total Costs (Fixed + $35/unit)" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="fixedCost" name="Fixed Overhead Floor ($24k)" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Contribution Margin</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">$40.00 / unit (53.3%)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Break-Even Units</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">600 Units / Month</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Profit at 1,000 Units</div>
          <div className="font-semibold text-indigo-600 dark:text-indigo-400">+$16,000 Operating Income</div>
        </div>
      </div>
    </div>
  );
}
