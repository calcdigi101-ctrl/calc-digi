import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';

  // Exclude local development
  if (host.includes('localhost') || host.includes('127.0.0.1')) {
    return NextResponse.next();
  }

  // Permanently redirect old vercel domain and non-www domain to canonical https://www.calcdigi.com
  if (host === 'calc-digi.vercel.app' || host === 'calcdigi.com') {
    const url = request.nextUrl.clone();
    url.protocol = 'https';
    url.host = 'www.calcdigi.com';
    url.port = '';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
