'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const COLLEGE_SAVINGS_DATA = [
  { age: 'Birth (0)', projectedTuition: 110000, saveEarly529: 2500, saveLate: 0 },
  { age: 'Age 3', projectedTuition: 127300, saveEarly529: 15400, saveLate: 0 },
  { age: 'Age 6', projectedTuition: 147400, saveEarly529: 32600, saveLate: 0 },
  { age: 'Age 9', projectedTuition: 170600, saveEarly529: 55400, saveLate: 0 },
  { age: 'Age 12', projectedTuition: 197500, saveEarly529: 85500, saveLate: 14100 },
  { age: 'Age 15', projectedTuition: 228700, saveEarly529: 125100, saveLate: 35600 },
  { age: 'Age 18', projectedTuition: 264800, saveEarly529: 177400, saveLate: 69800 },
];

export function CollegeTuitionSavingsProjectionChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            College Tuition Inflation vs. 529 Investment Growth Horizon
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Projected 4-year private/out-of-state tuition (5.0% inflation) vs. saving $350/mo early (Age 0) vs. late (Age 10) in a 6.5% 529 plan.
          </p>
        </div>
        <span className="self-start rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
          Early Advantage: +$107,600
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={COLLEGE_SAVINGS_DATA} margin={{ top: 10, right: 10, left: -5, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="age" stroke="#64748b" fontSize={11} tickLine={false} />
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
            <Line type="monotone" dataKey="projectedTuition" name="Projected 4-Yr Tuition (5% Infl.)" stroke="#f43f5e" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r: 3 }} />
            <Line type="monotone" dataKey="saveEarly529" name="529 Plan (Start Age 0, $350/mo)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="saveLate" name="Late Start (Age 10, $350/mo)" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Total 529 Deposits (Age 0)</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">$78,100 ($350/mo)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Tax-Free 529 Growth</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">+$99,300 Earnings</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Tuition Covered at 18</div>
          <div className="font-semibold text-indigo-600 dark:text-indigo-400">67.0% Debt-Free</div>
        </div>
      </div>
    </div>
  );
}
