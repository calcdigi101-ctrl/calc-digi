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
  { year: "325 CE (Nicaea)", julianDrift: 0, gregorianDrift: 0 },
  { year: "600 CE", julianDrift: 2.1, gregorianDrift: 0.1 },
  { year: "900 CE", julianDrift: 4.5, gregorianDrift: 0.2 },
  { year: "1200 CE", julianDrift: 7.1, gregorianDrift: 0.3 },
  { year: "1582 CE (Reform)", julianDrift: 10.0, gregorianDrift: 0.0 },
  { year: "1800 CE", julianDrift: 11.8, gregorianDrift: 0.1 },
  { year: "2026 CE (Today)", julianDrift: 13.5, gregorianDrift: 0.2 },
  { year: "2400 CE", julianDrift: 16.4, gregorianDrift: 0.3 },
];

export function CalendarDriftGregorianVsJulianChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Astronomical Calendar Drift: Julian vs. Gregorian Accuracy
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Cumulative calendar slippage against the tropical solar year (365.24219 days) over 2,000 years.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
            <YAxis label={{ value: "Cumulative Drift (Days)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="julianDrift" name="Julian Drift (+3.1 days/millennium)" stroke="#ef4444" strokeWidth={2.5} />
            <Line type="monotone" dataKey="gregorianDrift" name="Gregorian Drift (+0.12 days/millennium)" stroke="#10b981" strokeWidth={2.5} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
