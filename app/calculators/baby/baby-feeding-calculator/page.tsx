import type { Metadata } from "next";
import { Suspense } from "react";
import BabyFeedingCalculator from "@/components/calcs/baby/baby-feeding-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable } from "@/components/flagship/shell";

const PATH = "/calculators/baby/baby-feeding-calculator";
const TITLE = "Baby Feeding Calculator | CalcDigi";
const DESCRIPTION =
  "Calculate breast milk or formula amount per day and per feed by age and weight for babies aged 0-12 months following AAP guidelines.";

export const metadata: Metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/baby", label: "Baby & Parenting" }}
      title="Baby Feeding Calculator"
      intro="Determine your baby's optimal daily milk intake and single bottle ounces based on body weight and pediatric age milestones. Supports formula, pumped breast milk, and combo feeding recommendations from the American Academy of Pediatrics."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      faq={[
        {
          q: "How much formula does a baby need per day?",
          a: "The American Academy of Pediatrics (AAP) recommends roughly 2.5 ounces (75 ml) of formula per pound of body weight every 24 hours. For example, a 10-pound infant needs approximately 25 ounces daily, divided across 6 to 8 feedings. Most babies cap their milk intake around 32 ounces once complementary solids are introduced.",
        },
        {
          q: "How do I know if my baby is getting enough milk?",
          a: "Reliable indicators include: 6 or more heavy wet diapers daily, steady weight gain along their pediatric growth curve, alert and responsive periods when awake, and content relaxation after feedings. Diaper output is the most immediate clinical check of hydration.",
        },
        {
          q: "When should babies start complementary solid foods?",
          a: "The AAP and WHO recommend introducing solid purees or infant finger foods around 6 months of age, when the baby exhibits readiness signs: sitting upright with head control, loss of tongue-thrust reflex, and grasping food toward their mouth. Breast milk or formula remains primary nutrition until 12 months.",
        },
        {
          q: "Can I give my baby water before 6 months?",
          a: "No. Infants under 6 months should not be given plain water because their kidneys are immature. Water can cause water intoxication, electrolyte imbalances (hyponatremia), and displacement of nutrient-dense breast milk or formula.",
        },
      ]}
      related={[
        { href: "/calculators/baby/due-date-calculator", icon: "📅", name: "Pregnancy Due Date" },
        { href: "/calculators/baby/baby-weight-percentile-calculator", icon: "⚖️", name: "Baby Weight Percentile" },
        { href: "/calculators/baby/baby-sleep-calculator", icon: "😴", name: "Baby Sleep Schedule" },
      ]}
      article={
        <>
          <h2>Pediatric Feeding Volume Guidelines by Age</h2>
          <p>
            Every infant is unique, but pediatricians use weight and developmental stage benchmarks to establish healthy
            daily feeding ranges for both bottle-fed formula and expressed breast milk.
          </p>

          <DataTable
            head={["Age Group", "Average Weight", "Feeds per 24 Hours", "Ounces per Feed", "Daily Total Volume"]}
            rows={[
              ["Newborn (0 – 1 Month)", "6 – 9 lbs", "8 – 12 feeds", "2 – 3 oz (60–90 ml)", "16 – 24 oz (480–720 ml)"],
              ["Infant (1 – 3 Months)", "9 – 13 lbs", "6 – 8 feeds", "3 – 5 oz (90–150 ml)", "24 – 28 oz (720–840 ml)"],
              ["Infant (4 – 6 Months)", "13 – 17 lbs", "5 – 6 feeds", "5 – 7 oz (150–210 ml)", "28 – 32 oz (840–960 ml)"],
              ["Baby (6 – 9 Months)", "16 – 21 lbs", "4 – 5 feeds", "6 – 8 oz (180–240 ml)", "26 – 30 oz + Solid Purees"],
              ["Older Baby (9 – 12 Months)", "19 – 24 lbs", "3 – 4 feeds", "7 – 8 oz (210–240 ml)", "24 – 28 oz + Table Foods"],
            ]}
          />

          <h2>Paced Bottle Feeding & Satiety Cues</h2>
          <p>
            Paced bottle feeding prevents overfeeding by allowing your baby to control milk flow. Hold the bottle horizontally
            and watch for fullness cues: turning head away, unclenched relaxed hands, slowing suction, or pushing the nipple out.
          </p>
        </>
      }
    >
      <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />}>
        <BabyFeedingCalculator />
      </Suspense>
    </CalcPage>
  );
}
