import Calculator from "@/components/calcs/finance/inflation-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CPI_LATEST, cpiFor } from "@/lib/cpi";
import { InflationPurchasingPowerDecayChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/inflation-calculator";
const TITLE = `Inflation Calculator – US CPI Historical Dollar Value (1913–${CPI_LATEST.year}) | CalcDigi`;
const DESCRIPTION =
  `Free US inflation calculator using official Bureau of Labor Statistics (BLS) CPI-U data from 1913 to ${CPI_LATEST.year}. Calculate historical purchasing power, future price projections, and compound purchasing power decay.`;

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const worth = (from: number) =>
  `$${((100 * cpiFor(CPI_LATEST.year)!) / cpiFor(from)!).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Inflation Calculator"
      intro={`Calculate the real purchasing power of the US Dollar from 1913 through ${CPI_LATEST.year} using official Bureau of Labor Statistics (BLS) Consumer Price Index (CPI-U) data, or project future price inflation.`}
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="Value_B = Value_A * (CPI_B / CPI_A)"
      article={
        <>
          <h2>Direct Answer: What Is Inflation &amp; How Does the BLS CPI Purchasing Power Formula Work?</h2>
          <p>
            <strong>Inflation</strong> is the persistent macroeconomic rise in the overall price level of goods and services across an economy, which conversely causes a continuous decline in the purchasing power of money. In the United States, official consumer inflation is tracked by the Bureau of Labor Statistics (BLS) through the <strong>Consumer Price Index for All Urban Consumers (CPI-U)</strong>, representing a weighted basket of food, energy, housing, transportation, and medical expenditures. Comparing the purchasing power of money across historical years requires multiplying by the ratio of the respective annual index values.
          </p>

          <Formula>Dollar Value in Target Year B = Dollar Amount in Year A × [CPI_YearB ÷ CPI_YearA]</Formula>
          <Formula>Future Projected Price = Current Price × (1 + Annual Inflation Rate)^Years</Formula>
          <Formula>Real Purchasing Power of Fixed Cash = Cash Amount ÷ (1 + Annual Inflation Rate)^Years</Formula>

          <InflationPurchasingPowerDecayChart />

          <h2>Historical Purchasing Power: What $100 in Past Years Equals in {CPI_LATEST.year}</h2>
          <p>
            The table below shows the exact dollar amount required in {CPI_LATEST.year} to purchase the equivalent volume of goods and services that a $100 bill purchased in selected historical years:
          </p>

          <DataTable
            head={["Historical Base Year", `What $100 Was Worth`, `Equivalent Buying Power in ${CPI_LATEST.year}`, "Cumulative Inflation Multiplier"]}
            rows={[
              ["1913 (Federal Reserve Created)", "$100.00", worth(1913), "~32.5x Increase"],
              ["1950 (Post-WWII Boom)", "$100.00", worth(1950), "~12.8x Increase"],
              ["1970 (Bretton Woods Era)", "$100.00", worth(1970), "~7.9x Increase"],
              ["1980 (Volcker Disinflation Peak)", "$100.00", worth(1980), "~3.7x Increase"],
              ["1990 (Turn of the Decade)", "$100.00", worth(1990), "~2.3x Increase"],
              ["2000 (Dot-Com Peak)", "$100.00", worth(2000), "~1.8x Increase"],
              ["2010 (Post-Great Recession)", "$100.00", worth(2010), "~1.4x Increase"],
              ["2020 (Pre-Pandemic Baseline)", "$100.00", worth(2020), "~1.2x Increase"],
            ]}
          />

          <h2>The Rule of 70 Mental Shortcut &amp; Asset Protection</h2>
          <ul>
            <li>
              <strong>The Rule of 70:</strong> Divide 70 by the annual inflation rate to calculate how many years it will take for general prices to double (and your cash buying power to be cut in half). At 2.5% inflation, prices double every 28 years; at 3.5%, every 20 years; at 7.0%, every 10 years.
            </li>
            <li>
              <strong>The Cash Drag Penalty:</strong> Leaving long-term capital in zero-interest checking accounts guarantees negative real returns. Over a 25-year career, an uninvested $50,000 emergency buffer loses over 55% of its real purchasing power at historical 3.2% average inflation.
            </li>
            <li>
              <strong>Inflation Hedges:</strong> Historically, broad equity index funds (S&amp;P 500, total stock market), real estate, and Treasury Inflation-Protected Securities (TIPS) have outpaced CPI inflation over 10+ year rolling horizons.
            </li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Real Purchasing Power &amp; Wealth Solvers</h3>
            <p>
              Long-term financial planning must account for the persistent purchasing power erosion of inflation. Model real, inflation-adjusted portfolio returns with our <a href="/calculators/finance/investment-calculator">Investment Calculator</a>, project exponential growth using the <a href="/calculators/finance/compound-interest-calculator">Compound Interest Calculator</a>, determine future retirement spending needs via the <a href="/calculators/finance/retirement-calculator">Retirement Calculator</a>, and maximize yield on liquid funds with our <a href="/calculators/finance/savings-calculator">Savings Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "What is the difference between Headline CPI and Core CPI?",
          a: "Headline CPI measures price changes across the entire basket of consumer goods and services, including food and energy. Core CPI strips out food and energy prices because they exhibit high short-term commodity price volatility, providing central banks with a clearer view of underlying structural inflation trends.",
        },
        {
          q: "How does the Federal Reserve target inflation?",
          a: "The US Federal Reserve maintains an explicit statutory target of 2.0% annual inflation, measured primarily by the Personal Consumption Expenditures (PCE) price index. The Fed raises the federal funds interest rate to cool an overheating economy or lowers rates to stimulate economic activity.",
        },
        {
          q: "Why does my personal cost of living feel higher than official CPI?",
          a: "The CPI-U is a statistical composite average for urban consumers nationwide. Individual households experience 'personal inflation' based on their specific lifestyle. Households spending large shares of income on childcare, college tuition, medical insurance, or urban rent face higher personal inflation than households with paid-off homes and fixed living expenses.",
        },
        {
          q: "What are TIPS (Treasury Inflation-Protected Securities)?",
          a: "TIPS are bonds issued by the US Department of the Treasury whose principal value increases with inflation as measured by the CPI. When inflation rises, the bond's principal adjusts upward, ensuring your investment and semi-annual interest payments keep pace with inflation.",
        },
      ]}
      related={[
        { href: "/calculators/finance/compound-interest-calculator", icon: "📈", name: "Compound Interest" },
        { href: "/calculators/finance/retirement-calculator", icon: "🌅", name: "Retirement" },
        { href: "/calculators/finance/investment-calculator", icon: "💼", name: "Investment" },
        { href: "/calculators/finance/salary-calculator", icon: "💵", name: "Salary" },
        { href: "/calculators/finance/savings-calculator", icon: "🏦", name: "Savings" },
        { href: "/calculators/finance/currency-converter", icon: "💱", name: "Currency Converter" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
