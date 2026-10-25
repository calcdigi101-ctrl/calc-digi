"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { rh: "20%", dp65: 22.0, dp75: 30.1, dp85: 38.3, dp95: 46.5 },
  { rh: "40%", dp65: 39.5, dp75: 48.7, dp85: 57.8, dp95: 66.8 },
  { rh: "60%", dp65: 50.8, dp75: 60.4, dp85: 70.0, dp95: 79.5 },
  { rh: "80%", dp65: 58.8, dp75: 68.7, dp85: 78.5, dp95: 88.3 },
  { rh: "100%", dp65: 65.0, dp75: 75.0, dp85: 85.0, dp95: 95.0 },
];

export function DewPointRelativeHumidityComfortMatrixChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Dew Point Temperature vs Relative Humidity Across Ambient Thermal Baselines
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Magnus-Tetens psychrometric curves illustrating how relative humidity translates into absolute human comfort dew points across 65°F to 95°F air temperatures.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="rh" tick={{ fontSize: 11 }} />
            <YAxis unit="°F" domain={[15, 100]} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`${val}°F`, "Dew Point"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Line type="monotone" dataKey="dp65" name="65°F Ambient" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="dp75" name="75°F Ambient" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="dp85" name="85°F Ambient" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="dp95" name="95°F Ambient" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
