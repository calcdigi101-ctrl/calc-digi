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

const RENT_VS_BUY_DATA = [
  { year: 'Yr 0', buyerNetWorth: 85000, renterNetWorth: 85000 },
  { year: 'Yr 5', buyerNetWorth: 138000, renterNetWorth: 122000 },
  { year: 'Yr 10', buyerNetWorth: 226000, renterNetWorth: 198000 },
  { year: 'Yr 15', buyerNetWorth: 365000, renterNetWorth: 325000 },
  { year: 'Yr 20', buyerNetWorth: 572000, renterNetWorth: 535000 },
  { year: 'Yr 25', buyerNetWorth: 878000, renterNetWorth: 865000 },
  { year: 'Yr 30', buyerNetWorth: 1342000, renterNetWorth: 1285000 },
];

export function RentVsBuyNetWorthHorizonChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Rent vs. Buy Net Worth Trajectory: 30-Year Wealth Comparison
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            $425,000 purchase (20% down, 6.5% APR, 3.5% home appreciation) vs. renting at $2,400/mo &amp; investing surplus at 7.5% return.
          </p>
        </div>
        <span className="self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
          Crossover Point: ~Year 4
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={RENT_VS_BUY_DATA} margin={{ top: 10, right: 10, left: -5, bottom: 0 }}>
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
            <Line type="monotone" dataKey="buyerNetWorth" name="Homeowner Equity (3.5% Appreciation)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="renterNetWorth" name="Renter Investment Portfolio (7.5% Stock Return)" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Buyer 30-Yr Wealth</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">$1,342,000 (Paid-Off Home)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Renter 30-Yr Wealth</div>
          <div className="font-semibold text-indigo-600 dark:text-indigo-400">$1,285,000 (Liquid Index Funds)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Key Decision Driver</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">Length of Stay (&gt;5 Years Favors Buying)</div>
        </div>
      </div>
    </div>
  );
}
