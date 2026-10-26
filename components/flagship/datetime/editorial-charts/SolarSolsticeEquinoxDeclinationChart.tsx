"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const data = [
  { marker: "Winter Solstice (Dec 21)", declination: -23.44, dayOfYear: 355 },
  { marker: "Mid-Winter (Feb 4)", declination: -16.3, dayOfYear: 35 },
  { marker: "Spring Equinox (Mar 20)", declination: 0.0, dayOfYear: 79 },
  { marker: "Mid-Spring (May 5)", declination: 16.3, dayOfYear: 125 },
  { marker: "Summer Solstice (Jun 21)", declination: 23.44, dayOfYear: 172 },
  { marker: "Mid-Summer (Aug 7)", declination: 16.3, dayOfYear: 219 },
  { marker: "Autumn Equinox (Sep 22)", declination: 0.0, dayOfYear: 265 },
  { marker: "Mid-Autumn (Nov 7)", declination: -16.3, dayOfYear: 311 },
];

export function SolarSolsticeEquinoxDeclinationChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Solar Declination Sine Wave & Seasonal Milestone Countdowns
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Earth axial tilt (23.44°) oscillation driving solar declination across the annual calendar orbit.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="marker" angle={-15} textAnchor="end" interval={0} height={45} tick={{ fontSize: 10 }} />
            <YAxis label={{ value: "Declination (°)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="declination" name="Solar Declination Angle (°)" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.25} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
