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
  { sector: "Electronics Hardware", materials: 58, labor: 22, overhead: 20 },
  { sector: "Apparel & Textiles", materials: 45, labor: 35, overhead: 20 },
  { sector: "Food & Beverage", materials: 65, labor: 18, overhead: 17 },
  { sector: "Automotive Parts", materials: 52, labor: 26, overhead: 22 },
  { sector: "Commercial Printing", materials: 40, labor: 30, overhead: 30 },
];

export function CogsManufacturingCostStructureChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          COGS Cost Component Distribution by Manufacturing Sector (%)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Relative proportions of Direct Raw Materials, Direct Production Labor, and Applied Factory Overhead.
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="sector" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" interval={0} stroke="#64748b" />
            <YAxis tick={{ fontSize: 11 }} stroke="#64748b" unit="%" domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderRadius: "8px",
                border: "none",
                fontSize: "12px",
                color: "#f8fafc",
              }}
              formatter={(val: any) => [`${val}% of COGS`, ""]}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: "10px", fontSize: "12px" }} />
            <Bar dataKey="materials" name="Direct Materials" stackId="a" fill="#0284c7" />
            <Bar dataKey="labor" name="Direct Labor" stackId="a" fill="#10b981" />
            <Bar dataKey="overhead" name="Manufacturing Overhead" stackId="a" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
