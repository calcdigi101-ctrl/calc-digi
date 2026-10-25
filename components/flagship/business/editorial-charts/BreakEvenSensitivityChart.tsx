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
  { units: 0, revenue: 0, totalCosts: 45000, fixedCosts: 45000 },
  { units: 250, revenue: 30000, totalCosts: 57000, fixedCosts: 45000 },
  { units: 500, revenue: 60000, totalCosts: 69000, fixedCosts: 45000 },
  { units: 625, revenue: 75000, totalCosts: 75000, fixedCosts: 45000 }, // Break-Even Point
  { units: 750, revenue: 90000, totalCosts: 81000, fixedCosts: 45000 },
  { units: 1000, revenue: 120000, totalCosts: 93000, fixedCosts: 45000 },
  { units: 1250, revenue: 150000, totalCosts: 105000, fixedCosts: 45000 },
];

export function BreakEvenSensitivityChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Break-Even Point Crossover: Sales Volume vs Operating Costs
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Intersection of total revenue ($120/unit) and total costs ($45,000 fixed + $48/unit variable) at 625 units ($75,000).
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="units" tick={{ fontSize: 11 }} stroke="#64748b" label={{ value: "Sales Volume (Units)", position: "insideBottom", offset: -15, fontSize: 12 }} />
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
            <Line type="monotone" dataKey="revenue" name="Total Gross Revenue" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="totalCosts" name="Total Operating Costs" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="fixedCosts" name="Fixed Overhead Floor" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={1.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
