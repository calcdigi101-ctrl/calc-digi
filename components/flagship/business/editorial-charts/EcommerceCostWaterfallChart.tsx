"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { item: "Gross Sales (GMV)", amount: 100.0, fill: "#0284c7" },
  { item: "Landed COGS", amount: -28.0, fill: "#ef4444" },
  { item: "Paid Ad Spend", amount: -28.2, fill: "#f59e0b" },
  { item: "Fulfillment & 3PL", amount: -9.7, fill: "#8b5cf6" },
  { item: "Payment Fees", amount: -3.5, fill: "#64748b" },
  { item: "Retained Net Profit", amount: 30.6, fill: "#10b981" },
];

export function EcommerceCostWaterfallChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          E-Commerce $100 Order Value Net Profit Waterfall Decomposition
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Tracing how a $100 retail cart transaction is eroded by direct costs before yielding retained operational net profit.
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="item" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" interval={0} stroke="#64748b" />
            <YAxis tick={{ fontSize: 11 }} stroke="#64748b" unit="$" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderRadius: "8px",
                border: "none",
                fontSize: "12px",
                color: "#f8fafc",
              }}
              formatter={(val: any) => [`$${Math.abs(Number(val)).toFixed(1)}`, ""]}
            />
            <Bar dataKey="amount" name="Financial Impact" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
