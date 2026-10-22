import WeightLossCalculator from "@/components/calcs/health/weight-loss-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { WeightLossTrajectoryChart } from "@/components/flagship/health/editorial-charts";

const PATH = "/calculators/health/weight-loss-calculator";
const TITLE = "Weight Loss Calculator – NIH Dynamic Energy Balance & Safe Deficit Modeling | CalcDigi";
const DESCRIPTION =
  "Free weight loss calculator: calculate your optimal daily calorie deficit, target date, and lean muscle retention protein targets using Mifflin-St Jeor and Kevin Hall’s NIH adaptive metabolic model.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const ENERGY_BALANCE_TABLE = [
  { model: "Wishnofsky 3,500 Rule (1958)", mechanism: "Static linear energy balance: assumes 1 lb fat = 3,500 kcal perpetually.", limitation: "Severely overestimates long-term weight loss; ignores metabolic slowdown and body mass contraction.", accuracy: "Reliable only for weeks 1–4." },
  { model: "NIH Kevin Hall Dynamic Model (2011)", mechanism: "Non-linear feedback loop: dynamically adjusts resting BMR, TEF, and NEAT as body mass declines.", limitation: "Requires continuous tracking of body composition and activity adherence.", accuracy: "Gold standard clinical predictive accuracy over 12–52 weeks." },
  { model: "Aggressive Crash Dieting (<1,000 kcal)", mechanism: "Severe acute energy restriction; drives early water, glycogen, and lean skeletal mass loss.", limitation: "Triggers compensatory leptin collapse, ghrelin surge, and 80%+ post-diet rebound weight regain.", accuracy: "Clinically unsafe without medical supervision." },
  { model: "Moderate Adaptive Deficit (500 kcal)", mechanism: "Preserves lean skeletal tissue, optimizes thyroid T3 signaling, and maintains physical spontaneous activity.", limitation: "Requires patience and consistent periodized diet breaks.", accuracy: "Highest sustained success rate in clinical obesity literature." },
];

export default function WeightLossPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Weight Loss Calculator"
      intro="Calculate your scientific daily caloric intake, healthy target deficit, and realistic goal timeline. Powered by Mifflin-St Jeor resting calorimetry and the National Institutes of Health (NIH) dynamic metabolic adaptation model."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="Daily Calories = Maintenance TDEE - Target Deficit"
      related={[
        { href: "/calculators/health/calorie-calculator", icon: "🥗", name: "Calorie Calculator" },
        { href: "/calculators/health/tdee-calculator", icon: "⚡", name: "TDEE Calculator" },
        { href: "/calculators/health/macro-calculator", icon: "🧬", name: "Macro Calculator" },
        { href: "/calculators/health/body-fat-calculator", icon: "📊", name: "Body Fat" },
        { href: "/calculators/health/ideal-weight-calculator", icon: "⚖️", name: "Ideal Weight" },
        { href: "/calculators/health/protein-intake-calculator", icon: "🥩", name: "Protein Intake" },
      ]}
      faq={[
        {
          q: "What is the maximum safe rate of weight loss per week?",
          a: "The American Academy of Family Physicians and The Obesity Society advise losing no more than 0.5% to 1.0% of total body weight per week (typically 1 to 2 lbs for most adults). Losing faster than this dramatically increases the risk of gallstone formation, electrolyte disturbances, hair shedding (telogen effluvium), and substantial lean muscle wasting.",
        },
        {
          q: "Why does weight loss always slow down or plateau after 6 to 8 weeks?",
          a: "Initial weight loss includes glycogen and water (each gram of glycogen binds 3 to 4 grams of water). As pure fat is mobilized, loss rates normalize. Furthermore, as you lose weight, your lower body mass burns fewer calories, gradually shrinking your initial deficit until energy intake matches expenditure—creating a plateau. Recalculating your maintenance calories or introducing a 1-week diet break at maintenance restores metabolic momentum.",
        },
        {
          q: "What is the absolute minimum calorie intake recommended?",
          a: "Clinical nutrition guidelines recommend a strict floor of 1,200 kcal/day for adult women and 1,500 kcal/day for adult men without direct medical supervision. Diets below these thresholds cannot provide the essential fatty acids, vitamins, and minerals necessary to sustain immune function and organ health.",
        },
      ]}
      article={
        <>

        {/* Clinical Byline */}
        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Endocrine & Obesity Medicine Review:</span> Calibrated against National Institutes of Health (NIH) mathematical models of human metabolism and The Obesity Society clinical guidelines.
          </div>
          <div className="text-slate-500 whitespace-nowrap">Updated: Q4 2026 • Verified Clinical Standards</div>
        </div>

        {/* Section 1: The Bioenergetics of Fat Loss */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Bioenergetics of Fat Loss: Thermodynamics Meets Metabolic Adaptation
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Sustainable adipose tissue loss is governed by the <strong>First Law of Thermodynamics</strong>: when systemic energy intake (calories consumed) remains consistently lower than total daily energy expenditure (TDEE), the human body mobilizes stored endogenous chemical energy—primarily triglycerides stored within adipocytes and glycogen reserves in the liver and skeletal muscle—to fulfill metabolic requirements.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            For over sixty years, popular fitness culture adhered strictly to <strong>Max Wishnofsky's 1958 3,500-calorie rule</strong>, which posited that reducing cumulative energy intake by 3,500 kcal would produce exactly one pound (0.45 kg) of weight loss, ad infinitum. However, modern metabolic ward research led by Dr. Kevin Hall at the <strong>National Institutes of Health (NIH)</strong> proved that human metabolism does not operate as a static calculator. As you shed body mass, three physiological adaptations contract your daily calorie burn:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Reduced Basal Metabolic Cost:</strong> A smaller physical body requires fewer baseline calories to pump blood, ventilate the lungs, and maintain cellular ion gradients (approximately 15 to 22 kcal less per day for every kilogram of mass lost).
            </li>
            <li>
              <strong>Decreased Cost of Locomotion:</strong> Transporting a lighter frame across daily steps burns substantially fewer calories (reduced mechanical work).
            </li>
            <li>
              <strong>Adaptive Thermogenesis:</strong> An evolutionary survival response wherein sympathetic nervous system tone, active triiodothyronine (T3) thyroid hormone, and circulating leptin drop below levels predicted by body composition changes alone.
            </li>
          </ul>
        </section>

        {/* Section 2: Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Benchmark: 24-Week Weight Loss Trajectory & Diet Fatigue Curve
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
              NIH Kevin Hall Model Simulation
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Compare how a realistic adaptive deficit preserves sustainable fat loss versus theoretical linear models and extreme crash dieting. Scrub across the 24-week timeline below to observe physiological plateaus, metabolic downregulation, and rebound risk zones.
          </p>

          <WeightLossTrajectoryChart />
        </section>

        {/* Section 3: Energy Balance Models Compared */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Clinical Weight Loss Models: Wishnofsky vs. Dynamic NIH Feedback
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Understanding why static models fail helps prevent the frustration of diet plateaus:
          </p>

          <DataTable
            head={["Metabolic Weight Loss Model", "Core Biophysical Mechanism", "Primary Clinical Limitation", "Real-World Predictive Accuracy"]}
            rows={ENERGY_BALANCE_TABLE.map((r) => [r.model, r.mechanism, r.limitation, r.accuracy])}
          />
        </section>

        {/* Section 4: Sarcopenia & Muscle Retention Floor */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Preventing Sarcopenia: The Critical Role of Dietary Protein & Resistance Training
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The clinical objective of weight management is <strong>adipose reduction while preserving lean skeletal muscle mass</strong>. When individuals enter severe, uncontrolled deficits without adequate dietary protein or mechanical resistance training, up to <strong>30% to 40% of the total weight lost</strong> originates from metabolically active skeletal muscle rather than body fat. This induces <em>sarcopenic obesity</em>, permanently depressing resting metabolic rate and predisposing the individual to rapid fat regain.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 not-prose my-6">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Clinical Guidelines for Lean Mass Preservation:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                  1. Elevated Protein Intake (1.6 to 2.2 g/kg)
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Consuming 1.6 to 2.2 grams of high-quality protein per kilogram of target body weight stimulates muscle protein synthesis (MPS) via the mTOR pathway, countering negative nitrogen balance during a deficit.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">
                  2. Progressive Resistance Overload
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Lifting weights 3 to 4 times weekly signals the endocrine system that contractile myofibrillar protein is biologically essential, directing catabolism toward adipocyte lipid droplets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Step-by-Step Practical Calculation Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Step-by-Step Walkthrough: Planning a 30-Pound Weight Loss Phase
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Consider a <strong>34-year-old male</strong>, 5'10" (178 cm), weighing <strong>195 lbs (88.45 kg)</strong> who aims to reach a healthy weight of <strong>165 lbs (74.84 kg)</strong>:
          </p>

          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-2">
            <div>1. Compute Basal Metabolic Rate (BMR, Mifflin-St Jeor): <code>10(88.45) + 6.25(178) - 5(34) + 5 = 884.5 + 1112.5 - 170 + 5 = 1,832 kcal/day</code></div>
            <div>2. Apply Light Physical Activity Multiplier (1.375): <code>TDEE = 1,832 &times; 1.375 = 2,519 kcal/day (Maintenance)</code></div>
            <div>3. Prescribe Safe Deficit for 1.0 lb/week: <code>500 kcal/day deficit</code></div>
            <div>4. Prescribed Daily Calorie Budget: <code>2,519 - 500 = 2,019 kcal/day</code></div>
            <div>5. Timeline Calculation: <code>30 lbs / 1.0 lb/week = 30 weeks (~7 months)</code></div>
            <div>6. Target Protein Floor: <code>74.84 kg &times; 1.8 g/kg = 135 grams of daily protein</code></div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 font-sans">
              <span className="font-bold text-slate-900 dark:text-slate-100">Clinical Prognosis:</span>
              <p className="text-slate-600 dark:text-slate-300 text-xs mt-1">
                At 2,019 kcal/day, this individual remains safely above the clinical floor (1,500 kcal). By week 16, as body weight drops below 180 lbs, TDEE will naturally adjust to ~2,380 kcal, requiring a slight 100-kcal dietary adjustment or an extra 2,000 daily steps to sustain momentum.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Reverse Dieting & Maintenance */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Reverse Dieting: How to Transition from Deficit to Permanent Maintenance
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The greatest pitfall in clinical weight loss occurs the day the goal weight is reached. Immediately returning to pre-diet caloric intake causes rapid fat rebound because circulating leptin is suppressed, ghrelin is elevated, and metabolic rate is adapted.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Incremental Reverse Dieting:</strong> Increase daily calorie intake by 100 to 150 kcal per week for 4 to 6 weeks. This gently restores liver glycogen and normalizes thyroid hormone signaling without spilling excess energy into adipose tissue.
            </li>
            <li>
              <strong>Daily Weigh-In Smoothing:</strong> Weigh daily upon waking and track the 7-day rolling average. Fluctuations of 2 to 4 pounds during the first week of maintenance represent water retention from restored glycogen, not body fat.
            </li>
          </ul>
        </section>
      
        
        {/* Set-Point Theory & Neuroendocrine Regulation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Set-Point Theory, Dual-Intervention Model &amp; Long-Term Maintenance
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Sustaining long-term fat reduction involves overcoming homeostatic neuroendocrine defense mechanisms designed by evolutionary biology to prevent starvation. The Dual-Intervention Point model suggests that human body weight is bounded by upper and lower physiological set-points governed by hypothalamic leptin sensitivity and circulating orexigenic neuropeptide Y (NPY).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Defending Against Post-Diet Rebound</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Following substantial weight reduction, circulating leptin drops disproportionately to fat mass loss, triggering persistent hyperphagia (heightened appetite drive) and increased reward responsiveness to calorie-dense foods. Maintaining high dietary protein (&ge;1.0 g/lb lean mass) and high dietary fiber blunts these neurochemical signals.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">The 1-Year Weight Stability Landmark</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Clinical research demonstrates that individuals who maintain a lower target weight for a full consecutive 12 months experience partial normalization of ghrelin and resting metabolic rate, effectively settling the body&apos;s lower homeostatic set-point to their new leaner baseline.
              </p>
            </div>
          </div>
          <h2>National Weight Control Registry Behavioral Habits</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Individuals who maintain significant weight loss for years accumulate an average of 60 minutes of daily physical activity, weigh themselves weekly, maintain consistent eating patterns, and prioritize whole foods and high dietary protein.
          </p>
        </section>

        
          <h2>Behavioral Habits for Permanent Weight Loss Maintenance</h2>
          <p>
            The National Weight Control Registry (tracking over 10,000 individuals who maintained significant weight loss for years) identifies these universal behavioral habits:
          </p>
          <ul>
            <li><strong>Consistent Daily Physical Activity:</strong> Registry members accumulate an average of 60 minutes of physical activity daily, most commonly brisk walking or cycling.</li>
            <li><strong>Regular Self-Monitoring:</strong> Weighed themselves under standardized conditions at least once weekly to catch small weight fluctuations before they become major rebounds.</li>
            <li><strong>Consistent Dietary Routine:</strong> Maintained similar dietary patterns across weekdays and weekends, avoiding extreme boom-and-bust cheat cycles.</li>
            <li><strong>Eating Breakfast &amp; Prioritizing Whole Foods:</strong> Emphasized whole, minimally processed foods, high dietary fiber, and adequate protein across all meals.</li>
          </ul>
          <p>
            Build sustainable daily habits, celebrate non-scale victories, and cultivate a lifestyle centered around physical vitality and long-term health.
          </p>


        
          <h2>Hypertrophy vs Catabolism: Safeguarding Metabolic Tissue</h2>
          <p>
            The fundamental goal of a healthy weight reduction protocol is the selective loss of adipose tissue while completely preserving functional lean skeletal muscle. Catabolizing lean tissue during dieting lowers baseline resting metabolic rate, increases physical frailty, and elevates post-diet weight rebound risk.
          </p>
          <p>
            Consuming 1.6 to 2.2 grams of protein per kilogram of body weight paired with consistent progressive resistance training protects muscle protein synthesis and ensures that 85% to 95% of weight lost comes directly from adipose reserves.
          </p>


        {/* Related Companion Tools Contextual Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Clinical &amp; Metabolic Companion Tools</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Sustainable weight loss requires balancing caloric deficit against resting metabolic preservation. Determine your baseline caloric requirements with our <a href="/calculators/health/calorie-calculator">Calorie Calculator</a>, track resting energy changes via the <a href="/calculators/health/bmr-calculator">BMR Calculator</a>, configure target macronutrient ratios with the <a href="/calculators/health/macro-calculator">Macro Calculator</a>, and preserve metabolically active muscle using the <a href="/calculators/health/protein-intake-calculator">Protein Intake Calculator</a>.
          </p>
        </section>
              </>
      }
    >
      <WeightLossCalculator />
    </CalcPage>
  );
}
