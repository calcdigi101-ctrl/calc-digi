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

const ROI_CAGR_DATA = [
  { horizon: '1 Year', totalRoi: 100.0, annualizedCagr: 100.0, finalValue: 20000 },
  { horizon: '3 Years', totalRoi: 100.0, annualizedCagr: 26.0, finalValue: 20000 },
  { horizon: '5 Years', totalRoi: 100.0, annualizedCagr: 14.87, finalValue: 20000 },
  { horizon: '7 Years', totalRoi: 100.0, annualizedCagr: 10.41, finalValue: 20000 },
  { horizon: '10 Years', totalRoi: 100.0, annualizedCagr: 7.18, finalValue: 20000 },
];

export function RoiSensitivityHorizonChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            ROI vs. Annualized CAGR: The Critical Time Horizon Dimension
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            A flat 100% total return on investment ($10,000 capital doubling to $20,000) evaluated across varying holding durations.
          </p>
        </div>
        <span className="self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
          CAGR Incorporates Compounding
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ROI_CAGR_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="horizon" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `${val}%`} domain={[0, 110]} />
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
            <Bar dataKey="totalRoi" name="Cumulative ROI (%)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="annualizedCagr" name="Annualized CAGR Yield (%)" fill="#059669" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">3-Year 100% Gain</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">26.0% CAGR (Elite Return)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">7-Year 100% Gain</div>
          <div className="font-semibold text-blue-600 dark:text-blue-400">10.4% CAGR (S&amp;P 500 Match)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">10-Year 100% Gain</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">7.18% CAGR (Conservative)</div>
        </div>
      </div>
    </div>
  );
}
