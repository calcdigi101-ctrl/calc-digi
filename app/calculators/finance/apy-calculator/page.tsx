import Calculator from "@/components/calcs/finance/apy-calculator";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { ApyCompoundingFrequencyImpactChart } from "@/components/flagship/finance/editorial-charts";

const PATH = "/calculators/finance/apy-calculator";
const TITLE = "APY Calculator";
const DESCRIPTION =
  "Free APY calculator: convert nominal interest rate (APR) to effective Annual Percentage Yield (APY) across daily, monthly, and quarterly compounding.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/finance", label: "Finance" }}
      title="APY Calculator"
      intro="Convert nominal interest rates to true Annual Percentage Yield (APY). Compare daily, monthly, and quarterly compounding schedules to uncover the real return on savings accounts, CDs, and bonds."
      description={DESCRIPTION}
      appCategory="FinanceApplication"
      mathExpression="\text{APY} = \left(1 + \frac{r}{n}\right)^n - 1"
      article={
        <>
          <h2>Direct Answer: What Is Annual Percentage Yield (APY) &amp; How Does It Differ From APR?</h2>
          <p>
            The <strong>Annual Percentage Yield (APY)</strong> reflects the true total annualized rate of return earned on interest-bearing deposit accounts, taking into account the full compounding effect over a 365-day calendar year. While the <em>nominal interest rate (APR)</em> represents only the stated simple rate applied to account balances, APY incorporates the frequency at which interest is credited—whether annually, quarterly, monthly, or daily.
          </p>
          <p>
            Governed by the federal <strong>Truth in Savings Act (Regulation DD)</strong> and enforced by the Consumer Financial Protection Bureau (CFPB), depository institutions are legally required to display APY prominently on consumer deposit products to ensure transparent comparisons between competing banks.
          </p>

          <ApyCompoundingFrequencyImpactChart />

          <h2>Actuarial Derivation of Effective APY &amp; Inverse APR Formulas</h2>
          <p>
            To convert a nominal contractual interest rate <em>r</em> with compounding frequency <em>n</em> into its effective Annual Percentage Yield (APY):
          </p>

          <Formula>{"\text{APY} = \left(1 + \frac{r}{n}\right)^n - 1"}</Formula>
          <p>
            Where:
            <br />• <strong>APY</strong> = Effective annualized percentage yield (in decimal format, e.g. 0.0512 for 5.12%)
            <br />• <strong>r</strong> = Nominal annual stated interest rate (APR in decimal format, e.g. 0.05 for 5.0%)
            <br />• <strong>n</strong> = Number of compounding intervals per calendar year (1 for annual, 4 for quarterly, 12 for monthly, 365 for daily)
          </p>
          <p>
            In the theoretical limit of continuous compounding (<Formula>{"n \to \infty"}</Formula>), the APY formula converges to Euler&rsquo;s natural exponential:
          </p>
          <Formula>{"\text{APY}_{\text{continuous}} = e^r - 1"}</Formula>
          <p>
            Conversely, to calculate the required nominal interest rate <em>r</em> necessary to deliver a desired target APY:
          </p>
          <Formula>{"r = n \times \left[ (1 + \text{APY})^{1/n} - 1 \right]"}</Formula>

          <h3>Step-by-Step Numerical Calculation Walkthrough</h3>
          <p>
            Consider a commercial bank advertising a <strong>5.00% nominal annual interest rate</strong> (<Formula>{"r = 0.050"}</Formula>). We evaluate effective APY across three distinct institutional compounding conventions:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Monthly Compounding (n = 12):</strong>
              <Formula>{"\text{Periodic Rate} = \frac{0.050}{12} = 0.0041667"}</Formula>
              <Formula>{"\text{APY} = (1 + 0.0041667)^{12} - 1 = (1.0041667)^{12} - 1 = 1.051162 - 1 = 0.05116 \rightarrow 5.116\% \text{ APY}"}</Formula>
            </li>
            <li>
              <strong>Daily Compounding (n = 365):</strong>
              <Formula>{"\text{Daily Rate} = \frac{0.050}{365} = 0.000136986"}</Formula>
              <Formula>{"\text{APY} = (1 + 0.000136986)^{365} - 1 = (1.000136986)^{365} - 1 = 1.051267 - 1 = 0.05127 \rightarrow 5.127\% \text{ APY}"}</Formula>
            </li>
            <li>
              <strong>Continuous Compounding (n → ∞):</strong>
              <Formula>{"\text{APY} = e^{0.050} - 1 = 2.7182818^{0.050} - 1 = 1.051271 - 1 = 0.05127 \rightarrow 5.127\% \text{ APY}"}</Formula>
            </li>
            <li>
              <strong>Dollar Impact on a $100,000 Deposit:</strong> Annual compounding produces $5,000 in interest. Monthly compounding yields $5,116 (+$116 gain). Daily compounding generates $5,127 (+$127 gain), proving daily compounding maximizes cash yield.
            </li>
          </ol>

          <h2>Nominal APR vs. Effective APY Conversion Matrix across Rate Tiers</h2>
          <p>
            The benchmark table below demonstrates how compounding frequencies widen the yield spread between nominal APR and effective APY as interest rates rise:
          </p>

          <DataTable
            head={["Nominal Rate (APR)", "Annual Compounding", "Quarterly Compounding", "Monthly Compounding", "Daily Compounding (365x)"]}
            rows={[
              ["3.00% APR", "3.000% APY", "3.034% APY", "3.042% APY", "3.045% APY (+0.045% spread)"],
              ["4.00% APR", "4.000% APY", "4.060% APY", "4.074% APY", "4.081% APY (+0.081% spread)"],
              ["5.00% APR", "5.000% APY", "5.095% APY", "5.116% APY", "5.127% APY (+0.127% spread)"],
              ["6.00% APR", "6.000% APY", "6.136% APY", "6.168% APY", "6.183% APY (+0.183% spread)"],
              ["8.00% APR", "8.000% APY", "8.243% APY", "8.300% APY", "8.328% APY (+0.328% spread)"],
              ["10.00% APR", "10.000% APY", "10.381% APY", "10.471% APY", "10.516% APY (+0.516% spread)"],
            ]}
          />

          <h2>Deposit Account Yield Comparison: HYSA vs. Money Market vs. CD</h2>
          <p>
            Evaluating APY across retail banking institutions requires assessing yield guarantees and liquidity trade-offs:
          </p>

          <DataTable
            head={["Deposit Vehicle", "Typical Stated APY", "Compounding Schedule", "Rate Stability", "Liquidity Restrictions"]}
            rows={[
              ["High-Yield Savings (HYSA)", "4.25% – 5.10% APY", "Daily, credited monthly", "Variable (moves with Fed rate)", "Immediate liquid transfers"],
              ["Certificate of Deposit (CD)", "4.00% – 5.00% APY", "Daily or monthly", "Fixed for contract duration", "Early withdrawal interest penalties"],
              ["Money Market Account (MMA)", "3.75% – 4.75% APY", "Daily or monthly", "Variable (market driven)", "Check-writing and debit card access"],
              ["Traditional Mega-Bank", "0.01% – 0.05% APY", "Monthly or quarterly", "Variable (artificially depressed)", "Full branch and teller access"],
            ]}
          />

          <h2>Critical Differences: APY vs. APR vs. Dividend Yield</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Annual Percentage Yield (APY):</strong> Used exclusively for deposit accounts and wealth accumulation. APY includes compound interest. Higher is better for the consumer.</li>
            <li><strong>Annual Percentage Rate (APR):</strong> Mandated by TILA for borrowing instruments (credit cards, mortgages). APR combines nominal rate plus mandatory loan fees. Lower is better for the consumer.</li>
            <li><strong>Dividend Yield:</strong> Expressed as annual cash dividends per share divided by stock price. Unlike APY, dividend yield fluctuates daily with equity share prices and does not guarantee future payout stability.</li>
          </ul>

          <h2>Compounding Mechanics: Frequency &amp; The Rule of 72</h2>
          <p>
            While the underlying interest rate and duration timeline have the greatest impact on total return, statutory compounding frequency dictates the <strong>Effective Annual Yield (APY)</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Daily Compounding (365x):</strong> Standard across competitive online High-Yield Savings Accounts (HYSA). An advertised 5.00% nominal rate produces an effective annual yield of <strong>5.127%</strong>.</li>
            <li><strong>Monthly Compounding (12x):</strong> Standard across residential mortgages, installment loans, and certificates of deposit. A 5.00% nominal rate yields <strong>5.116%</strong> APY.</li>
            <li><strong>The Rule of 72 Shortcut:</strong> To quickly approximate the number of years required for deposit balances to double at a fixed rate, divide 72 by the annual return rate. At 6% APY, your money doubles every 12.0 years; at 8% APY, it doubles every 9.0 years.</li>
          </ul>

          <h2>4 Crucial Banking Guidelines When Evaluating APY Disclosures</h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li>
              <strong>Audit Minimum Balance Tier Thresholds:</strong> Many banks advertise attractive 5.0% APYs that apply only to initial balances up to $5,000, while larger balances drop to 0.25% APY.
            </li>
            <li>
              <strong>Differentiate Promotional Teaser Yields:</strong> Promotional APYs often expire after 3 to 6 months. Always confirm the post-promotional default APY to avoid unwanted cash transfer friction.
            </li>
            <li>
              <strong>Inspect Monthly Maintenance Fees:</strong> A $15 monthly service fee eliminates $180 per year, wiping out the entire annual APY interest earnings on a $4,000 cash balance.
            </li>
            <li>
              <strong>Factor State Income Tax Exemption on Treasuries:</strong> For savers in high-tax states (California, New York), a 4.75% Treasury bill yield can outperform a 5.10% HYSA APY after eliminating state tax drag.
            </li>
          </ol>

          <h2>Essential APY Terminology</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-4">
            <li><strong>Truth in Savings Act (Regulation DD):</strong> Federal legislation requiring standardized APY disclosures to assist consumers in evaluating deposit products.</li>
            <li><strong>Daily Periodic Rate:</strong> The nominal interest rate divided by 365 days, applied to daily account balances before compounding.</li>
            <li><strong>Compounding Interval:</strong> The statutory frequency (daily, monthly, quarterly) at which accumulated interest is added to the principal balance.</li>
            <li><strong>Real Yield:</strong> The effective APY minus the rate of inflation, reflecting the true growth of purchasing power.</li>
          </ul>

          <div className="space-y-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
            <h3>Related Deposit &amp; Yield Solvers</h3>
            <p>
              Explore multi-decade wealth compounding with our <a href="/calculators/finance/compound-interest-calculator">Compound Interest Calculator</a>, lock in fixed yields using the <a href="/calculators/finance/cd-calculator">CD Calculator</a>, evaluate borrowing fees via the <a href="/calculators/finance/apr-calculator">APR Calculator</a>, and model liquid cash cushions with the <a href="/calculators/finance/savings-calculator">Savings Calculator</a>.
            </p>
          </div>
        </>
      }
      faq={[
        {
          q: "Why is APY always higher than the nominal interest rate?",
          a: "APY is higher than the nominal interest rate because it accounts for compound interest. When interest is earned, it is added to your balance, so subsequent interest calculations apply to a larger principal sum, generating higher overall yield.",
        },
        {
          q: "How does daily compounding compare to monthly compounding?",
          a: "Daily compounding calculates interest 365 times per year, whereas monthly compounding calculates interest 12 times per year. Daily compounding generates slightly higher effective APY (approximately 0.01% to 0.02% higher on a 5% rate), maximizing returns.",
        },
        {
          q: "Can a bank lower my APY after I open a high-yield savings account?",
          a: "Yes. High-yield savings accounts have variable interest rates. Banks can increase or decrease their APY at any time based on shifts in the Federal Reserve's benchmark federal funds rate. Only fixed-rate CDs guarantee locked APYs.",
        },
        {
          q: "How is APY interest reported to the IRS?",
          a: "Banks report all interest income exceeding $10 annually to you and the IRS on Form 1099-INT. You must pay federal and state ordinary income tax on this interest in the tax year it was earned, regardless of whether you withdraw it.",
        },
        {
          q: "What is the difference between simple interest and APY?",
          a: "Simple interest calculates returns strictly on the initial principal deposit and ignores previous interest earnings. APY reflects the true compound return where earned interest generates additional interest over time.",
        },
        {
          q: "Does APY include bonus signup promotions?",
          a: "Under Regulation DD, upfront cash bonuses cannot be blended directly into the stated APY unless the promotion is structured strictly as an interest rate enhancement. One-time cash bonuses must be disclosed separately.",
        },
        {
          q: "How do I calculate daily interest earnings from APY?",
          a: "Divide the nominal rate by 365 to find your daily periodic rate, then multiply by your account balance. For example, a $50,000 balance at 5.0% nominal rate earns roughly $6.85 per day in interest.",
        },
        {
          q: "What is an effective annual rate (EAR) vs APY?",
          a: "Effective Annual Rate (EAR) and Annual Percentage Yield (APY) are mathematically identical terms representing the true annualized compound return. Banking regulations in the United States use the term APY for consumer disclosures.",
        },
      ]}
      related={[
        { href: "https://www.calcdigi.com/calculators/finance/compound-interest-calculator", icon: "📈", name: "Compound Interest Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/savings-calculator", icon: "🏦", name: "Savings Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/cd-calculator", icon: "🔒", name: "CD Calculator" },
        { href: "https://www.calcdigi.com/calculators/finance/apr-calculator", icon: "📊", name: "APR Calculator" },
      ]}
    >
      <Calculator />
    </CalcPage>
  );
}
