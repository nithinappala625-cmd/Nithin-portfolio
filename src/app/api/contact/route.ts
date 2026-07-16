import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getPortfolioData } from '@/lib/kv';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const portfolioData = await getPortfolioData();
    const destinationEmail = portfolioData.hero.email;

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set. Simulating success.");
      return NextResponse.json({ success: true, simulated: true });
    }

    const { data: resendData, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Use a verified domain or onboarding email on free tier
      to: [destinationEmail],
      subject: `New Contact Form Submission from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: resendData });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
