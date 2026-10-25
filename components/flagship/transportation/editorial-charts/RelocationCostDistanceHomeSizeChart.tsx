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
  { distance: "Local (25 Mi)", studio: 450, twoBed: 950, threeBedHouse: 1650 },
  { distance: "Regional (250 Mi)", studio: 1200, twoBed: 2400, threeBedHouse: 3800 },
  { distance: "Interstate (750 Mi)", studio: 1850, twoBed: 3900, threeBedHouse: 6200 },
  { distance: "Cross-Country (2,000 Mi)", studio: 2800, twoBed: 5800, threeBedHouse: 9400 },
];

export function RelocationCostDistanceHomeSizeChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Full-Service Residential Relocation Cost Benchmarks by Distance
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Estimated professional moving outlays based on household weight capacity (Studio: 1.8k lbs, 2-Bed: 4.8k lbs, 3-Bed House: 8.5k lbs).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="distance" tick={{ fontSize: 11 }} />
            <YAxis unit="$" domain={[0, 10500]} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`$${Number(val).toLocaleString()}`, "Estimated Total Move"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="studio" name="Studio Apartment (~1.8k lbs)" fill="#0ea5e9" />
            <Bar dataKey="twoBed" name="2-Bedroom Home (~4.8k lbs)" fill="#f59e0b" />
            <Bar dataKey="threeBedHouse" name="3-Bedroom House (~8.5k lbs)" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
