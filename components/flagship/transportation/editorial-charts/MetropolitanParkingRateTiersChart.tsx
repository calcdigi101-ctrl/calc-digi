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
  { tier: "2 Hours", meterStreet: 7, municipalGarage: 12, downtownValet: 28, airportDaily: 24 },
  { tier: "4 Hours", meterStreet: 15, municipalGarage: 22, downtownValet: 45, airportDaily: 24 },
  { tier: "8 Hours (Workday)", meterStreet: 34, municipalGarage: 32, downtownValet: 65, airportDaily: 28 },
  { tier: "24 Hours (Overnight)", meterStreet: 48, municipalGarage: 42, downtownValet: 85, airportDaily: 36 },
  { tier: "Weekly Commute (5d)", meterStreet: 160, municipalGarage: 135, downtownValet: 290, airportDaily: 170 },
];

export function MetropolitanParkingRateTiersChart() {
  return (
    <div className="w-full my-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Urban Parking Tariff Tiers Across Metropolitan Facility Types
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Comparative cumulative parking expenditure comparing municipal curbside meters, civic garages, commercial downtown high-rise garages, and airport terminals.
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="tier" tick={{ fontSize: 11 }} />
            <YAxis unit="$" tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(val: any) => [`$${val}`, "Parking Tariff"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="meterStreet" name="Curbside Meter" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            <Bar dataKey="municipalGarage" name="Municipal Garage" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="downtownValet" name="Downtown Garage/Valet" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="airportDaily" name="Airport Terminal Lot" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
