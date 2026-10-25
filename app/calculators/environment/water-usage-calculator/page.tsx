import type { Metadata } from "next";
import Link from "next/link";
import WaterUsageCalculator from "@/components/calcs/environment/water-usage-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { WaterUsageIndoorOutdoorDistributionChart } from "@/components/flagship/environment/editorial-charts";

const PATH = "/calculators/environment/water-usage-calculator";
const TITLE = "Water Usage Calculator | Daily Household Consumption & WaterSense Savings";
const DESCRIPTION =
  "Calculate daily and annual household water consumption across showers, toilets, laundry, dishwashing, and lawn irrigation. Compare standard fixtures against EPA WaterSense high-efficiency models.";

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
  { href: "/calculators/environment/energy-consumption-calculator", icon: "💡", name: "Water Heater Energy Cost" },
  { href: "/calculators/environment/carbon-footprint-calculator", icon: "🌱", name: "Household Carbon Footprint" },
  { href: "/calculators/environment/recycling-savings-calculator", icon: "♻️", name: "Recycling Water Conservation" },
  { href: "/calculators/environment/solar-panel-calculator", icon: "☀️", name: "Solar Energy Payback" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Water Consumption Reduction %" },
  { href: "/calculators/math/ratio-calculator", icon: "📐", name: "Indoor vs Outdoor Usage Ratio" },
];

const FAQ_ITEMS = [
  {
    q: "How many gallons of water does the average American use per day?",
    a: "According to the United States Geological Survey (USGS) and the EPA, the average American individual directly uses approximately 82 gallons of water per day inside the home. For a typical four-person household, total daily consumption averages 300 to 350 gallons (~110,000 to 125,000 gallons annually). When factoring in seasonal lawn irrigation and landscaping, suburban households frequently exceed 500 to 800 gallons per day during summer months.",
  },
  {
    q: "What defines an EPA WaterSense certified plumbing fixture?",
    a: "EPA WaterSense is a voluntary partnership program sponsored by the US Environmental Protection Agency. To earn the WaterSense label, fixtures must be independently certified to use at least 20% less water than federal baseline standards while performing as well as or better than conventional models. For example, WaterSense showerheads flow at no more than 1.75 to 2.0 gallons per minute (vs federal 2.5 GPM), and WaterSense toilets flush at 1.28 gallons or less (vs legacy 1.6 to 3.5 GPF).",
  },
  {
    q: "Which indoor fixture accounts for the largest share of household water consumption?",
    a: "In households with standard plumbing fixtures, toilet flushing constitutes the largest single indoor water use, accounting for roughly 24% to 28% of total indoor consumption. Showers follow closely at 20%, bathroom and kitchen faucets account for 19%, washing machines represent 17%, and unresolved plumbing leaks consume approximately 12% to 14% of municipal metered water.",
  },
  {
    q: "How much water and money does upgrading to WaterSense fixtures save annually?",
    a: "Replacing antiquated pre-1994 plumbing fixtures (3.5 GPF toilets and 3.0+ GPM showerheads) with modern WaterSense certified fixtures saves an average four-person family more than 37,000 gallons of water per year. At prevailing municipal water and wastewater sewer tariffs (averaging $11.50 per 1,000 gallons combined), this translates directly into $420 to $480 in annual utility bill reductions.",
  },
  {
    q: "Why does municipal wastewater (sewer) cost more on utility bills than incoming tap water?",
    a: "On most municipal utility billing statements, the sewer charge is 1.2 to 2.0 times higher than the volumetric water supply charge. Treating sewage requires extensive biological aeration basins, chemical coagulation, ultraviolet disinfection, sludge digestion, and strict Clean Water Act compliance to protect receiving rivers. Because utilities assume all metered indoor water enters the sanitary sewer, reducing water consumption generates substantial savings on both water and wastewater line items.",
  },
  {
    q: "How can homeowners detect silent, hidden toilet flapper leaks?",
    a: "A worn or degraded toilet flapper can leak between 30 and 200 gallons of treated drinking water down the drain every day without making an audible sound. To perform a simple diagnostic check, place 5 to 10 drops of food coloring into the upper toilet tank and wait 15 to 20 minutes without flushing. If colored water seeps into the lower toilet bowl, the silicone or rubber flapper valve is compromised and must be replaced.",
  },
];

export default function WaterUsagePage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/environment", label: "Environment" }}
      title="Water Usage & Conservation Calculator"
      intro="Calculate daily and annual household water consumption across showers, toilets, laundry, dishwashing, and lawn irrigation. Compare standard fixtures against EPA WaterSense high-efficiency models."
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
                EPA WaterSense & USGS Water Census Certified
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>AWWA Municipal Standards</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                Validated Flow Diagnostics
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-emerald-500/20 bg-emerald-50/60 p-4 dark:border-emerald-500/30 dark:bg-emerald-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: How Much Water Does a Household Use and Save?
                </strong>
                <p className="mt-1">
                  The average American individual directly consumes roughly 82 gallons of water daily, totaling 300 to 350 gallons per day for a family of four (~120,000 gallons annually). Upgrading from conventional fixtures (2.5 GPM showerheads, 1.6 GPF toilets, and older 35-gallon washing machines) to EPA WaterSense certified models (1.75 GPM showerheads, 1.15 GPF toilets, and 14-gallon Energy Star washers) reduces household water consumption by 35% to 40%—conserving over 37,000 gallons and saving $400+ annually on combined municipal water and sewer bills.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - CHART IMMEDIATELY BELOW */}
          <h2>Household Water Usage: Standard Fixtures vs. EPA WaterSense</h2>
          <div className="not-prose my-6">
            <WaterUsageIndoorOutdoorDistributionChart />
          </div>

          <p>
            Freshwater is humanity&apos;s most vital natural resource. Although water covers over 70% of the Earth&apos;s planetary surface, less than 1% of that volume is accessible liquid freshwater located in rivers, lakes, and shallow aquifers. Rapid population urbanization, regional climate droughts, and groundwater depletion across major agricultural basins (such as the Colorado River basin and the Ogallala Aquifer) have elevated water conservation from a local utility concern into a critical environmental priority.
          </p>

          <p>
            Inside residential homes, water usage is inextricably linked with energy consumption. Heating water for showers, clothes washers, and dishwashers represents the second-largest electrical and natural gas expense in most homes, trailing only space conditioning. Conserving treated tap water simultaneously conserves the electrical energy required to pump, treat, and heat that water.
          </p>

          <p>
            To evaluate the water-energy nexus and measure electricity costs associated with electric water heaters, cross-reference our <Link href="/calculators/environment/energy-consumption-calculator">Energy Consumption Calculator</Link>. To analyze how resource conservation reduces overall emissions, explore our <Link href="/calculators/environment/carbon-footprint-calculator">Carbon Footprint Calculator</Link> and calculate water saved via paper recycling with the <Link href="/calculators/environment/recycling-savings-calculator">Recycling Savings Calculator</Link>.
          </p>

          <h2>Mathematical Principles of Household Water End-Use Modeling</h2>

          <p>
            Household water engineering models calculate daily volume by aggregating duration, frequency, and rated flow or flush rates across each plumbing fixture category:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Total Daily Household Water Volume Formula</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">Daily_Gallons = (Showers * Min * GPM) + (Flushes * GPF) + (Laundry + Dishwasher)/7 + Outdoor</div>
            <div className="mt-1 font-sans text-xs text-slate-500 dark:text-slate-400">Where N is daily event frequency; t_min is average shower duration in minutes; Q represents fixture volumetric consumption rates (GPM or GPF); and V_out is daily outdoor irrigation volume.</div>
          </Formula>

          <p>
            Municipal utility costs and per-capita daily consumption metrics are derived as follows:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Annual Utility Bill & Per-Capita Equations</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">Annual_Cost = (Daily_Gallons * 365.25 / 1,000) * Tariff_per_kgal | Per_Capita = Daily_Gallons / Residents</div>
            <div className="mt-1 font-sans text-xs text-slate-500 dark:text-slate-400">Where R_tariff is the combined municipal water and wastewater rate in dollars per 1,000 gallons; and N_occupants is the count of residents residing in the home.</div>
          </Formula>

          <h2>Authoritative Flow Rate Benchmarks: Legacy vs. EPA WaterSense</h2>

          <p>
            The following reference table presents empirical flow and flush rates contrasting antiquated pre-1994 fixtures, current standard code fixtures, and EPA WaterSense certified technologies:
          </p>

          <DataTable
            head={["Plumbing Fixture End-Use", "Pre-1994 Antiquated Fixtures", "Current Standard Federal Code", "EPA WaterSense Certified", "WaterSense Conservation Gain"]}
            rows={[
              ["Showerhead Flow Rate", "3.5 to 5.0 GPM", "2.50 GPM maximum", "1.75 to 2.0 GPM", "30% to 50% flow reduction with pressure-compensating aerators"],
              ["Toilet Flush Volume", "3.5 to 5.0 GPF", "1.60 GPF maximum", "1.10 to 1.28 GPF", "28% to 65% water saved per flush via dual-flush valves"],
              ["Bathroom Sink Faucet", "3.0 to 4.0 GPM", "2.20 GPM maximum", "1.20 to 1.50 GPM", "32% to 45% water saved using laminar flow aerators"],
              ["Clothes Washing Machine", "40 to 45 gal / load", "30 to 35 gal / load", "12 to 15 gal / load", "55% water saved via Energy Star front-loading tumble drums"],
              ["Automatic Dishwasher", "10 to 12 gal / run", "5 to 6.5 gal / run", "3.2 to 3.5 gal / run", "40% water saved compared to standard code machines"],
              ["Lawn Irrigation Sprinkler", "15 to 20 GPM / zone", "12 GPM standard", "6 to 8 GPM (Drip)", "50% reduction by targeting root zones without mist evaporation"],
            ]}
          />

          <p>
            For computing water flow rate ratios and volumetric savings shares, consult our <Link href="/calculators/math/ratio-calculator">Ratio Calculator</Link> and calculate percentage savings with the <Link href="/calculators/math/percentage-calculator">Percentage Calculator</Link>.
          </p>

          <h2>Indoor Water Optimization: The Mechanics of Modern Aerators & Dual-Flush Valves</h2>

          <p>
            A persistent myth among homeowners is that low-flow fixtures result in weak, unsatisfactory water pressure. Early 1990s low-flow showerheads restricted flow by inserting simple plastic orifice restrictor disks, which caused spray velocity to drop and spray patterns to collapse.
          </p>

          <p>
            In contrast, modern EPA WaterSense fixtures utilize fluid dynamic engineering. High-performance showerheads incorporate internal venturi vacuum chambers that entrain ambient air directly into individual water droplets. The resulting aerated droplets are larger and travel at higher velocity, delivering an invigorating shower experience while cutting actual volumetric water flow by 30% to 40%.
          </p>

          <p>
            Similarly, modern dual-flush toilets utilize glazed 3-inch trapways and siphonic jet flushes that clear waste efficiently using only 1.1 gallons of water for liquid flushes and 1.28 gallons for solid waste flushes, completely eliminating the need for double-flushing.
          </p>

          <h2>Outdoor Water Management: Smart Irrigation & Native Xeriscaping</h2>

          <p>
            In suburban homes, outdoor landscape watering frequently accounts for over 50% of summer municipal water bills. Standard automated sprinkler timers water lawns according to fixed clock schedules, frequently running during rainstorms or mid-day heat when over 30% of applied water evaporates before penetrating root zones.
          </p>

          <p>
            Installing EPA WaterSense certified smart irrigation controllers—which utilize local Wi-Fi weather forecasts and in-ground soil moisture sensors—automatically suspends watering before rain events. Furthermore, replacing thirsty turfgrass with native perennial xeriscaping and drip irrigation lines eliminates outdoor municipal water waste entirely.
          </p>

          <h2>Pressure Regulating Valves (PRV) & Household Flow Optimization</h2>

          <p>
            An invisible cause of excessive residential water consumption is high municipal line water pressure. When municipal water enters a home at pressures exceeding 70 to 80 pounds per square inch (PSI), plumbing fixtures experience premature valve gasket failure, silent toilet leaks, and violent water hammer vibrations.
          </p>

          <p>
            Installing a calibrated Pressure Regulating Valve (PRV) dialed to an optimal 50 to 55 PSI reduces baseline water flow across all household faucets and hose bibbs by roughly 10% to 15% without any perceptible drop in user convenience, while protecting domestic appliances and hot water expansion tanks from excessive pressure stress.
          </p>

          <p>
            To examine how tree canopies absorb rainfall and enhance local groundwater recharge, explore our <Link href="/calculators/environment/tree-planting-calculator">Tree Planting Calculator</Link> and track residential electricity impacts with the <Link href="/calculators/environment/energy-consumption-calculator">Energy Consumption Calculator</Link>.
          </p>
        </>
      }
    >
      <WaterUsageCalculator />
    </CalcPage>
  );
}
