import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory rate limit store (best-effort — resets per container instance)
const store = new Map<string, { count: number; resetAt: number }>();

function check(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

const LIMITS: Record<string, { limit: number; window: number }> = {
  '/api/contact':    { limit: 5,  window: 60_000 },
  '/api/admin/auth': { limit: 3,  window: 60_000 },
  '/api/blogs':      { limit: 20, window: 60_000 },
  '/api/chat':       { limit: 10, window: 60_000 },
};

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { method } = request;

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';

  for (const [route, cfg] of Object.entries(LIMITS)) {
    if (pathname.startsWith(route) && (method === 'POST' || route === '/api/blogs')) {
      const allowed = check(`${ip}:${route}`, cfg.limit, cfg.window);
      if (!allowed) {
        console.warn(`[RATE LIMIT] ${ip} exceeded limit on ${route}`);
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429, headers: { 'Retry-After': '60' } }
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
