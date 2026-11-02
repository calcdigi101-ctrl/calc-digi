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

const PROCESSING_FEE_DATA = [
  { size: '$20 Sale', paypalOnline: 1.09, stripeStandard: 0.88, paypalQr: 0.55, paypalIntl: 1.39 },
  { size: '$100 Sale', paypalOnline: 3.48, stripeStandard: 3.20, paypalQr: 2.38, paypalIntl: 4.98 },
  { size: '$500 Sale', paypalOnline: 15.44, stripeStandard: 14.80, paypalQr: 11.54, paypalIntl: 22.94 },
  { size: '$2,000 Sale', paypalOnline: 60.29, stripeStandard: 58.30, paypalQr: 45.89, paypalIntl: 90.29 },
];

export function PaymentProcessingFeeTierChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Merchant Processing Fee Comparison: Domestic vs. International Tiers
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Comparing PayPal Checkout (2.99% + $0.49), Stripe (2.90% + $0.30), PayPal QR (2.29% + $0.09), and Cross-Border (+1.50%).
          </p>
        </div>
        <span className="self-start rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
          Small Ticket Drag: 5.45%
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={PROCESSING_FEE_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="size" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `$${val}`} />
            <Tooltip
              formatter={(val: any) => [`$${Number(val || 0).toFixed(2)}`, 'Processing Fee']}
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                color: '#f8fafc',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
            <Bar dataKey="paypalOnline" name="PayPal Online (2.99% + $0.49)" fill="#0284c7" radius={[4, 4, 0, 0]} />
            <Bar dataKey="stripeStandard" name="Stripe (2.90% + $0.30)" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="paypalIntl" name="PayPal International (+1.5%)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">$20 Micro-Transaction</div>
          <div className="font-semibold text-rose-600 dark:text-rose-400">5.45% Effective Fee Rate</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">$500 Mid-Ticket</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">3.09% Effective Fee Rate</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Reverse Fee Formula</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">Ask = (Target + Fixed) ÷ (1 − Rate)</div>
        </div>
      </div>
    </div>
  );
}
