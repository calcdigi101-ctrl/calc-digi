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
  { check: "$25 Dining", tip15: 3.75, tip18: 4.50, tip20: 5.00, tip25: 6.25 },
  { check: "$50 Dining", tip15: 7.50, tip18: 9.00, tip20: 10.00, tip25: 12.50 },
  { check: "$100 Dining", tip15: 15.00, tip18: 18.00, tip20: 20.00, tip25: 25.00 },
  { check: "$200 Dining", tip15: 30.00, tip18: 36.00, tip20: 40.00, tip25: 50.00 },
];

export function HospitalityTipPercentageBenchmarkChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Hospitality Gratuity Dollar Amounts Across Guest Check Tiers
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Pre-tax dollar gratuity yields across standard industry service tiers: 15% (baseline), 18% (good), 20% (standard), and 25% (exceptional).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="check" tick={{ fontSize: 11 }} />
            <YAxis unit="$" domain={[0, 60]} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`$${val.toFixed(2)}`, "Gratuity Amount"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="tip15" name="15% Gratuity (Baseline)" fill="#94a3b8" />
            <Bar dataKey="tip18" name="18% Gratuity (Good Service)" fill="#0284c7" />
            <Bar dataKey="tip20" name="20% Gratuity (Standard)" fill="#10b981" />
            <Bar dataKey="tip25" name="25% Gratuity (Exceptional)" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
