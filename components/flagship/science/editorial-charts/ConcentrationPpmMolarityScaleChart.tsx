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
  { name: "Drinking Water Arsenic Cap", ppm: 0.01, logPpm: -2, category: "Trace Contaminant (10 ppb)" },
  { name: "EPA Lead Action Limit", ppm: 0.015, logPpm: -1.82, category: "Trace Heavy Metal" },
  { name: "Fluoride in Tap Water", ppm: 0.7, logPpm: -0.15, category: "Additive Standard" },
  { name: "Swimming Pool Chlorine", ppm: 3.0, logPpm: 0.48, category: "Sanitation Standard" },
  { name: "Hard Water Mineral (Ca²⁺)", ppm: 120.0, logPpm: 2.08, category: "Dissolved Mineral" },
  { name: "Blood Glucose Level (~5.5 mM)", ppm: 1000.0, logPpm: 3.0, category: "Physiological Solute" },
  { name: "Physiological Saline (0.9%)", ppm: 9000.0, logPpm: 3.95, category: "Clinical IV Solution" },
  { name: "Seawater Salinity (3.5%)", ppm: 35000.0, logPpm: 4.54, category: "Oceanic Matrix" }
];

const COLORS = ["#ef4444", "#f97316", "#eab308", "#10b981", "#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6"];

export function ConcentrationPpmMolarityScaleChart() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          Aqueous Concentration Ranges: Environmental Trace (PPB) to Saline (PPM)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Logarithmic representation of parts-per-million across environmental toxicology and clinical biochemistry.
        </p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="name"
              stroke="#64748b"
              tick={{ fontSize: 10 }}
              angle={-20}
              textAnchor="end"
            />
            <YAxis
              stroke="#64748b"
              tick={{ fontSize: 11 }}
              label={{ value: "Concentration (log₁₀ PPM)", angle: -90, position: "insideLeft", fontSize: 11 }}
            />
            <Tooltip
              formatter={(val, name, item) => [`${item.payload.ppm.toLocaleString()} ppm`, item.payload.category]}
              contentStyle={{
                backgroundColor: "#1e293b",
                borderColor: "#334155",
                borderRadius: "0.5rem",
                color: "#f8fafc",
                fontSize: "12px"
              }}
            />
            <Bar dataKey="logPpm" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
