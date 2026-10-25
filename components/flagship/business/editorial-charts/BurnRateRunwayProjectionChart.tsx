"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Month 0", baseRunway: 750, highBurn: 750, optimizedRunway: 750 },
  { month: "Month 3", baseRunway: 570, highBurn: 510, optimizedRunway: 630 },
  { month: "Month 6", baseRunway: 390, highBurn: 270, optimizedRunway: 510 },
  { month: "Month 9", baseRunway: 210, highBurn: 30,  optimizedRunway: 390 },
  { month: "Month 12", baseRunway: 30, highBurn: 0,   optimizedRunway: 270 },
  { month: "Month 15", baseRunway: 0,  highBurn: 0,   optimizedRunway: 150 },
  { month: "Month 18", baseRunway: 0,  highBurn: 0,   optimizedRunway: 30 },
];

export function BurnRateRunwayProjectionChart() {
  return (
    <div className="my-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          Startup Cash Runway Depletion Trajectories ($ Thousands)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Comparing cash burn curves from $750k starting capital across accelerated, baseline ($60k/mo net), and capital-efficient regimes.
        </p>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#64748b" />
            <YAxis tick={{ fontSize: 11 }} stroke="#64748b" tickFormatter={(v) => `$${v}k`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderRadius: "8px",
                border: "none",
                fontSize: "12px",
                color: "#f8fafc",
              }}
              formatter={(val: any) => [`$${val}k Cash Reserves`, ""]}
            />
            <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: "10px", fontSize: "12px" }} />
            <Area type="monotone" dataKey="optimizedRunway" name="Optimized Lean Burn ($40k/mo)" stroke="#10b981" fill="#d1fae5" fillOpacity={0.6} />
            <Area type="monotone" dataKey="baseRunway" name="Baseline Net Burn ($60k/mo)" stroke="#0284c7" fill="#e0f2fe" fillOpacity={0.6} />
            <Area type="monotone" dataKey="highBurn" name="Aggressive Expansion ($80k/mo)" stroke="#ef4444" fill="#fee2e2" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
