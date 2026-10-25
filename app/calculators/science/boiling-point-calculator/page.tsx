import type { Metadata } from "next";
import Link from "next/link";
import BoilingPointCalculatorComponent from "@/components/calcs/science/boiling-point-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BoilingElevationPressureChart } from "@/components/flagship/science/editorial-charts";

const PATH = "/calculators/science/boiling-point-calculator";
const TITLE = "Boiling Point Calculator | Colligative Elevation & Clausius-Clapeyron Pressure Solver";
const DESCRIPTION =
  "Calculate colligative boiling point elevation, freezing point depression, and ambient barometric vapor pressure boiling shifts using ebullioscopic constants and Clausius-Clapeyron thermodynamics.";

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
  { href: "/calculators/science/concentration-calculator", icon: "⚗️", name: "Solution Concentration" },
  { href: "/calculators/science/molarity-calculator", icon: "🧪", name: "Molarity & Dilution" },
  { href: "/calculators/science/osmolarity-calculator", icon: "💧", name: "Osmolarity & Tonicity" },
  { href: "/calculators/science/specific-heat-calculator", icon: "🔥", name: "Specific Heat Capacity" },
  { href: "/calculators/science/ideal-gas-law-calculator", icon: "🎈", name: "Ideal Gas Law" },
  { href: "/calculators/weather/dew-point-calculator", icon: "🌦️", name: "Vapor Pressure & Dew Point" },
];

const FAQ_ITEMS = [
  {
    q: "Why does dissolving a non-volatile solute increase the boiling point of a solvent?",
    a: "When a non-volatile solute dissolves in a liquid solvent, solute molecules or ions occupy spatial positions across the liquid surface. This presence reduces the solvent's chemical potential and lowers its equilibrium vapor pressure according to Raoult's Law. Because boiling occurs only when vapor pressure equals external atmospheric pressure, the solution must be heated to a higher thermal kinetic energy to restore equilibrium, resulting in boiling point elevation.",
  },
  {
    q: "What is the van 't Hoff factor (i) and why is it essential in colligative calculations?",
    a: "The van 't Hoff factor (i) quantifies the stoichiometric number of discrete particles into which a solute dissociates upon dissolution in a solvent. For non-electrolytes like glucose or sucrose, i = 1 because molecules remain intact. For strong ionic electrolytes like sodium chloride (NaCl -> Na⁺ + Cl⁻), i approximates 2. For magnesium chloride (MgCl₂ -> Mg²⁺ + 2Cl⁻), i approximates 3. Real ionic solutions experience slight ion pairing, making effective experimental factors slightly below ideal integers.",
  },
  {
    q: "How does atmospheric barometric pressure alter the pure boiling point of water?",
    a: "Liquids boil when equilibrium vapor pressure matches ambient environmental pressure. At standard sea level (101.325 kPa), pure water boils at exactly 100.0 °C. At higher geographical elevations where barometric air pressure diminishes—such as Denver, Colorado at 84 kPa—water boils at roughly 94.7 °C. At the summit of Mount Everest (33.7 kPa), water boils at merely 71.4 °C, demonstrating that boiling temperature is a thermodynamic function of ambient pressure.",
  },
  {
    q: "What is the critical distinction between molality (m) and molarity (M) in colligative properties?",
    a: "Molarity (M) measures solute moles per liter of total solution, making it temperature-dependent due to volumetric thermal expansion and contraction. Molality (m) measures solute moles per kilogram of pure solvent. Because mass is an invariant scalar quantity that does not alter with thermal expansion, molality provides an invariable thermodynamic baseline across varying temperatures, making it mandatory for colligative elevation and depression formulations.",
  },
  {
    q: "Can ebullioscopy be utilized to determine the unknown molecular weight of an organic compound?",
    a: "Yes. By dissolving a measured gravimetric mass of an unknown pure organic solute into a known mass of solvent with an established ebullioscopic constant (Kb), measuring the temperature elevation (ΔTb) allows one to calculate molality: m = ΔTb / (i · Kb). Dividing solute grams by total moles derives the experimental molecular mass (g/mol), a foundational laboratory technique known as ebullioscopy.",
  },
  {
    q: "Why does ethylene glycol antifreeze raise the boiling point while simultaneously lowering the freezing point of radiator coolant?",
    a: "Ethylene glycol operates as a colligative solute in automotive cooling loops. Its dissolution lowers solvent chemical potential, which expands the liquid phase envelope in both thermodynamic directions. It prevents winter ice expansion by depressing the crystallization temperature below -35 °C while raising the coolant boiling threshold above 106 °C, preventing summer engine overheating and cavitation.",
  },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/science", label: "Science & Chemistry" }}
      title="Boiling Point Elevation & Colligative Properties Calculator"
      intro="Calculate colligative boiling point elevation, freezing point depression, and ambient vapor pressure boiling shifts across aqueous and organic solvents using ebullioscopic constants and Clausius-Clapeyron thermodynamics."
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
                IUPAC & NIST Physical Chemistry Standard
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Thermodynamic Colligative Modeling</span>
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
                  Quick Answer: How are boiling point elevation and ambient boiling shifts calculated?
                </strong>
                <p className="mt-1">
                  Colligative boiling point elevation is calculated using the ebullioscopic equation: &Delta;Tb = i &middot; Kb &middot; m, where i represents the solute van &apos;t Hoff dissociation factor, Kb is the solvent ebullioscopic constant (0.512 &deg;C&middot;kg/mol for water), and m is solute molality (moles solute per kg solvent). Under varying ambient barometric pressure P, pure solvent boiling temperature shifts according to the Clausius-Clapeyron relation. For complete laboratory solution preparation, determine solute molarity with our <Link href="/calculators/science/molarity-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">molarity calculator</Link>, audit mass percentages via the <Link href="/calculators/science/concentration-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">concentration calculator</Link>, or evaluate accompanying biological fluid tonicity using our <Link href="/calculators/science/osmolarity-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">osmolarity calculator</Link>.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - EDITORIAL CHART DIRECTLY BELOW */}
          <h2>Vapor Pressure Depression & Altitude Boiling Point Equilibrium</h2>
          <div className="not-prose my-6">
            <BoilingElevationPressureChart />
          </div>

          <p>
            Boiling point elevation represents one of the four foundational colligative properties of matter, which depend strictly upon the stoichiometric ratio of dissolved solute particles to solvent molecules rather than the chemical identity of the solute itself. In chemical processing, pharmaceutical crystallization, and culinary thermodynamics, accurately predicting the temperature at which liquid vapor pressure matches ambient environmental pressure is critical for process safety, energy efficiency, and yield optimization.
          </p>

          <p>
            When a non-volatile compound is introduced into a pure liquid matrix, the entropy of the liquid solution increases relative to the pure solvent phase. Consequently, a higher thermal kinetic energy is required to drive solvent molecules into the gaseous state. To quantify thermal transfer demands during phase changes, model enthalpy parameters using our <Link href="/calculators/science/specific-heat-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">specific heat calculator</Link> and correlate vapor behavior via the <Link href="/calculators/science/ideal-gas-law-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">ideal gas law calculator</Link>.
          </p>

          <h2>Thermodynamic Formulations & Ebullioscopic Derivations</h2>

          <p>
            The mathematical modeling of boiling elevation couples classical Raoultian vapor pressure depression with the differential form of the Clausius-Clapeyron equation:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Ebullioscopic Boiling Point Elevation Formula</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">&Delta;Tb = i &middot; Kb &middot; m</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates boiling temperature increase above pure solvent baseline at constant barometric pressure.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Cryoscopic Freezing Point Depression Formula</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">&Delta;Tf = i &middot; Kf &middot; m</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Quantifies liquid phase expansion via freezing crystallization threshold depression.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Clausius-Clapeyron Pressure-Temperature Equation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">ln(P₂ / P₁) = -(&Delta;Hvap / R) &middot; (1/T₂ - 1/T₁)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Governs pure solvent boiling temperature variation across non-standard atmospheric pressures.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. van &apos;t Hoff Factor Theoretical Formulation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">i = 1 + &alpha; &middot; (&nu; - 1)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates effective ionization particle count based on dissociation degree &alpha; and stoichiometric ions &nu;.</div>
          </Formula>

          <h2>Standard Ebullioscopic & Cryoscopic Solvent Constants</h2>

          <p>
            Different solvent matrices possess distinctive molar enthalpy values of vaporization and fusion, dictating their specific ebullioscopic (Kb) and cryoscopic (Kf) response constants:
          </p>

          <DataTable
            head={["Solvent System", "Normal BP (°C)", "Kb (°C·kg/mol)", "Normal FP (°C)", "Kf (°C·kg/mol)", "ΔHvap (kJ/mol)"]}
            rows={[
              ["Pure Water (H₂O)", "100.00", "0.512", "0.00", "1.86", "40.66"],
              ["Benzene (C₆H₆)", "80.10", "2.530", "5.50", "5.12", "30.72"],
              ["Ethanol (C₂H₅OH)", "78.37", "1.220", "-114.10", "1.99", "38.56"],
              ["Acetic Acid (CH₃COOH)", "117.90", "3.070", "16.60", "3.90", "23.70"],
              ["Chloroform (CHCl₃)", "61.20", "3.630", "-63.50", "4.68", "29.24"],
              ["Camphor (C₁₀H₁₆O)", "207.40", "5.610", "179.80", "39.70", "34.40"],
            ]}
          />


          <h2>Superheating Dynamics & Nucleation Boiling Kinetics</h2>

          <p>
            In clean laboratory glassware lacking microscopic surface asperities, pure liquids can be heated past their thermodynamic boiling point without phase transition, entering a metastable superheated state. Without physical nucleation sites, vapor bubble formation requires overcoming high liquid surface tension barriers: &Delta;G_crit = 16&pi;&gamma;&sup3; / [3(&Delta;P)&sup2;]. When superheated liquids abruptly nucleate, explosive violent boiling (termed &ldquo;bumping&rdquo;) occurs, ejecting corrosive chemicals from distillation flasks.
          </p>

          <p>
            To prevent dangerous superheating in laboratory reflux and rotary evaporators, chemists introduce chemically inert, porous boiling chips or PTFE magnetic stirrers. These media introduce trapped microscopic air pockets that serve as continuous nucleation seeds, maintaining smooth bubble disengagement. When designing vacuum distillation envelopes, monitor system pressures with our <Link href="/calculators/physics/pressure-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">pressure calculator</Link> and calculate thermodynamic heat inputs using the <Link href="/calculators/physics/work-energy-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">work energy calculator</Link>.
          </p>

          <h2>Ebullioscopic Molecular Weight Determination (Beckmann Method)</h2>

          <p>
            Before the widespread adoption of mass spectrometry, ebullioscopy served as the gold standard analytical method for determining unknown organic molecular weights. By dissolving a known mass of unknown solute w_solute into solvent mass W_solvent and recording elevated boiling temperature &Delta;Tb:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">5. Classical Ebullioscopic Molecular Weight Equation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">MW = (1000 &middot; Kb &middot; w_solute) / (&Delta;Tb &middot; W_solvent)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Derives experimental solute molecular mass in g/mol from differential boiling elevation.</div>
          </Formula>

          <p>
            Using a differential Beckmann thermometer capable of measuring micro-Kelvin temperature shifts (&plusmn;0.001 &deg;C), historical physical chemists characterized synthetic polymers, alkaloids, and petrochemical fractions. To cross-examine ebullioscopic molecular weights against theoretical elemental compositions, audit atomic weights with our <Link href="/calculators/science/molecular-weight-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">molecular weight calculator</Link> and evaluate gravimetric solution concentrations via the <Link href="/calculators/science/concentration-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">concentration calculator</Link>.
          </p>

          <h2>Comparative Operational Laboratory Worked Case Studies</h2>

          <h3>Case Study A: Hyper-Saline Ocean Brine Thermal Phase Analysis</h3>
          <p>
            A marine desalination facility processes concentrated ocean brine containing 117.0 grams of dissolved sodium chloride (NaCl, molar mass 58.44 g/mol) per 1.00 kilogram of pure water solvent at standard sea-level barometric pressure (101.325 kPa).
          </p>
          <ul>
            <li><strong>Solute Molality:</strong> m = (117.0 g &divide; 58.44 g/mol) &divide; 1.00 kg = 2.002 mol/kg.</li>
            <li><strong>van &apos;t Hoff Factor:</strong> Accounting for slight ionic association at high concentration, i = 1.90.</li>
            <li><strong>Boiling Point Elevation:</strong> &Delta;Tb = 1.90 &times; 0.512 &deg;C&middot;kg/mol &times; 2.002 mol/kg = +1.948 &deg;C.</li>
            <li><strong>Elevated Boiling Temperature:</strong> Tb = 100.00 &deg;C + 1.95 &deg;C = 101.95 &deg;C (375.10 K).</li>
            <li><strong>Depressed Freezing Point:</strong> &Delta;Tf = 1.90 &times; 1.86 &times; 2.002 = 7.075 &deg;C &rarr; Tf = -7.08 &deg;C.</li>
          </ul>

          <p>
            To cross-reference the corresponding volumetric density of this hyper-saline solution, evaluate displaced mass using our <Link href="/calculators/science/density-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">density calculator</Link> and compare chemical formula stoichiometry with the <Link href="/calculators/science/empirical-formula-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">empirical formula calculator</Link>.
          </p>

          <h3>Case Study B: High-Altitude Autoclave Sterilization in La Paz</h3>
          <p>
            A medical sterilization autoclave operates in La Paz, Bolivia, at a high terrestrial elevation of 3,640 meters where ambient barometric air pressure drops to 65.1 kPa. A biological research buffer solution containing 0.50 mol/kg of non-ionic sucrose (i = 1.00) is placed inside an open chamber.
          </p>
          <ul>
            <li><strong>Pure Water Boiling Point at 65.1 kPa:</strong> Solved via Clausius-Clapeyron equation yields Tb(pure) = 88.02 &deg;C.</li>
            <li><strong>Solute Boiling Elevation:</strong> &Delta;Tb = 1.00 &times; 0.512 &times; 0.50 = +0.256 &deg;C.</li>
            <li><strong>Observed Boiling Point:</strong> Final Tb = 88.02 &deg;C + 0.26 &deg;C = 88.28 &deg;C.</li>
            <li><strong>Sterilization Implication:</strong> Because water boils at 88.3 &deg;C instead of 100.0 &deg;C, an open vessel cannot reach the 121.0 &deg;C temperature mandated by pharmacopeia protocols for bacterial spore inactivation, requiring a sealed pressure vessel.</li>
          </ul>

          <h2>Operational Constraints & Environmental Boundary Conditions</h2>

          <p>
            While elementary colligative models assume idealized behavior, industrial and laboratory chemical engineering must account for four non-linear boundary constraints:
          </p>

          <ol>
            <li>
              <strong>Interionic Attraction & Debye-Hückel Screening:</strong> At concentrations exceeding 0.1 mol/kg, electrostatic attraction between solvated cations and anions produces temporary ion pairs, reducing the apparent van &apos;t Hoff factor i below theoretical integers.
            </li>
            <li>
              <strong>Non-Volatile Solute Assumption:</strong> Ebullioscopy strictly requires that the dissolved solute exhibits negligible vapor pressure. When volatile co-solvents like ethanol or acetone are present, vapor-liquid equilibrium (VLE) requires Raoultian partial pressure integration.
            </li>
            <li>
              <strong>Enthalpy Temperature Dependence:</strong> The latent heat of vaporization (&Delta;Hvap) is not constant across broad temperature excursions, requiring Kirchhoff thermochemical corrections when extrapolating over wide pressure differentials.
            </li>
            <li>
              <strong>Solubility Limits & Saturation Eutectics:</strong> Adding solute increases boiling point only until saturation solubility is reached. Beyond this threshold, additional solute precipitates out without further altering solution colligative properties.
            </li>
          </ol>

          <h2>Authoritative Thermodynamic & Metrological Standards</h2>

          <p>
            For rigorous chemical research and industrial distillation protocols, refer to international physical chemistry standards:
          </p>
          <ul>
            <li>
              <strong>IUPAC Compendium of Chemical Terminology (Gold Book):</strong> International Union of Pure and Applied Chemistry definitions for colligative properties, chemical potential, and activity coefficients.
            </li>
            <li>
              <strong>NIST Chemistry WebBook (SRD 69):</strong> Thermophysical property databases providing validated vapor pressure curves, critical constants, and enthalpy of vaporization data.
            </li>
            <li>
              <strong>ASTM E537-20:</strong> Standard Test Method for the Thermal Stability of Chemicals by Differential Scanning Calorimetry and Ebulliometry.
            </li>
            <li>
              <strong>BIPM SI Brochure (9th Edition):</strong> International Bureau of Weights and Measures specifications for thermodynamic temperature (Kelvin) and quantity of substance (mole).
            </li>
          </ul>
        </>
      }
    >
      <BoilingPointCalculatorComponent />
    </CalcPage>
  );
}
