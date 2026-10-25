"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const flightTimeConfig: CalcConfig = {
  id: "flight-time-calculator",
  title: "Aviation Flight Duration, Wind Vector, Block Time and Great Circle Distance Calculator",
  fields: [
    {
      kind: "number",
      key: "routeDistanceNmi",
      label: "Great Circle Route Distance (Nautical Miles / NM)",
      default: 1850,
      min: 50,
      max: 12000,
    },
    {
      kind: "choice",
      key: "aircraftClass",
      label: "Aircraft Cruising Speed Specification",
      default: "narrowbody",
      options: [
        { label: "Commercial Jet Narrowbody (A320/B737 - 450 kts / Mach 0.78)", value: "narrowbody" },
        { label: "Widebody Long-Haul Jet (B777/A350 - 490 kts / Mach 0.85)", value: "widebody" },
        { label: "Regional Jet (CRJ/E175 - 420 kts / Mach 0.74)", value: "regional_jet" },
        { label: "Regional Turboprop (Dash 8/ATR 72 - 280 kts)", value: "turboprop" },
      ],
    },
    {
      kind: "number",
      key: "headwindTailwindKnots",
      label: "High-Altitude Headwind (-) or Tailwind (+) Vector (Knots)",
      default: -25,
      min: -160,
      max: 160,
    },
    {
      kind: "number",
      key: "taxiwayBufferMinutes",
      label: "Departure Taxi & Arrival Taxi Buffer (Minutes)",
      default: 30,
      min: 5,
      max: 120,
    },
  ],
  compute: (vals) => {
    const distNmi = Math.max(50, Number(vals.routeDistanceNmi) || 1850);
    const aClass = String(vals.aircraftClass || "narrowbody");
    const wind = Number(vals.headwindTailwindKnots) || -25;
    const taxiMins = Number(vals.taxiwayBufferMinutes) || 30;

    const SPEED_MAP: Record<string, number> = {
      narrowbody: 450,
      widebody: 490,
      regional_jet: 420,
      turboprop: 280,
    };
    const tas = SPEED_MAP[aClass] || 450; // True Airspeed in Knots
    const groundSpeedKnots = Math.max(100, tas + wind);

    // Airborne flight time
    const airTimeHours = distNmi / groundSpeedKnots;
    const airTimeMinutes = airTimeHours * 60;

    // Total block time (Gate to Gate)
    const totalBlockMinutes = airTimeMinutes + taxiMins;
    const blockHrs = Math.floor(totalBlockMinutes / 60);
    const blockRemMins = Math.round(totalBlockMinutes % 60);
    const blockTimeStr = `${blockHrs}h ${blockRemMins}m`;

    const airHrs = Math.floor(airTimeMinutes / 60);
    const airRemMins = Math.round(airTimeMinutes % 60);
    const airTimeStr = `${airHrs}h ${airRemMins}m`;

    const distStatuteMiles = distNmi * 1.15078;
    const distKm = distNmi * 1.852;
    const groundSpeedMph = groundSpeedKnots * 1.15078;

    return {
      hero: {
        label: "Estimated Gate-to-Gate Block Time",
        value: blockTimeStr,
      },
      badge: {
        text: `Airborne Flight Time: ${airTimeStr} (${Math.round(groundSpeedKnots)} kts / ${Math.round(groundSpeedMph)} mph ground speed)`,
        tone: "good",
      },
      secondary: [
        {
          label: "In-Flight Airborne Cruise Duration",
          value: airTimeStr,
        },
        {
          label: "Airport Taxiway & Gate Departure Buffer",
          value: `${taxiMins} minutes`,
        },
        {
          label: "Statute Miles & Metric Distance",
          value: `${Math.round(distStatuteMiles).toLocaleString()} miles (${Math.round(distKm).toLocaleString()} km)`,
        },
        {
          label: "Atmospheric Jet Stream Wind Impact",
          value: `${wind >= 0 ? "+" : ""}${wind} kts (${Math.abs(Math.round((distNmi / tas - airTimeHours) * 60))} min shift)`,
        },
      ],
      steps: [
        `Effective Ground Speed = True Airspeed (${tas} kts) + Wind Vector (${wind} kts) = ${groundSpeedKnots} knots (${groundSpeedMph.toFixed(1)} mph)`,
        `Airborne Flight Duration = ${distNmi} NM / ${groundSpeedKnots} knots = ${airTimeHours.toFixed(2)} hours (${Math.round(airTimeMinutes)} min)`,
        `Gate-to-Gate Block Time = ${Math.round(airTimeMinutes)} min airborne + ${taxiMins} min taxi buffer = ${Math.round(totalBlockMinutes)} min (${blockTimeStr})`,
        `Route Conversions: ${distNmi} Nautical Miles = ${distStatuteMiles.toFixed(1)} Statute Miles = ${distKm.toFixed(1)} Kilometers`,
      ],
      chart: {
        type: "donut",
        title: "Flight Mission Timeline Phase Allocation",
        format: "num",
        data: [
          { name: "En-Route Airborne Cruise (min)", value: Math.round(airTimeMinutes * 0.82), color: "#0284c7" },
          { name: "Climb & Terminal Descent Phase (min)", value: Math.round(airTimeMinutes * 0.18), color: "#10b981" },
          { name: "Gate Departure & Arrival Taxiing (min)", value: taxiMins, color: "#f59e0b" },
        ],
      },
    };
  },
};

export default function FlightTimeCalculatorComponent() {
  return <CalcEngine config={flightTimeConfig} />;
}
