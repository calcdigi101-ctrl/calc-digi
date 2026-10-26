"use client";

import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { load: "RL = 1 kΩ", idealVout: 6.0, loadedVout: 1.09, errorPct: 81.8 },
  { load: "RL = 5 kΩ", idealVout: 6.0, loadedVout: 3.0, errorPct: 50.0 },
  { load: "RL = 10 kΩ", idealVout: 6.0, loadedVout: 4.0, errorPct: 33.3 },
  { load: "RL = 50 kΩ", idealVout: 6.0, loadedVout: 5.45, errorPct: 9.1 },
  { load: "RL = 100 kΩ", idealVout: 6.0, loadedVout: 5.71, errorPct: 4.8 },
  { load: "RL = ∞ (Open)", idealVout: 6.0, loadedVout: 6.0, errorPct: 0.0 },
];

export function VoltageDividerLoadingErrorCurveChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Resistive Divider Output Voltage (Vout) vs Load Impedance (RL)
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Modeled for a 12V supply with R1 = 10 kΩ and R2 = 10 kΩ (Ideal Vout = 6.0V), showing output voltage sag as RL approaches R2.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="load" />
            <YAxis domain={[0, 7]} label={{ value: "Output (V)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="idealVout" name="Ideal Unloaded Vout (6V)" stroke="#94a3b8" fill="#cbd5e1" opacity={0.4} />
            <Area type="monotone" dataKey="loadedVout" name="Actual Loaded Vout (V)" stroke="#10b981" fill="#10b981" opacity={0.7} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
