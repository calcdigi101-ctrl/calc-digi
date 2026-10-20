"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num, usd0 } from "@/components/flagship/engine/format";

export const config: CalcConfig = {
  id: "fence",
  title: "Fence Cost Calculator",
  fields: [
    {
      kind: "choice",
      key: "material",
      label: "Fence material type",
      default: "wood_pt",
      options: [
        { value: "wood_pt", label: "Pressure-Treated Pine Wood ($18–$26/ft)" },
        { value: "wood_cedar", label: "Cedar / Redwood Privacy ($28–$38/ft)" },
        { value: "vinyl", label: "Vinyl / PVC Privacy ($30–$46/ft)" },
        { value: "chain_link", label: "Chain Link Galvanized / Black ($15–$24/ft)" },
        { value: "aluminum", label: "Ornamental Aluminum / Iron ($34–$58/ft)" },
      ],
    },
    { kind: "number", key: "length", label: "Total fence run length", suffix: "linear ft", default: 150, min: 10, max: 5000 },
    {
      kind: "choice",
      key: "spacing",
      label: "Post spacing",
      default: "8",
      segmented: true,
      options: [
        { value: "6", label: "6-foot spacing (Heavy wind zones)" },
        { value: "8", label: "8-foot spacing (Industry standard)" },
      ],
    },
    { kind: "number", key: "walkGates", label: "Walk gates (3–4 ft single)", default: 1, min: 0, max: 10, integer: true },
    { kind: "number", key: "driveGates", label: "Driveway gates (8–10 ft double)", default: 0, min: 0, max: 5, integer: true },
    {
      kind: "choice",
      key: "install",
      label: "Installation method",
      default: "pro",
      segmented: true,
      options: [
        { value: "pro", label: "Professional Contractor" },
        { value: "diy", label: "DIY Self-Installation (Save Labor)" },
      ],
    },
  ],
  compute: (v) => {
    const linearFeet = Number(v.length || 150);
    const spacing = Number(v.spacing || 8);
    const walkGates = Number(v.walkGates || 0);
    const driveGates = Number(v.driveGates || 0);
    const isPro = v.install === "pro";
    const mat = v.material || "wood_pt";

    if (linearFeet <= 0) {
      return { error: "Please enter a valid fence length greater than zero." };
    }

    // Material cost per foot (materials only) & labor per foot
    const costMatrix: Record<string, { matPerFt: number; laborPerFt: number }> = {
      wood_pt: { matPerFt: 11, laborPerFt: 11 },
      wood_cedar: { matPerFt: 18, laborPerFt: 13 },
      vinyl: { matPerFt: 22, laborPerFt: 14 },
      chain_link: { matPerFt: 8, laborPerFt: 9 },
      aluminum: { matPerFt: 26, laborPerFt: 16 },
    };

    const rates = costMatrix[mat] || costMatrix.wood_pt;
    const basePanelsCount = Math.ceil(linearFeet / spacing);
    const totalPosts = basePanelsCount + 1 + (walkGates * 1) + (driveGates * 2);
    const concreteBagsNeeded = totalPosts * 2; // 2 bags (50-lb fast-setting) per post hole

    const materialsBase = linearFeet * rates.matPerFt;
    const concreteCost = concreteBagsNeeded * 6.50;
    const gatesCost = (walkGates * 250) + (driveGates * 550);
    const totalMaterialsCost = materialsBase + concreteCost + gatesCost;

    const totalLaborCost = isPro ? linearFeet * rates.laborPerFt : 0;
    const grandTotal = totalMaterialsCost + totalLaborCost;
    const effectiveCostPerFoot = grandTotal / linearFeet;

    return {
      hero: {
        label: "Estimated fence cost",
        value: usd0(grandTotal),
        unit: `(${usd0(effectiveCostPerFoot)}/linear ft)`,
        sub: `${linearFeet} ft run | ${totalPosts} posts | ${concreteBagsNeeded} concrete bags`,
      },
      badge: {
        text: isPro ? "Turnkey Contractor Installed" : "DIY Material Cost Only",
        tone: "good",
      },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: "Panels, Picketing & Posts", value: Number(materialsBase.toFixed(0)), color: "#2563eb" },
          { name: "Concrete Footings & Post Anchor", value: Number(concreteCost.toFixed(0)), color: "#f59e0b" },
          { name: "Gates & Heavy Hardware", value: Number(gatesCost.toFixed(0)), color: "#06b6d4" },
          ...(isPro ? [{ name: "Professional Installation Labor", value: Number(totalLaborCost.toFixed(0)), color: "#10b981" }] : []),
        ],
      },
      rows: [
        { label: "Total Estimated Investment", value: usd0(grandTotal), strong: true },
        { label: "Cost Per Linear Foot", value: `${usd0(effectiveCostPerFoot)}/ft`, strong: true },
        { label: "Required Posts Count", value: `${totalPosts} posts (dug below frost line)` },
        { label: "Standard 8ft Panels Equivalent", value: `${basePanelsCount} panels` },
        { label: "Concrete Bags for Posts (50-lb)", value: `${concreteBagsNeeded} bags (~2 bags per hole)` },
        { label: "Gates Included", value: `${walkGates} walk gate(s), ${driveGates} drive gate(s)` },
        ...(isPro ? [{ label: "Estimated Labor Share", value: usd0(totalLaborCost) }] : []),
      ],
      note: {
        text: (
          <span>
            💡 <strong>Call 811 Before You Dig:</strong> Always dial 811 at least 48 to 72 hours before post hole augering to have municipal gas, electrical, and fiber-optic utilities marked for free. Dig post holes 1/3 the height of the fence (plus 6″ for gravel base).
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function FenceCostCalculator() {
  return <CalcEngine config={config} />;
}
