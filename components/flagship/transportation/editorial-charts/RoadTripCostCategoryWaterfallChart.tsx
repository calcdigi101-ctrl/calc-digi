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
  { distance: "300 Miles", fuel: 42, lodging: 0, food: 35, tolls: 15, vehicleWear: 45 },
  { distance: "600 Miles (1-Day)", fuel: 84, lodging: 0, food: 70, tolls: 28, vehicleWear: 90 },
  { distance: "1,200 Miles (2-Day)", fuel: 168, lodging: 140, food: 150, tolls: 52, vehicleWear: 180 },
  { distance: "2,000 Miles (4-Day)", fuel: 280, lodging: 380, food: 320, tolls: 78, vehicleWear: 300 },
  { distance: "3,000 Miles (Coast)", fuel: 420, lodging: 680, food: 550, tolls: 110, vehicleWear: 450 },
];

export function RoadTripCostCategoryWaterfallChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Overland Road Trip Budget Breakdown Across Travel Distances
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Stacked expense categories illustrating how multi-day lodging and subsistence meals surpass fuel costs as overland journey mileage expands.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="distance" tick={{ fontSize: 11 }} />
            <YAxis unit="$" tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`$${val}`, "Cost"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="fuel" name="Fuel Expense" stackId="a" fill="#0ea5e9" />
            <Bar dataKey="lodging" name="Hotel / Lodging" stackId="a" fill="#8b5cf6" />
            <Bar dataKey="food" name="Meals & Food" stackId="a" fill="#10b981" />
            <Bar dataKey="tolls" name="Turnpike Tolls" stackId="a" fill="#f59e0b" />
            <Bar dataKey="vehicleWear" name="Vehicle Depreciation/Tires" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
