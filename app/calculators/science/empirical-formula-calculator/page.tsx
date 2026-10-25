import type { Metadata } from "next";
import Link from "next/link";
import EmpiricalFormulaCalculatorComponent from "@/components/calcs/science/empirical-formula-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { EmpiricalCompositionHydrocarbonChart } from "@/components/flagship/science/editorial-charts";

const PATH = "/calculators/science/empirical-formula-calculator";
const TITLE = "Empirical Formula Calculator | Molecular Formula & Percent Composition Solver";
const DESCRIPTION =
  "Determine empirical and molecular formulas from elemental percent mass compositions, combustion analysis data, and experimental molar mass with stoichiometric ratio reduction.";

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
  { href: "/calculators/science/stoichiometry-calculator", icon: "⚖️", name: "Stoichiometry & Reagents" },
  { href: "/calculators/science/molecular-weight-calculator", icon: "⚛️", name: "Molecular Weight Solver" },
  { href: "/calculators/science/percent-yield-calculator", icon: "📊", name: "Percent Reaction Yield" },
  { href: "/calculators/science/concentration-calculator", icon: "⚗️", name: "Solution Concentration" },
  { href: "/calculators/science/molarity-calculator", icon: "🧪", name: "Molarity & Dilution" },
  { href: "/calculators/science/density-calculator", icon: "🔬", name: "Material Density & SG" },
];

const FAQ_ITEMS = [
  {
    q: "What is the critical distinction between an empirical formula and a molecular formula?",
    a: "An empirical formula represents the simplest, irreducible integer mole ratio of elements present in a chemical compound (such as CH₂O). In contrast, a molecular formula specifies the actual, exact number of atoms of each element contained within a single discrete molecule (such as C₆H₁₂O₆ for glucose or C₂H₄O₂ for acetic acid). The molecular formula is always an integer multiple (n = 1, 2, 3...) of the empirical formula.",
  },
  {
    q: "How do you calculate an empirical formula from mass percent composition?",
    a: "The standard algorithm proceeds through four stoichiometric steps: 1) Assume a 100.0-gram sample baseline so percentages convert directly to grams; 2) Divide each element's mass by its IUPAC standard atomic weight to determine chemical moles; 3) Divide all mole values by the smallest mole quantity among them to establish preliminary molar ratios; 4) If ratios are not whole integers, multiply all ratios by the smallest integer (2, 3, 4, or 5) to eliminate fractions.",
  },
  {
    q: "How is the molecular formula derived from an empirical formula and experimental molar mass?",
    a: "Calculate the formula mass of the empirical formula by summing the standard atomic weights of its constituent elements. Divide the experimentally determined molecular weight (obtained via mass spectrometry, ebullioscopy, or vapor density) by the empirical formula mass: n = Molar Mass / Empirical Mass. Multiplying every subscript in the empirical formula by integer n yields the true molecular formula.",
  },
  {
    q: "Why do different chemical compounds share identical empirical formulas?",
    a: "Compounds with identical elemental mass percentages share identical empirical formulas because empirical formulas reflect stoichiometric ratios rather than physical molecular architecture. For instance, formaldehyde (CH₂O, MW 30.03 g/mol), acetic acid (C₂H₄O₂, MW 60.05 g/mol), and glucose (C₆H₁₂O₆, MW 180.16 g/mol) all possess identical 40.0% Carbon, 6.72% Hydrogen, and 53.28% Oxygen compositions.",
  },
  {
    q: "How does elemental combustion analysis determine carbon and hydrogen percentages?",
    a: "In organic combustion analysis, a weighed sample is burned in excess oxygen gas (O₂). All carbon oxidizes to carbon dioxide (CO₂), and all hydrogen oxidizes to water vapor (H₂O). By trapping and weighing CO₂ in sodium hydroxide scrubbers and H₂O in magnesium perchlorate traps, gravimetric stoichiometries derive exact initial carbon and hydrogen masses. Any remaining unaccounted mass in a pure sample represents oxygen.",
  },
  {
    q: "What rounding tolerance is mathematically acceptable when reducing empirical ratios?",
    a: "Ratios within &plusmn;0.05 of a whole integer (such as 1.03 or 2.97) can be rounded safely to the nearest whole number (1 and 3). However, ratios ending near common vulgar fractions—such as 1.50 (multiply by 2), 1.33 or 1.67 (multiply by 3), 1.25 or 1.75 (multiply by 4), or 1.20 (multiply by 5)—must be multiplied across all elements to achieve true whole-number stoichiometry.",
  },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/science", label: "Science & Chemistry" }}
      title="Empirical Formula & Molecular Stoichiometry Calculator"
      intro="Determine empirical and molecular formulas from elemental percent mass compositions, combustion analysis gravimetry, and experimental molar mass with automated stoichiometric ratio reduction."
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
                IUPAC Inorganic & Organic Nomenclature Standard
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Elemental Stoichiometric Metrology</span>
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
                  Quick Answer: How are empirical and molecular formulas determined from percent composition?
                </strong>
                <p className="mt-1">
                  To find an empirical formula, convert elemental mass percentages into moles by dividing each mass by its atomic weight (AW): n = mass / AW. Divide all mole values by the smallest mole result to establish stoichiometric mole ratios, multiplying by small integers (2, 3, 4) if necessary to eliminate fractions. To determine the molecular formula, divide experimental molecular weight by the empirical formula mass to find integer multiplier n: Molecular Formula = (Empirical Formula)&times;n. For subsequent chemical synthesis, balance reaction yields with our <Link href="/calculators/science/stoichiometry-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">stoichiometry calculator</Link>, audit theoretical yields via the <Link href="/calculators/science/percent-yield-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">percent yield calculator</Link>, or evaluate solution concentrations using our <Link href="/calculators/science/molarity-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">molarity calculator</Link>.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - EDITORIAL CHART DIRECTLY BELOW */}
          <h2>Stoichiometric Mass Percentage Partition Across Representative Molecules</h2>
          <div className="not-prose my-6">
            <EmpiricalCompositionHydrocarbonChart />
          </div>

          <p>
            Determining empirical and molecular formulas represents the primary investigative cornerstone of analytical organic chemistry and natural product isolation. When a novel pharmaceutical compound, bioactive marine alkaloid, or synthetic polymer is isolated, elemental microanalysis and high-resolution mass spectrometry provide gravimetric compositions that define the fundamental atomic stoichiometry of the unknown substance.
          </p>

          <p>
            While empirical formulas reveal the lowest irreducible whole-number ratio of constituent atoms, they do not distinguish between structural isomers or oligomeric multiples. Combining empirical formulas with experimental molecular weight determinations resolves this ambiguity. When preparing chemical reagents for synthetic characterization, determine solution gravimetric parameters using our <Link href="/calculators/science/concentration-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">concentration calculator</Link> and verify physical crystal density using the <Link href="/calculators/science/density-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">density calculator</Link>.
          </p>

          <h2>Mathematical Stoichiometric Principles & Formula Reduction</h2>

          <p>
            The mathematical pathway from elemental mass percentages to verified molecular formulas follows four rigorous stoichiometric equations:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Elemental Molar Conversion Formula</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">n_i = m_i / AW_i = (%_i &middot; 100 g) / AW_i</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Converts elemental mass percentages into absolute chemical mole quantities.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Relative Molar Ratio Reduction</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">Ratio_i = n_i / n_min</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Normalizes elemental mole quantities against the least abundant constituent element.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Empirical Formula Mass Summation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">FW_emp = &Sigma; (Subscript_i &middot; AW_i)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates theoretical formula weight of the reduced empirical unit in g/mol.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. Molecular Multiple Factor</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">n_molecular = MW_experimental / FW_emp</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Determines integer multiplier linking empirical formula to true molecular formula.</div>
          </Formula>

          <h2>Fractional Multiplier Reduction Reference Table</h2>

          <p>
            When normalized molar ratios produce non-integer decimal values, all elemental ratios must be multiplied by the corresponding integer factor:
          </p>

          <DataTable
            head={["Decimal Ratio Ending", "Fractional Equivalent", "Required Multiplier", "Example Preliminary Ratio", "Final Integer Subscripts"]}
            rows={[
              [".50", "1/2", "× 2", "Fe 1.00 : O 1.50", "Fe₂O₃ (Iron(III) Oxide)"],
              [".33 or .67", "1/3 or 2/3", "× 3", "C 1.33 : H 2.67 : O 1.00", "C₄H₈O₃"],
              [".25 or .75", "1/4 or 3/4", "× 4", "P 1.00 : O 2.50", "P₂O₅ (P₄O₁₀ dimer)"],
              [".20, .40, .60, .80", "1/5, 2/5, 3/5, 4/5", "× 5", "V 1.00 : O 2.50", "V₂O₅ (Vanadium Pentoxide)"],
              [".125, .375, .625", "1/8, 3/8, 5/8", "× 8", "Theoretical Complex", "Integer Stoichiometric Grid"],
            ]}
          />


          <h2>The Dulong-Petit Law & Historical Atomic Weight Verification</h2>

          <p>
            In the early 19th century, before modern mass spectrometry existed, determining empirical and molecular formulas was hindered by uncertainty in elemental atomic weights. In 1819, French physicists Pierre Louis Dulong and Alexis Th&eacute;r&egrave;se Petit discovered that the molar heat capacity of solid elemental metals is approximately constant across all metallic elements:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">5. Classical Dulong-Petit Heat Capacity Rule</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">c_specific &middot; Atomic Weight &asymp; 3 &middot; R &asymp; 24.94 J / (mol &middot; K)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Allows rapid experimental estimation of an unknown metallic element's atomic weight.</div>
          </Formula>

          <p>
            By measuring an unknown metal's specific heat capacity in a calorimeter (c_specific in J/(g&middot;K)), dividing 25 by c_specific yielded an approximate atomic weight. This approximation allowed J&ouml;ns Jacob Berzelius and Stanislao Cannizzaro to resolve ambiguities between equivalent weights and true atomic weights, cementing the stoichiometric foundation of the periodic table. To model thermal calorimeter heat transfers, calculate specific heat values using our <Link href="/calculators/science/specific-heat-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">specific heat calculator</Link> and verify molecular formula masses with the <Link href="/calculators/science/molecular-weight-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">molecular weight calculator</Link>.
          </p>

          <h2>High-Resolution Mass Spectrometry & Isotopic Mass Defect</h2>

          <p>
            In contemporary natural product chemistry, empirical formulas are validated using High-Resolution Electrospray Ionization Mass Spectrometry (HR-ESI-MS). While low-resolution mass spectrometers report nominal integer masses (e.g., m/z 180 for glucose), high-resolution instruments achieve mass accuracies better than 2 to 5 parts-per-million (ppm), measuring glucose at m/z 180.0634.
          </p>

          <p>
            Because nuclear binding energy causes individual isotopes to possess unique nuclear mass defects (¹²C = 12.000000 Da exactly, while ¹H = 1.007825 Da, ¹⁴N = 14.003074 Da, and ¹⁶O = 15.994915 Da), every unique elemental empirical combination possesses a distinct fractional exact mass. Automated heuristic algorithms (such as the Seven Golden Rules of formula generation) filter isotopic peak ratios and mass defects to identify the single unambiguous molecular formula.
          </p>

          <h2>Comparative Operational Laboratory Worked Case Studies</h2>

          <h3>Case Study A: Elemental Characterization of Vitamin C (Ascorbic Acid)</h3>
          <p>
            Elemental microanalysis of pure synthesized Vitamin C yields 40.92% Carbon, 4.58% Hydrogen, and 54.50% Oxygen by mass. High-resolution mass spectrometry establishes an experimental molecular weight of 176.12 g/mol.
          </p>
          <ul>
            <li><strong>Elemental Moles per 100 g:</strong>
              <br />&bull; Carbon: 40.92 g &divide; 12.011 g/mol = 3.407 mol C.
              <br />&bull; Hydrogen: 4.58 g &divide; 1.008 g/mol = 4.544 mol H.
              <br />&bull; Oxygen: 54.50 g &divide; 15.999 g/mol = 3.406 mol O.
            </li>
            <li><strong>Divide by Smallest (3.406 mol):</strong>
              <br />&bull; C: 3.407 &divide; 3.406 = 1.000.
              <br />&bull; H: 4.544 &divide; 3.406 = 1.334 (&asymp; 1 &frac13;).
              <br />&bull; O: 3.406 &divide; 3.406 = 1.000.
            </li>
            <li><strong>Multiply by 3 to Eliminate Fraction:</strong> C₃H₄O₃.</li>
            <li><strong>Empirical Formula Mass:</strong> (3 &times; 12.011) + (4 &times; 1.008) + (3 &times; 15.999) = 88.06 g/mol.</li>
            <li><strong>Molecular Multiplier:</strong> n = 176.12 g/mol &divide; 88.06 g/mol = 2.000.</li>
            <li><strong>True Molecular Formula:</strong> (C₃H₄O₃)&times;2 = C₆H₈O₆.</li>
          </ul>

          <p>
            To formulate liquid therapeutic dosages of ascorbic acid at controlled ionic pH, evaluate weak acid ionization using our <Link href="/calculators/science/ph-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">pH calculator</Link> and calculate buffer ratios with the <Link href="/calculators/science/buffer-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">buffer calculator</Link>.
          </p>

          <h3>Case Study B: Combustion Analysis of Hydrocarbon Fuel (Octane)</h3>
          <p>
            Combustion analysis of a 10.00-gram sample of a volatile liquid hydrocarbon produces 30.86 grams of carbon dioxide (CO₂) and 14.19 grams of water vapor (H₂O). Experimental gas vapor density indicates a molecular mass of ~114 g/mol.
          </p>
          <ul>
            <li><strong>Carbon Mass:</strong> 30.86 g CO₂ &times; (12.011 / 44.01) = 8.423 g Carbon (84.23% C).</li>
            <li><strong>Hydrogen Mass:</strong> 14.19 g H₂O &times; (2.016 / 18.015) = 1.588 g Hydrogen (15.88% H).</li>
            <li><strong>Molar Quantities:</strong> C = 8.423 &divide; 12.011 = 0.7013 mol; H = 1.588 &divide; 1.008 = 1.575 mol.</li>
            <li><strong>Molar Ratio:</strong> H / C = 1.575 &divide; 0.7013 = 2.246 (&asymp; 2 &frac14; &rarr; 9/4). Multiplying by 4 yields C₄H₉.</li>
            <li><strong>Empirical Weight:</strong> (4 &times; 12.011) + (9 &times; 1.008) = 57.12 g/mol.</li>
            <li><strong>Molecular Multiplier:</strong> n = 114.2 &divide; 57.12 = 2.00 &rarr; Molecular Formula: C₈H₁₈ (Octane).</li>
          </ul>

          <h2>Operational Constraints & Spectroscopic Limitations</h2>

          <p>
            When deploying empirical formula algorithms in research environments, analytical chemists must account for four operational boundary factors:
          </p>

          <ol>
            <li>
              <strong>Combustion Trapping Incomplete Recovery:</strong> Incomplete combustion forming carbon monoxide (CO) rather than CO₂ causes systematic underestimation of carbon mass, leading to distorted molar ratios unless catalytic copper oxide converters are utilized.
            </li>
            <li>
              <strong>Combustion Analysis Inability to Detect Oxygen Directly:</strong> Oxygen cannot be measured directly in conventional combustion trains because oxygen gas (O₂) is the burning carrier. Oxygen is determined by mass difference (%O = 100% - %C - %H - %N), making it inherit cumulative errors from all other elemental measurements.
            </li>
            <li>
              <strong>Molecular Weight Resolution in Macromolecules:</strong> For large biomolecules and polymers exceeding 10,000 g/mol, dividing experimental molecular weight by small empirical masses produces non-integer fractions due to polydispersity and isotopic mass distribution.
            </li>
            <li>
              <strong>Structural Isomerism Invisibility:</strong> Empirical and molecular formulas provide zero information regarding spatial isomerism. For example, C₂H₆O represents both liquid ethanol (boiling point 78.4 &deg;C) and gaseous dimethyl ether (boiling point -24 &deg;C), requiring NMR or infrared spectroscopy for structural confirmation.
            </li>
          </ol>

          <h2>Authoritative International Chemical Standards</h2>

          <p>
            For certified elemental analysis protocols and atomic weight calibrations, consult international chemical metrology bodies:
          </p>
          <ul>
            <li>
              <strong>IUPAC Commission on Isotopic Abundances and Atomic Weights (CIAAW):</strong> Standard Atomic Weights of the Elements reference tables.
            </li>
            <li>
              <strong>NIST Standard Reference Materials (SRM 141d - Acetanilide):</strong> Primary standard micro-analytical reference materials for C, H, N elemental analyzer calibration.
            </li>
            <li>
              <strong>AOAC Official Method 972.43:</strong> Microchemical determination of carbon, hydrogen, and nitrogen in organic compounds.
            </li>
            <li>
              <strong>ASTM E1019-18:</strong> Standard Test Methods for Determination of Carbon, Sulfur, Nitrogen, and Oxygen in Steel, Iron, Nickel, and Cobalt Alloys.
            </li>
          </ul>
        </>
      }
    >
      <EmpiricalFormulaCalculatorComponent />
    </CalcPage>
  );
}
