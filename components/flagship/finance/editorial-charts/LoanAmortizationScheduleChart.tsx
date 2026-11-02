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

interface AmortizationYearPoint {
  period: string;
  principal: number;
  interest: number;
  remainingBalance: number;
}

const LOAN_AMORTIZATION_DATA: AmortizationYearPoint[] = [
  { period: 'Year 1', principal: 4180, interest: 1980, remainingBalance: 20820 },
  { period: 'Year 2', principal: 4550, interest: 1610, remainingBalance: 16270 },
  { period: 'Year 3', principal: 4950, interest: 1210, remainingBalance: 11320 },
  { period: 'Year 4', principal: 5390, interest: 770, remainingBalance: 5930 },
  { period: 'Year 5', principal: 5930, interest: 230, remainingBalance: 0 },
];

export function LoanAmortizationScheduleChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-block size-2 rounded-full bg-emerald-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Loan Amortization Trajectory: Principal vs. Interest Split
          </h3>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Illustrated 5-year $25,000 personal loan at 8.50% APR ($513/mo). In early years, interest consumes over 32% of monthly cash flow before principal equity accelerates.
        </p>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={LOAN_AMORTIZATION_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="loanPrincipalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="loanInterestGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="period" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `$${val.toLocaleString()}`} />
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
            <Area type="monotone" dataKey="principal" name="Annual Principal Paid ($)" stroke="#059669" strokeWidth={2} fillOpacity={1} fill="url(#loanPrincipalGrad)" />
            <Area type="monotone" dataKey="interest" name="Annual Interest Paid ($)" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#loanInterestGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Total Borrowed</div>
          <div className="font-bold text-slate-900 dark:text-white">$25,000</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Total Interest</div>
          <div className="font-bold text-amber-600 dark:text-amber-400">$5,800</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Payoff Duration</div>
          <div className="font-bold text-emerald-600 dark:text-emerald-400">60 Months</div>
        </div>
      </div>
    </div>
  );
}
