"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { interval: "1 Minute", seconds: 60, minutes: 1, hours: 0.0167 },
  { interval: "1 Hour", seconds: 3600, minutes: 60, hours: 1 },
  { interval: "1 Day (Solar)", seconds: 86400, minutes: 1440, hours: 24 },
  { interval: "1 Week", seconds: 604800, minutes: 10080, hours: 168 },
  { interval: "1 Month (30d)", seconds: 2592000, minutes: 43200, hours: 720 },
  { interval: "1 Julian Year", seconds: 31557600, minutes: 525960, hours: 8766 },
];

export function TimeChronologicalEpochScaleChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Chronological Period Scales: Cumulative Hours &amp; Minutes
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Discrete civil and astronomical time divisions mapped against standard SI base seconds and civil hour spans.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.slice(1, 5)} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="interval" />
            <YAxis label={{ value: "Civil Hours (h)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="hours" name="Total Hours" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
