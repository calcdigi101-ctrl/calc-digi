'use client';

import React, { useState, useEffect } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface SpeedTier {
  id: string;
  name: string;
  wpm: number;
  pagesPerHour: number;
  description: string;
}

const SPEED_TIERS: SpeedTier[] = [
  { id: 'slow', name: 'Slow / Analytical (150 WPM)', wpm: 150, pagesPerHour: 32.7, description: 'Dense nonfiction, technical study, or poetry savoring' },
  { id: 'avg', name: 'Average Reader (250 WPM)', wpm: 250, pagesPerHour: 54.5, description: 'Standard recreational novel and popular nonfiction reading' },
  { id: 'fast', name: 'Fast Reader (350 WPM)', wpm: 350, pagesPerHour: 76.4, description: 'Experienced avid reader with minimal subvocalization' },
];

export function BookReadingPacingTimelineChart() {
  const [activeTier, setActiveTier] = useState<string>('avg');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTier = SPEED_TIERS.find((t) => t.id === activeTier) || SPEED_TIERS[1];

  // Days to finish a 350-page book across daily reading minutes
  const chartData = [
    { minutes: '15 min/day', days: Math.ceil((350 * 275) / (currentTier.wpm * 15)), hours: ((350 * 275) / (currentTier.wpm * 60)).toFixed(1) },
    { minutes: '30 min/day', days: Math.ceil((350 * 275) / (currentTier.wpm * 30)), hours: ((350 * 275) / (currentTier.wpm * 60)).toFixed(1) },
    { minutes: '45 min/day', days: Math.ceil((350 * 275) / (currentTier.wpm * 45)), hours: ((350 * 275) / (currentTier.wpm * 60)).toFixed(1) },
    { minutes: '60 min/day', days: Math.ceil((350 * 275) / (currentTier.wpm * 60)), hours: ((350 * 275) / (currentTier.wpm * 60)).toFixed(1) },
    { minutes: '90 min/day', days: Math.ceil((350 * 275) / (currentTier.wpm * 90)), hours: ((350 * 275) / (currentTier.wpm * 60)).toFixed(1) },
  ];

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-900/50 animate-pulse h-80" />
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            Book Completion Pacing Curve (350-Page Novel)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Days required to finish a standard book based on daily reading commitment and speed
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {SPEED_TIERS.map((tier) => (
            <button
              key={tier.id}
              onClick={() => setActiveTier(tier.id)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                activeTier === tier.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
              }`}
            >
              {tier.name.split(' ')[0]} ({tier.wpm} WPM)
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="readingGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} vertical={false} />
            <XAxis dataKey="minutes" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} unit=" d" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900 text-xs">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">{data.minutes}</div>
                      <div className="text-blue-600 dark:text-blue-400 font-bold">{data.days} Days to Finish</div>
                      <div className="text-slate-500 mt-0.5">Total Book Reading Time: {data.hours} hours</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area type="monotone" dataKey="days" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#readingGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Reading Speed</span>
          <strong className="text-slate-900 dark:text-white">{currentTier.wpm} Words/Min</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Pacing Rate</span>
          <strong className="text-slate-900 dark:text-white">~{currentTier.pagesPerHour.toFixed(0)} Pages/Hour</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">At 30 Min/Day</span>
          <strong className="text-blue-600 dark:text-blue-400">{Math.ceil((350 * 275) / (currentTier.wpm * 30))} Days</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">At 60 Min/Day</span>
          <strong className="text-emerald-600 dark:text-emerald-400">{Math.ceil((350 * 275) / (currentTier.wpm * 60))} Days</strong>
        </div>
      </div>
    </div>
  );
}
