import { NextResponse, type NextRequest } from "next/server";

/**
 * Universal Multi-Provider AI Assistant for CalcDigi.
 *
 * Supports:
 * 1. RapidAPI Open-AI21 (ChatGPT / ConversationGPT35) via RAPIDAPI_KEY
 * 2. Groq (Meta Llama 3.3 70B / Llama 3.1 8B) - Free Open Models via GROQ_API_KEY
 * 3. OpenRouter (Free Open Source Models pool) via OPENROUTER_API_KEY
 * 4. Google Gemini (Gemini 1.5/2.0 Flash) via GEMINI_API_KEY
 * 5. Anthropic Claude via ANTHROPIC_API_KEY
 * 6. Built-in Calculation Reasoning Engine (Zero API Key required - 100% Uptime Guaranteed)
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
const RATE_LIMIT = 20; // requests per window per IP
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

/** Built-in Expert Engine for instant answers without external API keys */
function getBuiltInAnswer(userQuery: string): string {
  const q = userQuery.toLowerCase();

  // Calorie, Macros, Diet, TDEE
  if (q.includes("calorie") || q.includes("macro") || q.includes("protein") || q.includes("diet") || q.includes("tdee")) {
    return (
      "For practical Calorie & Macro optimization:\n\n" +
      "1. Protein Target: Aim for 1.6 to 2.2 grams per kilogram (0.8–1.0g/lb) of body weight to preserve lean muscle tissue.\n" +
      "2. Healthy Fats: Allocate 20% to 30% of total calories to essential dietary fats for hormonal balance.\n" +
      "3. Carbohydrates: Use remaining calories for complex carbs to fuel daily performance and workouts.\n" +
      "4. Deficit vs Surplus: A 300–500 kcal deficit supports steady fat loss (~1 lb/week), while a 200–300 kcal surplus supports lean muscle growth.\n\n" +
      "Use our [Calorie Calculator](/calculators/health/calorie-calculator) and [Macro Calculator](/calculators/health/macro-calculator) on CalcDigi for your exact personalized numbers!"
    );
  }

  // BMI & Healthy Weight
  if (q.includes("bmi") || q.includes("body mass") || q.includes("weight") || q.includes("obese") || q.includes("underweight")) {
    return (
      "Body Mass Index (BMI) evaluates weight relative to height:\n\n" +
      "• Underweight: < 18.5\n" +
      "• Healthy / Normal: 18.5 – 24.9\n" +
      "• Overweight: 25.0 – 29.9\n" +
      "• Obesity: 30.0 or higher\n\n" +
      "Formula: BMI = Weight (kg) / [Height (m)]².\n" +
      "Tip: For muscular athletes, BMI can be deceptively high because muscle is denser than fat. Check our [BMI Calculator](/calculators/health/bmi-calculator) and [Body Fat Calculator](/calculators/health/body-fat-calculator) on CalcDigi for a complete analysis."
    );
  }

  // Loans, Mortgage, Amortization
  if (q.includes("loan") || q.includes("mortgage") || q.includes("interest") || q.includes("amortization") || q.includes("debt")) {
    return (
      "Loan & Mortgage Insights:\n\n" +
      "• Fixed Monthly Payment Formula: M = P × [r(1+r)ⁿ / ((1+r)ⁿ - 1)]\n" +
      "• Accelerated Payoff Hack: Paying just $100 to $200 extra per month toward your principal balance can eliminate 4 to 6 years off a standard 30-year mortgage and save tens of thousands in compound interest!\n\n" +
      "Compare 15 vs 30-year schedules on our [Loan Calculator](/calculators/finance/loan-calculator) and [Mortgage Calculator](/calculators/finance/mortgage-calculator) on CalcDigi."
    );
  }

  // Sales Tax & VAT
  if (q.includes("sales tax") || q.includes("tax") || q.includes("receipt") || q.includes("pre-tax") || q.includes("vat")) {
    return (
      "Sales Tax & Pre-Tax Formulas:\n\n" +
      "• Add Tax: Total = Pre-Tax Price × (1 + Tax Rate / 100)\n" +
      "• Reverse Tax: Pre-Tax Base = Receipt Total / (1 + Tax Rate / 100)\n" +
      "• Total Tax Paid = Receipt Total - Pre-Tax Base\n\n" +
      "For example, an $86.40 receipt with 8% sales tax has an $80.00 pre-tax base. Use our [Sales Tax Calculator](/calculators/finance/sales-tax-calculator) on CalcDigi to add or reverse taxes instantly."
    );
  }

  // Percentages, Discounts, Growth
  if (q.includes("percent") || q.includes("discount") || q.includes("increase") || q.includes("decrease") || q.includes("ratio")) {
    return (
      "Key Percentage Formulas:\n\n" +
      "• P% of a number: (P / 100) × Total\n" +
      "• Percentage Change: ((New Value - Original Value) / Original Value) × 100\n" +
      "• Reverse Discount: Original Price = Sale Price / (1 - Discount % / 100)\n\n" +
      "Check out our [Percentage Calculator](/calculators/math/percentage-calculator) and [Discount Calculator](/calculators/finance/discount-calculator) on CalcDigi for instant step-by-step visual calculations."
    );
  }

  // General Guidance
  return (
    "Hi! I'm your CalcDigi AI assistant. I can help explain formulas, financial concepts, health targets, and mathematical calculations.\n\n" +
    "You can ask me about:\n" +
    "• Health & Fitness (Calories, Macros, BMI, BMR, Ideal Weight)\n" +
    "• Finance & Loans (Mortgages, Loan Amortization, Compound Interest, Sales Tax, Inflation)\n" +
    "• Math & Science (Percentages, Fractions, Ratios, Speed & Unit Conversions)\n\n" +
    "Feel free to ask any specific calculation question!"
  );
}


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
        break; // ordered from most specific to least specific
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

  // 1. Try RapidAPI Open-AI21 (ChatGPT / ConversationGPT35)
  const rapidApiKey = process.env.RAPIDAPI_KEY || "ee1c9f2fdemsh16a04d1b8c1ec60p10f7ebjsned5e183a128b";
  if (rapidApiKey) {
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
      });

      if (rapidRes.ok) {
        const data = await rapidRes.json();
        const reply = data.result?.trim();
        if (reply) return NextResponse.json({ reply: enrichWithInternalLinks(reply, latestUserMessage) });
      } else {
        // Fallback to conversationgpt35 endpoint if /chatgpt returned non-200
        const convRes = await fetch("https://open-ai21.p.rapidapi.com/conversationgpt35", {
          method: "POST",
          headers: {
            "x-rapidapi-key": rapidApiKey,
            "x-rapidapi-host": "open-ai21.p.rapidapi.com",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [{ role: "system", content: SYSTEM }, ...messages],
          }),
        });

        if (convRes.ok) {
          const convData = await convRes.json();
          const convReply = convData.result?.trim();
          if (convReply) return NextResponse.json({ reply: enrichWithInternalLinks(convReply, latestUserMessage) });
        }
      }
    } catch (err) {
      console.warn("RapidAPI open-ai21 fetch error:", err);
    }
  }

  // 2. Try Groq (Llama 3.3 70B / Llama 3.1 8B) - Open Model
  const groqKey = process.env.GROQ_API_KEY;
  if (groqKey) {
    try {
      const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
      const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groqKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "system", content: SYSTEM }, ...messages],
          max_tokens: 600,
          temperature: 0.6,
        }),
      });

      if (groqRes.ok) {
        const data = await groqRes.json();
        const reply = data.choices?.[0]?.message?.content?.trim();
        if (reply) return NextResponse.json({ reply: enrichWithInternalLinks(reply, latestUserMessage) });
      } else {
        console.warn("Groq API returned error status:", groqRes.status);
      }
    } catch (err) {
      console.warn("Groq API fetch error:", err);
    }
  }

  // 2. Try OpenRouter (Free Open Source Models)
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  if (openRouterKey) {
    try {
      const model = process.env.OPENROUTER_MODEL || "meta-llama/llama-3.3-70b-instruct:free";
      const orRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openRouterKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://www.calcdigi.com",
          "X-Title": "CalcDigi",
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "system", content: SYSTEM }, ...messages],
          max_tokens: 600,
          temperature: 0.6,
        }),
      });

      if (orRes.ok) {
        const data = await orRes.json();
        const reply = data.choices?.[0]?.message?.content?.trim();
        if (reply) return NextResponse.json({ reply: enrichWithInternalLinks(reply, latestUserMessage) });
      } else {
        console.warn("OpenRouter API returned error status:", orRes.status);
      }
    } catch (err) {
      console.warn("OpenRouter API fetch error:", err);
    }
  }

  // 3. Try Google Gemini (Free Gemini Flash)
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
      const geminiRes = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: messages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
          systemInstruction: { parts: [{ text: SYSTEM }] },
          generationConfig: { maxOutputTokens: 600, temperature: 0.6 },
        }),
      });

      if (geminiRes.ok) {
        const data = await geminiRes.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (reply) return NextResponse.json({ reply: enrichWithInternalLinks(reply, latestUserMessage) });
      } else {
        console.warn("Gemini API returned error status:", geminiRes.status);
      }
    } catch (err) {
      console.warn("Gemini API fetch error:", err);
    }
  }

  // 4. Try Anthropic (if configured)
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (anthropicKey) {
    try {
      const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": anthropicKey,
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-3-haiku-20240307",
          max_tokens: 600,
          system: SYSTEM,
          messages,
        }),
      });

      if (anthropicRes.ok) {
        const data = await anthropicRes.json();
        const reply = data.content?.map((b: { type: string; text?: string }) => (b.type === "text" ? b.text : "")).join("\n").trim();
        if (reply) return NextResponse.json({ reply: enrichWithInternalLinks(reply, latestUserMessage) });
      }
    } catch (err) {
      console.warn("Anthropic API fetch error:", err);
    }
  }

  // 5. Built-in Calculation Reasoning Engine (Zero Configuration Fallback)
  // Guarantees the assistant responds immediately with helpful domain expertise!
  const fallbackReply = getBuiltInAnswer(latestUserMessage);
  return NextResponse.json({ reply: enrichWithInternalLinks(fallbackReply, latestUserMessage) });
}
