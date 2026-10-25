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
  { hour: "0h", plasmaMg: 200, percentRemaining: 100 },
  { hour: "2.5h", plasmaMg: 141, percentRemaining: 71 },
  { hour: "5h (1 Half-Life)", plasmaMg: 100, percentRemaining: 50 },
  { hour: "7.5h", plasmaMg: 71, percentRemaining: 35 },
  { hour: "10h (2 Half-Lives)", plasmaMg: 50, percentRemaining: 25 },
  { hour: "15h (3 Half-Lives)", plasmaMg: 25, percentRemaining: 12.5 },
  { hour: "20h (4 Half-Lives)", plasmaMg: 12, percentRemaining: 6.25 },
];

export function CaffeinePlasmaClearanceCurveChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Pharmacokinetic Caffeine Serum Clearance & Half-Life Decay Curve
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Simulating first-order biological clearance of a 200 mg caffeine dose with a 5.0-hour elimination half-life.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="caffeineClearGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} />
            <YAxis stroke="#94a3b8" fontSize={11} unit=" mg" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "8px",
                color: "#f8fafc",
                fontSize: "12px",
              }}
              formatter={(val: any, name: any) => [
                name === "plasmaMg" ? `${val} mg` : `${val}%`,
                name === "plasmaMg" ? "Active Serum Caffeine" : "% Remaining",
              ]}
            />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
            <Area type="monotone" dataKey="plasmaMg" name="Active Serum Caffeine (mg)" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#caffeineClearGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
