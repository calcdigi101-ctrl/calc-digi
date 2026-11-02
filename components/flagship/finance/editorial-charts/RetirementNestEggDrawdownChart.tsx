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

const RETIREMENT_DRAWDOWN_DATA = [
  { age: 'Age 30', portfolioValue: 45000, annualDrawdown: 0, phase: 'Accumulation' },
  { age: 'Age 40', portfolioValue: 185000, annualDrawdown: 0, phase: 'Accumulation' },
  { age: 'Age 50', portfolioValue: 495000, annualDrawdown: 0, phase: 'Accumulation' },
  { age: 'Age 60', portfolioValue: 1080000, annualDrawdown: 0, phase: 'Accumulation' },
  { age: 'Age 65', portfolioValue: 1520000, annualDrawdown: 60800, phase: 'Retirement (4% Rule)' },
  { age: 'Age 70', portfolioValue: 1610000, annualDrawdown: 68400, phase: 'Decumulation' },
  { age: 'Age 75', portfolioValue: 1675000, annualDrawdown: 77000, phase: 'Decumulation' },
  { age: 'Age 80', portfolioValue: 1715000, annualDrawdown: 86600, phase: 'Decumulation' },
  { age: 'Age 85', portfolioValue: 1720000, annualDrawdown: 97500, phase: 'Decumulation' },
  { age: 'Age 90', portfolioValue: 1680000, annualDrawdown: 109800, phase: 'Decumulation' },
];

export function RetirementNestEggDrawdownChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Retirement Nest Egg Lifecycle: Accumulation &amp; Safe 4% Drawdown
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            $800/mo invested from Age 30 to 65 at 7.0% return, followed by a 4.0% initial safe annual withdrawal adjusted for 2.5% inflation.
          </p>
        </div>
        <span className="self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
          Sustainable Horizon: 30+ Years
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={RETIREMENT_DRAWDOWN_DATA} margin={{ top: 10, right: 10, left: -5, bottom: 0 }}>
            <defs>
              <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="age" stroke="#64748b" fontSize={11} tickLine={false} />
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
            <Area type="monotone" dataKey="portfolioValue" stroke="#10b981" fill="url(#portfolioGrad)" name="Retirement Portfolio Capital ($)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Peak Nest Egg (Age 65)</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">$1,520,000</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Initial Safe Drawdown (Yr 1)</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">$60,800 / year ($5,066/mo)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Ending Balance at 90</div>
          <div className="font-semibold text-indigo-600 dark:text-indigo-400">$1,680,000 (Capital Intact)</div>
        </div>
      </div>
    </div>
  );
}
