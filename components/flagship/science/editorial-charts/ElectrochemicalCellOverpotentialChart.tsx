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
  { current: 0.0, cellVoltage: 2.10, ohmicDrop: 0.00, powerWatts: 0.0 },
  { current: 1.0, cellVoltage: 2.05, ohmicDrop: 0.05, powerWatts: 2.05 },
  { current: 2.0, cellVoltage: 2.00, ohmicDrop: 0.10, powerWatts: 4.00 },
  { current: 4.0, cellVoltage: 1.90, ohmicDrop: 0.20, powerWatts: 7.60 },
  { current: 6.0, cellVoltage: 1.80, ohmicDrop: 0.30, powerWatts: 10.80 },
  { current: 8.0, cellVoltage: 1.70, ohmicDrop: 0.40, powerWatts: 13.60 },
  { current: 10.0, cellVoltage: 1.60, ohmicDrop: 0.50, powerWatts: 16.00 },
  { current: 12.0, cellVoltage: 1.50, ohmicDrop: 0.60, powerWatts: 18.00 }
];

export function ElectrochemicalCellOverpotentialChart() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          Electrochemical Battery Polarization & Ohmic Voltage Drop (V_cell = E₀ - I·R_int)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Internal resistance (R = 0.05 Ω) causes terminal potential to degrade linearly with discharge current.
        </p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="current"
              stroke="#64748b"
              tick={{ fontSize: 11 }}
              label={{ value: "Discharge Current I (Amperes)", position: "insideBottom", offset: -5, fontSize: 11 }}
            />
            <YAxis stroke="#64748b" tick={{ fontSize: 11 }} unit=" V" domain={[1.0, 2.3]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                borderColor: "#334155",
                borderRadius: "0.5rem",
                color: "#f8fafc",
                fontSize: "12px"
              }}
            />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
            <Line type="monotone" dataKey="cellVoltage" name="Terminal Voltage V (Volts)" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="ohmicDrop" name="Internal Ohmic Loss I·R (V)" stroke="#ef4444" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
