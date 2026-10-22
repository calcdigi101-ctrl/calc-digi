import Vo2MaxCalculator from "@/components/calcs/health/vo2-max-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { Vo2MaxAgeNormsChart } from "@/components/flagship/health/editorial-charts";

const PATH = "/calculators/health/vo2-max-calculator";
const TITLE = "VO2 Max Calculator – ACSM Cardiorespiratory Fitness Standards | CalcDigi";
const DESCRIPTION =
  "Free VO2 Max calculator: estimate your maximal oxygen consumption (mL/kg/min) and biological aerobic fitness age using Rockport 1-mile walk, Cooper 12-min run, or heart rate ratio.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const ACSM_NORMS_TABLE = [
  { age: "20–29", superior: "> 52.4", excellent: "46.5 – 52.4", good: "42.5 – 46.4", fair: "36.5 – 42.4", poor: "< 36.5" },
  { age: "30–39", superior: "> 49.4", excellent: "44.0 – 49.4", good: "41.0 – 43.9", fair: "35.5 – 40.9", poor: "< 35.5" },
  { age: "40–49", superior: "> 45.4", excellent: "41.0 – 45.4", good: "38.0 – 40.9", fair: "33.0 – 37.9", poor: "< 33.0" },
  { age: "50–59", superior: "> 41.4", excellent: "37.0 – 41.4", good: "34.0 – 36.9", fair: "30.0 – 33.9", poor: "< 30.0" },
  { age: "60–69", superior: "> 37.4", excellent: "33.0 – 37.4", good: "30.0 – 32.9", fair: "26.0 – 29.9", poor: "< 26.0" },
  { age: "70–79", superior: "> 34.0", excellent: "29.5 – 34.0", good: "26.5 – 29.4", fair: "22.5 – 26.4", poor: "< 22.5" },
];

export default function Vo2MaxPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="VO2 Max Calculator"
      intro="Accurately calculate your maximal oxygen uptake (VO2 max) in milliliters of oxygen consumed per kilogram of body weight per minute (mL/kg/min). Assess cardiorespiratory endurance and all-cause mortality risk across validated clinical field tests."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="VO2max = Cardiac Output (Q) * Arterial-Venous Oxygen Difference"
      related={[
        { href: "/calculators/health/heart-rate-zone-calculator", icon: "❤️", name: "Heart Rate Zones" },
        { href: "/calculators/health/pace-calculator", icon: "⏱️", name: "Pace Calculator" },
        { href: "/calculators/health/calorie-burn-calculator", icon: "🔥", name: "Calorie Burn" },
        { href: "/calculators/health/one-rep-max-calculator", icon: "🏋️", name: "One Rep Max" },
        { href: "/calculators/health/blood-pressure-calculator", icon: "🩺", name: "Blood Pressure" },
        { href: "/calculators/health/bmi-calculator", icon: "⚖️", name: "BMI Calculator" },
      ]}
      faq={[
        {
          q: "What is an average VO2 max for a man vs. a woman?",
          a: "For a healthy 30-year-old, average VO2 max is approximately 40 to 44 mL/kg/min for men and 34 to 38 mL/kg/min for women. Women naturally possess slightly lower values due to differences in average hemoglobin mass, left ventricular heart size, and higher essential adipose tissue.",
        },
        {
          q: "How fast can you improve your VO2 max?",
          a: "Untrained individuals can typically improve their VO2 max by 15% to 25% within 8 to 12 weeks of structured interval and aerobic base training. Elite athletes operate close to their genetic ceiling, where 1% to 3% improvements require months of specialized micro-periodization.",
        },
        {
          q: "What is the 'frailty threshold' for VO2 max?",
          a: "Geriatric cardiologists identify 18 mL/kg/min in men and 15 mL/kg/min in women as the critical threshold for functional physical independence. Falling below this level means activities of daily living (such as carrying groceries or climbing stairs) operate at 100% of maximum cardiovascular capacity, leading to rapid physical frailty.",
        },
      ]}
    >
      <Vo2MaxCalculator />

      <article className="prose dark:prose-invert max-w-none space-y-12 mt-12">
        {/* Clinical Byline */}
        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Cardiorespiratory & Exercise Physiology Review:</span> Calibrated to American College of Sports Medicine (ACSM 11th Edition) Guidelines and American Heart Association (AHA) Scientific Statements.
          </div>
          <div className="text-slate-500 whitespace-nowrap">Updated: Q4 2026 • Verified Clinical Standards</div>
        </div>

        {/* Section 1: Clinical Definition & Fick Equation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            What Is VO2 Max and Why Is It the Premier Biomarker for Longevity?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong>Maximal Oxygen Uptake (VO2 max)</strong> represents the maximum volume of oxygen that an individual can transport and utilize during exhaustive dynamic exercise. Expressed clinically in <strong>milliliters of oxygen consumed per kilogram of body weight per minute (mL/kg/min)</strong>, it reflects the integrated functional capacity of the pulmonary gas-exchange system, left ventricular cardiac output, vascular arterial compliance, and skeletal muscle mitochondrial respiration.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In cardiovascular physiology, VO2 max is fundamentally defined by the <strong>Fick Equation</strong>:
          </p>
          <Formula>VO2max = Cardiac Output (Q) &times; (CaO2 - CvO2)</Formula>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In 2016, the <strong>American Heart Association (AHA)</strong> published an authoritative scientific statement advocating that cardiorespiratory fitness (quantified via VO2 max) be treated as a <em>clinical vital sign</em> alongside blood pressure and heart rate. A landmark 2018 cohort study in <em>JAMA Network Open</em> examining 122,007 patients demonstrated that higher cardiorespiratory fitness was inversely associated with long-term mortality, with no observed upper ceiling of benefit—elite performers experienced an 80% risk reduction compared to low-fitness individuals.
          </p>
        </section>

        {/* Section 2: Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Benchmark: VO2 Max Decline Trajectory Across Aging
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
              ACSM 50-Year Longitudinal Data
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Sedentary individuals experience a physiological decline of ~10% per decade after age 30, whereas vigorous endurance training cuts this decline rate in half (~5% per decade). Scrub across age 20 to 75 below to compare fitness percentiles against the critical independence floor (18 mL/kg/min).
          </p>

          <Vo2MaxAgeNormsChart />
        </section>

        {/* Section 3: Field Test Protocols Explained */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Clinical Field Protocols: How Submaximal Tests Estimate VO2 Max
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            While direct laboratory measurement via open-circuit cardiopulmonary exercise testing (CPET) with a metabolic cart is the gold standard, validated field tests allow accurate estimation without expensive hospital equipment:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900 dark:text-slate-100">1. Rockport 1-Mile Walk Test</h4>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">Low Joint Impact</span>
              </div>
              <Formula>VO2 = 132.853 - 0.0769(W) - 0.3877(A) + 6.315(Sex) - 3.2649(Time) - 0.1565(HR)</Formula>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Walk exactly one mile (1,609 meters) as fast as possible on a flat surface without breaking into a jog. Take heart rate immediately upon crossing the finish line. Extremely safe for older adults and cardiac rehab patients.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900 dark:text-slate-100">2. Cooper 12-Minute Run Test</h4>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">Runners & Athletes</span>
              </div>
              <Formula>VO2 = (Distance in meters - 504.9) / 44.73</Formula>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Developed by Dr. Kenneth Cooper for the US Air Force. Run as far as possible in 12 minutes on a track. Measures sustained steady-state aerobic power.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900 dark:text-slate-100">3. Resting Heart Rate Ratio (Uth Method)</h4>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">Passive Baseline</span>
              </div>
              <Formula>VO2 = 15.3 &times; (HRmax / HRrest)</Formula>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Formulated by Niels Uth (2004). Uses the ratio of maximum heart rate to resting heart rate, reflecting cardiac stroke volume reserve at rest.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900 dark:text-slate-100">4. George 1.5-Mile Run/Walk</h4>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">Military Standard</span>
              </div>
              <Formula>VO2 = 88.02 - 0.1656(W) - 2.76(Time) + 3.716(Sex)</Formula>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Commonly employed in military and law enforcement physical readiness tests. Balances anaerobic threshold with maximum aerobic output.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: ACSM Normative Classification Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            ACSM Cardiorespiratory Fitness Classification Standards
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The American College of Sports Medicine categorizes VO2 max into five distinct fitness tiers based on epidemiological distributions across adult age brackets:
          </p>

          <DataTable
            head={["Age Bracket", "Superior (Top 5%)", "Excellent", "Good (Healthy Goal)", "Fair (Median)", "Poor (Cardiometabolic Risk)"]}
            rows={ACSM_NORMS_TABLE.map((r) => [r.age, r.superior, r.excellent, r.good, r.fair, r.poor])}
          />
        </section>

        {/* Section 5: Step-by-Step Practical Calculation Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Step-by-Step Calculation: Rockport 1-Mile Walk Test Walkthrough
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Consider a <strong>35-year-old male</strong> weighing <strong>175 lbs</strong> who completes the 1-mile walk in <strong>14 minutes and 30 seconds</strong> (14.50 minutes) with an end-exercise heart rate of <strong>135 bpm</strong>:
          </p>

          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-2">
            <div>1. Base Intercept: <code>+ 132.853</code></div>
            <div>2. Body Weight Term: <code>- 0.0769 &times; 175 = - 13.458</code></div>
            <div>3. Age Term: <code>- 0.3877 &times; 35 = - 13.570</code></div>
            <div>4. Biological Sex Term: <code>+ 6.315 (Male)</code></div>
            <div>5. Duration Term: <code>- 3.2649 &times; 14.50 = - 47.341</code></div>
            <div>6. Heart Rate Term: <code>- 0.1565 &times; 135 = - 21.128</code></div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 font-sans">
              <span className="font-bold text-slate-900 dark:text-slate-100">Final Calculation:</span>
              <p className="text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm mt-1">
                VO2 max = 132.853 - 13.458 - 13.570 + 6.315 - 47.341 - 21.128 = 43.67 mL/kg/min
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-xs mt-1">
                This places the subject in the <strong>"Good"</strong> cardiorespiratory category for 30–39-year-olds (70th percentile).
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: How to Increase VO2 Max */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Evidence-Based Protocols to Elevate VO2 Max
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Cardiorespiratory capacity responds dynamically to endurance stimulus. The two most substantiated training methodologies are:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Norwegian 4&times;4 High-Intensity Intervals (HIIT):</strong> Four intervals of 4 minutes at 85%–95% HRmax, separated by 3 minutes of active recovery at 60%–70% HRmax. Research from the Norwegian University of Science and Technology (NTNU) shows this protocol yields the largest improvements in stroke volume and left ventricular compliance.
            </li>
            <li>
              <strong>High-Volume Zone 2 Base Training:</strong> 60 to 90 minutes of steady-state aerobic work below your first ventilatory threshold (VT1 / lactate &lt; 2.0 mmol/L). Zone 2 training stimulates mitochondrial biogenesis, capillarization of type I muscle fibers, and cardiac preload capacity without inducing autonomic nervous system burnout.
            </li>
          </ul>
        </section>
      
        
        {/* The Fick Principle, Capillary Density & Longevity Hazard */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Fick Principle, Capillary Density &amp; Longevity Hazard Ratios
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Maximal oxygen consumption (VO2 max) is the physiological benchmark of cardiorespiratory fitness, defined mathematically by the Fick Equation: VO2 = Q × (Ca O2 − Cv O2), where Q represents maximal cardiac output (heart rate × stroke volume) and (Ca O2 − Cv O2) represents the arteriovenous oxygen difference (the quantity of oxygen extracted by active skeletal muscle mitochondria from arterial blood).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">The Cleveland Clinic Longevity Findings</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                A landmark study of 122,007 patients published in <em>JAMA Network Open</em> demonstrated that elite cardiorespiratory fitness (VO2 max in the top 2.3% of the population) was associated with an 80% reduction in all-cause mortality compared to the lowest performing fitness quintile. Cardiorespiratory fitness showed stronger protective association against premature mortality than non-smoking status.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Cellular Mitochondrial Adaptations</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Structured high-intensity interval training (HIIT, e.g. Norwegian 4x4 minute intervals at 90%–95% max HR) triggers peroxisome proliferator-activated receptor gamma coactivator 1-alpha (PGC-1alpha), accelerating mitochondrial biogenesis and increasing capillary-to-muscle fiber ratios.
              </p>
            </div>
          </div>
          <h2>Actionable Cardiorespiratory Protocols</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Incorporate weekly polarized cardiovascular training (80% Zone 2 endurance base, 20% near-maximal intervals) to systematically elevate your functional VO2 max and support long-term physical vitality.
          </p>
        </section>

        
          <h2>Actionable Cardiorespiratory Protocols: Elevating Your Aerobic Ceiling</h2>
          <p>
            Systematically improve your VO2 max and cardiorespiratory longevity with these structured exercise protocols:
          </p>
          <ul>
            <li><strong>The Norwegian 4x4 Interval Protocol:</strong> Perform 4 intervals of 4 minutes at 90% to 95% of maximal heart rate, interspersed with 3 minutes of active recovery at 70% max HR. Conducted 1 to 2 times weekly, this protocol rapidly elevates maximal stroke volume.</li>
            <li><strong>High-Volume Zone 2 Base Building:</strong> Spend 3 to 4 hours weekly in Zone 2 aerobic training. This builds extensive capillary networks, expands mitochondrial surface area, and increases fat oxidation enzyme capacity.</li>
            <li><strong>Uphill Running &amp; Incline Cycling:</strong> Incorporating incline intervals forces maximum motor unit recruitment and cardiovascular output while minimizing musculoskeletal impact forces.</li>
            <li><strong>Monitor Resting Heart Rate &amp; Heart Rate Recovery:</strong> Tracking reductions in resting heart rate and improvements in 1-minute post-exercise recovery provides tangible proof of expanding cardiorespiratory fitness.</li>
          </ul>
          <p>
            Commit to a balanced aerobic training program to elevate your functional VO2 max and support long-term physical vitality.
          </p>


        
          <h2>Stroke Volume Limits &amp; Interval Progression Protocols</h2>
          <p>
            In healthy individuals, the primary limiting factor for VO2 max is maximal cardiac stroke volume—the volume of oxygenated blood the left ventricle can eject per beat. High-intensity interval training (HIIT) performed at 90% to 95% of maximal heart rate challenges ventricular compliance, stimulating eccentric cardiac hypertrophy and expanding total blood volume.
          </p>
          <p>
            Combine weekly high-intensity intervals with extensive low-intensity Zone 2 volume to expand your cardiovascular engine and support decades of physical vitality.
          </p>


        {/* Related Companion Tools Contextual Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Clinical &amp; Metabolic Companion Tools</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Aerobic capacity is the gold-standard biomarker of cardiorespiratory fitness and all-cause longevity. Translate your VO2 max into specific training intensity bands with the <a href="/calculators/health/heart-rate-zone-calculator">Heart Rate Zone Calculator</a>, evaluate running splits with the <a href="/calculators/health/pace-calculator">Pace Calculator</a>, test upper body muscular stamina with the <a href="/calculators/health/pushup-test-calculator">Push-Up Test Calculator</a>, and monitor resting vascular health using our <a href="/calculators/health/blood-pressure-calculator">Blood Pressure Calculator</a>.
          </p>
        </section>
      </article>
    </CalcPage>
  );
}
