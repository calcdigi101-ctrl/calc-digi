"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const cookingTimeConfig: CalcConfig = {
  id: "cooking-time-calculator",
  title: "Meat Cooking Time, Thermal Conduction and Safe Internal Temperature Calculator",
  fields: [
    {
      kind: "choice",
      key: "meatType",
      label: "Protein Cut and Target Doneness",
      default: "chicken_whole",
      options: [
        { label: "Whole Chicken (350°F / 175°C - Safe Core 165°F)", value: "chicken_whole" },
        { label: "Chicken Breast Boneless (375°F / 190°C - Safe Core 165°F)", value: "chicken_breast" },
        { label: "Whole Turkey Unstuffed (325°F / 165°C - Safe Core 165°F)", value: "turkey_unstuffed" },
        { label: "Whole Turkey Stuffed (325°F / 165°C - Safe Core 165°F)", value: "turkey_stuffed" },
        { label: "Beef Roast Medium-Rare (325°F / 165°C - Safe Core 135°F)", value: "beef_med_rare" },
        { label: "Beef Roast Medium (350°F / 175°C - Safe Core 145°F)", value: "beef_medium" },
        { label: "Pork Loin Roast (350°F / 175°C - Safe Core 145°F)", value: "pork_loin" },
        { label: "Bone-in Leg of Lamb (325°F / 165°C - Safe Core 145°F)", value: "lamb_leg" },
      ],
    },
    {
      kind: "number",
      key: "weightLbs",
      label: "Cut Weight (Pounds / lbs)",
      default: 4.5,
      min: 0.5,
      max: 40.0,
    },
    {
      kind: "number",
      key: "ovenTempF",
      label: "Oven Roasting Temperature (°F)",
      default: 350,
      min: 250,
      max: 500,
    },
    {
      kind: "choice",
      key: "boneIn",
      label: "Cut Bone Structure",
      default: "bone_in",
      options: [
        { label: "Bone-In Cut (Thermal Conduction Buffer)", value: "bone_in" },
        { label: "Boneless Cut (Direct Penetration)", value: "boneless" },
      ],
    },
  ],
  compute: (vals) => {
    const meat = String(vals.meatType || "chicken_whole");
    const wt = Number(vals.weightLbs) || 4.5;
    const oven = Number(vals.ovenTempF) || 350;
    const bone = String(vals.boneIn || "bone_in");

    interface MeatSpec {
      rateMinPerLb: number;
      fixedBufferMin: number;
      targetTempF: number;
      restMin: number;
      carryoverF: number;
    }

    const SPECS: Record<string, MeatSpec> = {
      chicken_whole: { rateMinPerLb: 20, fixedBufferMin: 20, targetTempF: 165, restMin: 15, carryoverF: 5 },
      chicken_breast: { rateMinPerLb: 25, fixedBufferMin: 5, targetTempF: 165, restMin: 8, carryoverF: 4 },
      turkey_unstuffed: { rateMinPerLb: 14, fixedBufferMin: 15, targetTempF: 165, restMin: 25, carryoverF: 10 },
      turkey_stuffed: { rateMinPerLb: 17, fixedBufferMin: 30, targetTempF: 165, restMin: 30, carryoverF: 10 },
      beef_med_rare: { rateMinPerLb: 20, fixedBufferMin: 0, targetTempF: 135, restMin: 18, carryoverF: 8 },
      beef_medium: { rateMinPerLb: 24, fixedBufferMin: 0, targetTempF: 145, restMin: 18, carryoverF: 8 },
      pork_loin: { rateMinPerLb: 22, fixedBufferMin: 5, targetTempF: 145, restMin: 12, carryoverF: 6 },
      lamb_leg: { rateMinPerLb: 22, fixedBufferMin: 10, targetTempF: 145, restMin: 15, carryoverF: 7 },
    };

    const spec = SPECS[meat] || SPECS.chicken_whole;
    const tempFactor = Math.pow(350 / Math.max(oven, 250), 0.85);
    const boneFactor = bone === "boneless" ? 0.90 : 1.0;

    const activeRoastMins = Math.round((wt * spec.rateMinPerLb * boneFactor + spec.fixedBufferMin) * tempFactor);
    const restMins = spec.restMin;
    const totalMins = activeRoastMins + restMins;
    const pullFromOvenTempF = spec.targetTempF - spec.carryoverF;

    const hrs = Math.floor(activeRoastMins / 60);
    const remMins = activeRoastMins % 60;
    const roastTimeStr = hrs > 0 ? `${hrs}h ${remMins}m` : `${remMins} min`;

    const totalHrs = Math.floor(totalMins / 60);
    const totalRemMins = totalMins % 60;
    const totalTimeStr = totalHrs > 0 ? `${totalHrs}h ${totalRemMins}m` : `${totalRemMins} min`;

    return {
      hero: {
        label: "Estimated Active Oven Roasting Time",
        value: roastTimeStr,
      },
      badge: {
        text: `Target Safe Core: ${spec.targetTempF}°F (Pull at ${pullFromOvenTempF}°F)`,
        tone: "good",
      },
      secondary: [
        {
          label: "Pull Temperature From Oven",
          value: `${pullFromOvenTempF}°F (${Math.round(((pullFromOvenTempF - 32) * 5) / 9)}°C)`,
        },
        {
          label: "Post-Oven Resting Duration",
          value: `${restMins} minutes`,
        },
        {
          label: "Carryover Thermal Rise",
          value: `+${spec.carryoverF}°F during rest`,
        },
        {
          label: "Total Elapsed Time (Roast + Rest)",
          value: totalTimeStr,
        },
      ],
      steps: [
        `Conduction Baseline: ${spec.rateMinPerLb} min/lb * ${wt.toFixed(2)} lbs = ${(wt * spec.rateMinPerLb).toFixed(1)} mins`,
        `Thermal Convection Factor (${oven}°F): adjustment factor = ${tempFactor.toFixed(3)}x`,
        `Active Oven Roasting = ((${wt.toFixed(2)} * ${spec.rateMinPerLb} * ${boneFactor}) + ${spec.fixedBufferMin}) * ${tempFactor.toFixed(3)} = ${activeRoastMins} min`,
        `Carryover Resting Phase = Remove at ${pullFromOvenTempF}°F; core temperature coasts to safe target ${spec.targetTempF}°F over ${restMins} min resting`,
      ],
      chart: {
        type: "donut",
        title: "Thermal Roasting and Resting Time Distribution",
        format: "num",
        data: [
          { name: "Active Convection Roasting (min)", value: activeRoastMins, color: "#c8832a" },
          { name: "Carryover Resting Phase (min)", value: restMins, color: "#1a5c3a" },
          { name: "Preheat & Searing Window (min)", value: Math.min(15, Math.round(activeRoastMins * 0.15)), color: "#e11d48" },
        ],
      },
    };
  },
};

export default function CookingTimeCalculatorComponent() {
  return <CalcEngine config={cookingTimeConfig} />;
}
