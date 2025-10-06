
import * as cheerio from "cheerio"; // npm install cheerio

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: "Missing url param" }), {
      status: 400,
    });
  }

  try {
    const res = await fetch(targetUrl, { cache: "no-store" });
    const html = await res.text();
    const $ = cheerio.load(html);

    const metadata = {
      title: $('meta[property="og:title"]').attr("content") || $("title").text(),
      description:
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="description"]').attr("content") ||
        "",
      image:
        $('meta[property="og:image"]').attr("content") ||
        $('meta[name="twitter:image"]').attr("content") ||
        null,
      url: targetUrl,
    };

    return new Response(JSON.stringify(metadata), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch metadata" }), {
      status: 500,
    });
  }
}