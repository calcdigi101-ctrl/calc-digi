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
  { quarter: "Q1", standardWeeks: 13, nrf445Weeks: 13, retailPattern: "4-4-5 Weeks" },
  { quarter: "Q2", standardWeeks: 13, nrf445Weeks: 13, retailPattern: "4-4-5 Weeks" },
  { quarter: "Q3", standardWeeks: 13, nrf445Weeks: 13, retailPattern: "4-4-5 Weeks" },
  { quarter: "Q4 (Standard)", standardWeeks: 13, nrf445Weeks: 13, retailPattern: "4-4-5 Weeks" },
  { quarter: "Q4 (53-Week Leap Yr)", standardWeeks: 13, nrf445Weeks: 14, retailPattern: "4-4-6 Weeks" },
];

export function FiscalRetailCalendarVariationsChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Corporate Fiscal Calendar Pacing: NRF 4-4-5 vs. Standard Quarters
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Distribution of weeks per quarter across standard Gregorian calendar vs. National Retail Federation 4-4-5 cycles.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="quarter" tick={{ fontSize: 11 }} />
            <YAxis domain={[10, 15]} label={{ value: "Operating Weeks", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="standardWeeks" name="Standard Gregorian Weeks" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="nrf445Weeks" name="NRF Retail Fiscal Weeks" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
