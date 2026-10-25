"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const recipeScalerConfig: CalcConfig = {
  id: "recipe-scaler",
  title: "Culinary Recipe Scaler, Baker's Percentage and Volumetric Batch Multiplier",
  fields: [
    {
      kind: "number",
      key: "originalYield",
      label: "Original Recipe Yield / Servings",
      default: 4,
      min: 1,
      max: 500,
    },
    {
      kind: "number",
      key: "desiredYield",
      label: "Desired Recipe Yield / Servings",
      default: 10,
      min: 1,
      max: 1000,
    },
    {
      kind: "number",
      key: "baseDryGrams",
      label: "Base Dry Flour / Starch Weight (g)",
      default: 500,
      min: 10,
      max: 50000,
    },
    {
      kind: "number",
      key: "liquidMl",
      label: "Liquid Hydration Volume (ml / g)",
      default: 325,
      min: 0,
      max: 50000,
    },
    {
      kind: "number",
      key: "seasoningLeaveningGrams",
      label: "Salt / Leavener Baseline Weight (g)",
      default: 10,
      min: 0.1,
      max: 2000,
    },
  ],
  compute: (vals) => {
    const orig = Math.max(1, Number(vals.originalYield) || 4);
    const want = Math.max(1, Number(vals.desiredYield) || 10);
    const baseDry = Number(vals.baseDryGrams) || 500;
    const liquid = Number(vals.liquidMl) || 325;
    const seasoning = Number(vals.seasoningLeaveningGrams) || 10;

    const scaleFactor = want / orig;

    // Linear scaling for bulk ingredients
    const scaledBaseDry = baseDry * scaleFactor;
    const scaledLiquid = liquid * scaleFactor;

    // Non-linear scaling for volatile leaveners and intense seasonings
    // When scaling >2x, chemical leaveners and pungent spices scale at ~85% of linear to avoid overpowering
    let seasoningFactor = scaleFactor;
    if (scaleFactor > 2.0) {
      seasoningFactor = scaleFactor * 0.88;
    } else if (scaleFactor < 0.5) {
      seasoningFactor = scaleFactor * 1.12;
    }
    const scaledSeasoning = seasoning * seasoningFactor;

    // Baker's percentage calculations
    const hydrationPct = (liquid / baseDry) * 100;
    const seasoningPct = (seasoning / baseDry) * 100;
    const totalBatchMass = scaledBaseDry + scaledLiquid + scaledSeasoning;

    return {
      hero: {
        label: "Culinary Batch Scaling Factor",
        value: `${scaleFactor.toFixed(2)}x Multiplier`,
      },
      badge: {
        text: `Scaled from ${orig} to ${want} portions (${(totalBatchMass / 1000).toFixed(2)} kg total mass)`,
        tone: "good",
      },
      secondary: [
        {
          label: "Scaled Primary Dry Starch / Flour",
          value: `${Math.round(scaledBaseDry)} g (${(scaledBaseDry / 1000).toFixed(2)} kg)`,
        },
        {
          label: "Scaled Hydration Liquid",
          value: `${Math.round(scaledLiquid)} ml (${hydrationPct.toFixed(1)}% baker's hydration)`,
        },
        {
          label: "Adjusted Seasoning / Leavener",
          value: `${scaledSeasoning.toFixed(1)} g (non-linear compensation)`,
        },
        {
          label: "Total Raw Batch Mass",
          value: `${Math.round(totalBatchMass)} g (${Math.round(totalBatchMass / want)} g / serving)`,
        },
      ],
      steps: [
        `Batch Multiplier = Target Portions (${want}) / Original Portions (${orig}) = ${scaleFactor.toFixed(3)}x`,
        `Bulk Flour / Starch = ${baseDry} g * ${scaleFactor.toFixed(3)} = ${scaledBaseDry.toFixed(1)} g`,
        `Liquid Hydration = ${liquid} ml * ${scaleFactor.toFixed(3)} = ${scaledLiquid.toFixed(1)} ml`,
        `Non-Linear Leavening / Seasoning Adjustment = ${seasoning} g * ${seasoningFactor.toFixed(3)} = ${scaledSeasoning.toFixed(1)} g`,
      ],
      chart: {
        type: "donut",
        title: "Scaled Recipe Batch Mass Composition",
        format: "num",
        data: [
          { name: "Primary Flour / Starch (g)", value: Math.round(scaledBaseDry), color: "#f59e0b" },
          { name: "Liquid Hydration (ml)", value: Math.round(scaledLiquid), color: "#0ea5e9" },
          { name: "Active Leavening & Seasoning (g)", value: Math.max(1, Math.round(scaledSeasoning)), color: "#10b981" },
        ],
      },
    };
  },
};

export default function RecipeScalerComponent() {
  return <CalcEngine config={recipeScalerConfig} />;
}
