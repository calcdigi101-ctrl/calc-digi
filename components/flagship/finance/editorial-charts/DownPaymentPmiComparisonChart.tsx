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

interface DownPaymentTierPoint {
  tier: string;
  upfrontCash: number;
  monthlyMortgage: number;
  lifetimePmi: number;
}

const DOWN_PAYMENT_DATA: DownPaymentTierPoint[] = [
  { tier: '3.5% (FHA)', upfrontCash: 14000, monthlyMortgage: 2510, lifetimePmi: 18400 },
  { tier: '5% (Conv)', upfrontCash: 20000, monthlyMortgage: 2470, lifetimePmi: 9800 },
  { tier: '10% (Conv)', upfrontCash: 40000, monthlyMortgage: 2340, lifetimePmi: 5200 },
  { tier: '20% (No PMI)', upfrontCash: 80000, monthlyMortgage: 2080, lifetimePmi: 0 },
];

export function DownPaymentPmiComparisonChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-block size-2 rounded-full bg-emerald-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Down Payment Tiers: Upfront Cash vs. Lifetime Private Mortgage Insurance (PMI)
          </h3>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Evaluated on a $400,000 median residential home at 6.75% 30-year fixed. Reaching 20% down avoids up to $18,400 in non-recoverable mortgage insurance premiums.
        </p>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DOWN_PAYMENT_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="tier" stroke="#64748b" fontSize={11} tickLine={false} />
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
            <Bar dataKey="upfrontCash" name="Upfront Down Payment ($)" fill="#0284c7" radius={[4, 4, 0, 0]} />
            <Bar dataKey="lifetimePmi" name="Lifetime PMI Cost ($)" fill="#f43f5e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">20% Down Monthly Save</div>
          <div className="font-bold text-emerald-600 dark:text-emerald-400">$430 / month</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">FHA PMI Rule</div>
          <div className="font-bold text-amber-600 dark:text-amber-400">Life of Loan</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Conv. PMI Removal</div>
          <div className="font-bold text-slate-900 dark:text-white">At 78% LTV</div>
        </div>
      </div>
    </div>
  );
}
