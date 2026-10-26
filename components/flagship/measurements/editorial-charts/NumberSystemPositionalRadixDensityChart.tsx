"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { val: "Dec 15", binaryLen: 4, octalLen: 2, hexLen: 1, decLen: 2 },
  { val: "Dec 255", binaryLen: 8, octalLen: 3, hexLen: 2, decLen: 3 },
  { val: "Dec 4,095", binaryLen: 12, octalLen: 4, hexLen: 3, decLen: 4 },
  { val: "Dec 65,535", binaryLen: 16, octalLen: 6, hexLen: 4, decLen: 5 },
  { val: "Dec 1,048,575", binaryLen: 20, octalLen: 7, hexLen: 5, decLen: 7 },
];

export function NumberSystemPositionalRadixDensityChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Positional Radix String Length &amp; Information Density (Bits vs Hex Digits)
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Representation efficiency comparison showing string length contraction from binary (Base-2) to hexadecimal (Base-16).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="val" />
            <YAxis label={{ value: "Character Count", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="binaryLen" name="Binary Digits (Bits)" fill="#ef4444" radius={[4, 4, 0, 0]} />
            <Bar dataKey="octalLen" name="Octal Digits" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="hexLen" name="Hex Characters" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
