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

const OVERTIME_DATA = [
  { tier: '40 Hrs (Base)', basePay: 72800, overtimePay: 0, totalAnnual: 72800 },
  { tier: '45 Hrs (+5 OT)', basePay: 72800, overtimePay: 13650, totalAnnual: 86450 },
  { tier: '50 Hrs (+10 OT)', basePay: 72800, overtimePay: 27300, totalAnnual: 100100 },
  { tier: '55 Hrs (+15 OT)', basePay: 72800, overtimePay: 40950, totalAnnual: 113750 },
];

export function HourlyToSalaryOvertimeImpactChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Hourly Wage to Annual Salary: FLSA 1.5x Overtime Multiplier Impact
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            $35.00/hour regular rate across standard 40-hour workweeks plus statutory 1.5x overtime premium hours.
          </p>
        </div>
        <span className="self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
          OT Rate: $52.50 / Hour
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={OVERTIME_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="tier" stroke="#64748b" fontSize={11} tickLine={false} />
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
            <Bar dataKey="basePay" stackId="a" name="Regular Base Wages (40 hrs)" fill="#64748b" radius={[0, 0, 0, 0]} />
            <Bar dataKey="overtimePay" stackId="a" name="1.5x Overtime Pay" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Base Salary (40 Hrs)</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">$72,800 ($35.00/hr)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">+10 Hours/Wk OT</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">$100,100 (+$27.3k Premium)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">FLSA Statutory Factor</div>
          <div className="font-semibold text-indigo-600 dark:text-indigo-400">Time-and-a-Half (1.5x)</div>
        </div>
      </div>
    </div>
  );
}
