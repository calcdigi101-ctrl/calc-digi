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

const PAYCHECK_FREQ_DATA = [
  { freq: 'Annual (1x)', paychecks: 1, grossPerCheck: 75000, daysBetween: 365 },
  { freq: 'Monthly (12x)', paychecks: 12, grossPerCheck: 6250, daysBetween: 30 },
  { freq: 'Semi-Monthly (24x)', paychecks: 24, grossPerCheck: 3125, daysBetween: 15 },
  { freq: 'Bi-Weekly (26x)', paychecks: 26, grossPerCheck: 2885, daysBetween: 14 },
  { freq: 'Weekly (52x)', paychecks: 52, grossPerCheck: 1442, daysBetween: 7 },
];

export function SalaryPaycheckFrequencyBreakdownChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Salary Paycheck Frequency Breakdown: Gross Pay per Pay Period
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Conversion of a standard $75,000 annual base salary across standard employer payroll calendar cycles.
          </p>
        </div>
        <span className="self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
          2,080 Standard Work Hours
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={PAYCHECK_FREQ_DATA.slice(1)} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="freq" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `$${val}`} />
            <Tooltip
              formatter={(val: any) => [`$${Number(val || 0).toLocaleString()}`, 'Gross Per Paycheck']}
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                color: '#f8fafc',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
            <Bar dataKey="grossPerCheck" name="Gross Paycheck Amount ($)" fill="#059669" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Hourly Equivalent</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">$36.06 / hour (40 hrs/wk)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Bi-Weekly &ldquo;3-Paycheck&rdquo; Months</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">2 months/yr have 3 checks</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Daily Earning Rate</div>
          <div className="font-semibold text-indigo-600 dark:text-indigo-400">$288.46 / working day</div>
        </div>
      </div>
    </div>
  );
}
