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
  { volume: 5, p200K: 332.6, p300K: 498.9, p400K: 665.2 },
  { volume: 10, p200K: 166.3, p300K: 249.4, p400K: 332.6 },
  { volume: 15, p200K: 110.9, p300K: 166.3, p400K: 221.7 },
  { volume: 20, p200K: 83.1, p300K: 124.7, p400K: 166.3 },
  { volume: 25, p200K: 66.5, p300K: 99.8, p400K: 133.0 },
  { volume: 30, p200K: 55.4, p300K: 83.1, p400K: 110.9 },
  { volume: 35, p200K: 47.5, p300K: 71.3, p400K: 95.0 },
  { volume: 40, p200K: 41.6, p300K: 62.4, p400K: 83.1 }
];

export function IdealGasIsothermPVChart() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          Ideal Gas Pressure-Volume Hyperbolic Isotherms (P = nRT / V, n = 1 mol)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Boyle&apos;s Law hyperbolic curves across isothermal states at 200 K, 300 K, and 400 K.
        </p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="volume"
              stroke="#64748b"
              tick={{ fontSize: 11 }}
              label={{ value: "Volume V (Liters)", position: "insideBottom", offset: -5, fontSize: 11 }}
            />
            <YAxis stroke="#64748b" tick={{ fontSize: 11 }} unit=" kPa" domain={[0, 700]} />
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
            <Line type="monotone" dataKey="p400K" name="400 K (127 °C)" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="p300K" name="300 K (27 °C Room)" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="p200K" name="200 K (-73 °C Cryo)" stroke="#06b6d4" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
