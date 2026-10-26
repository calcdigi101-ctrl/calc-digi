import type { Metadata } from "next";
import Link from "next/link";
import ThreePhasePowerCalculatorComponent from "@/components/calcs/electronics/three-phase-power-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ThreePhaseBalancedLoadPowerChart } from "@/components/flagship/electronics/editorial-charts";

const PATH = "/calculators/electronics/three-phase-power-calculator";
const TITLE = "Three-Phase Power Calculator | Real (kW), Apparent (kVA) & Reactive (kVAR)";
const DESCRIPTION =
  "Calculate balanced three-phase AC active power (kW), apparent power (kVA), reactive power (kVAR), and phase currents across Wye (Star) and Delta circuits.";

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
  { href: "/calculators/electronics/wire-gauge-calculator", icon: "🔧", name: "Wire Gauge" },
  { href: "/calculators/electronics/transformer-calculator", icon: "🔄", name: "Transformer" },
  { href: "/calculators/electronics/ohms-law-calculator", icon: "⚡", name: "Ohm's Law" },
  { href: "/calculators/electronics/capacitor-calculator", icon: "⚙️", name: "Capacitor Reactance" },
  { href: "/calculators/electronics/inductor-calculator", icon: "🔁", name: "Inductor Reactance" },
];

const FAQ_ITEMS = [
  {
    q: "Why is the square root of 3 (√3 ≈ 1.732) used in three-phase power formulas?",
    a: "In balanced three-phase systems, three sinusoidal voltages are displaced by 120 electrical degrees. In a Wye (Star) configuration, line-to-line voltage is the vector difference between two phase voltages: VL-L = 2 × Vph × sin(60°) = √3 × Vph (approx 1.732 × Vph). Calculating total three-phase power across all three phases yields P = 3 × Vph × Iph = 3 × (VL-L / √3) × IL = √3 × VL-L × IL × PF.",
  },
  {
    q: "What is the difference between Star (Wye) and Delta three-phase wiring?",
    a: "In a Star (Wye) configuration, all three phase windings meet at a central common neutral point. Line voltage equals √3 times phase voltage (VL-L = √3 × Vph), while line current equals phase current (IL = Iph). In a Delta configuration, windings connect in a closed loop with no neutral point; line voltage equals phase voltage (VL-L = Vph), while line current equals √3 times phase current (IL = √3 × Iph).",
  },
  {
    q: "Why is three-phase power superior to single-phase for industrial electric motors?",
    a: "Three-phase power delivers constant, non-pulsating instantaneous power to electric motors, whereas single-phase power pulses at twice the AC frequency. Furthermore, the 120-degree spatial and electrical phase displacement naturally produces a rotating magnetic field inside the stator, allowing industrial induction motors to be self-starting without requiring auxiliary starting capacitors or centrifugal switches.",
  },
  {
    q: "How do you calculate Apparent Power (kVA) and Reactive Power (kVAR) in 3-phase circuits?",
    a: "Three-phase Apparent Power is computed as S (kVA) = (√3 × VL-L × IL) / 1,000. Real Active Power is P (kW) = S × PF. Reactive Power is derived via the Pythagorean power triangle: Q (kVAR) = √(S² - P²). Managing reactive power ensures compliance with electric utility power factor thresholds.",
  },
];

export default function ThreePhasePowerCalculatorPage() {
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
            <strong>Quick Engineering Guidance:</strong> Three-phase power delivers constant instantaneous torque to industrial motors and maximizes conductor transmission efficiency by √3 (173%). To evaluate single-phase circuits, cross-reference our <Link href="/calculators/electronics/power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">power calculator</Link> and calculate substation stepping in our <Link href="/calculators/electronics/transformer-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">transformer calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Three-Phase vs Single-Phase Power Conduction Capacity (kW)
          </h2>
          <ThreePhaseBalancedLoadPowerChart />
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Conceived by Nikola Tesla and Mikhail Dolivo-Dobrovolsky in the late 1880s, polyphase alternating current systems revolutionized industrial manufacturing. A balanced three-phase system comprises three distinct alternating voltage waveforms of identical frequency and peak amplitude, but separated in time by a mutual phase displacement of 120 electrical degrees (2π / 3 radians).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            This geometric symmetry provides profound engineering advantages over single-phase distribution. First, the mathematical sum of instantaneous currents in a balanced three-phase system is identically zero (I_A + I_B + I_C = 0), allowing power transmission over three wires without requiring a return neutral conductor. Second, three-phase motors deliver constant, smooth instantaneous mechanical torque without the severe 120 Hz vibrational pulsating torque characteristic of single-phase machines.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Equations for Three-Phase Power
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In any balanced three-phase electrical circuit, total Apparent Power (S, in kVA) is derived using line-to-line RMS voltage (V_L-L, in Volts) and line current (I_L, in Amperes):
          </p>
          <Formula>{"S (kVA) = \frac{\sqrt{3} \times V_{L-L} \times I_L}{1,000} \approx \frac{1.73205 \times V_{L-L} \times I_L}{1,000}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Active Real Power (P, in kW) and Reactive Power (Q, in kVAR) are governed by the operating power factor (PF = cos θ):
          </p>
          <Formula>{"P (kW) = S \times PF = \frac{\sqrt{3} \times V_{L-L} \times I_L \times PF}{1,000}"}</Formula>
          <Formula>{"Q (kVAR) = \sqrt{S^2 - P^2} = S \times \sin(\theta)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To size industrial branch circuit feeders and check conductor voltage drop, cross-reference our <Link href="/calculators/electronics/wire-gauge-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">wire gauge calculator</Link> and calculate circuit resistance in our <Link href="/calculators/electronics/ohms-law-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ohms law calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Global Three-Phase Industrial Voltage Configurations
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Industrial power distribution configurations differ significantly across continents and facility types:
          </p>
          <DataTable
            head={["Distribution Standard", "Line-to-Line Voltage (VL-L)", "Line-to-Neutral Voltage (Vph)", "Wiring Topology", "Typical Facility Application"]}
            rows={[
              ["US Light Commercial / Multi-Tenant", "208 V AC", "120 V AC", "4-Wire Wye (Star)", "Commercial offices, retail stores, small machine shops"],
              ["US Heavy Industrial / Manufacturing", "480 V AC", "277 V AC", "4-Wire Wye (Star)", "Heavy industrial manufacturing, water treatment plants"],
              ["European Standard (CENELEC)", "400 V AC", "230 V AC", "4-Wire Wye (Star)", "Standard continental European commercial & residential"],
              ["US Legacy Ungrounded Delta", "240 V AC", "No Neutral (or Wild-Leg 208V)", "3-Wire or 4-Wire Delta", "Older sawmill machinery, agricultural irrigation pumps"],
              ["Medium-Voltage Industrial Feeder", "4,160 V AC", "2,400 V AC", "3-Wire Wye", "Centrifugal chillers, heavy mine hoists, refinery pumps"],
              ["Heavy Industrial Substation", "13,800 V (13.8 kV)", "7,967 V AC", "3-Wire Wye", "Primary plant distribution, steel rolling mills"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: 480V 75 HP Industrial Induction Motor
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A mechanical facilities engineer connects a 75 Horsepower (HP) three-phase induction motor driving an industrial ventilation blower to a 480 V balanced electrical bus. The motor nameplate specifies continuous full-load line current I_L = 88.0 A and a lagging power factor of PF = 0.86:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Line-to-Line Voltage:</strong> V_L-L = 480 V AC
            </li>
            <li>
              <strong>Total Apparent Power (S):</strong>
              <br />
              S = (√3 × 480 V × 88.0 A) / 1,000 = (1.73205 × 480 × 88.0 / 1,000) = (73,161.8 / 1,000) = 73.16 kVA
            </li>
            <li>
              <strong>Active Real Power Input (P):</strong>
              <br />
              P = S × PF = 73.16 kVA × 0.86 = 62.92 kW
            </li>
            <li>
              <strong>Reactive Power (Q):</strong>
              <br />
              Q = √(73.16² - 62.92²) = √(5,352.38 - 3,958.93) = √(1,393.45) = 37.33 kVAR
            </li>
            <li>
              <strong>Mechanical Output Verification:</strong>
              <br />
              75 HP × 0.7457 kW/HP = 55.93 kW of shaft mechanical power.
              <br />
              Motor Operating Efficiency η = 55.93 kW / 62.92 kW = 88.9%.
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The motor draws 62.92 kW of active work and 37.33 kVAR of magnetizing reactive current. Reactive power can be cancelled using capacitor banks sized in our <Link href="/calculators/electronics/capacitor-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">capacitor calculator</Link> and inductive chokes in our <Link href="/calculators/electronics/inductor-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">inductor calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Phase Unbalance & Negative Sequence Heating in Motors
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In real-world commercial buildings, single-phase lighting and computer loads are rarely distributed with perfect symmetry across the three phases. Voltage unbalance occurs when phase voltages differ, computed according to NEMA MG-1 standards:
          </p>
          <Formula>{"Voltage Unbalance (\%) = \frac{Maximum Deviation from Average Voltage}{Average Line Voltage} \times 100"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Even a seemingly minor 3% voltage unbalance induces massive negative-sequence magnetic fields that rotate in reverse against motor direction. This negative-sequence flux induces large eddy currents in the rotor, resulting in a 20% to 30% temperature spike that can destroy motor winding insulation. Modern electronic motor protection relays continuously monitor current phase balance to trip breakers before thermal damage occurs.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Authoritative Standards & Utility Metering Compliance
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Three-phase power delivery and metering are governed by international regulatory standards:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>NFPA 70 (NEC Article 430 & 450):</strong> Standardizes motor branch circuit conductor sizing, thermal overload protection, and three-phase transformer disconnect switches.
            </li>
            <li>
              <strong>NEMA MG 1:</strong> Motors and Generators performance standard defining voltage unbalance derating factors and full-load motor service factors.
            </li>
            <li>
              <strong>IEC 60034-1:</strong> International rating and performance specifications for rotating electrical machines operated across 50 Hz and 60 Hz grids.
            </li>
          </ul>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For utility step-down substation analysis, model turns ratios in our <Link href="/calculators/electronics/transformer-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">transformer calculator</Link> and calculate single-phase loads in our <Link href="/calculators/electronics/power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">power calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Mastering three-phase power calculations enables electrical engineers to balance industrial panel loads, size distribution conductors accurately, and maximize the operational efficiency of heavy manufacturing machinery.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            High-Leg (Wild-Leg) Delta Systems: Safety Hazard Analysis
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In older North American light industrial and commercial machine shops, utilities frequently provide a 240V Three-Phase 4-Wire &lsquo;High-Leg Delta&rsquo; service (also known as a &lsquo;Wild-Leg&rsquo; or &lsquo;Red-Leg&rsquo; system). One winding of the 240V delta transformer bank is center-tapped to establish a neutral conductor for 120V convenience lighting circuits.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            While Phase A and Phase C each measure 120 V to neutral (240 V / 2 = 120 V), the geometry of the delta triangle forces Phase B (the high-leg) to measure an anomalous √(3) × 120 V = 208 V to neutral. If an electrician mistakenly lands a standard 120V single-phase computer or lighting circuit on the Phase B high-leg bus, the 208V over-voltage destroys connected equipment immediately. NEC Article 110.15 mandates that the high-leg conductor must be permanently tagged with high-visibility orange insulation to prevent catastrophic wiring accidents.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Mastering three-phase power calculations enables electrical engineers to balance industrial panel loads, size distribution conductors accurately, and maximize the operational efficiency of heavy manufacturing machinery.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Phase Sequence (Rotation) & Industrial Motor Directionality
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In three-phase power distribution, the time order in which the three phase voltages reach their respective positive peaks is termed the <strong>Phase Sequence</strong> or Phase Rotation (typically designated A-B-C or clockwise rotation). Phase sequence directly determines the physical rotational direction of the rotating magnetic field established inside three-phase induction and synchronous electric motors.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            If utility technicians reverse any two supply phase conductors (e.g., swapping Phase A and Phase B during substation maintenance), connected three-phase motors immediately rotate in reverse. In industrial manufacturing plants, reverse rotation can cause catastrophic mechanical damage to centrifugal pumps, industrial chillers, and machine tool spindles. Facilities install electronic phase-sequence monitoring relays that prevent motor contactors from pulling in if reversed phase rotation or single-phasing is detected.
          </p>


          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Maintaining balanced phase loadings across electrical switchgear prevents neutral bus overheating, minimizes transformer eddy current losses, and eliminates negative-sequence mechanical vibrations inside heavy manufacturing equipment.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Continuous three-phase power telemetry empowers plant electrical engineers to optimize facility power factors and maintain high-efficiency operational reliability.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Industrial Substation Transformers & Polyphase Power Factor Correction
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In industrial facilities operating large three-phase induction motors, high reactive power lowers facility power factor. Engineers model step-down transformer impedance using our <Link href="/calculators/electronics/transformer-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">transformer calculator</Link> and calculate reactive power compensation in our <Link href="/calculators/electronics/power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">power calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Installing automatic capacitor banks at main distribution switchboards corrects lagging power factors to near unity (&gt;0.95), eliminating utility reactive penalty surcharges and freeing up transformer thermal capacity for future plant expansions.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Mastering three-phase power calculations enables electrical engineers to balance industrial panel loads, size distribution conductors accurately, and maximize efficiency.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Variable-Frequency Drive (VFD) Multi-Pulse Rectification & Active Front-Ends
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Heavy industrial pump stations, marine propulsion thrusters, and mining haulers utilize high-power Variable-Frequency Drives (VFDs) to control multi-megawatt three-phase AC induction and synchronous motors. Standard 6-pulse diode bridge rectifiers generate substantial 5th and 7th harmonic currents that distort facility supply bus voltage waveforms.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To mitigate harmonic distortion, industrial electrical designers implement 12-pulse, 18-pulse, or 24-pulse drive architectures utilizing phase-shifting auto-transformers that cancel characteristic harmonic currents internally. Alternatively, modern Active Front-End (AFE) regenerative converters deploy bidirectional insulated-gate bipolar transistor (IGBT) bridges that synthesize sinusoidal input currents with near-zero harmonic distortion and unity power factor across all motor operating speeds.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Proper harmonic mitigation safeguards upstream distribution transformers from excessive eddy current heating and eliminates communication interference on plant automation networks.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Conducting comprehensive three-phase load flow audits ensures symmetrical phase voltages, lowers neutral conductor currents, and prevents motor overheating in manufacturing plants.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Proper feeder sizing and power factor correction protect commercial switchgear, improve distribution efficiency, and eliminate utility billing penalties across industrial facilities.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Balanced three-phase power delivery remains the bedrock of modern utility transmission networks worldwide.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Accurate power factor correction and balanced phase current distribution optimize plant substation capacity and safeguard heavy industrial electrical machinery from harmonic disturbances.
          </p>

        </>
      }
    >
      <ThreePhasePowerCalculatorComponent />
    </CalcPage>
  );
}
