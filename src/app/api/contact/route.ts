import { NextResponse } from 'next/server';
import { saveSubmission } from '@/lib/db';

const sanitize = (str: string) => str?.replace(/[<>]/g, '') || '';

async function sendEmail(to: string, subject: string, html: string) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.log('RESEND_API_KEY not set — skipping email send. Submission saved to database.');
    return;
  }
  const from = process.env.EMAIL_FROM || 'CRAM Services <onboarding@resend.dev>';
  const replyTo = process.env.EMAIL_REPLY_TO || 'cramserviceshub@gmail.com';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, reply_to: replyTo, subject, html }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Resend email error:', res.status, err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message, type, _honey } = body;

    // Honeypot
    if (_honey) {
      return NextResponse.json({ success: true, message: 'Request received.' });
    }

    // Validation
    const hasEmail = email && email !== 'N/A';
    if (!name || name.length < 2 || (hasEmail && !email.includes('@')) || !phone || phone.length < 5) {
      return NextResponse.json({ success: false, error: 'Invalid input.' }, { status: 400 });
    }

    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanPhone = sanitize(phone);
    const cleanCompany = sanitize(company || '');
    const cleanMessage = sanitize(message || '');
    const cleanType = sanitize(type || 'Contact');

    // Save to database
    await saveSubmission({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      company: cleanCompany,
      message: cleanMessage,
      type: cleanType,
    });

    const adminEmail = process.env.EMAIL_ADMIN || 'cramserviceshub@gmail.com';
    const isCarBooking = cleanType === 'Car Detailing Booking';
    const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || '447448167943'}`;

    // Notification to admin
    await sendEmail(
      adminEmail,
      `New ${cleanType} from ${cleanName}`,
      `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
          <img src="https://cramservices.co.uk/cram_logo_cs.png" alt="CRAM Services" style="height:40px;margin-bottom:24px;" />
          <h2 style="color:#D18F08;margin-bottom:16px;">New ${cleanType}</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Name</td><td style="padding:8px 0;color:#fff;font-weight:bold;">${cleanName}</td></tr>
            <tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</td><td style="padding:8px 0;color:#fff;">${cleanEmail}</td></tr>
            <tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Phone</td><td style="padding:8px 0;color:#fff;">${cleanPhone}</td></tr>
            ${cleanCompany ? `<tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:1px;">${isCarBooking ? 'Vehicle' : 'Company'}</td><td style="padding:8px 0;color:#fff;">${cleanCompany}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#999;font-size:12px;text-transform:uppercase;letter-spacing:1px;" valign="top">Message</td><td style="padding:8px 0;color:#ccc;">${cleanMessage}</td></tr>
          </table>
        </div>
      `
    );

    // Confirmation to submitter
    if (hasEmail) {
      const confirmationBody = isCarBooking
        ? `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
            <h2 style="color:#D18F08;">Booking Received — CRAM Automotive</h2>
            <p style="color:#ccc;">Hi ${cleanName}, your car detailing booking request has been received. Our team will contact you within the hour to confirm your appointment.</p>
            <p style="color:#ccc;">For faster service, chat with us directly on WhatsApp:</p>
            <a href="${whatsappLink}" style="display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;margin-top:8px;">Chat on WhatsApp</a>
            <hr style="border-color:#222;margin:24px 0;" />
            <p style="color:#666;font-size:12px;">CRAM Services | cramserviceshub@gmail.com | +44 7448 167943</p>
          </div>
        `
        : `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#fff;padding:32px;border-radius:12px;">
            <h2 style="color:#D18F08;">Thank you — CRAM Services</h2>
            <p style="color:#ccc;">Hi ${cleanName}, your enquiry has been received. Our team will review your message and get back to you shortly.</p>
            <hr style="border-color:#222;margin:24px 0;" />
            <p style="color:#666;font-size:12px;">CRAM Services | cramserviceshub@gmail.com | +44 7448 167943</p>
          </div>
        `;

      await sendEmail(
        cleanEmail,
        isCarBooking ? 'Booking Confirmed — CRAM Automotive' : 'We received your enquiry — CRAM Services',
        confirmationBody
      );
    }

    return NextResponse.json({ success: true, message: 'Request received.' });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
