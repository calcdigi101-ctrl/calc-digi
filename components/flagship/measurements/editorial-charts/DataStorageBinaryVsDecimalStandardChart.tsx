"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { tier: "1 Kilo / Kibi", decimalBytes: 1000, binaryBytes: 1024, discrepancyPct: 2.4 },
  { tier: "1 Mega / Mebi", decimalBytes: 1000000, binaryBytes: 1048576, discrepancyPct: 4.86 },
  { tier: "1 Giga / Gibi", decimalBytes: 1000000000, binaryBytes: 1073741824, discrepancyPct: 7.37 },
  { tier: "1 Tera / Tebi", decimalBytes: 1000000000000, binaryBytes: 1099511627776, discrepancyPct: 9.95 },
  { tier: "1 Peta / Pebi", decimalBytes: 1000000000000000, binaryBytes: 1125899906842624, discrepancyPct: 12.59 },
];

export function DataStorageBinaryVsDecimalStandardChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Binary (IEC 2^N) vs Decimal (SI 10^N) Storage Capacity Discrepancy Curve
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Compounding percentage divergence between consumer drive marketing ratings (GB/TB) and operating system binary reports (GiB/TiB).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="tier" />
            <YAxis label={{ value: "Divergence Gap (%)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="discrepancyPct" name="Lost Capacity Gap (%)" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
