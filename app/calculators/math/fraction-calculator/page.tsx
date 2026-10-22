import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/fraction-calculator";
const TITLE = "Fraction Calculator | CalcDigi";
const DESCRIPTION = "Add, subtract, multiply, and divide fractions with step-by-step solutions. Simplifies to lowest terms automatically.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Fraction Calculator | CalcDigi"
      intro="Add, subtract, multiply, and divide fractions instantly. Results are automatically simplified to lowest terms with step-by-step solutions."
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
                "q": "How do I simplify a fraction?",
                "a": "Divide the numerator and denominator by their greatest common divisor. For 18/24 the GCD is 6, so 18/24 = 3/4."
        },
        {
                "q": "How do I convert a mixed number to an improper fraction?",
                "a": "Multiply the whole number by the denominator and add the numerator, keeping the same denominator: 2 3/5 = (2×5 + 3)/5 = 13/5."
        },
        {
                "q": "Why can't the denominator be zero?",
                "a": "A fraction is a division, and division by zero is undefined, so any fraction with a denominator of 0 has no value."
        }
]}
      html={"<div class=\"content-section\"><h2>Fraction rules</h2>\n<div class=\"formula-box\">a/b + c/d = (ad + bc) / bd<br/>a/b − c/d = (ad − bc) / bd<br/>a/b × c/d = ac / bd<br/>a/b ÷ c/d = ad / bc</div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Fraction Calculator</h2>\n<div class=\"form-group\"><label>First Fraction</label><div class=\"form-row\"><input id=\"fr-n1\" aria-label=\"Numerator\" placeholder=\"Numerator\" type=\"number\" value=\"1\"/><input id=\"fr-d1\" aria-label=\"Denominator\" placeholder=\"Denominator\" type=\"number\" value=\"2\"/></div></div>\n<div class=\"form-group\"><label for=\"fr-op\">Operation</label><select id=\"fr-op\"><option value=\"add\">Add (+)</option><option value=\"sub\">Subtract (−)</option><option value=\"mul\">Multiply (×)</option><option value=\"div\">Divide (÷)</option></select></div>\n<div class=\"form-group\"><label>Second Fraction</label><div class=\"form-row\"><input id=\"fr-n2\" aria-label=\"Numerator\" placeholder=\"Numerator\" type=\"number\" value=\"1\"/><input id=\"fr-d2\" aria-label=\"Denominator\" placeholder=\"Denominator\" type=\"number\" value=\"3\"/></div></div>\n<button class=\"calc-btn\" onclick=\"doCalc()\" style=\"margin-top:16px;\">Calculate Now</button>\n<div class=\"result-box\" id=\"hc-result\"><div id=\"hc-ri\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"hc-chart\" width=\"160\"></canvas></div>\n<div class=\"ai-box\" id=\"ai-hc-result\" style=\"display:none;\"></div></div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-hc-result\" onclick=\"printResult('hc-result','Fraction Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Fraction Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-fraction-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t;}return a;}\\nfunction simplify(n,d){if(d===0)return[0,0];var g=gcd(Math.abs(n),Math.abs(d));var sign=d<0?-1:1;return[sign*n/g,sign*d/g];}\\nfunction doCalc(){\\n  var n1=parseInt(document.getElementById('fr-n1').value)||1;\\n  var d1=parseInt(document.getElementById('fr-d1').value)||2;\\n  var n2=parseInt(document.getElementById('fr-n2').value)||1;\\n  var d2=parseInt(document.getElementById('fr-d2').value)||3;\\n  var op=document.getElementById('fr-op').value;\\n  if(d1===0||d2===0){document.getElementById('hc-ri').innerHTML=ri('Error','Denominator cannot be zero.',true);showResult('hc-result');return;}\\n  var rn,rd;\\n  if(op==='add'){rn=n1*d2+n2*d1;rd=d1*d2;}\\n  else if(op==='sub'){rn=n1*d2-n2*d1;rd=d1*d2;}\\n  else if(op==='mul'){rn=n1*n2;rd=d1*d2;}\\n  else{rn=n1*d2;rd=d1*n2;}\\n  var simplified=simplify(rn,rd);var sn=simplified[0];var sd=simplified[1];\\n  var dec=sd!==0?sn/sd:0;\\n  var opSymbol={add:'+',sub:'-',mul:'x',div:'/'}[op];\\n  document.getElementById('hc-ri').innerHTML=\\n    ri('Expression',n1+'/'+d1+' '+opSymbol+' '+n2+'/'+d2)+\\n    ri('Result (unsimplified)',rn+'/'+rd)+\\n    ri('Simplified',sn+'/'+sd,true)+\\n    ri('Decimal',dec.toFixed(6));\\n  showResult('hc-result');\\n  drawDonut('hc-chart',['Numerator','Denominator'],[Math.abs(sn)||1,Math.abs(sd)||1],['#1a5c3a','#c8832a']);\\n  var ai=document.querySelector('.ai-box');\\n  if(ai&&typeof getAIInsight==='function'){ai.style.display='block';ai.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';getAIInsight('Fraction result: '+sn+'/'+sd+' = '+dec.toFixed(4)+'. Give a real-world fraction tip.').then(function(t){if(t)ai.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+t+'</p>';else ai.style.display='none';});}\\n}\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
