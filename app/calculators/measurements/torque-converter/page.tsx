import type { Metadata } from "next";
import Link from "next/link";
import TorqueConverterComponent from "@/components/calcs/measurements/torque-converter";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { TorqueRotationalMechanicalMomentChart } from "@/components/flagship/measurements/editorial-charts";

const PATH = "/calculators/measurements/torque-converter";
const TITLE = "Torque Converter | Newton-Meters, Foot-Pounds & Inch-Pounds";
const DESCRIPTION =
  "Convert Newton-meters (N·m), foot-pounds (ft-lb), inch-pounds, kilogram-force meters, and dyne-centimeters with fastener bolt preload tension modeling.";

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
  { href: "/calculators/physics/force-calculator", icon: "💥", name: "Force Calculator" },
  { href: "/calculators/measurements/power-converter", icon: "🔌", name: "Power Converter" },
  { href: "/calculators/measurements/energy-converter", icon: "⚡", name: "Energy Converter" },
  { href: "/calculators/measurements/length-converter", icon: "📏", name: "Length Converter" },
  { href: "/calculators/measurements/angle-converter", icon: "📐", name: "Angle Converter" },
  { href: "/pages/measurements", icon: "🔧", name: "Measurements Hub" },
];

const FAQ_ITEMS = [
  {
    q: "What is the physical definition of torque and how does it differ from work energy?",
    a: "Torque (rotational moment of force, τ) is a pseudovector measuring the rotational tendency of a force applied at a perpendicular distance from a pivot axis: τ = r × F. While both torque and mechanical work share the same dimensional units in SI (Newton-meters, N·m), work is a scalar quantity representing force acting through a linear distance, while torque is a rotational moment acting through an angle (Joules per radian).",
  },
  {
    q: "Why does bolt tightening torque primarily overcome friction rather than clamping force?",
    a: "In mechanical bolted joint assembly, approximately 85% to 90% of applied tightening torque is consumed overcoming thread friction and fastener underhead bearing friction (the Motosh formula: T = F_clamp × [0.161 × P + 0.583 × d_2 × μ_th + 0.5 × D_b × μ_b]). Only 10% to 15% of applied torque converts into useful axial bolt preload tension.",
  },
  {
    q: "How many foot-pounds (ft-lb) are in one Newton-meter (N·m)?",
    a: "One Newton-meter (N·m) equals approximately 0.737562 foot-pounds (ft-lb or lbf·ft). Conversely, one foot-pound equals approximately 1.355818 Newton-meters. To quickly convert in mental math: multiply N·m by 0.74 to get ft-lb, or multiply ft-lb by 1.36 to get N·m.",
  },
  {
    q: "What is the difference between foot-pounds (ft-lb) and inch-pounds (in-lb)?",
    a: "One foot-pound equals exactly 12 inch-pounds (1 ft-lb = 12 in-lb = 1.35582 N·m). Inch-pounds are standard for low-torque precision fasteners—such as bicycle carbon handlebars (typically 5 to 6 N·m / 44 to 53 in-lb) and automotive engine valve cover bolts—where full foot-pound torque wrenches lack measurement resolution.",
  },
];

export default function TorqueConverterPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/measurements", label: "Measurements & Conversions" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 mb-6 text-sm text-slate-700 dark:border-emerald-950/40 dark:bg-emerald-950/10 dark:text-slate-300">
            <strong>Quick Mechanical Guidance:</strong> Torque measures rotational moment of force. In automotive drivetrain engineering, structural bolted joint design, and robotics, cross-reference applied force in our <Link href="/calculators/physics/force-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">force calculator</Link> and calculate engine horsepower in our <Link href="/calculators/measurements/power-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">power converter</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mechanical Foundations of Rotational Moment: Vector Cross-Products
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Torque (also termed the moment of force) quantifies the capacity of an applied force to induce rotational angular acceleration about a fixed pivot or axle axis. Formally derived in classical Newtonian vector mechanics as the cross-product of the radial position lever arm vector r and the applied force vector F: τ = r × F = |r| × |F| × sin(θ), torque governs everything from tightening critical automotive wheel lug nuts to turbine rotor balancing and robotic arm joint actuators.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In mechanical engineering, regional measurement units reflect historical industrial tooling traditions. The International System of Units standardizes torque in Newton-meters (N·m). The American automotive and aerospace industries measure heavy mechanical torque in foot-pounds (ft-lb / lbf·ft) and delicate fasteners in inch-pounds (in-lb). Continental European legacy machinery specifies kilogram-force meters (kgf·m), while micro-optics and laboratory instrument manufacturers utilize centiNewton-meters (cN·m) and dyne-centimeters (dyn·cm).
          </p>

          <TorqueRotationalMechanicalMomentChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Derivation & Fundamental Torque Multipliers
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            All rotational torque transformations compute through the SI coherent derived unit of Newton-meters (1 N·m = 1 kg·m²·s⁻²):
          </p>
          <Formula>{"\\tau_{\\text{target}} = \\tau_{\\text{source}} \\times \\left( \\frac{\\mu_{\\text{source}}}{\\mu_{\\text{target}}} \\right)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where μ represents the exact scalar factor in Newton-meters. Under standard legal metrology:
          </p>
          <Formula>{"1 \\text{ ft}\\cdot\\text{lbf} = 0.3048 \\text{ m} \\times (0.45359237 \\text{ kg} \\times 9.80665 \\text{ m/s}^2) \\approx 1.3558179483314 \\text{ N}\\cdot\\text{m}"}</Formula>
          <Formula>{"1 \\text{ in}\\cdot\\text{lbf} = \\frac{1}{12} \\text{ ft}\\cdot\\text{lbf} \\approx 0.1129848290276 \\text{ N}\\cdot\\text{m}"}</Formula>
          <Formula>{"1 \\text{ kgf}\\cdot\\text{m} = 9.80665 \\text{ N}\\cdot\\text{m}, \\quad 1 \\text{ N}\\cdot\\text{m} = 10^7 \\text{ dyn}\\cdot\\text{cm}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In mechanical power drivetrains, shaft torque τ combines with angular rotational velocity ω to generate mechanical power: P = τ × ω; cross-reference shaft wattage in our <Link href="/calculators/measurements/power-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">power converter</Link> and calculate angular arc rotations in our <Link href="/calculators/measurements/angle-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">angle converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comprehensive Reference Table of Global Torque Units
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles exact metric conversion constants across micro-precision, automotive, and heavy industrial torque regimes:
          </p>
          <DataTable
            head={["Torque Unit", "Symbol", "Value in Newton-Meters (N·m)", "Value in Foot-Pounds (ft-lb)", "Value in Inch-Pounds (in-lb)"]}
            rows={[
              ["Dyne-Centimeter", "dyn·cm", "1.0 × 10⁻⁷ N·m", "7.37562 × 10⁻⁸ ft-lb", "8.85075 × 10⁻⁷ in-lb"],
              ["CentiNewton-Meter", "cN·m", "0.01 N·m", "0.00737562 ft-lb", "0.0885075 in-lb"],
              ["Newton-Centimeter", "N·cm", "0.01 N·m", "0.00737562 ft-lb", "0.0885075 in-lb"],
              ["Newton-Meter (SI Coherent)", "N·m", "1.0 N·m", "0.737562 ft-lb", "8.850746 in-lb"],
              ["KiloNewton-Meter", "kN·m", "1,000.0 N·m", "737.562 ft-lb", "8,850.746 in-lb"],
              ["Inch-Pound Force", "in-lb / in·lbf", "0.112985 N·m", "0.083333 ft-lb", "1.0 in-lb"],
              ["Foot-Pound Force", "ft-lb / ft·lbf", "1.355818 N·m", "1.0 ft-lb", "12.0 in-lb"],
              ["Kilogram-Force Meter", "kgf·m", "9.80665 N·m", "7.233014 ft-lb", "86.79617 in-lb"],
              ["Ounce-Force Inch", "oz-in", "0.00706155 N·m", "0.0052083 ft-lb", "0.0625 in-lb"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: Automotive Wheel Hub Lug Nut Torquing
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a motorsport mechanic tightening wheel lug nuts on a high-performance GT3 racing car fitted with M14×1.5 Grade 10.9 wheel studs. The workshop manual specifies a tightening torque of 140 Newton-meters (N·m). The pit crew uses calibrated imperial torque wrenches with micrometer dials graduated in foot-pounds (ft-lb):
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Convert N·m to Foot-Pounds):</strong> 140 N·m ÷ 1.35581795 N·m/(ft-lb) = 103.259 ft-lb.</li>
            <li><strong>Step 2 (Convert to Inch-Pounds):</strong> 103.259 ft-lb × 12 in/ft = 1,239.11 in-lb.</li>
            <li><strong>Step 3 (Calculate Axial Bolt Clamping Preload Tension):</strong> Using the empirical short-form fastener equation T = K × D × F_p, where K is the friction nut factor (~0.20 for dry steel) and D is bolt diameter (0.014 m): F_p = 140 N·m ÷ (0.20 × 0.014 m) = 50,000 Newtons (50 kN, or approximately 11,240 pounds-force of axial clamping load).</li>
            <li><strong>Step 4 (Preload Yield Safety Margin):</strong> Fastener proof load stress can be cross-verified in our <Link href="/calculators/measurements/pressure-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">pressure converter</Link> and lever arm lengths verified in our <Link href="/calculators/measurements/length-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">length converter</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Fastener Tribology: VDI 2230 Bolted Joint Mechanics & Underhead Friction
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In structural bolted joint engineering governed by VDI 2230 guidelines, torque control is fundamentally an indirect method of establishing axial fastener clamping preload. The relationship between applied tightening torque T and induced bolt clamping force F_M is dictated by thread helix geometry and friction coefficients:
          </p>
          <Formula>{"T = F_M \\left( \\frac{P}{2\\pi} + \\frac{\\mu_{\\text{th}} d_2}{2 \\cos \\alpha} + \\frac{\\mu_b D_b}{2} \\right)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where P is thread pitch, d_2 is pitch diameter, α is thread flank angle (30° for 60° metric threads), μ_th is thread friction, μ_b is underhead bearing friction, and D_b is effective bearing diameter. Because friction coefficients vary widely (μ = 0.08 for lubricated cadmium plating to μ = 0.35 for dry rusty steel), applying identical torque can produce clamping tension variations of over ±30%. For critical aerospace engine casings, engineers employ torque-angle tightening or ultrasonic bolt elongation measurement.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Internal Combustion Engine Dynamometers: Torque vs Horsepower Curves
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In automotive dynamometer testing, an engine dynamometer does not measure horsepower directly; it measures mechanical shaft torque using a water brake or eddy current load cell. Mechanical horsepower is calculated algebraically from measured torque τ and engine rotational speed in revolutions per minute (RPM):
          </p>
          <Formula>{"\\text{Horsepower (hp)} = \\frac{\\tau_{\\text{ft-lb}} \\times \\text{RPM}}{5252} = \\frac{\\tau_{\\text{N}\\cdot\\text{m}} \\times \\text{RPM}}{7121}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because 5,252 is the exact mathematical constant derived from (33,000 ft-lb/min) ÷ (2π rad/rev), any reciprocating engine&apos;s horsepower and foot-pound torque curves intersect at precisely 5,252 RPM. Low-end torque dictates off-the-line vehicle acceleration, while high-RPM horsepower sustains high aerodynamic top speeds.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Bicycle Maintenance, Heavy Machinery & Pipeline Flanges
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In everyday bicycle maintenance, lightweight carbon fiber frames and seatposts require precise low-torque fastening using micrometer torque wrenches (typically 4 to 6 N·m); over-torquing crushes hollow composite fibers, while under-torquing leads to seatpost slippage. In heavy industrial petrochemical pipelines, multi-bolt flange joints require cross-pattern star torquing in incremental steps (30%, 70%, 100%) to compress spiral-wound metallic gaskets uniformly and prevent hazardous chemical leaks.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For academic tracking and statistical analysis, explore our <Link href="/calculators/education/gpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">GPA calculator</Link> and calculate statistical percentages in our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>, or visit the centralized <Link href="/pages/measurements" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Measurements &amp; Conversions hub</Link>.
          </p>
        </>
      }
    >
      <TorqueConverterComponent />
    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Torque-to-Yield (TTY) Fasteners & Plastic Elastic Deformation Limits
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern automotive internal combustion engine assembly (specifically cylinder head bolts and connecting rod cap bolts), traditional torque tightening is replaced by Torque-to-Yield (TTY) fasteners. When tightening a standard elastic bolt, clamping force increases linearly with torque according to Hooke&apos;s law until reaching the material&apos;s proportional elastic yield limit.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            TTY bolts are intentionally tightened past their elastic yield point into the plastic deformation zone. Engine technicians execute a multi-stage procedure: first applying a snug baseline torque (e.g., 40 N·m), followed by one or two precise angular rotations (e.g., +90° plus an additional +90°). In the plastic plateau region, the bolt elongates permanently like a stiff mechanical spring, maintaining consistent clamping force across thermal expansion cycles. Because TTY bolts undergo permanent crystalline lattice elongation, they must be discarded and replaced whenever an engine cylinder head is serviced.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Torsional Shear Stress & Polar Moment of Inertia in Driveshafts
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In mechanical powertrain engineering, transmitting engine torque through a rotating tubular driveshaft generates internal torsional shear stresses τ_shear. According to the torsion formula of circular shafts: τ_shear = (T × r) / J, where T is applied torque in Newton-meters, r is outer shaft radius in meters, and J is the polar moment of inertia of the shaft cross-section.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For a hollow cylindrical driveshaft of outer radius r_o and inner radius r_i, the polar moment of inertia is J = (π / 2) × (r_o⁴ - r_i⁴). Mechanical engineers select high-strength alloy steels or carbon-fiber composites to ensure maximum torsional shear stress remains well below the torsional shear yield strength (τ_yield ≈ 0.577 × σ_yield under the von Mises yield criterion), preventing catastrophic catastrophic driveshaft twisting during launch acceleration.
          </p>

    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            ISO 6789 Calibration & Hand Torque Tool Measurement Uncertainty
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In industrial manufacturing quality assurance and aerospace aircraft maintenance, hand torque tools (click-type torque wrenches, dial-indicating wrenches, and electronic digital torque angle wrenches) are regulated under international standard ISO 6789 (Parts 1 and 2:2017).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under ISO 6789-1, standard mechanical click-type torque wrenches must conform to a maximum permissible deviation of ±4% of the set dial value between 20% and 100% of full-scale range (and ±6% for low-torque wrenches below 10 N·m). Part 2 establishes rigorous laboratory calibration procedures using electronic torque transducers with automated deadweight calibration arms, calculating measurement uncertainty across five sequential loading cycles.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Mechanics are trained to release mechanical spring tension down to zero after use to prevent spring set fatigue, ensuring calibrated accuracy is preserved during critical engine maintenance.
          </p>

    
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In heavy industrial civil construction and crane rigging, high-strength structural bolts (such as ASTM A325 and A490) are tightened using electric or pneumatic hydraulic torque wrenches. Calibrated tension-indicating washers (DTIs) provide visual confirmation that required structural bolt clamping tension has been reached.
          </p>

    
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In motorsport aerodynamics and chassis tuning, suspension anti-roll bar torsional stiffness governs cornering chassis roll gradients. Mechanics adjust anti-roll bar leverage blade angles to dial in neutral handling and optimize front-to-rear mechanical grip balance during competitive circuit racing.
          </p>

    </CalcPage>
  );
}
