"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { format: "Fast Casual (QSR)", foodCost: 28, laborBurden: 32, occupancy: 24, netProfit: 16 },
  { format: "Casual Dining", foodCost: 32, laborBurden: 36, occupancy: 22, netProfit: 10 },
  { format: "Fine Dining", foodCost: 35, laborBurden: 42, occupancy: 16, netProfit: 7 },
  { format: "Bakery / Cafe", foodCost: 22, laborBurden: 40, occupancy: 23, netProfit: 15 },
];

export function RestaurantFoodCostMarginWaterfallChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Hospitality Revenue Dollar Allocation & Prime Cost Benchmark Breakdown
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Comparative percentage distribution of food ingredient cost, prime culinary labor, occupancy overhead, and retained net profit.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="format" tick={{ fontSize: 11 }} />
            <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`${val}%`, "Share of Revenue"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="foodCost" name="Ingredient Food Cost %" stackId="a" fill="#0284c7" />
            <Bar dataKey="laborBurden" name="Culinary & Service Labor %" stackId="a" fill="#f59e0b" />
            <Bar dataKey="occupancy" name="Overhead & Rent %" stackId="a" fill="#64748b" />
            <Bar dataKey="netProfit" name="Retained Net Profit %" stackId="a" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
