"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num, usd0 } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "paint",
  title: "Paint Calculator",
  fields: [
    { kind: "number", key: "length", label: "Room length", suffix: "ft", default: 14, min: 1, max: 200 },
    { kind: "number", key: "width", label: "Room width", suffix: "ft", default: 12, min: 1, max: 200 },
    { kind: "number", key: "height", label: "Ceiling height", suffix: "ft", default: 8, min: 6, max: 30 },
    {
      kind: "choice",
      key: "coats",
      label: "Number of coats",
      default: "2",
      segmented: true,
      options: [
        { value: "1", label: "1 Coat (Refresh)" },
        { value: "2", label: "2 Coats (Standard)" },
        { value: "3", label: "3 Coats (Dark-to-Light)" },
      ],
    },
    { kind: "number", key: "doors", label: "Doors count", default: 1, min: 0, max: 10, integer: true },
    { kind: "number", key: "windows", label: "Windows count", default: 2, min: 0, max: 20, integer: true },
    {
      kind: "choice",
      key: "ceiling",
      label: "Include ceiling paint?",
      default: "no",
      segmented: true,
      options: [
        { value: "no", label: "Walls Only" },
        { value: "yes", label: "Walls + Ceiling" },
      ],
    },
    {
      kind: "choice",
      key: "primer",
      label: "Include separate primer coat?",
      default: "no",
      segmented: true,
      options: [
        { value: "no", label: "Paint + Primer in One" },
        { value: "yes", label: "Separate Primer Coat" },
      ],
    },
    { kind: "number", key: "pricePerGallon", label: "Paint price per gallon", prefix: "$", default: 50, min: 10, max: 200 },
  ],
  compute: (v) => {
    const l = Number(v.length || 0);
    const w = Number(v.width || 0);
    const h = Number(v.height || 8);
    const coats = Number(v.coats || 2);
    const doors = Number(v.doors || 0);
    const windows = Number(v.windows || 0);
    const includeCeiling = v.ceiling === "yes";
    const needPrimer = v.primer === "yes";
    const priceGal = Number(v.pricePerGallon || 50);

    if (l <= 0 || w <= 0) {
      return { error: "Please enter valid room dimensions greater than zero." };
    }

    const perimeter = 2 * (l + w);
    const grossWallArea = perimeter * h;
    const openingsArea = (doors * 21) + (windows * 15);
    const netWallArea = Math.max(0, grossWallArea - openingsArea);
    const ceilingArea = includeCeiling ? l * w : 0;

    const singleCoatArea = netWallArea + ceilingArea;
    const totalPaintedArea = singleCoatArea * coats;

    // Standard rule: 1 gallon covers 350 sq ft
    const rawGallons = totalPaintedArea / 350;
    const wholeGallons = Math.ceil(rawGallons);
    const quartsNeeded = rawGallons < 1 ? Math.ceil(totalPaintedArea / 87.5) : 0;
    const primerGallons = needPrimer ? Math.ceil(singleCoatArea / 300) : 0;

    const paintCost = wholeGallons * priceGal;
    const primerCost = primerGallons * 30; // avg $30/gal primer

    return {
      hero: {
        label: "Paint required",
        value: `${wholeGallons} gallon${wholeGallons > 1 ? "s" : ""}`,
        unit: `(${coats} coat${coats > 1 ? "s" : ""})`,
        sub: `Total surface to coat: ${num(totalPaintedArea, 1)} sq ft (covers ${wholeGallons * 350} sq ft)`,
      },
      badge: {
        text: wholeGallons >= 5 ? "Buy a 5-Gallon Bucket (Saves ~15%)" : `${wholeGallons} × 1-Gallon Cans`,
        tone: "good",
      },
      chart: {
        type: "donut",
        format: "plain",
        data: [
          { name: "1st Coat Coverage (sq ft)", value: Number(singleCoatArea.toFixed(1)), color: "#2563eb" },
          ...(coats >= 2 ? [{ name: "2nd Coat Coverage (sq ft)", value: Number(singleCoatArea.toFixed(1)), color: "#10b981" }] : []),
          ...(coats >= 3 ? [{ name: "3rd Coat Coverage (sq ft)", value: Number(singleCoatArea.toFixed(1)), color: "#8b5cf6" }] : []),
          { name: "Deducted Door & Window Openings", value: Number(openingsArea.toFixed(1)), color: "#f59e0b" },
        ],
      },
      rows: [
        { label: "Whole 1-Gallon Cans to Buy", value: `${wholeGallons} cans (350 sq ft/gal)`, strong: true },
        { label: "Estimated Paint Cost", value: usd0(paintCost + primerCost), strong: true },
        { label: "Net Wall Surface Area", value: `${num(netWallArea, 1)} sq ft` },
        ...(includeCeiling ? [{ label: "Ceiling Surface Area", value: `${num(ceilingArea, 1)} sq ft` }] : []),
        { label: "Deductions (Openings)", value: `-${openingsArea} sq ft (${doors} doors, ${windows} windows)` },
        ...(needPrimer ? [{ label: "Separate Primer Cans Needed", value: `${primerGallons} gallon(s)` }] : []),
        { label: "Paint Trays & Roller Covers", value: "1 kit (9-inch 3/8″ nap roller + sash brush)" },
      ],
      note: {
        text: (
          <span>
            💡 <strong>Pro Tip:</strong> When using multiple 1-gallon cans of the same color, pour them together into a 5-gallon bucket (known as &ldquo;boxing&rdquo; the paint) to ensure a perfectly uniform sheen and color consistency across all walls.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function PaintCalculator() {
  return <CalcEngine config={config} />;
}
