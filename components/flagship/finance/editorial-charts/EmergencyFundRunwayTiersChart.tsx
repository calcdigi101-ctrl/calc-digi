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

const EMERGENCY_TIER_DATA = [
  { archetype: 'Dual Income', threeMo: 10500, sixMo: 21000, nineMo: 31500, twelveMo: 42000, baseline: '$3,500/mo' },
  { archetype: 'Single Earner', threeMo: 12000, sixMo: 24000, nineMo: 36000, twelveMo: 48000, baseline: '$4,000/mo' },
  { archetype: 'Freelancer / 1099', threeMo: 13500, sixMo: 27000, nineMo: 40500, twelveMo: 54000, baseline: '$4,500/mo' },
  { archetype: 'Family w/ Dependents', threeMo: 16500, sixMo: 33000, nineMo: 49500, twelveMo: 66000, baseline: '$5,500/mo' },
];

export function EmergencyFundRunwayTiersChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Emergency Fund Runway Benchmarks by Household Risk Archetype
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Total liquid cash cushion required to sustain non-discretionary baseline survival expenses across employment profiles.
          </p>
        </div>
        <span className="self-start rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
          CFP Standard: 3 to 6 Months
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={EMERGENCY_TIER_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="archetype" stroke="#64748b" fontSize={11} tickLine={false} />
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
            <Bar dataKey="threeMo" name="3-Month Baseline" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="sixMo" name="6-Month Standard" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="twelveMo" name="12-Month Conservative" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">High Stability (Dual W-2)</div>
          <div className="font-semibold text-slate-800 dark:text-slate-200">3–6 Mo ($21,000)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Variable Income (1099)</div>
          <div className="font-semibold text-blue-600 dark:text-blue-400">6–9 Mo ($40,500)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Sole Breadwinner + Kids</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">9–12 Mo ($66,000)</div>
        </div>
      </div>
    </div>
  );
}
