export interface MortgageInput {
  price: number;
  down: number;
  termYears: number;
  ratePct: number;
  /** First payment month, as { year, month(0-11) }. */
  start: { year: number; month: number };
  propertyTaxPerYear: number;
  insurancePerYear: number;
  pmiPerYear: number;
  hoaPerMonth: number;
  extraMonthly: number;
  extraYearly: number;
  extraOnce: number;
  /** Payment index (0-based) the one-time extra is applied to; ignored if out of range. */
  extraOnceIndex: number;
}

export interface MonthRow {
  index: number;
  year: number;
  month: number;
  interest: number;
  principal: number;
  extra: number;
  balance: number;
  pmi: number;
}

export interface YearRow {
  year: number;
  interest: number;
  principal: number;
  balance: number;
}

export interface MortgageResult {
  loan: number;
  ltv: number;
  monthlyPI: number;
  monthly: { pi: number; tax: number; insurance: number; pmi: number; hoa: number; total: number };
  rows: MonthRow[];
  years: YearRow[];
  totalInterest: number;
  totalPrincipal: number;
  totalPmi: number;
  payoff: { year: number; month: number };
  /** Number of payments PMI is charged for (stops at 78% LTV of the purchase price or mid-term). */
  pmiMonths: number;
  /** Savings vs. the same loan with no extra payments. */
  baseline: { totalInterest: number; months: number };
  /** Accelerated bi-weekly payment analytics */
  biweekly: {
    payment: number;
    totalInterest: number;
    yearsSaved: number;
    monthsSaved: number;
    interestSaved: number;
    payoffYear: number;
  };
}

/** Fixed-rate monthly principal & interest payment. */
export function monthlyPayment(loan: number, ratePct: number, months: number) {
  if (loan <= 0 || months <= 0) return 0;
  const r = ratePct / 1200;
  if (r === 0) return loan / months;
  return (loan * r) / (1 - Math.pow(1 + r, -months));
}

function amortize(input: MortgageInput, withExtras: boolean) {
  const loan = Math.max(0, input.price - input.down);
  const n = Math.round(input.termYears * 12);
  const r = input.ratePct / 1200;
  const pi = monthlyPayment(loan, input.ratePct, n);
  // Homeowners Protection Act: PMI terminates automatically at 78% of the original value,
  // or at the midpoint of the term, whichever comes first.
  const pmiStop = input.price * 0.78;
  const rows: MonthRow[] = [];
  let balance = loan;
  for (let i = 0; i < n && balance > 0.005; i++) {
    const interest = balance * r;
    let principal = Math.min(pi - interest, balance);
    let extra = 0;
    if (withExtras) {
      extra += input.extraMonthly;
      if ((i + 1) % 12 === 0) extra += input.extraYearly;
      if (i === input.extraOnceIndex) extra += input.extraOnce;
      extra = Math.min(extra, balance - principal);
    }
    const pmi = balance > pmiStop && i < n / 2 ? input.pmiPerYear / 12 : 0;
    principal = Math.max(principal, 0);
    balance = Math.max(0, balance - principal - extra);
    const m = input.start.month + i;
    rows.push({
      index: i,
      year: input.start.year + Math.floor(m / 12),
      month: m % 12,
      interest,
      principal,
      extra,
      balance,
      pmi,
    });
  }
  return { loan, pi, rows };
}

function computeBiweekly(loan: number, monthlyPI: number, ratePct: number, start: { year: number; month: number }, termYears: number) {
  if (loan <= 0 || monthlyPI <= 0) {
    return {
      payment: 0,
      totalInterest: 0,
      periods: 0,
      yearsTaken: 0,
      payoffYear: start.year,
    };
  }
  const biweeklyPayment = monthlyPI / 2;
  const rBi = ratePct / 2600;
  let balance = loan;
  let periods = 0;
  let totalInterest = 0;
  const maxPeriods = termYears * 26 + 100;

  while (balance > 0.01 && periods < maxPeriods) {
    const interest = balance * rBi;
    const principal = Math.min(biweeklyPayment - interest, balance);
    if (principal <= 0) break;
    totalInterest += interest;
    balance -= principal;
    periods++;
  }

  const yearsTaken = periods / 26;
  const payoffYear = start.year + Math.floor(yearsTaken);

  return {
    payment: biweeklyPayment,
    totalInterest,
    periods,
    yearsTaken,
    payoffYear,
  };
}

export function computeMortgage(input: MortgageInput): MortgageResult {
  const { loan, pi, rows } = amortize(input, true);
  const base = amortize(input, false);

  const years: YearRow[] = [];
  for (const row of rows) {
    let y = years[years.length - 1];
    if (!y || y.year !== row.year) {
      y = { year: row.year, interest: 0, principal: 0, balance: 0 };
      years.push(y);
    }
    y.interest += row.interest;
    y.principal += row.principal + row.extra;
    y.balance = row.balance;
  }

  const sum = (rs: MonthRow[], f: (r: MonthRow) => number) => rs.reduce((a, r) => a + f(r), 0);
  const last = rows[rows.length - 1] ?? { year: input.start.year, month: input.start.month };
  const monthlyPmi = rows[0]?.pmi ?? 0;
  const tax = input.propertyTaxPerYear / 12;
  const insurance = input.insurancePerYear / 12;

  const baseTotalInterest = sum(base.rows, (r) => r.interest);
  const bi = computeBiweekly(loan, pi, input.ratePct, input.start, input.termYears);
  const biYearsSaved = Math.max(0, input.termYears - bi.yearsTaken);
  const biMonthsSaved = Math.round(biYearsSaved * 12);
  const biInterestSaved = Math.max(0, baseTotalInterest - bi.totalInterest);

  return {
    loan,
    ltv: input.price > 0 ? loan / input.price : 0,
    monthlyPI: pi,
    monthly: {
      pi,
      tax,
      insurance,
      pmi: monthlyPmi,
      hoa: input.hoaPerMonth,
      total: pi + tax + insurance + monthlyPmi + input.hoaPerMonth,
    },
    rows,
    years,
    totalInterest: sum(rows, (r) => r.interest),
    totalPrincipal: sum(rows, (r) => r.principal + r.extra),
    totalPmi: sum(rows, (r) => r.pmi),
    payoff: { year: last.year, month: last.month },
    pmiMonths: rows.filter((r) => r.pmi > 0).length,
    baseline: { totalInterest: baseTotalInterest, months: base.rows.length },
    biweekly: {
      payment: bi.payment,
      totalInterest: bi.totalInterest,
      yearsSaved: Number(biYearsSaved.toFixed(1)),
      monthsSaved: biMonthsSaved,
      interestSaved: biInterestSaved,
      payoffYear: bi.payoffYear,
    },
  };
}

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
