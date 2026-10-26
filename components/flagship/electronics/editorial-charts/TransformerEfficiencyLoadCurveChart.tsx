"use client";

import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { load: "25% Load", efficiency: 91.5, coreLossPct: 6.5, copperLossPct: 2.0 },
  { load: "50% Load", efficiency: 96.0, coreLossPct: 3.0, copperLossPct: 1.0 },
  { load: "75% Load", efficiency: 97.4, coreLossPct: 1.8, copperLossPct: 0.8 },
  { load: "100% Load", efficiency: 96.8, coreLossPct: 1.2, copperLossPct: 2.0 },
  { load: "125% Load", efficiency: 94.5, coreLossPct: 0.9, copperLossPct: 4.6 },
];

export function TransformerEfficiencyLoadCurveChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Transformer Operating Efficiency Curve vs Percentage Rated Load
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Peak efficiency occurs near 70% to 80% loading where constant magnetic core loss equals variable I²R copper winding loss.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="load" />
            <YAxis domain={[85, 100]} label={{ value: "Efficiency (%)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="efficiency" name="Transformer Efficiency (%)" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
