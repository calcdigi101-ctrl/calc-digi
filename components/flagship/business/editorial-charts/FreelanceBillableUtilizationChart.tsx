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
  { billableWeekly: 15, billableYear: 720,  hourlyRate: 208 },
  { billableWeekly: 20, billableYear: 960,  hourlyRate: 156 },
  { billableWeekly: 25, billableYear: 1200, hourlyRate: 125 },
  { billableWeekly: 30, billableYear: 1440, hourlyRate: 104 },
  { billableWeekly: 35, billableYear: 1680, hourlyRate: 89 },
];

export function FreelanceBillableUtilizationChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Required Hourly Rate vs Weekly Billable Client Hours
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Modeling minimum hourly rate to achieve $95k net take-home pay + $14k overhead across realistic billable utilization rates.
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="billableWeekly" tick={{ fontSize: 11 }} stroke="#64748b" label={{ value: "Billable Client Hours / Week", position: "insideBottom", offset: -15, fontSize: 12 }} />
            <YAxis tick={{ fontSize: 11 }} stroke="#64748b" tickFormatter={(v) => `$${v}`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderRadius: "8px",
                border: "none",
                fontSize: "12px",
                color: "#f8fafc",
              }}
              formatter={(val: any) => [`$${val} / hr`, "Required Rate"]}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: "10px", fontSize: "12px" }} />
            <Line type="monotone" dataKey="hourlyRate" name="Required Minimum Hourly Rate ($/hr)" stroke="#0284c7" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
