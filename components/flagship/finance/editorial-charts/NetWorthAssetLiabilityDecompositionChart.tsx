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

const NET_WORTH_DECOMP_DATA = [
  { category: 'Real Estate', assets: 350000, liabilities: 210000, netEquity: 140000 },
  { category: 'Retirement (401k/IRA)', assets: 180000, liabilities: 0, netEquity: 180000 },
  { category: 'Liquid Cash & Equities', assets: 65000, liabilities: 0, netEquity: 65000 },
  { category: 'Vehicles & Personal', assets: 35000, liabilities: 18000, netEquity: 17000 },
  { category: 'Student & Consumer Debt', assets: 0, liabilities: 32000, netEquity: -32000 },
];

export function NetWorthAssetLiabilityDecompositionChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Personal Balance Sheet: Asset Holdings vs. Outstanding Liabilities
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Household balance sheet decomposition revealing how equity across asset classes produces total net worth.
          </p>
        </div>
        <span className="self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
          Total Net Worth: $370,000
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={NET_WORTH_DECOMP_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="category" stroke="#64748b" fontSize={10} tickLine={false} />
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
            <Bar dataKey="assets" name="Gross Asset Value ($)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="liabilities" name="Total Debt Owed ($)" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Total Assets</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">$630,000</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Total Liabilities</div>
          <div className="font-semibold text-rose-600 dark:text-rose-400">$260,000</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Solvency Ratio</div>
          <div className="font-semibold text-indigo-600 dark:text-indigo-400">2.42x Assets-to-Debt</div>
        </div>
      </div>
    </div>
  );
}
