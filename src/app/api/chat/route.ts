import { NextResponse } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_API_URL || 'https://tutorflow-backend.whitesea-c505a8c9.uksouth.azurecontainerapps.io';

const CRAM_CONTEXT = `You are the CRAM Services AI assistant — a knowledgeable, professional, and friendly AI representing CRAM Services, a UK-based company headquartered in Coventry.

CRAM Services offers three core service lines:
1. AI AUTOMATION SYSTEMS — We build practical AI-powered business systems including: AI lead capture, AI customer service chatbots, AI voice receptionists, business analytics dashboards, workflow automation, AI social media & content engines, AI sales follow-up systems, and custom AI business agents. Pricing starts from £499 setup. Industries served: marketing agencies, car businesses, education, real estate, healthcare, logistics, finance, and local service businesses.
2. PREMIUM AUTOMOTIVE DETAILING — Concierge-level car care including body wash (from £35), paint protection film (from £1,200), ceramic coating (from £350), paint correction (from £250), interior restoration (from £150), commercial fleet detailing, and heavy truck detailing. Mobile service across the UK.
3. JET DETAILING — Aviation-grade aircraft cleaning and detailing services. Book via enquiry.

Contact: Phone +44 7448 167943 | WhatsApp +44 7448 167943 | Email cramserviceshub@gmail.com
Location: Coventry, UK (mobile nationwide)

Tone: Professional, confident, warm, and results-focused. Avoid jargon. Be concise but helpful. If asked about pricing, give ranges and recommend a consultation. Always encourage the user to book or enquire. Do not make up facts. If unsure, direct them to contact the team directly.`;

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
        context: CRAM_CONTEXT,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Backend chat error:', res.status, text);
      return NextResponse.json({
        reply: "I'm unable to respond right now. Please call us at +44 7448 167943 or WhatsApp us — we typically respond within minutes."
      });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Chat proxy error:', error);
    return NextResponse.json({
      reply: "I'm unable to respond right now. Please WhatsApp us at +44 7448 167943 or email cramserviceshub@gmail.com and we'll get back to you shortly."
    });
  }
}
