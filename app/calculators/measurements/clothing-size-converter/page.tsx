import type { Metadata } from "next";
import Link from "next/link";
import ClothingSizeConverterComponent from "@/components/calcs/measurements/clothing-size-converter";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ClothingSizeInternationalSizingMatrixChart } from "@/components/flagship/measurements/editorial-charts";

const PATH = "/calculators/measurements/clothing-size-converter";
const TITLE = "Clothing Size Converter | International US, UK, EU & Asian Sizes";
const DESCRIPTION =
  "Convert women's and men's international clothing sizes across US, UK, EU, Italy, and Japan with ISO anthropometric body measurement modeling.";

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
  { href: "/calculators/measurements/shoe-size-converter", icon: "👟", name: "Shoe Size Converter" },
  { href: "/calculators/measurements/length-converter", icon: "📏", name: "Length Converter" },
  { href: "/calculators/measurements/weight-converter", icon: "⚖️", name: "Weight Converter" },
  { href: "/calculators/math/ratio-calculator", icon: "🔢", name: "Ratio Calculator" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Percentage" },
  { href: "/pages/measurements", icon: "👗", name: "Measurements Hub" },
];

const FAQ_ITEMS = [
  {
    q: "Why do clothing size numbers differ so drastically between the US, UK, and Europe?",
    a: "Clothing size numbers reflect divergent historical tailor sizing conventions and regional measurement units. In women's dresses, a US size 8 corresponds to a UK size 12, a European (German/Scandinavian) size 38, an Italian size 42, and a French size 40. Continental European systems historically indexed garment chest or bust circumference in centimeters divided by two, whereas US and UK systems used arbitrary sequential even numbers.",
  },
  {
    q: "What is 'vanity sizing' and how has it shifted garment dimensions over decades?",
    a: "Vanity sizing (size inflation) is a commercial fashion phenomenon where clothing brands assign smaller numerical size tags to garments with larger physical dimensions over time to flatter consumer self-perception. In the US, a women's dress size 8 in 1958 was tailored for a 31-inch bust and 23.5-inch waist; today, a standard US size 8 accommodates a 36-inch bust and 28.5-inch waist.",
  },
  {
    q: "What is the ISO 8559 standard for international garment sizing?",
    a: "ISO 8559 (Parts 1, 2, and 3) is the International Organization for Standardization's anthropometric framework establishing a universal, pictographic garment labeling system based directly on body dimensions in centimeters (bust/chest, waist, hip, and inseam height) rather than subjective alphanumeric vanity codes.",
  },
  {
    q: "How do men's suit jacket sizes translate between US imperial and European metric systems?",
    a: "Men's suit jackets in the US and UK are sized directly by chest circumference in inches (e.g., size 40R denotes a 40-inch chest with regular jacket length). In European continental sizing, suit numbers are calculated by adding 10 to the US chest size (US 40 = EU 50) or by taking actual chest girth in centimeters divided by two (~101.6 cm ÷ 2 ≈ 50.8, rounded to EU 50).",
  },
];

export default function ClothingSizeConverterPage() {
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
            <strong>Quick Garment Guidance:</strong> Apparel sizing translates between regional manufacturing matrices and human body girths. In cross-border e-commerce fashion and tailoring, cross-reference footwear in our <Link href="/calculators/measurements/shoe-size-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">shoe size converter</Link> and convert anatomical body circumference in our <Link href="/calculators/measurements/length-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">length converter</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Anthropometric Fashion Metrology: Regional Sizing Matrices & Body Girths
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Apparel sizing represents the complex convergence of human anatomy, industrial textile production, cultural aesthetic ideals, and global supply chain logistics. Historically, clothing was hand-tailored to bespoke individual measurements. The emergence of mass-manufactured ready-to-wear military uniforms during the American Civil War and the Industrial Revolution necessitated the creation of standardized proportional sizing grids based on statistical chest and waist girth distributions.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            However, national textile trade organizations developed independent, non-aligned sizing scales. An American customer ordering high-end apparel from Paris, Milan, London, or Tokyo routinely encounters completely disparate sizing integers. In global e-commerce, size misselection accounts for over 40% of all online apparel returns, creating billions of dollars in reverse logistics costs and significant carbon emissions.
          </p>

          <ClothingSizeInternationalSizingMatrixChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Derivation of Regional Sizing Offsets & Ease Allowances
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Garment sizing translates anatomical bare body dimensions (bust/chest, waist, and low hips) into finished garment patterns by incorporating specific &apos;ease allowance&apos; (typically +5 cm to +10 cm of circumferential ease for movement comfort):
          </p>
          <Formula>{"\\text{Garment Girth} = \\text{Body Girth} + \\text{Ease Allowance}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In women&apos;s dresses and tailored outerwear, regional sizing numbers relate mathematically through well-defined linear offsets:
          </p>
          <Formula>{"\\text{Size}_{\\text{UK}} = \\text{Size}_{\\text{US}} + 4, \\quad \\text{Size}_{\\text{EU}} = \\text{Size}_{\\text{US}} + 30 = \\text{Size}_{\\text{UK}} + 26"}</Formula>
          <Formula>{"\\text{Size}_{\\text{IT}} = \\text{Size}_{\\text{EU}} + 4 = \\text{Size}_{\\text{US}} + 34, \\quad \\text{Size}_{\\text{FR}} = \\text{Size}_{\\text{EU}} + 2 = \\text{Size}_{\\text{US}} + 32"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In men&apos;s tailored suit jackets and sports coats:
          </p>
          <Formula>{"\\text{Size}_{\\text{EU Men}} = \\text{Size}_{\\text{US/UK Men}} + 10 = \\frac{\\text{Chest Girth (cm)}}{2}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When calculating fabric yardage and volumetric pattern grading, cross-reference dimensional scaling in our <Link href="/calculators/measurements/area-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">area converter</Link> and calculate body weight metrics in our <Link href="/calculators/measurements/weight-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">weight converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comprehensive Reference Table of Global Garment Sizing Standards
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles international cross-references across women&apos;s dress sizes and body girth benchmarks:
          </p>
          <DataTable
            head={["Alpha Size", "US / Canada", "UK / Australia", "Europe (EU/DE)", "Italy (IT)", "France (FR)", "Japan (JP)", "Bust Girth (cm)"]}
            rows={[
              ["XXS", "0", "4", "30", "34", "32", "3", "76 - 79 cm"],
              ["XS", "2", "6", "32", "36", "34", "5", "80 - 83 cm"],
              ["S", "4", "8", "34", "38", "36", "7", "84 - 87 cm"],
              ["S / M", "6", "10", "36", "40", "38", "9", "88 - 91 cm"],
              ["M", "8", "12", "38", "42", "40", "11", "92 - 95 cm"],
              ["L", "10", "14", "40", "44", "42", "13", "96 - 99 cm"],
              ["L / XL", "12", "16", "42", "46", "44", "15", "100 - 104 cm"],
              ["XL", "14", "18", "44", "48", "46", "17", "105 - 109 cm"],
              ["XXL", "16", "20", "46", "50", "48", "19", "110 - 115 cm"],
              ["3XL", "18", "22", "48", "52", "50", "21", "116 - 121 cm"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: Cross-Border Apparel Production Spec Sheets
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider a fashion technical designer at a New York apparel label preparing technical specification sheets (&apos;tech packs&apos;) for a women&apos;s tailored blazer to be manufactured in Porto, Portugal for European and North American distribution. The base sample size is developed as a US Size 6. The Portuguese contract factory requires grading specifications converted into European metric measurements:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Map Base Size Equivalent):</strong> US Size 6 corresponds to UK Size 10, EU Size 36, and Italian Size 40.</li>
            <li><strong>Step 2 (Establish Finished Bust Measurement):</strong> Model body bust = 35.0 inches (88.9 cm). Tailored blazer bust ease = +3.5 inches (8.89 cm). Finished garment half-chest flat measurement = (35.0 + 3.5) ÷ 2 = 19.25 inches (48.9 cm).</li>
            <li><strong>Step 3 (Pattern Grading Increment):</strong> Standard grading between consecutive sizes is 1.5 inches (3.81 cm) in total circumference (or 0.75 inches / 1.9 cm per half-chest step). For EU 38 (US 8), finished half-chest width grades to 20.0 inches (50.8 cm).</li>
            <li><strong>Step 4 (Fabric Consumption Verification):</strong> Total textile roll yardage can be calculated in our <Link href="/calculators/measurements/area-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">area converter</Link> and pattern proportions verified in our <Link href="/calculators/math/ratio-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ratio calculator</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            ISO 8559 Pictographic Standardization & Anthropometric 3D Body Scanning
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            To combat the global epidemic of sizing inconsistency and arbitrary vanity sizing, the International Organization for Standardization developed the ISO 8559 standard. ISO 8559-2 mandates a universal pictographic torso label illustrating key body dimensions: bust girth, waist girth, hip girth, and body height in centimeters.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Leading fashion brands conduct national 3D laser anthropometric body scanning surveys (such as the SizeUK, SizeUSA, and SizeGERMANY initiatives). Scanning tens of thousands of diverse adult subjects using multi-camera millimeter optical booths revealed that average human body proportions have shifted substantially over the past sixty years: average adult waist girths have expanded by nearly 15% relative to bust and stature height.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Men&apos;s Dress Shirts: Collar Circumference & Sleeve Length Invariants
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Unlike women&apos;s vanity-sized alphanumeric codes, men&apos;s tailored dress shirts retain strict physical anatomical dimensions. In the US, dress shirts are sold by collar neck circumference and sleeve length in inches (e.g., 16.5 / 34-35 indicates a 16.5-inch neck band with a 34.5-inch sleeve measured from the center back collar down the arm to the wrist).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In continental Europe and Asia, men&apos;s shirts are labeled strictly by collar circumference in centimeters (e.g., EU Size 41 corresponds to: 41 cm ÷ 2.54 cm/in ≈ 16.14 inches, fitting a 16-inch neck). Understanding that 1 inch equals exactly 2.54 cm enables shoppers to select precise collar sizes without restricting carotid circulation when wearing formal neckwear.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in E-Commerce Shopping, Bespoke Tailoring & Travel
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern global consumer life, purchasing clothing online from international brands requires measuring your body accurately with a flexible cloth tape measure. Measuring the bust at the fullest point, the natural waist at the narrowest torso indentation, and low hips across the widest buttock curvature provides authoritative baseline figures.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For academic tracking and statistical analysis, explore our <Link href="/calculators/education/gpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">GPA calculator</Link> and calculate dimensional variances in our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>, or visit the centralized <Link href="/pages/measurements" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Measurements &amp; Conversions hub</Link>.
          </p>
        </>
      }
    >
      <ClothingSizeConverterComponent />
    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Textile Pattern Drafting: Armhole Geometry & Sleeve Cap Pitch Angles
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In advanced bespoke tailoring and CAD apparel pattern drafting, translating 2D flat fabric sheets to drape seamlessly over 3D articulating human anatomy requires geometric curvature equations. Pattern makers construct the armhole (scye) depth and sleeve cap height using golden ratio approximations based on chest girth: armhole depth typically scales as 1/8 of total chest circumference plus 7.5 cm.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            If the armhole is cut too low or the sleeve pitch angle is misaligned relative to the shoulder slope, raising the arm pulls the entire jacket hem upward, restricting shoulder joint range of motion. Modern technical activewear incorporates gusseted underarm diamonds and raglan sleeve seams to decouple rotational arm articulation from torso fit, minimizing seam strain during athletic movement.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Elastomeric Textile Blends: Negative Ease Engineering in Performance Wear
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            While traditional woven woolen suits and cotton poplin shirts require positive ease allowances (+5 cm to +10 cm) so the wearer can breathe and bend without tearing seams, modern athletic compression apparel and swimwear operate under &apos;negative ease&apos;. Knitted with synthetic elastane (spandex / Lycra) polymers offering 400% to 700% elastic elongation, the finished garment dimensions are engineered intentionally 10% to 25% smaller than bare body measurements.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under Laplace&apos;s law of surface tension P = T / r, wrapping stretched elastic fabric around cylindrical human limbs generates controlled graduated compression (typically 15 to 25 mmHg in medical compression stockings). This compression pressure accelerates venous blood return to the heart, reduces muscle oscillation micro-trauma, and speeds up metabolic lactate clearance during endurance sports.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Circular Weft Knitting: Fabric Gauge & Stitch Density (WPI / CPI)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In industrial seamless knitwear manufacturing, garment dimensions are governed by circular knitting machine cylinder diameter and needle gauge (needles per linear inch, npi). Textile engineers specify fabric density via Wales Per Inch (WPI, horizontal stitch loops) and Courses Per Inch (CPI, vertical stitch loops).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Accurately controlling yarn feeding tension and thermal wet-processing shrinkage during dyeing ensures finished knitted garments maintain exact target centimeter girth dimensions across international production batches.
          </p>

    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Grading Rules & ASTM D5585 Standard Table of Body Measurements
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In industrial apparel mass production, pattern grading scales a master prototype pattern across consecutive commercial sizes. Under ASTM D5585 standard tables of body measurements for adult female apparel, grade rules specify dimensional increments between sizes.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In standard missy sizing, the bust, waist, and hip circumference grade by 1.0 inch (2.54 cm) between smaller sizes (0 to 10) and expand to 1.5 inches (3.81 cm) between larger sizes (10 to 18). Furthermore, vertical body rise and back waist length grade by approximately 0.25 inches (0.64 cm) per size step. Computer-aided pattern design (CAD) systems execute these mathematical transformations, maintaining balanced proportional silhouette lines across all production size ranges.
          </p>

    
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In customized bespoke footwear and orthotic shoe selection, coordinating clothing hemlines with boot shaft heights ensures complete ergonomic drape. You can cross-reference anatomical footwear parameters in our <Link href="/calculators/measurements/shoe-size-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">shoe size converter</Link> and calculate textile area yardage in our <Link href="/calculators/measurements/area-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">area converter</Link>.
          </p>

    </CalcPage>
  );
}
