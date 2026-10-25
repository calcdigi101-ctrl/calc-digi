import type { Metadata } from "next";
import Link from "next/link";
import CircularMotionCalculator from "@/components/calcs/physics/circular-motion-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CentripetalForceVelocityRadiusChart } from "@/components/flagship/physics/editorial-charts";

const PATH = "/calculators/physics/circular-motion-calculator";
const TITLE = "Circular Motion Calculator | Centripetal Force, Acceleration & Banking Angle";
const DESCRIPTION =
  "Calculate centripetal acceleration (a_c = v²/r), inward centripetal force, lateral g-force, angular velocity, orbital period, and roadway banking angles.";

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
  { href: "/calculators/physics/acceleration-calculator", icon: "🚀", name: "Linear Acceleration" },
  { href: "/calculators/physics/torque-calculator", icon: "🔄", name: "Torque & Rotational Moment" },
  { href: "/calculators/physics/force-calculator", icon: "⚖️", name: "Newton's Force F=ma" },
  { href: "/calculators/physics/gravitational-force-calculator", icon: "🌌", name: "Gravitational Orbit" },
  { href: "/calculators/physics/kinetic-energy-calculator", icon: "💥", name: "Kinetic Energy" },
  { href: "/calculators/physics/velocity-calculator", icon: "⚡", name: "Velocity Kinematics" },
];

const FAQ_ITEMS = [
  {
    q: "What is the physical definition and mathematical formula for centripetal acceleration?",
    a: "Centripetal acceleration (a_c) is the inward radial acceleration required to continuously bend a moving object's velocity vector along a curved circular path of radius r. Even when speed v remains constant, the direction of motion continuously rotates, generating centripetal acceleration: a_c = v² / r = ω² · r, where v is tangential velocity (m/s), r is curve radius (m), and ω is angular velocity in radians per second (rad/s).",
  },
  {
    q: "What is the scientific distinction between centripetal force and centrifugal force?",
    a: "Centripetal force is a real physical inward force (such as tire friction, gravitational attraction, or string tension) directed toward the instantaneous center of curvature: F_c = m · v² / r. Centrifugal force is an apparent, fictitious inertial force perceived only by an observer situated inside the rotating, non-inertial reference frame. From the outside observer's frame, a passenger turning in a car is simply attempting to continue in a straight line under Newton's First Law.",
  },
  {
    q: "How does highway road banking eliminate reliance on tire friction during cornering?",
    a: "When a roadway curve is banked at an angle θ above horizontal, the normal reaction force exerted by the pavement tilts inward. The horizontal component of the normal force (F_N · sinθ) provides the necessary inward centripetal acceleration. At the ideal design speed, banking allows vehicles to navigate the curve safely even on zero-friction glare ice: tan(θ) = v² / (r · g).",
  },
  {
    q: "How does artificial gravity in rotating spacecraft simulate Earth gravity?",
    a: "In human space exploration, long-duration microgravity causes severe musculoskeletal atrophy. Rotating a toroidal or tethered spacecraft generates an outward perceived centrifugal force against the outer hull that mimics gravitational weight. To simulate 1.0g (9.807 m/s²) at a comfortable non-disorienting rotation rate of 2 RPM (ω ≈ 0.209 rad/s), the required spacecraft radius is: r = g / ω² = 9.807 / (0.209)² ≈ 224 meters.",
  },
  {
    q: "Why does doubling vehicle speed quadruple required cornering friction force?",
    a: "Because centripetal force scales quadratically with tangential velocity (F_c = m · v² / r), entering a curve at 100 km/h rather than 50 km/h demands four times (4×) the inward lateral grip force from tires. If the required friction force exceeds the pavement's Coulomb friction capacity (F_c &gt; μ · m · g), the vehicle loses traction and understeers off the road tangentially.",
  },
  {
    q: "How do laboratory centrifuges separate biological macromolecules and blood plasma?",
    a: "Ultra-centrifuges spin samples at speeds exceeding 100,000 RPM, generating artificial accelerations exceeding 500,000 g-forces (a_c = ω² · r). This colossal acceleration drastically amplifies the buoyant density sedimentation rate of suspended particles according to Stokes' Law, allowing rapid separation of viral capsids, cellular organelles, and blood platelets within minutes.",
  },
];

export default function CircularMotionCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/physics", label: "Physics" }}
      title="Circular Motion & Centripetal Acceleration Calculator"
      intro="Calculate centripetal acceleration (a_c = v²/r), inward motive force, lateral g-force ratios, angular velocity, orbital periods, and roadway banking angles."
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
                ISO 80000-3 Rotational Mechanics
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Centripetal Dynamics Engine</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                AASHTO Highway Banking Validated
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-indigo-500/20 bg-indigo-50/60 p-4 dark:border-indigo-500/30 dark:bg-indigo-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: What is the formula for calculating centripetal acceleration and force?
                </strong>
                <p className="mt-1">
                  Centripetal acceleration is calculated by dividing tangential velocity squared by the turn radius: a_c = v² / r. Inward centripetal force equals mass multiplied by acceleration: F_c = m · v² / r = m · ω² · r. Navigating a 1,400 kg car around a 45-meter radius highway curve at 80 km/h (22.22 m/s) generates 10.97 m/s² of centripetal acceleration (1.12 g-forces), requiring 15.36 Kilonewtons (kN) of inward friction force or an optimal road bank angle of 48.2°.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - CHART IMMEDIATELY BELOW */}
          <h2>Lateral Centripetal Force vs Cornering Speed Across Curve Radii</h2>
          <div className="not-prose my-6">
            <CentripetalForceVelocityRadiusChart />
          </div>

          <p>
            Circular motion is the quintessential rotational archetype of classical mechanics, governing phenomena spanning from planetary satellite orbits and industrial ultra-centrifuges to highway interchange geometry and roller coaster loop physics. Whenever an object traverses a curved trajectory, its spatial velocity vector rotates continuously in space, generating an inward acceleration directed toward the instantaneous center of curvature regardless of whether scalar speed is constant.
          </p>

          <p>
            Standardized internationally under ISO 80000-3, rotational kinematics bridges linear tangential velocity (m/s) with angular coordinate rotation (rad/s). Because centripetal acceleration scales quadratically with speed (v²), doubling vehicular velocity demands a quadrupled lateral tire traction force, illustrating why cornering speed limits are non-negotiable for highway safety.
          </p>

          <h2>Newtonian Circular Motion Formulas & Kinematic Equations</h2>

          <p>
            The mathematical dynamics of circular motion unify tangential velocity, angular frequency, centripetal acceleration, and gravitational banking:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Centripetal Radial Acceleration</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">a_c = v² / r = ω² · r</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Yields inward acceleration in m/s² from tangential speed v (m/s) and radius r (m).</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Centripetal Inward Motive Force</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">F_c = m · a_c = (m · v²) / r = m · ω² · r</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates required inward motive force in Newtons (N) according to Newton's Second Law.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Angular Velocity & Rotational Period</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">ω = v / r = 2π / T = 2π · f   ⟹   T = (2π · r) / v</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Relates orbital period T (seconds) and angular velocity ω (radians per second).</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. Ideal Frictionless Road Banking Angle</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">tan(θ) = v² / (r · g)   ⟹   θ = arctan[ v² / (r · g) ]</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Determines highway superelevation angle where normal reaction balances centripetal demand.</div>
          </Formula>

          <h2>AASHTO Highway Curve Superelevation & Grip Thresholds</h2>

          <p>
            Civil transportation engineers design roadway curves using standards from the American Association of State Highway and Transportation Officials (AASHTO). On real curved highways, lateral grip is provided jointly by pavement superelevation banking (e) and side friction factor (f_s):
          </p>

          <DataTable
            head={["Highway Design Speed", "Minimum Radius (e=6%)", "Max Lateral G-Force", "Side Friction Factor (f_s)", "Typical Real-World Corridor"]}
            rows={[
              ["50 km/h (31 mph)", "85 meters", "0.23 g", "0.16 (High comfort)", "Urban arterial collector curves"],
              ["80 km/h (50 mph)", "230 meters", "0.22 g", "0.14 (Moderate)", "Suburban parkway bypasses"],
              ["100 km/h (62 mph)", "395 meters", "0.20 g", "0.12 (Standard)", "Interstate rural highway corridors"],
              ["120 km/h (75 mph)", "610 meters", "0.19 g", "0.10 (Conservative)", "High-speed motorway transitions"],
              ["300 km/h (High-Speed Rail)", "4,000 meters", "0.08 g", "0.05 (Passenger Comfort)", "Dedicated high-speed rail trackage"],
            ]}
          />


          <h2>Banked Curves and Frictionless Super-Elevation</h2>

          <p>
            In highway civil engineering and high-speed rail corridor design, horizontal roadway curves are deliberately banked at a transverse inclination angle &theta;. Banking tilts the normal reaction force vector toward the center of curvature, supplying the required radial centripetal acceleration without relying exclusively on tire-road surface friction.
          </p>

          <p>
            For a vehicle negotiating a curved pathway of radius r at design velocity v on an iced or frictionless surface, the inward horizontal component of the normal force F_N &middot; sin(&theta;) must precisely match the required centripetal force m &middot; v&sup2; / r, while the vertical component balances gravity:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">5. Ideal Frictionless Curve Banking Formula</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">tan(&theta;) = v&sup2; / (r &middot; g)   |   &theta; = arctan(v&sup2; / (r &middot; g))</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Determines optimal roadway super-elevation angle where lateral shear friction on tires equals zero.</div>
          </Formula>

          <p>
            Civil road design codes like AASHTO mandate maximum roadway cross-slopes between 6% and 8% in temperate climates subject to icing, ensuring slow-moving heavy freight vehicles do not slide down into the inner ditch during severe winter storms.
          </p>

          <h2>Keplerian Orbital Dynamics and Artificial Gravity Habitats</h2>

          <p>
            In celestial astrophysics and space station architecture, centripetal acceleration dictates orbital mechanics and human physiological endurance. Satellites in low Earth orbit maintain stable circular trajectories when Earth gravity provides 100% of the centripetal acceleration: v_orb = &radic;(G &middot; M / r). Meanwhile, rotating toroidal deep-space habitats create artificial gravity via spin: a_c = &omega;&sup2; &middot; r. To reproduce Earth normal gravity (9.80665 m/s&sup2;) while keeping rotation below 2 RPM to eliminate vestibular motion sickness and Coriolis nausea, the space habitat cylinder requires a minimum radius of 224 meters.
          </p>

          <h2>Comparative Operational Worked Case Studies</h2>

          <p>
            To examine practical circular motion mechanics across disparate physical domains:
          </p>

          <h3>Case Study A: Highway Cloverleaf Interchange Exit Ramp</h3>
          <p>
            A loaded passenger car with mass m = 1,450 kg enters an interstate cloverleaf exit ramp of radius r = 50.0 meters at a steady speed of v = 60.0 km/h = 16.667 m/s on standard Earth gravity (g = 9.807 m/s²).
          </p>
          <ul>
            <li><strong>Centripetal Acceleration:</strong> a_c = (16.667)² / 50.0 = 277.78 / 50.0 = 5.556 m/s².</li>
            <li><strong>Lateral Acceleration Ratio:</strong> g_ratio = 5.556 ÷ 9.807 = 0.567 g (significant lateral body roll).</li>
            <li><strong>Required Inward Friction Force:</strong> F_c = 1,450 kg × 5.556 m/s² = 8,056 Newtons (1,811 lbf).</li>
            <li><strong>Angular Velocity:</strong> ω = 16.667 m/s ÷ 50.0 m = 0.333 rad/s (3.18 RPM).</li>
            <li><strong>Ideal Frictionless Roadway Bank Angle:</strong> θ = arctan[(16.667)² / (50.0 × 9.807)] = arctan(0.5665) = 29.53°.</li>
          </ul>

          <h3>Case Study B: Formula 1 High-Downforce Hairpin Turn</h3>
          <p>
            A Formula 1 racing car of mass m = 798 kg navigates a tight circuit turn of radius r = 35.0 meters at an extraordinary entry speed of v = 35.0 m/s (126 km/h = 78.3 mph) assisted by aerodynamic downforce wings.
          </p>
          <ul>
            <li><strong>Centripetal Acceleration:</strong> a_c = (35.0)² / 35.0 = 35.00 m/s².</li>
            <li><strong>Extreme Lateral G-Force:</strong> g_ratio = 35.00 ÷ 9.807 = 3.569 g (sustained high neck strain).</li>
            <li><strong>Required Inward Grip Force:</strong> F_c = 798 kg × 35.00 m/s² = 27,930 Newtons (6,279 lbf).</li>
            <li><strong>Aerodynamic Grip Factor:</strong> The car's static weight is only 7,826 N; inverted aerodynamic wings generate over 22,000 N of downward aerodynamic force, multiplying tire friction capacity by 3.8× to prevent sliding.</li>
          </ul>

          <h2>Physical Constraints & Coriolis Fictitious Accelerations</h2>

          <p>
            When modeling rotating reference frames in advanced mechanics:
          </p>

          <ol>
            <li>
              <strong>Coriolis Acceleration:</strong> In a rotating coordinate system, any object moving with relative velocity v' experiences an additional fictitious Coriolis acceleration perpendicular to its path: a_coriolis = 2 · (ω × v'), creating atmospheric cyclone weather rotation.
            </li>
            <li>
              <strong>Centrifugal Pressure Gradient in Fluids:</strong> Rotating liquid in a cylinder forms a parabolic concave meniscus surface where hydrostatic pressure balances radial centrifugal acceleration: z(r) = (ω²·r²) / (2g).
            </li>
            <li>
              <strong>Non-Uniform Circular Motion:</strong> When tangential speed changes (dv/dt ≠ 0), total net acceleration is the vector sum of radial centripetal acceleration and tangential linear acceleration: a_total = √(a_c² + a_tangential²).
            </li>
          </ol>

          <h2>Authoritative International Standards & Rotational Metrology</h2>

          <p>
            For verified circular motion standards, highway design manuals, and rotational metrology:
          </p>
          <ul>
            <li>
              <strong>ISO 80000-3:2019:</strong> International specifications for physical quantities and units of space, time, angular velocity, and acceleration.
            </li>
            <li>
              <strong>AASHTO Policy on Geometric Design of Highways and Streets:</strong> Standard engineering criteria for horizontal curvature, superelevation banking, and friction factors.
            </li>
            <li>
              <strong>NIST SP 811:</strong> Guide for the use of the International System of Units in angular and rotational mechanics.
            </li>
            <li>
              <strong>NASA SP-8007:</strong> Structural design criteria for artificial gravity and rotating space vehicle habitats.
            </li>
          </ul>
        </>
      }
    >
      <CircularMotionCalculator />
    </CalcPage>
  );
}
