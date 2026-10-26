"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { distance: "25 Feet", awg14: 1.3, awg12: 0.8, awg10: 0.5, awg8: 0.3 },
  { distance: "50 Feet", awg14: 2.5, awg12: 1.6, awg10: 1.0, awg8: 0.6 },
  { distance: "100 Feet", awg14: 5.1, awg12: 3.2, awg10: 2.0, awg8: 1.3 },
  { distance: "150 Feet", awg14: 7.6, awg12: 4.8, awg10: 3.0, awg8: 1.9 },
];

export function WireGaugeDistanceVoltageDropChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Percentage Voltage Drop (%) vs Conductor Distance at 15A / 120V
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        NEC Article 210.19 recommends branch circuit voltage drop not exceed 3.0% (represented by red threshold).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="distance" />
            <YAxis label={{ value: "Voltage Drop (%)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="awg14" name="AWG 14 (15A Standard)" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="awg12" name="AWG 12 (20A Upsized)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="awg10" name="AWG 10 (30A Feeder)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="awg8" name="AWG 8 (Heavy Subpanel)" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
