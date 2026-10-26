"use client";

import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { rate: "C/20 (150mA)", theoretical: 20.0, actualDelivered: 19.8, efficiency: 99 },
  { rate: "C/10 (300mA)", theoretical: 10.0, actualDelivered: 9.4, efficiency: 94 },
  { rate: "C/5 (600mA)", theoretical: 5.0, actualDelivered: 4.5, efficiency: 90 },
  { rate: "1C (3000mA)", theoretical: 1.0, actualDelivered: 0.81, efficiency: 81 },
  { rate: "2C (6000mA)", theoretical: 0.5, actualDelivered: 0.35, efficiency: 70 },
];

export function BatteryDischargePeukertCurveChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Battery Runtime Delivery vs Discharge C-Rate (Peukert Effect)
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Comparison of theoretical linear capacity vs actual delivered operational hours for a 3,000 mAh Li-ion cell.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="rate" />
            <YAxis label={{ value: "Runtime (Hours)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="theoretical" name="Theoretical Runtime (hr)" stroke="#94a3b8" fill="#cbd5e1" opacity={0.5} />
            <Area type="monotone" dataKey="actualDelivered" name="Actual Delivered Runtime (hr)" stroke="#10b981" fill="#10b981" opacity={0.7} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
