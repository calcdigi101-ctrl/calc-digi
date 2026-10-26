"use client";

import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { month: "Jan", generationKwh: 620, consumptionKwh: 900 },
  { month: "Mar", generationKwh: 980, consumptionKwh: 850 },
  { month: "May", generationKwh: 1350, consumptionKwh: 880 },
  { month: "Jul", generationKwh: 1520, consumptionKwh: 1050 },
  { month: "Sep", generationKwh: 1180, consumptionKwh: 890 },
  { month: "Nov", generationKwh: 710, consumptionKwh: 920 },
];

export function SolarIrradianceMonthlyYieldCurveChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Monthly Solar Generation vs Household Energy Consumption (kWh)
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Annual generation seasonality for an 8 kW residential array compared against typical grid consumption baselines.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="month" />
            <YAxis label={{ value: "Energy (kWh)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="consumptionKwh" name="Household Consumption (kWh)" stroke="#94a3b8" fill="#cbd5e1" opacity={0.4} />
            <Area type="monotone" dataKey="generationKwh" name="Solar Array Yield (kWh)" stroke="#10b981" fill="#10b981" opacity={0.7} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
