'use client';

import React, { useState, useEffect } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const BUNDLE_DATA = [
  { bundle: '1 Rotating Service', monthly: 15.5, annual: 186, vsCableSaving: 954, color: '#10b981' },
  { bundle: 'Ad-Supported Trio', monthly: 27.0, annual: 324, vsCableSaving: 816, color: '#06b6d4' },
  { bundle: 'Standard 3-Service', monthly: 48.5, annual: 582, vsCableSaving: 558, color: '#3b82f6' },
  { bundle: 'Full 6-Service Stack', monthly: 88.0, annual: 1056, vsCableSaving: 84, color: '#f59e0b' },
  { bundle: 'Traditional Cable TV', monthly: 95.0, annual: 1140, vsCableSaving: 0, color: '#ef4444' },
];

export function StreamingVsCableCordCuttingCostChart() {
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
          Cord-Cutting Streaming Bundles vs. Traditional Cable TV ($/Month)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Monthly expenditure comparison and annual cord-cutting savings against typical cable television bills
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={BUNDLE_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} vertical={false} />
            <XAxis dataKey="bundle" tick={{ fontSize: 9.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} unit="$" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900 text-xs">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">{data.bundle}</div>
                      <div className="text-blue-600 font-bold">${data.monthly.toFixed(2)} / month</div>
                      <div className="text-slate-600 dark:text-slate-300">Annual Cost: ${data.annual} / year</div>
                      {data.vsCableSaving > 0 ? (
                        <div className="text-emerald-600 font-semibold mt-1">Saves ${data.vsCableSaving}/year vs Cable</div>
                      ) : (
                        <div className="text-rose-500 font-medium mt-1">Cable Baseline ($95/mo)</div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="monthly" name="Monthly Cost ($/mo)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Cable Average</span>
          <strong className="text-rose-600 dark:text-rose-400">$95/mo ($1,140/yr)</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Standard Trio</span>
          <strong className="text-blue-600 dark:text-blue-400">Save $558/Year</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Ad-Supported Trio</span>
          <strong className="text-emerald-600 dark:text-emerald-400">Save $816/Year</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Subscription Creep</span>
          <strong className="text-amber-600 dark:text-amber-400">6+ Apps Approaches Cable</strong>
        </div>
      </div>
    </div>
  );
}
