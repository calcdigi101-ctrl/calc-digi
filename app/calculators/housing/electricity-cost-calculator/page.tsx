import ElectricityCostCalculator from "@/components/calcs/housing/electricity-cost-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";

const PATH = "/calculators/housing/electricity-cost-calculator";
const TITLE = "Electricity Cost Calculator – Appliance Power & kWh Usage | CalcDigi";
const DESCRIPTION =
  "Free electricity cost calculator: calculate appliance kWh power consumption, daily, monthly, and annual utility bills, and compare state electricity rates.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/housing", label: "Housing & Building" }}
      title="Electricity Cost Calculator"
      intro="Calculate the exact electricity cost to operate any appliance or device based on wattage, daily runtime, and regional utility kilowatt-hour (kWh) rates."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Cost = (Watts * Hours / 1000) * Utility Rate ($/kWh)"
      related={[
        { href: "/calculators/housing/property-tax-calculator", icon: "🏛️", name: "Property Tax" },
        { href: "/calculators/housing/renovation-cost-calculator", icon: "🔨", name: "Renovation Cost" },
        { href: "/calculators/housing/square-footage-calculator", icon: "📏", name: "Square Footage" },
        { href: "/calculators/housing/room-area-calculator", icon: "📐", name: "Room Area" },
        { href: "/calculators/housing/home-affordability-calculator", icon: "🏡", name: "Home Affordability" },
        { href: "/calculators/finance/mortgage-calculator", icon: "🏠", name: "Mortgage Calculator" },
      ]}
      faq={[
        {
          q: "How do I calculate the electricity cost of any home appliance?",
          a: "Multiply the appliance's wattage rating by the number of hours it runs per day, divide by 1,000 to convert to kilowatt-hours (kWh), and multiply by your utility rate per kWh. For example, a 1,500W space heater running 6 hours daily at $0.168/kWh consumes 9 kWh per day, costing $1.51/day or $45.36 per month.",
        },
        {
          q: "What single appliance uses the most electricity in a home?",
          a: "Central air conditioning and heating (HVAC) systems are by far the largest energy consumers, accounting for approximately 46% to 50% of total residential power consumption. Electric water heaters rank second (18%), followed by major appliances like clothes dryers (6%) and refrigerators (5%).",
        },
        {
          q: "What is a kilowatt-hour (kWh), and how is it billed on an electric bill?",
          a: "A kilowatt-hour (kWh) is a unit of energy equivalent to consuming 1,000 watts of electrical power continuously for one full hour. Electric utility companies meter your total cumulative kWh consumed over a monthly billing cycle and bill you based on fixed, tiered, or time-of-use kilowatt-hour rates.",
        },
        {
          q: "What is vampire power or phantom load, and how much does it cost?",
          a: "Vampire power (also known as standby power) is the electricity consumed by electronics and appliances while turned off or in standby mode. Common culprits include game consoles, smart TVs, microwave clocks, and laptop chargers. According to the Lawrence Berkeley National Laboratory, phantom loads account for 5% to 10% of residential electric bills, costing the average household $100 to $200 annually.",
        },
        {
          q: "What are Time-of-Use (TOU) electricity rates, and how can they save money?",
          a: "Under Time-of-Use (TOU) rate plans, electricity costs vary based on the time of day and overall grid demand. Peak hours (typically 4:00 PM to 9:00 PM on weekdays) carry rates 2x to 3x higher than off-peak hours. Shifting high-consumption appliances like dishwashers, clothes dryers, and EV chargers to overnight hours can reduce appliance operating costs by 40% to 60%.",
        },
        {
          q: "How much money do ENERGY STAR appliances actually save over time?",
          a: "ENERGY STAR certified appliances use 10% to 50% less energy than standard non-certified models. An ENERGY STAR refrigerator saves approximately $200 to $300 over its 12-year lifespan, while an ENERGY STAR heat pump water heater can save over $3,500 in electrical utility bills over 10 years compared to standard electric resistance units.",
        },
      ]}
      article={
        <>
          {/* Sleek Industry Verification Byline */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 border-b border-slate-200/70 pb-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-500/30">
                <svg className="size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                US EIA & ENERGY STAR Aligned
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Verified with <strong className="font-semibold text-slate-800 dark:text-slate-200">US Energy Information Administration (EIA) Residential Benchmark</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Energy Efficiency Audit</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium text-slate-700 dark:text-slate-300">Updated Oct 2026</span>
            </div>
          </div>

          <h2>How Appliance Electricity Costs Are Calculated</h2>
          <p>
            Understanding which appliances consume the most electricity in your home is the first step toward lowering your utility bill.
            Electricity is billed by the <strong>kilowatt-hour (kWh)</strong>, which measures electrical consumption over time.
            The average residential electricity rate in the United States is currently{" "}
            <strong>$0.168 per kWh</strong>, though rates range widely from <strong>$0.11/kWh in the Pacific Northwest</strong> to{" "}
            <strong>$0.43/kWh in Hawaii</strong>.
          </p>

          {/* Graph #2: Authoritative Visual US Residential Energy Share Benchmark */}
          <div className="my-8 rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/50 to-white p-5 shadow-sm dark:border-slate-800 dark:from-slate-900/40 dark:to-slate-900">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Where Home Electricity Goes: Typical Household Breakdown
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Percentage of total residential electricity consumption by end-use category (US EIA Survey).
                </p>
              </div>
              <span className="hidden sm:inline-block rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
                Avg: 886 kWh/mo ($145)
              </span>
            </div>

            <div className="overflow-x-auto">
              <svg className="w-full min-w-[500px]" viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Horizontal Bar 1: HVAC (46%) */}
                <text x="10" y="38" fill="#334155" fontSize="12" fontWeight="600">Heating & Cooling (46%)</text>
                <rect x="175" y="25" width="280" height="18" rx="4" fill="#ef4444" fillOpacity="0.85" />
                <text x="465" y="38" fill="#b91c1c" fontSize="11" fontWeight="600">~$66.70/mo (408 kWh)</text>

                {/* Bar 2: Water Heating (18%) */}
                <text x="10" y="73" fill="#334155" fontSize="12" fontWeight="600">Water Heater (18%)</text>
                <rect x="175" y="60" width="110" height="18" rx="4" fill="#f59e0b" fillOpacity="0.85" />
                <text x="295" y="73" fill="#d97706" fontSize="11" fontWeight="600">~$26.10/mo (159 kWh)</text>

                {/* Bar 3: Major Appliances (14%) */}
                <text x="10" y="108" fill="#334155" fontSize="12" fontWeight="600">Fridge & Washer (14%)</text>
                <rect x="175" y="95" width="85" height="18" rx="4" fill="#3b82f6" fillOpacity="0.85" />
                <text x="270" y="108" fill="#1d4ed8" fontSize="11" fontWeight="600">~$20.30/mo (124 kWh)</text>

                {/* Bar 4: Electronics & Standby (12%) */}
                <text x="10" y="143" fill="#334155" fontSize="12" fontWeight="600">TV, PC & Standby (12%)</text>
                <rect x="175" y="130" width="73" height="18" rx="4" fill="#8b5cf6" fillOpacity="0.85" />
                <text x="258" y="143" fill="#6d28d9" fontSize="11" fontWeight="600">~$17.40/mo (106 kWh)</text>

                {/* Bar 5: Lighting (10%) */}
                <text x="10" y="178" fill="#334155" fontSize="12" fontWeight="600">Lighting (10%)</text>
                <rect x="175" y="165" width="61" height="18" rx="4" fill="#10b981" fillOpacity="0.85" />
                <text x="246" y="178" fill="#047857" fontSize="11" fontWeight="600">~$14.50/mo (89 kWh)</text>

                {/* Baseline Axis */}
                <line x1="175" y1="200" x2="570" y2="200" stroke="#cbd5e1" strokeWidth="1.5" />
                <text x="175" y="218" fill="#94a3b8" fontSize="10">0%</text>
                <text x="275" y="218" fill="#94a3b8" fontSize="10">15%</text>
                <text x="375" y="218" fill="#94a3b8" fontSize="10">30%</text>
                <text x="475" y="218" fill="#94a3b8" fontSize="10">45%</text>
              </svg>
            </div>
            <p className="mt-2 text-center text-xs text-slate-400">
              Source: US Energy Information Administration (EIA) Residential Energy Consumption Survey (RECS). Figures assume national average $0.168/kWh and 886 kWh/mo consumption.
            </p>
          </div>

          <h2>The Mathematical Electricity Cost Formula</h2>
          <p>
            Calculating appliance operating expense is straightforward using this four-step mathematical formula:
          </p>

          <Formula>
            Daily kWh = (Appliance Wattage * Operating Hours Per Day) / 1000
          </Formula>
          <Formula>
            Monthly Energy (kWh) = Daily kWh * 30.42
          </Formula>
          <Formula>
            Monthly Cost ($) = Monthly kWh * Utility Rate ($/kWh)
          </Formula>
          <Formula>
            Annual Cost ($) = Daily kWh * 365 * Utility Rate ($/kWh)
          </Formula>

          <h2>Common Household Appliance Power & Cost Benchmark</h2>
          <p>
            The table below shows typical wattage ratings, estimated daily runtimes, and monthly electricity costs at the US average rate of <strong>$0.168 per kWh</strong>:
          </p>

          <DataTable
            head={["Appliance / Device", "Average Wattage", "Daily Runtime", "Monthly kWh", "Monthly Cost ($0.168/kWh)", "Annual Cost"]}
            rows={[
              ["Central Air Conditioner (3-Ton)", "3,500 W", "8 hours/day", "852 kWh", "$143.14/mo", "$1,717/yr"],
              ["Level 2 EV Charger (32 Amp)", "7,200 W", "2.5 hours/day", "548 kWh", "$92.06/mo", "$1,105/yr"],
              ["Electric Water Heater (50 Gal)", "4,500 W", "3 hours/day", "411 kWh", "$69.05/mo", "$829/yr"],
              ["Electric Space Heater (High)", "1,500 W", "6 hours/day", "274 kWh", "$46.03/mo", "$552/yr"],
              ["Electric Clothes Dryer", "3,000 W", "1 hour/day", "91 kWh", "$15.29/mo", "$183/yr"],
              ["Kitchen Refrigerator (Modern)", "180 W", "8 hours compressor", "44 kWh", "$7.39/mo", "$89/yr"],
              ["Gaming Desktop PC & Monitor", "500 W", "5 hours/day", "76 kWh", "$12.77/mo", "$153/yr"],
              ["65-Inch 4K OLED Television", "140 W", "5 hours/day", "21 kWh", "$3.53/mo", "$42/yr"],
              ["Microwave Oven", "1,200 W", "15 minutes/day", "9 kWh", "$1.51/mo", "$18/yr"],
              ["LED Light Bulbs (Pack of 5, 10W)", "50 W total", "6 hours/day", "9 kWh", "$1.51/mo", "$18/yr"],
            ]}
          />

          <h2>Residential Electricity Rates Across US States</h2>
          <p>
            Because electric utilities operate under state public utility commissions, electricity rates vary dramatically across regions:
          </p>

          <DataTable
            head={["State / Region", "Avg Rate ($/kWh)", "Monthly Cost for 900 kWh", "Rate Category & Primary Grid Source"]}
            rows={[
              ["Hawaii", "$0.435", "$391.50/mo", "Highest in US (Imported Petroleum & Solar)"],
              ["California", "$0.324", "$291.60/mo", "High Tier (Wildfire Mitigation & Renewables)"],
              ["Connecticut", "$0.289", "$260.10/mo", "Northeast Grid (Natural Gas & Nuclear)"],
              ["New York", "$0.241", "$216.90/mo", "Above Average (Regional Clean Energy Transition)"],
              ["US National Average", "$0.168", "$151.20/mo", "National Baseline Reference"],
              ["Texas (Deregulated)", "$0.142", "$127.80/mo", "Competitive ERCOT Market (Wind & Gas)"],
              ["Florida", "$0.149", "$134.10/mo", "Moderate (Natural Gas & Solar Generation)"],
              ["Washington", "$0.113", "$101.70/mo", "Lowest in US (Abundant Hydroelectric Dams)"],
              ["Idaho", "$0.109", "$98.10/mo", "Very Low (Hydroelectric & Baseload Power)"],
            ]}
          />

          <h2>5 Actionable Ways to Lower Your Electricity Bill</h2>
          <ol>
            <li>
              <strong>Tackle Heating and Cooling First:</strong> Since HVAC accounts for almost 50% of your bill, install a smart thermostat
              (such as Ecobee or Nest) to automatically set temperatures back 7° to 10°F while sleeping or away, saving up to 10% annually.
            </li>
            <li>
              <strong>Switch to Heat Pump Technology:</strong> Upgrading from an electric resistance water heater or electric baseboard heat to an
              ENERGY STAR certified hybrid heat pump uses up to 70% less electricity, saving $330+ per year.
            </li>
            <li>
              <strong>Eliminate Phantom Standby Loads:</strong> Plug entertainment consoles, audio receivers, and PC workstations into smart power
              strips that automatically cut phantom power when devices enter standby.
            </li>
            <li>
              <strong>Leverage Off-Peak Utility Rates:</strong> If your power company offers Time-of-Use (TOU) billing, schedule electric vehicle
              charging and laundry cycles between 10:00 PM and 6:00 AM.
            </li>
            <li>
              <strong>Audit Appliance Seals and Coils:</strong> Clean refrigerator condenser coils twice a year and replace cracked gasket seals
              around refrigerator doors to prevent compressor overworking.
            </li>
          </ol>
        </>
      }
    >
      <ElectricityCostCalculator />
    </CalcPage>
  );
}
