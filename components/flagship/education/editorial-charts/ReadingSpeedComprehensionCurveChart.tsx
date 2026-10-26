"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { wpm: 150, comp: 95, effective: 142.5 },
  { wpm: 250, comp: 85, effective: 212.5 },
  { wpm: 350, comp: 78, effective: 273.0 },
  { wpm: 450, comp: 68, effective: 306.0 },
  { wpm: 600, comp: 52, effective: 312.0 },
  { wpm: 800, comp: 35, effective: 280.0 },
];

export function ReadingSpeedComprehensionCurveChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Reading Pace (WPM) vs Comprehension Retention & Effective Rate
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Demonstrates the psycholinguistic speed-comprehension tradeoff: peak effective processing rate occurs near 450 WPM before steep retention drop.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="wpm" unit=" WPM" tick={{ fontSize: 11 }} />
            <YAxis domain={[0, 350]} tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Line type="monotone" dataKey="effective" name="Effective WPM" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="comp" name="Comprehension (%)" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
