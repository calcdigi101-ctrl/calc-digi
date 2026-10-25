"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { multiplier: "0.5x", linearDryMass: 50, compensatedSeasoning: 56, surfaceLossFactor: 65 },
  { multiplier: "1.0x (Base)", linearDryMass: 100, compensatedSeasoning: 100, surfaceLossFactor: 100 },
  { multiplier: "2.0x", linearDryMass: 200, compensatedSeasoning: 185, surfaceLossFactor: 160 },
  { multiplier: "4.0x", linearDryMass: 400, compensatedSeasoning: 340, surfaceLossFactor: 280 },
  { multiplier: "8.0x", linearDryMass: 800, compensatedSeasoning: 640, surfaceLossFactor: 480 },
];

export function RecipeBatchScalingFactorChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Linear Flour Scaling vs Non-Linear Leavening & Evaporation Index
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Culinary physics index (Baseline 1.0x = 100) illustrating why salt, baking powder, and surface evaporation require sub-linear dampening at scale.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="multiplier" tick={{ fontSize: 11 }} />
            <YAxis unit=" pts" domain={[0, 900]} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`${val} Index Points`, "Scaled Output"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Line type="monotone" dataKey="linearDryMass" name="Linear Bulk Ingredient Scaling" stroke="#0ea5e9" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="compensatedSeasoning" name="Non-Linear Leavener/Seasoning Curve" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="surfaceLossFactor" name="Surface Area Evaporation Curve" stroke="#10b981" strokeWidth={2.5} strokeDasharray="4 4" dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
