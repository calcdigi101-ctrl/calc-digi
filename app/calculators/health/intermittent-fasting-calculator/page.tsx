import IntermittentFastingCalculator from "@/components/calcs/health/intermittent-fasting-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { FastingAutophagySpectrumChart } from "@/components/flagship/health/editorial-charts/FastingAutophagySpectrumChart";

const PATH = "/calculators/health/intermittent-fasting-calculator";
const TITLE = "Intermittent Fasting Calculator";
const DESCRIPTION =
  "Calculate your exact fasting and eating windows for 16:8, 18:6, 20:4, and OMAD. Track autophagy onset, ketosis timelines, insulin reset, and circadian meal.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const PROTOCOL_COMPARISON_TABLE = [
  {
    protocol: "16:8 Protocol (Leangains)",
    fastHours: "16 hours",
    eatHours: "8 hours",
    autophagyLevel: "Moderate (initiates around hr 14–16)",
    bestFor: "Beginners, sustainable daily lifestyle, body recomposition, and moderate fat loss.",
  },
  {
    protocol: "18:6 Protocol (Intermediate)",
    fastHours: "18 hours",
    eatHours: "6 hours",
    autophagyLevel: "High (3–4 hours of sustained autophagy)",
    bestFor: "Overcoming weight-loss plateaus, accelerating hepatic fat oxidation, and deeper ketosis.",
  },
  {
    protocol: "20:4 Protocol (The Warrior Diet)",
    fastHours: "20 hours",
    eatHours: "4 hours",
    autophagyLevel: "Very High (6+ hours of intense cellular recycling)",
    bestFor: "Advanced fasters, significant insulin sensitivity reset, and evening banquet lifestyle.",
  },
  {
    protocol: "23:1 / OMAD (One Meal A Day)",
    fastHours: "23 hours",
    eatHours: "1 hour",
    autophagyLevel: "Peak Physiological Autophagy",
    bestFor: "Experienced practitioners, maximal time efficiency, rapid caloric restriction.",
  },
  {
    protocol: "14:10 Circadian Protocol",
    fastHours: "14 hours",
    eatHours: "10 hours",
    autophagyLevel: "Mild / Baseline",
    bestFor: "Individuals with high adrenal stress, endurance athletes, or first-time fasters.",
  },
];

const FASTING_COMPLIANCE_TABLE = [
  { substance: "Plain Water (Still or Sparkling)", fastImpact: "Completely Compliant", physiologicalNotes: "Essential for blood volume and cellular hydration. Zero calories, zero insulin response." },
  { substance: "Black Coffee (No Milk/Sugar)", fastImpact: "Completely Compliant", physiologicalNotes: "Polyphenols in coffee stimulate autophagy in liver and muscle tissue; caffeine boosts lipolysis." },
  { substance: "Plain Green or Herbal Tea", fastImpact: "Completely Compliant", physiologicalNotes: "EGCG catechins enhance hepatic lipid oxidation and offer neuroprotective antioxidant support." },
  { substance: "Non-Caloric Electrolytes (Na/K/Mg)", fastImpact: "Completely Compliant", physiologicalNotes: "Prevents 'keto flu', headaches, and orthostatic dizziness from natriuresis of fasting." },
  { substance: "Cream, Milk, or Sugar", fastImpact: "Breaks Fast Immediately", physiologicalNotes: "Lactose and fat stimulate gastric enzymes and trigger hepatic insulin secretion." },
  { substance: "Diet Sodas / Artificial Sweeteners", fastImpact: "Mixed / Cephalic Phase Risk", physiologicalNotes: "While zero calorie, sweet taste receptors on the tongue can trigger anticipatory insulin spikes." },
];

export default function IntermittentFastingPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Intermittent Fasting Calculator"
      intro="Determine your precise fasting and eating windows for 16:8, 18:6, 20:4 Warrior, and OMAD schedules. Calibrated to cellular autophagy biology, circadian metabolic rhythms, and hepatic glycogen depletion."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="\text{Feeding Window} = [T_{\text{start}},\, T_{\text{start}} + \text{Hours}_{\text{eat}}] \pmod{24}"
      related={[
        { href: "https://www.calcdigi.com/calculators/health/bmi-calculator", icon: "⚖️", name: "BMI Calculator (Body Mass Index)" },
        { href: "https://www.calcdigi.com/calculators/health/calorie-calculator", icon: "🥗", name: "Calorie Calculator" },
        { href: "https://www.calcdigi.com/calculators/health/tdee-calculator", icon: "⚡", name: "TDEE Calculator (Daily Calorie Needs)" },
        { href: "https://www.calcdigi.com/calculators/health/bmr-calculator", icon: "🔥", name: "BMR Calculator (Basal Metabolic Rate)" },
      ]} article={
        <>

        {/* Clinical Byline */}
        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Endocrinology &amp; Circadian Biology Review:</span> Calibrated to Salk Institute time-restricted eating models (Panda Lab), Yoshinori Ohsumi Nobel autophagy pathways, and AMPK/mTOR metabolic signaling.
          </div>
          <div className="text-slate-500 break-words leading-relaxed">Updated: Q4 2026 • Verified Scientific Standards</div>
        </div>

        {/* Section 1: The Bioenergetic Switch */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Bioenergetic Switch: From Glucose Utilization to Ketosis
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In ancestral human biology, constant access to three macronutrient-dense meals and continuous snacking was virtually non-existent. Our physiological architecture evolved to cycle between two distinct bioenergetic states: the <strong>anabolic fed state</strong> (governed by insulin and mTOR) and the <strong>catabolic fasting state</strong> (governed by glucagon, AMPK, and sirtuins).
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Upon ingesting food, circulating blood glucose spikes, triggering pancreatic beta-cells to secrete insulin. Insulin facilitates glucose uptake into skeletal muscle and liver cells, converting excess substrate into glycogen while halting all intracellular lipolysis. After 10 to 12 hours without caloric intake, liver glycogen stores drop by over 50%. The body executes the <em>metabolic switch</em>: shifting from glucose utilization to hepatic beta-oxidation of adipose-derived fatty acids, producing beta-hydroxybutyrate (BHB) and acetoacetate ketone bodies to fuel the brain and vital organs.
          </p>
        </section>

        {/* Section 2: Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Autophagy, Ketosis &amp; Hormonal Timeline
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
              Interactive Model
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Follow the physiological cascade across 0 to 48 hours of unbroken fasting. Touch or drag along the timeline to observe exact percentages of cellular autophagy activation, ketone generation, and the precipitous decline of circulating insulin:
          </p>
          <FastingAutophagySpectrumChart />
        </section>

        {/* Section 3: Popular Fasting Protocols Analyzed */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Comparative Analysis of Intermittent Fasting Protocols
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Different intermittent fasting protocols yield varied physiological adaptations depending on duration, lifestyle integration, and clinical objectives:
          </p>
          <DataTable
            head={["Protocol Name", "Fasting Period", "Feeding Window", "Autophagy Potential", "Target Clinical Profile & Feasibility"]}
            rows={PROTOCOL_COMPARISON_TABLE.map((row) => [
              <strong key={row.protocol} className="text-slate-900 dark:text-slate-100">{row.protocol}</strong>,
              row.fastHours,
              row.eatHours,
              row.autophagyLevel,
              row.bestFor,
            ])}
          />
        </section>

        {/* Section 4: Autophagy Mechanisms and Nobel Science */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Nobel Science of Autophagy: Intracellular Quality Control
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Awarded the 2016 Nobel Prize in Physiology or Medicine, Dr. Yoshinori Ohsumi elucidated the precise genetic machinery governing <strong>autophagy</strong>. In a state of nutrient surplus, the central cell growth regulator—<strong>Mechanistic Target of Rapamycin (mTOR)</strong>—remains continuously active, inhibiting autophagosome formation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">AMPK Kinase Activation</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                As ATP depletes into AMP during a fast, the enzyme 5&apos; AMP-activated protein kinase (AMPK) detects the cellular energy deficit. AMPK phosphorylates the ULK1 complex, shutting down mTOR and initiating the engulfment of damaged mitochondria (mitophagy) and aggregated toxic proteins.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Lysosomal Proteolysis</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                The mature autophagosome fuses with an intracellular lysosome. Acid hydrolase enzymes break down the dysfunctional proteins into constituent amino acids, which are then recirculated to synthesize vital protective enzymes, heat-shock proteins, and clean cellular organelles.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: What Breaks a Fast Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Strict Fasting vs. Practical Fasting: Beverage Compliance Guide
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Maintaining total metabolic compliance during the fasting window is crucial for keeping insulin suppressed and autophagy unhindered:
          </p>
          <DataTable
            head={["Substance / Beverage", "Fasting Compliance Status", "Biological Rationale & Physiological Impact"]}
            rows={FASTING_COMPLIANCE_TABLE.map((row) => [
              <strong key={row.substance} className="text-slate-900 dark:text-slate-100">{row.substance}</strong>,
              row.fastImpact,
              row.physiologicalNotes,
            ])}
          />
        </section>
      
        
        {/* Molecular Bioenergetics & Autophagy Kinetics */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Molecular Bioenergetics: Autophagy, AMPK Activation &amp; Sirtuins
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Intermittent fasting triggers a systematic shift in cellular energetics known as the metabolic switch. As hepatic glycogen stores deplete over 12 to 16 hours of continuous fasting, circulating blood glucose drops and the insulin-to-glucagon ratio flips, stimulating hormone-sensitive lipase (HSL) in adipose tissue to release non-esterified free fatty acids into systemic circulation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">AMPK vs. mTOR Molecular Signaling</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Fasting elevates the intracellular AMP/ATP ratio, activating AMP-activated protein kinase (AMPK) and downregulating mechanistic target of rapamycin (mTORC1). This molecular suppression initiates chaperone-mediated autophagy, recycling damaged mitochondria (mitophagy) and unfolded protein aggregates.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Ketogenesis &amp; Neuroprotection</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                The liver converts mobilized fatty acids into ketone bodies (beta-hydroxybutyrate, acetoacetate, and acetone). Beta-hydroxybutyrate crosses the blood-brain barrier to serve as an efficient neuronal fuel, stimulating brain-derived neurotrophic factor (BDNF) and promoting cellular stress resistance.
              </p>
            </div>
          </div>
          <h2>Electrolyte Balance &amp; Fasting Fluid Protocols</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            During extended fasting, low insulin accelerates renal sodium and potassium excretion (natriuresis of fasting). Supplementing non-caloric fluids with unrefined mineral salt and bioavailable magnesium prevents tension headaches, postural dizziness, and muscular fatigue while preserving lean muscle mass.
          </p>
        </section>

        
          <h2>Fasting Best Practices: Sustaining Energy &amp; Preventing Burnout</h2>
          <p>
            Optimize your intermittent fasting journey with these foundational clinical best practices:
          </p>
          <ul>
            <li><strong>Hydrate Continuously During Fasting:</strong> Drink plenty of plain water, mineral water, and unsweetened black coffee or green tea. Staying hydrated prevents mild headaches and blunts hunger sensations.</li>
            <li><strong>Break Fasts with Gentle, Nutrient-Dense Foods:</strong> Avoid breaking your fast with large amounts of refined carbohydrates or greasy foods. Start with lean protein, healthy fats (avocado, eggs), and cooked vegetables to prevent digestive distress and blood sugar spikes.</li>
            <li><strong>Prioritize Protein Intake in Feeding Windows:</strong> Consume adequate protein (1.6 to 2.2 g/kg of body weight) spread across your meals to preserve lean muscle tissue and support cellular repair.</li>
            <li><strong>Listen to Your Body:</strong> If you experience severe dizziness, persistent fatigue, or weakness, break your fast gently. Intermittent fasting should support your health and energy, not cause chronic exhaustion.</li>
          </ul>
          <p>
            Combine consistent fasting windows with balanced nutrition, regular strength training, and restorative sleep for optimal metabolic longevity.
          </p>


        
          <h2>Circadian Fasting Alignment &amp; Glycemic Sensitivity</h2>
          <p>
            Aligning your intermittent fasting window with natural circadian biology—consuming meals earlier in the daytime and concluding food intake before nightfall (Early Time-Restricted Feeding)—yields superior glycemic improvements compared to late-evening eating windows. Human beta-cell insulin secretion and peripheral tissue insulin sensitivity naturally decline in the evening under the influence of melatonin.
          </p>
          <p>
            Concluding meals at least 3 hours prior to sleep optimizes nocturnal metabolic switching, supports deep restorative sleep architecture, and enhances morning fasting glucose regulation.
          </p>


        
          <h2>Sirtuin Signaling &amp; Cellular Quality Control</h2>
          <p>
            Prolonging the inter-meal fasting window elevates cellular NAD+ levels, which in turn activates the sirtuin family of enzymes (specifically SIRT1 and SIRT3). Sirtuins act as master epigenetic regulators that deacetylate transcription factors involved in mitochondrial biogenesis, oxidative stress defense, and DNA repair.
          </p>
          <p>
            Simultaneously, hepatic glycogen depletion stimulates ketogenesis, producing beta-hydroxybutyrate (BHB). Beyond functioning as an alternative fuel for the central nervous system, BHB acts as an epigenetic signaling metabolite that inhibits the NLRP3 inflammasome, dampening chronic systemic vascular inflammation.
          </p>

        {/* Related Companion Tools Contextual Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Clinical &amp; Metabolic Companion Tools</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Intermittent fasting is most effective when synchronized with precise energy targets and proper hydration. Calculate your total daily calorie target with our <a href="/calculators/health/calorie-calculator">Calorie Calculator</a>, determine basal energy requirements via the <a href="/calculators/health/bmr-calculator">BMR Calculator</a>, track structured fat reduction with the <a href="/calculators/health/weight-loss-calculator">Weight Loss Calculator</a>, and maintain cellular hydration using our <a href="/calculators/health/water-intake-calculator">Water Intake Calculator</a>.
          </p>
        </section>
              </>
      }
    >
      <IntermittentFastingCalculator />
    </CalcPage>
  );
}
