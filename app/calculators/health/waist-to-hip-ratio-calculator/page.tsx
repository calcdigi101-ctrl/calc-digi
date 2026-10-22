import WaistToHipRatioCalculator from "@/components/calcs/health/waist-to-hip-ratio-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { WhrCardiovascularRiskChart } from "@/components/flagship/health/editorial-charts/WhrCardiovascularRiskChart";

const PATH = "/calculators/health/waist-to-hip-ratio-calculator";
const TITLE = "Waist to Hip Ratio Calculator – WHO Cardiovascular Risk | CalcDigi";
const DESCRIPTION =
  "Calculate your Waist-to-Hip Ratio (WHR) and evaluate cardiovascular disease risk, myocardial infarction hazard, and android vs. gynoid fat distribution using WHO standards.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const WHO_WHR_STANDARDS_TABLE = [
  {
    riskTier: "Low Cardiometabolic Risk",
    femaleCutoff: "≤ 0.80",
    maleCutoff: "≤ 0.90",
    heartAttackOdds: "1.00x (Baseline reference)",
    clinicalProfile: "Predominance of subcutaneous gluteofemoral adipose tissue; high circulating adiponectin; preserved vascular endothelial compliance.",
  },
  {
    riskTier: "Moderate Risk / Transitional Zone",
    femaleCutoff: "0.81 – 0.84",
    maleCutoff: "0.91 – 0.99",
    heartAttackOdds: "1.35x – 1.70x Elevated",
    clinicalProfile: "Early intra-abdominal fat accumulation; slight elevation in fasting triglycerides and high-sensitivity C-reactive protein (hs-CRP).",
  },
  {
    riskTier: "High Risk / Android Obesity Cutoff",
    femaleCutoff: "≥ 0.85",
    maleCutoff: "≥ 1.00 (≥ 0.95 AHA)",
    heartAttackOdds: "2.10x – 3.80x Elevated",
    clinicalProfile: "Substantial visceral adiposity; portal vein free fatty acid flooding; high incidence of metabolic syndrome, atherosclerosis, and NAFLD.",
  },
];

const ANATOMICAL_COMPARTMENT_TABLE = [
  { compartment: "Intra-Abdominal Visceral Fat (VAT)", anatomicalLocation: "Omental and mesenteric spaces surrounding liver, pancreas, intestines.", metabolicBehavior: "High lipolysis rate, resistant to insulin suppression, drains directly into hepatic portal vein.", biomarkers: "Elevates IL-6, TNF-alpha, PAI-1, ApoB, and lowers protective adiponectin." },
  { compartment: "Gluteofemoral Subcutaneous Fat (SAT)", anatomicalLocation: "Hips, buttocks, and upper thighs underneath dermis.", metabolicBehavior: "Slow fatty acid release; acts as an irreversible lipid buffer and energy sink.", biomarkers: "Abundantly secretes cardioprotective adiponectin, enhancing whole-body insulin sensitivity." },
  { compartment: "Abdominal Subcutaneous Fat", anatomicalLocation: "Trunk subcutaneous layer anterior to abdominal muscular wall.", metabolicBehavior: "Intermediate metabolic activity; cosmetic concern but less atherogenic than VAT.", biomarkers: "Mild contribution to systemic leptin and free fatty acids." },
];

export default function WaistToHipRatioPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Waist to Hip Ratio Calculator"
      intro="Accurately compute your Waist-to-Hip Ratio (WHR) and assess central visceral adiposity and cardiovascular disease vulnerability according to World Health Organization (WHO) epidemiological benchmarks."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="\text{WHR} = \frac{\text{Waist Circumference}}{\text{Hip Circumference}} \quad (\text{WHO Android Threshold: } \ge 0.85 \text{ female},\, \ge 0.95 \text{ male})"
      related={[
        { href: "/calculators/health/waist-to-height-ratio-calculator", icon: "📐", name: "Waist-to-Height" },
        { href: "/calculators/health/body-shape-calculator", icon: "⌛", name: "Body Shape" },
        { href: "/calculators/health/bmi-calculator", icon: "⚖️", name: "BMI Calculator" },
        { href: "/calculators/health/body-fat-calculator", icon: "📊", name: "Body Fat" },
        { href: "/calculators/health/blood-pressure-calculator", icon: "❤️", name: "Blood Pressure" },
        { href: "/calculators/health/ideal-weight-calculator", icon: "🎯", name: "Ideal Weight" },
      ]}
      faq={[
        {
          q: "What is a healthy Waist-to-Hip Ratio (WHR) according to the WHO?",
          a: "The World Health Organization (WHO) defines a healthy, low-risk WHR as 0.80 or lower for women, and 0.90 or lower for men. WHR values exceeding 0.85 in females and 0.95 to 1.00 in males indicate central (android) adiposity and signify a substantially elevated risk of myocardial infarction, stroke, and Type 2 diabetes.",
        },
        {
          q: "Why was WHR proven to be superior to BMI in the INTERHEART study?",
          a: "The landmark INTERHEART trial (Lancet 2005) investigated 27,098 subjects across 52 nations to establish global heart attack risk factors. The researchers found that Waist-to-Hip Ratio was the single strongest anthropometric predictor of myocardial infarction across every continent and ethnic background (with an odds ratio of 2.67 in the highest quintile). In contrast, Body Mass Index (BMI) lost its predictive statistical power after adjusting for WHR, proving that fat distribution is far more dangerous than total weight.",
        },
        {
          q: "What is the difference between Android ('Apple') and Gynoid ('Pear') fat distribution?",
          a: "Android fat distribution concentrates adipose tissue centrally within the abdominal cavity and trunk ('apple shape'). Gynoid fat distribution concentrates fat around the hips, buttocks, and upper thighs ('pear shape'). Android fat is driven by cortisol and low estrogen/testosterone balance and poses severe cardiometabolic danger. Gynoid fat is mediated by estrogen and is cardioprotective.",
        },
        {
          q: "How exactly do I measure waist and hip circumference for WHR?",
          a: "For the waist: Measure at the narrowest circumference between your lowest rib and iliac crest (usually 1 inch above the belly button) at the end of a gentle exhalation. For the hips: Stand with feet together and measure around the widest prominence of the buttocks and greater trochanters of the femur. Ensure the tape is level with the floor.",
        },
        {
          q: "Can two people have the same BMI but completely different WHR risk?",
          a: "Yes, this is common. An individual with a BMI of 23.5 (classified as 'normal weight') can have a high WHR of 0.89 with significant visceral fat and fatty liver disease (metabolically obese normal weight, or MONW). Conversely, an athletic individual with a BMI of 27.0 ('overweight') can have a WHR of 0.74 with broad hips, lean waist, and zero cardiometabolic risk.",
        },
        {
          q: "How can I lower my Waist-to-Hip Ratio most effectively?",
          a: "Targeting visceral fat requires a comprehensive metabolic strategy: 1) Eliminate refined sugars, fructose-sweetened beverages, and ultra-processed carbohydrates; 2) Accumulate 150 to 300 minutes weekly of Zone 2 cardiovascular training to optimize fat oxidation; 3) Engage in heavy compound resistance training (squats, deadlifts, presses) 3 days weekly; and 4) Prioritize 7 to 9 hours of quality sleep to suppress nocturnal cortisol spikes.",
        },
      ]}
    >
      <WaistToHipRatioCalculator />

      <article className="prose dark:prose-invert max-w-none space-y-12 mt-12">
        {/* Clinical Byline */}
        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Cardiovascular Epidemiology Review:</span> Calibrated to World Health Organization (WHO) Technical Report Series 916 and the 52-nation INTERHEART trial standards (Lancet).
          </div>
          <div className="text-slate-500 whitespace-nowrap">Updated: Q4 2026 • Verified Epidemiological Standards</div>
        </div>

        {/* Section 1: The INTERHEART Landmark Trial */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The INTERHEART Trial: Dismantling the Primacy of BMI
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In 2005, Dr. Salim Yusuf and international colleagues published the results of the <strong>INTERHEART study</strong> in <em>The Lancet</em>. Enrolling 27,098 individuals across 52 countries on six continents, INTERHEART remains the most authoritative investigation ever conducted on modifiable risk factors for acute myocardial infarction (heart attack).
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The study revealed a stark clinical finding: when evaluated alongside Waist-to-Hip Ratio, Body Mass Index (BMI) ceased to be an independent predictor of coronary events. WHR emerged as one of the top three global modifiable risk factors (alongside smoking and abnormal ApoB/ApoA1 lipid ratios), demonstrating that an elevated waist-to-hip ratio more than doubles heart attack risk regardless of age, sex, or ethnic geography.
          </p>
        </section>

        {/* Section 2: Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Myocardial Infarction Odds Ratio Curve
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              Interactive Model
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Examine how escalating Waist-to-Hip Ratios exponentially amplify myocardial infarction odds and Type 2 diabetes risk. Toggle between male and female curves and scrub along the axis to inspect clinical inflection points:
          </p>
          <WhrCardiovascularRiskChart />
        </section>

        {/* Section 3: WHO Standards Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            World Health Organization (WHO) Diagnostic Thresholds
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The World Health Organization stratifies cardiometabolic and vascular risk based upon specific gender-specific cutoffs:
          </p>
          <DataTable
            head={["Cardiometabolic Risk Tier", "Female Cutoff (WHR)", "Male Cutoff (WHR)", "Heart Attack Odds (INTERHEART)", "Vascular & Endocrine Profile"]}
            rows={WHO_WHR_STANDARDS_TABLE.map((row) => [
              <strong key={row.riskTier} className="text-slate-900 dark:text-slate-100">{row.riskTier}</strong>,
              row.femaleCutoff,
              row.maleCutoff,
              row.heartAttackOdds,
              row.clinicalProfile,
            ])}
          />
        </section>

        {/* Section 4: The Portal Hypothesis */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Portal Vein Hypothesis: Why Visceral Fat Is Cardiotoxic
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The extreme hazard of an elevated WHR lies in the unique vascular anatomy connecting intra-abdominal fat to the liver—a mechanism known in hepatology as the <strong>Portal Hypothesis</strong>:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Direct Hepatic Steatosis</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Unlike subcutaneous fat, which drains into the systemic vena cava, visceral adipose tissue drains directly into the hepatic portal vein. When visceral fat expands, it floods the liver with non-esterified free fatty acids (NEFAs), triggering hepatic steatosis, impairing insulin clearance, and driving excessive VLDL and ApoB triglyceride synthesis.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Cytokine-Driven Endothelial Injury</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Hypertrophic visceral adipocytes recruit pro-inflammatory M1 macrophages, unleashing a storm of Interleukin-6 (IL-6), Tumor Necrosis Factor-alpha (TNF-α), and Plasminogen Activator Inhibitor-1 (PAI-1). These inflammatory mediators damage coronary endothelial lining and promote acute thrombotic plaque rupture.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Comparative Anatomy Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Adipose Compartments: Visceral vs. Gluteofemoral Biology
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            A comprehensive look at why gluteofemoral hip fat provides cardiovascular protection, while abdominal waist fat causes systemic harm:
          </p>
          <DataTable
            head={["Adipose Tissue Depot", "Primary Anatomical Loci", "Lipolytic & Metabolic Behavior", "Endocrine Biomarkers"]}
            rows={ANATOMICAL_COMPARTMENT_TABLE.map((row) => [
              <strong key={row.compartment} className="text-slate-900 dark:text-slate-100">{row.compartment}</strong>,
              row.anatomicalLocation,
              row.metabolicBehavior,
              row.biomarkers,
            ])}
          />
        </section>
      
        
        {/* Visceral Pathophysiology & Ethnic WHR Criteria */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Pathophysiology of Visceral Adiposity &amp; Ethnic WHR Thresholds
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Unlike peripheral subcutaneous adipose tissue deposited around the thighs and gluteal region, deep visceral adipose tissue surrounding the mesenteric and omental organs drains directly into the hepatic portal system. This delivers high concentrations of unesterified free fatty acids directly to the liver, driving hepatic steatosis, elevated very-low-density lipoproteins (VLDL), and peripheral insulin receptor downregulation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Ethnic-Specific Cutoffs (WHO / IDF)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                The International Diabetes Federation (IDF) and WHO note that South Asian, East Asian, and Indigenous populations exhibit greater visceral fat deposition and metabolic syndrome onset at lower absolute WHR thresholds (&gt;0.85 for men, &gt;0.80 for women) compared to European cohorts, requiring earlier clinical screening.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Metabolic Syndrome Diagnostic Criteria (ATP III)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                According to the NCEP ATP III guidelines, central adiposity measured via waist circumference and WHR serves as the primary gateway criterion for metabolic syndrome, defined by central adiposity plus any two of: fasting triglycerides &ge; 150 mg/dL, HDL &lt; 40 mg/dL (men) or &lt; 50 mg/dL (women), blood pressure &ge; 130/85 mmHg, or fasting glucose &ge; 100 mg/dL.
              </p>
            </div>
          </div>
          <h2>Actionable Strategies for Visceral Circumference Reduction</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Targeting visceral fat requires specific nutritional and metabolic stimuli that activate beta-adrenergic lipolytic pathways:
          </p>
          <ul>
            <li><strong>Zone 2 Cardiovascular Base Training:</strong> Performing 30 to 45 minutes of steady aerobic exercise 3 to 4 times weekly stimulates fat oxidation and preferentially mobilizes visceral adipose stores.</li>
            <li><strong>Progressive Resistance Training:</strong> Building full-body muscle mass enhances whole-body insulin sensitivity, directing ingested calories into muscle glycogen stores rather than visceral fat.</li>
            <li><strong>Eliminate Refined Sugars &amp; Ultra-Processed Foods:</strong> High-fructose corn syrup and trans fats accelerate visceral fat deposition. Focus on whole foods, lean proteins, and complex fiber-rich carbohydrates.</li>
            <li><strong>Sleep &amp; Stress Management:</strong> Chronically elevated cortisol promotes visceral fat storage around abdominal organs. Maintain 7 to 9 hours of quality sleep to normalize glucocorticoid rhythms.</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Measure waist and hip circumferences once every month under standardized morning conditions to evaluate genuine body recomposition.
          </p>
        </section>

        
          <h2>Targeted Action Plan for Visceral Fat Reduction</h2>
          <p>
            Reduce central waist circumference and optimize Waist-to-Hip Ratio with these clinical lifestyle strategies:
          </p>
          <ul>
            <li><strong>Zone 2 Cardiovascular Base Training:</strong> Performing 30 to 45 minutes of steady aerobic exercise 3 to 4 times weekly stimulates fat oxidation and preferentially mobilizes visceral adipose stores.</li>
            <li><strong>Progressive Resistance Training:</strong> Building full-body muscle mass enhances whole-body insulin sensitivity, directing ingested calories into muscle glycogen stores rather than visceral fat.</li>
            <li><strong>Eliminate Refined Sugars &amp; Ultra-Processed Foods:</strong> High-fructose corn syrup and trans fats accelerate visceral fat deposition. Focus on whole foods, lean proteins, and complex fiber-rich carbohydrates.</li>
            <li><strong>Sleep &amp; Stress Management:</strong> Chronically elevated cortisol promotes visceral fat storage around abdominal organs. Maintain 7 to 9 hours of quality sleep to normalize glucocorticoid rhythms.</li>
          </ul>
          <p>
            Measure waist and hip circumferences once every month under standardized morning conditions to evaluate genuine body recomposition.
          </p>


        
          <h2>Cardiometabolic Risk Profiling &amp; Portal Vein Dynamics</h2>
          <p>
            Visceral abdominal fat drains directly into the hepatic portal vein, delivering high concentrations of unesterified free fatty acids to the liver. This stimulates excessive hepatic triglyceride synthesis and drives non-alcoholic fatty liver disease (NAFLD), systemic insulin resistance, and elevated C-reactive protein (CRP).
          </p>
          <p>
            Monitoring your Waist-to-Hip Ratio monthly provides an accurate, early-warning assessment of visceral reduction that is far more clinically predictive of cardiovascular health than scale weight alone.
          </p>


        {/* Related Companion Tools Contextual Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Clinical &amp; Metabolic Companion Tools</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Waist-to-hip measurements pinpoint android versus gynoid adiposity and metabolic syndrome risk. Pair WHR evaluation with the <a href="/calculators/health/waist-to-height-ratio-calculator">Waist-to-Height Ratio Calculator</a>, classify your physical silhouette using the <a href="/calculators/health/body-shape-calculator">Body Shape Calculator</a>, assess systemic blood pressure with the <a href="/calculators/health/blood-pressure-calculator">Blood Pressure Calculator</a>, and track total body fat via our <a href="/calculators/health/body-fat-calculator">Body Fat Calculator</a>.
          </p>
        </section>
      </article>
    </CalcPage>
  );
}
