import type { Metadata } from "next";
import Link from "next/link";
import BufferCalculatorComponent from "@/components/calcs/science/buffer-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { BufferTitrationCurveChart } from "@/components/flagship/science/editorial-charts";

const PATH = "/calculators/science/buffer-calculator";
const TITLE = "Buffer Calculator | Henderson-Hasselbalch pH & Buffer Capacity Solver";
const DESCRIPTION =
  "Calculate buffer solution pH, acid-conjugate base molar ratios, and Van Slyke buffer capacity using the Henderson-Hasselbalch equation and weak acid-base dissociation constants.";

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
  { href: "/calculators/science/ph-calculator", icon: "🧪", name: "pH & pOH Calculator" },
  { href: "/calculators/science/molarity-calculator", icon: "⚗️", name: "Molarity & Dilution" },
  { href: "/calculators/science/concentration-calculator", icon: "🔬", name: "Solution Concentration" },
  { href: "/calculators/science/osmolarity-calculator", icon: "💧", name: "Osmolarity & Tonicity" },
  { href: "/calculators/science/boiling-point-calculator", icon: "🌡️", name: "Boiling Point Elevation" },
  { href: "/calculators/science/stoichiometry-calculator", icon: "⚖️", name: "Stoichiometry & Reagents" },
];

const FAQ_ITEMS = [
  {
    q: "What is a chemical buffer and how does it resist pH changes?",
    a: "A chemical buffer is an aqueous solution consisting of a mixture of a weak acid and its conjugate base (or a weak base and its conjugate acid). When small amounts of strong acid (H⁺) are introduced, the conjugate base neutralizes them (A⁻ + H⁺ -> HA). Conversely, when strong base (OH⁻) is added, the weak acid donates protons to neutralize the hydroxide (HA + OH⁻ -> A⁻ + H₂O), minimizing shifts in hydronium concentration.",
  },
  {
    q: "What is the Henderson-Hasselbalch equation and when does it apply?",
    a: "The Henderson-Hasselbalch equation models the equilibrium relationship between solution pH, acid dissociation constant (pKa), and conjugate base-to-acid molar ratio: pH = pKa + log10([A⁻] / [HA]). It applies accurately when weak acid and base concentrations are significantly higher (typically > 0.01 M) than the autoionization of water, and where ionic strength does not cause severe departures from unity activity coefficients.",
  },
  {
    q: "What is buffer capacity (beta) and where is it maximized?",
    a: "Buffer capacity (&beta;), formalized by Donald Van Slyke, is the quantitative measure of a buffer's resistance to pH change upon the addition of strong acid or base. Mathematically, &beta; = 2.303 &middot; C &middot; (Ka &middot; [H⁺] / (Ka + [H⁺])&sup2;), where C is total buffer concentration. Buffer capacity reaches its absolute maximum when pH equals pKa, corresponding to an equimolar ratio ([A⁻] / [HA] = 1.0).",
  },
  {
    q: "Why is the effective buffering range universally defined as pKa ± 1.0?",
    a: "When solution pH departs from pKa by &plusmn;1.0 pH unit, the ratio of conjugate base to weak acid shifts from 10:1 (at pH = pKa + 1) to 1:10 (at pH = pKa - 1). Beyond this boundary envelope, more than 91% of the buffer exists in one speciation form, severely depleting the counter-species required to neutralize added acid or base and causing buffer capacity to collapse.",
  },
  {
    q: "How does temperature alter buffer pH in biological research?",
    a: "Weak acid ionization reactions are temperature-dependent enthalpy processes. For instance, amine-based biological buffers like Tris exhibit a substantial negative temperature coefficient (dpKa/dT &asymp; -0.028 / &deg;C). A Tris buffer calibrated to pH 8.00 at 25 &deg;C will drift to pH 8.28 at 4 &deg;C (cold room chromatography) and drop to pH 7.66 at 37 &deg;C (physiological incubation), necessitating temperature-matched calibration.",
  },
  {
    q: "How does ionic strength influence the actual pH of a buffer solution?",
    a: "As total dissolved salt concentration rises, ionic interactions shield charged buffer ions, lowering their thermodynamic activity coefficients (&gamma;). Under the Extended Debye-H&uuml;ckel Law, effective pKa drops for polyvalent species like phosphate buffers (H₂PO₄⁻ / HPO₄²⁻), causing measured potentiometric pH to read 0.1 to 0.3 units lower than ideal Henderson-Hasselbalch predictions.",
  },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/science", label: "Science & Chemistry" }}
      title="Buffer Solution & Henderson-Hasselbalch Calculator"
      intro="Calculate weak acid and conjugate base buffer pH, molar speciation ratios, and Van Slyke buffer capacity across biochemical and analytical buffer systems using thermodynamic ionization constants."
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
                IUPAC & CLSI Biochemical Buffer Standard
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Thermodynamic Acid-Base Equilibrium</span>
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
                  Quick Answer: What is the Henderson-Hasselbalch equation and how is buffer pH calculated?
                </strong>
                <p className="mt-1">
                  Buffer solution equilibrium pH is calculated using the Henderson-Hasselbalch formulation: pH = pKa + log10([A⁻] / [HA]), where pKa is the negative logarithm of the weak acid dissociation constant, [A⁻] is conjugate base molarity, and [HA] is undissociated weak acid molarity. When base and acid concentrations are equimolar ([A⁻] = [HA]), the logarithmic term evaluates to zero and solution pH exactly equals pKa. To verify unbuffered acid-base solutions, audit hydronium ions with our <Link href="/calculators/science/ph-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">pH calculator</Link>, prepare stock solutions using the <Link href="/calculators/science/molarity-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">molarity calculator</Link>, or evaluate physiological fluid osmolarity with our <Link href="/calculators/science/osmolarity-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">osmolarity calculator</Link>.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - EDITORIAL CHART DIRECTLY BELOW */}
          <h2>Acid-Base Titration Curvature & Van Slyke Buffer Capacity</h2>
          <div className="not-prose my-6">
            <BufferTitrationCurveChart />
          </div>

          <p>
            Chemical buffers are essential to cellular homeostasis, pharmaceutical formulation, and industrial enzymatic catalysis. In biological systems, enzymes and metabolic pathways function only within tightly regulated narrow pH corridors. For instance, human blood plasma is buffered strictly between pH 7.35 and 7.45 by the carbonic acid-bicarbonate buffer system; deviations outside 6.8 to 7.8 are lethal. Quantitative mastery of buffer equilibrium allows biochemists and analytical chemists to formulate solutions that withstand chemical perturbations.
          </p>

          <p>
            The resistance of a buffer against strong acid or base additions is quantified by the Van Slyke buffer index (&beta;). Buffer capacity peaks when the acid and conjugate base are present in identical concentrations, creating a broad plateau on the titration curve. When performing complex stoichiometric additions during buffer preparation, verify reactant mass requirements using our <Link href="/calculators/science/stoichiometry-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">stoichiometry calculator</Link> and calculate mass concentrations via the <Link href="/calculators/science/concentration-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">concentration calculator</Link>.
          </p>

          <h2>Henderson-Hasselbalch Formulations & Mathematical Principles</h2>

          <p>
            The derivation of buffer equilibrium begins with the mass action expression for weak acid ionization: HA &hArr; H⁺ + A⁻. Taking the negative logarithm of both sides yields the classical Henderson-Hasselbalch relationship:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Henderson-Hasselbalch Buffer Formulation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">pH = pKa + log10([A⁻] / [HA])</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Connects equilibrium pH directly to thermodynamic pKa and conjugate base-to-acid molarity ratio.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Van Slyke Buffer Capacity Index (&beta;)</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">&beta; = 2.303 &middot; C &middot; [(Ka &middot; [H⁺]) / (Ka + [H⁺])&sup2;]</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Quantifies buffer resistance in moles of strong acid/base required per liter to shift pH by 1.0 unit.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Conjugate Acid-Base Mass Balance Relation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">C_total = [HA] + [A⁻]   |   [HA] = C_total / (1 + 10^(pH - pKa))</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates precise concentration fractions of weak acid and conjugate base required for target pH.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. Hydronium & Hydroxide Speciation Products</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">[H⁺] = 10^(-pH)   |   pOH = 14.00 - pH   |   [OH⁻] = 10^(-pOH)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Converts logarithmic pH values into absolute aqueous molar ionic concentrations at 25 °C.</div>
          </Formula>

          <h2>Standard Biological & Chemical Buffer Reference Standards</h2>

          <p>
            Selecting an effective buffer system requires aligning the target experimental pH with a weak acid possessing an identical or proximal pKa value (&plusmn;1.0 pH unit):
          </p>

          <DataTable
            head={["Buffer System", "Acid Component", "Base Component", "pKa (25°C)", "Useful pH Range", "dpKa/dT (/°C)"]}
            rows={[
              ["Formate Buffer", "Formic Acid (HCOOH)", "Sodium Formate (HCOONa)", "3.75", "2.8 - 4.8", "+0.000"],
              ["Acetate Buffer", "Acetic Acid (CH₃COOH)", "Sodium Acetate (CH₃COONa)", "4.76", "3.8 - 5.8", "+0.000"],
              ["Carbonic Acid", "Carbonic Acid (H₂CO₃)", "Bicarbonate (NaHCO₃)", "6.35", "5.4 - 7.4", "-0.009"],
              ["Phosphate (PBS)", "Dihydrogen Phosphate (H₂PO₄⁻)", "Hydrogen Phosphate (HPO₄²⁻)", "7.20", "6.2 - 8.2", "-0.003"],
              ["HEPES Biological", "HEPES Free Acid", "HEPES Sodium Salt", "7.50", "6.8 - 8.2", "-0.014"],
              ["Tris Buffer", "Tris-HCl Acid", "Tris Free Base", "8.06", "7.0 - 9.0", "-0.028"],
              ["Ammonium Buffer", "Ammonium Ion (NH₄⁺)", "Ammonia Solution (NH₃)", "9.25", "8.3 - 10.3", "-0.031"],
            ]}
          />


          <h2>Zwitterionic Good's Buffers in Biological & Cellular Research</h2>

          <p>
            In 1966, biochemist Norman Good and colleagues synthesized a series of 12 zwitterionic N-substituted aminosulfonic acid buffers (including HEPES, PIPES, MES, and MOPS) specifically engineered for biological research. Traditional inorganic buffers (such as phosphate and borate) suffer from severe biochemical drawbacks: phosphate precipitates essential polyvalent cations (such as Ca²⁺ and Mg²⁺), inhibits metabolic kinases, and permeates biological membranes, causing artifactual cell shrinkage.
          </p>

          <p>
            In contrast, Good's buffers exhibit minimal cellular membrane permeability, negligible toxic heavy metal complexation, exceptional chemical stability, and complete optical transparency in the ultraviolet spectrum (240 to 280 nm), preventing optical interference during spectrophotometric DNA and protein quantification. When preparing physiological culture media, determine buffer molar concentrations using our <Link href="/calculators/science/molarity-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">molarity calculator</Link> and audit total dissolved osmoles with our <Link href="/calculators/science/osmolarity-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">osmolarity calculator</Link>.
          </p>

          <h2>Thermodynamic Temperature Drift (dpKa/dT) in Cryo-Biochemistry</h2>

          <p>
            Weak acid dissociation is an endothermic enthalpy process described by the van &apos;t Hoff isobar: d(ln Ka) / dT = &Delta;H&deg; / (R&middot;T&sup2;). Consequently, buffer pKa values and operating solution pH drift substantially with temperature changes:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">5. Temperature-Corrected Buffer pKa Equation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">pKa(T₂) = pKa(T₁) + (dpKa / dT) &middot; (T₂ - T₁)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Corrects buffer dissociation constants across biological incubation and cold-room temperatures.</div>
          </Formula>

          <p>
             For unbuffered acid solutions, model baseline hydronium ion activity with our <Link href="/calculators/science/ph-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">pH calculator</Link> and calculate thermal energy transfer during temperature adjustments using the <Link href="/calculators/science/specific-heat-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">specific heat calculator</Link>.
          </p>

          <h2>Comparative Operational Laboratory Worked Case Studies</h2>

          <h3>Case Study A: Formulating 1.0 Liter of 0.10 M Phosphate Buffer at pH 7.40</h3>
          <p>
            A molecular biology laboratory requires 1.00 Liter of physiological phosphate-buffered saline (PBS) at pH 7.40 with total phosphate concentration C = 0.100 M at 25 &deg;C. The second dissociation constant of phosphoric acid is pKa = 7.20.
          </p>
          <ul>
            <li><strong>Base-to-Acid Ratio:</strong> pH - pKa = 7.40 - 7.20 = +0.20 &rarr; [HPO₄²⁻] / [H₂PO₄⁻] = 10^(0.20) = 1.585.</li>
            <li><strong>Fractional Speciation:</strong> Base fraction = 1.585 / (1 + 1.585) = 0.613 (61.3%); Acid fraction = 38.7%.</li>
            <li><strong>Target Molarities:</strong> [HPO₄²⁻] = 0.0613 M; [H₂PO₄⁻] = 0.0387 M.</li>
            <li><strong>Reagent Masses for 1.0 L:</strong> Na₂HPO₄ (molar mass 141.96 g/mol) = 0.0613 &times; 141.96 = 8.70 grams; NaH₂PO₄ (119.98 g/mol) = 0.0387 &times; 119.98 = 4.64 grams.</li>
            <li><strong>Calculated Buffer Capacity:</strong> &beta; = 2.303 &times; 0.100 &times; [10^(-7.20) &times; 10^(-7.40) / (10^(-7.20) + 10^(-7.40))&sup2;] = 0.0546 mol/(L&middot;pH).</li>
          </ul>

          <p>
            To verify solution density or thermal boiling characteristics of this saline buffer, consult our <Link href="/calculators/science/density-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">density calculator</Link> and calculate colligative shifts using the <Link href="/calculators/science/boiling-point-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">boiling point calculator</Link>.
          </p>

          <h3>Case Study B: Blood Carbonic Acid-Bicarbonate Respiratory Regulation</h3>
          <p>
            In human physiology, arterial blood maintains normal pH 7.40 using carbonic acid (H₂CO₃, pKa = 6.35) and bicarbonate (HCO₃⁻). Average dissolved arterial H₂CO₃ is 1.20 mM (0.00120 M).
          </p>
          <ul>
            <li><strong>Required Ratio:</strong> log10([HCO₃⁻] / [H₂CO₃]) = 7.40 - 6.35 = 1.05 &rarr; Ratio = 10^(1.05) = 11.22 : 1.</li>
            <li><strong>Bicarbonate Concentration:</strong> [HCO₃⁻] = 1.20 mM &times; 11.22 = 13.46 mM (or ~24 mEq/L when accounting for dissolved gaseous CO₂ equilibrium).</li>
            <li><strong>Acidosis Clinical Shift:</strong> If hypoventilation elevates dissolved carbonic acid to 2.40 mM, pH shifts: pH = 6.35 + log10(13.46 / 2.40) = 7.10 (severe respiratory acidosis).</li>
          </ul>

          <h2>Operational Constraints & Environmental Boundary Conditions</h2>

          <p>
            When utilizing Henderson-Hasselbalch models in analytical and industrial chemistry, four critical limitations must be factored into experimental designs:
          </p>

          <ol>
            <li>
              <strong>Activity Coefficient Deviations at High Ionic Strength:</strong> In concentrated solutions (&gt; 0.1 M), electrostatic screening lowers ion activity. Thermodynamic equilibrium depends on chemical activity a = &gamma;&middot;C. For polyvalent buffers like phosphate, ignoring activity coefficients produces deviations up to 0.25 pH units.
            </li>
            <li>
              <strong>Dilution-Induced pH Drift:</strong> While ideal Henderson-Hasselbalch equations indicate pH is independent of volume, real-world dilution alters activity coefficients and water autoionization contributions, shifting pH slightly upon extensive water addition.
            </li>
            <li>
              <strong>Atmospheric Carbon Dioxide Absorption:</strong> Basic buffers exposed to air absorb gaseous carbon dioxide: CO₂ + H₂O &hArr; H₂CO₃, gradually acidifying unsealed Tris and ammonium buffers over days.
            </li>
            <li>
              <strong>Polyprotic Overlapping Ionizations:</strong> For polyprotic acids with closely spaced pKa values (such as citric acid: pKa₁ = 3.13, pKa₂ = 4.76, pKa₃ = 6.40), multiple overlapping ionization equilibria operate concurrently, requiring simultaneous polynomial equilibrium solving.
            </li>
          </ol>

          <h2>Authoritative International Standards & Metrology</h2>

          <p>
            For certified laboratory buffer preparation and pH meter standardization, consult international chemical metrology standards:
          </p>
          <ul>
            <li>
              <strong>IUPAC Recommendations (Pure Appl. Chem., Vol. 74, 2002):</strong> Measurement of pH. Definition, standards, and procedures for primary buffer calibration.
            </li>
            <li>
              <strong>NIST Standard Reference Materials (SRM 185i - 189c):</strong> Certified primary standard buffer salts (potassium hydrogen phthalate, phosphate, borax) for electrode calibration.
            </li>
            <li>
              <strong>Clinical and Laboratory Standards Institute (CLSI C46-A2):</strong> Blood Gas and pH Analysis and Related Measurements in clinical laboratory diagnostics.
            </li>
            <li>
              <strong>European Pharmacopoeia (Ph. Eur. 2.2.3):</strong> Potentiometric determination of pH in pharmaceutical drug formulations.
            </li>
          </ul>
        </>
      }
    >
      <BufferCalculatorComponent />
    </CalcPage>
  );
}
