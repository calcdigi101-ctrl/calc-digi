import type { Metadata } from "next";
import { Suspense } from "react";
import BabyWeightPercentileCalculator from "@/components/calcs/baby/baby-weight-percentile-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable } from "@/components/flagship/shell";

const PATH = "/calculators/baby/baby-weight-percentile-calculator";
const TITLE = "Baby Weight Percentile Calculator | CalcDigi";
const DESCRIPTION =
  "Find baby weight and growth percentile using WHO and CDC child growth standards for boys and girls aged 0-24 months.";

export const metadata: Metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/baby", label: "Baby & Parenting" }}
      title="Baby Weight Percentile Calculator"
      intro="Evaluate your infant or toddler's weight against official World Health Organization (WHO) and CDC growth standards for boys and girls aged 0 to 24 months. Discover where your child falls on the standard percentile curve."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      faq={[
        {
          q: "What does my baby's weight percentile mean?",
          a: "A percentile indicates how your baby's weight compares to a standard population of healthy children of the same age and sex. For example, if your baby is in the 60th percentile, it means 60% of healthy babies weigh less, and 40% weigh more. Any percentile between the 5th and 95th is clinically considered normal healthy growth.",
        },
        {
          q: "Is a higher percentile better than a lower percentile?",
          a: "No. A baby in the 20th percentile is just as healthy as a baby in the 80th percentile. The critical clinical metric is whether your baby consistently follows their own growth curve over time, rather than jumping or dropping dramatically across curve channels.",
        },
        {
          q: "Why do pediatricians use WHO growth standards instead of CDC for babies under 2?",
          a: "The CDC and AAP specifically recommend the World Health Organization (WHO) growth charts for all infants from birth to 24 months because they reflect physiological growth under optimal conditions (predominantly breastfed infants across global diverse populations). CDC charts are used after age 2.",
        },
        {
          q: "When should I be concerned about weight changes?",
          a: "Contact your pediatrician if your baby drops two or more major percentile lines (e.g., from 75th down to 25th), loses weight after the first two weeks of life, or remains persistently below the 3rd percentile without steady upward momentum.",
        },
      ]}
      related={[
        { href: "/calculators/baby/baby-feeding-calculator", icon: "🍼", name: "Baby Feeding Calculator" },
        { href: "/calculators/baby/child-height-predictor-calculator", icon: "📏", name: "Child Height Predictor" },
        { href: "/calculators/baby/baby-sleep-calculator", icon: "😴", name: "Baby Sleep Schedule" },
      ]}
      article={
        <>
          <h2>WHO Infant Weight Standards (0 to 24 Months)</h2>
          <p>
            The table below illustrates median (50th percentile) and normal standard growth channels (10th to 90th percentile)
            for boys and girls according to WHO clinical growth datasets.
          </p>

          <DataTable
            head={["Age (Months)", "Boys 50th % (Median)", "Boys Normal Range (10th–90th)", "Girls 50th % (Median)", "Girls Normal Range (10th–90th)"]}
            rows={[
              ["Birth (0 mo)", "3.3 kg (7.4 lbs)", "2.8 – 3.9 kg (6.2 – 8.6 lbs)", "3.2 kg (7.1 lbs)", "2.7 – 3.7 kg (6.0 – 8.2 lbs)"],
              ["3 Months", "6.4 kg (14.1 lbs)", "5.6 – 7.2 kg (12.3 – 15.9 lbs)", "5.8 kg (12.8 lbs)", "5.0 – 6.6 kg (11.0 – 14.6 lbs)"],
              ["6 Months", "7.9 kg (17.5 lbs)", "7.0 – 8.9 kg (15.4 – 19.6 lbs)", "7.3 kg (16.1 lbs)", "6.4 – 8.2 kg (14.1 – 18.1 lbs)"],
              ["9 Months", "8.9 kg (19.6 lbs)", "8.0 – 9.9 kg (17.6 – 21.8 lbs)", "8.2 kg (18.1 lbs)", "7.2 – 9.3 kg (15.9 – 20.5 lbs)"],
              ["12 Months (1 yr)", "9.6 kg (21.2 lbs)", "8.6 – 10.8 kg (19.0 – 23.8 lbs)", "8.9 kg (19.6 lbs)", "7.9 – 10.1 kg (17.4 – 22.3 lbs)"],
              ["18 Months", "10.6 kg (23.4 lbs)", "9.5 – 11.9 kg (20.9 – 26.2 lbs)", "10.0 kg (22.0 lbs)", "8.8 – 11.3 kg (19.4 – 24.9 lbs)"],
              ["24 Months (2 yr)", "11.5 kg (25.4 lbs)", "10.3 – 13.0 kg (22.7 – 28.7 lbs)", "10.8 kg (23.8 lbs)", "9.5 – 12.4 kg (20.9 – 27.3 lbs)"],
            ]}
          />
        </>
      }
    >
      <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />}>
        <BabyWeightPercentileCalculator />
      </Suspense>
    </CalcPage>
  );
}
