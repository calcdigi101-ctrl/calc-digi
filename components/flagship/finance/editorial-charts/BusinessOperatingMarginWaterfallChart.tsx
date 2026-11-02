'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const OPERATING_MARGIN_DATA = [
  { metric: 'Gross Revenue', amount: 500000, marginPct: '100.0%' },
  { metric: 'COGS', amount: 200000, marginPct: '40.0%' },
  { metric: 'Gross Profit', amount: 300000, marginPct: '60.0%' },
  { metric: 'OpEx / Overhead', amount: 140000, marginPct: '28.0%' },
  { metric: 'Operating Income', amount: 160000, marginPct: '32.0%' },
  { metric: 'Net Profit (After Tax)', amount: 120000, marginPct: '24.0%' },
];

export function BusinessOperatingMarginWaterfallChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Income Statement Waterfall: Revenue to Bottom-Line Net Profit
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Decomposition of $500,000 commercial gross revenue through COGS, operating expenditures (OpEx), and corporate income taxes.
          </p>
        </div>
        <span className="self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
          Net Profit Margin: 24.0%
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={OPERATING_MARGIN_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="metric" stroke="#64748b" fontSize={10} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `$${Math.round(val / 1000)}k`} />
            <Tooltip
              formatter={(val: any) => [`$${Number(val || 0).toLocaleString()}`, 'Amount']}
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                color: '#f8fafc',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
            <Bar dataKey="amount" name="Dollar Value ($)" fill="#059669" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Gross Margin</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">60.0% ($300,000)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Operating Margin (EBIT)</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">32.0% ($160,000)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Net Profit Margin</div>
          <div className="font-semibold text-indigo-600 dark:text-indigo-400">24.0% ($120,000)</div>
        </div>
      </div>
    </div>
  );
}
