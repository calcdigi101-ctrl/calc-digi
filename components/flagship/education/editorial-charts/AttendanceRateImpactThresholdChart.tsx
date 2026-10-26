"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const data = [
  { student: "Student A", rate: 95 },
  { student: "Student B", rate: 88 },
  { student: "Student C", rate: 80 },
  { student: "Student D", rate: 74 },
  { student: "Student E", rate: 68 },
  { student: "Student F", rate: 55 },
];

export function AttendanceRateImpactThresholdChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Attendance Compliance Thresholds & Disciplinary Cutoff Zones
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Visual benchmark showing safe compliance zones (&gt;80%) vs statutory truancy and examination debarment thresholds (&lt;75%).
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="student" tick={{ fontSize: 11 }} />
            <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
            <ReferenceLine y={75} stroke="#ef4444" strokeDasharray="3 3" label={{ value: "Mandatory 75% Cutoff", fill: "#ef4444", fontSize: 11 }} />
            <Bar dataKey="rate" name="Attendance Rate" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
