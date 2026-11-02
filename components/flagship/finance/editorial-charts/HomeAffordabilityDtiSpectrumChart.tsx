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

interface AffordabilityPoint {
  income: string;
  conservative28Dti: number;
  moderate36Dti: number;
  aggressive43Dti: number;
}

const DTI_SPECTRUM_DATA: AffordabilityPoint[] = [
  { income: '$60k/yr', conservative28Dti: 215000, moderate36Dti: 275000, aggressive43Dti: 330000 },
  { income: '$90k/yr', conservative28Dti: 325000, moderate36Dti: 418000, aggressive43Dti: 498000 },
  { income: '$120k/yr', conservative28Dti: 435000, moderate36Dti: 558000, aggressive43Dti: 665000 },
  { income: '$150k/yr', conservative28Dti: 545000, moderate36Dti: 698000, aggressive43Dti: 832000 },
  { income: '$200k/yr', conservative28Dti: 728000, moderate36Dti: 932000, aggressive43Dti: 1110000 },
];

export function HomeAffordabilityDtiSpectrumChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-block size-2 rounded-full bg-emerald-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Home Purchasing Power Across Debt-to-Income (DTI) Guardrails
          </h3>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Estimated maximum home purchase budget based on standard 28% front-end mortgage ratio, 36% conventional back-end ceiling, and 43% CFPB Qualified Mortgage cap (6.75% rate, 10% down).
        </p>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DTI_SPECTRUM_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="income" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} />
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
            <Bar dataKey="conservative28Dti" name="Conservative (28% Front-End)" fill="#059669" radius={[4, 4, 0, 0]} />
            <Bar dataKey="moderate36Dti" name="Moderate (36% Total DTI)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="aggressive43Dti" name="Aggressive (43% CFPB Max)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Golden Rule</div>
          <div className="font-bold text-emerald-600 dark:text-emerald-400">28/36 Guideline</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">CFPB Qualified Cap</div>
          <div className="font-bold text-amber-600 dark:text-amber-400">43% Back-End DTI</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Buffer Cushion</div>
          <div className="font-bold text-slate-900 dark:text-white">Emergency Reserves</div>
        </div>
      </div>
    </div>
  );
}
