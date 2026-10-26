"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { score: 14, percentile: 15 },
  { score: 16, percentile: 28 },
  { score: 18, percentile: 41 },
  { score: 20, percentile: 53 },
  { score: 22, percentile: 64 },
  { score: 24, percentile: 74 },
  { score: 26, percentile: 82 },
  { score: 28, percentile: 88 },
  { score: 30, percentile: 93 },
  { score: 32, percentile: 97 },
  { score: 34, percentile: 99 },
  { score: 36, percentile: 100 },
];

export function ActScorePercentileDistributionChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Official ACT Composite Score to US National Percentile Distribution
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Cumulative normal distribution curve illustrating the steep selectivity climb above score 30 (93rd+ percentile).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="score" tick={{ fontSize: 11 }} />
            <YAxis unit="th" domain={[0, 100]} tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Line type="monotone" dataKey="percentile" name="National Percentile" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
