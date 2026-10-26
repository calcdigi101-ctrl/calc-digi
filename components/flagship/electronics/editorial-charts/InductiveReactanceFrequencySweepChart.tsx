"use client";

import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { freq: "60 Hz", xl10mH: 3.77, xl50mH: 18.85, xl200mH: 75.4 },
  { freq: "500 Hz", xl10mH: 31.4, xl50mH: 157.1, xl200mH: 628.3 },
  { freq: "1 kHz", xl10mH: 62.8, xl50mH: 314.2, xl200mH: 1256.6 },
  { freq: "5 kHz", xl10mH: 314.2, xl50mH: 1570.8, xl200mH: 6283.2 },
  { freq: "20 kHz", xl10mH: 1256.6, xl50mH: 6283.2, xl200mH: 25132.7 },
];

export function InductiveReactanceFrequencySweepChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Inductive Reactance (XL) Growth vs Frequency (Ω)
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Linear increase in inductor impedance XL = 2πfL across audio and ultrasonic frequencies illustrating low-pass choke behavior.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="freq" />
            <YAxis scale="log" domain={['auto', 'auto']} label={{ value: "Reactance (Ω)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="xl10mH" name="10 mH Inductor" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="xl50mH" name="50 mH Inductor" stroke="#6366f1" strokeWidth={2} />
            <Line type="monotone" dataKey="xl200mH" name="200 mH Inductor" stroke="#f59e0b" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
