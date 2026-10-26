"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { voltage: "3.3V", current100: 33, current250: 13.2, current500: 6.6 },
  { voltage: "5.0V", current100: 50, current250: 20.0, current500: 10.0 },
  { voltage: "12.0V", current100: 120, current250: 48.0, current500: 24.0 },
  { voltage: "24.0V", current100: 240, current250: 96.0, current500: 48.0 },
  { voltage: "48.0V", current100: 480, current250: 192.0, current500: 96.0 },
];

export function OhmsLawVoltageCurrentLinearityChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Current vs Voltage Response Across Resistance Tiers (mA)
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Linear current conduction modeled across 100 Ω, 250 Ω, and 500 Ω circuit impedances (Ohm&apos;s Law I = V / R).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="voltage" />
            <YAxis label={{ value: "Current (mA)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="current100" name="100 Ω Load" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="current250" name="250 Ω Load" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="current500" name="500 Ω Load" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
