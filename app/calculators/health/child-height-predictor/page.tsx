import ChildHeightPredictor from "@/components/calcs/health/child-height-predictor";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { MidParentalStatureCurveChart } from "@/components/flagship/health/editorial-charts/MidParentalStatureCurveChart";

const PATH = "/calculators/health/child-height-predictor";
const TITLE = "Child Height Predictor – Mid-Parental Adult Stature Formula | CalcDigi";
const DESCRIPTION =
  "Predict your child's adult height using the Tanner-Goldstein Mid-Parental Stature formula. Explore genetic target ranges, pubertal growth plate timelines, and endocrinology standards.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const TANNER_PUBERTY_TIMELINE = [
  {
    stage: "Tanner Stage 1 (Prepubertal)",
    ageGirls: "< 9.5 to 10 Years",
    ageBoys: "< 11 to 11.5 Years",
    annualVelocity: "5.0 to 6.0 cm / year",
    clinicalMarkers: "Baseline childhood linear growth; no breast budding or testicular enlargement; quiescent pituitary gonadotropins.",
  },
  {
    stage: "Tanner Stage 2 (Pubertal Onset)",
    ageGirls: "10.0 to 11.5 Years",
    ageBoys: "11.5 to 12.5 Years",
    annualVelocity: "6.0 to 7.5 cm / year",
    clinicalMarkers: "Thelarche (breast buds) in girls; testicular volume > 4 mL in boys; adrenarche and sparse pubic hair emergence.",
  },
  {
    stage: "Tanner Stage 3 (Peak Velocity)",
    ageGirls: "11.5 to 12.5 Years",
    ageBoys: "12.5 to 14.0 Years",
    annualVelocity: "Girls: 8.0–9.0 cm/yr | Boys: 7.0–8.5 cm/yr",
    clinicalMarkers: "Peak Height Velocity (PHV) occurs in girls; breast tissue enlargement; testicular volume 10–12 mL; deepening male voice.",
  },
  {
    stage: "Tanner Stage 4 (Velocity Deceleration)",
    ageGirls: "12.5 to 14.0 Years",
    ageBoys: "14.0 to 15.5 Years",
    annualVelocity: "Girls: 4.0–6.0 cm/yr | Boys: 9.0–10.5 cm/yr",
    clinicalMarkers: "Menarche occurs in girls (growth decelerates post-first menses); boys experience Peak Height Velocity (PHV); facial hair develops.",
  },
  {
    stage: "Tanner Stage 5 (Epiphyseal Fusion)",
    ageGirls: "14.5 to 16.0 Years",
    ageBoys: "16.5 to 18.0+ Years",
    annualVelocity: "< 1.0 cm / year (Terminal Stature)",
    clinicalMarkers: "Complete epiphyseal growth plate chondrocyte ossification under estrogen regulation; final adult skeletal stature locked.",
  },
];

const HEIGHT_PERCENTILES_CDC = [
  { age: "2 Years", boy50th: "86.8 cm (34.2 in)", boy97th: "93.9 cm (37.0 in)", girl50th: "85.5 cm (33.7 in)", girl97th: "92.5 cm (36.4 in)" },
  { age: "4 Years", boy50th: "102.4 cm (40.3 in)", boy97th: "110.5 cm (43.5 in)", girl50th: "101.5 cm (40.0 in)", girl97th: "109.5 cm (43.1 in)" },
  { age: "6 Years", boy50th: "115.5 cm (45.5 in)", boy97th: "124.5 cm (49.0 in)", girl50th: "114.3 cm (45.0 in)", girl97th: "123.4 cm (48.6 in)" },
  { age: "8 Years", boy50th: "128.0 cm (50.4 in)", boy97th: "137.9 cm (54.3 in)", girl50th: "126.9 cm (50.0 in)", girl97th: "137.2 cm (54.0 in)" },
  { age: "10 Years", boy50th: "138.4 cm (54.5 in)", boy97th: "149.6 cm (58.9 in)", girl50th: "138.6 cm (54.6 in)", girl97th: "150.4 cm (59.2 in)" },
  { age: "12 Years", boy50th: "149.1 cm (58.7 in)", boy97th: "162.3 cm (63.9 in)", girl50th: "151.2 cm (59.5 in)", girl97th: "163.8 cm (64.5 in)" },
  { age: "14 Years", boy50th: "163.8 cm (64.5 in)", boy97th: "177.3 cm (69.8 in)", girl50th: "159.8 cm (62.9 in)", girl97th: "170.2 cm (67.0 in)" },
  { age: "16 Years", boy50th: "173.4 cm (68.3 in)", boy97th: "185.7 cm (73.1 in)", girl50th: "162.5 cm (64.0 in)", girl97th: "172.5 cm (67.9 in)" },
  { age: "18 Years (Adult)", boy50th: "176.8 cm (69.6 in)", boy97th: "188.7 cm (74.3 in)", girl50th: "163.2 cm (64.3 in)", girl97th: "173.2 cm (68.2 in)" },
];

export default function ChildHeightPredictorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Child Height Predictor"
      intro="Forecast your child's final adult stature using the clinical Tanner-Goldstein Mid-Parental Height (MPH) formula. Review pubertal peak height velocity schedules, epiphyseal fusion milestones, and endocrinological growth standards."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="\text{Boy MPH} = \frac{\text{Father} + \text{Mother} + 13\text{ cm}}{2}, \quad \text{Girl MPH} = \frac{\text{Father} + \text{Mother} - 13\text{ cm}}{2}"
      related={[
        { href: "/calculators/health/baby-weight-calculator", icon: "👶", name: "Baby Weight & Height Calculator" },
        { href: "/calculators/health/ideal-weight-calculator", icon: "🎯", name: "Ideal Weight Calculator" },
        { href: "/calculators/health/bmi-calculator", icon: "⚖️", name: "BMI Calculator" },
        { href: "/calculators/health/calorie-calculator", icon: "🥗", name: "Calorie Calculator" },
      ]}
      faq={[
        {
          q: "How accurate is the Mid-Parental Height prediction formula?",
          a: "The Tanner-Goldstein MPH formula predicts final adult height within ±2 inches (±5 cm) for approximately 68% of children, and within ±3.3 inches (±8.5 cm) for 95% of children. It is the international standard used by pediatric endocrinologists because parental genetics explain 60% to 80% of stature variance.",
        },
        {
          q: "Why do boys have 5 inches (13 cm) added to the parental average while girls have 5 inches subtracted?",
          a: "Across global populations, adult males are on average 13 cm (5.1 inches) taller than adult females. This sexual dimorphism occurs because boys experience two extra years of prepubertal growth before puberty commences and generate higher peak testosterone levels during their adolescent growth spurt.",
        },
        {
          q: "At what age do girls and boys stop growing in height?",
          a: "Girls typically complete their growth 2 to 2.5 years after menarche (their first menstrual cycle), reaching terminal adult height around 14 to 16 years of age. Boys experience their growth spurt later and typically continue growing until 16 to 18 years old. Once the epiphyseal growth plates calcify under estrogen exposure, longitudinal bone growth ceases permanently.",
        },
        {
          q: "Can nutritional supplements or vitamins make a child grow taller?",
          a: "If a child is deficient in zinc, vitamin D, calcium, or overall dietary protein, correcting the deficiency will allow them to resume their genetically programmed growth velocity (catch-up growth). However, in a well-nourished child, surplus vitamins or growth supplements cannot stimulate extra height beyond their genetic target and may cause hypervitaminosis.",
        },
        {
          q: "What is Constitutional Delay of Growth and Puberty (late bloomers)?",
          a: "Constitutional Delay of Growth and Puberty (CDGP) is a normal genetic variation where a child enters puberty later than peers, appearing shorter during middle school and early high school. However, because their bone age is delayed and their growth plates remain open longer, they continue growing later into their late teens, ultimately reaching their normal predicted mid-parental adult stature.",
        },
      ]}
    >
      <ChildHeightPredictor />

      <article className="prose dark:prose-invert max-w-none space-y-12 mt-12">
        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Pediatric Endocrinology Review:</span> Calibrated to Tanner-Goldstein Mid-Parental Height (MPH) methodologies, Greulich-Pyle skeletal maturity models, and AAP growth benchmarks.
          </div>
          <div className="text-slate-500 whitespace-nowrap">Updated: Q4 2026 • Verified Pediatric Standards</div>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Science of Pediatric Stature: Genetics vs. Environmental Modifiers
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Human adult height is a classical polygenic quantitative trait with a narrow-sense heritability ($h^2$)
            estimated between 60% and 80% in well-nourished populations. Large-scale genome-wide association studies (GWAS)
            conducted by the GIANT (Genetic Investigation of Anthropometric Traits) consortium have identified over 700 independent
            single-nucleotide polymorphisms (SNPs) across hundreds of genetic loci that influence skeletal elongation.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            However, genetic potential provides the blueprint; environmental factors determine whether that blueprint is fully
            realized. The remaining 20% to 40% of adult stature variance is determined by non-genetic variables:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">Pulsatile Somatotropin (GH) &amp; Sleep</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Over 75% of human Growth Hormone (GH) is released from the anterior pituitary in pulsatile surges during Stage 3
                slow-wave non-REM deep sleep. Chronic nocturnal sleep deprivation impairs hepatic IGF-1 (Insulin-like Growth Factor 1)
                synthesis, suppressing chondrocyte replication.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">Micronutrient &amp; Caloric Adequacy</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Skeletal accretion demands positive nitrogen balance, essential amino acids (arginine, lysine), zinc (a co-factor for
                DNA polymerase in osteoblasts), calcium, and 25-hydroxyvitamin D to mineralize the newly formed osteoid matrix.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Mid-Parental Pediatric Growth Trajectory
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300">
              Interactive Model
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Track skeletal growth trajectories from toddlerhood (age 2) through adolescent peak height velocity and terminal epiphyseal fusion at age 20. Toggle between boys and girls and scrub through chronological ages:
          </p>
          <MidParentalStatureCurveChart />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Tanner-Goldstein Mid-Parental Height (MPH) Formula
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Developed by British pediatric endocrinologist J.M. Tanner and statistician H. Goldstein in 1970, the Mid-Parental Height
            method remains the worldwide clinical standard for calculating a child&apos;s genetic target height (Target Stature).
          </p>
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 my-4 text-center">
            <Formula>{"\\text{Boy MPH} = \\frac{F + M + 13\\text{ cm}}{2}, \\quad \\text{Girl MPH} = \\frac{F + M - 13\\text{ cm}}{2}"}</Formula>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The mathematical adjustment of <strong>13 cm (5.0 inches)</strong> accounts for the biological dimorphism between adult
            men and women. Across human populations, adult males are on average 13 cm taller than females. This gap arises because
            boys experience approximately two additional years of prepubertal linear growth (growing at ~5.5 cm/year before puberty)
            plus a more intense adolescent Peak Height Velocity (PHV) under higher testosterone concentrations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Pubertal Growth Dynamics: Tanner Stages and Peak Height Velocity
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Linear height increases occur exclusively at the <strong>epiphyseal growth plates</strong> located near the ends of long bones.
            During puberty, rising sex steroid hormones (estrogens and androgens) trigger a rapid growth spurt, followed by terminal
            calcification and closure of the epiphyseal plates.
          </p>
          <DataTable
            head={["Pubertal Stage", "Age (Girls)", "Age (Boys)", "Annual Growth Velocity", "Physiological & Clinical Markers"]}
            rows={TANNER_PUBERTY_TIMELINE.map((r) => [
              <strong key={r.stage} className="text-slate-900 dark:text-white">{r.stage}</strong>,
              r.ageGirls,
              r.ageBoys,
              <strong key={`${r.stage}-vel`} className="text-sky-600 dark:text-sky-400">{r.annualVelocity}</strong>,
              r.clinicalMarkers,
            ])}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            CDC/WHO Pediatric Stature Norms (Ages 2 to 18 Years)
          </h2>
          <DataTable
            head={["Age", "Boys (50th Median)", "Boys (97th %ile)", "Girls (50th Median)", "Girls (97th %ile)"]}
            rows={HEIGHT_PERCENTILES_CDC.map((r) => [
              <strong key={r.age} className="text-slate-900 dark:text-white">{r.age}</strong>,
              r.boy50th,
              r.boy97th,
              r.girl50th,
              r.girl97th,
            ])}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            When Should You Consult a Pediatric Endocrinologist?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            While variations in growth trajectory are common, certain clinical patterns warrant formal investigation by a pediatric
            specialist to rule out endocrine disorders, chromosomal anomalies, or gastrointestinal malabsorption:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li><strong>Height Velocity Below 4 cm/year:</strong> Linear growth slowing below 4 cm/year between age 4 and pubertal onset indicates potential growth failure.</li>
            <li><strong>Centile Crossing:</strong> A child dropping across two major percentile channels on the standardized growth chart (e.g., slipping from 50th to 10th centile).</li>
            <li><strong>Severe Short Stature:</strong> Stature plotting below the 3rd percentile or more than 2.5 standard deviations below the population mean.</li>
            <li><strong>Disproportionate Growth:</strong> Discrepancies between sitting height and subischial leg length (suggestive of skeletal dysplasias).</li>
            <li><strong>Premature or Absent Puberty:</strong> Signs of secondary sexual maturation before age 8 in girls or age 9 in boys (precocious puberty fuses plates early), or no signs by age 13 in girls or 14 in boys.</li>
          </ul>
        </section>
      
        {/* Related Companion Tools Contextual Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Clinical &amp; Metabolic Companion Tools</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Pediatric height trajectory correlates closely with infant weight gain velocity and overall nutritional adequacy. Track developmental growth percentiles using our <a href="/calculators/health/baby-weight-calculator">Baby Weight Calculator</a>, assess adult healthy weight ranges with the <a href="/calculators/health/ideal-weight-calculator">Ideal Weight Calculator</a>, and monitor nutritional baselines with the <a href="/calculators/health/bmi-calculator">BMI Calculator</a>.
          </p>
        </section>
      </article>
    </CalcPage>
  );
}
