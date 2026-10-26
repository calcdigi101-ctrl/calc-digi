import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { BodyFatCalculator } from "@/components/flagship/health/BodyFatCalculator";
import { NavyBodyFatCircumferenceChart } from "@/components/flagship/health/editorial-charts/NavyBodyFatCircumferenceChart";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/health/body-fat-calculator";
const TITLE = "Body Fat Calculator | US Navy Circumference Method & Body Composition";
const DESCRIPTION =
  "Calculate your body fat percentage, lean body mass, and fat mass using the clinically validated US Navy circumference method. Review ACE healthy fitness categories.";

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
    q: "How accurate is the US Navy body fat circumference method?",
    a: "The US Navy circumference method, developed by Drs. JA Hodgdon and MB Beckett at the Naval Health Research Center, demonstrates an accuracy within 3% to 4% of dual-energy X-ray absorptiometry (DEXA) and underwater hydrostatic weighing across diverse demographic cohorts. Its accuracy depends on using an inelastic anthropometric tape measure pulled flat against skin at exact anatomical landmarks without tissue depression.",
  },
  {
    q: "What is an optimal, healthy body fat percentage for adult men?",
    a: "The American Council on Exercise (ACE) defines the optimal fitness body fat category for adult men as 14% to 17%, with 6% to 13% typical for competitive athletes and 18% to 24% representing acceptable population averages. Body fat levels below 2% to 5% threaten essential organ cushion and testosterone synthesis, while percentages exceeding 25% indicate clinical obesity with elevated cardiovascular risk.",
  },
  {
    q: "What is an optimal, healthy body fat percentage for adult women?",
    a: "For adult biological women, ACE classifies 21% to 24% as the healthy fitness range, 14% to 20% for athletes, and 25% to 31% as acceptable. Women require a minimum essential fat threshold of 10% to 13% to sustain steroid hormone production (estrogen, progesterone), maintain ovulatory menstrual cycles, and preserve bone mineral density. Body fat exceeding 32% denotes clinical obesity.",
  },
  {
    q: "Why does the female formula require hip circumference while the male formula does not?",
    a: "Sexual dimorphism in adipose storage patterns dictates distinct measurement sites. Under the influence of estrogen, biological females deposit subcutaneous adipose tissue preferentially around the pelvic girdle, gluteals, and upper thighs (gynoid distribution). In contrast, testosterone-dominated males preferentially accumulate visceral and subcutaneous fat in the abdominal depot (android distribution), requiring only waist and neck measurements.",
  },
  {
    q: "Where exactly should the tape measure be placed on the waist and neck?",
    a: "For men, measure horizontal waist circumference at the level of the umbilicus (navel), keeping arms relaxed at the sides after a normal passive expiration. For women, measure at the narrowest horizontal circumference of the torso between the lower costal rib margin and the superior iliac crest. For both sexes, measure the neck horizontally just inferior to the laryngeal prominence (Adam\'s apple).",
  },
  {
    q: "How does body fat percentage differ fundamentally from Body Mass Index (BMI)?",
    a: "Body Mass Index evaluates total body weight relative to squared height (kg/m²) as an epidemiological surrogate, failing to discriminate between metabolically dense skeletal muscle, skeletal bone mineral, and adipose tissue. Consequently, muscular strength athletes are frequently misdiagnosed as 'overweight' or 'obese' on BMI charts despite harboring minimal fat. Body fat assessment partitions total mass into functional tissue compartments.",
  },
  {
    q: "What is the physiological difference between visceral fat and subcutaneous fat?",
    a: "Subcutaneous adipose tissue resides directly beneath the dermis and serves as thermal insulation and energetic storage. Visceral adipose tissue is deposited deep within the peritoneal cavity surrounding internal organs like the liver, pancreas, and intestines. Visceral fat is metabolically active and secretes pro-inflammatory cytokines (TNF-alpha, IL-6), significantly increasing risks of hepatic steatosis, insulin resistance, and atherosclerosis.",
  },
  {
    q: "What is the safest weekly rate of body fat loss to prevent muscle wasting?",
    a: "Clinical sports nutrition recommends a fat loss velocity of 0.5% to 1.0% of total body weight per week (equivalent to 1 to 2 pounds of adipose tissue). More rapid weight loss accelerates skeletal muscle proteolysis, drops circulating leptin and active thyroid T3, reduces resting metabolic rate, and triggers severe neuroendocrine hunger signals.",
  },
];

const ACE_ROWS = [
  ["Essential Fat", "2% – 5%", "10% – 13%", "Minimal physiological threshold for nerve myelination and hormone production."],
  ["Athletes", "6% – 13%", "14% – 20%", "Striated muscular definition, vascularity, and high physical conditioning."],
  ["Fitness (Optimal Health)", "14% – 17%", "21% – 24%", "Athletic appearance, visible abdominal contours, low cardiometabolic risk."],
  ["Average (Acceptable)", "18% – 24%", "25% – 31%", "Normal population baseline without elevated chronic disease indicators."],
  ["Obese (Elevated Risk)", "≥ 25%", "≥ 32%", "Substantially higher risks of Type 2 diabetes, hypertension, and fatty liver disease."],
];

const METHOD_ROWS = [
  ["DEXA (Dual-Energy X-ray Absorptiometry)", "±1.5% Error", "Three-compartment bone, fat, and lean regional scan.", "High ($150–$300)"],
  ["Hydrostatic Underwater Weighing", "±1.5% Error", "Measures total body density via water displacement.", "Moderate ($75–$150)"],
  ["US Navy Circumference (This Tool)", "±3.0% – 4.0%", "Inelastic tape measurement at neck, waist, and hip.", "100% Free / Immediate"],
  ["Bioelectrical Impedance Analysis (BIA)", "±4.0% – 6.0%", "Measures electrical alternating current resistance; hydration-sensitive.", "Low to Moderate"],
  ["Skinfold Calipers (Jackson-Pollock)", "±3.5% – 4.5%", "Subcutaneous fat fold thickness pinch across 3 or 7 anatomical sites.", "Low (Requires technician)"],
];

const RELATED = [
  { href: "/calculators/health/bmi-calculator", icon: "⚖️", name: "BMI Calculator" },
  { href: "/calculators/health/calorie-calculator", icon: "🥗", name: "Calorie Calculator" },
  { href: "/calculators/health/tdee-calculator", icon: "⚡", name: "TDEE Calculator" },
  { href: "/calculators/health/ideal-weight-calculator", icon: "🎯", name: "Ideal Weight" },
  { href: "/calculators/health/bmr-calculator", icon: "🔥", name: "BMR Calculator" },
  { href: "/calculators/health/macro-calculator", icon: "🧬", name: "Macro Calculator" },
];

export default function BodyFatCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/health", label: "Health" }}
      title={TITLE}
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="\\%\\text{BF} = 495 / D_b - 450"
      related={RELATED}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="not-prose mb-8 flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              US Navy BCA &amp; ACE Clinical Standards
            </span>
            <span>•</span>
            <span>Updated Q4 2026</span>
            <span>•</span>
            <span>Anthropometric Precision</span>
          </div>
          <h2>What Is Body Fat Percentage? (Quick Answer)</h2>
          <p>
            <strong>Body fat percentage (% BF)</strong> represents the total mass of adipose tissue divided by total body weight, expressed as a percentage. Unlike simple scale weight or <Link href="/calculators/health/bmi-calculator">BMI</Link>, body fat percentage partitions your physical mass into two functional compartments: <strong>Fat Mass</strong> (subcutaneous and visceral adipose tissue) and <strong>Lean Body Mass (LBM)</strong> (skeletal muscle, internal organs, bone mineral, and body fluids).
          </p>
          <p>
            The clinically recommended fitness range is <strong>14% to 17% for men</strong> and <strong>21% to 24% for women</strong>. To optimize body composition, individuals typically implement a modest caloric deficit calculated via our <Link href="/calculators/health/calorie-calculator">Calorie Calculator</Link> and track energy expenditure with our <Link href="/calculators/health/tdee-calculator">TDEE Calculator</Link> while engaging in progressive resistance training.
          </p>

          <div className="not-prose my-8">
            <NavyBodyFatCircumferenceChart />
          </div>

          <h2>The Official US Navy Circumference Equations</h2>
          <p>
            The US Navy Body Composition Assessment (BCA) method was formulated in 1984 by researchers JA Hodgdon and MB Beckett at the Naval Health Research Center. It utilizes common logarithmic ratios of anatomical circumferences to calculate body density and estimate body fat percentage without costly clinical equipment:
          </p>

          <h3>US Navy Formula for Men (Centimeters):</h3>
          <Formula>
            {"\\%\\text{ Body Fat} = 495 / (1.0324 - 0.19077 \\log_{10}(\\text{waist} - \\text{neck}) + 0.15456 \\log_{10}(\\text{height})) - 450"}
          </Formula>

          <h3>US Navy Formula for Women (Centimeters):</h3>
          <Formula>
            {"\\%\\text{ Body Fat} = 495 / (1.29579 - 0.35004 \\log_{10}(\\text{waist} + \\text{hip} - \\text{neck}) + 0.22100 \\log_{10}(\\text{height})) - 450"}
          </Formula>

          <p>
            <strong>Imperial Units Form:</strong> When measurements are taken in inches, the logarithmic constant offsets adjust as follows:
          </p>
          <Formula>
            {"\\%\\text{BF}_{\\text{male}} = 86.010 \\log_{10}(\\text{waist} - \\text{neck}) - 70.041 \\log_{10}(\\text{height}) + 36.76"}
          </Formula>
          <Formula>
            {"\\%\\text{BF}_{\\text{female}} = 163.205 \\log_{10}(\\text{waist} + \\text{hip} - \\text{neck}) - 97.684 \\log_{10}(\\text{height}) - 78.387"}
          </Formula>

          <h2>The Siri and Brozek Densitometric Conversion Models</h2>
          <p>
            The US Navy equation first estimates whole-body density ($D_b$) in grams per cubic centimeter before converting density to relative adiposity. In physiological research, two classic two-compartment conversion equations predominate:
          </p>

          <h3>The Siri Formula (1956):</h3>
          <Formula>
            {"\\%\\text{ Body Fat} = \\left(\\frac{4.95}{D_b} - 4.50\\right) \\times 100"}
          </Formula>

          <h3>The Brozek Formula (1963):</h3>
          <Formula>
            {"\\%\\text{ Body Fat} = \\left(\\frac{4.57}{D_b} - 4.142\\right) \\times 100"}
          </Formula>

          <p>
            William E. Siri assumed constant densities for the fat-free mass (1.100 g/cm³) and fat mass (0.9007 g/cm³) across all human subjects. Josef Brozek introduced adjustments to account for biological variations in bone mineralization and intracellular water retention among individuals with higher adiposity. For adult populations between 10% and 30% body fat, both formulas yield estimates that agree within 0.5% to 1.0%.
          </p>

          <h2>Computing Fat Mass & Lean Body Mass</h2>
          <p>
            Once your body fat percentage is determined, your total physical body weight can be partitioned into its constituent physiological components:
          </p>
          <Formula>
            {"\\text{Fat Mass (kg or lbs)} = \\text{Total Weight} \\times \\left(\\frac{\\%\\text{ Body Fat}}{100}\\right)"}
          </Formula>
          <Formula>
            {"\\text{Lean Body Mass (kg or lbs)} = \\text{Total Weight} - \\text{Fat Mass}"}
          </Formula>
          <p>
            For example, an individual weighing 180 lbs with 20% body fat carries 36 lbs of fat mass and 144 lbs of lean body mass. Knowing your lean body mass allows you to calculate exact resting caloric expenditure using the Katch-McArdle formula on our <Link href="/calculators/health/bmr-calculator">BMR Calculator</Link>, and determine daily protein targets using our <Link href="/calculators/health/protein-calculator">Protein Calculator</Link>.
          </p>

          <h2>American Council on Exercise (ACE) Classification Standards</h2>
          <p>
            The American Council on Exercise provides the global standard for interpreting adult body composition categories across biological sex:
          </p>
          <DataTable
            head={["Classification", "Men (% Fat)", "Women (% Fat)", "Physiological Implications"]}
            rows={ACE_ROWS}
            highlight={2}
          />

          <h2>Comparison of Body Composition Assessment Methods</h2>
          <p>
            Various technologies exist to assess human body composition, each balancing clinical diagnostic accuracy against cost, accessibility, and convenience:
          </p>
          <DataTable
            head={["Method", "Clinical Error Margin", "Assessment Mechanism", "Cost & Practicality"]}
            rows={METHOD_ROWS}
            highlight={2}
          />

          <h2>Visceral Adiposity vs Subcutaneous Adiposity</h2>
          <p>
            Not all body fat poses identical physiological consequences. Adipose tissue is classified into two anatomically and biologically distinct depots:
          </p>
          <ul>
            <li>
              <strong>Subcutaneous Adipose Tissue (SAT):</strong> Located directly beneath the skin layer, subcutaneous fat accounts for approximately 80% to 90% of total human body fat. It serves as essential thermal insulation, mechanical impact cushioning, and long-term biochemical energy storage.
            </li>
            <li>
              <strong>Visceral Adipose Tissue (VAT):</strong> Located deep within the abdominal cavity wrapping around hepatic, pancreatic, and intestinal tissues. Visceral adipocytes possess high lipolytic activity, releasing free fatty acids directly into the portal circulation. They secrete pro-inflammatory adipokines (interleukin-6, tumor necrosis factor-alpha, and resistin) that drive chronic systemic inflammation, insulin resistance, atherogenic dyslipidemia, and metabolic syndrome.
            </li>
          </ul>

          <h2>Standardized Anthropometric Measurement Protocol</h2>
          <p>
            To achieve clinical precision within 3% of a DEXA scan using the US Navy method, follow these strict anthropometric guidelines:
          </p>
          <ol>
            <li>
              <strong>Use an Inelastic Measuring Tape:</strong> Always use a non-stretch fiberglass or vinyl anthropometric tape. Avoid elastic cloth or steel tapes that stretch or pinch tissue.
            </li>
            <li>
              <strong>Measure Directly Against Bare Skin:</strong> Do not measure over clothing, belts, or compressive athletic compression gear, as even thin fabrics distort circumference readings by 0.5 to 1.5 inches.
            </li>
            <li>
              <strong>Standardize Respiratory Exhalation:</strong> Measure abdominal waist circumference at the end of a normal, unforced expiration. Do not forcefully suck in the stomach or puff out the abdomen.
            </li>
            <li>
              <strong>Ensure Constant Tape Tension:</strong> The tape should lie completely flat and horizontal to the floor, conforming to the contours of the skin without indenting or compressing the underlying subcutaneous adipose tissue.
            </li>
            <li>
              <strong>Take Multiple Consecutive Readings:</strong> Measure each anatomical site three consecutive times and compute the arithmetic average to eliminate measurement variance.
            </li>
          </ol>

          <h2>Normal Weight Obesity ("Skinny Fat") and Sarcopenia</h2>
          <p>
            A major epidemiological blind spot of simple height-weight metrics is <strong>Normal Weight Obesity (NWO)</strong>, commonly referred to as the "skinny fat" phenotype. Individuals with NWO have a normal Body Mass Index (between 18.5 and 24.9 kg/m²) but harbor an excessively high body fat percentage (exceeding 25% in men or 33% in women) paired with deficient skeletal muscle mass.
          </p>
          <p>
            This condition is frequently exacerbated by age-related sarcopenia, chronic sedentary desk occupations, and recurrent crash dieting without resistance training. Despite appearing slender, individuals with NWO exhibit identical cardiometabolic risk profiles to clinically obese patients, including elevated triglycerides, insulin resistance, endothelial dysfunction, and subclinical systemic inflammation. Identifying this phenotype through circumference body fat tracking allows for early, life-saving nutritional and exercise interventions.
          </p>

          <h2>Waist-to-Hip Ratio (WHR) & Body Morphology Patterns</h2>
          <p>
            In addition to total adipose percentage, regional anatomical fat deposition profoundly dictates chronic cardiovascular outcomes. An <strong>android (apple-shaped)</strong> adipose morphology—characterized by a high waist-to-hip ratio exceeding 0.90 in men or 0.85 in women—concentrates active visceral fat around abdominal viscera, quadrupling risks of myocardial infarction and ischemic stroke.
          </p>
          <p>
            Conversely, a <strong>gynoid (pear-shaped)</strong> morphology deposits protective subcutaneous fat in femoral-gluteal depots, which produces lower circulating free fatty acids and elevated beneficial adiponectin. Measuring waist and hip circumferences routinely serves as both an accurate input for the US Navy formula and an indispensable clinical diagnostic tool for cardiovascular risk stratification.
          </p>

          <h2>Body Recomposition: Gaining Muscle While Losing Fat</h2>
          <p>
            Achieving simultaneous fat loss and muscle hypertrophy—termed <strong>body recomposition</strong>—is the ultimate fitness objective. While conventional wisdom held that energy deficits preclude protein accretion, modern exercise physiology proves recomposition is achievable by managing energy balance and training stimulus.
          </p>
          <p>
            To drive body recomposition:
          </p>
          <ul>
            <li>
              <strong>Implement a Mild Caloric Deficit (200 to 350 kcal/day):</strong> An overly aggressive deficit triggers skeletal muscle catabolism and hormonal fatigue. A modest deficit supplies adequate energy for muscle protein synthesis while mobilizing adipose lipids, as guided by our <Link href="/calculators/health/weight-loss-calculator">Weight Loss Calculator</Link>.
            </li>
            <li>
              <strong>Consume High Quality Protein (2.0 to 2.4 g/kg LBM):</strong> Elevated amino acid availability maintains positive intramuscular nitrogen balance and stimulates mTORC1 signaling. Target nutritional macros precisely via our <Link href="/calculators/health/macro-calculator">Macro Calculator</Link>.
            </li>
            <li>
              <strong>Execute Progressive Resistance Training:</strong> Apply progressive overload across compound multi-joint movements 3 to 5 times per week to create mechanical tension and micro-trauma necessary for myofibrillar hypertrophy.
            </li>
            <li>
              <strong>Benchmark Lean Mass Evolution:</strong> Re-evaluate your circumferences every 3 to 4 weeks. Measure your target progress toward optimal body proportions with our <Link href="/calculators/health/ideal-weight-calculator">Ideal Weight Calculator</Link> and calculate fractional changes with our <Link href="/calculators/math/percentage-calculator">Percentage Calculator</Link>.
            </li>
          </ul>

          <h2>Clinical Conclusions for Sustainable Body Composition</h2>
          <p>
            Tracking body fat percentage rather than raw bathroom scale weight provides true clarity on your metabolic fitness and body composition trajectory. By understanding the distinction between lean tissue retention and adipose loss, establishing evidence-based nutritional protocols, and measuring consistently under standardized conditions, you empower yourself to achieve lasting metabolic vitality and optimal physical conditioning.
          </p>
        </>
      }
    >
      <BodyFatCalculator />
    </CalcPage>
  );
}
