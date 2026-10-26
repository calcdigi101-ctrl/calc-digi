"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { institution: "Community College", tuition: 4200, housing: 7500, books: 2500 },
  { institution: "In-State Public", tuition: 11200, housing: 11800, books: 3200 },
  { institution: "Out-of-State Public", tuition: 28500, housing: 14500, books: 4500 },
  { institution: "Private University", tuition: 48000, housing: 17500, books: 5500 },
];

export function CollegeCostOfAttendanceBreakdownChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Annual Cost of Attendance (COA) Structure Across Higher Ed Tiers
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Stack composition of direct tuition vs indirect housing, dining, and educational materials expenses.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="institution" tick={{ fontSize: 10 }} />
            <YAxis unit="$" tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="tuition" name="Tuition & Mandatory Fees" stackId="a" fill="#3b82f6" />
            <Bar dataKey="housing" name="Room & Board (Housing)" stackId="a" fill="#10b981" />
            <Bar dataKey="books" name="Books, Supplies & Personal" stackId="a" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
