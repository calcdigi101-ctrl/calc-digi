import type { Metadata } from "next";
import Link from "next/link";
import TransformerCalculatorComponent from "@/components/calcs/electronics/transformer-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { TransformerEfficiencyLoadCurveChart } from "@/components/flagship/electronics/editorial-charts";

const PATH = "/calculators/electronics/transformer-calculator";
const TITLE = "Transformer Calculator | Turns Ratio, Voltage Step-Up/Down & Power";
const DESCRIPTION =
  "Calculate electrical transformer turns ratio (Np:Ns), secondary output voltage, primary reflected current, and apparent power transfer capacity.";

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
  { href: "/calculators/electronics/inductor-calculator", icon: "🔁", name: "Inductor Reactance" },
  { href: "/calculators/electronics/three-phase-power-calculator", icon: "⚡", name: "Three-Phase Power" },
  { href: "/calculators/electronics/power-calculator", icon: "🔌", name: "Power Calculator" },
  { href: "/calculators/electronics/wire-gauge-calculator", icon: "🔧", name: "Wire Gauge" },
  { href: "/calculators/electronics/ohms-law-calculator", icon: "⚡", name: "Ohm's Law" },
  { href: "/calculators/electronics/solar-panel-calculator", icon: "☀️", name: "Solar Panel" },
];

const FAQ_ITEMS = [
  {
    q: "What is a transformer turns ratio and how does it determine secondary voltage?",
    a: "The turns ratio (a = Np / Ns) is the ratio of primary winding turns (Np) to secondary winding turns (Ns). Based on Faraday's Law of Mutual Induction, voltage scales proportionally with turns: Vs / Vp = Ns / Np. In a step-down transformer (Np &gt; Ns), secondary voltage decreases while current increases proportionally.",
  },
  {
    q: "Why does current scale inversely with voltage in an ideal transformer?",
    a: "In an ideal transformer with 100% efficiency, electrical apparent power is conserved between primary and secondary circuits: Pin = Pout, or Vp × Ip = Vs × Is. Consequently, stepping down voltage by a factor of 10 increases output current by a factor of 10 (Is / Ip = Vp / Vs = Np / Ns), obeying the Law of Conservation of Energy.",
  },
  {
    q: "What are the primary sources of energy loss in practical electrical transformers?",
    a: "Transformer losses are divided into two main categories: No-Load (Core / Iron) losses, consisting of magnetic hysteresis in the core material and circulating eddy currents; and Load (Copper) losses, caused by I²R Joule heating in the primary and secondary copper wire windings as operating current increases.",
  },
  {
    q: "What is transformer impedance reflection and why is it vital in audio circuits?",
    a: "When a load impedance (ZL) is connected across secondary terminals, it reflects back to primary terminals scaled by the square of turns ratio: Z_primary = (Np / Ns)² × ZL. In vacuum-tube and high-fidelity audio engineering, output transformers match high-impedance plate outputs to low-impedance 4-Ohm or 8-Ohm loudspeaker voice coils.",
  },
];

export default function TransformerCalculatorPage() {
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
            <strong>Quick Engineering Guidance:</strong> Transformers transfer electrical energy between circuits through mutual magnetic flux linkage, allowing high-voltage long-distance grid transmission with minimal resistive losses. To evaluate industrial 3-phase machinery, consult our <Link href="/calculators/electronics/three-phase-power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">three phase power calculator</Link> and calculate circuit power in our <Link href="/calculators/electronics/power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">power calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Transformer Efficiency Curve & Iron vs Copper Loss Balance
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Invented in the late 19th century by pioneering electrical engineers including Michael Faraday, William Stanley, and Nikola Tesla, the electrical transformer enabled the global adoption of alternating current (AC) power grids. By stepping up generator output voltages to hundreds of kilovolts, utility operators drastically reduce transmission line currents, slashing I² R Joule heat dissipation over long distances before stepping voltage back down for domestic consumer distribution.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Transformers are static electrodynamic machines containing no moving mechanical parts. Electrical energy transfer occurs entirely through mutual electromagnetic induction between primary and secondary copper coils wound around a shared ferromagnetic core. Real-world transformers achieve exceptional operating efficiencies between 94% and 99.5%, representing some of the most efficient energy conversion devices ever engineered.
          </p>

          <TransformerEfficiencyLoadCurveChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Fundamental Transformer Ratios & Magnetic Transfer Formulas
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The fundamental transformer turns ratio (a) connects primary turns (N_p), secondary turns (N_s), primary voltage (V_p), and secondary voltage (V_s):
          </p>
          <Formula>{"a = \frac{N_p}{N_s} = \frac{V_p}{V_s} = \frac{I_s}{I_p}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under non-ideal conditions with transformer efficiency factor (η, expressed as a decimal), primary reflected current (I_p) required to support secondary load (I_s) is:
          </p>
          <Formula>{"I_p = \frac{V_s \times I_s}{V_p \times \eta} = \frac{S_{out}}{V_p \times \eta}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Impedance transformation (Z_primary) reflected from a secondary load impedance (Z_load) scales with the square of the turns ratio:
          </p>
          <Formula>{"Z_{primary} = a^2 \times Z_{load} = \left(\frac{N_p}{N_s}\right)^2 \times Z_{load}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For magnetic core reactance analysis, consult our <Link href="/calculators/electronics/inductor-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">inductor calculator</Link> and calculate circuit loop resistance in our <Link href="/calculators/electronics/ohms-law-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ohms law calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comparative Transformer Core Topologies & Loss Profiles
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Transformer performance is heavily dictated by magnetic core metallurgy and geometric construction:
          </p>
          <DataTable
            head={["Transformer Core Construction", "Magnetic Material", "Typical Efficiency", "Stray Magnetic Leakage", "Standard Engineering Application"]}
            rows={[
              ["Laminated E-I Core", "Silicon Grain-Oriented Steel", "88% - 94%", "Moderate to High (EMI radiation)", "Low-cost linear power supplies, battery chargers, guitar amps"],
              ["Toroidal Donut Core", "Continuously Wound Silicon Steel", "95% - 98%", "Extremely Low (Near zero hum)", "High-end medical electronics, audiophile preamplifiers"],
              ["Ferrite E-E / E-T-D Core", "Manganese-Zinc (MnZn) Ferrite", "92% - 97%", "Low (High-frequency design)", "Switch-mode power supplies (SMPS), computer ATX supplies"],
              ["Planar PCB Transformer", "Embedded Multilayer FR-4 PCB", "97% - 99%", "Very Low (Controlled geometry)", "Ultra-dense aerospace DC-DC converters, EV onboard chargers"],
              ["Oil-Immersed Utility Core", "Amorphous Metal Alloy", "98.5% - 99.5%", "Contained within steel tank", "Pole-mounted distribution transformers, utility substations"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: Industrial Step-Down Transformer Sizing
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A manufacturing facility requires a control power transformer stepping down V_p = 480 V AC single-phase machinery bus voltage to V_s = 120 V AC to energize auxiliary PLC relays and human-machine interface (HMI) screens. The continuous secondary load current is I_s = 8.0 A with a manufacturer transformer efficiency rating of η = 96.0% (0.96):
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Turns Ratio (a):</strong> a = V_p / V_s = 480 V / 120 V = 4.0 : 1
            </li>
            <li>
              <strong>Secondary Apparent Power (S_out):</strong> S_out = V_s × I_s = 120 V × 8.0 A = 960 VA (0.96 kVA)
            </li>
            <li>
              <strong>Primary Input Apparent Power (S_in):</strong>
              <br />
              S_in = S_out / η = 960 VA / 0.96 = 1,000 VA = 1.00 kVA
            </li>
            <li>
              <strong>Primary Line Current (I_p):</strong>
              <br />
              I_p = S_in / V_p = 1,000 VA / 480 V = 2.083 A
            </li>
            <li>
              <strong>Continuous Total Thermal Loss:</strong> P_loss = S_in - S_out = 1,000 - 960 = 40.0 Watts
            </li>
            <li>
              <strong>Standard Transformer Sizing:</strong> Standard industrial control transformers are cataloged at 1.0 kVA and 1.5 kVA. Selecting a 1.5 kVA rating provides a 56% headroom margin to accommodate relay coil inrush transients.
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Sizing the transformer at 1.5 kVA guarantees reliable operation without voltage sag during solenoid actuation. Feeder conductor sizing should be verified in our <Link href="/calculators/electronics/wire-gauge-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">wire gauge calculator</Link> and solar battery backups in our <Link href="/calculators/electronics/solar-panel-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">solar panel calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Magnetic Core Saturation & Excitation Inrush Current
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When a power transformer is initially energized at the zero-crossing of the AC voltage waveform, magnetic flux must build to twice its steady-state peak value to satisfy Faraday&apos;s Law. If the iron core retains remnant magnetization from previous operation, the peak magnetic flux density drives the core deep into saturation (B &gt; B_sat).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under deep core saturation, relative permeability collapses, leaving only the primary winding&apos;s tiny DC resistance to limit current. This triggers an excitation inrush current that can surge to 10× to 25× nominal rated current for several AC cycles. Branch circuit breakers protecting transformers must utilize magnetic delay trip curves (such as Type D circuit breakers) to prevent false tripping.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Regulatory Standards & Electrical Safety Isolation
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Transformers providing galvanic isolation and power distribution must comply with rigorous international safety codes:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>IEEE C57 Series:</strong> Comprehensive American standard governing distribution, power, and regulating transformers, including short-circuit impedance and temperature rise tests.
            </li>
            <li>
              <strong>IEC 61558:</strong> Safety of power transformers, power supplies, reactors and similar products, establishing dielectric insulation barriers (often 4,000 V AC Hi-Pot test).
            </li>
            <li>
              <strong>UL 5085 / UL 1561:</strong> Underwriters Laboratories safety standard for low-voltage general purpose dry-type and specialty industrial transformers.
            </li>
          </ul>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For complex industrial three-phase distribution calculations, consult our <Link href="/calculators/electronics/three-phase-power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">three phase power calculator</Link> and calculate power factor correction banks in our <Link href="/calculators/electronics/capacitor-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">capacitor calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Accurate transformer turns ratio modeling and loss analysis ensures industrial electrical networks operate with peak thermal efficiency, uncompromised galvanic isolation, and stable voltage delivery under fluctuating dynamic loads.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Harmonic K-Factor Ratings & Non-Linear Industrial Heating
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern commercial office buildings and data centers, power transformers feed vast arrays of non-linear electronic power supplies that generate intense harmonic currents. High-frequency harmonics dramatically increase transformer winding eddy current losses (which scale with the square of harmonic frequency: P_eddy ∝ Ih² × f_h²).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Standard commercial distribution transformers subjected to non-linear loads overheat rapidly and suffer insulation breakdown. Under ANSI/IEEE C57.110, transformers feeding harmonic loads are assigned standardized <strong>K-Factor</strong> ratings (K-4, K-13, K-20). A K-13 rated transformer incorporates oversized neutral conductors, electrostatic shielding between primary and secondary windings, and parallel-stranded transposed copper conductors to withstand severe harmonic currents safely without overheating.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Mastering transformer mutual induction principles, core loss mechanics, and thermal ratings ensures robust electrical power distribution and uninterrupted operation across commercial and industrial facilities.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Transformer Polarity Testing: Dot Convention & Phasing
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In alternating current engineering and multi-phase transformer connections, knowing the relative instantaneous direction of induced voltages across primary and secondary terminals is critical. Circuit schematic diagrams utilize the standardized &lsquo;Dot Convention&rsquo; to indicate instantaneous winding polarity.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When alternating current enters the dotted terminal of the primary winding, the induced secondary voltage is instantaneously positive at the dotted secondary terminal. In three-phase Wye-Delta transformer banks, incorrect winding polarity can produce a 180-degree phase inversion that results in massive circulating currents, blown fuses, and catastrophic equipment failure. Electrical technicians verify transformer phasing using standard AC polarity test circuits prior to placing transformers in parallel operation.
          </p>


          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Routine thermal insulation testing and dissolved gas analysis (DGA) on oil-filled distribution transformers detects internal dielectric degradation before catastrophic insulation breakdown occurs.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Sizing control transformers with ample VA headroom protects industrial relay logic from voltage brownouts during contactor inrush transients, delivering uncompromised operational reliability across automated manufacturing plants.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Multi-Phase Grid Distribution & Heavy Conductor Sizing
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In industrial power distribution, large transformers step down transmission voltages for polyphase factory loads. Contractors calculate line current balance using our <Link href="/calculators/electronics/three-phase-power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">three phase power calculator</Link> and size secondary feeder cables through our <Link href="/calculators/electronics/wire-gauge-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">wire gauge calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Implementing delta-wye transformer configurations traps zero-sequence triplen harmonics (3rd, 9th, 15th) within the primary delta winding, preventing harmonic overheating from circulating back into utility transmission lines. Sizing proper k-factor rated transformers safeguards facilities against non-linear electronic loads.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Mastering transformer mutual induction principles ensures reliable power distribution and operational longevity across utility and commercial installations.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Solid-State Transformers (SST) & Smart Grid Power Electronic Conversion
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            While conventional magnetic transformers have dominated electrical distribution for over a century, modern power electronic engineering is rapidly adopting Solid-State Transformers (SSTs). An SST integrates high-voltage silicon carbide (SiC) power semiconductor switches operating at switching frequencies between 20 kHz and 100 kHz with a medium-frequency nanocrystalline magnetic core.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because transformer core volume and weight scale inversely with operating frequency, an SST achieves a 70% to 80% reduction in physical footprint compared to a 60 Hz oil-immersed distribution transformer of equivalent megavolt-ampere rating. Furthermore, integrated bi-directional active converters allow SSTs to perform real-time voltage regulation, harmonic isolation, reactive power compensation, and direct DC bus interconnection for electric vehicle fast-charging plazas and battery energy storage stations.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Balancing primary and secondary impedance ratios ensures maximum power transfer and prevents magnetic core saturation in commercial distribution equipment.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Regular dielectric oil analysis and thermal monitoring protect utility transformers against premature insulation breakdown and costly electrical outages across municipal power grids.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Mastering transformer mutual induction calculations enables electrical engineers to optimize coil geometries, minimize stray core losses, and ensure resilient grid infrastructure.
          </p>

        </>
      }
    >
      <TransformerCalculatorComponent />
    </CalcPage>
  );
}
