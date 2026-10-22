import type { Metadata } from "next";
import Script from "next/script";
import { CalcPage, calcMetadata } from "@/components/flagship/CalcPage";

const PATH = "/calculators/math/distance-formula-calculator";
const TITLE = "Distance Formula Calculator – 2D & 3D Coordinates | CalcDigi";
const DESCRIPTION = "Find the straight-line distance between two 2D or 3D coordinate points instantly.";

export const metadata = calcMetadata(PATH, TITLE, DESCRIPTION);

export default function Page() {
  return (
    <CalcPage
      path={PATH}
      category={{ href: "/pages/math", label: "Math" }}
      title="Distance Formula Calculator"
      intro="Find the straight-line (Euclidean) distance between two points in 2D or 3D coordinate space."
      description={DESCRIPTION}
      appCategory="UtilitiesApplication"
      mathExpression="d = √[(x₂−x₁)² + (y₂−y₁)²]"
      related={[
        {
                "href": "/calculators/math/slope-calculator",
                "icon": "📉",
                "name": "Slope Calculator"
        },
        {
                "href": "/calculators/math/pythagorean-theorem-calculator",
                "icon": "🔺",
                "name": "Pythagorean Theorem"
        },
        {
                "href": "/calculators/geography/distance-between-cities-calculator",
                "icon": "🌐",
                "name": "Distance Between Cities"
        },
        {
                "href": "/calculators/geography/latitude-longitude-calculator",
                "icon": "📍",
                "name": "Latitude/Longitude"
        }
]}
      faq={[
        {
                "q": "How is the distance formula related to Pythagorean theorem?",
                "a": "The distance formula is literally the Pythagorean theorem — the horizontal and vertical differences between the points form the two legs of a right triangle, and the distance is the hypotenuse."
        },
        {
                "q": "Can I use this for 3D coordinates?",
                "a": "Yes — check the 3D option to add a z-coordinate for both points, extending the same formula with an additional squared term."
        },
        {
                "q": "What units does the result use?",
                "a": "Whatever units your coordinates are in — the formula is unit-agnostic, so the distance comes out in the same units as your x, y (and z) values."
        },
        {
                "q": "Where is this formula used in real life?",
                "a": "GPS and mapping systems, computer graphics, robotics path planning, and physics all rely on the distance formula to measure separation between points."
        },
        {
                "q": "Does order of the points matter?",
                "a": "No — distance is always positive and symmetric, so it doesn't matter which point you label \"1\" and which you label \"2.\" The result is identical either way."
        },
        {
                "q": "Can I use this for real-world map distances?",
                "a": "This calculates straight-line (Euclidean) distance on a flat plane. For distances between real-world GPS coordinates on the curved Earth, use the Distance Between Cities calculator instead, which accounts for the Earth's curvature."
        }
]}
      html={"<div class=\"content-section\"><h2>Formula</h2><div class=\"formula-box\">d = √[(x₂−x₁)² + (y₂−y₁)²]</div>\n<div class=\"content-section\"><h2>Worked Example</h2><p>Finding the distance between (2, 3) and (8, 11): d = √[(8−2)² + (11−3)²] = √[36 + 64] = √100 = 10 units exactly. In 3D, adding a z-coordinate simply adds one more squared term under the same square root.</p></div>\n<div class=\"content-section\"><h2>Real-World Applications</h2><ul><li><strong>GPS and mapping:</strong> Measuring straight-line distance between coordinates</li><li><strong>Video games and graphics:</strong> Calculating distances between objects for collision detection</li><li><strong>Robotics:</strong> Path planning between waypoints</li><li><strong>Geometry proofs:</strong> Verifying triangle side lengths and shape properties</li></ul></div>"}
    >
      <div className="max-w-xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: "<div class=\"calc-widget\">\n<h2>Distance Formula Calculator</h2><div class=\"form-row\"><div class=\"form-group\"><label for=\"df-x1\">x₁</label><input id=\"df-x1\" step=\"any\" type=\"number\" value=\"2\"/></div><div class=\"form-group\"><label for=\"df-y1\">y₁</label><input id=\"df-y1\" step=\"any\" type=\"number\" value=\"3\"/></div></div><div class=\"form-row\"><div class=\"form-group\"><label for=\"df-x2\">x₂</label><input id=\"df-x2\" step=\"any\" type=\"number\" value=\"8\"/></div><div class=\"form-group\"><label for=\"df-y2\">y₂</label><input id=\"df-y2\" step=\"any\" type=\"number\" value=\"11\"/></div></div><div class=\"form-group\"><label style=\"display:flex;align-items:center;gap:8px;font-weight:400;\"><input id=\"df-3d\" onchange=\"document.getElementById('df-z-row').style.display=this.checked?'flex':'none'\" style=\"width:auto;\" type=\"checkbox\"/> 3D (add z-coordinate)</label></div><div class=\"form-row\" id=\"df-z-row\" style=\"display:none;\"><div class=\"form-group\"><label for=\"df-z1\">z₁</label><input id=\"df-z1\" step=\"any\" type=\"number\" value=\"0\"/></div><div class=\"form-group\"><label for=\"df-z2\">z₂</label><input id=\"df-z2\" step=\"any\" type=\"number\" value=\"0\"/></div></div><button class=\"calc-btn\" onclick=\"calcDistanceFormula()\">Calculate Distance</button><button class=\"calc-btn\" onclick=\"document.getElementById('df-result').style.display='none'\" style=\"background:var(--c-rule2);color:var(--c-ink);margin-top:8px;\">Reset</button><div class=\"result-box\" id=\"df-result\" style=\"display:none;\"><div id=\"df-ri\"></div><div class=\"ai-box\" id=\"df-result-ai\" style=\"display:none;\"></div></div><div style=\"display:flex;gap:8px;margin-top:10px;\"><button class=\"calc-btn\" id=\"print-btn-df-result\" onclick=\"printResult('df-result','Distance Formula Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🖨️</span> Print</button><button class=\"calc-btn\" onclick=\"shareResult('Distance Formula Calculator')\" style=\"background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;\"><span>🔗</span> Share</button>\n</div>" }} />
        <Script id="calc-script-distance-formula-calculator" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: "function calcDistanceFormula(){\\n  const x1=parseFloat(document.getElementById('df-x1').value);\\n  const y1=parseFloat(document.getElementById('df-y1').value);\\n  const x2=parseFloat(document.getElementById('df-x2').value);\\n  const y2=parseFloat(document.getElementById('df-y2').value);\\n  const is3d=document.getElementById('df-3d').checked;\\n  let z1=0,z2=0;\\n  if(is3d){\\n    z1=parseFloat(document.getElementById('df-z1').value)||0;\\n    z2=parseFloat(document.getElementById('df-z2').value)||0;\\n  }\\n  if([x1,y1,x2,y2].some(function(v){return isNaN(v);})){alert('Enter valid coordinates.');return;}\\n  const dist=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2)+Math.pow(z2-z1,2));\\n  document.getElementById('df-ri').innerHTML=\\n    ri('Distance','<strong style=\\\"font-size:24px;color:var(--c-accent)\\\">'+dist.toFixed(4)+'</strong>',true)+\\n    ri('Point 1',is3d?('('+x1+', '+y1+', '+z1+')'):('('+x1+', '+y1+')'))+\\n    ri('Point 2',is3d?('('+x2+', '+y2+', '+z2+')'):('('+x2+', '+y2+')'));\\n  document.getElementById('df-result').style.display='block';\\n}\\ninitFAQ();initScrollReveal();" }} />
      </div>
    </CalcPage>
  );
}
