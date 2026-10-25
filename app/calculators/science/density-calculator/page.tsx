import type { Metadata } from "next";
import Link from "next/link";
import DensityCalculatorComponent from "@/components/calcs/science/density-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { DensityMaterialComparisonChart } from "@/components/flagship/science/editorial-charts";

const PATH = "/calculators/science/density-calculator";
const TITLE = "Density Calculator | Specific Gravity, Mass & Buoyancy Archimedes Solver";
const DESCRIPTION =
  "Calculate material density, specific gravity, volume displacement, and Archimedes buoyant lift forces across solids, liquids, and atmospheric gases with precision unit conversions.";

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
  { href: "/calculators/science/boiling-point-calculator", icon: "🌡️", name: "Boiling Point & Vapor" },
  { href: "/calculators/science/ideal-gas-law-calculator", icon: "🎈", name: "Ideal Gas Law" },
  { href: "/calculators/physics/pressure-calculator", icon: "📊", name: "Hydrostatic Pressure" },
  { href: "/calculators/physics/force-calculator", icon: "🚀", name: "Newtonian Force F=ma" },
  { href: "/calculators/measurements/volume-converter", icon: "📐", name: "Volume Unit Converter" },
];

const FAQ_ITEMS = [
  {
    q: "What is the physical definition and mathematical formula for density?",
    a: "Density (&rho;) is an intensive physical property defined as mass per unit volume: &rho; = m / V. In the International System of Units (SI), density is expressed in kilograms per cubic meter (kg/m&sup3;), though laboratory chemistry commonly utilizes grams per cubic centimeter (g/cm&sup3;) or grams per milliliter (g/mL). Because density is intensive, it remains invariant regardless of sample size.",
  },
  {
    q: "What is specific gravity (SG) and why is it dimensionless?",
    a: "Specific gravity (SG), or relative density, is the ratio of a material's density to the density of a reference fluid—conventionally pure water at its maximum density temperature of 3.98 &deg;C (1.0000 g/cm&sup3; or 1000 kg/m&sup3;): SG = &rho;_substance / &rho;_water. Because it is a ratio of identical physical dimensions, specific gravity is dimensionless. An SG greater than 1.0 indicates the material sinks in water, while an SG below 1.0 floats.",
  },
  {
    q: "How does Archimedes' Principle govern buoyant flotation?",
    a: "Archimedes' Principle establishes that any object wholly or partially immersed in a fluid experiences an upward buoyant force (Fb) equal to the gravitational weight of the fluid displaced by the object: Fb = &rho;_fluid &middot; V_displaced &middot; g. If an object's average density is less than the fluid's density, it floats in static equilibrium with a submerged volume fraction exactly equal to &rho;_object / &rho;_fluid.",
  },
  {
    q: "Why does liquid water reach its maximum density at 3.98 °C instead of 0 °C?",
    a: "As liquid water cools toward 4 &deg;C, thermal molecular kinetic contraction increases its density. However, below 3.98 &deg;C, intermolecular hydrogen bonding begins organizing water molecules into an open, tetrahedral hexagonal crystalline lattice precursor to ice. This open spatial structure expands volume, causing ice (density 0.917 g/cm&sup3;) and cold water below 4 &deg;C to float atop denser 4 &deg;C water, preserving aquatic life beneath frozen lakes.",
  },
  {
    q: "How do temperature and pressure alter material density?",
    a: "Thermal expansion generally increases volume while keeping mass constant, causing density to decrease as temperature rises (quantified by the volumetric expansion coefficient &beta;). Pressure compresses matter, increasing density. While liquids and solids are relatively incompressible over moderate pressures, gases obey gas laws where density is strictly proportional to pressure and inversely proportional to absolute temperature (&rho; = P&middot;MW / RT).",
  },
  {
    q: "What is the difference between true density, bulk density, and apparent porosity?",
    a: "True (skeletal) density measures mass divided by the volume of solid material excluding all pores and voids. Bulk density measures mass divided by total envelope volume including interior pores and inter-particle voids, crucial in soil mechanics, pharmaceutical tableting, and civil powders. Apparent density accounts only for closed internal pores inaccessible to immersion fluids.",
  },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/science", label: "Science & Chemistry" }}
      title="Material Density & Archimedes Specific Gravity Calculator"
      intro="Calculate material density, specific gravity relative to water, volume displacement, and Archimedes buoyant lift forces across solid materials, aqueous solutions, and industrial fluids."
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
                ISO 1183 & ASTM D792 Density Standards
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Hydrostatic & Archimedes Metrology</span>
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
                  Quick Answer: What are the primary formulas for calculating density and buoyant force?
                </strong>
                <p className="mt-1">
                  Material density is calculated by dividing sample mass by displaced volume: &rho; = m / V. Specific gravity (SG) is the dimensionless ratio of substance density to pure water at 4 &deg;C: SG = &rho; / 1.000 g/cm&sup3;. Under Archimedes&apos; Principle, upward buoyant force equals the weight of displaced fluid: Fb = &rho;_fluid &middot; V &middot; g. For fluid pressure dynamics, audit hydrostatic head with our <Link href="/calculators/physics/pressure-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">pressure calculator</Link>, calculate applied gravitational loads via the <Link href="/calculators/physics/force-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">force calculator</Link>, or examine gas densities using our <Link href="/calculators/science/ideal-gas-law-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">ideal gas law calculator</Link>.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - EDITORIAL CHART DIRECTLY BELOW */}
          <h2>Material Density Spectrum Across Solid and Liquid Elements</h2>
          <div className="not-prose my-6">
            <DensityMaterialComparisonChart />
          </div>

          <p>
            Density serves as a fundamental physical fingerprint across materials science, metallurgy, geology, and fluid mechanics. Whether verifying the purity of precious metals via hydrostatic immersion, engineering lightweight carbon-composite aerospace structures, or calculating cargo ballast for naval architecture, quantitative density modeling is central to mechanical integrity and material identification.
          </p>

          <p>
            In chemical processing and petroleum refining, density and specific gravity dictate phase separation, settling velocities in sedimentation tanks, and hydrometer fuel grading. When formulating liquid chemical mixtures, correlate density with gravimetric concentration using our <Link href="/calculators/science/concentration-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">concentration calculator</Link> and calculate thermal colligative properties with the <Link href="/calculators/science/boiling-point-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">boiling point calculator</Link>.
          </p>

          <h2>Mathematical Density Formulations & Archimedes Derivations</h2>

          <p>
            Classical continuum mechanics defines density through mass-volume integration alongside Archimedes&apos; hydrostatic displacement theorems:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">1. Fundamental Density Equation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">&rho; = m / V</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Quantifies mass concentration per unit volume in g/cm³ or kg/m³.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">2. Specific Gravity (Relative Density)</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">SG = &rho;_sample / &rho;_H₂O(4°C) = &rho;_sample / (1.0000 g/cm³)</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Normalizes density against pure water at standard maximum density temperature.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">3. Archimedes Buoyant Upward Force</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">Fb = &rho;_fluid &middot; V_displaced &middot; g</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Computes upward hydrostatic lift force exerted on an immersed object.</div>
          </Formula>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">4. Submerged Volume Flotation Fraction</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">Fraction_submerged = (&rho;_object / &rho;_fluid) &middot; 100%</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Determines exact percentage of floating object volume submerged beneath fluid surface.</div>
          </Formula>

          <h2>Standard Material Densities & Specific Gravity Benchmarks</h2>

          <p>
            Reference densities across elemental metals, geological minerals, common liquids, and polymers at 20 &deg;C:
          </p>

          <DataTable
            head={["Material System", "Density (g/cm³)", "Density (kg/m³)", "Specific Gravity (SG)", "Buoyancy in Water", "Primary Use"]}
            rows={[
              ["Silica Aerogel", "0.002", "2.0", "0.002", "Floats (0.2% submerged)", "Thermal Insulation"],
              ["Balsa Wood", "0.160", "160.0", "0.160", "Floats (16% submerged)", "Model Airframes"],
              ["Ethanol (Pure)", "0.789", "789.0", "0.789", "Liquid Solvent", "Chemical Feedstock"],
              ["Pure Water (4°C)", "1.000", "1000.0", "1.000", "Neutral Standard", "Calibration Base"],
              ["Seawater (3.5% Salinity)", "1.025", "1025.0", "1.025", "Oceanic Medium", "Marine Ballast"],
              ["Aluminum (6061-T6)", "2.700", "2700.0", "2.700", "Sinks to bottom", "Aerospace Structures"],
              ["Titanium (Grade 5)", "4.430", "4430.0", "4.430", "Sinks to bottom", "Medical Implants"],
              ["Carbon Steel (AISI 1020)", "7.850", "7850.0", "7.850", "Sinks to bottom", "Civil Construction"],
              ["Lead Metal (Pure)", "11.340", "11340.0", "11.340", "Sinks to bottom", "Radiation Shielding"],
              ["Liquid Mercury (Hg)", "13.546", "13546.0", "13.546", "Steel floats on top", "Barometers & Switches"],
              ["Gold (24K Pure)", "19.320", "19320.0", "19.320", "Sinks rapidly", "Bullion & Electronics"],
              ["Osmium (Densest Element)", "22.590", "22590.0", "22.590", "Sinks rapidly", "Wear Contacts"],
            ]}
          />


          <h2>Oscillating U-Tube Pycnometry & Digital Density Metrology</h2>

          <p>
            Modern automated laboratory density meters employ the oscillating U-tube principle (standardized under ASTM D4052 and ISO 12185) rather than manual gravimetric pycnometers. A hollow, high-precision borosilicate glass or Hastelloy U-tube filled with sample fluid is electronically excited into harmonic resonant oscillation. The fundamental period of vibration T depends strictly on the total vibrating mass, which includes the fixed tube mass m_0 and the variable fluid mass &rho;&middot;V:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300">5. Harmonic Resonant Density Frequency Relation</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-mono text-sm py-1">&rho; = A &middot; T&sup2; - B   |   T = 2&pi; &middot; &radic;[(m₀ + &rho; &middot; V) / c]</div>
            <div className="font-sans text-xs text-slate-600 dark:text-slate-400">Links fluid density &rho; directly to electronic resonant period T with instrumental constants A and B.</div>
          </Formula>

          <p>
            Equipped with solid-state Peltier thermal controllers that stabilize sample temperatures within &plusmn;0.01 &deg;C, digital density meters achieve measurement resolutions down to 0.00001 g/cm&sup3; (10 ppm precision) within 30 seconds. To evaluate the resonant acoustic harmonics of oscillating sensor tubes, analyze frequency principles with our <Link href="/calculators/physics/wave-frequency-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">wave frequency calculator</Link> and convert displaced volumetric measurements with the <Link href="/calculators/measurements/volume-converter" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">volume converter</Link>.
          </p>

          <h2>Geotechnical Dry Density, Void Ratio & Soil Compaction</h2>

          <p>
            In geotechnical civil engineering and earthwork foundation design, soil density cannot be treated as a monolithic constant because soils consist of solid mineral grains, pore water, and void air pockets. Civil engineers evaluate dry density (&rho;_d), which measures solid skeleton mass per total unit volume, eliminating moisture fluctuations: &rho;_d = &rho;_bulk / (1 + w), where w is gravimetric moisture content.
          </p>

          <p>
            Standard and Modified Proctor compaction tests establish the Optimum Moisture Content (OMC) at which soil grains achieve maximum packing density, minimizing future structural settlement under foundation loads. When designing concrete mixes and soil-aggregate foundations, verify bulk batching weights with our <Link href="/calculators/engineering/concrete-mix-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">concrete mix calculator</Link> and compute structural gravity loads using the <Link href="/calculators/physics/force-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">force calculator</Link>.
          </p>

          <h2>Comparative Operational Laboratory Worked Case Studies</h2>

          <h3>Case Study A: Archimedes Hydrostatic Assay of Gold Bullion (Purity Verification)</h3>
          <p>
            A precious metals assayer tests an antique commemorative coin purported to be pure 24-karat gold (theoretical density 19.32 g/cm&sup3;). Using an analytical balance, the coin weighs 64.20 grams in air and 60.10 grams when fully immersed in pure water (density 1.000 g/cm&sup3;).
          </p>
          <ul>
            <li><strong>Apparent Mass Loss (Displaced Water Mass):</strong> &Delta;m = 64.20 g - 60.10 g = 4.10 grams.</li>
            <li><strong>Displaced Volume:</strong> V = 4.10 g &divide; 1.000 g/cm&sup3; = 4.10 cm&sup3;.</li>
            <li><strong>Experimental Coin Density:</strong> &rho; = 64.20 g &divide; 4.10 cm&sup3; = 15.66 g/cm&sup3;.</li>
            <li><strong>Specific Gravity:</strong> SG = 15.66.</li>
            <li><strong>Metallurgical Conclusion:</strong> Pure gold possesses density 19.32 g/cm&sup3;. A measured density of 15.66 g/cm&sup3; indicates a fraudulent counterfeit alloyed with copper or tungsten.</li>
          </ul>

          <p>
            To evaluate the stoichiometric chemical elemental ratio of alloys, determine component percentages using our <Link href="/calculators/science/empirical-formula-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">empirical formula calculator</Link> and calculate mass concentrations with the <Link href="/calculators/science/concentration-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">concentration calculator</Link>.
          </p>

          <h3>Case Study B: Iceberg Flotation Equilibrium in Arctic Seawater</h3>
          <p>
            An Arctic glacial iceberg composed of pure freshwater ice (density &rho;_ice = 0.917 g/cm&sup3;) floats in cold ocean seawater (salinity 3.5%, measured density &rho;_sw = 1.028 g/cm&sup3;).
          </p>
          <ul>
            <li><strong>Submerged Volume Fraction:</strong> Fraction = (&rho;_ice &divide; &rho;_sw) &times; 100 = (0.917 &divide; 1.028) &times; 100 = 89.20%.</li>
            <li><strong>Exposed Tip Above Water:</strong> 100% - 89.20% = 10.80% visible above the sea surface.</li>
            <li><strong>Buoyant Equilibrium:</strong> For an iceberg with gross mass of 10,000 metric tons (10⁷ kg), buoyant upward force exactly equals gravitational weight: Fb = 10⁷ kg &times; 9.80665 m/s&sup2; = 9.807 &times; 10⁷ Newtons.</li>
          </ul>

          <h2>Operational Constraints & Environmental Boundary Conditions</h2>

          <p>
            High-precision laboratory and industrial density pycnometry requires controlling four physical boundary sources of error:
          </p>

          <ol>
            <li>
              <strong>Surface Meniscus & Capillary Air Bubbles:</strong> In hydrostatic weighing, microscopic air bubbles clinging to sample surfaces displace additional fluid, artificially elevating apparent volume and lowering computed density by 1% to 5%. Adding non-ionic wetting surfactants eliminates bubble adhesion.
            </li>
            <li>
              <strong>Thermal Expansion & Pycnometer Volume Drift:</strong> Liquid density changes noticeably with temperature (water density drops from 0.9982 g/cm&sup3; at 20 &deg;C to 0.9584 g/cm&sup3; at 100 &deg;C). Pycnometer measurements require thermostatic water baths stabilized to &plusmn;0.05 &deg;C.
            </li>
            <li>
              <strong>Air Buoyancy Correction (Vacuum Calibration):</strong> Precision analytical weighing of low-density samples requires correcting balance readings for ambient air buoyancy (&rho;_air &asymp; 0.0012 g/cm&sup3;) acting on both sample and stainless-steel calibration weights.
            </li>
            <li>
              <strong>Compressibility in Deep-Sea & Geotechnical Strata:</strong> While liquids are treated as incompressible at surface pressures, extreme hydrostatic pressures at oceanic abyssal depths (1,000 bar) compress water by nearly 4%, increasing fluid density from 1.025 to 1.065 g/cm&sup3;.
            </li>
          </ol>

          <h2>Authoritative International Standards & Metrology</h2>

          <p>
            For certified material density testing and pycnometric validation, consult authoritative standards organizations:
          </p>
          <ul>
            <li>
              <strong>ISO 1183-1:2019:</strong> Plastics &mdash; Methods for determining the density of non-cellular plastics (Immersion method, liquid pycnometer, and titration method).
            </li>
            <li>
              <strong>ASTM D792-20:</strong> Standard Test Methods for Density and Specific Gravity (Relative Density) of Plastics by Displacement.
            </li>
            <li>
              <strong>ASTM B311-17:</strong> Standard Test Method for Density of Powder Metallurgy Materials Containing Less than Two Percent Porosity.
            </li>
            <li>
              <strong>NIST Special Publication 260-153:</strong> Standard Reference Materials for Calibration of Liquid Density Meters.
            </li>
          </ul>
        </>
      }
    >
      <DensityCalculatorComponent />
    </CalcPage>
  );
}
