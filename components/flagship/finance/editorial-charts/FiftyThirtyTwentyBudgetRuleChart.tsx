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

const BUDGET_RULE_DATA = [
  { netIncome: '$4,000 / mo', needs: 2000, wants: 1200, savings: 800 },
  { netIncome: '$6,000 / mo', needs: 3000, wants: 1800, savings: 1200 },
  { netIncome: '$8,000 / mo', needs: 4000, wants: 2400, savings: 1600 },
  { netIncome: '$10,000 / mo', needs: 5000, wants: 3000, savings: 2000 },
];

export function FiftyThirtyTwentyBudgetRuleChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            The 50/30/20 Budget Architecture: Cash Flow Allocation Model
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Categorizing net monthly take-home pay into 50% Essential Needs, 30% Discretionary Wants, and 20% Wealth Building &amp; Debt Payoff.
          </p>
        </div>
        <span className="self-start rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
          Gold Standard Framework
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={BUDGET_RULE_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="netIncome" stroke="#64748b" fontSize={11} tickLine={false} />
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
            <Bar dataKey="needs" stackId="a" name="50% Needs (Rent, Food, Health, Min Debt)" fill="#3b82f6" radius={[0, 0, 0, 0]} />
            <Bar dataKey="wants" stackId="a" name="30% Wants (Dining, Travel, Entertainment)" fill="#f59e0b" radius={[0, 0, 0, 0]} />
            <Bar dataKey="savings" stackId="a" name="20% Savings (Emergency Fund, 401k, Extra Debt)" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">50% Needs Cap</div>
          <div className="font-semibold text-blue-600 dark:text-blue-400">Housing &lt; 28%–30% of Net</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">30% Wants Flexibility</div>
          <div className="font-semibold text-amber-600 dark:text-amber-400">First expense cut during crisis</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">20% Compounding Engine</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">$1,600/mo = $1.95M in 30 yrs</div>
        </div>
      </div>
    </div>
  );
}
