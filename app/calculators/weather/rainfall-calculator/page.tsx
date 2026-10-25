import type { Metadata } from "next";
import Link from "next/link";
import RainfallCalculatorComponent from "@/components/calcs/weather/rainfall-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { StormwaterCatchmentRunoffVolumeChart } from "@/components/flagship/weather/editorial-charts";

const PATH = "/calculators/weather/rainfall-calculator";
const TITLE = "Rainfall Calculator | Stormwater Catchment & Rainwater Harvesting";
const DESCRIPTION =
  "Calculate rainfall volume, stormwater roof catchment runoff in gallons and liters, rainwater harvesting tank sizing, and first-flush filtration diversion.";

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
  { href: "/calculators/weather/dew-point-calculator", icon: "🌡️", name: "Dew Point Calculator" },
  { href: "/calculators/weather/humidity-calculator", icon: "💧", name: "Humidity Calculator" },
  { href: "/calculators/weather/snowfall-calculator", icon: "❄️", name: "Snowfall Calculator" },
  { href: "/calculators/weather/severe-weather-calculator", icon: "⚡", name: "Severe Weather" },
  { href: "/calculators/weather/heat-index-calculator", icon: "☀️", name: "Heat Index Calculator" },
  { href: "/calculators/environment/carbon-footprint-calculator", icon: "🌱", name: "Carbon Footprint" },
];

export default function RainfallCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/weather", label: "Weather & Nature" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/40 dark:bg-amber-950/20 text-sm leading-relaxed mb-6">
            <strong>Hydrological Quick Summary:</strong> Precipitation measurement and rainwater harvesting convert meteorological rainfall depth into actionable volumetric yield. A fundamental rule of civil hydrology dictates that <strong>1.0 inch of rainfall falling upon 1.0 square foot of surface equals exactly 0.6233 United States gallons</strong> (or 1.0 millimeter over 1.0 square meter equals 1.0 liter). For a standard 2,000-square-foot residential roof, a single 1.5-inch thunderstorm yields over 1,680 gallons of pristine freshwater. Integrating roof catchment modeling with our <Link href="/calculators/weather/snowfall-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">snowfall calculator</Link> enables homeowners and agriculturalists to engineer year-round rainwater storage cisterns.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Harvested Rainwater Runoff Yield Across Roof Footprint Dimensions
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Designing a functional rainwater harvesting system requires balancing precipitation frequency against storage cistern capacity. In arid and semi-arid climates, long dry spells demand larger holding reservoirs to capture high-intensity storm events. Conversely, in humid subtropical climates evaluated alongside our <Link href="/calculators/weather/humidity-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">humidity calculator</Link>, frequent precipitation events allow smaller cisterns to cycle continuously, supplying landscape irrigation and toilet flushing year-round.
          </p>

          <StormwaterCatchmentRunoffVolumeChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            The comparative benchmark chart above quantifies net harvested rainwater across four standard architectural footprints (1,000, 2,000, 3,000, and 4,000 square feet) for rainfall events ranging from a 0.5-inch drizzle to a 3.0-inch deluge. Notice that a 4,000 sq ft roof catchment captures 6,720 gallons during a major 3-inch storm event. Capturing this massive runoff prevents urban stormwater surges that erode municipal topsoil and trigger severe convective flood advisories modeled in our <Link href="/calculators/weather/severe-weather-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">severe weather calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Hydrological Equations of Stormwater Catchment & Runoff Efficiency
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Computing harvestable rainwater yield reconciles gross atmospheric precipitation, horizontal catchment projection area, surface material runoff coefficients, and first-flush roof debris diversion:
          </p>

          <Formula>
            {"V_{gross} = P_{in} \times A_{sqft} \times 0.6233 \quad (\text{gallons})"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Where <Formula>{"P_{in}"}</Formula> is precipitation depth in inches, <Formula>{"A_{sqft}"}</Formula> is the horizontal roof footprint (excluding slope pitch multipliers), and <Formula>{"0.6233"}</Formula> is the geometric conversion factor (<Formula>{"144\text{ in}^2 / 231\text{ in}^3\text{ per gallon}"}</Formula>). In metric dimensions, the gross calculation simplifies directly:
          </p>

          <Formula>
            {"V_{gross\_metric} = P_{mm} \times A_{m^2} \times 1.0 \quad (\text{liters})"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Net usable water volume <Formula>{"V_{net}"}</Formula> incorporates the catchment surface runoff coefficient <Formula>{"C_r"}</Formula> and the mandatory first-flush roof-washing diversion volume <Formula>{"V_{flush}"}</Formula>:
          </p>

          <Formula>
            {"V_{net} = \Big( V_{gross} \times C_r \Big) - V_{flush}"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Where first-flush diversion standard engineering practice recommends diverting 10 to 20 gallons per 1,000 square feet of roof area (<Formula>{"0.01\text{ to }0.02\text{ inches}"}</Formula> of initial precipitation) to wash away airborne dust, bird droppings, and tree pollen before water enters the storage tank. Property owners planning sustainable homesteads can cross-reference water footprint reductions with our <Link href="/calculators/environment/carbon-footprint-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">carbon footprint calculator</Link> and monitor atmospheric saturation with our <Link href="/calculators/weather/dew-point-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">dew point calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Catchment Surface Runoff Coefficients & Storage Engineering Table
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below itemizes standard empirical runoff coefficients across common architectural roofing materials, indicating their suitability for potable and non-potable rainwater harvesting:
          </p>

          <DataTable
            head={["Roof Catchment Surface Material", "Runoff Coefficient (Cr)", "Runoff Harvesting Efficiency", "Water Quality Suitability", "Maintenance / Debris Characteristics"]}
            rows={[
              ["Standing Seam Metal / Steel", "0.90 to 0.95", "92% Net Yield", "Superior (Potable after filtration)", "Smooth non-porous surface; sheds debris quickly"],
              ["Glazed Ceramic Roof Tiles", "0.85 to 0.90", "88% Net Yield", "High (Potable after filtration)", "Inert material; minimal chemical leaching"],
              ["Fiberglass / Asphalt Shingles", "0.75 to 0.85", "80% Net Yield", "Moderate (Non-potable irrigation)", "Granules detach; minor petroleum hydrocarbon trace"],
              ["Concrete Pavers / Flat Slab", "0.80 to 0.85", "82% Net Yield", "Moderate (Irrigation / Washdown)", "Alkaline leaching can elevate harvested pH slightly"],
              ["Extensive Vegetated Green Roof", "0.30 to 0.50", "40% Net Yield", "Low (Retention / Stormwater detention)", "Retains majority of precipitation; drains organic tannins"],
              ["Permeable Soil / Turf Lawn", "0.10 to 0.25", "15% Net Yield", "Infiltration only (Groundwater recharge)", "Absorbs rainfall directly into subsurface aquifer"]
            ]}
          />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            As shown in the table, standing seam metal roofs provide the highest runoff efficiency (up to 95%) and superior water purity, making them the gold standard for off-grid cistern systems. Conversely, asphalt composite shingles shed microscopic mineral granules that clog fine sediment filters, restricting their use to landscape irrigation and pressure washing. During extreme heat waves analyzed in our <Link href="/calculators/weather/heat-index-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">heat index calculator</Link>, stored rainwater provides an indispensable thermal buffer for garden vegetables and domestic livestock.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            System Sizing Dynamics: First-Flush Diversion, Cisterns & Overflow Management
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Engineering an efficient residential rainwater collection system involves three critical mechanical components:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-6">
            <li>
              <strong>First-Flush Diverter Mechanics:</strong> The initial 1 to 2 millimeters of rainfall washes airborne particulate matter, heavy metals, and animal fecal coliform off the roof. A vertical pipe diverter with an internal floating ball valve intercepts this contaminated volume, sealing the inlet once filled and routing subsequent clean water directly into the main storage tank.
            </li>
            <li>
              <strong>Cistern Capacity Sizing (Dry-Spell Buffering):</strong> Storage capacity must bridge the average dry interval between rain events: <Formula>{"\text{Tank Size (Gal)} = \text{Daily Demand (Gal)} \times \text{Max Dry Days} \times 1.25"}</Formula>. For a household consuming 100 gallons per day for landscape and sanitation facing a 30-day summer drought, a 3,750-gallon cistern represents the minimum safe capacity.
            </li>
            <li>
              <strong>Hydraulic Gutter & Downspout Sizing:</strong> Standard 5-inch K-style gutters handle up to 5,500 square feet of roof catchment under a 3-inch-per-hour storm intensity. Downspouts must provide at least 1.0 square inch of cross-sectional area per 100 square feet of roof to prevent gutter overflow during extreme convective downpours analyzed in our <Link href="/calculators/weather/severe-weather-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">severe weather calculator</Link>.
            </li>
            <li>
              <strong>Solar Exposure & Algae Prevention:</strong> Storage cisterns must be constructed from opaque, food-grade polyethylene or reinforced concrete to block solar ultraviolet radiation calculated in our <Link href="/calculators/weather/uv-index-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">UV index calculator</Link>, which would otherwise foster photosynthetic algae blooms.
            </li>
          </ul>

          
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            NOAA Atlas 14 Precipitation Frequency & Low-Impact Urban Hydrology (LID)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Civil engineers design stormwater culverts, bioswales, and retention basins using NOAA Atlas 14 Precipitation Frequency Data Servers (PFDS). Atlas 14 provides statistical rainfall depth-duration-frequency (DDF) estimates for storm return intervals ranging from the 1-year annual storm to the 100-year and 500-year design deluge. A 100-year, 24-hour storm does not occur once every century; rather, it possesses a statistical 1.0% probability of occurring in any given calendar year. In regions where extreme convective storms develop, property owners can monitor atmospheric water saturation using our <Link href="/calculators/weather/dew-point-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">dew point calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Modern civil engineering integrates Low-Impact Development (LID) and Sustainable Drainage Systems (SuDS) to restore natural hydrologic infiltration in urbanized watersheds. Paved metropolitan environments historically converted 80% to 90% of rainfall into immediate surface runoff, overwhelming municipal storm sewers and scouring riverbanks. Installing permeable interlocking concrete pavers, subsurface gravel detention trenches, and residential rain gardens reduces peak storm discharge by up to 70%, filtering particulate pollutants and recharging unconfined groundwater aquifers.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            Additionally, during periods of prolonged summer drought and elevated thermal stress analyzed in our <Link href="/calculators/weather/heat-index-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">heat index calculator</Link>, decentralized rainwater harvesting cisterns provide emergency auxiliary supplies for wildfire perimeter defense and domestic landscape preservation without depleting municipal drinking water reservoirs.
          </p>

          
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Hydraulic Gutter Capacity, Downspout Flow Dynamics & Retention Infiltration
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            Preventing structural foundation damage during intense precipitation requires properly engineering roof drainage conveyance. Standard residential gutters must be pitched at a minimum slope of 0.5 inches per 10 feet of horizontal run toward downspouts to maintain self-cleansing hydraulic velocities. Hydraulic flow rate through a downspout is governed by the orifice equation: <Formula>{'Q = C_d A \sqrt{2 g H}'}</Formula>, where <Formula>{'C_d'}</Formula> is the discharge coefficient, <Formula>{'A'}</Formula> is cross-sectional downspout area, and <Formula>{'H'}</Formula> is hydraulic head pressure. A single 3-inch by 4-inch rectangular downspout safely drains up to 1,200 square feet of roof under a peak storm intensity of 4 inches per hour. When downspouts discharge into municipal storm sewers, urban runoff accelerates river flooding; routing roof water into residential rain gardens or permeable gravel trenches recharges groundwater tables while filtering suspended solids and heavy metals. Furthermore, commercial civil engineering standards mandate that overflow outlets on rainwater collection cisterns be equal in diameter to the inlet piping and directed away from building footings toward positive-draining swales to prevent structural foundation subsidence during record cloudburst events. Routine seasonal inspection of leaf screens, gutter drop outlets, and tank calming inlets ensures hydraulic flow capacity is maintained throughout high-volume autumn precipitation cycles. Installing secondary overflow weirs and automated tank level sensors provides real-time alerts before heavy seasonal atmospheric river events.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Frequently Asked Questions About Rainfall Collection & Runoff
          </h2>

          <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                How many gallons of water does 1 inch of rain yield per square foot?
              </h3>
              <p>
                One inch of rain on one square foot of catchment area yields exactly 0.6233 United States gallons of water. This is calculated by dividing 144 cubic inches (1 sq ft at 1-inch depth) by 231 cubic inches (the volume of one US liquid gallon). In metric terms, 1 millimeter of rain on 1 square meter yields exactly 1.0 liter of water.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                Is harvested rainwater safe to drink?
              </h3>
              <p>
                Untreated rainwater collected from roof surfaces is not potable because it contains dissolved atmospheric pollutants, bird droppings, bacterial pathogens, and particulate debris. To make harvested rainwater safe for drinking, it must undergo multi-stage sediment filtration (5-micron and 1-micron), activated carbon filtration to remove volatile organic compounds, and ultraviolet (UV) disinfection or chlorination to neutralize bacteria and viruses.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                Is rainwater harvesting legal in all United States jurisdictions?
              </h3>
              <p>
                In the vast majority of US states, rainwater harvesting is completely legal and actively encouraged through municipal tax credits and free rain barrel distributions. In historical western water-rights states (such as Colorado), residential harvesting is permitted with specific restrictions (typically capped at two 55-gallon rain barrels per single-family residence to protect downstream prior appropriation water rights).
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                How do I prevent mosquitoes from breeding in my rain barrels?
              </h3>
              <p>
                To eliminate mosquito breeding, all barrel inlet and overflow pipes must be tightly sealed with fine stainless steel wire mesh (1mm or smaller aperture). Alternatively, adding biological mosquito dunks containing <em>Bacillus thuringiensis israelensis</em> (Bti) kills mosquito larvae safely without harming plants, pets, or humans.
              </p>
            </div>
          </div>
        </>
      }
    >
      <RainfallCalculatorComponent />
    </CalcPage>
  );
}
