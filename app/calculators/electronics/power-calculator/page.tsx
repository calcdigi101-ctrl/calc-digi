import type { Metadata } from "next";
import Link from "next/link";
import PowerCalculatorComponent from "@/components/calcs/electronics/power-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { PowerFactorActiveReactiveTriangleChart } from "@/components/flagship/electronics/editorial-charts";

const PATH = "/calculators/electronics/power-calculator";
const TITLE = "Electric Power Calculator | Real Watts, Apparent VA & Power Factor";
const DESCRIPTION =
  "Calculate active electrical power (Watts), apparent power (VA), reactive power (VAR), and power factor across single-phase AC and DC circuits.";

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
  { href: "/calculators/electronics/ohms-law-calculator", icon: "⚡", name: "Ohm's Law" },
  { href: "/calculators/electronics/three-phase-power-calculator", icon: "⚡", name: "Three-Phase Power" },
  { href: "/calculators/electronics/wire-gauge-calculator", icon: "🔧", name: "Wire Gauge" },
  { href: "/calculators/electronics/battery-life-calculator", icon: "🔋", name: "Battery Life" },
  { href: "/calculators/electronics/transformer-calculator", icon: "🔄", name: "Transformer" },
  { href: "/calculators/electronics/solar-panel-calculator", icon: "☀️", name: "Solar Panel" },
];

const FAQ_ITEMS = [
  {
    q: "What is the difference between Real Power (Watts) and Apparent Power (VA)?",
    a: "Real Power (measured in Watts, W) represents the actual rate at which electrical energy is converted into physical mechanical work, heat, or light. Apparent Power (measured in Volt-Amperes, VA) is the simple product of RMS voltage and RMS current (S = V × I). In AC circuits with inductive or capacitive reactive loads, Apparent Power exceeds Real Power by the power factor ratio.",
  },
  {
    q: "What is Power Factor (PF) and why is a low power factor penalized by utilities?",
    a: "Power Factor is the dimensionless ratio of real working power to apparent power: PF = P / S = cos(θ). Inductive loads (such as AC motors, air conditioner compressors, and transformers) draw reactive current that magnetizes stator cores without doing real work. This reactive current circulates back and forth, heating transmission lines and causing voltage drop, prompting utilities to levy heavy financial penalties for PF below 0.90.",
  },
  {
    q: "How does Reactive Power (VAR) relate to the AC Power Triangle?",
    a: "The AC Power Triangle is governed by the Pythagorean theorem: S² = P² + Q², where S is Apparent Power (VA), P is Real Active Power (Watts), and Q is Reactive Power (Volt-Amperes Reactive, VAR). Inductive loads generate lagging reactive power, while capacitive banks generate leading reactive power, allowing industrial plants to cancel out motor VARs.",
  },
  {
    q: "How do you calculate daily and monthly electrical kilowatt-hour (kWh) consumption?",
    a: "Electrical energy consumption is computed by multiplying active power in kilowatts by operating hours: kWh = (Watts × Hours) / 1,000. For example, a 1,500 Watt space heater operating for 8 hours daily consumes (1,500 × 8) / 1,000 = 12.0 kWh per day, or 360 kWh per 30-day billing cycle.",
  },
];

export default function PowerCalculatorPage() {
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
            <strong>Quick Engineering Guidance:</strong> In alternating current (AC) systems, calculating true electrical power requires accounting for the phase displacement between voltage and current waveforms. To evaluate industrial 3-phase machinery, consult our <Link href="/calculators/electronics/three-phase-power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">three phase power calculator</Link> and calculate circuit breaker cable drop in our <Link href="/calculators/electronics/wire-gauge-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">wire gauge calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Power Factor Degradation & The AC Power Triangle
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Electrical power engineering bridges fundamental physics and practical utility grid management. In pure direct current (DC) circuits, power calculation is straightforward: potential difference multiplied by current gives instantaneous and average power (P = V × I). However, in alternating current (AC) circuits, inductive and capacitive reactive elements introduce a phase angle shift (θ) between the oscillating sinusoidal voltage and current waveforms.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When current lags voltage (inductive load) or leads voltage (capacitive load), a portion of the circulating electrical energy is temporarily stored in magnetic or electrostatic fields and reflected back to the source twice per AC cycle. This non-working energy constitutes Reactive Power (measured in VAR), which must be accommodated by transformers and conductors even though it performs no useful mechanical work.
          </p>

          <PowerFactorActiveReactiveTriangleChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Equations of Electrical Power
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In AC single-phase analysis, the relationship between Apparent Power (S), Real Active Power (P), and Reactive Power (Q) is defined by the complex power vector S = P + jQ:
          </p>
          <Formula>{"S (VA) = V_{rms} \times I_{rms}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Active Real Power (P, in Watts) represents productive work and is governed by the power factor cosine term:
          </p>
          <Formula>{"P (W) = S \times \cos(\theta) = V_{rms} \times I_{rms} \times PF"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Reactive Power (Q, in VAR) satisfies the right-triangle relationship:
          </p>
          <Formula>{"Q (VAR) = \sqrt{S^2 - P^2} = V_{rms} \times I_{rms} \times \sin(\theta)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For DC circuits and pure resistive heating loads, compute parameters in our <Link href="/calculators/electronics/ohms-law-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ohms law calculator</Link> and calculate transformer winding transfer in our <Link href="/calculators/electronics/transformer-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">transformer calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Typical Electrical Appliances: Power Ratings & Power Factors
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Residential and commercial electrical equipment exhibit widely varying power factors depending on whether loads are purely resistive, switch-mode power supplies (SMPS), or induction motors:
          </p>
          <DataTable
            head={["Equipment Load Type", "Nominal Real Watts", "Typical Power Factor", "Apparent Load (VA)", "Primary Load Characteristic"]}
            rows={[
              ["Incandescent / Halogen Bulb", "60 W - 500 W", "1.00 (Unity)", "60 - 500 VA", "Purely resistive tungsten filament"],
              ["Electric Water Heater / Stove", "3,500 W - 5,000 W", "1.00 (Unity)", "3,500 - 5,000 VA", "Purely resistive heating element"],
              ["Workshop Induction Motor (1 HP)", "746 W", "0.75 - 0.85", "880 - 1,000 VA", "Heavy inductive stator coil winding"],
              ["Central Air Conditioner (3 Ton)", "3,500 W", "0.82 - 0.88", "4,000 - 4,250 VA", "Compressor motor + condenser fan"],
              ["Desktop PC / Gaming Workstation", "450 W - 850 W", "0.95 - 0.99", "475 - 895 VA", "Active PFC switch-mode power supply"],
              ["Fluorescent Tube (Magnetic Ballast)", "40 W", "0.50 - 0.60", "67 - 80 VA", "Uncorrected inductive ballast choke"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Industrial Example: Power Factor Correction Sizing
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A manufacturing facility operates a 240 V single-phase induction motor drawing I = 40.0 A with a measured lagging power factor of PF_1 = 0.72. The facility engineer wishes to correct the power factor to PF_2 = 0.95 to avoid utility surcharges:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Initial Apparent Power (S_1):</strong> S_1 = V × I = 240 V × 40.0 A = 9,600 VA = 9.60 kVA
            </li>
            <li>
              <strong>Real Active Power (P):</strong> P = S_1 × PF_1 = 9.60 kVA × 0.72 = 6.912 kW
            </li>
            <li>
              <strong>Initial Reactive Power (Q_1):</strong>
              <br />
              θ_1 = arccos(0.72) = 43.95^° → Q_1 = P × tan(43.95^°) = 6.912 × 0.964 = 6.663 kVAR
            </li>
            <li>
              <strong>Target Reactive Power at PF 0.95 (Q_2):</strong>
              <br />
              θ_2 = arccos(0.95) = 18.19^° → Q_2 = P × tan(18.19^°) = 6.912 × 0.329 = 2.274 kVAR
            </li>
            <li>
              <strong>Required Shunt Capacitor Bank Rating (Q_C):</strong>
              <br />
              Q_C = Q_1 - Q_2 = 6.663 kVAR - 2.274 kVAR = 4.389 kVAR
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Installing a 4.39 kVAR capacitor bank reduces line current from 40.0 A down to 30.3 A, slashing cable heating and utility penalties. For large industrial motors, calculate reactive parameters in our <Link href="/calculators/electronics/three-phase-power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">three phase power calculator</Link> and calculate capacitor values in our <Link href="/calculators/electronics/capacitor-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">capacitor calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Harmonic Distortion & Non-Linear Electronic Loads
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Modern commercial buildings feature dense deployments of non-linear loads, including variable frequency drives (VFDs), server computing clusters, and LED lighting drivers. These devices draw current in brief high-amplitude pulses rather than smooth continuous sinusoids.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            This non-sinusoidal conduction generates harmonic distortion, introducing high-frequency current multiples (3rd, 5th, 7th, 9th harmonics). In such systems, Total Power Factor (PF_total) is the product of Displacement Power Factor (PF_disp) and Distortion Power Factor (PF_dist = 1 / √(1 + THD²)). Triplen harmonics accumulate on neutral conductors, necessitating oversized neutral feeder sizing under NEC Article 310.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Regulatory Standards & Utility Tariff Structures
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            National regulatory commissions and engineering standards bodies mandate strict efficiency guidelines to prevent grid destabilization:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>IEEE Standard 519:</strong> Recommended practice and requirements for harmonic control in electric power systems, limiting total harmonic current distortion at the point of common coupling (PCC).
            </li>
            <li>
              <strong>EN 61000-3-2:</strong> European electromagnetic compatibility (EMC) directive requiring active Power Factor Correction (PFC) circuitry in all mains-powered electronic equipment dissipating over 75 Watts.
            </li>
            <li>
              <strong>Commercial Utility kVA Demand Billing:</strong> Electric utility tariffs levy penalties when commercial customer power factor drops below 0.90 or 0.95, billing customers based on peak kVA apparent demand rather than real kWh usage.
            </li>
          </ul>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When sizing off-grid renewable energy installations, model inverter outputs via our <Link href="/calculators/electronics/solar-panel-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">solar panel calculator</Link> and calculate battery bank storage in our <Link href="/calculators/electronics/battery-life-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">battery life calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Understanding the distinction between real, apparent, and reactive electrical power empowers engineers to design thermally efficient distribution panels, eliminate utility penalty charges, and protect high-value industrial equipment from power degradation.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Reactive Power Flow in Transmission Grids & Voltage Stability Collapse
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Across high-voltage electrical utility transmission networks, managing reactive power (VAR) is the governing determinant of grid voltage stability. High-voltage transmission lines possess significant series inductive reactance (X_L) and shunt line-charging capacitive admittance (B_C). When transmission corridors transport heavy real power alongside uncorrected lagging inductive current, voltage drop along the line escalates non-linearly.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            If inductive loads draw excess reactive power faster than utility generators or substation shunt capacitor banks can supply it, a catastrophic phenomenon termed &lsquo;voltage collapse&rsquo; can occur. The receiving-end bus voltage degrades, forcing induction motors to draw even greater current to maintain shaft power, precipitating widespread regional blackouts. Modern utilities deploy Static VAR Compensators (SVCs) and Static Synchronous Compensators (STATCOMs) to dynamically inject leading or lagging reactive power within milliseconds, stabilizing grid voltage profiles under fluctuating industrial demands.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Careful balancing of active and reactive power components guarantees pristine electrical efficiency, eliminates utility tariff penalties, and prevents unexpected electrical outages across commercial facilities.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Harmonic Filter Topologies: Active vs Passive Shunt Traps
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In industrial facilities populated by variable speed drives, arc furnaces, and heavy rectifiers, excessive harmonic distortion cannot be corrected with simple capacitor banks alone. Connecting pure capacitors into a harmonically contaminated network risks triggering parallel resonance, magnifying 5th and 7th harmonic voltages destructively.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Industrial power engineers deploy <strong>De-Tuned Iron-Core Reactors</strong> in series with power factor correction capacitors, shifting the resonance frequency below the lowest dominant harmonic (typically to 189 Hz). For severe harmonic pollution, <strong>Active Harmonic Filters (AHFs)</strong> inject anti-phase compensation currents in real time, neutralizing harmonics up to the 50th order and restoring pure sinusoidal waveforms across commercial power grids.
          </p>


          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Implementing continuous power quality monitoring safeguards expensive industrial machinery against phase distortion, optimizes electrical facility capacity, and reduces utility electricity tariffs across modern commercial enterprises.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Harmonic Distortion & Polyphase Grid Power Distribution
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In commercial electrical infrastructure, non-linear rectifiers and variable-frequency motor drives generate harmonic currents that elevate neutral line temperatures. Sizing multi-phase feeder lines requires polyphase analysis available in our <Link href="/calculators/electronics/three-phase-power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">three phase power calculator</Link> and measuring attenuation ratios in our <Link href="/calculators/electronics/decibel-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">decibel calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Total Harmonic Distortion (THD) reduces effective power factor even in circuits with zero phase displacement between voltage and fundamental current. Installing active harmonic filters cancels harmonic frequencies up to the 50th order, preventing transformer overheating and ensuring compliance with IEEE 519 grid interconnect standards.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Comprehensive power profiling enables electrical engineers to eliminate utility power factor penalties, optimize wiring efficiency, and maintain resilient electrical distribution.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Dynamic Reactive Compensation & Flexible AC Transmission Systems (FACTS)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Modern electrical utility transmission operators deploy Flexible AC Transmission Systems (FACTS) to dynamically manage active and reactive power flows along high-voltage grid corridors without constructing new physical transmission lines. Utilizing high-speed insulated-gate bipolar transistor (IGBT) power converters, Static Synchronous Compensators (STATCOMs) inject or absorb continuously variable reactive power within sub-cycle response times.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            By regulating voltage profiles at key regional interconnection substations, FACTS devices prevent catastrophic voltage collapse during sudden generator trips or severe lightning strikes on utility towers. Integrating real-time synchrophasor measurement units (PMUs) provides grid dispatchers with wide-area angular stability monitoring, maximizing power transfer capability while maintaining strict N-1 reliability margins across nationwide interconnected electrical networks.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Implementing automated power monitoring at facility main switchboards eliminates nuisance circuit breaker tripping and optimizes total apparent and active energy utilization.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Routine electrical auditing guarantees balanced polyphase load distribution, preventing localized feeder overheating and extending the operational longevity of critical switchgear assets.
          </p>

        </>
      }
    >
      <PowerCalculatorComponent />
    </CalcPage>
  );
}
