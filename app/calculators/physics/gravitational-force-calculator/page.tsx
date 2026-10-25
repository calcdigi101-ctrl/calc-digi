import type { Metadata } from "next";
import Link from "next/link";
import GravitationalForceCalculator from "@/components/calcs/physics/gravitational-force-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { GravitationalInverseSquareChart } from "@/components/flagship/physics/editorial-charts";

const PATH = "/calculators/physics/gravitational-force-calculator";
const TITLE = "Gravitational Force Calculator | Universal Gravity (F = G·m₁·m₂/r²)";
const DESCRIPTION =
  "Calculate universal gravitational attraction force (F = G·M₁·M₂/r²), mutual orbital acceleration, circular orbital velocity, and inverse-square decay across celestial bodies.";

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
  { href: "/calculators/physics/free-fall-calculator", icon: "🪂", name: "Free Fall Gravity" },
  { href: "/calculators/physics/circular-motion-calculator", icon: "🔄", name: "Circular Orbital Motion" },
  { href: "/calculators/physics/force-calculator", icon: "🚀", name: "Newton's Force F=ma" },
  { href: "/calculators/physics/acceleration-calculator", icon: "🏎️", name: "Acceleration Dynamics" },
  { href: "/calculators/physics/momentum-calculator", icon: "🎯", name: "Linear Momentum" },
];

const FAQ_ITEMS = [
  {
    q: "What is Newton's Law of Universal Gravitation and its mathematical formula?",
    a: "Formulated by Sir Isaac Newton in 1687, the Law of Universal Gravitation establishes that every point mass in the universe attracts every other point mass with a mutual force directly proportional to the product of their masses and inversely proportional to the square of the distance between their centers of mass: F_g = G · (M₁ · M₂) / r², where G is the Newtonian gravitational constant (6.67430 × 10⁻¹¹ N·m²/kg²), M₁ and M₂ are masses in kg, and r is separation distance in meters.",
  },
  {
    q: "What is the physical significance of the Gravitational Constant G?",
    a: "The Universal Gravitational Constant G is a fundamental physical constant measuring the intrinsic strength of the gravitational force. Standardized under international CODATA conventions as G = 6.67430(15) × 10⁻¹¹ N·m²/kg², G is by far the weakest of the four fundamental interactions of physics (weaker than electromagnetism by 10³⁶ times). Because G is so extraordinarily small, gravitational attraction is utterly imperceptible between everyday human-scale objects, manifesting noticeably only when planetary masses are present.",
  },
  {
    q: "Why is gravitational force mutual between two interacting bodies?",
    a: "According to Newton's Third Law of Motion, gravitational interaction produces an action-reaction pair: Body 1 exerts an attractive force on Body 2, and Body 2 exerts an identical attractive force on Body 1 in the exact opposite direction: F₁₂ = -F₂₁. Earth attracts the Moon with exactly 1.98 × 10²⁰ Newtons of gravitational force, and the Moon pulls back on Earth with the exact same 1.98 × 10²⁰ Newtons, producing Earth's ocean tides.",
  },
  {
    q: "How does acceleration vary when two bodies of disparate masses attract each other?",
    a: "While the mutual force F_g is strictly identical on both bodies, the resulting acceleration is inversely proportional to their respective masses: a = F / m. For an 80 kg human on Earth (5.972 × 10²⁴ kg), mutual gravity is F = 785 N. The human accelerates downward at a_human = 785 / 80 = 9.81 m/s². Concurrently, the entire Earth accelerates upward toward the human at: a_earth = 785 / 5.972×10²⁴ = 1.31 × 10⁻²² m/s²—a displacement so unimaginably small that it is completely undetectable.",
  },
  {
    q: "How is circular orbital velocity derived from universal gravitation?",
    a: "In a stable circular planetary orbit of radius r, universal gravitational attraction provides the exact required centripetal force: F_gravity = F_centripetal ⟹ G · M · m / r² = m · v² / r. Canceling satellite mass m and one radius factor r derives the circular orbital speed equation: v_circ = √(G · M / r). In Low Earth Orbit (r ≈ 6,771 km), circular orbital velocity evaluates to approximately 7.67 km/s (27,600 km/h).",
  },
  {
    q: "When does General Relativity supersede Newtonian gravity?",
    a: "Newtonian gravity treats gravitation as an instantaneous action-at-a-distance force across flat Euclidean space. In strong gravitational fields or relativistic regimes—such as near the Sun's perihelion (precession of Mercury), near neutron stars, or around black hole event horizons—Albert Einstein's General Relativity must be used. General Relativity reveals that gravity is not a traditional force, but rather the curvature of four-dimensional spacetime induced by mass and energy.",
  },
];

export default function GravitationalForceCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/physics", label: "Physics" }}
      title="Universal Gravitational Force Calculator"
      intro="Calculate mutual gravitational attraction (F = GMm/r²), mutual orbital acceleration, circular orbital velocity, and inverse-square decay across celestial bodies."
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
                CODATA 2026 Fundamental Physical Constants
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Celestial Orbit Solver</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                Inverse-Square Law Validated
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-indigo-500/20 bg-indigo-50/60 p-4 dark:border-indigo-500/30 dark:bg-indigo-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: What is the formula for calculating gravitational force?
                </strong>
                <p className="mt-1">
                  Universal gravitational force is calculated using Newton's inverse-square formula: F = G · (M₁ · M₂) / r², where G = 6.67430 × 10⁻¹¹ N·m²/kg². For the Earth-Moon system (Earth M₁ = 5.972 × 10²⁴ kg, Moon M₂ = 7.342 × 10²² kg, distance r = 3.844 × 10⁸ m), the mutual gravitational attraction force is exactly 1.982 × 10²⁰ Newtons (4.456 × 10¹⁹ lbf), keeping the Moon locked in stable orbit at a velocity of 1.02 km/s.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - CHART IMMEDIATELY BELOW */}
          <h2>Gravitational Attraction Decay vs Planetary Distance (1/r² Law)</h2>
          <div className="not-prose my-6">
            <GravitationalInverseSquareChart />
          </div>

          <p>
            Universal gravitation is the supreme architect of the cosmos, structuring everything from oceanic tidal rhythms and planetary satellite orbits to stellar fusion dynamics, galactic rotation disks, and the macroscopic expansion geometry of the observable universe. Formulated in 1687 by Sir Isaac Newton in his historic treatise Philosophiae Naturalis Principia Mathematica, universal gravitation established for the first time in human history that the terrestrial force pulling an apple toward the ground is physically identical to the celestial force holding planets in orbit.
          </p>

          <p>
            Standardized internationally under CODATA recommended physical constants, the Newtonian constant of gravitation is fixed at G = 6.67430(15) × 10⁻¹¹ N·m²/kg². Because gravity obeys a strict inverse-square geometric dissipation law (1/r²), doubling the separation distance between two mass centers reduces their mutual gravitational pull to exactly one-quarter (25%) of its initial strength.
          </p>

          <h2>Newtonian Celestial Equations & Orbital Mechanics</h2>

          <p>
            The mathematical foundations of gravitational dynamics encompass mutual forces, orbital speeds, and escape velocities:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Newton's Law of Universal Gravitation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">F_g = G · (M₁ · M₂) / r²</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates mutual attractive force in Newtons from masses M₁, M₂ (kg) and distance r (m).</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Gravitational Acceleration on Secondary Body</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">a₂ = F_g / M₂ = (G · M₁) / r²</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Yields acceleration in m/s² experienced by Body 2 toward Body 1, independent of M₂.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Stable Circular Orbital Velocity</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">v_circ = √(G · M₁ / r)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Equates gravitational pull to centripetal requirement for stable circular orbit.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. Standard Gravitational Parameter</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">μ = G · M₁   ⟹   T² = (4π² / μ) · r³  (Kepler's 3rd Law)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Defines celestial gravitational constant μ (Earth μ = 3.986 × 10¹⁴ m³/s²).</div>
          </Formula>

          <h2>Solar System Gravitational Masses & Parameters (NASA JPL)</h2>

          <p>
            Planetary orbital dynamics rely on calibrated gravitational masses documented by NASA Jet Propulsion Laboratory (JPL):
          </p>

          <DataTable
            head={["Celestial Body", "Mass (kg)", "Mean Radius (km)", "Surface Gravity (m/s²)", "Escape Velocity (km/s)"]}
            rows={[
              ["The Sun", "1.989 × 10³⁰ kg", "696,340 km", "274.0 m/s² (27.9g)", "617.5 km/s"],
              ["Jupiter", "1.898 × 10²⁷ kg", "69,911 km", "24.79 m/s² (2.53g)", "59.5 km/s"],
              ["Earth", "5.972 × 10²⁴ kg", "6,371 km", "9.807 m/s² (1.00g)", "11.19 km/s"],
              ["Venus", "4.867 × 10²⁴ kg", "6,052 km", "8.87 m/s² (0.90g)", "10.36 km/s"],
              ["Mars", "6.417 × 10²³ kg", "3,390 km", "3.72 m/s² (0.38g)", "5.03 km/s"],
              ["The Moon", "7.342 × 10²² kg", "1,737 km", "1.62 m/s² (0.17g)", "2.38 km/s"],
            ]}
          />


          <h2>Local Gravitational Acceleration and Altitude Variation</h2>

          <p>
            The local acceleration due to gravity g experienced by a falling object on the surface of any spherical celestial mass M is derived directly from Newton's Universal Law of Gravitation. Equating the gravitational attraction force F = G &middot; M &middot; m / r&sup2; with Newton's second law weight formulation W = m &middot; g yields:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">5. Celestial Surface Gravity & Orbital Velocity Formulas</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">g = G &middot; M / r&sup2;   |   v_orbit = &radic;(G &middot; M / r)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Computes local gravitational field strength and circular orbital velocity at radial distance r.</div>
          </Formula>


          <p>
            In deep-space mission trajectory design, spacecraft execute interplanetary gravitational slingshot or gravity assist maneuvers. By flying along a hyperbolic trajectory through the gravitational field of a massive planet like Jupiter or Venus, a robotic spacecraft exchanges orbital momentum with the celestial body, boosting velocity without expending scarce chemical thruster propellants.
          </p>

          <p>
            Because the Earth is an oblate spheroid with equatorial centrifugal bulge, sea-level gravitational acceleration varies slightly from 9.780 m/s&sup2; at the equator to 9.832 m/s&sup2; at the geographic poles. At the 400 km altitude of the International Space Station (ISS), the distance from Earth's center is r = 6,771 km, where gravitational acceleration remains surprisingly strong at g = 8.69 m/s&sup2; (89% of Earth surface gravity). Astronauts float in free-fall weightlessness not because gravity is absent, but because the station and crew continuously fall around the planet at 7.67 km/s.
          </p>

          <h2>Gravitational Potential Energy Wells and Escape Velocity</h2>

          <p>
            Over astronomical separations where gravity cannot be treated as uniform, gravitational potential energy is defined relative to infinity: U(r) = -G &middot; M &middot; m / r. Launching an interplanetary robotic probe outside Earth's gravitational binding basin requires supplying sufficient kinetic energy to overcome this negative potential well. Equating total orbital mechanical energy to zero derives planetary escape velocity: v_esc = &radic;(2 &middot; G &middot; M / R) = &radic;(2 &middot; g &middot; R). For Earth, escaping planetary gravity requires reaching 11.186 km/s (40,270 km/h).
          </p>

          <h2>Comparative Operational Worked Case Studies</h2>

          <p>
            To examine practical gravitational mechanics across disparate astronomical scales:
          </p>

          <h3>Case Study A: Earth - Moon Gravitational Binding System</h3>
          <p>
            The Moon (M₂ = 7.342 × 10²² kg) orbits planet Earth (M₁ = 5.972 × 10²⁴ kg) at a mean semi-major axis distance of r = 384,400,000 meters (384,400 km).
          </p>
          <ul>
            <li><strong>Squared Separation Distance:</strong> r² = (3.844 × 10⁸ m)² = 1.4776 × 10¹⁷ m².</li>
            <li><strong>Mass Product:</strong> M₁ × M₂ = (5.972 × 10²⁴) × (7.342 × 10²²) = 4.3846 × 10⁴⁷ kg².</li>
            <li><strong>Universal Gravitational Force:</strong> F_g = 6.67430×10⁻¹¹ × (4.3846×10⁴⁷ ÷ 1.4776×10¹⁷) = 1.982 × 10²⁰ Newtons (4.456 × 10¹⁹ lbf).</li>
            <li><strong>Centripetal Acceleration on the Moon:</strong> a_moon = 1.982×10²⁰ ÷ 7.342×10²² = 0.00270 m/s² (2.70 mm/s²).</li>
            <li><strong>Circular Orbital Speed:</strong> v = √[(6.67430×10⁻¹¹ × 5.972×10²⁴) ÷ 3.844×10⁸] = 1,018 m/s (1.018 km/s = 3,665 km/h).</li>
          </ul>

          <h3>Case Study B: Sun - Earth Gravitational Orbit</h3>
          <p>
            Planet Earth (M₂ = 5.972 × 10²⁴ kg) orbits the Sun (M₁ = 1.989 × 10³⁰ kg) at 1.0 Astronomical Unit: r = 1.496 × 10¹¹ meters.
          </p>
          <ul>
            <li><strong>Mutual Gravitational Force:</strong> F_g = 6.67430×10⁻¹¹ × [(1.989×10³⁰ × 5.972×10²⁴) ÷ (1.496×10¹¹)²] = 3.542 × 10²² Newtons.</li>
            <li><strong>Orbital Acceleration on Earth:</strong> a_earth = 3.542×10²² ÷ 5.972×10²⁴ = 0.00593 m/s² (5.93 mm/s²).</li>
            <li><strong>Earth Orbital Speed:</strong> v = √[(6.67430×10⁻¹¹ × 1.989×10³⁰) ÷ 1.496×10¹¹] = 29,780 m/s (29.78 km/s = 107,200 km/h).</li>
          </ul>

          <h2>Physical Boundaries & Gravitational Wave Emission</h2>

          <p>
            When analyzing extreme relativistic gravity:
          </p>

          <ol>
            <li>
              <strong>General Relativistic Geodesics:</strong> In Einstein's field equations (G_μν = 8πG/c⁴ · T_μν), mass curves the Riemannian geometry of spacetime. Planets do not feel a pulling force, but simply follow straight paths (geodesics) through curved spacetime.
            </li>
            <li>
              <strong>Gravitational Time Dilation:</strong> Clocks run measurably slower deeper inside a gravitational potential well: Δt' = Δt · √(1 - 2GM/rc²). Global Positioning System (GPS) satellites must adjust their onboard atomic clocks by +45 microseconds per day to correct for gravitational time dilation.
            </li>
            <li>
              <strong>Gravitational Radiation:</strong> As predicted by General Relativity and confirmed by LIGO, orbiting binary black holes lose orbital energy by radiating gravitational waves across spacetime.
            </li>
          </ol>

          <h2>Authoritative International Standards & Ephemeris References</h2>

          <p>
            For verified gravitational metrology standards and planetary ephemerides:
          </p>
          <ul>
            <li>
              <strong>CODATA Recommended Values of Fundamental Constants:</strong> Universal gravitational constant G = 6.67430(15) × 10⁻¹¹ m³/(kg·s²).
            </li>
            <li>
              <strong>International Astronomical Union (IAU):</strong> Standard astronomical constants, celestial mass ratios, and planetary parameters.
            </li>
            <li>
              <strong>NASA JPL Development Ephemeris (DE440):</strong> High-precision numerical ephemeris integrating gravitational multi-body interactions across the Solar System.
            </li>
            <li>
              <strong>ISO 80000-3:2019:</strong> International specifications for physical quantities and units of mechanics and gravitation.
            </li>
          </ul>
        </>
      }
    >
      <GravitationalForceCalculator />
    </CalcPage>
  );
}
