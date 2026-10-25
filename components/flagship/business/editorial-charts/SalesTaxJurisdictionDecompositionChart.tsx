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
  { state: "California", stateRate: 7.25, localAvg: 1.57, combined: 8.82 },
  { state: "Texas", stateRate: 6.25, localAvg: 1.95, combined: 8.20 },
  { state: "New York", stateRate: 4.00, localAvg: 4.52, combined: 8.52 },
  { state: "Washington", stateRate: 6.50, localAvg: 2.79, combined: 9.29 },
  { state: "Tennessee", stateRate: 7.00, localAvg: 2.55, combined: 9.55 },
  { state: "Florida", stateRate: 6.00, localAvg: 1.05, combined: 7.05 },
  { state: "Illinois", stateRate: 6.25, localAvg: 2.56, combined: 8.81 },
];

export function SalesTaxJurisdictionDecompositionChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        State Base vs. Local Municipal Sales Tax Rate Stacking Across Major US Markets
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Comparing mandatory statutory state base sales tax rates with average municipal and county surcharges.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis dataKey="state" stroke="#94a3b8" fontSize={11} />
            <YAxis stroke="#94a3b8" fontSize={11} unit="%" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "8px",
                color: "#f8fafc",
                fontSize: "12px",
              }}
              formatter={(value: any, name: any) => [
                `${value}%`,
                name === "stateRate" ? "State Statutory Rate" : "Local / County Surcharge",
              ]}
            />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
            <Bar dataKey="stateRate" name="State Base Rate (%)" fill="#0284c7" stackId="tax" radius={[0, 0, 0, 0]} />
            <Bar dataKey="localAvg" name="Local / County Surcharge (%)" fill="#f59e0b" stackId="tax" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
