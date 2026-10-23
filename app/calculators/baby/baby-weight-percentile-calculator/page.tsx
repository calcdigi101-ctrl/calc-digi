import type { Metadata } from "next";
import { Suspense } from "react";
import BabyWeightPercentileCalculator from "@/components/calcs/baby/baby-weight-percentile-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { WhoInfantGrowthPercentilesChart } from "@/components/flagship/health/editorial-charts/WhoInfantGrowthPercentilesChart";

const PATH = "/calculators/baby/baby-weight-percentile-calculator";
const TITLE = "Baby Weight Percentile Calculator – WHO Growth Standards (0–24 Months) | CalcDigi";
const DESCRIPTION =
  "Calculate exact infant weight-for-age percentiles and clinical Z-scores using official World Health Organization (WHO) Child Growth Standards (0 to 24 months). Features sex-specific growth curve benchmarks, daily gain rates, and clinical health guidance.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PATH,
  },
};

const RELATED_CALCULATORS = [
  { href: "/calculators/baby/child-height-predictor-calculator", icon: "📏", name: "Child Height Predictor Calculator" },
  { href: "/calculators/baby/baby-feeding-calculator", icon: "🍼", name: "Baby Feeding Calculator" },
  { href: "/calculators/baby/due-date-calculator", icon: "📅", name: "Pregnancy Due Date Calculator" },
  { href: "/calculators/baby/baby-sleep-calculator", icon: "🌙", name: "Baby Sleep & Wake Windows" },
  { href: "/calculators/health/bmi-calculator", icon: "🩺", name: "BMI Calculator for Adults" },
  { href: "/calculators/health/ideal-weight-calculator", icon: "⚖️", name: "Ideal Body Weight Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "What does my baby's weight percentile actually mean?",
    a: "A percentile indicates how your baby's weight compares to a healthy reference population of 100 infants of the exact same sex and age. For example, if your 4-month-old daughter is in the 65th percentile, it means she weighs more than 65% of healthy 4-month-old female infants and less than 35%. Being in the 15th, 50th, or 85th percentile is completely normal; pediatricians look for consistent trajectory along their personal curve rather than a specific number.",
  },
  {
    q: "Why do pediatricians use WHO growth charts instead of CDC charts for infants under 2 years?",
    a: "The CDC and AAP recommend the WHO Child Growth Standards for all children from birth to 24 months. The WHO charts describe how healthy infants grow under optimal biological conditions, using exclusively breastfed infants from six diverse nations as the biological norm. In contrast, older CDC charts were based on formula-fed infants who tended to gain weight more rapidly after 4 months.",
  },
  {
    q: "How much weight should a newborn gain per day?",
    a: "After regaining initial physiological fluid loss by day 10 to 14: Newborns gain approximately 20 to 30 grams (0.7 to 1.0 oz) per day during months 0 to 3; roughly 15 to 20 grams (0.5 to 0.7 oz) per day during months 3 to 6; and about 10 to 15 grams (0.35 to 0.5 oz) per day from months 6 to 12. Most healthy babies double their birth weight by 4 to 5 months and triple it by their first birthday.",
  },
  {
    q: "What is considered a concerning drop in weight percentiles?",
    a: "A drop across two or more major percentile lines (for example, falling from the 75th percentile to the 25th percentile) or persistently tracking below the 3rd or 5th percentile warrants clinical pediatric investigation for failure to thrive, malabsorption, inadequate caloric intake, or underlying metabolic factors.",
  },
  {
    q: "How is weight adjusted for premature babies?",
    a: "For infants born prior to 37 weeks gestation, pediatricians use 'corrected age' (or adjusted age) rather than chronological age until 24 months. Corrected age is calculated by subtracting the number of weeks the baby was born early from their chronological age. Plotting against corrected age prevents misdiagnosing normal premature catch-up growth as failure to thrive.",
  },
  {
    q: "What is a Z-score and how does it differ from a percentile?",
    a: "A Z-score (standard deviation score) measures exactly how many standard deviations an infant's weight lies above or below the population median (Z = 0, corresponding to the 50th percentile). Z-scores are clinically superior for tracking extreme values below the 3rd percentile (Z < -1.88) or above the 97th percentile (Z > +1.88) where standard percentile curves compress into flat lines.",
  },
];

export default function BabyWeightPercentilePage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/calculators/baby", label: "Baby & Parenting" }}
      title="Baby Weight Percentile Calculator"
      intro="Evaluate your infant's weight-for-age percentile and clinical Z-scores based on official World Health Organization (WHO) Child Growth Standards (0–24 months). Supports metric (kg) and imperial (lbs/oz) inputs."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Clinical Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
                <svg className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Clinically Verified
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Reviewed against <strong className="font-semibold text-slate-800 dark:text-slate-200">WHO Multicentre Growth Reference Study &amp; AAP Standards</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Pediatric Anthropometry Reference</span>
              <span>•</span>
              <time dateTime="2026-10-23">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <h2 className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Clinical Summary: Understanding Infant Weight Percentiles
            </h2>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              The <strong>World Health Organization (WHO) Child Growth Standards</strong> establish the global gold standard for infant physical development between birth and 24 months. Rather than assessing whether an infant is &ldquo;big&rdquo; or &ldquo;small,&rdquo; percentiles provide a statistical benchmark: a baby at the <strong>50th percentile</strong> represents the biological median weight. Any percentile between the <strong>3rd and 97th percentile</strong> is considered within normal physiological limits, provided the child grows steadily along their individual growth curve over consecutive pediatrician wellness checkups.
            </p>
          </div>

          <h2>The Methodology Behind WHO Child Growth Standards</h2>
          <p>
            Between 1997 and 2003, the World Health Organization conducted the landmark <strong>Multicentre Growth Reference Study (MGRS)</strong>, monitoring over 8,400 healthy infants across six socioeconomically and culturally diverse countries: Brazil, Ghana, India, Norway, Oman, and the United States.
          </p>
          <p>
            The profound discovery of the MGRS was that when infants receive optimal nutrition (exclusive breastfeeding for at least 4 to 6 months), timely complementary foods, standard pediatric immunizations, and clean environments, <em>infants grow at nearly identical rates regardless of geographical origin or ethnicity</em>. Thus, the WHO charts function as a prescriptive standard (how children <em>should</em> grow) rather than a descriptive historical average.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">LMS Box-Cox Z-Score Transformation Formula</div>
            <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">{"Z = \\frac{\\left(\\frac{W}{M}\\right)^L - 1}{L \\times S}"}</div>
            <div className="font-sans text-xs text-slate-500 dark:text-slate-400">Where W is infant weight, M is the median weight for age and sex, L is the Box-Cox power skewness parameter, and S is the generalized coefficient of variation. When L = 0, Z = ln(W / M) / S.</div>
          </Formula>

          <h2>WHO Infant Weight Reference Ranges (0 to 24 Months)</h2>
          <p>
            The table below provides sex-specific median (50th percentile) and normal reference bounds (3rd to 97th percentiles, corresponding to $\pm 1.88$ standard deviations) across major developmental milestones:
          </p>

          <DataTable
            head={["Age", "Boys Median (50th)", "Boys Normal Range (3rd–97th)", "Girls Median (50th)", "Girls Normal Range (3rd–97th)", "Typical Daily Gain Rate"]}
            rows={[
              ["Birth (0 mo)", "3.3 kg (7.3 lbs)", "2.5 – 4.4 kg (5.5 – 9.7 lbs)", "3.2 kg (7.1 lbs)", "2.4 – 4.2 kg (5.3 – 9.3 lbs)", "Physiological drop 5–10%"],
              ["1 Month", "4.5 kg (9.9 lbs)", "3.4 – 5.8 kg (7.5 – 12.8 lbs)", "4.2 kg (9.3 lbs)", "3.2 – 5.5 kg (7.1 – 12.1 lbs)", "25 to 30 g / day"],
              ["2 Months", "5.6 kg (12.3 lbs)", "4.3 – 7.1 kg (9.5 – 15.7 lbs)", "5.1 kg (11.2 lbs)", "3.9 – 6.6 kg (8.6 – 14.6 lbs)", "25 to 30 g / day"],
              ["4 Months", "7.0 kg (15.4 lbs)", "5.6 – 8.7 kg (12.3 – 19.2 lbs)", "6.4 kg (14.1 lbs)", "5.0 – 8.2 kg (11.0 – 18.1 lbs)", "20 to 25 g / day"],
              ["6 Months", "7.9 kg (17.4 lbs)", "6.4 – 9.8 kg (14.1 – 21.6 lbs)", "7.3 kg (16.1 lbs)", "5.7 – 9.3 kg (12.6 – 20.5 lbs)", "15 to 20 g / day"],
              ["9 Months", "8.9 kg (19.6 lbs)", "7.1 – 11.0 kg (15.7 – 24.3 lbs)", "8.2 kg (18.1 lbs)", "6.5 – 10.5 kg (14.3 – 23.1 lbs)", "12 to 15 g / day"],
              ["12 Months (1 yr)", "9.6 kg (21.2 lbs)", "7.7 – 12.0 kg (17.0 – 26.5 lbs)", "8.9 kg (19.6 lbs)", "7.0 – 11.5 kg (15.4 – 25.4 lbs)", "10 to 12 g / day"],
              ["18 Months", "10.9 kg (24.0 lbs)", "8.8 – 13.7 kg (19.4 – 30.2 lbs)", "10.2 kg (22.5 lbs)", "8.1 – 13.2 kg (17.9 – 29.1 lbs)", "8 to 10 g / day"],
              ["24 Months (2 yr)", "12.2 kg (26.9 lbs)", "9.7 – 15.3 kg (21.4 – 33.7 lbs)", "11.5 kg (25.4 lbs)", "9.0 – 14.8 kg (19.8 – 32.6 lbs)", "7 to 8 g / day"],
            ]}
            highlight={4}
          />

          {/* Interactive Visual Editorial Chart */}
          <div className="not-prose my-8">
            <WhoInfantGrowthPercentilesChart />
          </div>

          <h2>Interpreting Percentiles: Trajectory vs. Absolute Values</h2>
          <p>
            A common misconception among parents is assuming that a higher percentile is superior to a lower percentile. A baby thriving at the 15th percentile whose head circumference, length, and cognitive motor milestones progress steadily is just as healthy as a baby tracking at the 85th percentile.
          </p>

          <h3>Normal Growth Trajectory (Consistent Tracking)</h3>
          <p>
            Healthy infants generally maintain their personal growth channel over time (e.g., following between the 25th and 50th percentile lines). Minor transient fluctuations of 5 to 10 percentile points are common following mild viral illnesses, teething, or brief nursing strikes.
          </p>

          <h3>Percentile Channel Crossing (When to Consult a Pediatrician)</h3>
          <p>
            Clinical attention is indicated when an infant&apos;s measurements cross two or more major percentile channels (for example, falling from the 50th percentile to below the 10th percentile). Pediatricians evaluate for:
          </p>
          <ul>
            <li><strong>Nutritional Intake Insufficiency:</strong> Ineffective latch, low maternal milk production, improper formula dilution, or feeding aversion.</li>
            <li><strong>Increased Caloric Expenditure:</strong> Congenital heart defects, hypermetabolism, or chronic respiratory distress.</li>
            <li><strong>Gastrointestinal Malabsorption:</strong> Celiac disease, cow&apos;s milk protein allergy (CMPA), or gastroesophageal reflux disease (GERD).</li>
          </ul>

          <h2>Prematurity and the Concept of Corrected Age</h2>
          <p>
            When evaluating the physical growth of infants born prematurely (before 37 weeks gestation), calculating percentiles against chronological age produces an artificial appearance of severe growth delay. For instance, an infant born 8 weeks early who is 16 weeks old chronologically has a <strong>corrected age of 8 weeks</strong> ($16 - 8 = 8$).
          </p>
          <p>
            Pediatric guidelines dictate that growth parameters must be plotted using corrected age until <strong>24 to 36 months of age</strong>, allowing adequate biological time for neurodevelopmental and physical catch-up growth.
          </p>

          <h2>Healthy Weight Gain Strategies for Nursing and Formula-Fed Infants</h2>
          <ul>
            <li><strong>Ensure Nutritive Swallowing:</strong> Verify deep, wide-latch nursing where rhythmic jaw pauses indicate active milk transfer rather than non-nutritive pacifying.</li>
            <li><strong>Do Not Dilute Formula:</strong> Always follow exact water-to-powder ratios; adding excess water dilutes vital electrolytes and calories, which can lead to life-threatening water intoxication and hyponatremia.</li>
            <li><strong>Introduce Calorie-Dense Solid Foods:</strong> Once cleared for solids at 6 months, incorporate healthy fats such as full-fat yogurt, avocado, olive oil drizzles, and nut butters (thinned safely) alongside iron-fortified cereals.</li>
          </ul>
        </>
      }
    >
      <BabyWeightPercentileCalculator />
    </CalcPage>
  );
}
