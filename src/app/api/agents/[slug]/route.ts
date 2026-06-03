import { NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_API_URL || 'https://tutorflow-backend.whitesea-c505a8c9.uksouth.azurecontainerapps.io';

// Maps URL-friendly slugs to the public backend endpoints (no auth required)
const PUBLIC_AGENT_ENDPOINTS: Record<string, string> = {
  'niche-analyst':  '/api/public/agents/niche-analyst',
  'content-studio': '/api/public/agents/content-studio',
  'seo-monitor':    '/api/public/agents/seo-monitor',
};

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const endpoint = PUBLIC_AGENT_ENDPOINTS[slug];

  if (!endpoint) {
    return NextResponse.json({ error: 'Unknown agent' }, { status: 404 });
  }

  try {
    const body = await req.json();
    const res = await fetch(`${BACKEND}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`Agent ${slug} backend error:`, res.status, text);
      return NextResponse.json(
        { error: 'Agent unavailable', details: text },
        { status: res.status }
      );
    }

    const data = await res.json();
    // Normalise response — backend returns { output, agent, request_id }
    const result = data.output || data.result || data.message || JSON.stringify(data, null, 2);
    return NextResponse.json({ output: result, agent: data.agent, request_id: data.request_id });
  } catch (error) {
    console.error(`Agent proxy error for ${slug}:`, error);
    return NextResponse.json({ error: 'Agent request failed' }, { status: 500 });
  }
}
