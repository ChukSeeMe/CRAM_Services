import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const DB_FILE = path.join(process.cwd(), 'database.json');
    let submissions = [];
    try {
      const fileContent = await fs.readFile(DB_FILE, 'utf-8');
      submissions = JSON.parse(fileContent);
    } catch (e) {
      // File doesn't exist yet, return empty array
    }
    
    // Sort by timestamp descending
    submissions.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return NextResponse.json(submissions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 });
  }
}
