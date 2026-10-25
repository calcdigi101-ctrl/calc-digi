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
  { reaction: "Water (2 H₂ + O₂ → 2 H₂O)", reactantA: 20, reactantB: 100, productYield: 112.5, excessLeft: 7.5 },
  { reaction: "Ammonia (N₂ + 3 H₂ → 2 NH₃)", reactantA: 50, reactantB: 15, productYield: 60.8, excessLeft: 4.2 },
  { reaction: "Combustion (CH₄ + 2 O₂ → CO₂)", reactantA: 30, reactantB: 120, productYield: 82.3, excessLeft: 67.7 },
  { reaction: "Chloride (2 Al + 3 Cl₂ → 2 AlCl₃)", reactantA: 25, reactantB: 98, productYield: 122.8, excessLeft: 0.2 },
];

export function StoichiometricMoleRatioChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Theoretical Product Yield vs Unreacted Excess Reagent Balance (g)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Mass conservation balance illustrating theoretical product output and leftover excess reagent when reactant feed departs from exact stoichiometric equivalence.
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="reaction" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" interval={0} stroke="#64748b" />
            <YAxis tick={{ fontSize: 11 }} stroke="#64748b" label={{ value: "Grams (g)", angle: -90, position: "insideLeft", fontSize: 12 }} />
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
            <Bar dataKey="productYield" name="Theoretical Product Yield (g)" fill="#10b981" />
            <Bar dataKey="excessLeft" name="Unreacted Excess Reagent (g)" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
