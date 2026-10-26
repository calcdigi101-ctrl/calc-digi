"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { current: "70%", targetA: 136.7, targetB: 103.3, targetC: 70.0 },
  { current: "75%", targetA: 125.0, targetB: 91.7, targetC: 58.3 },
  { current: "80%", targetA: 113.3, targetB: 80.0, targetC: 46.7 },
  { current: "85%", targetA: 101.7, targetB: 68.3, targetC: 35.0 },
  { current: "90%", targetA: 90.0, targetB: 56.7, targetC: 23.3 },
  { current: "95%", targetA: 78.3, targetB: 45.0, targetC: 11.7 },
];

export function FinalExamTargetFeasibilityChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Required Final Exam Score vs Current Grade (Assuming 30% Final Weight)
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Mathematical feasibility curves showing when target grades (A: 90%, B: 80%, C: 70%) become mathematically unattainable (&gt;100%).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="current" tick={{ fontSize: 11 }} />
            <YAxis unit="%" domain={[0, 140]} tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Line type="monotone" dataKey="targetA" name="Target A (90%)" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="targetB" name="Target B (80%)" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="targetC" name="Target C (70%)" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
