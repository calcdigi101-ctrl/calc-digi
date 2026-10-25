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
  { temp: "-10°C (14°F)", satHpa: 2.87, absHumMax: 2.36 },
  { temp: "0°C (32°F)", satHpa: 6.11, absHumMax: 4.85 },
  { temp: "10°C (50°F)", satHpa: 12.28, absHumMax: 9.41 },
  { temp: "20°C (68°F)", satHpa: 23.39, absHumMax: 17.31 },
  { temp: "30°C (86°F)", satHpa: 42.47, absHumMax: 30.38 },
  { temp: "40°C (104°F)", satHpa: 73.84, absHumMax: 51.19 },
];

export function PsychrometricSaturationVaporPressureChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Clausius-Clapeyron Exponential Saturation Vapor Pressure Curve
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Theoretical atmospheric water vapor carrying capacity doubling roughly every 10°C (18°F) rise according to Sonntag thermodynamic equations.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="temp" tick={{ fontSize: 11 }} />
            <YAxis unit=" hPa" domain={[0, 80]} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`${val} hPa`, "Saturation Pressure"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Area type="monotone" dataKey="satHpa" name="Saturation Vapor Pressure (hPa)" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.4} />
            <Area type="monotone" dataKey="absHumMax" name="Max Absolute Humidity (g/m³)" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
