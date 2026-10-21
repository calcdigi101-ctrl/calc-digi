"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "swim-pace",
  title: "Swim Pace Calculator",
  fields: [
    {
      kind: "choice",
      key: "event",
      label: "Swimming distance",
      default: "1500m",
      options: [
        { value: "100m", label: "100 Meters / Sprint" },
        { value: "200m", label: "200 Meters" },
        { value: "400m", label: "400 Meters / Mid-Distance" },
        { value: "500yd", label: "500 Yards (US High School / NCAA)" },
        { value: "800m", label: "800 Meters" },
        { value: "1500m", label: "1,500 Meters (Olympic Triathlon)" },
        { value: "halfIron", label: "1.2 Miles / 1,900m (Half Ironman 70.3)" },
        { value: "fullIron", label: "2.4 Miles / 3,800m (Full Ironman)" },
        { value: "custom", label: "Custom Distance" },
      ],
    },
    {
      kind: "choice",
      key: "unit",
      label: "Pacing standard",
      default: "100m",
      segmented: true,
      options: [
        { value: "100m", label: "Pace per 100 Meters" },
        { value: "100yd", label: "Pace per 100 Yards" },
      ],
    },
    {
      kind: "number",
      key: "customDistance",
      label: "Custom distance",
      suffix: "meters",
      default: 1500,
      min: 25,
      max: 25000,
      showIf: (v) => v.event === "custom",
    },
    { kind: "number", key: "hours", label: "Swim duration (hours)", suffix: "hrs", default: 0, min: 0, max: 24, integer: true },
    { kind: "number", key: "minutes", label: "Minutes", suffix: "min", default: 27, min: 0, max: 59, integer: true },
    { kind: "number", key: "seconds", label: "Seconds", suffix: "sec", default: 30, min: 0, max: 59, integer: true },
  ],
  compute: (v) => {
    let distMeters = 1500;
    if (v.event === "100m") distMeters = 100;
    else if (v.event === "200m") distMeters = 200;
    else if (v.event === "400m") distMeters = 400;
    else if (v.event === "500yd") distMeters = 457.2;
    else if (v.event === "800m") distMeters = 800;
    else if (v.event === "1500m") distMeters = 1500;
    else if (v.event === "halfIron") distMeters = 1931.2;
    else if (v.event === "fullIron") distMeters = 3862.4;
    else distMeters = Math.max(25, Number(v.customDistance || 1500));

    const totalSeconds = Number(v.hours || 0) * 3600 + Number(v.minutes || 0) * 60 + Number(v.seconds || 0);

    if (totalSeconds <= 0 || distMeters <= 0) {
      return {
        hero: { label: "Target Swim Pace", value: "0:00", unit: "/ 100m" },
        rows: [],
      };
    }

    // Seconds per 100 meters:
    const secPer100m = (totalSeconds / distMeters) * 100;
    // Seconds per 100 yards (100 yards = 91.44 meters):
    const secPer100yd = (totalSeconds / distMeters) * 91.44;

    const fmtPace = (sec: number) => {
      const m = Math.floor(sec / 60);
      const s = Math.round(sec % 60);
      return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    const fmtTime = (totalSec: number) => {
      const h = Math.floor(totalSec / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = Math.round(totalSec % 60);
      if (h > 0) return `${h}h ${m}m ${s < 10 ? "0" : ""}${s}s`;
      return `${m}m ${s < 10 ? "0" : ""}${s}s`;
    };

    // Velocity in meters per second and km/h:
    const speedMps = (distMeters / totalSeconds).toFixed(2);
    const speedKmh = ((distMeters / totalSeconds) * 3.6).toFixed(2);

    // Equivalent Projections across standard distances based on CSS fatigue:
    const pred400 = (secPer100m / 100) * 400 * 0.96; // slightly faster sprint
    const pred1500 = (secPer100m / 100) * 1500;
    const predHalfIron = (secPer100m / 100) * 1931.2 * 1.04;
    const predFullIron = (secPer100m / 100) * 3862.4 * 1.08;

    return {
      hero: {
        label: "Required Swim Pace",
        value: `${fmtPace(secPer100m)}`,
        unit: "/ 100m",
        sub: `Equivalent to ${fmtPace(secPer100yd)} / 100yd (${speedMps} m/s • ${speedKmh} km/h)`,
      },
      badge: { text: "Hydrodynamic Velocity Standard", tone: "good" },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "400m Split", value: Math.round(pred400 / 60), color: "#3b82f6" },
          { name: "1,500m Olympic", value: Math.round(pred1500 / 60), color: "#10b981" },
          { name: "Half Ironman (1.2mi)", value: Math.round(predHalfIron / 60), color: "#f59e0b" },
          { name: "Full Ironman (2.4mi)", value: Math.round(predFullIron / 60), color: "#ef4444" },
        ],
      },
      rows: [
        { label: "Pace per 100 Meters", value: `${fmtPace(secPer100m)} / 100m`, strong: true },
        { label: "Pace per 100 Yards", value: `${fmtPace(secPer100yd)} / 100yd`, strong: true },
        { label: "Total Swim Duration", value: fmtTime(totalSeconds), strong: true },
        { label: "Swimming Velocity", value: `${speedMps} m/s (${speedKmh} km/h)` },
        { label: "Projected 400m Pool Time", value: fmtTime(pred400) },
        { label: "Projected 1,500m Olympic Time", value: fmtTime(pred1500), strong: true },
        { label: "Projected Half Ironman (1.2 mi)", value: fmtTime(predHalfIron) },
        { label: "Projected Full Ironman (2.4 mi)", value: fmtTime(predFullIron), strong: true },
      ],
      note: {
        text: (
          <span>
            🏊 <strong>Open Water Sighting Tax:</strong> In open-water triathlon swims, wave chop, wetsuit buoying, and sighting lifts typically add <strong>3 to 5 seconds per 100 meters</strong> compared to indoor pool swimming.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function SwimPaceCalculator() {
  return <CalcEngine config={config} />;
}
