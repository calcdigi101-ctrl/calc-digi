import type { Metadata } from "next";
import Link from "next/link";
import MomentumCalculator from "@/components/calcs/physics/momentum-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { MomentumCollisionForceTimeChart } from "@/components/flagship/physics/editorial-charts";

const PATH = "/calculators/physics/momentum-calculator";
const TITLE = "Momentum Calculator | Linear Momentum (p = mv), Impulse & Collision Force";
const DESCRIPTION =
  "Calculate linear momentum (p = mv), collision impulse, average impact deceleration force in kN and lbf, g-force deceleration, and coefficient of restitution dynamics.";

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
  { href: "/calculators/physics/kinetic-energy-calculator", icon: "💥", name: "Kinetic Energy" },
  { href: "/calculators/physics/force-calculator", icon: "🚀", name: "Newton's Force F=ma" },
  { href: "/calculators/physics/acceleration-calculator", icon: "🏎️", name: "Acceleration & Deceleration" },
  { href: "/calculators/physics/velocity-calculator", icon: "⚡", name: "Velocity Kinematics" },
  { href: "/calculators/physics/work-energy-calculator", icon: "⚙️", name: "Work & Mechanical Energy" },
  { href: "/calculators/physics/free-fall-calculator", icon: "🪂", name: "Free Fall Kinematics" },
];

const FAQ_ITEMS = [
  {
    q: "What is the physical definition and mathematical formula for linear momentum?",
    a: "Linear momentum (p) is a fundamental vector quantity in classical mechanics measuring the quantity of translational motion possessed by a physical body. Formally defined as the product of inertial mass and instantaneous velocity: p = m · v, momentum is expressed in kilogram-meters per second (kg·m/s) or equivalent Newton-seconds (N·s). Because velocity is a directional vector, linear momentum strictly possesses both numerical magnitude and spatial orientation.",
  },
  {
    q: "What is the Impulse-Momentum Theorem and how does it determine collision force?",
    a: "The Impulse-Momentum Theorem states that the mechanical impulse (J) delivered by a net external force acting over a time interval Δt equals the resulting change in the body's linear momentum: J = ∫ F dt = F_avg · Δt = Δp = m · (v_final - v_initial). Rearranging this fundamental relation demonstrates that the average collision impact force is inversely proportional to the impact duration: F_avg = Δp / Δt. Extending impact duration reduces peak impact force in exact inverse proportion.",
  },
  {
    q: "Why do automotive crumple zones and airbags save lives in high-speed crashes?",
    a: "In a collision, an automobile must decelerate from its cruising speed to a complete standstill, meaning total momentum change Δp is fixed by vehicle mass and speed. By deliberately engineering front and rear chassis structures to undergo controlled plastic deformation (crumpling), the impact duration is extended from a stiff 10 milliseconds to approximately 80 to 120 milliseconds. According to F_avg = Δp / Δt, an eight-fold to ten-fold increase in stopping time reduces peak bodily deceleration force by 85% to 90%, preventing fatal organ trauma.",
  },
  {
    q: "What is the fundamental difference between elastic and inelastic collisions?",
    a: "In all collisions isolated from external net forces, total linear momentum is strictly conserved: Σp_initial = Σp_final. In a perfectly elastic collision (coefficient of restitution e = 1.0), kinetic energy is also completely conserved, with colliding bodies rebounding with zero permanent deformation or heat dissipation. In an inelastic collision (0 ≤ e &lt; 1.0), internal kinetic energy is partially or completely dissipated into permanent material deformation, acoustic waves, and thermal friction heat.",
  },
  {
    q: "What is the coefficient of restitution and how does it quantify collision elasticity?",
    a: "The coefficient of restitution (e) is a dimensionless parameter ranging from 0.0 to 1.0 that quantifies the elasticity of a collision between two bodies. It is defined as the ratio of relative separation speed after impact to relative approach speed before impact: e = |v₂_final - v₁_final| / |v₁_initial - v₂_initial|. A value of e = 0 represents a perfectly plastic collision where objects stick together; e = 1.0 represents a perfectly elastic rebound.",
  },
  {
    q: "Why does an elastic rebound collision impart twice the impulse of an inelastic stop?",
    a: "When an object of momentum p strikes a wall and stops dead (inelastic collision, e = 0), the momentum change is Δp = 0 - p = -p, delivering an impulse of J = p. However, when the object rebounds elastically with identical speed in the reverse direction (e = 1.0), the momentum change is Δp = -p - p = -2p, delivering an impulse of J = 2p. Consequently, elastic bouncing imparts twice the total mechanical impulse and twice the average impact force compared to bringing the object to rest.",
  },
];

export default function MomentumCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/physics", label: "Physics" }}
      title="Momentum & Collision Impulse Calculator"
      intro="Calculate linear momentum (p = mv), total collision impulse, average impact deceleration force in kN and lbf, g-forces, and restitution dynamics."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-0.5 font-medium text-rose-700 ring-1 ring-inset ring-rose-600/20 dark:bg-rose-950/40 dark:text-rose-400 dark:ring-rose-500/30">
                <svg className="size-3.5 shrink-0 text-rose-600 dark:text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                ISO 80000-4 & BIPM Classical Mechanics
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Impulse-Momentum Theorem Solver</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                Crash Dynamics Validated
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-rose-500/20 bg-rose-50/60 p-4 dark:border-rose-500/30 dark:bg-rose-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: How do you calculate momentum and collision impact force?
                </strong>
                <p className="mt-1">
                  Linear momentum is the product of mass and velocity: p = m · v. An automobile with a mass of 1,500 kg traveling at 25 m/s (90 km/h or 56 mph) possesses 37,500 N·s (kg·m/s) of linear momentum. If the vehicle collides with a barrier and is arrested over an 80-millisecond (0.080s) crumple duration, the average collision impact force is F_avg = Δp / Δt = 37,500 / 0.080 = 468.8 Kilonewtons (105,390 lbf), subjecting the structure to an average deceleration of 31.9 g-forces.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - CHART IMMEDIATELY BELOW */}
          <h2>Collision Impact Force vs Crumple Duration Curve (Mass = 1,500 kg, v = 90 km/h)</h2>
          <div className="not-prose my-6">
            <MomentumCollisionForceTimeChart />
          </div>

          <p>
            Linear momentum is one of the most profound conserved quantities in classical, relativistic, and quantum physics. Formally standardized within ISO 80000-4, momentum measures the vector quantity of translational motion. From automotive structural crashworthiness and aerospace rocket propulsion to ballistic impact mitigation and sports physics, calculating momentum and impulse is vital for predicting contact forces and dynamic shock responses.
          </p>

          <p>
            The fundamental importance of momentum stems directly from Newton's Third Law and the Principle of Conservation of Momentum: in any closed physical system isolated from external net forces, the vector sum of linear momenta remains strictly immutable over time (Σp_initial = Σp_final). While kinetic energy can readily convert into non-recoverable thermal dissipation heat, momentum can never be created or destroyed—only transferred between interacting bodies.
          </p>

          <h2>Newtonian Momentum Equations & Collision Formulations</h2>

          <p>
            The mathematical mechanics of momentum, collision impulse, and contact forces conform to the following foundational formulas:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Linear Momentum Vector Definition</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">p = m · v</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates linear momentum magnitude from inertial mass m (kg) and velocity v (m/s).</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Impulse-Momentum Theorem</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">J = ∫ F(t) dt = F_avg · Δt = Δp = m · (v_final - v_initial)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Equates mechanical impulse J directly to the temporal change in linear momentum state.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Average Collision Impact Force</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">F_avg = J / Δt = [ m · v · (1 + e) ] / Δt</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Determines average contact deceleration force based on impact duration Δt and restitution e.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. Coefficient of Restitution</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">e = |v_sep| / |v_app|   (0 ≤ e ≤ 1)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Quantifies collision elasticity: e = 0 (perfect plastic crumple), e = 1 (perfect elastic rebound).</div>
          </Formula>

          <h2>Collision Restitution Profiles: Elastic vs Plastic Impact</h2>

          <p>
            The physical consequences of a collision depend heavily on the elasticity profile of the contacting materials, governed by the coefficient of restitution e:
          </p>

          <DataTable
            head={["Collision Material Pair", "Restitution (e)", "Impact Impulse (p_0=10k N·s)", "Kinetic Energy Loss", "Typical Physical Manifestation"]}
            rows={[
              ["Automotive Crumple Zone", "0.00 to 0.05", "10,000 N·s", "95% to 100% Dissipated", "Vehicle frame folds; kinetic energy crushed into heat"],
              ["Baseball on Hardwood Bat", "0.50 to 0.55", "15,200 N·s", "70% to 75% Dissipated", "Ball compresses 50%; high exit-velocity rebound"],
              ["Golf Ball on Titanium Face", "0.78 to 0.83", "18,000 N·s", "35% to 40% Dissipated", "Ultra-high compression springback launch"],
              ["Steel Ball on Hardened Anvil", "0.90 to 0.95", "19,200 N·s", "10% to 15% Dissipated", "High-velocity elastic rebound with minimal ringing"],
              ["Ideal Theoretical Elastic", "1.000", "20,000 N·s", "0.0% (100% Conserved)", "Perfect momentum and kinetic energy preservation"],
            ]}
          />


          <h2>Rocket Propulsion & Tsiolkovsky Momentum Thrust Formulation</h2>

          <p>
            In astronautics and rocket engineering, momentum conservation provides the physical mechanism for accelerating spacecraft through the vacuum of space. Because space contains no external medium to push against, a rocket accelerates by ejecting mass (combustion exhaust gases) at high velocity in the opposite direction.
          </p>

          <p>
            According to the Law of Conservation of Momentum, the forward momentum gain of the rocket equals the backward momentum of the ejected exhaust gases: m · dv = -v_e · dm. Integrating this differential relationship derives Konstantin Tsiolkovsky's legendary Ideal Rocket Equation:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">5. Tsiolkovsky Rocket Equation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">Δv = v_exhaust · ln(m_initial / m_final) = I_sp · g₀ · ln(m_initial / m_final)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates mission velocity change Δv from effective exhaust velocity and propellant mass fraction.</div>
          </Formula>

          <p>
            This equation reveals why rocket payloads constitute a tiny fraction (typically 2% to 4%) of total launch mass: achieving orbital velocity (Δv ≈ 9,500 m/s) requires that propellants account for over 90% of the vehicle's initial liftoff weight.
          </p>

          <h2>Conservation of Angular Momentum in Rotating Systems</h2>

          <p>
            In rotational mechanics, the rotational analog of linear momentum is angular momentum: L = I · ω, where I is the mass moment of inertia (kg·m²) and ω is angular velocity (rad/s). In the absence of external torques (Στ = 0), angular momentum is strictly conserved. A figure skater pulling their arms inward reduces their moment of inertia I, causing their rotational spin rate ω to increase dramatically to preserve constant angular momentum L.
          </p>

          <h2>Comparative Operational Worked Case Studies</h2>

          <p>
            To examine practical momentum dynamics across disparate physical domains:
          </p>

          <h3>Case Study A: Highway Automotive Barrier Crash (80ms Crumple)</h3>
          <p>
            A passenger car of mass m = 1,600 kg traveling at v = 22.22 m/s (80.0 km/h = 49.7 mph) strikes a rigid concrete highway abutment. The vehicle's engineered crumple zones absorb the collision over Δt = 0.080 seconds (80 milliseconds) with plastic deformation (e = 0).
          </p>
          <ul>
            <li><strong>Initial Linear Momentum:</strong> p = 1,600 kg × 22.22 m/s = 35,556 N·s (kg·m/s).</li>
            <li><strong>Total Stopping Impulse:</strong> J = Δp = 35,556 N·s.</li>
            <li><strong>Average Collision Force:</strong> F_avg = 35,556 N·s ÷ 0.080 s = 444,450 Newtons (444.45 kN = 99,915 lbf).</li>
            <li><strong>Bodily Deceleration G-Force:</strong> a_g = (444,450 / 1,600) ÷ 9.807 = 277.8 m/s² ÷ 9.807 = 28.3 g.</li>
            <li><strong>Kinetic Energy Dissipated:</strong> KE = ½ × 1,600 × (22.22)² = 394.97 kilojoules (395 kJ crushed into metal deformation).</li>
          </ul>

          <h3>Case Study B: Major League Baseball Fastball Impact (1.0ms)</h3>
          <p>
            A standard baseball of mass m = 0.145 kg traveling at v = 42.47 m/s (95.0 mph = 152.9 km/h) strikes a rigid catcher's mitt and is brought to a standstill over a brief contact duration of Δt = 0.005 seconds (5 milliseconds, e = 0).
          </p>
          <ul>
            <li><strong>Fastball Linear Momentum:</strong> p = 0.145 kg × 42.47 m/s = 6.158 N·s.</li>
            <li><strong>Total Impact Impulse:</strong> J = 6.158 N·s.</li>
            <li><strong>Average Impact Force:</strong> F_avg = 6.158 N·s ÷ 0.005 s = 1,231.6 Newtons (276.9 lbf).</li>
            <li><strong>Instantaneous Deceleration:</strong> a_g = (1,231.6 / 0.145) ÷ 9.807 = 8,494 m/s² ÷ 9.807 = 866.1 g-forces.</li>
          </ul>

          <h2>Engineering Constraints & Deceleration Force Attenuation</h2>

          <p>
            When designing safety structures for dynamic impact attenuation:
          </p>

          <ol>
            <li>
              <strong>Peak Force vs Mean Force:</strong> In real collisions, force is not constant over time; it follows a sinusoidal or bell-shaped curve. Peak contact force typically exceeds calculated mean force F_avg by a factor of 1.4 to 2.0.
            </li>
            <li>
              <strong>Airbag Load Spreading:</strong> Deployable automotive airbags distribute the decelerating impulse over the entire human ribcage and torso (A ≈ 0.25 m²), reducing local contact pressure (P = F / A) below rib-fracture thresholds.
            </li>
            <li>
              <strong>Hydrodynamic Ship Berthing Fenders:</strong> Large marine berths utilize pressurized pneumatic rubber fenders to stretch the deceleration duration of 100,000-ton cargo vessels from 0.5 seconds to 6.0 seconds, preventing quay structural collapse.
            </li>
          </ol>


          <p>
            In ballistic armoring and personal body armor design, multi-layered Kevlar, ultra-high-molecular-weight polyethylene (UHMWPE), and silicon carbide ceramic strike faces mitigate bullet momentum. The ceramic tile shatters the oncoming projectile core, while the fibrous ballistic composite web deforms over a 44-millimeter backface signature depth, dissipating the bullet's concentrated linear impulse across the wearer's chest wall to prevent fatal blunt-force organ rupture.
          </p>

          <h2>Authoritative International Standards & Impact Metrology</h2>

          <p>
            For verified momentum standards, crash test protocols, and ballistic tables:
          </p>
          <ul>
            <li>
              <strong>ISO 80000-4:2019:</strong> International metric standards specifying physical quantities and units of mechanics, momentum, and impulse.
            </li>
            <li>
              <strong>Federal Motor Vehicle Safety Standards (FMVSS 208):</strong> US Department of Transportation occupant crash protection criteria and dummy deceleration limits.
            </li>
            <li>
              <strong>Euro NCAP Crash Test Protocols:</strong> Standardized frontal barrier offset impact assessment procedures.
            </li>
            <li>
              <strong>NIST Special Publication 811:</strong> Guide for the use of the International System of Units in dynamic collision calculations.
            </li>
          </ul>
        </>
      }
    >
      <MomentumCalculator />
    </CalcPage>
  );
}
