import type { Metadata } from "next";
import { Suspense } from "react";
import BabyFeedingCalculator from "@/components/calcs/baby/baby-feeding-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { InfantFeedingVolumeTimelineChart } from "@/components/flagship/baby/editorial-charts";

const PATH = "/calculators/baby/baby-feeding-calculator";
const TITLE = "Baby Feeding Calculator – Daily Formula & Breast Milk Ounces | CalcDigi";
const DESCRIPTION =
  "Calculate daily formula and breast milk volume by baby weight and age using the American Academy of Pediatrics (AAP) 2.5 oz/lb clinical rule. Features single-bottle sizing, feed frequency schedules, and solid food guidance.";

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
  { href: "/calculators/baby/due-date-calculator", icon: "📅", name: "Pregnancy Due Date Calculator" },
  { href: "/calculators/baby/baby-weight-percentile-calculator", icon: "⚖️", name: "Baby Weight Percentile Calculator" },
  { href: "/calculators/baby/baby-sleep-calculator", icon: "🌙", name: "Baby Sleep & Wake Windows" },
  { href: "/calculators/baby/diaper-cost-calculator", icon: "🧷", name: "Diaper Lifetime Cost Calculator" },
  { href: "/calculators/baby/childcare-cost-calculator", icon: "🧸", name: "Childcare & Daycare Cost Calculator" },
  { href: "/calculators/health/calorie-burn-calculator", icon: "🔥", name: "Calorie Burn Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "How much formula or expressed breast milk does a baby need daily?",
    a: "The American Academy of Pediatrics (AAP) standard clinical guideline recommends 2.5 ounces (approx. 74 ml) of formula or breast milk per pound of infant body weight per day (equivalent to 150 to 160 ml per kilogram). For example, a 10-pound baby typically needs around 25 ounces daily, divided across 6 to 8 feedings depending on their age.",
  },
  {
    q: "Can an infant drink too much formula or breast milk?",
    a: "While breastfed infants self-regulate intake at the breast, bottle-fed infants can be inadvertently overfed due to rapid flow nipples or pressure to finish bottles. Most pediatricians recommend a maximum ceiling of 32 ounces (960 ml) of formula in 24 hours. If an infant demands more than 32 ounces, consult your pediatrician, as it may signal a growth spurt or readiness for complementary solid foods.",
  },
  {
    q: "How do I know my newborn is getting enough milk?",
    a: "Objective clinical signs of adequate hydration and caloric intake include: 6 or more wet diapers with pale urine per 24 hours after day 5; steady weight gain of 20 to 30 grams daily after the initial postpartum weight drop; alert and content behavior between feeds; and audible swallowing during feeding.",
  },
  {
    q: "What causes cluster feeding and how should parents handle it?",
    a: "Cluster feeding occurs when an infant demands feeds every 30 to 60 minutes over a concentrated few hours (frequently during evening witching hours). This normal developmental behavior stimulates maternal prolactin production, increases breast milk supply, and coincides with rapid brain and physical growth spurts at 2 to 3 weeks, 6 weeks, and 3 months.",
  },
  {
    q: "When and how should complementary solid foods be introduced?",
    a: "Both the AAP and World Health Organization (WHO) recommend starting solid foods around 6 months of age when the infant demonstrates developmental readiness: sitting with minimal support, holding the head steady, and losing the tongue-thrust reflex. Breast milk or infant formula remains the primary caloric foundation through 12 months.",
  },
  {
    q: "How long can prepared infant formula safely stay at room temperature?",
    a: "According to the CDC, freshly prepared powdered formula is safe at room temperature for up to 2 hours. If the baby's mouth touches the bottle nipple, bacteria from infant saliva enter the milk; the unfinished bottle must be discarded within 1 hour. Unused bottles stored in the refrigerator must be consumed within 24 hours.",
  },
];

export default function BabyFeedingPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/calculators/baby", label: "Baby & Parenting" }}
      title="Baby Feeding Calculator"
      intro="Determine optimal daily milk volume and per-feed bottle sizes tailored to your infant's weight and developmental age. Built upon AAP pediatric nutritional guidelines and anatomical stomach capacity progression."
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
                Reviewed against <strong className="font-semibold text-slate-800 dark:text-slate-200">AAP Pediatric Nutrition Standards &amp; CDC Infant Guidelines</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Pediatric Nutrition Reference</span>
              <span>•</span>
              <time dateTime="2026-10-24">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Clinical Summary: AAP Rule of Thumb for Infant Feeding
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              According to the <strong>American Academy of Pediatrics (AAP)</strong>, a healthy infant requires approximately <strong>2.5 ounces (74 ml)</strong> of formula or breast milk for every <strong>pound of body weight</strong> per 24 hours (roughly 150 to 160 ml/kg/day). Because infant gastric volume is minute during early life, this daily volume must be apportioned across 8 to 12 small feeds for newborns, gradually consolidating to 4 to 6 larger feeds as stomach capacity expands. Verify your baby&apos;s growth trajectory on our <a href="/calculators/baby/baby-weight-percentile-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">baby weight percentile calculator</a> to ensure weight gain tracks along their personal clinical curve.
            </p>
          </div>

          <h2>Pediatric Caloric Requirements &amp; Daily Milk Volume Trajectory</h2>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <InfantFeedingVolumeTimelineChart />
          </div>

          <p>
            During the first year of life, human infants experience the most intense metabolic growth rate of their lifespan, tripling their birth weight and expanding their brain volume by over 100%. Standard human breast milk and commercial infant formulas provide approximately <strong>20 kilocalories per fluid ounce</strong> (0.67 kcal/ml), which can be analyzed using our <a href="/calculators/health/calorie-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">calorie calculator</a>. To satisfy a baseline energy requirement of 100 to 110 kcal per kilogram per day, an infant must consume between 2.2 and 2.7 ounces per pound of body weight.
          </p>
          <p>
            For premature infants born earlier than their clinical <a href="/calculators/baby/due-date-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">due date</a>, pediatricians calculate nutritional milestones using corrected age determined via our <a href="/calculators/datetime/age-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">age calculator</a>. The universally recognized pediatric benchmark simplifies this daily volume calculation into the 2.5 oz/lb formula:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">AAP Weight-Based Daily Feeding Volume Formula</div>
            <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">{"\\text{Daily Volume (oz)} = \\text{Infant Weight (lbs)} \\times 2.5\\text{ oz/lb}"}</div>
            <div className="font-sans text-xs text-slate-500 dark:text-slate-400">Yields total 24-hour target fluid volume in ounces. Divide by daily feeding frequency (e.g., 8 feeds) to calculate individual bottle portions.</div>
          </Formula>

          <h2>Infant Stomach Capacity and Anatomical Progression</h2>
          <p>
            One of the most frequent sources of parental anxiety is worrying that a newborn is not drinking enough milk. In reality, the physiological capacity of a newborn stomach is astonishingly small at birth. Elasticity expands gradually over the first month to accommodate larger milk volumes without inducing gastroesophageal reflux. When preparing powder formula, ensure precise water-to-scoop ratios using our <a href="/calculators/math/ratio-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">ratio calculator</a> to prevent hypernatremic dehydration.
          </p>

          <DataTable
            head={["Age Milestone", "Anatomical Size Analogy", "Gastric Capacity (ml)", "Gastric Capacity (oz)", "Recommended Feed Frequency"]}
            rows={[
              ["Day 1 (Birth)", "Cherry", "5 to 7 ml", "0.15 to 0.25 oz", "Every 1.5 to 2.5 hours (colostrum on demand)"],
              ["Day 3", "Walnut", "22 to 27 ml", "0.75 to 1.0 oz", "Every 2 to 3 hours (8 to 12 feeds / 24 hrs)"],
              ["Day 7 (1 Week)", "Apricot", "45 to 60 ml", "1.5 to 2.0 oz", "Every 2.5 to 3 hours (8 to 10 feeds / 24 hrs)"],
              ["Month 1", "Large Chicken Egg", "80 to 150 ml", "2.5 to 5.0 oz", "Every 3 to 4 hours (7 to 8 feeds / 24 hrs)"],
              ["Months 2 to 3", "Baseball", "150 to 180 ml", "5.0 to 6.0 oz", "Every 3 to 4.5 hours (6 to 7 feeds / 24 hrs)"],
              ["Months 4 to 6", "Softball", "180 to 210 ml", "6.0 to 7.0 oz", "Every 4 hours (5 to 6 feeds / 24 hrs)"],
              ["Months 6 to 12", "Grapefruit", "210 to 240 ml", "7.0 to 8.0 oz", "4 to 5 feeds + 2–3 solid food meals"],
            ]}
            highlight={3}
          />

          <h2>Recognizing Hunger Cues vs. Satiety Signs</h2>
          <p>
            Rigid clock-based feeding schedules are less effective than responsive feeding based on biological hunger cues. Crying is a late indicator of hunger; infants communicate appetite through subtle autonomic cues long before shedding tears. Coordinating daytime feedings with restorative wake intervals tracked on our <a href="/calculators/baby/baby-sleep-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">baby sleep calculator</a> ensures infants feed while alert rather than overtired.
          </p>

          <h3>Early Hunger Indicators</h3>
          <ul>
            <li><strong>Rooting Reflex:</strong> Turning the head toward an object touching the cheek or mouth.</li>
            <li><strong>Hand-to-Mouth Movements:</strong> Sucking on fingers, fists, or shirt collars.</li>
            <li><strong>Active Lip Smacking:</strong> Opening and closing mouth or sticking the tongue out repeatedly.</li>
          </ul>

          <h3>Fullness and Satiety Indicators</h3>
          <ul>
            <li><strong>Relaxed Musculature:</strong> Uncurling clenched fists into open, soft palms.</li>
            <li><strong>Turning Away:</strong> Pushing the bottle nipple or breast away with lips or hands.</li>
            <li><strong>Falling Asleep Contentedly:</strong> Slowing swallow cadence and drifting into calm post-prandial sleep.</li>
          </ul>

          <h2>Paced Bottle Feeding: Preventing Gas and Overfeeding</h2>
          <p>
            When feeding expressed breast milk or formula via bottle, standard vertical feeding allows gravity to flow milk quickly into the mouth, triggering an involuntary swallow reflex that can bypass natural satiety signals. Pediatric feeding specialists universally recommend <strong>paced bottle feeding</strong>:
          </p>
          <ol>
            <li><strong>Hold the Baby Semi-Upright:</strong> Never lay the baby flat on their back, which increases ear infection and choking risks.</li>
            <li><strong>Keep the Bottle Horizontal:</strong> Hold the bottle parallel to the floor so the nipple is only half full of milk, requiring the infant to actively draw milk.</li>
            <li><strong>Incorporate Regular Pauses:</strong> Tilt the bottle downward every 20 to 30 seconds to simulate natural breast pauses, giving the stomach stretch receptors time to signal fullness. Adequate hydration will produce steady wet diaper counts tracked on our <a href="/calculators/baby/diaper-cost-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">diaper cost calculator</a>.</li>
          </ol>

          <h2>Milk Preparation and Storage Safety Standards</h2>
          <p>
            Infant immune systems are immature and susceptible to foodborne pathogens such as <em>Cronobacter sakazakii</em> and <em>Salmonella</em>. Nursing mothers must also ensure adequate daily fluid replenishment via our <a href="/calculators/health/water-intake-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">water intake calculator</a>. Strict adherence to CDC hygiene protocols protects against gastrointestinal infections:
          </p>

          <DataTable
            head={["Milk Type", "Room Temperature (up to 77°F / 25°C)", "Refrigerator (40°F / 4°C)", "Freezer (0°F / -18°C)", "After Infant Sips from Bottle"]}
            rows={[
              ["Freshly Expressed Breast Milk", "Up to 4 hours", "Up to 4 days", "Best within 6 months (up to 12 mo)", "Use within 2 hours"],
              ["Thawed Breast Milk (Previously Frozen)", "1 to 2 hours", "Up to 24 hours (do NOT refreeze)", "Never refreeze thawed milk", "Use within 2 hours"],
              ["Freshly Prepared Infant Formula", "Up to 2 hours", "Up to 24 hours", "Do NOT freeze prepared formula", "Discard within 1 hour"],
              ["Opened Ready-to-Feed Liquid Formula", "Up to 2 hours", "Up to 48 hours", "Do NOT freeze", "Discard within 1 hour"],
            ]}
          />

          <h2>Complementary Foods Introduction (The 6-Month Mark)</h2>
          <p>
            Around 6 months of age, maternal iron stores accumulated during gestation begin depleting. The introduction of complementary foods at this milestone provides critical bioavailable iron and zinc. Single-ingredient iron-fortified baby cereals, pureed meats, mashed avocados, and steamed root vegetables are ideal initial choices. When preparing for daycare enrollment, coordinate your child&apos;s bottle schedule with center staff using our <a href="/calculators/baby/childcare-cost-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">childcare cost calculator</a> and factor recurring monthly formula purchases into your <a href="/calculators/finance/budget-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">family household budget calculator</a>.
          </p>
        </>
      }
    >
      <BabyFeedingCalculator />
    </CalcPage>
  );
}
