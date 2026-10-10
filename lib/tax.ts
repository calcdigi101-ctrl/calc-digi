/**
 * US federal figures for tax year 2026 (IRS Rev. Proc. 2025-32; SSA 2026 wage base).
 * Update this file once a year; every tax/paycheck calculator reads from it.
 */
export const TAX_YEAR = 2026;

export type FilingStatus = "single" | "mfj" | "mfs" | "hoh";

export const FILING_OPTIONS: { value: FilingStatus; label: string }[] = [
  { value: "single", label: "Single" },
  { value: "mfj", label: "Married filing jointly" },
  { value: "mfs", label: "Married filing separately" },
  { value: "hoh", label: "Head of household" },
];

export const STANDARD_DEDUCTION: Record<FilingStatus, number> = {
  single: 16100,
  mfj: 32200,
  mfs: 16100,
  hoh: 24150,
};

/** [upper bound of bracket, rate]; last bracket is open-ended. */
export const BRACKETS: Record<FilingStatus, [number, number][]> = {
  single: [[12400, 0.1], [50400, 0.12], [105700, 0.22], [201775, 0.24], [256225, 0.32], [640600, 0.35], [Infinity, 0.37]],
  mfj: [[24800, 0.1], [100800, 0.12], [211400, 0.22], [403550, 0.24], [512450, 0.32], [768700, 0.35], [Infinity, 0.37]],
  mfs: [[12400, 0.1], [50400, 0.12], [105700, 0.22], [201775, 0.24], [256225, 0.32], [384350, 0.35], [Infinity, 0.37]],
  hoh: [[17700, 0.1], [67450, 0.12], [105700, 0.22], [201775, 0.24], [256200, 0.32], [640600, 0.35], [Infinity, 0.37]],
};

export const SS_WAGE_BASE = 184500;
export const SS_RATE = 0.062;
export const MEDICARE_RATE = 0.0145;
/** Additional Medicare tax on wages above these thresholds (not inflation-indexed). */
export const ADDL_MEDICARE_RATE = 0.009;
export const ADDL_MEDICARE_THRESHOLD: Record<FilingStatus, number> = { single: 200000, mfj: 250000, mfs: 125000, hoh: 200000 };

export function incomeTax(taxable: number, status: FilingStatus) {
  let tax = 0;
  let prev = 0;
  const byBracket: { rate: number; amount: number; tax: number }[] = [];
  for (const [limit, rate] of BRACKETS[status]) {
    const amount = Math.max(0, Math.min(taxable, limit) - prev);
    if (amount > 0) {
      tax += amount * rate;
      byBracket.push({ rate, amount, tax: amount * rate });
    }
    if (taxable <= limit) break;
    prev = limit;
  }
  const marginal = byBracket.length ? byBracket[byBracket.length - 1].rate : BRACKETS[status][0][1];
  return { tax, marginal, byBracket };
}

/** Employee share of Social Security + Medicare on wages. */
export function ficaTax(wages: number, status: FilingStatus) {
  const ss = Math.min(Math.max(wages, 0), SS_WAGE_BASE) * SS_RATE;
  const medicare = Math.max(wages, 0) * MEDICARE_RATE + Math.max(0, wages - ADDL_MEDICARE_THRESHOLD[status]) * ADDL_MEDICARE_RATE;
  return { ss, medicare, total: ss + medicare };
}

/** Self-employment tax (Schedule SE) on net earnings. */
export function selfEmploymentTax(netProfit: number) {
  const base = Math.max(0, netProfit) * 0.9235;
  const ss = Math.min(base, SS_WAGE_BASE) * 0.124;
  const medicare = base * 0.029;
  return { base, ss, medicare, total: ss + medicare, deduction: (ss + medicare) / 2 };
}

/** 2026 retirement plan limits (IRS Notice 2025-67). */
export const LIMIT_401K = 24500;
export const LIMIT_401K_CATCHUP_50 = 8000;
export const LIMIT_401K_CATCHUP_60_63 = 11250;
export const LIMIT_IRA = 7500;
export const LIMIT_IRA_CATCHUP_50 = 1100;

export function max401k(age: number) {
  if (age >= 60 && age <= 63) return LIMIT_401K + LIMIT_401K_CATCHUP_60_63;
  return LIMIT_401K + (age >= 50 ? LIMIT_401K_CATCHUP_50 : 0);
}

export function maxIra(age: number) {
  return LIMIT_IRA + (age >= 50 ? LIMIT_IRA_CATCHUP_50 : 0);
}

/** Rough annual take-home for a W-2 earner: federal tax on the standard deduction plus employee FICA (no state tax). */
export function simpleTakeHome(gross: number, status: FilingStatus = "single") {
  const fed = incomeTax(Math.max(0, gross - STANDARD_DEDUCTION[status]), status).tax;
  const fica = ficaTax(gross, status).total;
  return { fed, fica, takeHome: gross - fed - fica };
}
