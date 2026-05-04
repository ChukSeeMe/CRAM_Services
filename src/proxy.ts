import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Basic in-memory store for rate limiting (per isolate)
// This provides a "best-effort" rate limiting layer without needing external Redis.
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const RATE_LIMIT = 5; // max requests
const WINDOW_MS = 60 * 1000; // 1 minute window

export default function proxy(request: NextRequest) {
  // Apply rate limiting specifically to the contact/demo API
  if (request.nextUrl.pathname.startsWith('/api/contact') && request.method === 'POST') {
    // Attempt to get the client IP, fallback to a generic string if unavailable locally
    const ip = request.headers.get('x-forwarded-for') || 'anonymous_ip';
    
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record) {
      rateLimitMap.set(ip, { count: 1, lastReset: now });
    } else {
      // If the window has passed, reset the counter
      if (now - record.lastReset > WINDOW_MS) {
        rateLimitMap.set(ip, { count: 1, lastReset: now });
      } else {
        record.count++;
        if (record.count > RATE_LIMIT) {
          console.warn(`[SECURITY] Rate limit exceeded for IP: ${ip}`);
          return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { 
              status: 429,
              headers: { 'Retry-After': '60' }
            }
          );
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  // Only run middleware on API routes
  matcher: '/api/:path*',
};
