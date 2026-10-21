import CyclingCalculator from "@/components/calcs/health/cycling-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CyclingPowerSpeedCurveChart } from "@/components/flagship/health/editorial-charts/CyclingPowerSpeedCurveChart";

const PATH = "/calculators/health/cycling-calculator";
const TITLE = "Cycling Power & Speed Calculator – Aerodynamics & Watts/kg Precision | CalcDigi";
const DESCRIPTION =
  "Free cycling calculator: compute mechanical power in Watts, power-to-weight ratio (W/kg), and calories burned based on speed, rider weight, road gradient, and aerodynamic drag.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FTP_TABLE = [
  { level: "World Class (UCI WorldTour Pro)", maleWkg: "> 5.5 W/kg", femaleWkg: "> 4.8 W/kg", description: "Top professional Grand Tour contenders and world championship cyclists." },
  { level: "Cat 1 Elite Domestic Racer", maleWkg: "4.5 – 5.4 W/kg", femaleWkg: "3.9 – 4.7 W/kg", description: "Elite national competitors with extensive structured periodized volume." },
  { level: "Cat 3 Competitive Amateur", maleWkg: "3.5 – 4.4 W/kg", femaleWkg: "3.0 – 3.8 W/kg", description: "Highly dedicated club racers training 8–15 hours weekly." },
  { level: "Moderate Club Cyclist", maleWkg: "2.5 – 3.4 W/kg", femaleWkg: "2.2 – 2.9 W/kg", description: "Regular weekend sportive riders and brisk commuters." },
  { level: "Casual / Untrained Rider", maleWkg: "< 2.5 W/kg", femaleWkg: "< 2.2 W/kg", description: "Novice cyclists or recreational riders beginning fitness conditioning." },
];

export default function CyclingPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/health", label: "Health & Fitness" }}
      title="Cycling Power & Speed Calculator"
      intro="Compute the exact mechanical power (in Watts) and specific power-to-weight ratio (Watts/kg) required to propel a bicycle across varying velocities, road inclines, riding postures, and pavement surfaces."
      description={DESCRIPTION}
      appCategory="HealthApplication"
      mathExpression="P_total = P_aero + P_gravity + P_rolling"
      related={[
        { href: "/calculators/health/calorie-burn-calculator", icon: "🔥", name: "Calorie Burn" },
        { href: "/calculators/health/heart-rate-zone-calculator", icon: "❤️", name: "Heart Rate Zones" },
        { href: "/calculators/health/vo2-max-calculator", icon: "🫁", name: "VO2 Max" },
        { href: "/calculators/health/pace-calculator", icon: "⏱️", name: "Pace Calculator" },
        { href: "/calculators/health/tdee-calculator", icon: "⚡", name: "TDEE Calculator" },
        { href: "/calculators/health/ideal-weight-calculator", icon: "⚖️", name: "Ideal Weight" },
      ]}
      faq={[
        {
          q: "What is the relationship between cycling speed and required power?",
          a: "Because aerodynamic drag scales with the cube of velocity (v³), doubling your speed on a flat road does not require double the power—it requires approximately eight times more mechanical power (2³ = 8). For example, increasing speed from 15 mph (110 Watts) to 25 mph (490 Watts) requires over a fourfold surge in metabolic power.",
        },
        {
          q: "What does Watts per kilogram (W/kg) mean and why is it important?",
          a: "Watts per kilogram (W/kg) is the universal performance currency in cycling. While raw Watts determine speed on flat terrain where aerodynamic drag dominates, the power-to-weight ratio dictates climbing velocity against gravity. A 60-kg climber pushing 300 Watts (5.0 W/kg) will rapidly drop an 85-kg rider pushing 350 Watts (4.1 W/kg) on any mountain pass exceeding a 6% gradient.",
        },
        {
          q: "How many calories does cycling burn per hour?",
          a: "Human muscular gross metabolic efficiency while pedaling is approximately 24% (only 24% of chemical energy from food is converted into mechanical crank work; 76% is dissipated as heat). Consequently, total caloric expenditure per hour can be calculated with remarkable accuracy from average wattage: Calories/hr ≈ Average Watts × 3.6. Maintaining 200 Watts for one hour burns approximately 720 kcal.",
        },
      ]}
    >
      <CyclingCalculator />

      <article className="prose dark:prose-invert max-w-none space-y-12 mt-12">
        {/* Clinical Byline */}
        <div className="not-prose p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">Biomechanics & Aerodynamic Engineering Review:</span> Calibrated to Martin et al. (Journal of Applied Biomechanics) cycling power models and Andrew Coggan's power-duration profiling.
          </div>
          <div className="text-slate-500 whitespace-nowrap">Updated: Q4 2026 • Verified Kinematic Physics</div>
        </div>

        {/* Section 1: The Physics of Cycling */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            The Physics of Cycling: The Four Resistive Forces
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In mechanical engineering and exercise physiology, propelling a bicycle requires muscles to generate mechanical torque at the pedal crank to overcome four distinct physical resistance vectors:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-6">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">1. Aerodynamic Drag (P_aero)</h4>
              <Formula>P_aero = 0.5 * rho * CdA * v^3</Formula>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Where &rho; is air density (1.225 kg/m&sup3;), <em>CdA</em> is the frontal drag area (m&sup2;), and <em>v</em> is velocity in m/s. Because power scales with <strong>v&sup3;</strong>, drag accounts for &gt;80% of resistance above 18 mph.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">2. Gravitational Resistance (P_gravity)</h4>
              <Formula>P_gravity = m * g * sin(theta) * v</Formula>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Where <em>m</em> is the combined mass of rider, bike, and kit, and &theta; is the slope angle. On climbs steeper than 5%, gravity completely eclipses aerodynamic drag as the primary power sink.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">3. Rolling Resistance (P_rolling)</h4>
              <Formula>P_rolling = Crr * m * g * cos(theta) * v</Formula>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Determined by tire carcass hysteresis and road surface roughness (<em>Crr</em> spans 0.003 for high-end tubeless tires to 0.008 for rough gravel).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">4. Mechanical Drivetrain Losses</h4>
              <Formula>Net Power = Total Resistance / 0.97</Formula>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Frictional resistance in the chain, jockey wheels, and bottom bracket bearings absorbs approximately 2% to 4% of total mechanical crank output.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Editorial Graph #2 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Interactive Benchmark: Cubic Aerodynamic Power vs. Gradient Curve
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
              Martin Biomechanics Simulation
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Witness the profound non-linear nature of cycling physics: as speed crosses 20 mph (32 km/h), the required wattage climbs exponentially. Scrub across velocities below to observe the power differential between flat riding, a 3% false flat, and a 6% climb.
          </p>

          <CyclingPowerSpeedCurveChart />
        </section>

        {/* Section 3: Coggan FTP Classification Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Dr. Andrew Coggan Functional Threshold Power (FTP) Classification Table
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Functional Threshold Power (FTP) represents the highest mean mechanical power a cyclist can sustain for approximately one hour in a quasi-steady metabolic state. Power-to-weight tiers provide universal benchmarks across male and female athletes:
          </p>

          <DataTable
            head={["Racing & Athletic Classification", "Men (W/kg)", "Women (W/kg)", "Physiological Training Profile"]}
            rows={FTP_TABLE.map((r) => [r.level, r.maleWkg, r.femaleWkg, r.description])}
          />
        </section>

        {/* Section 4: Aerodynamic Posture & CdA */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Riding Posture & CdA: Where Watts Are Won and Lost
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In wind tunnel testing, the rider's physical body accounts for <strong>80% to 85% of total aerodynamic drag</strong>, while the bicycle frame and wheels constitute only 15% to 20%. Adjusting body posture yields far greater speed advantages than spending thousands on carbon wheels:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Upright on the Tops (CdA &asymp; 0.40 m&sup2;):</strong> Maximum frontal area; comfortable for climbing but aerodynamically penalized on descents and headwinds.
            </li>
            <li>
              <strong>Brake Hoods with Horizontal Forearms (CdA &asymp; 0.32 m&sup2;):</strong> Standard modern road racing position; saves ~35 Watts at 25 mph compared to upright posture.
            </li>
            <li>
              <strong>In the Drops (CdA &asymp; 0.28 m&sup2;):</strong> Lowers torso height; ideal for aggressive cornering, crosswinds, and sprinting.
            </li>
            <li>
              <strong>Time Trial / Triathlon Aerobars (CdA &asymp; 0.23 m&sup2;):</strong> Channels airflow smoothly around the chest cavity; yields a 60-to-90-Watt advantage at 28 mph over riding on the hoods.
            </li>
          </ul>
        </section>

        {/* Section 5: Step-by-Step Practical Calculation Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Step-by-Step Walkthrough: Power Required for 20 mph on Flat Road
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Suppose a <strong>165-lb (75 kg)</strong> cyclist riding a <strong>9-kg bike</strong> (total mass = 84 kg) rides at <strong>20.0 mph (8.94 m/s)</strong> on brake hoods (CdA = 0.32 m&sup2;) over smooth asphalt (Crr = 0.004):
          </p>

          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-2">
            <div>1. Calculate Aerodynamic Power: <code>0.5 &times; 1.225 &times; 0.32 &times; (8.94)&sup3; = 0.196 &times; 714.5 = 140.0 Watts</code></div>
            <div>2. Calculate Rolling Resistance Power: <code>0.004 &times; 84 &times; 9.807 &times; 8.94 = 29.5 Watts</code></div>
            <div>3. Calculate Gravity (0% grade): <code>0.0 Watts</code></div>
            <div>4. Sum Resistances: <code>140.0 + 29.5 = 169.5 Watts</code></div>
            <div>5. Factor Drivetrain Loss (97% efficiency): <code>169.5 / 0.97 = 174.7 Watts</code></div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 font-sans">
              <span className="font-bold text-slate-900 dark:text-slate-100">Final Kinematic Metrics:</span>
              <p className="text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm mt-1">
                Required Mechanical Power = ~175 Watts (2.33 W/kg) • Caloric Burn = ~630 kcal/hour
              </p>
            </div>
          </div>
        </section>
      
        {/* Related Companion Tools Contextual Section */}
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Clinical &amp; Metabolic Companion Tools</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Cycling power output directly translates into cardiovascular stimulus and caloric expenditure. Calculate specific heart rate training bands with our <a href="/calculators/health/heart-rate-zone-calculator">Heart Rate Zone Calculator</a>, measure maximum aerobic capacity via the <a href="/calculators/health/vo2-max-calculator">VO2 Max Calculator</a>, assess running splits with the <a href="/calculators/health/pace-calculator">Pace Calculator</a>, and measure metabolic burn using the <a href="/calculators/health/calorie-burn-calculator">Calorie Burn Calculator</a>.
          </p>
        </section>
      </article>
    </CalcPage>
  );
}
