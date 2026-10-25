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
  { powertrain: "Gasoline ICE (Otto Cycle)", wheelWork: 24, radiatorThermal: 36, exhaustHeat: 34, drivetrainFriction: 6 },
  { powertrain: "Diesel ICE (Compression)", wheelWork: 32, radiatorThermal: 32, exhaustHeat: 30, drivetrainFriction: 6 },
  { powertrain: "Gas-Electric Hybrid (HEV)", wheelWork: 40, radiatorThermal: 28, exhaustHeat: 27, drivetrainFriction: 5 },
  { powertrain: "Battery Electric (BEV)", wheelWork: 85, radiatorThermal: 5, exhaustHeat: 0, drivetrainFriction: 10 },
];

export function InternalCombustionThermodynamicLossChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Thermodynamic Energy Flow: Useful Wheel Power vs Heat Dissipation
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Percentage breakdown of chemical/electrical fuel input converted into tractive propulsion vs cooling radiator loss, exhaust gas enthalpy, and drivetrain friction.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="powertrain" tick={{ fontSize: 11 }} />
            <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`${val}%`, "Share of Fuel Energy"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="wheelWork" name="Useful Wheel Propulsion %" stackId="a" fill="#10b981" />
            <Bar dataKey="radiatorThermal" name="Engine Coolant & Heat Loss %" stackId="a" fill="#0ea5e9" />
            <Bar dataKey="exhaustHeat" name="High-Enthalpy Exhaust Gas %" stackId="a" fill="#ef4444" />
            <Bar dataKey="drivetrainFriction" name="Pumping & Drivetrain Friction %" stackId="a" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
