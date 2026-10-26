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
  { city: "Honolulu (UTC-10)", offset: -10, meridian: -150 },
  { city: "Los Angeles (UTC-8)", offset: -8, meridian: -120 },
  { city: "New York (UTC-5)", offset: -5, meridian: -75 },
  { city: "London / GMT (UTC±0)", offset: 0, meridian: 0 },
  { city: "Berlin / Paris (UTC+1)", offset: 1, meridian: 15 },
  { city: "Dubai (UTC+4)", offset: 4, meridian: 60 },
  { city: "Mumbai / IST (UTC+5.5)", offset: 5.5, meridian: 82.5 },
  { city: "Singapore / BJ (UTC+8)", offset: 8, meridian: 120 },
  { city: "Tokyo (UTC+9)", offset: 9, meridian: 135 },
  { city: "Sydney (UTC+10)", offset: 10, meridian: 150 },
  { city: "Auckland (UTC+12)", offset: 12, meridian: 180 },
];

export function GlobalUtcOffsetLongitudinalSpanChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Global Terrestrial Longitudinal Span & UTC Timezone Offsets
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Theoretical longitudinal center meridians (15° per hour) across representative world commercial capitals.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="city" angle={-20} textAnchor="end" interval={0} height={50} tick={{ fontSize: 10 }} />
            <YAxis label={{ value: "UTC Offset (Hours)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="offset" name="UTC Offset (Hours)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
