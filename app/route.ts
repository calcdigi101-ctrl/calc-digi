import { LANDING_HTML } from "@/lib/landingHtml";

export async function GET() {
  return new Response(LANDING_HTML, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
