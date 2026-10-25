"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const bakingSubstitutionConfig: CalcConfig = {
  id: "baking-substitution-calculator",
  title: "Baking Ingredient Substitution Calculator",
  fields: [
    {
      kind: "choice",
      key: "targetIngredient",
      label: "Ingredient to Substitute",
      default: "buttermilk",
      options: [
        { label: "Buttermilk (Cultured Dairy)", value: "buttermilk" },
        { label: "Whole Egg (Binder & Moisture)", value: "egg" },
        { label: "Unsalted Butter (Fat & Moisture)", value: "butter" },
        { label: "Granulated White Sugar (Sweetener)", value: "sugar" },
        { label: "Cake Flour (Low Protein)", value: "cake_flour" },
      ],
    },
    {
      kind: "number",
      key: "quantity",
      label: "Original Recipe Quantity",
      default: 1.0,
      min: 0.1,
      max: 50.0,
    },
    {
      kind: "choice",
      key: "unit",
      label: "Recipe Measurement Unit",
      default: "cups",
      options: [
        { label: "Cups", value: "cups" },
        { label: "Tablespoons (Tbsp)", value: "tbsp" },
        { label: "Grams (g)", value: "grams" },
        { label: "Units / Whole Count", value: "units" },
      ],
    },
  ],
  compute(vals) {
    const qty = Math.max(0.1, Number(vals.quantity) || 1.0);
    const ing = String(vals.targetIngredient || "buttermilk");
    const unit = String(vals.unit || "cups");

    let subPrimary = "";
    let subSecondary = "";
    let hydrationImpact = "";
    let fatImpact = "";
    let chartData = [
      { name: "Base Liquid / Starch", value: 75, color: "#0ea5e9" },
      { name: "Active Acid / Binder", value: 15, color: "#10b981" },
      { name: "Fat & Flavor Compounds", value: 10, color: "#f59e0b" },
    ];

    if (ing === "buttermilk") {
      const milkAmount = qty * (unit === "grams" ? 230 : 1.0);
      const acidTbsp = qty * 1.0;
      subPrimary = `${(qty * 0.94).toFixed(2)} ${unit} Whole Milk + ${acidTbsp.toFixed(1)} Tbsp White Vinegar or Fresh Lemon Juice`;
      subSecondary = `Alternative: ${(qty * 0.75).toFixed(2)} ${unit} Plain Greek Yogurt thinned with ${(qty * 0.25).toFixed(2)} ${unit} Water/Milk`;
      hydrationImpact = "100% moisture parity (rest 5 min to curdle)";
      fatImpact = "Similar milkfat percentage";
      chartData = [
        { name: "Milk Liquid Base", value: 94, color: "#0ea5e9" },
        { name: "Vinegar/Acid (Acetic)", value: 6, color: "#10b981" },
      ];
    } else if (ing === "egg") {
      subPrimary = `${(qty * 0.25).toFixed(2)} cups Unsweetened Applesauce OR ${(qty * 0.25).toFixed(2)} cups Mashed Ripe Banana`;
      subSecondary = `Alternative: ${(qty * 1.0).toFixed(0)} Tbsp Ground Flaxseed whisked with ${(qty * 3.0).toFixed(0)} Tbsp Warm Water (rest 10 min)`;
      hydrationImpact = "High moisture; reduces crispness";
      fatImpact = "Zero cholesterol/egg fat; add 0.5 tsp oil if needed";
      chartData = [
        { name: "Water / Moisture", value: 75, color: "#0ea5e9" },
        { name: "Soluble Fiber / Pectin", value: 20, color: "#10b981" },
        { name: "Natural Sugars", value: 5, color: "#f59e0b" },
      ];
    } else if (ing === "butter") {
      subPrimary = `${(qty * 0.80).toFixed(2)} ${unit} Vegetable / Coconut / Canola Oil`;
      subSecondary = `Alternative: ${(qty * 0.50).toFixed(2)} ${unit} Applesauce + ${(qty * 0.50).toFixed(2)} ${unit} Oil (reduces fat)`;
      hydrationImpact = "Butter has 16-18% water; pure oil has 0% water";
      fatImpact = "100% lipid density; produces denser, moister crumb";
      chartData = [
        { name: "Pure Lipid Fat", value: 80, color: "#f59e0b" },
        { name: "Moisture Compensation", value: 20, color: "#0ea5e9" },
      ];
    } else if (ing === "sugar") {
      subPrimary = `${(qty * 0.75).toFixed(2)} ${unit} Pure Honey or Pure Maple Syrup (reduce liquid by 3 Tbsp/cup)`;
      subSecondary = `Alternative: ${(qty * 1.0).toFixed(2)} ${unit} Brown Sugar (adds moisture and molasses note)`;
      hydrationImpact = "Liquid sweeteners add 18% moisture; lower oven temp 25°F";
      fatImpact = "Neutral fat impact; accelerates Maillard browning";
      chartData = [
        { name: "Fructose / Glucose", value: 82, color: "#f59e0b" },
        { name: "Water in Honey/Syrup", value: 18, color: "#0ea5e9" },
      ];
    } else {
      // Cake flour: 1 cup = 3/4 cup AP flour + 2 Tbsp cornstarch
      subPrimary = `${(qty * 0.875).toFixed(2)} ${unit} All-Purpose Flour + ${(qty * 2.0).toFixed(1)} Tbsp Cornstarch (sifted 3x)`;
      subSecondary = `Alternative: 100% Pastry Flour (8-9% protein content)`;
      hydrationImpact = "Cornstarch dilutes wheat gluten matrix to ~8% protein";
      fatImpact = "Neutral; produces ultra-tender crumb structure";
      chartData = [
        { name: "All-Purpose Flour Starch", value: 88, color: "#0ea5e9" },
        { name: "Cornstarch Gluten Diluent", value: 12, color: "#10b981" },
      ];
    }

    return {
      hero: {
        label: "Primary Culinary Substitute",
        value: subPrimary,
      },
      badge: {
        text: hydrationImpact,
        tone: "good",
      },
      secondary: [
        {
          label: "Secondary Pantry Alternative",
          value: subSecondary,
        },
        {
          label: "Lipid / Texture Adjustment",
          value: fatImpact,
        },
        {
          label: "Target Original Ingredient",
          value: `${qty} ${unit} of ${ing.replace("_", " ")}`,
        },
      ],
      steps: [
        `Select substitution for ${qty} ${unit} of ${ing.replace("_", " ")}`,
        `Primary Chemical Parity Formula: ${subPrimary}`,
        `Moisture & Leavening Behavior: ${hydrationImpact}`,
        `Flavor & Crumb Texture Impact: ${fatImpact}`,
      ],
      chart: {
        type: "donut",
        title: "Substitute Physical & Chemical Composition (%)",
        format: "pct",
        data: chartData,
      },
    };
  },
};

export default function BakingSubstitutionCalculatorComponent() {
  return <CalcEngine config={bakingSubstitutionConfig} />;
}
