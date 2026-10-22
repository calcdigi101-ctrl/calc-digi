import WaistToHeightRatioCalculator from "@/components/calcs/health/waist-to-height-ratio-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { WhtrLongevityRiskCurveChart } from "@/components/flagship/health/editorial-charts/WhtrLongevityRiskCurveChart";

const PATH = "/calculators/health/waist-to-height-ratio-calculator";
const TITLE = "Waist to Height Ratio Calculator – Cardiometabolic Longevity | CalcDigi";
const DESCRIPTION =
  "Calculate your Waist-to-Height Ratio (WHtR) with clinical precision. Screen for visceral adiposity, cardiometabolic risk, and mortality hazard using Dr. Margaret Ashwell's 0.50 threshold.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const ASHWELL_CLASSIFICATION_TABLE = [
  {
    whtrRange: "< 0.35",
    category: "Take Care / Underweight",
    mortalityHazard: "1.25x – 1.40x",
    clinicalImplications: "Increased non-cardiovascular mortality risk; potential sarcopenia, nutritional deficit, or malabsorption.",
    actionPlan: "Comprehensive nutritional evaluation, resistance training, and protein intake optimization.",
  },
  {
    whtrRange: "0.35 – 0.49",
    category: "Healthy Longevity Zone (Optimal)",
    mortalityHazard: "1.00x (Baseline)",
    clinicalImplications: "Lowest all-cause and cardiovascular mortality; minimal visceral intra-abdominal adiposity; ideal glycemic regulation.",
    actionPlan: "Sustained lifestyle maintenance, balanced whole-food nutrition, and 150+ minutes weekly aerobic conditioning.",
  },
  {
    whtrRange: "0.50 – 0.59",
    category: "Consider Action / Increased Risk",
    mortalityHazard: "1.30x – 1.65x",
    clinicalImplications: "Significant intra-abdominal fat accumulation; elevated risk of Type 2 diabetes, essential hypertension, and dyslipidemia.",
    actionPlan: "Targeted abdominal reduction via modest caloric deficit (300–500 kcal/day) and low-glycemic Mediterranean nutrition.",
  },
  {
    whtrRange: "≥ 0.60",
    category: "Take Action / Substantially Increased",
    mortalityHazard: "2.10x – 2.90x",
    clinicalImplications: "Severe visceral adiposity; multiple components of metabolic syndrome; average life expectancy shortened by 4–8 years.",
    actionPlan: "Urgent primary care consultation, comprehensive cardiometabolic blood panel, and structured clinical exercise intervention.",
  },
];

const METRIC_COMPARISON_TABLE = [
  { metric: "Waist-to-Height Ratio (WHtR)", heightAdjusted: "Yes (Direct linear ratio)", genderSpecific: "No (0.50 universal cutoff)", visceralAccuracy: "Highest clinical correlation with visceral adiposity and early mortality.", ethnicityBias: "Lowest (validated across Caucasian, Asian, African, and Hispanic cohorts)." },
  { metric: "Body Mass Index (BMI)", heightAdjusted: "Yes (Height squared)", genderSpecific: "No (Universal 25 / 30 cutoffs)", visceralAccuracy: "Poor — cannot differentiate visceral fat from skeletal muscle mass.", ethnicityBias: "High (underestimates risk in South Asians; overestimates in muscular athletes)." },
  { metric: "Waist Circumference (WC)", heightAdjusted: "No (Absolute measurement)", genderSpecific: "Yes (e.g., >88cm women, >102cm men)", visceralAccuracy: "Moderate — disadvantages naturally tall individuals; underdiagnoses short people.", ethnicityBias: "Requires ethnic-specific regional cutoff modifications." },
  { metric: "Waist-to-Hip Ratio (WHR)", heightAdjusted: "No (Relative to hip breadth)", genderSpecific: "Yes (0.85 women / 0.90 men)", visceralAccuracy: "High — sensitive to fat distribution morphology.", ethnicityBias: "Moderate — hip width skeletal variations can distort central risk." },
];

export default function WaistToHeightRatioPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Waist to Height Ratio Calculator"
      intro="Evaluate your cardiometabolic health and visceral fat accumulation using the universally validated Waist-to-Height Ratio (WHtR). Built on Dr. Margaret Ashwell's landmark clinical meta-analyses."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="\text{WHtR} = \frac{\text{Waist Circumference}}{\text{Standing Height}} \quad (\text{Threshold: } \text{WHtR} < 0.50)"
      related={[
        { href: "/calculators/health/waist-to-hip-ratio-calculator", icon: "📏", name: "Waist-to-Hip" },
        { href: "/calculators/health/body-shape-calculator", icon: "⌛", name: "Body Shape" },
        { href: "/calculators/health/bmi-calculator", icon: "⚖️", name: "BMI Calculator" },
        { href: "/calculators/health/body-fat-calculator", icon: "📊", name: "Body Fat" },
        { href: "/calculators/health/ideal-weight-calculator", icon: "🎯", name: "Ideal Weight" },
        { href: "/calculators/health/blood-pressure-calculator", icon: "❤️", name: "Blood Pressure" },
      ]}
      faq={[
        {
          q: "Why is Waist-to-Height Ratio (WHtR) considered clinically superior to BMI?",
          a: "Body Mass Index (BMI) calculates weight relative to height squared, but it is completely blind to body composition and anatomical fat distribution. A bodybuilder with high muscle mass can be classified as 'obese' by BMI, while a sedentary person with normal weight but dangerous visceral abdominal fat ('skinny-fat' or normal-weight obesity) passes as healthy. WHtR directly measures abdominal circumference where toxic visceral fat concentrates, serving as a vastly superior predictor of cardiovascular disease, Type 2 diabetes, and premature mortality.",
        },
        {
          q: "What is the 'Keep your waist to less than half your height' rule?",
          a: "Formulated by Dr. Margaret Ashwell, former science director of the British Nutrition Foundation, this simple public health rule states that a person's waist circumference should remain under 50% of their standing height (WHtR < 0.50). For a person who is 6 feet (72 inches / 183 cm) tall, the healthy waist ceiling is 36 inches (91.5 cm). For someone who is 5'4\" (64 inches / 162.5 cm) tall, the ceiling is 32 inches (81.3 cm).",
        },
        {
          q: "Does the 0.50 cutoff really work for men, women, and all ethnic groups?",
          a: "Yes. In an extensive 2012 systematic review and meta-analysis of over 300,000 adult participants across multiple countries published in Obesity Reviews, Dr. Ashwell demonstrated that the 0.50 WHtR threshold exhibits consistent diagnostic power across Caucasian, East Asian, South Asian, African-Caribbean, and Hispanic cohorts, without requiring sex-specific or race-adjusted correction factors.",
        },
        {
          q: "Where exactly should I measure my waist for an accurate WHtR calculation?",
          a: "According to World Health Organization (WHO) and National Institutes of Health (NIH) protocols, measure your waist at the midpoint between the lower margin of the last palpable rib and the top of the iliac crest (hip bone). In practice, this corresponds to approximately 1 inch above the belly button. Measure against bare skin at the end of a normal, relaxed exhalation without sucking in your abdomen.",
        },
        {
          q: "What happens to life expectancy when WHtR rises above 0.60?",
          a: "Epidemiological modeling shows that exceeding a WHtR of 0.60 carries a dramatic increase in mortality hazard. A 30-year-old non-smoking man with a WHtR of 0.60 to 0.70 loses an estimated 5.5 to 8.2 years of life expectancy compared to a peer with a WHtR of 0.45, primarily driven by accelerated coronary atherosclerosis, stroke, and diabetic microvascular damage.",
        },
        {
          q: "How quickly can I reduce my waist-to-height ratio through lifestyle changes?",
          a: "Visceral intra-abdominal fat is metabolically more active and responsive to lipolysis than subcutaneous fat. Adopting a moderate caloric deficit (300–500 kcal/day), eliminating liquid sugars and refined grains, and accumulating 150 minutes of weekly Zone 2 cardiovascular exercise can reduce waist circumference by 1 to 2 inches (2.5–5 cm) within 8 to 12 weeks, rapidly lowering your WHtR into the healthy longevity zone.",
        },
      ]}
    >
      <WaistToHeightRatioCalculator />

      <article className="prose dark:prose-invert max-w-none space-y-12 mt-12">
        {/* Clinical Byline */}
        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Cardiometabolic &amp; Longevity Review:</span> Calibrated to Dr. Margaret Ashwell&apos;s meta-analytic standards (Ashwell et al., 2012) and the UK National Institute for Health and Care Excellence (NICE guideline CG189).
          </div>
          <div className="text-slate-500 whitespace-nowrap">Updated: Q4 2026 • Peer-Reviewed Clinical Standards</div>
        </div>

        {/* Section 1: The Ashwell Paradigm */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Ashwell Paradigm: Why Waist-to-Height Outperforms BMI
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            For nearly two centuries, medicine has relied upon Adolphe Quetelet&apos;s 1832 Body Mass Index (BMI = weight / height²) as the primary surrogate for human adiposity. Yet modern cardiovascular pathology has revealed that <em>where</em> body fat is stored is infinitely more consequential than <em>how much</em> total mass a person carries.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In 2012, Dr. Margaret Ashwell conducted a landmark systematic review spanning over 300,000 subjects across 14 global populations. Her findings unequivocally demonstrated that <strong>Waist-to-Height Ratio (WHtR)</strong> is significantly more effective at detecting cardiometabolic risk factors (hypertension, dyslipidemia, insulin resistance, and coronary atherosclerosis) than BMI or standalone waist circumference. This led to the adoption of the universal clinical axiom: <em>&quot;Keep your waist circumference to less than half your height.&quot;</em>
          </p>
        </section>

        {/* Section 2: Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Longevity Risk &amp; Mortality Hazard Curve
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              Interactive Model
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Explore the U-shaped epidemiological risk curve linking Waist-to-Height Ratio with relative all-cause mortality hazard. Scrub across the values to observe disease progression, diabetes hazard multipliers, and the clinical threshold at 0.50:
          </p>
          <WhtrLongevityRiskCurveChart />
        </section>

        {/* Section 3: Ashwell Classification Standards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Four Clinical Ashwell Stratification Zones
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Clinical protocols divide WHtR into four evidence-based health action tiers:
          </p>
          <DataTable
            head={["WHtR Ratio Range", "Clinical Classification", "All-Cause Mortality Hazard", "Pathophysiological Profile", "Recommended Clinical Protocol"]}
            rows={ASHWELL_CLASSIFICATION_TABLE.map((row) => [
              <strong key={row.whtrRange} className="text-slate-900 dark:text-slate-100">{row.whtrRange}</strong>,
              row.category,
              row.mortalityHazard,
              row.clinicalImplications,
              row.actionPlan,
            ])}
          />
        </section>

        {/* Section 4: Anthropometric Comparison Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Head-to-Head Comparison: WHtR vs. BMI vs. Waist vs. WHR
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Understanding how WHtR resolves the historical blind spots of traditional anthropometric screening metrics:
          </p>
          <DataTable
            head={["Anthropometric Metric", "Height Standardized?", "Sex Invariant?", "Visceral Sensitivity", "Ethnic Portability"]}
            rows={METRIC_COMPARISON_TABLE.map((row) => [
              <strong key={row.metric} className="text-slate-900 dark:text-slate-100">{row.metric}</strong>,
              row.heightAdjusted,
              row.genderSpecific,
              row.visceralAccuracy,
              row.ethnicityBias,
            ])}
          />
        </section>

        {/* Section 5: Standardized Clinical Measurement Protocol */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Clinical Measurement Protocol: WHO / NIH Guidelines
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            To ensure diagnostic accuracy and avoid measurement artifacts, follow the standardized World Health Organization protocol:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Anatomical Positioning:</strong> Stand erect with feet shoulder-width apart, arms relaxed at the sides, and weight evenly distributed across both feet.
            </li>
            <li>
              <strong>Landmark Identification:</strong> Palpate the inferior border of the 12th rib and the superior crest of the ilium (hip bone). Position the tape measure horizontally at the exact midpoint (typically 1 inch / 2.5 cm above the umbilicus).
            </li>
            <li>
              <strong>Tape Tension:</strong> Keep the tape snug and perfectly horizontal around the torso without indenting or compressing the subcutaneous adipose tissue.
            </li>
            <li>
              <strong>Respiratory Phase:</strong> Take two gentle, normal breaths. Record the measurement at the exact end of normal expiration (functional residual capacity), ensuring the participant does not actively suck in or distend the abdomen.
            </li>
          </ol>
        </section>
      
        
        {/* Visceral Fat Biology & The Universal 0.50 Threshold */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Visceral Adiposity Biology &amp; The Universal 0.50 Boundary Standard
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The Waist-to-Height Ratio (WHtR) provides an elegant, boundary-defying assessment of central visceral adiposity. Systematic reviews published in <em>Obesity Reviews</em> involving over 300,000 adult participants demonstrate that WHtR is significantly superior to Body Mass Index (BMI) in discriminating hypertension, dyslipidemia, metabolic syndrome, and cardiovascular disease risk. Unlike subcutaneous peripheral fat, visceral abdominal fat wraps tightly around the mesenteric organs, acting as an active inflammatory endocrine organ.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">The Pro-Inflammatory Adipokine Secretome</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Hypertrophied visceral adipocytes recruit pro-inflammatory M1 macrophages that secrete tumor necrosis factor-alpha (TNF-alpha), interleukin-6 (IL-6), and plasminogen activator inhibitor-1 (PAI-1). Concurrently, visceral fat suppresses cardioprotective adiponectin and elevates asymmetric dimethylarginine (ADMA), an endogenous inhibitor of endothelial nitric oxide synthase, driving arterial stiffness and microvascular endothelial dysfunction.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Pediatric Early Warning Utility</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                In children and adolescents aged 5 to 18, WHtR provides an immediate, non-invasive early warning for subclinical cardiovascular risk factors. Children with a WHtR &gt; 0.50 exhibit significantly elevated arterial stiffness, carotid intima-media thickness (cIMT), and elevated fasting insulin. The universal rule &quot;Keep your waist to less than half your height&quot; applies seamlessly without needing complex age-and-sex growth charts.
              </p>
            </div>
          </div>
          <h2>Actionable Strategies for Visceral Circumference Reduction</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Targeting visceral fat requires specific nutritional and metabolic stimuli that activate beta-adrenergic lipolytic pathways:
          </p>
          <ul>
            <li><strong>Zone 2 Cardiovascular Base Training:</strong> Performing 150 minutes of steady-state aerobic conditioning weekly stimulates fat oxidation and preferentially mobilizes visceral adipose stores.</li>
            <li><strong>Eliminate High-Fructose Liquid Sugars:</strong> Fructose is metabolized directly by the liver via fructokinase, bypassing rate-limiting phosphofructokinase control and accelerating de novo lipogenesis. Eliminating liquid sugars produces rapid reductions in waist circumference.</li>
            <li><strong>Soluble Viscous Dietary Fiber:</strong> Consuming 25 to 35 grams of daily dietary fiber (oats, legumes, flaxseed, psyllium) slows carbohydrate gastric emptying and feeds colonic anaerobic bacteria that synthesize anti-inflammatory short-chain fatty acids (acetate, propionate, butyrate).</li>
            <li><strong>Circadian Sleep Hygiene:</strong> Chronically elevated nocturnal cortisol promotes preferential visceral adipose deposition. Maintaining 7 to 9 hours of restorative sleep normalizes glucocorticoid rhythms.</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Measure waist circumference consistently at the midpoint between the lower palpable rib margin and the top of the iliac crest at the end of normal expiration.
          </p>
        </section>

        
          <h2>Longitudinal Monitoring &amp; Visceral Reduction Guidelines</h2>
          <p>
            Monitoring Waist-to-Height Ratio over time provides an objective assessment of cardiometabolic health independent of scale weight:
          </p>
          <ul>
            <li><strong>Consistent Measurement Protocol:</strong> Measure circumference at the natural midpoint between your lower palpable rib and the iliac crest at the end of a normal, unforced expiration. Avoid sucking in the stomach or compressing soft tissue.</li>
            <li><strong>Prioritizing Aerobic &amp; Strength Synergy:</strong> Combining 150 minutes of weekly Zone 2 aerobic exercise with 3 sessions of full-body resistance training preferentially burns visceral fat reserves while building metabolic lean muscle.</li>
            <li><strong>Limiting Refined Liquid Sugars:</strong> High-fructose corn syrup and sugary beverages stimulate hepatic de novo lipogenesis, directly depositing fat into visceral and liver depots. Eliminating liquid sugars produces rapid reductions in waist circumference.</li>
            <li><strong>Stress &amp; Cortisol Management:</strong> Chronic psychological distress elevates nocturnal cortisol, promoting preferential visceral adipose deposition. Prioritizing 7 to 9 hours of restorative sleep blunts stress-induced central fat storage.</li>
          </ul>
          <p>
            Strive to keep your waist circumference below half your height ($WHtR &lt; 0.50$) to safeguard long-term vascular and metabolic health.
          </p>


        
          <h2>Pediatric Screening &amp; Universal Clinical Utility</h2>
          <p>
            Waist-to-Height Ratio has emerged as the premier non-invasive anthropometric screening tool across all age demographics. While BMI in children requires complex age-and-sex-specific percentile growth charts, the simple threshold &quot;Keep your waist to less than half your height&quot; (WHtR &lt; 0.50) applies consistently to children, adolescents, adults, and geriatric populations.
          </p>
          <p>
            Pediatric clinical trials confirm that children with a WHtR &gt; 0.50 exhibit elevated carotid intima-media thickness, elevated fasting insulin, and increased left ventricular mass. Monitoring WHtR provides parents and pediatricians with an early, accessible marker for cardiometabolic intervention long before adult vascular damage occurs.
          </p>


        
          <h2>Omental Adiposity &amp; Hepatic Insulin Resistance</h2>
          <p>
            Excess abdominal circumference reflects both subcutaneous fat beneath the skin and intra-abdominal visceral fat located within the greater omentum and mesentery. Visceral adipocytes are hyper-lipolytic and resistant to insulin&apos;s anti-lipolytic effects.
          </p>
          <p>
            The unesterified free fatty acids released by visceral fat drain directly into the hepatic portal circulation, flooding the liver and impairing insulin clearance. This lipotoxicity triggers hepatic steatosis, dyslipidemia, and systemic vascular inflammation long before total body weight exceeds traditional clinical thresholds.
          </p>

        {/* Related Companion Tools Contextual Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Clinical &amp; Metabolic Companion Tools</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Waist-to-height ratio is recognized by cardiologists and the NICE guidelines as a superior cardiometabolic screener. Combine WHtR with regional fat distribution from the <a href="/calculators/health/waist-to-hip-ratio-calculator">Waist-to-Hip Ratio Calculator</a>, evaluate total adipose percentage with the <a href="/calculators/health/body-fat-calculator">Body Fat Calculator</a>, review silhouette classification with the <a href="/calculators/health/body-shape-calculator">Body Shape Calculator</a>, and calculate traditional height-weight status using our <a href="/calculators/health/bmi-calculator">BMI Calculator</a>.
          </p>
        </section>
      </article>
    </CalcPage>
  );
}
