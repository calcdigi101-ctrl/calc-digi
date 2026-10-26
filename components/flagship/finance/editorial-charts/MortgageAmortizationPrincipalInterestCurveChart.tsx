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

interface AmortizationYearPoint {
  year: number;
  principalPortion: number;
  interestPortion: number;
  remainingBalance: number;
}

const AMORTIZATION_30YR_DATA: AmortizationYearPoint[] = [
  { year: 1, principalPortion: 485, interestPortion: 1733, remainingBalance: 314180 },
  { year: 3, principalPortion: 552, interestPortion: 1666, remainingBalance: 301420 },
  { year: 5, principalPortion: 628, interestPortion: 1590, remainingBalance: 287040 },
  { year: 8, principalPortion: 763, interestPortion: 1455, remainingBalance: 262310 },
  { year: 10, principalPortion: 869, interestPortion: 1349, remainingBalance: 242630 },
  { year: 12, principalPortion: 990, interestPortion: 1228, remainingBalance: 220220 },
  { year: 15, principalPortion: 1205, interestPortion: 1013, remainingBalance: 180950 },
  { year: 18, principalPortion: 1466, interestPortion: 752, remainingBalance: 133180 },
  { year: 20, principalPortion: 1670, interestPortion: 548, remainingBalance: 96180 },
  { year: 22, principalPortion: 1902, interestPortion: 316, remainingBalance: 54060 },
  { year: 25, principalPortion: 2085, interestPortion: 133, remainingBalance: 17350 },
  { year: 27, principalPortion: 2170, interestPortion: 48, remainingBalance: 4320 },
  { year: 30, principalPortion: 2218, interestPortion: 0, remainingBalance: 0 },
];

export function MortgageAmortizationPrincipalInterestCurveChart() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            30-Year Mortgage Payment Composition &amp; Principal-Interest Crossover
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Monthly P&amp;I allocation shift on a $320,000 loan balance at 6.50% fixed APR
          </p>
        </div>
        <span className="self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
          Crossover Point: ~Year 14
        </span>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={AMORTIZATION_30YR_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="interestGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="principalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
            <XAxis
              dataKey="year"
              unit=" yr"
              className="text-xs text-slate-500"
              tick={{ fontSize: 11 }}
            />
            <YAxis
              unit="$"
              className="text-xs text-slate-500"
              tick={{ fontSize: 11 }}
              tickFormatter={(val) => `$${val}`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const pVal = payload.find((p) => p.dataKey === 'principalPortion')?.value as number;
                  const iVal = payload.find((p) => p.dataKey === 'interestPortion')?.value as number;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-md text-xs dark:border-slate-800 dark:bg-slate-900">
                      <div className="font-bold text-slate-900 dark:text-white mb-1.5">
                        Year {label} Allocation
                      </div>
                      <div className="flex items-center justify-between gap-4 text-emerald-600 dark:text-emerald-400">
                        <span>Principal Equity:</span>
                        <span className="font-bold tabular-nums">${pVal?.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-amber-500">
                        <span>Bank Interest:</span>
                        <span className="font-bold tabular-nums">${iVal?.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend verticalAlign="top" height={36} />
            <Area
              type="monotone"
              dataKey="interestPortion"
              name="Monthly Bank Interest ($)"
              stroke="#f59e0b"
              fillOpacity={1}
              fill="url(#interestGrad)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="principalPortion"
              name="Monthly Principal Equity ($)"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#principalGrad)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
          <span className="text-slate-500 dark:text-slate-400 block mb-0.5">Early Years (1 - 5)</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">72% - 78% Interest Dominated</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
          <span className="text-slate-500 dark:text-slate-400 block mb-0.5">Crossover Milestone</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">Month 168 (Equal 50/50 Split)</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
          <span className="text-slate-500 dark:text-slate-400 block mb-0.5">Terminal Years (25 - 30)</span>
          <span className="font-bold text-blue-600 dark:text-blue-400">94%+ Accelerated Principal Paydown</span>
        </div>
      </div>
    </div>
  );
}
