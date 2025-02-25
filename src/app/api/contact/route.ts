import { NextResponse } from 'next/server';
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Initialize SES client
const ses = new SESClient({
  region: process.env.AWS_REGION || "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, to } = body;

    // Log environment variables (excluding secret)
    console.log('Environment check:', {
      region: process.env.AWS_REGION,
      fromEmail: process.env.AWS_SES_FROM_EMAIL,
      hasAccessKey: !!process.env.AWS_ACCESS_KEY_ID,
      hasSecretKey: !!process.env.AWS_SECRET_ACCESS_KEY,
    });

    const params = {
      Source: process.env.AWS_SES_FROM_EMAIL,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: `New Contact Form Message from ${name}`,
          Charset: "UTF-8",
        },
        Body: {
          Text: {
            Data: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            Charset: "UTF-8",
          },
        },
      },
    };

    console.log('Attempting to send email with params:', {
      ...params,
      Source: process.env.AWS_SES_FROM_EMAIL, // Log the actual source email
      Destination: params.Destination,
    });

    const command = new SendEmailCommand(params);
    await ses.send(command);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Detailed contact form error:', {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    
    return NextResponse.json(
      { 
        error: 'Failed to send message',
        details: error.message,
        code: error.code 
      },
      { status: 500 }
    );
  }
}
