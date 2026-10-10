/** Exchange rates (units per 1 USD). Live rates are fetched server-side once a day; this snapshot is the fallback. */
export type Rates = Record<string, number>;

export const FX_SNAPSHOT: { rates: Rates; updated: string } = {
  updated: "Sat, 10 Oct 2026 00:02:31 +0000",
  rates: {"USD": 1, "EUR": 0.892383, "GBP": 0.755847, "JPY": 158.285788, "CAD": 1.425339, "AUD": 1.433025, "CHF": 0.830695, "CNY": 6.706465, "INR": 96.867192, "PKR": 276.883168, "MXN": 18.331861, "BRL": 5.012116, "KRW": 1341.594383, "SGD": 1.280748, "HKD": 7.848261, "NZD": 1.782014, "SEK": 9.991572, "NOK": 9.563367, "DKK": 6.671662, "ZAR": 16.538925, "AED": 3.6725, "SAR": 3.75, "TRY": 49.339277, "RUB": 84.989692, "PLN": 3.911709, "THB": 33.56793, "IDR": 17889.663556, "MYR": 4.087536, "PHP": 62.884488, "BDT": 123.223082, "EGP": 52.380358, "NGN": 1331.267014, "ILS": 3.063229, "VND": 25862.649232, "KWD": 0.310597, "QAR": 3.64, "CZK": 21.769432, "HUF": 326.166827, "ARS": 1515.8766, "CLP": 978.596264, "COP": 3236.568377},
};

const SOURCE = "https://open.er-api.com/v6/latest/USD";

/** Fetch today's rates (cached by Next.js for a day); fall back to the snapshot on any failure. */
export async function getRates(): Promise<{ rates: Rates; updated: string; live: boolean }> {
  try {
    const res = await fetch(SOURCE, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as { result: string; rates: Rates; time_last_update_utc: string };
    if (data.result !== "success" || !data.rates?.USD) throw new Error("bad payload");
    return { rates: data.rates, updated: data.time_last_update_utc, live: true };
  } catch {
    return { ...FX_SNAPSHOT, live: false };
  }
}
