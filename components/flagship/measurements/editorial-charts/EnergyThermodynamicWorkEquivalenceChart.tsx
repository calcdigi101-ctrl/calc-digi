"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { event: "Drop Apple 1m", joules: 1, calories: 0.239, wattHours: 0.000278 },
  { event: "AAA Battery", joules: 4500, calories: 1075, wattHours: 1.25 },
  { event: "Dietary Calorie", joules: 4184, calories: 1000, wattHours: 1.162 },
  { event: "Smartphone Charge", joules: 43200, calories: 10325, wattHours: 12.0 },
  { event: "1 Liter Gasoline", joules: 32000000, calories: 7648000, wattHours: 8888.9 },
];

export function EnergyThermodynamicWorkEquivalenceChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Thermodynamic Work &amp; Chemical Energy Density Equivalences (Joules vs Wh)
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Comparative mechanical work and chemical energy content across common energy benchmarks.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.slice(1, 4)} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="event" />
            <YAxis label={{ value: "Energy (Joules, J)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="joules" name="Joules (J)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="calories" name="Calories (cal)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
