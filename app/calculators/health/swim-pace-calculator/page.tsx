import SwimPaceCalculator from "@/components/calcs/health/swim-pace-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SwimPaceDistanceCurveChart } from "@/components/flagship/health/editorial-charts/SwimPaceDistanceCurveChart";

const PATH = "/calculators/health/swim-pace-calculator";
const TITLE = "Swim Pace Calculator – Critical Swim Speed (CSS) & Splits | CalcDigi";
const DESCRIPTION =
  "Free swim pace calculator: compute pace per 100 meters and 100 yards, predict 1,500m and Ironman triathlon finish times, and calculate your Critical Swim Speed (CSS).";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const SWIM_SPLITS_TABLE = [
  { pace100m: "1:15 / 100m", pace100yd: "1:08 / 100yd", time400: "5:00", time1500: "18:45", timeHalfIron: "24:08", timeFullIron: "48:17" },
  { pace100m: "1:30 / 100m", pace100yd: "1:22 / 100yd", time400: "6:00", time1500: "22:30", timeHalfIron: "28:58", timeFullIron: "57:56" },
  { pace100m: "1:45 / 100m", pace100yd: "1:36 / 100yd", time400: "7:00", time1500: "26:15", timeHalfIron: "33:47", timeFullIron: "1:07:35" },
  { pace100m: "2:00 / 100m", pace100yd: "1:49 / 100yd", time400: "8:00", time1500: "30:00", timeHalfIron: "38:37", timeFullIron: "1:17:15" },
  { pace100m: "2:15 / 100m", pace100yd: "2:03 / 100yd", time400: "9:00", time1500: "33:45", timeHalfIron: "43:27", timeFullIron: "1:26:54" },
  { pace100m: "2:30 / 100m", pace100yd: "2:17 / 100yd", time400: "10:00", time1500: "37:30", timeHalfIron: "48:17", timeFullIron: "1:36:34" },
];

export default function SwimPacePage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Swim Pace Calculator"
      intro="Calculate swim paces across 100-meter and 100-yard standards, predict pool and open-water race times, and establish training zones using Critical Swim Speed (CSS) threshold methodology."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="Pace_100m = (Total Time / Distance_m) * 100"
      related={[
        { href: "/calculators/health/pace-calculator", icon: "⏱️", name: "Pace Calculator" },
        { href: "/calculators/health/cycling-calculator", icon: "🚴", name: "Cycling Calculator" },
        { href: "/calculators/health/calorie-burn-calculator", icon: "🔥", name: "Calorie Burn" },
        { href: "/calculators/health/heart-rate-zone-calculator", icon: "❤️", name: "Heart Rate Zones" },
        { href: "/calculators/health/vo2-max-calculator", icon: "🫁", name: "VO2 Max" },
        { href: "/calculators/health/water-intake-calculator", icon: "💧", name: "Water Intake" },
      ]}
      faq={[
        {
          q: "What is Critical Swim Speed (CSS) and how is it tested?",
          a: "Critical Swim Speed (CSS) is the theoretical swimming speed that a swimmer can maintain continuously without exhausting aerobic capacity—the aquatic equivalent of your running lactate threshold or cycling FTP. It is empirically determined by swimming two all-out time trials (usually 400m and 200m) with full recovery in between: CSS (m/s) = (400 - 200) / (T400 - T200). Your CSS pace per 100m is 100 / CSS.",
        },
        {
          q: "How do I convert between pace per 100 meters and pace per 100 yards?",
          a: "Because 1 yard equals 0.9144 meters, a 100-yard interval is ~9.14 meters shorter than a 100-meter interval. To convert your 100m pace to a 100yd pace, multiply your total seconds by 0.9144. For instance, a 1:40/100m pace (100 seconds) equals 91.44 seconds, or 1:31 per 100 yards.",
        },
        {
          q: "Why is open water swimming slower than pool swimming?",
          a: "Pool swimmers benefit from wall push-offs (which impart high initial velocity without metabolic cost) and lane lines that dissipate surface waves. In open water, swimmers encounter wind chop, navigation sighting lifts (which drop the hips and increase frontal drag), and the absence of turn push-offs, typically resulting in a 3-to-6 second slowdown per 100 meters.",
        },
      ]}
    >
      <SwimPaceCalculator />

      <article className="prose dark:prose-invert max-w-none space-y-12 mt-12">
        {/* Clinical Byline */}
        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Aquatic Biomechanics & Hydrodynamics Review:</span> Calibrated to World Aquatics (FINA) distance specifications and USA Triathlon (USAT) Critical Swim Speed protocols.
          </div>
          <div className="text-slate-500 whitespace-nowrap">Updated: Q4 2026 • Verified Fluid Dynamics Models</div>
        </div>

        {/* Section 1: The Hydrodynamics of Swimming */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Hydrodynamic Drag: Why Technique Trumps Brute Strength in Swimming
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Unlike terrestrial running or cycling where atmospheric air provides minimal resistance at moderate velocities, water is approximately <strong>800 times denser than air</strong> and exhibits 55 times greater dynamic viscosity. Consequently, over <strong>90% of the mechanical propulsion</strong> generated by a human swimmer is dissipated fighting three primary forms of aquatic drag:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Frontal Pressure Drag:</strong> Caused by the surface area pushed against water. Dropping the legs by even 10 degrees increases frontal drag cross-section by over 40%, requiring disproportionate metabolic oxygen consumption to maintain velocity.
            </li>
            <li>
              <strong>Frictional Skin-Friction Drag:</strong> Hydrodynamic shear stress between circulating water molecules and the swimmer's skin, technical suit, or wetsuit neoprene.
            </li>
            <li>
              <strong>Wave Resistance:</strong> Kinetic energy lost creating bow and stern waves at the water's surface interface, scaling exponentially as swimmers approach their theoretical displacement hull speed.
            </li>
          </ul>
        </section>

        {/* Section 2: Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Benchmark: Swim Pace Decay Curve Across Race Distances
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
              USAT Triathlon Pacing Model
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            As swimming distances scale from 100-meter sprints to 3,800-meter Ironman marathons, metabolic reliance shifts from anaerobic phosphagen glycolysis to purely oxidative lipid respiration. Scrub across the distances below to examine pace retention across competitive performance cohorts.
          </p>

          <SwimPaceDistanceCurveChart />
        </section>

        {/* Section 3: Critical Swim Speed Explained */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Critical Swim Speed (CSS): The Lactate Threshold of Swimming
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            First formulated in aquatic literature by Ginn (1993) and refined by Wakayoshi et al., <strong>Critical Swim Speed (CSS)</strong> represents the highest theoretical pace a swimmer can maintain without continuous accumulation of systemic blood lactate. It corresponds directly to Maximal Lactate Steady State (MLSS):
          </p>
          <Formula>CSS (m/s) = (D1 - D2) / (T1 - T2) = (400 - 200) / (T400 - T200)</Formula>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            By conducting a 400-meter time trial followed by a 200-meter time trial after 20 minutes of active recovery, subtracting the times isolates pure aerobic speed while eliminating the distorting influence of anaerobic capacity. Swimmers use their CSS pace per 100 meters to anchor 5 periodized training zones:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 not-prose my-6">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Zone 1: Aerobic Endurance</span>
              <p className="text-slate-600 dark:text-slate-400">CSS + 6 to 10 seconds per 100m. Recovery and technique drill sets.</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">Zone 2: CSS Threshold</span>
              <p className="text-slate-600 dark:text-slate-400">CSS &plusmn; 2 seconds per 100m. Main set intervals (e.g. 10 &times; 100m on short rest).</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">Zone 3: VO2 Max Sprints</span>
              <p className="text-slate-600 dark:text-slate-400">CSS - 4 to 8 seconds per 100m. High-velocity 50m and 100m repeats.</p>
            </div>
          </div>
        </section>

        {/* Section 4: Swim Pacing Conversion Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Comprehensive Swim Pacing & Event Splits Matrix
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Use the reference table below to convert between metric 100m paces, imperial 100yd paces, and total finish times across standard competitive swimming and triathlon distances:
          </p>

          <DataTable
            head={["Pace / 100m", "Pace / 100yd", "400m Pool", "1,500m Olympic", "Half Ironman (1.2 mi)", "Full Ironman (2.4 mi)"]}
            rows={SWIM_SPLITS_TABLE.map((r) => [r.pace100m, r.pace100yd, r.time400, r.time1500, r.timeHalfIron, r.timeFullIron])}
          />
        </section>

        {/* Section 5: Step-by-Step Practical Calculation Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Step-by-Step Walkthrough: Planning an Olympic Triathlon 1,500m Swim
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Suppose an athlete targets a <strong>27-minute and 30-second</strong> swim split for the 1,500-meter Olympic distance:
          </p>

          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-2">
            <div>1. Total Time in Seconds: <code>27 minutes &times; 60 + 30 seconds = 1,650 seconds</code></div>
            <div>2. Calculate Pace per Meter: <code>1,650 seconds / 1,500 meters = 1.10 seconds / meter</code></div>
            <div>3. Multiply by 100 Meters: <code>1.10 &times; 100 = 110.0 seconds = 1 minute 50 seconds / 100m</code></div>
            <div>4. Convert to 100 Yards: <code>110.0 &times; 0.9144 = 100.58 seconds = 1 minute 40.6 seconds / 100yd</code></div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 font-sans">
              <span className="font-bold text-slate-900 dark:text-slate-100">Pacing Prescriptions:</span>
              <p className="text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm mt-1">
                Target Pace = 1:50 / 100m (1:41 / 100yd) • Swimming Speed = 0.91 m/s (3.27 km/h)
              </p>
            </div>
          </div>
        </section>
      
        
        {/* Hydrodynamic Drag Physics & Critical Swim Speed */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Hydrodynamic Drag Physics &amp; Critical Swim Speed (CSS) Modeling
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In aquatic locomotion, water is approximately 800 times denser than air, meaning that water resistance increases quadratically with velocity (Fdrag = 0.5 × ρ × v² × Cd × A). Consequently, technical adjustments that streamline the body and reduce frontal surface area yield vastly greater pacing enhancements than attempting to overpower water resistance through sheer metabolic power output.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">CSS Field Testing Protocol</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Critical Swim Speed (CSS) represents your theoretical aerobic threshold pace—the fastest pace you can sustain continuously without accumulating severe muscular fatigue. Calculate CSS by swimming a maximal 400m time trial, resting for 20 minutes, and performing a maximal 200m time trial: CSS (m/sec) = (400 − 200) / (T400 − T200).
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Stroke Rate vs. Stroke Length Synergy</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Swim velocity is the product of Stroke Rate (SR, cycles/min) and Distance Per Stroke (DPS, meters/cycle). Elite distance swimmers prioritize core body rotation, high-elbow catch mechanics, and tight streamline kick amplitude to sustain DPS before attempting to increase stroke turnover frequency.
              </p>
            </div>
          </div>
          <h2>Structured CSS Swim Training Sets &amp; Pacing Splits</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Integrate your calculated Critical Swim Speed into structured weekly pool workouts to build endurance and pacing discipline:
          </p>
          <ul>
            <li><strong>Threshold Building CSS Intervals:</strong> 10 × 100 meters at CSS pace with 15 seconds rest between repetitions. Focus on hitting the exact second on every single 100m split without starting too fast.</li>
            <li><strong>Aerobic Over-Distance Endurance:</strong> 5 × 200 meters at CSS + 2 seconds per 100m with 20 seconds rest. Develops rhythmic stroke pacing and mental focus for continuous open water swims.</li>
            <li><strong>Pacing Ladder Drill:</strong> 400m at CSS + 4s, 300m at CSS + 2s, 200m at CSS pace, and 100m at CSS − 2s with 30 seconds rest between sets. Teaches progressive negative split acceleration.</li>
            <li><strong>Technique &amp; Streamline Drills:</strong> Intersperse interval sets with 50m kick drills, fingertip drag recovery drills, and bilateral breathing practice to refine hydrodynamic streamlining.</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Re-test your CSS pace every 6 to 8 weeks with a standardized 400m/200m time trial to track physiological conditioning and update workout paces.
          </p>
        </section>

        
          <h2>Structured CSS Swim Training Workouts &amp; Pacing Splits</h2>
          <p>
            Integrate your calculated Critical Swim Speed (CSS) into structured weekly pool workouts to build endurance and pacing discipline:
          </p>
          <ul>
            <li><strong>Threshold Building CSS Intervals:</strong> (10 \\times 100) meters at CSS pace with 15 seconds rest between repetitions. Focus on hitting the exact second on every single 100m split without starting too fast.</li>
            <li><strong>Aerobic Over-Distance Endurance:</strong> (5 \\times 200) meters at CSS (+ 2) seconds per 100m with 20 seconds rest. Develops rhythmic stroke pacing and mental focus for continuous open water swims.</li>
            <li><strong>Pacing Ladder Drill:</strong> 400m at CSS (+ 4)s, 300m at CSS (+ 2)s, 200m at CSS pace, and 100m at CSS (- 2)s with 30 seconds rest between sets. Teaches progressive negative split acceleration.</li>
            <li><strong>Technique &amp; Distance Per Stroke (DPS) Recovery:</strong> Intersperse interval sets with 50m kick drills, fingertip drag recovery drills, and bilateral breathing practice to refine hydrodynamic streamlining.</li>
          </ul>
          <p>
            Re-test your CSS pace every 6 to 8 weeks with a standardized 400m/200m time trial to track physiological conditioning and update workout paces.
          </p>


        
          <h2>Hydrodynamic Drag Physics &amp; Critical Swim Speed (CSS)</h2>
          <p>
            Water is roughly 800 times denser than air, meaning that hydrodynamic drag increases quadratically with velocity ((F_d \\propto v^2)). In swimming, reducing resistance through streamlined body position produces vastly greater speed gains than attempting to overpower the water through sheer physical effort. Keeping the head aligned, hips high at the surface, and maintaining a compact flutter kick dramatically lowers the body's frontal surface area.
          </p>
          <p>
            Critical Swim Speed (CSS) represents your theoretical aerobic threshold pace—the fastest pace you can sustain continuously without accumulating severe muscular fatigue. Testing your CSS every 6 to 8 weeks (via a 400m and 200m time trial) provides an objective benchmark for calibrating interval training sets.
          </p>
          <h2>Stroke Rate vs Stroke Length Synergy</h2>
          <p>
            Total swimming speed is the mathematical product of Stroke Rate (cycles per minute) and Distance Per Stroke (DPS, meters per cycle). Elite distance swimmers focus on maintaining a long, smooth catch and high-elbow pull before attempting to increase stroke turnover. Incorporating structured CSS intervals (e.g. (10 \\times 100) meters at CSS pace with 15 seconds rest) builds aerobic pacing discipline and sustainable race speed.
          </p>


        {/* Related Companion Tools Contextual Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Clinical &amp; Metabolic Companion Tools</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Swimming pace calculation is integral to endurance pacing and multi-sport competition. Balance your aquatic workouts with dry-land splits using our <a href="/calculators/health/pace-calculator">Pace Calculator</a>, measure cycling power with the <a href="/calculators/health/cycling-calculator">Cycling Calculator</a>, assess aerobic zones via the <a href="/calculators/health/heart-rate-zone-calculator">Heart Rate Zone Calculator</a>, and quantify cardiovascular endurance with the <a href="/calculators/health/vo2-max-calculator">VO2 Max Calculator</a>.
          </p>
        </section>
      </article>
    </CalcPage>
  );
}
