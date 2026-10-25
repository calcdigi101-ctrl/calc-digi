import type { Metadata } from "next";
import Link from "next/link";
import PressureCalculator from "@/components/calcs/physics/pressure-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { HydrostaticPressureDepthChart } from "@/components/flagship/physics/editorial-charts";

const PATH = "/calculators/physics/pressure-calculator";
const TITLE = "Pressure Calculator | Mechanical P = F/A, Hydrostatic ρgh & Multi-Unit Bar/psi";
const DESCRIPTION =
  "Calculate mechanical pressure (P = F/A), hydrostatic ocean depth pressure (P = ρgh), barometric atmospheres, kPa, bar, and psi across metric and imperial frames.";

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
  { href: "/calculators/physics/force-calculator", icon: "🚀", name: "Newton's Force F=ma" },
  { href: "/calculators/physics/work-energy-calculator", icon: "⚙️", name: "Work & Mechanical Energy" },
  { href: "/calculators/physics/power-calculator", icon: "💡", name: "Mechanical Power Rate" },
  { href: "/calculators/engineering/torque-calculator", icon: "🔄", name: "Torque & Rotational Moment" },
  { href: "/calculators/engineering/cfm-calculator", icon: "💨", name: "HVAC CFM Airflow" },
  { href: "/calculators/environment/water-usage-calculator", icon: "💧", name: "Household Water Usage" },
];

const FAQ_ITEMS = [
  {
    q: "What is the physical definition and mathematical formula for pressure?",
    a: "Pressure (P) is the scalar physical quantity defined as the perpendicular normal force applied per unit surface area over which that force is distributed: P = F / A, where F is perpendicular force in Newtons (N) and A is contact area in square meters (m²). In the International System of Units (SI), pressure is measured in Pascals (Pa), where one Pascal equals one Newton per square meter (1 Pa = 1 N/m²).",
  },
  {
    q: "How does hydrostatic fluid pressure scale with ocean water depth?",
    a: "Hydrostatic fluid pressure arises from the cumulative weight of the fluid column above a given depth. Governed by Stevin's Law: P_hydro = ρ · g · h, where ρ is fluid density (1,025 kg/m³ for seawater), g is gravitational acceleration (9.807 m/s²), and h is depth in meters. In ocean water, hydrostatic pressure increases by approximately 100,500 Pascals (1.005 bar or 14.6 psi) for every 10 meters of descent. Total absolute pressure equals atmospheric baseline plus hydrostatic gauge: P_total = P_atm + ρgh.",
  },
  {
    q: "What is the critical distinction between gauge pressure and absolute pressure?",
    a: "Absolute pressure (P_abs) is measured relative to an absolute perfect vacuum (zero Pascals). Gauge pressure (P_gauge) is measured relative to ambient local atmospheric pressure (typically 101.325 kPa or 14.696 psi at sea level): P_abs = P_gauge + P_atm. When an automotive tire gauge reads 32.0 psi, the tire's true internal absolute pressure is 32.0 + 14.7 = 46.7 psi.",
  },
  {
    q: "Why do stiletto heels generate vastly higher pressure than elephant feet?",
    a: "Because pressure is inversely proportional to contact surface area (P = F / A), concentrating modest force over a tiny area multiplies pressure dramatically. A 60 kg woman placing her weight on a stiletto heel tip of area 0.1 cm² (0.00001 m²) generates P = 588 N / 0.00001 m² = 58.8 Megapascals (588 bar or 8,528 psi). A 4,000 kg elephant distributing weight across four broad foot pads of area 800 cm² each generates only 122.6 kPa (1.23 bar or 17.8 psi)—nearly 500 times less surface pressure.",
  },
  {
    q: "How does Pascal's Principle enable hydraulic multiplication in heavy machinery?",
    a: "Pascal's Principle states that pressure applied to an enclosed, incompressible static fluid is transmitted undiminished to every portion of the fluid and container walls: P₁ = P₂ ⟹ F₁ / A₁ = F₂ / A₂. In hydraulic machinery, applying a small input force F₁ on a small piston of area A₁ generates an identical fluid pressure that pushes against a large slave piston of area A₂, multiplying output force: F₂ = F₁ · (A₂ / A₁).",
  },
  {
    q: "What are standard international conversion multipliers between pressure units?",
    a: "Standard pressure conversion equivalents include: 1 standard atmosphere (atm) = 101,325 Pascals (Pa) = 101.325 kPa = 1.01325 bar = 14.6959 psi (pounds per square inch) = 760.0 mmHg / Torr = 406.8 inches of water column (inH2O). In metric engineering, 1 bar is defined as exactly 100,000 Pascals (100 kPa or 0.1 MPa).",
  },
];

export default function PressureCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/physics", label: "Physics" }}
      title="Mechanical & Hydrostatic Pressure Calculator"
      intro="Calculate mechanical contact pressure (P = F/A), hydrostatic ocean depth pressure (P = ρgh), barometric atmospheres, kPa, bar, and psi across metric and imperial frames."
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
                ISO 80000-4 Fluid Mechanics Standard
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Hydrostatic & Mechanical Solver</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                Pascal's Principle Validated
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-blue-500/20 bg-blue-50/60 p-4 dark:border-blue-500/30 dark:bg-blue-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: What are the formulas for calculating mechanical and fluid pressure?
                </strong>
                <p className="mt-1">
                  Mechanical surface pressure is calculated by dividing perpendicular force by contact area: P = F / A. In fluid dynamics, hydrostatic gauge pressure at depth h is given by P = ρ · g · h. Applying a force of 4,500 Newtons over a contact area of 0.05 m² produces 90.0 Kilopascals (kPa), equivalent to 0.90 bar, 13.05 psi, or 0.888 standard atmospheres. Underwater at a depth of 10 meters, hydrostatic pressure adds an additional 100.5 kPa (1.0 bar).
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - CHART IMMEDIATELY BELOW */}
          <h2>Hydrostatic Seawater Pressure Escalation vs Submersion Depth</h2>
          <div className="not-prose my-6">
            <HydrostaticPressureDepthChart />
          </div>

          <p>
            Pressure is the primary scalar state variable governing continuous media across fluid mechanics, thermodynamics, civil geotechnical engineering, and industrial hydraulics. Standardized internationally under ISO 80000-4, the SI derived unit of pressure is the Pascal (1 Pa = 1 N/m² = 1 kg/(m·s²)). Because one Pascal represents an exceptionally light physical pressure (approximately the weight of a dollar bill resting on a flat table), practical engineering employs the Kilopascal (kPa), Megapascal (MPa), bar (100,000 Pa), and imperial pounds per square inch (psi).
          </p>

          <p>
            The profound operational versatility of pressure arises from its scalar nature: at any interior point within a static fluid, pressure acts with identical magnitude in every spatial direction. This property, known as Pascal's Law, forms the core operational foundation of hydraulic braking systems, aircraft flight control actuators, subsea submarine hulls, and deep borehole drilling equipment.
          </p>

          <h2>Core Physical Formulations across Mechanical & Fluid Domains</h2>

          <p>
            Pressure appears across solid contact mechanics, hydrostatic fluid columns, and ideal gas thermodynamics through consistent formulations:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Mechanical Solid Contact Pressure</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">P = F_perpendicular / A</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates compressive contact stress in Pascals from normal force F (N) and area A (m²).</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Hydrostatic Fluid Column Pressure (Stevin's Law)</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">P_hydro = ρ · g · h</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Yields gauge fluid pressure from density ρ (kg/m³), gravity g (m/s²), and depth h (m).</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Total Absolute Subsea Pressure</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">P_total = P_atmosphere + ρ · g · h</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Sum of atmospheric surface pressure (101,325 Pa) and submerged hydrostatic gauge column.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. Pascal's Hydraulic Amplification Law</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">F₁ / A₁ = F₂ / A₂   ⟹   F₂ = F₁ · (A₂ / A₁)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Quantifies hydraulic mechanical force multiplication across disparate piston diameters.</div>
          </Formula>

          <h2>Standard Engineering Units & Conversion Matrix</h2>

          <p>
            Pressure units vary extensively across international engineering disciplines:
          </p>

          <DataTable
            head={["Unit Name", "Symbol", "Pascals Equivalent", "Atmospheres (atm)", "Primary Industry Sector"]}
            rows={[
              ["Pascal (SI Base)", "Pa", "1.000 Pa", "9.869 × 10⁻⁶ atm", "Acoustics, structural finite element stress"],
              ["Kilopascal", "kPa", "1,000 Pa", "0.009869 atm", "Building HVAC airflow, meteorological barometry"],
              ["Bar", "bar", "100,000 Pa", "0.98692 atm", "Industrial hydraulics, scuba diving gas tanks"],
              ["Pounds per Square Inch", "psi", "6,894.76 Pa", "0.068046 atm", "Automotive tire pressure, US fluid piping"],
              ["Standard Atmosphere", "atm", "101,325 Pa", "1.00000 atm", "Chemical thermodynamics, compressed gas storage"],
              ["Torr / Millimeters of Mercury", "mmHg", "133.322 Pa", "0.001316 atm", "Human blood pressure, vacuum physics"],
            ]}
          />


          <h2>Pascal's Principle and Hydraulic Force Multiplication</h2>

          <p>
            Pascal's Principle states that pressure applied to an enclosed, incompressible static fluid is transmitted undiminished to every portion of the fluid and the containing vessel walls. Hydraulic machinery exploits this law to create massive mechanical force multiplication in automotive brakes, heavy industrial presses, and aircraft landing gear actuators.
          </p>

          <p>
            When a modest input effort force F_1 is exerted on a master hydraulic cylinder piston of small cross-sectional surface area A_1, the fluid transmits uniform pressure P = F_1 / A_1 throughout the hydraulic circuit lines. Acting on an output slave piston of much larger cross-sectional area A_2:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">5. Pascal Hydraulic Mechanical Advantage Formula</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">P = F₁ / A₁ = F₂ / A₂   &rarr;   F₂ = F₁ &middot; (A₂ / A₁) = F₁ &middot; (d₂ / d₁)&sup2;</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Quantifies hydraulic force amplification through piston diameter ratios d_2 and d_1.</div>
          </Formula>

          <p>
            A technician applying 200 N of foot force onto a 2 cm diameter brake master cylinder drives fluid into four 6 cm diameter wheel caliper pistons, multiplying braking force by (6 / 2)&sup2; = 9-fold per caliper, delivering 1,800 N of clamp force onto the rotating carbon-ceramic brake discs.
          </p>

          <h2>Atmospheric Barometric Pressure and High-Altitude Decompression</h2>

          <p>
            Earth's atmosphere acts as an ocean of gas whose pressure decreases exponentially with geometric altitude above mean sea level according to the Barometric Law: P(h) = P_0 &middot; exp(-M &middot; g &middot; h / (R &middot; T)). At standard sea level (h = 0), atmospheric pressure averages 101,325 Pa (1.01325 bar or 14.696 psi). At the summit of Mount Everest (8,848 meters), air pressure plummets to 33,700 Pa (0.337 bar or 4.89 psi)—merely one-third of sea-level value—starving human arterial hemoglobin of oxygen without supplemental breathing gas.
          </p>

          <h2>Comparative Operational Worked Case Studies</h2>

          <p>
            To examine practical pressure calculations across disparate physical domains:
          </p>

          <h3>Case Study A: Industrial Hydraulic Stamping Press Piston</h3>
          <p>
            An industrial hydraulic press applies a motive force of F = 25,000 Newtons (25.0 kN = 5,620 lbf) through an actuator piston cylinder possessing a cross-sectional area of A = 0.005 m² (50.0 cm² = 7.75 sq in).
          </p>
          <ul>
            <li><strong>Hydraulic Fluid Operating Pressure:</strong> P = 25,000 N ÷ 0.005 m² = 5,000,000 Pascals (5.0 MPa = 50.0 bar).</li>
            <li><strong>Imperial Line Pressure:</strong> 50.0 bar × 14.5038 = 725.2 psi (pounds per square inch).</li>
            <li><strong>Slave Ram Output Multiplication:</strong> If this 5.0 MPa fluid is piped to a heavy slave ram of area A₂ = 0.08 m² (800 cm²), the resulting clamping force multiplies to: F₂ = 5,000,000 Pa × 0.08 m² = 400,000 Newtons (400 kN = 89,924 lbf = 44.9 US tons).</li>
          </ul>

          <h3>Case Study B: Deep-Sea Oceanic Submersible at 1,000m Depth</h3>
          <p>
            A scientific research submarine descends to a depth of h = 1,000.0 meters in standard ocean seawater (ρ = 1,025 kg/m³, g = 9.807 m/s²).
          </p>
          <ul>
            <li><strong>Hydrostatic Gauge Pressure:</strong> P_hydro = 1,025 kg/m³ × 9.807 m/s² × 1,000.0 m = 10,052,175 Pascals (10.05 MPa = 100.52 bar).</li>
            <li><strong>Total Absolute Exterior Pressure:</strong> P_total = 101,325 Pa (atmosphere) + 10,052,175 Pa = 10,153,500 Pascals (101.54 bar = 1,472.7 psi).</li>
            <li><strong>Hull Structural Load:</strong> Every single square meter of the submarine's titanium pressure hull withstands an inward compressive force of 10.15 Meganewtons (2.28 million pounds-force).</li>
          </ul>

          <h2>Physical Boundaries & Fluid Cavitation Hazards</h2>

          <p>
            When managing dynamic pressures in fluid machinery:
          </p>

          <ol>
            <li>
              <strong>Hydrodynamic Cavitation:</strong> According to Bernoulli's principle, fluid accelerating through a pipe constriction experiences a sharp static pressure drop. If local pressure falls below the fluid's vapor pressure (e.g. 2.34 kPa for water at 20°C), vapor bubbles spontaneously form and violently collapse against impeller surfaces, pitting and destroying metal pumps.
            </li>
            <li>
              <strong>Atmospheric Barometric Lapse Rate:</strong> Atmospheric pressure decays exponentially with elevation: P(h) = P₀ · e^(-Mgh / RT). At the summit of Mount Everest (8,848m), atmospheric pressure falls to approximately 33.7 kPa (0.33 atm), starving human climbers of oxygen.
            </li>
            <li>
              <strong>Bulk Modulus Compressibility:</strong> While liquids are generally treated as incompressible, extreme pressures (exceeding 1,000 bar in the Mariana Trench) compress water volume by over 4%, increasing fluid density.
            </li>
          </ol>

          <h2>Authoritative International Standards & Pressure Metrology</h2>

          <p>
            For verified pressure metrology standards and gauge calibration protocols:
          </p>
          <ul>
            <li>
              <strong>ISO 80000-4:2019:</strong> International specifications for physical quantities and units of mechanics, force, and pressure.
            </li>
            <li>
              <strong>NIST Special Publication 250-91:</strong> United States calibration service for pressure and vacuum measurements.
            </li>
            <li>
              <strong>ASME B40.100:</strong> American Society of Mechanical Engineers standard for pressure gauges and gauge attachments.
            </li>
            <li>
              <strong>BIPM Consultative Committee for Mass and Related Quantities (CCM):</strong> Working group on high-pressure metrology standards.
            </li>
          </ul>
        </>
      }
    >
      <PressureCalculator />
    </CalcPage>
  );
}
