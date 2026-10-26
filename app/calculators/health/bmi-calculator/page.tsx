import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BmiCalculator } from "@/components/flagship/bmi/BmiCalculator";
import { BmiQueteletPrimeChart } from "@/components/flagship/health/editorial-charts/BmiQueteletPrimeChart";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { WHO_CLASSES } from "@/lib/bmi";

const PATH = "/calculators/health/bmi-calculator";
const TITLE = "BMI Calculator | Adult Body Mass Index, WHO Categories & Healthy Weight";
const DESCRIPTION =
  "Calculate your Body Mass Index (BMI) in US or metric units. Features WHO weight categories, Oxford University scaling, BMI Prime, and healthy weight targets.";

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

const FAQ_ITEMS = [
  {
    q: "What is a healthy Body Mass Index (BMI) range for adult men and women?",
    a: "According to clinical guidelines established by the World Health Organization (WHO) and the Centers for Disease Control and Prevention (CDC), a healthy adult BMI spans from 18.5 to 24.9 kg/m². A BMI below 18.5 is categorized as underweight, 25.0 to 29.9 is categorized as overweight, and 30.0 or higher is classified as clinical obesity across Classes I, II, and III.",
  },
  {
    q: "Why is the BMI formula identical for men and women despite biological body fat differences?",
    a: "The standard Quetelet BMI formula is mathematically sex-neutral because it evaluates total body mass relative to stature rather than body tissue composition. However, at identical BMI values, adult biological women typically carry approximately 8% to 12% higher essential adipose tissue than biological men. For comprehensive body composition analysis, physicians evaluate BMI in conjunction with body fat percentage and waist circumference.",
  },
  {
    q: "How does the New Oxford University BMI formula differ from the classical Quetelet formula?",
    a: "Developed by Oxford mathematician Professor Nick Trefethen, the New BMI formula introduces a 1.3 scaling multiplier and a 2.5 height exponent: BMI = 1.3 × Weight(kg) / Height(m)^2.5. This non-linear power scaling corrects for the geometric distortion of the classical formula, which tends to assign deceptively high BMIs to taller individuals and artificially low BMIs to shorter people.",
  },
  {
    q: "Why does standard BMI sometimes misclassify muscular athletes and bodybuilders?",
    a: "Because standard bathroom scales and BMI formulas cannot differentiate between dense lean skeletal muscle and adipose tissue, muscular athletes frequently record BMIs above 30.0, placing them in the 'obese' statistical tier despite possessing low body fat percentages. In such cases, circumference-based assessments and skinfold calipers provide more accurate health indicators.",
  },
  {
    q: "What are the ethnic-specific BMI cutoff thresholds for Asian and South Asian populations?",
    a: "Extensive cardiometabolic epidemiology published by the WHO demonstrates that individuals of Asian and South Asian ancestry experience elevated risks of Type 2 diabetes and cardiovascular disease at lower BMIs. Consequently, the WHO Asian cutoff defines increased risk at 23.0 to 27.4 kg/m² and high risk (obesity) at 27.5 kg/m² and above.",
  },
  {
    q: "What is BMI Prime and how is it interpreted clinically?",
    a: "BMI Prime is a dimensionless ratio that normalizes your individual BMI against the upper threshold of the healthy weight category (25.0 kg/m²): BMI Prime = BMI / 25.0. A BMI Prime between 0.74 and 1.00 indicates a healthy weight, values below 0.74 denote underweight, and values exceeding 1.00 reflect excess weight.",
  },
  {
    q: "Can pediatric children and teenagers use this adult BMI calculator?",
    a: "While the arithmetic height-weight calculation is identical, pediatric BMI for children and adolescents aged 2 to 19 must be interpreted using CDC age-and-sex-specific growth percentile charts rather than static adult categories, as children experience dynamic physiological body composition shifts during pubertal maturation.",
  },
  {
    q: "How does losing 5% to 10% of body weight impact cardiometabolic health markers?",
    a: "Clinical research published in the New England Journal of Medicine confirms that achieving a modest 5% to 10% reduction in total body weight significantly lowers systolic blood pressure, improves glycated hemoglobin (HbA1c), reduces systemic inflammatory cytokines (CRP), and improves lipid profiles regardless of whether an individual reaches the theoretical 'normal' BMI bracket.",
  },
];

const WHO_ROWS = [
  ["Severe Underweight (Thinness Class III)", "< 16.0", "< 0.64", "Extremely High (Malnutrition & Immune Deficiency)"],
  ["Moderate Underweight (Thinness Class II)", "16.0 – 16.9", "0.64 – 0.68", "Elevated (Hormonal & Electrolyte Imbalance)"],
  ["Mild Underweight (Thinness Class I)", "17.0 – 18.4", "0.68 – 0.74", "Mild (Nutritional Monitoring Recommended)"],
  ["Normal Healthy Weight Range", "18.5 – 24.9", "0.74 – 1.00", "Lowest All-Cause Mortality Benchmark"],
  ["Pre-Obesity (Overweight)", "25.0 – 29.9", "1.00 – 1.20", "Moderate (Hypertension & Insulin Resistance Risk)"],
  ["Obesity Class I (Moderate)", "30.0 – 34.9", "1.20 – 1.40", "High (Elevated Atherosclerosis & Diabetes)"],
  ["Obesity Class II (Severe)", "35.0 – 39.9", "1.40 – 1.60", "Very High (Sleep Apnea & Fatty Liver)"],
  ["Obesity Class III (Extreme / Morbid)", "≥ 40.0", "≥ 1.60", "Extremely High (Urgent Medical Intervention)"],
];

const ETHNIC_ROWS = [
  ["Underweight Category", "< 18.5 kg/m²", "< 18.5 kg/m²", "Higher risk of respiratory infection"],
  ["Normal Optimal Range", "18.5 – 24.9 kg/m²", "18.5 – 22.9 kg/m²", "Asian optimal baseline is 2 units lower"],
  ["Increased Risk (Overweight)", "25.0 – 29.9 kg/m²", "23.0 – 27.4 kg/m²", "Visceral adiposity accumulates at lower weights"],
  ["High Risk (Clinical Obesity)", "≥ 30.0 kg/m²", "≥ 27.5 kg/m²", "Higher incidence of metabolic syndrome & CVD"],
];

const RELATED = [
  { href: "/calculators/health/calorie-calculator", icon: "🔥", name: "Calorie Needs" },
  { href: "/calculators/health/body-fat-calculator", icon: "📐", name: "Body Fat %" },
  { href: "/calculators/health/ideal-weight-calculator", icon: "⚖️", name: "Ideal Weight" },
  { href: "/calculators/health/bmr-calculator", icon: "⚡", name: "BMR Basal Rate" },
  { href: "/calculators/health/tdee-calculator", icon: "🏃", name: "TDEE Expenditure" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Percentage Calculator" },
];

export default function BmiCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/health", label: "Health" }}
      title={TITLE}
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="\text{BMI} = \frac{\text{mass (kg)}}{[\text{height (m)}]^2}"
      related={RELATED}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="not-prose mb-8 flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              World Health Organization (WHO) &amp; CDC Clinical Guidelines
            </span>
            <span>•</span>
            <span>Updated Q4 2026</span>
            <span>•</span>
            <span>Medical Anthropometry Precision</span>
          </div>

          <h2>What is Body Mass Index (BMI)? Definition &amp; Epidemiological Purpose</h2>
          <p>
            <strong>Body Mass Index (BMI)</strong>, historically designated as the Quetelet Index, is an internationally recognized anthropometric screening metric that quantifies an individual&apos;s tissue mass (muscle, fat, and bone) relative to their stature. Formulated in 1832 by Belgian astronomer and statistician Adolphe Quetelet during his foundational studies on &apos;social physics&apos;, BMI establishes a standardized clinical baseline to classify individuals into distinct weight categories correlated with morbidity and mortality risk.
          </p>
          <p>
            In modern preventative medicine, public health epidemiology, and clinical cardiology, BMI serves as a rapid, non-invasive risk stratification tool. Large-scale global meta-analyses published in <em>The Lancet</em> demonstrate a J-shaped mortality curve, where all-cause mortality rates remain statistically lowest within the normal healthy BMI range (18.5 to 24.9 kg/m²), accelerating significantly among populations residing in both the severe underweight and extreme obesity tiers.
          </p>

          <div className="not-prose my-8">
            <BmiQueteletPrimeChart />
          </div>

          <h2>The Mathematical Derivation of Body Mass Index: Metric &amp; Imperial Formulas</h2>
          <p>
            The mathematical formulation of Body Mass Index evaluates total body weight normalized to the square of stature, reflecting the biophysical scaling principle that mass scales proportionally with planar volume. Depending on the measurement unit system deployed, the canonical equations evaluate as:
          </p>

          <h3>1. International Metric System (SI Units)</h3>
          <p>
            In scientific research and international medical practice, BMI is calculated directly by dividing weight in kilograms by height in meters squared:
          </p>
          <Formula>{"\text{BMI} = \frac{\text{Weight (kg)}}{[\text{Height (m)}]^2}"}</Formula>
          <p>
            <em>Metric Example:</em> An individual weighing 72.0 kilograms with a standing height of 175 centimeters (1.75 meters):
          </p>
          <Formula>{"\text{BMI} = \frac{72.0}{(1.75)^2} = \frac{72.0}{3.0625} = 23.51 \text{ kg/m}^2 \quad (\text{Normal Weight})"}</Formula>

          <h3>2. United States Customary System (Imperial Units)</h3>
          <p>
            When height is recorded in inches and weight in pounds, an empirical conversion scalar of <strong>703.0695796</strong> is incorporated to reconcile pound-to-kilogram (0.45359237) and inch-to-meter (0.0254) dimensional units:
          </p>
          <Formula>{"\text{BMI} = \left( \frac{\text{Weight (lbs)}}{[\text{Height (inches)}]^2} \right) \times 703.07"}</Formula>
          <p>
            <em>Imperial Example:</em> An adult weighing 160 pounds standing 5 feet 10 inches tall (70.0 inches):
          </p>
          <Formula>{"\text{BMI} = \left( \frac{160}{(70)^2} \right) \times 703.07 = \left( \frac{160}{4{,}900} \right) \times 703.07 = 0.032653 \times 703.07 = 22.96 \text{ kg/m}^2"}</Formula>

          <h2>The New Oxford University BMI Formula (Trefethen Correction)</h2>
          <p>
            In 2013, Professor Nick Trefethen of Oxford University identified a mathematical limitation in Quetelet&apos;s classical equation: humans are three-dimensional volumetric biological entities, meaning scaling body mass purely against height squared over-penalizes taller adults while flattering shorter individuals. Trefethen proposed the <strong>New BMI Formula</strong>:
          </p>
          <Formula>{"\text{BMI}_{\text{Oxford}} = \frac{1.3 \times \text{Weight (kg)}}{[\text{Height (m)}]^{2.5}}"}</Formula>
          <p>
            The 1.3 scalar aligns the new formula with the classical value for an average human height of 1.69 meters (5 ft 6.5 in). For a 6 ft 4 in (1.93 m) tall individual, the Oxford formula reduces calculated BMI by approximately 1.0 full point, preventing tall individuals from being falsely flagged as overweight when their body frame is naturally elongated.
          </p>

          <h2>World Health Organization (WHO) Adult Classification Matrix</h2>
          <p>
            The World Health Organization categorizes adult nutritional status across eight distinct epidemiological tiers, tracking disease risk correlations:
          </p>

          <DataTable
            head={["WHO Classification Tier", "BMI Range (kg/m²)", "BMI Prime (Ratio)", "Cardiovascular & All-Cause Mortality Risk"]}
            rows={WHO_ROWS}
            highlight={3}
          />

          <h2>Ethnic-Specific BMI Thresholds: Asian &amp; South Asian Risk Profiles</h2>
          <p>
            Extensive biomedical research indicates that biological populations of Asian, South Asian, and East Asian heritage possess higher percentages of visceral and ectopic abdominal fat at identical BMI levels compared to European cohorts. To avert under-diagnosing metabolic syndrome, the WHO recommends localized diagnostic cutoffs:
          </p>

          <DataTable
            head={["Clinical Risk Category", "International Standard (WHO)", "Asian Specific Threshold", "Clinical Significance"]}
            rows={ETHNIC_ROWS}
            highlight={1}
          />

          <h2>BMI vs. Body Fat Percentage: Understanding Lean Mass Composition</h2>
          <p>
            While BMI provides an exceptional high-level population screening tool, it does not distinguish between skeletal muscle hypertrophy, visceral adiposity, and subcutaneous fat. Two individuals possessing identical BMIs of 27.5 kg/m² may present entirely distinct cardiometabolic health profiles:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>The Resistance-Trained Athlete:</strong> A powerlifter or sprinter with dense bone mineralization and 12% body fat, verifiable with our <Link href="/calculators/health/body-fat-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">body fat calculator</Link>, presents pristine blood lipid profiles and optimal insulin sensitivity.</li>
            <li><strong>The Sarcopenic Sedentary Adult (&apos;Skinny Fat&apos;):</strong> An individual with minimal muscular development and 32% body fat possesses elevated visceral adipose stores despite falling into an apparently modest BMI category.</li>
          </ul>
          <p>
            Consequently, sports scientists and clinical dietitians combine BMI measurements with waist-to-hip ratio assessments using our <Link href="/calculators/health/waist-to-hip-ratio-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">waist-to-hip ratio calculator</Link>, basal metabolic evaluations via our <Link href="/calculators/health/bmr-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">BMR calculator</Link>, and tailored energy expenditure planning with our <Link href="/calculators/health/calorie-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">calorie calculator</Link> and <Link href="/calculators/health/tdee-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">TDEE calculator</Link>.
          </p>

          <h2>Waist-to-Height Ratio (WHtR): The Universal 0.5 Boundary Benchmark</h2>
          <p>
            In clinical practice guidelines updated in 2022, the UK National Institute for Health and Care Excellence (NICE) and the American Association of Clinical Endocrinology formally recommended pairing adult BMI with the <strong>Waist-to-Height Ratio (WHtR)</strong>. The overarching clinical heuristic states: <em>keep your waist circumference to less than half your measured standing height</em> (a boundary ratio of 0.50).
          </p>
          <p>
            Because height is factored directly into the denominator, WHtR functions effectively across both biological sexes, all pediatric age brackets above five years old, and diverse global ethnic ancestries without requiring ethnic-specific cutoff calibrations. A WHtR exceeding 0.50 signifies elevated intra-abdominal visceral adipose volume, while values surpassing 0.60 represent severe cardiometabolic risk for premature myocardial infarction, Type 2 diabetes mellitus, and hepatic steatosis.
          </p>

          <h2>The Ponderal Index: Cubic Allometric Stature Scaling in Neonatal &amp; Extreme Heights</h2>
          <p>
            For pediatric neonatology and adults possessing extreme stature (under 5 feet or over 6 feet 6 inches), physical anthropologists frequently deploy the <strong>Ponderal Index (Corpulence Index)</strong>. Because biological volume scales as height cubed rather than squared, dividing mass by height to the third power eliminates dimensional distortion:
          </p>
          <Formula>{"\text{Ponderal Index} = \frac{\text{Weight (kg)}}{[\text{Height (m)}]^3}"}</Formula>
          <p>
            Normal adult Ponderal Index values typically span between 11.0 and 15.0 kg/m³. In pediatric obstetrics, pediatricians calculate the neonatal ponderal index to differentiate symmetrical fetal growth restriction from asymmetrical intrauterine growth restriction (IUGR), where brain development is preserved relative to fetal liver and abdominal soft tissue.
          </p>

          <h2>Pediatric BMI-for-Age Percentiles: CDC Growth Curves in Children &amp; Adolescents</h2>
          <p>
            In pediatric care for youths aged 2 to 19, static adult BMI cutoff boundaries cannot be utilized because body composition fluctuates dramatically across developmental pubertal stages. Instead, pediatricians utilize CDC Growth Charts derived via the LMS (Box-Cox power lambda, median mu, and coefficient of variation sigma) statistical transformation:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Underweight Tier:</strong> BMI-for-age below the 5th percentile on standardized growth curves.</li>
            <li><strong>Healthy Weight Range:</strong> BMI-for-age between the 5th and 84.9th percentiles.</li>
            <li><strong>Overweight Threshold:</strong> BMI-for-age between the 85th and 94.9th percentiles.</li>
            <li><strong>Childhood Obesity:</strong> BMI-for-age at or above the 95th percentile, demanding clinical lifestyle and metabolic screening.</li>
          </ul>

          <h2>Clinical Sarcopenia &amp; The Obesity Paradox in Geriatric Epidemiology</h2>
          <p>
            In geriatric medicine and longevity research, interpreting BMI among adults aged 65 and older introduces a widely studied clinical phenomenon known as the <strong>Obesity Paradox</strong>. Multiple epidemiological meta-analyses observe that slightly higher BMIs (ranging between 25.0 and 27.5 kg/m²) in elderly populations correlate with reduced all-cause mortality compared to strictly &apos;normal&apos; BMIs below 22.0 kg/m². Modest subcutaneous fat reserves provide vital nutritional and metabolic buffering during acute critical illnesses, severe systemic infections, and post-surgical recuperation periods.
          </p>
          <p>
            Furthermore, elderly individuals frequently experience age-related muscle wasting (sarcopenia) and vertebral compression fractures that decrease height over time. Consequently, a declining BMI in older adults often signals progressive loss of functional skeletal muscle mass rather than beneficial fat reduction. Geriatricians prioritize functional biomarkers—such as isometric handgrip dynamometer strength, gait speed, and bone mineral density scans—over rigid adherence to youthful BMI cutoffs.
          </p>

          <h2>Healthy Weight Management Strategies &amp; Macronutrient Architecture</h2>
          <p>
            Achieving and maintaining an optimal Body Mass Index requires balancing daily caloric intake against metabolic expenditure while optimizing lean tissue preservation. Calculating protein requirements through our <Link href="/calculators/health/protein-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">protein calculator</Link> and structuring macronutrients with our <Link href="/calculators/health/macro-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">macro calculator</Link> guarantees that weight loss represents fat tissue reduction rather than muscle atrophy.
          </p>
          <p>
            Furthermore, evaluating healthy body proportions using our <Link href="/calculators/health/ideal-weight-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">ideal weight calculator</Link>, projecting fat loss rate with our <Link href="/calculators/health/weight-loss-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">weight loss calculator</Link>, and tracking body mass variance with our <Link href="/calculators/math/percentage-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">percentage calculator</Link> empowers individuals to construct sustainable, evidence-backed lifestyle protocols. Pairing BMI metrics with daily step volume and progressive resistance training ensures long-term cardiometabolic vitality and functional physical independence across every decade of adult life.
          </p>
        </>
      }
    >
      <BmiCalculator />
    </CalcPage>
  );
}
