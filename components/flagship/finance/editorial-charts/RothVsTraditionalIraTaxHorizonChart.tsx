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

const ROTH_VS_TRAD_DATA = [
  { scenario: 'Lower Bracket in Ret. (12%)', traditionalIra: 374000, rothIra: 331500, winner: 'Traditional +$42.5k' },
  { scenario: 'Same Bracket in Ret. (22%)', traditionalIra: 331500, rothIra: 331500, winner: 'Tie ($331.5k)' },
  { scenario: 'Higher Bracket in Ret. (28%)', traditionalIra: 306000, rothIra: 331500, winner: 'Roth +$25.5k' },
  { scenario: 'High Tax State / RMD Surge', traditionalIra: 280500, rothIra: 331500, winner: 'Roth +$51.0k' },
];

export function RothVsTraditionalIraTaxHorizonChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Roth vs. Traditional IRA: Net Spendable Retirement Wealth by Future Tax Bracket
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            $7,000 annual pre-tax contribution over 25 years at 7.0% return (22% current marginal tax rate).
          </p>
        </div>
        <span className="self-start rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
          Roth Advantage: Zero RMDs
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ROTH_VS_TRAD_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="scenario" stroke="#64748b" fontSize={10} tickLine={false} />
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
            <Bar dataKey="traditionalIra" name="Traditional IRA (After Ret. Tax)" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="rothIra" name="Roth IRA (100% Tax-Free)" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Tax Today (Roth)</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">Pay 22% now ($1,540/yr)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Withdrawals in Ret.</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">100% Tax-Free (Roth)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">RMD Mandate at 73/75</div>
          <div className="font-semibold text-indigo-600 dark:text-indigo-400">Traditional: Yes | Roth: Exempt</div>
        </div>
      </div>
    </div>
  );
}
