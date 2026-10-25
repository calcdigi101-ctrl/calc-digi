import type { Metadata } from "next";
import Link from "next/link";
import TorqueCalculator from "@/components/calcs/physics/torque-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { TorqueAngleEfficiencyChart } from "@/components/flagship/physics/editorial-charts";

const PATH = "/calculators/physics/torque-calculator";
const TITLE = "Torque Calculator | Rotational Moment (τ = F·r·sinθ), lb-ft & Horsepower";
const DESCRIPTION =
  "Calculate rotational torque moments (τ = Fr sinθ), pound-feet, inch-pounds, effective moment arms, and equivalent mechanical horsepower at operating RPM.";

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
  { href: "/calculators/physics/work-energy-calculator", icon: "⚙️", name: "Work & Mechanical Energy" },
  { href: "/calculators/physics/power-calculator", icon: "💡", name: "Mechanical Power Rate" },
  { href: "/calculators/physics/force-calculator", icon: "🚀", name: "Newton's Force F=ma" },
  { href: "/calculators/physics/circular-motion-calculator", icon: "🔄", name: "Circular Motion" },
  { href: "/calculators/engineering/torque-calculator", icon: "🏎️", name: "Engineering Engine Torque" },
  { href: "/calculators/engineering/horsepower-calculator", icon: "🐎", name: "Engine Horsepower" },
];

const FAQ_ITEMS = [
  {
    q: "What is the physical definition and mathematical formula for torque?",
    a: "Torque (τ), also designated as rotational moment of force, measures the rotational effectiveness of a force in twisting a rigid body about a defined pivot axis. Mathematically defined as the vector cross product of the position lever vector r and applied force vector F: τ = r × F = |r| · |F| · sinθ, where r is the lever arm distance in meters (m), F is applied force in Newtons (N), and θ is the angle between the lever arm and force vector. Torque is measured in Newton-meters (N·m) or imperial pound-feet (lb-ft).",
  },
  {
    q: "Why is maximum torque generated when force is applied at a 90-degree angle?",
    a: "In the torque cross-product formulation τ = F · r · sin(θ), the trigonometric factor sin(θ) determines the perpendicular component of force that directly rotates the lever arm. The sine function reaches its absolute peak of 1.0 when θ = 90°: sin(90°) = 1.0. Applying force perpendicularly achieves 100% mechanical leverage. Pulling or pushing directly along the lever arm (θ = 0° or 180°) produces sin(0°) = 0, wasting 100% of the force in radial tension without generating any rotational torque.",
  },
  {
    q: "How does torque convert into mechanical horsepower at a given engine RPM?",
    a: "In rotating mechanical shafts and internal combustion engines, power is the product of torque and angular velocity: P = τ · ω = τ · (2π · RPM / 60). In traditional imperial automotive engineering, this yields the classic dynamometer relationship: Horsepower = (Torque in lb-ft × RPM) / 5252. At exactly 5,252 RPM, horsepower and torque curves on an engine dyno graph always intersect.",
  },
  {
    q: "What is the critical scientific distinction between torque (N·m) and work (Joules)?",
    a: "Although both torque and work share identical fundamental dimensions (mass × length² / time², or Newtons × meters), they represent fundamentally different physical concepts. Work is a scalar quantity resulting from a vector dot product (W = F · d = |F||d|cosθ), representing energy transferred along a path. Torque is a pseudovector quantity resulting from a vector cross product (τ = r × F), representing a static or dynamic rotational twisting tendency about an axis.",
  },
  {
    q: "What is a moment arm and how do mechanical levers multiply torque?",
    a: "The perpendicular moment arm (r_perp = r · sinθ) is the shortest perpendicular distance between the axis of rotation and the line of action of the applied force. According to the Principle of Moments, mechanical levers multiply force by providing a long moment arm: τ_in = τ_out ⟹ F_in · r_in = F_out · r_out. A long 1.2-meter breaker bar allows a mechanic to loosen a seized 300 N·m bolt with a modest manual push of only 250 Newtons.",
  },
  {
    q: "How does gear reduction affect torque and rotational speed in gearboxes?",
    a: "Mechanical gearboxes and reduction drives conserve rotational power (P = τ · ω). A reduction gear ratio of R:1 reduces output shaft speed by a factor of R, but multiplies output shaft torque by the identical factor of R (minus friction losses): τ_out = τ_in · R · η. In low gear, an automobile transmission multiplies engine crankshaft torque by 12× to 15× at the drive wheels to launch the vehicle up steep hills.",
  },
];

export default function TorqueCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/physics", label: "Physics" }}
      title="Torque & Rotational Moment Calculator"
      intro="Calculate rotational torque moments (τ = Fr sinθ), imperial pound-feet, inch-pounds, effective moment arms, and equivalent mechanical horsepower across operating RPM."
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
                ISO 80000-4 Rotational Mechanics
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Vector Cross-Product Solver</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                SAE Dyno Horsepower Engine
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-emerald-500/20 bg-emerald-50/60 p-4 dark:border-emerald-500/30 dark:bg-emerald-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: What is the formula for calculating torque and horsepower?
                </strong>
                <p className="mt-1">
                  Torque is calculated by multiplying applied force by lever arm length and the sine of the angle: τ = F · r · sin(θ). Applying 250 Newtons perpendicular (90°) to a 0.60-meter wrench generates exactly 150.0 N·m (110.6 lb-ft or 1,328 in-lb) of torque. At a shaft speed of 1,800 RPM, this torque produces 28.27 Kilowatts (kW), equivalent to 37.9 mechanical brake horsepower (HP).
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - CHART IMMEDIATELY BELOW */}
          <h2>Torque Generation Efficiency vs Force Application Angle</h2>
          <div className="not-prose my-6">
            <TorqueAngleEfficiencyChart />
          </div>

          <p>
            Torque is the rotational counterpart of linear force in classical mechanics, quantifying the tendency of an applied load to rotate, twist, or pivot a rigid body about a designated reference axis. Codified internationally in ISO 80000-4, the SI unit of torque is the Newton-meter (N·m). From bolt fastening specifications in aerospace assembly and electric vehicle motor sizing to civil crane capacity calculations, mastering rotational torque moments is essential across mechanical, civil, automotive, and industrial engineering disciplines.
          </p>

          <p>
            Unlike linear force—which produces translational acceleration proportional to mass (F = ma)—torque produces angular rotational acceleration proportional to the body's mass moment of inertia: τ = I · α. Crucially, torque is governed by a vector cross product (τ = r × F). The effective moment arm depends entirely on the perpendicular sine component: pulling directly along the wrench arm (θ = 0°) wastes 100% of the input effort in tensile shaft stress without generating a single Newton-meter of useful rotation.
          </p>

          <h2>Newtonian Rotational Formulas & Moment Equations</h2>

          <p>
            The mathematical framework of torque unites vector cross products, rotational kinematics, and power delivery:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Vector Cross-Product Torque Formula</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">τ = F · r · sin(θ)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates torque moment from force F (N), lever arm r (m), and angle θ (degrees).</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Newton's Second Law for Rotation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">τ_net = I · α = dL / dt</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Relates torque to mass moment of inertia I (kg·m²) and angular acceleration α (rad/s²).</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Rotational Power Delivery</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">P = τ · ω = τ · (2π · RPM / 60)   ⟹   HP = (τ_lb-ft · RPM) / 5252</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Converts shaft torque and rotational RPM into mechanical brake horsepower.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. Rotational Work Integral</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">W = τ · θ_rad</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Mechanical work in Joules delivered by constant torque rotating through radians.</div>
          </Formula>

          <h2>Standard Automotive Bolt Fastening Torque Specifications</h2>

          <p>
            In automotive manufacturing and structural mechanics, threaded fasteners rely on precision torque tightening to induce optimal tensile bolt clamping preload without exceeding steel yield strength:
          </p>

          <DataTable
            head={["Metric Fastener Class", "Nominal Thread Size", "Recommended Torque (N·m)", "Imperial Torque (lb-ft)", "Typical Automotive Application"]}
            rows={[
              ["Grade 8.8 High-Tensile", "M6 × 1.0", "9.5 to 11.0 N·m", "7.0 to 8.1 lb-ft", "Engine valve cover, sensor brackets"],
              ["Grade 10.9 Alloy Steel", "M8 × 1.25", "25.0 to 28.0 N·m", "18.4 to 20.6 lb-ft", "Brake caliper mounting bolts"],
              ["Grade 10.9 Structural", "M10 × 1.5", "49.0 to 55.0 N·m", "36.1 to 40.5 lb-ft", "Suspension control arm bushings"],
              ["Grade 12.9 Ultra-High", "M12 × 1.75", "85.0 to 95.0 N·m", "62.7 to 70.0 lb-ft", "Subframe and transmission crossmembers"],
              ["Automotive Lug Nuts", "M14 × 1.5", "140.0 to 160.0 N·m", "103.2 to 118.0 lb-ft", "Wheel hub stud lug nut torquing"],
            ]}
          />


          <h2>Rotational Work, Mechanical Power, and Angular Momentum</h2>

          <p>
            In rotating mechanical assemblies, torque represents the rotational equivalent of linear force. When a torque &tau; acts through an angular displacement &Delta;&theta; (expressed in radians), it performs mechanical rotational work: W_rot = &tau; &middot; &Delta;&theta;. Differentiating rotational work with respect to elapsed time reveals the instantaneous rotational power:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">5. Shaft Rotational Power & Angular Momentum Equations</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">P_rot = &tau; &middot; &omega; = &tau; &middot; (2&pi; &middot; RPM / 60)   |   L = I &middot; &omega;</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Links shaft output power in Watts to torque in N&middot;m and angular velocity &omega; in rad/s.</div>
          </Formula>


          <p>
            In electric drivetrain engineering, torque-to-weight density serves as the critical metric for traction motor performance. Permanent magnet synchronous machines (PMSM) achieve continuous torque densities exceeding 15 to 22 N·m per kilogram of active stator and rotor mass, ensuring rapid vehicular acceleration across varying terrain gradients.
          </p>

          <p>
            When an internal combustion engine or electric traction motor spins at 3,000 RPM delivering 400 N&middot;m of torque, its shaft develops P = 400 &middot; (2&pi; &middot; 3000 / 60) = 125,664 W (125.7 kW or 168.5 mechanical horsepower). Because electric motors develop maximum torque at zero RPM, electric vehicles achieve exceptional off-the-line acceleration without needing complex multi-ratio automatic gearboxes.
          </p>

          <h2>Gearbox Gear Reduction and Torque Multiplication</h2>

          <p>
            Heavy industrial machinery and robotics employ planetary gear trains and reduction drives to multiply output torque at the expense of rotational speed. In an ideal gear stage with driving gear teeth N_1 and driven gear teeth N_2, mechanical energy conservation dictates that torque multiplies by gear ratio G = N_2 / N_1, while output angular speed decreases by 1/G. Accounting for gear-mesh frictional efficiency &eta; (typically 94% to 98% in precision helical gearing): &tau;_out = &tau;_in &middot; (N_2 / N_1) &middot; &eta;.
          </p>

          <h2>Comparative Operational Worked Case Studies</h2>

          <p>
            To examine practical torque mechanics across disparate physical domains:
          </p>

          <h3>Case Study A: Automotive Wheel Lug Nut Fastening</h3>
          <p>
            A tire technician uses a precision calibrated click-type torque wrench of length r = 0.50 meters to tighten a wheel lug nut to manufacturer specification (τ = 150.0 N·m). The technician pushes perpendicularly: θ = 90.0°.
          </p>
          <ul>
            <li><strong>Sine Vector Alignment:</strong> sin(90.0°) = 1.000 (100% mechanical leverage).</li>
            <li><strong>Required Applied Manual Force:</strong> F = τ ÷ r = 150.0 N·m ÷ 0.50 m = 300.0 Newtons (67.4 lbf).</li>
            <li><strong>Imperial Torque Equivalent:</strong> 150.0 N·m × 0.737562 = 110.63 lb-ft (1,328 in-lb).</li>
            <li><strong>Angle Deviation Penalty:</strong> If the technician pulls at an awkward angle of θ = 60°, the required manual force surges to: F = 150.0 ÷ (0.50 × sin(60°)) = 150.0 ÷ 0.433 = 346.4 Newtons (a 15.5% excess muscular demand).</li>
          </ul>

          <h3>Case Study B: High-Performance V8 Engine Dynamometer Run</h3>
          <p>
            A twin-turbocharged V8 crate engine on an engine dynamometer produces a peak torque of τ = 750.0 N·m (553.2 lb-ft) at a crankshaft rotational speed of 4,800 RPM.
          </p>
          <ul>
            <li><strong>Angular Rotational Speed:</strong> ω = (4,800 × 2π) ÷ 60 = 502.65 rad/s.</li>
            <li><strong>Mechanical Power Output:</strong> P = τ × ω = 750.0 N·m × 502.65 rad/s = 376,988 Watts (376.99 kW).</li>
            <li><strong>Brake Horsepower Rating:</strong> 376.99 kW ÷ 0.7457 kW/HP = 505.6 mechanical Horsepower.</li>
            <li><strong>Verification via Imperial Formula:</strong> HP = (553.17 lb-ft × 4,800 RPM) ÷ 5252 = 2,655,216 ÷ 5252 = 505.6 HP (identical).</li>
          </ul>

          <h2>Physical Constraints & Thread Friction Uncertainty</h2>

          <p>
            In practical mechanical bolting and shaft design:
          </p>

          <ol>
            <li>
              <strong>Thread Friction Dissipation (The Nut Factor):</strong> In threaded bolting, approximately 85% to 90% of applied torque is consumed overcoming thread and underhead collar friction, leaving only 10% to 15% to stretch the bolt into useful clamping tension. Applying oil or anti-seize lubricant cuts friction, which can over-stretch bolts if torque is not derated.
            </li>
            <li>
              <strong>Torsional Deflection & Windup:</strong> Long drive shafts transmit torque by undergoing elastic angular twisting: θ_twist = (τ · L) / (J · G), where J is the polar moment of inertia and G is the shear modulus of the alloy.
            </li>
            <li>
              <strong>Static vs Dynamic Balancing:</strong> High-torque rotating machinery requires precision dynamic balancing to prevent centrifugal vibration forces from destroying support bearings.
            </li>
          </ol>

          <h2>Authoritative International Standards & Torque Metrology</h2>

          <p>
            For verified torque measurement standards and calibration protocols:
          </p>
          <ul>
            <li>
              <strong>ISO 80000-4:2019:</strong> International specifications for physical quantities and units of mechanics, torque, and rotational dynamics.
            </li>
            <li>
              <strong>ISO 6789-1:2017:</strong> Assembly tools for screws and nuts — Hand torque tools requirements and test methods for design conformance.
            </li>
            <li>
              <strong>SAE J1349:</strong> Engine power and torque test code for spark-ignition and compression-ignition internal combustion engines.
            </li>
            <li>
              <strong>ASME B107.300:</strong> American Society of Mechanical Engineers standard for manual torque instruments.
            </li>
          </ul>
        </>
      }
    >
      <TorqueCalculator />
    </CalcPage>
  );
}
