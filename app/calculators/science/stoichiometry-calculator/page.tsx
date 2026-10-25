import type { Metadata } from "next";
import Link from "next/link";
import StoichiometryCalculatorComponent from "@/components/calcs/science/stoichiometry-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { StoichiometricMoleRatioChart } from "@/components/flagship/science/editorial-charts";

const PATH = "/calculators/science/stoichiometry-calculator";
const TITLE = "Stoichiometry Calculator | Limiting Reagent & Mole Ratio Solver";
const DESCRIPTION =
  "Calculate balanced chemical equation stoichiometry, mole ratios, limiting reactants, theoretical product yields, and unreacted excess reagents.";

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
  { href: "/calculators/science/percent-yield-calculator", icon: "📈", name: "Percent Yield" },
  { href: "/calculators/science/molecular-weight-calculator", icon: "⚛️", name: "Molecular Weight" },
  { href: "/calculators/science/molarity-calculator", icon: "🧪", name: "Molarity Dilution" },
  { href: "/calculators/science/ideal-gas-law-calculator", icon: "🎈", name: "Ideal Gas Law" },
];

export default function StoichiometryCalculatorPage() {
  return (
    <CalcPage
      title="Stoichiometry Calculator"
      intro="Comprehensive analytical solver for laboratory, clinical, and industrial chemical calculations."
      description="Compute stoichiometric mole ratios, theoretical product yields, limiting reactants, and excess reagent leftovers. Balance chemical equations across synthesis, combustion, precipitation, and decomposition reactions with full gravimetric mass conservation."
      path={PATH}
      category={{ href: "/pages/science", label: "Science & Chemistry" }}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Quick Answer: How Stoichiometry is Calculated</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Chemical stoichiometry relies on the conservation of mass and integer mole ratios defined by balanced chemical equations. To find the theoretical yield, convert initial reactant masses to moles using molar masses (n = m / MW), divide each molar quantity by its stoichiometric coefficient to identify the limiting reagent, and multiply the limiting moles by the product mole ratio and molar mass. Any remaining unreacted reactant represents excess reagent. Determine reactant molar masses with the <Link href="/calculators/science/molecular-weight-calculator">molecular weight calculator</Link> and compare experimental outputs using the <Link href="/calculators/science/percent-yield-calculator">chemical percent yield calculator</Link>.
            </p>
          </div>

          <h2>Theoretical Product Yield vs Unreacted Excess Reagent Balance (g)</h2>
          <p>
            When chemical reactions depart from exact stoichiometric equivalence, the limiting reagent is completely consumed, capping the maximum achievable product yield. The non-limiting reagent remains partially unreacted in the final reaction mixture.
          </p>

          <StoichiometricMoleRatioChart />

          <h2>First-Principles Stoichiometric Derivations & Limiting Reactant Law</h2>
          <p>
            Stoichiometry derives from Lavoisier &apos;s law of conservation of mass and Proust &apos;s law of definite proportions. For a generalized chemical transformation:
          </p>
          <Formula>
            {"a \cdot \text{A} + b \cdot \text{B} \longrightarrow c \cdot \text{C} + d \cdot \text{D}"}
          </Formula>
          <p>
            The stoichiometric mole ratio between any two substances is governed by their stoichiometric coefficients:
          </p>
          <Formula>
            {"\frac{n_{\text{A}}}{a} = \frac{n_{\text{B}}}{b} = \frac{n_{\text{C}}}{c} = \frac{n_{\text{D}}}{d}"}
          </Formula>
          <p>
            To identify the limiting reactant from initial masses (m_A and m_B), calculate the stoichiometric reaction quotients:
          </p>
          <Formula>
            {"Q_{\text{stoich, A}} = \frac{m_{\text{A}} / MW_{\text{A}}}{a}, \quad Q_{\text{stoich, B}} = \frac{m_{\text{B}} / MW_{\text{B}}}{b}"}
          </Formula>
          <p>
            The substance with the smaller quotient is the limiting reagent (R_lim). The theoretical product yield of C is then calculated directly from R_lim:
          </p>
          <Formula>
            {"m_{\text{C, theoretical}} = \left( \frac{n_{\text{lim}}}{a_{\text{lim}}} \right) \cdot c \cdot MW_{\text{C}}"}
          </Formula>
          <p>
            The excess reagent consumed during reaction is n_excess,consumed = (n_lim / a_lim) · b, leaving an unreacted mass of:
          </p>
          <Formula>
            {"m_{\text{excess, remaining}} = \left( n_{\text{excess, initial}} - n_{\text{excess, consumed}} \right) \cdot MW_{\text{excess}}"}
          </Formula>
          <p>
            When liquid solutions are utilized, chemists determine initial moles using the <Link href="/calculators/science/molarity-calculator">solution molarity tool</Link> and calculate gaseous reactant volumes via the <Link href="/calculators/science/ideal-gas-law-calculator">ideal gas law solver</Link>.
          </p>

          <h2>Standard Stoichiometric Benchmarks & Industrial Chemical Equations</h2>
          <p>
            The table below illustrates balanced reaction equations, mole ratios, and theoretical mass yields per 100 grams of primary limiting feed across foundational industrial and laboratory chemical processes.
          </p>

          <DataTable
            head={["Industrial Process", "Balanced Chemical Equation", "Mole Ratio (A : B : Product)", "Primary Reagent (100 g)", "Theoretical Yield"]}
            rows={[
              ["Haber-Bosch Ammonia", "N₂ + 3 H₂ → 2 NH₃", "1 : 3 : 2", "100 g N₂ (limiting)", "121.6 g NH₃"],
              ["Contact Process Sulfuric", "2 SO₂ + O₂ → 2 SO₃", "2 : 1 : 2", "100 g SO₂ (limiting)", "125.0 g SO₃"],
              ["Water Synthesis Combustion", "2 H₂ + O₂ → 2 H₂O", "2 : 1 : 2", "100 g H₂ (limiting)", "893.6 g H₂O"],
              ["Methane Complete Combustion", "CH₄ + 2 O₂ → CO₂ + 2 H₂O", "1 : 2 : 1", "100 g CH₄ (limiting)", "274.3 g CO₂"],
              ["Lime Kiln Calcination", "CaCO₃ → CaO + CO₂", "1 : 0 : 1", "100 g CaCO₃", "56.0 g CaO"],
              ["Aluminum Smelting Reduction", "2 Al₂O₃ + 3 C → 4 Al + 3 CO₂", "2 : 3 : 4", "100 g Al₂O₃", "52.9 g Al metal"],
            ]}
          />

          <h2>Comparative Operational Laboratory Worked Case Studies</h2>

          <h3>Case Study A: Haber-Bosch Ammonia Synthesis Limiting Reagent Balance</h3>
          <p>
            An industrial chemical reactor is charged with 50.0 kg of nitrogen gas (N₂, MW = 28.014 g/mol) and 12.0 kg of hydrogen gas (H₂, MW = 2.016 g/mol) to synthesize anhydrous ammonia (NH₃, MW = 17.031 g/mol) according to the balanced equation: N₂ + 3 H₂ → 2 NH₃.
          </p>
          <ol>
            <li>
              <strong>Convert initial feeds to molar quantities:</strong>
              <br />
              Moles of N₂ = 50,000 g / 28.014 g/mol = 1,784.8 mol.
              <br />
              Moles of H₂ = 12,000 g / 2.016 g/mol = 5,952.4 mol.
            </li>
            <li>
              <strong>Evaluate stoichiometric limiting ratios:</strong>
              <br />
              N₂ quotient = 1,784.8 / 1 = 1,784.8.
              <br />
              H₂ quotient = 5,952.4 / 3 = 1,984.1.
              <br />
              Nitrogen (N₂) has the lower quotient (1,784.8 &lt; 1,984.1) and is the strictly limiting reagent.
            </li>
            <li>
              <strong>Calculate theoretical maximum ammonia yield:</strong>
              <br />
              Theoretical NH₃ moles = 1,784.8 mol × 2 = 3,569.6 mol.
              <br />
              Theoretical NH₃ mass = 3,569.6 mol × 17.031 g/mol = 60,793.9 g (60.79 kg).
            </li>
            <li>
              <strong>Determine unreacted excess hydrogen gas remaining:</strong>
              <br />
              H₂ consumed = 1,784.8 mol × 3 = 5,354.4 mol.
              <br />
              H₂ unreacted = 5,952.4 mol - 5,354.4 mol = 598.0 mol.
              <br />
              Unreacted H₂ mass = 598.0 mol × 2.016 g/mol = 1,205.6 g (1.21 kg remaining). Verify gas volumes with the <Link href="/calculators/science/ideal-gas-law-calculator">ideal gas law solver</Link>.
            </li>
          </ol>

          <h3>Case Study B: Aqueous Precipitation of Insoluble Barium Sulfate</h3>
          <p>
            An analytical environmental chemist mixes 500.0 mL of 0.200 M barium chloride (BaCl₂, MW = 208.23 g/mol) with 300.0 mL of 0.400 M sodium sulfate (Na₂SO₄, MW = 142.04 g/mol) to precipitate barium sulfate (BaSO₄, MW = 233.39 g/mol): BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s) + 2 NaCl(aq).
          </p>
          <ol>
            <li>
              <strong>Calculate moles of dissolved reactants:</strong>
              <br />
              Moles of Ba²⁺ = 0.500 L × 0.200 mol/L = 0.1000 mol.
              <br />
              Moles of SO₄²⁻ = 0.300 L × 0.400 mol/L = 0.1200 mol.
            </li>
            <li>
              <strong>Identify limiting reactant and precipitate mass:</strong>
              <br />
              Stoichiometric ratio is 1:1. Barium chloride is limiting (0.1000 mol available).
              <br />
              Theoretical BaSO₄ precipitated = 0.1000 mol × 233.39 g/mol = 23.34 g.
            </li>
            <li>
              <strong>Evaluate residual excess sulfate ion in supernatant:</strong>
              <br />
              Unprecipitated SO₄²⁻ = 0.1200 mol - 0.1000 mol = 0.0200 mol.
              <br />
              Total solution volume = 500 mL + 300 mL = 0.800 L.
              <br />
              Residual [SO₄²⁻] concentration = 0.0200 mol / 0.800 L = 0.0250 M. Convert residual concentrations via the <Link href="/calculators/science/concentration-calculator">solution concentration tool</Link>.
            </li>
          </ol>

          <h2>Operational Constraints & Non-Stoichiometric Realities</h2>
          <ol>
            <li>
              <strong>Chemical Reversibility and Dynamic Equilibrium:</strong> Stoichiometric calculations assume irreversible, 100% unidirectional forward reaction completion. In closed equilibrium systems (such as esterification or nitrogen fixation), the reaction reaches thermodynamic equilibrium governed by the equilibrium constant K_eq, leaving both reactants and products coexisting regardless of reagent ratios.
            </li>
            <li>
              <strong>Side Reactions and Byproduct Formation:</strong> Real chemical reactions rarely proceed via a single isolated pathway. Competitive parallel reactions (such as over-alkylation in Friedel-Crafts chemistry or carbon monoxide formation during incomplete combustion) consume limiting reagent atoms into side products, reducing actual target yields evaluated via the <Link href="/calculators/science/percent-yield-calculator">percent yield tool</Link>.
            </li>
            <li>
              <strong>Non-Stoichiometric Berthollide Compounds:</strong> While Dalton &apos;s law of definite proportions strictly governs molecular organic compounds and simple salts, many solid-state transition metal oxides and semiconductors (such as wüstite Fe₁₋ₓO or titanium dioxide TiO₂₋ₓ) exhibit non-integer stoichiometric crystal lattice defect vacancies.
            </li>
          </ol>

          <h2>Industrial Reactor Feed Control & Stoichiometric Automation</h2>
          <p>
            In modern chemical process engineering and petrochemical refineries, distributed control systems (DCS) continuously adjust reactant mass flow meters to maintain exact stoichiometric feed ratios. Automated feed control prevents hazardous accumulation of unreacted pyrophoric or toxic reagents in downstream separation units.
          </p>
          <Formula>
            {"\dot{m}_{\text{B, setpoint}} = \dot{m}_{\text{A, measured}} \cdot \left( \frac{b}{a} \right) \cdot \left( \frac{MW_{\text{B}}}{MW_{\text{A}}} \right) \cdot \left( \frac{1}{\text{Purity}_{\text{B}}} \right)"}
          </Formula>
          <p>
            Coriolis mass flow meters measure instantaneous mass flow rates and fluid densities directly, eliminating temperature-induced volumetric expansion errors. Process engineers integrate continuous stoichiometric flow algorithms with <Link href="/calculators/science/density-calculator">fluid density meters</Link>, model reaction exotherm cooling demands through the <Link href="/calculators/science/specific-heat-calculator">specific heat calorimetry tool</Link>, and monitor effluent pH neutralization via the <Link href="/calculators/science/ph-calculator">pH and chemical equilibrium calculator</Link>.
          </p>
          <p>
            In automated battery electrode slurry manufacturing, stoichiometric lithium-to-transition-metal precursor ratios (Li : Ni : Mn : Co) dictate electrochemical capacity and cycle lifetime. Inline X-ray fluorescence (XRF) analyzers measure atomic mole ratios in real time, auto-adjusting peristaltic dispensing pumps to eliminate excess lithium carbonate residues that cause severe gas evolution and battery swelling.
          </p>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Why cannot you determine the limiting reactant simply by looking at initial masses?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Reactants react on a molecule-by-molecule (mole-by-mole) basis, not on a gram-by-gram basis. A reactant with a lower initial mass might actually contain vastly more moles if it possesses a very low molecular weight (such as hydrogen gas at 2 g/mol versus bromine liquid at 160 g/mol). Limiting reactants can only be identified by dividing molar quantities by balanced stoichiometric coefficients.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">What is a stoichiometric feed versus an excess reagent feed?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                A stoichiometric feed introduces reactants in exact integer molar proportions matching the balanced equation, theoretically leaving zero leftover reactants. In practice, industrial processes deliberately introduce one cheap, abundant reagent (such as atmospheric oxygen or steam) in large excess to drive an expensive limiting reagent toward 100% conversion via Le Chatelier &apos;s principle.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">How does stoichiometry apply to gas reactions?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                According to Avogadro &apos;s law, equal volumes of gases at the same temperature and pressure contain equal numbers of moles. Therefore, for purely gaseous reactions under identical conditions, the integer mole ratios directly equal volumetric ratios (Gay-Lussac &apos;s law of combining volumes). For example, 2 liters of H₂ react with exactly 1 liter of O₂ to produce 2 liters of steam. Verify gas parameters using the <Link href="/calculators/science/ideal-gas-law-calculator">ideal gas law calculator</Link>.
              </p>
            </div>
          </div>

          <h2>Authoritative International Standards & Stoichiometric Metrology</h2>
          <p>
            For standardized IUPAC chemical nomenclature, stoichiometric definitions, and primary reference materials, consult:
          </p>
          <ul>
            <li>
              <strong>IUPAC Gold Book (Compendium of Chemical Terminology):</strong> Quantities, Units and Symbols in Physical Chemistry (The Green Book).
            </li>
            <li>
              <strong>National Institute of Standards and Technology (NIST SRM 351):</strong> Certified Chemical Titrimetric and Stoichiometric Standards.
            </li>
            <li>
              <strong>BIPM SI Brochure (9th Edition):</strong> Definition of the Mole and Avogadro Constant (N_A = 6.02214076 × 10²³ mol⁻¹).
            </li>
            <li>
              <strong>ISO 80000-9:</strong> Quantities and Units — Physical Chemistry and Molecular Physics.
            </li>
          </ul>
        </>
      }
    >
      <StoichiometryCalculatorComponent />
    </CalcPage>
  );
}
