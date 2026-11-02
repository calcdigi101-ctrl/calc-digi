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

const PROGRESSIVE_TAX_DATA = [
  { income: '$35k', marginalRate: 12.0, effectiveRate: 6.2 },
  { income: '$65k', marginalRate: 22.0, effectiveRate: 11.8 },
  { income: '$100k', marginalRate: 22.0, effectiveRate: 15.3 },
  { income: '$150k', marginalRate: 24.0, effectiveRate: 18.2 },
  { income: '$250k', marginalRate: 35.0, effectiveRate: 23.4 },
  { income: '$450k', marginalRate: 35.0, effectiveRate: 27.6 },
  { income: '$700k', marginalRate: 37.0, effectiveRate: 31.2 },
];

export function FederalTaxBracketProgressiveCurveChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Progressive Tax Mechanics: Marginal Tax Rate vs. Effective Tax Rate
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            IRS Single Filer progressive tax curve illustrating why moving into a higher tax bracket never reduces take-home pay.
          </p>
        </div>
        <span className="self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
          Bracket Myth Debunked
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={PROGRESSIVE_TAX_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="income" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `${val}%`} domain={[0, 40]} />
            <Tooltip
              formatter={(val: any) => [`${Number(val || 0).toFixed(1)}%`, '']}
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                color: '#f8fafc',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
            <Line type="stepAfter" dataKey="marginalRate" name="Top Marginal Tax Bracket (%)" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="effectiveRate" name="Actual Effective Tax Rate (%)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">$65,000 Single Filer</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">22% Marginal / 11.8% Effective</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">$100,000 Single Filer</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">22% Marginal / 15.3% Effective</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Net Dollar Rule</div>
          <div className="font-semibold text-indigo-600 dark:text-indigo-400">Higher Gross Always = Higher Net</div>
        </div>
      </div>
    </div>
  );
}
