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
  Legend,
} from "recharts";

const data = [
  { ingredient: "All-Purpose Flour (Dip & Sweep)", weightGrams: 140 },
  { ingredient: "All-Purpose Flour (Sifted)", weightGrams: 115 },
  { ingredient: "Granulated White Sugar", weightGrams: 200 },
  { ingredient: "Packed Dark Brown Sugar", weightGrams: 220 },
  { ingredient: "Unsalted Butter", weightGrams: 227 },
  { ingredient: "Water / Whole Milk", weightGrams: 237 },
  { ingredient: "Pure Clover Honey", weightGrams: 340 },
];

export function CulinaryDensityWeightVolumeChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Culinary Bulk Density Comparison: Net Weight of 1 US Cup (237 ml)
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Mass variances across dry baking essentials and viscous liquids highlighting why metric mass measurement guarantees recipe reproducibility.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis dataKey="ingredient" stroke="#94a3b8" fontSize={10} />
            <YAxis stroke="#94a3b8" fontSize={11} unit=" g" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "8px",
                color: "#f8fafc",
                fontSize: "12px",
              }}
              formatter={(val: any) => [`${val} grams / cup`]}
            />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
            <Bar dataKey="weightGrams" name="Gram Weight per US Cup (g)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
