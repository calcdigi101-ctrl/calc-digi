"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { grade: "F", standard: 0.0, honors: 0.0, ap: 0.0 },
  { grade: "D", standard: 1.0, honors: 1.5, ap: 2.0 },
  { grade: "C", standard: 2.0, honors: 2.5, ap: 3.0 },
  { grade: "B", standard: 3.0, honors: 3.5, ap: 4.0 },
  { grade: "A", standard: 4.0, honors: 4.5, ap: 5.0 },
];

export function GpaScaleWeightingComparisonChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        GPA Scale Weighting Comparison: Standard vs Honors (+0.5) vs AP (+1.0)
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Comparative quality point differentials awarded across letter grade tiers under standard unweighted vs weighted high school academic models.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="grade" tick={{ fontSize: 11 }} />
            <YAxis domain={[0, 5.0]} tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Line type="monotone" dataKey="standard" name="Standard (4.0 Max)" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="honors" name="Honors (+0.5 Boost)" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="ap" name="AP / IB (+1.0 Boost)" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
