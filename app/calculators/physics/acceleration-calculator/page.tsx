import type { Metadata } from "next";
import Link from "next/link";
import AccelerationCalculator from "@/components/calcs/physics/acceleration-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { AccelerationProfilesChart } from "@/components/flagship/physics/editorial-charts";

const PATH = "/calculators/physics/acceleration-calculator";
const TITLE = "Acceleration Calculator | Linear Kinematics & F=ma Motive Dynamics";
const DESCRIPTION =
  "Calculate linear acceleration, g-force ratios, velocity differentials, stopping distances, and motive thrust forces via Newton's Second Law and uniform kinematic equations.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PATH,
  },
};

const RELATED_CALCULATORS = [
  { href: "/calculators/physics/velocity-calculator", icon: "⚡", name: "Velocity & Displacement" },
  { href: "/calculators/physics/force-calculator", icon: "🚀", name: "Newton's Second Law Force" },
  { href: "/calculators/physics/free-fall-calculator", icon: "🪂", name: "Gravitational Free Fall" },
  { href: "/calculators/physics/kinetic-energy-calculator", icon: "💥", name: "Kinetic Energy Dynamics" },
  { href: "/calculators/physics/projectile-motion-calculator", icon: "📐", name: "Projectile Ballistics" },
  { href: "/calculators/engineering/horsepower-calculator", icon: "🏎️", name: "Engine Horsepower" },
];

const FAQ_ITEMS = [
  {
    q: "What is the physical definition and mathematical formula for acceleration?",
    a: "In classical Newtonian kinematics, acceleration is formally defined as the first time derivative of velocity, or the second time derivative of spatial position: a = dv/dt = d²x/dt². Under uniform, non-varying conditions, average linear acceleration equals the change in velocity divided by the elapsed time: a = Δv / Δt = (v - v₀) / t, expressed in meters per second squared (m/s²). Furthermore, Newton's Second Law of Motion establishes that net force is directly proportional to mass and acceleration: F = m · a.",
  },
  {
    q: "How is g-force calculated and what are physiological human tolerance limits?",
    a: "A g-force is an inertial acceleration ratio normalized against standard terrestrial gravity (g₀ = 9.80665 m/s²): g-ratio = a / 9.80665. One g represents resting terrestrial gravity. Unconditioned humans generally tolerate sustained positive accelerations (+Gz, blood forced downward from head to feet) up to +4g to +5g before experiencing vision tunneling, greyout, and gravity-induced loss of consciousness (G-LOC). Specialized military combat pilots in anti-G pressurized flight suits can sustain up to +9g for brief tactical intervals.",
  },
  {
    q: "What is the critical distinction between acceleration and velocity?",
    a: "Velocity is a fundamental vector quantifying the rate of displacement over time (meters per second), incorporating both absolute magnitude (speed) and directional orientation. In contrast, acceleration quantifies the rate at which velocity changes over time (meters per second squared). An automobile cruising steadily at 120 km/h on a straight highway possesses high velocity but zero acceleration. Conversely, a vehicle launching from a dead stop has momentary zero velocity but peak positive acceleration.",
  },
  {
    q: "How does deceleration differ from negative acceleration in vector coordinate systems?",
    a: "Deceleration is a colloquial term indicating that an object's instantaneous speed is decreasing over time. In formal vector kinematics, acceleration carries a positive or negative sign depending strictly upon the established coordinate axis. If positive motion is oriented toward the right (+x), an object moving to the right while braking experiences negative acceleration (a < 0). However, an object moving leftward (-x) that slows down experiences positive acceleration, illustrating why physicists favor directional vector notation over colloquial deceleration.",
  },
  {
    q: "How do you calculate stopping distance from known initial speed and braking deceleration?",
    a: "Stopping distance is derived by combining human perception-reaction distance with Torricelli's kinematic equation (v² = v₀² + 2ad). Setting final velocity to zero yields braking distance: d_braking = v₀² / (2 · |a|). When adding the distance traversed during driver reaction latency (typically t_reaction ≈ 1.0 to 1.5 seconds: d_reaction = v₀ · t_reaction), total emergency stopping distance becomes: d_total = (v₀ · t_reaction) + [v₀² / (2 · |a|)].",
  },
  {
    q: "Why does aerodynamic drag cause real-world automotive acceleration to decay at higher speeds?",
    a: "Internal combustion engines and electric drivetrains deliver finite mechanical power (P = F · v). As velocity v escalates, maximum available tractive wheel force (F = P / v) inevitably contracts. Simultaneously, aerodynamic parasitic drag force increases quadratically with velocity according to Rayleigh's drag formula: F_drag = ½ · ρ · v² · Cd · A. Consequently, net accelerating force (F_net = F_tractive - F_drag) diminishes rapidly as speed rises.",
  },
];

export default function AccelerationCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/physics", label: "Physics" }}
      title="Acceleration & Kinematics Calculator"
      intro="Calculate linear acceleration, relative g-force magnitude, traveled displacement, required motive force, and mechanical work using classical Newtonian equations of motion."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20 dark:bg-indigo-950/40 dark:text-indigo-400 dark:ring-indigo-500/30">
                <svg className="size-3.5 shrink-0 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                SI & ISO 80000-3 Kinematics Standard
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>BIPM & NIST Metric Guidelines</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                Validated Analytical Solver
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-indigo-500/20 bg-indigo-50/60 p-4 dark:border-indigo-500/30 dark:bg-indigo-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: What are the primary formulas for calculating acceleration?
                </strong>
                <p className="mt-1">
                  Average linear acceleration is calculated by dividing velocity differential by elapsed time: a = (v - v₀) / t. Through Newton's Second Law, acceleration is also defined by applied motive force divided by inertial mass: a = F / m. Under uniform kinematic acceleration, displacement equals d = v₀t + ½at², while velocity without time is solved via Torricelli's theorem: v² = v₀² + 2ad. To convert acceleration into standard Earth g-force, divide result by 9.80665 m/s². Explore underlying motion rates with our <Link href="/calculators/physics/velocity-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">velocity calculator</Link>, compute applied motive thrust via the <Link href="/calculators/physics/force-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">force calculator</Link>, or analyze natural gravitational drop rates with our <Link href="/calculators/physics/free-fall-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">free fall calculator</Link>.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - EDITORIAL CHART DIRECTLY BELOW */}
          <h2>Acceleration Profiles Across Mechanical & Aerospace Systems</h2>
          <div className="not-prose my-6">
            <AccelerationProfilesChart />
          </div>

          <p>
            Acceleration forms the fundamental cornerstone of classical mechanics, governing the kinetic trajectory and operational force demands of every physical system in motion. Formally standardized within the International System of Quantities (ISO 80000-3), acceleration characterizes the temporal derivative of velocity. Whether analyzing an electric vehicle launching from standstill, designing high-speed railway braking envelopes, or calculating orbital launch booster staging, precise quantitative mastery of linear kinematics is vital across mechanical, civil, automotive, and aerospace engineering disciplines.
          </p>

          <p>
            In practical mechanical engineering, acceleration cannot be assessed in isolation from inertial mass. According to Sir Isaac Newton's second axiom, the vector summation of forces acting upon a rigid body is identical to the temporal rate of change of its linear momentum. For a body possessing invariable invariant rest mass, this dynamic relationship reduces to the renowned equation F = m · a.
          </p>

          <h2>Newtonian Kinematic Formulas & Mathematical Derivations</h2>

          <p>
            Classical kinematics relies upon five interconnected variables: initial velocity (v₀), final velocity (v), uniform acceleration (a), elapsed time (t), and net spatial displacement (d). These quantities yield four foundational kinematic equations:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Velocity-Time Kinematic Relation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">v = v₀ + a · t</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Yields final velocity from baseline velocity, uniform acceleration, and elapsed duration.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Spatial Displacement Integral</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">d = v₀ · t + ½ · a · t²</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Quantifies traveled distance by integrating initial speed and uniform accelerative progress.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Torricelli Timeless Equation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">v² = v₀² + 2 · a · d</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Directly correlates velocities and displacement without requiring explicit time duration metrics.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. Newton's Second Law & Mechanical Work</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">F = m · a   |   W = F · d = ½ · m · (v² - v₀²)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Bridges pure kinematic trajectory analysis with applied kinetic forces and energy transfer.</div>
          </Formula>

          <h2>Deceleration Envelopes & Braking Dynamics</h2>

          <p>
            Deceleration is technically acceleration directed opposite to the instantaneous vector of velocity. In highway safety design and automotive crashworthiness analysis, stopping performance is divided into distinct physiological and mechanical phases. The total stopping distance required to bring a moving vehicle to a complete standstill encompasses two sequential components:
          </p>

          <ol>
            <li>
              <strong>Perception and Reaction Phase:</strong> The latency interval during which a human driver perceives an impending hazard, formulates a neural decision, and physically transitions their foot onto the brake pedal. For unimpaired drivers, this interval averages 1.0 to 1.5 seconds under daytime conditions. Because the vehicle continues at unabated initial velocity throughout this interval, reaction distance scales in direct linear proportion to velocity: d_reaction = v₀ · t_reaction.
            </li>
            <li>
              <strong>Mechanical Friction Braking Phase:</strong> The physical interval during which hydraulic brake calipers compress friction pads against rotors, generating braking torque that decelerates the wheels against the road surface. Governed by Torricelli's theorem, braking distance expands quadratically: d_braking = v₀² / (2 · |a|). Consequently, doubling your traveling velocity quadruples your required physical stopping distance.
            </li>
          </ol>

          <p>
            Modern anti-lock braking systems (ABS) modulate brake line pressure up to 20 times per second to keep tire slip ratios within the optimal 10% to 20% window, generating approximately 0.8g to 1.0g (7.8 to 9.8 m/s²) of emergency deceleration on dry asphalt. On wet pavement or packed snow, peak surface friction coefficients collapse from 0.85 down to 0.25 or 0.10, tripling or quadrupling the minimum safe following distance.
          </p>

          <h2>Cross-Disciplinary Kinematic & Analytical Tools</h2>

          <p>
            Real-world mechanical dynamics often integrate multiple physical domains. To evaluate total elapsed transit duration during uniform acceleration phases, utilize our <Link href="/calculators/transportation/speed-distance-time-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">speed distance time calculator</Link>, convert velocity metrics between metric and imperial systems using the <Link href="/calculators/measurements/speed-converter" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">speed converter</Link>, and quantify kinetic energy accumulation via our <Link href="/calculators/physics/kinetic-energy-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">kinetic energy calculator</Link>. Furthermore, when linear acceleration shifts into rotational motion, analyze centripetal forces using our <Link href="/calculators/physics/circular-motion-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">circular motion calculator</Link> and shaft moments with the <Link href="/calculators/physics/torque-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">torque calculator</Link>.
          </p>

          <h2>Comparative Engineering Worked Case Studies</h2>

          <p>
            To examine the behavioral mechanics of linear acceleration across disparate physical scales, consider two real-world operational scenarios:
          </p>

          <h3>Case Study A: High-Performance Electric Vehicle Launch</h3>
          <p>
            A performance dual-motor electric vehicle with an all-up mass of 2,150 kg launches from a standstill (v₀ = 0 m/s) to 100 km/h (27.78 m/s) in exactly 2.80 seconds on dry asphalt.
          </p>
          <ul>
            <li><strong>Velocity Shift:</strong> Δv = 27.78 - 0 = 27.78 m/s.</li>
            <li><strong>Mean Acceleration:</strong> a = 27.78 m/s ÷ 2.80 s = 9.921 m/s² (32.55 ft/s²).</li>
            <li><strong>Sustained G-Force:</strong> g-ratio = 9.921 ÷ 9.80665 = 1.012 g (exceeding standard 1g earth gravity).</li>
            <li><strong>Required Net Motive Force:</strong> F = m · a = 2,150 kg × 9.921 m/s² = 21,330 Newtons (4,795 lbf).</li>
            <li><strong>Launch Displacement:</strong> d = (0 × 2.8) + (0.5 × 9.921 × 2.80²) = 38.89 meters (127.6 ft).</li>
            <li><strong>Kinetic Work Done:</strong> ΔKE = ½ × 2,150 × (27.78)² = 829.6 kilojoules (296.3 kW average mechanical power).</li>
          </ul>

          <h3>Case Study B: Commercial Airliner Takeoff Roll</h3>
          <p>
            A twin-engine passenger airliner loaded to a gross takeoff weight of 75,000 kg accelerates uniformly from taxiway rest (v₀ = 0) to rotation liftoff speed (Vr = 150 knots = 77.17 m/s = 277.8 km/h) along a 34.0-second takeoff run.
          </p>
          <ul>
            <li><strong>Linear Acceleration:</strong> a = 77.17 m/s ÷ 34.0 s = 2.270 m/s² (0.231 g).</li>
            <li><strong>Required Net Engine Thrust:</strong> F = 75,000 kg × 2.270 m/s² = 170,250 Newtons (38,274 lbf).</li>
            <li><strong>Runway Traveled Distance:</strong> d = 0.5 × 2.270 × 34.0² = 1,312 meters (4,304 feet).</li>
            <li><strong>Kinetic Energy Imparted:</strong> ΔKE = ½ × 75,000 × (77.17)² = 223.3 megajoules (6,568 kW average power).</li>
          </ul>

          <h2>Operational Constraints & Environmental Boundary Conditions</h2>

          <p>
            While elementary textbook physics treats acceleration as perfectly constant, practical engineering domains encounter non-linear boundary factors:
          </p>

          <ol>
            <li>
              <strong>Aerodynamic Parasitic Drag:</strong> Air resistance scales with velocity squared (Fd = ½·ρ·Cd·A·v²). As speed rises, aerodynamic opposition rapidly consumes available engine thrust, causing tangible acceleration curves to taper asymptotically toward terminal velocity.
            </li>
            <li>
              <strong>Tire Friction & Traction Limits:</strong> In automotive engineering, peak surface traction is constrained by Coulomb friction: F_max = μ · m · g. On typical dry roadway pavement (μ ≈ 0.85 to 1.0), mechanical wheelspin restricts initial launch acceleration to approximately 1.0g regardless of available motor power, unless specialized aerodynamic downforce or chemical drag-strip compounds are applied.
            </li>
            <li>
              <strong>Human Physiological G-Limits:</strong> In aerospace design, sustained positive linear accelerations exceeding 5g induce cerebral ischemia. Structural airframe design frequently exceeds biological passenger thresholds, necessitating computerized envelope limits.
            </li>
          </ol>

          <h2>Authoritative Kinematics & Standardization References</h2>

          <p>
            For rigorous technical implementations and metric calibrations, refer to international physical standards:
          </p>
          <ul>
            <li>
              <strong>Bureau International des Poids et Mesures (BIPM):</strong> Defines fundamental SI base units of length (meter, defined via the speed of light c = 299,792,458 m/s) and temporal duration (second, defined by 9,192,631,770 periods of cesium-133 radiation).
            </li>
            <li>
              <strong>NIST Special Publication 330:</strong> US National Institute of Standards and Technology guide to the International System of Units and standard acceleration of gravity definitions (g₀ = 9.80665 m/s² exactly).
            </li>
            <li>
              <strong>ISO 80000-3:2019:</strong> International Organization for Standardization specifications for quantities and units of space, time, velocity, and acceleration.
            </li>
          </ul>
        </>
      }
    >
      <AccelerationCalculator />
    </CalcPage>
  );
}
