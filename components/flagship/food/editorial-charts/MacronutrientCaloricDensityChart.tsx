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
  { macro: "Proteins", density: 4.0, amdrMin: 10, amdrMax: 35 },
  { macro: "Carbohydrates", density: 4.0, amdrMin: 45, amdrMax: 65 },
  { macro: "Dietary Lipids (Fats)", density: 9.0, amdrMin: 20, amdrMax: 35 },
  { macro: "Ethanol (Alcohol)", density: 7.0, amdrMin: 0, amdrMax: 5 },
];

export function MacronutrientCaloricDensityChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Macronutrient Atwater Energy Density & Dietary Reference Intake (AMDR)
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Atwater thermodynamic factors (kcal/gram) compared with Institute of Medicine Acceptable Macronutrient Distribution Ranges.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="macro" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="left" unit=" kcal/g" domain={[0, 10]} tick={{ fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" unit="%" domain={[0, 70]} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any, name: any) => [
                name.includes("Density") ? `${val} kcal/g` : `${val}%`,
                name,
              ]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar yAxisId="left" dataKey="density" name="Atwater Caloric Density (kcal/g)" fill="#6366f1" />
            <Bar yAxisId="right" dataKey="amdrMin" name="AMDR Recommended Floor %" fill="#0ea5e9" />
            <Bar yAxisId="right" dataKey="amdrMax" name="AMDR Recommended Ceiling %" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
