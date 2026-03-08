#!/usr/bin/env node
/**
 * Export MongoDB articles to markdown files (for Git backups)
 * Run weekly via cron to maintain version control
 */

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const uri = process.env.MONGODB_URI || 'mongodb+srv://doadmin:W7iC6S5m031L2z9b@cluster0.3obmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function exportToMarkdown() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db('beri-newsletter');
    
    const newsletters = await db
      .collection('newsletters')
      .find({})
      .sort({ date: -1 })
      .toArray();
    
    console.log(`\n📦 Exporting ${newsletters.length} articles to markdown...\n`);
    
    const backupDir = path.join(__dirname, 'content', 'newsletters-backup');
    
    // Create backup directory
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    for (const article of newsletters) {
      const frontmatter = [
        '---',
        `title: "${article.title.replace(/"/g, '\\"')}"`,
        `slug: ${article.slug}`,
        `excerpt: "${article.excerpt.replace(/"/g, '\\"')}"`,
        `date: ${article.date}`,
        `author: ${article.author}`,
        `tags: [${article.tags.map(t => `"${t}"`).join(', ')}]`,
      ];
      
      if (article.image) {
        frontmatter.push(`image: "${article.image}"`);
      }
      if (article.imageCredit) {
        frontmatter.push(`imageCredit: "${article.imageCredit}"`);
      }
      if (article.type) {
        frontmatter.push(`type: ${article.type}`);
      }
      if (article.originalUrl) {
        frontmatter.push(`originalUrl: "${article.originalUrl}"`);
      }
      if (article.originalAuthor) {
        frontmatter.push(`originalAuthor: "${article.originalAuthor}"`);
      }
      if (article.originalSource) {
        frontmatter.push(`originalSource: "${article.originalSource}"`);
      }
      
      frontmatter.push('---');
      frontmatter.push('');
      
      const markdown = frontmatter.join('\n') + article.content;
      
      const filename = path.join(backupDir, `${article.slug}.md`);
      fs.writeFileSync(filename, markdown, 'utf8');
      
      console.log(`✅ ${article.slug}.md`);
    }
    
    console.log(`\n✅ Exported ${newsletters.length} articles to ${backupDir}`);
    console.log('\n💡 Commit to Git for version control:');
    console.log('   git add content/newsletters-backup/');
    console.log('   git commit -m "Backup: exported articles from MongoDB"');
    console.log('   git push\n');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

exportToMarkdown();
