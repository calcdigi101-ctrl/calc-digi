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
  { year: "Year 1", principal: 42150, interest: 18450, balance: 207850 },
  { year: "Year 2", principal: 45540, interest: 15060, balance: 162310 },
  { year: "Year 3", principal: 49200, interest: 11400, balance: 113110 },
  { year: "Year 4", principal: 53160, interest: 7440, balance: 59950 },
  { year: "Year 5", principal: 59950, interest: 3150, balance: 0 },
];

export function CommercialDebtAmortizationChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Commercial Loan Debt Service: Annual Principal vs Interest Split
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          5-year $250,000 commercial term facility at 7.75% APR illustrating shifting equity amortization over time.
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="#64748b" />
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
            <Bar dataKey="principal" name="Principal Amortization" stackId="a" fill="#0284c7" />
            <Bar dataKey="interest" name="Financing Interest Cost" stackId="a" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
