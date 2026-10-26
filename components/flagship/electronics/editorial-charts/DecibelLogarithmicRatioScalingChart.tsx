"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { db: "-20 dB", powerRatio: 0.01, voltageRatio: 0.1 },
  { db: "-10 dB", powerRatio: 0.1, voltageRatio: 0.316 },
  { db: "-3 dB", powerRatio: 0.5, voltageRatio: 0.707 },
  { db: "0 dB", powerRatio: 1.0, voltageRatio: 1.0 },
  { db: "+3 dB", powerRatio: 2.0, voltageRatio: 1.414 },
  { db: "+10 dB", powerRatio: 10.0, voltageRatio: 3.162 },
  { db: "+20 dB", powerRatio: 100.0, voltageRatio: 10.0 },
];

export function DecibelLogarithmicRatioScalingChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Decibel (dB) Gain & Attenuation vs Linear Multiplication Factor
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Logarithmic relationship showing power doubling (+3 dB) and ten-fold amplification (+10 dB).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="db" />
            <YAxis scale="log" domain={['auto', 'auto']} label={{ value: "Multiplier (×)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="powerRatio" name="Power Multiplier (P2/P1)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="voltageRatio" name="Voltage Multiplier (V2/V1)" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
