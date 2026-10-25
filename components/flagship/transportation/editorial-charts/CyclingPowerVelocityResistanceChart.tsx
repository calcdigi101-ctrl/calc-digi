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
  { speed: "10 mph (16 km/h)", flatWatts: 55, rollingWatts: 140, climbWatts: 270 },
  { speed: "15 mph (24 km/h)", flatWatts: 115, rollingWatts: 240, climbWatts: 420 },
  { speed: "20 mph (32 km/h)", flatWatts: 220, rollingWatts: 380, climbWatts: 610 },
  { speed: "25 mph (40 km/h)", flatWatts: 395, rollingWatts: 590, climbWatts: 860 },
  { speed: "30 mph (48 km/h)", flatWatts: 660, rollingWatts: 890, climbWatts: 1190 },
];

export function CyclingPowerVelocityResistanceChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Cubic Aerodynamic Drag & Mechanical Cycling Power Demand Curves
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Total mechanical watts required across varying speeds showing non-linear cubic wind resistance scaling on flats vs rolling (2%) and climbing (4%) grades.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="speed" tick={{ fontSize: 11 }} />
            <YAxis unit=" W" domain={[0, 1300]} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`${val} Watts`, "Mechanical Power"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Line type="monotone" dataKey="flatWatts" name="Flat Course (0% Grade)" stroke="#0ea5e9" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="rollingWatts" name="Rolling Course (2% Grade)" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="climbWatts" name="Climbing Grade (4% Incline)" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
