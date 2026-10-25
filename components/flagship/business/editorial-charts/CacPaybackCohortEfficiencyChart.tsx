"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Mo 0", grossProfit: 0, cacThreshold: 380 },
  { month: "Mo 3", grossProfit: 195, cacThreshold: 380 },
  { month: "Mo 6", grossProfit: 390, cacThreshold: 380 }, // Payback crossover
  { month: "Mo 9", grossProfit: 585, cacThreshold: 380 },
  { month: "Mo 12", grossProfit: 780, cacThreshold: 380 },
  { month: "Mo 18", grossProfit: 1170, cacThreshold: 380 },
  { month: "Mo 24", grossProfit: 1560, cacThreshold: 380 },
];

export function CacPaybackCohortEfficiencyChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Customer Cohort Cumulative Gross Profit vs $380 Blended CAC
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Payback occurs at Month 5.8 when cumulative gross profit crosses the initial acquisition outlay.
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#64748b" />
            <YAxis tick={{ fontSize: 11 }} stroke="#64748b" tickFormatter={(v) => `$${v}`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderRadius: "8px",
                border: "none",
                fontSize: "12px",
                color: "#f8fafc",
              }}
              formatter={(val: any) => [`$${Number(val).toLocaleString()}`, ""]}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: "10px", fontSize: "12px" }} />
            <Line type="monotone" dataKey="grossProfit" name="Cumulative Gross Margin Contribution" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="cacThreshold" name="Initial Acquisition Cost (CAC)" stroke="#ef4444" strokeDasharray="4 4" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
