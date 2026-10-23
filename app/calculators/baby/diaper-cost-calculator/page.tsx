import type { Metadata } from "next";
import { Suspense } from "react";
import DiaperCostCalculator from "@/components/calcs/baby/diaper-cost-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable } from "@/components/flagship/shell";

const PATH = "/calculators/baby/diaper-cost-calculator";
const TITLE = "Diaper Cost Calculator | CalcDigi";
const DESCRIPTION =
  "Calculate monthly and yearly diaper costs. Compare disposable store brands, name brands, eco-friendly, and reusable cloth diapers until potty training.";

export const metadata: Metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/baby", label: "Baby & Parenting" }}
      title="Baby Diaper Cost Calculator"
      intro="Project your monthly, annual, and cumulative diaper expenses from newborn birth up to potty training (averaging 30 months). Compare disposable store brands, name brands, and reusable cloth diaper savings."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={[
        {
          q: "How many diapers does a baby use before potty training?",
          a: "The average baby uses approximately 6,500 to 7,500 diapers from birth until full potty training (typically achieved around 2.5 to 3 years of age). Usage begins at 10 to 12 daily for newborns and gradually moderates to 5 to 6 daily for older toddlers.",
        },
        {
          q: "Are cloth diapers cheaper than disposables?",
          a: "Yes. A full one-size cloth diaper stash costs between $350 and $600 upfront, with monthly laundry and detergent averaging $12 to $18. Total cloth diaper investment across 2.5 years averages $700 to $900, compared to $1,800 to $3,200 for disposables, saving $1,000 to $2,300 per child.",
        },
        {
          q: "How can parents save the most money on disposable diapers?",
          a: "Top cost-saving strategies: 1) Buy wholesale club store brands (Costco Kirkland or Sam's Club Member's Mark) at $0.16–$0.20 per diaper. 2) Avoid overstocking small sizes (Newborn and Size 1) as babies outgrow them quickly. 3) Utilize retail subscription discounts (Amazon Subscribe & Save or Target Circle for 15%–20% off).",
        },
      ]}
      related={[
        { href: "/calculators/baby/childcare-cost-calculator", icon: "🏫", name: "Childcare Cost Calculator" },
        { href: "/calculators/baby/baby-feeding-calculator", icon: "🍼", name: "Baby Feeding Calculator" },
        { href: "/calculators/baby/due-date-calculator", icon: "📅", name: "Pregnancy Due Date" },
      ]}
      article={
        <>
          <h2>Diaper Size Transitions & Usage Stages</h2>
          <DataTable
            head={["Diaper Size", "Baby Weight Range", "Daily Diapers", "Typical Duration", "Unit Cost Range"]}
            rows={[
              ["Newborn (NB)", "Up to 10 lbs (4.5 kg)", "10 – 12 diapers/day", "2 – 4 weeks", "$0.18 – $0.35"],
              ["Size 1", "8 – 14 lbs (3.6 – 6.3 kg)", "8 – 10 diapers/day", "2 – 3 months", "$0.18 – $0.32"],
              ["Size 2", "12 – 18 lbs (5.4 – 8.1 kg)", "7 – 9 diapers/day", "3 – 4 months", "$0.20 – $0.36"],
              ["Size 3", "16 – 28 lbs (7.2 – 12.7 kg)", "6 – 8 diapers/day", "5 – 8 months", "$0.22 – $0.40"],
              ["Size 4", "22 – 37 lbs (10 – 16.8 kg)", "5 – 7 diapers/day", "8 – 12 months", "$0.25 – $0.45"],
              ["Size 5 & 6", "27+ lbs (12.2+ kg)", "4 – 6 diapers/day", "Until Potty Trained", "$0.28 – $0.52"],
            ]}
          />
        </>
      }
    >
      <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />}>
        <DiaperCostCalculator />
      </Suspense>
    </CalcPage>
  );
}
