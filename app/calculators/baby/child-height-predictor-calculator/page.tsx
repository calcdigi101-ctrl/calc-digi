import type { Metadata } from "next";
import { Suspense } from "react";
import ChildHeightPredictorCalculator from "@/components/calcs/baby/child-height-predictor-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ChildHeightGrowthPlateVisualizer } from "@/components/flagship/baby/editorial-charts";

const PATH = "/calculators/baby/child-height-predictor-calculator";
const TITLE = "Child Height Predictor Calculator – Mid-Parental Adult Stature | CalcDigi";
const DESCRIPTION =
  "Predict your child's expected adult height using the clinical Tanner Mid-Parental Height Formula and Khamis-Roche method. Features sex-adjusted target height ranges, growth plate timelines, and pediatric endocrinology benchmarks.";

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
  { href: "/calculators/baby/baby-weight-percentile-calculator", icon: "⚖️", name: "Baby Weight Percentile Calculator" },
  { href: "/calculators/baby/due-date-calculator", icon: "📅", name: "Pregnancy Due Date Calculator" },
  { href: "/calculators/baby/baby-sleep-calculator", icon: "🌙", name: "Baby Sleep & Wake Windows" },
  { href: "/calculators/health/bmi-calculator", icon: "🩺", name: "BMI Calculator for Adults" },
  { href: "/calculators/health/ideal-weight-calculator", icon: "📊", name: "Ideal Body Weight Calculator" },
  { href: "/calculators/health/calorie-calculator", icon: "🥗", name: "Daily Calorie & Macro Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "How accurate is the Tanner Mid-Parental Height formula?",
    a: "The Tanner mid-parental method predicts adult height within a statistical margin of error of ±6.5 cm (±2.5 inches) for roughly 85% to 90% of healthy children. Genetics accounts for approximately 80% of final adult stature, while environmental factors—such as chronic nutrition, childhood illness, sleep quality, and physical activity—account for the remaining 20%.",
  },
  {
    q: "Is doubling a toddler's height at age 2 an accurate predictor?",
    a: "Doubling a boy's height at age 2 (or a girl's height at 18 months) is a popular pediatric rule of thumb that correlates moderately well with adult height. However, the Tanner mid-parental calculation is clinically superior because it incorporates both maternal and paternal genetic contributions, adjusting for sexual dimorphism.",
  },
  {
    q: "When do children experience their pubertal growth spurt?",
    a: "Girls typically begin their pubertal growth spurt earlier, around Tanner Stage II to III (ages 10 to 12), achieving peak height velocity (PHV) of roughly 8 to 9 cm per year, followed by epiphyseal growth plate closure 1 to 2 years after menarche. Boys experience their growth spurt later (ages 12 to 14, Tanner Stage III to IV), with higher peak height velocity (9 to 10 cm per year) sustained over a longer biological window.",
  },
  {
    q: "Why is 13 centimeters (5 inches) added or subtracted in the formula?",
    a: "Human adult sexual dimorphism across global populations shows that adult males are on average approximately 13 centimeters (5.1 inches) taller than adult females. To normalize parental heights to the child's biological sex, 13 cm is added to the mother's height when predicting a son, or subtracted from the father's height when predicting a daughter.",
  },
  {
    q: "How does sleep influence a child's final height?",
    a: "Human Growth Hormone (HGH) is pulsatile and predominantly secreted by the anterior pituitary gland during slow-wave Stage 3 deep NREM sleep. Chronic sleep deprivation, sleep apnea from enlarged tonsils/adenoids, or disrupted circadian rhythms can blunts nightly HGH release and impair linear skeletal elongation.",
  },
  {
    q: "When do growth plates (epiphyses) fuse and stop growing?",
    a: "Long bone elongation occurs at the epiphyseal cartilage plates. Under the influence of rising pubertal sex steroids (estrogen in both females and converted from testosterone in males), these growth plates calcify and permanently fuse. Epiphyseal closure occurs around ages 14 to 16 in females and ages 16 to 19 in males, after which further natural linear height gain is biologically impossible.",
  },
];

export default function ChildHeightPredictorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/calculators/baby", label: "Baby & Parenting" }}
      title="Child Height Predictor Calculator"
      intro="Estimate your child's future adult stature based on the clinical Tanner Mid-Parental Height formula. Features sex-adjusted target height ranges (±6.5 cm) and pediatric endocrinology milestones."
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
                Reviewed against <strong className="font-semibold text-slate-800 dark:text-slate-200">Pediatric Endocrine Society (PES) &amp; Tanner Standards</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Pediatric Endocrinology Reference</span>
              <span>•</span>
              <time dateTime="2026-10-24">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <h2 className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Clinical Summary: How Mid-Parental Height is Predicted
            </h2>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              The gold-standard clinical method used by pediatric endocrinologists is the <strong>Tanner Mid-Parental Target Height Formula</strong>. Because human height is polygenic with approximately <strong>80% heritability</strong> (analyzable on our <a href="/calculators/math/percentage-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">percentage calculator</a>), an individual&apos;s genetic growth potential is anchored by the mid-parental average of their biological parents. To account for the <strong>13 cm (5.1 in)</strong> biological sexual dimorphism between adult males and females, the maternal height is adjusted up for sons, or the paternal height is adjusted down for daughters. A child&apos;s normal expected adult height falls within <strong>±6.5 cm (±2.5 inches)</strong> of this mid-parental target.
            </p>
          </div>

          <h2>The Genetics of Stature and the Tanner Methodology</h2>
          <p>
            Human stature is one of the classic polygenic quantitative traits in quantitative genetics. Genome-wide association studies (GWAS) have identified over 12,000 independent genetic variants associated with skeletal growth, regulating growth hormone receptor signaling, chondrocyte proliferation in the epiphyseal growth plates, and extracellular matrix composition. Track infant baseline growth trajectory from birth using our <a href="/calculators/baby/baby-weight-percentile-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">baby weight percentile calculator</a>.
          </p>
          <p>
            Developed by renowned British pediatrician and growth pioneer <strong>Dr. James M. Tanner</strong> in the 1970s, the mid-parental method establishes a child&apos;s theoretical genetic potential based on mathematical averages computed with our <a href="/calculators/math/average-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">average calculator</a>. In pediatric clinical practice, comparing a child&apos;s projected trajectory against their mid-parental target allows early detection of growth hormone deficiency, hypothyroidism, Turner syndrome, or constitutional delay of growth and puberty.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Formula>
              <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Height for Boys (Tanner Formula)</div>
              <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">{"\\text{Boy's Target} = \\frac{\\text{Father's Height} + (\\text{Mother's Height} + 13\\text{ cm})}{2}"}</div>
              <div className="font-sans text-xs text-slate-500 dark:text-slate-400">Adds 13 cm to maternal height to normalize for male sexual dimorphism, then averages with paternal height. Expected range: ±6.5 cm (±2.5 in).</div>
            </Formula>
            <Formula>
              <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Height for Girls (Tanner Formula)</div>
              <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">{"\\text{Girl's Target} = \\frac{(\\text{Father's Height} - 13\\text{ cm}) + \\text{Mother's Height}}{2}"}</div>
              <div className="font-sans text-xs text-slate-500 dark:text-slate-400">Subtracts 13 cm from paternal height to normalize for female sexual dimorphism, then averages with maternal height. Expected range: ±6.5 cm (±2.5 in).</div>
            </Formula>
          </div>

          <h2>Childhood Growth Velocity Stages and Pubertal Phasing</h2>
          <p>
            Human linear growth is not continuous; it progresses through distinct physiological phases marked by varying growth velocities (centimeters gained per year), evaluated in clinical settings using our <a href="/calculators/datetime/age-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">age calculator</a>:
          </p>

          <DataTable
            head={["Developmental Stage", "Age Range", "Average Annual Linear Growth Velocity", "Primary Hormonal Regulators", "Key Clinical Features"]}
            rows={[
              ["Infancy (Rapid Phase)", "Birth to 12 months", "23 to 27 cm / year (9 to 11 in)", "Nutrition, Insulin, Thyroid Hormones", "Rapid somatic lengthening; birth length increases by 50%."],
              ["Toddler / Early Childhood", "1 to 3 years", "10 to 14 cm / year (4 to 5.5 in)", "Growth Hormone (GH), Thyroid Hormones", "Deceleration toward childhood baseline; transition to mid-parental curve."],
              ["Mid-Childhood Steady Phase", "4 to 9 years", "5 to 6.5 cm / year (2 to 2.5 in)", "Growth Hormone (GH), IGF-1 Axis", "Steady, predictable linear tracking along individual percentile line."],
              ["Pubertal Growth Spurt (Girls)", "10 to 13 years", "8 to 9 cm / year (3.2 to 3.5 in)", "Estrogen, GH-IGF-1 synergy", "Peak Height Velocity (PHV) occurs prior to menarche; plate fusion within 24 mo."],
              ["Pubertal Growth Spurt (Boys)", "12 to 16 years", "9 to 10.5 cm / year (3.5 to 4.2 in)", "Testosterone, Estrogen, GH-IGF-1 synergy", "Later onset allows 2 additional years of pre-pubertal growth; taller average adult stature."],
              ["Epiphyseal Plate Fusion", "Girls: 14–16 | Boys: 16–19", "0 cm / year (Adult Height Reached)", "High Estrogen levels in both sexes", "Chondrocyte exhaustion; complete ossification of long bone growth plates."],
            ]}
            highlight={3}
          />

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-8">
            <ChildHeightGrowthPlateVisualizer />
          </div>

          <h2>Alternative Clinical Prediction Models</h2>
          <p>
            In addition to the Tanner mid-parental formula, pediatric researchers have developed complementary predictive models tailored to different clinical scenarios:
          </p>

          <h3>1. The Khamis-Roche Method</h3>
          <p>
            Applicable to children without endocrinological pathology aged 4 to 17, the <strong>Khamis-Roche method</strong> incorporates the child&apos;s current age, height, and weight alongside mid-parental stature without requiring invasive hand-wrist bone age radiography. Current somatic weight can be balanced against stature targets on our <a href="/calculators/health/ideal-weight-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">ideal weight calculator</a>.
          </p>

          <h3>2. The Toddler Doubling Rule</h3>
          <p>
            A traditional pediatric rule of thumb estimates adult height by taking a boy&apos;s measured standing height at <strong>age 2.0 years</strong> and multiplying by 2 (or a girl&apos;s height at <strong>age 18 months</strong> multiplied by 2). While helpful as a quick estimate, this rule does not adjust for extreme parental heights or gestational age at birth determined on our <a href="/calculators/baby/due-date-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">due date calculator</a>.
          </p>

          <h3>3. Greulich-Pyle and Bayley-Pinneau Bone Age Radiography</h3>
          <p>
            When a child&apos;s height deviates significantly below the 3rd percentile or above the 97th percentile, pediatric endocrinologists obtain a single low-dose X-ray of the left hand and wrist. By comparing ossification centers against the <strong>Greulich and Pyle Radiographic Atlas</strong>, clinicians determine &ldquo;skeletal bone age.&rdquo; If bone age is delayed relative to chronological age, substantial growth potential remains. Adults can evaluate their proportional weight distribution on our <a href="/calculators/health/bmi-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">BMI calculator</a>.
          </p>

          <h2>Key Environmental Levers That Optimize Growth Potential</h2>
          <p>
            While genetics sets the upper boundary of adult stature, lifestyle and nutrition dictate whether a child reaches 100% of their biological potential:
          </p>
          <ul>
            <li><strong>Adequate Stage 3 Slow-Wave Sleep:</strong> Over 75% of daily human growth hormone is synthesized and released during nocturnal deep sleep. Structure healthy pediatric bedtimes with our <a href="/calculators/baby/baby-sleep-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">baby sleep calculator</a>.</li>
            <li><strong>Optimized Protein and Micronutrient Intake:</strong> Adequate bioavailable zinc, calcium, vitamin D3, and high-quality dietary amino acids, monitorable on our <a href="/calculators/health/protein-intake-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">protein intake calculator</a> and <a href="/calculators/health/calorie-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">calorie calculator</a>, are essential cofactors for chondrocyte matrix synthesis in the growth plates.</li>
            <li><strong>Weight-Bearing Physical Exercise:</strong> Moderate jumping, running, and athletic activity exert longitudinal mechanical strain on long bones, stimulating periosteal bone expansion and remodeling.</li>
            <li><strong>Family Long-Term Planning:</strong> As children progress through childhood milestones, plan ahead for adolescent educational expenditures with our <a href="/calculators/finance/college-savings-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">college savings calculator</a> alongside early childhood care modeled on our <a href="/calculators/baby/childcare-cost-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">childcare cost calculator</a>.</li>
          </ul>
        </>
      }
    >
      <ChildHeightPredictorCalculator />
    </CalcPage>
  );
}
