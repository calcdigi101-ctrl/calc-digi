"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { unit: "1 Liter (L)", milliliters: 1000, usFlOz: 33.814, ukFlOz: 35.195 },
  { unit: "1 US Gallon", milliliters: 3785.41, usFlOz: 128.0, ukFlOz: 133.228 },
  { unit: "1 Imperial Gal", milliliters: 4546.09, usFlOz: 153.722, ukFlOz: 160.0 },
  { unit: "1 US Quart", milliliters: 946.35, usFlOz: 32.0, ukFlOz: 33.307 },
  { unit: "1 Metric Pint (500ml)", milliliters: 500, usFlOz: 16.907, ukFlOz: 17.598 },
];

export function VolumeMetricImperialVolumetricRatioChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Comparative Volumetric Ratios: Metric Milliliters vs US &amp; Imperial Fluid Ounces
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Discrepancy comparison between US customary (3,785.41 mL) and British Imperial (4,546.09 mL) volumetric definitions.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="unit" />
            <YAxis label={{ value: "Volume in mL", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="milliliters" name="Capacity (mL)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="usFlOz" name="US Fl Oz" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
