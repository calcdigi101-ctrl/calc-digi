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
  { day: "Sunday", count: 687, expected: 685.7 },
  { day: "Monday", count: 685, expected: 685.7 },
  { day: "Tuesday", count: 685, expected: 685.7 },
  { day: "Wednesday", count: 687, expected: 685.7 },
  { day: "Thursday", count: 684, expected: 685.7 },
  { day: "Friday (Peak)", count: 688, expected: 685.7 },
  { day: "Saturday", count: 684, expected: 685.7 },
];

export function WeekdayFrequencyPerCenturyChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Weekday Frequency Distribution in the 400-Year Gregorian Cycle
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Total occurrences of each day of the week for the 13th of the month across 400 years (4,800 total months).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
            <YAxis domain={[680, 690]} label={{ value: "Occurrences per 400y", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="13th of Month Frequency" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
