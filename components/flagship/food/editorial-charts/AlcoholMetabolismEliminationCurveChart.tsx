"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { hour: "0h", bac: 0.080, unitsLeft: 5.0 },
  { hour: "1h", bac: 0.065, unitsLeft: 4.0 },
  { hour: "2h", bac: 0.050, unitsLeft: 3.0 },
  { hour: "3h", bac: 0.035, unitsLeft: 2.0 },
  { hour: "4h", bac: 0.020, unitsLeft: 1.0 },
  { hour: "5h", bac: 0.005, unitsLeft: 0.2 },
  { hour: "6h", bac: 0.000, unitsLeft: 0.0 },
];

export function AlcoholMetabolismEliminationCurveChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Hepatic Alcohol Elimination & Blood Alcohol Content (BAC) Clearance Curve
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Zero-order metabolic decay illustrating linear liver clearance at approximately 0.015g% BAC (~1 UK unit) per hour.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="alcoholBacGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} />
            <YAxis stroke="#94a3b8" fontSize={11} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "8px",
                color: "#f8fafc",
                fontSize: "12px",
              }}
              formatter={(val: any, name: any) => [
                name === "bac" ? `${val} g% BAC` : `${val} units`,
                name === "bac" ? "Blood Alcohol Content" : "Residual UK Units",
              ]}
            />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
            <Area type="monotone" dataKey="bac" name="Blood Alcohol Concentration (g%)" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#alcoholBacGrad)" />
            <Area type="monotone" dataKey="unitsLeft" name="Residual Alcohol Units" stroke="#0ea5e9" strokeWidth={2} fillOpacity={0} fill="#0ea5e9" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
