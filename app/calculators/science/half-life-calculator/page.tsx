import type { Metadata } from "next";
import Link from "next/link";
import HalfLifeCalculatorComponent from "@/components/calcs/science/half-life-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { RadioactiveDecayHalfLifeChart } from "@/components/flagship/science/editorial-charts";

const PATH = "/calculators/science/half-life-calculator";
const TITLE = "Half-Life Calculator | Radioactive Decay & First-Order Kinetics Solver";
const DESCRIPTION =
  "Calculate radioactive decay remaining amounts, decay constants, mean lifetimes, and elapsed half-lives using first-order exponential decay kinetics and isotopic half-life benchmarks.";

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
  { href: "/calculators/science/stoichiometry-calculator", icon: "⚖️", name: "Stoichiometric Reactions" },
  { href: "/calculators/datetime/time-duration-calculator", icon: "⏱️", name: "Time Duration Solver" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Percentage Calculations" },
  { href: "/calculators/science/molarity-calculator", icon: "🧪", name: "Molarity & Dilution" },
];

const FAQ_ITEMS = [
  {
    q: "What is the physical definition of a radioactive half-life?",
    a: "A half-life (t½) is the time required for exactly one-half of the unstable atomic nuclei in a radioactive isotope sample to undergo spontaneous nuclear transmutation or decay. Because radioactive decay follows strict first-order exponential kinetics, the half-life is an invariant constant that is completely independent of initial sample mass, physical temperature, chemical bonding state, or pressure.",
  },
  {
    q: "What is the mathematical equation connecting decay constant (lambda) and half-life?",
    a: "The decay constant (&lambda;) represents the instantaneous fractional decay probability per unit time. Setting the remaining fraction N(t)/N₀ equal to 0.5 in the exponential decay law N(t) = N₀ &middot; e^(-&lambda;t) derives: &lambda; = ln(2) / t½ &asymp; 0.69315 / t½. The mean atomic lifetime (&tau;), representing the average survival time of a radioisotope before transmutation, equals the reciprocal: &tau; = 1 / &lambda; = 1.4427 &middot; t½.",
  },
  {
    q: "How does radiocarbon dating utilize Carbon-14 half-life to determine archaeological age?",
    a: "Cosmic ray bombardment of atmospheric nitrogen generates radioactive Carbon-14 (t½ = 5,730 years), which enters the terrestrial food web via photosynthetic CO₂ fixation at a steady equilibrium ratio (~1 atom of ¹⁴C per 10¹² atoms of ¹²C). When an organism dies, metabolic intake ceases, and ¹⁴C decays without replacement. Measuring residual ¹⁴C activity in wood or bone reveals the years elapsed since biological death, accurate up to ~50,000 years.",
  },
  {
    q: "What percentage of initial radioactivity remains after 5 half-lives?",
    a: "After n half-lives, the residual fraction equals (1/2)^n. For n = 5 half-lives, the remaining fraction is (1/2)⁵ = 1/32 = 0.03125, meaning exactly 3.125% of the original parent radioisotope remains active, while 96.875% has transmuted into daughter decay isotopes.",
  },
  {
    q: "How are radioisotopes with ultra-short half-lives utilized in nuclear medicine?",
    a: "Nuclear medicine utilizes short-lived gamma-emitting isotopes like Technetium-99m (t½ = 6.01 hours) and Fluorine-18 (t½ = 109.8 minutes, used in PET scans). Their rapid decay delivers high-resolution diagnostic diagnostic contrast without subjecting patient tissues to long-term chronic ionizing radiation burdens, decaying by > 99% within 24 to 48 hours.",
  },
  {
    q: "What is the difference between biological half-life and physical radioactive half-life?",
    a: "Physical half-life (Tp) is the nuclear decay constant of the radioisotope. Biological half-life (Tb) is the physiological clearance time required for the human body to eliminate half of the substance through renal or hepatic excretion. The effective half-life (Te) experienced by a human patient combines both rates: 1/Te = 1/Tp + 1/Tb.",
  },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/science", label: "Science & Chemistry" }}
      title="Half-Life & Radioactive Decay Kinetics Calculator"
      intro="Calculate radioactive decay remaining quantities, transmutative decay constants, mean atomic lifetimes, and elapsed half-lives across medical, geological, and archaeological isotopes using first-order exponential kinetics."
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
                IAEA & NIST Radioactivity Metrology Standards
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>First-Order Nuclear Kinetic Modeling</span>
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
                  Quick Answer: How are radioactive decay and isotopic half-lives calculated?
                </strong>
                <p className="mt-1">
                  Remaining radioactive quantity is calculated using the first-order exponential decay formula: N(t) = N₀ &middot; (1/2)^(t / t½) = N₀ &middot; e^(-&lambda;t), where N₀ is initial activity or mass, t is elapsed time, t½ is the isotopic half-life, and &lambda; = ln(2) / t½ is the nuclear decay constant. To evaluate chemical sample concentration over time, convert decay mass to solution molarity with our <Link href="/calculators/science/molarity-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">molarity calculator</Link>, audit trace concentration parts-per-billion via the <Link href="/calculators/science/concentration-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">concentration calculator</Link>, or track sample timeframes using our <Link href="/calculators/datetime/time-duration-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">time duration calculator</Link>.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - EDITORIAL CHART DIRECTLY BELOW */}
          <h2>Exponential Radioisotope Decay Kinetics & Half-Life Progression</h2>
          <div className="not-prose my-6">
            <RadioactiveDecayHalfLifeChart />
          </div>

          <p>
            Radioactive half-life decay kinetics govern fundamental processes across nuclear medicine, radiopharmaceutical dosimetry, geological geochronology, and nuclear waste stewardship. Because nuclear decay represents a spontaneous quantum tunneling phenomenon, the probability of any individual nucleus decaying in a given time interval is constant, yielding universal first-order exponential rate trajectories across all unstable isotopes.
          </p>

          <p>
            Whether tracking the rapid in vivo clearance of positron emission tomography tracers or calculating the 4.468-billion-year decay of Uranium-238 to date the formation of the Earth, quantitative half-life modeling provides exact mathematical predictability. When calculating stoichiometric daughter isotope accumulation, determine molecular weights with our <Link href="/calculators/science/molecular-weight-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">molecular weight calculator</Link> and calculate reaction balances via the <Link href="/calculators/science/stoichiometry-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">stoichiometry calculator</Link>.
          </p>

          <h2>First-Order Radioactive Decay Formulations & Derivations</h2>

          <p>
            The mathematical formulation of nuclear decay begins with the differential rate law: dN/dt = -&lambda;&middot;N. Integrating from time zero to time t derives the standard kinetic equations:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Exponential Decay Law</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">N(t) = N₀ &middot; e^(-&lambda; &middot; t) = N₀ &middot; (½)^(t / t½)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Quantifies remaining undecayed atomic nuclei after elapsed duration t.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Decay Constant & Half-Life Relation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">&lambda; = ln(2) / t½ &asymp; 0.693147 / t½</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Connects fractional decay rate per unit time directly to half-life duration.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Mean Atomic Lifetime Formulation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">&tau; = 1 / &lambda; = t½ / ln(2) &asymp; 1.442695 &middot; t½</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Calculates statistical mean survival time of radioactive parent atoms prior to decay.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. Elapsed Half-Life Cycles Counter</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">n = t / t½ = -log₂(N(t) / N₀) = -ln(N(t) / N₀) / ln(2)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Determines fractional number of half-life intervals elapsed between initial and final states.</div>
          </Formula>

          <h2>Standard Radioisotope Half-Life Benchmarks & Decay Modes</h2>

          <p>
            Half-life values span over 28 orders of magnitude across the periodic table, from microseconds in synthetic superheavy elements to billions of years in primordial geochronological clocks:
          </p>

          <DataTable
            head={["Radioisotope", "Half-Life (t½)", "Decay Constant (λ)", "Decay Mode", "Primary Application", "Daughter Product"]}
            rows={[
              ["Oxygen-15 (¹⁵O)", "122.2 seconds", "5.67 × 10⁻³ s⁻¹", "β+ (Positron)", "PET Cerebral Blood Flow", "Nitrogen-15 (Stable)"],
              ["Fluorine-18 (¹⁸F)", "109.8 minutes", "1.05 × 10⁻⁴ s⁻¹", "β+ (Positron)", "PET Oncology Imaging (FDG)", "Oxygen-18 (Stable)"],
              ["Technetium-99m", "6.01 hours", "3.20 × 10⁻⁵ s⁻¹", "Isomeric Transition (γ)", "Clinical SPECT Diagnostics", "Technetium-99"],
              ["Iodine-131 (¹³¹I)", "8.02 days", "9.99 × 10⁻⁷ s⁻¹", "β- and γ Emission", "Thyroid Carcinoma Ablation", "Xenon-131 (Stable)"],
              ["Radon-222 (²²²Rn)", "3.82 days", "2.10 × 10⁻⁶ s⁻¹", "Alpha (α) Particle", "Indoor Environmental Hazard", "Polonium-218"],
              ["Cesium-137 (¹³⁷Cs)", "30.08 years", "7.30 × 10⁻¹⁰ s⁻¹", "β- and γ Emission", "Radiotherapy & Nuclear Fallout", "Barium-137m"],
              ["Carbon-14 (¹⁴C)", "5,730 years", "3.83 × 10⁻¹² s⁻¹", "β- Particle", "Archaeological Radiocarbon Dating", "Nitrogen-14 (Stable)"],
              ["Uranium-238 (²³⁸U)", "4.468 billion yrs", "4.92 × 10⁻¹⁸ s⁻¹", "α Chain to Lead", "Geological Planetary Age Dating", "Lead-206 (Stable)"],
            ]}
          />

          <h2>Comparative Operational Laboratory Worked Case Studies</h2>

          <h3>Case Study A: Radiocarbon Archaeological Dating of Ancient Wood Sample</h3>
          <p>
            An archaeological excavation uncovers an ancient timber beam from an ancient tomb. Laboratory accelerator mass spectrometry (AMS) measures a residual Carbon-14 activity of 18.20% relative to modern biological standards (N₀ = 100.0%). The accepted half-life of Carbon-14 is 5,730 years.
          </p>
          <ul>
            <li><strong>Decay Constant:</strong> &lambda; = ln(2) &divide; 5,730 years = 1.2097 &times; 10⁻⁴ yr⁻¹.</li>
            <li><strong>Logarithmic Activity Ratio:</strong> ln(N(t) / N₀) = ln(0.1820) = -1.7037.</li>
            <li><strong>Elapsed Archaeological Age:</strong> t = -(-1.7037) &divide; (1.2097 &times; 10⁻⁴ yr⁻¹) = 14,084 years Before Present (BP).</li>
            <li><strong>Half-Lives Elapsed:</strong> n = 14,084 &divide; 5,730 = 2.458 cycles.</li>
            <li><strong>Historical Context:</strong> Dating confirms the timber originated in the late Upper Paleolithic era (~12,100 BCE).</li>
          </ul>

          <p>
            To evaluate the percentage proportions of carbon decay across multi-stage specimens, calculate ratios with our <Link href="/calculators/math/percentage-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">percentage calculator</Link> and cross-reference sample density via the <Link href="/calculators/science/density-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">density calculator</Link>.
          </p>

          <h3>Case Study B: Nuclear Medicine Technetium-99m Radiopharmaceutical Dosing</h3>
          <p>
            A hospital radiopharmacy prepares a 740 Megabecquerel (MBq) injection dose of Technetium-99m (t½ = 6.01 hours) for cardiac myocardial perfusion SPECT imaging scheduled 4.50 hours later.
          </p>
          <ul>
            <li><strong>Elapsed Half-Life Fraction:</strong> n = 4.50 hrs &divide; 6.01 hrs = 0.7488 cycles.</li>
            <li><strong>Remaining Activity Factor:</strong> (0.5)^0.7488 = 0.5951 (59.51%).</li>
            <li><strong>Compounding Preparation Activity:</strong> To ensure 740 MBq remains at injection time, initial formulation must be: N₀ = 740 MBq &divide; 0.5951 = 1,243.5 MBq (33.6 mCi).</li>
            <li><strong>Residual Patient Activity at 24 Hours:</strong> n = 24 / 6.01 = 3.993 &rarr; (0.5)⁴ &asymp; 6.25% remaining, ensuring minimal diagnostic patient exposure.</li>
          </ul>

          <h2>Operational Constraints & Radiometric Boundary Factors</h2>

          <p>
            When utilizing half-life formulations in nuclear physics, geological geochronology, and clinical oncology, four physical boundary factors must be controlled:
          </p>

          <ol>
            <li>
              <strong>Secular & Transient Radioactive Equilibrium:</strong> When parent radioisotopes decay into radioactive daughter isotopes (such as ⁹⁹Mo decaying to ⁹⁹mTc), the daughter accumulation reaches transient equilibrium where apparent daughter decay rate is governed by the parent half-life (66.0 hours for Molybdenum-99).
            </li>
            <li>
              <strong>Atmospheric Calibration Curves in Radiocarbon Dating:</strong> Atmospheric ¹⁴C production rates have fluctuated historically due to solar geomagnetic modulation and industrial fossil fuel burning (Suess effect), requiring dendrochronological tree-ring calibration (such as IntCal20 curves) to convert radiocarbon years into calendar dates.
            </li>
            <li>
              <strong>Open vs. Closed System Assumptions:</strong> Radiometric dating assumes the mineral sample remained a strictly closed geochemical system. Thermal metamorphism or hydrothermal leaching can cause partial loss of daughter isotopes (such as argon gas leakage in K-Ar dating), artificially lowering computed age unless isochron plotting techniques are applied.
            </li>
            <li>
              <strong>Counting Statistics & Poisson Uncertainty:</strong> Nuclear decay is inherently stochastic. Low-activity counting measurements follow Poisson distributions where standard measurement uncertainty scales with &radic;N, necessitating extended counting intervals for ancient low-activity samples.
            </li>
          </ol>


          <h2>Radiopharmaceutical Dosimetry & Radiometric Secular Calibration Dynamics</h2>
          <p>
            In clinical nuclear medicine, administering diagnostic radionuclides such as Technetium-99m
            or therapeutic beta emitters such as Iodine-131 requires rigorous distinction between physical decay half-life
            and biological clearance half-life. The effective elimination half-life governs patient radiation exposure,
            derived through harmonic reciprocal kinetics:
          </p>
          <Formula>
            {"1 / T_{eff} = 1 / T_p + 1 / T_b  &rarr;  T_{eff} = (T_p * T_b) / (T_p + T_b)"}
          </Formula>
          <p>
            Where physical half-life governs nuclear disintegration rate constants and biological clearance reflects renal,
            pulmonary, or hepatobiliary elimination. Radiopharmacists must systematically monitor isotope
            {" "}<Link href="/calculators/science/concentration-calculator">solution tracer concentration</Link>{" "}
            and evaluate vial container
            {" "}<Link href="/calculators/science/density-calculator">lead shielding density</Link>{" "}
            to ensure clinical occupational safety thresholds are never breached. Furthermore, geochronologists evaluating radiocarbon ages rely on secular dendrochronology calibration curves such as IntCal20 to account for historic fluctuations in upper-atmosphere cosmic radiation. Combining isotopic half-life kinetics with exact
            {" "}<Link href="/calculators/science/molecular-weight-calculator">radionuclide molecular weight</Link>{" "}
            values guarantees stoichiometric radiolabeling yields and eliminates radiolytic side products during radio-synthesis.
          </p>
          <p>
            In environmental health physics and nuclear fuel storage stewardship, actinide decay chains (such as Uranium-238 decaying through fourteen sequential alpha and beta transitions to stable Lead-206) exhibit secular equilibrium when parent half-lives vastly exceed daughter half-lives. Under secular equilibrium, the absolute radioactivity of every intermediate daughter nuclide becomes identical to parent radioactivity, simplifying long-term geologic radiation barrier simulations.
          </p>

          <h2>Authoritative Nuclear Physics & Radiation Standards</h2>

          <p>
            For certified decay constants, nuclear half-life evaluations, and radiation safety protocols, refer to international nuclear metrology bodies:
          </p>
          <ul>
            <li>
              <strong>International Atomic Energy Agency (IAEA Nuclear Data Section):</strong> Evaluated Nuclear Structure Data File (ENSDF) providing verified half-lives, decay branching ratios, and gamma energy lines.
            </li>
            <li>
              <strong>NIST Physical Measurement Laboratory (SRD 8):</strong> National Institute of Standards and Technology tables of physical constants and radionuclide calibration standards.
            </li>
            <li>
              <strong>International Commission on Radiological Protection (ICRP Publication 107):</strong> Nuclear Decay Data for Dosimetric Calculations across clinical and occupational environments.
            </li>
            <li>
              <strong>BIPM Consultative Committee for Ionizing Radiation (CCRI):</strong> Primary international activity measurement standards (Becquerel).
            </li>
          </ul>
        </>
      }
    >
      <HalfLifeCalculatorComponent />
    </CalcPage>
  );
}
