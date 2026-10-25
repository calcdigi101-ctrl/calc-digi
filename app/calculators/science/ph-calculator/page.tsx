import type { Metadata } from "next";
import Link from "next/link";
import PhCalculatorComponent from "@/components/calcs/science/ph-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { PhScaleHydroniumConcentrationChart } from "@/components/flagship/science/editorial-charts";

const PATH = "/calculators/science/ph-calculator";
const TITLE = "pH Calculator | Hydronium [H⁺], pOH & Weak Acid Equilibrium Solver";
const DESCRIPTION =
  "Calculate solution pH, pOH, hydronium [H⁺] and hydroxide [OH⁻] concentrations, and weak acid Ka dissociation quadratic equilibria.";

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
  { href: "/calculators/science/buffer-calculator", icon: "🛡️", name: "Buffer Capacity" },
  { href: "/calculators/science/molarity-calculator", icon: "🧪", name: "Molarity Titration" },
  { href: "/calculators/science/concentration-calculator", icon: "⚗️", name: "Solution Concentration" },
  { href: "/calculators/science/osmolarity-calculator", icon: "🩸", name: "Osmolarity Solver" },
];

export default function PhCalculatorPage() {
  return (
    <CalcPage
      title="pH Calculator"
      intro="Comprehensive analytical solver for laboratory, clinical, and industrial chemical calculations."
      description="Compute solution pH, pOH, hydronium ion concentration [H⁺/H₃O⁺], and hydroxide ion concentration [OH⁻]. Solve strong acid/base complete dissociations and weak electrolyte quadratic chemical equilibria with dissociation constants (Ka and pKa)."
      path={PATH}
      category={{ href: "/pages/science", label: "Science & Chemistry" }}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Quick Answer: How pH is Determined</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              The pH scale measures the logarithmic activity of hydronium ions in aqueous solution: pH = -log₁₀[H⁺]. In neutral pure water at 25 °C, [H⁺] = [OH⁻] = 1.0 × 10⁻⁷ M, yielding a neutral pH of 7.00. Solutions with pH &lt; 7 are acidic, while solutions with pH &gt; 7 are alkaline. Because water autoionization satisfies [H⁺][OH⁻] = 1.0 × 10⁻¹⁴, pH and pOH always sum to exactly 14.00 at standard temperature. Cross-reference hydronium concentrations against analytical <Link href="/calculators/science/molarity-calculator">molar solution concentrations</Link> and stabilize pH swings using the <Link href="/calculators/science/buffer-calculator">buffer capacity calculator</Link>.
            </p>
          </div>

          <h2>Logarithmic [H⁺] vs [OH⁻] Reciprocal Equilibrium across pH Scale</h2>
          <p>
            Because pH is a logarithmic function, a change of one single pH unit corresponds to a tenfold (10×) shift in active hydronium ion concentration. A strong acid solution at pH 2 contains 100,000 times more free hydronium ions per liter than pure neutral water at pH 7.
          </p>

          <PhScaleHydroniumConcentrationChart />

          <h2>First-Principles Acid-Base Derivations & Quadratic Equilibria</h2>
          <p>
            Søren Sørensen originally formulated the pH scale in 1909 to characterize enzymatic fermentation equilibria. Rigorously, pH is defined in terms of thermodynamic hydronium ion activity (aH⁺ = γ · [H⁺]):
          </p>
          <Formula>
            {"\text{pH} = -\log_{10}(a_{\text{H}^+}) \approx -\log_{10}[\text{H}_3\text{O}^+]"}
          </Formula>
          <p>
            Water undergoes self-ionization (autoprotolysis) according to the equilibrium: 2 H₂O ⇌ H₃O⁺ + OH⁻. The ion product of water (Kw) is temperature-dependent, equalling exactly 1.008 × 10⁻¹⁴ at 25 °C:
          </p>
          <Formula>
            {"K_w = [\text{H}^+][\text{OH}^-] = 1.0 \times 10^{-14} \implies \text{pH} + \text{pOH} = 14.00"}
          </Formula>
          <p>
            For monoprotic strong acids (such as HCl, HNO₃, HClO₄), complete ionization occurs, so [H⁺] = C_acid. For weak acids (HA ⇌ H⁺ + A⁻) with acid dissociation constant Ka = 10^(-pKa), incomplete dissociation requires solving the exact quadratic equilibrium expression without approximations:
          </p>
          <Formula>
            {"K_a = \frac{[\text{H}^+][\text{A}^-]}{[\text{HA}]} = \frac{x^2}{C - x} \implies x^2 + K_a \cdot x - K_a \cdot C = 0"}
          </Formula>
          <p>
            Solving via the quadratic formula yields the exact hydronium concentration:
          </p>
          <Formula>
            {"[\text{H}^+] = \frac{-K_a + \sqrt{K_a^2 + 4 \cdot K_a \cdot C}}{2}"}
          </Formula>
          <p>
            This quadratic solution remains valid across all concentration regimes, eliminating the classic 5% approximation errors when acid concentration is dilute or Ka is moderately large (&gt; 10⁻³). Chemists pair these acid calculations with <Link href="/calculators/science/concentration-calculator">parts-per-million concentration conversions</Link> and verify fluid density shifts through the <Link href="/calculators/science/density-calculator">aqueous density calculator</Link>.
          </p>

          <h2>Standard pH Benchmarks & Common Chemical Matrix Reference</h2>
          <p>
            The table below compiles characteristic pH values, hydronium ion concentrations, and dominant chemical species across common biological, consumer, and industrial aqueous matrices.
          </p>

          <DataTable
            head={["Solution / Chemical Matrix", "Typical pH", "[H⁺] Molarity (mol/L)", "Dominant Active Species", "Classification"]}
            rows={[
              ["Battery Acid (33% H₂SO₄)", "0.3 – 0.8", "0.5 – 0.16 M", "H₃O⁺, HSO₄⁻, SO₄²⁻", "Extreme Strong Acid"],
              ["Gastric Stomach Acid", "1.5 – 2.0", "0.03 – 0.01 M", "HCl, Pepsin", "Strong Physiological Acid"],
              ["Lemon Juice (Citric Acid)", "2.2 – 2.4", "6.3 × 10⁻³ M", "Citric Acid, Citrate", "Moderate Weak Acid"],
              ["Pure Black Coffee", "4.8 – 5.2", "1.0 × 10⁻⁵ M", "Chlorogenic Acids", "Mildly Acidic"],
              ["Human Arterial Blood", "7.35 – 7.45", "4.0 × 10⁻⁸ M", "HCO₃⁻ / H₂CO₃ Buffer", "Slightly Alkaline"],
              ["Baking Soda (0.1 M NaHCO₃)", "8.3 – 8.5", "5.0 × 10⁻⁹ M", "HCO₃⁻, CO₃²⁻, Na⁺", "Mild Alkaline Buffer"],
              ["Household Ammonia (1 M)", "11.6", "2.5 × 10⁻¹² M", "NH₃, NH₄⁺, OH⁻", "Moderate Weak Base"],
              ["1.0 M Sodium Hydroxide (Lye)", "14.0", "1.0 × 10⁻¹⁴ M", "Na⁺, OH⁻", "Extreme Strong Base"],
            ]}
          />

          <h2>Comparative Operational Laboratory Worked Case Studies</h2>

          <h3>Case Study A: Precision pH Calculation of Dilute Acetic Acid (Vinegar)</h3>
          <p>
            An analytical food chemist formulates a standard pickling brine containing 0.020 M acetic acid (CH₃COOH, pKa = 4.756, Ka = 1.754 × 10⁻⁵) at 25 °C. The chemist calculates the exact equilibrium pH and degree of ionization (α).
          </p>
          <ol>
            <li>
              <strong>Set up the quadratic equilibrium equation:</strong>
              <br />
              x² + (1.754 × 10⁻⁵)x - (1.754 × 10⁻⁵)(0.020) = 0.
              <br />
              x² + (1.754 × 10⁻⁵)x - 3.508 × 10⁻⁷ = 0.
            </li>
            <li>
              <strong>Solve for [H⁺] via quadratic formula:</strong>
              <br />
              x = [-1.754 × 10⁻⁵ + √((1.754 × 10⁻⁵)² + 4(3.508 × 10⁻⁷))] / 2.
              <br />
              x = [-1.754 × 10⁻⁵ + √(3.076 × 10⁻¹⁰ + 1.4032 × 10⁻⁶)] / 2 = [-1.754 × 10⁻⁵ + 1.185 × 10⁻³] / 2 = 5.837 × 10⁻⁴ M.
            </li>
            <li>
              <strong>Compute pH and ionization percentage:</strong>
              <br />
              pH = -log₁₀(5.837 × 10⁻⁴) = 3.23.
              <br />
              Degree of ionization α = (5.837 × 10⁻⁴ / 0.020) × 100% = 2.92%.
            </li>
            <li>
              <strong>Analytical Verification:</strong> Only 2.92% of acetic acid molecules dissociate into free hydronium ions; 97.08% remain un-ionized neutral acetic acid molecules, confirmed with <Link href="/calculators/science/molecular-weight-calculator">acetic acid molecular weights</Link>.
            </li>
          </ol>

          <h3>Case Study B: Ultra-Dilute Strong Acid and Water Autoprotolysis Correction</h3>
          <p>
            A geochemical environmental researcher measures water runoff containing 1.0 × 10⁻⁸ M hydrochloric acid (HCl). A naive calculation gives pH = -log(1.0 × 10⁻⁸) = 8.00, which is physically absurd because adding acid to pure water cannot make it alkaline!
          </p>
          <ol>
            <li>
              <strong>Account for water autoprotolysis:</strong>
              <br />
              Total [H⁺] = [H⁺]_acid + [H⁺]_water = 1.0 × 10⁻⁸ + x, and [OH⁻] = x.
              <br />
              Kw = [H⁺][OH⁻] = (1.0 × 10⁻⁸ + x)(x) = 1.0 × 10⁻¹⁴.
            </li>
            <li>
              <strong>Solve quadratic for water dissociation x:</strong>
              <br />
              x² + 1.0 × 10⁻⁸ x - 1.0 × 10⁻¹⁴ = 0.
              <br />
              x = [-1.0 × 10⁻⁸ + √((1.0 × 10⁻⁸)² + 4(1.0 × 10⁻¹⁴))] / 2 = 9.512 × 10⁻⁸ M.
            </li>
            <li>
              <strong>Determine true total hydronium concentration and pH:</strong>
              <br />
              Total [H⁺] = 1.0 × 10⁻⁸ + 9.512 × 10⁻⁸ = 1.0512 × 10⁻⁷ M.
              <br />
              True pH = -log₁₀(1.0512 × 10⁻⁷) = 6.98.
            </li>
            <li>
              <strong>Scientific Conclusion:</strong> The solution is indeed slightly acidic (pH 6.98 &lt; 7.00), demonstrating that water autoprotolysis dominates whenever acid concentrations fall below 10⁻⁶ M. Evaluate ionic conductances through the <Link href="/calculators/science/ohms-law-calculator">Ohmic electrochemical cell calculator</Link>.
            </li>
          </ol>

          <h2>Operational Constraints & Glass Electrode Metrology Factors</h2>
          <ol>
            <li>
              <strong>Temperature Dependence of pH and Neutral Point:</strong> The water autoionization constant Kw varies dramatically with temperature: at 0 °C, Kw = 0.11 × 10⁻¹⁴ (neutral pH = 7.47); at 25 °C, Kw = 1.00 × 10⁻¹⁴ (neutral pH = 7.00); and at 100 °C, Kw = 51.3 × 10⁻¹⁴ (neutral pH = 6.14). Modern glass combination electrodes incorporate automatic temperature compensation (ATC) thermistors to adjust the Nernstian slope (-59.16 mV/pH at 25 °C versus -74.04 mV/pH at 100 °C).
            </li>
            <li>
              <strong>Alkaline Sodium Error (pH &gt; 10):</strong> At high pH regimes with elevated sodium ion concentrations, sodium cations compete with hydronium ions for ion-exchange sites on the lithium silicate glass sensing membrane, causing the electrode to register a pH lower than the true value unless specialized wide-range glass membranes are utilized.
            </li>
            <li>
              <strong>Acid Error in Concentrated Acids (pH &lt; 1):</strong> In concentrated strong acids (&gt; 1 M), water activity drops significantly below unity, causing the hydrated gel layer on the glass bulb to dehydrate and altering liquid junction potentials across the porous ceramic frit reference electrode.
            </li>
          </ol>

          <h2>Potentiometric Glass Electrode Instrumentation & Nernstian Calibration</h2>
          <p>
            Standard laboratory pH measurements utilize combination glass electrodes that generate an electrical potential proportional to hydronium ion activity. The theoretical cell potential is governed by the Nernst equation:
          </p>
          <Formula>
            {"E_{\text{cell}} = E^0 - \left( \frac{2.3026 \cdot R \cdot T}{F} \right) \cdot \text{pH} = E^0 - S(T) \cdot \text{pH}"}
          </Formula>
          <p>
            Where F is the Faraday constant (96,485 C/mol) and S(T) is the Nernstian electrode slope, equal to 59.16 mV per pH unit at 298.15 K (25 °C). A two-point calibration using certified IUPAC primary buffer standards (typically pH 4.01 phthalate and pH 7.00 phosphate) determines both the electrode zero-point offset (asymmetry potential) and the actual percentage slope (which must remain between 95% and 102% for analytical validity). In biological assays, chemists correlate pH shifts with <Link href="/calculators/science/osmolarity-calculator">solution osmolar tonicity</Link> and calculate thermodynamic sensible heat through the <Link href="/calculators/science/specific-heat-calculator">specific heat calorimetry tool</Link>.
          </p>
          <p>
            In semiconductor manufacturing, process stations deploy flowing-junction sleeve reference electrodes to prevent sample water ingress and maintain sub-0.02 pH accuracy across low-conductivity loops.
          </p>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Can a chemical solution have a negative pH or a pH greater than 14?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Yes. The conventional 0 to 14 pH scale is merely a convenient guideline for dilute aqueous solutions. A 12 M concentrated hydrochloric acid solution has an effective hydronium activity exceeding 12, resulting in a negative pH of approximately -1.1. Conversely, a 10 M saturated sodium hydroxide solution yields a calculated pH of approximately 15.0. However, in such concentrated regimes, ion-pairing and reduced water activity make standard glass electrodes unreliable.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Why does pure water at 60 °C have a pH of approximately 6.5? Is it acidic?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                No, water at 60 °C remains perfectly neutral. The endothermic autoionization of water shifts forward at higher temperatures, increasing Kw from 1.0 × 10⁻¹⁴ at 25 °C to 9.6 × 10⁻¹⁴ at 60 °C. At 60 °C, [H⁺] = [OH⁻] = 3.1 × 10⁻⁷ M, yielding pH = 6.51. Because hydronium and hydroxide concentrations remain exactly equal, the water is strictly neutral despite having a numerical pH beneath 7.00.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">What is the Henderson-Hasselbalch equation and when does it apply?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                The Henderson-Hasselbalch equation (pH = pKa + log([A⁻]/[HA])) is an approximation used for buffer solutions containing comparable concentrations of a weak acid and its conjugate base. It is valid when both conjugate species concentrations significantly exceed 10⁻³ M and the solution pH lies within ± 1 pH unit of the acid &apos;s pKa. For dedicated buffer formulation, use our <Link href="/calculators/science/buffer-calculator">buffer capacity calculator</Link>.
              </p>
            </div>
          </div>

          <h2>Authoritative International Standards & pH Metrology</h2>
          <p>
            For certified pH standard buffer preparations, electrochemical calibration procedures, and primary metrology standards, consult:
          </p>
          <ul>
            <li>
              <strong>IUPAC Recommendations (Compendium of Analytical Nomenclature):</strong> Measurement of pH: Definition, Standards, and Procedures (Harned Cell Primary Method).
            </li>
            <li>
              <strong>NIST Standard Reference Materials (SRM 185i, 186g):</strong> Potassium Hydrogen Phthalate and Potassium Dihydrogen Phosphate Primary pH Standards.
            </li>
            <li>
              <strong>ASTM International (ASTM D1293):</strong> Standard Test Methods for pH of Water and Industrial Aqueous Waste Streams.
            </li>
            <li>
              <strong>ISO 10523:</strong> Water Quality — Determination of pH in Environmental and Potable Waters.
            </li>
          </ul>
        </>
      }
    >
      <PhCalculatorComponent />
    </CalcPage>
  );
}
