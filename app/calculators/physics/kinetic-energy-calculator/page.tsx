import type { Metadata } from "next";
import Link from "next/link";
import KineticEnergyCalculator from "@/components/calcs/physics/kinetic-energy-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { KineticEnergyVelocityScalingChart } from "@/components/flagship/physics/editorial-charts";

const PATH = "/calculators/physics/kinetic-energy-calculator";
const TITLE = "Kinetic Energy Calculator | Classical KE = ½mv², Joules & Explosive TNT";
const DESCRIPTION =
  "Calculate translational kinetic energy, linear momentum, impact energy in Joules and kWh, equivalent TNT yield, and quadratic velocity scaling under Newtonian dynamics.";

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
  { href: "/calculators/physics/potential-energy-calculator", icon: "🏔️", name: "Gravitational Potential Energy" },
  { href: "/calculators/physics/momentum-calculator", icon: "🎯", name: "Linear Momentum p=mv" },
  { href: "/calculators/physics/work-energy-calculator", icon: "⚙️", name: "Work & Mechanical Energy" },
  { href: "/calculators/physics/acceleration-calculator", icon: "🚀", name: "Acceleration & Kinematics" },
  { href: "/calculators/physics/velocity-calculator", icon: "⚡", name: "Velocity Dynamics" },
  { href: "/calculators/engineering/horsepower-calculator", icon: "🏎️", name: "Engine Horsepower" },
];

const FAQ_ITEMS = [
  {
    q: "What is the physical definition and mathematical formula for kinetic energy?",
    a: "Kinetic energy (KE) is the scalar mechanical energy possessed by an object by virtue of its translational motion. In non-relativistic Newtonian mechanics, translational kinetic energy is formally defined as half the product of inertial mass and the square of velocity: KE = ½ · m · v². Measured in Joules (J), one Joule represents the work required to accelerate a 1-kilogram mass through 1 meter at 1 m/s².",
  },
  {
    q: "Why does kinetic energy scale quadratically with velocity rather than linearly?",
    a: "Kinetic energy represents the definite spatial integral of motive force over displacement: W = ∫ F dx. Substituting Newton's Second Law (F = m · dv/dt) and recognizing that dx/dt = v yields: W = m ∫ v dv = ½ · m · v². Because velocity appears both as the magnitude of momentum and as the spatial rate at which distance is covered, energy scales with velocity squared. Doubling traveling speed requires four times the mechanical work and quadruples physical braking distance.",
  },
  {
    q: "How does kinetic energy convert into equivalent TNT explosive energy?",
    a: "The standard international thermochemical benchmark for explosive energy defines 1 gram of TNT as releasing exactly 4,184 Joules (4.184 kJ) of detonation energy, meaning 1 metric ton of TNT equates to 4.184 Gigajoules (GJ). High-velocity kinetic projectiles—such as naval railgun slugs traveling at 2,000 m/s—possess 2.0 Megajoules of kinetic energy per kilogram, inflicting catastrophic destructive impact purely through physical deceleration without requiring chemical warhead charges.",
  },
  {
    q: "What is the work-energy theorem and how does it relate to braking?",
    a: "The Work-Energy Theorem dictates that the net mechanical work performed on a physical body equals the change in its kinetic energy: W_net = ΔKE = ½·m·v_final² - ½·m·v_initial². When stopping an automobile, friction brakes must perform negative work equal to the entire initial kinetic energy: F_braking · d_braking = ½·m·v₀². Consequently, braking distance scales directly with v₀².",
  },
  {
    q: "When must relativistic kinetic energy formulas replace classical KE = ½mv²?",
    a: "Classical Newtonian mechanics assumes invariant mass and infinite light speed. As particle velocity approaches a significant fraction of light speed (v &gt; 0.1c ≈ 30,000 km/s), Einstein's Special Relativity must be applied: KE_relativistic = (γ - 1) · m₀ · c², where γ = 1 / √(1 - v²/c²). At everyday terrestrial speeds (even for supersonic fighter aircraft at Mach 3), relativistic corrections alter the kinetic energy calculation by less than one part in 100 billion.",
  },
  {
    q: "What is the mathematical connection between kinetic energy and linear momentum?",
    a: "While kinetic energy is scalar (KE = ½mv²), linear momentum is a directional vector (p = mv). By algebraic substitution, kinetic energy can be expressed directly in terms of momentum: KE = p² / (2 · m). Conversely, momentum can be determined from kinetic energy: p = √(2 · m · KE). In elastic collisions, both total kinetic energy and momentum are conserved; in inelastic collisions, momentum is conserved while kinetic energy converts into thermal deformation heat.",
  },
];

export default function KineticEnergyCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/physics", label: "Physics" }}
      title="Kinetic Energy Calculator"
      intro="Calculate translational kinetic energy, linear momentum, collision energy in Joules, Kilowatt-hours, foot-pounds, and equivalent explosive TNT yields."
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
                SI & ISO 80000-4 Energy Standard
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Newtonian Mechanical Dynamics</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                Quadratic Work-Energy Engine
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-indigo-500/20 bg-indigo-50/60 p-4 dark:border-indigo-500/30 dark:bg-indigo-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: What is the formula for calculating kinetic energy?
                </strong>
                <p className="mt-1">
                  Translational kinetic energy is calculated by multiplying half of an object's inertial mass by the square of its speed: KE = ½ · m · v². In standard SI units, entering mass in kilograms (kg) and velocity in meters per second (m/s) yields kinetic energy in Joules (J). A 1,500 kg automobile traveling at 100 km/h (27.78 m/s) possesses 578.7 kilojoules (kJ) of kinetic energy, equivalent to the explosive detonation energy of 138 grams of TNT.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - CHART IMMEDIATELY BELOW */}
          <h2>Quadratic Kinetic Energy Escalation Curves Across Vehicle Classes</h2>
          <div className="not-prose my-6">
            <KineticEnergyVelocityScalingChart />
          </div>

          <p>
            Kinetic energy represents the fundamental capacity of a moving body to perform mechanical work against external opposition. Standardized globally within ISO 80000-4 and the International System of Units (SI), the unit of energy is the Joule (1 J = 1 kg·m²/s² = 1 N·m). From crashworthiness engineering and ballistic armor design to flywheel energy storage and industrial turbomachinery, precise calculation of kinetic energy is vital for mechanical safety and dynamic system design.
          </p>

          <p>
            The defining characteristic of kinetic energy is its quadratic relationship with velocity. Unlike linear momentum (p = mv), which expands in direct proportion to speed, kinetic energy quadruples whenever velocity doubles (v²). This mathematical reality explains why modest increases in vehicle cruising speed produce dramatic escalations in emergency stopping distances, crash impact forces, and brake thermal degradation.
          </p>

          <h2>Newtonian Formulations & Work-Energy Integral Derivations</h2>

          <p>
            The mathematical formulation of kinetic energy emerges directly from the mechanical definition of work as the line integral of force over displacement:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Classical Translational Kinetic Energy</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">KE = ½ · m · v²</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Yields translational kinetic energy in Joules from mass (kg) and speed (m/s).</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Momentum-Energy Algebraic Duality</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">KE = p² / (2 · m)   |   p = √(2 · m · KE)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Directly correlates kinetic energy with linear momentum vector magnitude p = m·v.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Work-Energy Theorem</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">W_net = ΔKE = ½ · m · (v_final² - v_initial²)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Equates external mechanical work directly to the net change in kinetic energy state.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. Rotational Kinetic Energy of Rigid Bodies</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">KE_rot = ½ · I · ω²</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Quantifies rotational energy from mass moment of inertia I (kg·m²) and angular speed ω (rad/s).</div>
          </Formula>

          <h2>Translational vs Rotational Energy Distribution</h2>

          <p>
            When a rigid circular body—such as an automobile wheel, bowling ball, or flywheel—rolls smoothly without slipping across a surface, its total kinetic energy divides into two distinct mechanical modes: translational energy of the center of mass (½·m·v²) and rotational energy about the centroidal axis (½·I·ω²).
          </p>

          <p>
            For a solid uniform cylinder or disc of radius R (where moment of inertia I = ½·m·R²), rolling without slipping requires that tangential surface speed equals linear translation: v = ω·R. Substituting this constraint into the rotational energy formula yields: KE_rot = ½ · (½·m·R²) · (v/R)² = ¼ · m · v². Consequently, total rolling kinetic energy equals: KE_total = ½·m·v² + ¼·m·v² = ¾ · m · v². Exactly two-thirds of the total energy resides in forward translation, while one-third is stored in internal wheel rotation.
          </p>


          <h2>Relativistic Kinetic Energy at Particle Accelerator Speeds</h2>

          <p>
            While the Newtonian formula KE = ½mv² accurately governs everyday physical phenomena, it breaks down when particle velocities approach the speed of light (c = 299,792,458 m/s). According to Albert Einstein's Special Theory of Relativity, an object's relativistic mass increases with velocity, demanding an infinite expenditure of energy to reach light speed.
          </p>

          <p>
            In high-energy particle accelerators—such as the Large Hadron Collider (LHC) at CERN—protons are accelerated to 99.9999991% of light speed. At these extreme velocities, relativistic kinetic energy must be computed using the Lorentz factor γ:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">5. Einstein Relativistic Kinetic Energy Formula</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">KE_rel = (γ - 1) · m₀ · c²   |   γ = 1 / √(1 - v²/c²)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Accurately computes kinetic energy when velocity v approaches the speed of light c.</div>
          </Formula>

          <p>
            For terrestrial automobiles and aircraft traveling below 1,000 m/s, the relativistic Lorentz factor evaluates to γ ≈ 1.000000000005, confirming that classical Newtonian mechanics remains exceptionally accurate across all civil and automotive engineering applications.
          </p>

          <h2>Flywheel Kinetic Energy Storage & Grid Stabilization</h2>

          <p>
            Advanced mechanical energy storage systems utilize carbon-fiber composite flywheels rotating in high-vacuum magnetic levitation chambers to store kinetic energy: E_rot = ½ · I · ω². Operating at rotational speeds exceeding 60,000 RPM, modern utility-scale flywheel installations deliver instant response power within 4 milliseconds to stabilize electric grid frequency, offering round-trip conversion efficiencies exceeding 88% to 92%.
          </p>

          <h2>Comparative Operational Worked Case Studies</h2>

          <p>
            To examine practical kinetic energy magnitudes across disparate physical scales:
          </p>

          <h3>Case Study A: Highway Passenger Sedan at 100 km/h</h3>
          <p>
            A loaded mid-size electric passenger sedan with an all-up mass of m = 1,850 kg travels at highway cruising speed: v = 100 km/h = 27.778 m/s.
          </p>
          <ul>
            <li><strong>Translational Kinetic Energy:</strong> KE = ½ × 1,850 kg × (27.778 m/s)² = 0.5 × 1,850 × 771.60 = 713,730 Joules (713.73 kJ = 0.714 MJ).</li>
            <li><strong>Electrical Energy Storage Value:</strong> 713,730 J ÷ 3,600,000 J/kWh = 0.198 kilowatt-hours (kWh).</li>
            <li><strong>Linear Momentum:</strong> p = 1,850 kg × 27.778 m/s = 51,389 N·s (kg·m/s).</li>
            <li><strong>Equivalent TNT Detonation Energy:</strong> 713,730 J ÷ 4,184 J/g = 170.6 grams of TNT explosive yield.</li>
          </ul>

          <h3>Case Study B: High-Speed Electric Passenger Train (300 km/h)</h3>
          <p>
            An 8-car high-speed electric passenger trainset with a gross loaded mass of m = 420,000 kg cruises at full operating speed: v = 300 km/h = 83.333 m/s.
          </p>
          <ul>
            <li><strong>Translational Kinetic Energy:</strong> KE = ½ × 420,000 kg × (83.333 m/s)² = 0.5 × 420,000 × 6,944.4 = 1,458,333,333 Joules (1.458 Gigajoules = 1,458 MJ).</li>
            <li><strong>Electrical Equivalent:</strong> 1,458 MJ ÷ 3.6 MJ/kWh = 405.1 kWh of stored kinetic energy.</li>
            <li><strong>Linear Momentum:</strong> p = 420,000 kg × 83.333 m/s = 35,000,000 N·s.</li>
            <li><strong>Explosive Benchmark:</strong> 1.458 GJ corresponds to the thermal detonation energy of 348.5 kg of military-grade TNT.</li>
          </ul>

          <h2>Engineering Constraints & Braking Thermal Absorption</h2>

          <p>
            Stopping a moving vehicle requires converting its entire kinetic energy into alternative energy forms:
          </p>

          <ol>
            <li>
              <strong>Frictional Brake Thermal Saturation:</strong> Conventional disc brakes convert kinetic energy into heat through Coulomb friction between pads and cast-iron or carbon-ceramic rotors: Q = ΔKE. In heavy vehicles or descending steep alpine mountain passes, excessive energy absorption can push rotor temperatures beyond 750°C, inducing fluid vaporization and complete brake fade.
            </li>
            <li>
              <strong>Regenerative Braking Recovery:</strong> Modern hybrid and electric powertrains reverse traction electric motors into generators, converting up to 70% to 85% of translational kinetic energy back into electrical charge stored within the lithium-ion battery pack.
            </li>
            <li>
              <strong>Crumple Zone Energy Dissipation:</strong> In high-speed collisions, vehicle frame crumple zones are engineered to undergo permanent plastic metal deformation, absorbing kinetic energy at controlled rates to cap peak bodily deceleration below human survival thresholds.
            </li>
          </ol>

          <h2>Authoritative Energy & Physics Standardization References</h2>

          <p>
            For verified mechanical energy metrology standards and physical constants:
          </p>
          <ul>
            <li>
              <strong>ISO 80000-4:2019:</strong> International metric standard specifying quantities, dimensions, and derived units of mechanics, work, energy, and power.
            </li>
            <li>
              <strong>NIST Special Publication 330:</strong> United States national reference for SI unit definitions of the Joule and physical energy conversion multipliers.
            </li>
            <li>
              <strong>BIPM Consultative Committee for Units (CCU):</strong> International metrological conventions governing derived mechanical energy units.
            </li>
            <li>
              <strong>SAE J299:</strong> Society of Automotive Engineers standard for stopping distance test procedures and kinetic energy dissipation analysis.
            </li>
          </ul>
        </>
      }
    >
      <KineticEnergyCalculator />
    </CalcPage>
  );
}
