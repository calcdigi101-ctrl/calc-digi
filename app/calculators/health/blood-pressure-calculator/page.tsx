import BloodPressureCalculator from "@/components/calcs/health/blood-pressure-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BloodPressureStageChart } from "@/components/flagship/health/editorial-charts";

const PATH = "/calculators/health/blood-pressure-calculator";
const TITLE = "Blood Pressure Calculator – 2017 ACC/AHA Clinical Guidelines | CalcDigi";
const DESCRIPTION =
  "Free blood pressure calculator: interpret systolic and diastolic readings against 2017 ACC/AHA guidelines. Calculate Mean Arterial Pressure (MAP) and pulse pressure arterial compliance.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const BP_GUIDELINES_TABLE = [
  { category: "Normal", systolic: "< 120 mmHg", diastolic: "and < 80 mmHg", action: "Annual screening; maintain healthy lifestyle, low sodium, aerobic exercise." },
  { category: "Elevated", systolic: "120 – 129 mmHg", diastolic: "and < 80 mmHg", action: "Lifestyle modifications (DASH diet, weight management); re-evaluate in 3–6 months." },
  { category: "Stage 1 Hypertension", systolic: "130 – 139 mmHg", diastolic: "or 80 – 89 mmHg", action: "Calculate 10-yr ASCVD risk: if ≥10%, initiate single medication + lifestyle; re-check in 1 month." },
  { category: "Stage 2 Hypertension", systolic: "≥ 140 mmHg", diastolic: "or ≥ 90 mmHg", action: "Prompt medical management; typically 2 first-line antihypertensive agents of different classes." },
  { category: "Hypertensive Crisis", systolic: "> 180 mmHg", diastolic: "and/or > 120 mmHg", action: "Emergency medical consultation. If symptomatic (chest pain, SOB, visual deficit), call 911 immediately." },
];

export default function BloodPressurePage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Blood Pressure Calculator"
      intro="Interpret your blood pressure numbers using the landmark 2017 ACC/AHA Clinical Practice Guidelines. Evaluate Mean Arterial Pressure (MAP) for vital organ perfusion and Pulse Pressure for arterial vascular compliance."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="MAP = Diastolic + 1/3 (Systolic - Diastolic)"
      related={[
        { href: "/calculators/health/heart-rate-zone-calculator", icon: "❤️", name: "Heart Rate Zones" },
        { href: "/calculators/health/vo2-max-calculator", icon: "🫁", name: "VO2 Max Calculator" },
        { href: "/calculators/health/bmi-calculator", icon: "⚖️", name: "BMI Calculator" },
        { href: "/calculators/health/calorie-burn-calculator", icon: "🔥", name: "Calorie Burn" },
        { href: "/calculators/health/body-fat-calculator", icon: "📊", name: "Body Fat" },
        { href: "/calculators/health/water-intake-calculator", icon: "💧", name: "Water Intake" },
      ]}
      faq={[
        {
          q: "What is the difference between white-coat hypertension and masked hypertension?",
          a: "White-coat hypertension occurs when blood pressure is elevated in clinical settings (≥ 130/80) but normal at home (< 130/80) due to acute medical anxiety. Conversely, masked hypertension is normal in the doctor's office but consistently elevated at home or during sleep; it carries cardiovascular risk identical to sustained hypertension and requires 24-hour ambulatory monitoring to detect.",
        },
        {
          q: "Why is high blood pressure called the 'silent killer'?",
          a: "Hypertension typically produces zero palpable physical symptoms—no headaches, dizziness, or chest discomfort—until substantial end-organ damage has occurred to cerebral blood vessels, coronary arteries, retina microvasculature, or renal nephrons. Regular screening is the only dependable method of detection.",
        },
        {
          q: "What should I do if my blood pressure exceeds 180/120 mmHg?",
          a: "Wait quietly for 5 minutes and take a second reading. If readings remain above 180 systolic and/or 120 diastolic without symptoms, contact your doctor immediately. If this reading is accompanied by red-flag symptoms (chest pressure, shortness of breath, back pain, numbness, weakness, difficulty speaking, or blurred vision), this represents a hypertensive emergency—call 911 immediately.",
        },
      ]}
    >
      <BloodPressureCalculator />

      <article className="prose dark:prose-invert max-w-none space-y-12 mt-12">
        {/* Clinical Byline */}
        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Cardiology & Hemodynamic Review:</span> Formulated under American College of Cardiology / American Heart Association (ACC/AHA) 2017 High Blood Pressure Clinical Practice Guidelines.
          </div>
          <div className="text-slate-500 whitespace-nowrap">Updated: Q4 2026 • Verified Clinical Standards</div>
        </div>

        {/* Section 1: Clinical Definition & The 2017 Guideline Shift */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Understanding Blood Pressure: Systolic vs. Diastolic Dynamics
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Blood pressure quantifies the lateral hydrodynamic force exerted by circulating blood against the intimal walls of systemic arteries during cardiac cycles. Measured in <strong>millimeters of mercury (mmHg)</strong>, readings consist of two paired physiological values:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Systolic Blood Pressure (Upper Number):</strong> The peak intra-arterial pressure generated when the left ventricle contracts during cardiac systole, ejecting a bolus of oxygenated blood into the aorta.
            </li>
            <li>
              <strong>Diastolic Blood Pressure (Lower Number):</strong> The residual minimum arterial pressure maintained by elastic arterial recoil during ventricular relaxation (cardiac diastole), ensuring continuous capillary perfusion to peripheral organs and the coronary arteries.
            </li>
          </ul>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In 2017, the <strong>American College of Cardiology (ACC)</strong> and the <strong>American Heart Association (AHA)</strong> eliminated the legacy category of "pre-hypertension" and lowered the threshold for Stage 1 Hypertension from 140/90 mmHg down to <strong>130/80 mmHg</strong>. Landmark clinical trials (including the NIH SPRINT trial) established that vascular endothelial damage, microvascular stroke risk, and myocardial infarction escalate significantly above 120/80 mmHg.
          </p>
        </section>

        {/* Section 2: Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Benchmark: 2D ACC/AHA Hemodynamic Risk Map
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
              Interactive Hemodynamic Plane
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Blood pressure risk operates across a two-dimensional matrix. If systolic and diastolic pressures fall into different tiers, the higher category always dictates the clinical classification. Click or hover on the benchmark points below to explore clinical stages, MAP, and medical guidance.
          </p>

          <BloodPressureStageChart />
        </section>

        {/* Section 3: Advanced Hemodynamics (MAP & Pulse Pressure) */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Advanced Hemodynamic Biomarkers: MAP & Pulse Pressure
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Beyond standard systolic and diastolic figures, intensive care medicine and clinical cardiology rely on two calculated hemodynamic parameters to evaluate vascular integrity:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">1. Mean Arterial Pressure (MAP)</h4>
              <Formula>MAP = Diastolic + 1/3 (Systolic - Diastolic)</Formula>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Represents average perfusion pressure driven through the capillary vascular bed throughout one complete cardiac cycle. Normal values span <strong>70 to 100 mmHg</strong>. A MAP &ge; 65 mmHg is mandatory to sustain adequate perfusion to the cerebral cortex and renal glomeruli.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">2. Pulse Pressure (PP)</h4>
              <Formula>Pulse Pressure = Systolic - Diastolic</Formula>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Reflects stroke volume and systemic arterial compliance (the elasticity of the aorta). A normal range is <strong>30 to 50 mmHg</strong>. A widened pulse pressure (&gt; 60 mmHg) is a strong independent predictor of severe aortic calcification and cardiovascular mortality in adults over 50.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: ACC/AHA Guidelines Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            ACC / AHA 2017 Blood Pressure Classification & Management Matrix
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The clinical reference matrix below summarizes the operational diagnostic thresholds and treatment protocols established by the AHA/ACC task force:
          </p>

          <DataTable
            head={["Clinical Category", "Systolic Pressure", "Diastolic Pressure", "Recommended Medical Management"]}
            rows={BP_GUIDELINES_TABLE.map((r) => [r.category, r.systolic, r.diastolic, r.action])}
          />
        </section>

        {/* Section 5: Step-by-Step Practical Calculation Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Step-by-Step Walkthrough: Hemodynamic Evaluation of 138/86 mmHg
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Suppose a patient measures a resting reading of <strong>138 mmHg Systolic</strong> and <strong>86 mmHg Diastolic</strong>:
          </p>

          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-2">
            <div>1. Clinical Category Determination: 138 is between 130–139, and 86 is between 80–89. Both parameters satisfy <strong>Stage 1 Hypertension</strong>.</div>
            <div>2. Calculate Pulse Pressure: <code>PP = 138 - 86 = 52 mmHg</code> (borderline arterial compliance).</div>
            <div>3. Calculate Mean Arterial Pressure (MAP): <code>MAP = 86 + (52 / 3) = 86 + 17.33 = 103.3 mmHg</code>.</div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 font-sans">
              <span className="font-bold text-slate-900 dark:text-slate-100">Clinical Interpretation:</span>
              <p className="text-slate-600 dark:text-slate-300 text-xs mt-1">
                The elevated MAP of 103.3 mmHg reflects increased systemic vascular resistance. Initial therapy emphasizes the <strong>DASH dietary pattern</strong> (sodium &lt; 1,500 mg/day, potassium 3,500–5,000 mg/day), 150 minutes of weekly aerobic exercise, and formal ASCVD 10-year risk stratification.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: AHA Measurement Protocol */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            AHA Standardized Protocol: How to Measure Blood Pressure Accurately
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Over 30% of high clinic readings are distorted by improper measurement technique or the sympathetic stress response known as <em>white-coat hypertension</em>. To obtain valid home readings:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Avoid Pre-Test Stimulants:</strong> Refrain from caffeine, nicotine, and strenuous physical exercise for at least 30 minutes prior to testing. Empty your bladder completely.
            </li>
            <li>
              <strong>Observe 5-Minute Seated Rest:</strong> Sit quietly with your back supported, legs uncrossed, and feet resting flat on the floor for 5 uninterrupted minutes without talking or phone scrolling.
            </li>
            <li>
              <strong>Proper Arm Placement:</strong> Support your bare arm on a desk or armrest so the middle of the cuff is positioned at heart level (fourth intercostal space). Having the cuff below heart level falsely inflates systolic readings by up to 10 mmHg.
            </li>
            <li>
              <strong>Take Duplicate Measurements:</strong> Record two readings separated by 1 to 2 minutes, and record the average.
            </li>
          </ul>
        </section>
      
        
        {/* Arterial Compliance, Endothelial Nitric Oxide & Nocturnal Dipping */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Arterial Compliance, Endothelial Nitric Oxide &amp; Nocturnal Dipping
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Systemic blood pressure reflects the interplay between cardiac output (the volume of blood pumped per minute) and total systemic vascular resistance. As blood surges from the left ventricle into the aorta during systole, healthy compliant elastic arteries expand, dampening the pulse wave. In chronic hypertension, arterial wall remodeling, collagen cross-linking, and elastin degradation reduce arterial compliance, producing elevated pulse pressure and cardiac left ventricular hypertrophy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">The Prognostic Meaning of Nocturnal Dipping</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                In healthy circadian physiology, nocturnal systolic and diastolic blood pressure drops by 10% to 20% during sleep (dippers) due to parasympathetic autonomic dominance. Individuals exhibiting a blunted drop of less than 10% (non-dippers) or nocturnal blood pressure spikes have double the long-term risk of stroke, congestive heart failure, and renal insufficiency.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Dietary Sodium-to-Potassium Ratio</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Clinical trials such as the DASH study demonstrate that dietary potassium intake (&ge; 3,500 to 4,700 mg/day) promotes renal natriuresis (sodium excretion) and relaxes vascular smooth muscle tone. Elevating dietary potassium from whole foods (potatoes, leafy greens, avocados) often matches the antihypertensive efficacy of single-agent pharmacotherapy.
              </p>
            </div>
          </div>
          <h2>Evidence-Based Interventions for Hypertension Reduction</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Adhere strictly to standardized measurement guidelines: sit quietly with back supported for 5 minutes, keep arm at heart level, and avoid caffeine or tobacco for 30 minutes prior to cuff inflation. Incorporate the DASH nutritional pattern, regular aerobic exercise, and isometric wall squats for sustained vascular health.
          </p>
        </section>

        
          <h2>Clinical Lifestyle Interventions for Hypertension Reduction</h2>
          <p>
            Evidence-based non-pharmacological interventions yield dramatic systolic and diastolic blood pressure reductions comparable to multiple antihypertensive medications:
          </p>
          <ul>
            <li><strong>The DASH Nutritional Model:</strong> Adopting a Dietary Approaches to Stop Hypertension (DASH) eating plan—rich in fruits, vegetables, whole grains, and low-fat dairy—reduces systolic blood pressure by 8 to 14 mmHg.</li>
            <li><strong>Aerobic &amp; Isometric Exercise:</strong> Engaging in 150 minutes of moderate aerobic conditioning weekly lowers systolic pressure by 5 to 8 mmHg. Additionally, isometric wall squat holds (4 sets of 2 minutes, 3 times weekly) induce vascular shear stress that lowers resting blood pressure by 8 to 10 mmHg.</li>
            <li><strong>Sodium Moderation &amp; Potassium Optimization:</strong> Capping dietary sodium below 2,300 mg daily (or 1,500 mg for hypertensive adults) while increasing dietary potassium to 3,500–4,700 mg daily restores renal natriuretic balance.</li>
            <li><strong>Stress Reduction &amp; Slow Breathing:</strong> Practicing resonance frequency diaphragmatic breathing (6 breaths per minute for 10 minutes) stimulates parasympathetic vagal tone and lowers systemic peripheral resistance.</li>
          </ul>
          <p>
            Log daily morning and evening seated readings under standardized conditions and share the records with your physician during clinical wellness visits.
          </p>


        
          <h2>Endothelial Nitric Oxide &amp; Nocturnal Blood Pressure Dipping</h2>
          <p>
            Healthy vascular endothelium synthesizes nitric oxide (NO) via endothelial nitric oxide synthase (eNOS) to stimulate vascular smooth muscle relaxation and maintain low systemic arterial resistance. Chronic oxidative stress and high sodium intake uncouple eNOS, reducing NO bioavailability and increasing central aortic stiffness.
          </p>
          <p>
            In normal circadian physiology, systolic and diastolic blood pressure decrease by 10% to 20% during nocturnal sleep (&quot;dipping&quot; pattern). Non-dippers—individuals whose blood pressure fails to decline overnight—experience significantly elevated risks of stroke, left ventricular hypertrophy, and renal failure.
          </p>

        {/* Related Companion Tools Contextual Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Clinical &amp; Metabolic Companion Tools</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Cardiovascular health is deeply intertwined with systemic conditioning and body composition. Evaluate your aerobic exercise intensity with our <a href="/calculators/health/heart-rate-zone-calculator">Heart Rate Zone Calculator</a>, assess cardiorespiratory endurance via the <a href="/calculators/health/vo2-max-calculator">VO2 Max Calculator</a>, and review your vascular adipose profile with the <a href="/calculators/health/bmi-calculator">BMI Calculator</a> and <a href="/calculators/health/body-fat-calculator">Body Fat Calculator</a>.
          </p>
        </section>
      </article>
    </CalcPage>
  );
}
