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

interface PayoffPoint {
  month: string;
  minimumPayment: number;
  acceleratedPayment: number;
}

const CREDIT_CARD_DATA: PayoffPoint[] = [
  { month: 'Month 0', minimumPayment: 8000, acceleratedPayment: 8000 },
  { month: 'Month 6', minimumPayment: 7550, acceleratedPayment: 6450 },
  { month: 'Month 12', minimumPayment: 7120, acceleratedPayment: 4790 },
  { month: 'Month 18', minimumPayment: 6710, acceleratedPayment: 3010 },
  { month: 'Month 24', minimumPayment: 6330, acceleratedPayment: 1100 },
  { month: 'Month 30', minimumPayment: 5970, acceleratedPayment: 0 },
  { month: 'Month 36', minimumPayment: 5630, acceleratedPayment: 0 },
];

export function CreditCardPayoffTimelineChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-block size-2 rounded-full bg-rose-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Minimum Payment Trap vs. Accelerated Payoff Timeline
          </h3>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Comparing an $8,000 credit card balance at 24.99% APR. Paying the 2% minimum requires over 18 years and $12,400 in interest vs. debt freedom in 28 months at $350/mo.
        </p>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={CREDIT_CARD_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="minPayGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="accelPayGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
            </defs>
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
            <Area type="monotone" dataKey="minimumPayment" name="Minimum Only ($160/mo fading)" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#minPayGrad)" />
            <Area type="monotone" dataKey="acceleratedPayment" name="Fixed Plan ($350/mo)" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#accelPayGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Interest Saved</div>
          <div className="font-bold text-emerald-600 dark:text-emerald-400">$9,850+</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Time Saved</div>
          <div className="font-bold text-emerald-600 dark:text-emerald-400">15.5 Years</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Total Fixed Payoff</div>
          <div className="font-bold text-slate-900 dark:text-white">28 Months</div>
        </div>
      </div>
    </div>
  );
}
