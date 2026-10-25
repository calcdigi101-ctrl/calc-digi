"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const speedDistanceTimeConfig: CalcConfig = {
  id: "speed-distance-time-calculator",
  title: "Speed, Distance, Travel Time, Kinematic Velocity and Stopping Distance Calculator",
  fields: [
    {
      kind: "choice",
      key: "solveFor",
      label: "Variable to Calculate / Solve For",
      default: "time",
      options: [
        { label: "Travel Time (given Distance & Speed)", value: "time" },
        { label: "Required Speed / Velocity (given Distance & Time)", value: "speed" },
        { label: "Distance Covered (given Speed & Time)", value: "distance" },
      ],
    },
    {
      kind: "number",
      key: "distanceMiles",
      label: "Travel Distance (Statute Miles)",
      default: 325.0,
      min: 0.1,
      max: 50000.0,
    },
    {
      kind: "number",
      key: "speedMph",
      label: "Average Cruising Speed (Miles Per Hour / mph)",
      default: 65.0,
      min: 0.5,
      max: 2000.0,
    },
    {
      kind: "number",
      key: "timeHours",
      label: "Elapsed Time - Hours",
      default: 5,
      min: 0,
      max: 500,
    },
    {
      kind: "number",
      key: "timeMinutes",
      label: "Elapsed Time - Minutes",
      default: 0,
      min: 0,
      max: 59,
    },
  ],
  compute: (vals) => {
    const solve = String(vals.solveFor || "time");
    let dist = Number(vals.distanceMiles) || 325.0;
    let speed = Number(vals.speedMph) || 65.0;
    const hrs = Number(vals.timeHours) || 0;
    const mins = Number(vals.timeMinutes) || 0;
    let totalHours = hrs + mins / 60;

    let heroLabel = "";
    let heroVal = "";

    if (solve === "time") {
      totalHours = Math.max(0.001, dist / Math.max(0.1, speed));
      const h = Math.floor(totalHours);
      const m = Math.round((totalHours - h) * 60);
      heroLabel = "Calculated Travel Time";
      heroVal = `${h}h ${m}m (${totalHours.toFixed(2)} hours)`;
    } else if (solve === "speed") {
      totalHours = Math.max(0.001, totalHours);
      speed = dist / totalHours;
      heroLabel = "Required Average Speed";
      heroVal = `${speed.toFixed(1)} mph (${(speed * 1.60934).toFixed(1)} km/h)`;
    } else {
      // solve === "distance"
      totalHours = Math.max(0.001, totalHours);
      dist = speed * totalHours;
      heroLabel = "Calculated Distance Traveled";
      heroVal = `${dist.toFixed(1)} miles (${(dist * 1.60934).toFixed(1)} km)`;
    }

    const speedKmh = speed * 1.60934;
    const speedMs = speedKmh / 3.6;
    const distKm = dist * 1.60934;

    // Pace
    const paceMinMile = speed > 0 ? 60 / speed : 0;
    const paceMin = Math.floor(paceMinMile);
    const paceSec = Math.round((paceMinMile - paceMin) * 60);

    // Kinematic stopping distance physics:
    // d_perception = v * t_reaction (1.5 seconds)
    // d_braking = v^2 / (2 * mu * g) (mu ~ 0.7 for dry asphalt)
    const reactionDistanceFeet = speed * 1.46667 * 1.5; // v in ft/s * 1.5s
    const brakingDistanceFeet = Math.pow(speed * 1.46667, 2) / (2 * 0.7 * 32.174);
    const totalStoppingFeet = reactionDistanceFeet + brakingDistanceFeet;

    return {
      hero: {
        label: heroLabel,
        value: heroVal,
      },
      badge: {
        text: `Velocity: ${speed.toFixed(1)} mph (${speedKmh.toFixed(1)} km/h | ${speedMs.toFixed(1)} m/s)`,
        tone: "good",
      },
      secondary: [
        {
          label: "Distance Equivalents",
          value: `${dist.toFixed(1)} statute miles (${distKm.toFixed(1)} km | ${(dist * 0.868976).toFixed(1)} NM)`,
        },
        {
          label: "Traveling Pace",
          value: `${paceMin}m ${paceSec < 10 ? "0" : ""}${paceSec}s per mile`,
        },
        {
          label: "Highway Emergency Stopping Distance",
          value: `${Math.round(totalStoppingFeet)} ft (~${Math.round(totalStoppingFeet / 15)} car lengths)`,
        },
        {
          label: "Driver Reaction Buffer Distance",
          value: `${Math.round(reactionDistanceFeet)} ft (1.5s perception delay)`,
        },
      ],
      steps: [
        `Governing Kinematic Relation: Distance (d) = Velocity (v) * Time (t)`,
        solve === "time" ? `Elapsed Time = ${dist.toFixed(1)} miles / ${speed.toFixed(1)} mph = ${totalHours.toFixed(3)} hours` :
        solve === "speed" ? `Velocity = ${dist.toFixed(1)} miles / ${totalHours.toFixed(3)} hours = ${speed.toFixed(2)} mph` :
        `Distance = ${speed.toFixed(1)} mph * ${totalHours.toFixed(3)} hours = ${dist.toFixed(2)} miles`,
        `Emergency Braking Physics @ ${speed.toFixed(0)} mph = ${Math.round(reactionDistanceFeet)} ft reaction + ${Math.round(brakingDistanceFeet)} ft mechanical brake = ${Math.round(totalStoppingFeet)} ft total stop`,
      ],
      chart: {
        type: "donut",
        title: "Emergency Highway Stopping Distance Composition",
        format: "num",
        data: [
          { name: "Perception Reaction Distance (ft)", value: Math.round(reactionDistanceFeet), color: "#0ea5e9" },
          { name: "Mechanical Braking Distance (ft)", value: Math.round(brakingDistanceFeet), color: "#ef4444" },
          { name: "Safety Margin Buffer (ft)", value: Math.round(totalStoppingFeet * 0.20), color: "#10b981" },
        ],
      },
    };
  },
};

export default function SpeedDistanceTimeCalculatorComponent() {
  return <CalcEngine config={speedDistanceTimeConfig} />;
}
