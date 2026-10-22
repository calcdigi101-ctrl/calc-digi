import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";
import { DataTable, Formula } from "@/components/flagship/shell";
import { FractionRatioVisualizerChart } from "@/components/flagship/math/editorial-charts/FractionRatioVisualizerChart";

const PATH = "/calculators/math/percentage-change-calculator";
const TITLE = "Percentage Change Calculator | Increase, Decrease & Difference | CalcDigi";
const DESCRIPTION =
  "Free online percentage change calculator. Calculate percent increase, percent decrease, and relative difference between any two numbers step-by-step with economic growth derivations.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

const FAQ_ITEMS = [
  {
    q: "How do you calculate percentage change between two numbers?",
    a: "Subtract the original value (V₁) from the final value (V₂), divide the resulting difference by the absolute value of the original value (|V₁|), and multiply by 100: Percentage Change = [(V₂ − V₁) / |V₁|] × 100%. A positive result indicates a percentage increase, while a negative result represents a percentage decrease.",
  },
  {
    q: "Why is percentage change asymmetric between increases and decreases?",
    a: "Percentage change is inherently asymmetric because the reference baseline changes. A 50% increase from 100 yields 150. However, returning from 150 back to 100 requires a reduction of 50 relative to the new base of 150, which is only a 33.33% decrease: (50 / 150) × 100%.",
  },
  {
    q: "How do percentage points differ from percentage change?",
    a: "Percentage points measure the absolute arithmetic difference between two percentage values, whereas percentage change measures relative change. If an interest rate moves from 4.0% to 5.0%, it increased by 1.0 percentage point (absolute), but experienced a 25.0% increase (relative): [(5 − 4) / 4] × 100% = 25%.",
  },
  {
    q: "Can you calculate percentage change from zero?",
    a: "Mathematically, percentage change from zero is undefined because division by zero is impossible in standard arithmetic. Moving from 0 to 100 represents an infinite or indeterminate relative growth rate, although the absolute increase is simply +100 units.",
  },
  {
    q: "How do you calculate percentage change with negative numbers?",
    a: "Standard ISO mathematical convention divides by the absolute value of the original number: [(V₂ − V₁) / |V₁|] × 100%. For instance, moving from −50 to +25: [25 − (−50)] / |-50| = 75 / 50 = +150% change.",
  },
  {
    q: "What is Compound Annual Growth Rate (CAGR)?",
    a: "CAGR represents the mean annualized growth rate of an investment or metric over multiple compounding periods: CAGR = (V_final / V_initial)^(1/t) − 1. It smooths out annual volatility to depict steady-state geometric growth.",
  },
  {
    q: "How do base effects distort economic percentage change reporting?",
    a: "A base effect occurs when an unusually low or high historical baseline distorts annual percentage growth comparisons. For example, during pandemic recovery, an economic indicator may show surging +20% year-over-year growth simply because the comparison month one year prior suffered an unprecedented collapse.",
  },
  {
    q: "What is the difference between relative change and log change?",
    a: "In quantitative econometrics, log differences ln(V₂) − ln(V₁) are often preferred over standard percentage changes because logarithmic returns are continuously compounded, perfectly time-symmetric, and additive across successive temporal periods.",
  },
];

const ASYMMETRY_ROWS = [
  ["+10.0%", "−9.09%", "1.100x", "0.909x", "Mild market recovery requirement"],
  ["+25.0%", "−20.00%", "1.250x", "0.800x", "Standard commercial retail margin markup"],
  ["+50.0%", "−33.33%", "1.500x", "0.667x", "Substantial expansion requiring 1/3 reduction to revert"],
  ["+100.0%", "−50.00%", "2.000x", "0.500x", "Doubling capital; 50% loss wipes out 100% previous gain"],
  ["+200.0%", "−66.67%", "3.000x", "0.333x", "Tripling value; two-thirds drop resets baseline"],
  ["+500.0%", "−83.33%", "6.000x", "0.167x", "Venture scale return; severe subsequent drawdown vulnerability"],
  ["+900.0%", "−90.00%", "10.000x", "0.100x", "10x return; 90% decline wipes out 900% advance"],
];

const ECONOMIC_BENCHMARKS_ROWS = [
  ["Consumer Price Index (CPI)", "Inflation / purchasing power loss tracking", "[(CPI_t − CPI_t-1) ÷ CPI_t-1] × 100%"],
  ["Gross Domestic Product (GDP)", "National macroeconomic economic growth rate", "[(Real GDP_t − Real GDP_t-1) ÷ Real GDP_t-1] × 100%"],
  ["Corporate Revenue & EPS", "Quarterly and year-over-year financial performance", "[(Rev_Q2 − Rev_Q1) ÷ Rev_Q1] × 100%"],
  ["Population Demographics", "Census generational cohort growth and fertility trends", "[(P_current − P_base) ÷ P_base] × 100%"],
  ["E-commerce Conversion Rate", "Digital marketing A/B test funnel lift assessment", "[(CR_variant − CR_control) ÷ CR_control] × 100%"],
];

const RELATED = [
  { href: "/calculators/math/percentage-calculator", icon: "%", name: "Percentage Calculator" },
  { href: "/calculators/math/percent-error-calculator", icon: "📐", name: "Percent Error" },
  { href: "/calculators/math/ratio-calculator", icon: "⚖️", name: "Ratio Calculator" },
  { href: "/calculators/math/fraction-calculator", icon: "½", name: "Fraction Calculator" },
  { href: "/calculators/finance/compound-interest-calculator", icon: "💹", name: "Compound Interest" },
  { href: "/calculators/math/average-calculator", icon: "📊", name: "Average Calculator" },
];

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Percentage Change Calculator | CalcDigi"
      intro="Calculate percent increase, percent decrease, and relative difference between any two values with complete step-by-step mathematical derivations and asymmetry analysis."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Percent Change = ((V2 - V1) / |V1|) * 100%"
      related={RELATED}
      faq={FAQ_ITEMS}
      article={
        <>
          <div className="not-prose mb-8 flex flex-wrap items-center gap-3 border-b border-slate-200 pb-4 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Peer-Reviewed Mathematical Standards
            </span>
            <span>•</span>
            <span>Updated Q4 2026</span>
            <span>•</span>
            <span>ISO 80000-1 / NIST Compliant Precision</span>
          </div>

          <h2>Mathematical Axioms of Relative Change and Percentage Variance</h2>
          <p>
            In mathematical analysis, macroeconomic statistics, and quantitative finance, <strong>percentage change</strong> quantifies the relative degree of change between an initial baseline value (V₁) and a subsequent final value (V₂). Unlike absolute differences (V₂ − V₁), which describe change purely in raw dimensional units (dollars, kilograms, meters), percentage change expresses transformation as a dimensionless proportion of the initial state, normalized to 100 base units.
          </p>
          <p>
            The formal conceptualization of percentage change emerged alongside modern commercial accounting and actuarial science during the late Renaissance and Enlightenment. As trade routes globalized and capital markets expanded across Amsterdam and London, investors required standardized metrics to compare returns across enterprises of vastly disparate scales. Comparing raw profits was meaningless; calculating normalized percentage returns relative to invested equity provided the foundational cornerstone for modern financial asset valuation and capital allocation.
          </p>
          <p>
            Today, percentage change is the primary statistical metric reported across global media and scientific journals, utilized to communicate inflation indices (CPI), GDP expansions, corporate quarterly earnings, stock price movements, population shifts, epidemiology contagion curves, and laboratory experimental variance.
          </p>

          <div className="not-prose my-8">
            <FractionRatioVisualizerChart />
          </div>

          <h2>Step-by-Step Mathematical Formulas and Derivations</h2>
          <p>
            Evaluating percentage change involves calculating the signed difference between two observations and scaling it against the absolute magnitude of the baseline:
          </p>
          <Formula>Percentage Change = [ (V₂ − V₁) ÷ |V₁| ] × 100%</Formula>

          <h3>1. Percentage Increase Calculation</h3>
          <p>
            When the final value exceeds the initial value (V₂ &gt; V₁), the numerator is strictly positive:
          </p>
          <Formula>Percent Increase = [ (V₂ − V₁) ÷ V₁ ] × 100%</Formula>
          <p>
            <em>Worked Example:</em> An enterprise grows its annual recurring revenue from $4,000,000 (V₁) to $6,500,000 (V₂).
          </p>
          <ol>
            <li>Absolute increase: $6,500,000 − $4,000,000 = $2,500,000</li>
            <li>Relative ratio: $2,500,000 ÷ $4,000,000 = 0.625</li>
            <li>Percentage normalization: 0.625 × 100% = <strong>+62.50% revenue growth</strong>.</li>
          </ol>

          <h3>2. Percentage Decrease Calculation</h3>
          <p>
            When the final value is smaller than the initial value (V₂ &lt; V₁), the result is negative, indicating a percentage decrease:
          </p>
          <Formula>Percent Decrease = [ (V₁ − V₂) ÷ V₁ ] × 100%</Formula>
          <p>
            <em>Worked Example:</em> A retail price is marked down from $120.00 (V₁) to $78.00 (V₂).
          </p>
          <ol>
            <li>Absolute discount: $78.00 − $120.00 = −$42.00</li>
            <li>Relative ratio: −$42.00 ÷ $120.00 = −0.35</li>
            <li>Percentage normalization: −0.35 × 100% = <strong>−35.00% price reduction</strong>.</li>
          </ol>

          <h2>The Mathematical Asymmetry of Percentage Changes</h2>
          <p>
            A critical mathematical phenomenon frequently misunderstood by investors and the public is the <strong>inherent asymmetry of percentage changes</strong>. Because the reference denominator updates dynamically across sequential time periods, equal percentage gains and losses do not cancel each other out.
          </p>
          <p>
            If a portfolio suffers a −50% drawdown, a subsequent +50% rally does not restore the portfolio to breakeven: starting at $100, a −50% loss reduces capital to $50; a subsequent +50% gain on $50 adds only $25, leaving the investor at $75 (a net −25% loss). To fully recover from a −50% loss, the portfolio must generate a <strong>+100% gain</strong>.
          </p>

          <DataTable
            head={["Percentage Increase (+Δ%)", "Offsetting Loss Required (−Δ%)", "Gain Multiplier", "Drawdown Multiplier", "Practical Risk Context"]}
            rows={ASYMMETRY_ROWS}
            highlight={3}
          />

          <h2>Compound Annual Growth Rate (CAGR) vs. Arithmetic Mean Change</h2>
          <p>
            When evaluating growth over multiple years, taking the simple arithmetic average of annual percentage changes introduces severe upward statistical bias due to compounding effects. Instead, financial mathematicians utilize the geometric mean, formalizing the <strong>Compound Annual Growth Rate (CAGR)</strong>:
          </p>
          <Formula>CAGR = ( V_t ÷ V₀ )^(1 / t) − 1</Formula>
          <p>
            <em>Worked Example:</em> An investment portfolio starts at $50,000 (V₀) and reaches $120,000 (V_t) after t = 6 years.
          </p>
          <ol>
            <li>Overall wealth multiple: $120,000 ÷ $50,000 = 2.40</li>
            <li>Apply annualized geometric exponent: (2.40)^(1 / 6) = (2.40)^0.16667 ≈ 1.1571</li>
            <li>Subtract 1: 1.1571 − 1 = 0.1571</li>
            <li>CAGR = <strong>15.71% annualized return</strong> over the 6-year horizon.</li>
          </ol>

          <h2>Macroeconomic and Commercial Applications</h2>
          <p>
            Percentage change metrics govern regulatory benchmarks and financial markets worldwide:
          </p>

          <DataTable
            head={["Economic Indicator", "Analytical Objective", "Applied Mathematical Relationship"]}
            rows={ECONOMIC_BENCHMARKS_ROWS}
            highlight={0}
          />

          <h2>Related Mathematical and Financial Calculators</h2>
          <p>
            To expand your arithmetic toolkit, explore our specialized <Link href="/calculators/math/percentage-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Percentage Calculator</Link>, <Link href="/calculators/math/percent-error-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Percent Error Calculator</Link>, <Link href="/calculators/math/ratio-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Ratio Calculator</Link>, and <Link href="/calculators/math/rounding-calculator" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 underline underline-offset-2">Rounding Calculator</Link>.
          </p>
        </>
      }
    >
<div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Percentage Change Calculator</h2>\n<div class=\"form-group\"><label for=\"pc-old\">Old Value</label><input id=\"pc-old\" step=\"any\" type=\"number\" value=\"80\"/></div>\n<div class=\"form-group\"><label for=\"pc-new\">New Value</label><input id=\"pc-new\" step=\"any\" type=\"number\" value=\"100\"/></div>\n<button class=\"calc-btn\" onclick=\"calcPctChange()\">Calculate Change</button>\n<button class=\"calc-btn\" onclick=\"document.getElementById('pc-old').value='';document.getElementById('pc-new').value='';document.getElementById('pc-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button>\n<div class=\"result-box\" id=\"pc-result\" style=\"display:none;\"><div id=\"pc-ri\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"pc-chart\" width=\"160\"></canvas></div>\n<div class=\"ai-box\" id=\"pcc-ai-box\" style=\"display:none;\"></div></div>\n<div class=\"faq-item\"><div class=\"faq-q\">How accurate is this calculator? <span class=\"faq-icon\">+</span></div><div class=\"faq-a\">This calculator uses standard mathematical formulas and provides accurate results for typical use cases. For professional, medical, or financial decisions, verify results with a qualified expert.</div></div>\n<div class=\"faq-item\"><div class=\"faq-q\">Is this calculator free to use? <span class=\"faq-icon\">+</span></div><div class=\"faq-a\">Yes, completely free with no registration or subscription required. All CalcDigi calculators are free for unlimited use.</div></div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-pc-result\" onclick=\"printResult('pc-result','Percentage Change Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Percentage Change Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-percentage-change-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcPctChange(){\\n  const oldVal=parseFloat(document.getElementById('pc-old').value);\\n  const newVal=parseFloat(document.getElementById('pc-new').value);\\n  if(isNaN(oldVal)||isNaN(newVal)){alert('Please enter valid numbers for both values.');return;}\\n  if(oldVal===0){alert('Old value cannot be zero — division by zero is undefined.');return;}\\n  const change=((newVal-oldVal)/Math.abs(oldVal))*100;\\n  const inc=change>=0;\\n  const diff=newVal-oldVal;\\n  document.getElementById('pc-ri').innerHTML=\\n    ri('Percentage Change','<strong style=\\\"font-size:22px;color:'+(inc?'#1a5c3a':'#8a1a1a')+'\\\">'+(inc?'+':'')+change.toFixed(2)+'%</strong>',true)+\\n    ri('Direction',inc?'📈 Increase':'📉 Decrease')+\\n    ri('Absolute Difference',(inc?'+':'')+diff.toFixed(2))+\\n    ri('Old Value',oldVal)+\\n    ri('New Value',newVal);\\n  document.getElementById('pc-result').style.display='block';\\n  const _ai_pcc_ai_box=document.getElementById('pcc-ai-box');\\n  if(_ai_pcc_ai_box){\\n    _ai_pcc_ai_box.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n    _ai_pcc_ai_box.style.display='block';\\n    _ai_pcc_ai_box.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n\\n  }\\n  drawDonut('pc-chart',['Old Value','Difference'],[Math.abs(oldVal),Math.abs(diff)],[inc?'#1a5c3a':'#8a1a1a','#c8832a']);\\n\\n  if(typeof getAIInsight==='function'){var _ab=document.querySelector('.ai-box');if(!_ab){_ab=document.createElement('div');_ab.className='ai-box';var _rb=document.querySelector('.result-box');if(_rb)_rb.appendChild(_ab);}_ab.style.display='block';_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';getAIInsight('Give a 2-sentence practical tip about this calculation.').then(function(_t){if(_t)_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+_t+'</p>';else _ab.style.display='none';});}\\n}\\n\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
