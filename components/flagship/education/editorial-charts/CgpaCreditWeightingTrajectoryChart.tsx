"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { term: "Sem 1", sgpa: 8.2, cgpa: 8.2 },
  { term: "Sem 2", sgpa: 8.6, cgpa: 8.4 },
  { term: "Sem 3", sgpa: 8.8, cgpa: 8.53 },
  { term: "Sem 4", sgpa: 9.1, cgpa: 8.68 },
  { term: "Sem 5", sgpa: 9.3, cgpa: 8.80 },
  { term: "Sem 6", sgpa: 9.0, cgpa: 8.83 },
  { term: "Sem 7", sgpa: 9.4, cgpa: 8.91 },
  { term: "Sem 8", sgpa: 9.5, cgpa: 8.98 },
];

export function CgpaCreditWeightingTrajectoryChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Cumulative CGPA Dampening & Term SGPA Sensitivity Across 8 Semesters
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        As cumulative credit hours accumulate, individual semester SGPA fluctuations have diminishing mathematical impact on the overall CGPA trajectory.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="term" tick={{ fontSize: 11 }} />
            <YAxis domain={[7.5, 10.0]} tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Area type="monotone" dataKey="sgpa" name="Semester SGPA" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
            <Area type="monotone" dataKey="cgpa" name="Cumulative CGPA" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
