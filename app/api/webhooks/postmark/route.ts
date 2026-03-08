import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';
const MONGODB_DB = process.env.MONGODB_DB || 'beri-newsletter';

// Postmark webhook events we care about
type PostmarkEvent = {
  RecordType: 'Open' | 'Click' | 'Bounce' | 'SpamComplaint' | 'Delivery';
  MessageID: string;
  Recipient: string;
  ReceivedAt: string;
  // Open events
  FirstOpen?: boolean;
  Client?: {
    Name: string;
    Company: string;
    Family: string;
  };
  OS?: {
    Name: string;
    Family: string;
  };
  Platform?: string;
  UserAgent?: string;
  // Click events
  OriginalLink?: string;
  // Bounce events
  Type?: string;
  Description?: string;
  Details?: string;
  // Custom metadata we send with emails
  Metadata?: {
    newsletter_id?: string;
    article_slug?: string;
    link_type?: string;
  };
};

export async function POST(request: NextRequest) {
  try {
    const events: PostmarkEvent[] = await request.json();
    
    if (!Array.isArray(events)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(MONGODB_DB);
    const engagementCollection = db.collection('engagement_events');

    const timestamp = new Date();

    // Process each event
    for (const event of events) {
      const baseDoc = {
        event_type: event.RecordType.toLowerCase(),
        message_id: event.MessageID,
        recipient: event.Recipient,
        received_at: new Date(event.ReceivedAt),
        created_at: timestamp,
        metadata: event.Metadata || {},
      };

      switch (event.RecordType) {
        case 'Open':
          await engagementCollection.insertOne({
            ...baseDoc,
            first_open: event.FirstOpen || false,
            client: event.Client,
            os: event.OS,
            platform: event.Platform,
            user_agent: event.UserAgent,
          });
          break;

        case 'Click':
          await engagementCollection.insertOne({
            ...baseDoc,
            original_link: event.OriginalLink,
            link_type: event.Metadata?.link_type || 'unknown',
          });
          break;

        case 'Bounce':
          await engagementCollection.insertOne({
            ...baseDoc,
            bounce_type: event.Type,
            description: event.Description,
            details: event.Details,
          });
          
          // If hard bounce, mark subscriber as bounced
          if (event.Type === 'HardBounce') {
            await db.collection('subscribers').updateOne(
              { email: event.Recipient },
              { $set: { status: 'bounced', bounced_at: timestamp } }
            );
          }
          break;

        case 'SpamComplaint':
          await engagementCollection.insertOne(baseDoc);
          
          // Mark subscriber as complained
          await db.collection('subscribers').updateOne(
            { email: event.Recipient },
            { $set: { status: 'complained', complained_at: timestamp } }
          );
          break;

        case 'Delivery':
          await engagementCollection.insertOne(baseDoc);
          break;
      }
    }

    await client.close();

    return NextResponse.json({ 
      ok: true, 
      processed: events.length,
      message: `Processed ${events.length} webhook event(s)`
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ 
    ok: true, 
    message: 'Postmark webhook endpoint active' 
  });
}
