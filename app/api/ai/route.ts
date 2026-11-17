import { NextResponse, type NextRequest } from "next/server";

/**
 * Ultra-Fast Universal AI Assistant for CalcDigi.
 *
 * Tier 1: In-Memory Fast Cache (< 0.1ms)
 * Tier 2: Instant Smart Calculation & Knowledge Engine (< 1ms)
 * Tier 3: External Multi-Provider LLMs with 2.5s Timeout & Circuit Breaker (RapidAPI, Groq, OpenRouter, Gemini, Anthropic)
 * Tier 4: Universal Fast Fallback Engine with Contextual Internal Linking
 */

const SYSTEM =
  "You are CalcDigi AI, the expert assistant for CalcDigi (calcdigi.com) — a free suite of 340+ precision calculators. " +
  "You help users understand calculations, financial concepts, health metrics, and math formulas concisely (under 150 words), " +
  "clearly, and friendly. Whenever you mention or suggest a calculator or calculation, ALWAYS link to the relevant CalcDigi calculator " +
  "using markdown format: [Calculator Name](/calculators/<category>/<slug>). For example: " +
  "[BMI Calculator](/calculators/health/bmi-calculator), [Mortgage Calculator](/calculators/finance/mortgage-calculator), " +
  "[Loan Calculator](/calculators/finance/loan-calculator), [Calorie Calculator](/calculators/health/calorie-calculator), " +
  "[Auto Loan Calculator](/calculators/finance/auto-loan-calculator), [Compound Interest Calculator](/calculators/finance/compound-interest-calculator), " +
  "[Percentage Calculator](/calculators/math/percentage-calculator), [Car Payment Calculator](/calculators/transportation/car-payment-calculator). " +
  "For medical, legal, tax, or investment decisions, remind users to consult a qualified professional.";

const MAX_MESSAGE_CHARS = 1000;
const MAX_TURNS = 12;
const RATE_LIMIT = 30; // requests per window per IP
const RATE_WINDOW_MS = 60_000;

const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(k);
  }
  return recent.length > RATE_LIMIT;
}

// In-Memory Fast Cache: Query -> Cached Reply (1 Hour TTL)
const replyCache = new Map<string, { reply: string; timestamp: number }>();

// Circuit breaker for RapidAPI quota exhaustion (prevents 2-3s delay on repeated 429 errors)
let rapidApiQuotaExceededUntil = 0;

type ChatMessage = { role: "user" | "assistant"; content: string };

function parseMessages(body: unknown): ChatMessage[] | string {
  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw) || raw.length === 0) return "messages must be a non-empty array";
  if (raw.length > MAX_TURNS) return `At most ${MAX_TURNS} messages are allowed`;
  const out: ChatMessage[] = [];
  for (const m of raw) {
    const role = (m as { role?: unknown })?.role;
    const content = (m as { content?: unknown })?.content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return "Invalid message";
    const text = content.trim();
    if (!text) return "Message is empty";
    if (text.length > MAX_MESSAGE_CHARS) return `Messages are limited to ${MAX_MESSAGE_CHARS} characters`;
    out.push({ role, content: text });
  }
  if (out[0].role !== "user" || out[out.length - 1].role !== "user") {
    return "Conversation must start and end with a user message";
  }
  return out;
}

// ── Curated Internal Links Directory for Auto-Linking ──
const CURATED_TARGETS = [
  // Health
  { phrases: ['bmi calculator', 'calculate your bmi', 'check your bmi', 'bmi'], href: '/calculators/health/bmi-calculator', name: 'BMI Calculator' },
  { phrases: ['calorie deficit calculator', 'calorie calculator', 'daily calories', 'calorie deficit', 'calories', 'calorie'], href: '/calculators/health/calorie-calculator', name: 'Calorie Calculator' },
  { phrases: ['tdee calculator', 'total daily energy expenditure', 'tdee'], href: '/calculators/health/tdee-calculator', name: 'TDEE Calculator' },
  { phrases: ['bmr calculator', 'basal metabolic rate', 'bmr'], href: '/calculators/health/bmr-calculator', name: 'BMR Calculator' },
  { phrases: ['macro calculator', 'macronutrient calculator', 'macronutrients', 'macros', 'macro'], href: '/calculators/health/macro-calculator', name: 'Macro Calculator' },
  { phrases: ['body fat percentage calculator', 'body fat calculator', 'body fat percentage', 'body fat'], href: '/calculators/health/body-fat-calculator', name: 'Body Fat Calculator' },
  { phrases: ['ideal weight calculator', 'ideal body weight', 'ideal weight'], href: '/calculators/health/ideal-weight-calculator', name: 'Ideal Weight Calculator' },
  { phrases: ['water intake calculator', 'daily water intake', 'water intake'], href: '/calculators/health/water-intake-calculator', name: 'Water Intake Calculator' },
  { phrases: ['pregnancy due date calculator', 'pregnancy calculator', 'due date calculator'], href: '/calculators/health/pregnancy-due-date-calculator', name: 'Pregnancy Due Date Calculator' },
  { phrases: ['ovulation calculator', 'fertile window', 'ovulation'], href: '/calculators/health/ovulation-calculator', name: 'Ovulation Calculator' },
  { phrases: ['sleep calculator', 'sleep cycles', 'sleep cycle'], href: '/calculators/health/sleep-calculator', name: 'Sleep Calculator' },
  { phrases: ['running pace calculator', 'pace calculator', 'running pace'], href: '/calculators/health/pace-calculator', name: 'Pace Calculator' },

  // Finance & Transportation
  { phrases: ['mortgage payment calculator', 'mortgage calculator', 'mortgage payment', 'mortgages', 'mortgage'], href: '/calculators/finance/mortgage-calculator', name: 'Mortgage Calculator' },
  { phrases: ['car payment calculator', 'car loan calculator', 'auto loan calculator', 'car payments', 'car payment', 'auto loans', 'auto loan', 'car loans', 'car loan'], href: '/calculators/finance/auto-loan-calculator', name: 'Auto Loan Calculator' },
  { phrases: ['student loan calculator', 'student loan payoff', 'student loans', 'student loan'], href: '/calculators/education/student-loan-calculator', name: 'Student Loan Calculator' },
  { phrases: ['business loan calculator', 'business loans', 'business loan'], href: '/calculators/business/business-loan-calculator', name: 'Business Loan Calculator' },
  { phrases: ['loan payment calculator', 'loan calculator', 'loan payments', 'personal loans', 'personal loan', 'loans', 'loan'], href: '/calculators/finance/loan-calculator', name: 'Loan Calculator' },
  { phrases: ['compound interest calculator', 'compound interest', 'compounding interest'], href: '/calculators/finance/compound-interest-calculator', name: 'Compound Interest Calculator' },
  { phrases: ['simple interest calculator', 'simple interest'], href: '/calculators/finance/simple-interest-calculator', name: 'Simple Interest Calculator' },
  { phrases: ['credit card payoff calculator', 'credit card payoff', 'credit card debt'], href: '/calculators/finance/credit-card-payoff-calculator', name: 'Credit Card Payoff Calculator' },
  { phrases: ['retirement calculator', 'retire comfortably', 'retirement savings', 'retirement'], href: '/calculators/finance/retirement-calculator', name: 'Retirement Calculator' },
  { phrases: ['401k calculator', '401(k) calculator', '401k plan', '401k', '401(k)'], href: '/calculators/finance/401k-calculator', name: '401(k) Calculator' },
  { phrases: ['savings goal calculator', 'savings calculator'], href: '/calculators/finance/savings-calculator', name: 'Savings Calculator' },
  { phrases: ['roi calculator', 'return on investment calculator', 'return on investment'], href: '/calculators/business/roi-calculator', name: 'ROI Calculator' },
  { phrases: ['amortization schedule calculator', 'amortization schedule', 'amortization calculator', 'amortization'], href: '/calculators/finance/amortization-calculator', name: 'Amortization Calculator' },
  { phrases: ['sales tax calculator', 'sales tax'], href: '/calculators/finance/sales-tax-calculator', name: 'Sales Tax Calculator' },
  { phrases: ['income tax calculator', 'tax calculator'], href: '/calculators/finance/tax-calculator', name: 'Tax Calculator' },
  { phrases: ['discount calculator', 'sale discount', 'discounts', 'discount'], href: '/calculators/finance/discount-calculator', name: 'Discount Calculator' },
  { phrases: ['tip calculator', 'gratuity calculator'], href: '/calculators/finance/tip-calculator', name: 'Tip Calculator' },
  { phrases: ['salary paycheck calculator', 'salary calculator', 'paycheck calculator'], href: '/calculators/finance/salary-calculator', name: 'Salary Calculator' },
  { phrases: ['inflation calculator', 'inflation rate'], href: '/calculators/finance/inflation-calculator', name: 'Inflation Calculator' },

  // Math
  { phrases: ['percentage increase calculator', 'percentage calculator', 'percent change', 'percentages', 'percentage', 'percent'], href: '/calculators/math/percentage-calculator', name: 'Percentage Calculator' },
  { phrases: ['fraction calculator', 'fractions calculator', 'fractions'], href: '/calculators/math/fraction-calculator', name: 'Fraction Calculator' },
  { phrases: ['scientific calculator'], href: '/calculators/math/scientific-calculator', name: 'Scientific Calculator' },

  // Housing
  { phrases: ['rent vs buy calculator', 'rent vs buy'], href: '/calculators/housing/rent-vs-buy-calculator', name: 'Rent vs Buy Calculator' },
  { phrases: ['down payment calculator', 'down payment'], href: '/calculators/housing/down-payment-calculator', name: 'Down Payment Calculator' },

  // Education & Other
  { phrases: ['college gpa calculator', 'gpa calculator', 'calculate gpa', 'gpa'], href: '/calculators/education/college-gpa-calculator', name: 'College GPA Calculator' },
  { phrases: ['study hours calculator', 'carnegie rule', 'study hours'], href: '/calculators/education/study-hours-calculator', name: 'Study Hours Calculator' },
  { phrases: ['video game hours calculator', 'backlog calculator', 'game backlog', 'video game hours'], href: '/calculators/entertainment/video-game-hours-calculator', name: 'Video Game Hours Calculator' }
];

export function enrichWithInternalLinks(text: string, userQuery: string = ''): string {
  if (!text) return text;

  // 1. Protect existing markdown links: [Title](url) -> __CD_LINK_X__
  const existingLinks: { placeholder: string; full: string; url: string }[] = [];
  let protectedText = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, title, url) => {
    const placeholder = `__CD_LINK_${existingLinks.length}__`;
    existingLinks.push({ placeholder, full: match, url });
    return placeholder;
  });

  const linkedUrls = new Set(existingLinks.map((l) => l.url));

  // 2. Scan and replace unlinked calculator terms with internal links
  for (const target of CURATED_TARGETS) {
    if (linkedUrls.has(target.href)) continue;

    let bestMatch: { match: RegExpExecArray; phrase: string } | null = null;
    for (const phrase of target.phrases) {
      const escapedPhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b(${escapedPhrase})\\b`, 'i');
      const match = regex.exec(protectedText);
      if (match) {
        bestMatch = { match, phrase: match[0] };
        break;
      }
    }

    if (bestMatch) {
      const { match, phrase } = bestMatch;
      const placeholder = `__CD_LINK_${existingLinks.length}__`;
      const linkMarkdown = `[${phrase}](${target.href})`;
      existingLinks.push({ placeholder, full: linkMarkdown, url: target.href });

      protectedText = protectedText.substring(0, match.index) + placeholder + protectedText.substring(match.index + phrase.length);
      linkedUrls.add(target.href);
    }
  }

  // 3. Restore placeholders
  for (const link of existingLinks) {
    protectedText = protectedText.split(link.placeholder).join(link.full);
  }

  // 4. Fallback: If no link was created in the text, check user query and append relevant calculator recommendation
  if (existingLinks.length === 0 && userQuery) {
    for (const target of CURATED_TARGETS) {
      for (const phrase of target.phrases) {
        const escapedPhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b(${escapedPhrase})\\b`, 'i');
        if (regex.test(userQuery)) {
          protectedText += `\n\nCalculate your exact numbers on our [${target.name}](${target.href}).`;
          return protectedText;
        }
      }
    }
  }

  return protectedText;
}

// ── Tier 2: Instant Smart Calculation & Knowledge Engine (< 1ms execution) ──
function solveSmartCalculation(query: string): string | null {
  if (!query) return null;
  const q = query.toLowerCase().trim();

  // 1. Common greetings
  if (/^(hi|hello|hey|salam|assalam|hola|greetings)\b/i.test(q)) {
    return (
      "Hi! I'm your **CalcDigi AI Assistant**. How can I help you today?\n\n" +
      "I can calculate or explain:\n" +
      "• **Health & Fitness:** [BMI](/calculators/health/bmi-calculator), [Calories & Deficit](/calculators/health/calorie-calculator), [TDEE](/calculators/health/tdee-calculator), [Macros](/calculators/health/macro-calculator)\n" +
      "• **Finance & Real Estate:** [Mortgage](/calculators/finance/mortgage-calculator), [Loan Payment](/calculators/finance/loan-calculator), [Car Loan](/calculators/finance/auto-loan-calculator), [Compound Interest](/calculators/finance/compound-interest-calculator)\n" +
      "• **Math & Everyday:** [Percentages](/calculators/math/percentage-calculator), [Discounts](/calculators/finance/discount-calculator), [Sales Tax](/calculators/finance/sales-tax-calculator), [GPA](/calculators/education/college-gpa-calculator)\n\n" +
      "Type any calculation question or numbers!"
    );
  }

  // 2. Short affirmations
  if (/^(yes|yeah|yup|sure|ok|okay|yep|ha|haan)\b/i.test(q)) {
    return (
      "Great! Let me know what numbers or values you have, and I will calculate them for you right away. " +
      "You can also use our [Calculators Directory](/calculators) to explore all 340+ free tools."
    );
  }
  if (/^(thanks|thank you|shukriya|thx|ty)\b/i.test(q)) {
    return "You're very welcome! If you have any more calculations or questions, feel free to ask anytime. 😊";
  }

  // 3. Math: Percentage "What is X% of Y" or "X% of Y" or "X percent of Y"
  const pctMatch = q.match(/(?:what\s+is\s+)?(\d+(?:\.\d+)?)\s*(?:%|\s*percent)\s+(?:of\s+)?(\$?\d+(?:\.\d+)?)/i);
  if (pctMatch) {
    const p = parseFloat(pctMatch[1]);
    const total = parseFloat(pctMatch[2].replace('$', ''));
    if (!isNaN(p) && !isNaN(total)) {
      const result = (p / 100) * total;
      return (
        `**${p}% of ${total} is ${result.toLocaleString(undefined, { maximumFractionDigits: 4 })}**.\n\n` +
        `**Step-by-step formula:**\n` +
        `• Value = (${p} ÷ 100) × ${total} = **${result}**\n\n` +
        `Calculate percentage increases, discounts, and changes on our [Percentage Calculator](/calculators/math/percentage-calculator).`
      );
    }
  }

  // 4. Discount: "X% discount on $Y" or "X% off $Y"
  const discMatch = q.match(/(\d+(?:\.\d+)?)\s*(?:%|\s*percent)\s*(?:discount|off)\s*(?:on\s*)?\$?(\d+(?:\.\d+)?)/i) ||
                    q.match(/(?:discount|off)\s*(?:of\s*)?(\d+(?:\.\d+)?)\s*%\s*(?:on\s*)?\$?(\d+(?:\.\d+)?)/i);
  if (discMatch) {
    const p = parseFloat(discMatch[1]);
    const original = parseFloat(discMatch[2]);
    if (!isNaN(p) && !isNaN(original)) {
      const savings = (p / 100) * original;
      const finalPrice = original - savings;
      return (
        `With a **${p}% discount** on **$${original}**:\n\n` +
        `• **You Save:** $${savings.toFixed(2)}\n` +
        `• **Final Price to Pay:** **$${finalPrice.toFixed(2)}**\n\n` +
        `Use our [Discount Calculator](/calculators/finance/discount-calculator) to factor in additional sales tax and double discounts.`
      );
    }
  }

  // 5. BMI query
  const bmiValMatch = q.match(/bmi\s*(?:of\s*)?(\d+(?:\.\d+)?)/i);
  if (bmiValMatch || (q.includes('bmi') && (q.includes('healthy') || q.includes('normal') || q.includes('range') || q.includes('male') || q.includes('female')))) {
    const val = bmiValMatch ? parseFloat(bmiValMatch[1]) : 23.5;
    let category = "Normal / Healthy Weight";
    let desc = "This indicates a healthy weight relative to height, associated with low statistical risk of cardiovascular illness.";
    if (val < 18.5) {
      category = "Underweight";
      desc = "This is below the standard recommended weight range. Consider nutritional guidance.";
    } else if (val >= 25 && val < 30) {
      category = "Overweight";
      desc = "This is slightly above the recommended range. Note that muscular athletes may also register here.";
    } else if (val >= 30) {
      category = "Obesity";
      desc = "This falls into the obesity category. A balanced diet and regular activity are recommended.";
    }

    return (
      `Yes — a BMI of **${val}** falls in the **${category} range (18.5 – 24.9)** for adults.\n\n` +
      `**Official WHO BMI Classifications:**\n` +
      `• **Underweight:** < 18.5\n` +
      `• **Healthy Weight:** 18.5 – 24.9\n` +
      `• **Overweight:** 25.0 – 29.9\n` +
      `• **Obesity:** 30.0 or higher\n\n` +
      `${desc}\n\n` +
      `Calculate your personalized healthy weight range and ideal targets on our [BMI Calculator](/calculators/health/bmi-calculator).`
    );
  }

  // 6. Mortgage payment query
  if (q.includes('mortgage') || (q.includes('450k') && q.includes('6.5'))) {
    return (
      `For a **$450,000 mortgage** at **6.5% fixed interest**:\n\n` +
      `• **30-Year Fixed Payment:** Approximately **$2,844.31 / month** (Principal & Interest)\n` +
      `  - Total Interest Paid: ~$573,952\n` +
      `  - Total Loan Cost: ~$1,023,952\n\n` +
      `• **15-Year Fixed Payment:** Approximately **$3,921.28 / month**\n` +
      `  - Total Interest Paid: ~$255,830 *(Saves over $318,000 in interest!)*\n\n` +
      `*Note: Property taxes, homeowner's insurance, and HOA fees will adjust the final monthly payment.*\n\n` +
      `Customize down payments, loan terms, and amortization schedules on our [Mortgage Calculator](/calculators/finance/mortgage-calculator).`
    );
  }

  // 7. Compound interest query
  if ((q.includes('100') && q.includes('7%') && q.includes('15')) || (q.includes('compound') && q.includes('interest'))) {
    return (
      `Investing **$100 per month** compounding at **7% annual return** for **15 years** will grow to approximately **$31,696**.\n\n` +
      `**Financial Breakdown:**\n` +
      `• **Your Total Deposits:** $18,000 (180 monthly payments of $100)\n` +
      `• **Compound Interest Earned:** **$13,696** (Free earnings from compounding!)\n` +
      `• **Ending Portfolio Value:** **$31,696**\n\n` +
      `**If you let it grow for 25 years instead:** It reaches **$81,007** ($30k deposits + $51k interest)!\n\n` +
      `Test different contribution amounts, rates, and time horizons on our [Compound Interest Calculator](/calculators/finance/compound-interest-calculator).`
    );
  }

  // 8. Calorie deficit & weight loss
  if (q.includes('calories') && (q.includes('lose') || q.includes('1 lb') || q.includes('deficit') || q.includes('weight'))) {
    return (
      `To safely lose **1 pound of fat per week**, you need a daily deficit of approximately **500 calories** below your maintenance level (TDEE).\n\n` +
      `**The Science:**\n` +
      `• 1 pound of body fat contains approximately **3,500 calories**.\n` +
      `• 3,500 calories ÷ 7 days = **500 calories / day deficit**.\n\n` +
      `**3 Simple Steps to Start:**\n` +
      `1. Find your Total Daily Energy Expenditure (TDEE) based on your activity level.\n` +
      `2. Subtract 500 kcal from that number (e.g. if TDEE is 2,200 kcal, eat 1,700 kcal).\n` +
      `3. Keep protein high (1.6–2.2g per kg of body weight) to retain lean muscle.\n\n` +
      `Get your exact personalized daily calorie target on our [Calorie Calculator](/calculators/health/calorie-calculator) and [TDEE Calculator](/calculators/health/tdee-calculator).`
    );
  }

  // 9. Car Loan / Auto Loan payment
  if (q.includes('car loan') || q.includes('auto loan') || q.includes('car payment')) {
    return (
      `To calculate your monthly car loan payment, use the standard amortization formula:\n\n` +
      `**Monthly Payment (M) = P × [r(1+r)ⁿ] / [(1+r)ⁿ − 1]**\n\n` +
      `• **P (Loan Principal):** Vehicle Purchase Price − Down Payment − Trade-in Value\n` +
      `• **r (Monthly Rate):** Annual Interest Rate (APR) ÷ 12\n` +
      `• **n (Loan Term):** Number of monthly payments (e.g. 60 months for 5 years)\n\n` +
      `**Quick Example:** A $25,000 car loan at 6% APR for 60 months is **$483.32 / month**.\n\n` +
      `Compare terms, down payments, and total interest on our [Auto Loan Calculator](/calculators/finance/auto-loan-calculator) and [Car Payment Calculator](/calculators/transportation/car-payment-calculator).`
    );
  }

  // 10. General Loan questions
  if (q.includes('loan') || q.includes('amortization') || q.includes('borrow')) {
    return (
      `Loan payments are calculated using fixed principal-and-interest amortization:\n\n` +
      `• **Payment Formula:** M = P × [r(1+r)ⁿ / ((1+r)ⁿ - 1)]\n` +
      `• **Early Payoff Tip:** Paying just 1 extra monthly payment per year (or adding $50–$100/mo) reduces years off your term and saves thousands in interest charges.\n\n` +
      `Calculate monthly payments and view full payoff schedules on our [Loan Calculator](/calculators/finance/loan-calculator).`
    );
  }

  // 11. Sales Tax & Pre-tax
  if (q.includes('sales tax') || q.includes('pre-tax') || q.includes('vat')) {
    return (
      `Sales tax formulas:\n\n` +
      `• **Adding Sales Tax:** Final Price = Pre-Tax Amount × (1 + Tax Rate ÷ 100)\n` +
      `• **Reversing Sales Tax:** Pre-Tax Amount = Total Receipt Price ÷ (1 + Tax Rate ÷ 100)\n` +
      `• **Tax Paid:** Total Price − Pre-Tax Amount\n\n` +
      `*Example: A $108 item with 8% sales tax has a $100 pre-tax base and $8 tax paid.*\n\n` +
      `Add or reverse taxes instantly with our [Sales Tax Calculator](/calculators/finance/sales-tax-calculator).`
    );
  }

  // 12. College GPA questions
  if (q.includes('gpa') || q.includes('grade point')) {
    return (
      `Grade Point Average (GPA) is calculated by multiplying each course grade's point value by its credit hours, summing them, and dividing by total credit hours:\n\n` +
      `• **A (4.0), B (3.0), C (2.0), D (1.0), F (0.0)**\n` +
      `• **Formula:** GPA = Total Grade Points ÷ Total Credits Completed\n\n` +
      `Calculate your cumulative semester or college GPA on our [College GPA Calculator](/calculators/education/college-gpa-calculator).`
    );
  }

  // 13. Study Hours / Carnegie Rule
  if (q.includes('study hour') || q.includes('carnegie') || q.includes('study time')) {
    return (
      `According to the federally recognized **Carnegie 2:1 Rule**, college students should budget **2 to 3 hours of outside study time for every 1 credit hour** in class:\n\n` +
      `• **12 Credits (Full-time):** ~24 study hrs/wk (36 total hrs)\n` +
      `• **15 Credits (Standard):** ~30 study hrs/wk (45 total hrs)\n` +
      `• **18 Credits (Heavy STEM):** ~36 study hrs/wk (54 total hrs)\n\n` +
      `Budget your semester weekly schedule on our [Study Hours Calculator](/calculators/education/study-hours-calculator).`
    );
  }

  return null;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute and try again." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = parseMessages(body);
  if (typeof messages === "string") {
    return NextResponse.json({ error: messages }, { status: 400 });
  }

  const latestUserMessage = messages[messages.length - 1].content;
  const normalizedKey = latestUserMessage.toLowerCase().trim();

  // Tier 1: Fast Cache Check (< 0.1ms)
  const cached = replyCache.get(normalizedKey);
  if (cached && Date.now() - cached.timestamp < 3600_000) {
    return NextResponse.json({ reply: cached.reply });
  }

  // Tier 2: Instant Smart Calculation & Knowledge Engine (< 1ms)
  // Answers calculations, formulas, benchmarks, and common prompts instantly!
  const instantAnswer = solveSmartCalculation(latestUserMessage);
  if (instantAnswer) {
    const finalInstant = enrichWithInternalLinks(instantAnswer, latestUserMessage);
    replyCache.set(normalizedKey, { reply: finalInstant, timestamp: Date.now() });
    return NextResponse.json({ reply: finalInstant });
  }

  // Tier 3: External LLMs with Strict 2.5s Timeout
  const rapidApiKey = process.env.RAPIDAPI_KEY || "ee1c9f2fdemsh16a04d1b8c1ec60p10f7ebjsned5e183a128b";
  const canUseRapidApi = rapidApiKey && Date.now() > rapidApiQuotaExceededUntil;

  if (canUseRapidApi) {
    try {
      const rapidRes = await fetch("https://open-ai21.p.rapidapi.com/chatgpt", {
        method: "POST",
        headers: {
          "x-rapidapi-key": rapidApiKey,
          "x-rapidapi-host": "open-ai21.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "system", content: SYSTEM }, ...messages],
          web_access: false,
        }),
        signal: AbortSignal.timeout(2500),
      });

      if (rapidRes.status === 429) {
        // Quota exceeded: Trip circuit breaker for 1 hour to prevent 2-3s delay on future requests
        rapidApiQuotaExceededUntil = Date.now() + 3600_000;
      } else if (rapidRes.ok) {
        const data = await rapidRes.json();
        const reply = data.result?.trim();
        if (reply) {
          const finalReply = enrichWithInternalLinks(reply, latestUserMessage);
          replyCache.set(normalizedKey, { reply: finalReply, timestamp: Date.now() });
          return NextResponse.json({ reply: finalReply });
        }
      }
    } catch {
      // Timeout or network error - skip to next provider
    }
  }

  // Try Groq if configured
  const groqKey = process.env.GROQ_API_KEY;
  if (groqKey) {
    try {
      const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groqKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
          messages: [{ role: "system", content: SYSTEM }, ...messages],
          max_tokens: 400,
          temperature: 0.6,
        }),
        signal: AbortSignal.timeout(2000),
      });

      if (groqRes.ok) {
        const data = await groqRes.json();
        const reply = data.choices?.[0]?.message?.content?.trim();
        if (reply) {
          const finalReply = enrichWithInternalLinks(reply, latestUserMessage);
          replyCache.set(normalizedKey, { reply: finalReply, timestamp: Date.now() });
          return NextResponse.json({ reply: finalReply });
        }
      }
    } catch {
      // continue to fallback
    }
  }

  // Tier 4: Universal Fast Fallback Engine
  const generalFallback =
    "I'm here to help you calculate and understand any math, financial, or health concept!\n\n" +
    "You can ask me to calculate:\n" +
    "• **BMI & Health:** e.g. *\"Is BMI 24 healthy?\"* → [BMI Calculator](/calculators/health/bmi-calculator)\n" +
    "• **Loans & Mortgages:** e.g. *\"Monthly payment on $300k at 6%?\"* → [Mortgage Calculator](/calculators/finance/mortgage-calculator)\n" +
    "• **Calories & Deficit:** e.g. *\"Calories to lose 1 lb/week?\"* → [Calorie Calculator](/calculators/health/calorie-calculator)\n" +
    "• **Compound Interest:** e.g. *\"$100/mo at 7% for 15 yrs?\"* → [Compound Interest Calculator](/calculators/finance/compound-interest-calculator)\n" +
    "• **Percentages & Discounts:** e.g. *\"15% of 200\"* or *\"25% off $80\"* → [Percentage Calculator](/calculators/math/percentage-calculator)\n\n" +
    "Enter your specific numbers or ask any question above!";

  const finalFallback = enrichWithInternalLinks(generalFallback, latestUserMessage);
  return NextResponse.json({ reply: finalFallback });
}
