import type { Metadata } from "next";
import Link from "next/link";
import ConcentrationCalculatorComponent from "@/components/calcs/science/concentration-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ConcentrationPpmMolarityScaleChart } from "@/components/flagship/science/editorial-charts";

const PATH = "/calculators/science/concentration-calculator";
const TITLE = "Concentration Calculator | Molarity, PPM, Mass Percent & Dilution Converter";
const DESCRIPTION =
  "Convert and calculate solution concentration metrics including molarity, parts per million (PPM), mass percent (% w/w), volume percent, and grams per liter with volumetric density corrections.";

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
  { href: "/calculators/science/molarity-calculator", icon: "🧪", name: "Molarity & Dilution" },
  { href: "/calculators/science/density-calculator", icon: "⚖️", name: "Material Density & SG" },
  { href: "/calculators/science/osmolarity-calculator", icon: "💧", name: "Osmolarity & Tonicity" },
  { href: "/calculators/science/boiling-point-calculator", icon: "🌡️", name: "Boiling Point Elevation" },
  { href: "/calculators/science/buffer-calculator", icon: "⚗️", name: "Henderson Buffer Solver" },
  { href: "/calculators/science/stoichiometry-calculator", icon: "🔬", name: "Stoichiometric Reactions" },
];

const FAQ_ITEMS = [
  {
    q: "What is the primary difference between molarity (M) and mass concentration (g/L)?",
    a: "Mass concentration measures the absolute gravimetric weight of solute dissolved per unit volume of solution (grams per liter). In contrast, molarity (M) measures the stoichiometric number of dissolved chemical moles per liter of solution (moles per liter). While 58.44 g/L of NaCl yields a 1.00 M solution, 58.44 g/L of glucose (molar mass 180.16 g/mol) yields merely a 0.324 M solution due to molecular mass disparities.",
  },
  {
    q: "How do you convert between parts per million (PPM) and molarity (M)?",
    a: "Parts per million (PPM) is defined as milligrams of solute per kilogram of solution. In dilute aqueous solutions where density approximates 1.00 kg/L (1.00 g/mL), 1 PPM equals 1 mg/L. To convert from PPM to molarity: Molarity (M) = (PPM / 1000) / Molar Mass (g/mol). For example, 58.44 PPM of NaCl in water equals 0.05844 g/L / 58.44 g/mol = 0.0010 M (1.0 mM).",
  },
  {
    q: "What is the critical distinction between % w/w (weight/weight) and % w/v (weight/volume)?",
    a: "% w/w represents the mass fraction of solute relative to total solution mass: (mass_solute / mass_solution) &times; 100. % w/v represents solute mass in grams relative to total solution volume in milliliters: (mass_solute in g / volume in mL) &times; 100. For dilute water solutions where 1 mL weighs 1 g, they are approximately identical. For dense fluids like concentrated sulfuric acid (density 1.84 g/mL), % w/w and % w/v diverge significantly.",
  },
  {
    q: "Why is solution density required when converting molarity to molality?",
    a: "Molarity is defined relative to total solution volume, whereas molality is defined relative to pure solvent mass. Solution mass equals volume multiplied by solution density. Subtracting solute mass from total solution mass gives pure solvent mass. Without knowing solution density, one cannot calculate the exact mass of solvent present in a given volume of solution.",
  },
  {
    q: "What does parts per billion (PPB) represent in environmental toxicology?",
    a: "Parts per billion (PPB) represents one microgram (&mu;g) of solute per kilogram of solution, or 1 &mu;g/L in dilute aqueous water. Regulatory agencies like the US EPA set maximum contaminant levels (MCL) for toxic heavy metals like lead (15 ppb) and arsenic (10 ppb) in municipal drinking water, requiring sensitive trace analytical instrumentation like ICP-MS.",
  },
  {
    q: "How does temperature affect different concentration units?",
    a: "Concentration units based on volume—such as molarity (mol/L), normality (eq/L), and % w/v—fluctuate with temperature because liquids expand upon heating and contract upon cooling. In contrast, mass-based units—including molality (mol/kg), % w/w, and true mass fraction—remain perfectly invariant across temperature excursions, making them standard for high-precision physical chemistry.",
  },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/science", label: "Science & Chemistry" }}
      title="Solution Concentration & Molarity Converter"
      intro="Convert and calculate solution concentration parameters including molarity, parts per million (PPM), mass percent (% w/w), volume percent, and molality with density-corrected volumetric conversions."
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
                IUPAC & EPA Analytical Chemistry Standards
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Gravimetric & Volumetric Metrology</span>
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
                  Quick Answer: How are solution concentration, molarity, and PPM calculated?
                </strong>
                <p className="mt-1">
                  Molar concentration is calculated by dividing solute moles by solution volume in liters: M = (mass_g / MW) / Volume_L. Mass percent is calculated by dividing solute mass by total solution mass: % w/w = (mass_solute / mass_solution) &times; 100. In dilute aqueous solutions, parts per million equals milligrams of solute per liter of water: 1 PPM = 1 mg/L. To execute volumetric dilutions, solve M₁V₁ = M₂V₂ with our <Link href="/calculators/science/molarity-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">molarity calculator</Link>, audit solvent density using the <Link href="/calculators/science/density-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">density calculator</Link>, or examine biological fluid tonicity via our <Link href="/calculators/science/osmolarity-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">osmolarity calculator</Link>.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - EDITORIAL CHART DIRECTLY BELOW */}
          <h2>Aqueous Concentration Scales Across Toxicology & Biochemistry</h2>
          <div className="not-prose my-6">
            <ConcentrationPpmMolarityScaleChart />
          </div>

          <p>
            Solution concentration governs chemical kinetics, thermodynamic equilibria, and toxicological thresholds. From evaluating trace heavy metal contaminants in municipal drinking water at the parts-per-billion (PPB) level to preparing concentrated industrial pickling acids at molar scales, precise conversion across volumetric and gravimetric units is fundamental to analytical accuracy.
          </p>

          <p>
            Different scientific disciplines favor distinct concentration metrics. Clinical medicine and pharmacology rely heavily on weight/volume percentages (% w/v) and milliequivalents for intravenous solutions, synthetic chemistry utilizes molarity (M) and stoichiometry, while environmental engineering measures pollutants in PPM and PPB. When calculating reaction yields from known concentrations, cross-reference reactant stoichiometry with our <Link href="/calculators/science/stoichiometry-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">stoichiometry calculator</Link> and determine molecular empirical formulas via the <Link href="/calculators/science/empirical-formula-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">empirical formula calculator</Link>.
          </p>

          <h2>Mathematical Concentration Formulations & Unit Conversions</h2>

          <p>
            Converting between concentration units requires coupling chemical stoichiometry with physical fluid density:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Molar Concentration (Molarity)</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">M = n / V = (m_solute / MW) / V_solution</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Quantifies chemical moles of solute per liter of total solution volume.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Gravimetric Mass Fraction (% w/w)</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">% w/w = (m_solute / m_total) &middot; 100 = [m_solute / (V_solution &middot; &rho;)] &middot; 100</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates percentage ratio of solute mass relative to density-corrected solution mass.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Parts Per Million (PPM) & Parts Per Billion (PPB)</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">PPM = (m_solute / m_total) &middot; 10⁶   |   PPB = PPM &middot; 1000</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Environmental trace metric: 1 PPM = 1 mg/kg &asymp; 1 mg/L in dilute aqueous media.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. Molal Concentration (Molality)</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">m = n_solute / m_solvent(kg) = (m_solute / MW) / [(m_total - m_solute) / 1000]</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Temperature-invariant metric quantifying solute moles per kilogram of pure solvent.</div>
          </Formula>

          <h2>Standard Concentration Units Cross-Reference Matrix</h2>

          <p>
            Aqueous solution concentration equivalents across clinical, environmental, and synthetic chemistry benchmarks:
          </p>

          <DataTable
            head={["Unit Metric", "Mathematical Definition", "Aqueous Water Approx (ρ=1.0)", "Primary Application", "Temp Dependent?"]}
            rows={[
              ["Molarity (M)", "Moles Solute / Liters Solution", "mol/L", "Chemical Synthesis & Titrations", "Yes (expands)"],
              ["Molality (m)", "Moles Solute / kg Solvent", "mol/kg", "Colligative Properties & Thermodynamics", "No (mass invariant)"],
              ["Mass Percent (% w/w)", "(g Solute / g Solution) × 100", "g per 100 g", "Industrial Acids & Bulk Reagents", "No"],
              ["Weight/Volume (% w/v)", "(g Solute / mL Solution) × 100", "g per 100 mL", "Clinical IV Infusions & Pharmacy", "Yes"],
              ["Parts per Million (PPM)", "(g Solute / g Solution) × 10⁶", "1 mg / L", "Environmental Water Quality", "Negligible in dilute"],
              ["Parts per Billion (PPB)", "(g Solute / g Solution) × 10⁹", "1 µg / L", "Toxicology & Heavy Metal Residues", "Negligible in dilute"],
            ]}
          />


          <h2>Serial Dilution Protocols & Geometric Concentration Cascades</h2>

          <p>
            In analytical pharmacology, microbiology, and clinical immunology, preparing solutions spanning multiple orders of magnitude requires serial dilution cascades. Rather than attempting to pipette sub-microgram quantities of solute directly, laboratory technicians execute sequential step dilutions where a fixed aliquot of concentrated stock solution is transferred into known volumes of diluent solvent.
          </p>

          <p>
            For a geometric two-fold dilution series (1:2 ratio), concentration halves with each successive transfer (C_n = C_0 &middot; 0.5^n). In logarithmic ten-fold series (1:10 ratio), each tube steps down by exactly 1.0 log₁₀ unit, essential for generating linear calibration curves in ELISA assays and determining Minimum Inhibitory Concentrations (MIC) in clinical antimicrobial susceptibility testing. When calculating dilution aliquots and final vessel volumes, execute step-down formulas with our <Link href="/calculators/science/molarity-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">molarity calculator</Link> and calculate geometric proportions using the <Link href="/calculators/math/ratio-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">ratio calculator</Link>.
          </p>

          <h2>Ionic Strength & Debye-Hückel Activity Screening</h2>

          <p>
            In concentrated electrolyte solutions, electrostatic Coulombic interactions between solvated cations and anions restrict molecular mobility. Consequently, the chemically active concentration (activity a_i) is lower than the analytical molarity, scaled by the activity coefficient &gamma;_i: a_i = &gamma;_i &middot; C_i. The total electrostatic field of the solution is parameterized by ionic strength (I):
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">5. Lewis-Randall Solution Ionic Strength Formula</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">I = ½ &middot; &Sigma; (c_i &middot; z_i&sup2;)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Integrates molar concentrations c_i and ionic valence charges z_i across all dissolved ionic species.</div>
          </Formula>

          <p>
            Under the Extended Debye-H&uuml;ckel Law, log10(&gamma;_i) = -A &middot; z_i&sup2; &middot; &radic;I / (1 + B &middot; a_0 &middot; &radic;I). In physiological saline (0.154 M NaCl), the activity coefficient for monovalent ions drops to &gamma; &asymp; 0.76, meaning only 76% of dissolved ions behave as free thermodynamic entities. To correlate ionic strength with biological osmotic pressure gradients, audit plasma tonicity with our <Link href="/calculators/science/osmolarity-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">osmolarity calculator</Link> and evaluate potentiometric cell readings using the <Link href="/calculators/science/ph-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">pH calculator</Link>.
          </p>

          <h2>Comparative Operational Laboratory Worked Case Studies</h2>

          <h3>Case Study A: Formulating Commercial Saline IV Infusion (0.9% w/v NaCl)</h3>
          <p>
            A pharmaceutical manufacturing facility prepares 500 Liters of sterile physiological normal saline (0.90% w/v sodium chloride, NaCl, molar mass 58.44 g/mol) at 20 &deg;C with measured fluid density &rho; = 1.005 g/mL.
          </p>
          <ul>
            <li><strong>Solute Mass Required:</strong> 0.90 g NaCl per 100 mL &rarr; 9.00 g/L &times; 500 L = 4,500 grams (4.50 kg) pure NaCl.</li>
            <li><strong>Solution Total Mass:</strong> 500 L &times; 1.005 kg/L = 502.50 kg solution.</li>
            <li><strong>Molarity:</strong> (4,500 g &divide; 58.44 g/mol) &divide; 500 L = 0.1540 mol/L = 154.0 mM.</li>
            <li><strong>Gravimetric Mass Percent (% w/w):</strong> (4.50 kg &divide; 502.50 kg) &times; 100 = 0.8955% w/w.</li>
            <li><strong>Concentration in PPM:</strong> (4.50 kg &divide; 502.50 kg) &times; 10⁶ = 8,955 PPM.</li>
          </ul>

          <p>
            To evaluate colligative freezing depression or boiling elevation of this medical saline batch, utilize our <Link href="/calculators/science/boiling-point-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">boiling point calculator</Link> and verify buffer stability via the <Link href="/calculators/science/buffer-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">buffer calculator</Link>.
          </p>

          <h3>Case Study B: Environmental Groundwater Heavy Metal Toxicity Audit</h3>
          <p>
            An environmental testing laboratory audits a municipal groundwater well sample containing dissolved lead nitrate (Pb²⁺, molar mass 207.2 g/mol) measured at 0.045 milligrams per liter (45 &mu;g/L).
          </p>
          <ul>
            <li><strong>Concentration in PPM:</strong> 0.045 mg/L &divide; 1.00 kg/L = 0.045 PPM.</li>
            <li><strong>Concentration in PPB:</strong> 0.045 PPM &times; 1,000 = 45.0 PPB.</li>
            <li><strong>Molar Concentration:</strong> (0.000045 g/L) &divide; 207.2 g/mol = 2.17 &times; 10⁻⁷ M (0.217 &mu;M).</li>
            <li><strong>Regulatory Compliance:</strong> The EPA Action Level for lead in drinking water is 15 PPB. Because 45 PPB exceeds the statutory threshold threefold, immediate lead service line remediation is triggered.</li>
          </ul>

          <h2>Operational Constraints & Laboratory Protocols</h2>

          <p>
            When performing volumetric preparation and unit conversions, chemical technicians must adhere to four critical experimental boundary controls:
          </p>

          <ol>
            <li>
              <strong>Meniscus & Volumetric Flask Calibration:</strong> Volumetric flasks are calibrated &ldquo;To Contain&rdquo; (TC) at a specific reference temperature (typically 20 &deg;C). Dissolving exothermic solutes (like NaOH or H₂SO₄) produces thermal expansion; solutions must equilibrate to 20 &deg;C before making up to the final calibration mark.
            </li>
            <li>
              <strong>Volume Contraction in Polar Mixtures:</strong> Mixing polar solvents (such as ethanol and water) results in molecular interstitial packing, causing final solution volume to be less than the sum of individual components (50 mL water + 50 mL ethanol yields ~96 mL solution). Volumetric preparation must dissolve solute in partial solvent before final volume dilution.
            </li>
            <li>
              <strong>Hygroscopic Salt Hydration Water:</strong> When weighing solid salts, crystal waters of hydration (such as CuSO₄&middot;5H₂O vs anhydrous CuSO₄) must be factored into molar mass calculations to prevent systematic under-dosing.
            </li>
            <li>
              <strong>Density Deviations in Concentrated Media:</strong> Assuming 1 L = 1 kg holds true only for dilute solutions (&lt; 0.05 M). High-concentration solutions exhibit significant density departures requiring pycnometer calibration.
            </li>
          </ol>

          <h2>Authoritative International Standards & Metrology</h2>

          <p>
            For certified analytical preparation and calibration standards, refer to national and international metrology publications:
          </p>
          <ul>
            <li>
              <strong>IUPAC Compendium of Analytical Nomenclature (Orange Book):</strong> Standard rules for expressing analytical concentrations, molar units, and measurement uncertainty.
            </li>
            <li>
              <strong>ISO 17034:2016:</strong> General requirements for the competence of reference material producers in analytical chemistry calibration.
            </li>
            <li>
              <strong>EPA Method 200.8:</strong> Determination of Trace Elements in Waters and Wastes by Inductively Coupled Plasma - Mass Spectrometry.
            </li>
            <li>
              <strong>United States Pharmacopeia (USP &lt;621&gt;):</strong> Chromatography and volumetric solution preparation protocols.
            </li>
          </ul>
        </>
      }
    >
      <ConcentrationCalculatorComponent />
    </CalcPage>
  );
}
