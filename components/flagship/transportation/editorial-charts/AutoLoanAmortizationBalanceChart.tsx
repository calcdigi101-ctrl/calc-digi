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
  { term: "36 Months", monthly: 978, principal: 32000, interest: 3208, total: 35208 },
  { term: "48 Months", monthly: 759, principal: 32000, interest: 4432, total: 36432 },
  { term: "60 Months", monthly: 626, principal: 32000, interest: 5560, total: 37560 },
  { term: "72 Months", monthly: 538, principal: 32000, interest: 6736, total: 38736 },
  { term: "84 Months", monthly: 476, principal: 32000, interest: 7984, total: 39984 },
];

export function AutoLoanAmortizationBalanceChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Monthly Cash Flow vs Cumulative Financing Interest by Loan Term
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Comparison of monthly payment affordability against total financing interest paid on a $32,000 auto loan at 6.5% APR across 36 to 84 month terms.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="term" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="left" unit="$" domain={[0, 1200]} tick={{ fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" unit="$" domain={[0, 10000]} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any, name: any) => [
                `$${Number(val).toLocaleString()}`,
                name,
              ]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar yAxisId="left" dataKey="monthly" name="Monthly Payment ($/mo)" fill="#0ea5e9" />
            <Bar yAxisId="right" dataKey="interest" name="Cumulative Financing Interest ($)" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
