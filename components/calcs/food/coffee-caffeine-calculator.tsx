"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const coffeeCaffeineConfig: CalcConfig = {
  id: "coffee-caffeine-calculator",
  title: "Coffee Caffeine & Biological Clearance Calculator",
  fields: [
    {
      kind: "choice",
      key: "brewMethod",
      label: "Coffee Brew Method",
      default: "drip",
      options: [
        { label: "Drip / Filter Coffee (~18 mg/oz)", value: "drip" },
        { label: "Espresso Shot (~64 mg/shot)", value: "espresso" },
        { label: "French Press / Immersion (~21 mg/oz)", value: "french_press" },
        { label: "Cold Brew Concentrate (~26 mg/oz)", value: "cold_brew" },
        { label: "Pour Over / V60 (~20 mg/oz)", value: "pour_over" },
      ],
    },
    {
      kind: "number",
      key: "servingSizeOz",
      label: "Serving Size (fl oz or Shots)",
      default: 8,
      min: 1,
      max: 64,
    },
    {
      kind: "number",
      key: "cupsConsumed",
      label: "Number of Servings Consumed",
      default: 2,
      min: 1,
      max: 10,
    },
    {
      kind: "number",
      key: "hoursSinceLastDrink",
      label: "Hours Elapsed Since Last Sip",
      default: 3,
      min: 0,
      max: 24,
    },
  ],
  compute(vals) {
    const brew = String(vals.brewMethod || "drip");
    const size = Math.max(1, Number(vals.servingSizeOz) || 8);
    const cups = Math.max(1, Number(vals.cupsConsumed) || 2);
    const hours = Math.max(0, Number(vals.hoursSinceLastDrink) || 0);

    let mgPerUnit = 18; // drip mg per oz
    if (brew === "espresso") mgPerUnit = 64; // mg per shot
    else if (brew === "french_press") mgPerUnit = 21;
    else if (brew === "cold_brew") mgPerUnit = 26;
    else if (brew === "pour_over") mgPerUnit = 20;

    const caffeinePerServing = brew === "espresso" ? mgPerUnit * size : mgPerUnit * size;
    const totalCaffeineMg = caffeinePerServing * cups;

    // FDA Safe Daily Adult Limit = 400 mg
    const fdaPercent = (totalCaffeineMg / 400) * 100;

    // Biological half-life of caffeine averages 5.0 hours in healthy adults
    const halfLife = 5.0;
    const remainingCaffeineMg = totalCaffeineMg * Math.pow(0.5, hours / halfLife);

    // Sleep disruption threshold: >50 mg remaining at bedtime delays REM sleep
    const sleepSafeHours = Math.max(0, halfLife * (Math.log(50 / Math.max(1, totalCaffeineMg)) / Math.log(0.5)));

    const isExcessive = totalCaffeineMg > 400;

    return {
      hero: {
        label: "Total Caffeine Intake",
        value: `${Math.round(totalCaffeineMg)} mg`,
      },
      badge: {
        text: isExcessive ? "Exceeds FDA Daily Limit (400 mg)" : `${fdaPercent.toFixed(0)}% of FDA Daily Safe Allowance`,
        tone: isExcessive ? "bad" : fdaPercent >= 75 ? "warn" : "good",
      },
      secondary: [
        {
          label: `Remaining in Bloodstream (after ${hours}h)`,
          value: `${Math.round(remainingCaffeineMg)} mg`,
        },
        {
          label: "Recommended Pre-Bed Clearance Window",
          value: `~${sleepSafeHours.toFixed(1)} hours before sleep`,
        },
        {
          label: "Per-Cup Caffeine Concentration",
          value: `${Math.round(caffeinePerServing)} mg per cup`,
        },
        {
          label: "Remaining Safe FDA Allowance Today",
          value: `${Math.max(0, Math.round(400 - totalCaffeineMg))} mg remaining`,
        },
      ],
      steps: [
        `Serving Dose: ${size} ${brew === "espresso" ? "shots" : "oz"} * ${mgPerUnit} mg = ${caffeinePerServing.toFixed(0)} mg per cup`,
        `Total Cumulative Caffeine: ${caffeinePerServing.toFixed(0)} mg * ${cups} cups = ${totalCaffeineMg.toFixed(0)} mg`,
        `FDA Safe Limit Index: (${totalCaffeineMg.toFixed(0)} mg / 400 mg) * 100 = ${fdaPercent.toFixed(1)}%`,
        `Pharmacokinetic Clearance: ${totalCaffeineMg.toFixed(0)} mg * (0.5)^(${hours}h / 5.0h) = ${remainingCaffeineMg.toFixed(1)} mg remaining`,
      ],
      chart: {
        type: "donut",
        title: "Daily Caffeine Safety Tolerance Profile",
        format: "num",
        data: [
          { name: "Consumed Caffeine (mg)", value: Math.round(totalCaffeineMg), color: "#8b5cf6" },
          { name: "Remaining Safe FDA Buffer (mg)", value: Math.max(0, Math.round(400 - totalCaffeineMg)), color: "#10b981" },
        ],
      },
    };
  },
};

export default function CoffeeCaffeineCalculatorComponent() {
  return <CalcEngine config={coffeeCaffeineConfig} />;
}
