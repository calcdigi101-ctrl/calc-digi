import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/scientific-notation-calculator";
const TITLE = "Scientific Notation Calculator – Convert Numbers | CalcDigi";
const DESCRIPTION = "Convert any number to scientific notation, or convert a coefficient and exponent back to standard form.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Scientific Notation Calculator"
      intro="Convert any number to scientific notation, or convert a coefficient and exponent back into standard (decimal) form."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="a × 10ⁿ, where 1 ≤ |a| < 10"
      related={[
        {
                "href": "/calculators/math/exponent-calculator",
                "icon": "📈",
                "name": "Exponent Calculator"
        },
        {
                "href": "/calculators/math/logarithm-calculator",
                "icon": "📊",
                "name": "Logarithm Calculator"
        },
        {
                "href": "/calculators/math/big-number-calculator",
                "icon": "💯",
                "name": "Big Number Calculator"
        },
        {
                "href": "/calculators/math/significant-figures-calculator",
                "icon": "🔬",
                "name": "Significant Figures"
        }
]}
      faq={[
        {
                "q": "Why use scientific notation?",
                "a": "It makes extremely large or small numbers easier to read, compare, and compute with — common in physics, chemistry, and engineering."
        },
        {
                "q": "What does a negative exponent mean?",
                "a": "A negative exponent means the number is smaller than 1 — each step down the exponent shifts the decimal point one place to the left."
        },
        {
                "q": "Is 10 × 10⁵ valid scientific notation?",
                "a": "No — the coefficient must be between 1 and 10 (exclusive of 10). 10 × 10⁵ should be rewritten as 1 × 10⁶."
        },
        {
                "q": "How do I multiply numbers in scientific notation?",
                "a": "Multiply the coefficients and add the exponents: (a × 10ⁿ) × (b × 10ᵐ) = (a×b) × 10⁽ⁿ⁺ᵐ⁾, then renormalize if the coefficient goes outside 1–10."
        },
        {
                "q": "How do I compare two numbers in scientific notation?",
                "a": "Compare the exponents first — a larger exponent means a larger number (for positive numbers). Only compare coefficients when exponents are equal."
        },
        {
                "q": "What's the difference between scientific and engineering notation?",
                "a": "Scientific notation keeps the coefficient between 1 and 10. Engineering notation restricts exponents to multiples of 3 (matching metric prefixes like kilo, mega, micro), so the coefficient can range from 1 to 1000."
        }
]}
      html={"<div class=\"content-section\"><h2>What Is Scientific Notation?</h2><div class=\"formula-box\">a × 10ⁿ, where 1 ≤ |a| &lt; 10</div>\n<div class=\"content-section\"><h2>Worked Example</h2><p>The number 548,000 in scientific notation is 5.48 × 10⁵ — move the decimal point 5 places left until only one non-zero digit remains before it. Going the other way, 7.2 × 10⁻⁴ converts back to 0.00072 by moving the decimal 4 places left (since the exponent is negative).</p></div>\n<div class=\"content-section\"><h2>Why Scientists Use It</h2><ul><li><strong>Astronomy:</strong> Distances like 9.46 × 10¹² km (a light-year) are unwieldy in standard form</li><li><strong>Chemistry:</strong> Avogadro's number (6.022 × 10²³) and atomic-scale measurements</li><li><strong>Computing:</strong> Representing floating-point precision and very small error margins</li><li><strong>Engineering:</strong> Comparing magnitudes quickly by just comparing exponents</li></ul></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Scientific Notation Calculator</h2><div class=\"form-group\"><label for=\"sn-number\">Number</label><input id=\"sn-number\" step=\"any\" type=\"number\" value=\"548000\"/></div><button class=\"calc-btn\" onclick=\"calcToScientific()\">Convert to Scientific</button><div class=\"result-box\" id=\"sn-result\" style=\"display:none;\"><div id=\"sn-ri\"></div><div class=\"ai-box\" id=\"sn-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-sn-result\" onclick=\"printResult('sn-result','Scientific Notation Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Scientific Notation Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button></div><div style=\"margin-top:20px;padding-top:16px;border-top:1px solid var(--c-rule);\"><p style=\"font-size:13px;font-weight:600;margin-bottom:10px;\">Scientific → Standard</p><div class=\"form-group\"><label for=\"sn-coeff\">Coefficient</label><input id=\"sn-coeff\" step=\"any\" type=\"number\" value=\"7.2\"/></div><div class=\"form-group\"><label for=\"sn-exp\">Exponent (power of 10)</label><input id=\"sn-exp\" step=\"1\" type=\"number\" value=\"-4\"/></div><button class=\"calc-btn\" onclick=\"calcToStandard()\">Convert to Standard</button><div class=\"result-box\" id=\"sn-std-result\" style=\"display:none;\"><div id=\"sn-std-ri\">\n</div>" }} />
        <Script id="calc-script-scientific-notation-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcToScientific(){\\n  const num=parseFloat(document.getElementById('sn-number').value);\\n  if(isNaN(num)){alert('Enter a valid number.');return;}\\n  if(num===0){\\n    document.getElementById('sn-ri').innerHTML=ri('Scientific Notation','<strong style=\\\"font-size:19px;color:var(--c-accent)\\\">0 × 10⁰</strong>',true);\\n  } else {\\n    const exp=Math.floor(Math.log10(Math.abs(num)));\\n    const coeff=num/Math.pow(10,exp);\\n    const coeffStr=parseFloat(coeff.toFixed(6)).toString();\\n    document.getElementById('sn-ri').innerHTML=\\n      ri('Scientific Notation','<strong style=\\\"font-size:19px;color:var(--c-accent)\\\">'+coeffStr+' × 10^'+exp+'</strong>',true)+\\n      ri('Coefficient',coeffStr)+\\n      ri('Exponent',exp)+\\n      ri('Standard Form',num);\\n  }\\n  document.getElementById('sn-result').style.display='block';\\n}\\nfunction calcToStandard(){\\n  const coeff=parseFloat(document.getElementById('sn-coeff').value);\\n  const exp=parseInt(document.getElementById('sn-exp').value);\\n  if(isNaN(coeff)||isNaN(exp)){alert('Enter a valid coefficient and exponent.');return;}\\n  const standard=coeff*Math.pow(10,exp);\\n  document.getElementById('sn-std-ri').innerHTML=\\n    ri('Standard Form','<strong style=\\\"font-size:19px;color:var(--c-accent)\\\">'+standard+'</strong>',true)+\\n    ri('Scientific Form',coeff+' × 10^'+exp);\\n  document.getElementById('sn-std-result').style.display='block';\\n}\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
