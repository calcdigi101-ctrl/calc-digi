import type { Metadata } from "next";
import Link from "next/link";
import OhmsLawCalculatorComponent from "@/components/calcs/electronics/ohms-law-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { OhmsLawVoltageCurrentLinearityChart } from "@/components/flagship/electronics/editorial-charts";

const PATH = "/calculators/electronics/ohms-law-calculator";
const TITLE = "Ohm's Law Calculator | Voltage, Current, Resistance & Power";
const DESCRIPTION =
  "Calculate electrical voltage, current, resistance, and power dissipation using Georg Ohm's fundamental circuit relationship with interactive chart modeling.";

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
  { href: "/calculators/electronics/power-calculator", icon: "🔌", name: "Power Calculator" },
  { href: "/calculators/electronics/voltage-divider-calculator", icon: "🔽", name: "Voltage Divider" },
  { href: "/calculators/electronics/resistor-color-code-calculator", icon: "🎨", name: "Resistor Color Code" },
  { href: "/calculators/electronics/led-resistor-calculator", icon: "💡", name: "LED Resistor" },
  { href: "/calculators/electronics/wire-gauge-calculator", icon: "🔧", name: "Wire Gauge" },
  { href: "/calculators/electronics/battery-life-calculator", icon: "🔋", name: "Battery Life" },
];

const FAQ_ITEMS = [
  {
    q: "What is Ohm's Law and what is its foundational formula?",
    a: "Ohm's Law states that the current flowing through a conductor between two points is directly proportional to the voltage across the two points and inversely proportional to the resistance between them. Mathematically, it is expressed as V = I × R, where V is electrical potential in Volts, I is current in Amperes, and R is resistance in Ohms.",
  },
  {
    q: "How do I calculate electrical power dissipation in an Ohm's Law circuit?",
    a: "Electrical power (measured in Watts) is derived using Joule's Law: P = V × I. By substituting Ohm's Law into this expression, power can also be calculated as P = I² × R or P = V² / R. These alternative formulations allow engineers to calculate heat dissipation when only current or voltage is known alongside resistance.",
  },
  {
    q: "Does Ohm's Law apply to all electronic components and circuits?",
    a: "Ohm's Law strictly governs 'ohmic' conductors where resistance remains constant regardless of applied voltage and temperature (such as standard carbon or metal film resistors). Non-linear, non-ohmic components—such as semiconductor diodes, transistors, gas discharge tubes, and varistors—do not follow a constant V/I ratio and require dynamic load-line analysis.",
  },
  {
    q: "How does temperature change the resistance of metallic conductors?",
    a: "Most conductive metals exhibit a positive temperature coefficient of resistance (PTC). As conductor temperature rises, increased lattice vibrations cause mobile electrons to collide more frequently, increasing electrical resistance according to R(T) = R0[1 + α(T - T0)]. Precision resistors utilize nickel-chromium alloys with near-zero temperature coefficients.",
  },
];

export default function OhmsLawCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/electronics", label: "Electronics & Engineering" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 mb-6 text-sm text-slate-700 dark:border-emerald-950/40 dark:bg-emerald-950/10 dark:text-slate-300">
            <strong>Quick Engineering Guidance:</strong> In direct current (DC) circuits, Ohm&apos;s Law establishes an exact linear dependency between voltage, current, and resistance. To evaluate AC impedance or circuit wattage, cross-reference our <Link href="/calculators/electronics/power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">power calculator</Link> and calculate signal step-down in our <Link href="/calculators/electronics/voltage-divider-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">voltage divider calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Current Conduction Linearity Across Conductor Resistance
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Published in 1827 by German physicist Georg Simon Ohm, Ohm&apos;s Law forms the cornerstone of modern electrical and electronic engineering. The fundamental premise dictates that when a constant temperature is maintained, the electromotive force (voltage) applied across a conductive material produces an electrical current directly proportional to that voltage, with the constant of proportionality being electrical conductance (the inverse of resistance).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In practical printed circuit board (PCB) design and electrical distribution, determining whether a component behaves ohmically is crucial for thermal management. When current passes through any resistive element, mobile charge carriers scatter against crystal lattice ions, transforming potential electrical energy into thermal energy. Calculating this Joule heating prevents component burnout, trace delamination, and fire hazards.
          </p>

          <OhmsLawVoltageCurrentLinearityChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Derivations & The Ohm&apos;s Law Power Wheel
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The fundamental formulation relates electrical potential difference, measured in Volts (V), electric current, measured in Amperes (I), and resistance, measured in Ohms (Ω):
          </p>
          <Formula>{"V = I \times R \quad \iff \quad I = \frac{V}{R} \quad \iff \quad R = \frac{V}{I}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            By integrating Joule&apos;s Law of electrical power (P = V × I, measured in Watts), engineers derive twelve interconnected algebraic permutations often referred to as the Ohm&apos;s Law Wheel:
          </p>
          <Formula>{"P = V \times I = I^2 \times R = \frac{V^2}{R}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When sizing current-limiting components for optoelectronic devices, calculate ballast resistors using our <Link href="/calculators/electronics/led-resistor-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">led resistor calculator</Link> and decode manufacturing color bands with our <Link href="/calculators/electronics/resistor-color-code-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">resistor color code calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Standard Conductor Resistivity & Thermal Characteristics
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Conductor resistance is fundamentally governed by material resistivity (ρ), physical length (L), and cross-sectional area (A) via the relation R = ρ × (L / A). The table below summarizes electrical resistivity and thermal coefficients for standard electronic engineering materials:
          </p>
          <DataTable
            head={["Material Conductor", "Resistivity ρ (Ω·m at 20°C)", "Temp Coeff α (/°C)", "Standard Application"]}
            rows={[
              ["Silver (Ag)", "1.59 × 10⁻⁸", "+0.0038", "High-frequency RF plating & aerospace switches"],
              ["Copper (Annealed)", "1.68 × 10⁻⁸", "+0.00393", "General PCB copper traces, building wiring, motor coils"],
              ["Gold (Au)", "2.44 × 10⁻⁸", "+0.0034", "Corrosion-proof contact pads & wire bonding"],
              ["Aluminum (Al)", "2.82 × 10⁻⁸", "+0.0039", "Overhead high-voltage utility transmission lines"],
              ["Nichrome (NiCr)", "1.10 × 10⁻⁶", "+0.0004", "Heating elements & wire-wound power resistors"],
              ["Constantan (CuNi)", "4.90 × 10⁻⁷", "±0.000008", "Precision laboratory instrumentation shunts"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Example: High-Power Automotive Circuit
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a 12.0 V automotive auxiliary lighting branch circuit powered by a lead-acid battery system. The circuit load consists of two parallel halogen lamps with a combined nominal warm resistance of R = 2.40 Ω. Determine the continuous line current, power dissipation, and evaluate supply cable requirements:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Operating Voltage:</strong> V = 12.0 V DC
            </li>
            <li>
              <strong>Total Load Resistance:</strong> R = 2.40 Ω
            </li>
            <li>
              <strong>Continuous Operating Current:</strong> I = V / R = 12.0 V / 2.40 Ω = 5.00 A
            </li>
            <li>
              <strong>Active Power Dissipation:</strong> P = V × I = 12.0 V × 5.00 A = 60.0 W
            </li>
            <li>
              <strong>Alternative Joule Verification:</strong> P = I² × R = (5.0)² × 2.40 = 25 × 2.40 = 60.0 W
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because a 5.0 Amp current generates 60 Watts of heat, the circuit wiring harness must be sized to prevent excessive voltage drop. Cable sizing and loop resistance should be verified in our <Link href="/calculators/electronics/wire-gauge-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">wire gauge calculator</Link> and battery discharge endurance budgeted via our <Link href="/calculators/electronics/battery-life-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">battery life calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Non-Ohmic Devices & Dynamic Small-Signal Resistance
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            While basic metallic conductors and discrete resistors follow linear Ohm&apos;s Law with high fidelity, semiconductor junctions exhibit non-linear exponential current-voltage curves defined by the Shockley diode equation:
          </p>
          <Formula>{"I_D = I_S \left( e^{\frac{q V_D}{n k T}} - 1 \right)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In silicon p-n diodes, applying 0.3 V produces negligible conduction current (microamperes). Once voltage reaches the forward knee threshold of approximately 0.65 V to 0.70 V, conduction increases exponentially, causing the dynamic small-signal resistance (r_d = dV / dI) to plummet to fractions of an Ohm. Consequently, semiconductor circuits must always incorporate series current-limiting impedances to prevent catastrophic thermal runaway.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Authoritative Electrical Standards & Regulatory Compliance
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Designers and electrical contractors must adhere to rigorous national and international safety codes governing conductor current capacity and thermal dissipation:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>National Electrical Code (NEC NFPA 70):</strong> Mandates conductor ampacity ratings, continuous load derating factors (80% rule), and overcurrent protective device sizing to prevent electrical fires.
            </li>
            <li>
              <strong>International Electrotechnical Commission (IEC 60062 / IEC 60063):</strong> Establishes global preferred resistor value series (E12, E24, E96) and standardized color band markings for electronic components.
            </li>
            <li>
              <strong>Underwriters Laboratories (UL 94):</strong> Tests and certifies flame retardancy ratings (V-0, V-1, V-2) for PCB laminates and resistor encapsulation compounds under extreme thermal overloads.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Practical Electronic Diagnostic & Troubleshooting Methodologies
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When troubleshooting faulty circuit assemblies with a digital multimeter (DMM), systematic application of Ohm&apos;s Law enables rapid isolation of failure modes without de-soldering components:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>In-Circuit Voltage Drop Measurement:</strong> Measure the potential difference directly across suspected resistors. If the measured voltage drop across a current-sense resistor is zero, the circuit is either open upstream or unpowered.
            </li>
            <li>
              <strong>Shorted Component Identification:</strong> A measured resistance reading of zero Ohms across a semiconductor or electrolytic capacitor indicates dielectric breakdown or an internal short circuit.
            </li>
            <li>
              <strong>Cold vs Hot Filament Inrush Current:</strong> Incandescent tungsten filaments exhibit cold resistance that is roughly one-tenth of their steady-state operating resistance. When energized, initial inrush current spikes to 10× nominal, triggering nuisance breaker trips if slow-blow fuses are neglected.
            </li>
          </ol>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For three-phase commercial distribution boards, calculate phase power using our <Link href="/calculators/electronics/three-phase-power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">three phase power calculator</Link> and evaluate inductive winding impedance in our <Link href="/calculators/electronics/inductor-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">inductor calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Thermal Dissipation Derating & Environmental Safety Margins
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A critical engineering mistake in electronics prototyping is operating resistors at their nominal power rating. A standard 0.25 W carbon film resistor dissipating exactly 0.25 W will experience surface temperatures exceeding 120°C, causing localized PCB discoloration and thermal stress on adjacent solder joints.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Aerospace and high-reliability industrial standards (MIL-STD-975) mandate an electrical power derating factor of 50%. A resistor calculated to dissipate 0.20 W of Joule heat should be implemented using at least a 0.50 W or 1.0 W rated component. This practice extends component MTBF (Mean Time Between Failures) by orders of magnitude and guarantees stable circuit operation across wide ambient temperature swings.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Mastering Ohm&apos;s Law establishes the foundation for analyzing complex electrical networks, optimizing energy efficiency, and preventing hazardous over-current conditions across modern embedded hardware and industrial power systems.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            High-Frequency Skin Depth Impedance Transitions & Transmission Losses
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            While DC circuit resistance depends solely on bulk conductor geometry and material resistivity, alternating currents introduce high-frequency eddy current crowding. In high-speed printed circuit board traces and power distribution networks, AC resistance increases proportionally to the square root of frequency due to the electromagnetic skin effect.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            At frequencies above 10 MHz, electric current is constrained to a shallow perimeter sheath beneath the copper surface. High-frequency digital signal lines must be designed with controlled characteristic impedance rather than simple DC resistance. Incorporating skin depth calculations into high-frequency circuit layouts prevents unexpected signal attenuation and thermal dissipation hotspots in modern high-density hardware assemblies.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Regular verification of circuit parameters across varying operating conditions guarantees hardware reliability, extends operational longevity, and safeguards high-performance electronic installations.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Practical Printed Circuit Board Trace Width Sizing (IPC-2152)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When translating theoretical Ohm&apos;s Law calculations into physical PCB layouts, trace resistance is dictated by IPC-2152 design standards. A standard 1-ounce copper foil has a nominal thickness of 35 micrometers (1.37 mils). Running 5 Amperes of DC current through an excessively narrow trace generates rapid Joule heating that elevates board temperature, accelerating dielectric laminate delamination and conductor oxidation.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Applying IPC-2152 design charts allows layout engineers to calculate the precise trace width in millimeters required to constrain temperature rise within an acceptable 10°C to 20°C window. Paralleling outer layers or utilizing heavy 2-ounce copper ensures safe current conduction across high-power motor drivers and automotive electrical controllers.
          </p>


          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Routine electrical auditing with calibrated digital multimeters guarantees circuit compliance, mitigates overcurrent heating risks, and delivers peak efficiency across industrial control systems and consumer electronics hardware.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Electrostatic Energy Storage & Dynamic Charge Redistribution
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In dynamic circuit operations, sudden voltage steps induce displacement currents across capacitive elements, which can be evaluated through our <Link href="/calculators/electronics/capacitor-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">capacitor calculator</Link>. Analyzing transient pulse settling requires integrating resistive dissipation with reactive decay constant modeling available in our <Link href="/calculators/electronics/rc-time-constant-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">rc time constant calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Maintaining strict engineering tolerances across both active and reactive parameters ensures optimal hardware longevity and safeguards industrial electronics from power surges.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Ground Loop Elimination & Precision Instrumentation Shielding
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In sensitive data acquisition and audio instrumentation systems, stray ground return currents flowing through non-zero ground trace resistances create parasitic potential offsets known as ground loops. By applying star grounding topologies and isolating analog signal returns from noisy digital switching domains, hardware engineers eliminate common-impedance coupling and preserve low-noise voltage reference integrity across complex multi-board electronic assemblies.
          </p>

        </>
      }
    >
      <OhmsLawCalculatorComponent />
    </CalcPage>
  );
}
