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

const CINEMA_DATA = [
  { outing: 'Solo Matinee 2D', tickets: 10.5, concessions: 8.5, fees: 0, total: 19.0, concessionPct: '44.7%' },
  { outing: 'Couple Standard 2D', tickets: 29.0, concessions: 24.5, fees: 4.0, total: 57.5, concessionPct: '42.6%' },
  { outing: 'Couple IMAX Laser', tickets: 43.0, concessions: 27.5, fees: 4.5, total: 75.0, concessionPct: '36.7%' },
  { outing: 'Family 4 Standard 2D', tickets: 52.0, concessions: 46.5, fees: 7.0, total: 105.5, concessionPct: '44.1%' },
  { outing: 'Family 4 Dolby Cinema', tickets: 82.0, concessions: 52.0, fees: 8.0, total: 142.0, concessionPct: '36.6%' },
];

export function CinemaOutingExpenseSplitChart() {
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
          Movie Theater Outing Cost Composition ($ USD)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Comparing admission ticket revenue vs concession snacks &amp; popcorn across theater outing party sizes
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={CINEMA_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} vertical={false} />
            <XAxis dataKey="outing" tick={{ fontSize: 9.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} unit="$" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900 text-xs">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">{data.outing}</div>
                      <div className="text-blue-600 font-medium">Tickets: ${data.tickets.toFixed(2)}</div>
                      <div className="text-amber-600 font-medium">Popcorn &amp; Snacks: ${data.concessions.toFixed(2)} ({data.concessionPct})</div>
                      <div className="text-indigo-600 font-medium">App Convenience Fees: ${data.fees.toFixed(2)}</div>
                      <div className="mt-1 pt-1 border-t border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white">
                        Total Cinema Spend: ${data.total.toFixed(2)}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
            <Bar dataKey="tickets" name="Admission Tickets" stackId="a" fill="#3b82f6" />
            <Bar dataKey="concessions" name="Popcorn & Drinks" stackId="a" fill="#f59e0b" />
            <Bar dataKey="fees" name="Online Booking Fees" stackId="a" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Concession Share</span>
          <strong className="text-amber-600 dark:text-amber-400">40% - 45% of Total</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Family 4 Standard</span>
          <strong className="text-slate-900 dark:text-white">$105.50 All-In</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">IMAX Couple Outing</span>
          <strong className="text-blue-600 dark:text-blue-400">$75.00 Total</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Matinee Savings</span>
          <strong className="text-emerald-600 dark:text-emerald-400">Save 30%–40% on Tickets</strong>
        </div>
      </div>
    </div>
  );
}
