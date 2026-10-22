import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/random-number-generator";
const TITLE = "Random Number Generator – Free Online Tool | CalcDigi";
const DESCRIPTION = "Generate one or many random integers between any min and max, with or without duplicates. Instant results.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Random Number Generator"
      intro="Generate random integers between any minimum and maximum value. Choose how many numbers you need and whether duplicates are allowed."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression=""
      related={[
        {
                "href": "/calculators/math/probability-calculator",
                "icon": "🎲",
                "name": "Probability Calculator"
        },
        {
                "href": "/calculators/math/permutation-calculator",
                "icon": "🔀",
                "name": "Permutation Calculator"
        },
        {
                "href": "/calculators/math/combination-calculator",
                "icon": "🎯",
                "name": "Combination Calculator"
        },
        {
                "href": "/calculators/math/average-calculator",
                "icon": "📐",
                "name": "Average Calculator"
        }
]}
      faq={[
        {
                "q": "Is this truly random?",
                "a": "It uses JavaScript's Math.random(), which is pseudorandom and suitable for games, raffles, sampling, and everyday use. For cryptographic security, a dedicated CSPRNG is recommended instead."
        },
        {
                "q": "Can I generate numbers without duplicates?",
                "a": "Yes — check \"No duplicates\" and the generator will shuffle the range and return that many unique values. This only works if your count is less than or equal to the size of the range."
        },
        {
                "q": "What's the largest range I can use?",
                "a": "Any range that fits in a standard JavaScript number works well. For very large ranges, consider the Big Number Calculator for precision beyond normal integer limits."
        },
        {
                "q": "Can I use this to pick a random winner?",
                "a": "Yes. Set min to 1 and max to your number of entries, generate 1 number, and that's your winning entry number."
        },
        {
                "q": "Can I generate the same number twice in a row?",
                "a": "Yes, if \"No duplicates\" is unchecked — each number is generated independently, so repeats are possible, just like rolling a die twice."
        },
        {
                "q": "Does refreshing the page change the seed?",
                "a": "Each click of \"Generate Numbers\" produces a fresh random set — there's no fixed seed, so results differ every time you generate."
        }
]}
      html={"<div class=\"content-section\"><h2>How It Works</h2><p>Each number is generated using the browser's cryptographically-sound random source, uniformly distributed across your chosen range. When \"no duplicates\" is selected, the generator shuffles the full range and takes the first N values, guaranteeing every number is unique.</p></div>\n<div class=\"content-section\"><h2>Worked Example</h2><p>Say you're picking a raffle winner from 50 tickets, numbered 1–50. Set Minimum = 1, Maximum = 50, Count = 1, and check \"No duplicates\" (irrelevant for a single number, but good habit). Click Generate — the number shown is your winner, pulled from a uniform distribution so every ticket has an equal 1-in-50 chance.</p></div>\n<div class=\"content-section\"><h2>Common Uses</h2><ul><li><strong>Games and raffles:</strong> Picking a fair winner or rolling a virtual die</li><li><strong>Sampling:</strong> Selecting a random subset of records to review or audit</li><li><strong>Testing:</strong> Generating random test data for software or spreadsheets</li><li><strong>Passwords and PINs:</strong> Quick random digit sequences (for non-security-critical use)</li></ul></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Random Number Generator</h2><div class=\"form-group\"><label for=\"rng-min\">Minimum</label><input id=\"rng-min\" step=\"1\" type=\"number\" value=\"1\"/></div><div class=\"form-group\"><label for=\"rng-max\">Maximum</label><input id=\"rng-max\" step=\"1\" type=\"number\" value=\"100\"/></div><div class=\"form-group\"><label for=\"rng-count\">How Many Numbers</label><input id=\"rng-count\" min=\"1\" step=\"1\" type=\"number\" value=\"5\"/></div><div class=\"form-group\"><label style=\"display:flex;align-items:center;gap:8px;font-weight:400;\"><input id=\"rng-unique\" style=\"width:auto;\" type=\"checkbox\"/> No duplicates</label></div><button class=\"calc-btn\" onclick=\"generateRandom()\">Generate Numbers</button><button class=\"calc-btn\" onclick=\"document.getElementById('rng-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button><div class=\"result-box\" id=\"rng-result\" style=\"display:none;\"><div id=\"rng-ri\"></div><div class=\"ai-box\" id=\"rng-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-rng-result\" onclick=\"printResult('rng-result','Random Number Generator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Random Number Generator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>" }} />
        <Script id="calc-script-random-number-generator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function generateRandom(){\\n  const min=parseInt(document.getElementById('rng-min').value);\\n  const max=parseInt(document.getElementById('rng-max').value);\\n  const count=parseInt(document.getElementById('rng-count').value)||1;\\n  const unique=document.getElementById('rng-unique').checked;\\n  if(isNaN(min)||isNaN(max)||min>max){alert('Enter a valid min/max range (min must be <= max).');return;}\\n  const rangeSize=max-min+1;\\n  if(unique&&count>rangeSize){alert('Cannot generate '+count+' unique numbers from a range of only '+rangeSize+'.');return;}\\n  let nums=[];\\n  if(unique){\\n    const pool=[];\\n    for(let i=min;i<=max;i++)pool.push(i);\\n    for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));const tmp=pool[i];pool[i]=pool[j];pool[j]=tmp;}\\n    nums=pool.slice(0,count);\\n  } else {\\n    for(let i=0;i<count;i++)nums.push(Math.floor(Math.random()*rangeSize)+min);\\n  }\\n  const sum=nums.reduce((a,b)=>a+b,0);\\n  const avg=sum/nums.length;\\n  document.getElementById('rng-ri').innerHTML=\\n    ri('Generated Numbers','<strong style=\\\"font-size:17px;color:var(--c-accent)\\\">'+nums.join(', ')+'</strong>',true)+\\n    ri('Count',nums.length)+\\n    ri('Sum',sum)+\\n    ri('Average',avg.toFixed(2));\\n  document.getElementById('rng-result').style.display='block';\\n}\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
