import type { Metadata } from "next";
import { Suspense } from "react";
import BabySleepCalculator from "@/components/calcs/baby/baby-sleep-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable } from "@/components/flagship/shell";

const PATH = "/calculators/baby/baby-sleep-calculator";
const TITLE = "Baby Sleep Calculator & Schedule | CalcDigi";
const DESCRIPTION =
  "Calculate sleep needed by age, ideal bedtime, and nap schedule from newborn to toddler based on American Academy of Pediatrics guidelines.";

export const metadata: Metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/baby", label: "Baby & Parenting" }}
      title="Baby Sleep Schedule & Bedtime Calculator"
      intro="Determine your baby's optimal bedtime, age-appropriate wake windows, and daytime nap schedule based on clinical guidelines from the American Academy of Pediatrics. Prevent overtiredness and build consistent pediatric sleep habits."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      faq={[
        {
          q: "What are infant wake windows and why do they matter?",
          a: "A wake window is the duration of time a baby can comfortably remain awake between sleep periods before becoming overtired. Keeping wake windows calibrated to age prevents spikes in cortisol and adrenaline, which cause bedtime crying, false starts, and frequent night wakings.",
        },
        {
          q: "How much sleep do babies need in 24 hours?",
          a: "Newborns (0–3 months) need 14 to 17 hours total; infants (4–11 months) need 12 to 15 hours; toddlers (1–2 years) need 11 to 14 hours. Total hours include both night sleep and daytime naps.",
        },
        {
          q: "When do babies drop from 3 naps to 2 naps?",
          a: "Most babies transition from 3 naps to 2 naps between 7 and 9 months of age, when morning and afternoon wake windows naturally extend to 2.5 to 3.5 hours.",
        },
      ]}
      related={[
        { href: "/calculators/baby/baby-feeding-calculator", icon: "🍼", name: "Baby Feeding Calculator" },
        { href: "/calculators/baby/due-date-calculator", icon: "📅", name: "Pregnancy Due Date" },
        { href: "/calculators/baby/diaper-cost-calculator", icon: "👶", name: "Diaper Cost Calculator" },
      ]}
      article={
        <>
          <h2>Pediatric Sleep Milestones & Wake Windows by Age</h2>
          <DataTable
            head={["Age Range", "Total 24h Sleep", "Daytime Naps", "Optimal Wake Window", "Typical Night Duration"]}
            rows={[
              ["0 – 2 Months", "15 – 17 hours", "4 – 5 naps", "45 – 60 minutes", "8 – 10 hours (fragmented)"],
              ["3 – 4 Months", "14 – 16 hours", "3 – 4 naps", "75 – 120 minutes", "10 – 11 hours"],
              ["5 – 6 Months", "14 – 15 hours", "3 naps", "2 – 2.5 hours", "11 hours"],
              ["7 – 9 Months", "13.5 – 14.5 hours", "2 naps", "2.5 – 3.5 hours", "11 – 12 hours"],
              ["10 – 12 Months", "13 – 14 hours", "2 naps", "3 – 4 hours", "11 – 12 hours"],
              ["13 – 18 Months", "12 – 13.5 hours", "1 – 2 naps", "4 – 5 hours", "11 hours"],
              ["19 – 36 Months", "11.5 – 13 hours", "1 nap", "5 – 6 hours", "10.5 – 11 hours"],
            ]}
          />
        </>
      }
    >
      <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />}>
        <BabySleepCalculator />
      </Suspense>
    </CalcPage>
  );
}
