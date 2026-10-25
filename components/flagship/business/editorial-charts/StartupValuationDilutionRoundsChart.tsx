"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { round: "Founding", founders: 100, seedInvestors: 0, seriesA: 0, seriesB: 0, esop: 0 },
  { round: "Seed ($2M)", founders: 70, seedInvestors: 20, seriesA: 0, seriesB: 0, esop: 10 },
  { round: "Series A ($10M)", founders: 49, seedInvestors: 16, seriesA: 23, seriesB: 0, esop: 12 },
  { round: "Series B ($30M)", founders: 36, seedInvestors: 12, seriesA: 18, seriesB: 20, esop: 14 },
];

export function StartupValuationDilutionRoundsChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Founder Equity Dilution & Cap Table Progression Across Venture Financing Rounds
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Simulating founder ownership dilution alongside investor equity tranches and employee stock option pool (ESOP) expansion.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis dataKey="round" stroke="#94a3b8" fontSize={11} />
            <YAxis stroke="#94a3b8" fontSize={11} unit="%" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "8px",
                color: "#f8fafc",
                fontSize: "12px",
              }}
              formatter={(value: any) => [`${value}%`]}
            />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
            <Area type="monotone" dataKey="founders" name="Founder Equity (%)" stackId="cap" stroke="#10b981" fill="#10b981" fillOpacity={0.8} />
            <Area type="monotone" dataKey="esop" name="Employee ESOP Pool (%)" stackId="cap" stroke="#6366f1" fill="#6366f1" fillOpacity={0.8} />
            <Area type="monotone" dataKey="seedInvestors" name="Seed Investors (%)" stackId="cap" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.8} />
            <Area type="monotone" dataKey="seriesA" name="Series A Investors (%)" stackId="cap" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.8} />
            <Area type="monotone" dataKey="seriesB" name="Series B Investors (%)" stackId="cap" stroke="#ec4899" fill="#ec4899" fillOpacity={0.8} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
