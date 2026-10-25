"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const data = [
  { clinicalState: "Severe Hyponatremia", sodium: 230, glucose: 5, bun: 4, total: 239 },
  { clinicalState: "Mild Hypo-osmolar", sodium: 260, glucose: 5.5, bun: 5, total: 270.5 },
  { clinicalState: "Normal Physiological", sodium: 280, glucose: 5.2, bun: 5.0, total: 290.2 },
  { clinicalState: "Diabetic Hyperglycemia", sodium: 270, glucose: 35.0, bun: 7.5, total: 312.5 },
  { clinicalState: "Uremic Hyper-osmolar", sodium: 280, glucose: 5.5, bun: 35.0, total: 320.5 },
  { clinicalState: "Severe DKA / HHS", sodium: 290, glucose: 55.0, bun: 25.0, total: 370.0 },
];

export function SerumOsmolarityElectrolyteChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Serum Osmolarity Speciation across Clinical Pathologies
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Stacked ionic contributions: 2×[Na⁺], [Glucose]/18, and [BUN]/2.8 in mOsm/kg.
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="clinicalState" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" interval={0} stroke="#64748b" />
            <YAxis tick={{ fontSize: 11 }} stroke="#64748b" label={{ value: "mOsm/L", angle: -90, position: "insideLeft", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderRadius: "8px",
                border: "none",
                fontSize: "12px",
                color: "#f8fafc",
              }}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: "10px", fontSize: "12px" }} />
            <Bar dataKey="sodium" name="Sodium Electrolytes (2 × Na⁺)" stackId="a" fill="#0284c7" />
            <Bar dataKey="glucose" name="Glucose ([Glu]/18)" stackId="a" fill="#10b981" />
            <Bar dataKey="bun" name="Urea Nitrogen ([BUN]/2.8)" stackId="a" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
