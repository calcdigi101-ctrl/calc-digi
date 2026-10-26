import type { Metadata } from "next";
import Link from "next/link";
import TemperatureConverterComponent from "@/components/calcs/measurements/temperature-converter";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { TemperatureThermodynamicScalesChart } from "@/components/flagship/measurements/editorial-charts";

const PATH = "/calculators/measurements/temperature-converter";
const TITLE = "Temperature Converter | Celsius, Fahrenheit & Kelvin Scales";
const DESCRIPTION =
  "Convert Celsius, Fahrenheit, Kelvin, and Rankine scales with thermodynamic zero-point derivations and interactive phase transition modeling.";

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
  { href: "/calculators/measurements/energy-converter", icon: "⚡", name: "Energy Converter" },
  { href: "/calculators/measurements/pressure-converter", icon: "⏱️", name: "Pressure Converter" },
  { href: "/calculators/measurements/volume-converter", icon: "🧪", name: "Volume Converter" },
  { href: "/calculators/physics/force-calculator", icon: "💥", name: "Force Calculator" },
  { href: "/calculators/measurements/length-converter", icon: "📏", name: "Length Converter" },
  { href: "/pages/measurements", icon: "🌡️", name: "Measurements Hub" },
];

const FAQ_ITEMS = [
  {
    q: "Why does the Fahrenheit scale have a 32-degree freezing offset?",
    a: "In 1724, physicist Daniel Gabriel Fahrenheit established 0°F as the stabilized temperature of an ice, water, and ammonium chloride brine mixture (the coldest achievable laboratory freezing mixture at the time). Pure water freezes at 32°F on this empirical scale and boils at 212°F, creating a 180-degree interval between phase changes.",
  },
  {
    q: "At what specific temperature do Celsius and Fahrenheit read identical numerical values?",
    a: "Celsius and Fahrenheit intersect at exactly -40° (-40°C = -40°F). Setting C = F in the conversion equation F = 1.8C + 32 yields x = 1.8x + 32, which algebraically resolves to -0.8x = 32, meaning x = -40°.",
  },
  {
    q: "What is the physical meaning of Absolute Zero (0 Kelvin)?",
    a: "Absolute Zero (0 K, -273.15°C, or -459.67°F) is the thermodynamic state where enthalpy and entropy of a cooled ideal gas reach their minimum theoretical values. At absolute zero, classical atomic kinetic motion ceases entirely, with matter retaining only quantum mechanical zero-point energy.",
  },
  {
    q: "Why is the degree symbol (°) omitted when reporting Kelvin temperatures?",
    a: "Under BIPM and SI conventions, Kelvin is an absolute thermodynamic unit of temperature measure rather than an arbitrary graduated scale. Temperatures in Kelvin are expressed simply as 'Kelvin' with the symbol K (e.g., 300 K, not 300°K), whereas relative empirical scales like Celsius (°C) and Fahrenheit (°F) retain the degree sign.",
  },
];

export default function TemperatureConverterPage() {
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
            <strong>Quick Thermodynamic Guidance:</strong> Temperature quantifies the average microscopic kinetic energy of atomic particles. In thermal physics and chemical process engineering, cross-reference our <Link href="/calculators/measurements/energy-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">energy converter</Link> for heat transfer wattage and analyze ideal gas parameters in our <Link href="/calculators/measurements/pressure-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">pressure converter</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Thermodynamic Foundations & Empirical Temperature Scales
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Unlike scalar physical quantities such as length, mass, or time—which are extensive properties that sum linearly when combining system subsystems—temperature is an intensive thermodynamic state variable. It does not depend on the quantity of matter in a vessel, but rather reflects the statistical distribution of microscopic thermal velocities among constituent atoms and molecules per Maxwell-Boltzmann statistics.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because early thermometer inventors lacked atomic theory, initial temperature scales were constructed empirically around convenient physical reference points, such as the freezing of salty brine, melting ice, and the human armpit. Today, thermodynamic temperature is anchored to the Boltzmann constant k_B, harmonizing laboratory cryogenic cryostats, HVAC environmental controls, and stellar astrophysics into a unified quantitative framework.
          </p>

          <TemperatureThermodynamicScalesChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Transformation Formulas Across Thermal Systems
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Transformations between temperature scales require both a multiplicative scaling factor (due to differing degree step intervals) and an additive linear offset (due to differing zero-point origins):
          </p>
          <Formula>{"T_{^\\circ\\text{F}} = \\left( T_{^\\circ\\text{C}} \\times \\frac{9}{5} \\right) + 32, \\quad T_{^\\circ\\text{C}} = \\left( T_{^\\circ\\text{F}} - 32 \\right) \\times \\frac{5}{9}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For thermodynamic engineering and gas law calculations (PV = nRT), temperatures must be expressed in absolute scales: Kelvin (for metric systems) or Rankine (for imperial engineering):
          </p>
          <Formula>{"T_{\\text{K}} = T_{^\\circ\\text{C}} + 273.15, \\quad T_{^\\circ\\text{R}} = T_{^\\circ\\text{F}} + 459.67 = T_{\\text{K}} \\times 1.8"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When calculating convective or radiative heat transfer rates, temperature differences directly determine thermodynamic work. You can evaluate thermal energy in our <Link href="/calculators/measurements/energy-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">energy converter</Link> and cross-reference volumetric fluid expansions in our <Link href="/calculators/measurements/volume-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">volume converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comprehensive Reference Benchmarks Across Physical Scales
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles critical thermodynamic state transitions across Kelvin, Celsius, Fahrenheit, and Rankine scales:
          </p>
          <DataTable
            head={["Thermodynamic Benchmark", "Kelvin (K)", "Celsius (°C)", "Fahrenheit (°F)", "Rankine (°R)"]}
            rows={[
              ["Absolute Zero (Ideal Gas Zero)", "0 K", "-273.15 °C", "-459.67 °F", "0 °R"],
              ["Liquid Nitrogen Boiling (1 atm)", "77.36 K", "-195.79 °C", "-320.42 °F", "139.25 °R"],
              ["Dry Ice Sublimation (CO2)", "194.65 K", "-78.50 °C", "-109.30 °F", "350.37 °R"],
              ["Water Freezing Point (1 atm)", "273.15 K", "0.00 °C", "32.00 °F", "491.67 °R"],
              ["Water Triple Point (BIPM Anchor)", "273.16 K", "0.01 °C", "32.018 °F", "491.688 °R"],
              ["Standard Ambient (ISO 1)", "293.15 K", "20.00 °C", "68.00 °F", "527.67 °R"],
              ["Human Core Body Temperature", "310.15 K", "37.00 °C", "98.60 °F", "558.27 °R"],
              ["Water Boiling Point (1 atm)", "373.15 K", "100.00 °C", "212.00 °F", "671.67 °R"],
              ["Lead Melting Point", "600.61 K", "327.46 °C", "621.43 °F", "1081.10 °R"],
              ["Surface of the Sun (Photosphere)", "5,778 K", "5,505 °C", "9,941 °F", "10,400 °R"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: Cryogenic Liquid Natural Gas Transport
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a maritime cryogenic engineer supervising the loading of a liquefied natural gas (LNG) carrier. The methane cargo must be chilled to atmospheric liquefaction temperature of -161.5°C. American port safety inspectors require temperature monitoring logs to be validated in degrees Fahrenheit (°F), while the boil-off vapor pressure equations require absolute Kelvin (K):
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Convert Celsius to Fahrenheit):</strong> Multiply by 1.8 and add 32: (-161.5 × 1.8) + 32 = -290.7 + 32 = -258.7°F.</li>
            <li><strong>Step 2 (Convert Celsius to Absolute Kelvin):</strong> Add 273.15: -161.5 + 273.15 = 111.65 K.</li>
            <li><strong>Step 3 (Rankine Verification):</strong> T_R = -258.7 + 459.67 = 200.97 °R. Verifying: 111.65 K × 1.8 = 200.97 °R, confirming thermal equivalence.</li>
            <li><strong>Step 4 (Boil-Off Vapor Pressure Modeling):</strong> Cargo tank pressure must remain strictly regulated; cross-reference allowable ullage pressures in our <Link href="/calculators/measurements/pressure-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">pressure converter</Link> and pipeline flow velocity in the <Link href="/calculators/measurements/speed-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">speed converter</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The 2019 SI Redefinition of the Kelvin via the Boltzmann Constant
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            From 1954 until May 2019, the Kelvin was defined by setting the triple point of water—the unique thermodynamic state where solid ice, liquid water, and water vapor coexist in stable equilibrium—to exactly 273.16 K (0.01°C). While elegant, this definition suffered from a fundamental flaw: the isotopic composition of water varies across planetary sources. Standard Mean Ocean Water (VSMOW) had to be carefully manufactured to control deuterium and oxygen-18 concentrations.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In 2019, the General Conference on Weights and Measures redefined the Kelvin by fixing the Boltzmann constant k_B to exactly 1.380649 × 10⁻²³ Joules per Kelvin (J·K⁻¹). This links thermal measurements directly to microscopic energy per degree of freedom, enabling primary thermometry using acoustic gas thermometers, Johnson noise thermometers, and Doppler broadening laser spectroscopy without relying on water samples.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Thermal Expansion and Invar Alloy Dimensional Stability
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Temperature fluctuations cause metallic components to expand and contract, posing significant challenges in precision optical instruments, aerospace satellite frames, and chronometer pendulums. In 1896, Swiss physicist Charles Édouard Guillaume discovered Invar (FeNi36), a nickel-iron alloy with an anomalously low coefficient of thermal expansion (α ≈ 1.2 × 10⁻⁶ K⁻¹ near room temperature, roughly one-tenth that of structural steel).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Understanding thermal coefficient shifts across temperature ranges prevents optical defocusing in space telescopes as they transition between orbital sunlight (+120°C) and orbital shadow (-100°C). You can evaluate structural dimensions using our <Link href="/calculators/measurements/length-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">length converter</Link> and calculate mass ballast in our <Link href="/calculators/measurements/weight-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">weight converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Industrial Thermometry: Thermocouples, RTDs & Infrared Pyrometry
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern manufacturing plants, automated process control relies on three primary sensor architectures:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Thermocouples (Seebeck Effect):</strong> Dissimilar metal junctions (e.g., Type K Chromel-Alumel) generate microvolt-level potential differences proportional to temperature gradients, operating across extreme ranges from -200°C to +1,350°C.</li>
            <li><strong>Resistance Temperature Detectors (RTDs):</strong> Platinum sensors (Pt100, Pt1000) exploit the highly linear positive temperature coefficient of platinum (0.385 Ω/°C) to achieve high measurement precision (±0.05°C) across -200°C to +850°C.</li>
            <li><strong>Optical & Infrared Pyrometers:</strong> Non-contact sensors measure Planck blackbody spectral radiance to calculate furnace and molten steel temperatures exceeding 2,000°C without sensor degradation.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Meteorology, Culinary Science & Building HVAC
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In daily life, converting temperatures is essential for international travel, weather tracking, and culinary preparation. While the United States utilizes Fahrenheit for domestic weather forecasts and oven settings (e.g., standard baking at 350°F corresponds to ~177°C or gas mark 4), the vast majority of the globe uses Celsius. In meteorology, relative humidity calculations require determining the dew point temperature, where water vapor begins condensing into dew or fog.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In energy-efficient building architecture, heating and cooling engineers calculate heating degree days (HDD) and cooling degree days (CDD) relative to a base temperature of 65°F (18.3°C) to optimize HVAC chiller sizing and insulation ratings. For academic modeling, students can evaluate statistical results in our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link> and track course metrics in our <Link href="/calculators/education/gpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">GPA calculator</Link>, or visit our comprehensive <Link href="/pages/measurements" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Measurements &amp; Conversions hub</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Cryogenic Superconductivity & Critical Transition Temperatures (Tc)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When certain conductive elements and ceramics are chilled below a characteristic critical temperature (T_c), their DC electrical resistivity vanishes abruptly to zero, a quantum macroscopic phenomenon first observed by Heike Kamerlingh Onnes in 1911 when cooling liquid mercury to 4.2 K. In modern medical magnetic resonance imaging (MRI) scanners and particle colliders such as CERN&apos;s Large Hadron Collider, niobium-titanium superconducting electromagnets are continuously bathed in liquid helium at 1.9 K to sustain electrical currents exceeding 12,000 Amperes without resistive Joule dissipation.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In 1986, the breakthrough discovery of cuprate &apos;high-temperature superconductors&apos; like Yttrium Barium Copper Oxide (YBCO, T_c = 93 K / -180.15°C) allowed superconductivity to be achieved using inexpensive liquid nitrogen (boiling point 77.36 K / -195.79°C). Accurately converting between Kelvin and Celsius is critical in cryogenic thermal modeling to prevent destructive magnet quenches, where localized heating above T_c converts supercurrent into sudden explosive boiling of liquid cryogens.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Stefan-Boltzmann Blackbody Radiation & Stellar Astrophysics
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In astrophysics and thermal radiative physics, every thermodynamic body with a temperature above absolute zero emits electromagnetic radiation. Josef Stefan and Ludwig Boltzmann established that the total radiant exitance j* of an idealized blackbody is directly proportional to the fourth power of its absolute thermodynamic temperature: j* = σ × T⁴, where σ is the Stefan-Boltzmann constant (5.670374419 × 10⁻⁸ W·m⁻²·K⁻⁴).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Crucially, this fourth-power relationship mandates the use of absolute temperature in Kelvin or Rankine. Attempting to evaluate thermal radiation using relative Celsius or Fahrenheit scales produces completely invalid mathematical results. For example, doubling a star&apos;s surface temperature from 3,000 K to 6,000 K multiplies its radiative energy output by a factor of 2⁴ = 16. Astronomers utilize Wien&apos;s displacement law (λ_max × T = 2.89777 × 10⁻³ m·K) to determine the surface temperatures of distant celestial bodies directly from their peak emission spectra.
          </p>

    
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In petrochemical refining and crude distillation towers, operating temperatures govern fractional boiling points between light naphtha, kerosene, diesel, and heavy bitumen. Maintaining precise fractionator temperature profiles prevents thermal cracking and ensures fuel flash points comply strictly with ASTM D93 safety specifications.
          </p>

    
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In pharmaceutical bioreactor cultivation and vaccine cold-chain distribution, ultra-low temperature freezers maintain mRNA therapeutics at -80°C (-112°F). Thermal mapping validations certified under WHO Good Distribution Practices ensure uniform temperature gradients, eliminating batch degradation from localized temperature excursions.
          </p>
        </>
      }
    >
      <TemperatureConverterComponent />
    </CalcPage>
  );
}
