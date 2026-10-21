"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const config: CalcConfig = {
  id: "pace",
  title: "Pace Calculator",
  fields: [
    {
      kind: "choice",
      key: "event",
      label: "Standard race event",
      default: "half",
      options: [
        { value: "5k", label: "5K (3.11 miles / 5.0 km)" },
        { value: "10k", label: "10K (6.21 miles / 10.0 km)" },
        { value: "half", label: "Half Marathon (13.11 miles / 21.1 km)" },
        { value: "marathon", label: "Full Marathon (26.22 miles / 42.2 km)" },
        { value: "1mi", label: "1 Mile (1.61 km)" },
        { value: "custom", label: "Custom Distance" },
      ],
    },
    {
      kind: "choice",
      key: "unit",
      label: "Distance unit",
      default: "miles",
      segmented: true,
      options: [
        { value: "miles", label: "Miles" },
        { value: "km", label: "Kilometers" },
      ],
    },
    {
      kind: "number",
      key: "customDistance",
      label: "Custom distance",
      suffix: "mi",
      default: 13.11,
      min: 0.1,
      max: 200,
      showIf: (v) => v.event === "custom",
    },
    { kind: "number", key: "hours", label: "Finish time (hours)", suffix: "hrs", default: 1, min: 0, max: 48, integer: true },
    { kind: "number", key: "minutes", label: "Minutes", suffix: "min", default: 45, min: 0, max: 59, integer: true },
    { kind: "number", key: "seconds", label: "Seconds", suffix: "sec", default: 0, min: 0, max: 59, integer: true },
  ],
  compute: (v) => {
    let distMiles = 13.1094;
    let distKm = 21.0975;

    if (v.event === "5k") {
      distMiles = 3.10686;
      distKm = 5.0;
    } else if (v.event === "10k") {
      distMiles = 6.21371;
      distKm = 10.0;
    } else if (v.event === "half") {
      distMiles = 13.1094;
      distKm = 21.0975;
    } else if (v.event === "marathon") {
      distMiles = 26.2188;
      distKm = 42.195;
    } else if (v.event === "1mi") {
      distMiles = 1.0;
      distKm = 1.60934;
    } else {
      const d = Number(v.customDistance || 10);
      if (v.unit === "km") {
        distKm = d;
        distMiles = d / 1.609344;
      } else {
        distMiles = d;
        distKm = d * 1.609344;
      }
    }

    const totalSeconds = Number(v.hours || 0) * 3600 + Number(v.minutes || 0) * 60 + Number(v.seconds || 0);

    if (totalSeconds <= 0 || distMiles <= 0) {
      return {
        hero: { label: "Target Pace", value: "0:00", unit: "/ mi" },
        rows: [],
      };
    }

    const secPerMile = totalSeconds / distMiles;
    const secPerKm = totalSeconds / distKm;

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

    const speedMph = (3600 / secPerMile).toFixed(1);
    const speedKmh = (Number(speedMph) * 1.609344).toFixed(1);

    // Riegel's race predictions:
    const riegel = (targetDistMiles: number) => totalSeconds * Math.pow(targetDistMiles / distMiles, 1.06);

    const pred5k = riegel(3.10686);
    const pred10k = riegel(6.21371);
    const predHalf = riegel(13.1094);
    const predMarathon = riegel(26.2188);

    return {
      hero: {
        label: "Required Target Pace",
        value: `${fmtPace(secPerMile)}`,
        unit: "/ mile",
        sub: `Equivalent to ${fmtPace(secPerKm)} / km (${speedMph} mph / ${speedKmh} km/h)`,
      },
      badge: { text: "Peter Riegel Fatigue Exponent (1.06)", tone: "good" },
      chart: {
        type: "donut",
        format: "num",
        data: [
          { name: "5K Equivalent", value: Math.round(pred5k / 60), color: "#3b82f6" },
          { name: "10K Equivalent", value: Math.round(pred10k / 60), color: "#10b981" },
          { name: "Half Marathon", value: Math.round(predHalf / 60), color: "#f59e0b" },
          { name: "Full Marathon", value: Math.round(predMarathon / 60), color: "#ef4444" },
        ],
      },
      rows: [
        { label: "Pace per Mile", value: `${fmtPace(secPerMile)} / mile`, strong: true },
        { label: "Pace per Kilometer", value: `${fmtPace(secPerKm)} / km`, strong: true },
        { label: "Treadmill Speed", value: `${speedMph} mph (${speedKmh} km/h)` },
        { label: "Total Finish Time", value: fmtTime(totalSeconds), strong: true },
        { label: "Riegel 5K Prediction", value: fmtTime(pred5k) },
        { label: "Riegel 10K Prediction", value: fmtTime(pred10k) },
        { label: "Riegel Half Marathon", value: fmtTime(predHalf), strong: true },
        { label: "Riegel Full Marathon", value: fmtTime(predMarathon), strong: true },
      ],
      note: {
        text: (
          <span>
            🏃 <strong>Race Day Tangents:</strong> Because GPS watch drift and road cornering add 0.2 to 0.4 miles in course weaving, target a pace <strong>5 seconds faster per mile</strong> than calculated to ensure an official chip-time PR.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function PaceCalculator() {
  return <CalcEngine config={config} />;
}
