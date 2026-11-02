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

const SAVINGS_MILESTONE_DATA = [
  { goal: '$10k Emergency', monthly250: 38, monthly500: 19, monthly1000: 10 },
  { goal: '$25k Down Pymt', monthly250: 89, monthly500: 46, monthly1000: 24 },
  { goal: '$50k Expansion', monthly250: 164, monthly500: 86, monthly1000: 45 },
  { goal: '$100k Milestone', monthly250: 288, monthly500: 154, monthly1000: 83 },
];

export function SavingsGoalMilestoneTimelineChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Savings Milestone Timeline: Months to Target by Monthly Contribution Tier
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Months required to hit milestone targets assuming a 4.50% High-Yield Savings Account (HYSA) APY.
          </p>
        </div>
        <span className="self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
          Compound Acceleration: ~15% Faster
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={SAVINGS_MILESTONE_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="goal" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `${val} mo`} />
            <Tooltip
              formatter={(val: any) => [`${val} Months (${(val / 12).toFixed(1)} yrs)`, '']}
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                color: '#f8fafc',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
            <Bar dataKey="monthly250" name="$250/Month" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="monthly500" name="$500/Month" fill="#38bdf8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="monthly1000" name="$1,000/Month" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">$10k Buffer</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">10 mo at $1k/mo</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">$50k Target</div>
          <div className="font-semibold text-sky-600 dark:text-sky-400">3.75 yrs at $1k/mo</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">$100k Wealth Anchor</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">6.9 yrs at $1k/mo</div>
        </div>
      </div>
    </div>
  );
}
