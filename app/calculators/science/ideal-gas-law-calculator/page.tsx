import type { Metadata } from "next";
import Link from "next/link";
import IdealGasLawCalculatorComponent from "@/components/calcs/science/ideal-gas-law-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { IdealGasIsothermPVChart } from "@/components/flagship/science/editorial-charts";

const PATH = "/calculators/science/ideal-gas-law-calculator";
const TITLE = "Ideal Gas Law Calculator | PV=nRT Pressure, Volume & Molar Solver";
const DESCRIPTION =
  "Solve for pressure, volume, moles, or temperature using the Ideal Gas Law equation PV=nRT with gas density, molar volume, and van der Waals real gas corrections.";

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
  { href: "/calculators/science/boiling-point-calculator", icon: "🌡️", name: "Boiling Point & Vapor" },
  { href: "/calculators/science/density-calculator", icon: "⚖️", name: "Gas & Fluid Density" },
  { href: "/calculators/science/stoichiometry-calculator", icon: "🔬", name: "Stoichiometry & Gases" },
  { href: "/calculators/physics/pressure-calculator", icon: "📊", name: "Hydrostatic Pressure" },
  { href: "/calculators/science/molecular-weight-calculator", icon: "⚛️", name: "Molar Mass Solver" },
  { href: "/calculators/weather/dew-point-calculator", icon: "🌦️", name: "Barometric Dew Point" },
];

const FAQ_ITEMS = [
  {
    q: "What is the Ideal Gas Law equation and what does each variable signify?",
    a: "The Ideal Gas Law is expressed as P &middot; V = n &middot; R &middot; T, where P is gas absolute pressure (in Pascals or kilopascals), V is volume (in cubic meters or liters), n is amount of substance in moles, R is the universal gas constant (8.314462 J/(mol&middot;K) or 0.082057 L&middot;atm/(mol&middot;K)), and T is absolute temperature in Kelvin (T_K = T_C + 273.15).",
  },
  {
    q: "What is molar volume and what is its value at STP?",
    a: "Molar volume (Vm) is the volume occupied by exactly one mole of an ideal gas under specified temperature and pressure conditions: Vm = V / n = R &middot; T / P. Under IUPAC Standard Temperature and Pressure (STP: 0 &deg;C / 273.15 K and 100.0 kPa), the molar volume of an ideal gas equals exactly 22.711 Liters per mole. Under traditional standard conditions (0 &deg;C and 1.00 atm / 101.325 kPa), molar volume equals 22.414 L/mol.",
  },
  {
    q: "When does a real gas deviate significantly from ideal gas behavior?",
    a: "Real gases deviate from ideal behavior under two primary physical conditions: high pressure and low temperature. At high pressures, gas molecules are forced close together, making finite molecular volume non-negligible. At low temperatures, kinetic velocities drop, allowing intermolecular attractive forces (van der Waals dispersion and dipole forces) to pull molecules together, reducing measured pressure below ideal predictions.",
  },
  {
    q: "How does the van der Waals equation correct for real gas non-ideality?",
    a: "The van der Waals equation introduces two empirical constants: a, which corrects for intermolecular attractive forces by augmenting the pressure term [P + a(n/V)&sup2;], and b, which corrects for the finite physical volume occupied by gas molecules by subtracting excluded volume from total volume (V - n&middot;b): [P + a(n/V)&sup2;] &middot; (V - n&middot;b) = n &middot; R &middot; T.",
  },
  {
    q: "How do you calculate gas density directly from the Ideal Gas Law?",
    a: "Because moles equal mass divided by molar mass (n = m / MW), substituting into PV = nRT yields: P &middot; V = (m / MW) &middot; R &middot; T. Rearranging for density (&rho; = m / V) derives: &rho; = (P &middot; MW) / (R &middot; T). For ambient dry air (molar mass 28.97 g/mol) at 20 &deg;C and 101.325 kPa: &rho; = (101.325 &times; 28.97) / (8.3145 &times; 293.15) = 1.204 kg/m&sup3; (1.204 g/L).",
  },
  {
    q: "Why must temperature always be converted to absolute Kelvin in gas equations?",
    a: "Thermal gas pressure and molecular kinetic energy are directly proportional to absolute thermal velocity, which ceases entirely only at absolute zero (-273.15 &deg;C or 0 Kelvin). Utilizing Celsius or Fahrenheit scales would result in mathematically impossible negative volumes or negative pressures, violating physical thermodynamics.",
  },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/science", label: "Science & Chemistry" }}
      title="Ideal Gas Law PV=nRT & Molar Volume Calculator"
      intro="Solve for pressure, volume, gas substance amount, or absolute temperature using the Ideal Gas Law equation PV=nRT with gas density, root-mean-square kinetic velocity, and van der Waals real gas corrections."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
                <svg className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                IUPAC & NIST Physical Gas Dynamics Standard
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Thermodynamic Equation of State</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                Validated Analytical Solver
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-emerald-500/20 bg-emerald-50/60 p-4 dark:border-emerald-500/30 dark:bg-emerald-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: What is the Ideal Gas Law equation and how are gas state variables solved?
                </strong>
                <p className="mt-1">
                  The Ideal Gas Law equation connects state variables via P &middot; V = n &middot; R &middot; T, where P is pressure (kPa), V is volume (Liters), n is substance amount (moles), R is the universal gas constant (8.314462 kPa&middot;L/(mol&middot;K)), and T is absolute temperature (Kelvin). Any single variable can be solved when the remaining three are known. For atmospheric phase transitions, calculate liquid boiling points with our <Link href="/calculators/science/boiling-point-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">boiling point calculator</Link>, audit volumetric fluid densities using the <Link href="/calculators/science/density-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">density calculator</Link>, or examine hydrostatic pressure distributions via our <Link href="/calculators/physics/pressure-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">pressure calculator</Link>.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - EDITORIAL CHART DIRECTLY BELOW */}
          <h2>Boyle's Law Hyperbolic Isotherms Across Thermodynamic Temperatures</h2>
          <div className="not-prose my-6">
            <IdealGasIsothermPVChart />
          </div>

          <p>
            The Ideal Gas Law represents the unifying equation of state linking four classical empirical gas principles discovered over three centuries: Boyle&apos;s Law (P &prop; 1/V at constant temperature), Charles&apos;s Law (V &prop; T at constant pressure), Gay-Lussac&apos;s Law (P &prop; T at constant volume), and Avogadro&apos;s Hypothesis (V &prop; n at identical temperature and pressure).
          </p>

          <p>
            In chemical engineering, respiratory medicine, combustion dynamics, and high-altitude aeronautics, the Ideal Gas Law provides the foundation for sizing compressed gas cylinders, predicting atmospheric buoyancy, and modeling gaseous chemical synthesis. When determining stoichiometric gas reactant consumption in industrial reactors, cross-reference gas volumes with our <Link href="/calculators/science/stoichiometry-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">stoichiometry calculator</Link> and calculate molar masses via the <Link href="/calculators/science/molecular-weight-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">molecular weight calculator</Link>.
          </p>

          <h2>Thermodynamic State Equations & Mathematical Derivations</h2>

          <p>
            The mathematical formulation of ideal gas thermodynamics couples the macroscopic equation of state with microscopic kinetic molecular theory:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Ideal Gas Law Equation of State</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">P &middot; V = n &middot; R &middot; T</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Universal thermodynamic relationship between pressure, volume, moles, and temperature.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Gas Volumetric Mass Density Formulation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">&rho; = (P &middot; MW) / (R &middot; T)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates gaseous mass density in g/L (kg/m³) directly from pressure, molar mass, and temperature.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Root-Mean-Square Molecular Velocity</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">v_rms = &radic;[(3 &middot; R &middot; T) / M_kg]</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Quantifies average thermal kinetic velocity of gas molecules in meters per second.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. van der Waals Real Gas Correction Equation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">[P + a &middot; (n / V)&sup2;] &middot; (V - n &middot; b) = n &middot; R &middot; T</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Empirical equation accounting for molecular attraction (a) and excluded molecular volume (b).</div>
          </Formula>

          <h2>Universal Gas Constant (R) Reference Values Across Units</h2>

          <p>
            The numerical value of the universal gas constant R depends strictly upon the physical measurement units selected for pressure, volume, and energy:
          </p>

          <DataTable
            head={["Numerical Value", "Units of R", "Pressure Unit", "Volume Unit", "Primary Application"]}
            rows={[
              ["8.314462", "J / (mol · K)", "Pascals (N/m²)", "Cubic Meters (m³)", "Standard SI Thermodynamics"],
              ["8.314462", "kPa · L / (mol · K)", "Kilopascals (kPa)", "Liters (L)", "Chemical Laboratory Systems"],
              ["0.082057", "L · atm / (mol · K)", "Atmospheres (atm)", "Liters (L)", "Traditional Analytical Chemistry"],
              ["62.36367", "L · mmHg / (mol · K)", "Millimeters Mercury (Torr)", "Liters (L)", "Manometer & Barometric Vacuum"],
              ["1.987204", "cal / (mol · K)", "N/A (Energy)", "N/A (Energy)", "Thermochemical Enthalpy Cycles"],
              ["10.73159", "psi · ft³ / (lbmol · °R)", "Pounds/Sq Inch (psi)", "Cubic Feet (ft³)", "Imperial Petroleum Engineering"],
            ]}
          />

          <h2>Comparative Operational Laboratory Worked Case Studies</h2>

          <h3>Case Study A: Industrial Medical Oxygen Cylinder Storage Sizing</h3>
          <p>
            A hospital respiratory therapy department purchases a high-pressure steel cylinder containing medical oxygen gas (O₂, molar mass 32.00 g/mol). The cylinder has internal geometric volume V = 40.0 Liters and is filled to a gauge pressure of 15,000 kPa (150 bar) at ambient warehouse temperature T = 20.0 &deg;C.
          </p>
          <ul>
            <li><strong>Absolute Temperature:</strong> T = 20.0 &deg;C + 273.15 = 293.15 Kelvin.</li>
            <li><strong>Gas Amount in Moles:</strong> n = (P &middot; V) &divide; (R &middot; T) = (15,000 kPa &times; 40.0 L) &divide; (8.3145 &times; 293.15 K) = 246.15 moles O₂.</li>
            <li><strong>Stored Oxygen Mass:</strong> mass = 246.15 mol &times; 32.00 g/mol = 7,876.8 grams (7.877 kg O₂).</li>
            <li><strong>Expanded Atmospheric Volume at 101.3 kPa:</strong> V_delivered = (246.15 &times; 8.3145 &times; 293.15) &divide; 101.325 = 5,921.5 Liters (5.92 m³) of therapeutic oxygen gas.</li>
          </ul>

          <p>
            To evaluate mechanical wall stress and fluid pressure within compressed vessels, model structural load distributions using our <Link href="/calculators/physics/force-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">force calculator</Link> and calculate thermodynamic thermal capacities with the <Link href="/calculators/science/specific-heat-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">specific heat calculator</Link>.
          </p>

          <h3>Case Study B: High-Altitude Meteorological Sounding Balloon Ascent</h3>
          <p>
            A latex weather research balloon is launched containing 100.0 moles of helium gas (He, molar mass 4.003 g/mol). At ground release (101.3 kPa, 25 &deg;C), ground volume is V = (100 &times; 8.3145 &times; 298.15) &divide; 101.325 = 2,446.5 Liters (2.45 m³). The balloon ascends to the stratosphere at 32 km altitude where ambient pressure plummets to 1.10 kPa and temperature drops to -50.0 &deg;C (223.15 K).
          </p>
          <ul>
            <li><strong>Stratospheric Volume:</strong> V_high = (100 &times; 8.3145 &times; 223.15 K) &divide; 1.10 kPa = 168,667 Liters (168.7 m³).</li>
            <li><strong>Volumetric Expansion Factor:</strong> 168.7 m³ &divide; 2.45 m³ = 68.9-fold expansion.</li>
            <li><strong>Stratospheric Gas Density:</strong> &rho; = (1.10 &times; 4.003) &divide; (8.3145 &times; 223.15) = 0.00237 g/L (0.00237 kg/m³).</li>
          </ul>

          <h2>Operational Constraints & Real Gas Boundary Conditions</h2>

          <p>
            While the Ideal Gas Law provides excellent accuracy for air and noble gases at ambient conditions, chemical process engineering must account for four non-ideal physical phenomena:
          </p>

          <ol>
            <li>
              <strong>Compressibility Factor (Z) Departure:</strong> Real gas behavior is quantified by the compressibility factor Z = (P&middot;V) / (n&middot;R&middot;T). For an ideal gas, Z = 1.00 at all pressures. At extreme industrial pressures (such as ammonia synthesis at 300 bar), Z can exceed 1.50, meaning real gases occupy up to 50% more volume than predicted by PV=nRT.
            </li>
            <li>
              <strong>Joule-Thomson Throttling & Liquefaction:</strong> Real gases expanding through an insulated throttling valve experience a temperature change (Joule-Thomson coefficient &mu;_JT = (&part;T/&part;P)_H). Above the inversion temperature, gases warm upon expansion; below it, they cool, a thermodynamic phenomenon utilized in industrial air liquefaction.
            </li>
            <li>
              <strong>Vapor Condensation & Dew Point Caps:</strong> The Ideal Gas Law breaks down completely as a vapor approaches its dew point curve. Near condensation thresholds, intermolecular attractions dominate, causing rapid collapse into the liquid state.
            </li>
            <li>
              <strong>High-Temperature Thermal Dissociation:</strong> At extreme hypersonic temperatures (&gt; 2,500 K), diatomic gas molecules (such as N₂ and O₂) dissociate into reactive atomic radicals, altering the effective mole count n in the gas matrix.
            </li>
          </ol>


          <h2>High-Pressure Compressibility Factor & Industrial Chemical Reactor Thermodynamics</h2>
          <p>
            In industrial chemical synthesis—exemplified by Haber-Bosch ammonia synthesis operating at 200 atm and
            450 °C—macroscopic gas deviations from ideality are mathematically characterized by the dimensionless
            compressibility factor Z:
          </p>
          <Formula>
            {"Z = (P * V_m) / (R * T) = 1 + B'(T) * P + C'(T) * P^2 + ..."}
          </Formula>
          <p>
            When Z drops below 1.0, attractive intermolecular forces dominate, reducing actual pressure compared to ideal gas
            predictions. At extreme pressures exceeding 300 atm, finite molecular core volumes dominate, causing Z to exceed 1.0.
            Chemical process engineers combine ideal gas state equations with
            {" "}<Link href="/calculators/science/density-calculator">gas density modeling</Link>{" "}
            to design high-pressure containment vessels, compute
            {" "}<Link href="/calculators/science/specific-heat-calculator">specific heat capacity ratios</Link>{" "}
            across multistage gas compressors, and calibrate
            {" "}<Link href="/calculators/science/stoichiometry-calculator">stoichiometric volumetric feed rates</Link>{" "}
            to ensure optimal reactor throughput without risking dangerous thermal pressure excursion events.
          </p>

          <h2>Authoritative Thermodynamic & Metrological Standards</h2>

          <p>
            For certified thermophysical gas properties and equation of state calculations, refer to national and international metrology bodies:
          </p>
          <ul>
            <li>
              <strong>CODATA Recommended Values of the Fundamental Physical Constants (2022):</strong> Established the exact numerical value of the universal molar gas constant R = 8.314 462 618... J/(mol&middot;K).
            </li>
            <li>
              <strong>NIST Reference Fluid Thermodynamic and Transport Properties (REFPROP):</strong> Standard industry database for real gas compressibility, viscosity, and enthalpy equations.
            </li>
            <li>
              <strong>ISO 13443:1996:</strong> Natural gas &mdash; Standard reference conditions for volumetric measurement.
            </li>
            <li>
              <strong>IUPAC Compendium of Analytical Nomenclature:</strong> Definitive standards for expressing molar quantities and pressure units.
            </li>
          </ul>
        </>
      }
    >
      <IdealGasLawCalculatorComponent />
    </CalcPage>
  );
}
