import type { Metadata } from "next";
import Link from "next/link";
import PercentYieldCalculatorComponent from "@/components/calcs/science/percent-yield-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { PercentYieldReactionSelectivityChart } from "@/components/flagship/science/editorial-charts";

const PATH = "/calculators/science/percent-yield-calculator";
const TITLE = "Percent Yield Calculator | Reaction Efficiency & E-Factor Solver";
const DESCRIPTION =
  "Calculate chemical reaction percent yield, actual vs theoretical product yield, atom economy, and environmental E-factor across organic synthesis and industrial chemistry.";

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
  { href: "/calculators/science/stoichiometry-calculator", icon: "⚖️", name: "Stoichiometry Solver" },
  { href: "/calculators/science/molecular-weight-calculator", icon: "⚛️", name: "Molecular Weight Solver" },
  { href: "/calculators/science/molarity-calculator", icon: "🧪", name: "Molarity Dilution" },
  { href: "/calculators/science/density-calculator", icon: "💧", name: "Density Calculator" },
];

export default function PercentYieldCalculatorPage() {
  return (
    <CalcPage
      title="Percent Yield Calculator"
      intro="Comprehensive analytical solver for laboratory, clinical, and industrial chemical calculations."
      description="Compute synthetic percent yield, theoretical maximum product mass, atom economy, and environmental waste factor (E-factor). Balance limiting reagent stoichiometry, isolate purification losses, and evaluate sustainable chemical manufacturing efficiencies."
      path={PATH}
      category={{ href: "/pages/science", label: "Science & Chemistry" }}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Quick Answer: How Percent Yield is Calculated</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Percent yield quantifies synthetic conversion efficiency by dividing actual experimentally isolated product mass by the theoretical maximum yield predicted from balanced reaction stoichiometry: Percent Yield = (Actual Yield / Theoretical Yield) × 100%. In academic laboratories, yields of 70% to 90% represent successful organic transformations, while industrial processes strive for &gt; 95% alongside minimal waste E-factors. Prior to computing yield, confirm balanced reactant proportions using the <Link href="/calculators/science/stoichiometry-calculator">stoichiometric limiting reagent tool</Link> and convert reactant masses via the <Link href="/calculators/science/molecular-weight-calculator">molar mass calculator</Link>.
            </p>
          </div>

          <h2>Synthetic Reaction Yield vs Side-Product Distribution (%)</h2>
          <p>
            Chemical yield reflects thermodynamic conversion completeness, kinetic selectivity, and downstream isolation efficiency. Losses frequently stem from competitive side reactions, equilibrium reversibility, product volatilization, or mechanical retention on chromatography columns.
          </p>

          <PercentYieldReactionSelectivityChart />

          <h2>First-Principles Chemical Yield Derivations & Green Metrics</h2>
          <p>
            In synthetic chemistry, the theoretical yield is the maximum possible quantity of target compound produced assuming 100% stoichiometric conversion of the limiting reagent without side reactions or material losses. The mathematical formulation is:
          </p>
          <Formula>
            {"\text{Percent Yield (\%)} = \left( \frac{m_{\text{actual}}}{m_{\text{theoretical}}} \right) \times 100\% = \left( \frac{n_{\text{actual}}}{n_{\text{theoretical}}} \right) \times 100\%"}
          </Formula>
          <p>
            Beyond classical mass percent yield, modern green chemistry evaluates synthetic efficiency through holistic sustainable metrics. Sheldon &apos;s Environmental E-Factor evaluates the mass of waste generated per unit mass of isolated active pharmaceutical ingredient (API):
          </p>
          <Formula>
            {"E\text{-Factor} = \frac{\sum m_{\text{raw materials}} - m_{\text{isolated product}}}{m_{\text{isolated product}}} = \frac{m_{\text{waste}}}{m_{\text{product}}}"}
          </Formula>
          <p>
            Furthermore, Trost &apos;s Atom Economy (AE) measures how much of the reactant atoms are incorporated into the desired target molecule versus discarded stoichiometric byproducts:
          </p>
          <Formula>
            {"\text{Atom Economy (\%)} = \left( \frac{MW_{\text{target product}}}{\sum MW_{\text{all reactants}}} \right) \times 100\%"}
          </Formula>
          <p>
            An addition reaction (such as catalytic hydrogenation) achieves 100% atom economy, whereas substitution or Wittig olefination reactions generate substantial stoichiometric byproduct waste (such as triphenylphosphine oxide), requiring extensive solvent separation tracked via the <Link href="/calculators/science/density-calculator">solvent density calculator</Link> and <Link href="/calculators/science/concentration-calculator">solution concentration metrics</Link>.
          </p>

          <h2>Synthetic Reaction Benchmarks & Green Chemistry Reference</h2>
          <p>
            The table below illustrates representative percent yields, atom economies, and typical industrial E-factors across fundamental organic and industrial chemical transformations.
          </p>

          <DataTable
            head={["Reaction Category", "Representative Transformation", "Typical Yield (%)", "Atom Economy (%)", "Typical E-Factor"]}
            rows={[
              ["Catalytic Hydrogenation", "Alkene + H₂ → Alkane", "95 – 99%", "100%", "< 0.1 (Bulk Chem)"],
              ["Fischer Esterification", "Carboxylic Acid + Alcohol ⇌ Ester", "82 – 90%", "85 – 90%", "0.2 – 0.5"],
              ["Wittig Olefination", "Aldehyde + Phosphonium Ylide → Alkene", "65 – 80%", "28 – 35%", "2.5 – 5.0"],
              ["Suzuki-Miyaura Coupling", "Aryl Halide + Boronic Acid → Biaryl", "88 – 96%", "65 – 75%", "0.8 – 1.8"],
              ["Grignard Addition", "Ketone + RMgBr → Tertiary Alcohol", "72 – 85%", "55 – 65%", "1.2 – 2.5"],
              ["Multi-Step API Synthesis", "Total Synthesis of Complex Drug", "40 – 60%", "15 – 30%", "25 – 100 (Pharma)"],
            ]}
          />

          <h2>Comparative Operational Laboratory Worked Case Studies</h2>

          <h3>Case Study A: Aspirin Synthesis via Salicylic Acid Acetylation</h3>
          <p>
            A synthetic chemist reacts 13.81 g of salicylic acid (C₇H₆O₃, MW = 138.12 g/mol) with 20.42 g of acetic anhydride (C₄H₆O₃, MW = 102.09 g/mol) in the presence of sulfuric acid catalyst to synthesize acetylsalicylic acid (aspirin, C₉H₈O₄, MW = 180.16 g/mol) and acetic acid byproduct (C₂H₄O₂, MW = 60.05 g/mol). After recrystallization, the dry isolated aspirin crystals weigh 14.85 g.
          </p>
          <ol>
            <li>
              <strong>Determine limiting reactant moles:</strong>
              <br />
              Moles of salicylic acid = 13.81 g / 138.12 g/mol = 0.1000 mol.
              <br />
              Moles of acetic anhydride = 20.42 g / 102.09 g/mol = 0.2000 mol.
              <br />
              Salicylic acid is the limiting reagent (1:1 stoichiometry, 0.1000 mol available).
            </li>
            <li>
              <strong>Calculate theoretical maximum yield:</strong>
              <br />
              Theoretical product moles = 0.1000 mol.
              <br />
              Theoretical mass = 0.1000 mol × 180.16 g/mol = 18.016 g.
            </li>
            <li>
              <strong>Calculate percent yield:</strong>
              <br />
              Percent Yield = (14.85 g / 18.016 g) × 100% = 82.43%.
            </li>
            <li>
              <strong>Evaluate green chemistry E-factor:</strong>
              <br />
              Total raw materials input = 13.81 g + 20.42 g = 34.23 g.
              <br />
              Waste mass = 34.23 g - 14.85 g = 19.38 g.
              <br />
              E-Factor = 19.38 g / 14.85 g = 1.30 kg waste / kg isolated aspirin product. Verify aqueous liquid wastes with <Link href="/calculators/science/molarity-calculator">analytical molarity tools</Link>.
            </li>
          </ol>

          <h3>Case Study B: High-Throughput Pharmaceutical Suzuki Cross-Coupling</h3>
          <p>
            In a process chemistry pilot plant, 50.0 kg of 4-bromobenzonitrile (MW = 182.02 g/mol, 274.7 mol) is coupled with 46.5 kg of 4-chlorophenylboronic acid (MW = 156.38 g/mol, 297.3 mol) using 1 mol% palladium catalyst. The theoretical maximum biaryl product yield (MW = 213.66 g/mol) is 58.69 kg (274.7 mol). The pilot plant isolates 54.12 kg of purified active drug intermediate.
          </p>
          <ol>
            <li>
              <strong>Compute reaction percent yield:</strong>
              <br />
              Percent Yield = (54.12 kg / 58.69 kg) × 100% = 92.21%.
            </li>
            <li>
              <strong>Identify operational material loss:</strong>
              <br />
              Unrecovered intermediate = 58.69 kg - 54.12 kg = 4.57 kg (7.79% lost to aqueous wash emulsions and crystallizer mother liquors).
            </li>
            <li>
              <strong>Thermal validation:</strong> Reaction exothermicity is dissipated through jacketed reactors calibrated using the <Link href="/calculators/science/specific-heat-calculator">specific heat calorimetry tool</Link>.
            </li>
          </ol>

          <h2>Operational Constraints & Systematic Synthetic Error Factors</h2>
          <ol>
            <li>
              <strong>Apparent Yields Exceeding 100% (The Solvent Contamination Fallacy):</strong> A reported percent yield exceeding 100% is physically impossible under the law of conservation of mass. It invariably signifies incomplete product drying (retained water or high-boiling solvent such as DMF or DMSO), co-crystallization of inorganic salts, or unreacted starting material contamination. Such samples require vacuum oven desiccation and quantitative NMR purity assays.
            </li>
            <li>
              <strong>Equilibrium Reversibility & Le Chatelier Shifts:</strong> Condensation and esterification reactions reach thermodynamic equilibrium rather than 100% completion. Achieving high isolated yields requires driving the equilibrium forward by continuously removing side products (such as water removal via Dean-Stark distillation or molecular sieves).
            </li>
            <li>
              <strong>Mechanical Isolation & Mother Liquor Retention:</strong> Every physical isolation step—filtration, liquid-liquid extraction, rotary evaporation, and silica gel column chromatography—entrains a finite mass of product. In multi-step linear syntheses, an average step yield of 85% over eight steps results in an overall cumulative yield of only (0.85)⁸ = 27.2%.
            </li>
          </ol>

          <h2>Process Analytical Technology (PAT) & Real-Time Reaction In-Situ Monitoring</h2>
          <p>
            In modern continuous flow chemistry and active pharmaceutical ingredient synthesis, percent yield is no longer determined solely by post-reaction gravimetric weighing. Process Analytical Technology (PAT) uses in-situ immersion probes—such as attenuated total reflectance Fourier-transform infrared spectroscopy (ATR-FTIR), focused beam reflectance measurement (FBRM), and online high-performance liquid chromatography (HPLC)—to monitor reactant consumption and product generation in real time.
          </p>
          <Formula>
            {"\text{Conversion (\%)} = \left( 1 - \frac{A_t}{A_0} \right) \times 100\%, \quad \text{Selectivity (\%)} = \left( \frac{C_{\text{product}}}{\sum C_{\text{all products}}} \right) \times 100\%"}
          </Formula>
          <p>
            Continuous flow micro-reactors optimize heat and mass transfer, elevating reaction selectivity by suppressing localized concentration and temperature hotspots. Process chemists couple PAT spectral data with <Link href="/calculators/science/stoichiometry-calculator">stoichiometric mass balances</Link>, determine gas formation rates using the <Link href="/calculators/science/ideal-gas-law-calculator">ideal gas law calculator</Link>, and establish reaction equilibrium pH boundaries through the <Link href="/calculators/science/ph-calculator">pH and chemical equilibrium solver</Link>.
          </p>
          <p>
            Furthermore, automated continuous crystallization cascades monitor supersaturation profiles with turbidity detectors. By preventing secondary nucleation and agglomeration, crystallizers ensure target crystalline polymorph purity without trapping solvent impurities, directly preventing anomalous over-yield readings during automated batch releases.
          </p>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Why is actual yield almost always lower than theoretical yield?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Multiple physical and chemical mechanisms diminish actual yields: competitive side reactions generate unwanted byproducts, reactions may reach equilibrium before reaching 100% conversion, and mechanical losses occur during filtration, extraction, transfer between glassware, and chromatography. Additionally, impurities in raw materials reduce the true mass of reactive limiting reagent.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">What is the difference between percent yield and atom economy?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Percent yield measures the experimental efficiency of a specific laboratory run (how much of the theoretical product was successfully isolated). Atom economy is a theoretical property of the balanced reaction equation, measuring what percentage of all reactant atoms end up in the desired final product versus disposable stoichiometric waste molecules.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">How do continuous flow reactors improve reaction yields?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Continuous flow micro-reactors have extremely high surface-area-to-volume ratios, allowing near-instantaneous mixing and precise isothermal temperature control. This suppresses thermal runaway hotspots and eliminates side-reactions that commonly plague large-scale batch reactors, frequently raising chemical yields by 10% to 25% while slashing solvent waste. Verify reaction residence times alongside the <Link href="/calculators/science/half-life-calculator">first-order kinetics calculator</Link>.
              </p>
            </div>
          </div>


          <p>
            Process engineers also calculate the Carbon Efficiency (CE), tracking the percentage of carbon atoms from organic reactants incorporated into the isolated final molecule versus oxidatively degraded to gaseous carbon dioxide or volatile organic compound (VOC) incinerator exhaust. Maintaining high carbon efficiency directly reduces carbon tax liabilities in modern manufacturing facilities.
          </p>

          <h2>Authoritative International Standards & Green Chemistry Guidelines</h2>
          <p>
            For standardized chemical yield reporting, green manufacturing benchmarks, and pharmaceutical process validation, refer to authoritative governing organizations:
          </p>
          <ul>
            <li>
              <strong>American Chemical Society Green Chemistry Institute (ACS GCI):</strong> Standardized Definitions and Metrics for Sustainable Chemical Manufacturing and E-Factor Benchmarks.
            </li>
            <li>
              <strong>International Council for Harmonisation (ICH Q7):</strong> Good Manufacturing Practice Guidance for Active Pharmaceutical Ingredients.
            </li>
            <li>
              <strong>International Union of Pure and Applied Chemistry (IUPAC Division of Chemistry and the Environment):</strong> Glossary of Terms Related to Sustainable and Green Chemistry.
            </li>
            <li>
              <strong>National Institute of Standards and Technology (NIST Standard Reference Data):</strong> High-Purity Chemical Purity Verification and Standard Reference Materials.
            </li>
          </ul>
        </>
      }
    >
      <PercentYieldCalculatorComponent />
    </CalcPage>
  );
}
