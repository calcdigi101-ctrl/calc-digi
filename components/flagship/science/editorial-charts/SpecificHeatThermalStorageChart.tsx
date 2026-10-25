"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { material: "Liquid Water", c: 4184, energy10C: 41.84, fill: "#0284c7" },
  { material: "Ethanol", c: 2440, energy10C: 24.40, fill: "#06b6d4" },
  { material: "Ice (Solid H₂O)", c: 2090, energy10C: 20.90, fill: "#38bdf8" },
  { material: "Steam (Vapor)", c: 2010, energy10C: 20.10, fill: "#94a3b8" },
  { material: "Aluminum", c: 897, energy10C: 8.97, fill: "#64748b" },
  { material: "Carbon Steel", c: 450, energy10C: 4.50, fill: "#475569" },
  { material: "Copper", c: 385, energy10C: 3.85, fill: "#f59e0b" },
  { material: "Lead", c: 129, energy10C: 1.29, fill: "#ef4444" },
];

export function SpecificHeatThermalStorageChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Specific Heat Capacity Comparison: Thermal Energy Storage (J/kg·°C)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Specific heat capacity c indicates heat energy required to raise 1 kg of material by 1 °C. High c materials (like water) resist rapid temperature shifts.
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="material" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" interval={0} stroke="#64748b" />
            <YAxis tick={{ fontSize: 11 }} stroke="#64748b" label={{ value: "J / kg·°C", angle: -90, position: "insideLeft", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderRadius: "8px",
                border: "none",
                fontSize: "12px",
                color: "#f8fafc",
              }}
              formatter={(val: any) => [`${Number(val).toLocaleString()} J/(kg·°C)`, "Specific Heat"]}
            />
            <Bar dataKey="c" name="Specific Heat Capacity" fill="#0284c7" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
