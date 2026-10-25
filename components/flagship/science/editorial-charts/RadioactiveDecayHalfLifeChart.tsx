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
  ReferenceDot
} from "recharts";

const data = [
  { halfLives: 0, percentRemaining: 100.0, label: "Initial (100%)" },
  { halfLives: 1, percentRemaining: 50.0, label: "1 Half-Life (50%)" },
  { halfLives: 2, percentRemaining: 25.0, label: "2 Half-Lives (25%)" },
  { halfLives: 3, percentRemaining: 12.5, label: "3 Half-Lives (12.5%)" },
  { halfLives: 4, percentRemaining: 6.25, label: "4 Half-Lives (6.25%)" },
  { halfLives: 5, percentRemaining: 3.125, label: "5 Half-Lives (3.13%)" },
  { halfLives: 6, percentRemaining: 1.5625, label: "6 Half-Lives (1.56%)" }
];

export function RadioactiveDecayHalfLifeChart() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          First-Order Exponential Radioisotope Decay Trajectory (% Remaining)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Universal decay curve: activity drops by 50% per elapsed half-life regardless of initial quantity.
        </p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="halfLives"
              stroke="#64748b"
              tick={{ fontSize: 11 }}
              label={{ value: "Elapsed Half-Lives (t / t½)", position: "insideBottom", offset: -5, fontSize: 11 }}
            />
            <YAxis stroke="#64748b" tick={{ fontSize: 11 }} unit="%" domain={[0, 100]} />
            <Tooltip
              formatter={(val) => [`${Number(val).toFixed(2)}%`, "Remaining Activity"]}
              contentStyle={{
                backgroundColor: "#1e293b",
                borderColor: "#334155",
                borderRadius: "0.5rem",
                color: "#f8fafc",
                fontSize: "12px"
              }}
            />
            <ReferenceDot x={1} y={50} r={5} fill="#ef4444" stroke="#ffffff" strokeWidth={2} />
            <ReferenceDot x={2} y={25} r={5} fill="#f59e0b" stroke="#ffffff" strokeWidth={2} />
            <Line
              type="monotone"
              dataKey="percentRemaining"
              name="Activity Remaining (%)"
              stroke="#059669"
              strokeWidth={2.5}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
