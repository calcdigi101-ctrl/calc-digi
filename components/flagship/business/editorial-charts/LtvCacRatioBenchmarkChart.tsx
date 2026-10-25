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
  { model: "Enterprise SaaS", ltvCac: 4.8, paybackMonths: 8, benchmark: 3.0 },
  { model: "Mid-Market B2B", ltvCac: 3.6, paybackMonths: 11, benchmark: 3.0 },
  { model: "Self-Serve PLG", ltvCac: 3.2, paybackMonths: 6, benchmark: 3.0 },
  { model: "DTC E-Commerce", ltvCac: 2.8, paybackMonths: 3, benchmark: 3.0 },
  { model: "Consumer App", ltvCac: 2.1, paybackMonths: 5, benchmark: 3.0 },
];

export function LtvCacRatioBenchmarkChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          LTV-to-CAC Efficiency Multiples Across Business Models
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Comparing customer lifetime value ratios against the 3.0x venture sustainability threshold.
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="model" tick={{ fontSize: 11 }} stroke="#64748b" />
            <YAxis tick={{ fontSize: 11 }} stroke="#64748b" label={{ value: "Ratio (x)", angle: -90, position: "insideLeft", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderRadius: "8px",
                border: "none",
                fontSize: "12px",
                color: "#f8fafc",
              }}
              formatter={(val: any) => [`${val}x`, ""]}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: "10px", fontSize: "12px" }} />
            <Bar dataKey="ltvCac" name="Realized LTV : CAC Multiple" fill="#0284c7" />
            <Bar dataKey="benchmark" name="Target Benchmark (3.0x)" fill="#94a3b8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
