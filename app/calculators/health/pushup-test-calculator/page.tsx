import PushupTestCalculator from "@/components/calcs/health/pushup-test-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { PushupFitnessStandardsChart } from "@/components/flagship/health/editorial-charts/PushupFitnessStandardsChart";

const PATH = "/calculators/health/pushup-test-calculator";
const TITLE = "Pushup Test Calculator – ACSM Fitness Standards & Harvard Longevity | CalcDigi";
const DESCRIPTION =
  "Free pushup test calculator: evaluate your upper body muscular endurance against ACSM age/sex norms and the Harvard Medical School cardiovascular longevity threshold.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const ACSM_PUSHUP_TABLE = [
  { group: "Men 20–29", exc: "≥ 36", vg: "29 – 35", good: "22 – 28", fair: "17 – 21", poor: "< 17" },
  { group: "Men 30–39", exc: "≥ 30", vg: "22 – 29", good: "17 – 21", fair: "12 – 16", poor: "< 12" },
  { group: "Men 40–49", exc: "≥ 25", vg: "17 – 24", good: "13 – 16", fair: "10 – 12", poor: "< 10" },
  { group: "Men 50–59", exc: "≥ 21", vg: "13 – 20", good: "10 – 12", fair: "7 – 9", poor: "< 7" },
  { group: "Men 60+", exc: "≥ 18", vg: "11 – 17", good: "8 – 10", fair: "5 – 7", poor: "< 5" },
  { group: "Women 20–29", exc: "≥ 30", vg: "21 – 29", good: "15 – 20", fair: "10 – 14", poor: "< 10" },
  { group: "Women 30–39", exc: "≥ 27", vg: "20 – 26", good: "13 – 19", fair: "8 – 12", poor: "< 8" },
  { group: "Women 40–49", exc: "≥ 24", vg: "15 – 23", good: "11 – 14", fair: "5 – 10", poor: "< 5" },
  { group: "Women 50–59", exc: "≥ 21", vg: "11 – 20", good: "7 – 10", fair: "4 – 6", poor: "< 4" },
  { group: "Women 60+", exc: "≥ 17", vg: "12 – 16", good: "5 – 11", fair: "2 – 4", poor: "< 2" },
];

export default function PushupTestPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Pushup Test Calculator"
      intro="Evaluate your upper-body muscular endurance and cardiorespiratory health against clinical American College of Sports Medicine (ACSM) standards. Discover your percentile ranking and assess cardiovascular longevity risk."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="Endurance Percentile = f(Reps, Age, Biological Sex)"
      related={[
        { href: "/calculators/health/one-rep-max-calculator", icon: "🏋️", name: "One Rep Max" },
        { href: "/calculators/health/vo2-max-calculator", icon: "🫁", name: "VO2 Max" },
        { href: "/calculators/health/heart-rate-zone-calculator", icon: "❤️", name: "Heart Rate Zones" },
        { href: "/calculators/health/calorie-burn-calculator", icon: "🔥", name: "Calorie Burn" },
        { href: "/calculators/health/body-fat-calculator", icon: "📊", name: "Body Fat" },
        { href: "/calculators/health/bmi-calculator", icon: "⚖️", name: "BMI Calculator" },
      ]}
      faq={[
        {
          q: "What was the landmark finding of the 2019 Harvard Pushup Study?",
          a: "In 2019, Harvard T.H. Chan School of Public Health researchers published a 10-year prospective study in JAMA Network Open tracking 1,104 active adult firefighters. They found that participants capable of completing more than 40 pushups had a 96% reduction in incident cardiovascular disease events (heart attack, heart failure, and coronary artery disease) compared to those who could complete fewer than 10 pushups.",
        },
        {
          q: "What constitutes strict pushup form for clinical testing?",
          a: "The standard ACSM protocol requires starting in a full plank position with hands shoulder-width apart, spine neutral, and feet together. The subject lowers until the chest grazes a 3-inch foam block (or the elbows bend to at least 90 degrees), then presses up to full elbow extension. The test terminates upon any pausing, hip sagging, or mechanical failure.",
        },
        {
          q: "Are knee pushups acceptable for women in the ACSM test?",
          a: "The classical ACSM Guidelines for Exercise Testing included a modified knee pushup protocol for women. However, modern exercise science curricula increasingly evaluate women using the standard full-body toe pushup, adjusting normative percentile cutoffs accordingly to measure true core anti-extension and full kinetic chain integrity.",
        },
      ]}
      article={
        <>

        {/* Clinical Byline */}
        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Kinesiology & Physical Readiness Review:</span> Calibrated to the American College of Sports Medicine (ACSM 11th Edition) Health-Related Physical Fitness Testing manual and Harvard Chan School of Public Health clinical studies.
          </div>
          <div className="text-slate-500 break-words leading-relaxed">Updated: Q4 2026 • Verified Epidemiological Standards</div>
        </div>

        {/* Section 1: Muscular Endurance Definition */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Why the Push-Up Is the Premier Functional Biomarker of Upper-Body Health
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In physical therapy, sports medicine, and tactical conditioning, the standard floor pushup is not merely a chest-building exercise—it is a comprehensive, closed-kinetic-chain assessment of <strong>upper-body muscular endurance, shoulder glenohumeral stability, and anterior core anti-extension strength</strong>. Executing a strict pushup demands simultaneous activation of the pectoralis major, anterior deltoid, triceps brachii, serratus anterior, rectus abdominis, and quadriceps.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Biomechanical force plate analyses indicate that during a standard plank pushup, an individual supports approximately <strong>64% of their total body mass</strong> at the top of the movement and <strong>69% to 75% of their body mass</strong> at the bottom of the descent. In a modified knee pushup, this mechanical load drops to roughly 53% to 61% of total body mass.
          </p>
        </section>

        {/* Section 2: Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Benchmark: Pushup Endurance Decay Curve Across Aging
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
              ACSM 50-Year Normative Database
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Upper body muscular endurance naturally declines as Type II muscle motor units atrophy with age. Scrub across the adult lifespan below (ages 20 to 65) to benchmark your performance against ACSM deciles and the critical Harvard 40+ longevity threshold line.
          </p>

          <PushupFitnessStandardsChart />
        </section>

        {/* Section 3: Harvard JAMA Longitudinal Study */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The 2019 Harvard Medical Study: Pushup Capacity as an Independent Predictor of Mortality
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In February 2019, a research team from <strong>Harvard T.H. Chan School of Public Health</strong> and Cambridge Health Alliance published a landmark paper in <em>JAMA Network Open</em> (Yang et al.) titled <em>"Association Between Push-up Capacity and Future Cardiovascular Events Among Active Adult Men."</em> Over a 10-year observation window, researchers tracked 1,104 occupationally active male firefighters with a mean age of 39.6 years:
          </p>
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 not-prose my-6">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Key Epidemiological Findings:
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li>
                <strong>The 40-Pushup Milestone:</strong> Men able to complete <strong>40 or more pushups</strong> exhibited a <strong>96% reduction</strong> in incident cardiovascular disease (CVD) events compared with those able to complete fewer than 10 pushups (hazard ratio = 0.04).
              </li>
              <li>
                <strong>Superior to Submaximal Treadmill Testing:</strong> Pushup capacity demonstrated a more robust statistical correlation with reduced long-term cardiovascular events than standard submaximal treadmill exercise stress tests.
              </li>
              <li>
                <strong>Clinical Takeaway:</strong> Pushup capacity serves as a cost-free, rapid surrogate marker of systemic cardiorespiratory fitness, autonomic vascular tone, and overall muscular functional reserve.
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4: ACSM Normative Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            ACSM Push-Up Test Normative Standards (Men & Women)
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The American College of Sports Medicine classifies muscular endurance into five distinct performance brackets based on sex and decade of life:
          </p>

          <DataTable
            head={["Age & Sex Cohort", "Excellent (Top 10%)", "Very Good (Top 25%)", "Good (Median)", "Fair", "Needs Improvement"]}
            rows={ACSM_PUSHUP_TABLE.map((r) => [r.group, r.exc, r.vg, r.good, r.fair, r.poor])}
          />
        </section>

        {/* Section 5: Step-by-Step Practical Calculation Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Step-by-Step Testing Protocol: Administering the ACSM Pushup Test
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            To ensure your test score reflects valid exercise physiology norms, follow strict clinical administration guidelines:
          </p>

          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-2">
            <div>1. Warm-Up: Perform 3 minutes of light aerobic movement and dynamic shoulder rotations (scapular wall slides, arm circles).</div>
            <div>2. Setup: Place hands shoulder-width apart, fingers pointed forward or slightly outward. Extend legs with feet no wider than 12 inches apart.</div>
            <div>3. Execution: Lower the torso until the sternum touches a 3-inch fist or foam block on the floor (elbows flexed to &ge; 90 degrees).</div>
            <div>4. Extension: Push upward maintaining a rigid, straight line from heels to ears until elbows reach full terminal extension.</div>
            <div>5. Termination Criteria: The test concludes immediately when the subject rests in the up or down position for &gt; 2 seconds, sags at the lumbar spine, or fails to achieve full extension for two consecutive reps.</div>
          </div>
        </section>

        {/* Section 6: Programming to Increase Pushups */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Evidence-Based Programming to Boost Pushup Endurance
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Muscular endurance responds to high submaximal training volume paired with progressive density:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Pavel Tsatsouline's "Grease the Groove" (GtG):</strong> Execute 50% of your max rep count 4 to 6 times throughout the day, separated by at least 1 hour of rest. This neurological motor-learning method conditions neuromuscular pathways without inducing metabolic fatigue or muscle soreness.
            </li>
            <li>
              <strong>Rest-Pause Accumulation Sets:</strong> Perform a set to 1 rep before failure, rest 20 seconds, execute another 3 to 5 reps, rest 20 seconds, and complete a final 3 reps. This conditions muscle fibers to buffer intracellular lactate and regenerate phosphocreatine rapidly.
            </li>
            <li>
              <strong>Integrated Functional Conditioning:</strong> Pair upper-body endurance tests with absolute muscular strength assessments via our <a href="/calculators/health/one-rep-max-calculator">One Rep Max Calculator</a>, assess cardiorespiratory capacity with the <a href="/calculators/health/vo2-max-calculator">VO2 Max Calculator</a>, and fuel myofibrillar recovery using our <a href="/calculators/health/protein-intake-calculator">Protein Intake Calculator</a>.
            </li>
          </ul>
        </section>
      
        {/* Closed Kinetic Chain Mechanics & Cardiovascular Hazard */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Biomechanical Load Profiling &amp; Harvard Cardiovascular Findings
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The standard pushup is a closed-kinetic-chain multi-joint movement that evaluates upper-body muscular endurance, core anti-extension stability, and scapulothoracic rhythm. Biomechanical force plate studies confirm that a standard pushup requires supporting approximately 64% of total body mass at the top lockout position and 69% to 75% at the bottom 90-degree elbow flexion inflection point.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">The Harvard 40-Pushup Cardiovascular Study</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                A landmark 10-year prospective study published in <em>JAMA Network Open</em> evaluated active middle-aged men and discovered that individuals capable of completing 40 or more pushups exhibited a 96% lower hazard of incident cardiovascular events (coronary artery disease, heart failure, myocardial infarction) compared to those completing fewer than 10 pushups.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Core Lumbo-Pelvic Alignment &amp; Shoulder Safety</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Flawless pushup biomechanics require maintaining an isometric core plank: rectus abdominis, obliques, and gluteus maximus must fire synchronously to eliminate lumbar lordotic sagging. Flare elbows at a 45-degree angle relative to the torso to protect the subacromial space from rotator cuff impingement.
              </p>
            </div>
          </div>
          <h2>Progressive Overload Pushup Training Protocols</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Systematically increasing pushup muscular endurance requires structured overload without training to catastrophic muscular failure on every set:
          </p>
          <ul>
            <li><strong>Incline &amp; Elevation Progressions:</strong> Novices should begin with hands elevated on a bench or sturdy bar, gradually lowering the incline angle as core and chest strength develop before progressing to floor pushups.</li>
            <li><strong>Submaximal Density Sets:</strong> Rather than testing one all-out exhaustion set daily, perform 5 to 8 sets throughout the day at 50% to 60% of your maximum rep count. This builds neuromuscular motor pattern efficiency with zero recovery debt.</li>
            <li><strong>Eccentric Slow-Cadence Reps:</strong> Lower the chest over 3 to 4 seconds before pressing up explosively. Eccentric overload strengthens connective tendons and builds muscle protein synthesis.</li>
            <li><strong>Isometric Bottom Pauses:</strong> Pausing for 1 to 2 seconds at the 90-degree bottom position eliminates elastic stretch-reflex recoil, building pure starting strength from the pectoral muscles and triceps.</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Retest your maximum pushup capacity every 4 to 8 weeks using strict clinical cadence (touching chest to floor without pausing or breaking hip alignment) to measure genuine upper-body functional stamina.
          </p>
        </section>
      
          <h2>Progressive Pushup Training Protocols: From Novice to 40+ Reps</h2>
          <p>
            Systematically increasing pushup muscular endurance requires structured overload without training to catastrophic muscular failure on every set:
          </p>
          <ul>
            <li><strong>Incline &amp; Elevation Progressions:</strong> Novices should begin with hands elevated on a bench or sturdy bar, gradually lowering the incline angle as core and chest strength develop before progressing to floor pushups.</li>
            <li><strong>Submaximal Density Sets (The Grease the Groove Method):</strong> Rather than testing one all-out exhaustion set daily, perform 5 to 8 sets throughout the day at 50% to 60% of your maximum rep count (e.g. sets of 10 reps if max is 20). This builds neuromuscular motor pattern efficiency with zero recovery debt.</li>
            <li><strong>Eccentric Slow-Cadence Reps:</strong> Lower the chest over 3 to 4 seconds before pressing up explosively. Eccentric overload strengthens connective tendons and builds muscle protein synthesis.</li>
            <li><strong>Isometric Bottom Pauses:</strong> Pausing for 1 to 2 seconds at the 90-degree bottom position eliminates elastic stretch-reflex recoil, building pure starting strength from the pectoral muscles and triceps.</li>
          </ul>
          <p>
            Test your maximum consecutive pushup count once every 4 to 6 weeks under strict clinical standards to benchmark functional upper-body fitness.
          </p>

      
          <h2>Core Anti-Extension Strength &amp; Scapular Rhythm</h2>
          <p>
            Performing consecutive pushups with clinical precision demands robust isometric core endurance. The anterior kinetic chain—primarily the rectus abdominis, transversus abdominis, and internal obliques—must fire isometrically to resist gravity-induced lumbar hyperextension. Allowing the hips to sag indicates anterior core muscular fatigue, which transfers compressive shear stress onto the lumbosacral facet joints.
          </p>
          <p>
            Simultaneously, the serratus anterior and middle/lower trapezius muscles must coordinate smooth scapular protraction and retraction along the thoracic ribcage. Maintaining active scapular control prevents winging and optimizes pectoral and triceps recruitment throughout the full range of motion.
          </p>

              </>
      }
    >
      <PushupTestCalculator />
    </CalcPage>
  );
}
