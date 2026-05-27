import { NextResponse, type NextRequest } from "next/server";

/**
 * Maintenance mode.
 *
 * Every page request is silently rewritten to /maintenance. To turn the site
 * back on, delete this file (or set NEXT_PUBLIC_MAINTENANCE=false and gate
 * the body of this middleware behind it).
 *
 * Excluded from rewrite (continue to work normally):
 *   - /_next/*     — framework assets, image optimiser
 *   - /api/og      — social-share preview image, used by crawlers
 *   - /maintenance — the page we rewrite to
 *   - /favicon.*   — browser tab icon
 *   - any path with a file extension (jpg, png, svg, ico, txt, xml, etc.)
 */
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/maintenance";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!_next/|api/og|maintenance|favicon|.*\\..*).*)",
  ],
};
