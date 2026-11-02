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

const WATERFALL_DATA = [
  { item: 'Gross Salary', amount: 85000, color: '#3b82f6' },
  { item: 'Pre-Tax 401k/HSA', amount: 7200, color: '#8b5cf6' },
  { item: 'Federal Income Tax', amount: 9450, color: '#ef4444' },
  { item: 'FICA (SS + Med)', amount: 6502, color: '#f59e0b' },
  { item: 'State Income Tax (5%)', amount: 3650, color: '#f97316' },
  { item: 'Net Take-Home Pay', amount: 58198, color: '#10b981' },
];

export function TakeHomePayWaterfallDeductionChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Paycheck Waterfall: From $85,000 Gross Salary to Net Take-Home Pay
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Decomposition of gross compensation through mandatory statutory payroll withholdings and voluntary pre-tax deductions.
          </p>
        </div>
        <span className="self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
          Take-Home Ratio: 68.5%
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={WATERFALL_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="item" stroke="#64748b" fontSize={10} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `$${Math.round(val / 1000)}k`} />
            <Tooltip
              formatter={(val: any) => [`$${Number(val || 0).toLocaleString()}`, 'Amount']}
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                color: '#f8fafc',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
            <Bar dataKey="amount" name="Dollar Value ($)" fill="#059669" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Net Bi-Weekly Paycheck</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">$2,238 / pay period</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Total Tax Drag</div>
          <div className="font-semibold text-rose-600 dark:text-rose-400">$19,602 (23.1% Total Tax)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Pre-Tax Retirement Shelter</div>
          <div className="font-semibold text-indigo-600 dark:text-indigo-400">$7,200 ($600/mo into 401k)</div>
        </div>
      </div>
    </div>
  );
}
