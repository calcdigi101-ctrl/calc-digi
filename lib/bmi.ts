export const LB_TO_KG = 0.45359237;
export const IN_TO_CM = 2.54;

export type BmiCategoryId = "under" | "normal" | "over" | "obese";

export const BMI_CATEGORIES: { id: BmiCategoryId; label: string; from: number; to: number; color: string }[] = [
  { id: "under", label: "Underweight", from: 0, to: 18.5, color: "#3b82f6" },
  { id: "normal", label: "Normal", from: 18.5, to: 25, color: "#16a34a" },
  { id: "over", label: "Overweight", from: 25, to: 30, color: "#f59e0b" },
  { id: "obese", label: "Obese", from: 30, to: Infinity, color: "#dc2626" },
];

/** WHO adult classification, used for the detailed label and the reference table. */
export const WHO_CLASSES = [
  { label: "Severe Thinness", range: "< 16", max: 16 },
  { label: "Moderate Thinness", range: "16 – 17", max: 17 },
  { label: "Mild Thinness", range: "17 – 18.5", max: 18.5 },
  { label: "Normal", range: "18.5 – 25", max: 25 },
  { label: "Overweight", range: "25 – 30", max: 30 },
  { label: "Obese Class I", range: "30 – 35", max: 35 },
  { label: "Obese Class II", range: "35 – 40", max: 40 },
  { label: "Obese Class III", range: "≥ 40", max: Infinity },
] as const;

export const HEALTHY_MIN = 18.5;
export const HEALTHY_MAX = 25;

export interface BmiResult {
  bmi: number;
  category: (typeof BMI_CATEGORIES)[number];
  whoClassIndex: number;
  prime: number;
  ponderal: number;
  healthyKg: [number, number];
  /** kg to lose (negative) or gain (positive) to land inside the healthy range; 0 when already inside. */
  deltaToHealthyKg: number;
}

export function computeBmi(heightCm: number, weightKg: number): BmiResult | null {
  if (!(heightCm > 0) || !(weightKg > 0)) return null;
  const m = heightCm / 100;
  const bmi = weightKg / (m * m);
  if (!Number.isFinite(bmi)) return null;
  const healthyKg: [number, number] = [HEALTHY_MIN * m * m, HEALTHY_MAX * m * m];
  const deltaToHealthyKg =
    weightKg < healthyKg[0] ? healthyKg[0] - weightKg : weightKg > healthyKg[1] ? healthyKg[1] - weightKg : 0;
  return {
    bmi,
    category: BMI_CATEGORIES.find((c) => bmi < c.to)!,
    whoClassIndex: WHO_CLASSES.findIndex((c) => bmi < c.max),
    prime: bmi / HEALTHY_MAX,
    ponderal: weightKg / (m * m * m),
    healthyKg,
    deltaToHealthyKg,
  };
}

export function usToMetric(ft: number, inch: number, lb: number) {
  return { cm: (ft * 12 + inch) * IN_TO_CM, kg: lb * LB_TO_KG };
}

export function metricToUs(cm: number, kg: number) {
  const totalIn = cm / IN_TO_CM;
  let ft = Math.floor(totalIn / 12);
  let inch = Math.round((totalIn - ft * 12) * 10) / 10;
  if (inch >= 12) {
    ft += 1;
    inch = 0;
  }
  return { ft, inch, lb: kg / LB_TO_KG };
}

export const BMI_LIMITS = {
  age: [2, 120],
  ft: [1, 8],
  inch: [0, 11.99],
  lb: [10, 1000],
  cm: [30, 275],
  kg: [5, 450],
} as const;
