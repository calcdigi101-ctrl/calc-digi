"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const leapYearCalculatorConfig: CalcConfig = {
  id: "leap-year-calculator",
  title: "Leap Year Divisibility & Solar Drift Calculator",
  fields: [
    { kind: "number", key: "year", label: "Gregorian Year to Check", default: 2028, min: 1, max: 9999 },
  ],
  presets: [
    { label: "Next Leap Year (2028)", values: { year: 2028 } },
    { label: "Century Non-Leap Year (1900 - Divisible by 100)", values: { year: 1900 } },
    { label: "Millennium Leap Year (2000 - Divisible by 400)", values: { year: 2000 } },
    { label: "Future Century Non-Leap Year (2100)", values: { year: 2100 } },
  ],
  compute: (vals) => {
    const y = Math.round(Number(vals.year) || 2028);

    const div4 = y % 4 === 0;
    const div100 = y % 100 === 0;
    const div400 = y % 400 === 0;
    const isLeap = (div4 && !div100) || div400;

    let reason = "";
    if (div400) {
      reason = `Year ${y} is divisible by 400, satisfying the century leap year exception.`;
    } else if (div100) {
      reason = `Year ${y} is divisible by 100 but NOT 400; it is a common 365-day year.`;
    } else if (div4) {
      reason = `Year ${y} is divisible by 4 and not a century year; it is a leap year.`;
    } else {
      reason = `Year ${y} is not divisible by 4; it is a standard 365-day common year.`;
    }

    const nextLeap = isLeap ? y : y + (4 - (y % 4 === 0 ? 4 : y % 4));

    return {
      hero: {
        value: isLeap ? `${y} is a Leap Year` : `${y} is NOT a Leap Year`,
        label: isLeap ? "366 Days (Includes February 29)" : "365 Days (Standard Common Year)",
        sub: reason,
        tone: isLeap ? "good" : "neutral",
      },
      chart: {
        type: "donut",
        title: "Gregorian 400-Year Cycle Distribution",
        data: [
          { name: "Common Years (365d)", value: 303, color: "#3b82f6" },
          { name: "Leap Years (366d)", value: 97, color: "#10b981" },
        ],
      },
      metrics: [
        { label: "Total Days in Year", value: isLeap ? "366 Days" : "365 Days" },
        { label: "February Day Count", value: isLeap ? "29 Days" : "28 Days" },
        { label: "Divisible by 4?", value: div4 ? "Yes" : "No" },
        { label: "Divisible by 400?", value: div400 ? "Yes" : "No" },
      ],
      breakdown: [
        { label: "Evaluated Gregorian Year", value: `${y}` },
        { label: "Leap Status", value: isLeap ? "LEAP YEAR" : "COMMON YEAR" },
        { label: "Divisibility Test (y % 4)", value: `${y % 4 === 0 ? "0 (Divisible)" : `${y % 4} (Remainder)`}` },
        { label: "Century Test (y % 100)", value: `${y % 100 === 0 ? "0 (Century)" : `${y % 100} (Non-Century)`}` },
        { label: "400-Year Test (y % 400)", value: `${y % 400 === 0 ? "0 (Quad-Century)" : `${y % 400} (Remainder)`}` },
        { label: "Next Leap Year Horizon", value: `${nextLeap}` },
      ],
      steps: [
        `Step 1: Check divisibility by 4: ${y} ÷ 4 = ${(y / 4).toFixed(2)} → ${div4 ? "Pass" : "Fail"}.`,
        `Step 2: Check century divisibility by 100: ${y} ÷ 100 = ${(y / 100).toFixed(2)} → ${div100 ? "Century" : "Standard"}.`,
        `Step 3: Check 400-year exception: ${y} ÷ 400 = ${(y / 400).toFixed(2)} → ${div400 ? "Pass" : "Fail"}.`,
        `Conclusion: Applying Gregorian rule ((y%4==0 && y%100!=0) || y%400==0) yields ${isLeap ? "TRUE (Leap Year)" : "FALSE (Common Year)"}.`,
      ],
    };
  },
};

export default function LeapYearCalculatorComponent() {
  return <CalcEngine config={leapYearCalculatorConfig} />;
}
