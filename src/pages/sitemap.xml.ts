export const prerender = false;

export function GET() {
  return Response.redirect('https://amazingplugins.com/sitemap-index.xml', 308);
}
