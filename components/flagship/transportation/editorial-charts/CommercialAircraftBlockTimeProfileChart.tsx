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
  { phase: "Gate Dep", altitude: 0, groundSpeed: 15 },
  { phase: "Takeoff (10m)", altitude: 5000, groundSpeed: 220 },
  { phase: "Climb (25m)", altitude: 28000, groundSpeed: 380 },
  { phase: "Cruise (1h)", altitude: 36000, groundSpeed: 460 },
  { phase: "Cruise (2h)", altitude: 38000, groundSpeed: 470 },
  { phase: "Descent (2.5h)", altitude: 12000, groundSpeed: 300 },
  { phase: "Touchdown (2.8h)", altitude: 0, groundSpeed: 140 },
  { phase: "Gate Arr (3.0h)", altitude: 0, groundSpeed: 10 },
];

export function CommercialAircraftBlockTimeProfileChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Flight Mission Profile: Flight Level Altitude & Speed vs Block Time
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Flight mission trajectory across departure taxiing, high-altitude cruise phase (FL360-380), step climb, and terminal descent approach.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="phase" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="left" unit=" ft" domain={[0, 42000]} tick={{ fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" unit=" kts" domain={[0, 520]} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any, name: any) => [
                name.includes("Altitude") ? `${Number(val).toLocaleString()} ft` : `${val} kts`,
                name,
              ]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Line yAxisId="left" type="monotone" dataKey="altitude" name="Flight Altitude (Feet)" stroke="#0ea5e9" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line yAxisId="right" type="monotone" dataKey="groundSpeed" name="Ground Speed (Knots)" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
