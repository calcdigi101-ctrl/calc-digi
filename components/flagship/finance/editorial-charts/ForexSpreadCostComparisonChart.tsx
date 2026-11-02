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

const FOREX_SPREAD_DATA = [
  { provider: 'Mid-Market (Wholesale)', spreadFee: 0, wireFee: 0, totalCost: 0, effectiveRate: '0.00%' },
  { provider: 'Fintech (Wise / Revolut)', spreadFee: 22.5, wireFee: 0, totalCost: 22.5, effectiveRate: '0.45%' },
  { provider: 'Credit Card (3% FX Fee)', spreadFee: 150, wireFee: 0, totalCost: 150, effectiveRate: '3.00%' },
  { provider: 'Commercial Bank Wire', spreadFee: 160, wireFee: 35, totalCost: 195, effectiveRate: '3.90%' },
  { provider: 'Airport Currency Kiosk', spreadFee: 625, wireFee: 0, totalCost: 625, effectiveRate: '12.50%' },
];

export function ForexSpreadCostComparisonChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Foreign Exchange Cost Friction: Hidden FX Spread vs. Upfront Fees
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Total transaction cost on a $5,000 USD currency exchange across retail banking, card network, and kiosk channels.
          </p>
        </div>
        <span className="self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
          Mid-Market Benchmark
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={FOREX_SPREAD_DATA.slice(1)} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="provider" stroke="#64748b" fontSize={10} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `$${val}`} />
            <Tooltip
              formatter={(val: any) => [`$${Number(val || 0).toFixed(2)}`, 'Total Exchange Cost']}
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                color: '#f8fafc',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
            <Bar dataKey="totalCost" name="Total Fee &amp; Exchange Spread Cost ($)" fill="#059669" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Fintech Real Cost</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">$22.50 (0.45% Spread)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Retail Bank Wire</div>
          <div className="font-semibold text-amber-600 dark:text-amber-400">$195.00 ($35 wire + 3.2%)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Airport Kiosk Markup</div>
          <div className="font-semibold text-rose-600 dark:text-rose-400">$625.00 (12.5% Spread Loss)</div>
        </div>
      </div>
    </div>
  );
}
