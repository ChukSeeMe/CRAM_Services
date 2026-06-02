import { NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_API_URL || 'https://tutorflow-backend.whitesea-c505a8c9.uksouth.azurecontainerapps.io';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const tenantId = process.env.CRAM_TENANT_ID || '2';
    const res = await fetch(`${BACKEND}/api/public/enrol`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...body,
        tenant_id: Number(tenantId),
        tenant: 'cram-services',
        context: 'CRAM Services AI assistant. Help users with AI automation, car detailing bookings, and general enquiries about CRAM Services.',
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Backend chat error:', res.status, text);
      return NextResponse.json({ reply: 'I\'m unable to respond right now. Please call us at +44 7448 167943 or email cramserviceshub@gmail.com.' });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Chat proxy error:', error);
    return NextResponse.json({ reply: 'I\'m unable to respond right now. Please call us at +44 7448 167943 or WhatsApp us.' });
  }
}
