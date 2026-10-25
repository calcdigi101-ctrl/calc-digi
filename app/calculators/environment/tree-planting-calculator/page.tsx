import type { Metadata } from "next";
import Link from "next/link";
import TreePlantingCalculator from "@/components/calcs/environment/tree-planting-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { TreePlantingCarbonSequestrationTimelineChart } from "@/components/flagship/environment/editorial-charts";

const PATH = "/calculators/environment/tree-planting-calculator";
const TITLE = "Tree Planting Calculator | Carbon Offset, Forest Sizing & Seedling Estimation";
const DESCRIPTION =
  "Calculate the number of saplings and mature trees required to offset annual carbon dioxide (CO2) emissions. Model forest land area in acres, species sequestration rates, and 30-year carbon timelines.";

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
  { href: "/calculators/environment/carbon-footprint-calculator", icon: "🌱", name: "Annual Carbon Footprint" },
  { href: "/calculators/environment/air-quality-index-calculator", icon: "💨", name: "Air Quality Index (AQI)" },
  { href: "/calculators/environment/recycling-savings-calculator", icon: "♻️", name: "Recycling Resource Savings" },
  { href: "/calculators/environment/water-usage-calculator", icon: "💧", name: "Water Usage Calculator" },
  { href: "/calculators/math/ratio-calculator", icon: "📐", name: "Forestry Tree Density Ratio" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Seedling Survival Rate Percentage" },
];

const FAQ_ITEMS = [
  {
    q: "How much carbon dioxide does a single mature tree absorb per year?",
    a: "According to the US Forest Service (USFS) and the Arbor Day Foundation, a healthy, fully mature temperate hardwood tree (such as an oak, sugar maple, or European beech) absorbs approximately 21.8 kilograms (48 pounds) of carbon dioxide annually. Fast-growing pioneer species like hybrid poplars and willows absorb 30 to 35 kg during early growth, while coniferous pines average 15 to 20 kg annually due to lower wood density.",
  },
  {
    q: "How many trees must be planted to offset the average American household?",
    a: "The average American individual generates approximately 16.0 metric tons (16,000 kg) of greenhouse gas emissions annually. At an average mature sequestration rate of 22 kg CO2 per tree per year, offsetting one person requires 728 mature surviving trees. Assuming an 80% field survival rate during early sapling establishment, you must plant approximately 910 saplings, requiring roughly 1.8 acres of reforested land.",
  },
  {
    q: "Why do trees sequester carbon along an S-curve (sigmoidal growth curve)?",
    a: "Trees do not absorb maximum carbon immediately upon planting. During the first 1 to 5 years (seedling/sapling stage), trees prioritize root development, absorbing under 1 to 3 kg of CO2 annually. Between years 10 and 30 (vigorous canopy stage), leaf surface area expands exponentially, reaching peak annual carbon capture. Beyond year 50 to 80 (mature climax stage), annual sequestration gradually plateaus as cellular respiration balances photosynthesis.",
  },
  {
    q: "What is seedling mortality and why must survival rates be factored into planting models?",
    a: "In commercial and restoration forestry, young bare-root or containerized seedlings face severe environmental stressors: summer drought, winter frost heaving, rodent and deer browsing, invasive weed competition, and fungal root blight. Professional silviculture projects plan for 15% to 25% mortality over the first five years, requiring planting 120 to 130 saplings for every 100 target mature canopy trees.",
  },
  {
    q: "How much land area is required to plant a certified carbon offset forest?",
    a: "Standard professional forestry spacing utilizes an 8-by-8 foot grid (~680 trees per acre) or a 10-by-10 foot grid (~435 trees per acre). High-density initial planting encourages straight vertical stem growth and natural self-pruning. Planting 1,000 saplings at standard silvicultural spacing requires approximately 2.0 to 2.3 acres of contiguous land area (87,000 to 100,000 square feet).",
  },
  {
    q: "What is the permanence and additionality criteria for certified carbon credits?",
    a: "In voluntary and compliance carbon credit markets, forestry projects must satisfy 'additionality' (the forest would not have been planted or preserved without carbon finance) and 'permanence' (the sequestered carbon remains securely locked away for at least 40 to 100 years). Projects must establish dedicated buffer insurance pools to protect against catastrophic reversals from wildfires, pest epidemics, or illegal logging.",
  },
];

export default function TreePlantingPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/environment", label: "Environment" }}
      title="Tree Planting Carbon Offset Calculator"
      intro="Calculate the number of saplings and mature trees required to offset annual carbon dioxide (CO2) emissions. Model forest land area in acres, species sequestration rates, and 30-year carbon timelines."
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
                USFS FIA & IPCC AFOLU Standard
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Silviculture Biomass Protocols</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                Validated Allometric Equations
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-emerald-500/20 bg-emerald-50/60 p-4 dark:border-emerald-500/30 dark:bg-emerald-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: How Many Trees Must You Plant to Offset Your Carbon?
                </strong>
                <p className="mt-1">
                  A mature temperate hardwood tree absorbs approximately 22 kilograms (48.5 lbs) of CO2 per year. Offsetting one metric ton (1,000 kg) of annual emissions requires 45 mature surviving trees. Factoring in an 80% sapling survival rate over early establishment years, you must plant roughly 57 saplings per metric ton. Offsetting an average American lifestyle (16 metric tons CO2e annually) requires planting approximately 910 saplings, establishing a thriving 728-tree forest stand across 1.8 to 2.1 acres of land.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - CHART IMMEDIATELY BELOW */}
          <h2>30-Year Cumulative Carbon Sequestration Growth Trajectories</h2>
          <div className="not-prose my-6">
            <TreePlantingCarbonSequestrationTimelineChart />
          </div>

          <p>
            Biological carbon sequestration through afforestation (planting trees on land that has not supported forests in recent history) and reforestation (re-establishing tree cover on degraded or harvested forestland) constitutes the most scalable, cost-effective nature-based climate solution on Earth. Photosynthesis utilizes solar photon energy to split water molecules and capture atmospheric carbon dioxide, converting gaseous carbon into durable, solid organic polymers: cellulose, hemicellulose, and lignin.
          </p>

          <p>
            Approximately 50% of the dry biomass of a tree&apos;s woody trunk, branches, and root systems consists of elemental carbon permanently removed from the atmosphere. Beyond carbon sequestration, establishing biodiverse forest ecosystems delivers profound co-benefits: stabilizing vulnerable watershed soils, filtering urban airborne particulates, recharging depleted groundwater aquifers, and providing essential habitat for threatened wildlife species.
          </p>

          <p>
            To evaluate your household baseline emissions before designing an offset planting plan, cross-reference our <Link href="/calculators/environment/carbon-footprint-calculator">Carbon Footprint Calculator</Link>. To examine how urban tree canopies capture airborne dust and lower localized particulate concentrations, explore our <Link href="/calculators/environment/air-quality-index-calculator">Air Quality Index Calculator</Link> and calculate water retention with our <Link href="/calculators/environment/water-usage-calculator">Water Usage Calculator</Link>.
          </p>

          <h2>Mathematical Principles of Allometric Tree Biomass & Carbon Accounting</h2>

          <p>
            Silviculturists estimate tree carbon storage using allometric biomass equations that relate measurable tree trunk diameter at breast height (DBH, measured 4.5 feet above ground) and total tree height to total above-ground and below-ground dry mass:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Mature Tree Annual Sequestration & Sapling Sizing Equations</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">N_mature = ceil(Target_CO2_kg / Species_kg_per_tree) | N_saplings = ceil(N_mature / Survival_Rate%)</div>
            <div className="mt-1 font-sans text-xs text-slate-500 dark:text-slate-400">Where E_target is annual target carbon emissions in metric tons CO2e; S_species is annual mature sequestration in kilograms per tree (typically 18 to 40 kg); and sigma_survival is the fractional seedling survival rate (typically 0.75 to 0.85).</div>
          </Formula>

          <p>
            The required forestry land footprint and project capital investment are calculated as follows:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Forest Land Footprint & Capital Investment Formulas</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">Forest_Acres = (N_saplings * Spacing_sqft) / 43,560 | Total_Cost = N_saplings * Seedling_Cost</div>
            <div className="mt-1 font-sans text-xs text-slate-500 dark:text-slate-400">Where d_spacing is inter-tree planting distance in feet (typically 8 to 10 feet); 43,560 is square feet per acre; and C_seedling is the turnkey cost per bare-root sapling including shelter tubes and planting labor.</div>
          </Formula>

          <h2>Sequestration Rates & Silvicultural Characteristics by Tree Species</h2>

          <p>
            The rate of carbon sequestration varies significantly depending on wood density, crown geometry, and growth kinetics. The following reference table presents values compiled from USFS Forest Inventory and Analysis (FIA) data:
          </p>

          <DataTable
            head={["Tree Classification", "Representative Species", "Mature CO2 (kg/yr)", "Peak Growth Decades", "Wood Specific Gravity", "Key Ecological Strengths"]}
            rows={[
              ["Mixed Temperate Hardwood", "Sugar Maple, White Oak, American Beech", "22 kg CO2 / yr", "Years 20 to 60", "0.60 – 0.72 (High)", "Extreme longevity, high timber durability, deep fungal root networks"],
              ["Fast-Growing Deciduous", "Hybrid Poplar, Black Willow, Paper Birch", "32 kg CO2 / yr", "Years 5 to 25", "0.35 – 0.45 (Low)", "Rapid early carbon capture, quick canopy closure, riparian soil stabilization"],
              ["Long-Lived Native Oak", "Red Oak, Bur Oak, American Chestnut", "25 kg CO2 / yr", "Years 25 to 80", "0.68 – 0.75 (High)", "Resilient wildfire bark, high acorn mast for wildlife, massive root biomass"],
              ["Coniferous Evergreen", "Douglas Fir, Eastern White Pine, Loblolly", "18 kg CO2 / yr", "Years 15 to 45", "0.42 – 0.52 (Medium)", "Year-round photosynthetic canopy, excellent winter windbreak, rapid softwood growth"],
              ["Tropical Agroforestry", "Teak, Mahogany, Inga Edulis, Cacao shade", "40 kg CO2 / yr", "Years 5 to 30", "0.55 – 0.70 (Medium)", "Continuous 12-month equatorial growing season, rich biodiversity canopy layers"],
            ]}
          />

          <p>
            For evaluating acreage ratios and survival percentages across planting plots, consult our <Link href="/calculators/math/ratio-calculator">Ratio Calculator</Link> and <Link href="/calculators/math/percentage-calculator">Percentage Calculator</Link>.
          </p>

          <h2>Understanding the Sigmoidal (S-Curve) Sequestration Timeline</h2>

          <p>
            A common mistake in offset calculations is assuming that a newly planted seedling absorbs 22 kg of CO2 in its very first year. Biological tree growth follows a classic logistic or sigmoidal curve:
          </p>

          <ul>
            <li>
              <strong>Establishment Phase (Years 1–4):</strong> Saplings focus biological energy on radical root elongation and mycorrhizal fungal symbiosis. Carbon absorption is modest, averaging 0.5 to 2.5 kg CO2 annually.
            </li>
            <li>
              <strong>Exponential Pole & Sapling Phase (Years 5–15):</strong> Rapid lateral branch expansion and vertical height growth produce dense leafy crowns. Sequestration rates triple, absorbing 8 to 18 kg CO2 annually.
            </li>
            <li>
              <strong>Mature Climax Phase (Years 16–45):</strong> Trunk diameter expands significantly. Heartwood density reaches peak mass accretion, absorbing 20 to 35 kg CO2 per year.
            </li>
            <li>
              <strong>Old-Growth Equilibrium Phase (Years 60+):</strong> While annual growth increments slow, large mature trees store immense reservoirs of total accumulated carbon and maintain rich soil fungal carbon networks.
            </li>
          </ul>

          <h2>The Critical Superiority of Mixed Native Hardwoods over Monocultures</h2>

          <p>
            Early commercial offset initiatives often planted dense monoculture plantations of non-native, fast-growing pines or eucalyptus. While rapid in early growth, monoculture stands are acutely vulnerable to catastrophic pest outbreaks (such as emerald ash borers or pine bark beetles) and carry extreme wildfire crown fire risks.
          </p>

          <p>
            Modern conservation silviculture mandates planting biodiverse mixtures of native hardwood and understory species. Diverse root systems occupy distinct soil strata, fostering resilient fungal networks that transfer nutrients between trees and maximizing carbon storage permanence across centuries.
          </p>

          <h2>Soil Organic Carbon (SOC) & Riparian Buffer Zone Dynamics</h2>

          <p>
            An essential dimension of forest carbon dynamics is subterranean soil organic carbon (SOC). In temperate hardwood ecosystems, forest soils store between 40% and 50% of total carbon stocks in deep root exudates and fungal mycelium networks. When lands are reforested, soil microbial communities rebuild rapidly, locking away tons of carbon beneath the plow layer where it remains immune to surface wildfires.
          </p>

          <p>
            Furthermore, establishing riparian forest buffers along streams prevents agricultural nutrient runoff from reaching waterways, stabilizing stream banks while creating vital wildlife movement corridors.
          </p>

          <p>
            To investigate how reducing household resource waste complements biological forestry initiatives, consult our <Link href="/calculators/environment/recycling-savings-calculator">Recycling Savings Calculator</Link> and track residential electricity impacts with the <Link href="/calculators/environment/energy-consumption-calculator">Energy Consumption Calculator</Link>.
          </p>
        </>
      }
    >
      <TreePlantingCalculator />
    </CalcPage>
  );
}
