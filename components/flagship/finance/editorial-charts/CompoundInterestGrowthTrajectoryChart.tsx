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

const COMPOUND_GROWTH_DATA = [
  { year: 'Yr 0', principal: 10000, interest: 0, total: 10000 },
  { year: 'Yr 5', principal: 22000, interest: 7850, total: 29850 },
  { year: 'Yr 10', principal: 34000, interest: 25140, total: 59140 },
  { year: 'Yr 15', principal: 46000, interest: 57420, total: 103420 },
  { year: 'Yr 20', principal: 58000, interest: 112650, total: 170650 },
  { year: 'Yr 25', principal: 70000, interest: 202800, total: 272800 },
  { year: 'Yr 30', principal: 82000, interest: 345600, total: 427600 },
];

export function CompoundInterestGrowthTrajectoryChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Compound Interest Growth Trajectory: Principal vs. Compounded Earnings
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            $10,000 initial balance + $200/mo regular contributions at 8.0% annual return across 30 years.
          </p>
        </div>
        <span className="self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
          Compounding Tipping Point: ~Yr 13
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={COMPOUND_GROWTH_DATA} margin={{ top: 10, right: 10, left: -5, bottom: 0 }}>
            <defs>
              <linearGradient id="interestArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="principalArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
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
            <Area type="monotone" dataKey="principal" stackId="1" stroke="#6366f1" fill="url(#principalArea)" name="Total Out-of-Pocket Deposits" />
            <Area type="monotone" dataKey="interest" stackId="1" stroke="#10b981" fill="url(#interestArea)" name="Cumulative Compound Interest" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Total Contributed</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">$82,000 (19.2%)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Total Interest Earned</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">$345,600 (80.8%)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Final Portfolio Value</div>
          <div className="font-semibold text-slate-900 dark:text-white">$427,600 (5.2x ROI)</div>
        </div>
      </div>
    </div>
  );
}
