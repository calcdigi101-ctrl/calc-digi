import type { Metadata } from "next";
import Link from "next/link";
import SnowfallCalculatorComponent from "@/components/calcs/weather/snowfall-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { SnowToLiquidRatioTemperatureGradientChart } from "@/components/flagship/weather/editorial-charts";

const PATH = "/calculators/weather/snowfall-calculator";
const TITLE = "Snowfall Calculator | Snow Accumulation, Snow-to-Liquid Ratio & Weight";
const DESCRIPTION =
  "Calculate snowfall accumulation depth from liquid water equivalent precipitation, snow-to-liquid ratio (SLR), roof snowpack structural load weight, and compaction.";

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
  { href: "/calculators/weather/rainfall-calculator", icon: "🌧️", name: "Rainfall Calculator" },
  { href: "/calculators/weather/wind-chill-calculator", icon: "🌬️", name: "Wind Chill Calculator" },
  { href: "/calculators/weather/dew-point-calculator", icon: "🌡️", name: "Dew Point Calculator" },
  { href: "/calculators/weather/humidity-calculator", icon: "💧", name: "Humidity Calculator" },
  { href: "/calculators/weather/severe-weather-calculator", icon: "⚡", name: "Severe Weather" },
  { href: "/calculators/weather/heat-index-calculator", icon: "☀️", name: "Heat Index Calculator" },
];

const FAQ_ITEMS = [
  {
    q: "Why does 1 inch of rain not always equal 10 inches of snow?",
    a: "The classic 10:1 ratio is merely a climatological average near 28°F to 30°F. The actual ratio depends on the air temperature in the dendritic growth zone aloft and near the surface. In cold dry air (10°F to 15°F), delicate branching dendrites trap vast amounts of air, easily yielding 20 to 25 inches of snow from 1 inch of liquid water. Near freezing (32°F to 34°F), snowflakes partially melt and stick together, yielding only 5 to 8 inches of dense slush.",
  },
  {
    q: "How much snow weight can a typical residential roof safely hold?",
    a: "Most modern residential building codes in snow zones require roofs to support a minimum ground snow load of 20 to 40 pounds per square foot (psf). Because 1 inch of liquid water equals 5.2 psf, a roof rated for 30 psf can support approximately 5.7 inches of pure water equivalent—which equals about 50 to 60 inches of light dry snow, or only 18 to 22 inches of heavy, water-logged wet snow.",
  },
  {
    q: "Why is shoveling wet snow considered a serious cardiovascular risk?",
    a: "Dense wet snow weighs 15 to 25 pounds per shovel scoop. Lifting this weight in freezing weather constricts peripheral blood vessels (raising blood pressure) while heavy upper-body arm exertion elevates heart rate. This dangerous combination can cause myocardial ischemia or heart attacks in sedentary individuals, giving wet slush the medical nickname \"heart-attack snow.\"",
  },
  {
    q: "What causes \"thundersnow\" during intense winter blizzards?",
    a: "Thundersnow occurs when strong synoptic lift and cold air aloft create convective instability within a winter cyclone, similar to a summer thunderstorm. Intense convective updrafts generate lightning and thunder; however, the surrounding heavy snow muffles the thunder acoustic wave, limiting its audible radius to just 2 to 3 miles around the strike.",
  },
];

export default function SnowfallCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/weather", label: "Weather & Nature" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/40 dark:bg-amber-950/20 text-sm leading-relaxed mb-6">
            <strong>Cryospheric Quick Summary:</strong> Predicting winter snow accumulation depth requires converting liquid water equivalent (QPF) into fresh snowpack through the <strong>Snow-to-Liquid Ratio (SLR)</strong>. While a traditional climatological rule of thumb assumes a 10:1 ratio (1.0 inch of water yields 10 inches of snow), actual atmospheric ratios fluctuate wildly from 5:1 for dense maritime slush near 34°F to over 25:1 for dry crystalline powder at 10°F. Comparing snowpack accumulation with our <Link href="/calculators/weather/rainfall-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">rainfall calculator</Link> reveals that a heavy 1.0-inch liquid equivalent snowstorm deposits over 5.2 pounds of structural weight per square foot of roof surface, creating structural collapse hazards for residential homes.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Snow-to-Liquid Ratio (SLR) Across Surface & Cloud Temperatures
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The structural density and volume of fresh snow are governed by the thermal profile of the cloud layer where ice crystals nucleate and grow. The ideal thermodynamic sweet spot for delicate, multi-branched stellar dendrites—the dendritic crystal growth zone (DGZ)—lies between -12°C and -18°C (10°F to 0°F). When strong atmospheric lift coincides with this temperature window, snow crystals trap enormous volumes of air, creating light powder that blows easily in high winds modeled in our <Link href="/calculators/weather/wind-chill-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">wind chill calculator</Link>.
          </p>

          <SnowToLiquidRatioTemperatureGradientChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            The temperature gradient chart above illustrates the non-linear relationship between atmospheric temperature and the resulting snow-to-liquid ratio. Near the freezing point (32°F to 34°F), snow crystals partially melt, coating their surfaces in liquid water film that aggregates into dense, compacting flakes with low ratios (5:1 to 8:1). As temperatures plunge into the teens, ratios escalate sharply to 20:1 and 25:1. However, at extreme Arctic cold (below -5°F / -21°C), ice crystals become brittle columns and plates that fracture upon impact, packing tightly and causing the snow ratio to fall back toward 15:1. Drivers navigating winter roadways must also monitor tire friction dynamics using our <Link href="/calculators/physics/friction-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">friction calculator</Link> and verify tire outer dimensions with our <Link href="/calculators/transportation/tire-size-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">tire size calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Formulation: Snow Depth, Pack Density & Structural Roof Loads
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Total accumulated fresh snow depth <Formula>{"S_{depth}"}</Formula> in inches is the product of liquid water equivalent precipitation <Formula>{"P_{liq}"}</Formula> and the Snow-to-Liquid Ratio (<Formula>{"\text{SLR}"}</Formula>):
          </p>

          <Formula>
            {"S_{depth} = P_{liq} \times \text{SLR} \quad (\text{inches})"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            The physical density of fresh snow <Formula>{"\rho_{snow}"}</Formula> in kilograms per cubic meter is inversely proportional to the SLR:
          </p>

          <Formula>
            {"\rho_{snow} = \frac{\rho_{water}}{\text{SLR}} = \frac{1000\text{ kg/m}^3}{\text{SLR}}"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Structural engineers compute fresh snow roof load <Formula>{"L_{snow}"}</Formula> in pounds per square foot (psf) directly from the liquid water equivalent. Because 1 inch of liquid water across 1 square foot weighs exactly 5.20 pounds:
          </p>

          <Formula>
            {"L_{snow} = P_{liq} \times 5.20 \quad (\text{lbs/sq ft})"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Notice that the structural weight on a roof depends solely on the liquid water mass, not on how fluffy the snow appears. A 20-inch blizzard of 20:1 champagne powder (<Formula>{"P_{liq} = 1.0\text{ inch}"}</Formula>) places exactly the same 5.20 psf dead load on rafters as a 5-inch storm of dense 5:1 slush. However, if winter warm spells followed by rain saturate an existing snowpack, property owners should cross-reference moisture condensation in our <Link href="/calculators/weather/dew-point-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">dew point calculator</Link> and atmospheric vapor density in our <Link href="/calculators/weather/humidity-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">humidity calculator</Link> to predict deadly rain-on-snow structural roof collapses.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Cryospheric Engineering Table: Snow Classifications, Density & Removal Effort
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below classifies fresh snow types across temperature regimes, detailing their physical densities, compaction rates, and human shoveling hazards:
          </p>

          <DataTable
            head={["Snow Type Classification", "Surface Air Temp (°F / °C)", "Typical SLR Range", "Snowpack Density (kg/m³)", "Weight per 10-inch Depth (psf)", "Shoveling & Clearing Hazard"]}
            rows={[
              ["Heavy Wet Slush / Sleet", "33°F to 36°F (0.5°C to 2°C)", "4:1 to 6:1", "170 to 250 kg/m³", "8.7 to 13.0 lbs/sq ft", "Severe ('Heart-attack snow'); clogs snowblowers quickly"],
              ["Standard Wet Pack Snow", "30°F to 32°F (-1°C to 0°C)", "7:1 to 9:1", "110 to 140 kg/m³", "5.8 to 7.4 lbs/sq ft", "High; ideal for snowballs, heavy physical exertion required"],
              ["Climatological Average", "24°F to 29°F (-4°C to -1.5°C)", "10:1 to 12:1", "80 to 100 kg/m³", "4.3 to 5.2 lbs/sq ft", "Moderate; standard residential shoveling and plowing"],
              ["Light Powdery Snow", "16°F to 23°F (-9°C to -5°C)", "13:1 to 18:1", "55 to 75 kg/m³", "2.9 to 4.0 lbs/sq ft", "Low; clears easily with electric blowers, drifts in wind"],
              ["Champagne Dry Powder", "5°F to 15°F (-15°C to -9°C)", "20:1 to 30:1", "33 to 50 kg/m³", "1.7 to 2.6 lbs/sq ft", "Effortless; legendary ski resort snow, zero cohesion"],
              ["Extreme Arctic Grain Snow", "< -5°F (< -21°C)", "12:1 to 16:1", "60 to 85 kg/m³", "3.2 to 4.3 lbs/sq ft", "Granular sugar-like crystals; pack tightly under traffic"]
            ]}
          />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            As shown in the table, wet slush at 34°F weighs more than four times as much per inch of depth as dry champagne powder. Clearing a 600-square-foot residential driveway covered in 10 inches of wet slush requires lifting over 5,200 pounds (2.6 tons) of frozen water—a physical exertion spike that causes dangerous cardiac strain, especially during extreme cold snaps examined in our <Link href="/calculators/weather/wind-chill-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">wind chill calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Structural & Meteorological Tradeoffs: Snowpack Settling, Ice Dams & Melting
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Once snow settles upon the ground or architectural structures, post-depositional metamorphism begins immediately:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-6">
            <li>
              <strong>Gravitational Compaction & Settling:</strong> Fresh snowpack settles under its own weight within 24 to 48 hours, shrinking depth by 25% to 50% while maintaining the identical liquid water mass. A 16-inch snowfall of 16:1 powder quickly compresses into an 8-inch layer of dense pack snow.
            </li>
            <li>
              <strong>Ice Dam Formation Dynamics:</strong> In uninsulated building attics, escaping interior heat warms the roof deck above 32°F, melting bottom snowpack layers. Meltwater runs down the slope until hitting cold exterior unheated eaves (overhangs), where it refreezes into an ice ridge that backs water up under shingles, causing interior ceiling leaks.
            </li>
            <li>
              <strong>Spring Snowmelt Runoff & Hydrological Flooding:</strong> When spring warmth and high dew points melt snowpack rapidly, 10 inches of dense settled snow (<Formula>{"P_{liq} \approx 2.5\text{ inches}"}</Formula>) releases thousands of gallons of water into municipal stormwater systems, which civil engineers model using equations in our <Link href="/calculators/weather/rainfall-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">rainfall calculator</Link>.
            </li>
            <li>
              <strong>High Albedo Solar Reflection:</strong> Fresh snow possesses a high solar albedo of 80% to 90%, reflecting ultraviolet radiation back upward into eyes and faces. This intense ground reflection nearly doubles sunburn risk, requiring winter sunglasses and high-SPF sunblock calibrated via our <Link href="/calculators/weather/uv-index-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">UV index calculator</Link>.
            </li>
          </ul>

          
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mesoscale Lake-Effect Snow Bands & Avalanche Snowpack Metamorphism
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In glaciated and lake-adjacent regions, mesoscale Lake-Effect Snow (LES) produces some of the most intense snowfall accumulation rates on planet Earth, exceeding 4 to 6 inches per hour. LES occurs when an Arctic air mass traverses a comparatively warm, unfrozen body of water. The critical thermodynamic trigger requires a temperature difference of at least 13°C (23°F) between the lake water surface and the 850 hPa pressure altitude (approximately 5,000 feet). As heat and moisture vapor flux erupt off the lake surface into the frigid boundary layer, narrow, intense convective snow squalls form downwind, dumping multi-foot snow accumulations within highly localized corridors.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In alpine mountainous terrain, avalanche safety professionals study snowpack stratigraphy to identify buried persistent weak layers (PWLs). When cold, clear nights foster extreme temperature gradients across the snowpack, kinetic metamorphism transforms rounded snow grains into faceted, cup-shaped crystals known as depth hoar. Depth hoar possesses virtually zero structural cohesion; when subsequently buried under a heavy, dense slab of wind-packed snow, it acts like a layer of ball bearings, triggering catastrophic slab avalanches on slope angles between 30° and 45°.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            Furthermore, municipal winter highway departments utilize these cryospheric density metrics to calculate chemical road de-icer application rates (calcium chloride vs rock salt), ensuring transport routes remain navigable for motorists following velocity guidance in our <Link href="/calculators/transportation/speed-distance-time-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">speed distance time calculator</Link>.
          </p>

          
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Snow Water Equivalent (SWE) Core Sampling & SNOTEL Hydrological Networks
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            In mountainous western watersheds, water resource authorities monitor the Western United States Snow Telemetry (SNOTEL) automated sensor network to forecast agricultural water supplies. SNOTEL stations deploy acoustic ultrasonic depth sensors paired with stainless steel fluid-filled snow pillows that weigh the snowpack directly to record real-time Snow Water Equivalent (SWE). Manual backcountry core sampling utilizes standardized Federal Snow Sampling tubes—hollow aluminum tubes driven through the full depth of the snowpack down to soil level, extracting a core sample that is weighed on a calibrated spring scale to measure liquid water content directly. In maritime snowpacks of the Pacific Northwest (the Cascade Mountains), high moisture content produces dense SWE values where 30 inches of snowpack holds over 10 inches of pure liquid water. This extreme snowpack weight variation emphasizes why backcountry skiers and civil engineers must measure water mass rather than mere snowpack depth when evaluating snow loads.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Structural Snow Drift Aerodynamics & ASCE 7-22 Building Code Engineering
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Structural building failures during extreme winter blizzards rarely stem from balanced, uniform snowfall across open roof expanses. Rather, structural collapses occur due to aerodynamic snow drifting and unbalanced lee-side drift surcharge loads, as formalized in the American Society of Civil Engineers standard ASCE 7-22 (Minimum Design Loads and Associated Criteria for Buildings and Other Structures). When sustained high winds blow across upper roofs or parapet walls, snow particles become entrained in turbulent boundary layer eddies and deposit in deep, dense drift wedges against lower adjacent structural spans.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Engineers calculate snow drift width, peak surcharge height, and density adjustments based on ground snow load maps, terrain exposure factors, and thermal building occupancy classifications. In unheated industrial warehouses or canopies with low roof slopes, rain-on-snow events present catastrophic surcharge hazards: cold dense snowpack absorbs subsequent liquid precipitation like a sponge without discharging water through frozen scupper drains, instantaneously quadrupling dead loads and triggering catastrophic roof truss shear failures.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Highway departments and transportation authorities incorporate Automated Road Weather Information Systems (RWIS) embedded with subsurface temperature sensors and active freezing-point detectors. By tracking pavement heat flux alongside forecast snow-liquid ratios, maintenance fleets optimize anti-icing brine applications, preventing initial snowpack bonding before heavy accumulation begins.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Commercial ski resort operations and avalanche safety centers evaluate snowpack stratigraphy through comprehensive snow pit compression tests. Analyzing structural shear planes between light low-density dendritic powder layers and hard refrozen melt-crusts allows backcountry safety forecasters to predict catastrophic slab avalanches with rigorous scientific precision.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Municipal public works departments map snowplow routing grids based on real-time acoustic snow depth sensor readings, deploying salt spreaders proactively to prevent icy snowpack bonding across high-volume commuter transit corridors.
          </p>

        </>
      }
    >
      <SnowfallCalculatorComponent />
    </CalcPage>
  );
}
