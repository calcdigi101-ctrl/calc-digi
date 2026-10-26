"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { item: "HD Movie (5 GB)", t25: 29.5, t100: 7.4, t300: 2.5, t1000: 0.74 },
  { item: "4K Video (20 GB)", t25: 118.0, t100: 29.5, t300: 9.8, t1000: 2.95 },
  { item: "Modern Game (60 GB)", t25: 354.0, t100: 88.5, t300: 29.5, t1000: 8.85 },
  { item: "AAA Title (120 GB)", t25: 708.0, t100: 177.0, t300: 59.0, t1000: 17.7 },
];

export function DownloadTimeByConnectionTierChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Realistic Download Time Comparison Across Broadband Connection Speeds (Minutes)
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Time in minutes required to transfer large media payloads with 12% TCP/IP and network overhead factored in.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="item" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} label={{ value: "Minutes", angle: -90, position: "insideLeft", fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="t25" name="25 Mbps Plan" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="t100" name="100 Mbps Plan" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="t300" name="300 Mbps Plan" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="t1000" name="1 Gbps Fiber" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
