"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { temp: "34°F (1°C)", slr: 5.0, snowDepth: 4.3, snowWeight: 4.4 },
  { temp: "32°F (0°C)", slr: 8.0, snowDepth: 6.8, snowWeight: 4.4 },
  { temp: "28°F (-2°C)", slr: 10.5, snowDepth: 8.9, snowWeight: 4.4 },
  { temp: "24°F (-4°C)", slr: 13.0, snowDepth: 11.1, snowWeight: 4.4 },
  { temp: "18°F (-8°C)", slr: 16.5, snowDepth: 14.0, snowWeight: 4.4 },
  { temp: "12°F (-11°C)", slr: 21.0, snowDepth: 17.9, snowWeight: 4.4 },
  { temp: "5°F (-15°C)", slr: 25.0, snowDepth: 21.3, snowWeight: 4.4 },
  { temp: "-5°F (-21°C)", slr: 15.0, snowDepth: 12.8, snowWeight: 4.4 },
];

export function SnowToLiquidRatioTemperatureGradientChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Snow-to-Liquid Ratio (SLR) Across Surface & Cloud Temperatures
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Dendritic crystal growth temperature zone (-12°C to -18°C) peaking at 25:1 ultra-dry powder versus heavy 5:1 to 8:1 slush near freezing.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="temp" tick={{ fontSize: 11 }} />
            <YAxis unit=":1" domain={[0, 30]} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`${val}:1 Ratio`, "Snow-to-Liquid Ratio"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Area type="monotone" dataKey="slr" name="Snow-to-Liquid Ratio (SLR)" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.4} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
