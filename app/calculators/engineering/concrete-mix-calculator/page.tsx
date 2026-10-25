import type { Metadata } from "next";
import ConcreteMixCalculator from "@/components/calcs/engineering/concrete-mix-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ConcreteMixProportionChart } from "@/components/flagship/engineering/editorial-charts";

const PATH = "/calculators/engineering/concrete-mix-calculator";
const TITLE = "Concrete Mix Calculator — Cement Bags, Sand, Gravel & Water Ratios | CalcDigi";
const DESCRIPTION =
  "Calculate total concrete volume, dry volume factor (1.54×), cement bag count (50 kg / 94 lb), sand tons, coarse aggregate stone tons, and water demand for M10, M15, M20, M25, and M30 grade concrete slabs, footings, and columns.";

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
  { href: "/calculators/engineering/beam-load-calculator", icon: "📐", name: "Beam Deflection & Load Calculator" },
  { href: "/calculators/engineering/structural-steel-calculator", icon: "🏗️", name: "Structural Steel Column & Beam" },
  { href: "/calculators/engineering/pipe-flow-calculator", icon: "🌊", name: "Pipe Flow & Head Loss Calculator" },
  { href: "/calculators/math/ratio-calculator", icon: "⚖️", name: "Proportional Ratio Calculator" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Percentage Calculator" },
  { href: "/calculators/geography/elevation-grade-calculator", icon: "⛰️", name: "Elevation Grade & Slope Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "Why is wet concrete volume multiplied by 1.54 to find dry volume?",
    a: "When water is mixed with cement, fine aggregate (sand), and coarse aggregate (gravel), the dry constituents pack together tightly as sand particles fill the void spaces between gravel stones, and cement paste fills microscopic voids. During hydration, dry volume shrinks by approximately 35% in wet paste form. Consequently, civil engineering standards mandate multiplying wet formwork volume by a factor of 1.54 (1 / 0.65 = 1.538) to determine the actual unmixed dry bulk materials needed on site.",
  },
  {
    q: "What are the standard volumetric mix ratios for M15, M20, and M25 concrete?",
    a: "Standard nominal concrete mixes follow Cement : Sand : Coarse Aggregate volumetric proportions: M10 is 1:3:6 (compressive strength 10 MPa / 1,450 psi), M15 is 1:2:4 (15 MPa / 2,175 psi), M20 is 1:1.5:3 (20 MPa / 2,900 psi), and M25 is 1:1:2 (25 MPa / 3,625 psi). M20 is the minimum code requirement under IS 456 and ACI 318 for reinforced concrete (RCC) structural slabs, beams, and columns.",
  },
  {
    q: "How many 50 kg bags of cement are in one cubic meter of concrete?",
    a: "The number of cement bags depends on the design strength mix. For standard M20 nominal concrete (1:1.5:3 ratio with dry factor 1.54), dry volume per m³ is 1.54 m³. The cement volume share is 1 / (1 + 1.5 + 3) = 1/5.5 = 0.28 m³. Since one 50 kg bag of Portland cement occupies approximately 0.0347 m³ (density ~1,440 kg/m³), M20 requires approximately 0.28 / 0.0347 = 8.07 bags (around 8.2 bags including 2% wastage) per cubic meter.",
  },
  {
    q: "What is the water-cement ratio and how does it affect concrete compressive strength?",
    a: "The water-cement (w/c) ratio is the weight of mixing water divided by the weight of cement, typically maintained between 0.40 and 0.55 for structural work. Abrams' Law states that concrete compressive strength is inversely proportional to the water-cement ratio. Adding excess water creates capillary pores and bleeds out paste, drastically reducing 28-day compressive strength and increasing shrinkage cracking, while too little water impairs workability and prevents full cement hydration.",
  },
  {
    q: "How much extra concrete should be ordered for construction site wastage?",
    a: "Civil estimators recommend ordering 5% to 10% extra concrete beyond calculated formwork geometry. Simple rectangular suspended slabs require roughly 5% safety margin, whereas trench footings poured directly against uneven rough earth, bored piles, and complex foundation grade beams require 8% to 10% extra volume to compensate for ground undulations, spillage, and formwork bowing.",
  },
  {
    q: "How long does concrete take to reach full design strength?",
    a: "Concrete hardens through a continuous exothermic chemical reaction called hydration. Under standard curing temperatures (20°C / 68°F), concrete achieves approximately 16% of its characteristic design strength after 24 hours, 40% after 3 days, 65% to 70% after 7 days, and 99% to 100% of specified design strength after 28 days. Concrete continues gaining minor strength for years if moisture remains present.",
  },
];

export default function ConcreteMixPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/engineering", label: "Engineering" }}
      title="Concrete Mix Calculator"
      intro="Calculate exact concrete wet volume, dry aggregate expansion factor (1.54×), cement bag count (50 kg or 94 lb), fine sand tonnage, coarse gravel stone, and water demand across M10, M15, M20, M25, and M30 grade specifications."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Engineering Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
                <svg className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                ACI &amp; IS 456 Structural Codes
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Compliant with <strong className="font-semibold text-slate-800 dark:text-slate-200">ACI 211.1 Mix Design &amp; IS 456:2000 Plain and Reinforced Concrete</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Materials Engineering</span>
              <span>•</span>
              <time dateTime="2026-10-25">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Quick Engineering Answer: How Concrete Mix Proportions Are Calculated
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              To calculate raw constituents for concrete, multiply wet formwork volume by <strong>1.54 (Dry Volume Conversion Factor)</strong> because dry sand and cement pack into coarse aggregate interparticle voids. For standard <strong>M20 grade concrete (1:1.5:3 ratio)</strong>, one cubic meter of finished wet concrete requires <strong>~8.2 bags of cement (403 kg)</strong>, <strong>0.42 m³ of sand (672 kg)</strong>, <strong>0.84 m³ of gravel stone (1,344 kg)</strong>, and <strong>185 liters of water</strong> at a 0.45 water-cement ratio. Verify structural slab flexural capacity with our <a href="/calculators/engineering/beam-load-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">beam load calculator</a> or compute proportional split ratios with our <a href="/calculators/math/ratio-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">ratio calculator</a>.
            </p>
          </div>

          <h2>Concrete Mix Constituent Proportions &amp; Strength Grades</h2>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <ConcreteMixProportionChart />
          </div>

          <p>
            Concrete is the world's most widely consumed manufactured building material. Achieving high durability and target characteristic compressive strength (<em>fck</em>) requires precise batching of ordinary Portland cement (OPC), graded fine sand, clean coarse aggregate crushed stone, and potable water. In reinforced concrete design, the nominal strength grade designation (such as M15, M20, M25, M30) represents the 28-day characteristic compressive strength in Megapascals (MPa) tested on standard 150 mm curing cubes.
          </p>
          <p>
            When estimating site procurement, civil engineers distinguish strictly between <em>wet placed concrete volume</em> and <em>unmixed dry constituent volume</em>. Because dry bulk sand settles into gravel voids and cement fills interstitial capillaries during water hydration, dry raw materials shrink by approximately 35% when mixed. Hence, dry batching volume equals <code>V_dry = V_wet × 1.54</code>. To evaluate percentage material waste during pouring, consult our <a href="/calculators/math/percentage-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">percentage calculator</a>, or evaluate hydraulic drainage slopes using our <a href="/calculators/geography/elevation-grade-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">elevation grade calculator</a>.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Standard Concrete Volumetric Batching Equations</div>
            V_wet = Length * Width * Thickness
            <br />
            V_dry = V_wet * 1.54 * (1 + Wastage_pct / 100)
            <br />
            Ratio_sum = C_part + S_part + A_part
            <br />
            Cement_volume = (C_part / Ratio_sum) * V_dry
            <br />
            Cement_bags = Cement_volume / 0.0347 m^3 (for 50 kg standard bag)
            <br />
            Water_liters = Cement_mass_kg * Water_Cement_Ratio
          </Formula>

          <h2>Nominal Concrete Mix Design Grades and Applications</h2>
          <p>
            Depending on structural exposure classes defined by ACI 318 and IS 456, different structural elements require distinct cement paste densities to resist carbonation, sulfate attack, and reinforcement rebar corrosion. Column footings transferring heavy axial loads into underlying soil must be designed in tandem with our <a href="/calculators/engineering/structural-steel-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">structural steel calculator</a>.
          </p>

          <p className="font-semibold text-sm mb-2 text-slate-700 dark:text-slate-300">Standard Nominal Concrete Mix Ratios, 28-Day Strength &amp; Structural Applications</p>
          <DataTable
            head={["Grade Designation", "Mix Ratio (C:S:A)", "28-Day Strength (MPa / psi)", "Cement Bags / m³", "Primary Engineering Application"]}
            rows={[
              ["M10 Grade", "1 : 3 : 6", "10 MPa / 1,450 psi", "4.4 bags", "Plain Concrete Bedding (PCC), leveling course, non-structural pathways"],
              ["M15 Grade", "1 : 2 : 4", "15 MPa / 2,175 psi", "6.3 bags", "Mass foundation concrete, residential boundary walls, unreinforced slabs"],
              ["M20 Grade", "1 : 1.5 : 3", "20 MPa / 2,900 psi", "8.2 bags", "Standard Reinforced Concrete (RCC) for residential slabs, beams, and columns"],
              ["M25 Grade", "1 : 1 : 2", "25 MPa / 3,625 psi", "11.1 bags", "Heavy commercial RCC columns, retaining walls, cantilever balconies"],
              ["M30 Grade", "Design Mix", "30 MPa / 4,350 psi", "12.5 bags", "Water retaining tanks, highway bridges, industrial warehouse heavy floors"],
            ]}
          />

          <h2>Water-Cement Ratio and Durability Control</h2>
          <p>
            The single most critical variable dictating the mechanical performance and lifespan of concrete is the <strong>water-cement ratio (w/c)</strong>. While adequate water is chemically required for hydration (approximately 0.25 kg water per kg cement for stoichiometric hydration plus 0.15 kg for gel pores), excessive water causes bleeding and segregation during vibration. When excess water evaporates, it leaves interconnected microscopic capillaries that allow moisture and chlorides to penetrate, leading to accelerated rebar rust and spalling. For pumpable concrete mixes supplied through pipelines, verify fluid head loss and delivery pressures using our <a href="/calculators/engineering/pipe-flow-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">pipe flow calculator</a>.
          </p>
        </>
      }
    >
      <ConcreteMixCalculator />
    </CalcPage>
  );
}
