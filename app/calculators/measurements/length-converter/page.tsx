import type { Metadata } from "next";
import Link from "next/link";
import LengthConverterComponent from "@/components/calcs/measurements/length-converter";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { LengthScaleDynamicRangeChart } from "@/components/flagship/measurements/editorial-charts";

const PATH = "/calculators/measurements/length-converter";
const TITLE = "Length Converter | Metric, Imperial & Astronomical Distance";
const DESCRIPTION =
  "Convert meters, feet, inches, centimeters, kilometers, miles, and nautical leagues with exact SI dimensional constants and interactive scale modeling.";

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
  { href: "/calculators/measurements/area-converter", icon: "📐", name: "Area Converter" },
  { href: "/calculators/measurements/volume-converter", icon: "🧪", name: "Volume Converter" },
  { href: "/calculators/measurements/speed-converter", icon: "🚀", name: "Speed Converter" },
  { href: "/calculators/measurements/weight-converter", icon: "⚖️", name: "Weight Converter" },
  { href: "/calculators/physics/velocity-calculator", icon: "🏎️", name: "Velocity Calculator" },
  { href: "/pages/measurements", icon: "📏", name: "Measurements Hub" },
];

const FAQ_ITEMS = [
  {
    q: "What is the exact physical definition of the meter in modern metrology?",
    a: "Under the International Bureau of Weights and Measures (BIPM) 1983 redefinition, the meter is defined by fundamental physical constants: the path length traveled by light in a vacuum during a time interval of exactly 1 / 299,792,458 of a second. This ties metric spatial measurement directly to the invariant universal speed of light rather than an arbitrary artifact bar.",
  },
  {
    q: "How is the international yard and inch legally defined relative to the metric system?",
    a: "Under the 1959 International Yard and Pound Agreement signed by the United States, United Kingdom, Canada, Australia, New Zealand, and South Africa, the international yard was harmonized to exactly 0.9144 meters. Consequently, an international inch is legally defined as exactly 25.4 millimeters (0.0254 meters), and an international foot is exactly 0.3048 meters.",
  },
  {
    q: "What is the functional difference between a statute mile and a nautical mile?",
    a: "A statute mile (5,280 feet or exactly 1,609.344 meters) represents traditional land surveyor distance originating from the Roman mille passus. A nautical mile (NM or nmi) is internationally standardized at exactly 1,852 meters (approximately 6,076.12 feet), designed to correspond to one minute (1/60th of a degree) of latitude along any planetary meridian line.",
  },
  {
    q: "Why do engineering tolerances require high-precision dimensional conversion?",
    a: "In precision aerospace, mechanical manufacturing, and semiconductor lithography, small rounding discrepancies compound across multi-part assemblies. For instance, converting 10,000 microinches to micrometers using an imprecise 25 mm factor yields cumulative positional errors that violate ISO 2768 clearance fits, leading to mechanical interference and premature bearing fatigue.",
  },
];

export default function LengthConverterPage() {
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
            <strong>Quick Dimensional Guidance:</strong> In modern physics and global engineering, the base SI unit of spatial extension is the meter (m). When scaling physical dimensions across mechanical blueprints or architectural designs, cross-reference our <Link href="/calculators/measurements/area-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">area converter</Link> for surface calculations and our <Link href="/calculators/measurements/volume-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">volume converter</Link> for 3D displacement modeling.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Foundations of Spatial Metrology: Metric & Imperial Coordinate Systems
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Spatial measurement represents humanity&apos;s oldest quantitative discipline. Historically derived from human anatomical proportions—such as the human foot, thumb-breadth (inch), pace (passus), and forearm cubit—early measuring systems suffered from extreme geographical fragmentation. The emergence of the metric system in late 18th-century France introduced a coherent decimal hierarchy tied to Earth&apos;s meridian circumference, eventually evolving into the modern International System of Units (SI) governed by the General Conference on Weights and Measures (CGPM).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In contemporary scientific research and industrial design, length conversions are not merely academic conversions; they underpin precision manufacturing tolerances, celestial navigation, structural civil engineering, and microelectronics fabrication. Whether translating computer-aided design (CAD) schematics between European ISO metric blueprints and American ANSI imperial standards, or synchronizing geodetic GIS coordinates, an authoritative understanding of conversion constants prevents catastrophic engineering oversights like the famous Mars Climate Orbiter metric mismatch.
          </p>

          <LengthScaleDynamicRangeChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Derivation & Fundamental SI Metric Multipliers
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            All spatial transformations compute through the SI base unit of meters. By mapping any source quantity into meters via a scalar invariant and subsequently dividing by the target unit&apos;s metric factor, dimensional symmetry is strictly preserved:
          </p>
          <Formula>{"L_{\\text{target}} = L_{\\text{source}} \\times \\left( \\frac{k_{\\text{source}}}{k_{\\text{target}}} \\right)"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Where k represents the exact conversion scalar relative to one standard meter. For imperial units, the 1959 treaty codifies that one international yard equals exactly 0.9144 meters, which establishes the foundational legal equivalences:
          </p>
          <Formula>{"1 \\text{ in} = 0.0254 \\text{ m}, \\quad 1 \\text{ ft} = 0.3048 \\text{ m}, \\quad 1 \\text{ mi} = 1609.344 \\text{ m}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When calculating motion dynamics, linear length directly translates to rate of displacement over time. You can examine translational motion in our dedicated <Link href="/calculators/measurements/speed-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">speed converter</Link> or evaluate acceleration curves using the <Link href="/calculators/physics/velocity-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">velocity calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comprehensive Reference Table of Global Length Dimensions
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles exact metric conversion constants across microscopic, terrestrial, and astronomical measurement regimes:
          </p>
          <DataTable
            head={["Measurement Unit", "Standard Symbol", "Value in Meters (m)", "Inverse Ratio (Units per m)"]}
            rows={[
              ["Nanometer", "nm", "1.0 × 10⁻⁹ m", "1,000,000,000 nm"],
              ["Micrometer (Micron)", "µm", "1.0 × 10⁻⁶ m", "1,000,000 µm"],
              ["Millimeter", "mm", "0.001 m", "1,000 mm"],
              ["Centimeter", "cm", "0.01 m", "100 cm"],
              ["Decimeter", "dm", "0.1 m", "10 dm"],
              ["Meter (SI Base)", "m", "1.0 m", "1.0 m"],
              ["Kilometer", "km", "1,000 m", "0.001 km"],
              ["Inch (International)", "in", "0.0254 m", "39.3700787 in"],
              ["Foot (International)", "ft", "0.3048 m", "3.2808399 ft"],
              ["Yard (International)", "yd", "0.9144 m", "1.0936133 yd"],
              ["Statute Mile", "mi", "1,609.344 m", "0.000621371 mi"],
              ["Nautical Mile", "nmi", "1,852.0 m", "0.000539957 nmi"],
              ["Astronomical Unit", "AU", "1.495978707 × 10¹¹ m", "6.684587 × 10⁻¹² AU"],
              ["Light-Year", "ly", "9.460730472 × 10¹⁵ m", "1.057023 × 10⁻¹⁶ ly"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: High-Speed Rail Track Alignment
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a civil engineering consortium surveying a 34.5-statute-mile intercity rail line requiring track gauge specifications expressed in standard UIC millimeters (1,435 mm standard gauge). The surveying team must convert total route length to kilometers and evaluate track clearance tolerances across metric survey equipment:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Convert Miles to SI Meters):</strong> Multiply distance by exact factor: 34.5 mi × 1,609.344 m/mi = 55,522.368 meters.</li>
            <li><strong>Step 2 (Convert Meters to Kilometers):</strong> 55,522.368 m ÷ 1,000 m/km = 55.5224 kilometers.</li>
            <li><strong>Step 3 (Foot and Inch Cross-Check):</strong> Total feet = 34.5 × 5,280 ft = 182,160 ft. Verifying: 182,160 ft × 0.3048 m/ft = 55,522.368 m, confirming exact mathematical closure.</li>
            <li><strong>Step 4 (Mass & Ballast Correlation):</strong> Ballast tonnage per kilometer can be cross-verified using our <Link href="/calculators/measurements/weight-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">weight converter</Link> to ensure subgrade bearing stability.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            International Standards, Geodetic Datums & Common Metrology Pitfalls
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            A frequent pitfall in geographic land surveying is the divergence between the International Foot and the U.S. Survey Foot. Prior to December 31, 2022, the National Oceanic and Atmospheric Administration (NOAA) and the National Institute of Standards and Technology (NIST) maintained the U.S. Survey Foot (defined as 1200/3937 meters, approximately 0.30480061 meters). While the discrepancy is only 2 parts per million (about 2 mm per kilometer), projecting state plane coordinates across millions of feet produced errors of tens of meters. On January 1, 2023, the U.S. formally deprecated the survey foot in favor of the unified international foot.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Similarly, in maritime and aerospace protocols governed by the International Civil Aviation Organization (ICAO), flight altitudes are traditionally reported in feet, while horizontal navigational separations rely on nautical miles. To prevent cognitive errors during flight plan authoring, navigation software embeds strict floating-point conversion libraries compliant with IEEE 754 arithmetic standards.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Thermal Expansion Dynamics & Structural Length Variability
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In civil infrastructure, physical dimensions do not remain perfectly static across seasonal shifts. Metallic alloys and concrete structures undergo linear thermal expansion governed by the relationship ΔL = α × L₀ × ΔT, where α represents the linear coefficient of thermal expansion. For structural carbon steel, α equals approximately 12 × 10⁻⁶ per Kelvin. Over a 1,000-meter continuous welded rail section experiencing a 40°C temperature swing between summer and winter, the rail expands or contracts by nearly 0.48 meters (480 mm). Failure to account for these metric expansions leads to severe rail buckling or structural joint rupture.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Sub-Micron Semiconductor Metrology & Photolithographic Tolerances
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            At the nanoscale, modern extreme ultraviolet (EUV) lithography systems manufacture integrated circuits with gate lengths measured down to 2 nanometers (2 × 10⁻⁹ m). At these atomic regimes, physical distances are smaller than the wavelength of visible light (400 to 700 nm). Metrology engineers utilize transmission electron microscopy (TEM) and atomic force microscopy (AFM) calibrated against fundamental crystalline silicon lattice spacing constants (approximately 0.543 nm). Accurate unit conversion between angstroms (Å), nanometers (nm), and picometers (pm) is critical for semiconductor yield analysis.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Astronomical Distance Paradigms: From Megameters to Parsecs
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Terrestrial length units quickly become unwieldy when describing interplanetary and interstellar expanses. Within the Solar System, astronomers utilize the Astronomical Unit (AU), historically defined as the mean Earth-Sun distance and officially fixed by the International Astronomical Union (IAU) in 2012 at exactly 149,597,870,700 meters. For galactic distances, the parsec (pc) is defined geometrically as the distance at which one astronomical unit subtends an angle of one arcsecond, equivalent to approximately 3.0857 × 10¹⁶ meters or 3.2616 light-years.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mechanical Clearance Fits & Geometric Dimensioning (ISO 286 / ASME Y14.5)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In mechanical design, parts are never fabricated to exact nominal dimensions; rather, they are bounded by upper and lower dimensional limits. Under ISO 286 and ASME Y14.5 geometric dimensioning and tolerancing (GD&amp;T) standards, engineers define clearance, transition, and interference fits between shafts and mating holes. For example, an H7/g6 precision sliding fit on a 50 mm nominal bore specifies a bore tolerance between 50.000 mm and +0.025 mm, while the mating shaft must be ground between 49.991 mm and 49.975 mm.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Converting these sub-millimeter tolerances into imperial thousandths of an inch (mils or thou) requires extraordinary mathematical rigor. A single rounded tenth of a mil (0.0001 in = 2.54 µm) can easily alter an intended running clearance into an unwanted press fit, causing mechanical galling during operation. Thermal variances also alter clearance; you can evaluate environmental fluid parameters in our <Link href="/calculators/measurements/temperature-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">temperature converter</Link> and fluid lines in our <Link href="/calculators/measurements/pressure-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">pressure converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Architecture, Athletic Training & Global Trade
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Beyond heavy industrial engineering, daily consumer life routinely involves cross-system translations. In residential architectural remodeling, sheet goods such as 4×8-foot drywall and plywood panels correspond to 1,219.2 mm × 2,438.4 mm, contrasting with standard continental metric modular boards of 1,200 mm × 2,400 mm. In competitive athletics, understanding that an Olympic 100-meter sprint equals 109.361 yards helps compare track-and-field metrics against traditional gridiron football combines.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When shipping commercial parcels overseas, dimensional weight calculations require multiplying length, width, and height before dividing by volumetric divisor constants. For related engineering and consumer tools, explore our full suite via the <Link href="/pages/measurements" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Measurements &amp; Conversions hub</Link> or calculate academic dimensional analyses in our <Link href="/calculators/education/gpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">GPA calculator</Link> and <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Precision Calibration Procedures for Optical & Laser Measuring Systems
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Industrial quality management systems operating under ISO 9001 and ISO/IEC 17025 mandate routine traceability of dimensional inspection equipment back to national metrology institutes such as NIST or the National Physical Laboratory (NPL). Laser interferometers utilize frequency-stabilized helium-neon (He-Ne) lasers emitting at an established vacuum wavelength of 632.816 nanometers. Because the refractive index of air varies with ambient barometric pressure, temperature, and relative humidity, computerized compensation stations continuously adjust optical distance measurements using the Edlén equation.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            By standardizing environmental conditions at 20°C (68°F) per ISO 1 reference temperature specifications, metrology laboratories prevent thermal drift from contaminating precision gauge block inspections. Adhering to these rigorous physical conversion standards ensures that aerospace components manufactured in different continents mate seamlessly with microscopic clearance tolerances during final airframe assembly.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Abbe Error Principle & Precision Optical Encoder Alignment
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In mechanical precision engineering, Ernst Abbe formulated the fundamental metrology principle stating that maximum measurement accuracy is achieved only when the measuring instrument reference axis is collinear with the dimensional displacement axis being measured. Angular offsets (Abbe error ε = L × tan θ) magnify microscopic tilt into substantial linear positioning errors in coordinate measuring machines (CMM) and multi-axis CNC gantries, mandating continuous laser interferometer feedback.
          </p>
        </>
      }
    >
      <LengthConverterComponent />
    </CalcPage>
  );
}
