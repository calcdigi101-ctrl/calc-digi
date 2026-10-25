import type { Metadata } from "next";
import Link from "next/link";
import TipCalculatorComponent from "@/components/calcs/food/tip-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { HospitalityTipPercentageBenchmarkChart } from "@/components/flagship/food/editorial-charts";

const PATH = "/calculators/food/tip-calculator";
const TITLE = "Tip Calculator | Restaurant Bill Split, Gratuity % & Tax Allocation";
const DESCRIPTION =
  "Calculate restaurant tips, sales tax, total dining check splits per person, and hospitality gratuity percentiles for casual and fine dining.";

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
  { href: "/calculators/food/food-cost-calculator", icon: "💵", name: "Food Cost Calculator" },
  { href: "/calculators/food/alcohol-unit-calculator", icon: "🍷", name: "Alcohol Unit Calculator" },
  { href: "/calculators/food/coffee-caffeine-calculator", icon: "☕", name: "Coffee Caffeine Calculator" },
  { href: "/calculators/food/recipe-scaler", icon: "📐", name: "Recipe Scaler" },
  { href: "/calculators/food/nutrition-calculator", icon: "🥗", name: "Nutrition Calculator" },
  { href: "/calculators/food/cooking-conversion-calculator", icon: "⚖️", name: "Cooking Conversion" },
];

export default function TipCalculatorPage() {
  return (
    <CalcPage
      path={PATH}
      intro={DESCRIPTION}
      category={{ href: "/pages/food", label: "Food & Cooking" }}
      title={TITLE}
      description={DESCRIPTION}
      related={RELATED_CALCULATORS}
      article={
        <>
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/40 dark:bg-amber-950/20 text-sm leading-relaxed mb-6">
            <p className="font-semibold text-amber-900 dark:text-amber-300 mb-1">
              Hospitality Economics Summary: Pre-Tax Gratuity Standard
            </p>
            <p className="text-amber-800 dark:text-amber-200/90">
              In United States restaurant dining etiquette, gratuity is standardly calculated against the pre-tax food and beverage subtotal. Standard service benchmarks range from 18% for attentive service to 20% or 22% for exceptional hospitality. Restaurant food expenditures connect directly with recipe portion margins in our{" "}
              <Link href="/calculators/food/food-cost-calculator" className="font-medium underline hover:text-amber-900">
                food cost calculator
              </Link>{" "}
              and beverage pacing in the{" "}
              <Link href="/calculators/food/alcohol-unit-calculator" className="font-medium underline hover:text-amber-900">
                alcohol unit calculator
              </Link>.
            </p>
          </div>

          <h2>Hospitality Gratuity Economics & Guest Check Mathematics</h2>
          <HospitalityTipPercentageBenchmarkChart />
          <p>
            In the United States and Canada, the hospitality labor model operates under the tipped minimum wage credit codified in Section 3(m) of the Fair Labor Standards Act (FLSA). Because dining room waitstaff, bussers, and bartenders often receive a direct cash wage significantly below the federal minimum wage, voluntary customer gratuities constitute the primary financial livelihood of service staff.
          </p>
          <p>
            While some modern point-of-sale (POS) touchscreens compute suggested tip percentages on the post-tax grand total, classical consumer finance recommends applying tip percentages strictly to the food and beverage subtotal. This prevents diners from tipping on local municipal sales taxes. Beverage intake tracking can be cross-verified in our{" "}
            <Link href="/calculators/food/coffee-caffeine-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              coffee caffeine calculator
            </Link>:
          </p>

          <Formula>
            {"\text{Tip Amount (\$)} = \text{Subtotal (\$)} \times \left(\frac{\text{Tip \%}}{100}\right)"}
          </Formula>

          <Formula>
            {"\text{Grand Total (\$)} = \text{Subtotal} + \text{Tip Amount} + \left(\text{Subtotal} \times \frac{\text{Sales Tax \%}}{100}\right)"}
          </Formula>

          <Formula>
            {"\text{Per Diner Share (\$)} = \frac{\text{Grand Total (\$)}}{\text{Number of Diners (N)}}"}
          </Formula>

          <Formula>
            {"\text{Post-Tax vs Pre-Tax Discrepancy} = \text{Tax (\$)} \times \left(\frac{\text{Tip \%}}{100}\right)"}
          </Formula>

          <h2>Standard Hospitality Gratuity Percentiles & Service Modality Table</h2>
          <p>
            The benchmark matrix below establishes standard gratuity percentiles across varying dining formats, party configurations, and service environments:
          </p>

          <DataTable
            head={[
              "Service Modality / Dining Format",
              "Baseline Tip %",
              "Standard Tip %",
              "Exceptional Tip %",
              "Mandatory Auto-Gratuity Rule",
              "Industry Tipping Protocol",
            ]}
            rows={[
              ["Full-Service Casual Dining", "15.0%", "18.0% - 20.0%", "22.0% - 25.0%", "Parties of 6+ (typically 18%)", "Pre-tax subtotal standard"],
              ["Fine Dining & Tasting Menus", "18.0%", "20.0% - 22.0%", "25.0% - 30.0%", "Commonly 20% on all checks", "Sommelier wine split included"],
              ["Fast-Casual / Counter Service", "0.0%", "10.0% - 15.0%", "18.0%", "None", "Optional digital prompt"],
              ["Specialty Coffee Barista", "$0.50 / drink", "$1.00 / drink", "15.0% - 20.0%", "None", "Per-crafted beverage basis"],
              ["Bartender / Cocktails & Beer", "$1.00 / beer", "$2.00 / cocktail", "20.0% of tab", "Often 18% for walkout tabs", "Per-drink or percentage"],
              ["Food Delivery (DoorDash/UberEats)", "$3.00 minimum", "15.0% - 20.0%", "22.0%+", "None (in-app prompt)", "Distance and weather weighted"],
              ["Catering Banquet Buffet", "15.0%", "18.0%", "20.0%", "Usually included as service fee", "Distributed to culinary team"],
            ]}
          />

          <h2>Worked Analytical Scenario: Splitting a Multi-Course Dinner Check</h2>
          <p>
            Consider a social dining party of 4 colleagues celebrating at a casual bistro. The meal includes shared appetizers, entrees timed by the kitchen via our{" "}
            <Link href="/calculators/food/cooking-time-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              cooking time calculator
            </Link>, desserts scaled via the{" "}
            <Link href="/calculators/food/recipe-scaler" className="font-medium text-emerald-600 underline dark:text-emerald-400">
              recipe scaler
            </Link>, and fine wine:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>Itemized Subtotal:</strong> Food subtotal = $140.00. Wine and beverages = $60.00. Total pre-tax subtotal = $200.00.
            </li>
            <li>
              <strong>Local Sales Tax:</strong> State and municipal dining tax of 8.875%:
              <Formula>
                {"\text{Sales Tax} = \$200.00 \times 0.08875 = \$17.75"}
              </Formula>
            </li>
            <li>
              <strong>Standard Service Gratuity (20%):</strong> Calculated on the $200.00 pre-tax subtotal:
              <Formula>
                {"\text{Tip Amount} = \$200.00 \times 0.20 = \$40.00"}
              </Formula>
            </li>
            <li>
              <strong>Grand Total Bill:</strong>
              <Formula>
                {"\text{Grand Total} = \$200.00\,(\text{subtotal}) + \$17.75\,(\text{tax}) + \$40.00\,(\text{tip}) = \$257.75"}
              </Formula>
            </li>
            <li>
              <strong>Equal Per-Person Split (4 Diners):</strong>
              <Formula>
                {"\text{Per Person} = \frac{\$257.75}{4} = \$64.44\,\text{per person}"}
              </Formula>
              (Each diner contributes $50.00 food/beverage, $4.44 tax, and $10.00 gratuity).
            </li>
            <li>
              <strong>Nutritional & Calorie Tracking:</strong> The diners check caloric intake and dietary macros using our{" "}
              <Link href="/calculators/food/nutrition-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                nutrition calculator
              </Link>{" "}
              and monitor next-day exercise burn in the{" "}
              <Link href="/calculators/food/calorie-burn-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                calorie burn calculator
              </Link>.
            </li>
          </ul>

          <h2>Tip Pooling, Service Charges & Fair Labor Standards Act (FLSA) Rules</h2>
          <p>
            In many restaurants, customer gratuities do not stay solely with the primary server. Under federal Department of Labor (DOL) regulations updated in 2021, employers may mandate valid tip pooling arrangements. In a traditional tip pool, servers contribute 20% to 30% of their gross tips to bussers, food runners, and service bartenders.
          </p>
          <p>
            However, managers, supervisors, and owners are strictly prohibited by federal law from retaining any portion of employee tips, regardless of whether a tip pool exists. In contrast, mandatory &quot;service charges&quot; (such as automatic 20% gratuities on large parties) legally belong to the restaurant enterprise, which may distribute them as wages or retain them for operating overhead.

          <h2>Jurisdictional Tip Credit Disparities & Credit Card Fee Deductions</h2>
          <p>
            The legal landscape governing server compensation diverges profoundly across state jurisdictions within the United States. Under federal guidelines, employers may claim a tip credit against the statutory $7.25 minimum wage, paying direct cash wages as low as $2.13 per hour provided employee tips make up the difference. However, seven states—including California, Washington, Oregon, Nevada, Alaska, Montana, and Minnesota—have completely abolished the tip credit. In these jurisdictions, restaurant operators must pay the full state or municipal minimum wage (often $16.00 to $20.00 per hour) directly, prior to any employee receipt of customer tips.
          </p>
          <p>
            Another complex legal dimension involves credit card interchange processing fee deductions. When a customer charges a tip on a credit card, credit card merchant processors assess a 2.0% to 3.5% transaction processing fee. In federal court precedents and multiple states, employers are permitted to deduct the actual transactional percentage cost attributable to the tip amount before paying out credit card tips to service staff. For example, on a $50 credit card tip subject to a 2.5% interchange fee, the employer may remit $48.75 to the server.
          </p>
          </p>

          <h2>Operational Pitfalls, Point-of-Sale (POS) Bias & Cash Etiquette</h2>
          <p>
            Navigating modern tipping practices requires understanding several subtle nuances:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <strong>The POS Post-Tax Calculation Bias:</strong> Contemporary digital touchscreen terminals often prompt diners with default percentage buttons computed against the grand post-tax total. In metropolitan districts with high municipal dining and beverage excise taxes (exceeding 10%), this user-interface nudge inflates server gratuities beyond standard expectations, creating significant friction unless diners manually adjust the tip basis. Many cloud point-of-sale touchscreens automatically compute tip buttons (e.g., 18%, 20%, 25%) on the grand total including sales tax, artificially inflating tip amounts by 1% to 3% of the subtotal.
            </li>
            <li>
              <strong>Double Tipping on Auto-Gratuity:</strong> For parties of 6 or more, restaurants frequently add an automatic 18% or 20% service gratuity directly onto the itemized bill. Diners often overlook this line and inadvertently leave an additional 20% tip.
            </li>
            <li>
              <strong>Kitchen Formulation & Ingredient Yield:</strong> High restaurant prices that drive tip totals reflect premium ingredient costing calculated in our{" "}
              <Link href="/calculators/food/food-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                food cost calculator
              </Link>{" "}
              and specialized baking labor in the{" "}
              <Link href="/calculators/food/baking-substitution-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                baking substitution calculator
              </Link>.
            </li>
            <li>
              <strong>Accurate Liquid Measurement:</strong> Wine and beverage measures that comprise the beverage subtotal rely on volume consistency verified in our{" "}
              <Link href="/calculators/food/cooking-conversion-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                cooking conversion calculator
              </Link>.
            </li>
          </ul>

          <h2>Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Should tips be calculated on the pre-tax subtotal or the post-tax total?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Etiquette authorities and financial experts universally recommend calculating tips on the pre-tax subtotal. Sales tax is a government assessment, not a hospitality service rendered by your dining room server.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                What is the standard tip percentage in the United States today?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                The standard baseline tip in US sit-down full-service restaurants is currently 18% to 20% for good to excellent service. 15% is considered acceptable for baseline service, while 22% to 25% is customary for exceptional hospitality or fine dining.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Do you tip the same percentage on wine and alcoholic beverages?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Yes, standard tipping applies to the entire beverage and food subtotal. However, if ordering exceptionally rare, high-value vintage wine bottles ($200+ per bottle), some diners tip 15% on the wine portion and 20% on the culinary food courses.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does tip pooling work among restaurant kitchen and dining staff?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                In many dining rooms, servers tip out a percentage of their gross sales (typically 3% to 5%) to support staff such as bussers, bartenders, and food runners. If a customer leaves 0% tip, the server still has to tip out support staff out-of-pocket for that table.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How do restaurant operators factor tipping into prime labor costs?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Customer gratuities allow restaurants to retain talented front-of-house staff while keeping prime labor costs within the 30% to 35% target range analyzed in our{" "}
                <Link href="/calculators/food/food-cost-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  food cost calculator
                </Link>.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                How does alcohol consumption affect overall hospitality check totals?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Alcohol beverages tracked with our{" "}
                <Link href="/calculators/food/alcohol-unit-calculator" className="font-medium text-emerald-600 underline dark:text-emerald-400">
                  alcohol unit calculator
                </Link>{" "}
                often account for 30% to 50% of the guest check, substantially increasing gratuities earned by service staff.
              </p>
            </div>
          </div>

          <h2>Authoritative Hospitality Labor Standards & Legal Citations</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>US Department of Labor (Wage and Hour Division):</strong> Fact Sheet #15: Tipped Employees Under the Fair Labor Standards Act (FLSA).
            </li>
            <li>
              <strong>Internal Revenue Service (IRS Publication 531):</strong> Reporting Tip Income and employer tip rate determination agreements.
            </li>
            <li>
              <strong>National Restaurant Association (NRA):</strong> Guidelines for Dining Room Gratuity Policies and Service Charge Compliance.
            </li>
            <li>
              <strong>Cornell Center for Hospitality Research:</strong> Empirical investigations on tipping behavior, service quality, and payment interface psychology.
            </li>
          </ul>
        </>
      }
    >
      <TipCalculatorComponent />
    </CalcPage>
  );
}
