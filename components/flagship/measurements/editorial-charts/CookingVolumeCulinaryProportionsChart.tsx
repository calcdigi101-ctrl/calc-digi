"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { item: "1 Tsp", ml: 4.93, flOz: 0.167, tspEquiv: 1 },
  { item: "1 Tbsp", ml: 14.79, flOz: 0.5, tspEquiv: 3 },
  { item: "1 Fl Oz", ml: 29.57, flOz: 1.0, tspEquiv: 6 },
  { item: "1/4 Cup", ml: 59.15, flOz: 2.0, tspEquiv: 12 },
  { item: "1/2 Cup", ml: 118.29, flOz: 4.0, tspEquiv: 24 },
  { item: "1 Full Cup", ml: 236.59, flOz: 8.0, tspEquiv: 48 },
];

export function CookingVolumeCulinaryProportionsChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Culinary Kitchen Volumetric Proportions (Milliliters &amp; Fluid Ounces)
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Hierarchy of domestic kitchen measures from standard teaspoons (4.93 mL) to standard baking cups (236.59 mL).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="item" />
            <YAxis label={{ value: "Milliliters (mL)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="ml" name="Milliliters (mL)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="tspEquiv" name="Teaspoons (tsp)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
