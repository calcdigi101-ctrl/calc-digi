"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const distanceConfig: CalcConfig = {
  id: "distance-calculator",
  title: "Travel Distance, Elapsed Transit Duration, Speed and CO2 Emissions Calculator",
  fields: [
    {
      kind: "number",
      key: "distanceMiles",
      label: "Route Distance (Statute Miles)",
      default: 350.0,
      min: 1.0,
      max: 12000.0,
    },
    {
      kind: "choice",
      key: "transitMode",
      label: "Mode of Transportation",
      default: "car_interstate",
      options: [
        { label: "Interstate Highway Driving (65 mph / 105 km/h)", value: "car_interstate" },
        { label: "City & Suburban Commuter (30 mph / 48 km/h)", value: "car_city" },
        { label: "Passenger High-Speed Rail (120 mph / 193 km/h)", value: "high_speed_rail" },
        { label: "Commercial Jet Aircraft (480 mph / 772 km/h)", value: "commercial_flight" },
        { label: "Intercity Bus / Coach (55 mph / 88 km/h)", value: "intercity_bus" },
      ],
    },
    {
      kind: "number",
      key: "dwellBufferMinutes",
      label: "Station / Airport / Rest Stop Buffer (Minutes)",
      default: 30,
      min: 0,
      max: 300,
    },
  ],
  compute: (vals) => {
    const distMiles = Math.max(1, Number(vals.distanceMiles) || 350.0);
    const mode = String(vals.transitMode || "car_interstate");
    const bufferMins = Number(vals.dwellBufferMinutes) || 30;

    interface ModeProfile {
      speedMph: number;
      co2GramsPerMile: number; // grams CO2e per passenger-mile
    }

    const PROFILES: Record<string, ModeProfile> = {
      car_interstate: { speedMph: 65, co2GramsPerMile: 210 },
      car_city: { speedMph: 30, co2GramsPerMile: 320 },
      high_speed_rail: { speedMph: 120, co2GramsPerMile: 45 },
      commercial_flight: { speedMph: 480, co2GramsPerMile: 180 },
      intercity_bus: { speedMph: 55, co2GramsPerMile: 85 },
    };

    const profile = PROFILES[mode] || PROFILES.car_interstate;
    const rawTransitHours = distMiles / profile.speedMph;
    const rawTransitMinutes = rawTransitHours * 60;
    const totalDoorToDoorMinutes = rawTransitMinutes + bufferMins;

    const hrs = Math.floor(totalDoorToDoorMinutes / 60);
    const remMins = Math.round(totalDoorToDoorMinutes % 60);
    const timeStr = hrs > 0 ? `${hrs}h ${remMins}m` : `${remMins} min`;

    const distKm = distMiles * 1.60934;
    const totalCo2Kg = (distMiles * profile.co2GramsPerMile) / 1000;

    return {
      hero: {
        label: "Estimated Door-to-Door Travel Time",
        value: timeStr,
      },
      badge: {
        text: `${distMiles.toLocaleString()} miles (${Math.round(distKm).toLocaleString()} km) @ ${profile.speedMph} mph`,
        tone: "good",
      },
      secondary: [
        {
          label: "In-Motion Transit Duration",
          value: `${Math.floor(rawTransitHours)}h ${Math.round(rawTransitMinutes % 60)}m`,
        },
        {
          label: "Terminal / Rest Buffer Time",
          value: `${bufferMins} minutes`,
        },
        {
          label: "Estimated Carbon Footprint",
          value: `${totalCo2Kg.toFixed(1)} kg CO2e (${profile.co2GramsPerMile} g/mi)`,
        },
        {
          label: "Metric Distance Equivalent",
          value: `${distKm.toFixed(1)} kilometers`,
        },
      ],
      steps: [
        `In-Motion Travel Time = ${distMiles} miles / ${profile.speedMph} mph = ${rawTransitHours.toFixed(2)} hours (${Math.round(rawTransitMinutes)} min)`,
        `Door-to-Door Total = ${Math.round(rawTransitMinutes)} min in-motion + ${bufferMins} min buffer = ${Math.round(totalDoorToDoorMinutes)} min (${timeStr})`,
        `Greenhouse Gas Emissions = ${distMiles} miles * ${profile.co2GramsPerMile} g CO2e/mile = ${Math.round(totalCo2Kg * 1000)} g (${totalCo2Kg.toFixed(1)} kg CO2e)`,
      ],
      chart: {
        type: "donut",
        title: "Total Door-to-Door Journey Time Allocation",
        format: "num",
        data: [
          { name: "Active Cruising Transit (min)", value: Math.round(rawTransitMinutes), color: "#0ea5e9" },
          { name: "Terminal / Pre-Departure Buffer (min)", value: Math.max(1, bufferMins), color: "#f59e0b" },
          { name: "Congestion / Taxiing Margin (min)", value: Math.max(5, Math.round(rawTransitMinutes * 0.10)), color: "#ef4444" },
        ],
      },
    };
  },
};

export default function DistanceCalculatorComponent() {
  return <CalcEngine config={distanceConfig} />;
}
