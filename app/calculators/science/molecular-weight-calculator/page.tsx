import type { Metadata } from "next";
import Link from "next/link";
import MolecularWeightCalculatorComponent from "@/components/calcs/science/molecular-weight-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { MolarMassPeriodicFamilyChart } from "@/components/flagship/science/editorial-charts";

const PATH = "/calculators/science/molecular-weight-calculator";
const TITLE = "Molecular Weight Calculator | Molar Mass & Elemental Composition Solver";
const DESCRIPTION =
  "Calculate molecular weight, molar mass, and mass percentage composition from chemical formulas across organic molecules, inorganic salts, and pharmaceutical compounds.";

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
  { href: "/calculators/science/empirical-formula-calculator", icon: "🔬", name: "Empirical Formula Solver" },
  { href: "/calculators/science/molarity-calculator", icon: "🧪", name: "Molarity & Dilution" },
  { href: "/calculators/science/stoichiometry-calculator", icon: "⚖️", name: "Stoichiometry & Reagents" },
  { href: "/calculators/science/concentration-calculator", icon: "⚗️", name: "Solution Concentration" },
  { href: "/calculators/science/percent-yield-calculator", icon: "📊", name: "Percent Reaction Yield" },
  { href: "/calculators/science/density-calculator", icon: "📐", name: "Material Density & SG" },
];

const FAQ_ITEMS = [
  {
    q: "What is the difference between molecular weight, molar mass, and formula weight?",
    a: "Molecular weight (relative molecular mass, Mr) is a dimensionless ratio comparing the mass of a single molecule to 1/12th of the mass of a carbon-12 atom. Molar mass (M) is the mass of one mole of substance, expressed with physical units of grams per mole (g/mol) or kg/mol. Formula weight is utilized for non-molecular ionic networks (like NaCl) where discrete molecules do not exist, representing the sum of atomic weights in the empirical formula unit.",
  },
  {
    q: "How are standard atomic weights determined by IUPAC?",
    a: "Standard atomic weights published by the IUPAC Commission on Isotopic Abundances and Atomic Weights (CIAAW) represent the abundance-weighted average of all stable terrestrial isotopes of an element. For carbon, consisting of 98.93% ¹²C (12.0000 Da) and 1.07% ¹³C (13.0034 Da), the weighted atomic weight evaluates to 12.011 g/mol.",
  },
  {
    q: "What is the unified atomic mass unit (Dalton, Da)?",
    a: "The unified atomic mass unit (u), also standardized as the Dalton (Da), is defined as exactly 1/12th of the rest mass of an unbound neutral Carbon-12 atom at ground state: 1 Da = 1 u &asymp; 1.66053906660 &times; 10⁻²⁷ kg. A single water molecule (H₂O) possesses a molecular mass of 18.015 Da, and one mole of water molecules has a molar mass of 18.015 g/mol.",
  },
  {
    q: "How do isotopic variations alter experimental molecular weight in mass spectrometry?",
    a: "In mass spectrometry, high-resolution instruments detect monoisotopic mass (calculated using the exact mass of the most abundant isotope of each element, e.g., ¹²C, ¹H, ¹⁶O) rather than average molar mass. For large biomolecules and halogenated compounds (containing ³⁵Cl and ³⁷Cl or ⁷⁹Br and ⁸¹Br), characteristic isotopic peak clusters appear, providing structural fingerprints.",
  },
  {
    q: "Why is molecular weight critical in pharmaceutical drug design (Lipinski's Rule of 5)?",
    a: "In medicinal chemistry, Lipinski&apos;s Rule of Five establishes that an orally active drug candidate should possess a molecular weight below 500 g/mol (Da). Molecules exceeding 500 Da exhibit poor passive membrane permeability across intestinal epithelial barriers, reducing oral bioavailability and therapeutic efficacy.",
  },
  {
    q: "How does polymer molecular weight differ from small molecule molecular weight?",
    a: "Small organic compounds possess a single, discrete molecular weight. In contrast, synthetic polymers (like polyethylene or polystyrene) are polydisperse mixtures of polymer chains of varying lengths, characterized by statistical averages: Number-Average Molecular Weight (Mn) and Weight-Average Molecular Weight (Mw).",
  },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/science", label: "Science & Chemistry" }}
      title="Molecular Weight & Molar Mass Calculator"
      intro="Calculate molecular weight, molar mass, and mass percentage composition from chemical formulas across organic molecules, inorganic salts, and pharmaceutical compounds using IUPAC standard atomic weights."
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
                IUPAC CIAAW Atomic Weights Standard
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Stoichiometric Molecular Metrology</span>
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
                  Quick Answer: How are molecular weight and molar mass calculated?
                </strong>
                <p className="mt-1">
                  Molecular weight is calculated by summing the IUPAC standard atomic weights (AW) of all constituent atoms in the chemical formula: MW = &Sigma; (Atom_Count_i &times; AW_i), expressed in grams per mole (g/mol) or Daltons (Da). Elemental mass percentage is calculated by dividing an element&apos;s total atomic mass contribution by the molecular weight: %_mass = (Atom_Count &times; AW / MW) &times; 100. For complete synthetic preparation, determine required solution mass with our <Link href="/calculators/science/molarity-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">molarity calculator</Link>, audit empirical formula ratios using the <Link href="/calculators/science/empirical-formula-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">empirical formula calculator</Link>, or examine reaction balances via our <Link href="/calculators/science/stoichiometry-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">stoichiometry calculator</Link>.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - EDITORIAL CHART DIRECTLY BELOW */}
          <h2>Molar Mass Distribution Across Representative Chemical Families</h2>
          <div className="not-prose my-6">
            <MolarMassPeriodicFamilyChart />
          </div>

          <p>
            Molecular weight represents the fundamental bridge connecting the microscopic world of individual atoms and molecules with the macroscopic realm of laboratory balances and industrial reactors. Avogadro&apos;s number (NA = 6.02214076 &times; 10²³ particles/mol) establishes that one mole of any pure chemical compound possesses a mass in grams exactly equal to its molecular weight in atomic mass units.
          </p>

          <p>
            In organic synthesis, biochemistry, and polymer science, accurate knowledge of molar mass is mandatory for calculating reaction stoichiometries, determining limiting reagents, and assessing pharmacokinetic properties. When evaluating concentration parameters in chemical solutions, correlate molar mass with gravimetric percentages using our <Link href="/calculators/science/concentration-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">concentration calculator</Link> and calculate thermodynamic boiling shifts with the <Link href="/calculators/science/boiling-point-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">boiling point calculator</Link>.
          </p>

          <h2>Mathematical Molar Mass Formulations & Composition Principles</h2>

          <p>
            Molar mass calculations couple IUPAC isotopic atomic weights with stoichiometric percentage formulations:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Molecular Weight Summation Formula</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">MW = &Sigma; (n_i &middot; AW_i)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Sums constituent atomic weights AW_i scaled by their stoichiometric subscripts n_i.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Elemental Mass Percentage Composition</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">%_mass(i) = [(n_i &middot; AW_i) / MW] &middot; 100%</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates gravimetric mass contribution percentage of element i within the compound.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Mole-to-Mass Conversion Relation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">mass(g) = n(mol) &middot; MW(g/mol)   |   n(mol) = mass(g) / MW(g/mol)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Converts macroscopic gravimetric mass into chemical mole quantities.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. Absolute Single-Molecule Mass</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">m_molecule = MW / N_A = MW / (6.02214076 &times; 10²³)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates mass of one discrete molecule in grams (g/molecule).</div>
          </Formula>

          <h2>Standard IUPAC Atomic Weights of Key Biological Elements</h2>

          <p>
            Standard atomic weights established by the IUPAC Commission on Isotopic Abundances and Atomic Weights (CIAAW):
          </p>

          <DataTable
            head={["Element Name", "Symbol", "Atomic Number (Z)", "Standard Atomic Weight (g/mol)", "Major Stable Isotopes", "Abundance %"]}
            rows={[
              ["Hydrogen", "H", "1", "1.0080", "¹H, ²H (Deuterium)", "99.98% ¹H, 0.02% ²H"],
              ["Carbon", "C", "6", "12.011", "¹²C, ¹³C", "98.93% ¹²C, 1.07% ¹³C"],
              ["Nitrogen", "N", "7", "14.007", "¹⁴N, ¹⁵N", "99.63% ¹⁴N, 0.37% ¹⁵N"],
              ["Oxygen", "O", "8", "15.999", "¹⁶O, ¹⁷O, ¹⁸O", "99.76% ¹⁶O, 0.20% ¹⁸O"],
              ["Sodium", "Na", "11", "22.990", "²³Na (Monomultiplet)", "100.0% ²³Na"],
              ["Phosphorus", "P", "15", "30.974", "³¹P (Monomultiplet)", "100.0% ³¹P"],
              ["Sulfur", "S", "16", "32.060", "³²S, ³³S, ³⁴S, ³⁶S", "95.0% ³²S, 4.2% ³⁴S"],
              ["Chlorine", "Cl", "17", "35.450", "³⁵Cl, ³⁷Cl", "75.76% ³⁵Cl, 24.24% ³⁷Cl"],
              ["Potassium", "K", "19", "39.098", "³⁹K, ⁴¹K", "93.26% ³⁹K, 6.73% ⁴¹K"],
              ["Iron", "Fe", "26", "55.845", "⁵⁴Fe, ⁵⁶Fe, ⁵⁷Fe, ⁵⁸Fe", "91.75% ⁵⁶Fe"],
            ]}
          />

          <h2>Comparative Operational Laboratory Worked Case Studies</h2>

          <h3>Case Study A: Formulating Chemotherapeutic Paclitaxel (Taxol)</h3>
          <p>
            A pharmaceutical development team formulates the natural anticancer alkaloid paclitaxel (C₄₇H₅₁NO₁₄), isolated from the Pacific yew tree, to evaluate intravenous dosing.
          </p>
          <ul>
            <li><strong>Elemental Atomic Contributions:</strong>
              <br />&bull; Carbon: 47 &times; 12.011 = 564.517 g/mol (66.11% C).
              <br />&bull; Hydrogen: 51 &times; 1.008 = 51.408 g/mol (6.02% H).
              <br />&bull; Nitrogen: 1 &times; 14.007 = 14.007 g/mol (1.64% N).
              <br />&bull; Oxygen: 14 &times; 15.999 = 223.986 g/mol (26.23% O).
            </li>
            <li><strong>Total Molecular Weight:</strong> MW = 564.517 + 51.408 + 14.007 + 223.986 = 853.918 g/mol (Da).</li>
            <li><strong>Absolute Single Molecule Mass:</strong> 853.92 &divide; 6.022 &times; 10²³ = 1.418 &times; 10⁻²¹ grams per molecule.</li>
            <li><strong>Clinical Dose Moles:</strong> A 175 mg standard clinical dose contains: 0.175 g &divide; 853.92 g/mol = 2.049 &times; 10⁻⁴ mol (204.9 &mu;mol).</li>
          </ul>

          <p>
            To evaluate expected synthesis recovery yields for natural alkaloids, calculate conversion ratios with our <Link href="/calculators/science/percent-yield-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">percent yield calculator</Link> and verify crystal density using the <Link href="/calculators/science/density-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">density calculator</Link>.
          </p>

          <h3>Case Study B: Hydrated Inorganic Reagent (Ferrous Sulfate Heptahydrate)</h3>
          <p>
            An environmental water treatment facility prepares an iron coagulant using commercial green vitriol (ferrous sulfate heptahydrate: FeSO₄&middot;7H₂O).
          </p>
          <ul>
            <li><strong>Constituent Weights:</strong> Fe = 55.845, S = 32.06, O = (4 + 7)&times;15.999 = 175.989, H = 14&times;1.008 = 14.112.</li>
            <li><strong>Total Molar Mass:</strong> MW = 55.845 + 32.060 + 175.989 + 14.112 = 278.006 g/mol.</li>
            <li><strong>Water of Hydration Percentage:</strong> Mass of 7 H₂O = 7 &times; 18.015 = 126.105 g/mol &rarr; (126.105 &divide; 278.01) &times; 100 = 45.36% crystal water.</li>
            <li><strong>Engineering Impact:</strong> Over 45% of shipping weight consists of structural water, demonstrating why industrial procurement accounts for hydration state.</li>
          </ul>

          <h2>Operational Constraints & Spectrometric Isotopic Factors</h2>

          <p>
            When deploying molecular weight calculations in mass spectrometry and biochemical analysis, four analytical boundary factors must be controlled:
          </p>

          <ol>
            <li>
              <strong>Monoisotopic Mass vs. Average Molar Mass:</strong> High-resolution mass spectrometry resolves exact monoisotopic peaks (¹²C = 12.0000 Da) rather than average atomic weights. For peptides exceeding 3,000 Da, the average molecular weight shifts significantly higher than the monoisotopic peak due to natural ¹³C accumulation.
            </li>
            <li>
              <strong>Terrestrial Isotopic Abundance Variation:</strong> Certain elements (such as carbon, oxygen, and lead) exhibit natural isotopic fractionation depending on geographical origin (e.g., C3 vs C4 photosynthetic plants, or lead ores from different geological epochs), causing slight variations in the fifth decimal place of standard atomic weights.
            </li>
            <li>
              <strong>Hygroscopic Mass Drift in Analytical Weighing:</strong> Many dry compounds absorb atmospheric moisture upon exposure (e.g., anhydrous CaCl₂ or NaOH pellets), rapidly increasing sample mass and causing calculated moles to be systematically overestimated unless dried in a desiccator.
            </li>
            <li>
              <strong>Polydisperse Macromolecular Averages:</strong> For biopolymers like DNA and synthetic polymers like PEG, molecular weight is reported as statistical distributions (number-average Mn vs weight-average Mw), parameterized by the polydispersity index (PDI = Mw / Mn).
            </li>
          </ol>


          <h2>High-Resolution Mass Spectrometry & Macromolecular Polydispersity Dynamics</h2>
          <p>
            While routine laboratory stoichiometry utilizes abundance-averaged atomic weights, modern high-resolution
            mass spectrometry (HRMS) resolves monoisotopic masses composed exclusively of the predominant stable
            nuclides (carbon-12 at 12.000000 Da, hydrogen-1 at 1.007825 Da, nitrogen-14 at 14.003074 Da). This minute mass
            defect differentiation allows bioanalytical chemists to distinguish isobaric compounds with identical nominal masses.
          </p>
          <Formula>
            {"M_n = sum(N_i * M_i) / sum(N_i),   M_w = sum(N_i * M_i^2) / sum(N_i * M_i),   PDI = M_w / M_n"}
          </Formula>
          <p>
            In polymer chemistry, synthetic polymers display distribution curves of chain lengths. The polydispersity
            index (PDI) directly dictates melt flow index, mechanical tensile strength, and polymer solubility.
            Chemists routinely integrate calculated molar masses with
            {" "}<Link href="/calculators/science/percent-yield-calculator">reaction percent yield evaluations</Link>{" "}
            and
            {" "}<Link href="/calculators/science/stoichiometry-calculator">stoichiometric feed calculations</Link>{" "}
            to optimize step-growth and radical chain polymerization kinetics.
          </p>
          <p>
            In biochemical crystallography and biopharmaceutical development, accurate molecular weights are essential for characterizing post-translational modifications, glycosylation heterogeneity, and antibody-drug conjugates (ADCs). Mass spectrometry instruments such as Orbitrap achieve sub-part-per-million mass accuracy, detecting single dalton shifts caused by deamidation or phosphorylation across complex glycoprotein therapeutic formulations.
          </p>


          <p>
            In synthetic oligonucleotide synthesis and mRNA vaccine engineering, exact sequence molar masses guide enzymatic in vitro transcription feed stoichiometry and lipid nanoparticle formulation packaging ratios. Small mass discrepancies in nucleotide raw materials or capping analogs propagate into substantial molecular weight errors across multi-kilobase nucleic acid constructs.
          </p>
          <p>
            Analytical ultracentrifugation (AUC) sedimentation velocity experiments combine absolute molecular weights with buoyant molar mass principles to verify non-covalent quaternary macromolecular assembly states without requiring calibration standards.
          </p>

          <h2>Authoritative International Chemical Standards</h2>

          <p>
            For certified atomic weights, molecular formula nomenclature, and isotopic standards, refer to international chemical metrology organizations:
          </p>
          <ul>
            <li>
              <strong>IUPAC Commission on Isotopic Abundances and Atomic Weights (CIAAW):</strong> Biennial Atomic Weights of the Elements reports.
            </li>
            <li>
              <strong>NIST Chemistry WebBook:</strong> Standard Reference Database 69 providing validated molecular weights, thermochemistry, and mass spectra.
            </li>
            <li>
              <strong>IUPAC Compendium of Chemical Terminology (Gold Book):</strong> Nomenclature and symbols for mass-related quantities.
            </li>
            <li>
              <strong>Protein Data Bank (PDB) & Chemical Entities of Biological Interest (ChEBI):</strong> Curated chemical databases for macromolecular mass validation.
            </li>
          </ul>
        </>
      }
    >
      <MolecularWeightCalculatorComponent />
    </CalcPage>
  );
}
