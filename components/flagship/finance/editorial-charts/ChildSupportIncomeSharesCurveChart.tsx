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

const CHILD_SUPPORT_DATA = [
  { income: '$4,000 / mo', oneChild: 680, twoChildren: 1040, threeChildren: 1280 },
  { income: '$8,000 / mo', oneChild: 1140, twoChildren: 1720, threeChildren: 2110 },
  { income: '$12,000 / mo', oneChild: 1530, twoChildren: 2280, threeChildren: 2790 },
  { income: '$16,000 / mo', oneChild: 1880, twoChildren: 2780, threeChildren: 3380 },
];

export function ChildSupportIncomeSharesCurveChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Income Shares Model: Total Monthly Child Support Obligation Benchmark
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Statutory guideline basic support schedule based on combined monthly parental net income and child count (prior to parenting time adjustments).
          </p>
        </div>
        <span className="self-start rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
          Used by 41 US States
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={CHILD_SUPPORT_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="income" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `$${val}`} />
            <Tooltip
              formatter={(val: any) => [`$${Number(val || 0).toLocaleString()} / mo`, '']}
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                color: '#f8fafc',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
            <Bar dataKey="oneChild" name="1 Child" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="twoChildren" name="2 Children" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="threeChildren" name="3 Children" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Pro-Rata Division</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">Split based on % of combined income</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Overnight Credit</div>
          <div className="font-semibold text-blue-600 dark:text-blue-400">Shared physical custody reduces transfer</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Tax Treatment (TCJA)</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">Non-Taxable to recipient / Non-Deductible</div>
        </div>
      </div>
    </div>
  );
}
