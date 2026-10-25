import type { Metadata } from "next";
import Link from "next/link";
import FreeFallCalculator from "@/components/calcs/physics/free-fall-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { FreeFallHeightVelocityChart } from "@/components/flagship/physics/editorial-charts";

const PATH = "/calculators/physics/free-fall-calculator";
const TITLE = "Free Fall Calculator | Gravity Kinematics, Drop Duration & Impact Velocity";
const DESCRIPTION =
  "Calculate free fall duration, terminal impact velocity, impact kinetic energy, and momentum for falling objects across Earth, Lunar, and Martian gravitational fields.";

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
  { href: "/calculators/physics/kinetic-energy-calculator", icon: "⚡", name: "Kinetic Energy" },
  { href: "/calculators/physics/gravitational-force-calculator", icon: "🌌", name: "Newtonian Gravity" },
  { href: "/calculators/physics/potential-energy-calculator", icon: "🏔️", name: "Gravitational Potential Energy" },
  { href: "/calculators/physics/momentum-calculator", icon: "🎯", name: "Linear Momentum" },
];

const FAQ_ITEMS = [
  {
    q: "What is the physical definition and mathematical formula for free fall?",
    a: "Free fall defines the motion of a physical body where gravity is the sole force acting upon it. In an idealized vacuum, all objects accelerate downward at the local gravitational rate (g = 9.80665 m/s² on Earth's surface) regardless of their individual mass or density. For an object dropped from rest (v₀ = 0), the fall duration is: t = √(2h / g), and the terminal impact velocity is given by Torricelli's equation: v = √(2gh).",
  },
  {
    q: "Why do heavy and light objects fall at the identical acceleration in a vacuum?",
    a: "According to Newton's Second Law (F = m_i · a) and the Universal Law of Gravitation (F = G · M · m_g / r²), gravitational force is directly proportional to gravitational mass (m_g). However, resistance to acceleration is dictated by inertial mass (m_i). Because the Equivalence Principle establishes that gravitational mass and inertial mass are strictly identical (m_g = m_i), mass cancels out completely from the acceleration equation: a = F / m = (m · g) / m = g. Apollo 15 famously demonstrated this on the Moon by dropping a 1.3 kg falcon hammer and a 0.03 kg feather simultaneously, landing at the exact same instant.",
  },
  {
    q: "What is aerodynamic terminal velocity and how does it restrict free fall?",
    a: "In Earth's atmosphere, falling objects encounter upward aerodynamic drag: F_drag = ½ · ρ · v² · Cd · A. As velocity increases, drag force escalates until it matches downward gravitational weight (F_drag = m · g). At this equilibrium, net force becomes zero, acceleration ceases, and the body descends at constant terminal velocity: v_terminal = √[ (2 · m · g) / (ρ · Cd · A) ]. A human skydiver falling belly-to-earth reaches terminal velocity at approximately 54 m/s (195 km/h) after descending roughly 450 meters.",
  },
  {
    q: "How does gravitational acceleration vary across celestial planetary bodies?",
    a: "Surface gravity is determined by planetary mass and radius: g = G · M / R². While Earth's standard surface gravity is 9.81 m/s², the Moon's smaller mass produces g = 1.62 m/s² (about one-sixth Earth). Mars produces g = 3.72 m/s² (38% of Earth). Conversely, the gas giant Jupiter possesses a cloud-top gravity of 24.79 m/s² (2.53× Earth). An object dropped from 45 meters takes 3.03 seconds to fall on Earth, but requires 7.45 seconds on the Moon.",
  },
  {
    q: "How is impact kinetic energy and damage potential calculated from fall height?",
    a: "By the Law of Conservation of Energy, all initial gravitational potential energy (PE = m · g · h) converts directly into kinetic energy (KE = ½ · m · v²) at the moment of impact. A 5 kg object falling from 45 meters hits the ground with KE = 5 kg × 9.81 m/s² × 45 m = 2,207 Joules of energy. The destructive impact force depends on deceleration distance upon collision: F_impact = KE / d_stopping.",
  },
  {
    q: "Does gravity vary significantly at commercial aircraft altitudes?",
    a: "Gravity decreases inversely with the square of distance from Earth's center: g(h) = g₀ · [R_e / (R_e + h)]². Because Earth's radius is approximately 6,371 kilometers, cruising at a standard airliner altitude of 10,000 meters (10 km) reduces gravitational acceleration from 9.807 m/s² to 9.776 m/s²—a tiny reduction of only 0.31%, which is negligible for everyday kinematic analysis.",
  },
];

export default function FreeFallCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/physics", label: "Physics" }}
      title="Free Fall Kinematics Calculator"
      intro="Calculate free fall descent duration, terminal impact speed, collision kinetic energy, and celestial gravity comparisons using Newtonian gravitational mechanics."
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
                CODATA & NIST Gravitational Standard
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Celestial Mechanics Engine</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                Equivalence Principle Validated
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-indigo-500/20 bg-indigo-50/60 p-4 dark:border-indigo-500/30 dark:bg-indigo-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: What is the formula for calculating free fall time and velocity?
                </strong>
                <p className="mt-1">
                  For an object dropped from rest under uniform gravity without air resistance, fall duration equals the square root of twice the height divided by gravity: t = √(2h / g). Terminal impact velocity is calculated via Torricelli's equation: v = √(2gh) = g · t. On Earth surface gravity (g = 9.80665 m/s²), dropping from a height of 45 meters takes 3.03 seconds and strikes the ground at 29.7 m/s (106.9 km/h or 66.4 mph).
                 Analyze celestial gravitational attraction with our <Link href="/calculators/physics/gravitational-force-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">gravitational force calculator</Link>, calculate 2D launch trajectories with the <Link href="/calculators/physics/projectile-motion-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">projectile motion calculator</Link>, or evaluate terminal impact speeds using our <Link href="/calculators/physics/velocity-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">velocity calculator</Link>.</p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - CHART IMMEDIATELY BELOW */}
          <h2>Vacuum Free Fall Duration & Velocity Curves by Elevation</h2>
          <div className="not-prose my-6">
            <FreeFallHeightVelocityChart />
          </div>

          <p>
            Free fall represents the purest manifestation of gravitational physics in classical mechanics. In the absence of atmospheric drag, every physical body—regardless of whether it is a grain of dust, an iron cannonball, or a grand piano—accelerates downward at the exact same uniform rate. Standardized under international physical constants by CODATA and NIST, standard Earth gravity at sea level is fixed at g₀ = 9.80665 m/s².
          </p>

          <p>
            The profound insight that gravitational acceleration is independent of mass was first documented systematically by Galileo Galilei in 1638 and later mathematically formalized in Sir Isaac Newton's Philosophiae Naturalis Principia Mathematica. Later in 1915, Albert Einstein elevated this empirical observation into the cornerstone of General Relativity through the Weak Equivalence Principle: the inertial mass resisting acceleration is physically identical to the gravitational mass generating gravitational attraction.
          </p>

          <h2>Core Kinematic Equations of Free Fall Motion</h2>

          <p>
            When an object falls under a constant gravitational vector directed along the vertical axis (-y), its position and speed conform to the classical kinematic integrals:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Fall Duration from Rest (v₀ = 0)</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">t = √(2 · h / g)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Solves total elapsed seconds to traverse vertical elevation drop h under gravitational field g.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Torricelli Terminal Impact Velocity</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">v = √(v₀² + 2 · g · h)   ⟹   v = √(2 · g · h)  (when v₀=0)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Determines instantaneous collision speed directly from release elevation and initial speed.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Conservation of Mechanical Energy</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">PE_initial = KE_final   ⟹   m · g · h = ½ · m · v²</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Demonstrates why mass cancels out of velocity, while directly determining collision impact energy in Joules.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. General Motion with Initial Downward Velocity</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">t = [ -v₀ + √(v₀² + 2 · g · h) ] / g</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Quadratic solution when the projectile is propelled downward with initial velocity v₀ &gt; 0.</div>
          </Formula>

          <h2>Aerodynamic Drag & Terminal Velocity Equilibrium</h2>

          <p>
            In any terrestrial atmosphere, falling bodies do not accelerate indefinitely toward infinite velocity. As descent velocity escalates, the surrounding air molecules exert an upward resistive drag force governed by fluid dynamics: F_drag = ½ · ρ · v² · Cd · A. In this formulation, ρ represents ambient fluid density (1.225 kg/m³ at sea level), Cd is the dimensionless aerodynamic drag coefficient, and A is the frontal projected cross-sectional area.
          </p>

          <p>
            When upward aerodynamic drag exactly balances downward gravitational weight (F_drag = m · g), the net external force acting on the body reaches zero: F_net = m · g - F_drag = 0. According to Newton's First Law, acceleration ceases completely, and the object continues falling at a constant, unvarying terminal velocity:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">5. Aerodynamic Terminal Velocity Formula</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">v_terminal = √[ (2 · m · g) / (ρ · Cd · A) ]</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Defines maximum achievable free-fall speed through a fluid medium of density ρ.</div>
          </Formula>

          <p>
            A typical human skydiver in a standard belly-to-earth spread-eagle posture (Cd ≈ 1.0, A ≈ 0.7 m², m ≈ 80 kg) achieves terminal velocity at approximately 54 m/s (195 km/h or 121 mph) after roughly 12 to 15 seconds and 450 meters of descent. If the skydiver reorients into a streamlined head-first dive (reducing frontal area A to 0.18 m²), terminal velocity surges to over 90 m/s (324 km/h). Conversely, deploying a parachute expands frontal area A to over 40 m², collapsing terminal velocity to a safe landing speed of 4 to 5 m/s.
          </p>

          <h2>Planetary Gravitational Variance Across the Solar System</h2>

          <p>
            The local acceleration of gravity g is not a universal constant, but rather a localized property of the celestial parent body's mass (M) and radius (R): g = G · M / R². Exploring how drop duration shifts across our Solar System illustrates the fundamental role of gravitational mass:
          </p>

          <DataTable
            head={["Celestial Body", "Surface Gravity (g)", "Fall Time from 50m", "Impact Speed (km/h)", "Relative Weight Ratio"]}
            rows={[
              ["Earth Surface", "9.81 m/s²", "3.19 seconds", "112.7 km/h (31.3 m/s)", "1.00× (Baseline)"],
              ["The Moon", "1.62 m/s²", "7.86 seconds", "45.8 km/h (12.7 m/s)", "0.165× (1/6th Earth)"],
              ["Mars Surface", "3.72 m/s²", "5.19 seconds", "69.5 km/h (19.3 m/s)", "0.379× (38% Earth)"],
              ["Venus Surface", "8.87 m/s²", "3.36 seconds", "107.2 km/h (29.8 m/s)", "0.904× (90% Earth)"],
              ["Jupiter (Cloud-top)", "24.79 m/s²", "2.01 seconds", "179.2 km/h (49.8 m/s)", "2.528× (2.5× Earth)"],
              ["The Sun (Photosphere)", "274.0 m/s²", "0.60 seconds", "596.3 km/h (165.5 m/s)", "27.93× Earth Weight"],
            ]}
          />

          <h2>Energy Conversion & Atmospheric Descent Tools</h2>

          <p>
            Free-fall dynamics seamlessly convert potential energy into kinetic energy during uninhibited downward descent. Track potential energy variations with our <Link href="/calculators/physics/potential-energy-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">potential energy calculator</Link>, measure kinetic impact force using the <Link href="/calculators/physics/kinetic-energy-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">kinetic energy calculator</Link>, and determine stopping collision impulse with our <Link href="/calculators/physics/momentum-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">momentum calculator</Link>. For high-altitude drops, assess atmospheric resistance via the <Link href="/calculators/physics/pressure-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">pressure calculator</Link> and compute deceleration with our <Link href="/calculators/physics/acceleration-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">acceleration calculator</Link>.
          </p>

          <h2>Comparative Operational Worked Case Studies</h2>

          <p>
            To examine practical free fall mechanics across physical scales, consider two real-world drop scenarios:
          </p>

          <h3>Case Study A: Olympic 10-Meter Diving Platform</h3>
          <p>
            An elite platform diver of mass m = 68.0 kg steps off an Olympic 10.0-meter high diving platform from rest (v₀ = 0 m/s) on Earth (g = 9.807 m/s²).
          </p>
          <ul>
            <li><strong>Duration of Fall:</strong> t = √(2 × 10.0 / 9.807) = √(2.039) = 1.428 seconds.</li>
            <li><strong>Water Entry Velocity:</strong> v = √(2 × 9.807 × 10.0) = √196.14 = 14.005 m/s (50.42 km/h = 31.33 mph).</li>
            <li><strong>Kinetic Energy at Entry:</strong> KE = ½ × 68.0 kg × (14.005 m/s)² = 6,669 Joules (6.67 kJ).</li>
            <li><strong>Downward Momentum:</strong> p = m · v = 68.0 kg × 14.005 m/s = 952.3 N·s (kg·m/s).</li>
          </ul>

          <h3>Case Study B: High-Rise Structural Tool Drop</h3>
          <p>
            A steel construction wrench weighing m = 2.50 kg is accidentally dropped from a skyscraper scaffolding at an elevation of h = 150.0 meters.
          </p>
          <ul>
            <li><strong>Descent Duration in Vacuum:</strong> t = √(2 × 150.0 / 9.807) = √30.59 = 5.531 seconds.</li>
            <li><strong>Ground Strike Velocity:</strong> v = √(2 × 9.807 × 150.0) = √2,942.1 = 54.24 m/s (195.27 km/h = 121.33 mph).</li>
            <li><strong>Terminal Impact Energy:</strong> KE = m · g · h = 2.50 kg × 9.807 m/s² × 150.0 m = 3,678 Joules (3.68 kJ).</li>
            <li><strong>Collision Force:</strong> If stopped within d = 0.05 meters of soil deformation, mean impact force exceeds F = KE / d = 3,678 / 0.05 = 73,560 Newtons (16,537 lbf).</li>
          </ul>
<h2>Authoritative Kinematics & Metrology Standards</h2>

          <p>
            For verified gravitational and kinematic physical values:
          </p>
          <ul>
            <li>
              <strong>CODATA Recommended Values of the Fundamental Physical Constants:</strong> Standard acceleration of gravity g₀ = 9.80665 m/s² and Newtonian constant of gravitation G = 6.67430(15) × 10⁻¹¹ m³/(kg·s²).
            </li>
            <li>
              <strong>National Geodetic Survey (NOAA/NGS):</strong> Surface gravity maps detailing gravitational anomalies based on local crustal density and latitude.
            </li>
            <li>
              <strong>ISO 80000-3:2019:</strong> International metric standards defining mechanics, acceleration, and kinematic equations of motion.
            </li>
            <li>
              <strong>NASA Planetary Fact Sheets:</strong> Validated celestial mass, radius, and surface gravity parameters across planetary bodies.
            </li>
          </ul>
        </>
      }
    >
      <FreeFallCalculator />
    </CalcPage>
  );
}
