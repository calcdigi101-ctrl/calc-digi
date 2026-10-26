"use client";

import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { mpg: "15 MPG", usMpg: 15, lp100km: 15.68, impMpg: 18.01 },
  { mpg: "20 MPG", usMpg: 20, lp100km: 11.76, impMpg: 24.02 },
  { mpg: "25 MPG", usMpg: 25, lp100km: 9.41, impMpg: 30.02 },
  { mpg: "30 MPG", usMpg: 30, lp100km: 7.84, impMpg: 36.03 },
  { mpg: "40 MPG", usMpg: 40, lp100km: 5.88, impMpg: 48.04 },
  { mpg: "50 MPG", usMpg: 50, lp100km: 4.70, impMpg: 60.05 },
];

export function FuelEconomyConsumptionCurvatureChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Non-Linear Inverse Fuel Consumption Curve (MPG vs L/100km)
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Demonstrates the classic &apos;MPG Illusion&apos; where marginal efficiency gains diminish non-linearly as miles-per-gallon increases.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="mpg" />
            <YAxis label={{ value: "Consumption (L/100km)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="lp100km" name="Liters/100km (L/100km)" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="usMpg" name="US Miles/Gallon (MPG)" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
