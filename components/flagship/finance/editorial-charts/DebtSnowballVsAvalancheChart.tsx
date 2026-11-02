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

interface DebtStrategyPoint {
  debt: string;
  avalancheInterest: number;
  snowballInterest: number;
}

const DEBT_STRATEGY_DATA: DebtStrategyPoint[] = [
  { debt: 'Credit Card (24%)', avalancheInterest: 1450, snowballInterest: 1820 },
  { debt: 'Personal Loan (14%)', avalancheInterest: 980, snowballInterest: 1140 },
  { debt: 'Auto Loan (7.5%)', avalancheInterest: 1120, snowballInterest: 1120 },
  { debt: 'Student Debt (5%)', avalancheInterest: 650, snowballInterest: 540 },
];

export function DebtSnowballVsAvalancheChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-block size-2 rounded-full bg-indigo-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Debt Avalanche vs. Debt Snowball: Cumulative Interest Cost
          </h3>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Across $35,000 multi-account liabilities. The Avalanche mathematically saves $420–$1,500+ in interest; the Snowball delivers faster psychological wins by eliminating small debts first.
        </p>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DEBT_STRATEGY_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="debt" stroke="#64748b" fontSize={11} tickLine={false} />
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
            <Bar dataKey="avalancheInterest" name="Debt Avalanche (Highest APR First)" fill="#059669" radius={[4, 4, 0, 0]} />
            <Bar dataKey="snowballInterest" name="Debt Snowball (Lowest Balance First)" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Avalanche Net Savings</div>
          <div className="font-bold text-emerald-600 dark:text-emerald-400">+$420 in Cash</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Snowball 1st Payoff</div>
          <div className="font-bold text-indigo-600 dark:text-indigo-400">Month 3</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Optimal Approach</div>
          <div className="font-bold text-slate-900 dark:text-white">Behavioral Match</div>
        </div>
      </div>
    </div>
  );
}
