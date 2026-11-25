import { NextResponse, type NextRequest } from "next/server";

/**
 * CalcDigi AI Assistant - Direct Server-Side RapidAPI Integration
 *
 * Rules:
 * 1. Zero local keyword intercepts before RapidAPI: Every single message goes directly to the RapidAPI endpoint.
 * 2. Proper headers: X-RapidAPI-Key and X-RapidAPI-Host.
 * 3. Transparent error logging: Server logs actual HTTP status and response errors.
 * 4. Upgraded system prompt: Strict language mirroring, direct arithmetic solving, natural greetings, and single tool suggestions.
 */

const SYSTEM_PROMPT =
  "You are CalcDigi AI Assistant, the precision multilingual assistant for CalcDigi (calcdigi.com). " +
  "Follow these strict operational rules on every response:\n" +
  "1. STRICT LANGUAGE MIRRORING: Always detect the exact language, dialect, and script of the user's latest message (English -> English, Roman Urdu / Urdu in English alphabet -> natural Roman Urdu, Urdu script -> Urdu script, Hindi -> Hindi, Arabic -> Arabic, Spanish -> Spanish). Reply 100% in that exact same language. Never switch languages.\n" +
  "2. DIRECT ANSWERS & MATH: Solve all math, arithmetic (e.g., 2+2 = 4), percentages, and formula questions immediately and accurately without hesitation or evasion.\n" +
  "3. NATURAL GREETINGS: Respond naturally, warmly, and politely to greetings like 'how are you' or 'assalam o alaikum' in the user's language.\n" +
  "4. CALCDIGI TOOL SUGGESTIONS: When the user's inquiry relates to a calculation tool, include a single, natural, clean markdown link to the matching CalcDigi calculator (e.g., [Age Calculator →](/calculators/datetime/age-calculator), [Loan Calculator →](/calculators/finance/loan-calculator), [BMI Calculator →](/calculators/health/bmi-calculator)). Never spam multiple unrelated links.\n" +
  "Keep answers direct, helpful, and concise (under 80 words).";

const MAX_MESSAGE_CHARS = 1000;
const MAX_TURNS = 12;

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

function parseMessages(body: unknown): ChatMessage[] | string {
  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw) || raw.length === 0) return "messages must be a non-empty array";
  if (raw.length > MAX_TURNS) return `At most ${MAX_TURNS} messages are allowed`;
  const out: ChatMessage[] = [];
  for (const m of raw) {
    const role = (m as { role?: unknown })?.role;
    const content = (m as { content?: unknown })?.content;
    if ((role !== "user" && role !== "assistant" && role !== "system") || typeof content !== "string") return "Invalid message";
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

export function detectLanguageStrict(text: string): SupportedLanguage {
  if (!text) return 'english';
  const clean = text.trim();

  // 1. Urdu / Arabic script
  if (/[\u0600-\u06FF]/.test(clean)) {
    if (/[ٹڈڑںےہکگ]/.test(clean) || /\b(کیا|ہے|ہیں|اور|میں|آپ|کی|کا|کتنی|عمر|قرض|حساب)\b/.test(clean)) {
      return 'urdu_script';
    }
    return 'arabic';
  }

  // 2. Hindi Devanagari script
  if (/[\u0900-\u097F]/.test(clean)) {
    return 'hindi_script';
  }

  const lower = clean.toLowerCase();

  // 3. Spanish
  if (/\b(hola|como|cuanto|edad|calcular|gracias|por favor|peso|altura|dias|anos|prestamo)\b/i.test(lower)) {
    return 'spanish';
  }

  // 4. Tokenize words
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
    'karza', 'qist', 'kisht', 'h', 'mujhy', 'bta'
  ]);

  let engScore = 0;
  let urduScore = 0;

  for (const w of words) {
    if (romanUrduMarkers.has(w)) urduScore++;
    if (englishMarkers.has(w)) engScore++;
  }

  if (urduScore > 0 && urduScore >= engScore) {
    return 'roman_urdu';
  }

  return 'english';
}

function tryEvaluateMath(text: string): string | null {
  if (!text) return null;
  const clean = text.trim();

  // Percentage: e.g. "15% of 200" or "20% ka 500"
  const pctMatch = clean.match(/(\d+(?:\.\d+)?)\s*(?:%|\s*percent)\s*(?:of|ka)?\s*\$?(\d+(?:\.\d+)?)/i);
  if (pctMatch) {
    const p = parseFloat(pctMatch[1]);
    const total = parseFloat(pctMatch[2]);
    const res = (p / 100) * total;
    return `${p}% of ${total} = ${res}`;
  }

  // Basic arithmetic: e.g. "2+2", "2 + 2", "50 * 4", "100 / 5", "500 - 150"
  const arithMatch = clean.match(/(\d+(?:\.\d+)?)\s*([\+\-\*/×÷])\s*(\d+(?:\.\d+)?)/);
  if (arithMatch) {
    const a = parseFloat(arithMatch[1]);
    const op = arithMatch[2];
    const b = parseFloat(arithMatch[3]);
    let res: number | string = 0;
    if (op === '+') res = a + b;
    else if (op === '-' || op === '−') res = a - b;
    else if (op === '*' || op === '×') res = a * b;
    else if (op === '/' || op === '÷') res = b !== 0 ? a / b : 'Undefined (division by zero)';
    return `${a} ${op} ${b} = ${res}`;
  }

  return null;
}

function tryEvaluateGreeting(text: string, lang: SupportedLanguage): string | null {
  if (!text) return null;
  const lower = text.toLowerCase();
  if (/\b(how are you|how r u|kese ho|kaise ho|kia hal|kya haal|hal chal)\b/i.test(lower)) {
    if (lang === 'roman_urdu') {
      return "Main bilkul theek hoon, shukriya! Aap sunayein? Main aapki calculation ya formula me kya madad kar sakta hoon?";
    }
    return "I'm doing great, thank you for asking! How can I help you with your calculations or formulas today?";
  }
  if (/\b(salam|assalam|assalam o alaikum|hello|hi|hey)\b/i.test(lower)) {
    if (lang === 'roman_urdu') {
      return "Walaikum Assalam! Main CalcDigi AI Assistant hoon. Aap kya calculate karna chahte hain?";
    }
    return "Hello! I am your CalcDigi AI Assistant. What would you like to calculate today?";
  }
  return null;
}

export async function POST(req: NextRequest) {
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
  const lang = detectLanguageStrict(latestUserMessage);

  // RapidAPI Configuration
  const rapidApiKey = process.env.RAPIDAPI_KEY;
  if (!rapidApiKey) {
    return NextResponse.json(
      { error: "AI service is currently unconfigured. Please set RAPIDAPI_KEY." },
      { status: 503 }
    );
  }
  const rapidApiHost = process.env.RAPIDAPI_HOST || "open-ai21.p.rapidapi.com";
  const endpoint = "https://open-ai21.p.rapidapi.com/chatgpt";

  console.log(`[RapidAPI Request] Prompt: "${latestUserMessage}" (Language: ${lang})`);

  let rapidStatus: number | null = null;
  let rapidErrorText: string | null = null;

  try {
    const rapidRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        "X-RapidAPI-Key": rapidApiKey,
        "X-RapidAPI-Host": rapidApiHost,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages
        ],
        web_access: false,
      }),
      signal: AbortSignal.timeout(9000),
    });

    rapidStatus = rapidRes.status;
    console.log(`[RapidAPI Response] HTTP Status: ${rapidRes.status} ${rapidRes.statusText}`);

    if (rapidRes.ok) {
      const data = await rapidRes.json();
      const reply = data.result?.trim() || data.reply?.trim() || data.message?.trim();
      if (reply) {
        return NextResponse.json({ reply });
      }
    } else {
      rapidErrorText = await rapidRes.text();
      console.error(`[RapidAPI Error] HTTP ${rapidRes.status} from ${endpoint}: ${rapidErrorText}`);
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[RapidAPI Exception]: ${msg}`);
    rapidErrorText = msg;
  }

  // Transparent error reporting (No silent fake menus!)
  let replyText = "";
  if (rapidStatus === 429) {
    replyText =
      "⚠️ **RapidAPI Error (HTTP 429 Quota Exceeded):** Your RapidAPI key has exceeded its monthly credit quota for the `open-ai21` service on the BASIC plan.\n" +
      "*(To enable live AI generation, please upgrade or renew your plan at https://rapidapi.com/rphrp1985/api/open-ai21)*";
  } else if (rapidStatus) {
    replyText = `⚠️ **RapidAPI Service Error (HTTP ${rapidStatus}):** ${rapidErrorText || 'Failed to get response from AI endpoint.'}`;
  } else {
    replyText = `⚠️ **RapidAPI Connection Timeout:** ${rapidErrorText || 'Could not reach RapidAPI endpoint within timeout.'}`;
  }

  // Direct calculation resolver
  const math = tryEvaluateMath(latestUserMessage);
  if (math) {
    replyText += `\n\n**Answer:** ${math}`;
  } else {
    const greeting = tryEvaluateGreeting(latestUserMessage, lang);
    if (greeting) {
      replyText += `\n\n${greeting}`;
    }
  }

  return NextResponse.json({ reply: replyText });
}
