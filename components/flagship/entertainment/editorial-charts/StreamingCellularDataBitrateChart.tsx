'use client';

import React, { useState, useEffect } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const BITRATE_DATA = [
  { tier: 'Low (24k)', kbps: 24, mbPerHour: 10.8, monthlyGb: 0.65, hoursPerGb: 92.6, color: '#10b981' },
  { tier: 'Normal (96k)', kbps: 96, mbPerHour: 43.2, monthlyGb: 2.59, hoursPerGb: 23.1, color: '#06b6d4' },
  { tier: 'High (160k)', kbps: 160, mbPerHour: 72.0, monthlyGb: 4.32, hoursPerGb: 13.9, color: '#3b82f6' },
  { tier: 'Very High (320k)', kbps: 320, mbPerHour: 144.0, monthlyGb: 8.64, hoursPerGb: 6.9, color: '#f59e0b' },
  { tier: 'Lossless (1411k)', kbps: 1411, mbPerHour: 635.0, monthlyGb: 38.1, hoursPerGb: 1.6, color: '#ef4444' },
];

export function StreamingCellularDataBitrateChart() {
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
          Monthly Cellular Data Consumption by Audio Bitrate (2 hrs/day stream)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Comparing gigabytes consumed per month across streaming audio quality settings on mobile networks
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={BITRATE_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} vertical={false} />
            <XAxis dataKey="tier" tick={{ fontSize: 9.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} unit=" GB" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900 text-xs">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">{data.tier}</div>
                      <div className="text-blue-600 font-bold">{data.monthlyGb} GB / Month</div>
                      <div className="text-slate-600 dark:text-slate-300">Data Burn Rate: {data.mbPerHour} MB/hour</div>
                      <div className="text-slate-400 mt-1">1 GB lasts approximately {data.hoursPerGb} hours</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="monthlyGb" name="Monthly Mobile Data (GB)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Normal (96k)</span>
          <strong className="text-cyan-600 dark:text-cyan-400">2.6 GB / mo (43 MB/hr)</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">High (160k)</span>
          <strong className="text-blue-600 dark:text-blue-400">4.3 GB / mo (72 MB/hr)</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Very High (320k)</span>
          <strong className="text-amber-600 dark:text-amber-400">8.6 GB / mo (144 MB/hr)</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Lossless Caution</span>
          <strong className="text-rose-600 dark:text-rose-400">38+ GB / mo Burn</strong>
        </div>
      </div>
    </div>
  );
}
