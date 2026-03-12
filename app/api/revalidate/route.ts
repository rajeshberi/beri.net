import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  
  // Validate secret token
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
  
  try {
    // Revalidate homepage
    revalidatePath('/');
    
    // Optionally revalidate specific paths from request body
    const body = await request.json().catch(() => ({}));
    if (body.paths && Array.isArray(body.paths)) {
      body.paths.forEach((path: string) => revalidatePath(path));
    }
    
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
