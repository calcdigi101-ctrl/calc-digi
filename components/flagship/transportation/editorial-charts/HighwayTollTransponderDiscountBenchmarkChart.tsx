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
  { profile: "Occasional (5 Trips)", payByPlate: 32, etcTransponder: 21, netSavings: 11 },
  { profile: "Monthly (20 Trips)", payByPlate: 128, etcTransponder: 84, netSavings: 44 },
  { profile: "Quarterly Commute (60 Trips)", payByPlate: 384, etcTransponder: 252, netSavings: 132 },
  { profile: "Semi-Annual (120 Trips)", payByPlate: 768, etcTransponder: 504, netSavings: 264 },
  { profile: "Annual Super-Commuter (240 Trips)", payByPlate: 1536, etcTransponder: 1008, netSavings: 528 },
];

export function HighwayTollTransponderDiscountBenchmarkChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Annual Electronic Toll Collection (ETC) Transponder Savings
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Unregistered video billing (Pay-by-Plate surcharge) vs registered transponder (e.g., E-ZPass/SunPass/FasTrak) across commuter frequency tiers.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="profile" tick={{ fontSize: 11 }} />
            <YAxis unit="$" tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`$${val}`, "Annual Toll Cost"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="payByPlate" name="Pay-by-Plate (Video Invoice)" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="etcTransponder" name="ETC Transponder (35% Discount)" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            <Bar dataKey="netSavings" name="Cumulative Annual Savings" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
