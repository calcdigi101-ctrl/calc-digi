import type { Metadata } from "next";
import Link from "next/link";
import ShoeSizeConverterComponent from "@/components/calcs/measurements/shoe-size-converter";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ShoeSizeInternationalFitMatrixChart } from "@/components/flagship/measurements/editorial-charts";

const PATH = "/calculators/measurements/shoe-size-converter";
const TITLE = "Shoe Size Converter | US, UK, EU & Centimeter Sizing Charts";
const DESCRIPTION =
  "Convert US Men, US Women, UK, European (EU), Japanese (CM), and Mondo point shoe sizes with exact anatomical foot length derivations and fit matrices.";

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
  { href: "/calculators/measurements/clothing-size-converter", icon: "👗", name: "Clothing Size" },
  { href: "/calculators/measurements/length-converter", icon: "📏", name: "Length Converter" },
  { href: "/calculators/measurements/weight-converter", icon: "⚖️", name: "Weight Converter" },
  { href: "/calculators/math/ratio-calculator", icon: "🔢", name: "Ratio Calculator" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Percentage" },
  { href: "/pages/measurements", icon: "👟", name: "Measurements Hub" },
];

const FAQ_ITEMS = [
  {
    q: "Why is a European (EU) shoe size so different from US and UK sizing numbers?",
    a: "Continental European shoe sizing uses the 'Paris Point' (point de Paris), established in the mid-19th century as 2/3 of a centimeter (~6.67 mm). A foot measuring 26 cm plus 1.5 cm toe clearance requires an internal shoe last of 27.5 cm = 275 mm ÷ 6.67 mm ≈ EU size 41.5. US and UK systems, by contrast, use barleycorn units of 1/3 inch (8.47 mm) with historical gender-based offset zero points.",
  },
  {
    q: "What is the exact offset between US Men's and US Women's shoe sizing?",
    a: "Under the standard FIA (Footwear Industries of America) scale, US Women's shoe sizes are offset by exactly 1.5 sizes larger than US Men's sizes for an identical foot length. A US Men's size 8.5 corresponds directly to a US Women's size 10.0 (both designed for a foot length of ~26.0 cm).",
  },
  {
    q: "What is the Mondopoint shoe sizing system and where is it used?",
    a: "Standardized under ISO 9407:2019, Mondopoint is the only truly universal, metric shoe sizing standard in the world. It measures foot length in millimeters (mm) and foot width in millimeters across the ball joint (e.g., 270/100 denotes a foot 270 mm long and 100 mm wide). It is universally mandated by NATO military forces, ski boot manufacturers, and high-altitude mountaineering equipment.",
  },
  {
    q: "How much extra toe clearance space is engineered into shoe last sizing?",
    a: "Orthopedic podiatrists and footwear designers incorporate approximately 12 mm to 15 mm (~0.5 inches) of internal length allowance beyond actual bare foot length. This ease allowance accommodates forward foot sliding during gait deceleration and natural foot elongation during weight-bearing stance phases.",
  },
];

export default function ShoeSizeConverterPage() {
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
            <strong>Quick Sizing Guidance:</strong> Footwear sizing converts between regional shoemaking last standards and anatomical foot lengths. In international retail e-commerce and athletic footwear selection, cross-reference garment charts in our <Link href="/calculators/measurements/clothing-size-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">clothing size converter</Link> and calculate linear millimeter foot spans in our <Link href="/calculators/measurements/length-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">length converter</Link>.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Anthropometric Podiatry: Historical Sizing Systems & Last Geometry
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Human footwear manufacturing represents one of the oldest intersection points between biomechanical ergonomics and industrial mass production. Historically, bespoke shoemakers carved wooden lasts modeled after individual client feet. In medieval England, King Edward II codified the &apos;barleycorn&apos; in 1324 as 1/3 of an inch (~8.467 mm), establishing the fundamental step interval that still governs British and American shoe sizes today.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In continental Europe, 19th-century French shoemakers adopted the &apos;Paris Point&apos; (2/3 cm or ~6.667 mm). Japan and East Asia standardized on direct anatomical foot length in centimeters (cm), while the International Organization for Standardization developed the Mondopoint system (ISO 9407) in millimeters. Today, purchasing athletic shoes or luxury footwear from international online retailers requires navigating these four divergent sizing matrices.
          </p>

          <ShoeSizeInternationalFitMatrixChart />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Derivation: Last Length vs Foot Length Formulas
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Shoe sizes are calculated from internal shoe last length L_last in inches or centimeters, where last length equals bare foot length L_foot plus ~1.5 cm toe ease allowance:
          </p>
          <Formula>{"L_{\\text{last}} = L_{\\text{foot}} + 1.5 \\text{ cm} = L_{\\text{foot}} + 0.59 \\text{ in}"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The legal conversion formulas across international sizing standards are:
          </p>
          <Formula>{"\\text{Size}_{\\text{UK}} = (3 \\times L_{\\text{last, in}}) - 25, \\quad \\text{Size}_{\\text{US Men}} = (3 \\times L_{\\text{last, in}}) - 24 = \\text{Size}_{\\text{UK}} + 1"}</Formula>
          <Formula>{"\\text{Size}_{\\text{US Women}} = \\text{Size}_{\\text{US Men}} + 1.5 = (3 \\times L_{\\text{last, in}}) - 22.5"}</Formula>
          <Formula>{"\\text{Size}_{\\text{EU}} = \\frac{3}{2} \\times L_{\\text{last, cm}} = 1.5 \\times (L_{\\text{foot, cm}} + 1.5)"}</Formula>
          <Formula>{"\\text{Mondopoint (mm)} = L_{\\text{foot, mm}} = L_{\\text{foot, cm}} \\times 10"}</Formula>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            When calculating foot width fittings (from narrow B width to extra-wide 4E), ball-girth measurements scale proportionally with foot length; explore width proportions in our <Link href="/calculators/math/ratio-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">ratio calculator</Link> and calculate body weight distribution in our <Link href="/calculators/measurements/weight-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">weight converter</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comprehensive Reference Table of Global Shoe Sizing Matrices
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below compiles exact size equivalencies across adult foot length benchmarks:
          </p>
          <DataTable
            head={["Foot Length (cm)", "Mondopoint (mm)", "US Men", "US Women", "UK / Australia", "Europe (EU)", "Japan (cm)"]}
            rows={[
              ["23.5 cm", "235 mm", "5.5", "7.0", "5.0", "38.0", "23.5"],
              ["24.0 cm", "240 mm", "6.0", "7.5", "5.5", "38.5", "24.0"],
              ["24.5 cm", "245 mm", "6.5", "8.0", "6.0", "39.0", "24.5"],
              ["25.0 cm", "250 mm", "7.0", "8.5", "6.5", "40.0", "25.0"],
              ["25.5 cm", "255 mm", "7.5", "9.0", "7.0", "40.5", "25.5"],
              ["26.0 cm", "260 mm", "8.0", "9.5", "7.5", "41.5", "26.0"],
              ["26.5 cm", "265 mm", "8.5", "10.0", "8.0", "42.0", "26.5"],
              ["27.0 cm", "270 mm", "9.0", "10.5", "8.5", "42.5", "27.0"],
              ["27.5 cm", "275 mm", "9.5", "11.0", "9.0", "43.5", "27.5"],
              ["28.0 cm", "280 mm", "10.0", "11.5", "9.5", "44.0", "28.0"],
              ["28.5 cm", "285 mm", "10.5", "12.0", "10.0", "44.5", "28.5"],
              ["29.0 cm", "290 mm", "11.0", "12.5", "10.5", "45.0", "29.0"],
              ["30.0 cm", "300 mm", "12.0", "13.5", "11.5", "46.5", "30.0"],
            ]}
          />

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Worked Engineering Case Study: Cross-Border Footwear E-Commerce Sizing
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Consider an e-commerce retail operations analyst for an Italian luxury leather footwear brand launching an international direct-to-consumer online store in the United States. The brand crafts shoes on EU lasts: a customer in California measures their foot barefoot at exactly 27.2 centimeters (10.71 inches) and inquires which EU size to order for Oxford dress shoes versus athletic sneakers:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Step 1 (Determine Last Length with Toe Ease):</strong> L_last = 27.2 cm + 1.5 cm ease allowance = 28.7 cm.</li>
            <li><strong>Step 2 (Compute European Size):</strong> EU size = 1.5 × 28.7 cm = 43.05 (rounded to standard EU 43).</li>
            <li><strong>Step 3 (Cross-Verify in US Men&apos;s Sizing):</strong> L_last in inches = 28.7 cm ÷ 2.54 = 11.299 inches. US Men&apos;s size = (3 × 11.299) - 24 = 33.898 - 24 = 9.898 ≈ US Men&apos;s 10.0.</li>
            <li><strong>Step 4 (Width Compensation):</strong> If the customer has an extra-wide foot (E or EE width), sizing up to EU 43.5 or US 10.5 prevents lateral forefoot constriction. Cross-reference garment sizing in our <Link href="/calculators/measurements/clothing-size-converter" className="text-emerald-600 dark:text-emerald-400 font-medium underline">clothing size converter</Link>.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Footwear Width Systems: From Narrow B to Extra-Wide 4E
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Shoe length is only one of two vital spatial dimensions; foot width across the first and fifth metatarsophalangeal joints (the ball girth) dictates comfort and foot health. The American Footwear Industries Association (FIA) classifies width using letter codes:
          </p>
          <ul className="list-disc pl-6 text-sm text-slate-700 dark:text-slate-300 space-y-2 mb-4">
            <li><strong>Narrow Widths (A, B for Men / 2A, A for Women):</strong> Tailored for slender feet with low arch volume; prevents heel slippage and blisters.</li>
            <li><strong>Medium / Standard Width (D for Men / B for Women):</strong> Represents standard industrial shoemaking lasts, fitting approximately 70% to 75% of the adult population.</li>
            <li><strong>Wide Widths (2E, EE for Men / D for Women):</strong> Adds ~5 mm to 8 mm of circumscribing ball girth allowance per width step.</li>
            <li><strong>Extra Wide (4E, 6E):</strong> Essential for individuals with bunions (hallux valgus), fallen transverse arches, or orthotic insoles to prevent peripheral nerve compression.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Biomechanical Foot Volumetric Expansion During Running & Stance Phases
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The human foot is an active biological shock absorber comprising 26 bones, 33 joints, and over 100 ligaments and tendons. Under dynamic running impacts, the longitudinal medial arch flattens dynamically, elongating the foot by up to 5 mm and expanding forefoot width by 4% to 6%.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Furthermore, prolonged standing or distance running increases foot fluid volume by up to 8% due to gravity-induced venous pooling. Sports medicine orthopedists advise measuring shoe sizes in the late afternoon or evening and selecting marathon running shoes a half-size larger than formal leather dress shoes.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everyday Applications in Athletic Training, Ski Boots & Children&apos;s Growth
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In specialized athletic equipment like alpine ski boots, exact Mondopoint sizing is mandatory because rigid polyurethane shells cannot flex to accommodate incorrect sizing. In pediatric healthcare, children&apos;s feet grow rapidly (often an entire half-size every 3 to 4 months between ages 2 and 6), requiring routine millimeter measurement to prevent ingrown toenails and digital deformities.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            For academic tracking and statistical analysis, explore our <Link href="/calculators/education/gpa-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">GPA calculator</Link> and calculate conversion variances in our <Link href="/calculators/math/percentage-calculator" className="text-emerald-600 dark:text-emerald-400 font-medium underline">percentage calculator</Link>, or visit the centralized <Link href="/pages/measurements" className="text-emerald-600 dark:text-emerald-400 font-medium underline">Measurements &amp; Conversions hub</Link>.
          </p>
        </>
      }
    >
      <ShoeSizeConverterComponent />
    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Pedobarography: Dynamic Plantar Pressure & Footwear Cushioning Biomechanics
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In clinical podiatry and athletic footwear biomechanics, pedobarography evaluates the distribution of vertical ground reaction forces exerted by the human foot during the gait cycle. Force sensor matrices measure dynamic pressure (in kilopascals, kPa, or pounds per square inch, PSI) across anatomical foot zones: the heel (calcaneus), the midfoot lateral arch, the metatarsal heads, and the hallux (big toe).
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            During heel-strike in distance running, impact peak forces reach 2.5 to 3.0 times total body weight within 25 milliseconds. Footwear designers engineer midsole foam geometry—utilizing supercritical foamed polyether block amide (PEBAX) and ethylene-vinyl acetate (EVA)—to absorb impact shock waves and attenuate peak tibial acceleration. Mismatched shoe sizing that shifts the shoe&apos;s engineered flex groove away from the biological metatarsophalangeal hinge alters mechanical leverage, inducing Achilles tendinitis and plantar fasciitis.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            3D Laser Anthropometry & Additive Manufacturing of Custom Footwear
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Modern high-performance athletic footwear and medical prescription orthotics are increasingly abandoning traditional standardized sizing charts in favor of 3D optical laser foot scanning. Structured-light optical scanners capture over 100,000 coordinate surface points in under five seconds, generating a fully parametric digital foot mesh measuring thirty distinct anthropometric dimensions, including heel width, instep circumference, navicular height, and toe box volume.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Computer-aided manufacturing systems utilize selective laser sintering (SLS) 3D printing to fabricate custom elastomeric lattice midsoles with spatially graded mechanical stiffness tailored to the wearer&apos;s individual gait kinematics. This bespoke digital workflow bridges historical regional shoe size approximations with direct millimeter anatomical perfection.
          </p>

    
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Pediatric Podiatry: Skeletal Ossification & Children&apos;s Footwear Selection
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In pediatric orthopedics, the human infant foot consists primarily of pliable cartilaginous models rather than fully ossified bone. Complete primary and secondary skeletal ossification of the 26 foot bones is not fully completed until approximately 18 to 21 years of age. During early childhood (ages 1 to 5), the medial longitudinal arch is masked by a thick protective plantar fat pad, giving young children&apos;s feet a natural flatfoot appearance.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Because growing cartilage is easily molded by external compressive forces, ill-fitting footwear poses serious developmental hazards. Shoes that are too tight compress the hallux laterally, encouraging early bunion formation and hammer toes. Pediatricians recommend leaving at least 12 mm to 15 mm of forward toe clearance space when purchasing children&apos;s shoes, re-measuring foot length every three months to keep pace with rapid skeletal growth spurts.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Furthermore, children&apos;s shoe sizing charts feature independent infant (sizes 0 to 4), toddler (sizes 5 to 10), and youth/junior (sizes 11 to 3) classifications that reset numbering before merging into adult scales, requiring careful millimeter foot length cross-referencing.
          </p>

    
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In competitive track and field athletics, sprinting spikes are engineered with rigid carbon fiber footplates tuned to maximize Achilles tendon elastic energy return during explosive blocks acceleration. Millimeter-accurate heel counter lock-down prevents energy dissipation, optimizing sprint power transfer.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Orthopedic shoe lasts also accommodate bespoke medical foot orthoses (AFOs) for patients recovering from neurological trauma, ensuring even plantar pressure redistribution and preventing skin ulceration.
          </p>

    </CalcPage>
  );
}
