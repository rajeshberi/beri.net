import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db('beri-newsletter');
    const subscribers = db.collection('subscribers');

    // Check if subscriber exists
    const subscriber = await subscribers.findOne({ email: email.toLowerCase() });

    if (!subscriber) {
      await client.close();
      return NextResponse.json(
        { error: 'Email address not found in our subscriber list' },
        { status: 404 }
      );
    }

    // Update subscriber status to unsubscribed
    await subscribers.updateOne(
      { email: email.toLowerCase() },
      {
        $set: {
          status: 'unsubscribed',
          unsubscribed_at: new Date(),
          updated_at: new Date()
        }
      }
    );

    await client.close();

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed from THE D[AI]LY BRIEF'
    });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe. Please try again later.' },
      { status: 500 }
    );
  }
}
