"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { site: "Tennis Court", sqMeters: 260.8, sqFeet: 2807, acres: 0.064 },
  { site: "Soccer Pitch", sqMeters: 7140, sqFeet: 76854, acres: 1.764 },
  { site: "1 Hectare", sqMeters: 10000, sqFeet: 107639, acres: 2.471 },
  { site: "Central Park (NYC)", sqMeters: 3410000, sqFeet: 36700000, acres: 843 },
];

export function AreaSpatialFootprintComparisonChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Spatial Land Footprint Comparison: Square Meters vs Acres &amp; Hectares
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Architectural and agricultural area ratios highlighting the 1 Hectare = 10,000 m² = 2.471 Acres equivalence relationship.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.slice(0, 3)} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="site" />
            <YAxis label={{ value: "Square Meters (m²)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="sqMeters" name="Area (m²)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="sqFeet" name="Area (sq ft ÷ 10)" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
