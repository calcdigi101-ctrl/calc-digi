import type { Metadata } from "next";
import Link from "next/link";
import RecyclingSavingsCalculator from "@/components/calcs/environment/recycling-savings-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { RecyclingImpactResourceSavingsChart } from "@/components/flagship/environment/editorial-charts";

const PATH = "/calculators/environment/recycling-savings-calculator";
const TITLE = "Recycling Savings Calculator | Environmental Resource & Energy Conservation";
const DESCRIPTION =
  "Calculate environmental resource savings from recycling paper, plastics, glass, aluminum, and steel. Measure avoided greenhouse gas emissions, conserved energy (kWh), trees saved, and landfill space diverted.";

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
  { href: "/calculators/environment/tree-planting-calculator", icon: "🌲", name: "Tree Planting Offset Calculator" },
  { href: "/calculators/environment/energy-consumption-calculator", icon: "💡", name: "Home Energy Consumption" },
  { href: "/calculators/environment/water-usage-calculator", icon: "💧", name: "Household Water Usage" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Recycling Diversion Percentage" },
  { href: "/calculators/math/ratio-calculator", icon: "📐", name: "Material Density Ratio" },
];

const FAQ_ITEMS = [
  {
    q: "How does the EPA Waste Reduction Model (WARM) calculate recycling benefits?",
    a: "The EPA Waste Reduction Model (WARM) evaluates greenhouse gas (GHG) and energy savings across baseline vs alternative materials management practices. By comparing lifecycle emissions from raw virgin resource extraction, refining, and manufacturing against secondary scrap remelting and re-pulping, WARM quantifies net metric tons of avoided carbon dioxide equivalent (MT CO2e) and million BTUs of conserved energy per ton of recycled commodity.",
  },
  {
    q: "Why does recycling aluminum cans save 95% of the energy needed for virgin production?",
    a: "Producing virgin primary aluminum requires mining bauxite ore, chemically refining it into alumina via the energy-intensive Bayer process, and subjecting molten cryolite to Hall-Héroult electrolytic smelting at over 950 degrees Celsius, demanding roughly 14 to 15 kilowatt-hours of electrical power per kilogram. In contrast, remelting used beverage cans (UBC) bypasses mineral refining entirely, requiring merely 5% of that electrical energy.",
  },
  {
    q: "How many trees are preserved by recycling one short ton (2,000 lbs) of paper?",
    a: "According to EPA and forestry research, recycling one short ton (2,000 pounds) of post-consumer corrugated cardboard and mixed paper preserves approximately 17 mature pulpwood trees, conserves 7,000 gallons of industrial process water, saves 380 gallons of oil equivalent in refining energy, and keeps 3.3 cubic yards of solid waste out of municipal landfills.",
  },
  {
    q: "Can glass bottles and aluminum cans be recycled indefinitely without degradation?",
    a: "Yes. Aluminum and container glass are categorized as permanently circular closed-loop materials. Unlike paper fibers (which shorten after 5 to 7 recycling cycles) or polymers (which degrade thermally during extrusion), the atomic crystal lattices of aluminum metal and silica glass can be melted, purified, and re-cast into brand-new beverage containers infinitely without loss of structural integrity.",
  },
  {
    q: "What is 'wishcycling' and why does it undermine municipal recycling systems?",
    a: "Wishcycling is the practice of depositing non-recyclable items—such as thin plastic grocery bags, greasy pizza boxes, broken ceramics, garden hoses, and lithium-ion batteries—into curbside recycling bins hoping they will be recycled. Plastic bags tangle sorting equipment at Material Recovery Facilities (MRFs), causing mechanical jams, while food oils contaminate paper pulping tanks, causing entire baled loads to be rejected and sent to landfills.",
  },
  {
    q: "How does recycling municipal solid waste reduce global climate change emissions?",
    a: "Recycling mitigates climate change in two ways: first, remanufacturing products from recycled feedstocks consumes substantially less electricity and fossil fuel than virgin extraction. Second, diverting organic paper and cardboard from anaerobic landfills prevents the microbial decomposition of cellulose into high-potency methane gas (CH4), which traps 28 times more atmospheric heat than carbon dioxide over a 100-year timescale.",
  },
];

export default function RecyclingSavingsPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/environment", label: "Environment" }}
      title="Recycling Savings Calculator"
      intro="Calculate environmental resource savings from recycling paper, plastics, glass, aluminum, and steel. Measure avoided greenhouse gas emissions, conserved energy (kWh), trees saved, and landfill space diverted."
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
                EPA WARM v16 & ISRI Lifecycle Validated
              </span>
              <span>Updated October 2026</span>
              <span>•</span>
              <span>Circular Economy Standards</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                Validated Resource Factors
              </span>
            </div>
          </div>

          {/* Quick AEO Answer Callout Box */}
          <div className="my-6 rounded-xl border border-emerald-500/20 bg-emerald-50/60 p-4 dark:border-emerald-500/30 dark:bg-emerald-950/20">
            <div className="flex items-start gap-3">
              <span className="text-xl leading-none">💡</span>
              <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Quick Answer: What Does Household Recycling Actually Save?
                </strong>
                <p className="mt-1">
                  Recycling household commodities conserves raw materials, avoids substantial industrial greenhouse gas emissions, and prevents landfill buildup. Based on EPA Waste Reduction Model (WARM) lifecycle coefficients, recycling an average 4-person family&apos;s monthly discarded recyclables (45 lbs paper, 22 lbs plastic, 28 lbs glass, 8 lbs aluminum, and 10 lbs steel) saves approximately 1,600 to 2,000 kWh of electrical energy, avoids ~1.1 metric tons of CO2e greenhouse emissions annually, preserves 4 to 5 mature forest trees, and diverts roughly 3.0 cubic yards of solid volume from municipal landfills.
                </p>
              </div>
            </div>
          </div>

          {/* FIRST H2 HEADING - CHART IMMEDIATELY BELOW */}
          <h2>Lifecycle Resource Savings per 100 lbs of Recycled Commodities</h2>
          <div className="not-prose my-6">
            <RecyclingImpactResourceSavingsChart />
          </div>

          <p>
            The transition from a linear &apos;extract-manufacture-dispose&apos; economic paradigm to a regenerative circular economy represents one of the most critical sustainability imperatives of our era. Every manufactured item consumed in a household embodies significant upstream ecological debt: deep-shaft bauxite mining for aluminum, petroleum drilling and petrochemical cracking for virgin polymers, clear-cut logging for cellulose wood pulp, and open-pit iron mining for tinplate steel.
          </p>

          <p>
            When these post-consumer materials are discarded into municipal landfills, the enormous kinetic and chemical energy invested in their extraction is permanently lost. Furthermore, anaerobic decomposition of organic cellulose inside landfill burial cells produces potent methane gas emissions. By contrast, secondary reprocessing preserves material capital within closed-loop industrial manufacturing streams.
          </p>

          <p>
            To investigate how recycling integrates with your overall household environmental footprint, cross-reference our <Link href="/calculators/environment/carbon-footprint-calculator">Carbon Footprint Calculator</Link>, evaluate clean energy offsets with the <Link href="/calculators/environment/solar-panel-calculator">Solar Panel Calculator</Link>, and model forestry carbon capture with the <Link href="/calculators/environment/tree-planting-calculator">Tree Planting Calculator</Link>.
          </p>

          <h2>Mathematical Principles of Waste Reduction Model (WARM) Lifecycle Accounting</h2>

          <p>
            The environmental impact of recycling is mathematically quantified by comparing virgin product lifecycle emissions against secondary scrap reprocessing:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Net Avoided Greenhouse Gas Emissions Formula</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">Annual_CO2e_Avoided_kg = Sum(Monthly_Weight_lbs * 12 * WARM_Factor_alpha)</div>
            <div className="mt-1 font-sans text-xs text-slate-500 dark:text-slate-400">Where W_m is the monthly weight of recycled material m in pounds; 12 converts to annual mass; and alpha_m is the EPA WARM lifecycle emissions avoidance factor in kilograms of CO2e per pound.</div>
          </Formula>

          <p>
            Similarly, conserved electrical energy and forest conservation are derived using empirical physical yield factors:
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Conserved Energy & Tree Conservation Formulas</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">Conserved_kWh = Sum(Weight_lbs * 12 * Factor_kWh) | Trees_Preserved = (Paper_lbs * 12 / 2,000) * 17</div>
            <div className="mt-1 font-sans text-xs text-slate-500 dark:text-slate-400">Where eta_m is the conserved kilowatt-hours per pound of recycled commodity m; and 17 represents mature pulpwood trees preserved per short ton (2,000 lbs) of recycled paper.</div>
          </Formula>

          <h2>Authoritative Lifecycle Resource Multipliers by Material Class</h2>

          <p>
            The following reference table presents empirical lifecycle coefficients derived from EPA WARM v16 and the Institute of Scrap Recycling Industries (ISRI):
          </p>

          <DataTable
            head={["Commodity Material", "Avoided CO2 (kg / lb)", "Conserved Energy (kWh / lb)", "Water Conserved (gal / lb)", "Key Industrial Efficiency Benefit"]}
            rows={[
              ["Aluminum Beverage Cans", "4.15 kg CO2e / lb", "6.50 kWh / lb", "1.20 gallons", "Bypasses 950°C electrolytic smelting (95% energy saved)"],
              ["Rigid Plastics (PET & HDPE)", "1.20 kg CO2e / lb", "2.80 kWh / lb", "0.80 gallons", "Directly offsets crude oil and natural gas cracking"],
              ["Paper & Corrugated Boxes", "0.95 kg CO2e / lb", "1.80 kWh / lb", "3.50 gallons", "Preserves standing forest canopy & reduces pulping water"],
              ["Steel & Tinplate Cans", "0.70 kg CO2e / lb", "1.40 kWh / lb", "0.90 gallons", "Eliminates blast furnace iron ore reduction (75% saved)"],
              ["Container Glass Bottles", "0.15 kg CO2e / lb", "0.15 kWh / lb", "0.30 gallons", "Lowers furnace melt temperatures (100% circular loop)"],
            ]}
          />

          <p>
            For computing mass balance ratios across commercial waste audits, consult our <Link href="/calculators/math/ratio-calculator">Ratio Calculator</Link> and compute percentage waste diversion rates using our <Link href="/calculators/math/percentage-calculator">Percentage Calculator</Link>.
          </p>

          <h2>Commodity Deep Dives: Closed-Loop Metals vs. Degraded Polymers</h2>

          <p>
            Not all recyclable commodities behave identically within industrial remanufacturing streams:
          </p>

          <ul>
            <li>
              <strong>Aluminum Cans (The Circular Champion):</strong> An aluminum beverage can placed in a curbside recycling bin can be melted, rolled into sheet ingot, stamped into a new can, filled with beverage, and placed back onto retail supermarket shelves in as few as 60 days. This closed loop can be repeated indefinitely without downcycling.
            </li>
            <li>
              <strong>Rigid Plastics (Resins #1 and #2):</strong> Polyethylene terephthalate (PET soda bottles) and High-Density Polyethylene (HDPE milk jugs) have well-established secondary markets for carpet fibers, fleece apparel, and drain pipes. However, repeated heat extrusion cycles cause polymer chain cleavage, eventually downcycling plastic into unrecyclable synthetic timber.
            </li>
            <li>
              <strong>Paper and Cardboard Fibers:</strong> Paper recycling is vital for water and forest conservation. However, mechanical repulping degrades natural wood cellulose fibers, progressively shortening them. After 5 to 7 recycling cycles, fibers become too short to form paper sheets and must be blended with virgin pulp.
            </li>
          </ul>

          <h2>Municipal Sorting Technology & Overcoming Contamination</h2>

          <p>
            Modern single-stream Material Recovery Facilities (MRFs) deploy advanced optical sorters, ballistic air classifiers, magnetic drums, and eddy-current separators to sort commingled recyclables at rates exceeding 30 tons per hour. Eddy-current rotors use rapidly alternating magnetic fields to induce repulsive currents in non-ferrous aluminum, physically launching cans across sorting conveyors.
          </p>

          <p>
            Despite this automation, household contamination remains a major cost driver. Rinsing food residue from metal cans and peanut butter jars, flattening cardboard boxes, and keeping soft plastic film out of curbside bins ensures high commodity purity and ensures materials are successfully converted into secondary industrial feedstocks.
          </p>

          <h2>Container Deposit Legislation (Bottle Bills) & Composting Synergies</h2>

          <p>
            Jurisdictions with established container deposit legislation (commonly known as &apos;bottle bills&apos;) achieve beverage container redemption rates exceeding 80% to 90%, compared to roughly 30% in non-deposit regions. By assigning a direct 5-cent or 10-cent financial value to empty aluminum, glass, and plastic containers, bottle bills generate clean, sorted material streams with contamination rates below 1%.
          </p>

          <p>
            Pairing municipal recycling with residential organics composting creates the ultimate zero-waste diversion synergy. While blue-bin recycling preserves metals, paper, and polymers, green-bin composting captures food scraps and yard trimmings, preventing landfill methane emissions while regenerating depleted agricultural topsoils.
          </p>

          <p>
            To evaluate household water conservation techniques while rinsing recyclables, explore our <Link href="/calculators/environment/water-usage-calculator">Water Usage Calculator</Link> and track power consumption with the <Link href="/calculators/environment/energy-consumption-calculator">Energy Consumption Calculator</Link>.
          </p>
        </>
      }
    >
      <RecyclingSavingsCalculator />
    </CalcPage>
  );
}
