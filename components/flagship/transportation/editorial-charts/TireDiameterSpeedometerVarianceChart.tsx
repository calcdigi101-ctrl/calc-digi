"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { indicatedMph: "30 mph", factoryStock: 30.0, plusOneDiameter: 31.1, plusTwoDiameter: 32.3, minusOneDiameter: 28.9 },
  { indicatedMph: "45 mph", factoryStock: 45.0, plusOneDiameter: 46.7, plusTwoDiameter: 48.4, minusOneDiameter: 43.3 },
  { indicatedMph: "60 mph", factoryStock: 60.0, plusOneDiameter: 62.2, plusTwoDiameter: 64.5, minusOneDiameter: 57.8 },
  { indicatedMph: "70 mph", factoryStock: 70.0, plusOneDiameter: 72.6, plusTwoDiameter: 75.3, minusOneDiameter: 67.4 },
  { indicatedMph: "80 mph", factoryStock: 80.0, plusOneDiameter: 83.0, plusTwoDiameter: 86.0, minusOneDiameter: 77.0 },
];

export function TireDiameterSpeedometerVarianceChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Speedometer Reading Error Across Tire Outer Diameter Variations
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        True road speed versus factory instrument cluster readout caused by upsizing (+3.7% and +7.5%) or downsizing (-3.7%) overall rolling circumference.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="indicatedMph" tick={{ fontSize: 11 }} />
            <YAxis unit=" mph" domain={[25, 90]} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`${val} mph`, "Actual Ground Speed"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Line type="monotone" dataKey="factoryStock" name="OEM Baseline (0% Error)" stroke="#64748b" strokeWidth={2} strokeDasharray="4 4" />
            <Line type="monotone" dataKey="plusOneDiameter" name="+1 Inch Tire Diameter (+3.7%)" stroke="#0ea5e9" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="plusTwoDiameter" name="+2 Inch Oversize (+7.5%)" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="minusOneDiameter" name="-1 Inch Low Profile (-3.7%)" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
