import BabyWeightCalculator from "@/components/calcs/health/baby-weight-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { WhoInfantGrowthPercentilesChart } from "@/components/flagship/health/editorial-charts/WhoInfantGrowthPercentilesChart";

const PATH = "/calculators/health/baby-weight-calculator";
const TITLE = "Baby Weight Percentile Calculator – WHO Growth Standards | CalcDigi";
const DESCRIPTION =
  "Calculate your infant's exact weight-for-age percentile and Z-score using World Health Organization (WHO) Multicentre Growth Reference Study standards from 0 to 24 months.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const WHO_WEIGHT_NORMS_BOYS = [
  { age: "Birth (0 mo)", p3: "2.5 kg (5.5 lbs)", p15: "2.9 kg (6.4 lbs)", p50: "3.3 kg (7.3 lbs)", p85: "3.9 kg (8.6 lbs)", p97: "4.4 kg (9.7 lbs)" },
  { age: "1 Month", p3: "3.4 kg (7.5 lbs)", p15: "3.9 kg (8.6 lbs)", p50: "4.5 kg (9.9 lbs)", p85: "5.1 kg (11.2 lbs)", p97: "5.8 kg (12.8 lbs)" },
  { age: "2 Months", p3: "4.3 kg (9.5 lbs)", p15: "4.9 kg (10.8 lbs)", p50: "5.6 kg (12.3 lbs)", p85: "6.3 kg (13.9 lbs)", p97: "7.1 kg (15.7 lbs)" },
  { age: "3 Months", p3: "5.0 kg (11.0 lbs)", p15: "5.7 kg (12.6 lbs)", p50: "6.4 kg (14.1 lbs)", p85: "7.2 kg (15.9 lbs)", p97: "8.0 kg (17.6 lbs)" },
  { age: "4 Months", p3: "5.6 kg (12.3 lbs)", p15: "6.2 kg (13.7 lbs)", p50: "7.0 kg (15.4 lbs)", p85: "7.8 kg (17.2 lbs)", p97: "8.7 kg (19.2 lbs)" },
  { age: "6 Months", p3: "6.4 kg (14.1 lbs)", p15: "7.1 kg (15.7 lbs)", p50: "7.9 kg (17.4 lbs)", p85: "8.8 kg (19.4 lbs)", p97: "9.8 kg (21.6 lbs)" },
  { age: "9 Months", p3: "7.1 kg (15.7 lbs)", p15: "8.0 kg (17.6 lbs)", p50: "8.9 kg (19.6 lbs)", p85: "9.9 kg (21.8 lbs)", p97: "11.0 kg (24.3 lbs)" },
  { age: "12 Months (1 yr)", p3: "7.7 kg (17.0 lbs)", p15: "8.6 kg (19.0 lbs)", p50: "9.6 kg (21.2 lbs)", p85: "10.8 kg (23.8 lbs)", p97: "12.0 kg (26.5 lbs)" },
  { age: "18 Months", p3: "8.8 kg (19.4 lbs)", p15: "9.8 kg (21.6 lbs)", p50: "10.9 kg (24.0 lbs)", p85: "12.2 kg (26.9 lbs)", p97: "13.7 kg (30.2 lbs)" },
  { age: "24 Months (2 yr)", p3: "9.7 kg (21.4 lbs)", p15: "10.8 kg (23.8 lbs)", p50: "12.2 kg (26.9 lbs)", p85: "13.6 kg (30.0 lbs)", p97: "15.3 kg (33.7 lbs)" },
];

const WHO_WEIGHT_NORMS_GIRLS = [
  { age: "Birth (0 mo)", p3: "2.4 kg (5.3 lbs)", p15: "2.8 kg (6.2 lbs)", p50: "3.2 kg (7.1 lbs)", p85: "3.7 kg (8.2 lbs)", p97: "4.2 kg (9.3 lbs)" },
  { age: "1 Month", p3: "3.2 kg (7.1 lbs)", p15: "3.6 kg (7.9 lbs)", p50: "4.2 kg (9.3 lbs)", p85: "4.8 kg (10.6 lbs)", p97: "5.5 kg (12.1 lbs)" },
  { age: "2 Months", p3: "3.9 kg (8.6 lbs)", p15: "4.5 kg (9.9 lbs)", p50: "5.1 kg (11.2 lbs)", p85: "5.8 kg (12.8 lbs)", p97: "6.6 kg (14.6 lbs)" },
  { age: "3 Months", p3: "4.5 kg (9.9 lbs)", p15: "5.2 kg (11.5 lbs)", p50: "5.8 kg (12.8 lbs)", p85: "6.6 kg (14.6 lbs)", p97: "7.5 kg (16.5 lbs)" },
  { age: "4 Months", p3: "5.0 kg (11.0 lbs)", p15: "5.7 kg (12.6 lbs)", p50: "6.4 kg (14.1 lbs)", p85: "7.3 kg (16.1 lbs)", p97: "8.2 kg (18.1 lbs)" },
  { age: "6 Months", p3: "5.7 kg (12.6 lbs)", p15: "6.5 kg (14.3 lbs)", p50: "7.3 kg (16.1 lbs)", p85: "8.2 kg (18.1 lbs)", p97: "9.3 kg (20.5 lbs)" },
  { age: "9 Months", p3: "6.5 kg (14.3 lbs)", p15: "7.3 kg (16.1 lbs)", p50: "8.2 kg (18.1 lbs)", p85: "9.3 kg (20.5 lbs)", p97: "10.5 kg (23.1 lbs)" },
  { age: "12 Months (1 yr)", p3: "7.0 kg (15.4 lbs)", p15: "7.9 kg (17.4 lbs)", p50: "8.9 kg (19.6 lbs)", p85: "10.1 kg (22.3 lbs)", p97: "11.5 kg (25.4 lbs)" },
  { age: "18 Months", p3: "8.1 kg (17.9 lbs)", p15: "9.1 kg (20.1 lbs)", p50: "10.2 kg (22.5 lbs)", p85: "11.6 kg (25.6 lbs)", p97: "13.2 kg (29.1 lbs)" },
  { age: "24 Months (2 yr)", p3: "9.0 kg (19.8 lbs)", p15: "10.2 kg (22.5 lbs)", p50: "11.5 kg (25.4 lbs)", p85: "13.0 kg (28.7 lbs)", p97: "14.8 kg (32.6 lbs)" },
];

export default function BabyWeightPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Baby Weight Percentile Calculator"
      intro="Assess your infant's physical development against the World Health Organization (WHO) Child Growth Standards (0 to 24 months). Calculate exact centiles, Z-scores, and longitudinal growth velocity."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="Z = \frac{(W / M)^L - 1}{L \cdot S} \quad (L \neq 0)"
      related={[
        { href: "/calculators/health/child-height-predictor", icon: "📏", name: "Child Height Predictor" },
        { href: "/calculators/health/pregnancy-due-date-calculator", icon: "👶", name: "Due Date Calculator" },
        { href: "/calculators/health/ideal-weight-calculator", icon: "🎯", name: "Ideal Weight Calculator" },
        { href: "/calculators/health/bmi-calculator", icon: "⚖️", name: "BMI Calculator" },
      ]}
      faq={[
        {
          q: "What is considered a normal baby weight percentile?",
          a: "Any percentile between the 3rd and 97th is considered within normal statistical limits by the World Health Organization. The critical factor is not having a high percentile, but demonstrating steady, proportional growth along your child's established percentile channel over time.",
        },
        {
          q: "Why does the WHO curve differ from the CDC 2000 growth chart?",
          a: "The WHO standards are based on exclusively or predominantly breastfed infants raised in optimal socioeconomic conditions, establishing how children *should* grow biologically. The 2000 CDC charts reflect how US children grew historically (many of whom were formula-fed). Breastfed babies gain weight faster in the first 2-3 months and more slowly from 4-12 months compared to formula-fed infants.",
        },
        {
          q: "Should I be concerned if my baby's percentile drops from the 60th to the 40th?",
          a: "Minor centile oscillations of 10-15% are common and frequently reflect growth spurts, transient illnesses, teething, or changes in motor activity like starting to crawl. Clinical concern arises when an infant crosses two major centile lines (e.g., from 75th down to 25th) or drops below the 3rd percentile.",
        },
        {
          q: "How much weight should a newborn baby gain each week?",
          a: "After regaining initial birth weight by day 10-14, healthy newborns typically gain 5 to 7 ounces (150 to 200 grams) weekly during the first 3 months. Between months 3 and 6, typical weight gain slows to 3.5 to 5 ounces (100 to 140 grams) per week.",
        },
        {
          q: "Can formula-fed babies use this WHO percentile calculator?",
          a: "Yes. The American Academy of Pediatrics (AAP) and the CDC recommend using WHO growth charts for all infants from birth through 24 months, regardless of whether they are breastfed, formula-fed, or combination-fed, because the WHO chart represents the global biological gold standard for optimal human growth.",
        },
      ]}
      article={
        <>

        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Pediatric Review &amp; Methodology:</span> Calibrated to World Health Organization (WHO) Child Growth Standards (Multicentre Growth Reference Study) and AAP clinical guidelines for ages 0–24 months.
          </div>
          <div className="text-slate-500 break-words leading-relaxed">Updated: Q4 2026 • Verified Pediatric Standards</div>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Why the WHO Child Growth Standards are the Global Clinical Gold Standard
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In pediatric medicine, evaluating infant somatic development requires an objective benchmark.
            Historically, clinicians relied on legacy charts (such as the 1977 NCHS curves or 2000 CDC growth charts)
            which were largely derived from formula-fed Caucasian infants in small geographic cohorts. In 2006, the
            World Health Organization published the landmark <strong>Multicentre Growth Reference Study (MGRS)</strong>,
            spanning 8,440 healthy breastfed children across six diverse nations (Brazil, Ghana, India, Norway, Oman,
            and the United States).
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The MGRS established a transformative biological principle: <em>infants across all global ethnicities
            grow at remarkably identical physiological rates when raised in healthy environments and nourished according
            to standard biological norms (predominantly exclusive breastfeeding for the first 6 months)</em>. Consequently,
            both the <strong>American Academy of Pediatrics (AAP)</strong> and the <strong>Centers for Disease Control
            and Prevention (CDC)</strong> formally mandate the use of WHO growth charts for all children from birth to 24 months
            of age, switching to CDC growth charts only after age 2.
          </p>
        </section>

        {/* Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive WHO Infant Growth Trajectory &amp; Centiles
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              Interactive Model
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Examine how median infant weight and normal dispersion channels (3rd, 50th, and 97th percentiles) evolve across the first 24 months of life for boys and girls. Scrub along the age axis to view clinical milestones:
          </p>
          <WhoInfantGrowthPercentilesChart />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Understanding Z-Scores, Centiles, and the LMS Method
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Infant weight data does not follow a symmetrical Gaussian bell curve; high birth weight and accelerated infant
            adiposity create a right-skewed tail. To calculate exact percentiles without statistical distortion, the WHO
            employs the <strong>LMS technique</strong> developed by British statistician Tim Cole.
          </p>
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 my-4 text-center">
            <Formula>{"Z = \\frac{(W / M)^L - 1}{L \\cdot S} \\quad (L \\neq 0)"}</Formula>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">L (Box-Cox Exponent)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Normalizes asymmetrical skewness in human infant weight curves, preventing statistical overestimation of extreme percentiles.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">M (Median Centile)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                The exact 50th percentile weight parameter for healthy children at a specific day or month of postnatal age.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">S (Variation Coeff.)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Defines the standard dispersion relative to the median, enabling exact conversion between raw kilograms and Standard Deviation Scores (Z).
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Reference Data: WHO Weight Percentiles for Boys (0–24 Months)
          </h2>
          <DataTable
            head={["Age", "3rd Percentile", "15th Percentile", "50th Median", "85th Percentile", "97th Percentile"]}
            rows={WHO_WEIGHT_NORMS_BOYS.map((r) => [
              <strong key={r.age} className="text-slate-900 dark:text-white">{r.age}</strong>,
              r.p3,
              r.p15,
              <strong key={`${r.age}-p50`} className="text-emerald-600 dark:text-emerald-400">{r.p50}</strong>,
              r.p85,
              r.p97,
            ])}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Reference Data: WHO Weight Percentiles for Girls (0–24 Months)
          </h2>
          <DataTable
            head={["Age", "3rd Percentile", "15th Percentile", "50th Median", "85th Percentile", "97th Percentile"]}
            rows={WHO_WEIGHT_NORMS_GIRLS.map((r) => [
              <strong key={r.age} className="text-slate-900 dark:text-white">{r.age}</strong>,
              r.p3,
              r.p15,
              <strong key={`${r.age}-p50`} className="text-rose-600 dark:text-rose-400">{r.p50}</strong>,
              r.p85,
              r.p97,
            ])}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Clinical Assessment: Growth Trajectory vs. Isolated Snapshot
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Pediatricians evaluate growth curves holistically rather than fixating on a solitary percentile figure. An infant
            consistently tracking along the 10th percentile whose parents are of slender build is showing normal genetic potential.
            Conversely, warning signs of <strong>Growth Faltering (Failure to Thrive)</strong> include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li><strong>Centile Crossing:</strong> A downward crossing of two or more major percentile curves (e.g., plummeting from the 75th to the 25th percentile).</li>
            <li><strong>Weight-for-Length Disproportion:</strong> A drop in weight-for-length percentile below the 3rd centile while length remains at the median.</li>
            <li><strong>Flatline Growth:</strong> Zero weight gain over a span of two consecutive months in infants under 6 months old.</li>
            <li><strong>Hydration Red Flags:</strong> Fewer than 6 wet diapers per 24 hours, sunken fontanelle, lethargy, or poor suckling vigor.</li>
          </ul>
        </section>
      
        
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            WHO Child Growth Velocity &amp; Catch-Up Trajectories
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Pediatricians evaluate infant growth velocity across serial clinical well-child visits rather than relying on a single static measurement. Healthy infants typically regain birth weight within 10 to 14 days of delivery, double their birth weight by 4 to 6 months, and triple birth weight by their first birthday.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Cross-percentile shifts exceeding two major quartile channels warrant close nutritional evaluation of maternal lactation volumes, formula reconstitution precision, and pediatric gastrointestinal absorption efficiency.
          </p>
        </section>

        {/* Related Companion Tools Contextual Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Clinical &amp; Metabolic Companion Tools</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Infant biometric monitoring works in tandem with family genetics and developmental tracking. Project future adult height percentiles with our <a href="/calculators/health/child-height-predictor">Child Height Predictor</a>, cross-check gestational milestones with the <a href="/calculators/health/pregnancy-due-date-calculator">Pregnancy Due Date Calculator</a>, or assess maternal baseline targets with the <a href="/calculators/health/ideal-weight-calculator">Ideal Weight Calculator</a>.
          </p>
        </section>
              </>
      }
    >
      <BabyWeightCalculator />
    </CalcPage>
  );
}
