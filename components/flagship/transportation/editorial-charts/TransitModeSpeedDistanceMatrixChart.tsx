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
  { distance: "50 Miles", driving: 1.0, highSpeedRail: 1.2, aviation: 2.8 },
  { distance: "150 Miles", driving: 2.6, highSpeedRail: 2.0, aviation: 3.1 },
  { distance: "300 Miles", driving: 5.0, highSpeedRail: 3.2, aviation: 3.4 },
  { distance: "500 Miles", driving: 8.2, highSpeedRail: 4.9, aviation: 3.8 },
  { distance: "1,000 Miles", driving: 16.0, highSpeedRail: 9.5, aviation: 4.8 },
];

export function TransitModeSpeedDistanceMatrixChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Door-to-Door Journey Duration by Transportation Modality
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Total travel hours including security check-in, boarding buffers, and dwell intervals comparing Interstate Driving, High-Speed Rail, and Commercial Air.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="distance" tick={{ fontSize: 11 }} />
            <YAxis unit=" hrs" domain={[0, 18]} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`${val} Hours`, "Total Journey Time"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Line type="monotone" dataKey="driving" name="Interstate Driving (65 mph)" stroke="#0ea5e9" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="highSpeedRail" name="High-Speed Rail (120 mph)" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="aviation" name="Commercial Air (incl. 2h buffer)" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
