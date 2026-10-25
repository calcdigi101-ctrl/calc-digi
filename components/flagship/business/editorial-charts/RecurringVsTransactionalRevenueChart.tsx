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
  { quarter: "Q1", mrrRevenue: 285000, transactional: 180000, total: 465000 },
  { quarter: "Q2", mrrRevenue: 345000, transactional: 195000, total: 540000 },
  { quarter: "Q3", mrrRevenue: 420000, transactional: 210000, total: 630000 },
  { quarter: "Q4", mrrRevenue: 510000, transactional: 225000, total: 735000 },
  { quarter: "Q5 Proj", mrrRevenue: 615000, transactional: 240000, total: 855000 },
];

export function RecurringVsTransactionalRevenueChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Quarterly Blended Revenue Expansion: Compounding MRR vs Transactional
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Visualizing subscription revenue compounding layer stacked above base transactional order flow.
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="quarter" tick={{ fontSize: 11 }} stroke="#64748b" />
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
            <Bar dataKey="mrrRevenue" name="Monthly Recurring Subscriptions" stackId="a" fill="#0284c7" />
            <Bar dataKey="transactional" name="Transactional Direct Orders" stackId="a" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
