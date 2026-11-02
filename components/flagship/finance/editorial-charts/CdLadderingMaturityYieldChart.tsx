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

const CD_LADDER_DATA = [
  { tranche: 'Tranche 1 (1-Yr)', amount: 10000, rate: 5.15, annualIncome: 515, status: 'Matures Yr 1' },
  { tranche: 'Tranche 2 (2-Yr)', amount: 10000, rate: 4.85, annualIncome: 485, status: 'Matures Yr 2' },
  { tranche: 'Tranche 3 (3-Yr)', amount: 10000, rate: 4.60, annualIncome: 460, status: 'Matures Yr 3' },
  { tranche: 'Tranche 4 (4-Yr)', amount: 10000, rate: 4.45, annualIncome: 445, status: 'Matures Yr 4' },
  { tranche: 'Tranche 5 (5-Yr)', amount: 10000, rate: 4.35, annualIncome: 435, status: 'Matures Yr 5' },
];

export function CdLadderingMaturityYieldChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            5-Year CD Laddering Structure: Liquidity &amp; Yield Dispersion
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            $50,000 portfolio split equally across 5 annual maturity tranches to balance fixed yield lock-in and periodic liquidity.
          </p>
        </div>
        <span className="self-start rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
          Annual Liquidity: 20% Rollover
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={CD_LADDER_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="tranche" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `${val}%`} domain={[0, 6]} />
            <Tooltip
              formatter={(val: any, name: any) => [name === 'APY Yield (%)' ? `${val}%` : `$${val}`, name]}
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                color: '#f8fafc',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
            <Bar dataKey="rate" name="APY Yield (%)" fill="#059669" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Blended Ladder APY</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">4.68% Guaranteed</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Annual Cash Liquidity</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">$10,000 every 12 mo</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Early Penalty Shield</div>
          <div className="font-semibold text-slate-900 dark:text-white">Zero Early Break Risk</div>
        </div>
      </div>
    </div>
  );
}
