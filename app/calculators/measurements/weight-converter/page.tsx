import type { Metadata } from "next";
import Link from "next/link";
import WeightConverterComponent from "@/components/calcs/measurements/weight-converter";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { MassWeightPlanetaryGravitationalChart } from "@/components/flagship/measurements/editorial-charts";

const PATH = "/calculators/measurements/weight-converter";
const TITLE = "Weight & Mass Converter | Kilograms, Pounds, Ounces & Metric Tons";
const DESCRIPTION =
  "Convert kilograms, pounds, ounces, grams, stones, and metric tons with precise SI Planck-constant definitions and gravitational weight force modeling.";

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
  { href: "/calculators/measurements/length-converter", icon: "📏", name: "Length Converter" },
  { href: "/calculators/measurements/volume-converter", icon: "🧪", name: "Volume Converter" },
  { href: "/calculators/physics/force-calculator", icon: "💥", name: "Force Calculator" },
  { href: "/calculators/physics/density-calculator", icon: "🧱", name: "Density Calculator" },
  { href: "/calculators/measurements/pressure-converter", icon: "⏱️", name: "Pressure Converter" },
  { href: "/pages/measurements", icon: "⚖️", name: "Measurements Hub" },
];

const FAQ_ITEMS = [
  {
    q: "What is the critical scientific distinction between mass and weight?",
    a: "Mass represents the fundamental quantitative measure of an object's inertia and amount of matter, expressed in kilograms (kg) and invariant across the cosmos. Weight is the gravitational force exerted upon that mass by a planetary body, expressed in Newtons (N) per W = m × g. While an 80 kg person has an Earth weight of ~785 N (~176 lbf), their weight on the Moon drops to ~130 N (~29 lbf) while their mass remains exactly 80 kg.",
  },
  {
    q: "How is the kilogram defined in the revised SI system?",
    a: "Prior to May 20, 2019, the kilogram was defined by the physical platinum-iridium cylinder (the International Prototype of the Kilogram, IPK) stored in Sèvres, France. Following the 2019 CGPM revision, the kilogram is defined by fixing the numerical value of the Planck constant h to exactly 6.62607015 × 10⁻³⁴ J·s, realized via Kibble balances.",
  },
  {
    q: "What is the exact legal definition of an avoirdupois pound?",
    a: "Under the 1959 International Yard and Pound Agreement, one international avoirdupois pound (lb) is legally defined as exactly 0.45359237 kilograms. This exact decimal terminates without recurring fractions, harmonizing trade standards across the English-speaking world.",
  },
  {
    q: "What is the difference between a metric ton, an Imperial long ton, and a US short ton?",
    a: "A metric ton (tonne, t) equals exactly 1,000 kg (2,204.62 lbs). A US short ton equals 2,000 lbs (907.185 kg), commonly used in North American freight. A British Imperial long ton equals 2,240 lbs (1,016.047 kg), traditionally used in maritime displacement and commodities shipping.",
  },
];

export default function WeightConverterPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/measurements", label: "Measurements & Conversions" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 mb-6 text-sm text-slate-700 dark:border-emerald-950/40 dark:bg-emerald-950/10 dark:text-slate-300">
            <strong>Quick Metrology Guidance:</strong> Mass represents the invariant quantity of matter, with the kilogram (kg) serving as the SI anchor. For structural load analysis or material packaging, cross-reference our <Link href="/calculators/measurements/volume-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">volume converter</Link> and calculate mass-volume relationships using our <Link href="/calculators/physics/density-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">density calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mass Metrology & Gravitational Weight Invariance Principles
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Mass constitutes one of the most fundamental base dimensions in classical and quantum mechanics. In colloquial commercial parlance, the terms &apos;mass&apos; and &apos;weight&apos; are frequently conflated; however, in physics and mechanical engineering, their distinction is vital. Mass measures resistance to linear acceleration when subjected to a net external force (inertial mass, F = m × a) and determines the magnitude of mutual attraction between matter bodies (gravitational mass).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Weight, conversely, represents the local gravitational force vector acting on that mass: W = m × g. Because terrestrial gravitational acceleration g fluctuates between 9.780 m/s² at the equator and 9.832 m/s² at the poles due to Earth&apos;s oblate spheroidal centrifugal flattening, a standard balance measure must be distinguished from a spring-loaded force gauge. Converting between international systems requires translating through the immutable SI kilogram benchmark.
          </p>

          <MassWeightPlanetaryGravitationalChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Formulation & Exact Conversion Equivalencies
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Every mass conversion translates through the base kilogram. Using the 1959 international avoirdupois standard factor, the transformation from mass in system A to target system B computes as follows:
          </p>
          <Formula>{"m_{\\text{target}} = m_{\\text{source}} \\times \\left( \\frac{\\mu_{\\text{source}}}{\\mu_{\\text{target}}} \\right)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where μ represents the exact kilogram equivalency factor. The legally ratified constants under NIST Special Publication 811 are:
          </p>
          <Formula>{"1 \\text{ lb} = 0.45359237 \\text{ kg}, \\quad 1 \\text{ oz} = \\frac{1}{16} \\text{ lb} = 0.028349523125 \\text{ kg}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To evaluate mechanical forces arising from accelerated masses in motion, explore our <Link href="/calculators/physics/force-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">force calculator</Link> or evaluate hydrostatic surface pressures in the <Link href="/calculators/measurements/pressure-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">pressure converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Global Reference Table of Mass and Weight Equivalencies
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles authoritative conversion coefficients across scientific, commercial, and precious metals regimes:
          </p>
          <DataTable
            head={["Mass Unit", "Symbol", "Kilograms Equivalent (kg)", "Pounds Equivalent (lb)"]}
            rows={[
              ["Microgram", "µg", "1.0 × 10⁻⁹ kg", "2.20462 × 10⁻⁹ lb"],
              ["Milligram", "mg", "1.0 × 10⁻⁶ kg", "2.20462 × 10⁻⁶ lb"],
              ["Gram", "g", "0.001 kg", "0.00220462 lb"],
              ["Kilogram (SI Base)", "kg", "1.0 kg", "2.20462262 lb"],
              ["Metric Ton (Tonne)", "t", "1,000.0 kg", "2,204.62262 lb"],
              ["Ounce (Avoirdupois)", "oz", "0.028349523 kg", "0.0625 lb"],
              ["Pound (Avoirdupois)", "lb", "0.45359237 kg", "1.0 lb"],
              ["Stone (UK)", "st", "6.35029318 kg", "14.0 lb"],
              ["US Short Ton", "tn", "907.18474 kg", "2,000.0 lb"],
              ["Imperial Long Ton", "LT", "1,016.0469088 kg", "2,240.0 lb"],
              ["Troy Ounce (Precious Metals)", "oz t", "0.0311034768 kg", "0.0685714 lb"],
              ["Carat (Gemstones)", "ct", "0.0002 kg", "0.000440924 lb"],
              ["Atomic Mass Unit (Dalton)", "u / Da", "1.66053906660 × 10⁻²⁷ kg", "3.66086 × 10⁻²⁷ lb"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: Commercial Aircraft Cargo Weight & Balance
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a Boeing 777-300ER long-haul cargo dispatcher calculating payload loading for a cross-pacific flight departing Frankfurt (FRA) destined for Chicago O&apos;Hare (ORD). The European cargo manifest records 42,850 kg of palletized freight. FAA flight control regulations require the load manifest to be entered into the American flight management computer in standard imperial pounds (lb):
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Identify Direct Conversion Factor):</strong> 1 lb = 0.45359237 kg; therefore, 1 kg = 1 ÷ 0.45359237 ≈ 2.2046226218 lbs.</li>
            <li><strong>Step 2 (Compute Imperial Payload Weight):</strong> 42,850 kg × 2.2046226218 lb/kg = 94,468.08 lbs.</li>
            <li><strong>Step 3 (Short Ton & Metric Ton Equivalence):</strong> In metric tonnes: 42.85 t. In US short tons: 94,468.08 ÷ 2,000 = 47.234 tons.</li>
            <li><strong>Step 4 (Fuel Consumption Correlation):</strong> Fuel burn rates correlate directly with total aircraft mass. Flight dispatchers cross-verify jet fuel volume in liters using our <Link href="/calculators/measurements/volume-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">volume converter</Link> and calculate route length with the <Link href="/calculators/measurements/length-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">length converter</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The Historical Evolution of the Kilogram: Le Grand K to the Kibble Balance
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For 130 years (1889 to 2019), the definition of the kilogram rested entirely on a physical cylinder made of 90% platinum and 10% iridium alloy, known affectionately as &apos;Le Grand K&apos;, secured within a triple-bell-jar vault at the Bureau International des Poids et Mesures in Sèvres, France. However, periodic micro-balance comparisons against official national prototype copies revealed an alarming discrepancy: Le Grand K was losing mass relative to its copies at a rate of approximately 50 micrograms per century, likely due to surface desorption or micro-abrasions during cleaning.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In a historic unanimous vote at the 26th CGPM in Versailles in November 2018, metrologists abandoned physical artifacts forever. Today, the kilogram is realized through the Kibble balance—an electromechanical instrument that balances the gravitational force of a test mass against an electromagnetic force produced by an electric current flowing through a coil immersed in a magnetic field, linking mechanical mass to Planck&apos;s constant h.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Avoirdupois vs Troy Weight Systems in Precious Metals & Bullion
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A notoriously common error in gold and silver commodities trading is confusing the standard avoirdupois ounce with the troy ounce. While standard consumer goods utilize the avoirdupois ounce (28.3495 grams, 16 ounces per pound), gold, silver, and platinum bullion are priced strictly per troy ounce (31.1035 grams, 12 troy ounces per troy pound). A troy ounce is nearly 9.7% heavier than an avoirdupois ounce. Purchasing 100 avoirdupois ounces of investment gold bullion rather than 100 troy ounces results in a shortfall of 275.4 grams of precious metal, causing significant financial discrepancies.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Dynamic Acceleration & Apparent Weight in Aerospace Engineering
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When an astronaut or fighter pilot experiences elevated G-forces, their biological mass remains strictly invariant, but their apparent weight multiplies dramatically. Under 5G vertical acceleration (g_eff = 5 × 9.80665 m/s² = 49.03 m/s²), an 80 kg pilot exerts a downward seat force of 3,922 Newtons—equivalent to an apparent weight of 882 pounds-force. Aerospace structural engineers design ejection seats and airframes around these peak dynamic inertial loads rather than static tare weights.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Laboratory Analytical Balance Calibration & Air Buoyancy Correction
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In analytical chemical formulation and pharmaceutical manufacturing under FDA cGMP regulations, micro-balances measure reagents to 0.1 micrograms (10⁻⁷ g). At this sensitivity level, Archimedes&apos; principle of air buoyancy introduces systematic weighing errors. An object of volume V displaces a mass of ambient air equal to ρ_air × V. Because standard stainless steel calibration weights have a density of ~8,000 kg/m³ while organic chemical powders often exhibit densities near 1,200 kg/m³, the buoyant force difference can alter measured mass by up to 0.1%.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Metrologists apply the air buoyancy correction formula m = m_apparent × [1 - (ρ_air / ρ_weights)] ÷ [1 - (ρ_air / ρ_sample)], incorporating ambient barometric pressure and temperature readings. For pharmaceutical dosage calculations and academic grading of scientific results, students can cross-reference our <Link href="/calculators/education/gpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">GPA calculator</Link> and statistical tools like the <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Commercial Applications in Health, Nutrition & Global Logistics
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In everyday healthcare, tracking body mass in kilograms versus stones and pounds is common across international health databases. In the UK and Ireland, personal weight is traditionally quoted in stones (1 stone = 14 pounds = 6.3503 kg). In nutritional science, calculating macronutrient intake requires converting grams of protein, carbohydrates, and fats into dietary calories.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In global maritime logistics, container vessels load standard twenty-foot equivalent units (TEU) governed by the International Maritime Organization (IMO) Safety of Life at Sea (SOLAS) Verified Gross Mass (VGM) rules, mandating certified weight certificates for all shipping containers prior to vessel stowage. For comprehensive unit conversions across all engineering and physical fields, explore our centralized <Link href="/pages/measurements" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Measurements &amp; Conversions hub</Link>.
          </p>
        </>
      }
    >
      <WeightConverterComponent />
    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Geotechnical Soil Mechanics & Terzaghi Bearing Capacity Principles
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In civil and geotechnical engineering, structural foundation safety depends on accurately translating dead-load building mass (expressed in metric tonnes or kips) into soil bearing pressures. Karl Terzaghi&apos;s classical bearing capacity formulation q_ult = c N_c + γ D_f N_q + 0.5 γ B N_γ calculates the ultimate pressure supported by cohesive clay or cohesionless sandy strata before shear failure occurs.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When structural engineers calculate foundation footprints, converting total deadweight kilograms to imperial pound-force per square foot (psf) or metric kilopascals (kPa) must maintain strict dimensional fidelity. Overestimating bearing capacity by confusing short tons with metric tonnes can lead to disastrous differential settlement, catastrophic building tilt, or catastrophic structural collapse in high-rise edifices.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mass Spectrometry & High-Precision Atomic Isotope Metrology
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            At the atomic scale, nuclear physicists and analytical chemists measure atomic mass using the unified atomic mass unit (u, or Dalton, Da), defined as exactly one-twelfth of the rest mass of an unbound carbon-12 atom in its nuclear ground state (1 u ≈ 1.66053906660 × 10⁻²⁷ kg). In high-resolution Penning trap mass spectrometers, researchers confine individual ionized atoms within supercooled magnetic and electrostatic fields, measuring cyclotron resonance frequencies to determine atomic mass to eleven decimal digits of precision.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            These precision atomic mass determinations underpin radiocarbon archeological dating (carbon-14 decay ratios), nuclear fission energy yield calculations via Albert Einstein&apos;s mass-energy equivalence principle E = mc², and isotopic hydrological tracking of global climate patterns.
          </p>

    
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In geotechnical bore logging, soil bulk density is reported in grams per cubic centimeter (g/cm³) or pounds per cubic foot (pcf). Converting soil compaction parameters between ASTM D698 Proctor test results and Eurocode 7 standards requires consistent mass and volume transformations to prevent building foundation settlement.
          </p>

    </CalcPage>
  );
}
