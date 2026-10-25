"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { rainfall: "0.5 Inch", roof1000: 280, roof2000: 560, roof3000: 840, roof4000: 1120 },
  { rainfall: "1.0 Inch", roof1000: 560, roof2000: 1120, roof3000: 1680, roof4000: 2240 },
  { rainfall: "1.5 Inches", roof1000: 840, roof2000: 1680, roof3000: 2520, roof4000: 3360 },
  { rainfall: "2.0 Inches", roof1000: 1120, roof2000: 2240, roof3000: 3360, roof4000: 4480 },
  { rainfall: "3.0 Inches", roof1000: 1680, roof2000: 3360, roof3000: 5040, roof4000: 6720 },
];

export function StormwaterCatchmentRunoffVolumeChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Harvested Rainwater Runoff Yield Across Roof Footprint Dimensions
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Net captured storm precipitation in gallons (90% runoff coefficient) across standard residential and light commercial catchment roof footprints.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="rainfall" tick={{ fontSize: 11 }} />
            <YAxis unit=" gal" tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`${val.toLocaleString()} Gallons`, "Runoff Volume"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="roof1000" name="1,000 sq ft Roof" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            <Bar dataKey="roof2000" name="2,000 sq ft Roof" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="roof3000" name="3,000 sq ft Roof" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="roof4000" name="4,000 sq ft Roof" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
