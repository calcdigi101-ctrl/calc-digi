"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const osmolarityConfig: CalcConfig = {
  id: "osmolarity-calculator",
  title: "Serum & Solution Osmolarity Calculator",
  fields: [
    {
      key: "mode",
      label: "Calculation Protocol",
      kind: "choice",
      default: "clinical_serum",
      options: [
        { label: "Clinical Serum Osmolarity (Na+, Glucose, BUN)", value: "clinical_serum" },
        { label: "Multi-Solute Solution Osmolarity (C * i)", value: "multi_solute" },
        { label: "Single Solute Osmotic Pressure (Van 't Hoff)", value: "osmotic_pressure" },
      ],
    },
    {
      key: "sodium",
      label: "Serum Sodium Na⁺ (mEq/L or mmol/L)",
      kind: "number",
      default: 140,
      min: 50,
      max: 250,
    },
    {
      key: "glucose",
      label: "Serum Glucose (mg/dL)",
      kind: "number",
      default: 90,
      min: 10,
      max: 1500,
    },
    {
      key: "bun",
      label: "Blood Urea Nitrogen BUN (mg/dL)",
      kind: "number",
      default: 14,
      min: 1,
      max: 300,
    },
    {
      key: "soluteConc",
      label: "Solute Molarity / Concentration (mM or mmol/L)",
      kind: "number",
      default: 154,
      min: 0.1,
      max: 5000,
    },
    {
      key: "vantHoff",
      label: "Van 't Hoff Dissociation Factor (i)",
      kind: "number",
      default: 2,
      min: 1,
      max: 6,
    },
    {
      key: "temperature",
      label: "Solution Temperature (°C)",
      kind: "number",
      default: 37,
      min: 0,
      max: 100,
    },
  ],
  compute(vals) {
    const mode = String(vals.mode || "clinical_serum");
    const na = Number(vals.sodium) || 140;
    const glu = Number(vals.glucose) || 90;
    const bun = Number(vals.bun) || 14;
    const c = Number(vals.soluteConc) || 154;
    const i = Number(vals.vantHoff) || 2;
    const tempC = Number(vals.temperature) || 37;
    const tempK = tempC + 273.15;
    const R_atm = 0.082057; // L atm / (mol K)

    if (mode === "clinical_serum") {
      const naPart = 2 * na;
      const gluPart = glu / 18.0;
      const bunPart = bun / 2.8;
      const totalOsm = naPart + gluPart + bunPart;
      const effectiveOsm = naPart + gluPart; // tonicity excludes urea which crosses membranes

      let tonicityText = "Normal Isotonic";
      let tone: "good" | "warn" | "bad" | "info" = "good";
      if (totalOsm < 275) {
        tonicityText = "Hypo-osmolar (< 275 mOsm/kg)";
        tone = "info";
      } else if (totalOsm > 295) {
        tonicityText = "Hyper-osmolar (> 295 mOsm/kg)";
        tone = "bad";
      }

      // Osmotic pressure in atmospheres: Pi = C * R * T where C is in mol/L
      const piAtm = (totalOsm / 1000) * R_atm * tempK;
      const piKpa = piAtm * 101.325;

      return {
        hero: {
          label: "Calculated Serum Osmolarity",
          value: `${totalOsm.toFixed(1)} mOsm/L`,
        },
        badge: {
          text: tonicityText,
          tone,
        },
        rows: [
          { label: "Sodium Contribution (2 × [Na⁺])", value: `${naPart.toFixed(1)} mOsm/L (${((naPart / totalOsm) * 100).toFixed(1)}%)` },
          { label: "Glucose Contribution ([Glu] / 18)", value: `${gluPart.toFixed(1)} mOsm/L (${((gluPart / totalOsm) * 100).toFixed(1)}%)` },
          { label: "BUN Contribution ([BUN] / 2.8)", value: `${bunPart.toFixed(1)} mOsm/L (${((bunPart / totalOsm) * 100).toFixed(1)}%)` },
          { label: "Effective Osmolality (Tonicity)", value: `${effectiveOsm.toFixed(1)} mOsm/L` },
          { label: "Equivalent Osmotic Pressure", value: `${piAtm.toFixed(2)} atm (${piKpa.toFixed(1)} kPa)` },
          { label: "Clinical Reference Range", value: "275 – 295 mOsm/kg H₂O" },
        ],
        steps: [
          `Serum Osmolarity = 2 × [Na⁺] + [Glucose]/18 + [BUN]/2.8`,
          `Sodium contribution: 2 × ${na} = ${naPart.toFixed(1)} mOsm/L`,
          `Glucose contribution: ${glu} / 18 = ${gluPart.toFixed(2)} mOsm/L`,
          `Urea nitrogen contribution: ${bun} / 2.8 = ${bunPart.toFixed(2)} mOsm/L`,
          `Sum: ${naPart.toFixed(1)} + ${gluPart.toFixed(2)} + ${bunPart.toFixed(2)} = ${totalOsm.toFixed(1)} mOsm/L`,
          `Van 't Hoff osmotic pressure at ${tempC}°C: Π = (${(totalOsm / 1000).toFixed(4)} mol/L) × 0.08206 × ${tempK.toFixed(1)} K = ${piAtm.toFixed(2)} atm`,
        ],
        chart: {
          type: "donut",
          title: "Serum Osmolar Speciation Breakdown",
          format: "num",
          data: [
            { name: "Sodium Salts", value: Math.round(naPart), color: "#0284c7" },
            { name: "Glucose", value: Math.max(1, Math.round(gluPart)), color: "#10b981" },
            { name: "Blood Urea (BUN)", value: Math.max(1, Math.round(bunPart)), color: "#f59e0b" },
          ],
        },
      };
    } else if (mode === "multi_solute") {
      const osm = c * i;
      const piAtm = (osm / 1000) * R_atm * tempK;
      const piKpa = piAtm * 101.325;
      const tonicity = osm < 275 ? "Hypotonic" : osm > 310 ? "Hypertonic" : "Isotonic";

      return {
        hero: {
          label: "Solution Osmolarity",
          value: `${osm.toFixed(1)} mOsm/L`,
        },
        badge: {
          text: `${tonicity} vs Plasma`,
          tone: tonicity === "Isotonic" ? "good" : tonicity === "Hypotonic" ? "info" : "warn",
        },
        rows: [
          { label: "Analytical Molar Concentration (C)", value: `${c} mM (${(c / 1000).toFixed(4)} M)` },
          { label: "Van 't Hoff Dissociation Factor (i)", value: `${i}` },
          { label: "Total Osmolar Active Species", value: `${osm.toFixed(1)} mOsm/L` },
          { label: "Generated Osmotic Pressure", value: `${piAtm.toFixed(2)} atm (${piKpa.toFixed(1)} kPa)` },
          { label: "Absolute Temperature", value: `${tempK.toFixed(2)} K (${tempC} °C)` },
        ],
        steps: [
          `Osmolarity = Concentration (C) × Van 't Hoff Factor (i)`,
          `Osmolarity = ${c} mM × ${i} = ${osm.toFixed(1)} mOsm/L`,
          `Osmotic pressure: Π = i·C·R·T = (${(osm / 1000).toFixed(4)} mol/L) × 0.08206 × ${tempK.toFixed(1)} K = ${piAtm.toFixed(2)} atm`,
        ],
        chart: {
          type: "donut",
          title: "Solute Particle Dissociation Contribution",
          format: "num",
          data: [
            { name: "Solute Osmolar Activity", value: Math.round(osm), color: "#06b6d4" },
            { name: "Plasma Baseline Iso-Osmolar", value: 290, color: "#64748b" },
          ],
        },
      };
    } else {
      // Single solute osmotic pressure
      const osm = c * i;
      const piAtm = (osm / 1000) * R_atm * tempK;
      const piBar = piAtm * 1.01325;
      const piPsi = piAtm * 14.696;

      return {
        hero: {
          label: "Osmotic Pressure (Π)",
          value: `${piAtm.toFixed(2)} atm`,
        },
        badge: {
          text: `${piBar.toFixed(2)} bar (${(piBar * 100).toFixed(1)} kPa)`,
          tone: "good",
        },
        rows: [
          { label: "Solute Concentration", value: `${c} mmol/L` },
          { label: "Van 't Hoff Factor (i)", value: `${i}` },
          { label: "Osmotic Pressure (atm)", value: `${piAtm.toFixed(3)} atm` },
          { label: "Osmotic Pressure (psi)", value: `${piPsi.toFixed(1)} psi` },
          { label: "Osmotic Pressure (kPa)", value: `${(piBar * 100).toFixed(1)} kPa` },
          { label: "Absolute Temperature", value: `${tempK.toFixed(2)} K` },
        ],
        steps: [
          `Van 't Hoff Equation: Π = i · C · R · T`,
          `C = ${c} mM = ${(c / 1000).toFixed(4)} mol/L`,
          `T = ${tempC} °C = ${tempK.toFixed(2)} K`,
          `R = 0.082057 L·atm/(mol·K)`,
          `Π = ${i} × ${(c / 1000).toFixed(4)} mol/L × 0.082057 × ${tempK.toFixed(2)} K = ${piAtm.toFixed(3)} atm`,
        ],
        chart: {
          type: "donut",
          title: "Osmotic vs Atmospheric Baseline",
          format: "num",
          data: [
            { name: "Generated Osmotic Pressure", value: Number(piAtm.toFixed(2)), color: "#8b5cf6" },
            { name: "Standard Atmospheric Pressure", value: 1.0, color: "#94a3b8" },
          ],
        },
      };
    }
  },
};

export default function OsmolarityCalculatorComponent() {
  return <CalcEngine config={osmolarityConfig} />;
}
