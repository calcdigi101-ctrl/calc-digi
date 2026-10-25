import type { Metadata } from "next";
import Link from "next/link";
import HeatIndexCalculatorComponent from "@/components/calcs/weather/heat-index-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { NoaaHeatIndexDangerZonesChart } from "@/components/flagship/weather/editorial-charts";

const PATH = "/calculators/weather/heat-index-calculator";
const TITLE = "Heat Index Calculator | NOAA Apparent Temperature & Heat Stress Scale";
const DESCRIPTION =
  "Calculate the NOAA Heat Index, apparent feels-like temperature, evaporative cooling penalty, thermal stress danger tier, and OSHA outdoor work-rest cycles.";

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
  { href: "/calculators/weather/wind-chill-calculator", icon: "🌬️", name: "Wind Chill Calculator" },
  { href: "/calculators/weather/uv-index-calculator", icon: "☀️", name: "UV Index Calculator" },
  { href: "/calculators/weather/severe-weather-calculator", icon: "⚡", name: "Severe Weather" },
  { href: "/calculators/weather/rainfall-calculator", icon: "🌧️", name: "Rainfall Calculator" },
];

export default function HeatIndexCalculatorPage() {
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
            <strong>Thermal Stress Quick Summary:</strong> The National Oceanic and Atmospheric Administration (NOAA) Heat Index quantifies the human body's perceived apparent temperature when high atmospheric moisture impedes cutaneous evaporative thermoregulation. The human body cools itself primarily through the latent heat of sweat vaporization (approximately 2,426 Joules per gram of evaporated sweat). When relative humidity rises above 50%, moisture vapor saturation in the air boundary layer suppresses sweat evaporation, trapping metabolic heat within core organs. Pairing heat index analysis with our <Link href="/calculators/weather/dew-point-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">dew point calculator</Link> reveals that an ambient 92°F day with 65% humidity creates a dangerous apparent heat index of 108°F, elevating heat exhaustion and heat stroke hazards.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            NOAA Apparent Heat Index Progression Across Humidity Gradients
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The relationship between air temperature and relative humidity is inherently non-linear. As ambient temperatures approach the human core temperature (98.6°F / 37.0°C), dry convective heat exchange from skin to air approaches zero. At this critical juncture, sweat evaporation becomes the sole biological mechanism capable of preventing hyperthermia. Drivers and outdoor athletes assessing transit weather alongside our <Link href="/calculators/transportation/speed-distance-time-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">speed distance time calculator</Link> must incorporate mandatory hydration pauses as heat index values breach warning thresholds.
          </p>

          <NoaaHeatIndexDangerZonesChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            The progression curves above display the exponential rise in apparent heat index calculated via the Steadman-Rothfusz regression equation across temperatures from 85°F to 105°F. At an ambient temperature of 85°F, elevating relative humidity from 30% to 90% increases apparent temperature by 13°F (from 84°F to 97°F). However, at an ambient temperature of 100°F, that identical humidity increase propels the heat index from 109°F to a catastrophic 185°F—a lethal atmospheric threshold where human survival without artificial air conditioning is measured in hours. In contrast to winter cooling modeled in our <Link href="/calculators/weather/wind-chill-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">wind chill calculator</Link>, summer humidity multiplies rather than mitigates ambient thermal discomfort.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Formulation: The Multi-Parameter Rothfusz Regression Model
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The formal NOAA Heat Index algorithm was derived by Lans P. Rothfusz (1990) by fitting a multi-variable 9-term polynomial regression to Robert G. Steadman's biometeorological human heat exchange model:
          </p>

          <Formula>
            {"\begin{aligned} HI = &-42.379 + 2.04901523 T + 10.14333127 R - 0.22475541 TR - 0.00683783 T^2 \\ &- 0.05481717 R^2 + 0.00122874 T^2 R + 0.00085282 T R^2 - 0.00000199 T^2 R^2 \end{aligned}"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Where <Formula>{"T"}</Formula> is ambient dry-bulb temperature in degrees Fahrenheit (<Formula>{"T \ge 80^\circ\text{F}"}</Formula>) and <Formula>{"R"}</Formula> is relative humidity as a percentage (<Formula>{"0 \le R \le 100"}</Formula>). NOAA applies two critical boundary adjustment terms under specific psychrometric extremes:
          </p>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            If <Formula>{"R < 13\%"}</Formula> and <Formula>{"80^\circ\text{F} \le T \le 112^\circ\text{F}"}</Formula>, dry atmospheric conditions enhance evaporative cooling beyond the baseline polynomial, requiring a downward subtraction adjustment:
          </p>

          <Formula>
            {"\text{Adjustment}_{dry} = \left( \frac{13 - R}{4} \right) \sqrt{\frac{17 - |T - 95|}{17}}"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Conversely, if <Formula>{"R > 85\%"}</Formula> and <Formula>{"80^\circ\text{F} \le T \le 87^\circ\text{F}"}</Formula>, heavy saturation limits cutaneous sweat dispersion, requiring an upward addition adjustment:
          </p>

          <Formula>
            {"\text{Adjustment}_{humid} = \left( \frac{R - 85}{10} \right) \left( \frac{87 - T}{5} \right)"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Atmospheric scientists analyzing thermodynamic parcel lift for storm prediction examine concurrent moisture metrics using our <Link href="/calculators/weather/humidity-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">humidity calculator</Link> and monitor atmospheric buoyancy energy in our <Link href="/calculators/weather/severe-weather-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">severe weather calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            OSHA Thermal Stress Categories & Clinical Occupational Work-Rest Regimes
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The Occupational Safety and Health Administration (OSHA) and the National Institute for Occupational Safety and Health (NIOSH) establish mandatory workplace safety protocols based on four standardized heat index danger tiers:
          </p>

          <DataTable
            head={["Heat Index Range (°F / °C)", "NOAA Risk Tier Classification", "Physiological Clinical Manifestations", "Recommended Work / Rest Ratio", "Hydration Intake Benchmark"]}
            rows={[
              ["80°F to 90°F (27°C to 32°C)", "Caution", "Fatigue possible with prolonged physical exposure", "50 min work / 10 min shade rest per hour", "16 oz water per hour of moderate exertion"],
              ["91°F to 103°F (33°C to 39°C)", "Extreme Caution", "Heat cramps and heat exhaustion possible", "45 min work / 15 min shaded rest per hour", "24 to 32 oz electrolyte fluids per hour"],
              ["104°F to 124°F (40°C to 51°C)", "Danger", "Heat exhaustion likely; heat stroke imminent with exertion", "30 min work / 30 min cooling rest per hour", "32 oz electrolyte fluids with active ice cooling"],
              ["125°F+ (> 52°C)", "Extreme Danger", "Heat stroke / sunstroke highly likely; organ failure risk", "Cease all non-emergency outdoor physical work", "Immediate medical standby and chilled immersion tanks"]
            ]}
          />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            As demonstrated in the table, once the heat index crosses 104°F, working continuously without structured rest cycles leads to involuntary dehydration and core temperature spikes exceeding 104°F (40°C), triggering neurological confusion and circulatory collapse. Furthermore, direct sunlight exposure adds an additional 15°F to the nominal heat index, which outdoor workers must factor alongside solar erythemal risk modeled in our <Link href="/calculators/weather/uv-index-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">UV index calculator</Link> and ground precipitation moisture tracked in our <Link href="/calculators/weather/rainfall-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">rainfall calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Physiological Mechanics: Wet-Bulb Globe Temperature vs Heat Index
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            While the NOAA Heat Index is the recognized public weather standard, industrial hygienists and military commands utilize the Wet-Bulb Globe Temperature (WBGT) to govern athletic training and heavy physical labor:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-6">
            <li>
              <strong>Shade Assumption of the Heat Index:</strong> The standard Rothfusz Heat Index calculation assumes an average adult walking in the shade in light wind (approx. 5 mph). Performing strenuous manual labor in direct direct midday sunlight increases the effective apparent temperature by 10°F to 15°F due to shortwave solar radiation absorption.
            </li>
            <li>
              <strong>Wet-Bulb Globe Temperature (WBGT) Composition:</strong> WBGT integrates natural wet-bulb temperature (<Formula>{"T_{nw}"}</Formula>, 70% weighting), black globe radiant heat temperature (<Formula>{"T_g"}</Formula>, 20% weighting), and ambient dry-bulb temperature (<Formula>{"T_d"}</Formula>, 10% weighting): <Formula>{"\text{WBGT} = 0.7 T_{nw} + 0.2 T_g + 0.1 T_d"}</Formula>. Military 'Black Flag' conditions are declared when WBGT exceeds 90°F (32.2°C).
            </li>
            <li>
              <strong>Cardiovascular Strain & Electrolyte Depletion:</strong> Severe heat strain demands that cardiac output increase by up to 10 liters per minute to pump blood from core viscera to subcutaneous capillary beds. Heavy sweating expels up to 2.0 liters of saline water per hour, depleting sodium, potassium, and magnesium ions and inducing painful peripheral heat cramps.
            </li>
            <li>
              <strong>Urban Heat Island (UHI) Microclimates:</strong> Dense metropolitan downtown cores with asphalt and concrete surfaces store thermal energy during the day and re-radiate longwave infrared heat at night, keeping nocturnal heat index values 8°F to 14°F higher than surrounding rural landscapes.
            </li>
          </ul>

          
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Biological Acclimatization Kinetics & Vehicle Air Conditioning Energy Loads
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Human physiological adaptation to elevated heat index environments—termed heat acclimatization—requires 10 to 14 days of progressive, supervised physical exertion in hot conditions. During acclimatization, biological hormonal shifts trigger plasma volume expansion by up to 20%, lowering resting heart rates and reducing cardiovascular strain. Furthermore, the body begins sweating at a lower core temperature threshold and doubles its maximum sweat secretion rate while dramatically reducing sodium chloride loss in perspiration. Unacclimatized workers and athletes face three times the incidence of clinical heat exhaustion during the initial days of a seasonal heat wave.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In transportation engineering, high heat index conditions significantly degrade vehicle fuel economy and electric vehicle battery range. Operating automotive air conditioning compressors under extreme heat index levels consumes 3.5 to 5.5 kW of mechanical or electrical power, reducing fuel efficiency by 15% to 25% in stop-and-go metropolitan traffic. Commuters calculating annual fuel budgets with our <Link href="/calculators/transportation/commute-cost-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">commute cost calculator</Link> and analyzing environmental emissions in our <Link href="/calculators/environment/carbon-footprint-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">carbon footprint calculator</Link> must account for seasonal air conditioning fuel penalties during summer heat waves.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            Additionally, commercial agricultural operations monitor livestock heat stress through the Temperature-Humidity Index (THI). Dairy cattle exposed to heat index values above 85°F experience dramatic drops in milk production and feed intake, necessitating high-velocity ventilation fans, evaporative mister nozzles, and shade structures to preserve herd health and welfare.
          </p>

          
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Hyperthermia Pathophysiology & Emergency Cold-Water Immersion Protocols
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            When human core body temperature rises above 104°F (40°C), cellular proteins begin denaturing, causing systemic inflammatory response syndrome (SIRS), microvascular thrombosis, and acute multi-organ dysfunction. The definitive gold-standard medical intervention for exertional heat stroke is immediate, aggressive Cold-Water Immersion (CWI). Submerging a hyperthermic patient in an ice-water bath (35°F to 50°F / 1.7°C to 10°C) with vigorous continuous water circulation cools the patient at an astounding rate of 0.35°F (0.20°C) per minute—more than ten times faster than fanning or applying ice packs to groin and axilla arterial pulse points. Athletic trainers enforce the clinical rule: 'Cool First, Transport Second,' requiring core body temperature to be reduced below 102°F (38.9°C) prior to emergency ambulance transit to prevent irreversible neurological damage. Emergency response protocols emphasize that applying wet towels or ice packs without full body immersion fails to arrest internal core heating during exertional hyperthermia crises.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Frequently Asked Questions About the NOAA Heat Index
          </h2>

          <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                What is the critical physiological difference between heat exhaustion and heat stroke?
              </h3>
              <p>
                Heat exhaustion is characterized by heavy sweating, pale clammy skin, rapid weak pulse, muscle cramps, and dizziness; core body temperature typically stays below 104°F (40°C), and the victim remains conscious. Heat stroke is a medical emergency where the body's thermoregulatory center fails: sweating ceases, skin becomes hot and red, core temperature spikes above 104°F, and confusion, seizures, or unconsciousness occur. Heat stroke requires immediate emergency medical transport and rapid cold-water immersion.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                Why does wind not cool you down when the heat index is extremely high?
              </h3>
              <p>
                When ambient air temperature exceeds normal skin temperature (approximately 95°F / 35°C), air moving across the skin transfers heat into the body via forced convection rather than removing it. If the air is also humid, sweat cannot evaporate. Under these conditions, a fan acts like a convective convection oven, accelerating rather than mitigating heat stress.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                Does drinking ice water cause stomach cramps during extreme heat?
              </h3>
              <p>
                Contrary to popular mythology, drinking cool or chilled water (50°F to 60°F / 10°C to 15°C) is highly recommended during heat stress. Cool fluids absorb internal core heat, reduce gastric emptying latency, and rehydrate vascular volume faster than lukewarm fluids without inducing gastrointestinal distress.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                Why is the heat index only calculated for temperatures of 80°F (27°C) or higher?
              </h3>
              <p>
                At temperatures below 80°F, natural biological skin temperature easily exceeds ambient air temperature, allowing effortless dry convective and radiative heat loss. Moisture in the air below 80°F does not suppress metabolic thermoregulation enough to create apparent heat strain, rendering the Rothfusz regression polynomial physiologically invalid below that baseline.
              </p>
            </div>
          </div>
        </>
      }
    >
      <HeatIndexCalculatorComponent />
    </CalcPage>
  );
}
