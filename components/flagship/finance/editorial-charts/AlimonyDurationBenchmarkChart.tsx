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

const ALIMONY_BENCHMARK_DATA = [
  { length: '3-Yr Marriage', marriageYears: 3, minDuration: 0.6, maxDuration: 1.0, typicalPct: '20%–33%' },
  { length: '7-Yr Marriage', marriageYears: 7, minDuration: 2.1, maxDuration: 3.5, typicalPct: '30%–50%' },
  { length: '12-Yr Marriage', marriageYears: 12, minDuration: 6.0, maxDuration: 8.4, typicalPct: '50%–70%' },
  { length: '18-Yr Marriage', marriageYears: 18, minDuration: 12.6, maxDuration: 14.4, typicalPct: '70%–80%' },
  { length: '20+ Yr Marriage', marriageYears: 20, minDuration: 20.0, maxDuration: 25.0, typicalPct: 'Indefinite / Perm' },
];

export function AlimonyDurationBenchmarkChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Spousal Support (Alimony) Duration Guidelines by Marriage Length
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Statutory guideline duration ranges across standard judicial formulas (AAML, California, Texas, and Florida standards).
          </p>
        </div>
        <span className="self-start rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-950/60 dark:text-violet-300">
          20+ Yrs: Permanent Eligibility
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ALIMONY_BENCHMARK_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="length" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `${val} yrs`} />
            <Tooltip
              formatter={(val: any) => [`${val} Years Duration`, '']}
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                color: '#f8fafc',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
            <Bar dataKey="minDuration" name="Minimum Guideline Duration (Years)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="maxDuration" name="Maximum Guideline Duration (Years)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">AAML Formula</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">30% Payer − 20% Payee (capped at 40%)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Tax Cuts &amp; Jobs Act</div>
          <div className="font-semibold text-violet-600 dark:text-violet-400">Post-2019: Non-Deductible / Non-Taxable</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Termination Triggers</div>
          <div className="font-semibold text-indigo-600 dark:text-indigo-400">Remarriage, Cohabitation, or Death</div>
        </div>
      </div>
    </div>
  );
}
