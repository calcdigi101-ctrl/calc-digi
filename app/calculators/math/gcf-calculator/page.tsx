import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/gcf-calculator";
const TITLE = "GCF Calculator – Greatest Common Factor | CalcDigi";
const DESCRIPTION = "Find the Greatest Common Factor of two or more numbers instantly using the Euclidean algorithm with step-by-step explanation.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="GCF Calculator"
      intro="Find the Greatest Common Factor (also called GCD — Greatest Common Divisor) of two or more numbers instantly using the efficient Euclidean algorithm. Essential for simplifying fractions and solving number theory problems."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Euclidean Algorithm: GCF(a, b) = GCF(b, a mod b), repeat until remainder = 0"
      related={[
        {
                "href": "/calculators/math/lcm-calculator",
                "icon": "🔢",
                "name": "LCM Calculator"
        },
        {
                "href": "/calculators/math/fraction-calculator",
                "icon": "½",
                "name": "Fraction Calculator"
        },
        {
                "href": "/calculators/math/prime-number-checker",
                "icon": "🔍",
                "name": "Prime Checker"
        },
        {
                "href": "/calculators/math/factorial-calculator",
                "icon": "❗",
                "name": "Factorial Calculator"
        }
]}
      faq={[
        {
                "q": "What is the GCF of 12 and 18?",
                "a": "The GCF is 6. Both 12 and 18 divide evenly by 6 (12÷6=2, 18÷6=3), and no larger number works for both."
        },
        {
                "q": "How is GCF used in simplifying fractions?",
                "a": "Divide both numerator and denominator by their GCF to fully simplify a fraction. For 12/18, GCF=6, so 12/18 simplifies to 2/3."
        },
        {
                "q": "What is the difference between GCF and LCM?",
                "a": "GCF is the largest number that divides all given numbers. LCM is the smallest number that all given numbers divide into. They are related by: GCF(a,b) × LCM(a,b) = a × b."
        },
        {
                "q": "Can GCF be used for more than two numbers?",
                "a": "Yes. For three or more numbers, compute GCF iteratively: GCF(a,b,c) = GCF(GCF(a,b), c). Our calculator handles any number of inputs automatically."
        }
]}
      html={"<div class=\"content-section\">\n<h2>What is the Greatest Common Factor?</h2>\n<p>The Greatest Common Factor (GCF) of two or more numbers is the largest positive integer that divides all the given numbers exactly, leaving no remainder. It is also commonly referred to as the Greatest Common Divisor (GCD) or Highest Common Factor (HCF).</p>\n<p>For example, to find GCF(24, 36): the factors of 24 are 1, 2, 3, 4, 6, 8, 12, 24 and the factors of 36 are 1, 2, 3, 4, 6, 9, 12, 18, 36. The largest number appearing in both lists is 12, so GCF(24, 36) = 12.</p>\n<div class=\"formula-box\">Euclidean Algorithm: GCF(a, b) = GCF(b, a mod b), repeat until remainder = 0</div>\n<div class=\"content-section\">\n<h2>Step-by-Step Example</h2>\n<p>Find GCF(48, 18) using the Euclidean algorithm:</p>\n<ol>\n<li>48 ÷ 18 = 2 remainder <strong>12</strong></li>\n<li>18 ÷ 12 = 1 remainder <strong>6</strong></li>\n<li>12 ÷ 6 = 2 remainder <strong>0</strong></li>\n<li>Remainder is 0, so GCF(48, 18) = <strong>6</strong></li>\n</ol>\n</div>\n<div class=\"content-section\">\n<h2>Real-World Uses of GCF</h2>\n<ul>\n<li><strong>Simplifying fractions:</strong> Divide numerator and denominator by GCF to get lowest terms</li>\n<li><strong>Splitting into equal groups:</strong> GCF tells you the maximum group size for equal distribution</li>\n<li><strong>Cutting material:</strong> Finding the largest equal piece you can cut from multiple lengths</li>\n<li><strong>Algebra:</strong> Factoring out the GCF from polynomial expressions</li>\n</ul>\n</div>\n<div class=\"content-section\"><h2>How to Use This Calculator</h2>\n<p>Enter your values into the input fields above and click Calculate for instant results. All calculations run in your browser — no data is sent to any server, ensuring complete privacy. Use the Copy button to save your results and the Share button to send a link to this calculator.</p>\n<h3>Understanding Your Results</h3>\n<p>Results are based on the formula and inputs provided. For important financial, medical, or legal decisions, always verify results with a qualified professional. This tool is designed to give quick, reliable estimates for planning and educational purposes.</p>\n<h3>Tips for Accurate Calculations</h3>\n<p>Always double-check your input values and units before calculating. Small input errors can significantly affect results. Use the Reset button to clear all fields and start fresh. For multi-step calculations, use the result of one calculation as the input for the next.</p>\n<h3>Reference Guide</h3>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"width:100%;border-collapse:collapse;font-size:14px;\">\n<thead><tr style=\"background:var(--c-accent);color:#fff;\">\n<th style=\"padding:10px 14px;text-align:left;\">Term</th>\n<th style=\"padding:10px 14px;text-align:left;\">Meaning</th>\n<th style=\"padding:10px 14px;text-align:left;\">Example</th>\n</tr></thead>\n<tbody>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Input</td><td style=\"padding:10px 14px;\">Value you enter into the calculator</td><td style=\"padding:10px 14px;\">Amount, rate, or quantity</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Output</td><td style=\"padding:10px 14px;\">Calculated result shown after clicking Calculate</td><td style=\"padding:10px 14px;\">Final answer or converted value</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Formula</td><td style=\"padding:10px 14px;\">Mathematical equation used for the calculation</td><td style=\"padding:10px 14px;\">Shown in Formula section above</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Precision</td><td style=\"padding:10px 14px;\">Number of decimal places in the result</td><td style=\"padding:10px 14px;\">Typically 2-4 decimal places</td></tr>\n</tbody></table></div>\n<div class=\"content-section\"><h2>How to Use This Calculator</h2>\n<p>Enter your values into the input fields above and click Calculate for instant results. All calculations run in your browser — no data is sent to any server, ensuring complete privacy. Use the Copy button to save your results and the Share button to send a link to this calculator.</p>\n<h3>Understanding Your Results</h3>\n<p>Results are based on the formula and inputs provided. For important financial, medical, or legal decisions, always verify results with a qualified professional. This tool is designed to give quick, reliable estimates for planning and educational purposes.</p>\n<h3>Tips for Accurate Calculations</h3>\n<p>Always double-check your input values and units before calculating. Small input errors can significantly affect results. Use the Reset button to clear all fields and start fresh. For multi-step calculations, use the result of one calculation as the input for the next.</p>\n<h3>Reference Guide</h3>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"width:100%;border-collapse:collapse;font-size:14px;\">\n<thead><tr style=\"background:var(--c-accent);color:#fff;\">\n<th style=\"padding:10px 14px;text-align:left;\">Term</th>\n<th style=\"padding:10px 14px;text-align:left;\">Meaning</th>\n<th style=\"padding:10px 14px;text-align:left;\">Example</th>\n</tr></thead>\n<tbody>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Input</td><td style=\"padding:10px 14px;\">Value you enter into the calculator</td><td style=\"padding:10px 14px;\">Amount, rate, or quantity</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Output</td><td style=\"padding:10px 14px;\">Calculated result shown after clicking Calculate</td><td style=\"padding:10px 14px;\">Final answer or converted value</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Formula</td><td style=\"padding:10px 14px;\">Mathematical equation used for the calculation</td><td style=\"padding:10px 14px;\">Shown in Formula section above</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Precision</td><td style=\"padding:10px 14px;\">Number of decimal places in the result</td><td style=\"padding:10px 14px;\">Typically 2-4 decimal places</td></tr>\n</tbody></table></div>\n<h3>Why Use CalcDigi</h3>\n<p>CalcDigi provides over 300 free online calculators covering math, science, finance, health, physics, and more. Every calculator is free with no login required. All tools work on any device and deliver instant accurate results with AI-powered insights to help you understand your numbers better.</p></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>GCF Calculator</h2>\n<div class=\"form-group\">\n<label for=\"gcf-numbers\">Enter Numbers (comma separated)</label>\n<input id=\"gcf-numbers\" type=\"text\" value=\"24, 36, 60\"/>\n</div>\n<button class=\"calc-btn\" onclick=\"calcGCF()\">Calculate GCF</button>\n<div class=\"result-box\" id=\"gcf-result\">\n<div id=\"gcf-ri\"></div>\n<div class=\"result-chart\"><canvas height=\"140\" id=\"gcf-chart\" width=\"220\"></canvas></div>\n<div class=\"ai-box\" id=\"gcf-ai\" style=\"display:none;\"></div>\n</div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-gcf-result\" onclick=\"printResult('gcf-result','GCF Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('GCF Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-gcf-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function gcd(a,b){return b===0?a:gcd(b,a%b);}\\nfunction calcGCF(){\\n  const raw=document.getElementById('gcf-numbers').value;\\n  const nums=raw.split(',').map(s=>Math.abs(parseInt(s.trim()))).filter(n=>!isNaN(n)&&n>0);\\n  if(nums.length<2){alert('Please enter at least 2 positive integers separated by commas.');return;}\\n  let result=nums[0];\\n  for(let i=1;i<nums.length;i++){result=gcd(result,nums[i]);}\\n  document.getElementById('gcf-ri').innerHTML=\\n    ri('GCF','<strong style=\\\"font-size:28px;color:var(--c-accent)\\\">'+result+'</strong>',true)+\\n    ri('Numbers',nums.join(', '))+\\n    ri('Simplified Ratio',nums.map(n=>n/result).join(' : '))+\\n    ri('Each number ÷ GCF',nums.map(n=>n+'÷'+result+'='+n/result).join(', '));\\n  showResult('gcf-result');\\n  drawBar('gcf-chart',nums.map(String),nums,'#1a5c3a');\\n  const aiBox=document.getElementById('gcf-ai');\\n  aiBox.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n  aiBox.style.display='block';\\n  getAIInsight('GCF of '+nums.join(', ')+' is '+result+'. Simplified ratio: '+nums.map(n=>n/result).join(':')+'. In 2-3 sentences explain what this GCF means practically and one real-world use case.')\\n  .then(function(t){if(t){aiBox.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+t+'</p>';}else {aiBox.style.display='none';}});\\n}\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
