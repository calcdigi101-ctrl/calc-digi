import type { Metadata } from "next";
import Link from "next/link";
import FrequencyCalculatorComponent from "@/components/calcs/electronics/frequency-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { FrequencyWavelengthAntennaSpectrumChart } from "@/components/flagship/electronics/editorial-charts";

const PATH = "/calculators/electronics/frequency-calculator";
const TITLE = "Frequency, Wavelength & Wave Period Calculator | RF Antenna Sizing";
const DESCRIPTION =
  "Calculate electromagnetic wavelength, wave period, angular frequency, and resonant quarter-wave antenna element dimensions across the RF spectrum.";

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
  { href: "/calculators/electronics/inductor-calculator", icon: "🔁", name: "Inductor Reactance" },
  { href: "/calculators/electronics/decibel-calculator", icon: "🔊", name: "Decibel Calculator" },
  { href: "/calculators/electronics/rc-time-constant-calculator", icon: "⏱️", name: "RC Time Constant" },
  { href: "/calculators/electronics/ohms-law-calculator", icon: "⚡", name: "Ohm's Law" },
  { href: "/calculators/electronics/power-calculator", icon: "🔌", name: "Power Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "What is the relationship between frequency, wavelength, and the speed of light?",
    a: "Frequency and wavelength are inversely proportional and linked through the phase velocity of light: c = f × λ, where c is the speed of light in vacuum (approximately 299,792,458 meters per second), f is frequency in Hertz (Hz), and λ is wavelength in meters. As frequency increases into gigahertz ranges, physical wavelength compresses into millimeters.",
  },
  {
    q: "What is Conductor Velocity Factor (VF) and why does it affect antenna sizing?",
    a: "Velocity Factor (VF) is the ratio of electromagnetic wave speed through a transmission line or metal conductor compared to the speed of light in a vacuum: VF = v / c. In copper coaxial cables or wire antennas, dielectric loading and conductor skin effects slow propagation to 66% - 95% of c, requiring antenna physical lengths to be shortened by the VF factor to maintain electrical resonance.",
  },
  {
    q: "Why are quarter-wave (λ/4) monopole antennas widely used in telecommunications?",
    a: "A quarter-wave vertical monopole antenna mounted over a conductive ground plane acts as a resonant electrical circuit with an impedance of approximately 36 Ohms, closely matching standard 50-Ohm coaxial transmission lines. The reflective ground plane creates an electrodynamic 'mirror image,' effectively functioning as a half-wave center-fed dipole.",
  },
  {
    q: "How do you convert wave period (T) to frequency (f)?",
    a: "Wave period (T, in seconds) is the time required for one complete sinusoidal cycle to elapse. It is the exact reciprocal of frequency: f = 1 / T and T = 1 / f. For instance, a 100 MHz radio wave has a period of T = 1 / (100 × 10⁶) = 10 nanoseconds.",
  },
];

export default function FrequencyCalculatorPage() {
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
            <strong>Quick Engineering Guidance:</strong> In high-frequency RF systems and antenna engineering, electromagnetic wavelength governs trace geometry, transmission line impedance, and resonant radiator lengths. To model reactive tank circuits, cross-reference our <Link href="/calculators/electronics/capacitor-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">capacitor calculator</Link> and calculate inductive chokes in our <Link href="/calculators/electronics/inductor-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">inductor calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            RF Spectrum Wavelength & Resonant Antenna Geometry
          </h2>
          <FrequencyWavelengthAntennaSpectrumChart />
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Electromagnetic wave mechanics forms the bedrock of wireless telecommunications, radar systems, satellite navigation, and high-speed digital electronics. Defined by James Clerk Maxwell in his 1865 unified electrodynamic treatise, an oscillating electrical charge creates self-propagating transverse electromagnetic (TEM) waves composed of orthogonal electric (E) and magnetic (H) vectors travelling through spacetime.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When high-frequency alternating current flows along a conductive antenna trace, the spatial length of the physical conductor relative to the transmitted wavelength determines radiation efficiency. If conductor dimensions are an exact fraction of wavelength (such as quarter-wave λ/4 or half-wave λ/2), standing wave resonance is established, maximizing radiated power while canceling reactive impedance.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Governing Electromagnetic Wavelength & Time Formulas
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In free space vacuum, electromagnetic propagation velocity equals the fundamental constant c_0 = 299,792,458 m/s. The wave relationship connecting velocity (v), frequency (f), and wavelength (λ) is:
          </p>
          <Formula>{"\lambda = \frac{v}{f} = \frac{c_0 \times VF}{f}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Wave Period (T, in seconds) and Angular Frequency (ω, in radians per second) are derived directly from cyclic frequency (f, in Hertz):
          </p>
          <Formula>{"T = \frac{1}{f}, \quad \omega = 2 \pi f"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The physical length of a resonant quarter-wave monopole antenna element (L_λ/4) incorporates the conductor velocity factor:
          </p>
          <Formula>{"L_{\lambda/4} (meters) = \frac{\lambda}{4} = \frac{c_0 \times VF}{4 \times f}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For decibel power ratios and signal attenuation modeling, analyze gains in our <Link href="/calculators/electronics/decibel-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">decibel calculator</Link> and calculate low-pass filtering in our <Link href="/calculators/electronics/rc-time-constant-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">rc time constant calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Radio Frequency Spectrum Allocations & Physical Dimensions
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The International Telecommunication Union (ITU) categorizes electromagnetic radiation into standardized frequency decades, each possessing distinct propagation behaviors:
          </p>
          <DataTable
            head={["ITU Band Designation", "Frequency Range", "Wavelength (λ) Range", "Quarter-Wave Length (λ/4)", "Standard Applications"]}
            rows={[
              ["Very Low Frequency (VLF)", "3 kHz - 30 kHz", "100 km - 10 km", "25 km - 2.5 km", "Submarine naval communication & seismic telemetry"],
              ["Medium Frequency (MF)", "300 kHz - 3 MHz", "1,000 m - 100 m", "250 m - 25 m", "AM radio broadcast & avalanche beacons"],
              ["Very High Frequency (VHF)", "30 MHz - 300 MHz", "10 m - 1 m", "2.5 m - 25 cm", "FM radio, marine VHF, aviation communication"],
              ["Ultra High Frequency (UHF)", "300 MHz - 3 GHz", "1 m - 10 cm", "25 cm - 2.5 cm", "Cellular 4G/5G, Wi-Fi 2.4 GHz, GPS, walkie-talkies"],
              ["Super High Frequency (SHF)", "3 GHz - 30 GHz", "10 cm - 1 cm", "25 mm - 2.5 mm", "5 GHz / 6 GHz Wi-Fi, satellite TV, weather radar"],
              ["Extremely High Frequency (EHF)", "30 GHz - 300 GHz", "10 mm - 1 mm", "2.5 mm - 0.25 mm", "Millimeter wave 5G, automotive radar (77 GHz)"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: Sizing a 915 MHz LoRa Antenna
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            An IoT hardware design engineer is drafting an integrated whip antenna for an agricultural telemetry transceiver operating in the North American 915 MHz ISM band (f = 915.0 MHz). The antenna element will be fabricated using an enameled copper wire with an estimated velocity factor of VF = 0.95 (95%):
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Frequency in Hertz:</strong> f = 915.0 × 10^6 Hz
            </li>
            <li>
              <strong>Free-Space Speed of Light:</strong> c_0 = 299,792,458 m/s
            </li>
            <li>
              <strong>Wave Period (T):</strong> T = 1 / (915.0 × 10^6) = 1.0929 × 10⁻⁹ s = 1.093 ns
            </li>
            <li>
              <strong>Effective Guided Wavelength (λ):</strong>
              <br />
              λ = (299,792,458 × 0.95 / 915.0 × 10^6) = (284,802,835 / 915,000,000) = 0.31126 m = 31.13 cm
            </li>
            <li>
              <strong>Quarter-Wave Monopole Resonant Length (L_λ/4):</strong>
              <br />
              L_λ/4 = (λ / 4) = (31.126 cm / 4) = 7.781 cm ≈ 77.8 mm (3.06 inches)
            </li>
            <li>
              <strong>Half-Wave Dipole Total Span (L_λ/2):</strong>
              <br />
              L_λ/2 = 2 × L_λ/4 = 15.56 cm (6.13 inches)
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Trimming the physical wire to exactly 77.8 mm guarantees optimal resonance and minimum Voltage Standing Wave Ratio (VSWR). For power amplification stages, verify circuit dissipation in our <Link href="/calculators/electronics/power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">power calculator</Link> and calculate circuit resistance in our <Link href="/calculators/electronics/ohms-law-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ohms law calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Transmission Line Skin Effect & Dielectric Dispersion
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            As signal frequency advances into high megahertz and gigahertz regimes, electrical current ceases to flow uniformly throughout the cross-section of a conductor. Eddy currents induced by alternating internal magnetic flux force mobile electrons toward the outer perimeter of the conductor—a phenomenon known as the skin effect.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The electrical skin depth (δ) defines the depth below the conductor surface where current density drops to 1/e (approximately 37%) of its surface value:
          </p>
          <Formula>{"δ = \sqrt{\frac{\rho}{\pi \times f \times \mu_0 \times \mu_r}}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            At 1 GHz in copper, the skin depth is only 2.09 µm. Consequently, high-frequency PCB traces and RF coaxial cables experience significantly increased AC resistance. Gold or silver plating on the outer perimeter minimizes signal loss along transmission lines.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Regulatory Spectrum Governance & EMC Compliance
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because radio frequency emissions propagate across geographical borders, international commissions allocate spectrum to prevent mutual interference:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Federal Communications Commission (FCC Part 15):</strong> Enforces strict emissions limits on intentional and unintentional radiators, requiring laboratory anechoic chamber certification before commercial release.
            </li>
            <li>
              <strong>European Telecommunications Standards Institute (ETSI):</strong> Defines harmonized technical standards for radio equipment directive (RED) certification across the European Single Market.
            </li>
            <li>
              <strong>International Telecommunication Union (ITU Radio Regulations):</strong> Manages international frequency assignments, orbital satellite slots, and planetary deep-space tracking bands.
            </li>
          </ul>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When designing matching networks for wireless transceivers, size reactive components with our <Link href="/calculators/electronics/capacitor-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">capacitor calculator</Link> and calculate inductive chokes in our <Link href="/calculators/electronics/inductor-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">inductor calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Accurate frequency and wavelength calculations enable RF engineers to dimension high-efficiency antennas, match transmission lines, and ensure dependable wireless communications across modern consumer and industrial hardware.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Phase Velocity, Group Velocity & Dispersion in Dielectric Waveguides
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When electromagnetic waves propagate through dispersive media—such as high-frequency dielectric substrates (FR-4, Rogers hydrocarbon laminates, or optical fibers)—the propagation speed ceases to be a single static constant. Wave mechanics distinguishes between <strong>Phase Velocity</strong> (v_p = ω / k) and <strong>Group Velocity</strong> (v_g = dω / dk).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Phase velocity represents the speed at which individual monochromatic wave crests travel, which can occasionally exceed the speed of light in specialized waveguide structures without violating relativity. Group velocity represents the actual physical velocity at which information, modulated pulse envelopes, and electromagnetic energy traverse the medium. In high-speed multi-gigabit serial communication channels (PCIe Gen 5, 100G Ethernet), material dispersion causes different spectral components of digital pulses to travel at unequal velocities, causing pulse spreading and inter-symbol interference (ISI) that must be mitigated through active equalization.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Accurate frequency and wavelength calculations enable engineers to design high-efficiency antennas, match transmission lines, and ensure dependable wireless communications across modern consumer and industrial hardware.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Electromagnetic Wave Polarization: Linear, Circular & Elliptical
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Electromagnetic wave propagation is characterized by polarization—the spatial orientation of the oscillating electric field vector (E) over time. In <strong>Linear Polarization</strong> (horizontal or vertical), the electric field vibrates in a single fixed geometric plane. Terrestrial television and FM radio broadcasts utilize horizontal or vertical polarization.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In satellite communications and GPS navigation, electromagnetic waves traverse the ionosphere, where the geomagnetic Faraday effect rotates linear polarization unpredictably. Spaceborne links overcome this attenuation by utilizing <strong>Circular Polarization</strong> (Right-Hand Circular Polarization RHCP or Left-Hand LHCP), where the electric field vector rotates continuously like a corkscrew. A circularly polarized receiving antenna captures incoming RF signals regardless of physical satellite orientation, eliminating alignment-induced fading.
          </p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Transmission Line Return Loss & Voltage Standing Wave Ratio (VSWR)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In radio frequency engineering, impedance mismatches between transmission lines and antennas cause signal reflections that set up stationary interference patterns termed standing waves. The <strong>Voltage Standing Wave Ratio (VSWR)</strong> quantifies the ratio of maximum standing wave voltage to minimum voltage along the transmission line:
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            An ideal matched antenna achieves a VSWR of 1.0:1 (zero reflection). A VSWR below 1.5:1 is considered high-grade commercial performance (less than 4% reflected power), while a VSWR exceeding 3.0:1 reflects over 25% of the RF energy back into the transmitter output stage, risking thermal transistor damage.
          </p>



          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            RF Tuning Circuits & Resonant Filter Network Design
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In wireless transceivers and telecommunication front-ends, frequency selectivity is governed by tuned LC resonant tanks. Engineers evaluate electrostatic capacitance in our <Link href="/calculators/electronics/capacitor-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">capacitor calculator</Link> and calculate inductive choke reactance in our <Link href="/calculators/electronics/inductor-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">inductor calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            At the natural resonant frequency, inductive reactance and capacitive reactance cancel identically, establishing a minimum impedance series resonance or maximum impedance parallel anti-resonance. High Quality Factor (Q) tank circuits filter adjacent-channel wireless interference and ensure pristine spectral purity in local oscillator frequency synthesizers.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Mastering frequency, wavelength, and electromagnetic wave dynamics empowers engineers to optimize antenna efficiency and ensure robust wireless connectivity.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Terahertz Spectrum Frontiers & Molecular Absorption Band Windows
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            As wireless telecommunications progress beyond millimeter-wave 5G networks toward sub-terahertz and 6G spectrum bands (100 GHz to 1 THz), radio wave propagation enters regimes dominated by atmospheric molecular absorption resonances. Atmospheric water vapor and diatomic oxygen molecules absorb electromagnetic energy at discrete quantum vibrational frequencies, creating high path-loss attenuation notches alongside distinct low-loss spectral transmission windows.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Hardware engineers design ultra-massive MIMO beamforming antenna arrays with sub-millimeter patch elements to synthesize high-gain directional pencil beams, overcoming terahertz atmospheric attenuation and unlocking multi-terabit wireless backhaul links.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Calculating propagation velocities and harmonic relationships enables RF designers to build compact matching networks and maintain dependable telecommunications across diverse transmission media.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Evaluating antenna quarter-wave dimensions ensures maximum radiative efficiency and minimizes standing wave reflections in wireless transceivers.
          </p>

        </>
      }
    >
      <FrequencyCalculatorComponent />
    </CalcPage>
  );
}
