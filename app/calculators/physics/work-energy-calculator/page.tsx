import type { Metadata } from "next";
import Link from "next/link";
import WorkEnergyCalculator from "@/components/calcs/physics/work-energy-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { WorkAngleForceEfficiencyChart } from "@/components/flagship/physics/editorial-charts";

const PATH = "/calculators/physics/work-energy-calculator";
const TITLE = "Work & Mechanical Energy Calculator | W = F·d·cosθ, Joules & Horsepower";
const DESCRIPTION =
  "Calculate mechanical work done, vector angle efficiency, power rates in Watts and Horsepower, foot-pounds, and mechanical energy transfer across varied angles.";

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
  { href: "/calculators/physics/kinetic-energy-calculator", icon: "⚡", name: "Kinetic Energy" },
  { href: "/calculators/physics/potential-energy-calculator", icon: "🏔️", name: "Potential Energy" },
  { href: "/calculators/physics/power-calculator", icon: "💡", name: "Mechanical Power Rate" },
  { href: "/calculators/physics/force-calculator", icon: "🚀", name: "Force F = ma" },
  { href: "/calculators/physics/torque-calculator", icon: "🔄", name: "Torque & Rotational Work" },
  { href: "/calculators/engineering/horsepower-calculator", icon: "🏎️", name: "Engine Horsepower" },
];

const FAQ_ITEMS = [
  {
    q: "What is the physical definition and mathematical formula for mechanical work?",
    a: "In physics, mechanical work (W) is defined as the scalar dot product of the applied force vector and the displacement vector: W = F · d = |F| · |d| · cosθ, where F is the magnitude of the applied force in Newtons (N), d is the resulting displacement in meters (m), and θ is the angle between the force vector and the direction of displacement. Measured in Joules (J), one Joule of work is performed when a continuous force of one Newton moves an object through a displacement of one meter along the line of action.",
  },
  {
    q: "Why does an applied force perform zero work when directed at a 90-degree angle?",
    a: "Work requires that displacement occurs along the direction of the applied force vector. In the work equation W = F · d · cosθ, when the angle is perpendicular (θ = 90°), the trigonometric cosine evaluates to zero: cos(90°) = 0. Therefore, W = F · d · 0 = 0 Joules. For example, carrying a heavy grocery box while walking horizontally across a level room performs zero work against gravity, because upward supporting force is perpendicular to horizontal travel.",
  },
  {
    q: "Can mechanical work be negative, and what does negative work signify physically?",
    a: "Yes, mechanical work is negative whenever the angle between the applied force vector and displacement exceeds 90° (because cosθ &lt; 0 for 90° &lt; θ ≤ 180°). Negative work physically signifies that the applied force is removing kinetic energy from the moving body rather than imparting it. Friction forces, aerodynamic braking drag, and automobile hydraulic brake pads always perform negative work (θ = 180°, cos(180°) = -1), decelerating the vehicle and converting kinetic energy into thermal heat.",
  },
  {
    q: "How does mechanical work relate directly to mechanical power?",
    a: "Work quantifies the total quantity of mechanical energy transferred (measured in Joules), whereas power quantifies the temporal rate at which that work is delivered (measured in Joules per second, or Watts): P = dW / dt = W / t. When displacement occurs at constant velocity v, power can also be expressed as the dot product of force and velocity: P = F · v. Performing 1,000 Joules of work over 10 seconds requires 100 Watts; performing that same 1,000 Joules in 1 second demands 1,000 Watts.",
  },
  {
    q: "What is the work-energy theorem and how does it unify dynamics?",
    a: "The Work-Energy Theorem establishes that the net work performed by all forces acting upon an object equals the net change in the object's translational kinetic energy: W_net = ΔKE = ½ · m · v_final² - ½ · m · v_initial². This foundational theorem allows engineers to solve complex dynamic motion problems directly through scalar energy conservation, completely bypassing the need to integrate acceleration vectors over time.",
  },
  {
    q: "What is the difference between conservative and non-conservative work?",
    a: "A force is conservative if the work performed moving an object between two points is completely independent of the path taken (such as gravity or ideal spring elasticity). For conservative forces, work can be fully recovered as potential energy: W_conservative = -ΔPE. Non-conservative forces (such as sliding friction, fluid drag, or plastic deformation) are path-dependent; their work converts mechanical energy irreversibly into thermal dissipation heat.",
  },
];

export default function WorkEnergyCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/physics", label: "Physics" }}
      title="Work & Mechanical Energy Calculator"
      intro="Calculate mechanical work done (W = Fd cosθ), vector directional efficiency, power delivery rates in Watts and Horsepower, and mechanical energy conversion."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
                <svg className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                ISO 80000-4 Classical Mechanics
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Vector Dot-Product Solver</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                Work-Energy Theorem Validated
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-emerald-500/20 bg-emerald-50/60 p-4 dark:border-emerald-500/30 dark:bg-emerald-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: What is the formula for calculating mechanical work?
                </strong>
                <p className="mt-1">
                  Mechanical work is calculated using the vector dot product formula: W = F · d · cos(θ). Applying a force F of 650 Newtons over a displacement d of 40 meters at an angle θ of 0° (parallel to motion) performs exactly 26,000 Joules (26.0 kJ or 19,177 ft-lbf) of mechanical work. If completed over 15 seconds, the average mechanical power delivery rate is 1,733 Watts (1.73 kW or 2.32 Horsepower). If the force is applied at 90°, work drops to zero.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - CHART IMMEDIATELY BELOW */}
          <h2>Mechanical Work Efficiency & Vector Cosine Decay Across Angles</h2>
          <div className="not-prose my-6">
            <WorkAngleForceEfficiencyChart />
          </div>

          <p>
            Mechanical work is the fundamental operational process through which energy is transferred into or out of a physical system via the action of a force acting across a spatial displacement. Standardized internationally under ISO 80000-4, the SI unit of work is the Joule (1 J = 1 N·m = 1 kg·m²/s²). Whether sizing mechanical winches, designing industrial hydraulic presses, or calculating the muscular efficiency of human locomotion, calculating work is the direct link between forces and energy.
          </p>

          <p>
            Crucially, work is a scalar quantity resulting from the dot product of two vectors: force and displacement. Because work depends on the cosine of the angle between these vectors (cosθ), only the component of force aligned parallel to the path of motion contributes to work. Perpendicular forces—such as gravitational normal reactions or magnetic Lorentz forces—perform zero work, altering the direction of travel without changing kinetic energy.
          </p>

          <h2>Foundational Work-Energy Formulas & Vector Derivations</h2>

          <p>
            The classical mathematical framework of work encompasses linear, rotational, and thermodynamic formulations:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Linear Mechanical Work Formula</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">W = F · d · cos(θ)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates scalar work done from force magnitude F (N), displacement d (m), and angle θ.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Average Mechanical Power Delivery</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">P = W / t = F · v · cos(θ)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Relates work done over duration t to power in Watts (1 HP = 745.7 Watts).</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. The Work-Energy Theorem</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">W_net = ΔKE = ½ · m · (v_final² - v_initial²)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Equates total external mechanical work to the net change in kinetic energy state.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. Rotational Work by Torsional Moment</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">W_rot = τ · θ_rad</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates work done by torque τ (N·m) rotating through an angular displacement θ in radians.</div>
          </Formula>

          <h2>Vector Angular Efficiency Analysis</h2>

          <p>
            The trigonometric factor cos(θ) acts as an inherent vector efficiency metric. When pulling an object using a tether, cable, or tow strap, any deviation from parallel alignment wastes motive effort:
          </p>

          <DataTable
            head={["Pull Angle (θ)", "cos(θ) Factor", "Motive Efficiency", "Perpendicular Lost Force", "Work Done (F=1kN, d=50m)"]}
            rows={[
              ["0° (Parallel to Path)", "1.000", "100.0% Efficiency", "0.0 N (Zero normal force)", "50.00 kJ (Maximum Work)"],
              ["15° (Slight Incline)", "0.966", "96.6% Efficiency", "258.8 N upward lift", "48.30 kJ (3.4% Loss)"],
              ["30° (Standard Winch)", "0.866", "86.6% Efficiency", "500.0 N upward lift", "43.30 kJ (13.4% Loss)"],
              ["45° (Steep Cable Pull)", "0.707", "70.7% Efficiency", "707.1 N upward lift", "35.36 kJ (29.3% Loss)"],
              ["60° (High Tow Hook)", "0.500", "50.0% Efficiency", "866.0 N upward lift", "25.00 kJ (50.0% Loss)"],
              ["90° (Perpendicular)", "0.000", "0.0% Efficiency", "1000.0 N upward pull", "0.00 kJ (Zero Work Performed)"],
            ]}
          />


          <h2>Thermodynamic Pressure-Volume Boundary Work in Engines</h2>

          <p>
            In mechanical and aerospace propulsion engineering, work is frequently delivered by fluid expansion rather than solid mechanical contact. In internal combustion cylinders and steam turbines, high-pressure gas expands against a reciprocating piston or rotating turbine blade, performing boundary work:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">5. Thermodynamic Boundary Work Integral</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">W_boundary = ∫ P dV</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates mechanical work delivered by gas pressure P expanding across volume change dV.</div>
          </Formula>

          <p>
            Under isobaric (constant pressure) conditions, boundary work simplifies to W = P · (V₂ - V₁). In closed thermodynamic cycles (such as the Otto cycle in gasoline engines or the Brayton cycle in jet turbines), the net work delivered per cycle equals the enclosed area on the pressure-volume (P-V) indicator diagram.
          </p>

          <h2>Non-Conservative Dissipation & Mechanical Friction Losses</h2>

          <p>
            Real mechanical systems inevitably encounter non-conservative frictional forces that dissipate useful work into thermal heat. In geared machinery, drive chains, and rolling element bearings, Coulomb friction and fluid shear resist relative displacement, ensuring that total useful mechanical work delivered (W_out) is always less than total input work expended (W_in). The difference manifests as ambient thermal temperature rise: Q_loss = W_in - W_out.
          </p>

          <h2>Comparative Operational Worked Case Studies</h2>

          <p>
            To examine practical work and power calculations across disparate physical domains:
          </p>

          <h3>Case Study A: Industrial Factory Pallet Pull (Tilted Tow Cable)</h3>
          <p>
            A motorized warehouse tug pulls a loaded pallet across a smooth factory floor for a displacement of d = 45.0 meters over t = 20.0 seconds. The tow cable tension is F = 850 Newtons angled at θ = 25.0° above the horizontal floor.
          </p>
          <ul>
            <li><strong>Vector Cosine Factor:</strong> cos(25.0°) = 0.9063.</li>
            <li><strong>Effective Horizontal Motive Force:</strong> F_parallel = 850 N × 0.9063 = 770.36 Newtons.</li>
            <li><strong>Perpendicular Lifting Force:</strong> F_perp = 850 N × sin(25.0°) = 359.22 Newtons (reduces floor normal force).</li>
            <li><strong>Net Mechanical Work Done:</strong> W = 770.36 N × 45.0 m = 34,666 Joules (34.67 kJ = 25,568 ft-lbf).</li>
            <li><strong>Mechanical Power Delivery:</strong> P = 34,666 J ÷ 20.0 s = 1,733.3 Watts (1.733 kW = 2.324 HP).</li>
          </ul>

          <h3>Case Study B: High-Rise Hoist Motor Lift (θ = 0° Vertical Work)</h3>
          <p>
            A construction electric hoist lifts a m = 500 kg concrete bucket vertically upward through an elevation of d = 60.0 meters at steady speed in t = 30.0 seconds.
          </p>
          <ul>
            <li><strong>Gravitational Tension Required:</strong> F = m · g = 500 kg × 9.807 m/s² = 4,903.5 Newtons.</li>
            <li><strong>Angle Alignment:</strong> Force and displacement are parallel: θ = 0°, cos(0°) = 1.0.</li>
            <li><strong>Work Done Against Gravity:</strong> W = 4,903.5 N × 60.0 m × 1.0 = 294,210 Joules (294.21 kJ = 0.0817 kWh).</li>
            <li><strong>Continuous Mechanical Power Rate:</strong> P = 294,210 J ÷ 30.0 s = 9,807 Watts (9.807 kW = 13.15 HP).</li>
          </ul>

          <h2>Physical Boundaries & Thermodynamic Dissipation</h2>

          <p>
            When applying the work-energy framework to mechanical machines:
          </p>

          <ol>
            <li>
              <strong>Friction Work as Negative Energy Transfer:</strong> In sliding mechanisms, friction force acts at θ = 180° to motion (cos(180°) = -1), performing negative work that saps useful kinetic energy and converts it into heat.
            </li>
            <li>
              <strong>Mechanical Efficiency Limits:</strong> No machine can deliver 100% of input work to useful output. The First and Second Laws of Thermodynamics dictate that system efficiency (η = W_out / W_in) is always degraded by thermal, acoustic, and viscous losses.
            </li>
            <li>
              <strong>Deformational Hysteresis:</strong> In compliant materials (such as rubber drive belts), cyclical stretching performs internal work that manifests as viscoelastic heat generation.
            </li>
          </ol>


          <h2>Mechanical Advantage & Simple Machines Work Conservation</h2>

          <p>
            Classical simple machines—including levers, pulleys, inclined planes, wheel-and-axle mechanisms, and hydraulic jacks—rely on the conservation of mechanical work to magnify input force. By the Work-Energy Theorem, assuming ideal frictionless conditions, the output work delivered equals the input work expended: W_in = W_out ⟹ F_in · d_in = F_out · d_out.
          </p>

          <p>
            To achieve a mechanical advantage where output force exceeds input force (F_out &gt; F_in), the input displacement must increase in exact inverse proportion (d_in &gt; d_out). A hydraulic automotive lift allows a technician to lift a 2,000 kg car with modest manual effort by pumping a small piston over a large cumulative distance, proving that machines multiply applied force but can never multiply work or energy.
          </p>

          <h2>Authoritative International Standards & Metrology</h2>

          <p>
            For verified work, energy, and power metrology:
          </p>
          <ul>
            <li>
              <strong>ISO 80000-4:2019:</strong> International specifications for physical quantities and units of mechanics, work, energy, and power.
            </li>
            <li>
              <strong>NIST SP 330:</strong> United States national reference for SI base and derived units of mechanics.
            </li>
            <li>
              <strong>BIPM SI Brochure:</strong> Formal definitions of the derived SI units Joule (N·m) and Watt (J/s).
            </li>
            <li>
              <strong>ASME PTC 19.5:</strong> American Society of Mechanical Engineers power test code for mechanical work measurement.
            </li>
          </ul>
        </>
      }
    >
      <WorkEnergyCalculator />
    </CalcPage>
  );
}
