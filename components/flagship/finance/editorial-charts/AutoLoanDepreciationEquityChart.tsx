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

interface AutoEquityPoint {
  month: string;
  vehicleValue: number;
  loanBalance: number;
}

const AUTO_LOAN_EQUITY_DATA: AutoEquityPoint[] = [
  { month: 'Month 0', vehicleValue: 36000, loanBalance: 36000 },
  { month: 'Month 12', vehicleValue: 28800, loanBalance: 29840 }, // Underwater / Negative equity
  { month: 'Month 24', vehicleValue: 24400, loanBalance: 23200 }, // Break-even / Equity crossover
  { month: 'Month 36', vehicleValue: 21100, loanBalance: 16120 }, // Positive equity
  { month: 'Month 48', vehicleValue: 18400, loanBalance: 8480 },
  { month: 'Month 60', vehicleValue: 16200, loanBalance: 0 },
];

export function AutoLoanDepreciationEquityChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-block size-2 rounded-full bg-blue-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Vehicle Depreciation Curve vs. Loan Balance (Underwater Risk Zone)
          </h3>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Tracking a $40,000 new vehicle with 10% down on a 60-month loan at 6.9% APR. The gap between months 1–18 represents negative equity (GAP insurance territory).
        </p>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={AUTO_LOAN_EQUITY_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
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
            <Line type="monotone" dataKey="vehicleValue" name="Vehicle Market Value ($)" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="loanBalance" name="Remaining Loan Debt ($)" stroke="#ef4444" strokeWidth={3} strokeDasharray="5 5" dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Year 1 Depreciation</div>
          <div className="font-bold text-red-600 dark:text-red-400">-20% ($7,200)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Crossover Month</div>
          <div className="font-bold text-amber-600 dark:text-amber-400">Month 19</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Equity at Loan End</div>
          <div className="font-bold text-emerald-600 dark:text-emerald-400">+$16,200</div>
        </div>
      </div>
    </div>
  );
}
