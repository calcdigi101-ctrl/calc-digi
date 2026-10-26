"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { body: "Moon (1.62 m/s²)", earthKg: 75, localWeightN: 121.5, weightLbf: 27.3 },
  { body: "Mars (3.72 m/s²)", earthKg: 75, localWeightN: 279.0, weightLbf: 62.7 },
  { body: "Earth (9.81 m/s²)", earthKg: 75, localWeightN: 735.8, weightLbf: 165.3 },
  { body: "Jupiter (24.79 m/s²)", earthKg: 75, localWeightN: 1859.3, weightLbf: 418.0 },
];

export function MassWeightPlanetaryGravitationalChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Invariable Mass (75 kg) vs Local Gravitational Weight Across Solar Bodies
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Illustration of mass invariance (kg) versus gravitational weight force in Newtons (N) and pounds-force (lbf).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="body" />
            <YAxis label={{ value: "Weight Force", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="localWeightN" name="Weight (Newtons, N)" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="weightLbf" name="Weight (Pounds-Force, lbf)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
