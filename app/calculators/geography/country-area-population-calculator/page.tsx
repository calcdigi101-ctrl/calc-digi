import type { Metadata } from "next";
import CountryAreaPopulationCalculator from "@/components/calcs/geography/country-area-population-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CountryDemographicDensityChart } from "@/components/flagship/geography/editorial-charts";

const PATH = "/calculators/geography/country-area-population-calculator";
const TITLE = "Country Statistics Calculator – Population Density, GDP per Capita & Demographic Projections | CalcDigi";
const DESCRIPTION =
  "Calculate crude population density, nominal GDP per capita, demographic doubling time, and multi-decade population projections. Features UN World Factbook reference benchmarks and spatial urbanization tiers.";

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
  { href: "/calculators/geography/distance-between-cities-calculator", icon: "🌐", name: "Distance Between Cities" },
  { href: "/calculators/geography/latitude-longitude-calculator", icon: "📍", name: "Latitude & Longitude Coordinates" },
  { href: "/calculators/geography/time-zone-difference-calculator", icon: "🕐", name: "Time Zone Difference" },
  { href: "/calculators/geography/map-scale-calculator", icon: "🗺️", name: "Map Scale & Ground Distance" },
  { href: "/calculators/math/percentage-calculator", icon: "🔢", name: "Percentage Calculator" },
  { href: "/calculators/math/ratio-calculator", icon: "⚖️", name: "Ratio Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "How is crude population density scientifically calculated?",
    a: "Crude population density is computed by dividing the total resident population by the total surface land area in square kilometers or square miles: Density = Population / Land Area. For instance, Bangladesh contains roughly 173 million residents within 147,570 km², yielding a crude density of 1,172 people per km². Conversely, the United States has 335 million residents across 9.83 million km², producing a national average density of 36 people per km².",
  },
  {
    q: "What is the difference between crude density and physiological density?",
    a: "Crude population density measures total human beings per unit of all territorial land, regardless of whether that terrain consists of arid deserts, glaciated mountains, or fertile plains. Physiological density measures the number of residents per unit of arable (agriculturally cultivable) land. In countries like Egypt, where 95% of the territory is uninhabitable desert, physiological density along the Nile River exceeds 2,500 people per km² despite a modest national crude density of ~105 per km².",
  },
  {
    q: "How does the demographic Rule of 70 calculate population doubling time?",
    a: "The Rule of 70 is an applied mathematical shortcut derived from natural logarithms (ln(2) ≈ 0.693). Dividing 70 by the annual percentage population growth rate (r) calculates the approximate number of years required for a population to double: Doubling Years ≈ 70 / r. For example, a country growing at 2.0% annually will double its population in approximately 35 years, whereas a nation growing at 0.5% requires 140 years.",
  },
  {
    q: "Why is GDP per capita a more reliable living standard benchmark than total GDP?",
    a: "Total nominal GDP reflects the aggregate gross volume of an economy, heavily skewed by the total size of the workforce. China possesses the world's second-largest aggregate GDP (~$18 trillion), yet dividing that wealth among 1.41 billion residents yields a GDP per capita of ~$13,000 USD. Conversely, smaller nations like Switzerland or Singapore yield GDP per capita figures exceeding $85,000 to $90,000 USD, providing a far more realistic indicator of individual economic productivity and purchasing power.",
  },
  {
    q: "Which sovereign nation possesses the highest and lowest population density on Earth?",
    a: "Among sovereign nations, the Principality of Monaco holds the highest crude population density at over 18,700 people per km², followed by Singapore at ~8,000 per km². The lowest density belongs to Mongolia, with only 2.2 residents per km² across 1.56 million km² of vast nomadic steppe, followed by Namibia and Australia at ~3.5 per km².",
  },
  {
    q: "What percentage of Earth's land surface is genuinely habitable by humans?",
    a: "Approximately 71% of Earth's surface is covered by ocean water, leaving 29% (roughly 149 million km²) as dry land. Of that land area, glaciated ice sheets (10%) and hyper-arid deserts (roughly 20% to 25%) are largely unpopulated. Consequently, over 50% of the entire human species lives on just 3% of the land surface, primarily within 100 kilometers of maritime coastlines and major freshwater river valleys.",
  },
];

export default function CountryAreaPopulationPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/geography", label: "Geography" }}
      title="Country Statistics Calculator"
      intro="Compute crude population density, nominal GDP per capita, demographic doubling horizons, and multi-decade population projections for any sovereign state or sub-national territory."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      faq={FAQ_ITEMS}
      related={RELATED_CALCULATORS}
      article={
        <>
          {/* Scientific Geographic Authority Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
                <svg className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                UN Population Division Standards
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Reviewed against <strong className="font-semibold text-slate-800 dark:text-slate-200">World Bank WDI &amp; IMF World Economic Outlook 2026</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Geodemographic Reference</span>
              <span>•</span>
              <time dateTime="2026-10-25">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Geographic Summary: How Country Population Density is Calculated
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <strong>Population density</strong> quantifies spatial demographic concentration by computing the ratio of human residents to territorial land area: <strong>Density = Population ÷ Land Area (km² or sq mi)</strong>. While global crude density averages approximately 60 people per km² across Earth&apos;s 149 million km² of land, national densities range from over <strong>18,700/km² in Monaco</strong> to just <strong>2.2/km² in Mongolia</strong>. Analyzing population alongside economic output via our <a href="/calculators/math/ratio-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">ratio calculator</a> reveals true per-capita living standards and municipal infrastructure loads.
            </p>
          </div>

          <h2>Demographic Spatial Analysis &amp; Global Density Spectrum</h2>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <CountryDemographicDensityChart />
          </div>

          <p>
            The distribution of human civilization across planetary geography is extraordinarily unequal. Geographers and spatial demographers classify national population patterns not merely by sovereign political borders, but through the lens of geomorphology, climate zones, and arable soil distribution. When analyzing how nations develop, understanding crude density versus carrying capacity is fundamental to urban planning, resource management, and economic policy. You can evaluate population percentage shares across continents using our <a href="/calculators/math/percentage-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">percentage calculator</a>.
          </p>
          <p>
            Demographic concentration is shaped by physical geography: access to navigable waterways, fertile agricultural deltas, and temperate climate zones. In China, the celebrated <em>Heihe–Tengchong Line</em> divides the country into two distinct halves: the eastern portion contains roughly 94% of the population within 43% of the land area, while the arid western territories remain sparsely inhabited. Similarly, in Canada, over 90% of the citizenry resides within 160 kilometers of the southern border. Connecting city coordinates with our <a href="/calculators/geography/distance-between-cities-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">distance between cities calculator</a> illustrates how major population clusters align along linear economic corridors.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Crude Density and Per Capita Economic Output Formulas</div>
            <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">{"\\text{Density} = \\frac{\\text{Population}}{\\text{Land Area (km}^2\\text{)}} \\quad \\Big| \\quad \\text{GDP per Capita} = \\frac{\\text{Total Nominal GDP}}{\\text{Population}}"}</div>
            <div className="font-sans text-xs text-slate-500 dark:text-slate-400">Divides resident headcounts by territorial land area to assess spatial density, and divides national annual economic output by population to quantify average economic productivity per citizen.</div>
          </Formula>

          <h2>Global Sovereign Density Benchmark Classifications</h2>
          <p>
            The United Nations Statistics Division and the World Bank categorize international sovereign states across distinct density and demographic tiers based on physical land area, urbanization rate, and ecological biome constraints:
          </p>

          <DataTable
            head={["Sovereign Nation", "Total Population (2026)", "Surface Land Area (km²)", "Crude Density (per km²)", "Nominal GDP per Capita", "Demographic & Spatial Character"]}
            rows={[
              ["Monaco", "39,000 residents", "2.08 km²", "18,750 / km²", "$234,000 USD", "Hyper-dense Mediterranean city-state; 100% urban land saturation."],
              ["Singapore", "5.92 million", "734 km²", "8,065 / km²", "$88,000 USD", "Engineered high-density metropolis utilizing vertical zoning and land reclamation."],
              ["Bangladesh", "173.5 million", "147,570 km²", "1,175 / km²", "$2,600 USD", "World's most densely settled large agrarian nation; concentrated Ganges-Brahmaputra delta."],
              ["India", "1,430.0 million", "3,287,263 km²", "435 / km²", "$2,650 USD", "Global demographic giant; high agricultural fertility across northern alluvial plains."],
              ["United Kingdom", "68.2 million", "243,610 km²", "280 / km²", "$48,900 USD", "Temperate industrial island nation; dense urban clustering in London & the Midlands."],
              ["China", "1,410.0 million", "9,596,961 km²", "147 / km²", "$13,100 USD", "High eastern urban concentration contrasted with vast arid western highlands."],
              ["United States", "335.5 million", "9,833,517 km²", "36 / km²", "$81,600 USD", "Continental scale; suburban polycentric distribution leaving interior plains open."],
              ["Canada", "40.5 million", "9,984,670 km²", "4.2 / km²", "$53,200 USD", "Sub-arctic Canadian Shield limits continuous settlement to a narrow southern ribbon."],
              ["Australia", "27.1 million", "7,692,024 km²", "3.5 / km²", "$64,700 USD", "85% coastal urbanized; interior outback constitutes one of Earth's emptiest biomes."],
              ["Mongolia", "3.5 million", "1,564,116 km²", "2.2 / km²", "$5,300 USD", "World's most sparsely populated sovereign state; nomadic pastoral steppe geography."],
            ]}
            highlight={3}
          />

          <h2>The Mathematics of Demographic Compounding: The Rule of 70</h2>
          <p>
            Population growth does not progress linearly; it expands through exponential geometric compounding. When a national population grows at an annual net rate of $r\%$, the annual incremental births and net migrants themselves contribute to subsequent generations of reproduction. Calculate time horizons across historical demographic cycles using our <a href="/calculators/datetime/year-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">year calculator</a>.
          </p>
          <p>
            To estimate the duration required for a population to double in magnitude without requiring complex exponential calculators, demographic mathematicians utilize the <strong>Rule of 70</strong>, derived from the mathematical Taylor series expansion of $\ln(2)$:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Exponential Demographic Growth & Doubling Time Formula</div>
            <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400 mb-1">{"P(t) = P_0 \\times (1 + r)^t \\quad \\Big| \\quad T_{\\text{double}} \\approx \\frac{\\ln(2)}{\\ln(1 + r)} \\approx \\frac{70}{r\\%}"}</div>
            <div className="font-sans text-xs text-slate-500 dark:text-slate-400">Where P(t) represents projected population after t years, P₀ is baseline population, and r is the annual net growth rate percentage. At 1.0% annual growth, a nation doubles in 70 years; at 2.0%, it doubles in 35 years.</div>
          </Formula>

          <h2>Economic Productivity: Total GDP vs. Per Capita Prosperity</h2>
          <p>
            Evaluating a nation solely by aggregate Gross Domestic Product (GDP) presents a distorted picture of civilian well-being. A nation with 1.4 billion people generating $18 trillion in economic output possesses vast geopolitical and military influence, yet individual citizens experience an average purchasing power of ~$13,000 annually. Conversely, small European economies such as Luxembourg ($135,000/capita) or Ireland ($105,000/capita) generate exceptionally high capital productivity per resident. You can benchmark household income against national per-capita averages using our <a href="/calculators/finance/budget-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">household budget calculator</a> and evaluate arithmetic central tendencies with our <a href="/calculators/math/average-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">average calculator</a>.
          </p>

          <h2>Spatial Geodesy: Integrating Demographics with Coordinate Systems</h2>
          <p>
            Modern geographic information systems (GIS) map demographic densities by linking census enumerations to exact territorial polygons defined by geographic coordinates. Converting between decimal degrees and navigational boundaries is accomplished using our <a href="/calculators/geography/latitude-longitude-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">latitude and longitude calculator</a>, while printing or rendering physical topography requires calculating representative fractions on our <a href="/calculators/geography/map-scale-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">map scale calculator</a>.
          </p>
          <p>
            Furthermore, transcontinental nations that span multiple meridians (such as the United States with 6 time zones or Russia with 11 zones) experience logistical coordination hurdles that require managing solar time offsets with our <a href="/calculators/geography/time-zone-difference-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">time zone difference calculator</a>. At the local level, understanding nutritional and caloric demand generated by dense population clusters can be modeled through agricultural yield metrics and dietary guidelines analyzed on our <a href="/calculators/health/calorie-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">calorie calculator</a>.
          </p>

          <h2>Practical Steps for Demographic and Territorial Analysis</h2>
          <p>
            When conducting international demographic comparisons for business expansion, academic research, or macroeconomic modeling, follow these verified analytical practices:
          </p>
          <ul>
            <li><strong>Separate Total Area from Land Area:</strong> Always verify whether a country&apos;s published area includes territorial inland waters. For example, Canada spans 9.98 million km² of total surface, but 891,000 km² consists of freshwater lakes; calculating density using dry land area provides an accurate picture of human habitation.</li>
            <li><strong>Account for Urbanization Skew:</strong> A low national crude density does not imply cheap urban housing. Australia has a national density of 3.5/km², yet over 65% of its population is concentrated in five sprawling capital cities where urban density exceeds 3,000/km².</li>
            <li><strong>Verify Growth Rate Components:</strong> A positive growth rate can be driven by high natural fertility (births exceeding deaths, typical of Sub-Saharan Africa) or high net inward migration (typical of Canada, Australia, and the US). Populations driven by migration adapt faster to immediate labor market demands.</li>
            <li><strong>Cross-Check with Physical Slope:</strong> Mountainous topography restricts habitable space. Use our <a href="/calculators/geography/elevation-grade-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">elevation grade calculator</a> to evaluate topographic terrain constraints that limit urban municipal infrastructure.</li>
          </ul>
        </>
      }
    >
      <CountryAreaPopulationCalculator />
    </CalcPage>
  );
}
