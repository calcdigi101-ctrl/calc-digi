import type { Metadata } from "next";
import Link from "next/link";
import InductorCalculatorComponent from "@/components/calcs/electronics/inductor-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { InductiveReactanceFrequencySweepChart } from "@/components/flagship/electronics/editorial-charts";

const PATH = "/calculators/electronics/inductor-calculator";
const TITLE = "Inductor Reactance Calculator | Impedance (XL) & Magnetic Energy";
const DESCRIPTION =
  "Calculate inductive reactance (XL), magnetic stored energy (Joules), back-EMF potential, and quality factor (Q) across AC and RF electromagnetic circuits.";

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
  { href: "/calculators/electronics/capacitor-calculator", icon: "⚙️", name: "Capacitor Reactance" },
  { href: "/calculators/electronics/transformer-calculator", icon: "🔄", name: "Transformer" },
  { href: "/calculators/electronics/power-calculator", icon: "🔌", name: "Power Calculator" },
  { href: "/calculators/electronics/frequency-calculator", icon: "📡", name: "Frequency Calculator" },
  { href: "/calculators/electronics/three-phase-power-calculator", icon: "⚡", name: "Three-Phase Power" },
  { href: "/calculators/electronics/ohms-law-calculator", icon: "⚡", name: "Ohm's Law" },
];

const FAQ_ITEMS = [
  {
    q: "What is inductive reactance (XL) and how does it change with frequency?",
    a: "Inductive reactance (XL, measured in Ohms) represents the opposition an inductor offers to changing alternating electric current. Governed by Lenz's Law and Faraday's Law of Induction, reactance increases linearly with both frequency (f) and inductance (L): XL = 2 × π × f × L. At zero frequency (DC), an ideal inductor exhibits zero reactance (acting as a pure short circuit). As frequency climbs, reactance increases, functioning as a low-pass choke.",
  },
  {
    q: "How do you calculate the magnetic energy stored in an energized inductor?",
    a: "The potential magnetic energy (E, in Joules) stored within the concentrated magnetic field of an energized inductor core is computed as: E = ½ × L × I², where L is inductance in Henries and I is continuous current in Amperes. This stored energy is the foundational principle underlying switch-mode buck and boost power converters.",
  },
  {
    q: "What is an inductive voltage spike (inductive kickback) and how is it suppressed?",
    a: "When current through an energized inductor is abruptly interrupted by a switch or transistor, the collapsing magnetic field induces a massive opposing counter-electromotive force: V = -L × (di / dt). Because di/dt is nearly instantaneous, voltage can spike to thousands of Volts, destroying driving transistors. A flyback snubber diode or bidirectional TVS diode placed across the coil clamps this voltage spike safely.",
  },
  {
    q: "What causes magnetic core saturation in practical inductors?",
    a: "Magnetic core materials (such as ferrite, powdered iron, and silicon steel) possess a finite magnetic flux density limit (B_sat, measured in Tesla). If operating current exceeds the core saturation threshold, magnetic domains fully align, causing differential permeability to collapse. The inductor suddenly behaves like an air-core coil, causing inductance to drop sharply and current to spike destructively.",
  },
];

export default function InductorCalculatorPage() {
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
            <strong>Quick Engineering Guidance:</strong> Inductive reactance increases linearly with frequency, providing exceptional high-frequency RF choke suppression and DC energy storage. To model capacitive resonance, cross-reference our <Link href="/calculators/electronics/capacitor-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">capacitor calculator</Link> and analyze turns ratios in our <Link href="/calculators/electronics/transformer-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">transformer calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Inductive Reactance (XL) Growth Across AC Frequencies
          </h2>
          <InductiveReactanceFrequencySweepChart />
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Inductors represent the magnetic counterpart to electrostatic capacitors in classical circuit theory. Typically fabricated by winding conductive copper wire into a helical coil around a ferromagnetic core or air former, inductors exploit Faraday&apos;s Law of Electromagnetic Induction. Any change in electric current creates a changing magnetic flux, which induces an opposing counter-electromotive force (back-EMF) governed by Heinrich Lenz&apos;s Law.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In alternating current (AC) circuit analysis, inductors introduce a 90-degree phase shift where voltage leads current by one quarter-cycle (V leads I). Because an inductor naturally opposes rapid fluctuations in current, it acts as a low-impedance path for steady DC power while presenting formidable impedance to high-frequency electromagnetic interference (EMI) and harmonic noise.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Governing Inductive Reactance & Magnetic Energy Equations
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The fundamental relationship for induced back-electromotive force (v_L(t)) as a function of the time rate of change of current (di/dt) is:
          </p>
          <Formula>{"v_L(t) = L \frac{di(t)}{dt}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When excited by a steady-state sinusoidal AC signal of frequency (f, in Hertz), inductive reactance (X_L, in Ohms) is defined as:
          </p>
          <Formula>{"X_L = 2 \pi f L = \omega L"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The total magnetic potential energy (E, in Joules) stored within the surrounding magnetic field and Quality Factor (Q) are computed as:
          </p>
          <Formula>{"E = \frac{1}{2} L I^2, \quad Q = \frac{\omega L}{R_{DCR}}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For three-phase motor windings and reactive energy billing, calculate parameters in our <Link href="/calculators/electronics/three-phase-power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">three phase power calculator</Link> and calculate circuit power in our <Link href="/calculators/electronics/power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">power calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Ferromagnetic Core Materials & Magnetic Properties
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Inductance is proportional to the square of turns (N²) and the relative magnetic permeability (µ_r) of the core: L = (µ_r µ_0 N² A) / l. Selecting the proper core material balances permeability against eddy current losses:
          </p>
          <DataTable
            head={["Magnetic Core Material", "Relative Permeability (μr)", "Saturation Flux Bsat (Tesla)", "Core Loss Frequency Limit", "Primary Application"]}
            rows={[
              ["Air Core / Non-Magnetic", "1.0", "No Saturation Limit", "> 1 GHz (Ultra-High RF)", "RF tuning coils, FM transmitter filters"],
              ["Iron Powder (Carbonyl Iron)", "10 - 75", "1.2 - 1.6 T", "1 MHz - 100 MHz", "High-Q radio inductors, EMI line chokes"],
              ["Manganese-Zinc Ferrite (MnZn)", "1,500 - 15,000", "0.35 - 0.50 T", "10 kHz - 2 MHz", "Switch-mode power supplies, broadband pulse transformers"],
              ["Nickel-Zinc Ferrite (NiZn)", "100 - 1,500", "0.25 - 0.40 T", "1 MHz - 500 MHz", "Common-mode cable choke beads, RF baluns"],
              ["Silicon Electrical Steel (Laminated)", "2,000 - 10,000", "1.5 - 1.8 T", "50 Hz - 1 kHz (Mains)", "Heavy utility power transformers, motor laminations"],
              ["Amorphous / Nanocrystalline", "20,000 - 100,000", "1.2 - 1.3 T", "10 kHz - 100 kHz", "High-efficiency EV chargers, precision CT sensors"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: Switch-Mode DC-DC Buck Inductor
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A power electronics designer is engineering a non-isolated DC-DC buck converter stepping down V_in = 12.0 V to V_out = 3.30 V at a continuous load current of I_out = 4.0 A. The converter operates at a switching frequency of f_sw = 500 kHz with a targeted inductor ripple current ratio of Δ I_L = 30% (1.20 A):
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Operating Duty Cycle (D):</strong> D = V_out / V_in = 3.30 V / 12.0 V = 0.275 (27.5%)
            </li>
            <li>
              <strong>Inductor Voltage Drop During On-Time (V_L):</strong> V_L = V_in - V_out = 12.0 V - 3.30 V = 8.70 V
            </li>
            <li>
              <strong>Required Inductance:</strong>
              <br />
              L = (V_out × (V_in - V_out)) / (ΔI_L × f_sw × V_in) = (3.30 × 8.70 / 1.20 × (500 × 10³) × 12.0) = (28.71 / 7,200,000) ≈ 3.987 × 10⁻⁶ H = 3.99 µH
            </li>
            <li>
              <strong>Standard Commercial Inductor:</strong> Select a standard 4.7 µH shielded power inductor.
            </li>
            <li>
              <strong>Peak Inductor Current (I_peak):</strong> I_peak = I_out + (Δ I_L / 2) = 4.0 A + 0.60 A = 4.60 A
            </li>
            <li>
              <strong>Required Saturation Current Rating (I_sat):</strong> With a 25% safety margin, the selected inductor must specify I_sat ≥ 4.60 × 1.25 = 5.75 A to prevent core saturation.
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Maintaining magnetic core saturation headroom ensures stable voltage regulation without excessive ripple. Verify DC winding losses in our <Link href="/calculators/electronics/ohms-law-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ohms law calculator</Link> and cable gauge ampacities in our <Link href="/calculators/electronics/wire-gauge-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">wire gauge calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Parasitic Capacitance & Self-Resonant Frequency (SRF)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Real-world physical inductors are not pure lumped inductances. Adjacent turns of copper winding wire act as tiny parallel conductive plates separated by insulating enamel varnish, creating an intrinsic distributed parasitic capacitance (C_p).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            At the Self-Resonant Frequency (SRF), inductive reactance equals parasitic capacitive reactance:
          </p>
          <Formula>{"f_{SRF} = \frac{1}{2 \pi \sqrt{L \times C_p}}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Above the SRF, capacitive reactance dominates, and the component effectively ceases to function as an inductor, instead behaving as a shunt capacitor. High-frequency RF circuit designs must always verify that operating frequencies remain well below the manufacturer&apos;s published SRF rating.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Industry Standards & Electromagnetic Compatibility (EMC)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Inductor manufacturing standards and electromagnetic radiation limits are regulated by international organizations:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>CISPR 25 / CISPR 32:</strong> Automotive and commercial electromagnetic disturbance standards governing conducted and radiated emissions caused by switch-mode inductors.
            </li>
            <li>
              <strong>IEC 62024:</strong> High-frequency inductive component standards establishing standardized thermal rise measurement methodologies under continuous DC bias.
            </li>
            <li>
              <strong>IEEE Standard 389:</strong> Recommended practice for testing transformers and inductors used in electronic power conversion equipment.
            </li>
          </ul>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For step-up and step-down AC distribution modeling, evaluate magnetic transfer in our <Link href="/calculators/electronics/transformer-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">transformer calculator</Link> and calculate RF resonance in our <Link href="/calculators/electronics/frequency-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">frequency calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Understanding inductive reactance, magnetic energy density, and saturation thresholds ensures power electronics engineers can architect durable, high-efficiency converters, switch-mode power supplies, and noise-immune RF circuitry.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Distributed Air Gaps in Ferrite Cores for High Energy Storage
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In power electronics inductors utilized for switch-mode energy storage (such as buck, boost, and flyback converters), high magnetic permeability can actually be a severe detriment if it leads to rapid core saturation. Ferromagnetic materials like manganese-zinc ferrite have high permeability (μr &gt; 2,000), meaning a small current can drive the core to saturation flux density (B_sat), collapsing inductance.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To store substantial physical magnetic energy (E = (1 / 2) L I²), engineers deliberately introduce an air gap into the magnetic core structure. Because the magnetic permeability of air (µ_0) is thousands of times lower than the surrounding ferrite, nearly all of the magnetic reluctance and stored energy concentrates directly within the physical volume of the air gap:
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            <Formula>{"E_{gap} \approx \frac{B^2}{2 \mu_0} \times A \times l_{gap}"}</Formula>
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Alternatively, composite powdered-iron cores feature millions of microscopic non-magnetic binder gaps distributed uniformly throughout the core matrix (&lsquo;distributed air gap&rsquo;), providing smooth soft-saturation characteristics ideal for high-current automotive power inductors.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Understanding magnetic energy storage, core saturation limits, and high-frequency winding losses empowers engineers to design high-efficiency power supplies, noise chokes, and resonant converters.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Common-Mode vs Differential-Mode Inductive Choke Filtration
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In electromagnetic compatibility (EMC) filter design, conducted electromagnetic noise propagating along power and data cabling is divided into two distinct transmission modes: <strong>Differential-Mode (DM)</strong> noise and <strong>Common-Mode (CM)</strong> noise. Differential noise flows in opposite directions along the supply and return lines, whereas common-mode noise flows in the same direction on both conductors simultaneously, returning through earth ground.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A <strong>Common-Mode Choke</strong> features two identical copper coils wound on a single shared high-permeability toroidal ferrite core. Differential load currents flow through the windings in opposing directions, creating canceling magnetic fluxes inside the core (B_net = 0), presenting zero impedance to desired power currents. Conversely, common-mode noise currents flow in the same direction, generating additive magnetic flux that presents massive inductive impedance, blocking EMI noise from escaping into mains wiring.
          </p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Toroidal vs E-Core Geometries & Magnetic Containment
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The geometric shape of an inductor core directly dictates its magnetic shielding and EMI radiation characteristics. In open bobbin or unshielded drum cores, magnetic flux lines extend outward into the surrounding air space, easily coupling electrical noise into adjacent sensitive analog traces on a circuit board.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Toroidal (doughnut-shaped) cores feature continuous closed-loop magnetic paths where magnetic flux remains entirely trapped within the circular core cross-section. Toroids exhibit near-zero stray electromagnetic radiation, rendering them the gold standard for high-fidelity audio equipment and precision telecommunications receivers.
          </p>


          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Designing inductors with sufficient saturation flux margin and low high-frequency core losses prevents voltage regulation collapse and ensures robust electromagnetic compatibility across switch-mode power systems.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Careful selection of core metallurgy and winding geometry guarantees stable circuit operation across wide temperature and frequency boundaries.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Magnetic Coupling Dynamics & Resonant Frequency Tuning
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When inductors are placed in close physical proximity, mutual magnetic coupling occurs. Engineers model transformer turn ratios using our <Link href="/calculators/electronics/transformer-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">transformer calculator</Link> and analyze self-resonant frequencies via our <Link href="/calculators/electronics/frequency-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">frequency calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Proper magnetic shielding and toroidal geometry contain stray flux lines, eliminating electromagnetic cross-talk between high-current switchers and sensitive analog signal paths.
          </p>


        </>
      }
    >
      <InductorCalculatorComponent />
    </CalcPage>
  );
}
