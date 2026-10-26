"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { year: "Year 1", s3: 1380, wasabi: 360, b2: 360, volumeTb: 5.0 },
  { year: "Year 2", s3: 1725, wasabi: 450, b2: 450, volumeTb: 6.25 },
  { year: "Year 3", s3: 2156, wasabi: 563, b2: 563, volumeTb: 7.81 },
  { year: "Year 4", s3: 2695, wasabi: 703, b2: 703, volumeTb: 9.77 },
  { year: "Year 5", s3: 3369, wasabi: 879, b2: 879, volumeTb: 12.21 },
];

export function CloudStorageGrowthCostTrajectoryChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Cloud Object Storage Annual Cost Trajectory by Provider ($/Year)
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Multi-year cost compounding at 25% annual data growth comparing AWS S3 Standard ($23/TB/mo) vs Wasabi / Backblaze B2 ($6/TB/mo).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Line type="monotone" dataKey="s3" name="AWS S3 ($23/TB)" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="wasabi" name="Wasabi / B2 ($6/TB)" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
