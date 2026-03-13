import { connectToDatabase } from './mongodb';

export async function getUpcomingEvents(limit = 5) {
  try {
    const client = await connectToDatabase();
    const db = client.db('beri-newsletter');
    const collection = db.collection('events');
    
    const now = new Date();
    
    const events = await collection
      .find({
        status: 'upcoming',
        date_start: { $gte: now }
      })
      .sort({ date_start: 1 })
      .limit(limit)
      .project({ _id: 0 })
      .toArray();
    
    return events;
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    return [];
  }
}
