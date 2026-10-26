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
  { country: "United States", workdays: 250, weekends: 104, holidays: 11 },
  { country: "United Kingdom", workdays: 253, weekends: 104, holidays: 8 },
  { country: "Germany", workdays: 251, weekends: 104, holidays: 10 },
  { country: "Japan", workdays: 245, weekends: 104, holidays: 16 },
  { country: "France", workdays: 250, weekends: 104, holidays: 11 },
  { country: "Canada", workdays: 251, weekends: 104, holidays: 10 },
];

export function AnnualWorkingDaysVsHolidaysBreakdownChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        International Working Days Benchmark: Workdays vs. Paid Public Holidays
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Average annual distribution of working days, statutory weekend days, and official public holidays across OECD economies.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="country" tick={{ fontSize: 11 }} />
            <YAxis label={{ value: "Days per Year", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="workdays" name="Gross Business Workdays" stackId="a" fill="#10b981" />
            <Bar dataKey="holidays" name="Public Holidays" stackId="a" fill="#f59e0b" />
            <Bar dataKey="weekends" name="Weekend Days" stackId="a" fill="#64748b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
