import type { Metadata } from "next";
import Link from "next/link";
import WindChillCalculatorComponent from "@/components/calcs/weather/wind-chill-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { WindChillEquivalentTemperatureFrostbiteChart } from "@/components/flagship/weather/editorial-charts";

const PATH = "/calculators/weather/wind-chill-calculator";
const TITLE = "Wind Chill Calculator | NOAA JAG/TI Cold Stress & Frostbite Risk";
const DESCRIPTION =
  "Calculate the official NOAA Wind Chill Index, equivalent feels-like temperature, convective skin cooling rate in W/m², and exposed skin frostbite times.";

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
  { href: "/calculators/weather/heat-index-calculator", icon: "☀️", name: "Heat Index Calculator" },
  { href: "/calculators/weather/snowfall-calculator", icon: "❄️", name: "Snowfall Calculator" },
  { href: "/calculators/weather/dew-point-calculator", icon: "🌡️", name: "Dew Point Calculator" },
  { href: "/calculators/weather/humidity-calculator", icon: "💧", name: "Humidity Calculator" },
  { href: "/calculators/weather/severe-weather-calculator", icon: "⚡", name: "Severe Weather" },
  { href: "/calculators/physics/kinetic-energy-calculator", icon: "⚛️", name: "Kinetic Energy" },
];

export default function WindChillCalculatorPage() {
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
            <strong>Cold Stress Quick Summary:</strong> The National Oceanic and Atmospheric Administration (NOAA) Wind Chill Temperature Index measures the rate of heat loss from exposed human skin caused by combined cold temperatures and aerodynamic wind velocity. In still, calm air, the human body warms a microscopic boundary layer of insulating air adjacent to the skin surface. Sustained winds continually strip this warm boundary layer away, dramatically accelerating convective heat loss and lowering skin temperature toward the ambient air temperature. While wind chill cannot cool an inanimate object below the actual thermometer reading, it dictates how rapidly human living tissue cools toward freezing. Cross-checking cold stress with our <Link href="/calculators/weather/snowfall-calculator" className="font-semibold text-amber-900 dark:text-amber-200 underline">snowfall calculator</Link> reveals that at a wind chill of -25°F, exposed facial skin can develop severe frostbite in under 15 minutes.
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            NOAA Wind Chill Apparent Temperatures & Convective Heat Scouring
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Wind chill is calibrated exclusively for temperatures at or below 50°F (10°C) and wind speeds exceeding 3.0 mph (4.8 km/h). In contrast to summer heat waves analyzed in our <Link href="/calculators/weather/heat-index-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">heat index calculator</Link> where moisture traps metabolic heat, winter wind velocity strips heat away with aggressive force. When commuting or traveling during severe winter storms alongside our <Link href="/calculators/transportation/speed-distance-time-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">speed distance time calculator</Link>, wind chill warnings dictate emergency survival gear requirements.
          </p>

          <WindChillEquivalentTemperatureFrostbiteChart />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            The progression curves above illustrate how wind speed accelerates convective cooling across five ambient cold baselines (30°F, 15°F, 0°F, -15°F, and -30°F). Notice that the steepest cooling rate occurs between 5 mph and 25 mph; as wind speeds advance beyond 35 mph, the convective heat loss curve levels off because the insulating boundary layer is already completely dismantled. At an ambient temperature of -15°F, a 25 mph wind drives the apparent wind chill down to -44°F, a critical threshold where exposed fingers, ears, and noses succumb to deep tissue frostbite in less than 10 minutes. In dry winter air evaluated in our <Link href="/calculators/weather/humidity-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">humidity calculator</Link>, this rapid heat loss is accompanied by rapid evaporative skin cracking.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Mathematical Derivation of the NOAA JAG/TI Wind Chill Formula
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In 2001, the Joint Action Group for Temperature Indices (JAG/TI)—a consortium of United States and Canadian atmospheric scientists and biometeorologists—established the modern Wind Chill Temperature Index formula based on human clinical wind tunnel trials:
          </p>

          <Formula>
            {"\text{WCI} = 35.74 + 0.6215 \cdot T - 35.75 \cdot (V^{0.16}) + 0.4275 \cdot T \cdot (V^{0.16}) \quad (^\circ\text{F})"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Where <Formula>{"T"}</Formula> is ambient air temperature in degrees Fahrenheit (<Formula>{"T \le 50^\circ\text{F}"}</Formula>) and <Formula>{"V"}</Formula> is wind velocity in miles per hour measured at standard 10-meter (33-foot) anemometer height (<Formula>{"V \ge 3.0\text{ mph}"}</Formula>). In the International System of Units (metric Celsius and km/h), the standardized formula is:
          </p>

          <Formula>
            {"\text{WCI}_{\text{metric}} = 13.12 + 0.6215 \cdot T_C - 11.37 \cdot (V_{kmh}^{0.16}) + 0.3965 \cdot T_C \cdot (V_{kmh}^{0.16}) \quad (^\circ\text{C})"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            The power exponent of 0.16 reflects empirical turbulent boundary layer heat transfer around a human facial geometry. Convective facial heat flux <Formula>{"Q_{conv}"}</Formula> in Watts per square meter is modeled by:
          </p>

          <Formula>
            {"Q_{conv} = h_c \cdot (T_{skin} - T_{ambient}) = \left( 10.45 + 10\sqrt{V_{m/s}} - V_{m/s} \right) \times (33.0 - T_C) \quad (\text{W/m}^2)"}
          </Formula>

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            Where <Formula>{"T_{skin}"}</Formula> is assumed to be 33.0°C (91.4°F) for comfortable baseline facial tissue. Outdoor winter sports enthusiasts monitoring solar radiation can verify UV reflections off snowpack with our <Link href="/calculators/weather/uv-index-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">UV index calculator</Link> and monitor atmospheric saturation with our <Link href="/calculators/weather/dew-point-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">dew point calculator</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Frostbite Exposure Thresholds & NOAA Warning Benchmark Table
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            The table below itemizes the NOAA Wind Chill Warning criteria alongside clinical exposed skin frostbite times under varying wind speeds:
          </p>

          <DataTable
            head={["Wind Chill Range (°F / °C)", "NOAA Alert Level", "Time to Facial Frostbite", "Physiological Clinical Impact", "Mandatory Cold Weather Protective Gear"]}
            rows={[
              ["32°F to 16°F (0°C to -9°C)", "Cold Caution", "Frostbite unlikely in under 2 hours", "Shivering initiates; peripheral vasoconstriction", "Standard winter coat, gloves, and insulated knit hat"],
              ["15°F to -15°F (-10°C to -26°C)", "Wind Chill Advisory", "Frostbite possible in 30 minutes", "Numbness in fingers and toes; reduced dexterity", "Thermal base layer + fleece + windproof shell + insulated mittens"],
              ["-16°F to -35°F (-27°C to -37°C)", "Wind Chill Warning", "Frostbite likely in 10 to 15 minutes", "Superficial frostbite (frostnip); white waxy skin patches", "Full windproof parka + balaclava face mask + goggles"],
              ["-36°F to -60°F (-38°C to -51°C)", "Extreme Cold Warning", "Frostbite occurs in 5 minutes", "Deep tissue freezing; severe hypothermia risk within 30 min", "Expedition down suit + chemical hand warmers + face coverage"],
              ["Below -60°F (< -51°C)", "Critical Life Threat", "Frostbite occurs in under 2 minutes", "Rapid systemic hypothermia; loss of consciousness", "Zero exposed skin; cancel all outdoor transit activities"]
            ]}
          />

          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-4">
            As revealed in the benchmark data, once wind chill drops below -15°F, biological tissue freezing occurs with startling speed. Superficial frostnip can stiffen the outer epidermis of ears and cheeks in under 15 minutes. If cooling continues, ice crystals nucleate within interstitial fluid spaces, permanently rupturing cellular walls and requiring surgical debridement or amputation. During severe convective winter storms analyzed in our <Link href="/calculators/weather/severe-weather-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">severe weather calculator</Link>, high winds combine with heavy snowfall to produce blinding whiteouts.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Biometeorology & Engineering: Inanimate Objects, Car Engines & Layering Physics
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Understanding the physics of wind chill prevents costly mistakes in winter vehicle maintenance and outdoor survival:
          </p>

          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-6">
            <li>
              <strong>The Inanimate Object Myth (Car Radiators):</strong> Wind chill does <em>not</em> cool inanimate objects below the actual ambient thermometer temperature. If the air is 20°F and the wind chill is -10°F, water in a car radiator will never freeze (because 20°F is above the 0°F freeze point of 50/50 ethylene glycol antifreeze). However, the wind causes the hot engine to cool down to 20°F much faster than in calm air.
            </li>
            <li>
              <strong>Layering Science (The Three-Layer System):</strong> Effective winter protection utilizes three distinct thermal layers: a wicking synthetic base layer (polyester/merino wool) that transports perspiration away from skin; an insulating mid-layer (fleece/down) that traps dead air pockets; and a windproof, waterproof outer shell (Gore-Tex) that blocks convective wind scouring.
            </li>
            <li>
              <strong>Moisture & Evaporative Hypothermia:</strong> Wet clothing conducts heat away from the body 25 times faster than dry clothing. Perspiring heavily into non-breathable winter gear before standing still in sub-zero wind creates an emergency hypothermia hazard within minutes.
            </li>
            <li>
              <strong>Winter Vehicle Battery Cranking Reserve:</strong> Cold temperatures slow chemical reactions inside lead-acid automotive batteries, cutting cold cranking amperage (CCA) by 50% at 0°F while engine oil thickens, as evaluated in vehicle operating budgets in our <Link href="/calculators/transportation/commute-cost-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">commute cost calculator</Link>.
            </li>
          </ul>

          
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Physiological Hunting Reaction, Paradoxical Undressing & Veterinary Cold Stress
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            Under severe cold exposure, the human body exhibits an involuntary neurovascular cycling mechanism known as the Lewis Hunting Reaction or Cold-Induced Vasodilation (CIVD). Following initial intense vasoconstriction (which shunts warm blood away from hands and feet to protect internal vital organs), peripheral blood vessels periodically dilate for 5 to 10 minutes to flush warm arterial blood into freezing fingers, preventing immediate cellular necrosis before re-constricting. However, under extreme wind chill conditions, CIVD fails as core body temperature begins declining into clinical hypothermia.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-4">
            In terminal stages of severe hypothermia (core temperature &lt; 86°F / 30°C), neurological disorientation frequently induces a bizarre phenomenon known as "paradoxical undressing." As the brain's vasomotor center becomes paralyzed, peripheral blood vessels suddenly dilate fully in a final vasomotor spasm, sending a massive surge of warm blood to the skin that creates a false sensation of burning heat, causing victims to remove their protective winter clothing immediately prior to collapse.
          </p>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            Veterinarians and livestock managers also utilize wind chill metrics to protect domestic animals. While animals possess fur coats, aerodynamic wind velocity parts hair strands, eliminating thermal boundary layer insulation. Wet coats from winter rain or sleet analyzed in our <Link href="/calculators/weather/rainfall-calculator" className="font-semibold text-emerald-600 dark:text-emerald-400 underline">rainfall calculator</Link> accelerate cold stress exponentially, requiring windbreak structures, deep straw bedding, and elevated caloric feed intake to prevent hypothermia in winter pastures.
          </p>

          
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Aerodynamic Boundary Layer Stripping & Facial Tissue Heat Dissipation
          </h2>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
            At a microscopic fluid dynamics level, heat transfer from human skin into passing air is governed by the Nusselt number (<Formula>{'\text{Nu}'}</Formula>) and Reynolds number (<Formula>{'\text{Re}'}</Formula>) of turbulent boundary layer flow across a cylindrical bluff body. In calm air, stagnant air molecules form a laminar thermal boundary layer approximately 3 to 5 millimeters thick that acts as an invisible insulating jacket. Aerodynamic wind creates turbulent vortices that erode this boundary layer down to less than 0.2 millimeters, increasing the convective heat transfer coefficient (<Formula>{'h_c'}</Formula>) by over 400%. Living dermal cells rapidly lose caloric energy to the passing airstream, causing capillary vasoconstriction, tissue cooling, and ice crystal nucleation inside cellular cytoplasm within minutes. Covering all exposed facial skin with a windproof neoprene or fleece balaclava eliminates direct convective boundary layer stripping, restoring skin safety buffers.
          </p>

          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Frequently Asked Questions About NOAA Wind Chill & Cold Weather
          </h2>

          <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                Can wind chill freeze my car's engine or burst home plumbing pipes?
              </h3>
              <p>
                No inanimate object can ever cool below the actual ambient air temperature. If the air temperature is 35°F and the wind chill is 20°F, your home pipes or car radiator will never freeze, because they will never drop below 35°F. However, wind chill will cool warm pipes or a running engine down to 35°F much faster than calm air.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                Why was the old pre-2001 wind chill formula replaced?
              </h3>
              <p>
                The original 1945 Siple-Passel wind chill formula was based on measuring how fast water froze inside a small plastic cylinder suspended on a pole in Antarctica. It assumed wind speed at the top of the pole rather than human facial height (5 feet), resulting in unrealistically exaggerated wind chill values (such as -80°F for mild winter storms). The modern 2001 JAG/TI formula utilizes human facial wind tunnel trials to provide biologically accurate feels-like metrics.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                What are the early warning signs of frostbite?
              </h3>
              <p>
                Early frostbite (frostnip) begins with cold, red skin followed by a prickling or tingling sensation. As tissue freezes, the skin becomes numb, pale white, or yellowish-gray and feels unusually firm or waxy to the touch. If frostnip occurs, immediately rewarm the affected area with skin-to-skin contact (such as placing cold fingers inside your armpits). Never rub frostbitten skin with snow, as ice crystals will lacerate frozen cell membranes.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                How does wind chill differ from hypothermia?
              </h3>
              <p>
                Wind chill is an atmospheric weather metric describing the rate of surface cooling on exposed skin. Frostbite is localized freezing of skin tissue. Hypothermia is a systemic medical emergency where the body's internal core temperature drops below 95°F (35°C), leading to violent shivering, slurred speech, confusion, and cardiovascular failure.
              </p>
            </div>
          </div>
        </>
      }
    >
      <WindChillCalculatorComponent />
    </CalcPage>
  );
}
