import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/matrix-calculator";
const TITLE = "Matrix Calculator – Add, Multiply & Determinant | CalcDigi";
const DESCRIPTION = "Add, subtract, and multiply 2x2 matrices. Calculate determinant and transpose instantly with step-by-step results.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Matrix Calculator"
      intro="Perform 2×2 matrix addition, subtraction, and multiplication instantly. Also calculates the determinant and transpose of each matrix. Essential for linear algebra coursework."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="Determinant: |A| = ad − bc, for matrix [[a,b],[c,d]]"
      related={[
        {
                "href": "/calculators/math/quadratic-equation-calculator",
                "icon": "🔢",
                "name": "Quadratic Solver"
        },
        {
                "href": "/calculators/math/scientific-calculator",
                "icon": "🔬",
                "name": "Scientific Calculator"
        },
        {
                "href": "/calculators/math/percentage-calculator",
                "icon": "%",
                "name": "Percentage Calculator"
        },
        {
                "href": "/calculators/math/average-calculator",
                "icon": "📊",
                "name": "Average Calculator"
        }
]}
      faq={[
        {
                "q": "What is a matrix determinant used for?",
                "a": "Determinants determine if a matrix is invertible (nonzero det), calculate areas and volumes in geometry, and are essential in solving systems of linear equations using Cramer's rule."
        },
        {
                "q": "Is matrix multiplication commutative?",
                "a": "No — A×B ≠ B×A in general. Matrix multiplication is non-commutative, which is one key way it differs from regular number multiplication."
        },
        {
                "q": "What does a zero determinant mean?",
                "a": "A zero determinant means the matrix is singular — it has no inverse. The rows/columns are linearly dependent and the system of equations it represents has no unique solution."
        },
        {
                "q": "What is the identity matrix?",
                "a": "The identity matrix I has 1s on the diagonal and 0s elsewhere: [[1,0],[0,1]]. Multiplying any matrix by I returns the original matrix unchanged — analogous to multiplying a number by 1."
        }
]}
      html={"<div class=\"content-section\">\n<h2>Key Matrix Operations</h2>\n<div class=\"formula-box\">Determinant: |A| = ad − bc, for matrix [[a,b],[c,d]]</div>\n<div class=\"content-section\"><h2>How to Use This Calculator</h2>\n<p>Enter your values into the input fields above and click Calculate for instant results. All calculations run in your browser — no data is sent to any server, ensuring complete privacy. Use the Copy button to save your results and the Share button to send a link to this calculator.</p>\n<h3>Understanding Your Results</h3>\n<p>Results are based on the formula and inputs provided. For important financial, medical, or legal decisions, always verify results with a qualified professional. This tool is designed to give quick, reliable estimates for planning and educational purposes.</p>\n<h3>Tips for Accurate Calculations</h3>\n<p>Always double-check your input values and units before calculating. Small input errors can significantly affect results. Use the Reset button to clear all fields and start fresh. For multi-step calculations, use the result of one calculation as the input for the next.</p>\n<h3>Reference Guide</h3>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"width:100%;border-collapse:collapse;font-size:14px;\">\n<thead><tr style=\"background:var(--c-accent);color:#fff;\">\n<th style=\"padding:10px 14px;text-align:left;\">Term</th>\n<th style=\"padding:10px 14px;text-align:left;\">Meaning</th>\n<th style=\"padding:10px 14px;text-align:left;\">Example</th>\n</tr></thead>\n<tbody>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Input</td><td style=\"padding:10px 14px;\">Value you enter into the calculator</td><td style=\"padding:10px 14px;\">Amount, rate, or quantity</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Output</td><td style=\"padding:10px 14px;\">Calculated result shown after clicking Calculate</td><td style=\"padding:10px 14px;\">Final answer or converted value</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);\"><td style=\"padding:10px 14px;\">Formula</td><td style=\"padding:10px 14px;\">Mathematical equation used for the calculation</td><td style=\"padding:10px 14px;\">Shown in Formula section above</td></tr>\n<tr style=\"border-bottom:1px solid var(--c-rule);background:var(--c-rule2);\"><td style=\"padding:10px 14px;\">Precision</td><td style=\"padding:10px 14px;\">Number of decimal places in the result</td><td style=\"padding:10px 14px;\">Typically 2-4 decimal places</td></tr>\n</tbody></table></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n\n<h2>Matrix Calculator</h2>\n<p style=\"font-size:13px;font-weight:600;color:var(--c-accent);margin-bottom:8px;\">Matrix A</p>\n<div style=\"display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;\">\n<input id=\"a11\" aria-label=\"Matrix A row 1 column 1\" step=\"any\" style=\"padding:10px;border:1.5px solid var(--c-rule);border-radius:8px;font-size:14px;text-align:center;background:var(--c-bg);color:var(--c-ink);\" type=\"number\" value=\"1\"/>\n<input id=\"a12\" aria-label=\"Matrix A row 1 column 2\" step=\"any\" style=\"padding:10px;border:1.5px solid var(--c-rule);border-radius:8px;font-size:14px;text-align:center;background:var(--c-bg);color:var(--c-ink);\" type=\"number\" value=\"2\"/>\n<input id=\"a21\" aria-label=\"Matrix A row 2 column 1\" step=\"any\" style=\"padding:10px;border:1.5px solid var(--c-rule);border-radius:8px;font-size:14px;text-align:center;background:var(--c-bg);color:var(--c-ink);\" type=\"number\" value=\"3\"/>\n<input id=\"a22\" aria-label=\"Matrix A row 2 column 2\" step=\"any\" style=\"padding:10px;border:1.5px solid var(--c-rule);border-radius:8px;font-size:14px;text-align:center;background:var(--c-bg);color:var(--c-ink);\" type=\"number\" value=\"4\"/>\n</div>\n<p style=\"font-size:13px;font-weight:600;color:var(--c-accent);margin-bottom:8px;\">Matrix B</p>\n<div style=\"display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;\">\n<input id=\"b11\" aria-label=\"Matrix B row 1 column 1\" step=\"any\" style=\"padding:10px;border:1.5px solid var(--c-rule);border-radius:8px;font-size:14px;text-align:center;background:var(--c-bg);color:var(--c-ink);\" type=\"number\" value=\"5\"/>\n<input id=\"b12\" aria-label=\"Matrix B row 1 column 2\" step=\"any\" style=\"padding:10px;border:1.5px solid var(--c-rule);border-radius:8px;font-size:14px;text-align:center;background:var(--c-bg);color:var(--c-ink);\" type=\"number\" value=\"6\"/>\n<input id=\"b21\" aria-label=\"Matrix B row 2 column 1\" step=\"any\" style=\"padding:10px;border:1.5px solid var(--c-rule);border-radius:8px;font-size:14px;text-align:center;background:var(--c-bg);color:var(--c-ink);\" type=\"number\" value=\"7\"/>\n<input id=\"b22\" aria-label=\"Matrix B row 2 column 2\" step=\"any\" style=\"padding:10px;border:1.5px solid var(--c-rule);border-radius:8px;font-size:14px;text-align:center;background:var(--c-bg);color:var(--c-ink);\" type=\"number\" value=\"8\"/>\n</div>\n<div class=\"form-group\">\n<label for=\"mx-op\">Operation</label>\n<select id=\"mx-op\"><option value=\"add\">A + B</option><option value=\"sub\">A − B</option><option selected=\"\" value=\"mul\">A × B</option></select>\n</div>\n<button class=\"calc-btn\" onclick=\"calcMatrix()\">Calculate</button>\n<button class=\"calc-btn\" onclick=\"document.getElementById('mx-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button>\n<div class=\"result-box\" id=\"mx-result\" style=\"display:none;\"><div id=\"mx-ri\"></div><div class=\"result-chart\"><canvas height=\"160\" id=\"mx-chart\" width=\"160\"></canvas></div>\n<div class=\"ai-box\" id=\"mx-ai-box\" style=\"display:none;\"></div></div>\n<div style=\"display:flex;gap:8px;margin-top:10px;\">\n<button class=\"calc-btn\" id=\"print-btn-mx-result\" onclick=\"printResult('mx-result','Matrix Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button>\n<button class=\"calc-btn\" onclick=\"shareResult('Matrix Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n\n</div>" }} />
        <Script id="calc-script-matrix-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function v(id){return parseFloat(document.getElementById(id).value)||0;}\\nfunction calcMatrix(){\\n  const a=[[v('a11'),v('a12')],[v('a21'),v('a22')]];\\n  const b=[[v('b11'),v('b12')],[v('b21'),v('b22')]];\\n  const op=document.getElementById('mx-op').value;\\n  let res=[[0,0],[0,0]];\\n  if(op==='add'){for(let i=0;i<2;i++)for(let j=0;j<2;j++)res[i][j]=a[i][j]+b[i][j];}\\n  else if(op==='sub'){for(let i=0;i<2;i++)for(let j=0;j<2;j++)res[i][j]=a[i][j]-b[i][j];}\\n  else{res[0][0]=a[0][0]*b[0][0]+a[0][1]*b[1][0];res[0][1]=a[0][0]*b[0][1]+a[0][1]*b[1][1];res[1][0]=a[1][0]*b[0][0]+a[1][1]*b[1][0];res[1][1]=a[1][0]*b[0][1]+a[1][1]*b[1][1];}\\n  const detA=a[0][0]*a[1][1]-a[0][1]*a[1][0];\\n  const detB=b[0][0]*b[1][1]-b[0][1]*b[1][0];\\n  function fmt(v){return Number.isInteger(v)?v:v.toFixed(3);\\n  if(typeof getAIInsight==='function'){var _ab=document.querySelector('.ai-box');if(!_ab){_ab=document.createElement('div');_ab.className='ai-box';var _rb=document.querySelector('.result-box');if(_rb)_rb.appendChild(_ab);}_ab.style.display='block';_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';getAIInsight('Give a 2-sentence practical tip about this calculation.').then(function(_t){if(_t)_ab.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p>'+_t+'</p>';else _ab.style.display='none';});}\\n}\\n  document.getElementById('mx-ri').innerHTML=\\n    `<div style=\\\"font-size:13px;font-weight:600;color:var(--c-ink2);margin-bottom:8px;\\\">Result Matrix:</div>\\n\\n      <div style=\\\"padding:10px;background:var(--c-accent-lt);border-radius:6px;text-align:center;font-weight:700;color:var(--c-accent)\\\">${fmt(res[0][0])}</div>\\n      <div style=\\\"padding:10px;background:var(--c-accent-lt);border-radius:6px;text-align:center;font-weight:700;color:var(--c-accent)\\\">${fmt(res[0][1])}</div>\\n      <div style=\\\"padding:10px;background:var(--c-accent-lt);border-radius:6px;text-align:center;font-weight:700;color:var(--c-accent)\\\">${fmt(res[1][0])}</div>\\n      <div style=\\\"padding:10px;background:var(--c-accent-lt);border-radius:6px;text-align:center;font-weight:700;color:var(--c-accent)\\\">${fmt(res[1][1])}</div>\\n    </div>`+\\n    ri('det(A)',detA.toFixed(2)+(detA===0?' — Singular ⚠️':' — Invertible ✓'))+\\n    ri('det(B)',detB.toFixed(2)+(detB===0?' — Singular ⚠️':' — Invertible ✓'));\\n  document.getElementById('mx-result').style.display='block';\\n  const _ai_mx_ai_box=document.getElementById('mx-ai-box');\\n  if(_ai_mx_ai_box){\\n    _ai_mx_ai_box.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n    _ai_mx_ai_box.style.display='block';\\n    _ai_mx_ai_box.innerHTML='<div class=\\\"ai-header\\\"><span>&#10024;</span> AI Insight</div><p><span class=\\\"spinner\\\"></span> Analyzing...</p>';\\n\\n  }\\n  drawDonut('mx-chart',['det(A)','det(B)'],[Math.abs(detA)||0.001,Math.abs(detB)||0.001],['#1a5c3a','#c8832a']);\\n}\\n\\n\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
