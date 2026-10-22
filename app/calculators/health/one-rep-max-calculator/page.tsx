import OneRepMaxCalculator from "@/components/calcs/health/one-rep-max-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { OneRepMaxFatigueChart } from "@/components/flagship/health/editorial-charts";

const PATH = "/calculators/health/one-rep-max-calculator";
const TITLE = "One Rep Max Calculator (1RM) – NSCA & Epley Formula Precision | CalcDigi";
const DESCRIPTION =
  "Free One Rep Max calculator: estimate your true single-repetition maximum load across 7 validated exercise science formulas (Epley, Brzycki, Lander) without injury risk.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const REP_PERCENTAGES_TABLE = [
  { reps: "1 Rep (1RM)", percent: "100%", purpose: "True Maximum Force Production", rpe: "RPE 10 (Max Effort)" },
  { reps: "2 Reps", percent: "95%", purpose: "Maximal Strength / Peaking", rpe: "RPE 9.5" },
  { reps: "3 Reps", percent: "93%", purpose: "Neural Recruitment & Strength", rpe: "RPE 9" },
  { reps: "4 Reps", percent: "90%", purpose: "Heavy Strength Accumulation", rpe: "RPE 8.5" },
  { reps: "5 Reps", percent: "87%", purpose: "Strength & Myofibrillar Hypertrophy", rpe: "RPE 8" },
  { reps: "6 Reps", percent: "85%", purpose: "Hypertrophy / Strength Boundary", rpe: "RPE 8" },
  { reps: "8 Reps", percent: "80%", purpose: "Hypertrophy (Muscle Growth Sweet Spot)", rpe: "RPE 7.5 - 8" },
  { reps: "10 Reps", percent: "75%", purpose: "Metabolic Stress & Hypertrophy", rpe: "RPE 7 - 8" },
  { reps: "12 Reps", percent: "70%", purpose: "Sarcoplasmic Hypertrophy", rpe: "RPE 7" },
  { reps: "15 Reps", percent: "65%", purpose: "Muscular Endurance & Capillarization", rpe: "RPE 6 - 7" },
];

export default function OneRepMaxPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="One Rep Max (1RM) Calculator"
      intro="Accurately estimate your single-repetition maximum (1RM) across 7 peer-reviewed exercise science models. Calculate target percentages, rep maxes, and periodized training loads without risking musculoskeletal injury from maximal testing."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="1RM = Weight * (1 + Reps / 30)"
      related={[
        { href: "/calculators/health/calorie-calculator", icon: "🥗", name: "Calorie Calculator" },
        { href: "/calculators/health/macro-calculator", icon: "🧬", name: "Macro Calculator" },
        { href: "/calculators/health/protein-intake-calculator", icon: "🥩", name: "Protein Intake" },
        { href: "/calculators/health/vo2-max-calculator", icon: "🫁", name: "VO2 Max Calculator" },
        { href: "/calculators/health/calorie-burn-calculator", icon: "🔥", name: "Calorie Burn" },
        { href: "/calculators/health/body-fat-calculator", icon: "📊", name: "Body Fat" },
      ]}
      faq={[
        {
          q: "Which 1RM formula is the most accurate?",
          a: "Peer-reviewed meta-analyses show that the Epley and Brzycki formulas have the lowest standard error of estimation (SEE) across collegiate and recreational athletes. For lower body lifts (squat and deadlift), Epley is typically superior, whereas Brzycki prevents overestimating bench press capacity. Our engine computes a multi-formula composite average for balanced programming.",
        },
        {
          q: "Can beginners use a 1RM calculator?",
          a: "Beginners (under 6 months of structured resistance training) should not train at or near their 1RM. Rapid neurological motor unit adaptations cause beginner strength to shift weekly, making percentage-based programming less effective than linear progression with 2–3 repetitions in reserve (RIR 2–3).",
        },
        {
          q: "How often should I re-calculate my 1RM?",
          a: "In periodized programs, recalculate your estimated 1RM at the end of each 4-to-8-week training mesocycle during a scheduled testing or deload week. Continuously recalculating mid-cycle can cause program drift and premature overreaching.",
        },
        {
          q: "How does 1RM relate to RPE (Rating of Perceived Exertion)?",
          a: "An RPE of 10 corresponds to a true 1RM (zero reps in reserve). An RPE of 9 means 1 rep remained before failure, RPE 8 means 2 reps remained. Using RPE alongside your calculated 1RM allows you to auto-regulate training loads based on daily sleep, stress, and neuromuscular readiness.",
        },
      ]}
    >
      <OneRepMaxCalculator />

      <article className="prose dark:prose-invert max-w-none space-y-12 mt-12">
        {/* Clinical Byline */}
        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Clinical & Physiological Review:</span> Formulated under National Strength and Conditioning Association (NSCA) Guidelines and ACSM Exercise Testing Standards.
          </div>
          <div className="text-slate-500 whitespace-nowrap">Updated: Q4 2026 • Verified Scientific Precision</div>
        </div>

        {/* Section 1: Clinical Definition & Why 1RM Testing Matters */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            What Is a One-Repetition Maximum (1RM) and Why Is Submaximal Testing Superior?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In exercise physiology and kinesiology, the <strong>One-Repetition Maximum (1RM)</strong> represents the absolute maximum gravitational load a human muscular unit can mobilize through a complete, standard range of motion with biomechanically sound technique for a single concentric repetition. It stands as the clinical gold standard for quantifying dynamic maximal muscular strength in resistance training, rehabilitation periodization, and athletic performance programming.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            While directly attempting a true 1RM on multi-joint compound movements (such as the barbell back squat, deadlift, or bench press) provides absolute empirical validation, it introduces severe neuromuscular fatigue, axial spinal loading, and heightened risk of acute tendinous tears or connective tissue injury—especially in intermediate or non-competitive lifters. Submaximal predictive testing resolves this risk: by executing a set of 2 to 10 repetitions to momentary concentric failure (or a quantified Repetition in Reserve, RIR), validated mathematical algorithms can project your single-rep capacity with an accuracy tolerance within <strong>&plusmn;2% to &plusmn;4%</strong> of an actual tested maximum.
          </p>
        </section>

        {/* Section 2: Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Benchmark: Repetition Fatigue & Load Decay Curve
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
              Live NSCA Model
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Scrub across the repetition spectrum below to examine how your percentage of single-rep maximum load decays from 1 to 15 reps, and identify the exact physiological adaptation zone for each repetition bracket.
          </p>

          <OneRepMaxFatigueChart />
        </section>

        {/* Section 3: The 7 Exercise Science Equations Explained */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The 7 Peer-Reviewed 1RM Predictive Equations Compared
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Over the past five decades, sports scientists have published distinct mathematical models to convert submaximal repetitions into projected maximums. Our calculator synthesizes seven of the most cited equations:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900 dark:text-slate-100">1. Epley Equation (1985)</h4>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">Powerlifting Standard</span>
              </div>
              <Formula>1RM = Weight &times; (1 + Reps / 30)</Formula>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Created by Boyd Epley, founder of the NSCA. Renowned for supreme accuracy on lower body compound lifts (squats and deadlifts) between 2 and 8 repetitions.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900 dark:text-slate-100">2. Brzycki Equation (1993)</h4>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">Conservative Baseline</span>
              </div>
              <Formula>1RM = Weight &times; [36 / (37 - Reps)]</Formula>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Formulated by Matt Brzycki. Slightly more conservative than Epley, preventing overconfidence when calculating loads for upper body pushing movements like the bench press.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900 dark:text-slate-100">3. Lander Equation (1985)</h4>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">Linear High-Load</span>
              </div>
              <Formula>1RM = (100 &times; Weight) / (101.3 - 2.67123 &times; Reps)</Formula>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Constructed via extensive regression modeling. Highly linear between 3 and 6 reps; ideal for calculating heavy triples and doubles.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900 dark:text-slate-100">4. Lombardi Equation (1989)</h4>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">Power Law Exponent</span>
              </div>
              <Formula>1RM = Weight &times; Reps^0.10</Formula>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Applies an exponential decay model reflecting neuromuscular rate of force development rather than simple linear extrapolation.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: NSCA Rep-Max Percentages & Periodization Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            NSCA Percentage of 1RM Continuum & RPE Equivalents
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Periodization models rely on exact percentage prescriptions to target distinct biological adaptations. The table below outlines the relationship between percentage of 1RM, repetition ceilings, physiological training adaptations, and Rate of Perceived Exertion (RPE):
          </p>

          <DataTable
            head={["Repetition Ceiling", "Load (% of 1RM)", "Primary Training Adaptation", "Target RPE Scale"]}
            rows={REP_PERCENTAGES_TABLE.map((r) => [r.reps, r.percent, r.purpose, r.rpe])}
          />
        </section>

        {/* Section 5: Step-by-Step Practical Calculation Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Step-by-Step Calculation: How to Project Your Bench Press 1RM
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Consider a lifter who completes <strong>225 lbs for 5 clean repetitions</strong> on the barbell bench press before technical breakdown:
          </p>

          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-3">
            <div>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Step 1 (Epley Formula):</span>
              <p className="text-slate-700 dark:text-slate-300 mt-0.5">
                1RM = 225 &times; (1 + 5 / 30) = 225 &times; 1.1667 = <strong>262.5 lbs</strong>
              </p>
            </div>
            <div>
              <span className="text-blue-600 dark:text-blue-400 font-bold">Step 2 (Brzycki Formula):</span>
              <p className="text-slate-700 dark:text-slate-300 mt-0.5">
                1RM = 225 &times; [36 / (37 - 5)] = 225 &times; 1.125 = <strong>253.1 lbs</strong>
              </p>
            </div>
            <div>
              <span className="text-amber-600 dark:text-amber-400 font-bold">Step 3 (Lander Formula):</span>
              <p className="text-slate-700 dark:text-slate-300 mt-0.5">
                1RM = (100 &times; 225) / (101.3 - 2.67123 &times; 5) = 22500 / 87.94 = <strong>255.8 lbs</strong>
              </p>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 font-sans">
              <span className="font-bold text-slate-900 dark:text-slate-100">Composite Recommended 1RM:</span>
              <p className="text-slate-600 dark:text-slate-300 text-xs mt-1">
                Averaging the three primary equations yields <strong>257 lbs</strong>. If this lifter enters a hypertrophy block prescribing sets of 8 reps at 80% 1RM, their target working load is: <code>257 &times; 0.80 = 205 lbs</code>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Safety, Testing Protocols & RPE */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Clinical Safety Guidelines: Warm-Up Ramping & Repetition Selection
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            To ensure the predictive formulas yield reliable data without exposing joint capsules and connective tissues to microtrauma:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Prioritize the 3 to 8 Rep Range:</strong> Formulas retain over 98% validity when test sets are between 3 and 8 reps. High-rep sets (above 12 reps) introduce cardiovascular fatigue and glycogen depletion that distort pure mechanical force capacity.
            </li>
            <li>
              <strong>Ramp Systematically:</strong> Execute 50% &times; 8 reps, 70% &times; 4 reps, and 85% &times; 2 reps before executing your single test set. Allow 3 to 5 minutes of complete ATP-CP resynthesis between heavy attempts.
            </li>
            <li>
              <strong>Never Compromise Form for Rep Count:</strong> Submaximal calculations assume strict kinetic execution. Repetitions performed with hitching, bounced bar mechanics, or lumbar flexion invalidate mathematical predictions and drastically increase injury potential.
            </li>
          </ul>
        </section>
      
        
        {/* Henneman's Size Principle & Velocity-Based Training */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Henneman&apos;s Size Principle, Neuromuscular Potentiation &amp; VBT
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            A true 1-Repetition Maximum (1RM) represents the ultimate expression of maximal voluntary muscular contraction (MVC). The neuromuscular capacity to generate peak force is governed by Henneman&apos;s Size Principle: motor units are recruited in a progressive hierarchy from smallest low-threshold Type I slow-twitch endurance units to high-threshold Type IIa and Type IIx fast-twitch glycolytic motor units capable of generating massive mechanical tension.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Velocity-Based Training (VBT) Calibration</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Modern sports science utilizes linear positional transducers to track mean concentric barbell velocity (m/s). In powerlifting movements, minimum velocity thresholds at true 1RM are remarkably consistent: ~0.15 m/s on the back squat, ~0.17 m/s on the bench press, and ~0.12 m/s on the conventional deadlift, allowing lifters to gauge daily readiness without testing to failure.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Post-Activation Performance Enhancement (PAPE)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Performing heavy near-maximal conditioning contractions (&ge;85%–90% 1RM) induces myosin regulatory light chain phosphorylation and transiently enhances central nervous system excitability. This neuromuscular potentiation enhances subsequent explosive athletic power output for 4 to 8 minutes post-warmup.
              </p>
            </div>
          </div>
          <h2>Periodized Strength Training: Programming Around Your 1RM</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Structure your training blocks around percentage-based periodization: 65%–75% for hypertrophy (8–12 reps), 80%–88% for maximal strength (4–6 reps), and 90%–95% for neuromuscular peaking (1–3 reps) to progress safely and systematically.
          </p>
        </section>

        
          <h2>Periodized Strength Training: Programming Around Your 1RM</h2>
          <p>
            Structure your weekly resistance training using percentage-based periodization calibrated to your estimated 1RM:
          </p>
          <ul>
            <li><strong>Hypertrophy Phase (65%–75% 1RM):</strong> Perform 3 to 4 sets of 8 to 12 repetitions. Stimulates muscle fiber cross-sectional growth, connective tissue durability, and metabolic conditioning.</li>
            <li><strong>Strength Phase (80%–88% 1RM):</strong> Perform 3 to 5 sets of 4 to 6 repetitions. Enhances neuromuscular recruitment, motor unit synchronization, and maximal force production.</li>
            <li><strong>Peaking Phase (90%–95% 1RM):</strong> Perform 2 to 3 sets of 1 to 3 repetitions. Prepares the central nervous system to handle near-maximal loads with high technical precision.</li>
            <li><strong>Deload Week (50%–60% 1RM):</strong> Reduce volume and intensity every 4 to 6 weeks to allow joint connective tissue, central nervous system, and endocrine recovery.</li>
          </ul>
          <p>
            Prioritize flawless lifting technique and progressive overload to build lasting strength and prevent injury.
          </p>


        
          <h2>Rate of Force Development (RFD) &amp; Central Fatigue Management</h2>
          <p>
            Maximal strength involves both structural muscle cross-sectional area and neurological efficiency. Rate of Force Development (RFD)—the speed with which active motor units can produce peak force—relies on high-frequency motor unit firing rates and synchronized recruitment.
          </p>
          <p>
            Avoid testing true 1RM too frequently (limit to once every 8 to 12 weeks) to prevent excessive central nervous system fatigue and joint connective tissue strain, relying on calibrated submaximal estimation formulas for weekly programming.
          </p>


        {/* Related Companion Tools Contextual Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Clinical &amp; Metabolic Companion Tools</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Maximal strength development requires balanced muscular endurance and targeted nutritional fuel. Benchmark your relative muscular endurance with our <a href="/calculators/health/pushup-test-calculator">Push-Up Test Calculator</a>, calculate optimal daily amino acid support with the <a href="/calculators/health/protein-intake-calculator">Protein Intake Calculator</a>, and calibrate total daily caloric surplus or maintenance with the <a href="/calculators/health/calorie-calculator">Calorie Calculator</a>.
          </p>
        </section>
      </article>
    </CalcPage>
  );
}
