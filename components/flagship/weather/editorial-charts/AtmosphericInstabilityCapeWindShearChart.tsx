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
  { shear: "15 Knots", pulseCape: 0.2, multicellCape: 0.4, supercellCape: 0.6, tornadicCape: 0.9 },
  { shear: "30 Knots", pulseCape: 0.4, multicellCape: 0.9, supercellCape: 1.5, tornadicCape: 2.1 },
  { shear: "45 Knots", pulseCape: 0.6, multicellCape: 1.4, supercellCape: 2.4, tornadicCape: 3.6 },
  { shear: "60 Knots", pulseCape: 0.8, multicellCape: 1.9, supercellCape: 3.4, tornadicCape: 5.1 },
  { shear: "75 Knots", pulseCape: 1.0, multicellCape: 2.3, supercellCape: 4.2, tornadicCape: 6.5 },
];

export function AtmosphericInstabilityCapeWindShearChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Energy Helicity Index (EHI) & Severe Convective Storm Mode Regimes
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Interaction of deep-layer wind shear (knots) and thermodynamic CAPE (1,000 to 4,000 J/kg) delineating single-cell, squall-line, and cyclic supercell regimes.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="shear" tick={{ fontSize: 11 }} />
            <YAxis unit=" EHI" domain={[0, 7]} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`${val} EHI`, "Severe Weather Index"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Line type="monotone" dataKey="pulseCape" name="CAPE = 1,000 J/kg" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="multicellCape" name="CAPE = 2,000 J/kg" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="supercellCape" name="CAPE = 3,000 J/kg" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="tornadicCape" name="CAPE = 4,000 J/kg" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
