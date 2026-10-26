"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const data = [
  { system: "Egyptian (365.0d)", daysPer10k: 2422, accuracy: "Poor (1 day / 4 yrs)" },
  { system: "Julian (365.25d)", daysPer10k: 78.1, accuracy: "Fair (1 day / 128 yrs)" },
  { system: "Gregorian (365.2425d)", daysPer10k: 3.1, accuracy: "High (1 day / 3,226 yrs)" },
  { system: "Revised Julian (365.24222d)", daysPer10k: 0.22, accuracy: "Elite (1 day / 45,000 yrs)" },
];

export function TropicalYearVarianceDriftChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Calendar System Error Comparison vs. Tropical Solar Year
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Days of accumulated calendar drift per 10,000 years across different leap year rules.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="system" tick={{ fontSize: 11 }} />
            <YAxis label={{ value: "Drift Days / 10,000 Yrs", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="daysPer10k" name="Drift (Days per 10k Years)" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
