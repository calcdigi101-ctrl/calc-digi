"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const data = [
  { unit: "1 Second", seconds: 1, base: "SI Unit" },
  { unit: "1 Minute", seconds: 60, base: "60 s" },
  { unit: "1 Hour", seconds: 3600, base: "60 mins" },
  { unit: "1 Solar Day", seconds: 86400, base: "24 hrs" },
  { unit: "1 Standard Week", seconds: 604800, base: "7 days" },
  { unit: "1 Common Year", seconds: 31536000, base: "365 days" },
];

export function SexagesimalTimeSubdivisionHierarchyChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Sumerian Sexagesimal Time Hierarchy: Base-60 Logarithmic Scale
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Number of seconds contained in each hierarchical temporal division.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="unit" tick={{ fontSize: 11 }} />
            <YAxis scale="log" domain={['auto', 'auto']} label={{ value: "Seconds (Log Scale)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="seconds" name="Duration in Base Seconds" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
