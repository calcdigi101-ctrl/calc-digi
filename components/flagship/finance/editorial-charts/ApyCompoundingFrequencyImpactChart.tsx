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

const APY_FREQUENCY_DATA = [
  { freq: 'Annual (n=1)', nominal: 5.00, effectiveApy: 5.000, extraYield: 0.000 },
  { freq: 'Semi-Ann (n=2)', nominal: 5.00, effectiveApy: 5.063, extraYield: 0.063 },
  { freq: 'Quarterly (n=4)', nominal: 5.00, effectiveApy: 5.095, extraYield: 0.095 },
  { freq: 'Monthly (n=12)', nominal: 5.00, effectiveApy: 5.116, extraYield: 0.116 },
  { freq: 'Daily (n=365)', nominal: 5.00, effectiveApy: 5.127, extraYield: 0.127 },
  { freq: 'Continuous (e)', nominal: 5.00, effectiveApy: 5.127, extraYield: 0.127 },
];

export function ApyCompoundingFrequencyImpactChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Compounding Frequency Impact on APY: 5.00% Nominal APR Base
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            How statutory compounding intervals elevate effective annual yield under the Truth in Savings Act (TISA).
          </p>
        </div>
        <span className="self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
          Max Spread: +12.7 bps
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={APY_FREQUENCY_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="freq" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `${val}%`} domain={[4.95, 5.20]} />
            <Tooltip
              formatter={(val: any) => [`${Number(val || 0).toFixed(3)}%`, '']}
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                color: '#f8fafc',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
            <Bar dataKey="nominal" name="Nominal APR (%)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="effectiveApy" name="Effective APY Yield (%)" fill="#059669" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Monthly Compounding</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">5.116% APY</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Daily Compounding</div>
          <div className="font-semibold text-emerald-700 dark:text-emerald-300">5.127% APY</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Mathematical Ceiling</div>
          <div className="font-semibold text-slate-900 dark:text-white">e^0.05 - 1 = 5.127%</div>
        </div>
      </div>
    </div>
  );
}
