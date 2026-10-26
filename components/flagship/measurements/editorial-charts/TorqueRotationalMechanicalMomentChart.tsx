"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { bolt: "M6 (8.8 Grade)", torqueNm: 9.5, clampKn: 9.0, torqueFtLb: 7.0 },
  { bolt: "M8 (8.8 Grade)", torqueNm: 23.0, clampKn: 16.5, torqueFtLb: 17.0 },
  { bolt: "M10 (8.8 Grade)", torqueNm: 46.0, clampKn: 26.0, torqueFtLb: 34.0 },
  { bolt: "M12 (8.8 Grade)", torqueNm: 79.0, clampKn: 38.5, torqueFtLb: 58.3 },
  { bolt: "M16 (8.8 Grade)", torqueNm: 195.0, clampKn: 72.0, torqueFtLb: 143.8 },
];

export function TorqueRotationalMechanicalMomentChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Tightening Torque vs Fastener Preload Clamping Tension (Metric Grade 8.8)
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Relationship between tightening moment (N·m / ft-lb) and axial bolt preload force (kN) according to VDI 2230 guidelines.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="bolt" />
            <YAxis label={{ value: "Magnitude (N·m & kN)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="torqueNm" name="Tightening Torque (N·m)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="clampKn" name="Preload Clamp Force (kN)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="torqueFtLb" name="Imperial Torque (ft-lb)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
