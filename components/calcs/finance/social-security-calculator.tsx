"use client";

import { CalcEngine } from "@/components/flagship/engine/CalcEngine";
import type { CalcConfig } from "@/components/flagship/engine/types";
import { fixed, usd0 } from "@/components/flagship/engine/format";

/** Full retirement age in months, by birth year (SSA). */
export function fraMonths(birthYear: number) {
  if (birthYear <= 1937) return 65 * 12;
  if (birthYear <= 1942) return 65 * 12 + (birthYear - 1937) * 2;
  if (birthYear <= 1954) return 66 * 12;
  if (birthYear <= 1959) return 66 * 12 + (birthYear - 1954) * 2;
  return 67 * 12;
}

/** Benefit as a share of the full-retirement-age amount when claiming at `claimMonths` of age. */
export function benefitFactor(claimMonths: number, fra: number) {
  const diff = claimMonths - fra;
  if (diff >= 0) return 1 + Math.min(diff, 70 * 12 - fra) * (2 / 3 / 100); // 8%/yr delayed credits to 70
  const early = -diff;
  return 1 - Math.min(early, 36) * (5 / 9 / 100) - Math.max(0, early - 36) * (5 / 12 / 100);
}

const ageLabel = (months: number) => `${Math.floor(months / 12)}${months % 12 ? ` & ${months % 12} mo` : ""}`;

export const config: CalcConfig = {
  id: "ss",
  title: "Social Security Calculator",
  fields: [
    { kind: "number", key: "pia", label: "Benefit at full retirement age", hint: "from ssa.gov", prefix: "$", suffix: "/mo", default: 2000, min: 0, max: 20000 },
    { kind: "number", key: "birth", label: "Year of birth", default: 1965, min: 1930, max: 2010, integer: true },
    { kind: "number", key: "claim", label: "Age you plan to claim", default: 67, min: 62, max: 70 },
    { kind: "number", key: "life", label: "Life expectancy", hint: "for lifetime totals", default: 85, min: 62, max: 110, integer: true },
  ],
  compute: (v) => {
    const fra = fraMonths(v.birth as number);
    const claimM = Math.round((v.claim as number) * 12);
    const pia = v.pia as number;
    const monthly = pia * benefitFactor(claimM, fra);
    const lifeM = (v.life as number) * 12;
    const lifetime = (m: number) => Math.max(0, lifeM - m) * pia * benefitFactor(m, fra);
    const ages = [62, 63, 64, 65, 66, 67, 68, 69, 70];
    return {
      hero: { label: `Monthly benefit at ${ageLabel(claimM)}`, value: usd0(monthly), sub: `${fixed(benefitFactor(claimM, fra) * 100, 1)}% of your full benefit · full retirement age ${ageLabel(fra)}` },
      chart: {
        type: "donut",
        format: "usd0",
        data: [
          { name: `Your benefit at ${ageLabel(claimM)}`, value: monthly, color: "#2563eb" },
          { name: "Extra if you wait until 70", value: Math.max(0, pia * benefitFactor(840, fra) - monthly), color: "#10b981" },
        ],
      },
      rows: [
        { label: "Annual benefit", value: usd0(monthly * 12) },
        { label: `Lifetime total to age ${v.life}`, value: usd0(lifetime(claimM)), strong: true },
        { label: "Claiming at 62 instead", value: `${usd0(pia * benefitFactor(744, fra))}/mo` },
        { label: "Waiting until 70", value: `${usd0(pia * benefitFactor(840, fra))}/mo` },
      ],
      details: [
        {
          title: "Benefit and lifetime total by claiming age",
          chart: {
            type: "bar",
            x: "age",
            format: "usd0",
            series: [{ key: "benefit", name: "Monthly benefit", color: "#2563eb" }],
            data: ages.map((a) => ({ age: String(a), benefit: Math.round(pia * benefitFactor(a * 12, fra)) })),
          },
          table: {
            head: ["Claim at", "% of full benefit", "Monthly", `Total to age ${v.life}`],
            rows: ages.map((a) => [a, `${fixed(benefitFactor(a * 12, fra) * 100, 1)}%`, usd0(pia * benefitFactor(a * 12, fra)), usd0(lifetime(a * 12))]),
          },
        },
        {
          title: "Cumulative benefits by age (break-even)",
          chart: {
            type: "line",
            x: "age",
            format: "usd0",
            series: [
              { key: "c62", name: "Claim at 62", color: "#ef4444" },
              { key: "cClaim", name: `Claim at ${ageLabel(claimM)}`, color: "#2563eb" },
              { key: "c70", name: "Claim at 70", color: "#10b981" },
            ],
            data: Array.from({ length: Math.max(1, (v.life as number) - 61) }, (_, i) => {
              const age = 62 + i;
              const cum = (start: number) => Math.max(0, (age + 1) * 12 - start) * pia * benefitFactor(start, fra);
              return { age: String(age), c62: Math.round(cum(744)), cClaim: Math.round(cum(claimM)), c70: Math.round(cum(840)) };
            }),
          },
        },
      ],
      note: { tone: "info", text: "In today's dollars, before cost-of-living adjustments, taxes and Medicare premiums. Working while claiming before full retirement age can temporarily reduce benefits." },
    };
  },
};

export default function SocialSecurityCalculator() {
  return <CalcEngine config={config} />;
}
