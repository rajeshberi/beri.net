import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';
const MONGODB_DB = process.env.MONGODB_DB || 'beri-newsletter';

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate name
    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please enter your first name' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(MONGODB_DB);
    const subscribers = db.collection('subscribers');

    // Check if already subscribed
    const existing = await subscribers.findOne({ email: email.toLowerCase() });
    
    if (existing) {
      await client.close();
      
      // If previously unsubscribed, reactivate
      if (existing.status === 'inactive') {
        await client.connect();
        await subscribers.updateOne(
          { email: email.toLowerCase() },
          {
            $set: {
              name: name.trim(),
              status: 'active',
              updated_at: new Date()
            }
          }
        );
        await client.close();
        
        return NextResponse.json({
          success: true,
          message: `Welcome back, ${name}! Your subscription has been reactivated.`
        });
      }
      
      return NextResponse.json({
        success: true,
        message: 'You\'re already subscribed!'
      });
    }

    // Insert new subscriber
    const subscriber = {
      email: email.toLowerCase(),
      name: name.trim(),
      status: 'active',
      subscribed_date: new Date(),
      source: 'website',
      tags: [],
      preferences: {
        frequency: 'twice_weekly',
        topics: []
      },
      engagement: {
        total_sent: 0,
        total_opens: 0,
        total_clicks: 0,
        last_opened: null,
        last_clicked: null
      },
      created_at: new Date(),
      updated_at: new Date()
    };

    await subscribers.insertOne(subscriber);
    await client.close();

    return NextResponse.json({
      success: true,
      message: `Thanks for subscribing, ${name}! Check your inbox for a welcome email.`
    });

  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
