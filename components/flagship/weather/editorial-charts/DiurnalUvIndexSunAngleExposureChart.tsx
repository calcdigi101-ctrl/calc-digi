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
  { hour: "8:00 AM", summerUv: 1.8, equinoxUv: 1.0, winterUv: 0.3 },
  { hour: "10:00 AM", summerUv: 5.6, equinoxUv: 3.5, winterUv: 1.4 },
  { hour: "12:00 PM (Noon)", summerUv: 9.8, equinoxUv: 6.2, winterUv: 2.8 },
  { hour: "1:00 PM (Solar Peak)", summerUv: 10.4, equinoxUv: 6.8, winterUv: 3.1 },
  { hour: "3:00 PM", summerUv: 6.8, equinoxUv: 4.1, winterUv: 1.6 },
  { hour: "5:00 PM", summerUv: 2.5, equinoxUv: 1.2, winterUv: 0.2 },
  { hour: "7:00 PM", summerUv: 0.5, equinoxUv: 0.0, winterUv: 0.0 },
];

export function DiurnalUvIndexSunAngleExposureChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Diurnal Solar UV Radiation Intensity Curves Across Seasonal Cycles
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Hourly ground-level erythemal UV Index at 38° North latitude comparing Summer Solstice (Extreme 10.4), Spring Equinox (High 6.8), and Winter (Moderate 3.1).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
            <YAxis unit=" UVI" domain={[0, 12]} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`${val} UV Index`, "Solar Radiation"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Line type="monotone" dataKey="summerUv" name="Summer Solstice (Peak Sun)" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="equinoxUv" name="Spring / Fall Equinox" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="winterUv" name="Winter Solstice (Low Sun)" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
