'use client';

import React, { useState, useEffect } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const SOLAR_CASHFLOW_DATA = [
  { year: 'Yr 0', cumulativeCashFlow: -16800, utilityWithoutSolar: 0, netProfit: -16800 },
  { year: 'Yr 2', cumulativeCashFlow: -12900, utilityWithoutSolar: 4050, netProfit: -12900 },
  { year: 'Yr 4', cumulativeCashFlow: -8750, utilityWithoutSolar: 8300, netProfit: -8750 },
  { year: 'Yr 6', cumulativeCashFlow: -4300, utilityWithoutSolar: 12800, netProfit: -4300 },
  { year: 'Yr 8', cumulativeCashFlow: 350, utilityWithoutSolar: 17500, netProfit: 350 }, // Breakeven ~7.8 yrs
  { year: 'Yr 10', cumulativeCashFlow: 5300, utilityWithoutSolar: 22500, netProfit: 5300 },
  { year: 'Yr 15', cumulativeCashFlow: 18800, utilityWithoutSolar: 36000, netProfit: 18800 },
  { year: 'Yr 20', cumulativeCashFlow: 33900, utilityWithoutSolar: 51200, netProfit: 33900 },
  { year: 'Yr 25', cumulativeCashFlow: 51200, utilityWithoutSolar: 68500, netProfit: 51200 },
];

export function SolarPanel25YearCumulativeCashflowChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/50 animate-pulse h-80" />
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          25-Year Cumulative Solar Cashflow & Net Financial Wealth Gain ($)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          8 kW Residential System net investment payback curve at Year 8, compounding over $51,000+ net savings
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={SOLAR_CASHFLOW_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="solarGainColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gridCostColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} vertical={false} />
            <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 10, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-md dark:border-slate-800 dark:bg-slate-950 text-xs">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">{data.year} Milestone</div>
                      <div className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        Net Cash Flow: <span className="font-mono font-bold">{data.netProfit >= 0 ? `+$${data.netProfit.toLocaleString()}` : `-$${Math.abs(data.netProfit).toLocaleString()}`}</span>
                      </div>
                      <div className="text-amber-600 dark:text-amber-400 font-semibold">
                        Avoided Grid Spend: <span className="font-mono font-bold">${data.utilityWithoutSolar.toLocaleString()}</span>
                      </div>
                      <div className="mt-1 pt-1 border-t border-slate-100 text-slate-500 italic">
                        {data.netProfit >= 0 ? 'Full capital recovered; 100% pure profit' : 'Amortizing initial investment'}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
            <Area type="monotone" dataKey="cumulativeCashFlow" name="Net Solar Cashflow ($)" stroke="#10b981" strokeWidth={2.2} fillOpacity={1} fill="url(#solarGainColor)" />
            <Area type="monotone" dataKey="utilityWithoutSolar" name="Avoided Grid Bills ($)" stroke="#f59e0b" strokeWidth={2.0} fillOpacity={1} fill="url(#gridCostColor)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span>Includes 30% Federal ITC Section 25D Credit & 2.5% Annual Grid Inflation</span>
        <span>Standard Tier-1 Solar Panel Warranty: 25 Years</span>
      </div>
    </div>
  );
}
