"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { tier: "±1% Metal Film", nominal: 1000, lowerBound: 990, upperBound: 1010, spreadPct: 2 },
  { tier: "±2% Precision", nominal: 1000, lowerBound: 980, upperBound: 1020, spreadPct: 4 },
  { tier: "±5% Carbon Film", nominal: 1000, lowerBound: 950, upperBound: 1050, spreadPct: 10 },
  { tier: "±10% General", nominal: 1000, lowerBound: 900, upperBound: 1100, spreadPct: 20 },
];

export function ResistorToleranceBandSpreadChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Resistor Manufacturing Tolerance Boundaries (1,000 Ω Nominal)
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Allowable minimum and maximum resistance variations across standard IEC 60062 tolerance color bands.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="tier" />
            <YAxis domain={[850, 1150]} label={{ value: "Ohms (Ω)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="lowerBound" name="Minimum Boundary (Ω)" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="upperBound" name="Maximum Boundary (Ω)" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
