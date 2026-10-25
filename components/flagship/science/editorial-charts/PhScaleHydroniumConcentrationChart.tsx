"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const data = [
  { ph: "pH 1 (Stomach)", logH: 1, logOH: 13, nature: "Strongly Acidic" },
  { ph: "pH 3 (Vinegar)", logH: 3, logOH: 11, nature: "Weakly Acidic" },
  { ph: "pH 5 (Coffee)", logH: 5, logOH: 9, nature: "Slightly Acidic" },
  { ph: "pH 7 (Pure H₂O)", logH: 7, logOH: 7, nature: "Neutral Baseline" },
  { ph: "pH 9 (Baking Soda)", logH: 9, logOH: 5, nature: "Slightly Alkaline" },
  { ph: "pH 11 (Ammonia)", logH: 11, logOH: 3, nature: "Moderately Alkaline" },
  { ph: "pH 13 (Bleach / Lye)", logH: 13, logOH: 1, nature: "Strongly Alkaline" },
];

export function PhScaleHydroniumConcentrationChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Logarithmic [H⁺] vs [OH⁻] Reciprocal Equilibrium across pH Scale
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Inverse logarithmic exponents: -log₁₀[H⁺] (pH) and -log₁₀[OH⁻] (pOH) summing to 14.0 at 25 °C.
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="ph" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" interval={0} stroke="#64748b" />
            <YAxis tick={{ fontSize: 11 }} stroke="#64748b" domain={[0, 14]} />
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
            <Area type="monotone" dataKey="logH" name="pH (-log[H⁺])" stroke="#ef4444" fill="#fecaca" />
            <Area type="monotone" dataKey="logOH" name="pOH (-log[OH⁻])" stroke="#3b82f6" fill="#bfdbfe" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
