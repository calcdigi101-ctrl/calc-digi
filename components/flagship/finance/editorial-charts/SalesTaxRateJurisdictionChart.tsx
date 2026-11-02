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

const SALES_TAX_DATA = [
  { state: 'California', stateRate: 7.25, maxLocalRate: 3.50, combinedAvg: 8.85 },
  { state: 'Texas', stateRate: 6.25, maxLocalRate: 2.00, combinedAvg: 8.20 },
  { state: 'New York', stateRate: 4.00, maxLocalRate: 4.875, combinedAvg: 8.52 },
  { state: 'Florida', stateRate: 6.00, maxLocalRate: 2.00, combinedAvg: 7.02 },
  { state: 'Washington', stateRate: 6.50, maxLocalRate: 4.00, combinedAvg: 9.38 },
];

export function SalesTaxRateJurisdictionChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Sales Tax Jurisdictions: State Base Rate vs. Local Surcharges
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Comparing base state statutory sales taxes and local county/city surcharges across high-population retail jurisdictions.
          </p>
        </div>
        <span className="self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
          Destination-Based Sourcing
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={SALES_TAX_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="state" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `${val}%`} domain={[0, 12]} />
            <Tooltip
              formatter={(val: any) => [`${Number(val || 0).toFixed(2)}%`, '']}
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                color: '#f8fafc',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
            <Bar dataKey="stateRate" stackId="a" name="State Base Sales Tax (%)" fill="#6366f1" radius={[0, 0, 0, 0]} />
            <Bar dataKey="maxLocalRate" stackId="a" name="Local District & County Add-On (%)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">NOMAD Zero States</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">NH, OR, MT, AK, DE (0% State)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Highest Combined Rate</div>
          <div className="font-semibold text-amber-600 dark:text-amber-400">WA &amp; CA (~9.4%–10.25%)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Wayfair Nexus Rule</div>
          <div className="font-semibold text-indigo-600 dark:text-indigo-400">$100k sales or 200 transactions</div>
        </div>
      </div>
    </div>
  );
}
