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
  ReferenceArea
} from "recharts";

const data = [
  { eqBase: 0.0, pH: 2.87, bufferCapacity: 0.01 },
  { eqBase: 0.1, pH: 3.81, bufferCapacity: 0.05 },
  { eqBase: 0.2, pH: 4.16, bufferCapacity: 0.09 },
  { eqBase: 0.3, pH: 4.39, bufferCapacity: 0.12 },
  { eqBase: 0.4, pH: 4.58, bufferCapacity: 0.14 },
  { eqBase: 0.5, pH: 4.76, bufferCapacity: 0.15 }, // pKa midpoint
  { eqBase: 0.6, pH: 4.94, bufferCapacity: 0.14 },
  { eqBase: 0.7, pH: 5.13, bufferCapacity: 0.12 },
  { eqBase: 0.8, pH: 5.36, bufferCapacity: 0.09 },
  { eqBase: 0.9, pH: 5.71, bufferCapacity: 0.05 },
  { eqBase: 1.0, pH: 8.72, bufferCapacity: 0.01 }  // Equivalence point
];

export function BufferTitrationCurveChart() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          Acetic Acid Buffer Titration Curve & Maximum Buffer Capacity Region
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Henderson-Hasselbalch plateau: optimal resistance to pH changes occurs within pKa ± 1.0 (pH 3.76 to 5.76).
        </p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="eqBase"
              stroke="#64748b"
              tick={{ fontSize: 11 }}
              label={{ value: "Equivalents of Strong Base Added (NaOH / HA)", position: "insideBottom", offset: -5, fontSize: 11 }}
            />
            <YAxis stroke="#64748b" tick={{ fontSize: 11 }} domain={[2, 10]} unit=" pH" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                borderColor: "#334155",
                borderRadius: "0.5rem",
                color: "#f8fafc",
                fontSize: "12px"
              }}
            />
            <ReferenceArea x1={0.1} x2={0.9} stroke="#10b981" strokeOpacity={0.3} fill="#10b981" fillOpacity={0.1} />
            <Area
              type="monotone"
              dataKey="pH"
              name="Solution pH"
              stroke="#059669"
              fill="#d1fae5"
              fillOpacity={0.6}
              strokeWidth={2.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
