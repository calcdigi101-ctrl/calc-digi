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
  { mileage: "8,000 Mi/Yr", evHome: 365, evFast: 960, gas28Mpg: 1043, gas18Mpg: 1622 },
  { mileage: "12,000 Mi/Yr", evHome: 548, evFast: 1440, gas28Mpg: 1564, gas18Mpg: 2433 },
  { mileage: "15,000 Mi/Yr", evHome: 686, evFast: 1800, gas28Mpg: 1955, gas18Mpg: 3042 },
  { mileage: "20,000 Mi/Yr", evHome: 914, evFast: 2400, gas28Mpg: 2607, gas18Mpg: 4056 },
];

export function EvVsGasAnnualFuelCostComparisonChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Annual Energy Operating Cost: EV Charging vs Gasoline Vehicles
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Comparative annual fuel expenditure across mileage tiers comparing Home Level 2 EV ($0.16/kWh), DC Fast EV ($0.42/kWh), 28 MPG Sedan, and 18 MPG Truck ($3.65/gal).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="mileage" tick={{ fontSize: 11 }} />
            <YAxis unit="$" domain={[0, 4500]} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`$${Number(val).toLocaleString()}`, "Annual Fuel Cost"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="evHome" name="EV Home L2 ($0.16/kWh)" fill="#10b981" />
            <Bar dataKey="evFast" name="EV DC Fast ($0.42/kWh)" fill="#0ea5e9" />
            <Bar dataKey="gas28Mpg" name="Gasoline Sedan (28 MPG)" fill="#f59e0b" />
            <Bar dataKey="gas18Mpg" name="Gasoline Truck (18 MPG)" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
