"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { day: "Day 5", video: 70, calls: 18, gaming: 15, downloads: 40, capLine: 200 },
  { day: "Day 10", video: 140, calls: 36, gaming: 30, downloads: 80, capLine: 400 },
  { day: "Day 15", video: 210, calls: 54, gaming: 45, downloads: 120, capLine: 600 },
  { day: "Day 20", video: 280, calls: 72, gaming: 60, downloads: 180, capLine: 800 },
  { day: "Day 25", video: 350, calls: 90, gaming: 75, downloads: 220, capLine: 1000 },
  { day: "Day 30", video: 420, calls: 108, gaming: 90, downloads: 260, capLine: 1200 },
];

export function MonthlyDataUsageCategoryBreakdownChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Monthly Data Usage Trajectory vs 1.2 TB ISP Cap Benchmark (GB)
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Cumulative daily data accumulation across 4K streaming, Zoom video conferencing, gaming, and OS/game downloads.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Area type="monotone" dataKey="video" name="4K Video Streaming" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
            <Area type="monotone" dataKey="downloads" name="Game & OS Downloads" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
            <Area type="monotone" dataKey="calls" name="Video Conferencing" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            <Area type="monotone" dataKey="gaming" name="Online Gaming & Web" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
