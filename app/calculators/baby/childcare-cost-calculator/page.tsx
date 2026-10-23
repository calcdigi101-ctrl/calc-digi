import type { Metadata } from "next";
import { Suspense } from "react";
import ChildcareCostCalculator from "@/components/calcs/baby/childcare-cost-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable } from "@/components/flagship/shell";

const PATH = "/calculators/baby/childcare-cost-calculator";
const TITLE = "Childcare Cost Calculator | CalcDigi";
const DESCRIPTION =
  "Compare daycare centers, in-home care, and nanny costs. Calculate net cost after dependent care FSA pre-tax savings and child care tax credits.";

export const metadata: Metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/baby", label: "Baby & Parenting" }}
      title="Childcare & Daycare Cost Calculator"
      intro="Forecast gross and net childcare expenditures across licensed infant and toddler daycare centers, in-home family providers, and private nannies. Factor in up to $5,000 in pre-tax Dependent Care FSA savings and federal tax credits."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={[
        {
          q: "How does a Dependent Care FSA reduce childcare expenses?",
          a: "A Dependent Care Flexible Spending Account (DCFSA) lets eligible working parents set aside up to $5,000 per family per calendar year directly from paychecks before taxes are calculated. Depending on your federal and state tax bracket, this typically saves $1,400 to $1,800 in payroll and income taxes annually.",
        },
        {
          q: "What is the average cost of infant daycare in the United States?",
          a: "National surveys show center-based infant daycare averages between $1,200 and $2,200 per month ($14,000 to $26,000 annually), depending significantly on regional cost of living. In metropolitan areas (New York, Boston, San Francisco), full-time infant care frequently exceeds $2,500/month.",
        },
        {
          q: "Can I use both Dependent Care FSA and the Child & Dependent Care Tax Credit?",
          a: "Yes, but you cannot 'double dip' on the same dollars. If you have two or more qualifying children (allowing up to $6,000 in eligible expenses for the tax credit), you can allocate $5,000 to your FSA and apply the remaining $1,000 toward the federal tax credit.",
        },
      ]}
      related={[
        { href: "/calculators/baby/diaper-cost-calculator", icon: "👶", name: "Diaper Cost Calculator" },
        { href: "/calculators/baby/due-date-calculator", icon: "📅", name: "Pregnancy Due Date" },
        { href: "/calculators/baby/baby-feeding-calculator", icon: "🍼", name: "Baby Feeding Calculator" },
      ]}
      article={
        <>
          <h2>National Childcare Format Cost Comparison</h2>
          <DataTable
            head={["Arrangement", "Typical Weekly Rate", "Annual Commitment", "Key Features & Ratio"]}
            rows={[
              ["Daycare Center (Infant)", "$350 – $550 / week", "$17,500 – $27,500 / yr", "State-licensed, structured curriculum, strict 1:3 or 1:4 staff ratios."],
              ["Daycare Center (Toddler)", "$280 – $420 / week", "$14,000 – $21,000 / yr", "Peer socialization, potty training assistance, 1:6 staff ratio."],
              ["In-Home Family Daycare", "$200 – $320 / week", "$10,000 – $16,000 / yr", "Home setting, multi-age groups, lower cost, flexible hours."],
              ["Full-Time Private Nanny", "$850 – $1,400 / week", "$42,500 – $70,000 / yr", "One-on-one attention in your home, requires household employer payroll tax."],
              ["Au Pair Program", "$420 – $550 / week", "$21,000 – $27,500 / yr", "Live-in cultural exchange, agency fees + weekly stipend + room/board."],
            ]}
          />
        </>
      }
    >
      <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />}>
        <ChildcareCostCalculator />
      </Suspense>
    </CalcPage>
  );
}
