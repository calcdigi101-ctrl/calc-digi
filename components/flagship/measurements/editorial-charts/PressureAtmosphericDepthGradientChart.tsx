"use client";

import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { depth: "0m (Surface)", kpa: 101.3, bar: 1.013, psi: 14.696, atm: 1.0 },
  { depth: "10m Depth", kpa: 199.4, bar: 1.994, psi: 28.92, atm: 1.97 },
  { depth: "30m Depth", kpa: 395.6, bar: 3.956, psi: 57.38, atm: 3.90 },
  { depth: "50m Depth", kpa: 591.8, bar: 5.918, psi: 85.83, atm: 5.84 },
  { depth: "100m Depth", kpa: 1082.3, bar: 10.823, psi: 156.97, atm: 10.68 },
];

export function PressureAtmosphericDepthGradientChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Hydrostatic Pressure Gradient Across Seawater Depths (kPa &amp; PSI)
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Linear hydrostatic pressure accumulation modeled via P = P_atm + ρgh across oceanic depth intervals.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="depth" />
            <YAxis label={{ value: "Pressure (kPa)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="kpa" name="Kilopascals (kPa)" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="psi" name="Pounds/sq.inch (psi)" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
