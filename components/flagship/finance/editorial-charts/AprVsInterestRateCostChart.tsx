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

interface AprFeePoint {
  loanType: string;
  nominalRate: number;
  effectiveApr1Pct: number;
  effectiveApr3Pct: number;
}

const APR_COMPARISON_DATA: AprFeePoint[] = [
  { loanType: 'Personal Loan', nominalRate: 8.0, effectiveApr1Pct: 8.42, effectiveApr3Pct: 9.35 },
  { loanType: 'Auto Loan', nominalRate: 6.5, effectiveApr1Pct: 6.91, effectiveApr3Pct: 7.78 },
  { loanType: '30-Yr Mortgage', nominalRate: 6.75, effectiveApr1Pct: 6.84, effectiveApr3Pct: 7.05 },
  { loanType: 'Short-Term Credit', nominalRate: 15.0, effectiveApr1Pct: 15.75, effectiveApr3Pct: 17.40 },
];

export function AprVsInterestRateCostChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-block size-2 rounded-full bg-amber-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Nominal Interest Rate vs. Effective APR Across Lender Fee Tiers
          </h3>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Comparing advertised base interest rates against statutory Truth in Lending Act (TILA) APR including 1% vs. 3% origination and closing fee burdens.
        </p>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={APR_COMPARISON_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="loanType" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `${val}%`} />
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
            <Bar dataKey="nominalRate" name="Base Interest Rate (%)" fill="#64748b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="effectiveApr1Pct" name="APR with 1% Fees (%)" fill="#059669" radius={[4, 4, 0, 0]} />
            <Bar dataKey="effectiveApr3Pct" name="APR with 3% Fees (%)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">True Cost Metric</div>
          <div className="font-bold text-slate-900 dark:text-white">Federal TILA APR</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Short-Term Sensitivity</div>
          <div className="font-bold text-amber-600 dark:text-amber-400">High Fee Impact</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Comparison Rule</div>
          <div className="font-bold text-emerald-600 dark:text-emerald-400">Shop by APR, Not Rate</div>
        </div>
      </div>
    </div>
  );
}
