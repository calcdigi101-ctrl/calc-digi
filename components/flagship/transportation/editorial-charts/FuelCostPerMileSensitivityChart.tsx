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
  { gasPrice: "$2.50/gal", truck16: 15.6, sedan28: 8.9, hybrid50: 5.0, evEquiv: 4.2 },
  { gasPrice: "$3.25/gal", truck16: 20.3, sedan28: 11.6, hybrid50: 6.5, evEquiv: 4.2 },
  { gasPrice: "$4.00/gal", truck16: 25.0, sedan28: 14.3, hybrid50: 8.0, evEquiv: 4.2 },
  { gasPrice: "$4.75/gal", truck16: 29.7, sedan28: 17.0, hybrid50: 9.5, evEquiv: 4.2 },
  { gasPrice: "$5.50/gal", truck16: 34.4, sedan28: 19.6, hybrid50: 11.0, evEquiv: 4.2 },
];

export function FuelCostPerMileSensitivityChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Fuel Driving Cost (Cents Per Mile) Sensitivity by Gasoline Price
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Direct cents-per-mile fuel burden across varying fuel prices comparing a 16 MPG V8 truck, 28 MPG standard sedan, 50 MPG hybrid, and electric vehicle.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="gasPrice" tick={{ fontSize: 11 }} />
            <YAxis unit="¢" domain={[0, 40]} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`${val}¢ / mile`, "Driving Fuel Cost"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Line type="monotone" dataKey="truck16" name="V8 Truck (16 MPG)" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="sedan28" name="Standard Sedan (28 MPG)" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="hybrid50" name="Efficient Hybrid (50 MPG)" stroke="#0ea5e9" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="evEquiv" name="EV Home Charging Baseline" stroke="#10b981" strokeWidth={2.5} strokeDasharray="4 4" dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
