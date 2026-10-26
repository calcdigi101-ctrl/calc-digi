"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { voltage: "120V / 208V", singlePhaseKw: 6.0, threePhaseKw: 10.4, capacityMultiplier: 1.732 },
  { voltage: "230V / 400V", singlePhaseKw: 11.5, threePhaseKw: 19.9, capacityMultiplier: 1.732 },
  { voltage: "277V / 480V", singlePhaseKw: 13.8, threePhaseKw: 24.0, capacityMultiplier: 1.732 },
];

export function ThreePhaseBalancedLoadPowerChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Three-Phase vs Single-Phase Power Delivery (50A Circuit Baseline)
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Demonstrates the √3 (1.732×) power delivery capacity advantage of three-phase industrial distribution systems.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="voltage" />
            <YAxis label={{ value: "Power Capacity (kW)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="singlePhaseKw" name="Single-Phase Real Power (kW)" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="threePhaseKw" name="Three-Phase Real Power (kW)" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
