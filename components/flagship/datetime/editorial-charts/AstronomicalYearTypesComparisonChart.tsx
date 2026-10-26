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
  { type: "Tropical Year (Seasons)", days: 365.24219, hours: 8765.81 },
  { type: "Gregorian Civil Year", days: 365.24250, hours: 8765.82 },
  { type: "Julian Civil Year", days: 365.25000, hours: 8766.00 },
  { type: "Sidereal Year (Fixed Stars)", days: 365.25636, hours: 8766.15 },
  { type: "Anomalistic Year (Perihelion)", days: 365.25964, hours: 8766.23 },
  { type: "Eclipse Year (Draconic)", days: 346.62008, hours: 8318.88 },
];

export function AstronomicalYearTypesComparisonChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Astronomical Year Definitions: Precision Duration Comparison
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Exact astronomical length of solar, sidereal, anomalistic, and eclipse years compared to the civil Gregorian year.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="type" angle={-15} textAnchor="end" interval={0} height={45} tick={{ fontSize: 10 }} />
            <YAxis domain={[340, 370]} label={{ value: "Duration (Days)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="days" name="Period in Astronomical Days" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
