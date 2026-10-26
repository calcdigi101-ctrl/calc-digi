import type { Metadata } from "next";
import Link from "next/link";
import CapacitorCalculatorComponent from "@/components/calcs/electronics/capacitor-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CapacitiveReactanceFrequencySweepChart } from "@/components/flagship/electronics/editorial-charts";

const PATH = "/calculators/electronics/capacitor-calculator";
const TITLE = "Capacitor Reactance Calculator | Impedance (Xc) & Stored Energy";
const DESCRIPTION =
  "Calculate capacitive reactance (Xc), electrostatic stored energy (Joules), AC peak current draw, and reactive power generation across AC circuits.";

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
  { href: "/calculators/electronics/rc-time-constant-calculator", icon: "⏱️", name: "RC Time Constant" },
  { href: "/calculators/electronics/power-calculator", icon: "🔌", name: "Power Calculator" },
  { href: "/calculators/electronics/frequency-calculator", icon: "📡", name: "Frequency Calculator" },
  { href: "/calculators/electronics/ohms-law-calculator", icon: "⚡", name: "Ohm's Law" },
  { href: "/calculators/electronics/voltage-divider-calculator", icon: "🔽", name: "Voltage Divider" },
];

const FAQ_ITEMS = [
  {
    q: "What is capacitive reactance (Xc) and how does frequency affect it?",
    a: "Capacitive reactance (Xc, measured in Ohms) represents the opposition a capacitor offers to the flow of alternating electric current (AC). It is inversely proportional to both frequency (f) and capacitance (C): Xc = 1 / (2 × π × f × C). At zero frequency (DC), reactance is infinite, meaning capacitors block DC current. As frequency increases into kilohertz and megahertz ranges, reactance drops toward zero, allowing high-frequency AC signals to pass easily.",
  },
  {
    q: "How do you calculate the electrostatic energy stored in a capacitor?",
    a: "The potential energy (E, in Joules) stored within the electric field established between capacitor plates is computed as: E = ½ × C × V², where C is capacitance in Farads and V is the applied potential difference in Volts. Because energy scales with the square of voltage, doubling applied voltage quadruples the stored electrostatic energy.",
  },
  {
    q: "What is Equivalent Series Resistance (ESR) in real-world capacitors?",
    a: "ESR represents the parasitic internal resistance arising from metal lead connections, foil conductors, and dielectric polarization losses. Under high ripple current conditions (such as switch-mode power supplies), high ESR causes severe internal Joule heating (P = I_rms² × ESR), drying out liquid electrolytes and precipitating capacitor failure.",
  },
  {
    q: "What is the difference between ceramic, electrolytic, and film capacitors?",
    a: "Multilayer ceramic capacitors (MLCC) offer low ESR, high frequency response, and non-polarized operation, ideal for high-frequency RF bypass. Aluminium and tantalum electrolytic capacitors achieve massive capacitance density per volume but are polarized and feature higher ESR. Film capacitors (polypropylene) provide exceptional dielectric stability and ultra-low dielectric absorption, making them ideal for high-power audio crossovers and snubber networks.",
  },
];

export default function CapacitorCalculatorPage() {
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
            <strong>Quick Engineering Guidance:</strong> Capacitive reactance diminishes logarithmically as frequency rises, functioning as an essential high-pass filter and DC-blocking element. To evaluate complementary inductive choke behavior, cross-reference our <Link href="/calculators/electronics/inductor-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">inductor calculator</Link> and calculate circuit charging delays in our <Link href="/calculators/electronics/rc-time-constant-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">rc time constant calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Capacitive Reactance (Xc) Attenuation Across Frequency
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Capacitors represent one of the most vital passive components in electrical and electronic circuit design. Physically constructed from two conductive parallel plates separated by an insulating dielectric layer, capacitors store potential electrical energy within an electrostatic field. Unlike chemical batteries which generate free electrons through Faradaic redox reactions, capacitors store static charge carriers electrostatically without chemical phase transitions.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In alternating current (AC) circuit theory, capacitors exhibit a 90-degree phase shift where current leads voltage by one quarter-cycle (I leads V). This phase relationship allows capacitors to cancel out inductive motor lagging currents, forming the core technology behind industrial power factor correction and resonant tuned filter topologies.
          </p>

          <CapacitiveReactanceFrequencySweepChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Equations of Capacitance & Reactance
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Fundamental electrostatic capacitance (C, in Farads) relates stored charge (Q, in Coulombs) to applied potential difference (V, in Volts):
          </p>
          <Formula>{"Q = C \times V \quad \iff \quad C = \frac{Q}{V}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In an AC circuit operating at cyclic frequency (f, in Hertz), the capacitive reactance (X_c, in Ohms) is defined as:
          </p>
          <Formula>{"X_c = \frac{1}{2 \pi f C} = \frac{1}{\omega C}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The total potential electrostatic energy (E, in Joules) and peak AC current draw (I_peak, in Amperes) are computed as:
          </p>
          <Formula>{"E = \frac{1}{2} C V^2, \quad I_{peak} = \frac{V_{peak}}{X_c}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For reactive power factor compensation, calculate facility loads in our <Link href="/calculators/electronics/power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">power calculator</Link> and calculate circuit resistance in our <Link href="/calculators/electronics/ohms-law-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ohms law calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Dielectric Materials & Capacitor Characteristics
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Capacitance is governed by plate geometry and the relative permittivity (κ or ε_r) of the intervening dielectric material: C = ε_r ε_0 (A / d). The table below summarizes standard commercial capacitor technologies:
          </p>
          <DataTable
            head={["Capacitor Dielectric Type", "Permittivity (εr)", "Capacitance Range", "ESR & Dissipation", "Primary Engineering Application"]}
            rows={[
              ["C0G / NP0 Ceramic (Class 1)", "30 - 100", "1 pF - 100 nF", "Ultra-low ESR / 0.1% loss", "RF oscillators, high-precision timing filters"],
              ["X7R / X5R Ceramic (Class 2)", "2,000 - 4,000", "100 nF - 100 µF", "Moderate ESR / Piezo noise", "DC power rail decoupling & microcontroller bypass"],
              ["Aluminium Electrolytic", "8 - 10 (Al₂O₃)", "1 µF - 100,000 µF", "High ESR / High ripple loss", "Bulk AC-DC mains smoothing & audio power reservoirs"],
              ["Tantalum Electrolytic", "27 (Ta₂O₅)", "0.1 µF - 1,000 µF", "Low ESR / Polarity sensitive", "High-density aerospace & telecommunications boards"],
              ["Polypropylene Film (PP)", "2.2", "1 nF - 50 µF", "Extremely low dielectric loss", "High-voltage snubbers, induction heating, audio crossovers"],
              ["Electric Double-Layer (Supercap)", "Electrochemical", "1 F - 5,000 F", "Higher internal resistance", "Backup power, regenerative braking, memory retention"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Example: High-Pass Audio Filter Design
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            An audio hardware engineer designs a first-order passive high-pass crossover network to protect an 8.0 Ω tweeter speaker from low-frequency bass distortion. The desired -3 dB cutoff frequency is f_c = 2,500 Hz. Determine the required series coupling capacitor and its reactance across the audio band:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Cutoff Frequency:</strong> f_c = 2,500 Hz
            </li>
            <li>
              <strong>Speaker Load Impedance:</strong> R = 8.0 Ω
            </li>
            <li>
              <strong>Required Capacitance:</strong>
              <br />
              C = (1 / 2 π × f_c × R) = (1 / 2 × 3.14159 × 2,500 × 8.0) = (1 / 125,663.7) ≈ 7.96 × 10⁻⁶ F = 7.96 µF
            </li>
            <li>
              <strong>Standard Non-Polarized Film Capacitor:</strong> Select a standard 8.2 µF polypropylene film capacitor.
            </li>
            <li>
              <strong>Reactance at 100 Hz (Bass Rumble):</strong>
              <br />
              Xc(100 Hz) = 1 / (2π × 100 × 8.2 × 10⁻⁶) = 194.1 Ω (Strongly attenuates bass signal)
            </li>
            <li>
              <strong>Reactance at 10,000 Hz (Treble Harmonics):</strong>
              <br />
              Xc(10 kHz) = 1 / (2π × 10,000 × 8.2 × 10⁻⁶) = 1.94 Ω (Negligible impedance to high notes)
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because X_c drops from 194 Ω at bass frequencies to under 2 Ω at treble frequencies, the capacitor functions as an ideal high-pass crossover. Speaker power levels should be verified in our <Link href="/calculators/electronics/power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">power calculator</Link> and decibel cutoffs in our <Link href="/calculators/electronics/decibel-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">decibel calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Capacitor Dielectric Breakdown & Voltage Derating
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Every dielectric medium possesses a characteristic dielectric breakdown field strength (E_break, measured in Megavolts per meter). If the applied electric potential difference across capacitor plates exceeds the rated maximum breakdown limit, avalanche ionization occurs, puncturing the dielectric and causing a permanent short-circuit failure.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            High-reliability aerospace standards (such as NASA EEE-INST-002) mandate an operating voltage derating factor of 50%. A circuit operating on a 24 V DC bus must employ capacitors rated for at least 50 V. Furthermore, Class 2 ceramic dielectric capacitors (X7R, X5R) exhibit severe DC bias voltage coefficient losses, where applying rated voltage can reduce effective capacitance by over 60%.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Authoritative Standards & Environmental Testing
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Capacitor reliability, lifespan ratings, and safety certifications are defined by international standards bodies:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>IEC 60384:</strong> Comprehensive multi-part standard covering fixed capacitors for use in electronic equipment, specifying ESR endurance testing and ripple current lifetimes.
            </li>
            <li>
              <strong>UL 60384-14 / EN 60384-14:</strong> Safety certification for Class X (line-to-line) and Class Y (line-to-ground) mains interference suppression capacitors, engineered to fail open without electrical shock hazards.
            </li>
            <li>
              <strong>AEC-Q200:</strong> Automotive Electronics Council stress test qualification standard for passive components subjected to severe automotive temperature extremes (-55°C to +150°C).
            </li>
          </ul>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For complementary inductive impedance and LC resonance calculations, consult our <Link href="/calculators/electronics/inductor-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">inductor calculator</Link> and calculate RF tank frequencies in our <Link href="/calculators/electronics/frequency-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">frequency calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Mastering capacitive reactance and electrostatic energy storage enables engineers to design pristine low-noise power distribution networks, synthesize frequency filters, and optimize power conversion systems across modern electronic hardware.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Piezoelectric Acoustic Noise & Mechanical Stress in High-K MLCCs
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Modern high-capacitance multilayer ceramic capacitors (MLCCs) utilize barium titanate (BaTiO_3) ferroelectric ceramic formulations to achieve high relative permittivity ratings. However, barium titanate possesses strong piezoelectric and electrostrictive properties. When subjected to alternating AC ripple voltages—such as pulse-width modulated currents in smartphone audio circuits or switch-mode laptop power supplies—the ceramic dielectric physically expands and contracts at the ripple frequency.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            This microscopic mechanical vibration transfers into the underlying FR-4 printed circuit board laminate through solder fillets, turning the entire circuit board into an acoustic speaker that emits an audible hum or &lsquo;singing capacitor&rsquo; whine between 1 kHz and 15 kHz. Circuit designers resolve acoustic MLCC noise by deploying soft-termination capacitors with flexible polymer conductive terminations, placing opposing capacitors back-to-back to cancel mechanical forces, or substituting tantalum or film capacitors in sensitive audio signal paths.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Comprehensive impedance modeling ensures noise-immune power decoupling, optimal signal filtering, and long-term dielectric durability across demanding electronic systems.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            DC Bias Voltage Degradation in High-Density Class 2 MLCCs
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            One of the most insidious pitfalls in high-density surface-mount electronics design is the DC bias voltage characteristic of Class 2 ceramic capacitors (X5R, X7R, and Y5V dielectric formulations). Barium titanate ceramic dielectrics achieve ultra-high capacitance by packing millions of polar electric dipoles into microscopic grain structures.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            However, when a steady direct current bias voltage is applied across the capacitor plates, an increasing percentage of these electric dipoles become locked into alignment with the DC field, leaving fewer free dipoles available to respond to alternating AC ripple signals. In miniature 0402 or 0603 package footprints, applying 80% of rated voltage can collapse effective capacitance by 60% to 80%. A 10 µF decoupling capacitor may deliver an effective capacitance of only 2.2 µF in circuit, causing power supply instability unless properly upsized.
          </p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Self-Healing Metallized Film Capacitors in High-Voltage Snubbers
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In high-voltage power conversion (such as electric vehicle traction inverters and solar grid-tied inverters), metallized polypropylene film capacitors provide exceptional self-healing properties. Thin vacuum-deposited zinc-aluminum layers (tens of nanometers thick) serve as the conductive electrodes.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When an extreme over-voltage transient punctures the polymer dielectric, the localized short-circuit spark vaporizes the microscopic metal film surrounding the fault zone within microseconds. The localized metal evaporates, clearing the short circuit and restoring insulation integrity with only a fractional, imperceptible loss of total capacitance, preventing catastrophic component explosion.
          </p>



          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Transient Switching Performance & High-Frequency Power Decoupling
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In high-speed digital computing systems, microprocessors switch millions of logic gates concurrently, demanding rapid transient currents. Designers analyze exponential charging decay via our <Link href="/calculators/electronics/rc-time-constant-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">rc time constant calculator</Link> and evaluate total circuit wattage using our <Link href="/calculators/electronics/power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">power calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Placing multi-tier decoupling capacitor arrays (combining 100 nF, 1 µF, and 10 µF MLCCs in parallel) provides ultra-low power distribution impedance across broad frequency bands from 100 kHz to 500 MHz. This technique suppresses power rail voltage bounce, prevents digital clock jitter, and guarantees flawless data integrity across modern computing platforms.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Careful selection of dielectric formulations and equivalent series resistance ensures robust noise immunity and long-term durability in critical electronics.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Supercapacitor Electrochemical Double-Layer Energy Storage
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Electrochemical Double-Layer Capacitors (EDLCs), commonly termed supercapacitors or ultracapacitors, bridge the technological gap between conventional electrostatic capacitors and chemical batteries. Utilizing high-surface-area activated carbon electrodes immersed in organic electrolytes, EDLCs achieve capacitance values spanning hundreds to thousands of Farads within compact cylindrical packages.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because energy storage relies on electrostatic ion adsorption rather than slow chemical redox phase transitions, supercapacitors can charge and discharge at currents exceeding 500 Amperes with cycle lifespans surpassing one million charge-discharge cycles, making them ideal for kinetic energy regeneration in electric trains and hybrid utility grid pitch control.
          </p>

        </>
      }
    >
      <CapacitorCalculatorComponent />
    </CalcPage>
  );
}
