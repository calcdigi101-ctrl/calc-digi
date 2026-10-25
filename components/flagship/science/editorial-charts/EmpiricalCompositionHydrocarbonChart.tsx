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
  Legend
} from "recharts";

const data = [
  { compound: "Methane (CH4)", carbon: 74.87, hydrogen: 25.13, oxygen: 0.0, nitrogen: 0.0 },
  { compound: "Ethanol (C2H6O)", carbon: 52.14, hydrogen: 13.13, oxygen: 34.73, nitrogen: 0.0 },
  { compound: "Acetic Acid (C2H4O2)", carbon: 40.00, hydrogen: 6.72, oxygen: 53.28, nitrogen: 0.0 },
  { compound: "Glucose (C6H12O6)", carbon: 40.00, hydrogen: 6.72, oxygen: 53.28, nitrogen: 0.0 },
  { compound: "Urea (CH4N2O)", carbon: 20.00, hydrogen: 6.71, oxygen: 26.64, nitrogen: 46.65 },
  { compound: "Caffeine (C8H10N4O2)", carbon: 49.48, hydrogen: 5.19, oxygen: 16.48, nitrogen: 28.85 }
];

export function EmpiricalCompositionHydrocarbonChart() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          Elemental Mass Fraction Breakdown (% w/w) in Common Organic Compounds
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Demonstrates how identical empirical ratios (e.g. Acetic Acid and Glucose, CH₂O) exhibit identical elemental percent composition.
        </p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="compound"
              stroke="#64748b"
              tick={{ fontSize: 10 }}
              angle={-15}
              textAnchor="end"
            />
            <YAxis stroke="#64748b" tick={{ fontSize: 11 }} unit="%" domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                borderColor: "#334155",
                borderRadius: "0.5rem",
                color: "#f8fafc",
                fontSize: "12px"
              }}
            />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
            <Bar dataKey="carbon" name="Carbon %" stackId="a" fill="#334155" />
            <Bar dataKey="hydrogen" name="Hydrogen %" stackId="a" fill="#38bdf8" />
            <Bar dataKey="oxygen" name="Oxygen %" stackId="a" fill="#ef4444" />
            <Bar dataKey="nitrogen" name="Nitrogen %" stackId="a" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
