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
  { wind: "5 mph", t30: 25, t15: 7, t0: -11, tMinus15: -29, tMinus30: -46 },
  { wind: "15 mph", t30: 19, t15: 0, t0: -19, tMinus15: -39, tMinus30: -58 },
  { wind: "25 mph", t30: 15, t15: -5, t0: -24, tMinus15: -44, tMinus30: -64 },
  { wind: "35 mph", t30: 13, t15: -8, t0: -27, tMinus15: -48, tMinus30: -69 },
  { wind: "50 mph", t30: 10, t15: -12, t0: -31, tMinus15: -53, tMinus30: -74 },
];

export function WindChillEquivalentTemperatureFrostbiteChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        NOAA Wind Chill Apparent Temperatures & Convective Heat Scouring
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Joint Action Group (JAG/TI) aerodynamic cooling curves modeling boundary layer heat stripping across ambient cold baselines (30°F down to -30°F).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="wind" tick={{ fontSize: 11 }} />
            <YAxis unit="°F" domain={[-80, 35]} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`${val}°F`, "Apparent Wind Chill"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Line type="monotone" dataKey="t30" name="30°F Ambient" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="t15" name="15°F Ambient" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="t0" name="0°F Ambient" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="tMinus15" name="-15°F Ambient" stroke="#a855f7" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="tMinus30" name="-30°F Ambient" stroke="#ec4899" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
