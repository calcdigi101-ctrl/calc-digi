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
  { stage: "Early Childhood (0-5)", years: 5, pct: 6.2 },
  { stage: "Primary Education (6-18)", years: 13, pct: 16.0 },
  { stage: "Higher Ed / Early Career (19-29)", years: 11, pct: 13.6 },
  { stage: "Career Prime Mastery (30-49)", years: 20, pct: 24.7 },
  { stage: "Senior Leadership (50-64)", years: 15, pct: 18.5 },
  { stage: "Active Retirement (65-80+)", years: 17, pct: 21.0 },
];

export function LifeStageChronologicalDistributionChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Actuarial Demographic Span: Human Chronological Milestones
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Average proportion of lifespan allocated across developmental, career, and retirement horizons.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 35 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="stage" angle={-15} textAnchor="end" interval={0} height={45} tick={{ fontSize: 11 }} />
            <YAxis label={{ value: "Span (Years)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 12 }} />
            <Bar dataKey="years" name="Duration (Years)" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
