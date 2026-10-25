"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const data = [
  { material: "Aerogel Solid", density: 0.002, category: "Ultra-Light Solid" },
  { material: "Cork Wood", density: 0.24, category: "Cellular Wood" },
  { material: "Ethanol (20°C)", density: 0.789, category: "Volatile Solvent" },
  { material: "Water (4°C Standard)", density: 1.000, category: "Reference Liquid" },
  { material: "Seawater (3.5%)", density: 1.025, category: "Saline Solution" },
  { material: "Aluminum Alloy", density: 2.70, category: "Light Metal" },
  { material: "Titanium Grade 5", density: 4.43, category: "Structural Metal" },
  { material: "Carbon Steel", density: 7.85, category: "Heavy Alloy" },
  { material: "Lead Metal", density: 11.34, category: "Heavy Shielding" },
  { material: "Liquid Mercury", density: 13.55, category: "Liquid Metal" },
  { material: "Pure Gold", density: 19.32, category: "Precious Dense Metal" },
  { material: "Osmium Metal", density: 22.59, category: "Densest Element" }
];

export function DensityMaterialComparisonChart() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          Material Densities Across Solid and Liquid Elements (g/cm³ at 20°C)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Specific gravity benchmarks relative to water (1.000 g/cm³); materials below 1.0 float in water.
        </p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="material"
              stroke="#64748b"
              tick={{ fontSize: 10 }}
              angle={-20}
              textAnchor="end"
            />
            <YAxis stroke="#64748b" tick={{ fontSize: 11 }} unit=" g/cm³" />
            <Tooltip
              formatter={(val, name, item) => [`${val} g/cm³`, item.payload.category]}
              contentStyle={{
                backgroundColor: "#1e293b",
                borderColor: "#334155",
                borderRadius: "0.5rem",
                color: "#f8fafc",
                fontSize: "12px"
              }}
            />
            <Bar dataKey="density" fill="#8b5cf6" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.density < 1.0 ? "#06b6d4" : entry.density > 10.0 ? "#d97706" : "#8b5cf6"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
