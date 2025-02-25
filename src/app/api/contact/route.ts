import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, to } = body;

    // Here you would typically integrate with an email service like SendGrid, AWS SES, etc.
    // For now, we'll just log the data
    console.log('Contact form submission:', {
      to,
      from: email,
      name,
      message,
    });

    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
