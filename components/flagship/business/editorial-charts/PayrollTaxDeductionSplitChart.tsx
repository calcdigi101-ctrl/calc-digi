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
  { tier: "$2,000 Check", net: 1470, incomeTax: 280, fica: 153, pretax: 97 },
  { tier: "$3,500 Check", net: 2465, incomeTax: 620, fica: 268, pretax: 147 },
  { tier: "$5,000 Check", net: 3410, incomeTax: 1010, fica: 382, pretax: 198 },
  { tier: "$7,500 Check", net: 4950, incomeTax: 1680, fica: 574, pretax: 296 },
];

export function PayrollTaxDeductionSplitChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Bi-Weekly Paycheck Withholding Decomposition by Gross Bracket ($)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing Net Take-Home Pay stacked with Federal/State income taxes, mandatory FICA taxes (7.65%), and pre-tax deductions.
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="tier" tick={{ fontSize: 11 }} stroke="#64748b" />
            <YAxis tick={{ fontSize: 11 }} stroke="#64748b" tickFormatter={(v) => `$${v}`} />
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
            <Bar dataKey="net" name="Net Take-Home Pay" stackId="a" fill="#10b981" />
            <Bar dataKey="incomeTax" name="Federal & State Taxes" stackId="a" fill="#ef4444" />
            <Bar dataKey="fica" name="FICA (Social Security & Medicare)" stackId="a" fill="#f59e0b" />
            <Bar dataKey="pretax" name="Pre-Tax Benefits & 401(k)" stackId="a" fill="#0284c7" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
