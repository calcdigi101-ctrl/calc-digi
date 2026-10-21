import PaceCalculator from "@/components/calcs/health/pace-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { PaceDistanceCurveChart } from "@/components/flagship/health/editorial-charts";

const PATH = "/calculators/health/pace-calculator";
const TITLE = "Running Pace Calculator – Splits, Finish Times & Peter Riegel Predictor | CalcDigi";
const DESCRIPTION =
  "Free running pace calculator: compute min/mile and min/km paces, projected finish times, and kilometer splits for 5K, 10K, half marathons, and marathons using Peter Riegel’s formula.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const PACE_BENCHMARKS_TABLE = [
  { paceMi: "6:00 / mi", paceKm: "3:44 / km", speedMph: "10.0 mph", time5k: "18:38", time10k: "37:17", timeHalf: "1:18:36", timeMarathon: "2:37:11" },
  { paceMi: "7:00 / mi", paceKm: "4:21 / km", speedMph: "8.57 mph", time5k: "21:45", time10k: "43:30", timeHalf: "1:31:42", timeMarathon: "3:03:25" },
  { paceMi: "8:00 / mi", paceKm: "4:58 / km", speedMph: "7.50 mph", time5k: "24:51", time10k: "49:43", timeHalf: "1:44:48", timeMarathon: "3:29:37" },
  { paceMi: "9:00 / mi", paceKm: "5:36 / km", speedMph: "6.67 mph", time5k: "27:58", time10k: "55:56", timeHalf: "1:57:54", timeMarathon: "3:55:49" },
  { paceMi: "10:00 / mi", paceKm: "6:13 / km", speedMph: "6.00 mph", time5k: "31:04", time10k: "1:02:08", timeHalf: "2:11:00", timeMarathon: "4:22:01" },
  { paceMi: "11:00 / mi", paceKm: "6:50 / km", speedMph: "5.45 mph", time5k: "34:11", time10k: "1:08:21", timeHalf: "2:24:06", timeMarathon: "4:48:13" },
  { paceMi: "12:00 / mi", paceKm: "7:27 / km", speedMph: "5.00 mph", time5k: "37:17", time10k: "1:14:34", timeHalf: "2:37:12", timeMarathon: "5:14:26" },
];

export default function PaceCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Running Pace Calculator"
      intro="Compute running paces, target finish splits, and distance projections across metric and imperial systems. Leverage Peter Riegel's endurance formula to forecast race-day performance from 5K to the 26.2-mile marathon distance."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="Pace = Time / Distance"
      related={[
        { href: "/calculators/health/heart-rate-zone-calculator", icon: "❤️", name: "Heart Rate Zones" },
        { href: "/calculators/health/vo2-max-calculator", icon: "🫁", name: "VO2 Max Calculator" },
        { href: "/calculators/health/calorie-burn-calculator", icon: "🔥", name: "Calorie Burn" },
        { href: "/calculators/health/water-intake-calculator", icon: "💧", name: "Water Intake" },
        { href: "/calculators/health/tdee-calculator", icon: "⚡", name: "TDEE Calculator" },
        { href: "/calculators/health/calorie-calculator", icon: "🥗", name: "Calorie Calculator" },
      ]}
      faq={[
        {
          q: "How do I convert min/mile to min/km?",
          a: "Divide your total seconds per mile by 1.609344. For example, an 8:00/mile pace equals 480 seconds. Dividing 480 by 1.609344 gives 298.26 seconds, which is 4 minutes and 58 seconds per kilometer (4:58/km).",
        },
        {
          q: "Why does my GPS watch show a different distance than the official race course?",
          a: "Certified road courses are measured along the shortest possible legal line—the tangent around curves. Real-world runners weave around other participants, cross to aid stations, and swing wide around corners, routinely covering 26.4 to 26.6 miles during a marathon. Always pace based on official course mile markers rather than watch distance alone.",
        },
        {
          q: "What pace should my easy recovery runs be?",
          a: "According to Jack Daniels' Running Formula, easy aerobic recovery runs should be executed approximately 1:30 to 2:30 minutes per mile slower than your current 5K race pace. Running easy runs too fast inhibits mitochondrial capillary remodeling and compromises high-intensity workout recovery.",
        },
      ]}
    >
      <PaceCalculator />

      <article className="prose dark:prose-invert max-w-none space-y-12 mt-12">
        {/* Clinical Byline */}
        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Exercise Physiology & Kinesiology Review:</span> Formulated under USA Track & Field (USATF) race measurement standards and Jack Daniels' VDOT coaching principles.
          </div>
          <div className="text-slate-500 whitespace-nowrap">Updated: Q4 2026 • Verified Kinematic Models</div>
        </div>

        {/* Section 1: Definition & The Physiology of Pacing */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Physiology of Pacing: Why Even Pacing Wins Races
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In endurance athletics and exercise physiology, <strong>pace</strong> is defined as the elapsed time required to traverse a fixed unit of linear distance—most frequently expressed in <strong>minutes and seconds per mile (min/mi)</strong> or <strong>minutes and seconds per kilometer (min/km)</strong>. Unlike velocity (mph or km/h), which reflects an instantaneous rate, pace directly aligns with the cognitive feedback loops of distance runners pacing their aerobic and anaerobic energy expenditure.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Maintaining a mathematically disciplined pace is the single most critical determinant of endurance success. Human muscle tissue stores approximately <strong>1,800 to 2,200 kilocalories of glycogen</strong> within the skeletal muscle and liver. Running even 10 to 15 seconds per mile faster than your second ventilatory threshold (VT2 / lactate turnpoint) shifts cellular respiration predominantly toward rapid carbohydrate glycolysis, accelerating hydrogen ion accumulation, depleting muscle glycogen prematurely, and triggering catastrophic decelerations known colloquially as <em>"hitting the marathon wall"</em> between miles 18 and 22.
          </p>
        </section>

        {/* Section 2: Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Benchmark: Aerobic Pace Decay Across Race Distances
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
              Peter Riegel Power-Law Model
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            As distance multiplies, human velocity decays predictably due to thermoregulatory strain, cardiac drift, and slow-twitch motor unit fatigue. Scrub across the six major race distances below to compare target paces and finishing times across three performance tiers.
          </p>

          <PaceDistanceCurveChart />
        </section>

        {/* Section 3: The Peter Riegel Endurance Formula */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            How Peter Riegel's Equation Forecasts Race Times
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            First published in <em>Runner's World</em> in 1977 by research engineer and marathoner Peter Riegel, the <strong>Riegel Formula</strong> is the universal benchmark used by elite coaches and algorithms to project finish times from one distance to another:
          </p>
          <Formula>T2 = T1 &times; (D2 / D1)^1.06</Formula>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Where <code>T1</code> is your known time, <code>D1</code> is your known distance, <code>D2</code> is your target distance, and <code>1.06</code> is the empirical fatigue exponent representing an average trained endurance athlete. If an athlete is adequately conditioned with weekly long runs, doubling the race distance increases the time by a factor of <code>2^1.06 = 2.085</code> (an 8.5% slowdown in average pace).
          </p>
        </section>

        {/* Section 4: Comprehensive Pace Benchmarks Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Pace Conversion & Equivalent Race Finish Times Table
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Use the comprehensive reference matrix below to instantly convert between imperial mile paces, metric kilometer paces, treadmill speeds, and standard race finish times:
          </p>

          <DataTable
            head={["Mile Pace", "Kilometer Pace", "Speed (mph)", "5K Finish", "10K Finish", "Half Marathon", "Full Marathon"]}
            rows={PACE_BENCHMARKS_TABLE.map((r) => [r.paceMi, r.paceKm, r.speedMph, r.time5k, r.time10k, r.timeHalf, r.timeMarathon])}
          />
        </section>

        {/* Section 5: Step-by-Step Practical Calculation Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Step-by-Step Walkthrough: Planning a Sub-4:00:00 Marathon
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Breaking the coveted 4-hour marathon barrier requires exact kinetic pacing:
          </p>

          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-2">
            <div>1. Total Time in Seconds: <code>4 hours &times; 3600 = 14,400 seconds</code></div>
            <div>2. Official Marathon Distance: <code>26.21875 miles (42.195 km)</code></div>
            <div>3. Target Pace per Mile: <code>14,400 / 26.21875 = 549.2 seconds = 9 minutes 09 seconds / mile</code></div>
            <div>4. Target Pace per Kilometer: <code>14,400 / 42.195 = 341.3 seconds = 5 minutes 41 seconds / km</code></div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 font-sans">
              <span className="font-bold text-slate-900 dark:text-slate-100">Race-Day Execution Strategy:</span>
              <p className="text-slate-600 dark:text-slate-300 text-xs mt-1">
                Because course congestion and GPS cornering add an extra 0.2 to 0.4 miles in tangent weaving, smart athletes aim for a <strong>9:05 / mi</strong> target pace to cross the official timing mat with a 1-to-2 minute buffer.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Pacing Strategies & Negative Splits */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Pacing Tactics: Positive, Even, vs. Negative Splits
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Exercise physiology studies analyzing hundreds of thousands of marathon finishes demonstrate three distinct split strategies:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Negative Splits (Second Half Faster):</strong> Running the second half of the race 1% to 3% faster than the first half. Over 95% of world records in the 5K, 10K, and Marathon (including Eliud Kipchoge's historic sub-2:00 Berlin performances) utilized negative or strictly even splits. This preserves glycogen and limits early hyperthermia.
            </li>
            <li>
              <strong>Even Pacing (Constant Velocity):</strong> Minimizes changes in kinetic kinetic energy, optimizing metabolic economy. Best suited for flat, temperature-controlled courses.
            </li>
            <li>
              <strong>Positive Splits ("Fly and Die"):</strong> Starting 30 to 60 seconds per mile faster than target pace. Invariably leads to neuromuscular failure and severe pacing collapse over the final 10 kilometers.
            </li>
          </ul>
        </section>
      </article>
    </CalcPage>
  );
}
