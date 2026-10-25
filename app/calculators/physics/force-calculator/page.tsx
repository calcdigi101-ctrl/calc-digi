import type { Metadata } from "next";
import Link from "next/link";
import ForceCalculator from "@/components/calcs/physics/force-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ForceVsFrictionLoadChart } from "@/components/flagship/physics/editorial-charts";

const PATH = "/calculators/physics/force-calculator";
const TITLE = "Force Calculator | Newton's Second Law (F = ma) & Friction Dynamics";
const DESCRIPTION =
  "Calculate net motive force, inertial resistance (F = ma), normal force, kinetic friction drag, and gravitational weight across metric and imperial engineering frames.";

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
  { href: "/calculators/physics/acceleration-calculator", icon: "🚀", name: "Acceleration Dynamics" },
  { href: "/calculators/physics/work-energy-calculator", icon: "⚙️", name: "Work & Mechanical Energy" },
  { href: "/calculators/physics/pressure-calculator", icon: "🌡️", name: "Pressure P = F/A" },
  { href: "/calculators/physics/torque-calculator", icon: "🔄", name: "Torque & Rotational Force" },
  { href: "/calculators/physics/momentum-calculator", icon: "🎯", name: "Momentum & Impulse" },
  { href: "/calculators/engineering/torque-calculator", icon: "🏎️", name: "Engineering Engine Torque" },
];

const FAQ_ITEMS = [
  {
    q: "What is the physical definition and mathematical formula for force?",
    a: "In classical Newtonian physics, a force is an interaction that, when unopposed, alters the motion of a physical body. Newton's Second Law of Motion formally establishes that the net force acting upon an object is equal to the temporal rate of change of its linear momentum: F = dp/dt. For systems possessing constant invariant mass, this simplifies to the foundational equation: F = m · a, where F is net force measured in Newtons (N), m is inertial mass in kilograms (kg), and a is linear acceleration in meters per second squared (m/s²).",
  },
  {
    q: "What is the precise definition of one Newton of force?",
    a: "One Newton (1 N) is the derived International System (SI) unit of force, named in honor of Sir Isaac Newton. It is rigorously defined as the magnitude of net force required to accelerate an inertial mass of one kilogram at a continuous rate of one meter per second squared: 1 N = 1 kg · m / s². In imperial engineering units, one Newton equals approximately 0.224809 pounds-force (lbf), and in CGS metric units, 1 N equals exactly 100,000 Dynes (10⁵ dynes).",
  },
  {
    q: "How does surface friction influence the total motive force required to accelerate an object?",
    a: "When moving an object across a real physical surface, the applied motive force must simultaneously accomplish two distinct mechanical tasks: 1) Overcome kinetic friction resisting interface motion (F_friction = μ_k · F_N), and 2) Impart net inertial acceleration (F_inertial = m · a). Consequently, total required motive thrust is the sum of both components: F_total = m · a + μ_k · m · g. On a high-friction surface like dry rubber on asphalt (μ ≈ 0.8), overcoming friction can demand more force than acceleration itself.",
  },
  {
    q: "What is the fundamental distinction between mass and weight?",
    a: "Mass is an intrinsic scalar property of matter quantifying its inertial resistance to acceleration, measured in kilograms (kg) and remaining completely constant regardless of spatial location. Weight is the downward gravitational force exerted upon that mass by a planetary body: W = m · g, measured in Newtons (N) or pounds-force (lbf). A 75 kg astronaut possesses an invariable mass of 75 kg everywhere, but weighs 735 N on Earth, 122 N on the Moon, and zero during free-fall orbit.",
  },
  {
    q: "What is the difference between static friction and kinetic friction?",
    a: "Static friction (F_s ≤ μ_s · F_N) is the resistive force that prevents stationary objects from starting to move when subjected to an external lateral load. Kinetic friction (F_k = μ_k · F_N) is the resistive force acting between surfaces already in relative sliding contact. For almost all material pairs, the static coefficient μ_s is significantly higher than the kinetic coefficient μ_k (e.g., steel on steel μ_s ≈ 0.74 vs μ_k ≈ 0.57). This explains why breaking an object loose requires more force than maintaining its sliding speed.",
  },
  {
    q: "How does Newton's Third Law (action and reaction) apply to force calculations?",
    a: "Newton's Third Law states that when Body A exerts a force on Body B, Body B simultaneously exerts an equal in magnitude, opposite in direction reaction force upon Body A: F_{A→B} = -F_{B→A}. These paired forces act on different bodies, meaning they never cancel each other out within a single free-body diagram. For instance, when a sprinter's foot pushes backward against starting blocks with 800 N of force, the starting blocks push forward on the sprinter with an identical 800 N of motive force.",
  },
];

export default function ForceCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/physics", label: "Physics" }}
      title="Force & Dynamics Calculator (Newton's 2nd Law)"
      intro="Calculate dynamic motive force, inertial acceleration requirements (F = ma), normal reaction forces, and surface kinetic friction resistance across metric and imperial frames."
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
                SI & ISO 80000-4 Classical Dynamics
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Newtonian Equilibrium Solver</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                Combined Friction & Inertia Model
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-indigo-500/20 bg-indigo-50/60 p-4 dark:border-indigo-500/30 dark:bg-indigo-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: How do you calculate force using Newton's Second Law?
                </strong>
                <p className="mt-1">
                  Net inertial force is calculated by multiplying mass by acceleration: F = m · a. One Newton accelerates 1 kilogram at 1 m/s² (1 N = 0.2248 lbf). In real terrestrial applications where surface friction is present, total motive thrust must overcome both friction and inertia: F_total = m · a + μ · m · g. For example, accelerating an 80 kg payload at 3.5 m/s² across a surface with friction coefficient μ = 0.20 requires 280 N of inertial force plus 157 N of friction resistance, totaling 437 Newtons (98.2 lbf).
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - CHART IMMEDIATELY BELOW */}
          <h2>Surface Friction Drag vs Required Motive Force by Interface Material</h2>
          <div className="not-prose my-6">
            <ForceVsFrictionLoadChart />
          </div>

          <p>
            Force is the central dynamic concept of classical Newtonian physics, defining the vector interaction that induces changes in the state of rest or uniform motion of a physical body. Codified internationally in ISO 80000-4, the SI unit of force is the Newton (N). Whether sizing industrial electric motors, calculating launch thrust for space launch vehicles, or modeling civil bridge stress distributions, calculating applied and reactive forces is fundamental to structural engineering and dynamic mechanical design.
          </p>

          <p>
            In practical mechanical environments, an applied motive force never acts upon an isolated idealized mass in a vacuum. Terrestrial machines must continually fight resistive frictional forces arising from microscopic surface asperities and atomic adhesive interactions. A robust physical model must therefore synthesize pure inertial acceleration demands with Coulomb surface friction laws to determine true operating horsepower and actuator force requirements.
          </p>

          <h2>Newtonian Dynamic Formulas & Mathematical Principles</h2>

          <p>
            The comprehensive physical analysis of linear dynamics combines Newton's laws of motion with empirical tribological friction models:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Newton's Second Law (Net Dynamic Force)</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">F_net = m · a = dp / dt</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Relates applied net vector force to inertial mass and produced spatial acceleration.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Gravitational Weight & Perpendicular Normal Reaction</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">W = m · g   |   F_N = m · g · cos(θ)  (F_N = mg on level planes)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Defines downward gravitational weight and perpendicular surface compressive reaction force.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Coulomb Kinetic Friction Resistance</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">F_friction = μ_k · F_N = μ_k · m · g</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Models sliding resistive drag based on interface friction coefficient and normal load.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. Total Required Motive Thrust Equation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">F_total = F_inertial + F_friction = m · a + μ_k · m · g</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Combines inertial mass acceleration with continuous surface friction overcoming requirements.</div>
          </Formula>

          <h2>Tribological Friction Coefficients Reference Table</h2>

          <p>
            The kinetic friction coefficient (μ_k) is an empirical scalar characterizing the shearing resistance between two contacting material surfaces. Typical engineering values include:
          </p>

          <DataTable
            head={["Contact Interface Pair", "Static Friction (μ_s)", "Kinetic Friction (μ_k)", "Application / Environment"]}
            rows={[
              ["Teflon on Teflon (PTFE)", "0.04", "0.04", "Self-lubricating dry machinery bearings"],
              ["Steel on Steel (Dry)", "0.78", "0.42", "Railroad locomotive wheels on dry rail"],
              ["Steel on Steel (Greased)", "0.15", "0.08", "Industrial gearboxes and roller bearings"],
              ["Hardwood on Hardwood", "0.50", "0.30", "Timber flooring, pallet racking sleds"],
              ["Rubber Tire on Dry Concrete", "1.00", "0.80", "Automotive emergency braking traction"],
              ["Rubber Tire on Wet Asphalt", "0.70", "0.45", "Rain-slicked roadway braking distance"],
              ["Rubber Tire on Packed Ice", "0.15", "0.08", "Winter blizzard vehicular handling"],
            ]}
          />

          <h2>Comparative Operational Worked Case Studies</h2>

          <p>
            To examine practical force dynamics across disparate physical domains:
          </p>

          <h3>Case Study A: Athletic Sprint Acceleration</h3>
          <p>
            A 78.0 kg collegiate track sprinter explodes out of the starting blocks with an acceleration of a = 5.20 m/s² on a high-traction synthetic track surface with effective grip friction μ = 0.65.
          </p>
          <ul>
            <li><strong>Inertial Motive Force:</strong> F_ma = m · a = 78.0 kg × 5.20 m/s² = 405.6 Newtons (91.2 lbf).</li>
            <li><strong>Gravitational Normal Weight:</strong> F_N = m · g = 78.0 kg × 9.807 m/s² = 764.9 Newtons (172.0 lbf).</li>
            <li><strong>Maximum Available Traction Limit:</strong> F_traction = μ · F_N = 0.65 × 764.9 N = 497.2 Newtons.</li>
            <li><strong>Traction Feasibility:</strong> Because required force (405.6 N) is less than available traction grip (497.2 N), the sprinter achieves 100% mechanical hookup without slipping.</li>
          </ul>

          <h3>Case Study B: Warehouse Heavy Sled Transport</h3>
          <p>
            An automated guided vehicle (AGV) pushes a m = 1,200 kg heavy machine crate across a polished factory concrete floor (μ_k = 0.28), seeking a steady acceleration of a = 0.75 m/s².
          </p>
          <ul>
            <li><strong>Inertial Force Required:</strong> F_ma = 1,200 kg × 0.75 m/s² = 900.0 Newtons (202.3 lbf).</li>
            <li><strong>Compressive Normal Force:</strong> F_N = 1,200 kg × 9.807 m/s² = 11,768.4 Newtons (2,646 lbf).</li>
            <li><strong>Kinetic Friction Drag to Overcome:</strong> F_f = μ_k · F_N = 0.28 × 11,768.4 N = 3,295.2 Newtons (740.8 lbf).</li>
            <li><strong>Total Actuator Thrust Required:</strong> F_total = 900.0 + 3,295.2 = 4,195.2 Newtons (943.1 lbf). Note that friction accounts for 78.5% of total required propulsion force.</li>
          </ul>

          <h2>Engineering Constraints & Dynamic Incline Angles</h2>

          <p>
            When applied forces act on inclined planes or non-horizontal trajectories, coordinate vectors decompose further:
          </p>

          <ol>
            <li>
              <strong>Inclined Plane Gravity Splitting:</strong> On a ramp angled at θ degrees, gravitational force splits into a parallel downhill pull (F_parallel = m · g · sinθ) and a perpendicular normal load (F_normal = m · g · cosθ). Pushing uphill requires overcoming both parallel gravity and friction: F_push = m · a + m · g · sinθ + μ · m · g · cosθ.
            </li>
            <li>
              <strong>Variable Velocity-Dependent Friction:</strong> While Coulomb friction models assume friction is independent of velocity, real-world lubricated bearings experience viscous hydrodynamic drag that scales directly with sliding speed (F_viscous ∝ v).
            </li>
            <li>
              <strong>Dynamic Mass Variation:</strong> In aerospace rocketry (such as the Saturn V or Falcon 9), fuel burn reduces vehicle mass by up to 90% during ascent. According to Tsiolkovsky's rocket equation, constant thrust acting on a shrinking mass causes acceleration to skyrocket toward burnout.
            </li>
          </ol>

          <h2>Newton's Third Law & Free-Body Equilibrium</h2>

          <p>
            In structural and mechanical design, isolating forces requires constructing a Free-Body Diagram (FBD). Newton's Third Law mandates action-reaction pairs: F(A→B) = -F(B→A). Because these forces act on separate entities, they never cancel internally within a single isolated subsystem.
          </p>

          <p>
            For a system in static equilibrium, vector summation of external forces and torques equals zero: ΣFx = 0, ΣFy = 0, and ΣM = 0. In dynamic systems experiencing acceleration, d'Alembert's principle introduces an apparent inertial force (-m·a) that transforms dynamic problems into equivalent static equilibrium equations.
          </p>

          <h2>Impulse-Momentum Theorem & Impact Force Attenuation</h2>

          <p>
            When forces act over brief temporal collision intervals (such as an automotive crash, a hammer striking an anvil, or an athletic footstrike), the force varies continuously with time. Integrating Newton's Second Law over the collision duration Δt yields the Impulse-Momentum Theorem:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">5. Impulse-Momentum Integral Relation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">J = ∫ F(t) dt = F_avg · Δt = Δp = m · (v_final - v_initial)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Equates mechanical impulse J directly to the change in linear momentum Δp.</div>
          </Formula>

          <p>
            Because the change in momentum (Δp) is fixed by the initial velocity and mass of the impacting body, the average collision force is inversely proportional to collision duration: F_avg = Δp / Δt. Modern automotive safety features—including crumple zones, energy-absorbing bumpers, and deployable steering-wheel airbags—function by extending the mechanical stopping duration Δt from 10 milliseconds to 100 milliseconds. This ten-fold expansion in collision time reduces peak deceleration force on human occupants by 90%, preventing fatal organ shearing and traumatic brain injuries.
          </p>

          <h2>Authoritative International Standards & Dynamics References</h2>

          <p>
            For verified engineering dynamics standards and force metrology:
          </p>
          <ul>
            <li>
              <strong>ISO 80000-4:2019:</strong> International standard specifying quantities, dimensions, and units of classical mechanics, force, and momentum.
            </li>
            <li>
              <strong>NIST Special Publication 330:</strong> United States national reference for SI unit definitions of the Newton and derived mechanical quantities.
            </li>
            <li>
              <strong>BIPM Consultative Committee for Mass and Related Quantities (CCM):</strong> International guidelines for precision force transducer calibrations and deadweight standards.
            </li>
            <li>
              <strong>ASTM E74:</strong> Standard practice for the calibration and verification of force-measuring instruments used in structural and material testing.
            </li>
          </ul>
        </>
      }
    >
      <ForceCalculator />
    </CalcPage>
  );
}
