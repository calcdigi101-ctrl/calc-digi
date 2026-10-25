import type { Metadata } from "next";
import Link from "next/link";
import MolarityCalculatorComponent from "@/components/calcs/science/molarity-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { MolarityDilutionCascadeChart } from "@/components/flagship/science/editorial-charts";

const PATH = "/calculators/science/molarity-calculator";
const TITLE = "Molarity Calculator | Solution Preparation & M1V1=M2V2 Dilution Solver";
const DESCRIPTION =
  "Calculate molarity, required dry solute mass, and liquid stock dilutions using the fundamental dilution equation M1V1 = M2V2 with automated volumetric unit conversions.";

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
  { href: "/calculators/science/molecular-weight-calculator", icon: "⚛️", name: "Molecular Weight Solver" },
  { href: "/calculators/science/buffer-calculator", icon: "🧪", name: "Henderson Buffer Solver" },
  { href: "/calculators/science/osmolarity-calculator", icon: "💧", name: "Osmolarity & Tonicity" },
  { href: "/calculators/science/stoichiometry-calculator", icon: "⚖️", name: "Stoichiometry & Reagents" },
  { href: "/calculators/science/boiling-point-calculator", icon: "🌡️", name: "Boiling Point & Vapor" },
];

const FAQ_ITEMS = [
  {
    q: "What is the exact physical definition of molarity (M)?",
    a: "Molarity (M), or molar concentration, is defined as the amount of chemical substance (in moles) dissolved per liter of total solution volume: M = n / V. In the International System of Units (SI), molar concentration is expressed in moles per cubic meter (mol/m³), though chemical and biological laboratories universally report concentrations in moles per liter (mol/L or M) or millimoles per liter (mM).",
  },
  {
    q: "How does the dilution equation M1V1 = M2V2 operate mathematically?",
    a: "The dilution equation M₁ &middot; V₁ = M₂ &middot; V₂ is derived directly from the law of conservation of mass. Because adding pure solvent (diluent) does not alter the absolute number of solute moles present in the aliquot (n = M &middot; V), initial moles in stock solution (n₁ = M₁ &middot; V₁) must identically match final moles in diluted solution (n₂ = M₂ &middot; V₂). Rearranging for required stock aliquot gives: V₁ = (M₂ &middot; V₂) / M₁.",
  },
  {
    q: "Why is water added to concentrated acid rather than acid to water a dangerous laboratory error?",
    a: "Diluting concentrated strong acids (like concentrated sulfuric acid, 18 M H₂SO₄) is a violently exothermic hydration reaction (&Delta;H_hydration << 0). Because concentrated acid is significantly denser than water (density 1.84 g/mL vs 1.00 g/mL), pouring water into acid causes the lighter water to sit on the surface, rapidly boiling and causing explosive splashing of corrosive acid. Laboratory protocol mandates always adding acid slowly to water (&ldquo;AAA: Always Add Acid&rdquo;).",
  },
  {
    q: "How do you calculate molarity from mass percentage (% w/w) and solution density?",
    a: "To convert commercial concentrated reagents (such as 37% HCl with density 1.19 g/mL) to molarity, multiply density (in g/L) by mass percent and divide by molar mass: M = (Density_g_mL &times; 1000 &times; %_mass) / Molar Mass. For 37% HCl (MW 36.46 g/mol): M = (1.19 &times; 1000 &times; 0.37) / 36.46 = 12.08 M.",
  },
  {
    q: "What is the critical distinction between molarity (M) and normality (N)?",
    a: "Molarity (M) measures moles of solute per liter of solution. Normality (N) measures reactive chemical equivalents per liter: N = M &middot; n_equivalents, where n represents reactive protons (H⁺) in acid-base reactions or electrons transferred in redox reactions. For monoprotic hydrochloric acid (HCl), 1.0 M = 1.0 N. For diprotic sulfuric acid (H₂SO₄), a 1.0 M solution is 2.0 N because each mole donates two protons.",
  },
  {
    q: "Why does volumetric solution preparation require dissolving solute before bringing to final volume?",
    a: "Solute dissolution is accompanied by volumetric expansion or contraction due to molecular interstitial packing and solute-solvent intermolecular bonding. If one adds 1.00 Liter of water directly to 58.44 grams of dry salt, final volume will exceed 1.00 Liter, reducing true molarity below 1.00 M. Accurate preparation requires dissolving solute in partial volume (~80% target), equilibrating to 20 &deg;C, and diluting to the volumetric mark.",
  },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/science", label: "Science & Chemistry" }}
      title="Molarity & Solution Dilution (M₁V₁ = M₂V₂) Calculator"
      intro="Calculate molar concentration, required dry solute mass for solution preparation, and liquid stock dilution volumes using the fundamental conservation formula M₁V₁ = M₂V₂."
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
                IUPAC & Clinical Chemistry Volumetric Standard
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Gravimetric & Volumetric Calibration</span>
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
                  Quick Answer: How are molarity and solution dilutions (M₁V₁ = M₂V₂) calculated?
                </strong>
                <p className="mt-1">
                  Molar concentration is calculated by dividing dissolved moles by total solution volume: M = n / V = (mass_g / MW) / Volume_L. When preparing a working solution from concentrated stock, conservation of moles dictates M₁ &middot; V₁ = M₂ &middot; V₂, where V₁ = (M₂ &middot; V₂) / M₁ represents the stock volume required. For multi-unit conversions, audit parts-per-million and mass percentages with our <Link href="/calculators/science/concentration-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">concentration calculator</Link>, prepare pH-stabilized solutions using the <Link href="/calculators/science/buffer-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">buffer calculator</Link>, or evaluate physiological fluid tonicity via our <Link href="/calculators/science/osmolarity-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">osmolarity calculator</Link>.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - EDITORIAL CHART DIRECTLY BELOW */}
          <h2>Volumetric Stock Partitioning in Analytical Dilution Cascades</h2>
          <div className="not-prose my-6">
            <MolarityDilutionCascadeChart />
          </div>

          <p>
            Molarity serves as the foundational universal concentration language across synthetic chemistry, cellular biology, molecular genetics, and pharmacology. From preparing millimolar enzymatic buffers to synthesizing industrial reagents, accurate volumetric and gravimetric preparation determines chemical reproducibility and experimental success.
          </p>

          <p>
            In high-throughput laboratories, preparing working solutions from dry powders for every experiment is inefficient and prone to weighing errors. Laboratories prepare high-concentration master stock solutions (such as 10&times; or 50&times; PBS or 1.0 M Tris) and dilute aliquots to target working titers. When performing stoichiometric calculations from known molarities, calculate reagent masses with our <Link href="/calculators/science/stoichiometry-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">stoichiometry calculator</Link> and verify molecular formulas using the <Link href="/calculators/science/empirical-formula-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">empirical formula calculator</Link>.
          </p>

          <h2>Fundamental Molarity Formulations & Dilution Mathematics</h2>

          <p>
            The mathematical formulation of molar concentration couples stoichiometry with the volumetric conservation law:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Molar Concentration Definition</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">M = n / V = (m_solute / MW) / V_solution(L)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Quantifies solute moles dissolved per liter of total solution volume.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Solute Mass Preparation Formula</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">m_solute(g) = M &middot; V_solution(L) &middot; MW(g/mol)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates exact dry powder mass required to prepare a specific volume at target molarity.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Conservation Dilution Law (M₁V₁ = M₂V₂)</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">M₁ &middot; V₁ = M₂ &middot; V₂   &rarr;   V₁ = (M₂ &middot; V₂) / M₁</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates required volume of concentrated stock solution M₁ to yield volume V₂ at molarity M₂.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. Diluent Solvent Volume Addition</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">V_diluent = V₂ - V₁   |   Dilution Factor = M₁ / M₂ = V₂ / V₁</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Quantifies required solvent addition volume to achieve target working dilution.</div>
          </Formula>

          <h2>Common Laboratory Concentrated Stock Acid Reagents</h2>

          <p>
            Standard industrial concentrated acids and bases supplied commercially, with their typical assay percentages, densities, and resultant stock molarities:
          </p>

          <DataTable
            head={["Reagent Name", "Chemical Formula", "Assay (% w/w)", "Density (g/mL)", "Molar Mass (g/mol)", "Stock Molarity (M)"]}
            rows={[
              ["Hydrochloric Acid", "HCl", "37.0%", "1.190", "36.46", "12.08 M"],
              ["Sulfuric Acid", "H₂SO₄", "96.0%", "1.840", "98.08", "18.01 M"],
              ["Nitric Acid", "HNO₃", "70.0%", "1.413", "63.01", "15.70 M"],
              ["Phosphoric Acid", "H₃PO₄", "85.0%", "1.685", "98.00", "14.62 M"],
              ["Acetic Acid (Glacial)", "CH₃COOH", "99.8%", "1.049", "60.05", "17.43 M"],
              ["Ammonium Hydroxide", "NH₄OH (NH₃)", "29.0%", "0.900", "35.05", "14.80 M"],
            ]}
          />

          <h2>Comparative Operational Laboratory Worked Case Studies</h2>

          <h3>Case Study A: Formulating 2.0 Liters of 0.250 M Copper(II) Sulfate Pentahydrate</h3>
          <p>
            A biochemical crystallization facility requires 2.00 Liters of 0.250 M copper(II) sulfate solution. The laboratory chemical shelf stocks hydrated crystalline copper(II) sulfate pentahydrate (CuSO₄&middot;5H₂O, molar mass 249.68 g/mol).
          </p>
          <ul>
            <li><strong>Moles Required:</strong> n = M &times; V = 0.250 mol/L &times; 2.00 L = 0.500 moles CuSO₄.</li>
            <li><strong>Required Hydrated Reagent Mass:</strong> mass = 0.500 mol &times; 249.68 g/mol = 124.84 grams of CuSO₄&middot;5H₂O.</li>
            <li><strong>Error Prevention Note:</strong> If one mistakenly utilized the anhydrous molar mass (159.61 g/mol), weighing 79.80 g would produce a defective 0.160 M solution (a 36% under-concentration).</li>
            <li><strong>Preparation Protocol:</strong> Weigh 124.84 g CuSO₄&middot;5H₂O on an analytical balance, dissolve in ~1,500 mL deionized water in a beaker, transfer quantitatively to a 2,000 mL volumetric flask, and dilute to the calibration line.</li>
          </ul>

          <p>
            To evaluate solution boiling elevation and vapor pressure depression of this metal salt solution, utilize our <Link href="/calculators/science/boiling-point-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">boiling point calculator</Link> and verify fluid density using the <Link href="/calculators/science/density-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">density calculator</Link>.
          </p>

          <h3>Case Study B: Preparing 500 mL of 1.00 M Hydrochloric Acid from 37% Stock</h3>
          <p>
            An analytical chemist requires 500.0 mL (0.500 L) of 1.00 M HCl for an acid-base neutralization titration, working from commercial 37.0% concentrated hydrochloric acid (M₁ = 12.08 M).
          </p>
          <ul>
            <li><strong>Stock Volume Calculation:</strong> V₁ = (M₂ &times; V₂) &divide; M₁ = (1.00 M &times; 0.500 L) &divide; 12.08 M = 0.04139 Liters = 41.39 mL.</li>
            <li><strong>Diluent Water Required:</strong> V_water = 500.0 mL - 41.39 mL = 458.61 mL.</li>
            <li><strong>Safety Protocol:</strong> Add ~300 mL deionized water to a 500 mL volumetric flask, pipette 41.4 mL concentrated HCl under a chemical fume hood, mix gently, cool to 20 &deg;C, and bring to the 500 mL mark.</li>
          </ul>

          <h2>Operational Constraints & Laboratory Metrological Protocols</h2>

          <p>
            When executing quantitative solution preparation and dilutions, technicians must maintain adherence to four chemical metrological protocols:
          </p>

          <ol>
            <li>
              <strong>Thermal Calibration Temperature of Volumetric Glassware:</strong> Class A volumetric flasks and pipettes are calibrated at 20 &deg;C (or 25 &deg;C). Preparing solutions with hot liquids or exothermic dissolution produces thermal expansion of borosilicate glass (linear expansion coefficient 3.3 &times; 10⁻⁶ / &deg;C), introducing volumetric errors.
            </li>
            <li>
              <strong>Quantitative Rinsing & Transfer Losses:</strong> When dissolving dry solids in a weighing boat, microscopic particles adhere to surfaces. Laboratory protocols mandate rinsing the weighing vessel with solvent wash bottles, transferring all washings quantitatively into the volumetric flask.
            </li>
            <li>
              <strong>Non-Additive Volumes in High Concentrations:</strong> When preparing high-concentration solutions (such as 8 M urea or 6 M guanidine HCl), the solid solute occupies significant physical volume (partial molar volume), displacing liquid and requiring dissolution in partial solvent.
            </li>
            <li>
              <strong>Parallax Error in Meniscus Alignment:</strong> Aqueous liquid surfaces form a concave meniscus due to surface tension. The operator&apos;s eye must be aligned horizontally with the calibration graduation line, reading the absolute bottom of the liquid curvature to avoid parallax volume distortion.
            </li>
          </ol>


          <h2>Primary Volumetric Standards, Thermal Expansivity & Ionic Buffer Coupling</h2>
          <p>
            In quantitative chemical analysis, standard solution preparation demands certified primary analytical
            reagents characterized by documented purity, high molecular weight to minimize weighing errors, and minimal
            hygroscopicity. Reagents such as potassium hydrogen phthalate (KHP) and anhydrous sodium carbonate are
            dissolved in volumetric glassware calibrated at 20 °C to standardize secondary titrants:
          </p>
          <Formula>
            {"M_{titrant} = (m_{primary\,standard} * 1000) / (MW_{standard} * V_{equivalence\,(mL)})"}
          </Formula>
          <p>
            Because volumetric solution volume expands thermally with ambient temperature changes, high-precision laboratories
            rely on
            {" "}<Link href="/calculators/science/density-calculator">solvent density calibration</Link>{" "}
            to correct for seasonal temperature fluctuations. For biological and clinical buffer systems, precise molar concentrations are fed into
            {" "}<Link href="/calculators/science/osmolarity-calculator">physiological osmolarity calculators</Link>{" "}
            and coupled with
            {" "}<Link href="/calculators/science/buffer-calculator">buffer capacity formulations</Link>{" "}
            to preserve intracellular pH homeostasis and prevent cell lysis during cellular assays.
          </p>
          <p>
            Furthermore, gravimetric reagent dispensing on four-place analytical balances introduces weighing uncertainties influenced by ambient air buoyancy. High-purity reference material certifiers correct apparent mass readings for ambient barometric density and sample displacement volumes. When preparing concentrated stock solutions of hydrating salts (such as copper sulfate pentahydrate or magnesium chloride hexahydrate), chemists explicitly factor waters of crystallization into formula weight calculations to ensure actual anhydrous active cation concentrations match design targets.
          </p>


          <p>
            Automated laboratory liquid handling robots and automated pipetting workstations require liquid class calibration based on solution dynamic viscosity and surface tension. Aqueous salt solutions at molar concentrations exceeding 2.0 M display markedly increased fluid densities and viscosities compared to deionized water, requiring slower aspiration speeds and extended blowout delays to prevent volume delivery systematic bias.
          </p>

          <h2>Authoritative International Standards & Metrology</h2>

          <p>
            For certified analytical laboratory procedures and volumetric calibration compliance, consult international quality standards:
          </p>
          <ul>
            <li>
              <strong>ISO 1042:1998:</strong> Laboratory glassware &mdash; One-mark volumetric flasks (Class A tolerances and calibration specifications).
            </li>
            <li>
              <strong>ASTM E288-10:</strong> Standard Specification for Laboratory Glass Volumetric Flasks.
            </li>
            <li>
              <strong>ISO 8655-2:2022:</strong> Piston-operated volumetric apparatus &mdash; Pipettes (Gravimetric testing and calibration protocols).
            </li>
            <li>
              <strong>United States Pharmacopeia (USP &lt;31&gt;):</strong> Volumetric Apparatus and Volumetric Solutions specifications.
            </li>
          </ul>
        </>
      }
    >
      <MolarityCalculatorComponent />
    </CalcPage>
  );
}
