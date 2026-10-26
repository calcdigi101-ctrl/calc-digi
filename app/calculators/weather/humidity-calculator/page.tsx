import type { Metadata } from "next";
import Link from "next/link";
import HumidityCalculatorComponent from "@/components/calcs/weather/humidity-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { PsychrometricSaturationVaporPressureChart } from "@/components/flagship/weather/editorial-charts";

const PATH = "/calculators/weather/humidity-calculator";
const TITLE = "Humidity Calculator | Relative, Absolute & Specific Humidity Analysis";
const DESCRIPTION =
  "Convert between relative humidity, absolute humidity (g/m³), specific humidity (g/kg), mixing ratio, and vapor pressure using psychrometric equations.";

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
  { href: "/calculators/weather/heat-index-calculator", icon: "☀️", name: "Heat Index Calculator" },
  { href: "/calculators/weather/wind-chill-calculator", icon: "🌬️", name: "Wind Chill Calculator" },
  { href: "/calculators/weather/rainfall-calculator", icon: "🌧️", name: "Rainfall Calculator" },
  { href: "/calculators/weather/snowfall-calculator", icon: "❄️", name: "Snowfall Calculator" },
  { href: "/calculators/weather/severe-weather-calculator", icon: "⚡", name: "Severe Weather" },
];

const FAQ_ITEMS = [
  {
    q: "What is the difference between relative humidity and specific humidity?",
    a: "Relative humidity expresses current vapor pressure as a percentage of maximum saturation vapor pressure at that specific temperature. Because saturation capacity changes with temperature, relative humidity changes whenever the thermometer moves. Specific humidity measures the actual mass ratio of water vapor (in grams) per kilogram of total moist air. Specific humidity remains constant regardless of temperature changes or air parcel expansion as long as moisture is not physically added or condensed out.",
  },
  {
    q: "Why does indoor air feel so dry during winter heating seasons?",
    a: "Cold outdoor winter air can only hold small quantities of water vapor before reaching saturation. When cold air (e.g., 30°F with 80% RH) infiltrates a home and is warmed by a furnace to 70°F, its moisture capacity expands exponentially. Because no moisture was added to the air, the existing water vapor represents a tiny fraction of the warm air's expanded capacity, causing indoor relative humidity to plummet to 15% to 20%.",
  },
  {
    q: "Is humid air heavier or lighter than dry air?",
    a: "Contrary to intuition, humid air is lighter (less dense) than dry air at identical temperature and pressure. According to Avogadro's law, a fixed volume of gas contains the same number of molecules regardless of composition. Water molecules (\\text{H}_2\\text{O}, molecular mass 18) displace diatomic nitrogen (\\text{N}_2, mass 28) and oxygen (\\text{O}_2, mass 32), reducing the average molecular weight and density of the air parcel.",
  },
  {
    q: "How does relative humidity affect the growth of indoor mold?",
    a: "Mold spores require an equilibrium relative humidity above 65% to 70% at the surface material boundary to germinate and reproduce. Keeping indoor ambient relative humidity below 50% guarantees that exterior wall surfaces and cold corners stay below the threshold water activity (a_w < 0.70), halting microbial fungal development.",
  },
];

export default function HumidityCalculatorPage() {
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
            <strong>Psychrometric Quick Summary:</strong> Atmospheric humidity describes the concentration of gaseous water vapor entrained within the terrestrial atmosphere. While consumer weather forecasts report <em>relative humidity</em> (the ratio of current vapor pressure to saturation vapor pressure at a given temperature), HVAC engineers and atmospheric scientists rely on <em>absolute humidity</em> (volumetric moisture density in grams per cubic meter) and <em>specific humidity</em> (mass ratio of water vapor to total moist air mass). Cross-checking relative humidity with our <Link href="/calculators/weather/dew-point-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">dew point calculator</Link> reveals why cold winter air at 90% relative humidity contains less actual water vapor than arid desert air at 20% relative humidity.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Clausius-Clapeyron Exponential Saturation Vapor Pressure Curve
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The fundamental governing law of atmospheric moisture capacity is the Clausius-Clapeyron relation. As air temperature increases, the kinetic energy of water molecules rises, requiring a substantially higher equilibrium partial pressure to prevent liquid evaporation. For every 10°C (18°F) increase in air temperature, the atmosphere's water vapor carrying capacity roughly doubles. When high temperatures combine with elevated moisture loads, running apparent temperature equations in our <Link href="/calculators/weather/heat-index-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">heat index calculator</Link> helps quantify human physiological heat stress.
          </p>

          <PsychrometricSaturationVaporPressureChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            The thermodynamic area chart above illustrates the exponential expansion of saturation vapor pressure (<Formula>{"e_s"}</Formula> in hPa) and maximum absolute humidity (<Formula>{"\rho_{v\_max}"}</Formula> in g/m³) across temperatures ranging from sub-freezing -10°C (14°F) up to tropical 40°C (104°F). At -10°C, air is fully saturated with a meager 2.36 grams of water per cubic meter. At 20°C (68°F), saturation capacity surges to 17.31 g/m³. At 40°C, the capacity explodes to 51.19 g/m³—more than twenty-one times the moisture capacity of sub-freezing air. In freezing winter regimes evaluated in our <Link href="/calculators/weather/snowfall-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">snowfall calculator</Link>, this low saturation ceiling explains why severe blizzards rarely produce enormous snowpack depths in extreme Arctic cold.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Equations of Atmospheric Moisture & Psychrometrics
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Atmospheric moisture modeling interconnects vapor pressure, gas constants, barometric pressure, and temperature. Saturation vapor pressure <Formula>{"e_s"}</Formula> over liquid water is calculated using the Sonntag (1990) formulation:
          </p>

          <Formula>
            {"e_s(T) = 6.112 \cdot \exp\left( \frac{17.62 \cdot T}{243.12 + T} \right) \quad (\text{hPa})"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Where <Formula>{"T"}</Formula> is dry-bulb air temperature in degrees Celsius. Actual partial vapor pressure <Formula>{"e"}</Formula> is then derived from relative humidity (<Formula>{"RH"}</Formula>):
          </p>

          <Formula>
            {"e = e_s(T) \times \left( \frac{RH}{100} \right) \quad (\text{hPa})"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Absolute humidity (<Formula>{"\rho_v"}</Formula>, in <Formula>{"\text{g/m}^3"}</Formula>) represents the physical mass density of water vapor per unit volume of moist air, derived via the ideal gas law:
          </p>

          <Formula>
            {"\rho_v = \frac{10^5 \cdot e}{R_v \cdot (T + 273.15)} = \frac{216.7 \cdot e}{T + 273.15} \quad (\text{g/m}^3)"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Where <Formula>{"R_v = 461.5\text{ J/(kg}\cdot\text{K)}"}</Formula> is the specific gas constant for water vapor. Specific humidity (<Formula>{"q"}</Formula>, mass of water vapor per mass of moist air in g/kg) and mixing ratio (<Formula>{"w"}</Formula>, mass of water vapor per mass of dry air in g/kg) under atmospheric station pressure <Formula>{"P"}</Formula> follow:
          </p>

          <Formula>
            {"w = 622.0 \times \frac{e}{P - e} \quad (\text{g/kg}), \qquad q = 622.0 \times \frac{e}{P - 0.378 \cdot e} \quad (\text{g/kg})"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Hydrologists evaluating stormwater precipitation runoff utilize these moisture metrics in our <Link href="/calculators/weather/rainfall-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">rainfall calculator</Link>, while severe storm meteorologists track boundary layer mixing ratios to compute convective available potential energy in our <Link href="/calculators/weather/severe-weather-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">severe weather calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Comparative Psychrometric Table: Relative vs Absolute Moisture Across Seasons
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below demonstrates how identical relative humidity percentages conceal vastly divergent absolute moisture quantities across meteorological seasons:
          </p>

          <DataTable
            head={["Meteorological Environment", "Dry-Bulb Temp (°F / °C)", "Relative Humidity (%)", "Vapor Pressure (hPa)", "Absolute Humidity (g/m³)", "Specific Humidity (g/kg)"]}
            rows={[
              ["Frigid Arctic Winter", "14°F (-10°C)", "90% RH", "2.58 hPa", "2.12 g/m³", "1.58 g/kg"],
              ["Cool Temperate Spring", "50°F (10°C)", "65% RH", "7.98 hPa", "6.12 g/m³", "4.93 g/kg"],
              ["Comfortable Room Air", "68°F (20°C)", "50% RH", "11.70 hPa", "8.65 g/m³", "7.27 g/kg"],
              ["Arid Desert Heat", "104°F (40°C)", "15% RH", "11.08 hPa", "7.68 g/m³", "6.88 g/kg"],
              ["Muggy Subtropical Summer", "86°F (30°C)", "75% RH", "31.85 hPa", "22.79 g/m³", "20.15 g/kg"],
              ["Extreme Tropical Monsoon", "95°F (35°C)", "80% RH", "45.02 hPa", "31.63 g/m³", "28.94 g/kg"]
            ]}
          />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Notice that the "Frigid Arctic Winter" scenario exhibits 90% relative humidity but contains only 2.12 grams of water vapor per cubic meter. When this outdoor air is drawn indoors and heated to 68°F (20°C) without artificial humidification, its relative humidity collapses to an arid 12%, irritating respiratory passages and dehydrating skin. In contrast, outdoor air during cold windy conditions evaluated in our <Link href="/calculators/weather/wind-chill-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">wind chill calculator</Link> accelerates skin moisture evaporation, causing chapped lips and winter xerosis.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Architectural & Industrial Applications: HVAC Dehumidification & Mold Ecology
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Controlling indoor psychrometric parameters is essential for structural preservation, industrial manufacturing, and human wellness:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-6">
            <li>
              <strong>ASHRAE 55 Human Thermal Comfort Zone:</strong> The American Society of Heating, Refrigerating and Air-Conditioning Engineers (ASHRAE) defines optimal indoor relative humidity between 30% and 60%. Levels below 30% accelerate viral pathogen aerosol transmission; levels above 60% facilitate dust mite proliferation and fungal mold growth on drywall surfaces.
            </li>
            <li>
              <strong>Latent vs Sensible HVAC Cooling Loads:</strong> In humid climates, commercial air conditioning equipment expends up to 45% of its electrical power solely on condensing entrained water vapor (latent cooling) before achieving sensible air temperature reduction. Facility managers optimizing energy budgets can balance HVAC loads alongside building solar exposure modeled in our <Link href="/calculators/weather/uv-index-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">UV index calculator</Link>.
            </li>
            <li>
              <strong>Virtual Temperature Correction in Barometry:</strong> Because water vapor is lighter than dry air (molecular weight of H₂O is 18.015 g/mol versus 28.964 g/mol for dry air), moist air is less dense than dry air at identical temperature and pressure. Meteorologists compute the 'virtual temperature' (<Formula>{"T_v"}</Formula>)—the temperature dry air would have to match the density of moist air—to calibrate barometric altimetry used in our <Link href="/calculators/transportation/flight-time-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">flight time calculator</Link>.
            </li>
            <li>
              <strong>Industrial Cleanrooms & Pharmaceutical Lyophilization:</strong> Precision semiconductor fabrication cleanrooms enforce exact 45% ± 3% RH controls to prevent electrostatic discharge (ESD) failures on microprocessors while inhibiting photoresist solvent condensation.
            </li>
          </ul>

          
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Vapor Pressure Deficit (VPD) & Controlled Environment Agriculture (CEA)
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In modern commercial horticulture and controlled-environment greenhouses, agronomists rely on Vapor Pressure Deficit (VPD)—the difference between the saturation vapor pressure inside a plant's leaf stomata and the partial vapor pressure of the surrounding ambient air (<Formula>{"\text{VPD} = e_s(T_{\text{leaf}}) - e_{\text{air}}"}</Formula>). VPD dictates the transpiration rate of crops, driving nutrient uptake from root systems to foliage. A VPD that is too low (&lt; 0.4 kPa) suppresses transpiration, causing calcium deficiencies, mold growth, and tip burn; a VPD that is too high (&gt; 1.6 kPa) causes stomatal closure, leaf wilt, and halted photosynthesis.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            Furthermore, building science practitioners analyze psychrometric charts to plot evaporative cooling paths. In arid desert climates where ambient humidity is extremely low, indirect-direct evaporative cooling (swamp coolers) can drop dry-bulb temperatures by 20°F to 30°F using minimal electrical power compared to traditional compressor-based air conditioning, offsetting residential energy consumption tracked alongside solar energy in our <Link href="/calculators/environment/solar-panel-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">solar panel calculator</Link>.
          </p>

          
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Dalton's Law of Partial Pressures & Psychrometric Enthalpy Balances
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            According to Dalton's Law of Partial Pressures, total barometric atmospheric pressure is the exact sum of individual partial gas pressures exerted by nitrogen, oxygen, argon, carbon dioxide, and water vapor (<Formula>{'P_{total} = P_{N_2} + P_{O_2} + P_{Ar} + P_{CO_2} + e'}</Formula>). Because water vapor pressure is strictly bounded by saturation thermodynamics, moist air enthalpy—the total thermal energy per unit mass—combines the sensible heat of dry air and the latent heat of vaporization: <Formula>{'h = c_{pa} T + w(h_{we} + c_{pw} T)'}</Formula>. Tracking psychrometric enthalpy allows HVAC engineers to optimize heat recovery ventilators (HRVs) and energy recovery ventilators (ERVs), capturing both sensible warmth and latent humidity from exhausted building airflow.
          </p>
        
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Psychrometric Thermodynamics, Enthalpy & Industrial Process Air Conditioning
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In industrial HVAC engineering, cleanrooms, and pharmaceutical manufacturing facilities, psychrometric calculations extend beyond relative humidity to moist air enthalpy and specific volume. Enthalpy quantifies the cumulative internal thermal energy of dry air plus associated water vapor per unit mass. During latent cooling dehumidification processes, chilled-water cooling coils must remove both the sensible heat required to lower air temperature to its dew point and the substantial latent heat of vaporization (approximately 2,501 kJ/kg of water condensed) to extract excess moisture.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Semiconductor lithography suites, lithium-ion battery dry rooms, and archival preservation vaults require precise absolute moisture tolerances rather than transient relative humidity bands. For example, lithium battery production requires specialized industrial desiccant wheel dehumidifiers that sustain dew points below -40&deg;C (mixing ratios under 0.08 grams of moisture per kilogram of dry air) to prevent explosive electrolyte decomposition and moisture-induced cathode degradation during continuous automated assembly.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Furthermore, precision aerospace manufacturing and carbon-fiber composite curing autoclaves mandate strict psychrometric controls during pre-preg layup cycles. Excess relative humidity induces resin moisture absorption and micro-void formation during polymerization, degrading composite tensile strength and causing delamination risks under supersonic aerodynamic stress profiles.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In hospital surgical suites and acute care operating rooms, ASHRAE Standard 170 mandates relative humidity levels strictly between 20% and 60% to suppress airborne bacterial pathogen viability while preventing electrostatic discharge sparks near medical oxygen delivery apparatus and sensitive cardiac monitoring devices.
          </p>

        
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Building commissioning specialists routinely verify psychrometric sensor accuracy using calibrated electronic aspirated psychrometers during seasonal climate changeovers, ensuring heating, ventilation, and air-conditioning systems maintain steady indoor air quality targets without unnecessary chilled water energy waste.
          </p>

        </>
      }
    >
      <HumidityCalculatorComponent />
    </CalcPage>
  );
}
