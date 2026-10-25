import type { Metadata } from "next";
import Link from "next/link";
import WaveFrequencyCalculator from "@/components/calcs/physics/wave-frequency-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ElectromagneticSpectrumWavelengthChart } from "@/components/flagship/physics/editorial-charts";

const PATH = "/calculators/physics/wave-frequency-calculator";
const TITLE = "Wave Frequency & Wavelength Calculator | c = f·λ, Hertz & Photon Energy";
const DESCRIPTION =
  "Calculate wave frequency, electromagnetic wavelength (λ = v/f), wave periods, angular frequency, spatial wave numbers, and quantum photon energy across radio, light, and sound.";

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
  { href: "/calculators/physics/velocity-calculator", icon: "⚡", name: "Velocity Kinematics" },
  { href: "/calculators/physics/kinetic-energy-calculator", icon: "💥", name: "Kinetic Energy" },
  { href: "/calculators/physics/power-calculator", icon: "💡", name: "Mechanical & Electrical Power" },
  { href: "/calculators/physics/circular-motion-calculator", icon: "🔄", name: "Rotational Frequency & Period" },
  { href: "/calculators/engineering/torque-calculator", icon: "🏎️", name: "Engineering Torque" },
  { href: "/calculators/environment/air-quality-index-calculator", icon: "🌱", name: "Environmental Air Quality" },
];

const FAQ_ITEMS = [
  {
    q: "What is the physical definition and mathematical formula for wave frequency?",
    a: "Wave frequency (f) is the temporal rate of cyclical oscillation, measuring the number of complete wave cycles that pass a stationary spatial point per second. Formally defined in the International System of Units (SI) in Hertz (1 Hz = 1 cycle/second = 1 s⁻¹). Frequency correlates with wave propagation speed v and spatial wavelength λ via the fundamental wave equation: v = f · λ ⟹ f = v / λ.",
  },
  {
    q: "Why are wave frequency and wavelength inversely proportional?",
    a: "Because wave propagation velocity in a homogeneous linear medium is fixed by the physical properties of the medium (such as elasticity and density for sound, or permittivity and permeability for light: c = 1 / √(ε₀·μ₀)), the product of frequency and wavelength must remain constant: f · λ = constant. Multiplying oscillation frequency by ten compresses the spatial wavelength between crests to exactly one-tenth of its original length.",
  },
  {
    q: "How does Planck's Law connect electromagnetic frequency to quantum photon energy?",
    a: "In quantum electrodynamics, light behaves both as continuous classical waves and as discrete quantum wave packets (photons). According to Max Planck's quantum law: E = h · f = (h · c) / λ, where h is Planck's constant (6.62607015 × 10⁻³⁴ J·s) and f is frequency. Higher frequency radiation—such as ultraviolet light, X-rays, and gamma rays—carries immense quantum energy per photon (measured in electron-volts, eV), granting it sufficient energy to ionize biological DNA atoms.",
  },
  {
    q: "What is the difference between electromagnetic waves and mechanical acoustic waves?",
    a: "Electromagnetic waves (radio, microwaves, visible light, X-rays) consist of self-propagating oscillating electric and magnetic fields that require no physical medium, traveling through a pure vacuum at the cosmic speed limit c = 299,792,458 m/s. Mechanical waves (sound, ocean swells, seismic P/S waves) consist of physical oscillations of matter molecules and cannot travel through a vacuum, propagating through air at approximately 343 m/s at 20°C and through water at roughly 1,480 m/s.",
  },
  {
    q: "What is the Doppler effect and how does motion shift observed wave frequency?",
    a: "The Doppler effect is the perceived frequency shift observed when a wave source and an observer move relative to one another. When approaching, wave crests compress, shifting observed frequency upward (higher acoustic pitch, or optical blueshift: f' &gt; f). When receding, wave crests stretch apart, shifting observed frequency downward (lower pitch, or optical redshift). Astronomers utilize cosmological redshift to measure the accelerating expansion rate of the universe.",
  },
  {
    q: "How does refractive index alter wavelength when light transitions between media?",
    a: "When a light wave crosses an optical boundary from vacuum into a denser medium (such as water or crown glass), its temporal frequency f remains strictly unchanged because wave cycles cannot be created or destroyed at the boundary. However, the propagation speed decelerates: v = c / n, where n is the refractive index. According to λ = v / f, wavelength compresses inside the medium: λ_medium = λ_vacuum / n.",
  },
];

export default function WaveFrequencyCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/physics", label: "Physics" }}
      title="Wave Frequency & Wavelength Calculator"
      intro="Calculate wave frequency, electromagnetic wavelength (λ = v/f), wave periods, angular frequency, spatial wave numbers, and quantum photon energy across radio, light, and sound."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-2.5 py-0.5 font-medium text-purple-700 ring-1 ring-inset ring-purple-600/20 dark:bg-purple-950/40 dark:text-purple-400 dark:ring-purple-500/30">
                <svg className="size-3.5 shrink-0 text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                ISO 80000-3 & ITU Radio Wave Standard
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Quantum & Classical Wave Solver</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                Planck Quantum Energy Validated
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-purple-500/20 bg-purple-50/60 p-4 dark:border-purple-500/30 dark:bg-purple-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: How do you calculate wavelength and frequency?
                </strong>
                <p className="mt-1">
                  Wavelength and frequency are connected via wave speed: λ = v / f and f = v / λ. For light in a vacuum (c = 299,792,458 m/s), a standard Wi-Fi router operating at 2.40 GHz (2,400,000,000 Hz) emits microwave radiation with a wavelength of exactly 12.49 centimeters (124.9 mm) and an oscillation period of 0.417 nanoseconds. In acoustics, an audio tone at 440 Hz (Concert A) traveling through air at 343 m/s possesses an acoustic wavelength of 77.95 cm.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - CHART IMMEDIATELY BELOW */}
          <h2>Electromagnetic Spectrum Frequency Log Scale vs Quantum Photon Energy</h2>
          <div className="not-prose my-6">
            <ElectromagneticSpectrumWavelengthChart />
          </div>

          <p>
            Wave mechanics constitutes the unifying conceptual pillar connecting classical Newtonian physics, Maxwellian electromagnetism, acoustics, and quantum mechanics. From telecommunications radio carrier waves (5G, Wi-Fi, satellite GPS) and medical diagnostic ultrasound to optical fiber laser communications and high-energy particle astrophysics, calculating frequency, wavelength, and quantum energy transitions is fundamental across modern engineering disciplines.
          </p>

          <p>
            Standardized internationally under ISO 80000-3 and the International Telecommunication Union (ITU), frequency is measured in Hertz (1 Hz = 1 cycle/second). Because wave speed in a given medium is an invariant property of the physical medium, wavelength and frequency exist in permanent inverse proportionality: compressing wavelength invariably forces frequency to skyrocket, escalating quantum photon energy in direct proportion via Planck's constant (E = hf).
          </p>

          <h2>Foundational Wave Formulations & Quantum Relations</h2>

          <p>
            The mathematical architecture of wave mechanics links temporal periodicity, spatial wavelength, and quantum packet energy:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Fundamental Wave Propagation Equation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">v = f · λ   ⟹   λ = v / f   |   f = v / λ</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Relates wave velocity v (m/s), oscillation frequency f (Hz), and wavelength λ (m).</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Temporal Period & Angular Frequency</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">T = 1 / f   |   ω = 2π · f = 2π / T</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Converts frequency into cycle duration T (seconds) and angular velocity ω (rad/s).</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Spatial Wave Number</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">k = 2π / λ = ω / v</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Measures the spatial phase density of wave cycles per unit distance (rad/m).</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. Planck-Einstein Quantum Photon Energy</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">E = h · f = (h · c) / λ   (1 eV = 1.602 × 10⁻¹⁹ Joules)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Directly computes individual quantum packet energy using Planck's constant h.</div>
          </Formula>

          <h2>Electromagnetic Spectrum Bands Reference (ITU / IEEE)</h2>

          <p>
            The continuous electromagnetic spectrum spans over twenty orders of magnitude in frequency and wavelength:
          </p>

          <DataTable
            head={["Spectrum Band", "Frequency Range", "Wavelength (Vacuum)", "Photon Energy (eV)", "Primary Technological Application"]}
            rows={[
              ["Very Low Frequency (VLF)", "3 to 30 kHz", "100 km to 10 km", "12.4 to 124 peV", "Submarine naval communications"],
              ["Medium Wave (AM Radio)", "530 to 1700 kHz", "566 m to 176 m", "2.19 to 7.03 neV", "Commercial AM broadcast radio"],
              ["Very High Frequency (VHF)", "30 to 300 MHz", "10 m to 1 m", "124 to 1240 neV", "FM radio, aviation aircraft ATC"],
              ["Ultra High Frequency (UHF)", "300 MHz to 3 GHz", "1 m to 10 cm", "1.24 to 12.4 µeV", "Wi-Fi (2.4 GHz), 4G/5G cellular, GPS"],
              ["Super High Frequency (SHF)", "3 to 30 GHz", "10 cm to 1 cm", "12.4 to 124 µeV", "5 GHz Wi-Fi, satellite radar, weather"],
              ["Infrared Radiation", "300 GHz to 400 THz", "1 mm to 750 nm", "1.24 meV to 1.65 eV", "Fiber optic internet, thermal imaging"],
              ["Visible Light Spectrum", "400 to 790 THz", "750 nm to 380 nm", "1.65 to 3.26 eV", "Human vision, photosynthesis, lasers"],
              ["Medical Diagnostic X-Ray", "30 PHz to 30 EHz", "10 nm to 10 pm", "124 eV to 124 keV", "Medical bone radiography, CT scanning"],
            ]}
          />


          <h2>The Acoustic Doppler Effect for Moving Observers and Sources</h2>

          <p>
            When a source emitting periodic waves moves relative to an observer or listener, the perceived frequency shifts due to spatial wave compression or elongation along the line of motion. As an emergency ambulance approaches a stationary pedestrian, wavefronts compress ahead of the vehicle, raising perceived acoustic pitch. As it recedes, wavefronts stretch, lowering the pitch.
          </p>

          <p>
            Accounting for medium sound speed v, source velocity v_s, and observer velocity v_o:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">5. General Classical Doppler Frequency Shift Formula</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">f' = f₀ &middot; (v &plusmn; v_o) / (v &#8723; v_s)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates observed shifted frequency f' based on relative source and receiver velocities.</div>
          </Formula>

          <p>
            Radar speed detectors, echocardiography blood-flow velocimeters, and cosmological red-shift measurements of distant receding galaxies rely on this fundamental frequency alteration to measure relative motion with astronomical precision.
          </p>

          <h2>Photon Energy and Quantum Wave-Particle Duality</h2>

          <p>
            In quantum electrodynamics, electromagnetic waves exhibit dual particle-like behavior. Max Planck and Albert Einstein proved that light propagates in discrete localized packets of energy called photons, where individual photon energy E is strictly proportional to wave frequency f: E = h &middot; f = h &middot; c / &lambda;, where h = 6.62607015 &times; 10⁻³⁴ J&middot;s is Planck's constant. High-frequency cosmic gamma rays (10²⁰ Hz) carry millions of electron-volts capable of ionizing atomic electrons, whereas low-frequency FM radio waves (100 MHz) carry gentle 4.14 &times; 10⁻⁷ eV photons incapable of chemical bond disruption.
          </p>

          <h2>Comparative Operational Worked Case Studies</h2>

          <p>
            To examine practical wave frequency and wavelength calculations across acoustic and optical systems:
          </p>

          <h3>Case Study A: 2.4 GHz Wi-Fi Dual-Band Wireless Transmission</h3>
          <p>
            A commercial wireless router broadcasts a standard 802.11ax Wi-Fi carrier signal at frequency f = 2,400,000,000 Hz (2.40 GHz) traveling at the speed of light in air: v = c = 299,792,458 m/s.
          </p>
          <ul>
            <li><strong>Electromagnetic Wavelength:</strong> λ = c ÷ f = 299,792,458 m/s ÷ 2,400,000,000 Hz = 0.12491 meters (12.49 cm = 4.92 inches).</li>
            <li><strong>Oscillation Cycle Period:</strong> T = 1 ÷ (2.40 × 10⁹) = 4.167 × 10⁻¹⁰ seconds (0.4167 nanoseconds).</li>
            <li><strong>Angular Frequency:</strong> ω = 2π × (2.40 × 10⁹) = 1.508 × 10¹⁰ rad/s.</li>
            <li><strong>Quantum Photon Energy:</strong> E = (6.62607 × 10⁻³⁴ J·s) × (2.40 × 10⁹ Hz) = 1.590 × 10⁻²⁴ Joules = 9.925 micro-electronvolts (µeV). Note: Because 9.9 µeV is 100,000 times weaker than molecular chemical bonds (≈ 1 to 5 eV), Wi-Fi radiation is strictly non-ionizing.</li>
          </ul>

          <h3>Case Study B: Acoustic Concert Pitch Audio Tone (A4 = 440 Hz)</h3>
          <p>
            An orchestral tuning fork resonates at standard Concert Pitch A4: f = 440.0 Hz in ambient sea-level air at 20°C where acoustic sound speed is v = 343.0 m/s.
          </p>
          <ul>
            <li><strong>Acoustic Spatial Wavelength:</strong> λ = v ÷ f = 343.0 m/s ÷ 440.0 Hz = 0.7795 meters (77.95 cm = 30.69 inches).</li>
            <li><strong>Acoustic Wave Period:</strong> T = 1 ÷ 440.0 = 0.002273 seconds (2.273 milliseconds per wave cycle).</li>
            <li><strong>Spatial Wave Number:</strong> k = 2π ÷ 0.7795 m = 8.060 rad/m.</li>
            <li><strong>Medium Acoustic Transition:</strong> If this same 440 Hz acoustic wave penetrates into water (where sound speed jumps to v = 1,482 m/s), its frequency remains exactly 440.0 Hz, but its wavelength expands to: λ_water = 1,482 ÷ 440.0 = 3.368 meters.</li>
          </ul>

          <h2>Physical Boundaries & Electromagnetic Wave Dispersion</h2>

          <p>
            When modeling wave propagation across real physical media:
          </p>

          <ol>
            <li>
              <strong>Chromatic Dispersion in Optical Glass:</strong> The refractive index n(λ) varies with wavelength. In telecommunication fiber optics, shorter blue wavelengths travel slower than longer red wavelengths, broadening light pulses over hundreds of kilometers and requiring dispersion-shifted single-mode fiber cores.
            </li>
            <li>
              <strong>Atmospheric RF Absorption Windows:</strong> Atmospheric water vapor (H2O at 22 GHz) and oxygen molecules (O2 at 60 GHz) absorb microwave radiation via molecular resonance, dictating permissible satellite communications bands.
            </li>
            <li>
              <strong>Skin Depth Effect in Conductors:</strong> High-frequency alternating electromagnetic fields cannot penetrate deeply into metallic conductors: δ = √(1 / (π·f·μ·σ)). At 2.4 GHz, electrical current flows exclusively within the outermost 1.3 microns of a copper conductor's surface.
            </li>
          </ol>

          <h2>Authoritative International Standards & Wave Metrology</h2>

          <p>
            For verified frequency standards, telecommunications allocations, and quantum constants:
          </p>
          <ul>
            <li>
              <strong>ISO 80000-3:2019:</strong> International specifications for physical quantities and units of space, time, frequency, and wavelength.
            </li>
            <li>
              <strong>BIPM SI Brochure (9th Edition):</strong> Authoritative definitions of the second (based on cesium atomic clock transition at 9,192,631,770 Hz) and speed of light c.
            </li>
            <li>
              <strong>ITU Radio Regulations (Edition 2024):</strong> International Telecommunication Union spectrum allocation tables and technical emission standards.
            </li>
            <li>
              <strong>NIST Reference on Constants, Units, and Uncertainty:</strong> Exact fundamental physical constants including Planck's constant h = 6.62607015 × 10⁻³⁴ J·s.
            </li>
          </ul>
        </>
      }
    >
      <WaveFrequencyCalculator />
    </CalcPage>
  );
}
