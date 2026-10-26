"use client";

import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { state: "Absolute Zero", kelvin: 0, celsius: -273.15, fahrenheit: -459.67 },
  { state: "Water Freezing", kelvin: 273.15, celsius: 0, fahrenheit: 32 },
  { state: "Room Temp (20°C)", kelvin: 293.15, celsius: 20, fahrenheit: 68 },
  { state: "Human Core (37°C)", kelvin: 310.15, celsius: 37, fahrenheit: 98.6 },
  { state: "Water Boiling", kelvin: 373.15, celsius: 100, fahrenheit: 212 },
];

export function TemperatureThermodynamicScalesChart() {
  return (
    <div className="my-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        Fundamental Thermodynamic Benchmarks Across Kelvin, Celsius &amp; Fahrenheit
      </h3>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Standard reference phase transitions demonstrating absolute zero origin and offset scaling across thermal systems.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="state" />
            <YAxis label={{ value: "Scale Degree / K", angle: -90, position: "insideLeft", offset: 10 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="kelvin" name="Kelvin (K)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="celsius" name="Celsius (°C)" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="fahrenheit" name="Fahrenheit (°F)" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
