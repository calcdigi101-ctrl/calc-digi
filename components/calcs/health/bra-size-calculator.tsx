"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { num } from "@/components/flagship/engine/format";

const CUPS = ["AA", "A", "B", "C", "D", "DD", "DDD/F", "G", "H", "I", "J", "K"];
const UK_CUPS = ["AA", "A", "B", "C", "D", "DD", "E", "F", "FF", "G", "GG", "H"];

export const config: CalcConfig = {
  id: "bra-size-calculator",
  title: "Bra Size Calculator",
  fields: [
    {
      kind: "choice",
      key: "unit",
      label: "Measurement System",
      default: "in",
      segmented: true,
      options: [
        { value: "in", label: "Inches (in)" },
        { value: "cm", label: "Centimeters (cm)" },
      ],
    },
    {
      kind: "number",
      key: "underbustIn",
      label: "Snug Underbust (Ribcage)",
      suffix: "inches",
      default: 31,
      min: 24,
      max: 56,
      hint: "Measure directly beneath the breasts, snug against the ribcage on an exhale.",
      showIf: (v) => v.unit !== "cm",
    },
    {
      kind: "number",
      key: "bustIn",
      label: "Fullest Bust Circumference",
      suffix: "inches",
      default: 36,
      min: 26,
      max: 68,
      hint: "Measure around the apex (fullest point of the chest), parallel to the floor.",
      showIf: (v) => v.unit !== "cm",
    },
    {
      kind: "number",
      key: "underbustCm",
      label: "Snug Underbust (Ribcage)",
      suffix: "cm",
      default: 79,
      min: 60,
      max: 145,
      hint: "Measure directly beneath the breasts, snug against the ribcage on an exhale.",
      showIf: (v) => v.unit === "cm",
    },
    {
      kind: "number",
      key: "bustCm",
      label: "Fullest Bust Circumference",
      suffix: "cm",
      default: 91,
      min: 65,
      max: 175,
      hint: "Measure around the apex (fullest point of the chest), parallel to the floor.",
      showIf: (v) => v.unit === "cm",
    },
  ],
  compute: (v) => {
    const isCm = v.unit === "cm";
    let underbustIn: number;
    let bustIn: number;

    if (isCm) {
      underbustIn = Number(v.underbustCm || 79) / 2.54;
      bustIn = Number(v.bustCm || 91) / 2.54;
    } else {
      underbustIn = Number(v.underbustIn || 31);
      bustIn = Number(v.bustIn || 36);
    }

    // Modern snug band calculation:
    // Round to nearest even number.
    let bandSize = Math.round(underbustIn);
    if (bandSize % 2 !== 0) {
      // If odd, standard fitting rounds up to nearest even
      bandSize += 1;
    }

    // Difference between bust and calculated band
    const diff = Math.max(0, bustIn - bandSize);

    // Determine Cup Index
    let cupIdx = 0;
    if (diff <= 0.5) cupIdx = 0; // AA
    else if (diff <= 1.25) cupIdx = 1; // A
    else if (diff <= 2.25) cupIdx = 2; // B
    else if (diff <= 3.25) cupIdx = 3; // C
    else if (diff <= 4.25) cupIdx = 4; // D
    else if (diff <= 5.25) cupIdx = 5; // DD
    else if (diff <= 6.25) cupIdx = 6; // DDD/F
    else if (diff <= 7.25) cupIdx = 7; // G
    else if (diff <= 8.25) cupIdx = 8; // H
    else if (diff <= 9.25) cupIdx = 9; // I
    else if (diff <= 10.25) cupIdx = 10; // J
    else cupIdx = 11; // K

    const usCup = CUPS[cupIdx] || "C";
    const ukCup = UK_CUPS[cupIdx] || "C";

    // International conversions
    // EU band is typically round((underbust_cm) / 5) * 5 or bandSize to EU
    const underbustCm = underbustIn * 2.54;
    const euBand = Math.round(underbustCm / 5) * 5;
    const frBand = euBand + 15;
    const auBand = Math.max(8, bandSize - 22);

    // Sister sizes (equivalent cup capacity)
    // Down 1 band (+1 cup)
    const sisterSmallerBand = bandSize - 2;
    const sisterSmallerCup = cupIdx < CUPS.length - 1 ? CUPS[cupIdx + 1] : usCup;
    // Up 1 band (-1 cup)
    const sisterLargerBand = bandSize + 2;
    const sisterLargerCup = cupIdx > 0 ? CUPS[cupIdx - 1] : usCup;

    const usPrimary = `${bandSize}${usCup}`;
    const ukPrimary = `${bandSize}${ukCup}`;
    const euPrimary = `${euBand}${usCup}`;
    const frPrimary = `${frBand}${usCup}`;
    const auPrimary = `${auBand}${usCup}`;

    // Estimated volumetric displacement (cc)
    // Base volume of C cup is ~530cc on 34 band, scaling with band and cup
    const baseBand34C = 530;
    const bandFactor = Math.pow(1.12, (bandSize - 34) / 2);
    const cupFactor = Math.pow(1.22, cupIdx - 3);
    const approxVolumeCc = Math.round(baseBand34C * bandFactor * cupFactor);

    return {
      hero: {
        label: "Calculated Bra Size (US Standard)",
        value: usPrimary,
        unit: "",
        sub: `UK: ${ukPrimary} | EU: ${euPrimary} | Sister Sizes: ${sisterSmallerBand}${sisterSmallerCup} (snugger) or ${sisterLargerBand}${sisterLargerCup} (looser)`,
      },
      badge: {
        text: `Modern Snug-Band Standard (${usPrimary})`,
        tone: "good",
      },
      chart: {
        type: "donut",
        format: "pct",
        data: [
          { name: "Ribcage Band Support", value: 85, color: "#4f46e5" },
          { name: "Shoulder Straps Support", value: 15, color: "#94a3b8" },
        ],
      },
      rows: [
        { label: "US & Canadian Size", value: usPrimary, strong: true },
        { label: "UK Size Standard", value: ukPrimary, strong: true },
        { label: "European Size (EU / ISO 13402)", value: euPrimary, strong: true },
        { label: "French & Spanish Size", value: frPrimary },
        { label: "Australian / NZ Size", value: auPrimary },
        { label: "Sister Size (Snugger Band)", value: `${sisterSmallerBand}${sisterSmallerCup}` },
        { label: "Sister Size (Looser Band)", value: `${sisterLargerBand}${sisterLargerCup}` },
        { label: "Bust-to-Band Difference", value: `${diff.toFixed(1)} inches (${(diff * 2.54).toFixed(1)} cm)` },
        { label: "Approximate Cup Volume", value: `~${approxVolumeCc} cc (mL)` },
      ],
      note: {
        text: (
          <span>
            👙 <strong>The Golden Biomechanical Rule:</strong> 80% to 85% of breast weight support must originate from the firm tension of the thoracic underband, not the shoulder straps. If your shoulder straps dig in or your back band rides upward toward your shoulder blades, the band is too loose and you need a smaller band size with a larger sister cup.
          </span>
        ),
        tone: "info",
      },
    };
  },
};

export default function BraSizeCalculator() {
  return <CalcEngine config={config} />;
}
