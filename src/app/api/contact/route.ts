import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { saveSubmission } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message, type, _honey } = body;

    // 1. Honeypot check (Security)
    if (_honey) {
      console.warn('Honeypot triggered by bot.');
      return NextResponse.json({ success: true, message: 'Request received securely.' });
    }

    // 2. Manual Validation (Security)
    if (!name || name.length < 2 || !email || !email.includes('@') || !phone || phone.length < 5) {
      return NextResponse.json({ success: false, error: 'Invalid input provided. Please verify all required fields.' }, { status: 400 });
    }

    // 3. Sanitization (Security - prevent basic XSS)
    const sanitize = (str: string) => str?.replace(/[<>]/g, '') || '';
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanPhone = sanitize(phone);
    const cleanCompany = sanitize(company);
    const cleanMessage = sanitize(message);

    // 4. Save to Secured Database (Local JSON for now)
    await saveSubmission({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      company: cleanCompany,
      message: cleanMessage,
      type: sanitize(type)
    });

    // 2. Send Email via Nodemailer 
    // In production, configure environment variables for SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER || 'placeholder@gmail.com',
        pass: process.env.EMAIL_PASS || 'placeholder_app_password'
      }
    });

    const mailOptions = {
      from: '"CRAM Services AI" <no-reply@cramservices.com>',
      to: 'cramserviceshub@gmail.com', // Direct to user's email
      subject: `New ${type} Request from ${name}`,
      html: `
        <h2>New Lead Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Subject:</strong> ${type}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    };

    // We only try to send if we actually have env vars set, to avoid crashing local build
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions);
    } else {
      console.log("No EMAIL_USER/EMAIL_PASS provided. Skipping email send. Data saved to database.");
    }

    return NextResponse.json({ success: true, message: 'Request received securely.' });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
