"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { year: "Year 1", grossTuition: 32000, scholarship: 15500, netPaid: 16500 },
  { year: "Year 2", grossTuition: 33120, scholarship: 15500, netPaid: 17620 },
  { year: "Year 3", grossTuition: 34280, scholarship: 15500, netPaid: 18780 },
  { year: "Year 4", grossTuition: 35480, scholarship: 15500, netPaid: 19980 },
];

export function ScholarshipCoverageFourYearHorizonChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        4-Year Scholarship Value Erosion Under Compounding Tuition Inflation
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Fixed annual merit scholarships provide declining percentage coverage as tuition rates escalate at ~3.5% annually.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
            <YAxis unit="$" tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Area type="monotone" dataKey="grossTuition" name="Gross Tuition" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} strokeWidth={2} />
            <Area type="monotone" dataKey="scholarship" name="Merit Aid Subsidy" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={2} />
            <Area type="monotone" dataKey="netPaid" name="Out-of-Pocket Family Gap" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
