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
  { distance: "10 Mi (20 mi/day)", fuel: 70, tollsPark: 90, wearTear: 65, total: 225 },
  { distance: "20 Mi (40 mi/day)", fuel: 140, tollsPark: 90, wearTear: 130, total: 360 },
  { distance: "35 Mi (70 mi/day)", fuel: 245, tollsPark: 110, wearTear: 228, total: 583 },
  { distance: "50 Mi (100 mi/day)", fuel: 350, tollsPark: 130, wearTear: 325, total: 805 },
];

export function CommuteCostDistanceComparisonChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Monthly Commute Expense Burden Across Driving Distances
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Itemized monthly costs including combustible fuel, highway tolls, municipal parking, and mechanical maintenance at 26 MPG and $3.65/gal.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="distance" tick={{ fontSize: 11 }} />
            <YAxis unit="$" domain={[0, 900]} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`$${val}/mo`, "Monthly Outlay"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="fuel" name="Gasoline / Fuel Expense" stackId="a" fill="#0284c7" />
            <Bar dataKey="tollsPark" name="Tolls & Parking Fees" stackId="a" fill="#f59e0b" />
            <Bar dataKey="wearTear" name="IRS Vehicle Wear Depreciation" stackId="a" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
