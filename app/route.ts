import { LANDING_HTML } from "@/lib/landingHtml";

export async function GET() {
  return new Response(LANDING_HTML, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
