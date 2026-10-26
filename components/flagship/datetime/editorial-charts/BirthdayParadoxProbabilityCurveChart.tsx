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
  { cohort: "n = 5", prob: 2.7, threshold: 50 },
  { cohort: "n = 10", prob: 11.7, threshold: 50 },
  { cohort: "n = 15", prob: 25.3, threshold: 50 },
  { cohort: "n = 20", prob: 41.1, threshold: 50 },
  { cohort: "n = 23 (50%)", prob: 50.7, threshold: 50 },
  { cohort: "n = 30", prob: 70.6, threshold: 50 },
  { cohort: "n = 40", prob: 89.1, threshold: 50 },
  { cohort: "n = 50", prob: 97.0, threshold: 50 },
  { cohort: "n = 70 (>99%)", prob: 99.9, threshold: 50 },
];

export function BirthdayParadoxProbabilityCurveChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        The Birthday Paradox: Shared Birthday Probability Curve
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Mathematical probability P(n) of at least two individuals sharing a birthday in a random cohort of size n.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="cohort" tick={{ fontSize: 11 }} />
            <YAxis domain={[0, 100]} label={{ value: "Probability (%)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="prob" name="Shared Birthday Probability (%)" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
            <Line type="monotone" dataKey="threshold" name="50% Statistical Parity" stroke="#ef4444" strokeDasharray="4 4" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
