#!/usr/bin/env python3
from pymongo import MongoClient
import os

uri = os.getenv('MONGODB_URI', 'mongodb+srv://doadmin:W7iC6S5m031L2z9b@cluster0.3obmn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
client = MongoClient(uri)
db = client['beri-newsletter']

# Update descriptions to remove "beri.net" references
updates = [
    {
        'slug': 'postmark',
        'description': 'Transactional email API with 99%+ delivery rates and detailed analytics'
    },
    {
        'slug': 'vercel',
        'description': 'Frontend cloud platform optimized for Next.js and AI applications with edge functions'
    },
    {
        'slug': 'mongodb-atlas',
        'description': 'Cloud database with built-in vector search for AI applications'
    }
]

for update in updates:
    result = db.ai_tools.update_one(
        {'slug': update['slug']},
        {'$set': {'description': update['description']}}
    )
    print(f"Updated {update['slug']}: {result.modified_count} document(s)")

print("\n✅ Removed beri.net references from tool descriptions")
