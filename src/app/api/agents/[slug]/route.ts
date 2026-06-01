import { NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_API_URL || 'https://tutorflow-backend.whitesea-c505a8c9.uksouth.azurecontainerapps.io';

// Maps URL-friendly slugs to backend agent names
const AGENT_MAP: Record<string, string> = {
  'niche-analyst': 'niche_analyst',
  'content-studio': 'content_studio',
  'seo-monitor': 'seo_monitor',
};

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const agentName = AGENT_MAP[slug];

  if (!agentName) {
    return NextResponse.json({ error: 'Unknown agent' }, { status: 404 });
  }

  try {
    const body = await req.json();
    const res = await fetch(`${BACKEND}/api/agents/${agentName}/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`Agent ${agentName} error:`, res.status, text);
      return NextResponse.json({ error: 'Agent unavailable', details: text }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Agent proxy error for ${agentName}:`, error);
    return NextResponse.json({ error: 'Agent request failed' }, { status: 500 });
  }
}
