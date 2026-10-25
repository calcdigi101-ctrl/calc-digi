"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { min: "0m", poultry: 40, beefMedRare: 40, porkLoin: 40 },
  { min: "20m", poultry: 75, beefMedRare: 72, porkLoin: 70 },
  { min: "40m", poultry: 110, beefMedRare: 105, porkLoin: 102 },
  { min: "60m", poultry: 138, beefMedRare: 127, porkLoin: 125 },
  { min: "75m (Pull)", poultry: 160, beefMedRare: 128, porkLoin: 139 },
  { min: "85m (Rest)", poultry: 165, beefMedRare: 135, porkLoin: 145 },
  { min: "95m (Carve)", poultry: 164, beefMedRare: 134, porkLoin: 144 },
];

export function MeatThermalInternalTemperatureCurveChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Thermal Conduction & Post-Roast Carryover Internal Temperature Trajectory
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        USDA core lethality curves demonstrating the 5°F to 10°F carryover temperature surge during the mandatory 15-minute resting equilibrium phase.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="min" tick={{ fontSize: 11 }} />
            <YAxis unit="°F" domain={[30, 180]} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`${val}°F`, "Internal Core Temp"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Line type="monotone" dataKey="poultry" name="Whole Poultry (Safe 165°F)" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="beefMedRare" name="Beef Roast (Med-Rare 135°F)" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="porkLoin" name="Pork Loin (Safe 145°F)" stroke="#0ea5e9" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
