"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { footCm: "24.0 cm", usMen: 6.0, usWomen: 7.5, uk: 5.5, eu: 38.5 },
  { footCm: "25.0 cm", usMen: 7.0, usWomen: 8.5, uk: 6.5, eu: 40.0 },
  { footCm: "26.0 cm", usMen: 8.0, usWomen: 9.5, uk: 7.5, eu: 41.5 },
  { footCm: "27.0 cm", usMen: 9.0, usWomen: 10.5, uk: 8.5, eu: 42.5 },
  { footCm: "28.0 cm", usMen: 10.0, usWomen: 11.5, uk: 9.5, eu: 44.0 },
  { footCm: "29.0 cm", usMen: 11.0, usWomen: 12.5, uk: 10.5, eu: 45.0 },
];

export function ShoeSizeInternationalFitMatrixChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Foot Length (Centimeters) vs International Shoe Sizing Standards
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Direct anatomical foot length correlation against US Men, US Women, UK, and European continental sizing scales.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="footCm" />
            <YAxis label={{ value: "Size Index", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="usMen" name="US Men" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="uk" name="UK / AU" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="eu" name="EU Size" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
