import type { Metadata } from "next";
import Link from "next/link";
import DewPointCalculatorComponent from "@/components/calcs/weather/dew-point-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { DewPointRelativeHumidityComfortMatrixChart } from "@/components/flagship/weather/editorial-charts";

const PATH = "/calculators/weather/dew-point-calculator";
const TITLE = "Dew Point Calculator | Relative Humidity, Comfort Scale & Psychrometrics";
const DESCRIPTION =
  "Calculate dew point temperature, water vapor saturation pressure, condensation spread, human comfort tiers, and fog or frost risk from air temperature and relative humidity.";

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
  { href: "/calculators/weather/humidity-calculator", icon: "💧", name: "Humidity Calculator" },
  { href: "/calculators/weather/heat-index-calculator", icon: "🌡️", name: "Heat Index Calculator" },
  { href: "/calculators/weather/wind-chill-calculator", icon: "🌬️", name: "Wind Chill Calculator" },
  { href: "/calculators/weather/rainfall-calculator", icon: "🌧️", name: "Rainfall Calculator" },
  { href: "/calculators/weather/severe-weather-calculator", icon: "⚡", name: "Severe Weather" },
  { href: "/calculators/weather/snowfall-calculator", icon: "❄️", name: "Snowfall Calculator" },
];

export default function DewPointCalculatorPage() {
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
            <strong>Meteorological Quick Summary:</strong> The dew point temperature represents the exact physical threshold to which ambient air must be isobarically cooled for atmospheric water vapor to achieve 100% saturation. When air temperature cools to equal the dew point, net condensation initiates, precipitating dew, radiation fog, or hoarfrost. While relative humidity fluctuates wildly throughout a diurnal solar heating cycle, dew point directly measures absolute atmospheric moisture mass. Cross-referencing dew point with our <Link href="/calculators/weather/humidity-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">humidity calculator</Link> demonstrates why meteorologists treat dew point values exceeding 65°F (18.3°C) as the universal benchmark for muggy, oppressive summer weather.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Dew Point Temperature vs Relative Humidity Across Ambient Baselines
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Understanding atmospheric comfort requires decoupling relative percentages from absolute vapor pressure. Because warm air possesses an exponentially greater saturation vapor capacity than cold air, a 50% relative humidity reading at 95°F carries more than triple the physical water vapor mass of a 50% relative humidity reading at 55°F. When high humidity suppresses skin evaporative cooling during summer heatwaves, consulting our <Link href="/calculators/weather/heat-index-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">heat index calculator</Link> reveals severe apparent thermal stress spikes that can endanger outdoor workers.
          </p>

          <DewPointRelativeHumidityComfortMatrixChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            The psychrometric curves above illustrate how dew point scales non-linearly across relative humidity percentages for four distinct ambient temperature regimes (65°F, 75°F, 85°F, and 95°F). Notice that at 95°F, even a seemingly moderate 60% relative humidity drives the dew point up to 79.5°F—a tropical saturation level that exceeds typical human sweat evaporation thresholds. Conversely, in cold weather scenarios analyzed in our <Link href="/calculators/weather/wind-chill-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">wind chill calculator</Link>, dew points below 20°F create extremely dry indoor microclimates that irritate respiratory mucous membranes and induce static electricity shocks.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Derivation of the Magnus-Tetens Psychrometric Approximation
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Accurate computation of atmospheric dew point from dry-bulb air temperature (<Formula>{"T"}</Formula> in degrees Celsius) and relative humidity (<Formula>{"RH"}</Formula> as a percentage between 1 and 100) relies on the Sonntag (1990) and Murray (1967) formulation of the Magnus-Tetens thermodynamic equation:
          </p>

          <Formula>
            {"\alpha(T, RH) = \ln\left(\frac{RH}{100}\right) + \frac{a \cdot T}{b + T}"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Where empirical constants adopted by the World Meteorological Organization (WMO) for liquid water saturation over the temperature range of -40°C to +50°C are <Formula>{"a = 17.625"}</Formula> and <Formula>{"b = 243.04^\circ\text{C}"}</Formula>. The resulting dew point temperature <Formula>{"T_d"}</Formula> in degrees Celsius is inverted via:
          </p>

          <Formula>
            {"T_d = \frac{b \cdot \alpha(T, RH)}{a - \alpha(T, RH)}"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Partial water vapor pressure <Formula>{"e"}</Formula> and saturation vapor pressure <Formula>{"e_s"}</Formula> in hectopascals (hPa) are derived from the August-Roche-Magnus approximation:
          </p>

          <Formula>
            {"e_s(T) = 6.112 \cdot \exp\left(\frac{17.67 \cdot T}{T + 243.5}\right), \qquad e = e_s(T) \cdot \left(\frac{RH}{100}\right)"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Absolute humidity (vapor density <Formula>{"\rho_v"}</Formula> in grams of water per cubic meter of air) is subsequently determined by applying the ideal gas law to water vapor:
          </p>

          <Formula>
            {"\rho_v = \frac{216.7 \cdot e}{T + 273.15} \quad (\text{g/m}^3)"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            In agricultural and residential hydrology, tracking absolute atmospheric moisture helps model precipitation volume computed in our <Link href="/calculators/weather/rainfall-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">rainfall calculator</Link> and predict extreme convective storm instability examined in our <Link href="/calculators/weather/severe-weather-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">severe weather calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Empirical Benchmark Table: Human Comfort Scale & Condensation Phenology
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below establishes the standardized meteorological human comfort classification alongside thermodynamic condensation boundaries across varying dew point intervals:
          </p>

          <DataTable
            head={["Dew Point Range (°F / °C)", "Sensory Comfort Classification", "Physiological Evaporative Impact", "Atmospheric Condensation Hazard", "HVAC / Lifestyle Advisory"]}
            rows={[
              ["Under 50°F (< 10°C)", "Dry & Crisp", "Rapid sweat evaporation; skin feels cool and dry", "Condensation virtually impossible on surfaces", "Comfortable; winter heating requires indoor humidifiers"],
              ["50°F to 59°F (10°C to 15°C)", "Comfortable & Pleasant", "Optimal thermoregulation; effortless respiration", "Fog risk isolated to cold radiation inversions", "Ideal baseline for all outdoor athletic training"],
              ["60°F to 64°F (15.5°C to 18°C)", "Slightly Humid", "Sweat evaporation slows slightly; noticeable moisture", "Early morning dew forms on vegetative surfaces", "Pleasant; sensitive individuals notice humidity"],
              ["65°F to 69°F (18.5°C to 20.5°C)", "Humid & Sticky", "Impaired cutaneous heat dissipation; skin stays damp", "Dense advection and valley radiation fog common", "Dehumidification recommended; increased hydration needed"],
              ["70°F to 74°F (21°C to 23.5°C)", "Oppressive & Sultry", "Severe evaporative suppression; heat exhaustion risk", "Heavy cloud condensation; structural pipe sweating", "Air conditioning required; limit strenuous exercise"],
              ["75°F+ (> 24°C)", "Extremely Oppressive", "Sweat drips without cooling; heat stroke hazard", "Tropical downpours and severe thunderstorms triggered", "Dangerous; vulnerable populations require cooling centers"]
            ]}
          />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            The data demonstrates that once dew point crosses 65°F, cutaneous sweat evaporation efficiency drops below 70%, forcing the human cardiovascular system to divert substantial blood flow to peripheral dermal capillaries to facilitate sensible convective heat transfer. In sub-freezing winter scenarios evaluated in our <Link href="/calculators/weather/snowfall-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">snowfall calculator</Link>, surface dew points below 32°F transform condensation into direct crystal deposition, producing frost that alters roadway friction analyzed in our <Link href="/calculators/physics/friction-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">friction calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Operational Psychrometrics: Dew Point Depression, Cloud Bases & Agricultural Frost
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Aviation meteorologists, structural engineers, and agriculturalists monitor the spread between dry-bulb temperature and dew point (termed the dew point depression, <Formula>{"T - T_d"}</Formula>) to predict critical environmental phenomena:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-6">
            <li>
              <strong>Aviation Cumulus Cloud Base Estimation:</strong> In convective atmospheric boundary layers, pilots compute the height of the Lifting Condensation Level (LCL)—where convective cumulus cloud bases form—using the dry adiabatic lapse rate formula: <Formula>{"\text{Cloud Base (feet AGL)} = \frac{T(^\circ\text{F}) - T_d(^\circ\text{F})}{4.4} \times 1000"}</Formula>. For example, an 80°F temperature and 58°F dew point yields a cloud base at exactly 5,000 feet above ground level, which pilots factor into flight planning modeled in our <Link href="/calculators/transportation/flight-time-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">flight time calculator</Link>.
            </li>
            <li>
              <strong>Crop Frost Protection Dynamics:</strong> Commercial orchard growers monitor evening dew points before radiative freezing events. If the dew point is below 28°F, the atmosphere cools rapidly without latent heat buffering, producing deadly 'black frost'. Conversely, if the dew point is 32°F, condensing moisture releases latent heat of condensation (2,500 J/g), slowing nocturnal temperature drops and providing precious hours to deploy orchard heaters.
            </li>
            <li>
              <strong>Industrial Building Envelope Condensation:</strong> In architectural building science, interior moisture migrating through walls condenses when encountering building materials cooled below the indoor air's dew point. Uninsulated cold water pipes, window glazing, and interstitial wall cavities experience mold growth if indoor relative humidity keeps the dew point above 60°F during warm humid months.
            </li>
            <li>
              <strong>Solar Insolation & Atmospheric Clearness:</strong> High dew points correlate with elevated column water vapor (precipitable water), scattering solar radiation and modifying surface ultraviolet intensity calculated in our <Link href="/calculators/weather/uv-index-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">UV index calculator</Link>.
            </li>
          </ul>

          
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Atmospheric Soundings, Precipitable Water & Data Center Climate Control
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In operational meteorology, radiosonde weather balloons launch twice daily worldwide to construct Skew-T Log-P thermodynamic soundings. Atmospheric scientists evaluate the vertical dew point profile from the surface to the tropopause to calculate Total Precipitable Water (PWAT)—the total column depth of liquid water if all atmospheric vapor condensed out. PWAT values exceeding 1.75 to 2.0 inches indicate tropical moisture pooling capable of producing catastrophic flash flood events analyzed in our <Link href="/calculators/weather/rainfall-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">rainfall calculator</Link>.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern mission-critical data centers, the American Society of Heating, Refrigerating and Air-Conditioning Engineers (ASHRAE) specifies strict dew point control envelopes rather than simple relative humidity bands. ASHRAE recommends an indoor dew point between 41.9°F and 59.0°F (5.5°C to 15.0°C) with maximum relative humidity below 60%. Maintaining dew point above 42°F prevents electrostatic discharge (ESD) events that damage sensitive server microchips, while capping dew point at 59°F prevents copper corrosion and zinc whisker shorts.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            Furthermore, understanding the spread between daytime temperatures and nocturnal dew points allows motorists to predict morning windshield icing and dense radiation fog along highway commuting corridors, helping avoid transit delays tracked with our <Link href="/calculators/transportation/speed-distance-time-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">speed distance time calculator</Link>.
          </p>

          
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Chilled Mirror Hygrometry & Precision Meteorological Calibration
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            In national metrological standards laboratories, reference dew point temperatures are measured using chilled mirror hygrometers—the primary gold standard for humidity instrumentation. A thermoelectric Peltier module cools a polished rhodium or platinum mirror until an optical photodiode detects microscopic dew or frost formation. An active feedback loop modulates the mirror temperature to maintain continuous phase equilibrium between condensation and evaporation, allowing resistance thermometers to measure the true dew point with an accuracy of ±0.1°C. In contrast, capacitive polymer hygrometers used in consumer weather stations suffer from calibration drift of 2% to 5% relative humidity annually, requiring periodic recalibration against saturated salt solution benchmarks to maintain accuracy.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Frequently Asked Questions About Atmospheric Dew Point & Humidity
          </h2>

          <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                Why do meteorologists consider dew point a better comfort indicator than relative humidity?
              </h3>
              <p>
                Relative humidity changes constantly throughout the day even when no moisture is added or removed from the atmosphere. As afternoon sunshine warms the air, relative humidity drops because warmer air has a greater moisture capacity. In contrast, dew point remains constant as long as the absolute mass of water vapor stays unchanged. A dew point of 68°F feels equally sticky and humid at 72°F in the morning (87% RH) as it does at 90°F in the afternoon (49% RH).
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                What is the quick mental rule of thumb to estimate dew point without a calculator?
              </h3>
              <p>
                A reliable mental approximation for moderate relative humidity (above 50%) is: <Formula>{"T_d \approx T - \frac{100 - RH}{5}"}</Formula> in degrees Celsius. For example, if the temperature is 25°C and relative humidity is 70%, the dew point depression is approximately <Formula>{"(100 - 70) / 5 = 6^\circ\text{C}"}</Formula>, giving an estimated dew point of 19°C (66.2°F), which closely aligns with rigorous Magnus-Tetens psychrometric formulas.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                Can the dew point ever be higher than the ambient air temperature?
              </h3>
              <p>
                No. In the natural atmosphere, dew point can never exceed ambient air temperature. When air cools down to its dew point, relative humidity reaches 100% (supersaturation). Any further cooling forces excess water vapor to immediately condense out as airborne fog droplets or surface dew, keeping temperature and dew point identical.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                What was the highest dew point ever recorded on Earth?
              </h3>
              <p>
                The highest world record dew point occurred in Dhahran, Saudi Arabia on July 8, 2003, when an air temperature of 108°F (42.2°C) combined with a Persian Gulf moisture surge to produce a staggering dew point of 95°F (35°C), creating an apparent heat index of 176°F (80°C). In North America, the highest reliable dew point was recorded at 90°F (32.2°C) in Moorhead, Minnesota during an extreme corn transpiration event in July 2011.
              </p>
            </div>
          </div>
        </>
      }
    >
      <DewPointCalculatorComponent />
    </CalcPage>
  );
}
