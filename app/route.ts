import { LANDING_HTML } from "@/lib/landingHtml";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  return new Response(LANDING_HTML, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      "Pragma": "no-cache",
      "Expires": "0",
      "Surrogate-Control": "no-store",
    },
  });
}
