import type { Metadata } from "next";
import Link from "next/link";
import DecibelCalculatorComponent from "@/components/calcs/electronics/decibel-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { DecibelLogarithmicRatioScalingChart } from "@/components/flagship/electronics/editorial-charts";

const PATH = "/calculators/electronics/decibel-calculator";
const TITLE = "Decibel (dB) Calculator | Power Gain, Voltage Ratio & dBm Scaling";
const DESCRIPTION =
  "Calculate decibel (dB) gain and attenuation, linear power and voltage multiplication ratios, and absolute RF power levels in dBm.";

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
  { href: "/calculators/electronics/frequency-calculator", icon: "📡", name: "Frequency Calculator" },
  { href: "/calculators/electronics/power-calculator", icon: "🔌", name: "Power Calculator" },
  { href: "/calculators/electronics/rc-time-constant-calculator", icon: "⏱️", name: "RC Time Constant" },
  { href: "/calculators/electronics/ohms-law-calculator", icon: "⚡", name: "Ohm's Law" },
  { href: "/calculators/electronics/voltage-divider-calculator", icon: "🔽", name: "Voltage Divider" },
  { href: "/calculators/electronics/capacitor-calculator", icon: "⚙️", name: "Capacitor Reactance" },
];

const FAQ_ITEMS = [
  {
    q: "Why do engineers use decibels (dB) instead of linear multiplication factors?",
    a: "Decibels express astronomical linear ratios on a manageable logarithmic scale, mirroring human sensory perception (such as the ear's logarithmic response to sound pressure). In multi-stage communications systems, cascading gains and attenuations are simply added and subtracted in decibels (Gain_total = G1 + G2 - Loss), eliminating tedious multiplication of large decimal fractions.",
  },
  {
    q: "What is the difference between the 10 log formula (Power) and the 20 log formula (Voltage)?",
    a: "Because electrical power scales with the square of voltage (P = V² / R), doubling voltage quadruples power: P2 / P1 = (V2 / V1)². When taking the logarithm, the exponent 2 moves outside as a multiplier: 10 × log10((V2 / V1)²) = 20 × log10(V2 / V1). Thus, power ratios use 10 log10 while voltage and field amplitude ratios use 20 log10.",
  },
  {
    q: "What does a negative decibel value (-3 dB, -6 dB, -20 dB) represent?",
    a: "A negative decibel value indicates signal attenuation or loss rather than gain. Exactly -3 dB in power represents a halving of power (50% power transfer, the standard filter half-power cutoff point). In voltage, -6 dB represents a halving of voltage amplitude (50%), while -20 dB represents a 90% power loss (10% remaining).",
  },
  {
    q: "What is dBm and how does it differ from a relative decibel (dB) value?",
    a: "While dB expresses a dimensionless relative ratio between two levels, dBm is an absolute unit of power referenced to exactly 1 milliwatt (1 mW): dBm = 10 × log10(Power in mW / 1 mW). For example, 0 dBm = 1 mW, +30 dBm = 1 Watt, and -30 dBm = 1 microwatt (0.001 mW).",
  },
];

export default function DecibelCalculatorPage() {
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
            <strong>Quick Engineering Guidance:</strong> Decibels compress dynamic signal ranges across radio frequency (RF), audio engineering, and telecommunications. To evaluate carrier frequencies, cross-reference our <Link href="/calculators/electronics/frequency-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">frequency calculator</Link> and calculate circuit wattage in our <Link href="/calculators/electronics/power-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">power calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Decibel (dB) Gain & Attenuation vs Linear Scaling Ratio
          </h2>
          <DecibelLogarithmicRatioScalingChart />
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Originating in the early 20th century at Bell Telephone Laboratories, the decibel (one-tenth of a Bel, named in honor of Alexander Graham Bell) was developed to quantify signal attenuation across transcontinental telephone lines. Because physical signals in acoustics, RF telecommunications, and optical fibers span orders of magnitude—from picowatts of receiver antenna noise to megawatts of broadcast transmission—linear multipliers become unwieldy.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The decibel logarithmic transformation compresses this vast dynamic range into intuitive numerical values. Furthermore, human sensory organs (both the cochlear auditory system and retinal photoreceptors) perceive stimulus intensity logarithmically, as formalized by the Weber-Fechner Psychophysical Law. A 10 dB power boost is perceived by the human ear as approximately twice as loud, regardless of baseline sound pressure.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Equations for Power & Voltage Decibels
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When comparing two electrical power quantities (P_1 and P_2), the decibel gain or loss (G_dB) is defined by the 10-log relationship:
          </p>
          <Formula>{"G_{dB} (Power) = 10 \log_{10}\left(\frac{P_2}{P_1}\right)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When comparing voltage (V_1, V_2) or current (I_1, I_2) amplitudes across identical circuit impedances (R_1 = R_2), the relationship becomes the 20-log formulation:
          </p>
          <Formula>{"G_{dB} (Voltage) = 20 \log_{10}\left(\frac{V_2}{V_1}\right)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The inverse equations convert decibels back to linear multiplying ratios:
          </p>
          <Formula>{"\frac{P_2}{P_1} = 10^{\frac{G_{dB}}{10}}, \quad \frac{V_2}{V_1} = 10^{\frac{G_{dB}}{20}}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To model low-pass passive filter attenuation curves, calculate RC network cutoffs in our <Link href="/calculators/electronics/rc-time-constant-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">rc time constant calculator</Link> and calculate sensor dividers in our <Link href="/calculators/electronics/voltage-divider-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">voltage divider calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Decibel Equivalence Reference Table (Power vs Voltage)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Standard decibel values translate into precise linear multiplication and fraction factors:
          </p>
          <DataTable
            head={["Decibel Value (dB)", "Linear Power Ratio (P2/P1)", "Linear Voltage Ratio (V2/V1)", "Physical Interpretation / Milestone"]}
            rows={[
              ["+40 dB", "10,000 ×", "100 ×", "High-gain RF power amplifier stage"],
              ["+30 dB", "1,000 ×", "31.62 ×", "One thousand-fold power magnification"],
              ["+20 dB", "100 ×", "10 ×", "Ten-fold voltage magnification / 100× power"],
              ["+10 dB", "10 ×", "3.162 ×", "Ten-fold power magnification"],
              ["+6 dB", "4.0 × (approx 3.98×)", "2.0 × (Double)", "Doubling of voltage amplitude"],
              ["+3 dB", "2.0 × (Double)", "1.414 × (√2)", "Doubling of electrical power"],
              ["0 dB", "1.0 × (Unity)", "1.0 × (Unity)", "No gain, no loss (Pass-through)"],
              ["-3 dB", "0.50 × (Half)", "0.707 × (1/√2)", "Half-power cutoff point (-3dB bandwidth)"],
              ["-6 dB", "0.25 × (Quarter)", "0.50 × (Half)", "Halving of voltage amplitude"],
              ["-10 dB", "0.10 × (One-tenth)", "0.316 ×", "90% power loss (10% passed)"],
              ["-20 dB", "0.01 × (One-hundredth)", "0.10 × (One-tenth)", "99% power loss / 10× voltage attenuation"],
              ["-40 dB", "0.0001 ×", "0.01 ×", "Extreme isolation / 99.99% attenuation"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: RF Transceiver Link Budget
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            An RF telecommunications engineer designs a wireless telemetry link operating between two remote mountain weather stations. The system components have the following decibel specifications:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Transmitter Power:</strong> +20.0 dBm (100 mW)
            </li>
            <li>
              <strong>Transmitter Coaxial Cable Loss:</strong> -1.5 dB
            </li>
            <li>
              <strong>Transmitting Yagi Antenna Gain:</strong> +12.0 dBi
            </li>
            <li>
              <strong>Free-Space Path Loss (FSPL over 10 km):</strong> -110.5 dB
            </li>
            <li>
              <strong>Receiving Yagi Antenna Gain:</strong> +12.0 dBi
            </li>
            <li>
              <strong>Receiver Cable Loss:</strong> -1.0 dB
            </li>
            <li>
              <strong>Calculated Received Signal Level (RSL):</strong>
              <br />
              RSL = +20.0 - 1.5 + 12.0 - 110.5 + 12.0 - 1.0 = -69.0 dBm
            </li>
            <li>
              <strong>Receiver Sensitivity Limit:</strong> The radio receiver requires a minimum sensitivity of -95.0 dBm for error-free packet reception.
            </li>
            <li>
              <strong>System Fade Margin:</strong> Fade Margin = -69.0 dBm - (-95.0 dBm) = +26.0 dB (Excellent margin against atmospheric rain fade)
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            By operating in decibels, link budget analysis requires simple addition and subtraction rather than multiplying tiny fractions. Carrier wavelengths can be verified in our <Link href="/calculators/electronics/frequency-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">frequency calculator</Link> and circuit resistance in our <Link href="/calculators/electronics/ohms-law-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ohms law calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Absolute Reference Decibel Units (dBm, dBu, dBV, dBi)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Appending a suffix letter converts relative decibels into absolute physical measurements:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>dBm (Milliwatts):</strong> Referenced to 1.0 mW into a 50-Ohm load (standard in RF engineering).
            </li>
            <li>
              <strong>dBu (Unterminated Audio):</strong> Referenced to 0.7746 V RMS (the voltage that dissipates 1 mW into a historic 600-Ohm audio telephone line).
            </li>
            <li>
              <strong>dBV (Volts):</strong> Referenced directly to 1.0 V RMS regardless of circuit impedance (common in digital audio workstations).
            </li>
            <li>
              <strong>dBi (Isotropic Radiator):</strong> Antenna gain relative to a theoretical isotropic antenna radiating uniformly in all spatial directions.
            </li>
          </ul>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For power transmission lines and cable drops, size conductor gauges in our <Link href="/calculators/electronics/wire-gauge-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">wire gauge calculator</Link> and calculate reactive circuit impedance in our <Link href="/calculators/electronics/capacitor-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">capacitor calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Mastering decibel logarithmic mathematics empowers hardware engineers to design low-noise analog signal chains, optimize wireless RF link budgets, and troubleshoot attenuation across telecommunications infrastructure.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Noise Figure (NF) & The Friis Formula for Cascaded Amplifier Chains
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In RF receiver front-end design (such as satellite earth stations, radar receivers, and cellular base stations), sensitivity is governed by the Noise Figure (NF, measured in decibels), which quantifies the degradation in Signal-to-Noise Ratio (SNR) caused by thermal noise generated within active components:
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            <Formula>{"NF (dB) = 10 \log_{10}\left( \frac{SNR_{in}}{SNR_{out}} \right)"}</Formula>
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When multiple active and passive stages (filters, attenuators, low-noise preamplifiers, mixers) are connected in series, the total cascaded noise factor (F_total) is governed by Harald Friis&apos;s cascaded noise formula:
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            <Formula>{"F_{total} = F_1 + \frac{F_2 - 1}{G_1} + \frac{F_3 - 1}{G_1 G_2} + \dots"}</Formula>
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            This formula reveals why the very first Low-Noise Amplifier (LNA) placed directly at the antenna feedhorn dominates overall receiver performance. The high linear gain (G_1) of the first stage divides and suppresses the noise contributions of all subsequent amplifier and mixer stages.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Mastering decibel logarithmic mathematics empowers hardware engineers to design low-noise analog signal chains, optimize wireless RF link budgets, and troubleshoot attenuation across telecommunications infrastructure.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Third-Order Intercept Point (IP3) & Intermodulation Distortion
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When multi-carrier signals pass through active RF power amplifiers and mixers, non-linearities in the semiconductor transfer function generate unwanted harmonic mixing products. The most destructive distortion components are <strong>Third-Order Intermodulation (IMD3)</strong> products (2f_1 - f_2 and 2f_2 - f_1), which fall directly inside the desired receiver communication passband and cannot be removed by filtering.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            RF engineers quantify amplifier linearity using the <strong>Third-Order Intercept Point (IP3)</strong>, expressed in decibels relative to one milliwatt (dBm). Because third-order distortion power grows at three times the rate of fundamental signal power (3 dB per 1 dB increase in fundamental input), the theoretical point where distortion power equals fundamental power defines IP3. A higher IP3 specification guarantees superior signal clarity and lower adjacent-channel interference in dense 5G cellular base stations.
          </p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The 1 dB Gain Compression Point (P1dB)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            As input signal power to an RF amplifier increases, active transistors eventually exhaust their DC power supply voltage headroom, causing gain to roll off from ideal linear amplification. The <strong>1 dB Compression Point (P1dB)</strong> defines the output power level at which amplifier gain has dropped by exactly 1.0 dB below its small-signal linear value. P1dB defines the upper boundary of linear operating dynamic range for telecommunications transmitters.
          </p>


          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Deploying decibel logarithmic budgeting across radio frequency signal chains streamlines gain calculations, simplifies complex transmission link modeling, and allows telecommunications engineers to pinpoint weak signal stages with high precision.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Understanding decibel power and voltage relationships enables seamless conversion between linear measurements and standardized logarithmic communication metrics across modern wireless and audio systems.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            RF Link Budgets & Frequency-Dependent Path Loss Modeling
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In wireless telecommunication systems, logarithmic decibel math is essential for computing wireless link budgets. Engineers evaluate carrier wavelength and radio spectrum bands with our <Link href="/calculators/electronics/frequency-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">frequency calculator</Link> and analyze filter step response via our <Link href="/calculators/electronics/rc-time-constant-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">rc time constant calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The Friis Free Space Path Loss equation expresses signal attenuation in decibels as a logarithmic function of distance and operating frequency. Factoring transmit power (dBm), antenna gain (dBi), and receiver sensitivity (dBm) enables telecommunications engineers to guarantee 99.999% link availability across microwave relay links and cellular networks.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Mastering decibel logarithmic mathematics empowers hardware engineers to design low-noise analog signal chains and optimize telecommunications infrastructure.
          </p>


          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Acoustic Weighting Curves (dBA, dBC) & Sound Pressure Level Measurement
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In acoustic engineering and environmental noise monitoring, raw physical sound pressure level (SPL) measurements do not correspond linearly to perceived human loudness. Human auditory perception exhibits varying sensitivity across audio frequencies, exhibiting peak sensitivity between 2 kHz and 5 kHz while rolling off significantly below 200 Hz.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To standardize acoustic noise assessments, international standards (IEC 61672) define specific frequency-weighting curves. A-Weighting (dBA) models the inverted equal-loudness Fletcher-Munson contour for moderate sound levels, heavily attenuating low-frequency rumble in compliance with OSHA workplace occupational safety standards. Conversely, C-Weighting (dBC) features a flatter frequency response designed for measuring high-intensity industrial impacts, structural explosions, and subwoofer acoustic entertainment performance.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Mastering acoustic decibel weighting allows environmental sound engineers to design noise-attenuating enclosures and ensure regulatory compliance.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Logarithmic scaling provides intuitive signal compression, allowing telecommunications engineers to budget receiver sensitivities and transmitter outputs across extensive link distances.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Auditing RF stage gains and noise figures ensures pristine signal-to-noise ratios and maximizes wireless data transmission rates in high-interference cellular environments.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Applying standardized decibel units unifies acoustic, electrical, and optical signal specifications across modern engineering disciplines.
          </p>

        </>
      }
    >
      <DecibelCalculatorComponent />
    </CalcPage>
  );
}
