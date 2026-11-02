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

const SOCIAL_SECURITY_DATA = [
  { age: 'Age 62 (Early)', monthlyBenefit: 1750, pctPia: 70, lifetimeAt80: 378000, lifetimeAt85: 483000 },
  { age: 'Age 65', monthlyBenefit: 2167, pctPia: 86.7, lifetimeAt80: 390000, lifetimeAt85: 520000 },
  { age: 'Age 67 (FRA)', monthlyBenefit: 2500, pctPia: 100, lifetimeAt80: 390000, lifetimeAt85: 540000 },
  { age: 'Age 70 (Max Delay)', monthlyBenefit: 3100, pctPia: 124, lifetimeAt80: 372000, lifetimeAt85: 558000 },
];

export function SocialSecurityClaimingAgeBenefitChart() {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Social Security Benefit Trajectory: Claiming Age Comparison
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Monthly payout vs. cumulative lifetime benefits at age 85 based on a $2,500 Full Retirement Age (FRA) Primary Insurance Amount.
          </p>
        </div>
        <span className="self-start rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
          Age 70 Payout: +77% vs Age 62
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={SOCIAL_SECURITY_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-800" />
            <XAxis dataKey="age" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `$${val}`} />
            <Tooltip
              formatter={(val: any, name: any) => [name === 'Monthly Check ($)' ? `$${val}/mo` : `$${val.toLocaleString()}`, name]}
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                color: '#f8fafc',
                fontSize: '12px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
            <Bar dataKey="monthlyBenefit" name="Monthly Check ($)" fill="#059669" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center text-xs dark:border-slate-800">
        <div>
          <div className="text-slate-500 dark:text-slate-400">Claim at 62 (Early)</div>
          <div className="font-semibold text-slate-700 dark:text-slate-300">$1,750 / mo (30% haircut)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Claim at 67 (FRA)</div>
          <div className="font-semibold text-blue-600 dark:text-blue-400">$2,500 / mo (100% PIA)</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400">Claim at 70 (Delayed)</div>
          <div className="font-semibold text-emerald-600 dark:text-emerald-400">$3,100 / mo (+24% bonus)</div>
        </div>
      </div>
    </div>
  );
}
