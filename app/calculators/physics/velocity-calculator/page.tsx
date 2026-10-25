import type { Metadata } from "next";
import Link from "next/link";
import VelocityCalculator from "@/components/calcs/physics/velocity-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { VelocityDecelerationStoppingChart } from "@/components/flagship/physics/editorial-charts";

const PATH = "/calculators/physics/velocity-calculator";
const TITLE = "Velocity Calculator | Vector Kinematics, Displacement & Average Speed";
const DESCRIPTION =
  "Calculate instantaneous velocity, average velocity, constant acceleration progress, spatial displacement, and multi-unit speed conversions across metric, imperial, and nautical frames.";

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
  { href: "/calculators/physics/acceleration-calculator", icon: "🚀", name: "Acceleration & Kinematics" },
  { href: "/calculators/physics/projectile-motion-calculator", icon: "📐", name: "Projectile Ballistics" },
  { href: "/calculators/physics/free-fall-calculator", icon: "🪂", name: "Free Fall Kinematics" },
  { href: "/calculators/physics/momentum-calculator", icon: "🎯", name: "Linear Momentum p=mv" },
  { href: "/calculators/physics/kinetic-energy-calculator", icon: "⚡", name: "Kinetic Energy" },
  { href: "/calculators/everyday/pace-calculator", icon: "🏃", name: "Running Pace & Speed" },
];

const FAQ_ITEMS = [
  {
    q: "What is the physical definition and mathematical formula for velocity?",
    a: "Velocity is the temporal rate of change of spatial displacement, formally defined as a vector possessing both magnitude and spatial orientation: v = dr/dt. Under uniform linear motion with zero acceleration, velocity equals net displacement divided by elapsed duration: v = Δx / Δt. When subject to constant acceleration, final velocity is determined by the first kinematic equation: v = v₀ + a · t, where v₀ is the initial baseline velocity, a is linear acceleration, and t is elapsed travel time.",
  },
  {
    q: "What is the fundamental scientific difference between speed and velocity?",
    a: "Speed is a scalar quantity quantifying purely the rate at which an object covers physical distance regardless of direction (speed = distance / time). Velocity is a vector quantity expressing the rate of spatial displacement along a defined coordinate direction (velocity = displacement / time). For example, a race car completing a full circular 5-kilometer closed circuit in 100 seconds maintains a scalar speed of 50 m/s (180 km/h), yet possesses an average vector velocity of exactly zero because its final net displacement from start to finish is zero.",
  },
  {
    q: "How do you calculate average velocity when speed varies across multiple trip segments?",
    a: "Average velocity is rigorously defined as total spatial displacement divided by total elapsed trip time: v_avg = Δx_total / Δt_total. It is critical to note that average velocity is NOT a simple arithmetic mean of segment speeds unless the travel time spent in each segment is identical. When travelling fixed distances at different velocities, the harmonic mean must be employed: v_avg = 2 · v₁ · v₂ / (v₁ + v₂).",
  },
  {
    q: "How does stopping distance scale when initial driving velocity increases?",
    a: "Stopping distance scales non-linearly because mechanical braking distance expands with the square of velocity (v² / 2a). While driver perception distance scales linearly (v · t_reaction), braking distance quadruples whenever speed doubles. For example, stopping from 50 km/h requires approximately 26 meters, whereas stopping from 100 km/h requires over 65 meters on dry asphalt under standard braking friction.",
  },
  {
    q: "What are the standard international conversion factors between speed units?",
    a: "The standard SI unit of velocity is meters per second (m/s). Standard conversion multipliers include: 1 m/s = 3.600 km/h (kilometers per hour); 1 m/s = 2.23694 mph (statute miles per hour); 1 m/s = 1.94384 knots (nautical miles per hour); and 1 m/s = 3.28084 ft/s (feet per second). Conversely, 100 km/h equates to 27.778 m/s, and 60 mph equates to 26.822 m/s.",
  },
  {
    q: "How does instantaneous velocity relate to the derivative of position in calculus?",
    a: "In differential calculus, instantaneous velocity represents the instantaneous slope of the spatial position-time curve: v(t) = lim_{Δt→0} [x(t + Δt) - x(t)] / Δt = dx/dt. When the position function is a polynomial—such as x(t) = 5t² + 3t + 2—taking the first derivative yields instantaneous velocity directly: v(t) = 10t + 3. The second derivative yields linear acceleration: a(t) = d²x/dt² = 10 m/s².",
  },
];

export default function VelocityCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/physics", label: "Physics" }}
      title="Velocity & Kinematic Motion Calculator"
      intro="Calculate instantaneous velocity, average velocity, net spatial displacement, and emergency stopping envelopes using classical Newtonian kinematics."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-950/40 dark:text-blue-400 dark:ring-blue-500/30">
                <svg className="size-3.5 shrink-0 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                ISO 80000-3 & BIPM Standardized
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>SI Coordinate Kinematics</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-blue-500" />
                Dual Vector & Scalar Engine
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-blue-500/20 bg-blue-50/60 p-4 dark:border-blue-500/30 dark:bg-blue-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: How do you calculate velocity and displacement?
                </strong>
                <p className="mt-1">
                  When acceleration is uniform, final velocity is determined by adding initial velocity to the product of acceleration and elapsed time: v = v₀ + a · t. Total displacement traversed during this period is given by d = v₀t + ½at². When dealing with variable speeds across equal distance intervals, average velocity is computed via the harmonic mean rather than a simple average. In metric conversions, 1 m/s exactly equals 3.6 km/h or approximately 2.237 mph.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - CHART IMMEDIATELY BELOW */}
          <h2>Vehicle Velocity vs Quadratic Stopping Distance Envelope</h2>
          <div className="not-prose my-6">
            <VelocityDecelerationStoppingChart />
          </div>

          <p>
            Velocity is among the most essential vector metrics in classical and modern physics, articulating the directional rate at which spatial coordinates transform across time. Standardized globally under ISO 80000-3 and the International System of Units (SI), velocity is measured in meters per second (m/s). From subatomic particle drift velocity in semiconductors to ballistic orbital speeds of artificial satellites, calculating instantaneous and average velocity is indispensable for engineering modeling, automotive dynamics, aeronautical navigation, and mechanical robotics.
          </p>

          <p>
            Unlike elementary scalar speed—which reflects mere distance traveled without spatial orientation—velocity is inherently directional. A particle reversing its trajectory registers a negative velocity relative to the reference origin, even while maintaining positive scalar speed. Understanding this distinction is vital for multi-dimensional vector resolution, orbital mechanics, and momentum conservation laws.
          </p>

          <h2>Mathematical Formulations & Kinematic Equations</h2>

          <p>
            The behavior of moving bodies undergoing uniform linear motion or constant acceleration is governed by the classical kinematic triad:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Linear Velocity Function</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">v = v₀ + a · t</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates instantaneous final velocity under constant linear acceleration over elapsed time.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Average Velocity for Uniform Acceleration</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">v_avg = (v₀ + v) / 2</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Mean velocity across a constant acceleration interval, representing equivalent uniform motion.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Net Spatial Displacement Integral</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">d = v₀ · t + ½ · a · t²   |   d = v_avg · t</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates total position change by compounding inertial speed and accelerative progress.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. Torricelli Energy-Velocity Relation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">v² = v₀² + 2 · a · d   ⟹   d_stop = v₀² / (2 · |a|)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Determines stopping distance or terminal speed directly from displacement without time metrics.</div>
          </Formula>

          <h2>Speed vs Velocity: The Scalar-Vector Dilemma</h2>

          <p>
            The conceptual confusion between scalar speed (scalar magnitude s) and vector velocity (vector v) frequently leads to engineering miscalculations. In physics, displacement (Δx) represents the straight-line shortest vector connecting an initial coordinate to a final coordinate, whereas path distance (L) measures the total odometer length traversed along the curve.
          </p>

          <p>
            When a vehicle travels around a circular roundabout of radius R = 50 meters at a constant speed of 10 m/s (36 km/h), its scalar speed remains completely unchanged. However, its velocity vector continuously rotates in space, requiring a constant centripetal acceleration directed toward the center of the turn: a_c = v² / R = 100 / 50 = 2.0 m/s². Upon completing one full orbit, the average velocity vector is exactly zero, despite the vehicle having consumed fuel and logged 314 meters of scalar road travel.
          </p>

          <h2>Harmonic Mean in Multi-Stage Trip Analysis</h2>

          <p>
            When traveling between two destinations at varying speeds across equal distance intervals, standard arithmetic averaging produces an erroneous overestimation of true velocity. Because more time is spent traversing the slower segment, the harmonic mean must be applied:
          </p>

          <p>
            Consider a commuter driving 60 kilometers outward at 60 km/h (1.0 hour) and returning the same 60 kilometers through heavy congestion at 30 km/h (2.0 hours). The simple average of 60 and 30 is 45 km/h. However, the total displacement is 120 kilometers and total elapsed time is 3.0 hours. The true average velocity is: v_avg = 120 km ÷ 3.0 hr = 40.0 km/h, perfectly matching the harmonic formulation: (2 × 60 × 30) / (60 + 30) = 3600 / 90 = 40.0 km/h.
          </p>

          <h2>Comparative Operational Worked Case Studies</h2>

          <p>
            To examine practical velocity calculations, consider two diverse transport scenarios:
          </p>

          <h3>Case Study A: Highway On-Ramp Acceleration Phase</h3>
          <p>
            A passenger car merges onto a highway, entering the acceleration lane at an initial speed of v₀ = 50 km/h (13.889 m/s). The driver applies steady throttle producing a constant acceleration of a = 2.20 m/s² over an interval of t = 6.50 seconds.
          </p>
          <ul>
            <li><strong>Velocity Differential:</strong> Δv = a · t = 2.20 m/s² × 6.50 s = 14.300 m/s (51.48 km/h).</li>
            <li><strong>Final Merging Velocity:</strong> v = 13.889 + 14.300 = 28.189 m/s (101.48 km/h = 63.06 mph).</li>
            <li><strong>Average Merge Velocity:</strong> v_avg = (13.889 + 28.189) / 2 = 21.039 m/s (75.74 km/h).</li>
            <li><strong>On-Ramp Displacement Traveled:</strong> d = (13.889 × 6.50) + (0.5 × 2.20 × 6.50²) = 90.28 + 46.48 = 136.76 meters (448.7 feet).</li>
          </ul>

          <h3>Case Study B: High-Speed Electric Locomotive Acceleration</h3>
          <p>
            A modern high-speed electric train departs a passenger terminal from rest (v₀ = 0 m/s), maintaining a smooth passenger-comfort acceleration rate of a = 0.65 m/s² for t = 120.0 seconds.
          </p>
          <ul>
            <li><strong>Final Running Velocity:</strong> v = 0 + (0.65 × 120.0) = 78.00 m/s (280.80 km/h = 174.48 mph).</li>
            <li><strong>Total Mainline Displacement:</strong> d = 0.5 × 0.65 × 120.0² = 4,680 meters (4.68 km = 2.91 miles).</li>
            <li><strong>Average Velocity:</strong> v_avg = 78.00 / 2 = 39.00 m/s (140.40 km/h).</li>
          </ul>

          <h2>Real-World Operational Constraints & Aerodynamic Friction</h2>

          <p>
            In practical terrestrial environments, velocity curves do not accelerate indefinitely due to physical resistive forces:
          </p>

          <ol>
            <li>
              <strong>Aerodynamic Drag Wall:</strong> Air resistance escalates with the square of velocity: F_drag = ½ · ρ · Cd · A · v². At 130 km/h, aerodynamic drag consumes over 75% of total automotive propulsion energy. To double vehicle velocity, motive powertrain wattage must expand by an eight-fold factor (P = F · v ∝ v³).
            </li>
            <li>
              <strong>Tire Rolling Resistance:</strong> Mechanical hysteresis inside elastomeric tires resists motion in direct proportion to weight: F_roll = Crr · m · g. Rolling resistance dominates at low city speeds, but is overtaken by aerodynamic drag above 60 to 80 km/h.
            </li>
            <li>
              <strong>Braking Thermal Saturation:</strong> Emergency deceleration from high speeds converts immense kinetic energy (E_k = ½·m·v²) directly into friction heat on brake discs. Repetitive high-velocity stops induce brake fade as pad friction coefficients degrade at elevated temperatures above 600°C.
            </li>
          </ol>

          <h2>Authoritative International Standards & Metrology References</h2>

          <p>
            For verified velocity and kinematic metrology guidelines:
          </p>
          <ul>
            <li>
              <strong>BIPM SI Brochure (9th Edition):</strong> Authoritative international definitions of the meter (base unit of length derived from light velocity c = 299,792,458 m/s) and second (derived from cesium frequency).
            </li>
            <li>
              <strong>ISO 80000-3:2019:</strong> International standard specifying physical quantities and units for space, time, velocity, angular velocity, and acceleration.
            </li>
            <li>
              <strong>NIST Guide for the Use of the International System of Units (SP 811):</strong> Complete conversion tables and dimensional analysis rules for velocity across engineering fields.
            </li>
            <li>
              <strong>Federal Highway Administration (FHWA) Manual on Uniform Traffic Control Devices:</strong> Standardized road design speed criteria and perception-reaction braking formulas.
            </li>
          </ul>
        </>
      }
    >
      <VelocityCalculator />
    </CalcPage>
  );
}
