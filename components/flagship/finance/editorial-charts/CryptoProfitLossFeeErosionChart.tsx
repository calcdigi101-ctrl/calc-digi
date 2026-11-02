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

const CRYPTO_PROFIT_DATA = [
  { item: 'Gross Trading Gain', shortTerm: 10000, longTerm: 10000 },
  { item: 'Exchange Fees (0.6%)', shortTerm: -300, longTerm: -300 },
  { item: 'Network Gas / Bridge', shortTerm: -150, longTerm: -150 },
  { item: 'Tax Obligation', shortTerm: -3056, longTerm: -1432 },
  { item: 'Net Kept Profit', shortTerm: 6494, longTerm: 8118 },
];

export function CryptoProfitLossFeeErosionChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Crypto Profit Realization: Short-Term vs. Long-Term Tax &amp; Fee Friction
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            $10,000 gross cryptocurrency gain evaluated under Short-Term (&lt;1 Year, 32% ordinary tax) vs. Long-Term (&gt;1 Year, 15% capital gains tax).
          </p>
        </div>
        <span className="self-start rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
          Holding &gt;1 Yr Saves $1,624
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={CRYPTO_PROFIT_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="item" stroke="#64748b" fontSize={10} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `$${val}`} />
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
            <Bar dataKey="shortTerm" name="Short-Term (&lt;1 Yr Ordinary Tax)" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="longTerm" name="Long-Term (&gt;1 Yr 15% Cap Gains)" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Short-Term Net Retained</div>
          <div className="font-semibold text-rose-600 dark:text-rose-400">$6,494 (35.1% Total Friction)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Long-Term Net Retained</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">$8,118 (18.8% Total Friction)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">IRS Form 8949 Rule</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">Crypto-to-Crypto Is Taxable</div>
        </div>
      </div>
    </div>
  );
}
