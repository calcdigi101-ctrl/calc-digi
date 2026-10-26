"use client";

import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { freq: "60 Hz", xc10uF: 265.2, xc1uF: 2652.5, xc01uF: 26525.8 },
  { freq: "500 Hz", xc10uF: 31.8, xc1uF: 318.3, xc01uF: 3183.1 },
  { freq: "1 kHz", xc10uF: 15.9, xc1uF: 159.2, xc01uF: 1591.5 },
  { freq: "10 kHz", xc10uF: 1.59, xc1uF: 15.9, xc01uF: 159.2 },
  { freq: "100 kHz", xc10uF: 0.16, xc1uF: 1.59, xc01uF: 15.9 },
];

export function CapacitiveReactanceFrequencySweepChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Capacitive Reactance (Xc) Attenuation vs Frequency (Ω)
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Inverse relationship of capacitive reactance across AC frequencies demonstrating high-pass filter characteristics.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="freq" />
            <YAxis scale="log" domain={['auto', 'auto']} label={{ value: "Reactance (Ω)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="xc10uF" name="10 µF Capacitor" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="xc1uF" name="1 µF Capacitor" stroke="#6366f1" strokeWidth={2} />
            <Line type="monotone" dataKey="xc01uF" name="0.1 µF Capacitor" stroke="#f59e0b" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
