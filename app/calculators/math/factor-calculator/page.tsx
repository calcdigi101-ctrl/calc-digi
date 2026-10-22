import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/factor-calculator";
const TITLE = "Factor Calculator – All Factors & Prime Factors | CalcDigi";
const DESCRIPTION = "Find every factor of a number plus its full prime factorization, and check if it's prime.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Factor Calculator"
      intro="Find every factor of a whole number, its prime factorization, and whether it's a prime number."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="A factor of n is any whole number that divides n with no remainder"
      related={[
        {
                "href": "/calculators/math/gcf-calculator",
                "icon": "🔢",
                "name": "GCF Calculator"
        },
        {
                "href": "/calculators/math/lcm-calculator",
                "icon": "📐",
                "name": "LCM Calculator"
        },
        {
                "href": "/calculators/math/prime-number-checker",
                "icon": "🔍",
                "name": "Prime Number Checker"
        },
        {
                "href": "/calculators/math/factorial-calculator",
                "icon": "❗",
                "name": "Factorial Calculator"
        }
]}
      faq={[
        {
                "q": "What's the difference between factors and prime factors?",
                "a": "Factors are every number that divides evenly into n. Prime factors are the subset of those factors that are themselves prime numbers — multiplying all prime factors together (with repetition) reconstructs n."
        },
        {
                "q": "How do I know if a number is prime?",
                "a": "A number is prime if it has exactly two factors: 1 and itself. This calculator tells you directly whether your number is prime."
        },
        {
                "q": "What's the largest number I can factor here?",
                "a": "This tool supports numbers up to 1,000,000 to keep results instant in your browser."
        },
        {
                "q": "How is this useful in real life?",
                "a": "Factoring is used in simplifying fractions, finding least common multiples and greatest common factors, cryptography, and basic number theory coursework."
        },
        {
                "q": "What's the fastest way to find factors by hand?",
                "a": "Test divisibility starting from 1 and working up to the square root of the number — every factor above the square root pairs with one below it, so you don't need to check past that point."
        },
        {
                "q": "Is 1 considered a prime number?",
                "a": "No — by definition, a prime number must have exactly two distinct factors (1 and itself). Since 1 only has one factor, it's neither prime nor composite."
        }
]}
      html={"<div class=\"content-section\"><h2>What Is a Factor?</h2><div class=\"formula-box\">A factor of n is any whole number that divides n with no remainder</div>\n<div class=\"content-section\"><h2>Worked Example</h2><p>The factors of 84 are 1, 2, 3, 4, 6, 7, 12, 14, 21, 28, 42, and 84. Its prime factorization is 2 × 2 × 3 × 7 (or 2² × 3 × 7). Multiplying the prime factors back together reconstructs 84.</p></div>\n<div class=\"content-section\"><h2>Why Prime Factorization Matters</h2><ul><li><strong>Simplifying fractions:</strong> Finding common factors between numerator and denominator</li><li><strong>GCF and LCM:</strong> Prime factorization is the fastest way to compute greatest common factor and least common multiple by hand</li><li><strong>Cryptography:</strong> Modern encryption relies on the difficulty of factoring very large numbers</li><li><strong>Number theory coursework:</strong> A foundational skill for algebra and higher math</li></ul></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Factor Calculator</h2><div class=\"form-group\"><label for=\"fc-number\">Number</label><input id=\"fc-number\" min=\"1\" step=\"1\" type=\"number\" value=\"84\"/></div><button class=\"calc-btn\" onclick=\"calcFactors()\">Find Factors</button><button class=\"calc-btn\" onclick=\"document.getElementById('fc-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button><div class=\"result-box\" id=\"fc-result\" style=\"display:none;\"><div id=\"fc-ri\"></div><div class=\"ai-box\" id=\"fc-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-fc-result\" onclick=\"printResult('fc-result','Factor Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Factor Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>" }} />
        <Script id="calc-script-factor-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcFactors(){\\n  const n=parseInt(document.getElementById('fc-number').value);\\n  if(isNaN(n)||n<1){alert('Enter a positive whole number.');return;}\\n  if(n>1000000){alert('Please enter a number up to 1,000,000.');return;}\\n  const factors=[];\\n  for(let i=1;i<=n;i++){if(n%i===0)factors.push(i);}\\n  let num=n, primeFactors=[];\\n  for(let p=2;p<=num;p++){\\n    while(num%p===0){primeFactors.push(p);num=num/p;}\\n  }\\n  document.getElementById('fc-ri').innerHTML=\\n    ri('All Factors','<strong style=\\\"font-size:15px;color:var(--c-accent)\\\">'+factors.join(', ')+'</strong>',true)+\\n    ri('Number of Factors',factors.length)+\\n    ri('Prime Factorization',primeFactors.length?primeFactors.join(' × '):'This is a prime number')+\\n    ri('Is Prime?',factors.length===2?'Yes':'No');\\n  document.getElementById('fc-result').style.display='block';\\n}\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
