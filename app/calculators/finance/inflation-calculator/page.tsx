import Calculator from "@/components/calcs/finance/inflation-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { CPI_LATEST, cpiFor } from "@/lib/cpi";

const PATH = "/calculators/finance/inflation-calculator";
const DESCRIPTION = `Free inflation calculator using official BLS CPI data from 1913 to ${CPI_LATEST.year}: find what a dollar amount from any year is worth today, or project future prices at an average inflation rate.`;

export const metadata = calcMetadata(PATH, `Inflation Calculator – US Dollar Value 1913–${CPI_LATEST.year} (CPI Data) | CalcDigi`, DESCRIPTION);

const worth = (from: number) => `$${((100 * cpiFor(CPI_LATEST.year)!) / cpiFor(from)!).toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="Inflation Calculator"
      intro="See how much a dollar amount from any year since 1913 is worth today using official US Consumer Price Index data — or project future prices at an average inflation rate."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      article={
        <>
          <h2>How this inflation calculator works</h2>
          <p>
            It uses the <strong>Consumer Price Index for All Urban Consumers (CPI-U)</strong> published by the US Bureau of
            Labor Statistics — the standard measure of US consumer inflation. Each year&rsquo;s value is the average of
            that year&rsquo;s monthly index; the current year uses the most recent month ({CPI_LATEST.month}{" "}
            {CPI_LATEST.year}).
          </p>
          <Formula>Value in year B = Amount × CPI(B) ÷ CPI(A)</Formula>
          <h2>What $100 from past years is worth in {CPI_LATEST.year}</h2>
          <DataTable
            head={["Year", `$100 then equals in ${CPI_LATEST.year}`]}
            rows={[1913, 1950, 1970, 1980, 1990, 2000, 2010, 2020].map((y) => [y, worth(y)])}
          />
          <h2>Average-rate mode</h2>
          <p>
            For future planning there&rsquo;s no CPI yet, so switch to &ldquo;An average rate&rdquo;. The Federal Reserve
            targets 2% inflation over the long run, and US inflation has averaged a little over 3% a year since 1913, so
            2–3% is a reasonable planning range.
          </p>
          <Formula>Future price = Today&rsquo;s price × (1 + rate)^years</Formula>
          <h2>Why inflation matters</h2>
          <ul>
            <li>Cash loses buying power: at 3% inflation, prices double roughly every 24 years.</li>
            <li>Compare salaries, rents and home prices across years in &ldquo;real&rdquo; (inflation-adjusted) terms.</li>
            <li>Retirement plans need to grow income over time, not keep it flat.</li>
          </ul>
        </>
      }
      faq={[
        {
          q: "Why is the current year's value different from the annual average?",
          a: "The year isn't over, so the calculator uses the latest published monthly CPI. Values for complete years use the annual average of all published months.",
        },
        {
          q: "Was any CPI data missing?",
          a: "Yes. BLS did not collect October 2025 data during the federal government shutdown, so the 2025 average uses the 11 published months.",
        },
        {
          q: "Does CPI reflect my personal inflation?",
          a: "Not exactly. CPI tracks a broad basket of goods and services for urban consumers. Your own inflation depends on what you buy — housing, healthcare and childcare costs can rise faster than the average.",
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
