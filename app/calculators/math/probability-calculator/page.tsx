import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/probability-calculator";
const TITLE = "Probability Calculator | CalcDigi";
const DESCRIPTION = "Calculate single event probability, multiple events, combinations, and permutations.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Probability Calculator | CalcDigi"
      intro="Calculate probability for single events, multiple independent events, permutations, and combinations. Perfect for students and statisticians."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression=""
      related={[
        {
                "href": "/calculators/math/percentage-calculator",
                "icon": "%",
                "name": "Percentage"
        },
        {
                "href": "/calculators/math/fraction-calculator",
                "icon": "½",
                "name": "Fraction"
        },
        {
                "href": "/calculators/math/average-calculator",
                "icon": "📐",
                "name": "Average"
        },
        {
                "href": "/calculators/math/ratio-calculator",
                "icon": "⚖️",
                "name": "Ratio"
        }
]}
      faq={[
        {
                "q": "What is the difference between independent and mutually exclusive events?",
                "a": "Independent events don't affect each other, such as two coin flips. Mutually exclusive events can't happen together, such as rolling a 2 and a 5 on one die. Their P(A and B) is 0."
        },
        {
                "q": "How do I convert odds to a probability?",
                "a": "Odds of a:b in favour equal a probability of a ÷ (a + b). Odds of 3:1 mean a 3 ÷ 4 = 75% chance."
        }
]}
      html={"<div class=\"content-section\"><h2>Probability rules</h2>\n<div class=\"formula-box\">P(A) = favourable outcomes ÷ total outcomes<br/>P(not A) = 1 − P(A)<br/>P(A and B) = P(A) × P(B)  (independent events)<br/>P(A or B) = P(A) + P(B) − P(A and B)</div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Probability Calculator</h2>\n<div class=\"form-group\"><label for=\"prob-fav\">Number of Favorable Outcomes</label><input id=\"prob-fav\" min=\"0\" type=\"number\" value=\"3\"/></div>\n<div class=\"form-group\"><label for=\"prob-tot\">Total Possible Outcomes</label><input id=\"prob-tot\" min=\"1\" type=\"number\" value=\"6\"/></div>\n<div class=\"form-group\"><label for=\"prob-ev\">Number of Events (for multiple)</label><input id=\"prob-ev\" max=\"20\" min=\"1\" type=\"number\" value=\"2\"/></div>\n<button class=\"calc-btn\" onclick=\"doCalc()\" style=\"margin-top:16px;\">Calculate Now</button>\n<div class=\"result-box\" id=\"hc-result\"><div id=\"hc-ri\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"hc-chart\" width=\"160\"></canvas></div>\n<div class=\"ai-box\" id=\"ai-hc-result\" style=\"display:none;\"></div></div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-hc-result\" onclick=\"printResult('hc-result','Probability Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Probability Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-probability-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function factorial(n){if(n<=1)return 1;var r=1;for(var i=2;i<=n;i++)r*=i;return r;}\\nfunction doCalc(){\\n  var fav=parseFloat(document.getElementById('prob-fav').value)||3;\\n  var tot=parseFloat(document.getElementById('prob-tot').value)||6;\\n  var ev=parseInt(document.getElementById('prob-ev').value)||2;\\n  if(fav>tot){document.getElementById('hc-ri').innerHTML=ri('Error','Favorable outcomes cannot exceed total outcomes.',true);showResult('hc-result');return;}\\n  var p=fav/tot;var pNot=1-p;var pAll=Math.pow(p,ev);var pAtLeast=1-Math.pow(pNot,ev);\\n  document.getElementById('hc-ri').innerHTML=\\n    ri('Single Event Probability',p.toFixed(6)+' ('+( p*100).toFixed(2)+'%)',true)+\\n    ri('Probability of NOT occurring',pNot.toFixed(6)+' ('+(pNot*100).toFixed(2)+'%)')+\\n    ri('All '+ev+' events occurring',pAll.toFixed(6)+' ('+(pAll*100).toFixed(4)+'%)')+\\n    ri('At least one in '+ev+' trials',pAtLeast.toFixed(6)+' ('+(pAtLeast*100).toFixed(4)+'%)')+\\n    ri('Favorable outcomes',fav)+ri('Total outcomes',tot);\\n  showResult('hc-result');\\n  drawDonut('hc-chart',['Probability','Complement'],[Math.round(p*1000)||1,Math.round(pNot*1000)||1],['#1a5c3a','#c8832a']);\\n  var ai=document.querySelector('.ai-box');\\n  if(ai&&typeof getAIInsight==='function'){ai.style.display='block';ai.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';getAIInsight('Probability: '+p.toFixed(4)+' ('+fav+'/'+tot+'). Give a real-world probability example.').then(function(t){if(t)ai.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+t+'</p>';else ai.style.display='none';});}\\n}\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
