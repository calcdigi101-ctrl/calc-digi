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
  { type: "Draconic Month (Nodes)", days: 27.21 },
  { type: "Sidereal Month (Stars)", days: 27.32 },
  { type: "Tropical Month (Equinox)", days: 27.32 },
  { type: "Anomalistic Month (Perigee)", days: 27.55 },
  { type: "Synodic Month (New Moon)", days: 29.53 },
  { type: "February (Common)", days: 28.0 },
  { type: "Average Solar Month", days: 30.44 },
  { type: "Gregorian Long Month", days: 31.0 },
];

export function SynodicVsSiderealLunarMonthPhasesChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Lunar Month Periods: Synodic, Sidereal & Gregorian Months
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Comparison of astronomical lunar orbit durations against standard civil calendar month lengths.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="type" angle={-15} textAnchor="end" interval={0} height={45} tick={{ fontSize: 10 }} />
            <YAxis domain={[25, 32]} label={{ value: "Days", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="days" name="Period Duration (Days)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
