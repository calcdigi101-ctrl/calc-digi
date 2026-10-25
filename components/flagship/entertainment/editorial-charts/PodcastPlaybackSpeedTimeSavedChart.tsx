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

const SPEED_DATA = [
  { speed: '1.0x (Normal)', speedFactor: 1.0, hoursSpent: 260.0, hoursSaved: 0.0, pctSaved: '0%' },
  { speed: '1.1x (Subtle)', speedFactor: 1.1, hoursSpent: 236.4, hoursSaved: 23.6, pctSaved: '9%' },
  { speed: '1.25x (Sweet Spot)', speedFactor: 1.25, hoursSpent: 208.0, hoursSaved: 52.0, pctSaved: '20%' },
  { speed: '1.5x (Power)', speedFactor: 1.5, hoursSpent: 173.3, hoursSaved: 86.7, pctSaved: '33%' },
  { speed: '1.75x (Rapid)', speedFactor: 1.75, hoursSpent: 148.6, hoursSaved: 111.4, pctSaved: '43%' },
  { speed: '2.0x (Double)', speedFactor: 2.0, hoursSpent: 130.0, hoursSaved: 130.0, pctSaved: '50%' },
];

export function PodcastPlaybackSpeedTimeSavedChart() {
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
          Annual Hours Saved by Playback Speed Acceleration (5 hrs/week base)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          How increasing playback speed scales annual hours reclaimed for a regular podcast listener
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={SPEED_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="podSaveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} vertical={false} />
            <XAxis dataKey="speed" tick={{ fontSize: 9.5, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} unit=" hrs" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-slate-900 text-xs">
                      <div className="font-semibold text-slate-900 dark:text-white mb-1">{data.speed}</div>
                      <div className="text-emerald-600 font-bold">{data.hoursSaved.toFixed(1)} Hours Saved Annually ({data.pctSaved})</div>
                      <div className="text-slate-600 dark:text-slate-300">Listening Time Remaining: {data.hoursSpent.toFixed(1)} hrs/yr</div>
                      <div className="text-slate-400 mt-1">Equivalent to {(data.hoursSaved / 24).toFixed(1)} full 24-hr days reclaimed</div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area type="monotone" dataKey="hoursSaved" stroke="#059669" strokeWidth={2.5} fillOpacity={1} fill="url(#podSaveGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">At 1.25× Speed</span>
          <strong className="text-emerald-600 dark:text-emerald-400">Save 52 Hours/Year</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">At 1.5× Speed</span>
          <strong className="text-blue-600 dark:text-blue-400">Save 86.7 Hours/Year</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">At 2.0× Double Speed</span>
          <strong className="text-purple-600 dark:text-purple-400">Save 5.4 Full Days</strong>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg">
          <span className="text-slate-500 block">Speech Comprehension</span>
          <strong className="text-slate-900 dark:text-white">&gt; 95% at 1.25x</strong>
        </div>
      </div>
    </div>
  );
}
