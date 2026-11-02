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

const VAT_STAGE_DATA = [
  { stage: '1. Raw Material', salePrice: 100, vatCharged: 20, vatReclaimed: 0, netRemittedToGov: 20 },
  { stage: '2. Manufacturer', salePrice: 250, vatCharged: 50, vatReclaimed: 20, netRemittedToGov: 30 },
  { stage: '3. Wholesaler', salePrice: 400, vatCharged: 80, vatReclaimed: 50, netRemittedToGov: 30 },
  { stage: '4. Retailer', salePrice: 600, vatCharged: 120, vatReclaimed: 80, netRemittedToGov: 40 },
];

export function VatInputOutputTaxDecompositionChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            VAT Multi-Stage Value Added Tax: Input vs. Output Tax Flow
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            How a 20.0% VAT is collected in fractional increments at each production tier, totaling $120 on a $600 retail item.
          </p>
        </div>
        <span className="self-start rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
          Zero Cascading Tax
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={VAT_STAGE_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="stage" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `$${val}`} />
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
            <Bar dataKey="vatReclaimed" name="Input Tax Reclaimed ($)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="netRemittedToGov" name="Net Tax Remitted to Gov ($)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="vatCharged" name="Gross Output Tax Charged ($)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Total Tax Collected</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">$120.00 Total Remitted</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Final Consumer Price</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">$720.00 ($600 net + $120 VAT)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Business Net Tax Cost</div>
          <div className="font-semibold text-indigo-600 dark:text-indigo-400">$0.00 (Pass-Through Entity)</div>
        </div>
      </div>
    </div>
  );
}
