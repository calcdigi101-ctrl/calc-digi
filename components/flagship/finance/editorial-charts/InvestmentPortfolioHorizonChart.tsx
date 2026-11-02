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

const PORTFOLIO_HORIZON_DATA = [
  { year: 'Yr 0', conservative: 10000, balanced: 10000, aggressive: 10000 },
  { year: 'Yr 5', conservative: 46100, balanced: 49800, aggressive: 54100 },
  { year: 'Yr 10', conservative: 91400, balanced: 106000, aggressive: 125200 },
  { year: 'Yr 15', conservative: 147900, balanced: 185100, aggressive: 239800 },
  { year: 'Yr 20', conservative: 218500, balanced: 296300, aggressive: 424500 },
  { year: 'Yr 25', conservative: 306500, balanced: 452600, aggressive: 722000 },
  { year: 'Yr 30', conservative: 416300, balanced: 672100, aggressive: 1201700 },
];

export function InvestmentPortfolioHorizonChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Investment Portfolio Horizon: Asset Allocation Return Disparity
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            $10,000 starting capital + $500/mo regular contributions across Conservative (4.5%), Balanced (7.0%), and Aggressive (10.0%) strategies.
          </p>
        </div>
        <span className="self-start rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
          30-Yr Gap: ~$785,000
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={PORTFOLIO_HORIZON_DATA} margin={{ top: 10, right: 10, left: -5, bottom: 0 }}>
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
            <Line type="monotone" dataKey="conservative" name="Conservative (4.5% - Bonds/Cash)" stroke="#94a3b8" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="balanced" name="Balanced (7.0% - 60/40 Index)" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="aggressive" name="Aggressive (10.0% - Total Equity)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Conservative 30-Yr</div>
          <div className="font-semibold text-slate-700 dark:text-slate-300">$416,300</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Balanced 30-Yr</div>
          <div className="font-semibold text-blue-600 dark:text-blue-400">$672,100</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Aggressive 30-Yr</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">$1,201,700</div>
        </div>
      </div>
    </div>
  );
}
