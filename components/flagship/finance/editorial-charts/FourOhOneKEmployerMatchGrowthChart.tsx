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

const FOUR_OH_ONE_K_DATA = [
  { year: '10 Years', noMatch: 69800, fiftyPctMatch: 104700, fullMatch: 139600 },
  { year: '20 Years', noMatch: 206800, fiftyPctMatch: 310200, fullMatch: 413600 },
  { year: '30 Years', noMatch: 475800, fiftyPctMatch: 713700, fullMatch: 951600 },
];

export function FourOhOneKEmployerMatchGrowthChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            401(k) Employer Match Impact: Free Money Wealth Multiplier
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            $80,000 annual salary, 6% employee contribution ($400/mo), and 7.0% annual investment return over 10, 20, and 30 years.
          </p>
        </div>
        <span className="self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
          Instant 50%–100% Guaranteed ROI
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={FOUR_OH_ONE_K_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
            <Bar dataKey="noMatch" name="Employee Only (No Match)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="fiftyPctMatch" name="50% Match (up to 6%)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="fullMatch" name="100% Match (up to 5%)" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Employee Only 30-Yr</div>
          <div className="font-semibold text-slate-700 dark:text-slate-300">$475,800</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">50% Match 30-Yr</div>
          <div className="font-semibold text-blue-600 dark:text-blue-400">$713,700 (+$237.9k Free)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">100% Match 30-Yr</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">$951,600 (+$475.8k Free)</div>
        </div>
      </div>
    </div>
  );
}
