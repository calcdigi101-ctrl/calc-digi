import IdealWeightCalculator from "@/components/calcs/health/ideal-weight-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { IdealWeightFormulaChart } from "@/components/flagship/health/editorial-charts";

const PATH = "/calculators/health/ideal-weight-calculator";
const TITLE = "Ideal Weight Calculator – 4 Clinical Formulas & WHO Healthy BMI | CalcDigi";
const DESCRIPTION =
  "Free ideal weight calculator: determine your optimal body weight across Devine, Robinson, Miller, and Hamwi clinical equations with WHO healthy BMI boundaries.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Ideal Weight Calculator"
      intro="Determine your target healthy body weight by comparing four clinically validated medical formulas (Devine, Robinson, Miller, and Hamwi) alongside World Health Organization (WHO) BMI reference standards."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="Devine IBW = 50.0 kg + 2.3 kg * (Height_in - 60)"
      related={[
        { href: "/calculators/health/bmi-calculator", icon: "📊", name: "BMI Calculator" },
        { href: "/calculators/health/body-fat-calculator", icon: "📏", name: "Body Fat Calculator" },
        { href: "/calculators/health/bmr-calculator", icon: "🔥", name: "BMR Calculator" },
        { href: "/calculators/health/tdee-calculator", icon: "⚡", name: "TDEE Calculator" },
        { href: "/calculators/health/calorie-calculator", icon: "🥗", name: "Calorie Calculator" },
        { href: "/calculators/health/protein-intake-calculator", icon: "🥩", name: "Protein Intake" },
      ]}
      faq={[
        {
          q: "What is Ideal Body Weight (IBW)?",
          a: "Ideal Body Weight (IBW) is a standardized medical and statistical estimate of the weight that correlates with the lowest mortality, optimal longevity, and lowest risk of chronic cardiovascular and metabolic diseases for a given height, sex, and skeletal frame.",
        },
        {
          q: "Which ideal weight formula is the most authoritative?",
          a: "The Devine Formula (published in 1974 by Dr. Ben J. Devine) is the most widely cited equation in modern clinical medicine. It is universally programmed into hospital EHR software to calculate renal drug clearance, mechanical ventilator tidal volumes, and therapeutic antibiotic dosing.",
        },
        {
          q: "Why do the four formulas give slightly different results?",
          a: "Each formula was calibrated from different patient populations and eras. The Hamwi formula (1964) was created as a rule of thumb for clinical dietitians; Devine (1974) adjusted for hospital pharmacology; Robinson (1983) and Miller (1983) modified the height coefficients to produce gentler curves for very tall and short individuals.",
        },
        {
          q: "How does skeletal frame size affect my ideal weight?",
          a: "Skeletal bone density and wrist circumference determine bone frame size. Clinical practice recommends adjusting baseline ideal weight by -10% for individuals with small bone frames and +10% for large-framed individuals.",
        },
        {
          q: "Can an athlete weigh more than their ideal body weight and still be healthy?",
          a: "Yes, absolutely. Ideal body weight formulas do not distinguish between adipose fat tissue and dense skeletal muscle mass. A competitive bodybuilder or powerlifter may weigh 30 to 50 pounds above their theoretical 'ideal weight' while maintaining single-digit body fat and excellent cardiometabolic health.",
        },
        {
          q: "How does the WHO Healthy BMI Range compare to Ideal Body Weight?",
          a: "The World Health Organization (WHO) defines a healthy weight as any weight producing a Body Mass Index (BMI) between 18.5 and 24.9 kg/m². This creates a broad, realistic healthy weight window of roughly 35 to 45 pounds for most adults, inside which the mathematical formulas generally sit right in the middle (~21 to 22.5 BMI).",
        },
      ]}
      article={
        <>
          {/* Clinical Verification Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
                <svg className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Hospital Pharmacotherapy &amp; Clinical Dosage Standard
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Devine (1974), Robinson (1983) &amp; WHO BMI Benchmarks
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Biomedical Informatics &amp; Anthropometry</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Oct 2026</span>
            </div>
          </div>

          <h2>The Medical Origins of Ideal Body Weight (IBW)</h2>
          <p>
            The concept of <strong>Ideal Body Weight (IBW)</strong> was not originally engineered for aesthetic appearance or
            fitness modeling. Instead, it was developed by clinical pharmacologists and intensive care physicians who recognized
            that many critical medications—such as water-soluble antibiotics (aminoglycosides), chemotherapeutic agents, anesthetics,
            and intravenous paracetamol—do not distribute evenly into adipose fat tissue. Dosing these medications according
            to total actual weight in overweight patients caused severe toxicity, while under-dosing based on unadjusted guidelines
            proved fatal.
          </p>
          <p>
            By establishing an empirical mathematical standard for lean tissue volume based on height and biological sex, physicians
            could reliably administer therapeutic drug volumes, set lung-protective mechanical ventilator tidal volumes (typically 6 to 8 ml/kg of IBW),
            and establish realistic clinical nutrition targets.
          </p>

          
          {/* Interactive Visual Chart / Spectrum */}
          <IdealWeightFormulaChart />

          <h2>The Four Recognized Clinical Formulas</h2>
          <p>
            Over the past six decades, four mathematical regression formulas have emerged as the standard in biomedical research:
          </p>

          <h3>1. The Devine Formula (1974)</h3>
          <p>
            Derived by Dr. Ben J. Devine for medicinal clearance, this equation remains the clinical benchmark throughout North America:
          </p>
          <Formula>
            Men: IBW (kg) = 50.0 kg + 2.3 kg × (Height in inches - 60)
            {"\n"}Women: IBW (kg) = 45.5 kg + 2.3 kg × (Height in inches - 60)
          </Formula>

          <h3>2. The Robinson Formula (1983)</h3>
          <p>
            Dr. J. D. Robinson re-analyzed metropolitan life insurance demographic datasets to produce a modified slope that accounts
            better for average population trends:
          </p>
          <Formula>
            Men: IBW (kg) = 52.0 kg + 1.9 kg × (Height in inches - 60)
            {"\n"}Women: IBW (kg) = 49.0 kg + 1.7 kg × (Height in inches - 60)
          </Formula>

          <h3>3. The Miller Formula (1983)</h3>
          <p>
            Proposed by Dr. D. R. Miller, this formula establishes a higher baseline weight at 5 feet but applies a gentler slope per additional inch:
          </p>
          <Formula>
            Men: IBW (kg) = 56.2 kg + 1.41 kg × (Height in inches - 60)
            {"\n"}Women: IBW (kg) = 53.1 kg + 1.36 kg × (Height in inches - 60)
          </Formula>

          <h3>4. The Hamwi Formula (1964)</h3>
          <p>
            Dr. G. J. Hamwi introduced this formula for clinical dietitians and diabetic meal planning:
          </p>
          <Formula>
            Men: IBW = 106 lbs + 6 lbs for every inch over 5 feet
            {"\n"}Women: IBW = 100 lbs + 5 lbs for every inch over 5 feet
          </Formula>

          <h2>Step-by-Step Practical Calculation: 5'10" Individual</h2>
          <p>
            Consider a <strong>5 foot 10 inch male</strong> (70 inches tall, exactly 10 inches over the 60-inch base):
          </p>
          <ul>
            <li><strong>Step 1: Devine Formula</strong>: 50.0 kg + (2.3 × 10) = 50.0 + 23.0 = <strong>73.0 kg (160.9 lbs)</strong>.</li>
            <li><strong>Step 2: Robinson Formula</strong>: 52.0 kg + (1.9 × 10) = 52.0 + 19.0 = <strong>71.0 kg (156.5 lbs)</strong>.</li>
            <li><strong>Step 3: Miller Formula</strong>: 56.2 kg + (1.41 × 10) = 56.2 + 14.1 = <strong>70.3 kg (155.0 lbs)</strong>.</li>
            <li><strong>Step 4: Hamwi Formula</strong>: 106 lbs + (6 × 10) = 106 + 60 = <strong>166.0 lbs (75.3 kg)</strong>.</li>
            <li><strong>Step 5: Clinical Average Consensus</strong>: (160.9 + 156.5 + 155.0 + 166.0) ÷ 4 = <strong>159.6 lbs (72.4 kg)</strong>.</li>
            <li><strong>Step 6: WHO Normal BMI Span (18.5 – 24.9)</strong>: <strong>129 lbs to 174 lbs</strong> (healthy reference window).</li>
          </ul>

          {/* Graph #2: Interactive visual benchmark with live mouse/touch hover */}
          <h2>Clinical Comparison Table: Ideal Weight Across Heights</h2>
          <p>
            The table below shows the calculated consensus ideal body weight alongside the WHO healthy weight window from our <a href="/calculators/health/bmi-calculator">BMI Calculator</a> for adult heights from 5'2" to 6'2". To assess whether extra pounds are muscle or adiposity, evaluate your composition with our <a href="/calculators/health/body-fat-calculator">Body Fat Calculator</a> or explore somatic proportions using the <a href="/calculators/health/body-shape-calculator">Body Shape Calculator</a>:
          </p>

          <DataTable
            head={["Height", "Devine (Gold Std)", "Robinson", "Hamwi", "WHO Healthy BMI Span (18.5–24.9)"]}
            rows={[
              ["5'2\" (157 cm)", "120.4 lbs (54.6 kg)", "123.0 lbs (55.8 kg)", "118.0 lbs (53.5 kg)", "101 – 136 lbs (45.8 – 61.7 kg)"],
              ["5'4\" (163 cm)", "130.5 lbs (59.2 kg)", "131.4 lbs (59.6 kg)", "130.0 lbs (59.0 kg)", "108 – 145 lbs (49.0 – 65.8 kg)"],
              ["5'6\" (168 cm)", "140.7 lbs (63.8 kg)", "139.8 lbs (63.4 kg)", "142.0 lbs (64.4 kg)", "115 – 155 lbs (52.2 – 70.3 kg)"],
              ["5'8\" (173 cm)", "150.8 lbs (68.4 kg)", "148.2 lbs (67.2 kg)", "154.0 lbs (69.9 kg)", "122 – 164 lbs (55.3 – 74.4 kg)"],
              ["5'10\" (178 cm)", "160.9 lbs (73.0 kg)", "156.5 lbs (71.0 kg)", "166.0 lbs (75.3 kg)", "129 – 174 lbs (58.5 – 78.9 kg)"],
              ["6'0\" (183 cm)", "171.1 lbs (77.6 kg)", "164.9 lbs (74.8 kg)", "178.0 lbs (80.7 kg)", "137 – 184 lbs (62.1 – 83.5 kg)"],
              ["6'2\" (188 cm)", "181.2 lbs (82.2 kg)", "173.3 lbs (78.6 kg)", "190.0 lbs (86.2 kg)", "144 – 194 lbs (65.3 – 88.0 kg)"],
            ]}
            highlight={4}
          />

          <h2>Skeletal Frame Size &amp; Wrist Circumference Adjustment</h2>
          <p>
            Not all individuals of the same height have the same bone structure. Clinical anthropometry uses the ratio of height to wrist circumference
            to classify body frame size:
          </p>
          <ul>
            <li><strong>Small Frame:</strong> Height-to-wrist ratio &gt; 10.4 for men (&gt; 10.9 for women). Deduct 10% from the calculated ideal body weight.</li>
            <li><strong>Medium Frame:</strong> Height-to-wrist ratio 9.6 to 10.4 for men (9.9 to 10.9 for women). Use standard formula weight.</li>
            <li><strong>Large Frame:</strong> Height-to-wrist ratio &lt; 9.6 for men (&lt; 9.9 for women). Add 10% to the calculated ideal body weight.</li>
          </ul>

          <h2>Why Body Composition Trumps the Scale</h2>
          <p>
            While Ideal Body Weight formulas offer a valuable statistical anchor, physical health is primarily governed by
            <strong>body composition</strong>—the ratio of skeletal muscle mass to visceral adipose tissue. Prioritize maintaining
            a waist-to-height ratio under 0.50 and resistance training 3 days per week to support functional longevity over
            obsessing over a single arbitrary number on the scale.
          </p>
        </>
      }
    >
      <IdealWeightCalculator />
    </CalcPage>
  );
}
