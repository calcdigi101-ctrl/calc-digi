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
  { item: "Gross Revenue", amount: 500, fill: "#0284c7" },
  { item: "COGS", amount: -180, fill: "#ef4444" },
  { item: "Gross Profit", amount: 320, fill: "#10b981" },
  { item: "Operating SG&A", amount: -195, fill: "#f59e0b" },
  { item: "Operating EBIT", amount: 125, fill: "#06b6d4" },
  { item: "Taxes & Interest", amount: -28, fill: "#64748b" },
  { item: "Net Bottom Line", amount: 97, fill: "#8b5cf6" },
];

export function ProfitMarginWaterfallTiersChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Corporate Revenue to Net Income Waterfall ($ Thousands)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Tracking a $500k corporate revenue baseline across Gross Profit ($320k / 64%), Operating EBIT ($125k / 25%), and Net Income ($97k / 19.4%).
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="item" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" interval={0} stroke="#64748b" />
            <YAxis tick={{ fontSize: 11 }} stroke="#64748b" tickFormatter={(v) => `$${v}k`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderRadius: "8px",
                border: "none",
                fontSize: "12px",
                color: "#f8fafc",
              }}
              formatter={(val: any) => [`$${Math.abs(Number(val))}k`, ""]}
            />
            <Bar dataKey="amount" name="Financial Impact" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
