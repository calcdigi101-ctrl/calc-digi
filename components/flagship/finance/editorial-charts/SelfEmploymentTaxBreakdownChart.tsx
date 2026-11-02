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

const SE_TAX_DATA = [
  { netProfit: '$40,000', secaTax: 5652, w2EmployeeTax: 3060, aboveLineDeduction: 2826 },
  { netProfit: '$80,000', secaTax: 11304, w2EmployeeTax: 6120, aboveLineDeduction: 5652 },
  { netProfit: '$120,000', secaTax: 16955, w2EmployeeTax: 9180, aboveLineDeduction: 8478 },
  { netProfit: '$180,000', secaTax: 23640, w2EmployeeTax: 13770, aboveLineDeduction: 11820 },
];

export function SelfEmploymentTaxBreakdownChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            1099 Self-Employment Tax (SECA) vs. W-2 Payroll Tax Obligation
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Comparing full 15.3% SECA liability (12.4% Social Security + 2.9% Medicare) against the 7.65% employee portion of FICA.
          </p>
        </div>
        <span className="self-start rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
          50% Above-the-Line Deductible
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={SE_TAX_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="netProfit" stroke="#64748b" fontSize={11} tickLine={false} />
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
            <Bar dataKey="w2EmployeeTax" name="W-2 Employee FICA (7.65%)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="secaTax" name="1099 Freelancer SECA (15.3%)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">92.35% Base Factor</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">SE Tax applies to 92.35% of profit</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Above-the-Line Deduction</div>
          <div className="font-semibold text-amber-600 dark:text-amber-400">Deduct 50% of SE tax on 1040</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Quarterly Form 1040-ES</div>
          <div className="font-semibold text-slate-900 dark:text-white">Pay in Q1, Q2, Q3, Q4 to avoid penalty</div>
        </div>
      </div>
    </div>
  );
}
