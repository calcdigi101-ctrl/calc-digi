'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const DRIP_COMPARISON_DATA = [
  { year: 'Yr 0', dripTotal: 25000, cashTotal: 25000, cashPaidOut: 0 },
  { year: 'Yr 5', dripTotal: 39500, cashTotal: 33400, cashPaidOut: 5200 },
  { year: 'Yr 10', dripTotal: 65100, cashTotal: 44800, cashPaidOut: 12200 },
  { year: 'Yr 15', dripTotal: 111400, cashTotal: 60100, cashPaidOut: 21600 },
  { year: 'Yr 20', dripTotal: 196800, cashTotal: 80600, cashPaidOut: 34300 },
  { year: 'Yr 25', dripTotal: 358200, cashTotal: 108100, cashPaidOut: 51200 },
];

export function DividendReinvestmentDripCurveChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Dividend Reinvestment (DRIP) vs. Cash Payout Accumulation
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            $25,000 base capital, 3.50% initial dividend yield, and 6.00% annual dividend growth rate across 25 years.
          </p>
        </div>
        <span className="self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
          DRIP Multiplier: 3.3x Wealth Gap
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={DRIP_COMPARISON_DATA} margin={{ top: 10, right: 10, left: -5, bottom: 0 }}>
            <defs>
              <linearGradient id="dripGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
            </defs>
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
            <Area type="monotone" dataKey="dripTotal" stroke="#10b981" fill="url(#dripGrad)" name="DRIP Portfolio Value ($)" />
            <Area type="monotone" dataKey="cashTotal" stroke="#6366f1" fill="#c7d2fe" name="Non-Reinvested Share Value ($)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Cash Dividends Taken</div>
          <div className="font-semibold text-slate-700 dark:text-slate-300">$108.1k share + $51.2k cash</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">DRIP Reinvestment Total</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">$358,200</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Compounding Dividend Alpha</div>
          <div className="font-semibold text-indigo-600 dark:text-indigo-400">+$198,900 Added Net Worth</div>
        </div>
      </div>
    </div>
  );
}
