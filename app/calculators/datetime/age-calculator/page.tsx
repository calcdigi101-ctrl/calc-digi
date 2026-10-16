import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Age Calculator – Years, Months, Days & Minutes | CalcDigi",
  description: "Calculate your exact age in years, months, days, hours, and minutes. Find days until your next birthday, zodiac sign, and fun generation stats instantly.",
  openGraph: {
    title: "Age Calculator – Years, Months, Days & Minutes | CalcDigi",
    description: "Calculate your exact age in years, months, days, hours, and minutes. Find days until your next birthday, zodiac sign, and fun generation stats instantly.",
    type: "website",
    url: "/calculators/datetime/age-calculator"
  },
  alternates: {
    canonical: "/calculators/datetime/age-calculator"
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://calc-digi.vercel.app/" },
                  { "@type": "ListItem", "position": 2, "name": "Date & Time Calculators", "item": "https://calc-digi.vercel.app/pages/datetime" },
                  { "@type": "ListItem", "position": 3, "name": "Age Calculator", "item": "https://calc-digi.vercel.app/calculators/datetime/age-calculator" }
                ]
              },
              {
                "@type": "WebApplication",
                "name": "Age Calculator",
                "url": "https://calc-digi.vercel.app/calculators/datetime/age-calculator",
                "description": "Calculate your exact age in years, months, days, hours, and minutes. Find days until your next birthday instantly.",
                "applicationCategory": "UtilitiesApplication",
                "operatingSystem": "Any",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "How is my exact age calculated?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "We subtract your birth date from today's date step by step — full years first, then remaining months, then remaining days. This accounts for months of different lengths and leap years."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What if I was born on February 29?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Leap day birthdays are handled correctly. In non-leap years, your birthday is typically recognized on February 28 or March 1 depending on jurisdiction. Our calculator uses Feb 28 for non-leap years."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How many days old am I?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "The total days calculation counts every calendar day from your birth date to today, including all leap year days (Feb 29). Enter your birthdate above to see your exact day count."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How do I calculate someone else's age?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Simply enter their date of birth in the calculator. You can also change the 'as of' date to calculate age at a specific point in time — for example, how old someone was on a particular historical date."
                    }
                  }
                ]
              }
            ]
          })
        }}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: `<main class="calc-page">
<div class="container">
<nav aria-label="Breadcrumb" class="calc-breadcrumb">
<a href="/">Home</a><span class="bc-sep"> / </span>
<a href="/pages/datetime">Date &amp; Time</a><span class="bc-sep"> / </span>
<span aria-current="page">Age Calculator</span>
</nav>

<div class="calc-layout">
<!-- MAIN CONTENT (All guidance, explanation, tips, FAQs & related tools inside left column) -->
<div class="calc-main">
<h1>Age Calculator</h1>
<p class="calc-intro">Calculate your exact age in years, months, days, hours, and minutes. Also shows total days lived, days remaining until your next birthday, and fun generational milestones — all calculated instantly in your browser.</p>

<div class="content-section">
<h2>How Age is Calculated</h2>
<p>Age is not just the difference in calendar years — it depends on whether your birthday has passed in the current year. Our calculator computes the exact years, remaining months after your last birthday, and remaining days after your last full calendar month.</p>
<div class="formula-box">Exact Age = (As of Date − Birth Date) broken into Years → Months → Days</div>
<p>For total days lived, we count every individual calendar day including all leap year days (February 29). A person who turns 25 today has lived approximately 9,131 days including leap year adjustments.</p>
</div>

<div class="content-section">
<h2>How to Use This Calculator &amp; Tips</h2>
<p>Enter your birth date in the <strong>Date of Birth</strong> field and click <strong>Calculate Age</strong>. All computations execute 100% locally in your browser with zero data transmitted to external servers, protecting your privacy.</p>
<h3>Understanding Your Results</h3>
<p>Your chronological age is presented in full calendar years, months, and days. Underneath, a comprehensive breakdown displays total days, weeks, hours, and minutes lived, along with the day of the week you were born and an exact countdown to your next birthday.</p>
</div>

<div class="content-section">
<h2>Why Exact Age Matters</h2>
<ul>
<li><strong>Legal milestones:</strong> Driving age, voting eligibility, age of majority, and retirement benchmarks all depend on the exact birth date.</li>
<li><strong>Medical &amp; Pediatrics:</strong> Drug dosages, pediatric development percentiles, vaccine schedules, and clinical screenings are highly age-specific.</li>
<li><strong>Insurance &amp; Financial:</strong> Life, auto, and health insurance premiums often adjust exactly on the date of birth rather than calendar year-end.</li>
<li><strong>Sports &amp; Competitions:</strong> Youth athletic age-group brackets (Under-16, Under-18, Under-21) enforce strict birthdate cutoff dates.</li>
</ul>
</div>

<div class="content-section">
<h2>Fun Age &amp; Biology Facts</h2>
<ul>
<li>Your heart has beaten approximately <strong>age × 42 million</strong> times.</li>
<li>You have taken approximately <strong>age × 8.4 million</strong> breaths.</li>
<li>The average person spends roughly <strong>⅓ of their life sleeping</strong> — a 30-year-old has enjoyed approximately 10 years of sleep.</li>
<li>People born on February 29 (leap day) celebrate their true calendar birthday once every 4 years.</li>
</ul>
</div>

<div class="content-section">
<h2>Frequently Asked Questions</h2>
<div class="faq-list">
<div class="faq-item">
<button class="faq-q" type="button">How is my exact age calculated? <span aria-hidden="true" class="faq-icon">+</span></button>
<div class="faq-a">We subtract your birth date from the selected "as of" date step by step — full years first, then remaining months, then remaining days. This accurately accounts for months of varying lengths (28, 29, 30, or 31 days) and leap years.</div>
</div>
<div class="faq-item">
<button class="faq-q" type="button">What if I was born on February 29? <span aria-hidden="true" class="faq-icon">+</span></button>
<div class="faq-a">Leap day birthdays are handled correctly. In non-leap years, your birthday milestone is recognized on February 28. In leap years, your full birthday date occurs on February 29.</div>
</div>
<div class="faq-item">
<button class="faq-q" type="button">How many days old am I? <span aria-hidden="true" class="faq-icon">+</span></button>
<div class="faq-a">The total days calculation counts every calendar day from your birth date to the selected as-of date, including all leap year days. Enter your birthdate above to see your exact day count.</div>
</div>
<div class="faq-item">
<button class="faq-q" type="button">Can I calculate someone's historical age? <span aria-hidden="true" class="faq-icon">+</span></button>
<div class="faq-a">Yes! Simply change the "Calculate Age As Of" date to any target date in the past or future to see how old they were or will be on that specific date.</div>
</div>
</div>
</div>

<div class="content-section">
<h2>Related Date &amp; Time Calculators</h2>
<div class="related-grid">
<a class="related-card" href="/calculators/datetime/date-difference-calculator"><span class="rc-icon">📅</span><span class="rc-name">Date Difference</span></a>
<a class="related-card" href="/calculators/datetime/birthday-calculator"><span class="rc-icon">🎂</span><span class="rc-name">Birthday Calculator</span></a>
<a class="related-card" href="/calculators/datetime/days-until-calculator"><span class="rc-icon">⏳</span><span class="rc-name">Days Until</span></a>
<a class="related-card" href="/calculators/datetime/time-zone-converter"><span class="rc-icon">🌍</span><span class="rc-name">Time Zone Converter</span></a>
</div>
</div>

</div><!-- end calc-main -->

<!-- SIDEBAR WIDGET (Sticky Calculator on Desktop, Stacks gracefully on Mobile) -->
<div class="calc-sidebar">
<div class="calc-widget">
<h2>Age Calculator</h2>
<div class="form-group">
<label for="age-dob">Date of Birth</label>
<input id="age-dob" type="date" value="1995-06-15"/>
</div>
<div class="form-group">
<label for="age-asof">Calculate Age As Of</label>
<input id="age-asof" type="date"/>
</div>
<button class="calc-btn" type="button" onclick="calcAge()">Calculate Age</button>
<button class="calc-btn" type="button" onclick="resetAge()" style="background:var(--c-rule2);color:var(--c-ink);margin-top:8px;">Reset</button>

<div class="result-box" id="age-result" style="display:none;">
<div id="age-ri"></div>
<div class="result-chart"><canvas height="160" id="age-chart" width="220"></canvas></div>
<div class="ai-box" id="age-ai" style="display:none;margin-top:14px;"></div>
</div>

<div id="age-actions" style="display:none;gap:8px;margin-top:12px;">
<button class="calc-btn" id="print-btn-age" type="button" onclick="printResult('age-result','Age Calculator')" style="background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;"><span>🖨️</span> Print</button>
<button class="calc-btn" type="button" onclick="shareResult('Age Calculator')" style="background:var(--c-rule2);color:var(--c-ink);font-size:13px;padding:9px;margin-top:0;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;"><span>🔗</span> Share</button>
</div>
</div>
</div><!-- end calc-sidebar -->

</div><!-- end calc-layout -->
</div><!-- end container -->
</main>`
        }}
      />
      <Script
        id="calc-script-age-calculator"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
// Set today as default for as-of date and max limit on DOB
(function initDateDefaults() {
  var todayStr = new Date().toISOString().split('T')[0];
  var asofEl = document.getElementById('age-asof');
  var dobEl = document.getElementById('age-dob');
  if (asofEl && !asofEl.value) asofEl.value = todayStr;
  if (dobEl) dobEl.setAttribute('max', todayStr);
})();

function resetAge() {
  var dobEl = document.getElementById('age-dob');
  var asofEl = document.getElementById('age-asof');
  var resEl = document.getElementById('age-result');
  var actEl = document.getElementById('age-actions');
  var aiEl = document.getElementById('age-ai');
  
  if (dobEl) dobEl.value = '';
  if (asofEl) asofEl.value = new Date().toISOString().split('T')[0];
  if (resEl) resEl.style.display = 'none';
  if (actEl) actEl.style.display = 'none';
  if (aiEl) { aiEl.style.display = 'none'; aiEl.innerHTML = ''; }
  
  var canvas = document.getElementById('age-chart');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function parseLocalDate(val) {
  if (!val) return null;
  var parts = val.split('-').map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0, 0);
}

function getZodiac(m, d) {
  if ((m===3&&d>=21)||(m===4&&d<=19)) return '♈ Aries';
  if ((m===4&&d>=20)||(m===5&&d<=20)) return '♉ Taurus';
  if ((m===5&&d>=21)||(m===6&&d<=20)) return '♊ Gemini';
  if ((m===6&&d>=21)||(m===7&&d<=22)) return '♋ Cancer';
  if ((m===7&&d>=23)||(m===8&&d<=22)) return '♌ Leo';
  if ((m===8&&d>=23)||(m===9&&d<=22)) return '♍ Virgo';
  if ((m===9&&d>=23)||(m===10&&d<=22)) return '♎ Libra';
  if ((m===10&&d>=23)||(m===11&&d<=21)) return '♏ Scorpio';
  if ((m===11&&d>=22)||(m===12&&d<=21)) return '♐ Sagittarius';
  if ((m===12&&d>=22)||(m===1&&d<=19)) return '♑ Capricorn';
  if ((m===1&&d>=20)||(m===2&&d<=18)) return '♒ Aquarius';
  return '♓ Pisces';
}

function getChineseZodiac(year) {
  var animals = ['Rat 🐀','Ox 🐂','Tiger 🐅','Rabbit 🐇','Dragon 🐉','Snake 🐍','Horse 🐎','Goat 🐐','Monkey 🐒','Rooster 🐓','Dog 🐕','Pig 🐖'];
  return animals[(year - 4) % 12] || '';
}

function getGeneration(year) {
  if (year >= 2013) return 'Generation Alpha';
  if (year >= 1997) return 'Generation Z';
  if (year >= 1981) return 'Millennial (Gen Y)';
  if (year >= 1965) return 'Generation X';
  if (year >= 1946) return 'Baby Boomer';
  return 'Silent Generation';
}

function plural(val, unit) {
  return val + ' ' + (val === 1 ? unit : unit + 's');
}

function calcAge() {
  var dobVal = document.getElementById('age-dob')?.value;
  var asofVal = document.getElementById('age-asof')?.value;
  
  if (!dobVal) { 
    alert('Please enter your date of birth.'); 
    return; 
  }
  
  var dob = parseLocalDate(dobVal);
  var asof = asofVal ? parseLocalDate(asofVal) : new Date();
  asof.setHours(0,0,0,0);
  
  if (dob >= asof) { 
    alert('Date of birth must be before the calculation date.'); 
    return; 
  }

  // Exact calendar difference
  var years = asof.getFullYear() - dob.getFullYear();
  var months = asof.getMonth() - dob.getMonth();
  var days = asof.getDate() - dob.getDate();
  
  if (days < 0) {
    months--;
    var prevMonthLastDay = new Date(asof.getFullYear(), asof.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  // Time totals
  var totalDays = Math.round((asof.getTime() - dob.getTime()) / 86400000);
  var totalWeeks = Math.floor(totalDays / 7);
  var remainingDaysAfterWeeks = totalDays % 7;
  var totalHours = totalDays * 24;
  var totalMinutes = totalHours * 60;
  var totalSeconds = totalMinutes * 60;

  // Next Birthday
  var nextBD = new Date(asof.getFullYear(), dob.getMonth(), dob.getDate());
  if (dob.getMonth() === 1 && dob.getDate() === 29) {
    var isLeap = (asof.getFullYear() % 4 === 0 && (asof.getFullYear() % 100 !== 0 || asof.getFullYear() % 400 === 0));
    if (!isLeap) nextBD = new Date(asof.getFullYear(), 1, 28);
  }
  if (nextBD <= asof) {
    var nextYear = asof.getFullYear() + 1;
    var isNextLeap = (nextYear % 4 === 0 && (nextYear % 100 !== 0 || nextYear % 400 === 0));
    nextBD = (dob.getMonth() === 1 && dob.getDate() === 29 && !isNextLeap) ? new Date(nextYear, 1, 28) : new Date(nextYear, dob.getMonth(), dob.getDate());
  }
  var daysUntilBD = Math.round((nextBD.getTime() - asof.getTime()) / 86400000);
  var bdStr = nextBD.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  // Day of week born
  var dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var bornOn = dayNames[dob.getDay()];

  // Generational & Astrological data
  var zodiac = getZodiac(dob.getMonth() + 1, dob.getDate());
  var cz = getChineseZodiac(dob.getFullYear());
  var gen = getGeneration(dob.getFullYear());

  // Format primary age string
  var ageString = plural(years, 'year') + ', ' + plural(months, 'month') + ', ' + plural(days, 'day');

  // Render Result Items
  var riContainer = document.getElementById('age-ri');
  if (riContainer) {
    riContainer.innerHTML =
      ri('Exact Age', '<strong style="font-size:24px;color:var(--c-accent);display:block;line-height:1.2;">' + ageString + '</strong>', true) +
      ri('Total Days Lived', totalDays.toLocaleString() + ' days') +
      ri('Total Weeks', totalWeeks.toLocaleString() + ' weeks' + (remainingDaysAfterWeeks ? ' + ' + plural(remainingDaysAfterWeeks, 'day') : '')) +
      ri('Total Hours', totalHours.toLocaleString() + ' hours') +
      ri('Total Minutes', totalMinutes.toLocaleString() + ' minutes') +
      ri('Born On', bornOn) +
      ri('Next Birthday', bdStr + ' (' + daysUntilBD + ' days away)');
  }

  // Show results and actions
  var resBox = document.getElementById('age-result');
  var actBox = document.getElementById('age-actions');
  if (resBox) resBox.style.display = 'block';
  if (actBox) actBox.style.display = 'flex';

  // Draw Donut Chart
  if (typeof drawDonut === 'function') {
    drawDonut('age-chart', ['Years', 'Months', 'Days'], [years || 1, months || 1, days || 1], ['#18533b', '#c8832a', '#2563eb']);
  }

  // Client-side Instant Insight Box
  var aiBox = document.getElementById('age-ai');
  if (aiBox) {
    aiBox.style.display = 'block';
    aiBox.innerHTML = 
      '<div class=\"ai-header\"><span>✨</span> Life &amp; Demographic Milestones</div>' +
      '<div style=\"display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px;margin-top:6px;\">' +
      '<div style=\"padding:8px;background:rgba(255,255,255,0.7);dark:bg-slate-800;border-radius:8px;\"><strong>Generation:</strong> ' + gen + '</div>' +
      '<div style=\"padding:8px;background:rgba(255,255,255,0.7);dark:bg-slate-800;border-radius:8px;\"><strong>Sun Sign:</strong> ' + zodiac + '</div>' +
      '<div style=\"padding:8px;background:rgba(255,255,255,0.7);dark:bg-slate-800;border-radius:8px;\"><strong>Chinese Zodiac:</strong> ' + cz + '</div>' +
      '<div style=\"padding:8px;background:rgba(255,255,255,0.7);dark:bg-slate-800;border-radius:8px;\"><strong>Heartbeats:</strong> ~' + (years * 42).toLocaleString() + 'M</div>' +
      '</div>';
  }
}

if (typeof initFAQ === 'function') initFAQ();
if (typeof initScrollReveal === 'function') initScrollReveal();
`
        }}
      />
    </>
  );
}
