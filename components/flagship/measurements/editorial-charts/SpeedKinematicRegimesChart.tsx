"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { regime: "Pedestrian Walk", ms: 1.4, kmh: 5.0, mph: 3.1, knots: 2.7 },
  { regime: "City Cycling", ms: 5.6, kmh: 20.0, mph: 12.4, knots: 10.8 },
  { regime: "Highway Vehicle", ms: 27.8, kmh: 100.0, mph: 62.1, knots: 54.0 },
  { regime: "Aviation Jet", ms: 250.0, kmh: 900.0, mph: 559.2, knots: 485.9 },
  { regime: "Speed of Sound (Mach 1)", ms: 343.0, kmh: 1234.8, mph: 767.3, knots: 666.7 },
];

export function SpeedKinematicRegimesChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Kinematic Velocity Benchmarks Across Engineering &amp; Aviation Units
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Comparative speed ratings in SI base meters per second (m/s), metric km/h, statute miles per hour (mph), and nautical knots.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.slice(0, 4)} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="regime" />
            <YAxis label={{ value: "Speed (km/h & mph)", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="kmh" name="Kilometers/hour (km/h)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="mph" name="Miles/hour (mph)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="knots" name="Nautical Knots (kn)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
