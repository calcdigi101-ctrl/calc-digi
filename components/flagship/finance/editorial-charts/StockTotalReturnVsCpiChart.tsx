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

const STOCK_RETURN_DATA = [
  { year: 'Yr 0', totalReturn: 10000, priceReturn: 10000, cpiBaseline: 10000 },
  { year: 'Yr 5', totalReturn: 16250, priceReturn: 14350, cpiBaseline: 11480 },
  { year: 'Yr 10', totalReturn: 26400, priceReturn: 20600, cpiBaseline: 13180 },
  { year: 'Yr 15', totalReturn: 42900, priceReturn: 29500, cpiBaseline: 15130 },
  { year: 'Yr 20', totalReturn: 69800, priceReturn: 42400, cpiBaseline: 17370 },
  { year: 'Yr 25', totalReturn: 113500, priceReturn: 60900, cpiBaseline: 19940 },
];

export function StockTotalReturnVsCpiChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Stock Total Return vs. Price Appreciation vs. Inflation Erosion
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            $10,000 invested across 25 years: Total Return with reinvested dividends (10.2% CAGR) vs. Price-only index vs. CPI inflation baseline.
          </p>
        </div>
        <span className="self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
          Dividends: 46% of Total Wealth
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={STOCK_RETURN_DATA} margin={{ top: 10, right: 10, left: -5, bottom: 0 }}>
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
            <Line type="monotone" dataKey="totalReturn" name="Total Return (Reinvested Dividends)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="priceReturn" name="Price Return Only (Capital Gain)" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="cpiBaseline" name="CPI Inflation Baseline (2.8%)" stroke="#f43f5e" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Total Return 25-Yr</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">$113,500 (11.35x Gain)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Price Only (No DRIP)</div>
          <div className="font-semibold text-indigo-600 dark:text-indigo-400">$60,900 (6.09x Gain)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Real Wealth Multiplier</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">5.69x Above CPI Inflation</div>
        </div>
      </div>
    </div>
  );
}
