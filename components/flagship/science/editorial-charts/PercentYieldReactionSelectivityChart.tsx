"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const data = [
  { reaction: "Esterification (Fischer)", actual: 86, byproduct: 14, eFactor: 0.16 },
  { reaction: "Grignard Addition", actual: 74, byproduct: 26, eFactor: 0.35 },
  { reaction: "Suzuki Cross-Coupling", actual: 92, byproduct: 8, eFactor: 0.09 },
  { reaction: "Friedel-Crafts Acylation", actual: 68, byproduct: 32, eFactor: 0.47 },
  { reaction: "Multicomponent Biginelli", actual: 81, byproduct: 19, eFactor: 0.23 },
  { reaction: "Total Natural Synthesis", actual: 48, byproduct: 52, eFactor: 1.08 },
];

export function PercentYieldReactionSelectivityChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Synthetic Reaction Yield vs Side-Product Distribution (%)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Comparing isolated target product percentage against unreacted/waste byproduct mass across benchmark organic transformations.
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="reaction" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" interval={0} stroke="#64748b" />
            <YAxis tick={{ fontSize: 11 }} stroke="#64748b" unit="%" domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderRadius: "8px",
                border: "none",
                fontSize: "12px",
                color: "#f8fafc",
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: "10px", fontSize: "12px" }} />
            <Bar dataKey="actual" name="Isolated Target Yield (%)" fill="#10b981" />
            <Bar dataKey="byproduct" name="Lost Mass / Side Byproduct (%)" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
