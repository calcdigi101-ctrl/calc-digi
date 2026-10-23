import type { Metadata } from "next";
import { Suspense } from "react";
import ChildHeightPredictorCalculator from "@/components/calcs/baby/child-height-predictor-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable } from "@/components/flagship/shell";

const PATH = "/calculators/baby/child-height-predictor-calculator";
const TITLE = "Child Height Predictor Calculator | CalcDigi";
const DESCRIPTION =
  "Predict adult height using parents heights and the clinical Tanner mid-parental formula. Results in centimeters and feet inches.";

export const metadata: Metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/baby", label: "Baby & Parenting" }}
      title="Child Adult Height Predictor Calculator"
      intro="Forecast your child's expected adult stature using biological parental heights and the clinically validated Tanner mid-parental target formula. Provides estimated adult height in feet and inches alongside 95% statistical confidence intervals."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      faq={[
        {
          q: "How accurate is the mid-parental height formula?",
          a: "The Tanner mid-parental calculation has an accuracy window of ±2 to 2.5 inches (±5 to 6.5 cm) for approximately 95% of children. Genetics account for roughly 60% to 80% of final adult stature, with nutrition, hormonal balance, sleep, and medical health contributing the remainder.",
        },
        {
          q: "How is the mid-parental target calculated?",
          a: "For boys: add the father's height and mother's height, add 5 inches (13 cm), and divide by 2. For girls: add the father's height and mother's height, subtract 5 inches (13 cm), and divide by 2. The 13 cm adjustment reflects the biological adult height difference between males and females.",
        },
        {
          q: "Can a child grow significantly taller than their parents?",
          a: "Yes. Polygenic inheritance means children inherit diverse combinations of height-influencing genes from previous generations (grandparents). Enhanced childhood nutrition and modern healthcare have also contributed to secular height gains across generations.",
        },
      ]}
      related={[
        { href: "/calculators/baby/baby-weight-percentile-calculator", icon: "⚖️", name: "Baby Weight Percentile" },
        { href: "/calculators/baby/baby-feeding-calculator", icon: "🍼", name: "Baby Feeding Calculator" },
        { href: "/calculators/baby/baby-sleep-calculator", icon: "😴", name: "Baby Sleep Schedule" },
      ]}
      article={
        <>
          <h2>The Science of Adult Height Prediction</h2>
          <p>
            Pediatric endocrinologists rely on mid-parental height target formulas to assess whether a child's growth
            trajectory matches their genetic potential. When evaluated alongside clinical bone-age radiographs, it offers
            a reliable growth roadmap.
          </p>

          <DataTable
            head={["Metric", "Boys Formula", "Girls Formula", "Clinical Margin"]}
            rows={[
              ["Target Stature", "(Father + Mother + 13 cm) ÷ 2", "(Father + Mother − 13 cm) ÷ 2", "±6.5 cm (±2.5 inches)"],
              ["Genetic Influence", "60% – 80% Paternal/Maternal", "60% – 80% Paternal/Maternal", "Heritable Polygenic"],
              ["Key Growth Window", "Peak Velocity at 13.5 – 14.5 yrs", "Peak Velocity at 11.5 – 12.5 yrs", "Pubertal Growth Spurt"],
            ]}
          />
        </>
      }
    >
      <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />}>
        <ChildHeightPredictorCalculator />
      </Suspense>
    </CalcPage>
  );
}
