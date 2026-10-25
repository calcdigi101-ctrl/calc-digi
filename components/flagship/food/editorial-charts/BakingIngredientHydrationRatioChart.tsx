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
  { item: "Artisan Sourdough", flour: 100, water: 75, fat: 2, sugar: 0 },
  { item: "Brioche Dough", flour: 100, water: 30, fat: 50, sugar: 15 },
  { item: "Pound Cake", flour: 100, water: 45, fat: 100, sugar: 100 },
  { item: "Choux Pastry", flour: 100, water: 125, fat: 65, sugar: 5 },
  { item: "Shortbread Cookie", flour: 100, water: 0, fat: 65, sugar: 35 },
];

export function BakingIngredientHydrationRatioChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Baker&apos;s Percentage Formula Ratios Across Dough & Batter Categories (%)
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Hydration, lipid fat, and sugar percentages calibrated against a standardized 100% flour weight baseline.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis dataKey="item" stroke="#94a3b8" fontSize={11} />
            <YAxis stroke="#94a3b8" fontSize={11} unit="%" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "8px",
                color: "#f8fafc",
                fontSize: "12px",
              }}
              formatter={(val: any) => [`${val}% of flour weight`]}
            />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
            <Bar dataKey="water" name="Hydration / Liquid (%)" fill="#0ea5e9" stackId="baker" />
            <Bar dataKey="fat" name="Lipid / Butter Fat (%)" fill="#f59e0b" stackId="baker" />
            <Bar dataKey="sugar" name="Sugar (%)" fill="#ec4899" stackId="baker" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
