"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const heatIndexConfig: CalcConfig = {
  id: "heat-index-calculator",
  title: "NOAA Heat Index, Apparent Temperature & Thermal Stress Calculator",
  fields: [
    {
      kind: "number",
      key: "ambientTempF",
      label: "Ambient Air Temperature (°F)",
      default: 92.0,
      min: 75.0,
      max: 130.0,
    },
    {
      kind: "number",
      key: "relativeHumidity",
      label: "Relative Humidity (%)",
      default: 60.0,
      min: 5.0,
      max: 100.0,
    },
    {
      kind: "number",
      key: "windSpeedMph",
      label: "Wind Speed (mph)",
      default: 5.0,
      min: 0.0,
      max: 50.0,
    },
  ],
  compute: (vals) => {
    const t = Number(vals.ambientTempF) || 92.0;
    const r = Math.min(100.0, Math.max(1.0, Number(vals.relativeHumidity) || 60.0));

    // Simple formula first
    let hi = 0.5 * (t + 61.0 + (t - 68.0) * 1.2 + r * 0.094);

    if (hi >= 80.0) {
      // Full Rothfusz regression equation
      hi =
        -42.379 +
        2.04901523 * t +
        10.14333127 * r -
        0.22475541 * t * r -
        0.00683783 * t * t -
        0.05481717 * r * r +
        0.00122874 * t * t * r +
        0.00085282 * t * r * r -
        0.00000199 * t * t * r * r;

      if (r < 13.0 && t >= 80.0 && t <= 112.0) {
        const adj = ((13.0 - r) / 4.0) * Math.sqrt((17.0 - Math.abs(t - 95.0)) / 17.0);
        hi -= adj;
      } else if (r > 85.0 && t >= 80.0 && t <= 87.0) {
        const adj = ((r - 85.0) / 10.0) * ((87.0 - t) / 5.0);
        hi += adj;
      }
    }

    const hiC = ((hi - 32) * 5) / 9;
    const diff = hi - t;

    let danger = "Normal / Caution";
    let tone: "good" | "warn" | "bad" = "good";
    let maxWorkTime = "Unrestricted physical work";

    if (hi < 80) {
      danger = "Normal (Low Heat Strain)";
      tone = "good";
      maxWorkTime = "Unrestricted normal outdoor physical exertion";
    } else if (hi <= 90) {
      danger = "Caution (Fatigue with Prolonged Exposure)";
      tone = "good";
      maxWorkTime = "45 to 60 minutes per work hour with continuous water intake";
    } else if (hi <= 103) {
      danger = "Extreme Caution (Heat Cramps / Exhaustion Possible)";
      tone = "warn";
      maxWorkTime = "30 to 45 minutes per work hour; mandatory shaded cooling";
    } else if (hi <= 124) {
      danger = "Danger (Heat Exhaustion Likely, Heat Stroke Possible)";
      tone = "bad";
      maxWorkTime = "15 to 20 minutes per work hour; aggressive hydration";
    } else {
      danger = "Extreme Danger (Heat Stroke Highly Imminent)";
      tone = "bad";
      maxWorkTime = "Suspend strenuous physical activities immediately";
    }

    return {
      hero: {
        label: "Apparent Heat Index",
        value: `${hi.toFixed(1)}°F (${hiC.toFixed(1)}°C)`,
      },
      badge: {
        text: danger,
        tone: tone,
      },
      secondary: [
        {
          label: "Heat Index Premium (HI - Temp)",
          value: `+${diff.toFixed(1)}°F apparent heat penalty`,
        },
        {
          label: "Thermal Stress Advisory",
          value: danger,
        },
        {
          label: "OSHA Recommended Work Cycle",
          value: maxWorkTime,
        },
        {
          label: "Electrolyte Fluid Intake Need",
          value: hi >= 103 ? "1.0 Quart (32 oz) per hour" : "16 to 24 oz per hour",
        },
      ],
      steps: [
        `Base Temperature = ${t.toFixed(1)}°F with Relative Humidity = ${r.toFixed(1)}%`,
        `Apply NOAA Rothfusz Regression Polynomial: HI = -42.379 + 2.0490*T + 10.1433*RH - 0.2248*T*RH - 0.0068*T² - 0.0548*RH² + ...`,
        `Raw Heat Index = ${hi.toFixed(2)}°F (${hiC.toFixed(2)}°C)`,
        `Apparent Heat Penalty = ${hi.toFixed(1)}°F - ${t.toFixed(1)}°F = +${diff.toFixed(1)}°F`,
        `Classification: ${danger}`,
      ],
      chart: {
        type: "donut",
        title: "Total Thermal Heat Index Stress Allocation",
        format: "num",
        data: [
          { name: "Ambient Dry-Bulb Base (°F)", value: Math.round(t), color: "#f59e0b" },
          { name: "Moisture Evaporative Strain (°F)", value: Math.max(1, Math.round(Math.max(0, diff))), color: "#ef4444" },
        ],
      },
    };
  },
};

export default function HeatIndexCalculatorComponent() {
  return <CalcEngine config={heatIndexConfig} />;
}
