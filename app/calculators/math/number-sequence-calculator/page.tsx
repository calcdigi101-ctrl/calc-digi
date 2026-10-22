import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/number-sequence-calculator";
const TITLE = "Number Sequence Calculator | CalcDigi";
const DESCRIPTION = "Find any term and the sum of the first N terms for arithmetic or geometric sequences.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Number Sequence Calculator | CalcDigi"
      intro="Find any term and the running sum of an arithmetic or geometric sequence from its first term and common difference or ratio."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Arithmetic: aₙ = a₁ + (n−1)d  |   Geometric: aₙ = a₁ × rⁿ⁻¹"
      related={[
        {
                "href": "/calculators/finance/compound-interest-calculator",
                "icon": "📈",
                "name": "Compound Interest"
        },
        {
                "href": "/calculators/math/exponent-calculator",
                "icon": "📈",
                "name": "Exponent Calculator"
        },
        {
                "href": "/calculators/math/average-calculator",
                "icon": "📐",
                "name": "Average Calculator"
        },
        {
                "href": "/calculators/math/factorial-calculator",
                "icon": "❗",
                "name": "Factorial Calculator"
        }
]}
      faq={[
        {
                "q": "What's the difference between arithmetic and geometric sequences?",
                "a": "Arithmetic sequences add the same number each step (constant difference). Geometric sequences multiply by the same number each step (constant ratio)."
        },
        {
                "q": "What happens if the ratio is 1 in a geometric sequence?",
                "a": "Every term equals the first term, so the sum of n terms is simply a₁ × n."
        },
        {
                "q": "Can the common difference or ratio be negative?",
                "a": "Yes — a negative difference produces a decreasing arithmetic sequence, and a negative ratio produces a geometric sequence that alternates sign."
        },
        {
                "q": "What real-world situations use geometric sequences?",
                "a": "Compound interest, population growth, radioactive decay, and viral spread all follow geometric (exponential) sequences."
        },
        {
                "q": "What happens with a geometric ratio between 0 and 1?",
                "a": "The sequence shrinks toward zero with each term — for example, starting at 100 with ratio 0.5 gives 100, 50, 25, 12.5... approaching but never reaching zero."
        },
        {
                "q": "Can n be very large?",
                "a": "Yes — the nth term and sum formulas compute directly without needing to generate every prior term, so even very large n values return instantly."
        }
]}
      html={"<div class=\"content-section\"><h2>Formulas</h2><div class=\"formula-box\">Arithmetic: aₙ = a₁ + (n−1)d  |   Geometric: aₙ = a₁ × rⁿ⁻¹</div>\n<div class=\"content-section\"><h2>Worked Example</h2><p>An arithmetic sequence starting at 3 with a common difference of 4 goes: 3, 7, 11, 15, 19... The 10th term is a₁ + (10−1)×4 = 3 + 36 = 39. A geometric sequence starting at 3 with ratio 4 instead goes: 3, 12, 48, 192... growing far faster since each term multiplies rather than adds.</p></div>\n<div class=\"content-section\"><h2>Arithmetic vs. Geometric in Real Life</h2><ul><li><strong>Arithmetic:</strong> Fixed monthly savings deposits, evenly spaced seating rows, simple interest</li><li><strong>Geometric:</strong> Compound interest, population growth, viral spread, radioactive decay (in reverse)</li></ul></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Number Sequence Calculator</h2><div class=\"form-group\"><label for=\"ns-type\">Sequence Type</label><select id=\"ns-type\"><option value=\"arithmetic\">Arithmetic</option><option value=\"geometric\">Geometric</option></select></div><div class=\"form-group\"><label for=\"ns-a1\">First Term (a₁)</label><input id=\"ns-a1\" step=\"any\" type=\"number\" value=\"3\"/></div><div class=\"form-group\"><label for=\"ns-d\">Common Difference / Ratio</label><input id=\"ns-d\" step=\"any\" type=\"number\" value=\"4\"/></div><div class=\"form-group\"><label for=\"ns-n\">Find Term Number (n)</label><input id=\"ns-n\" min=\"1\" step=\"1\" type=\"number\" value=\"10\"/></div><button class=\"calc-btn\" onclick=\"calcSequence()\">Calculate</button><button class=\"calc-btn\" onclick=\"document.getElementById('ns-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button><div class=\"result-box\" id=\"ns-result\" style=\"display:none;\"><div id=\"ns-ri\"></div><div class=\"ai-box\" id=\"ns-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-ns-result\" onclick=\"printResult('ns-result','Number Sequence Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Number Sequence Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>" }} />
        <Script id="calc-script-number-sequence-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcSequence(){\\n  const type=document.getElementById('ns-type').value;\\n  const a1=parseFloat(document.getElementById('ns-a1').value);\\n  const d=parseFloat(document.getElementById('ns-d').value);\\n  const n=parseInt(document.getElementById('ns-n').value);\\n  if(isNaN(a1)||isNaN(d)||isNaN(n)||n<1){alert('Enter valid values for first term, difference/ratio, and n.');return;}\\n  let an,sum,terms=[];\\n  if(type==='arithmetic'){\\n    an=a1+(n-1)*d;\\n    sum=n/2*(2*a1+(n-1)*d);\\n  } else {\\n    an=a1*Math.pow(d,n-1);\\n    sum=(d===1)?a1*n:a1*(Math.pow(d,n)-1)/(d-1);\\n  }\\n  const showCount=Math.min(n,10);\\n  for(let i=1;i<=showCount;i++){\\n    terms.push(type==='arithmetic'?(a1+(i-1)*d):(a1*Math.pow(d,i-1)));\\n  }\\n  const fmt=v=>Number.isFinite(v)?parseFloat(v.toFixed(4)).toString():'—';\\n  document.getElementById('ns-ri').innerHTML=\\n    ri('Term a'+n,'<strong style=\\\"font-size:21px;color:var(--c-accent)\\\">'+fmt(an)+'</strong>',true)+\\n    ri('Sum of First '+n+' Terms',fmt(sum))+\\n    ri('First '+showCount+' Terms',terms.map(fmt).join(', ')+(n>10?', ...':''));\\n  document.getElementById('ns-result').style.display='block';\\n}\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
