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
  { tier: "$50k Salary", base: 50000, taxes: 4325, benefits: 9200, tools: 5000, total: 68525 },
  { tier: "$85k Salary", base: 85000, taxes: 7350, benefits: 10600, tools: 6500, total: 109450 },
  { tier: "$120k Salary", base: 120000, taxes: 10380, benefits: 12000, tools: 8000, total: 150380 },
  { tier: "$160k Salary", base: 160000, taxes: 13840, benefits: 13600, tools: 10000, total: 197440 },
];

export function EmployeeOverheadBurdenSplitChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Fully Loaded Employment Cost Structure by Salary Tier ($)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing Base Gross Compensation stacked with mandatory FICA/SUTA taxes, healthcare/401(k), and equipment overhead (1.25x to 1.37x multiplier).
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="tier" tick={{ fontSize: 11 }} stroke="#64748b" />
            <YAxis tick={{ fontSize: 11 }} stroke="#64748b" tickFormatter={(v) => `$${v / 1000}k`} />
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
            <Bar dataKey="base" name="Base Salary" stackId="a" fill="#0284c7" />
            <Bar dataKey="taxes" name="Employer Taxes (FICA/SUTA)" stackId="a" fill="#f59e0b" />
            <Bar dataKey="benefits" name="Health & 401(k) Match" stackId="a" fill="#10b981" />
            <Bar dataKey="tools" name="Workstation & Software" stackId="a" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
