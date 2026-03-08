#!/usr/bin/env node
/**
 * Subscriber Outreach - Send sample newsletter to potential subscribers
 * Usage: node outreach-subscribers.js
 */

const postmark = require('postmark');

// Postmark credentials (same as send-digest-db)
const POSTMARK_TOKEN = '79a37a38-b959-4f40-ae88-c44e22aee5c1';
const FROM_EMAIL = 'newsletter@beri.net';
const client = new postmark.ServerClient(POSTMARK_TOKEN);

// Potential subscriber list - engineering leaders, CTOs, AI practitioners
const prospects = [
  // Add more as we discover them
  { email: 'example@company.com', name: 'First Last', company: 'Company', title: 'CTO' }
];

// Sample newsletter template for outreach
function buildOutreachEmail(name, company) {
  const firstName = name.split(' ')[0];
  
  return {
    subject: `${firstName}, here's what I learned about AI agents this week`,
    html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 28px;">THE D[AI]LY BRIEF</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">AI insights for engineering leaders</p>
  </div>
  
  <div style="padding: 40px 20px; background: white;">
    <p style="font-size: 16px; line-height: 1.6;">Hi ${firstName},</p>
    
    <p style="font-size: 16px; line-height: 1.6;">
      I'm Rajesh Beri, and I just launched <strong>THE D[AI]LY BRIEF</strong> — a twice-weekly newsletter on AI deployment for engineering leaders.
    </p>
    
    <p style="font-size: 16px; line-height: 1.6;">
      No hype. No surface-level news. Just what actually matters when you're deploying AI at scale.
    </p>
    
    <div style="background: #f7f7f7; border-left: 4px solid #667eea; padding: 20px; margin: 30px 0;">
      <h3 style="margin: 0 0 15px 0; color: #333;">This week's deep dive:</h3>
      <p style="margin: 0 0 10px 0; font-size: 15px;"><strong>"Your AI Agents Can't Actually Do Anything. Here's How to Fix That"</strong></p>
      <p style="margin: 0; font-size: 14px; color: #666;">
        Agent skills, progressive disclosure, and code execution sandboxes — the architecture pattern becoming standard.
      </p>
      <p style="margin: 15px 0 0 0;">
        <a href="https://beri.net/article/rag-skills-executable-capabilities" style="color: #667eea; text-decoration: none; font-weight: 600;">Read the full breakdown →</a>
      </p>
    </div>
    
    <p style="font-size: 16px; line-height: 1.6;">
      <strong>Why subscribe?</strong>
    </p>
    
    <ul style="font-size: 15px; line-height: 1.8; color: #555;">
      <li>Real benchmarks from production workloads (not marketing claims)</li>
      <li>Written for engineering leaders deploying AI at scale</li>
      <li>Twice weekly — deep dives only, no fluff</li>
      <li>100% free, always</li>
    </ul>
    
    <div style="text-align: center; margin: 40px 0;">
      <a href="https://beri.net/#newsletter" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
        Subscribe to THE D[AI]LY BRIEF
      </a>
    </div>
    
    <p style="font-size: 14px; line-height: 1.6; color: #666; border-top: 1px solid #eee; padding-top: 20px; margin-top: 40px;">
      <strong>About me:</strong> I bring 30+ years of enterprise software experience to AI deployment insights. Head of AI Engineering at a Fortune 500 security company. This newsletter shares what I'm seeing work (and what doesn't) in the field.
    </p>
    
    <p style="font-size: 14px; line-height: 1.6; color: #666;">
      No spam. Unsubscribe anytime. Just practical AI insights.
    </p>
    
    <p style="font-size: 14px; line-height: 1.6; color: #666;">
      — Rajesh<br>
      <a href="https://beri.net" style="color: #667eea;">beri.net</a>
    </p>
  </div>
  
  <div style="background: #f7f7f7; padding: 20px; text-align: center; color: #999; font-size: 12px;">
    <p style="margin: 0;">THE D[AI]LY BRIEF | <a href="https://beri.net" style="color: #667eea;">beri.net</a></p>
    <p style="margin: 10px 0 0 0;">AI insights for engineering leaders — twice weekly</p>
  </div>
</div>
    `.trim(),
    text: `
Hi ${firstName},

I'm Rajesh Beri, and I just launched THE D[AI]LY BRIEF — a twice-weekly newsletter on AI deployment for engineering leaders.

No hype. No surface-level news. Just what actually matters when you're deploying AI at scale.

THIS WEEK'S DEEP DIVE:
"Your AI Agents Can't Actually Do Anything. Here's How to Fix That"

Agent skills, progressive disclosure, and code execution sandboxes — the architecture pattern becoming standard.

Read the full breakdown: https://beri.net/article/rag-skills-executable-capabilities

WHY SUBSCRIBE?
• Real benchmarks from production workloads (not marketing claims)
• Written for engineering leaders deploying AI at scale
• Twice weekly — deep dives only, no fluff
• 100% free, always

Subscribe: https://beri.net/#newsletter

---

About me: I bring 30+ years of enterprise software experience to AI deployment insights. Head of AI Engineering at a Fortune 500 security company. This newsletter shares what I'm seeing work (and what doesn't) in the field.

No spam. Unsubscribe anytime. Just practical AI insights.

— Rajesh
beri.net
    `.trim()
  };
}

async function sendOutreach(dryRun = true) {
  console.log(`\n📧 Subscriber Outreach Campaign\n`);
  console.log(`Mode: ${dryRun ? 'DRY RUN (no emails sent)' : 'LIVE SEND'}\n`);
  
  if (prospects.length === 0) {
    console.log('❌ No prospects in list. Add prospects to the prospects array first.');
    console.log('\nExample:');
    console.log('  { email: "cto@company.com", name: "Jane Doe", company: "Acme Inc", title: "CTO" }');
    return;
  }
  
  for (const prospect of prospects) {
    const email = buildOutreachEmail(prospect.name, prospect.company);
    
    console.log(`📨 ${prospect.name} (${prospect.title} at ${prospect.company})`);
    console.log(`   To: ${prospect.email}`);
    console.log(`   Subject: ${email.subject}`);
    
    if (!dryRun) {
      try {
        const result = await client.sendEmail({
          From: FROM_EMAIL,
          To: prospect.email,
          Subject: email.subject,
          HtmlBody: email.html,
          TextBody: email.text,
          MessageStream: 'outbound',
          TrackOpens: true,
          TrackLinks: 'HtmlAndText'
        });
        
        console.log(`   ✅ Sent (MessageID: ${result.MessageID})`);
      } catch (error) {
        console.log(`   ❌ Failed: ${error.message}`);
      }
    } else {
      console.log(`   🔍 [DRY RUN - would send]`);
    }
    
    console.log('');
  }
  
  console.log(`\n${dryRun ? '🔍 Dry run complete' : '✅ Outreach campaign complete'}`);
  console.log(`Total prospects: ${prospects.length}\n`);
  
  if (dryRun) {
    console.log('💡 To send for real: node outreach-subscribers.js --live');
  }
}

// Parse args
const args = process.argv.slice(2);
const live = args.includes('--live');

sendOutreach(!live);
