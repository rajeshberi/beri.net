import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

const MONGODB_URI = process.env.MONGODB_URI || '';
const MONGODB_DB = process.env.MONGODB_DB || 'beri-newsletter';
const POSTMARK_API_KEY = process.env.POSTMARK_API_KEY || '';
const FROM_EMAIL = process.env.FROM_EMAIL || 'THE D[AI]LY BRIEF <newsletter@beri.net>';

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
    const db = client[MONGODB_DB];
    const subscribers = db.collection('subscribers');

    // Check if already subscribed
    const existing = await subscribers.findOne({ email: email.toLowerCase() });
    
    if (!existing) {
      // Insert new subscriber with lead-magnet source
      const subscriber = {
        email: email.toLowerCase(),
        name: name.trim(),
        status: 'active',
        subscribed_date: new Date(),
        source: 'lead-magnet',
        tags: ['lead-magnet'],
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
    } else if (existing.status === 'inactive') {
      // Reactivate
      await subscribers.updateOne(
        { email: email.toLowerCase() },
        {
          $set: {
            name: name.trim(),
            status: 'active',
            updated_at: new Date()
          },
          $addToSet: { tags: 'lead-magnet' }
        }
      );
    } else {
      // Active subscriber - just tag them
      await subscribers.updateOne(
        { email: email.toLowerCase() },
        {
          $addToSet: { tags: 'lead-magnet' }
        }
      );
    }

    await client.close();

    // Send PDF via Postmark
    const pdfPath = path.join(process.cwd(), '..', 'lead-magnets', 'ai-tools-comparison-2026.pdf');
    
    let pdfContent;
    try {
      pdfContent = fs.readFileSync(pdfPath).toString('base64');
    } catch (error) {
      console.error('PDF file not found:', error);
      return NextResponse.json(
        { error: 'Lead magnet not available. Please try again later.' },
        { status: 500 }
      );
    }

    // Send via Postmark API
    const emailPayload = {
      From: FROM_EMAIL,
      To: email,
      Subject: 'Your Enterprise AI Tools Comparison Guide 2026',
      HtmlBody: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">📊 Your AI Tools Guide is Ready!</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; margin-bottom: 20px;">Hi ${name},</p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              Thanks for your interest in enterprise AI tools! Your <strong>Enterprise AI Tools Comparison Guide 2026</strong> is attached to this email.
            </p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              Inside you'll find:
            </p>
            
            <ul style="font-size: 16px; margin-bottom: 20px; padding-left: 20px;">
              <li>Comprehensive analysis of leading AI tools</li>
              <li>Pricing comparisons and deployment options</li>
              <li>Use case recommendations</li>
              <li>Quick comparison matrix</li>
            </ul>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              <strong>Want more insights like this?</strong>
            </p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              You're now subscribed to THE D[AI]LY BRIEF — you'll get real AI benchmarks and vendor analysis in your inbox twice weekly (Tuesdays and Thursdays).
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://beri.net" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Visit beri.net</a>
            </div>
            
            <p style="font-size: 14px; color: #666; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              Rajesh Beri<br>
              <em>Head of AI Engineering @ Enterprise Scale</em><br>
              THE D[AI]LY BRIEF
            </p>
            
            <p style="font-size: 12px; color: #999; margin-top: 20px;">
              You're receiving this because you requested the Enterprise AI Tools Comparison Guide.<br>
              Don't want emails from us? <a href="https://beri.net/unsubscribe?email=${encodeURIComponent(email)}" style="color: #999;">Unsubscribe</a>
            </p>
          </div>
        </body>
        </html>
      `,
      TextBody: `Hi ${name},\n\nThanks for your interest in enterprise AI tools! Your Enterprise AI Tools Comparison Guide 2026 is attached to this email.\n\nYou're now subscribed to THE D[AI]LY BRIEF — you'll get real AI benchmarks and vendor analysis in your inbox twice weekly.\n\nVisit beri.net for more insights.\n\nBest,\nRajesh Beri\nTHE D[AI]LY BRIEF`,
      Attachments: [
        {
          Name: 'Enterprise-AI-Tools-Comparison-2026.pdf',
          Content: pdfContent,
          ContentType: 'application/pdf'
        }
      ],
      MessageStream: 'outbound'
    };

    const postmarkResponse = await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': POSTMARK_API_KEY
      },
      body: JSON.stringify(emailPayload)
    });

    if (!postmarkResponse.ok) {
      const errorData = await postmarkResponse.json();
      console.error('Postmark error:', errorData);
      throw new Error('Failed to send email');
    }

    return NextResponse.json({
      success: true,
      message: `Check your inbox, ${name}! Your guide is on its way.`
    });

  } catch (error) {
    console.error('Lead magnet error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
