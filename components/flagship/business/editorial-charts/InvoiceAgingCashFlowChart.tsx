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
  { bracket: "Current (1-30 Days)", collectiblePct: 98, discountClaimed: 45, defaultRisk: 2 },
  { bracket: "Past Due (31-60 Days)", collectiblePct: 89, discountClaimed: 0, defaultRisk: 11 },
  { bracket: "Delinquent (61-90 Days)", collectiblePct: 73, discountClaimed: 0, defaultRisk: 27 },
  { bracket: "Default Risk (90+ Days)", collectiblePct: 52, discountClaimed: 0, defaultRisk: 48 },
];

export function InvoiceAgingCashFlowChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Commercial Invoice Aging & Collection Realization Rates (%)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Probability of full invoice cash collection drops precipitously from 98% within term to 52% past 90 days.
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="bracket" tick={{ fontSize: 11 }} stroke="#64748b" />
            <YAxis tick={{ fontSize: 11 }} stroke="#64748b" unit="%" domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderRadius: "8px",
                border: "none",
                fontSize: "12px",
                color: "#f8fafc",
              }}
              formatter={(val: any) => [`${val}%`, ""]}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: "10px", fontSize: "12px" }} />
            <Bar dataKey="collectiblePct" name="Cash Collection Rate (%)" fill="#10b981" />
            <Bar dataKey="defaultRisk" name="Bad Debt Default Risk (%)" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
