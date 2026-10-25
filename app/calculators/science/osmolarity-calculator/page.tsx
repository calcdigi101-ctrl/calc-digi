import type { Metadata } from "next";
import Link from "next/link";
import OsmolarityCalculatorComponent from "@/components/calcs/science/osmolarity-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SerumOsmolarityElectrolyteChart } from "@/components/flagship/science/editorial-charts";

const PATH = "/calculators/science/osmolarity-calculator";
const TITLE = "Osmolarity Calculator | Serum Osmolality & Van 't Hoff Pressure Solver";
const DESCRIPTION =
  "Calculate total solution osmolarity, clinical serum osmolality, Van 't Hoff osmotic pressure, and tonicity balance across biological and pharmaceutical solutions.";

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
  { href: "/calculators/science/molarity-calculator", icon: "🧪", name: "Molarity Calculator" },
  { href: "/calculators/science/concentration-calculator", icon: "⚗️", name: "Solution Concentration" },
  { href: "/calculators/science/buffer-calculator", icon: "🛡️", name: "Buffer Capacity" },
  { href: "/calculators/science/density-calculator", icon: "⚖️", name: "Aqueous Density" },
];

export default function OsmolarityCalculatorPage() {
  return (
    <CalcPage
      title="Osmolarity Calculator"
      intro="Comprehensive analytical solver for laboratory, clinical, and industrial chemical calculations."
      description="Compute solution osmolarity (mOsm/L), clinical serum osmolality (mOsm/kg), and equilibrium osmotic pressure (Van 't Hoff). Evaluate solute dissociation factors, effective tonicity, and electrolyte contributions across physiological, intravenous, and parenteral solutions."
      path={PATH}
      category={{ href: "/pages/science", label: "Science & Chemistry" }}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Quick Answer: How Osmolarity is Determined</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Solution osmolarity represents the cumulative molar concentration of all osmotically active solute particles per liter of solution. For chemical solutions, multiply analytical molarity by the Van &apos;t Hoff dissociation factor (Osmolarity = C × i). In clinical medicine, human serum osmolality is evaluated from serum sodium, glucose, and blood urea nitrogen: Osmolarity = 2 × [Na⁺] + [Glucose]/18 + [BUN]/2.8. Normal human plasma ranges strictly between 275 and 295 mOsm/kg H₂O. Compare these values with analytical <Link href="/calculators/science/molarity-calculator">molar solution concentrations</Link> and verify solvent properties via the <Link href="/calculators/science/density-calculator">aqueous density calculator</Link>.
            </p>
          </div>

          <h2>Serum Osmolarity Speciation across Clinical Pathologies</h2>
          <p>
            Osmotic regulation is paramount in mammalian physiology and biopharmaceutical formulation. Intravenous fluids must precisely match the colligative osmotic potential of human blood plasma to prevent catastrophic red blood cell hemolysis or cellular crenation.
          </p>

          <SerumOsmolarityElectrolyteChart />

          <h2>First-Principles Osmotic Derivations & Equilibrium Formulations</h2>
          <p>
            Colligative properties depend exclusively on the numerical concentration of discrete solute particles rather than their chemical identity. The Van &apos;t Hoff equation describes the ideal osmotic pressure (Π) developed across a semipermeable membrane:
          </p>
          <Formula>
            {"\Pi = i \cdot C \cdot R \cdot T = \text{Osmolarity} \cdot R \cdot T"}
          </Formula>
          <p>
            Where i is the dimensionless Van &apos;t Hoff dissociation factor (reflecting complete ionic dissociation in dilute regimes), C is analytical solute molarity (mol/L), R is the universal gas constant (0.082057 L·atm/(mol·K)), and T is absolute temperature (K). In clinical laboratory diagnostics, serum osmolality is calculated using standard American conventional units:
          </p>
          <Formula>
            {"\text{Calculated Osmolality (mOsm/kg)} = 2 \cdot [\text{Na}^+] + \frac{[\text{Glucose (mg/dL)}]}{18} + \frac{[\text{BUN (mg/dL)}]}{2.8}"}
          </Formula>
          <p>
            The factor of 2 accounts for the stoichiometric counter-anions (primarily chloride and bicarbonate) accompanying positively charged sodium cations. The divisor 18 converts glucose mass concentration (mg/dL) into millimoles per liter (molecular weight = 180.16 g/mol, multiplied by 10 dL/L). Similarly, 2.8 converts blood urea nitrogen mass concentration into millimoles of urea (molecular weight of two nitrogen atoms = 28.01 g/mol). When formulating complex physiological fluids, chemists cross-reference solute fractions using the <Link href="/calculators/science/concentration-calculator">parts-per-million concentration tool</Link> and stabilize active electrolytes through the <Link href="/calculators/science/buffer-calculator">conjugate acid-base buffer calculator</Link>.
          </p>

          <h2>Physiological Fluid Benchmarks & Intravenous Osmolar Reference</h2>
          <p>
            The table below compiles documented osmolar concentrations, dissociation coefficients, and clinical tonicity classifications across standard therapeutic intravenous solutions and human body compartments.
          </p>

          <DataTable
            head={["Solution / Fluid Matrix", "Analytical Solute", "Van 't Hoff Factor (i)", "Osmolarity (mOsm/L)", "Clinical Tonicity"]}
            rows={[
              ["Normal Blood Plasma", "Electrolytes + Metabolites", "Variable (~1.85)", "285 – 295", "Isotonic Baseline"],
              ["0.9% Normal Saline (NaCl)", "154 mM NaCl", "2.00 (Ideal) / 1.85 (Real)", "308 (Nominal) / 286 (Real)", "Isotonic Crystalloid"],
              ["5% Dextrose in Water (D5W)", "278 mM Glucose", "1.00 (Non-electrolyte)", "278 (In Vitro)", "Physiologically Hypotonic"],
              ["Lactated Ringer's Solution", "Na, K, Ca, Cl, Lactate", "Speciated", "273", "Slightly Hypotonic"],
              ["0.45% Half-Normal Saline", "77 mM NaCl", "2.00 (Ideal)", "154", "Distinctly Hypotonic"],
              ["3.0% Hypertonic Saline", "513 mM NaCl", "2.00 (Ideal)", "1,026", "Severely Hypertonic"],
              ["Mannitol 20% Infusion", "1,098 mM Mannitol", "1.00 (Non-electrolyte)", "1,098", "Hyper-osmolar Diuretic"],
            ]}
          />

          <h2>Comparative Operational Laboratory Worked Case Studies</h2>

          <h3>Case Study A: Emergency Room Evaluation of Suspected Osmolal Gap</h3>
          <p>
            An emergency department patient presents with acute metabolic acidosis and altered mental status. Laboratory serum biochemistry reports: Sodium [Na⁺] = 138 mEq/L, Glucose = 108 mg/dL, and Blood Urea Nitrogen [BUN] = 14 mg/dL. Directly measured freezing-point depression osmometry indicates a measured serum osmolality of 324 mOsm/kg H₂O.
          </p>
          <ol>
            <li>
              <strong>Calculate baseline serum osmolality:</strong>
              <br />
              Sodium component: 2 × 138 = 276.0 mOsm/kg.
              <br />
              Glucose component: 108 / 18 = 6.0 mOsm/kg.
              <br />
              BUN component: 14 / 2.8 = 5.0 mOsm/kg.
              <br />
              Calculated Osmolality = 276.0 + 6.0 + 5.0 = 287.0 mOsm/kg.
            </li>
            <li>
              <strong>Evaluate the clinical Osmolal Gap:</strong>
              <br />
              Osmolal Gap = Measured Osmolality - Calculated Osmolality = 324 - 287 = 37 mOsm/kg.
            </li>
            <li>
              <strong>Diagnostic Interpretation:</strong> A normal osmolal gap is strictly beneath 10 mOsm/kg. An elevated gap of 37 mOsm/kg conclusively indicates the presence of unmeasured exogenous low-molecular-weight osmoles—such as toxic ingestion of ethylene glycol, methanol, or isopropanol—prompting immediate antidotal fomepizole administration. Radiochemists confirm toxicant molar mass parameters with the <Link href="/calculators/science/molecular-weight-calculator">molecular weight calculator</Link>.
            </li>
          </ol>

          <h3>Case Study B: Van &apos;t Hoff Pressure in Hemodialysis Dialysate Preparation</h3>
          <p>
            A biomedical production facility prepares an artificial dialysate buffer containing 140 mM NaCl (i = 1.85), 4 mM KCl (i = 1.85), 1.5 mM CaCl₂ (i = 2.60), and 35 mM NaHCO₃ (i = 1.85) at body temperature 37 °C (310.15 K).
          </p>
          <ol>
            <li>
              <strong>Compute individual solute osmolar contributions:</strong>
              <br />
              NaCl: 140 × 1.85 = 259.0 mOsm/L.
              <br />
              KCl: 4 × 1.85 = 7.4 mOsm/L.
              <br />
              CaCl₂: 1.5 × 2.60 = 3.9 mOsm/L.
              <br />
              NaHCO₃: 35 × 1.85 = 64.75 mOsm/L.
            </li>
            <li>
              <strong>Sum total dialysate osmolarity:</strong> 259.0 + 7.4 + 3.9 + 64.75 = 335.05 mOsm/L (0.33505 mol/L active osmoles).
            </li>
            <li>
              <strong>Calculate equilibrium osmotic pressure:</strong>
              <br />
              Π = 0.33505 mol/L × 0.082057 L·atm/(mol·K) × 310.15 K = 8.53 atm (864.3 kPa).
            </li>
            <li>
              <strong>Engineering Conclusion:</strong> Dialyzer semipermeable hollow fibers must withstand an osmotic pressure gradient of 8.53 atm without membrane delamination, verified alongside <Link href="/calculators/science/boiling-point-calculator">colligative boiling point elevations</Link>.
            </li>
          </ol>

          <h2>Operational Constraints & Biological Membrane Boundary Conditions</h2>
          <ol>
            <li>
              <strong>Effective vs. Ineffective Osmoles (Tonicity vs. Osmolarity):</strong> Osmolarity measures total dissolved particles regardless of whether they cross biological membranes. Tonicity measures only non-penetrating osmoles (such as sodium and mannitol) that exert trans-membrane osmotic gradients. Urea penetrates cell membranes freely via urea transporters; therefore, elevated BUN raises total measured serum osmolarity but does not induce intracellular dehydration.
            </li>
            <li>
              <strong>Osmolarity vs. Osmolality Divergence at High Concentrations:</strong> Osmolarity expresses osmoles per liter of total solution (temperature and solute volume dependent), whereas osmolality expresses osmoles per kilogram of pure water solvent (temperature independent). In hyperlipidemic or paraproteinemic sera, excessive plasma solids displace serum water, artificially deflating measured osmolarity unless direct ion-selective potentiometry is utilized.
            </li>
            <li>
              <strong>Non-Ideal Debye-Hückel Interionic Electrostatic Attractions:</strong> Concentrated saline solutions deviate downward from theoretical integer Van &apos;t Hoff factors (i = 2 for NaCl) because strong electrostatic ion-pairing restricts independent thermodynamic activity, yielding an effective experimental factor of approximately 1.85 at physiological ionic strengths.
            </li>
          </ol>

          <h2>Colligative Osmometry Instrumentation & Cryoscopic Metrology</h2>
          <p>
            In clinical pathology and biopharmaceutical quality control, osmometers quantify solution osmolality through cryoscopic freezing point depression rather than direct membrane osmometry. According to Raoult &apos;s thermodynamic law:
          </p>
          <Formula>
            {"\Delta T_f = K_f \cdot m \cdot i"}
          </Formula>
          <p>
            Where the cryoscopic constant for pure water is exactly 1.86 °C·kg/mol. A clinical serum specimen with an osmolality of 290 mOsm/kg H₂O depresses the freezing point of water by exactly: ΔT = 1.86 × 0.290 = 0.5394 °C, causing the specimen to freeze at -0.539 °C. Modern precision instruments supercool the serum aliquot below -7 °C, induce rapid crystallization via mechanical vibrational seed pulses, and monitor latent heat release plateau temperatures with platinum resistance thermistors calibrated against NIST-traceable sodium chloride reference standards. Chemical engineers analyze thermal energy transfers using the <Link href="/calculators/science/specific-heat-calculator">specific heat calorimetry calculator</Link> and balance reaction masses through the <Link href="/calculators/science/percent-yield-calculator">synthetic percent yield calculator</Link>.
          </p>
          <p>
            In automated micro-osmometry systems, nanoliter droplets are suspended on thermal micro-cantilevers within chilled mineral oil immersion baths. By tracking transient crystal nucleation kinetics and melting endotherms, robotic analyzers prevent sample evaporative volume shrinkage and detect subtle hyperosmolar toxicities in preclinical drug screening libraries with high repeatability.
          </p>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Why does 5% Dextrose (D5W) act as a hypotonic fluid inside the human body?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                In the intravenous infusion bag, D5W has an osmolarity of approximately 278 mOsm/L, making it nearly iso-osmolar with human plasma in vitro. However, upon entering the bloodstream, circulating glucose molecules are rapidly taken up into hepatocytes, skeletal muscle, and erythrocytes via insulin-mediated GLUT transporters and metabolized into carbon dioxide and water. The remaining solution is free water without effective osmoles, functionally behaving as a pure hypotonic water infusion in vivo.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">How does osmotic pressure differ from hydrostatic blood pressure?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Hydrostatic pressure is the mechanical outward force generated by myocardial ventricular pumping pushing fluid against vascular capillary walls. Osmotic pressure (and specifically colloid oncotic pressure generated by circulating serum albumin) is the chemical colligative inward force drawing water back into the vascular lumen. Trans-capillary fluid exchange operates via Starling equilibrium, governed by the delicate balance between hydrostatic filtration and oncotic absorption.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">What is the difference between osmolarity and osmolality?</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Osmolarity is defined per liter of total solution volume (mOsm/L), which varies slightly with temperature due to liquid volumetric thermal expansion. Osmolality is defined per kilogram of solvent mass (mOsm/kg), remaining perfectly invariant to thermal fluctuations. Clinical osmometers operate on mass-based freezing point depression and therefore measure osmolality directly. Compare both metrics using the <Link href="/calculators/science/concentration-calculator">solution concentration tool</Link>.
              </p>
            </div>
          </div>

          <h2>Authoritative International Standards & Clinical Metrology</h2>
          <p>
            For standardized clinical osmolality protocols, electrolyte reference materials, and cryoscopic metrology validation, consult established international standards:
          </p>
          <ul>
            <li>
              <strong>Clinical and Laboratory Standards Institute (CLSI C29-A):</strong> Standardization of Clinical Osmolality Freezing Point Depression Protocols.
            </li>
            <li>
              <strong>United States Pharmacopeia (USP &lt;785&gt; Osmolality and Osmolarity):</strong> Mandatory pharmaceutical testing methods for parenteral injectables and ophthalmic solutions.
            </li>
            <li>
              <strong>International Union of Pure and Applied Chemistry (IUPAC Compendium of Chemical Terminology):</strong> Physical chemistry definitions of colligative properties and thermodynamic activities.
            </li>
            <li>
              <strong>National Institute of Standards and Technology (NIST SRM 919b):</strong> Certified Reference Materials for Sodium Chloride Aqueous Osmometry Calibration.
            </li>
          </ul>
        </>
      }
    >
      <OsmolarityCalculatorComponent />
    </CalcPage>
  );
}
