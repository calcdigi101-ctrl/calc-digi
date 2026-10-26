"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { sla: "99.0% (2 Nines)", monthlyMinutes: 432.0, annualHours: 87.6 },
  { sla: "99.5% (2.5 Nines)", monthlyMinutes: 216.0, annualHours: 43.8 },
  { sla: "99.9% (3 Nines)", monthlyMinutes: 43.2, annualHours: 8.76 },
  { sla: "99.95% (High Tier)", monthlyMinutes: 21.6, annualHours: 4.38 },
  { sla: "99.99% (4 Nines)", monthlyMinutes: 4.32, annualHours: 0.88 },
  { sla: "99.999% (5 Nines)", monthlyMinutes: 0.43, annualHours: 0.09 },
];

export function ServerUptimeNinesDowntimeChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        High Availability SLAs: Permitted Monthly Downtime Budget (Minutes)
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Logarithmic decline in maximum allowable outage windows across industry 'Nines of Availability' benchmarks.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="sla" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="monthlyMinutes" name="Permitted Monthly Downtime (Minutes)" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
