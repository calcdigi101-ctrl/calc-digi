"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { value: "4 (IV vs IIII)", subtractiveChars: 2, additiveChars: 4, tokenReductionPct: 50 },
  { value: "9 (IX vs VIIII)", subtractiveChars: 2, additiveChars: 5, tokenReductionPct: 60 },
  { value: "40 (XL vs XXXX)", subtractiveChars: 2, additiveChars: 4, tokenReductionPct: 50 },
  { value: "90 (XC vs LXXXX)", subtractiveChars: 2, additiveChars: 5, tokenReductionPct: 60 },
  { value: "400 (CD vs CCCC)", subtractiveChars: 2, additiveChars: 4, tokenReductionPct: 50 },
  { value: "900 (CM vs DCCCC)", subtractiveChars: 2, additiveChars: 5, tokenReductionPct: 60 },
];

export function RomanNumeralAdditiveSubtractiveEvolutionChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Subtractive vs Additive Roman Notation Token Efficiency
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Character compaction achieved through medieval subtractive conventions (e.g., IV vs classical Roman clock-face IIII).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="value" />
            <YAxis label={{ value: "Character Count", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="subtractiveChars" name="Subtractive (Modern Standard)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="additiveChars" name="Additive (Classical Epigraphic)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
