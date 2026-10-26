"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { arc: "30° (π/6)", degrees: 30, radians: 0.5236, gradians: 33.33, arcMinutes: 1800 },
  { arc: "45° (π/4)", degrees: 45, radians: 0.7854, gradians: 50.0, arcMinutes: 2700 },
  { arc: "60° (π/3)", degrees: 60, radians: 1.0472, gradians: 66.67, arcMinutes: 3600 },
  { arc: "90° (π/2)", degrees: 90, radians: 1.5708, gradians: 100.0, arcMinutes: 5400 },
  { arc: "180° (π)", degrees: 180, radians: 3.1416, gradians: 200.0, arcMinutes: 10800 },
];

export function AngleTrigonometricCircularDistributionChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Trigonometric Arc Units: Degrees, Radians &amp; Gradians
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Mathematical circular division comparing sexagesimal degrees (360°), natural radian arcs (2π), and decimal gradians (400 gon).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="arc" />
            <YAxis label={{ value: "Angle Magnitude", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="degrees" name="Degrees (°)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="gradians" name="Gradians (gon)" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
