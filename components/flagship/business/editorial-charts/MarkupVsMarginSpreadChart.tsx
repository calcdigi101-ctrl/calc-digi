"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const data = [
  { markup: "10%", markupVal: 10, marginVal: 9.1 },
  { markup: "25%", markupVal: 25, marginVal: 20.0 },
  { markup: "50%", markupVal: 50, marginVal: 33.3 },
  { markup: "100%", markupVal: 100, marginVal: 50.0 }, // Keystone
  { markup: "150%", markupVal: 150, marginVal: 60.0 },
  { markup: "200%", markupVal: 200, marginVal: 66.7 },
  { markup: "300%", markupVal: 300, marginVal: 75.0 },
  { markup: "400%", markupVal: 400, marginVal: 80.0 },
];

export function MarkupVsMarginSpreadChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Markup on Cost vs Resulting Gross Profit Margin (%)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Illustrating the non-linear relationship: a 100% markup yields a 50% margin; achieving an 80% margin requires a 400% markup.
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="markup" tick={{ fontSize: 11 }} stroke="#64748b" label={{ value: "Markup on Cost (%)", position: "insideBottom", offset: -15, fontSize: 12 }} />
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
            <Line type="monotone" dataKey="marginVal" name="Gross Profit Margin (%)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
