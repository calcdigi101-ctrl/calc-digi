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
  { milestone: "1970 (Epoch)", seconds: 0, pct32: 0.0 },
  { milestone: "1990 (Early Web)", seconds: 631152000, pct32: 29.4 },
  { milestone: "2000 (Y2K)", seconds: 946684800, pct32: 44.1 },
  { milestone: "2010 (Cloud Era)", seconds: 1262304000, pct32: 58.8 },
  { milestone: "2020 (Pandemic)", seconds: 1577836800, pct32: 73.5 },
  { milestone: "2026 (Active)", seconds: 1793000000, pct32: 83.5 },
  { milestone: "2030 (Horizon)", seconds: 1893456000, pct32: 88.2 },
  { milestone: "2038 (Y2038 Overflow)", seconds: 2147483647, pct32: 100.0 },
];

export function UnixIntegerBitDepthTimelineChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        UNIX Epoch Integer Headroom: 32-Bit Overflow (Y2038) vs. 64-Bit Capacity
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Progress toward the 32-bit signed integer boundary (2,147,483,647 seconds) on January 19, 2038.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="milestone" tick={{ fontSize: 10 }} />
            <YAxis domain={[0, 100]} label={{ value: "32-Bit Capacity Exhausted (%)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="pct32" name="32-Bit Headroom Consumed (%)" stroke="#ef4444" fill="#ef4444" fillOpacity={0.25} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
