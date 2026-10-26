"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { pct: "60%", gpa: 1.0 },
  { pct: "65%", gpa: 1.3 },
  { pct: "70%", gpa: 1.7 },
  { pct: "73%", gpa: 2.0 },
  { pct: "77%", gpa: 2.3 },
  { pct: "80%", gpa: 2.7 },
  { pct: "83%", gpa: 3.0 },
  { pct: "87%", gpa: 3.3 },
  { pct: "90%", gpa: 3.7 },
  { pct: "93%", gpa: 4.0 },
  { pct: "100%", gpa: 4.0 },
];

export function PercentageToGpaCurveMatrixChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Percentage to 4.0 Scale GPA Transformation Function
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Step-wise non-linear mapping of raw percentage marks into academic quality points under standard collegiate guidelines.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="pct" tick={{ fontSize: 11 }} />
            <YAxis domain={[0, 4.0]} tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Area type="stepAfter" dataKey="gpa" name="4.0 GPA Equivalent" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.2} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
