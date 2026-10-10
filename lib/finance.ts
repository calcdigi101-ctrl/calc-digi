/** Fixed-rate payment per period. */
export function pmt(principal: number, ratePerPeriod: number, periods: number) {
  if (periods <= 0) return 0;
  if (ratePerPeriod === 0) return principal / periods;
  return (principal * ratePerPeriod) / (1 - Math.pow(1 + ratePerPeriod, -periods));
}

/** Present value of a level payment stream. */
export function pv(payment: number, ratePerPeriod: number, periods: number) {
  if (ratePerPeriod === 0) return payment * periods;
  return (payment * (1 - Math.pow(1 + ratePerPeriod, -periods))) / ratePerPeriod;
}

export type AmortRow = { period: number; interest: number; principal: number; balance: number };

/** Monthly amortization of a fixed payment; stops when the balance hits zero or maxPeriods. */
export function amortize(balance: number, monthlyRate: number, payment: number, maxPeriods = 1200): AmortRow[] {
  const rows: AmortRow[] = [];
  let b = balance;
  for (let i = 1; i <= maxPeriods && b > 0.005; i++) {
    const interest = b * monthlyRate;
    const principal = Math.min(payment - interest, b);
    if (principal <= 0) break;
    b -= principal;
    rows.push({ period: i, interest, principal, balance: Math.max(0, b) });
  }
  return rows;
}

/** Group monthly rows into years (year 1 = periods 1–12). */
export function byYear(rows: AmortRow[]) {
  const years: { year: number; interest: number; principal: number; balance: number }[] = [];
  for (const r of rows) {
    const y = Math.ceil(r.period / 12);
    let row = years[y - 1];
    if (!row) row = years[y - 1] = { year: y, interest: 0, principal: 0, balance: 0 };
    row.interest += r.interest;
    row.principal += r.principal;
    row.balance = r.balance;
  }
  return years;
}

/**
 * Month-by-month growth of a lump sum plus monthly contributions.
 * Interest compounds `compounding` times per year (converted to an
 * equivalent monthly rate); contributions are made at the end of each month
 * unless `atStart`.
 */
export function growth({
  initial,
  monthly,
  annualRatePct,
  years,
  compounding = 12,
  atStart = false,
  annualIncreasePct = 0,
}: {
  initial: number;
  monthly: number;
  annualRatePct: number;
  years: number;
  compounding?: number;
  atStart?: boolean;
  annualIncreasePct?: number;
}) {
  const r = Math.pow(1 + annualRatePct / 100 / compounding, compounding / 12) - 1;
  let balance = initial;
  let contributed = initial;
  let contrib = monthly;
  const yearly: { year: number; contributions: number; interest: number; balance: number }[] = [];
  const months = Math.round(years * 12);
  for (let m = 1; m <= months; m++) {
    if (atStart) {
      balance += contrib;
      contributed += contrib;
    }
    balance *= 1 + r;
    if (!atStart) {
      balance += contrib;
      contributed += contrib;
    }
    if (m % 12 === 0 || m === months) {
      yearly.push({ year: Math.ceil(m / 12), contributions: contributed, interest: balance - contributed, balance });
      if (m % 12 === 0) contrib *= 1 + annualIncreasePct / 100;
    }
  }
  return { balance, contributed, interest: balance - contributed, yearly };
}
