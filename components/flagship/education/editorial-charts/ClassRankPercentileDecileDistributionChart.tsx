"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { bracket: "Top 1%", percentile: 99.5, fill: "#10b981" },
  { bracket: "Top 5%", percentile: 97.5, fill: "#059669" },
  { bracket: "Top 10%", percentile: 95.0, fill: "#0ea5e9" },
  { bracket: "Top 25%", percentile: 87.5, fill: "#3b82f6" },
  { bracket: "Top 50%", percentile: 75.0, fill: "#f59e0b" },
  { bracket: "Bottom 50%", percentile: 25.0, fill: "#94a3b8" },
];

export function ClassRankPercentileDecileDistributionChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Class Standing Brackets & Collegiate Admission Competitiveness
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Percentile standing across competitive graduating class deciles showing automatic admissions tiers at public state universities.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="bracket" tick={{ fontSize: 11 }} />
            <YAxis unit="th" domain={[0, 100]} tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Bar dataKey="percentile" name="Average Percentile Standing" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
