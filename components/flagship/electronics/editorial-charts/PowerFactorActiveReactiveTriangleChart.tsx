"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { pf: "PF 0.60 (Poor)", activePowerKw: 6.0, reactivePowerKvar: 8.0, apparentPowerKva: 10.0 },
  { pf: "PF 0.75 (Fair)", activePowerKw: 7.5, reactivePowerKvar: 6.6, apparentPowerKva: 10.0 },
  { pf: "PF 0.85 (Standard)", activePowerKw: 8.5, reactivePowerKvar: 5.3, apparentPowerKva: 10.0 },
  { pf: "PF 0.95 (Optimal)", activePowerKw: 9.5, reactivePowerKvar: 3.1, apparentPowerKva: 10.0 },
  { pf: "PF 1.00 (Unity)", activePowerKw: 10.0, reactivePowerKvar: 0.0, apparentPowerKva: 10.0 },
];

export function PowerFactorActiveReactiveTriangleChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Power Factor Impact on Real vs Reactive Power (10 kVA Apparent Baseline)
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Illustrates how low power factor forces transmission cables to deliver unproductive reactive current (kVAR).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="pf" />
            <YAxis label={{ value: "Power (kW / kVAR)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="activePowerKw" name="Active Real Power (kW)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="reactivePowerKvar" name="Reactive Power (kVAR)" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
