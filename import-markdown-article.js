#!/usr/bin/env node
const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const markdownPath = process.argv[2];
if (!markdownPath) {
  console.log('Usage: node import-markdown-article.js <path-to-markdown-file>');
  process.exit(1);
}

const content = fs.readFileSync(markdownPath, 'utf8');

// Extract frontmatter
const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (!match) {
  console.error('❌ Invalid markdown format (no frontmatter found)');
  process.exit(1);
}

const [, frontmatter, body] = match;

// Parse frontmatter
const metadata = {};
frontmatter.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split(':');
  if (key && valueParts.length) {
    const value = valueParts.join(':').trim();
    const cleanValue = value.replace(/^["']|["']$/g, '');
    
    if (key === 'tags') {
      const tagMatch = value.match(/\[(.*?)\]/);
      if (tagMatch) {
        metadata.tags = tagMatch[1].split(',').map(t => t.trim().replace(/"/g, ''));
      }
    } else {
      metadata[key] = cleanValue;
    }
  }
});

console.log('📄 Importing article:', metadata.slug);
console.log('   Title:', metadata.title);
console.log('   Tags:', metadata.tags?.join(', '));

// Build create-article command
let cmd = `node ${__dirname}/create-article.js "${metadata.slug}"`;
cmd += ` --title="${metadata.title.replace(/"/g, '\\"')}"`;
cmd += ` --excerpt="${(metadata.description || metadata.excerpt || '').replace(/"/g, '\\"')}"`;
cmd += ` --date="${metadata.date}"`;
cmd += ` --author="${metadata.author}"`;

if (metadata.tags) {
  metadata.tags.forEach(tag => {
    cmd += ` --tag="${tag}"`;
  });
}

if (metadata.image) {
  cmd += ` --image="${metadata.image}"`;
}

// Save content to temp file (too large for command line)
const tempFile = path.join(__dirname, '.temp-content.txt');
fs.writeFileSync(tempFile, body, 'utf8');
cmd += ` --content="$(cat ${tempFile})"`;

console.log('\n🚀 Running create-article...\n');

exec(cmd, { maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
  fs.unlinkSync(tempFile);
  
  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }
  console.log(stdout);
  if (stderr) console.error(stderr);
});
