"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { sat: 800, percentile: 8 },
  { sat: 900, percentile: 25 },
  { sat: 1000, percentile: 42 },
  { sat: 1100, percentile: 58 },
  { sat: 1200, percentile: 73 },
  { sat: 1300, percentile: 84 },
  { sat: 1400, percentile: 93 },
  { sat: 1500, percentile: 98 },
  { sat: 1600, percentile: 99.9 },
];

export function SatScoreDistributionPercentilesChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        College Board SAT Total Composite Score Percentile Curve
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Nationally representative percentile rankings showing score concentration around the 1050 median and elite separation beyond 1450.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="sat" tick={{ fontSize: 11 }} />
            <YAxis unit="th" domain={[0, 100]} tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Area type="monotone" dataKey="percentile" name="National Percentile" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
