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
  Legend
} from "recharts";

const data = [
  { altitude: "Dead Sea (-430m)", pressure: 106.6, boilingWater: 101.4, boilingEthanol: 79.5 },
  { altitude: "Sea Level (0m)", pressure: 101.3, boilingWater: 100.0, boilingEthanol: 78.4 },
  { altitude: "Denver (1600m)", pressure: 83.4, boilingWater: 94.7, boilingEthanol: 73.8 },
  { altitude: "Mexico City (2240m)", pressure: 77.5, boilingWater: 92.8, boilingEthanol: 72.1 },
  { altitude: "La Paz (3640m)", pressure: 65.1, boilingWater: 88.0, boilingEthanol: 67.8 },
  { altitude: "Mont Blanc (4810m)", pressure: 56.0, boilingWater: 84.1, boilingEthanol: 64.3 },
  { altitude: "Everest Camp (6500m)", pressure: 45.0, boilingWater: 78.7, boilingEthanol: 59.5 },
  { altitude: "Everest Summit (8848m)", pressure: 33.7, boilingWater: 71.4, boilingEthanol: 53.0 }
];

export function BoilingElevationPressureChart() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          Pure Solvent Boiling Point Depression vs. Altitude & Barometric Pressure
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Clausius-Clapeyron phase equilibrium: vapor pressure curve across terrestrial elevations.
        </p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="altitude"
              stroke="#64748b"
              tick={{ fontSize: 10 }}
              angle={-20}
              textAnchor="end"
            />
            <YAxis stroke="#64748b" tick={{ fontSize: 11 }} unit="°C" domain={[40, 110]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                borderColor: "#334155",
                borderRadius: "0.5rem",
                color: "#f8fafc",
                fontSize: "12px"
              }}
            />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }} />
            <Line
              type="monotone"
              dataKey="boilingWater"
              name="Water Boiling Point (°C)"
              stroke="#0284c7"
              strokeWidth={2.5}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="boilingEthanol"
              name="Ethanol Boiling Point (°C)"
              stroke="#e11d48"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
