"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { raw: "50%", curved: "64%" },
  { raw: "60%", curved: "72%" },
  { raw: "70%", curved: "80%" },
  { raw: "80%", curved: "87%" },
  { raw: "90%", curved: "94%" },
  { raw: "100%", curved: "100%" },
];

export function TestScoreRawGradingCurveChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Square-Root & Flat Score Scaling Curve Mechanics
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Exam curving function (10 * sqrt(Raw)) providing maximal recovery to lower-tier performers while moderating ceiling compression.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="raw" tick={{ fontSize: 11 }} />
            <YAxis unit="%" tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Area type="monotone" dataKey="curved" name="Curved Scaled Score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
