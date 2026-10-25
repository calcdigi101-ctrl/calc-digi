import type { Metadata } from "next";
import PartyPlanningCalculator from "@/components/calcs/entertainment/party-planning-calculator";
import { CalcPage } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { PartyDrinksFoodSupplyMatrixChart } from "@/components/flagship/entertainment/editorial-charts";

const PATH = "/calculators/entertainment/party-planning-calculator";
const TITLE = "Party Planning Calculator — Food Portions, Drinks & Ice Supply | CalcDigi";
const DESCRIPTION =
  "Calculate food portions, alcoholic drinks, beer cases, wine bottles, non-alcoholic beverages, and bagged ice for any party size and duration. Features professional catering formulas for BBQs, cocktail parties, and seated dinners.";

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
  { href: "/calculators/entertainment/concert-ticket-calculator", icon: "🎟️", name: "Concert Ticket True Cost Calculator" },
  { href: "/calculators/entertainment/movie-ticket-price-calculator", icon: "🎬", name: "Movie Cinema Outing Cost" },
  { href: "/calculators/entertainment/travel-entertainment-calculator", icon: "✈️", name: "Vacation Entertainment Budget" },
  { href: "/calculators/math/ratio-calculator", icon: "⚖️", name: "Drink & Food Serving Ratios" },
  { href: "/calculators/math/percentage-calculator", icon: "📊", name: "Beverage Mix Percentage Split" },
  { href: "/calculators/finance/compound-interest-calculator", icon: "💰", name: "Event & Holiday Budget Savings" },
];

const FAQ_ITEMS = [
  {
    q: "What is the standard catering rule of thumb for party drinks?",
    a: "Professional event planners and caterers adhere to the universal beverage consumption benchmark: plan for 2 drinks per guest during the first hour of the event, and 1 drink per guest for each subsequent hour (Total Drinks = Guests × [1 + Duration in Hours]). For a 4-hour gathering with 25 guests, plan for: 25 × (1 + 4) = 125 total drink servings.",
  },
  {
    q: "How should I divide alcoholic drinks between beer, wine, and spirits/sodas?",
    a: "Unless you know your guest list possesses specific taste preferences, standard catering distribution assumes: 45% Beer/Hard Seltzers, 30% Wine, and 25% Non-Alcoholic Soft Drinks/Water. If offering a full bar with hard spirits and cocktails, split the alcohol roughly into 40% beer, 30% wine, and 30% spirits. Always provide plenty of sparkling water and non-alcoholic alternatives.",
  },
  {
    q: "How many glasses of wine are in a standard 750ml bottle?",
    a: "A standard 750ml wine bottle pours approximately 5 glasses of wine at a standard 5-ounce (150ml) pour. A standard case of wine contains 12 bottles, providing approximately 60 glasses. To estimate wine needs, divide your target wine servings by 5 (e.g., 40 wine servings requires 40 ÷ 5 = 8 bottles of wine).",
  },
  {
    q: "How much ice do I need for a party?",
    a: "Plan for 1.5 pounds of bagged ice per person for moderate weather gatherings. This accounts for ice placed inside drinking glasses (roughly 0.5 lb per guest) plus bulk ice required to fill ice chest coolers to keep beer, wine, and soda cans chilled (roughly 1.0 lb per guest). If hosting an outdoor summer cookout with temperatures exceeding 80°F (27°C), increase your ice provisioning to 2.0 to 2.5 pounds per person.",
  },
  {
    q: "How much meat should I buy per person for a backyard BBQ?",
    a: "For main course meat (brisket, pulled pork, grilled chicken, ribs, burgers), plan for 1/2 pound (8 ounces / 225 grams) of cooked meat per adult guest if serving multiple hearty side dishes (potato salad, mac & cheese, baked beans). Because raw meat shrinks by roughly 25% to 30% during cooking due to fat rendering and moisture evaporation, purchase roughly 3/4 pound (12 ounces / 340 grams) of raw uncooked meat per guest.",
  },
  {
    q: "How many appetizer hors d'oeuvres should be served per person?",
    a: "If appetizers are served before a seated meal, prepare 4 to 6 pieces per guest. For a standalone evening cocktail reception where no dinner is served, prepare 10 to 14 pieces per guest spread across the evening, ensuring a balanced mix of protein-heavy bites, warm skewers, and lighter vegetarian dips.",
  },
];

export default function PartyPlanningPage() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/entertainment", label: "Entertainment" }}
      title="Party Planning Calculator"
      intro="Calculate food portions, alcoholic drinks, beer cases, wine bottles, non-alcoholic beverages, and bagged ice for any party size and duration. Features professional catering formulas for BBQs, cocktail parties, and seated dinners."
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
                Professional Hospitality &amp; Catering Standards
              </span>
              <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-400">
                Aligned with <strong className="font-semibold text-slate-800 dark:text-slate-200">National Association for Catering and Events (NACE) Guidelines</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span>Event Provisioning Guidelines</span>
              <span>•</span>
              <time dateTime="2026-10-25">Updated October 2026</time>
            </div>
          </div>

          {/* Quick AEO Answer Block */}
          <div className="not-prose mb-8 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/10">
            <div className="mb-2 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400">💡</span> Quick Answer: How Food and Drinks Are Provisioned for a Party
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Party beverage requirements follow the <strong>2-1 Rule</strong>: 2 drinks per guest in the first hour + 1 drink per guest for each additional hour: <strong>Total Drinks = Guests × (1 + Duration)</strong>. For a <strong>4-hour party with 25 guests</strong>, plan for <strong>125 total drink servings</strong>: roughly <strong>56 cans of beer/seltzer</strong> (45%), <strong>8 bottles of wine</strong> (30%, @ 5 glasses/bottle), <strong>31 soft drinks</strong> (25%), and <strong>38 lbs of bagged ice</strong> (1.5 lbs/person). For food, provide <strong>0.5 lb of cooked meat</strong> and <strong>4 appetizer pieces per guest</strong>. Compare event outing budgets with our <a href="/calculators/entertainment/concert-ticket-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">concert ticket calculator</a>, calculate cinema outings with our <a href="/calculators/entertainment/movie-ticket-price-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">movie ticket price calculator</a>, or evaluate beverage portion splits with our <a href="/calculators/math/ratio-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">ratio calculator</a>.
            </p>
          </div>

          <h2>Party Beverage &amp; Ice Provisioning Matrix Across Guest Counts</h2>

          {/* Interactive Visual Editorial Chart (100% Mobile Responsive) */}
          <div className="not-prose my-6">
            <PartyDrinksFoodSupplyMatrixChart />
          </div>

          <p>
            Hosting a gathering—whether a casual backyard summer cookout, an elegant cocktail reception, a milestone birthday celebration, or a game day watch party—is an art that relies heavily on science. Running out of beverages or ice halfway through an evening is every host's worst nightmare; conversely, massively over-purchasing perishable catering food leads to unnecessary budget waste and packed refrigerator leftovers.
          </p>
          <p>
            Professional catering directors manage this balance by applying strict mathematical portioning formulas based on guest headcount, event duration, and gathering format. To evaluate beverage percentage allocations, use our <a href="/calculators/math/percentage-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">percentage calculator</a>, plan travel entertainment logistics with our <a href="/calculators/entertainment/travel-entertainment-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">travel entertainment calculator</a>, and calculate annual party budget projections using our <a href="/calculators/finance/compound-interest-calculator" className="font-semibold text-blue-600 underline hover:text-blue-800 dark:text-blue-400">compound interest calculator</a>.
          </p>

          <Formula>
            <div className="font-sans text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Standard Event Provisioning Formulation</div>
            Drinks_Per_Guest = 2 + Max(0, Event_Hours - 1)
            <br />
            Total_Beverage_Servings = Guest_Count * Drinks_Per_Guest
            <br />
            Beer_Cans = Round(Total_Beverage_Servings * 0.45)
            <br />
            Wine_Bottles_750ml = Ceil((Total_Beverage_Servings * 0.30) / 5)
            <br />
            Non_Alcoholic_Servings = Round(Total_Beverage_Servings * 0.25)
            <br />
            Bagged_Ice_Lbs = Ceil(Guest_Count * 1.5)
            <br />
            Cooked_Meat_Lbs = Guest_Count * 0.50
          </Formula>

          <h2>Standard Catering Portions: Food Rules of Thumb</h2>
          <p>
            Food demand varies depending on whether an event replaces a full meal or serves purely as a social cocktail gathering:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Cocktail Reception (No Dinner):</strong> If the party spans 5:00 PM to 8:00 PM, guests expect substantial hors d'oeuvres that substitute for an evening meal. Plan for 10 to 14 bite-sized appetizer pieces per person. Balance 40% protein bites (sliders, skewers, meatballs), 40% starch/veg (bruschetta, spring rolls, dips), and 20% dessert sweets.
            </li>
            <li>
              <strong>Dinner Buffet / BBQ Cookout:</strong> Plan for 0.5 lb (8 oz / 225g) of cooked protein per person. If serving chicken with bone-in or unpulled ribs, increase raw purchase weight to 0.75–1.0 lb per guest. Accompany with 4 to 6 ounces of starchy sides (potatoes, pasta, rice) and 3 ounces of greens or vegetables per guest.
            </li>
            <li>
              <strong>Dessert Table:</strong> Plan for 1 to 2 dessert portions per guest (e.g., 1 slice of celebration cake plus 1 cookie or brownie bite).
            </li>
          </ul>

          <p className="font-semibold text-sm mb-2 text-slate-700 dark:text-slate-300">Catering Food &amp; Beverage Portions per 25 Guests (4-Hour Event)</p>
          <DataTable
            head={["Provisioning Category", "Portion Rule per Person", "Total Quantity for 25 Guests", "Total Quantity for 50 Guests", "Storage & Serving Tips"]}
            rows={[
              ["Beer & Hard Seltzers", "2.25 cans / guest", "56 cans (2.3 cases of 24)", "113 cans (4.7 cases of 24)", "Chill in tubs on ice 3 hrs before party"],
              ["Table Wine (750ml)", "0.3 bottles / guest", "8 bottles (5 red, 3 white)", "15 bottles (9 red, 6 white)", "White at 45°F–50°F, red at 62°F–65°F"],
              ["Soft Drinks & Water", "1.25 cans / guest", "31 cans / bottles", "63 cans / bottles", "Offer sparkling seltzers & lemon water"],
              ["Bagged Ice (Chilling & Cups)", "1.5 lbs / guest", "38 lbs (4 × 10 lb bags)", "75 lbs (8 × 10 lb bags)", "Keep drink ice separate from bottle ice"],
              ["Cooked BBQ / Main Meat", "0.5 lbs / guest", "12.5 lbs cooked (~17 lbs raw)", "25.0 lbs cooked (~34 lbs raw)", "Keep hot food above 140°F (60°C)"],
              ["Appetizer Finger Bites", "4 - 5 pieces / guest", "100 - 125 pieces", "200 - 250 pieces", "Serve in staggered waves every 45 mins"],
            ]}
          />

          <h2>Ice Logistics: The Most Common Party Planning Oversight</h2>
          <p>
            More amateur parties run out of ice than running out of alcohol. Ice performs two critical, non-negotiable functions at any social gathering:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Glass Ice:</strong> Clean, food-grade ice placed directly inside guest glasses for highballs, cocktails, and iced tea (averaging 0.5 to 0.75 lb per guest).
            </li>
            <li>
              <strong>Cooler Chilling Ice:</strong> Bulk ice packed into coolers to chill warm beer, wine, and soda cans down to 38°F (averaging 1.0 lb per guest).
            </li>
          </ol>
          <p>
            <strong>Critical Health Rule:</strong> Never scoop ice for drinking glasses out of the same cooler where dirty beer bottles and beverage cans are submerged in meltwater. Always keep a dedicated, covered ice bucket with an ice scoop reserved exclusively for drink glassware.
          </p>

          <h2>Glassware, Tableware and Waste Management Logistics</h2>
          <p>
            An often overlooked catering detail that derails otherwise flawless parties is tableware and glassware attrition:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Glassware Attrition (The Lost Cup Effect):</strong> Guests frequently put down their drink cup to talk, dance, or play lawn games and subsequently forget which cup is theirs. Always plan for <strong>2 to 2.5 drinking cups per person</strong> for casual events. Providing a permanent marker near drink dispensers so guests can write their names on cups reduces cup consumption by over 40%.
            </li>
            <li>
              <strong>Plates and Flatware:</strong> Provide 1.5 appetizer plates, 1 dinner plate, and 1 dessert plate per guest, accompanied by 2 forks and 2 napkins per person. Heavy-duty compostable palm leaf or bamboo plates provide rigid structural stability for BBQ meats without the environmental guilt of single-use polystyrene foam.
            </li>
            <li>
              <strong>Sanitation &amp; Trash Disposal:</strong> Position trash and recycling receptacles in pairs immediately adjacent to beverage bars and food buffets. Plan for at least one heavy-duty 30-gallon contractor trash bag per 15 guests.
            </li>
          </ul>

          <h2>Smart Beverage Shopping: Return Policies and Bulk Cases</h2>
          <p>
            When purchasing alcohol for large events, take advantage of big-box beverage retailers (such as Total Wine &amp; More, BevMo, and Costco). Many wholesale liquor retailers permit returning unopened, undamaged cases of beer and wine with original receipts after your event concludes. Purchasing full 12-bottle wine cases often qualifies for automatic 10% to 15% case discounts, allowing hosts to purchase an extra safety margin case with zero financial downside.
          </p>
        </>
      }
    >
      <PartyPlanningCalculator />
    </CalcPage>
  );
}
