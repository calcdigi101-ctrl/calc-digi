"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { speed: "20 mph (32 km/h)", reactionFt: 29, brakingFt: 20, totalFt: 49 },
  { speed: "30 mph (48 km/h)", reactionFt: 44, brakingFt: 45, totalFt: 89 },
  { speed: "45 mph (72 km/h)", reactionFt: 66, brakingFt: 101, totalFt: 167 },
  { speed: "60 mph (97 km/h)", reactionFt: 88, brakingFt: 180, totalFt: 268 },
  { speed: "75 mph (121 km/h)", reactionFt: 110, brakingFt: 281, totalFt: 391 },
  { speed: "90 mph (145 km/h)", reactionFt: 132, brakingFt: 405, totalFt: 537 },
];

export function KineticVelocityStoppingDistanceChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Kinetic Energy Dissipation & Total Vehicle Stopping Distance
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Perception-reaction distance (linear with speed, 1.0s buffer) versus kinetic braking distance (quadratic scaling with v²) on dry asphalt.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="speed" tick={{ fontSize: 11 }} />
            <YAxis unit=" ft" tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`${val} Feet`, "Distance"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Area type="monotone" dataKey="reactionFt" name="Reaction Distance (1.0s)" stackId="1" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.4} />
            <Area type="monotone" dataKey="brakingFt" name="Braking Distance (Friction)" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
