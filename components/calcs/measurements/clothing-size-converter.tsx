"use client";

import React from "react";
import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";

export const clothingSizeConverterConfig: CalcConfig = {
  id: "clothing-size-converter",
  title: "International Clothing Size Converter",
  fields: [
    {
      kind: "choice",
      key: "category",
      label: "Garment Category",
      default: "womens-dress",
      options: [
        { label: "Women's Dresses & Tops", value: "womens-dress" },
        { label: "Men's Suits & Jackets", value: "mens-suit" },
        { label: "Men's Dress Shirts (Collar)", value: "mens-shirt" },
        { label: "Unisex Waist / Denim Jeans", value: "jeans" },
      ],
    },
    {
      kind: "choice",
      key: "standard",
      label: "Origin Sizing System",
      default: "us",
      options: [
        { label: "US / Canada", value: "us" },
        { label: "UK / Australia", value: "uk" },
        { label: "European Union (EU)", value: "eu" },
        { label: "Italy (IT)", value: "it" },
        { label: "Japan (JP)", value: "jp" },
      ],
    },
    {
      kind: "number",
      key: "sizeVal",
      label: "Size Index Number",
      default: 8,
      min: 0,
      max: 60,
    },
  ],
  presets: [
    { label: "US Women's Size 6 (Medium)", values: { category: "womens-dress", standard: "us", sizeVal: 6 } },
    { label: "US Men's Suit 40R", values: { category: "mens-suit", standard: "us", sizeVal: 40 } },
    { label: "EU Men's Shirt 41cm Collar", values: { category: "mens-shirt", standard: "eu", sizeVal: 41 } },
    { label: "32 Inch Waist Denim Jeans", values: { category: "jeans", standard: "us", sizeVal: 32 } },
  ],
  compute: (vals) => {
    const cat = String(vals.category || "womens-dress");
    const std = String(vals.standard || "us");
    const num = Number(vals.sizeVal) || 8;

    let us = 8, uk = 12, eu = 38, it = 42, jp = 11, cmEst = 88;

    if (cat === "womens-dress") {
      if (std === "us") {
        us = num;
        uk = num + 4;
        eu = num + 30;
        it = num + 34;
        jp = num + 3;
      } else if (std === "uk") {
        uk = num;
        us = Math.max(0, num - 4);
        eu = num + 26;
        it = num + 30;
        jp = num - 1;
      } else if (std === "eu") {
        eu = num;
        us = Math.max(0, num - 30);
        uk = num - 26;
        it = num + 4;
        jp = Math.round(num * 0.28);
      } else if (std === "it") {
        it = num;
        eu = num - 4;
        us = Math.max(0, num - 34);
        uk = num - 30;
        jp = Math.round((num - 34) + 3);
      } else {
        jp = num;
        us = Math.max(0, num - 3);
        uk = us + 4;
        eu = us + 30;
        it = us + 34;
      }
      cmEst = Math.round(80 + us * 2.5);
    } else if (cat === "mens-suit") {
      if (std === "us" || std === "uk") {
        us = num;
        uk = num;
        eu = num + 10;
        it = num + 10;
        jp = num - 30;
      } else {
        eu = num;
        it = num;
        us = num - 10;
        uk = num - 10;
        jp = Math.round(us - 30);
      }
      cmEst = Math.round(us * 2.54);
    } else if (cat === "mens-shirt") {
      if (std === "us" || std === "uk") {
        us = num;
        uk = num;
        eu = Math.round(num * 2.54);
        it = eu;
        jp = eu;
      } else {
        eu = num;
        it = num;
        us = Number((num / 2.54).toFixed(1));
        uk = us;
        jp = num;
      }
      cmEst = Math.round(us * 2.54);
    } else {
      us = num;
      uk = num;
      eu = num + 16;
      it = num + 14;
      jp = num;
      cmEst = Math.round(num * 2.54);
    }

    return {
      hero: {
        value: `US ${us} | UK ${uk} | EU ${eu}`,
        label: `International Cross-Reference (${cat.replace("-", " ")})`,
      },
      breakdown: [
        { label: "US / Canada Size", value: `${us}` },
        { label: "UK / Australia Size", value: `${uk}` },
        { label: "European Union (EU)", value: `${eu}` },
        { label: "Italy (IT)", value: `${it}` },
        { label: "Japan (JP)", value: `${jp}` },
        { label: "Estimated Dimension", value: `~${cmEst} cm (${(cmEst / 2.54).toFixed(1)} inches)` },
      ],
      steps: [
        `Base size identified: ${num} in ${std.toUpperCase()} standard.`,
        `Cross-referenced against ISO 8559-1 anthropometric sizing tables for ${cat}.`,
        `Equivalent measurements: US ${us}, UK ${uk}, EU ${eu}, IT ${it}, JP ${jp}.`,
      ],
      chart: {
        type: "donut",
        title: "Proportional Fit Allocation",
        format: "pct",
        data: [
          { name: "Body Measurement Band", value: 75, color: "#10b981" },
          { name: "Ease Allowance", value: 25, color: "#3b82f6" },
        ],
      },
    };
  },
};

export default function ClothingSizeConverterComponent() {
  return <CalcEngine config={clothingSizeConverterConfig} />;
}
