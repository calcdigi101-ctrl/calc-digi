"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { scale: "Micro (100 µm)", meters: 0.0001, feet: 0.000328, inches: 0.00394 },
  { scale: "Hand (10 cm)", meters: 0.1, feet: 0.328, inches: 3.937 },
  { scale: "Human (1.8 m)", meters: 1.8, feet: 5.906, inches: 70.866 },
  { scale: "Football (100 m)", meters: 100, feet: 328.084, inches: 3937.01 },
  { scale: "Kilometer (1 km)", meters: 1000, feet: 3280.84, inches: 39370.1 },
  { scale: "Marathon (42.2 km)", meters: 42195, feet: 138435, inches: 1661220 },
];

export function LengthScaleDynamicRangeChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Comparative Physical Length Scales Across Metric &amp; Imperial Units
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Relative order of magnitude span comparing metric meters, imperial feet, and inches across benchmark physical distances.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.slice(0, 5)} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="scale" />
            <YAxis label={{ value: "Magnitude (Log Reference)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="meters" name="Meters (m)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="feet" name="Feet (ft)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
