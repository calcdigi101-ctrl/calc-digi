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
  { activity: "Resting / Basal", met: 1.0, kcalPerHour: 72 },
  { activity: "Cooking / Kitchen Prep", met: 2.5, kcalPerHour: 180 },
  { activity: "Brisk Walking (3.5 mph)", met: 3.8, kcalPerHour: 274 },
  { activity: "Moderate Cycling", met: 8.0, kcalPerHour: 576 },
  { activity: "Lap Swimming", met: 8.3, kcalPerHour: 598 },
  { activity: "Running (6.0 mph)", met: 9.8, kcalPerHour: 706 },
  { activity: "HIIT Conditioning", met: 11.0, kcalPerHour: 792 },
];

export function ActivityMetCalorieExpenditureChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Hourly Energy Expenditure Across Physical Activities (72 kg Individual)
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Comparing Metabolic Equivalent of Task (MET) ratings and total hourly caloric expenditure based on ACSM standards.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis dataKey="activity" stroke="#94a3b8" fontSize={10} />
            <YAxis stroke="#94a3b8" fontSize={11} unit=" kcal" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "8px",
                color: "#f8fafc",
                fontSize: "12px",
              }}
              formatter={(val: any, name: any) => [
                name === "kcalPerHour" ? `${val} kcal/hr` : `${val} METs`,
                name === "kcalPerHour" ? "Gross Calorie Burn" : "Metabolic Intensity",
              ]}
            />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
            <Bar dataKey="kcalPerHour" name="Hourly Calorie Burn (kcal)" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
