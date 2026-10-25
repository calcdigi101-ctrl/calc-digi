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
  { year: "Year 1", cumulative: 25, annualized: 25.0 },
  { year: "Year 2", cumulative: 56, annualized: 24.9 },
  { year: "Year 3", cumulative: 95, annualized: 24.9 },
  { year: "Year 4", cumulative: 144, annualized: 25.0 },
  { year: "Year 5", cumulative: 205, annualized: 25.0 },
  { year: "Year 7", cumulative: 377, annualized: 25.0 },
  { year: "Year 10", cumulative: 831, annualized: 25.0 },
];

export function RoiAnnualizedCagrHorizonChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Cumulative Return vs. Compound Annual Growth Rate (CAGR) Over Holding Period
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Visualizing exponential capital compounding at a constant 25% annualized return across 1 to 10 year investment horizons.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="roiCumulativeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} />
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
                name === "cumulative" ? "Cumulative Return" : "Annualized CAGR",
              ]}
            />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
            <Area
              type="monotone"
              dataKey="cumulative"
              name="Cumulative Total Return (%)"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#roiCumulativeGrad)"
            />
            <Area
              type="monotone"
              dataKey="annualized"
              name="Annualized CAGR Rate (%)"
              stroke="#6366f1"
              strokeWidth={2}
              fillOpacity={0}
              fill="#6366f1"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
