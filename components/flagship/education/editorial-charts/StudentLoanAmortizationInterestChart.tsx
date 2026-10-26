"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { term: "5-Year Plan", principal: 35000, interest: 4160, monthly: 652 },
  { term: "10-Year Plan", principal: 35000, interest: 12690, monthly: 397 },
  { term: "15-Year Plan", principal: 35000, interest: 19880, monthly: 305 },
  { term: "20-Year Plan", principal: 35000, interest: 27650, monthly: 261 },
];

export function StudentLoanAmortizationInterestChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Student Loan Lifetime Finance Charges Across Repayment Horizons
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Comparing total interest cost on a $35,000 balance at 6.5% interest across 5, 10, 15, and 20-year terms.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="term" tick={{ fontSize: 11 }} />
            <YAxis unit="$" tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="principal" name="Principal Borrowed" stackId="a" fill="#3b82f6" />
            <Bar dataKey="interest" name="Cumulative Finance Interest" stackId="a" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
