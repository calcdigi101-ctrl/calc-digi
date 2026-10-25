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
  { year: "Year 0 (New)", pickup: 100, suv: 100, sedan: 100, luxury: 100, ev: 100 },
  { year: "Year 1", pickup: 86, suv: 82, sedan: 80, luxury: 74, ev: 72 },
  { year: "Year 3", pickup: 71, suv: 65, sedan: 62, luxury: 53, ev: 51 },
  { year: "Year 5", pickup: 58, suv: 51, sedan: 48, luxury: 38, ev: 36 },
  { year: "Year 7", pickup: 48, suv: 41, sedan: 37, luxury: 27, ev: 25 },
  { year: "Year 10", pickup: 36, suv: 29, sedan: 25, luxury: 17, ev: 15 },
];

export function VehicleDepreciationTenYearDecayChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        10-Year Automotive Residual Equity Retention Trajectory
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Empirical percentage of original MSRP retained over a 10-year holding period across full-size trucks, compact sedans, luxury vehicles, and battery EVs.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
            <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`${val}%`, "Retained MSRP"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Line type="monotone" dataKey="pickup" name="Full-Size Pickup Truck" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="suv" name="Midsize Crossover/SUV" stroke="#0ea5e9" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="sedan" name="Compact Economy Sedan" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="luxury" name="European Luxury Sedan" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="ev" name="Battery Electric Vehicle (EV)" stroke="#ef4444" strokeWidth={2.5} strokeDasharray="4 4" dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
