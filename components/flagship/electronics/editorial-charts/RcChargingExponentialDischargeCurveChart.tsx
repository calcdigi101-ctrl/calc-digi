"use client";

import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { time: "0 τ", chargingPct: 0.0, dischargingPct: 100.0 },
  { time: "1 τ", chargingPct: 63.2, dischargingPct: 36.8 },
  { time: "2 τ", chargingPct: 86.5, dischargingPct: 13.5 },
  { time: "3 τ", chargingPct: 95.0, dischargingPct: 5.0 },
  { time: "4 τ", chargingPct: 98.2, dischargingPct: 1.8 },
  { time: "5 τ", chargingPct: 99.3, dischargingPct: 0.7 },
];

export function RcChargingExponentialDischargeCurveChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        RC Circuit Exponential Charging & Discharging Transient Curves
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Voltage response across time constants (τ = R × C) reaching 63.2% charge at 1τ and 99.3% steady-state at 5τ.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} label={{ value: "Capacitor Voltage (%)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="chargingPct" name="Charging Curve Vc(t) (%)" stroke="#10b981" fill="#10b981" opacity={0.6} />
            <Area type="monotone" dataKey="dischargingPct" name="Discharge Curve Vc(t) (%)" stroke="#6366f1" fill="#6366f1" opacity={0.4} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
