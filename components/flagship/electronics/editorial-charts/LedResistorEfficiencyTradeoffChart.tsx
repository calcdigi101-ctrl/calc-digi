"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { supply: "5V USB", ledPowerMw: 64, resistorHeatMw: 36, efficiencyPct: 64 },
  { supply: "9V Battery", ledPowerMw: 64, resistorHeatMw: 116, efficiencyPct: 35 },
  { supply: "12V Automotive", ledPowerMw: 64, resistorHeatMw: 176, efficiencyPct: 27 },
  { supply: "24V Industrial", ledPowerMw: 64, resistorHeatMw: 416, efficiencyPct: 13 },
];

export function LedResistorEfficiencyTradeoffChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        LED Power vs Resistor Thermal Loss across DC Supply Voltages (3.2V @ 20mA)
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Demonstrates why higher DC supply voltages waste substantial power in linear current-limiting series resistors.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="supply" />
            <YAxis label={{ value: "Power (mW)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="ledPowerMw" name="Useful LED Light Power (mW)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="resistorHeatMw" name="Resistor Heat Dissipation (mW)" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
