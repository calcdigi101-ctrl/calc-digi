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
  Legend
} from "recharts";

const data = [
  { step: "Stock 10X", concentration: 10.0, volumeStock: 100, volumeBuffer: 0 },
  { step: "Tube 1 (5X)", concentration: 5.0, volumeStock: 50, volumeBuffer: 50 },
  { step: "Tube 2 (2X)", concentration: 2.0, volumeStock: 20, volumeBuffer: 80 },
  { step: "Working (1X)", concentration: 1.0, volumeStock: 10, volumeBuffer: 90 },
  { step: "Dilute (0.5X)", concentration: 0.5, volumeStock: 5, volumeBuffer: 95 },
  { step: "Trace (0.1X)", concentration: 0.1, volumeStock: 1, volumeBuffer: 99 }
];

export function MolarityDilutionCascadeChart() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          Volumetric Dilution Partitioning (M₁V₁ = M₂V₂, 100 mL Total Scale)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Comparison of concentrated stock aliquot versus solvent diluent addition across standard working titers.
        </p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="step" stroke="#64748b" tick={{ fontSize: 11 }} />
            <YAxis stroke="#64748b" tick={{ fontSize: 11 }} unit=" mL" domain={[0, 100]} />
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
            <Bar dataKey="volumeStock" name="Stock Liquid Volume (mL)" stackId="a" fill="#e11d48" />
            <Bar dataKey="volumeBuffer" name="Diluent Solvent Added (mL)" stackId="a" fill="#0284c7" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
