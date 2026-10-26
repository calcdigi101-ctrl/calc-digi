"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { credits: "6 cr", intro: 9, standard: 12, stem: 18 },
  { credits: "9 cr", intro: 13.5, standard: 18, stem: 27 },
  { credits: "12 cr", intro: 18, standard: 24, stem: 36 },
  { credits: "15 cr", intro: 22.5, standard: 30, stem: 45 },
  { credits: "18 cr", intro: 27, standard: 36, stem: 54 },
];

export function CarnegieStudyHoursAllocationChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Carnegie Unit Study Hours vs Credit Load by Academic Rigor
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Outside-of-class study commitment across semester credit hours comparing General Ed (1.5x) vs Standard (2x) vs Intensive STEM (3x).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="credits" tick={{ fontSize: 11 }} />
            <YAxis unit="h" domain={[0, 60]} tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Line type="monotone" dataKey="intro" name="Introductory (1.5x)" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="standard" name="Standard (2.0x)" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="stem" name="Rigorous STEM (3.0x)" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
