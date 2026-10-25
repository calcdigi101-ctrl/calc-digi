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
  { rh: "30%", hi85: 84, hi90: 90, hi95: 98, hi100: 109, hi105: 123 },
  { rh: "45%", hi85: 86, hi90: 93, hi95: 105, hi100: 122, hi105: 142 },
  { rh: "60%", hi85: 89, hi90: 100, hi95: 114, hi100: 136, hi105: 161 },
  { rh: "75%", hi85: 92, hi90: 109, hi95: 130, hi100: 158, hi105: 188 },
  { rh: "90%", hi85: 97, hi90: 122, hi95: 150, hi100: 185, hi105: 220 },
];

export function NoaaHeatIndexDangerZonesChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        NOAA Apparent Heat Index Progression Across Humidity Gradients
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Rothfusz regression showing exponential thermal stress escalation from Caution (80°F–90°F) to Extreme Danger (&gt;125°F) as evaporative cooling collapses.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="rh" tick={{ fontSize: 11 }} />
            <YAxis unit="°F" domain={[80, 200]} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`${val}°F`, "Apparent Heat Index"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Line type="monotone" dataKey="hi85" name="85°F Air Temp" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="hi90" name="90°F Air Temp" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="hi95" name="95°F Air Temp" stroke="#f97316" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="hi100" name="100°F Air Temp" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="hi105" name="105°F Air Temp" stroke="#b91c1c" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
