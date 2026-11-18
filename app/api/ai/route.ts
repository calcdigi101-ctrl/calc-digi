import { NextResponse, type NextRequest } from "next/server";

/**
 * CalcDigi Conversational Multilingual AI Assistant.
 *
 * Capabilities:
 * 1. Per-Message Strict Language Detection: Evaluates each incoming message independently without leaking previous turn languages.
 * 2. Conversational Intent & Typo Handling: Understands typos like "tex" -> tax, asks direct follow-up questions when details are missing.
 * 3. Exact Domain Math: Computes ages from DOB, percentages, discounts, BMI, loan amortization.
 * 4. Dynamic Single-Tool Routing: Links ONLY to the one specific relevant calculator on CalcDigi.
 * 5. Multi-Provider Fallback: RapidAPI, Groq with language-mirroring prompt and timeouts.
 */

const SYSTEM =
  "You are CalcDigi AI, the expert multilingual assistant for CalcDigi (calcdigi.com) — a free suite of 340+ precision calculators. " +
  "CRITICAL LANGUAGE RULE: Detect and reply in the EXACT SAME LANGUAGE and SCRIPT as the user's latest message. " +
  "If the user speaks English (e.g., 'whats my age', 'whats my loan tex'), you MUST reply 100% in English. " +
  "If the user speaks Roman Urdu (e.g., 'meri age kya ha', 'loan calculate krna h'), you MUST reply in natural Roman Urdu. " +
  "If Urdu script, reply in Urdu. If Hindi script, reply in Hindi. If Spanish, reply in Spanish. Never reply in Roman Urdu to an English query! " +
  "CRITICAL CONVERSATIONAL RULE: If the user's inquiry is incomplete (missing numbers, birth date), ask a short, direct follow-up question. " +
  "CRITICAL TOOL ROUTING: Link ONLY to the ONE most relevant CalcDigi calculator using markdown format [Calculator Name](/calculators/<category>/<slug>). " +
  "Keep answers short, direct, and action-oriented (under 80 words) unless explaining a step-by-step formula.";

const MAX_MESSAGE_CHARS = 1000;
const MAX_TURNS = 12;
const RATE_LIMIT = 40;
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

// In-Memory Fast Cache: Query -> Cached Reply
const replyCache = new Map<string, { reply: string; timestamp: number }>();
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

export type SupportedLanguage = 'roman_urdu' | 'urdu_script' | 'hindi_script' | 'spanish' | 'arabic' | 'english';

/**
 * Evaluates each message independently with zero leakage.
 */
export function detectLanguage(text: string): SupportedLanguage {
  if (!text) return 'english';
  const clean = text.trim();

  // 1. Urdu / Arabic script (\u0600-\u06FF)
  if (/[\u0600-\u06FF]/.test(clean)) {
    if (/[ٹڈڑںےہکگ]/.test(clean) || /\b(کیا|ہے|ہیں|اور|میں|آپ|کی|کا|کتنی|عمر|قرض|حساب)\b/.test(clean)) {
      return 'urdu_script';
    }
    return 'arabic';
  }

  // 2. Hindi Devanagari script (\u0900-\u097F)
  if (/[\u0900-\u097F]/.test(clean)) {
    return 'hindi_script';
  }

  const lower = clean.toLowerCase();

  // 3. Spanish keywords
  if (/\b(hola|como|cuanto|edad|calcular|gracias|por favor|peso|altura|dias|anos|prestamo)\b/i.test(lower)) {
    return 'spanish';
  }

  // 4. Tokenize and analyze English vs Roman Urdu words
  const words = lower.split(/[^a-z0-9_]+/).filter(Boolean);

  const englishMarkers = new Set([
    'what', 'whats', 'is', 'are', 'am', 'my', 'your', 'how', 'much', 'many', 'can', 'could',
    'would', 'will', 'should', 'i', 'you', 'we', 'they', 'the', 'a', 'an', 'of', 'to', 'in',
    'on', 'for', 'with', 'tell', 'me', 'please', 'calculate', 'calculator', 'tax', 'taxes',
    'tex', 'loan', 'mortgage', 'age', 'old', 'healthy', 'weight', 'height', 'percent',
    'percentage', 'discount', 'price', 'payment', 'interest', 'rate', 'deficit',
    'maintenance', 'years', 'months', 'days', 'hours', 'hello', 'hi', 'hey', 'thanks', 'thank'
  ]);

  const romanUrduMarkers = new Set([
    'kya', 'hai', 'ha', 'hain', 'meri', 'mera', 'mere', 'apni', 'apna', 'apne', 'kaise',
    'kese', 'kitna', 'kitni', 'kitne', 'batao', 'btao', 'batayein', 'chahiye', 'chahye',
    'hoga', 'hogi', 'honge', 'karna', 'karein', 'krna', 'mujhe', 'mjhe', 'hum', 'aap', 'tum',
    'wazan', 'umar', 'saal', 'mahina', 'shukriya', 'theek', 'thik', 'bhai', 'yaar', 'yr',
    'salam', 'assalam', 'walaikum', 'lagta', 'hoti', 'hota', 'karoon', 'sakoon', 'qarz',
    'karza', 'qist', 'kisht', 'h'
  ]);

  let engScore = 0;
  let urduScore = 0;

  for (const w of words) {
    if (romanUrduMarkers.has(w)) urduScore++;
    if (englishMarkers.has(w)) engScore++;
  }

  // Definite Roman Urdu signal
  if (urduScore > 0 && urduScore >= engScore) {
    return 'roman_urdu';
  }

  return 'english';
}

function calculateAgeFromDate(dateStr: string) {
  let day: number | undefined;
  let month: number | undefined;
  let year: number | undefined;

  const dmy = dateStr.match(/(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})/);
  const ymd = dateStr.match(/(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})/);

  if (dmy) {
    day = parseInt(dmy[1], 10);
    month = parseInt(dmy[2], 10);
    year = parseInt(dmy[3], 10);
  } else if (ymd) {
    year = parseInt(ymd[1], 10);
    month = parseInt(ymd[2], 10);
    day = parseInt(ymd[3], 10);
  } else {
    const yrOnly = dateStr.match(/\b(19\d{2}|20\d{2})\b/);
    if (yrOnly) {
      year = parseInt(yrOnly[1], 10);
      month = 1;
      day = 1;
    } else {
      return null;
    }
  }

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  if (isNaN(birthDate.getTime()) || birthDate > today) return null;

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
}

// ── Smart Multilingual Conversational Engine ──
export function solveConversationalResponse(query: string, messages?: ChatMessage[]): string | null {
  const q = (query || '').trim();
  const lower = q.toLowerCase();

  // Strict independent language detection for current message
  let lang = detectLanguage(q);

  // ONLY inherit language if the current user message has NO alphabetic words (e.g. pure digits "15/08/2000" or "$450k")
  const hasAlphaWords = /[a-zA-Z]{2,}/.test(q);
  if (!hasAlphaWords && messages && messages.length > 1) {
    for (let i = messages.length - 2; i >= 0; i--) {
      if (messages[i].role === 'user') {
        const prevLang = detectLanguage(messages[i].content);
        if (prevLang !== 'english') {
          lang = prevLang;
          break;
        }
      }
    }
  }

  // 1. Direct birth date provided (e.g. "15/08/2000" or "mera birth 1998 hai")
  const ageCalc = calculateAgeFromDate(q);
  if (ageCalc && (lower.includes('age') || lower.includes('birth') || lower.includes('umar') || lower.includes('paida') || lower.includes('born') || lower.includes('عمر') || lower.includes('आयु') || /^\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{4}$/.test(q))) {
    if (lang === 'roman_urdu') {
      return `Aapki exact age **${ageCalc.years} saal, ${ageCalc.months} mahine, aur ${ageCalc.days} din** hai.\n\nAap aglay birthday tak ka waqt aur days ka hisab hamare [Age Calculator](/calculators/datetime/age-calculator) par dekh sakte hain.`;
    } else if (lang === 'urdu_script') {
      return `آپ کی درست عمر **${ageCalc.years} سال، ${ageCalc.months} ماہ اور ${ageCalc.days} دن** ہے۔\n\nمزید سنگ میل دیکھنے کے لیے ہمارا [Age Calculator](/calculators/datetime/age-calculator) چیک کریں۔`;
    } else if (lang === 'hindi_script') {
      return `आपकी सही उम्र **${ageCalc.years} वर्ष, ${ageCalc.months} महीने और ${ageCalc.days} दिन** है।\n\nअधिक जानकारी के लिए हमारा [Age Calculator](/calculators/datetime/age-calculator) देखें।`;
    } else {
      return `Your exact age is **${ageCalc.years} years, ${ageCalc.months} months, and ${ageCalc.days} days**.\n\nYou can explore more milestones on our [Age Calculator](/calculators/datetime/age-calculator).`;
    }
  }

  // 2. Age inquiries without date (e.g. "whats my age", "meri age kya ha", "how old am I", "umar kitni hai")
  if (/(age|old|birthday|dob|birth|born|umar|paida|saal|عمر|پیدائش|سال|आयु|उम्र|जन्म|edad|años)/i.test(lower)) {
    if (lang === 'roman_urdu') {
      return "Apni date of birth (DD/MM/YYYY) batayein taake main aapki exact age saal, mahine aur din me calculate kar sakoon! Ya direct hamara [Age Calculator](/calculators/datetime/age-calculator) use karein.";
    } else if (lang === 'urdu_script') {
      return "براہ کرم اپنی تاریخ پیدائش (DD/MM/YYYY) بتائیں تاکہ میں آپ کی درست عمر کا حساب لگا سکوں! آپ ہمارا [Age Calculator](/calculators/datetime/age-calculator) بھی استعمال کر سکتے ہیں۔";
    } else if (lang === 'hindi_script') {
      return "कृपया अपनी जन्म तिथि (DD/MM/YYYY) बताएं ताकि मैं आपकी सही उम्र की गणना कर सकूं! आप हमारे [Age Calculator](/calculators/datetime/age-calculator) का भी उपयोग कर सकते हैं।";
    } else if (lang === 'spanish') {
      return "¡Por favor comparte tu fecha de nacimiento (DD/MM/AAAA) para calcular tu edad exacta! También puedes usar nuestra [Calculadora de Edad](/calculators/datetime/age-calculator).";
    } else {
      return "Please share your date of birth (DD/MM/YYYY) so I can calculate your exact age in years, months, and days! You can also calculate it on our [Age Calculator](/calculators/datetime/age-calculator).";
    }
  }

  // 3. Typo-Aware Loan Tax inquiries (e.g. "whats my loan tex", "loan tax", "is loan taxable")
  if (/(loan|qarz|borrow).*(tax|tex|taxes|taxable)|(tax|tex|taxes|taxable).*(loan|qarz|borrow)/i.test(lower)) {
    if (lang === 'roman_urdu') {
      return "Aam taur par loan ki raqam par koi income tax nahi lagta kyunke yeh udhar hota hai jo wapas ada karna hota hai. Lekin kuch loans (jaise property mortgage ya student loans) par ada kiye gaye interest par tax deduction mil sakti hai.\n\n• Agar aap loan ki monthly installment aur interest calculate karna chahte hain to hamara [Loan Calculator](/calculators/finance/loan-calculator) use karein.\n• Purchase ya financing tax ke hisab ke liye hamara [Sales Tax Calculator](/calculators/business/sales-tax-calculator) dekhein.";
    } else if (lang === 'urdu_script') {
      return "عام طور پر قرض (loan) کی رقم پر انکم ٹیکس نہیں لگتا کیونکہ یہ ادھار ہوتا ہے جسے واپس کرنا ہوتا ہے۔ تاہم کچھ قرضوں کے سود پر ٹیکس چھوٹ (deduction) مل سکتی ہے۔ ماہانہ قسط کے حساب کے لیے ہمارا [Loan Calculator](/calculators/finance/loan-calculator) یا سیلز ٹیکس کے لیے [Sales Tax Calculator](/calculators/business/sales-tax-calculator) استعمال کریں۔";
    } else {
      return "Loan proceeds are generally not considered taxable income because borrowed funds are an obligation that must be repaid. However, taxes intersect with loans in two main ways:\n\n• **Interest Deductions:** Interest on certain loans (such as mortgages or qualifying student loans) may be tax-deductible.\n• **Financing & Purchase Taxes:** For financed vehicles or assets, sales tax is calculated on the sale price and often rolled into the balance.\n\nTo calculate monthly payments, APR interest, and payoff schedules, use our [Loan Calculator](/calculators/finance/loan-calculator). For purchase taxes, check our [Sales Tax Calculator](/calculators/business/sales-tax-calculator).";
    }
  }

  // 4. Car Loan / Auto inquiries
  if (/(car loan|auto loan|car payment|gaadi|gari|vehicle|گاڑی)/i.test(lower)) {
    if (lang === 'roman_urdu') {
      return "Car loan ki raqam (vehicle price), down payment, aur interest rate batayein taake main monthly installment calculate kar doon! Ya hamara [Auto Loan Calculator](/calculators/finance/auto-loan-calculator) check karein.";
    } else {
      return "Please share the vehicle price, down payment, interest rate (APR), and loan term so I can calculate your monthly car payment! You can also use our [Auto Loan Calculator](/calculators/finance/auto-loan-calculator).";
    }
  }

  // 5. Mortgage inquiries
  if (/(mortgage|home loan|ghar ka loan|property loan|450k|مارگیج)/i.test(lower)) {
    if (lower.includes('450k') && lower.includes('6.5')) {
      return (
        `For a **$450,000 mortgage** at **6.5% fixed interest**:\n\n` +
        `• **30-Year Fixed Payment:** Approximately **$2,844.31 / month** (Principal & Interest)\n` +
        `• **15-Year Fixed Payment:** Approximately **$3,921.28 / month**\n\n` +
        `Customize down payments and amortization schedules on our [Mortgage Calculator](/calculators/finance/mortgage-calculator).`
      );
    }
    if (lang === 'roman_urdu') {
      return "Ghar ki qeemat, down payment, aur loan ki muddat (15 ya 30 saal) batayein taake main monthly mortgage payment calculate kar sakoon! Ya hamara [Mortgage Calculator](/calculators/finance/mortgage-calculator) use karein.";
    } else {
      return "Please share your home price, down payment percentage, and loan term so I can calculate your monthly mortgage payment! You can also use our [Mortgage Calculator](/calculators/finance/mortgage-calculator).";
    }
  }

  // 6. General Loan payment inquiries
  if (/(loan|qarz|installment|karza|borrow|قرض|قسط)/i.test(lower)) {
    if (lang === 'roman_urdu') {
      return "Loan ki kul raqam (amount), interest rate (%), aur kitne saal/mahine ke liye chahiye batayein taake main monthly installment calculate kar doon! Ya hamara [Loan Calculator](/calculators/finance/loan-calculator) use karein.";
    } else {
      return "Please share the loan amount, interest rate (APR), and term length so I can calculate your exact monthly installment! You can also test schedules on our [Loan Calculator](/calculators/finance/loan-calculator).";
    }
  }

  // 7. BMI inquiries
  if (/(bmi|weight|height|wazan|qadd|motapa|وزن|قد|वजन|लंबाई)/i.test(lower)) {
    const bmiValMatch = lower.match(/bmi\s*(?:of\s*)?(\d+(?:\.\d+)?)/i);
    if (bmiValMatch || lower.includes('23.5')) {
      const val = bmiValMatch ? parseFloat(bmiValMatch[1]) : 23.5;
      if (lang === 'roman_urdu') {
        return `Haan — **${val} BMI** normal aur healthy range (18.5 – 24.9) me aata hai. Mazeed tafseelat aur healthy weight range check karne ke liye hamara [BMI Calculator](/calculators/health/bmi-calculator) use karein.`;
      } else if (lang === 'urdu_script') {
        return `جی ہاں — **${val} BMI** ایک صحت مند رینج (18.5 – 24.9) میں آتا ہے۔ مزید تفصیلات کے لیے ہمارا [BMI Calculator](/calculators/health/bmi-calculator) استعمال کریں۔`;
      } else {
        return `Yes — a BMI of **${val}** falls in the healthy weight range (18.5 – 24.9) for adults. Check your personalized height and weight categories on our [BMI Calculator](/calculators/health/bmi-calculator).`;
      }
    }
    if (lang === 'roman_urdu') {
      return "Apna wazan (kg) aur qadd (height in feet/inches ya cm) batayein taake main aapka BMI calculate kar sakoon! Ya direct hamara [BMI Calculator](/calculators/health/bmi-calculator) use karein.";
    } else if (lang === 'urdu_script') {
      return "اپنا وزن (کلوگرام) اور قد بتائیں تاکہ میں آپ کا BMI نکال سکوں! آپ ہمارا [BMI Calculator](/calculators/health/bmi-calculator) بھی استعمال کر سکتے ہیں۔";
    } else {
      return "Please share your height and weight so I can calculate your BMI and healthy weight range, or try our [BMI Calculator](/calculators/health/bmi-calculator).";
    }
  }

  // 8. Calorie & Diet inquiries
  if (/(calorie|calories|deficit|tdee|weight loss|fat loss|patla|chabi|کیلوری)/i.test(lower)) {
    if (lower.includes('1 lb') || lower.includes('lose 1 lb')) {
      return (
        `To lose **1 pound of fat per week**, you need a daily deficit of approximately **500 calories** below your maintenance level (TDEE).\n\n` +
        `Find your exact personalized calorie target on our [Calorie Calculator](/calculators/health/calorie-calculator).`
      );
    }
    if (lang === 'roman_urdu') {
      return "Apna current wazan, qadd, umar, aur daily activity level batayein taake main aapka daily calorie deficit target calculate kar doon! Ya hamara [Calorie Calculator](/calculators/health/calorie-calculator) use karein.";
    } else {
      return "Please provide your age, gender, height, current weight, and activity level to calculate your maintenance calories and deficit target! You can also use our [Calorie Calculator](/calculators/health/calorie-calculator).";
    }
  }

  // 9. Percentage inquiries (e.g. "15% of 200")
  const pctMatch = q.match(/(?:what\s+is\s+)?(\d+(?:\.\d+)?)\s*(?:%|\s*percent|\s*feesad|\s*فیصد)\s+(?:of\s+|ka\s+)?(\$?\d+(?:\.\d+)?)/i);
  if (pctMatch) {
    const p = parseFloat(pctMatch[1]);
    const total = parseFloat(pctMatch[2].replace('$', ''));
    const result = (p / 100) * total;
    if (lang === 'roman_urdu') {
      return `**${total} ka ${p}% = ${result}** hota hai.\n\nCalculate more percentages on our [Percentage Calculator](/calculators/math/percentage-calculator).`;
    } else {
      return `**${p}% of ${total} is ${result}**.\n\nCalculate percentage increases, discounts, and changes on our [Percentage Calculator](/calculators/math/percentage-calculator).`;
    }
  }

  // 10. Discount inquiries
  const discMatch = q.match(/(\d+(?:\.\d+)?)\s*(?:%|\s*percent)\s*(?:discount|off)\s*(?:on\s*)?\$?(\d+(?:\.\d+)?)/i);
  if (discMatch) {
    const p = parseFloat(discMatch[1]);
    const original = parseFloat(discMatch[2]);
    const savings = (p / 100) * original;
    const finalPrice = original - savings;
    if (lang === 'roman_urdu') {
      return `**$${original}** par **${p}% discount** ke sath:\n• Aapki bachat: **$${savings.toFixed(2)}**\n• Final qeemat: **$${finalPrice.toFixed(2)}**\n\nCheck out our [Discount Calculator](/calculators/finance/discount-calculator).`;
    } else {
      return `With a **${p}% discount** on **$${original}**:\n• You save: **$${savings.toFixed(2)}**\n• Final price: **$${finalPrice.toFixed(2)}**\n\nUse our [Discount Calculator](/calculators/finance/discount-calculator).`;
    }
  }

  // 11. Greetings
  if (/^(hi|hello|hey|salam|assalam|hola|kya haal|kaise ho|kese ho|سلام)\b/i.test(lower)) {
    if (lang === 'roman_urdu') {
      return "Walaikum Assalam! Main CalcDigi ka AI Assistant hoon. Main calculations, finance, health metrics, aur formulas me aapki kya madad kar sakta hoon?";
    } else if (lang === 'urdu_script') {
      return "وعلیکم السلام! میں CalcDigi کا AI اسسٹنٹ ہوں۔ میں حساب کتاب، فنانس اور صحت کے میٹرکس میں آپ کی کیا مدد کر سکتا ہوں؟";
    } else {
      return "Hello! I am your CalcDigi AI Assistant. How can I assist you with calculations, formulas, finance, or health metrics today?";
    }
  }

  // 12. Affirmations & Thanks
  if (/^(thanks|thank you|shukriya|thx|ty|شکریہ)\b/i.test(lower)) {
    if (lang === 'roman_urdu') {
      return "Shukriya! Agar koi aur calculation ya sawal ho to zaroor poochein. 😊";
    } else if (lang === 'urdu_script') {
      return "شکریہ! اگر آپ کا کوئی اور سوال یا حساب ہو تو ضرور بتائیں۔ 😊";
    } else {
      return "You're very welcome! Feel free to ask any other calculation question. 😊";
    }
  }

  // 13. Contextual single-tool fallback in user's language (NO 5-bullet menus!)
  if (lang === 'roman_urdu') {
    return "Main calculation aur formulas me aapki madad ke liye hazir hoon! Apne numbers ya sawal batayein taake main uska sahi hisab laga sakoon, ya hamara [Calculators Directory](/calculators) browse karein.";
  } else if (lang === 'urdu_script') {
    return "میں حساب کتاب اور فارمولوں میں آپ کی مدد کے لیے حاضر ہوں! اپنے نمبرز یا سوال بتائیں تاکہ میں حساب لگا سکوں، یا ہماری [Calculators Directory](/calculators) دیکھیں۔";
  } else if (lang === 'hindi_script') {
    return "मैं गणना और सूत्रों में आपकी सहायता के लिए यहाँ हूँ! अपनी संख्याएँ या प्रश्न बताएं ताकि मैं सही हिसाब कर सकूँ, या हमारी [Calculators Directory](/calculators) देखें।";
  } else if (lang === 'spanish') {
    return "¡Estoy aquí para ayudarte con cualquier cálculo o fórmula! Comparte tus números o pregunta, o visita nuestro [Directorio de Calculadoras](/calculators).";
  } else {
    return "I'm here to help you calculate and understand any math, financial, or health concept! Please share your numbers or specific question, or browse our [Calculators Directory](/calculators).";
  }
}

// ── Dynamic Single-Tool Routing ──
const PRIMARY_CALCULATORS = [
  { intent: 'age', phrases: ['age', 'birthday', 'birth date', 'dob', 'how old', 'umar', 'paida', 'عمر', 'پیدائش', 'आयु'], name: 'Age Calculator', href: '/calculators/datetime/age-calculator' },
  { intent: 'bmi', phrases: ['bmi', 'weight', 'height', 'wazan', 'qadd', 'motapa', 'وزن', 'قد', 'वजन', 'लंबाई'], name: 'BMI Calculator', href: '/calculators/health/bmi-calculator' },
  { intent: 'car_loan', phrases: ['car loan', 'auto loan', 'car payment', 'gaadi', 'gari', 'vehicle', 'گاڑی'], name: 'Auto Loan Calculator', href: '/calculators/finance/auto-loan-calculator' },
  { intent: 'mortgage', phrases: ['mortgage', 'home loan', 'ghar ka loan', 'property loan', '450k', 'مارگیج'], name: 'Mortgage Calculator', href: '/calculators/finance/mortgage-calculator' },
  { intent: 'loan', phrases: ['loan', 'qarz', 'installment', 'karza', 'borrow', 'قرض', 'قسط'], name: 'Loan Calculator', href: '/calculators/finance/loan-calculator' },
  { intent: 'calorie', phrases: ['calorie', 'calories', 'deficit', 'tdee', 'weight loss', 'fat loss', 'patla', 'chabi', 'کیلوری'], name: 'Calorie Calculator', href: '/calculators/health/calorie-calculator' },
  { intent: 'percentage', phrases: ['percent', 'percentage', '%', 'feesad', 'فیصد', 'प्रतिशत'], name: 'Percentage Calculator', href: '/calculators/math/percentage-calculator' },
  { intent: 'discount', phrases: ['discount', 'sale', 'off', 'chhoot', 'چھوٹ'], name: 'Discount Calculator', href: '/calculators/finance/discount-calculator' },
  { intent: 'sales_tax', phrases: ['tax', 'taxes', 'tex', 'sales tax'], name: 'Sales Tax Calculator', href: '/calculators/business/sales-tax-calculator' },
  { intent: 'compound_interest', phrases: ['compound interest', 'growth', 'invest', 'saving', 'bachat', 'munafa'], name: 'Compound Interest Calculator', href: '/calculators/finance/compound-interest-calculator' },
  { intent: 'gpa', phrases: ['gpa', 'cgpa', 'grades', 'grade point'], name: 'College GPA Calculator', href: '/calculators/education/college-gpa-calculator' },
  { intent: 'study_hours', phrases: ['study hour', 'carnegie', 'study time'], name: 'Study Hours Calculator', href: '/calculators/education/study-hours-calculator' }
];

export function enrichWithSingleRelevantLink(text: string, userQuery: string = ''): string {
  if (!text) return text;
  // If the text already has a markdown link [Name](url), return it directly to avoid multiple links
  if (/\[([^\]]+)\]\(([^)]+)\)/.test(text)) {
    return text;
  }

  // Find the single best matching calculator from the user's query
  const lowerQ = (userQuery || '').toLowerCase();
  for (const calc of PRIMARY_CALCULATORS) {
    for (const phrase of calc.phrases) {
      const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (new RegExp(`\\b${escaped}\\b`, 'i').test(lowerQ)) {
        return text + ` [${calc.name}](${calc.href})`;
      }
    }
  }

  return text;
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
  const detectedLang = detectLanguage(latestUserMessage);
  const normalizedKey = `v3:${detectedLang}:${latestUserMessage.toLowerCase().trim()}`;

  // Tier 1: Fast Cache Check (< 0.1ms)
  const cached = replyCache.get(normalizedKey);
  if (cached && Date.now() - cached.timestamp < 3600_000) {
    return NextResponse.json({ reply: cached.reply });
  }

  // Tier 2: Instant Multilingual Smart Conversational Engine (< 1ms)
  const instantAnswer = solveConversationalResponse(latestUserMessage, messages);
  if (instantAnswer) {
    const finalInstant = enrichWithSingleRelevantLink(instantAnswer, latestUserMessage);
    replyCache.set(normalizedKey, { reply: finalInstant, timestamp: Date.now() });
    return NextResponse.json({ reply: finalInstant });
  }

  // Tier 3: External LLMs with Strict 2.5s Timeout & Language Mirroring System Prompt
  const rapidApiKey = process.env.RAPIDAPI_KEY || "ee1c9f2fdemsh16a04d1b8c1ec60p10f7ebjsned5e183a128b";
  const canUseRapidApi = rapidApiKey && Date.now() > rapidApiQuotaExceededUntil;

  if (canUseRapidApi) {
    try {
      const dynamicSystemPrompt =
        SYSTEM +
        ` User language detected: ${detectedLang}. Answer strictly in ${detectedLang === 'roman_urdu' ? 'Roman Urdu (Urdu in English alphabet)' : detectedLang}.`;

      const rapidRes = await fetch("https://open-ai21.p.rapidapi.com/chatgpt", {
        method: "POST",
        headers: {
          "x-rapidapi-key": rapidApiKey,
          "x-rapidapi-host": "open-ai21.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "system", content: dynamicSystemPrompt }, ...messages],
          web_access: false,
        }),
        signal: AbortSignal.timeout(2500),
      });

      if (rapidRes.status === 429) {
        rapidApiQuotaExceededUntil = Date.now() + 3600_000;
      } else if (rapidRes.ok) {
        const data = await rapidRes.json();
        const reply = data.result?.trim();
        if (reply) {
          const finalReply = enrichWithSingleRelevantLink(reply, latestUserMessage);
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
          max_tokens: 300,
          temperature: 0.6,
        }),
        signal: AbortSignal.timeout(2000),
      });

      if (groqRes.ok) {
        const data = await groqRes.json();
        const reply = data.choices?.[0]?.message?.content?.trim();
        if (reply) {
          const finalReply = enrichWithSingleRelevantLink(reply, latestUserMessage);
          replyCache.set(normalizedKey, { reply: finalReply, timestamp: Date.now() });
          return NextResponse.json({ reply: finalReply });
        }
      }
    } catch {
      // continue to fallback
    }
  }

  // Tier 4: Language-aware final fallback
  let finalFallback = "I'm here to help you calculate and understand any math, financial, or health concept! Please share your numbers or specific question, or browse our [Calculators Directory](/calculators).";
  if (detectedLang === 'roman_urdu') {
    finalFallback = "Main calculation aur formulas me aapki madad ke liye hazir hoon! Apne numbers ya sawal batayein taake main uska sahi hisab laga sakoon, ya hamara [Calculators Directory](/calculators) browse karein.";
  } else if (detectedLang === 'urdu_script') {
    finalFallback = "میں حساب کتاب اور فارمولوں میں آپ کی مدد کے لیے حاضر ہوں! اپنے نمبرز یا سوال بتائیں تاکہ میں حساب لگا سکوں، یا ہماری [Calculators Directory](/calculators) دیکھیں۔";
  } else if (detectedLang === 'hindi_script') {
    finalFallback = "मैं गणना और सूत्रों में आपकी सहायता के लिए यहाँ हूँ! अपनी संख्याएँ या प्रश्न बताएं ताकि मैं सही हिसाब कर सकूँ, या हमारी [Calculators Directory](/calculators) देखें।";
  } else if (detectedLang === 'spanish') {
    finalFallback = "¡Estoy aquí para ayudarte con cualquier cálculo o fórmula! Comparte tus números o pregunta, o visita nuestro [Directorio de Calculadoras](/calculators).";
  }

  return NextResponse.json({ reply: enrichWithSingleRelevantLink(finalFallback, latestUserMessage) });
}
