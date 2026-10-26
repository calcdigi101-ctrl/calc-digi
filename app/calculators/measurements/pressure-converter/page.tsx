import type { Metadata } from "next";
import Link from "next/link";
import PressureConverterComponent from "@/components/calcs/measurements/pressure-converter";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { PressureAtmosphericDepthGradientChart } from "@/components/flagship/measurements/editorial-charts";

const PATH = "/calculators/measurements/pressure-converter";
const TITLE = "Pressure Converter | Pascals, PSI, Bar, Atmospheres & Torr";
const DESCRIPTION =
  "Convert Pascals, pounds per square inch (PSI), bar, standard atmospheres, kilopascals, and millimeters of mercury with hydrostatic depth modeling.";

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
  { href: "/calculators/measurements/temperature-converter", icon: "🌡️", name: "Temperature Converter" },
  { href: "/calculators/measurements/volume-converter", icon: "🧪", name: "Volume Converter" },
  { href: "/calculators/measurements/energy-converter", icon: "⚡", name: "Energy Converter" },
  { href: "/calculators/physics/density-calculator", icon: "🧱", name: "Density Calculator" },
  { href: "/pages/measurements", icon: "⏱️", name: "Measurements Hub" },
];

const FAQ_ITEMS = [
  {
    q: "What is the physical definition of a Pascal (Pa) in the SI system?",
    a: "One Pascal (1 Pa) is the SI coherent derived unit of pressure and mechanical stress, defined as exactly one Newton of perpendicular force applied uniformly across a surface area of one square meter (1 Pa = 1 N/m²). Because 1 Pa is a relatively gentle pressure (~the weight of a single dollar bill resting on a flat surface), engineers routinely work in kilopascals (kPa), megapascals (MPa), or gigapascals (GPa).",
  },
  {
    q: "What is the difference between gauge pressure (psig) and absolute pressure (psia)?",
    a: "Absolute pressure (psia or Pa absolute) is measured relative to a perfect thermodynamic vacuum (zero pressure). Gauge pressure (psig or Pa gauge) is measured relative to local ambient atmospheric pressure: P_absolute = P_gauge + P_ambient. A tire gauge reading 32 psig actually indicates an internal absolute pressure of ~46.7 psia at standard sea level.",
  },
  {
    q: "How many Pascals are in one standard atmosphere (1 atm)?",
    a: "Under the 10th CGPM in 1954, one standard atmosphere (1 atm) is legally fixed at exactly 101,325 Pascals (101.325 kPa, or 1.01325 bar, or ~14.69595 PSI). This represents mean sea-level atmospheric pressure under standard gravity (9.80665 m/s²).",
  },
  {
    q: "Why is pressure frequently reported in millimeters of mercury (mmHg or Torr)?",
    a: "In 1643, Evangelista Torricelli invented the mercury barometer, observing that atmospheric pressure supports a column of liquid mercury approximately 760 mm high at sea level. The unit Torr is defined as exactly 1/760 of a standard atmosphere (~133.322 Pa). It remains standard in clinical blood pressure monitoring (e.g., 120/80 mmHg) and high-vacuum semiconductor processing.",
  },
];

export default function PressureConverterPage() {
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
            <strong>Quick Pressure Guidance:</strong> Pressure measures perpendicular compressive force distributed per unit area. In hydraulic mechanics, chemical reaction kinetics, and aerodynamics, cross-reference applied load in our <Link href="/calculators/physics/force-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">force calculator</Link> and calculate gas temperature interactions in our <Link href="/calculators/measurements/temperature-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">temperature converter</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Foundations of Continuum Mechanics: Hydrostatic & Barometric Pressure
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Pressure represents one of the most critical state variables in continuum mechanics, fluid dynamics, and chemical thermodynamics. Formally defined as the normal compressive force exerted by particles colliding against a unit area of a boundary surface (P = dF_⊥ / dA), pressure governs everything from atmospheric meteorology and cardiovascular hemodynamics to subsea oceanic trenches and rocket engine combustion chambers.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because pressure instrumentation evolved across divergent technical disciplines, a bewildering array of legacy units persists in modern industry. Mechanical engineers in the United States calibrate pneumatic compressors in pounds per square inch (PSI), European process plants monitor chemical reactors in bar, meteorologists report hurricane barometric pressure in hectopascals (hPa) or millibars (mbar), and medical clinicians record arterial blood pressure in millimeters of mercury (mmHg).
          </p>

          <PressureAtmosphericDepthGradientChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Derivation & Fundamental SI Multipliers
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In the International System of Units, the coherent derived unit of pressure is the Pascal (1 Pa = 1 N/m² = 1 kg·m⁻¹·s⁻²). All pressure conversions compute through the Pascal:
          </p>
          <Formula>{"P_{\\text{target}} = P_{\\text{source}} \\times \\left( \\frac{\\sigma_{\\text{source}}}{\\sigma_{\\text{target}}} \\right)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where σ represents the exact equivalency factor in Pascals. Under standard international definitions:
          </p>
          <Formula>{"1 \\text{ bar} = 100,000 \\text{ Pa} = 100 \\text{ kPa}, \\quad 1 \\text{ atm} = 101,325 \\text{ Pa}"}</Formula>
          <Formula>{"1 \\text{ PSI} = \\frac{0.45359237 \\text{ kg} \\times 9.80665 \\text{ m/s}^2}{(0.0254 \\text{ m})^2} \\approx 6894.757293 \\text{ Pa}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In pneumatic and hydraulic cylinders, pressure translates directly into mechanical actuation force; explore load ratings in our <Link href="/calculators/physics/force-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">force calculator</Link> and calculate thermodynamic gas work in our <Link href="/calculators/measurements/energy-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">energy converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comprehensive Reference Table of Global Pressure Equivalencies
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles exact metric conversion constants across scientific, industrial, barometric, and ultra-high-vacuum regimes:
          </p>
          <DataTable
            head={["Pressure Unit", "Symbol", "Value in Pascals (Pa)", "Value in PSI", "Value in Bar"]}
            rows={[
              ["Pascal (SI Coherent)", "Pa", "1.0 Pa", "0.000145038 PSI", "0.00001 bar"],
              ["Hectopascal (Millibar)", "hPa / mbar", "100.0 Pa", "0.0145038 PSI", "0.001 bar"],
              ["Kilopascal", "kPa", "1,000.0 Pa", "0.145038 PSI", "0.01 bar"],
              ["Megapascal", "MPa", "1,000,000.0 Pa", "145.038 PSI", "10.0 bar"],
              ["Bar", "bar", "100,000.0 Pa", "14.503774 PSI", "1.0 bar"],
              ["Pounds per Square Inch", "psi / lbf/in²", "6,894.757 Pa", "1.0 PSI", "0.0689476 bar"],
              ["Standard Atmosphere", "atm", "101,325.0 Pa", "14.695949 PSI", "1.01325 bar"],
              ["Technical Atmosphere", "at / kgf/cm²", "98,066.5 Pa", "14.223343 PSI", "0.980665 bar"],
              ["Millimeters of Mercury (Torr)", "mmHg / Torr", "133.322368 Pa", "0.0193368 PSI", "0.0013332 bar"],
              ["Inches of Water Column", "inH2O (at 4°C)", "249.0889 Pa", "0.0361273 PSI", "0.0024909 bar"],
              ["Inches of Mercury", "inHg (at 0°C)", "3,386.389 Pa", "0.491154 PSI", "0.0338639 bar"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: Deep-Sea Submersible Hull Design
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a marine engineering firm designing a titanium pressure hull for a deep-sea research submersible certified to dive to the bottom of the Puerto Rico Trench at a depth of 8,376 meters in seawater (density ρ = 1,028 kg/m³). Structural hull stress analysis requires computing hydrostatic pressure in megapascals (MPa), bar, and imperial pounds per square inch (PSI):
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Calculate Hydrostatic Pressure via P = ρgh):</strong> P_hydro = 1,028 kg/m³ × 9.80665 m/s² × 8,376 m = 84,438,819 Pascals.</li>
            <li><strong>Step 2 (Add Atmospheric Surface Pressure):</strong> P_total = 84,438,819 Pa + 101,325 Pa = 84,540,144 Pa ≈ 84.54 MPa.</li>
            <li><strong>Step 3 (Convert to Bar):</strong> 84,540,144 Pa ÷ 100,000 Pa/bar = 845.40 bar (nearly 834 times standard atmospheric pressure).</li>
            <li><strong>Step 4 (Convert to PSI):</strong> 84,540,144 Pa ÷ 6,894.757 Pa/PSI = 12,261.51 PSI.</li>
            <li><strong>Step 5 (Cross-Verify Structural Displacement):</strong> Submersible displacement volume can be verified in our <Link href="/calculators/measurements/volume-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">volume converter</Link> and ballast mass confirmed in our <Link href="/calculators/measurements/weight-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">weight converter</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Pascal&apos;s Principle & Hydraulic Actuation Multipliers
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Formulated in 1648 by French polymath Blaise Pascal, Pascal&apos;s principle states that a pressure change applied to an enclosed, incompressible fluid is transmitted undiminished to every portion of the fluid and the container walls. This fundamental law underpins heavy hydraulic machinery, excavator arms, automotive braking systems, and aircraft flight control surface actuators.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because pressure remains constant throughout a static fluid circuit (P₁ = P₂), applying a modest input force F₁ on a small master piston of area A₁ generates an immense output force F₂ on a slave piston of larger area A₂: F₂ = F₁ × (A₂ / A₁). Mechanical engineers design hydraulic systems operating at 210 to 350 bar (3,000 to 5,000 PSI) to deliver hundreds of kilonewtons of clamping force within compact mechanical envelopes.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Barometric Altimetry & Standard Atmospheric Temperature Lapse Rates
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In aviation, aircraft altimeters are sensitive aneroid barometers calibrated to report flight altitude based on the International Standard Atmosphere (ISA) barometric formula: P(h) = P₀ × [1 - (L × h / T₀)]^(gM / RL). At standard sea level, barometric pressure is set to 29.92 inches of mercury (inHg) or 1013.25 hPa.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            As an aircraft ascends through the troposphere, ambient pressure decreases at roughly 1 inch of mercury per 1,000 feet of climb. Airline pilots continuously calibrate their barometric altimeter sub-scale (&apos;Kollsman window&apos;) to local airport QNH settings to maintain true terrain separation during instrument approaches. You can evaluate linear climb distances in our <Link href="/calculators/measurements/length-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">length converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            ASME Boiler & Pressure Vessel Code (BPVC Section VIII) Standards
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In industrial chemical refineries and power generation plants, pressurized storage tanks and steam boilers are regulated under the American Society of Mechanical Engineers (ASME) Boiler and Pressure Vessel Code (BPVC). Under ASME Section VIII, vessel wall thickness t must satisfy the Barlow circumferential hoop stress equation: t = (P × R) / (S × E - 0.6 × P), where P is maximum allowable working pressure (MAWP), R is inside vessel radius, S is maximum allowable material stress in megapascals, and E is weld joint efficiency.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Ensuring precise unit conversions between gauge PSI and bar prevents catastrophic vessel overpressure failures. For academic engineering coursework, students can track performance metrics in our <Link href="/calculators/education/gpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">GPA calculator</Link> and evaluate statistical tolerances in the <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Automotive Tires, Medicine & Diving Physiology
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In everyday consumer life, maintaining proper automotive tire pressure in PSI or bar optimizes fuel economy, prevents hydroplaning, and minimizes tire tread wear. In clinical healthcare, sphygmomanometers measure arterial systolic and diastolic blood pressure in millimeters of mercury (mmHg); a normal reading of 120/80 mmHg corresponds to an absolute gauge pressure of 16.0 / 10.7 kPa.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In recreational scuba diving, divers breathe compressed air delivered via two-stage demand regulators. For every 10 meters (33 feet) of seawater depth, ambient pressure increases by approximately 1 atmosphere (~1 bar / 14.7 PSI), requiring careful ascent timing to prevent nitrogen supersaturation and decompression sickness (&apos;the bends&apos;). For comprehensive unit tools across all physical domains, explore our <Link href="/pages/measurements" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Measurements &amp; Conversions hub</Link>.
          </p>
        </>
      }
    >
      <PressureConverterComponent />
    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Compressible Aerodynamics: Isentropic Stagnation Pressure Ratios
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In high-speed aerodynamics and gas turbine compressor design, air can no longer be modeled as an incompressible fluid. When a high-velocity gas stream traveling at Mach number M is decelerated isentropically to rest at a stagnation point (such as an aircraft pitot tube tip or turbine leading edge), its total pressure P_0 rises above ambient static pressure P according to the compressible isentropic flow relationship: P_0 / P = [1 + (γ - 1) / 2 × M²]^(γ / (γ - 1)), where γ is the specific heat ratio (1.4 for air).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            At supersonic velocities (M &gt; 1), detached bow shockwaves introduce non-isentropic entropy gains, causing total pressure recovery losses across the shock front governed by the Rayleigh pitot tube formula. Aerospace flight test engineers convert pressure transducer readings between kilopascals, bar, and pounds per square inch to calibrate air data computers.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Vacuum Metrology: Mean Free Path & The Knudsen Number (Kn)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In semiconductor physical vapor deposition (PVD) chambers and space simulation vacuum vessels, pressures drop millions of times below atmospheric pressure into the high-vacuum (10⁻³ to 10⁻⁷ Torr) and ultra-high-vacuum (UHV, &lt; 10⁻⁷ Torr / 10⁻⁵ Pa) regimes. At these rarefied states, gas molecules collide more frequently with chamber walls than with one another.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Physicists categorize vacuum flow using the dimensionless Knudsen number Kn = λ / L, where λ is the molecular mean free path and L is chamber characteristic dimension. When Kn &gt; 1, continuum fluid mechanics breaks down into free molecular flow. Mechanical vacuum gauges like Bourdon tubes become completely inoperative, requiring hot-filament ionization gauges and Penning cold-cathode sensors calibrated to convert micro-Ampere ion currents into fractional Torr and micro-Pascals.
          </p>

    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Cardiovascular Hemodynamics & Poiseuille Hagen Pressure Gradients
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In clinical physiology and biofluid mechanics, the flow of blood through the circulatory system is governed by the Hagen-Poiseuille law: ΔP = (8 × μ × L × Q) / (π × r⁴), where ΔP is arterial pressure drop, μ is dynamic fluid viscosity, L is vessel length, Q is cardiac output, and r is arterial radius.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because vascular resistance scales inversely with the fourth power of vessel radius (r⁴), a mere 16% reduction in coronary lumen diameter doubles the required perfusion pressure gradient. Clinical cardiologists convert pressure measurements from millimeters of mercury (mmHg) to kilopascals to evaluate systemic vascular resistance (SVR) and myocardial workload.
          </p>

    </CalcPage>
  );
}
