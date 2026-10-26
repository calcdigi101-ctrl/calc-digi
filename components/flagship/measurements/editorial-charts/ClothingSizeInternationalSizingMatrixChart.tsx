"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { sizeTier: "Extra Small (XS)", usSize: 2, ukSize: 6, euSize: 34, itSize: 38 },
  { sizeTier: "Small (S)", usSize: 6, ukSize: 10, euSize: 38, itSize: 42 },
  { sizeTier: "Medium (M)", usSize: 10, ukSize: 14, euSize: 42, itSize: 46 },
  { sizeTier: "Large (L)", usSize: 14, ukSize: 18, euSize: 46, itSize: 50 },
  { sizeTier: "Extra Large (XL)", usSize: 18, ukSize: 22, euSize: 50, itSize: 54 },
];

export function ClothingSizeInternationalSizingMatrixChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        International Garment Size Standardization Grid (US vs UK vs EU vs IT)
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Cross-border anthropometric mapping showing systemic sizing offsets across US, British, French/German EU, and Italian matrices.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="sizeTier" />
            <YAxis label={{ value: "Size Index Number", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="usSize" name="US Size" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="ukSize" name="UK Size" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="euSize" name="EU Size" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
