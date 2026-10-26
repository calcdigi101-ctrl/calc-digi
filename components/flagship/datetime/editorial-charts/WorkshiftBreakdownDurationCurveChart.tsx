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
  { shift: "4-Hour Shift", gross: 4.0, breakHrs: 0.25, productive: 3.75 },
  { shift: "6-Hour Shift", gross: 6.0, breakHrs: 0.50, productive: 5.50 },
  { shift: "8-Hour Shift", gross: 8.0, breakHrs: 0.75, productive: 7.25 },
  { shift: "10-Hour Shift", gross: 10.0, breakHrs: 1.00, productive: 9.00 },
  { shift: "12-Hour Shift", gross: 12.0, breakHrs: 1.50, productive: 10.50 },
];

export function WorkshiftBreakdownDurationCurveChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Commercial Shift Duration: Productive vs. Mandatory Break Allocation
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Net productive hours vs statutory meal & rest breaks across standard commercial shift lengths.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="shift" tick={{ fontSize: 11 }} />
            <YAxis label={{ value: "Hours", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="productive" name="Net Productive Hours" stackId="a" fill="#10b981" />
            <Bar dataKey="breakHrs" name="Mandatory Unpaid Break" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
