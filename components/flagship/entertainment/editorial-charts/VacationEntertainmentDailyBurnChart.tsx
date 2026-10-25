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

const VACATION_DATA = [
  { tier: 'Backpacker Budget', admissions: 12, nightlifeDining: 10, excursions: 5, totalDaily: 27 },
  { tier: 'City Cultural Explorer', admissions: 30, nightlifeDining: 35, excursions: 15, totalDaily: 80 },
  { tier: 'Theme Park Family', admissions: 135, nightlifeDining: 35, excursions: 25, totalDaily: 195 },
  { tier: 'Luxury Resort & Scuba', admissions: 20, nightlifeDining: 85, excursions: 95, totalDaily: 200 },
  { tier: 'Vegas VIP Weekend', admissions: 45, nightlifeDining: 140, excursions: 110, totalDaily: 295 },
];

export function VacationEntertainmentDailyBurnChart() {
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
          Daily Vacation Entertainment Burn Rate ($/Person/Day)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Comparing daily admissions, nightlife/bars, and guided excursions across holiday travel archetypes
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={VACATION_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} vertical={false} />
            <XAxis dataKey="tier" tick={{ fontSize: 9.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} unit="$" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900 text-xs">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">{data.tier}</div>
                      <div className="text-blue-600 font-medium">Attractions &amp; Admissions: ${data.admissions}/day</div>
                      <div className="text-amber-600 font-medium">Nightlife &amp; Dining Entertainment: ${data.nightlifeDining}/day</div>
                      <div className="text-emerald-600 font-medium">Excursions &amp; Sports Gear: ${data.excursions}/day</div>
                      <div className="mt-1 pt-1 border-t border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white">
                        Total Daily Entertainment: ${data.totalDaily} / person
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
            <Bar dataKey="admissions" name="Theme Parks / Museums" stackId="a" fill="#3b82f6" />
            <Bar dataKey="nightlifeDining" name="Nightlife & Entertainment Dining" stackId="a" fill="#f59e0b" />
            <Bar dataKey="excursions" name="Excursions & Equipment Rentals" stackId="a" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Theme Park Pass</span>
          <strong className="text-blue-600 dark:text-blue-400">$135+ / Person / Day</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Cultural Sightseer</span>
          <strong className="text-slate-900 dark:text-white">~$80 / Day All-In</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Excursion Heavy</span>
          <strong className="text-emerald-600 dark:text-emerald-400">Scuba / Ski ~$200/day</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Total Trip Share</span>
          <strong className="text-amber-600 dark:text-amber-400">25%–30% of Total Budget</strong>
        </div>
      </div>
    </div>
  );
}
