"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { device: "LED Bulb", watts: 10, horsepower: 0.013, btuPerHour: 34.12 },
  { device: "Gaming PC", watts: 650, horsepower: 0.871, btuPerHour: 2217.9 },
  { device: "Microwave Oven", watts: 1200, horsepower: 1.609, btuPerHour: 4094.6 },
  { device: "Residential HVAC", watts: 3500, horsepower: 4.693, btuPerHour: 11942.4 },
  { device: "Compact EV Motor", watts: 150000, horsepower: 201.15, btuPerHour: 511821.5 },
];

export function PowerEnergyRateComparisonChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Electrical &amp; Mechanical Power Delivery Rates (Watts vs Mechanical HP)
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Instantaneous energy transfer rate comparison (1 Mechanical Horsepower = 745.7 Watts = 2,544 BTU/hr).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.slice(0, 4)} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="device" />
            <YAxis label={{ value: "Power Rating (Watts)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="watts" name="Power (Watts, W)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="btuPerHour" name="BTU / Hour" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
