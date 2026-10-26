import type { Metadata } from "next";
import Link from "next/link";
import VolumeConverterComponent from "@/components/calcs/measurements/volume-converter";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { VolumeMetricImperialVolumetricRatioChart } from "@/components/flagship/measurements/editorial-charts";

const PATH = "/calculators/measurements/volume-converter";
const TITLE = "Volume & Capacity Converter | Liters, Gallons, Quarts & Fluid Ounces";
const DESCRIPTION =
  "Convert liters, gallons, cubic meters, fluid ounces, pints, and barrels with exact cubic dimensional derivations and interactive volumetric ratio charts.";

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
  { href: "/calculators/measurements/area-converter", icon: "📐", name: "Area Converter" },
  { href: "/calculators/measurements/weight-converter", icon: "⚖️", name: "Weight Converter" },
  { href: "/calculators/physics/density-calculator", icon: "🧱", name: "Density Calculator" },
  { href: "/calculators/measurements/cooking-measurement-converter", icon: "🍳", name: "Cooking Converter" },
  { href: "/pages/measurements", icon: "🧪", name: "Measurements Hub" },
];

const FAQ_ITEMS = [
  {
    q: "Why is a British Imperial gallon significantly larger than a US customary gallon?",
    a: "Under the British Weights and Measures Act of 1824, the Imperial gallon was standardized as the exact volume occupied by 10 pounds of distilled water at 62°F, equaling exactly 4.54609 liters (277.42 cubic inches). The US gallon retained the earlier British Queen Anne wine gallon of 1707, defined as exactly 231 cubic inches (3.78541 liters). As a result, the Imperial gallon is approximately 20% larger than the US gallon.",
  },
  {
    q: "How are fluid ounces defined in the US versus British Imperial systems?",
    a: "In the US customary system, 1 gallon contains 128 US fluid ounces, making 1 US fl oz equal to 29.5735 mL. In the British Imperial system, 1 Imperial gallon contains 160 Imperial fluid ounces, making 1 Imperial fl oz equal to 28.4131 mL. Thus, while an Imperial gallon is larger, an individual Imperial fluid ounce is about 4% smaller than a US fluid ounce.",
  },
  {
    q: "What is the exact cubic relationship between a liter and a cubic meter?",
    a: "The liter (L) is officially accepted for use with the SI system and is defined as exactly 1 cubic decimeter (1 dm³). Since 1 meter equals 10 decimeters, 1 cubic meter (m³) contains exactly 10 × 10 × 10 = 1,000 liters. Conversely, 1 milliliter (mL) equals exactly 1 cubic centimeter (1 cm³ or cc).",
  },
  {
    q: "What is a standard petroleum barrel (bbl) and how many gallons does it contain?",
    a: "In global oil commodities trading, a standard oil barrel (bbl) is legally fixed at exactly 42 US gallons (approximately 158.987 liters or 34.97 Imperial gallons). This standard originated in the early Pennsylvania oil boom of the 1860s, using 42-gallon whiskey barrels to account for transit spillage.",
  },
];

export default function VolumeConverterPage() {
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
            <strong>Quick Volumetric Guidance:</strong> Three-dimensional capacity represents cubic spatial extension. For fluid flow engineering, chemical reagent formulation, and bulk storage, cross-reference our <Link href="/calculators/measurements/area-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">area converter</Link> for surface cross-sections and calculate mass yields in our <Link href="/calculators/physics/density-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">density calculator</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Volumetric Metrology: Geometric Displacement & Liquid Capacity
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Volume quantifies three-dimensional space occupied by a solid body, liquid, or gas. In pure geometry, volume is derived directly from linear spatial dimensions as length cubed (L³), with the cubic meter (m³) serving as the SI coherent derived unit. However, throughout industrial history, practical commerce established specialized capacity measures tailored to handling bulk liquids (beer, wine, oil) and granular dry goods (grain, flour).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            This dual lineage created two distinct measurement families: geometric cubic measures (m³, cm³, ft³, in³) and liquid capacity measures (liters, gallons, quarts, fluid ounces). In modern chemical processing, pharmaceutical manufacturing, and petroleum logistics, navigating the historical divergences between US Customary and British Imperial standards is essential to avoid severe operational and contractual discrepancies.
          </p>

          <VolumeMetricImperialVolumetricRatioChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Derivation & Fundamental Volumetric Factors
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            All volume transformations compute through the SI derived unit of the cubic meter (m³) or its decimal subunit, the liter (1 L = 0.001 m³):
          </p>
          <Formula>{"V_{\\text{target}} = V_{\\text{source}} \\times \\left( \\frac{\\beta_{\\text{source}}}{\\beta_{\\text{target}}} \\right)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where β represents the conversion factor in liters. Because an international inch equals exactly 0.0254 meters, cubic spatial measures derive cleanly:
          </p>
          <Formula>{"1 \\text{ in}^3 = (0.0254 \\text{ m})^3 = 0.000016387064 \\text{ m}^3 = 0.016387064 \\text{ L}"}</Formula>
          <Formula>{"1 \\text{ US Gal} = 231 \\text{ in}^3 = 3.785411784 \\text{ L}, \\quad 1 \\text{ UK Gal} = 4.54609 \\text{ L}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When scaling fluid flows through piping systems, cross-reference fluid velocity in our <Link href="/calculators/measurements/speed-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">speed converter</Link> and calculate line pressure drops in the <Link href="/calculators/measurements/pressure-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">pressure converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comprehensive Reference Table of Global Volume Equivalencies
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles authoritative conversion coefficients across SI metric, US customary, and British Imperial capacity systems:
          </p>
          <DataTable
            head={["Volume Unit", "Symbol", "Value in Liters (L)", "Value in Cubic Meters (m³)"]}
            rows={[
              ["Milliliter (Cubic Centimeter)", "mL / cm³", "0.001 L", "1.0 × 10⁻⁶ m³"],
              ["Centiliter", "cL", "0.01 L", "1.0 × 10⁻⁵ m³"],
              ["Deciliter", "dL", "0.1 L", "1.0 × 10⁻⁴ m³"],
              ["Liter (SI Accepted)", "L / dm³", "1.0 L", "0.001 m³"],
              ["Cubic Meter (SI Derived)", "m³", "1,000.0 L", "1.0 m³"],
              ["US Fluid Ounce", "US fl oz", "0.02957353 L", "2.957353 × 10⁻⁵ m³"],
              ["UK Imperial Fluid Ounce", "UK fl oz", "0.02841306 L", "2.841306 × 10⁻⁵ m³"],
              ["US Liquid Pint", "US pt", "0.47317647 L", "4.731765 × 10⁻⁴ m³"],
              ["UK Imperial Pint", "UK pt", "0.56826125 L", "5.682613 × 10⁻⁴ m³"],
              ["US Liquid Quart", "US qt", "0.94635294 L", "9.463529 × 10⁻⁴ m³"],
              ["US Liquid Gallon", "US gal", "3.78541178 L", "0.00378541 m³"],
              ["UK Imperial Gallon", "UK gal", "4.54609 L", "0.00454609 m³"],
              ["Petroleum Barrel", "bbl", "158.987295 L", "0.158987 m³"],
              ["Cubic Foot", "ft³", "28.3168466 L", "0.0283168 m³"],
              ["Cubic Yard", "yd³", "764.554858 L", "0.764555 m³"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: Water Treatment Reservoir Sizing
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a municipal civil engineering team designing a drinking water storage reservoir. The regional utility plan requires a storage buffer capacity of 2.5 million US gallons. The structural engineering contractor requires the reservoir dimensions to be finalized in metric cubic meters (m³) and liters to verify concrete casting volumes:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Convert US Gallons to Liters):</strong> 2,500,000 gal × 3.785411784 L/gal = 9,463,529.46 liters.</li>
            <li><strong>Step 2 (Convert Liters to Cubic Meters):</strong> 9,463,529.46 L ÷ 1,000 L/m³ = 9,463.53 cubic meters.</li>
            <li><strong>Step 3 (Geometric Cross-Verification):</strong> A rectangular reservoir measuring 45 meters long by 35 meters wide with a water depth of 6.008 meters yields: 45 × 35 × 6.008 = 9,463.53 m³, confirming exact volumetric capacity.</li>
            <li><strong>Step 4 (Mass & Structural Bearing Loads):</strong> At standard water density (1,000 kg/m³), total stored mass equals 9,463.53 metric tons. Soil bearing capacity can be verified in our <Link href="/calculators/measurements/weight-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">weight converter</Link> and footprint area in the <Link href="/calculators/measurements/area-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">area converter</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            The Historical Roots of Gallon Divergence: Wine vs Ale Gallons
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The divergence between British and American gallons is rooted in pre-industrial English common law. In medieval England, merchants utilized multiple conflicting gallon definitions: the Winchester corn gallon (268.8 cu in) for grain, the Queen Anne wine gallon (231 cu in) for spirits, and the ale gallon (282 cu in) for beer. When the United States declared independence in 1776, Treasury Secretary Alexander Hamilton adopted the 231-cubic-inch Queen Anne wine gallon as the official national standard for customs taxation.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Britain, however, underwent comprehensive metrological reform in 1824, abolishing all historical wine, ale, and corn measures in favor of the newly synthesized Imperial gallon (277.42 cu in), defined by the volume of 10 pounds of distilled water. This historic divergence persists today, causing recurring confusion in automotive fuel economy ratings (UK MPG is ~20% higher than US MPG for identical vehicle efficiencies).
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Culinary Volumetric Ratios & Domestic Baking Conversions
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In culinary arts and domestic food preparation, volume measures dominate recipe books. However, domestic measuring cups differ subtly between countries: a standard US legal nutrition cup equals 240 mL (while a US customary cup is 236.59 mL), an Australian metric cup equals 250 mL, and a traditional Japanese gō cup equals 180.39 mL.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For precision baking, professional pastry chefs strongly prefer mass measurements in grams over volumetric cups because ingredient packing density varies dramatically (a cup of sifted flour weighs ~120 g, whereas a packed cup can exceed 150 g). To explore specialized culinary conversions, visit our dedicated <Link href="/calculators/measurements/cooking-measurement-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">cooking measurement converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Volumetric Flow Rates & Pipeline Hydraulic Sizing
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In chemical plants and HVAC water chillers, volumetric flow rate Q represents fluid volume passing through a conduit cross-section per unit time: Q = A × v, where A is internal pipe area and v is mean flow velocity. Common engineering flow units include cubic meters per hour (m³/h), liters per minute (L/min), and gallons per minute (GPM).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Maintaining fluid velocity within optimal bounds (typically 1.5 to 2.5 m/s for pumped water) prevents excessive pipe friction, pipe erosion, and water hammer surges. You can evaluate linear pipe runs in our <Link href="/calculators/measurements/length-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">length converter</Link> and calculate flow ratios in the <Link href="/calculators/math/ratio-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ratio calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Fuel Logistics, Agriculture & Global Shipping
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In global fuel logistics, maritime bunker tankers pump heavy fuel oil measured by volume at ambient temperatures, which must subsequently be converted to metric tonnes using temperature-compensated density correction tables (ASTM D1250). In agricultural irrigation, water rights across North America are leased in acre-feet—the volume of water required to cover one acre of land to a depth of one foot, equaling exactly 43,560 cubic feet or 325,851 US gallons (1,233.48 m³).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In consumer electronics, automotive engine displacement is universally quoted in cubic centimeters (cc) or liters (e.g., a 2.0-liter turbocharged engine equals 2,000 cm³ or approximately 122 cubic inches). For academic and general calculations, explore our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link> and the central <Link href="/pages/measurements" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Measurements &amp; Conversions hub</Link>.
          </p>
        </>
      }
    >
      <VolumeConverterComponent />
    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Naval Architecture: Hydrostatic Displacement & Metacentric Stability
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In naval architecture and marine engineering, Archimedes&apos; principle dictates that a floating vessel displaces a volume of fluid exactly equal in mass to the entire ship: Δ = ∇ × ρ_water, where ∇ represents the underwater molded displacement volume in cubic meters and ρ_water is the ambient water density (typically 1,025 kg/m³ for saltwater). Converting volumetric displacement into displacement tonnage is fundamental to vessel seaworthiness.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Furthermore, naval architects calculate the vessel&apos;s center of buoyancy B—the geometric centroid of the submerged displaced volume—and analyze its relationship to the center of gravity G and the transverse metacenter M. The metacentric height GM determines initial roll stability; if cargo flooding reduces effective volumetric displacement or shifts liquid free surfaces, the vessel risks sudden capsizing.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Gas Compressibility & Real Gas Volumetric Corrections (Van der Waals)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            While ideal liquids are nearly incompressible, the volume occupied by gases varies dramatically with ambient pressure and temperature according to ideal gas laws (PV = nRT). At elevated industrial pressures (such as compressed natural gas storage tanks at 250 bar), intermolecular attraction forces and finite molecular volume cause significant non-ideal deviations.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Chemical process engineers apply the Van der Waals equation [P + a(n/V)²][V - nb] = nRT or the compressibility factor Z = PV / (nRT) to determine actual gas storage capacities in cubic meters and standard cubic feet (SCF). Ignoring non-ideal gas compressibility can cause volumetric gas pipeline metering discrepancies exceeding 15% across transcontinental distribution networks.
          </p>

    
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In global petrochemical shipping, ullage measurement—the distance from the tank top to the liquid surface—is measured using radar tank gauges. Temperature-induced volume expansion governed by volumetric thermal expansion coefficients (typically β ≈ 0.001 K⁻¹ for fuel oils) alters cargo density. Cargo inspectors utilize ASTM Table 54B to convert ambient cubic meter volumes to metric standard volumes at 15°C, ensuring commercial billing reflects true energy content rather than thermal swell.
          </p>

    
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In microfluidics and biomedical diagnostic cartridges, reagent volumes are measured in nanoliters and picoliters using piezo-electric droplet dispensers. Converting macro liters to picoliters requires rigorous decimal scaling, enabling lab-on-a-chip genetic assays to operate with minimal reagent consumption and high repeatability.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In HVAC duct sizing and cleanroom filtration systems, air change rates depend on total room volume in cubic meters. Environmental engineers calculate cubic feet per minute (CFM) flow requirements against HEPA filter face velocities, preventing airborne particulates from settling in surgical suites.
          </p>

    </CalcPage>
  );
}
