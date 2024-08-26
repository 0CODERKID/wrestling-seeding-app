import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("wrestling_tournament");
    const schools = await db.collection("schools").find({}).project({ "School Name": 1, _id: 0 }).toArray();

    if (schools.length === 0) {
      console.log('No schools found in the database');
      return NextResponse.json({ schools: [], message: 'No schools found' }, { status: 404 });
    }

    console.log(`Found ${schools.length} schools`);
    return NextResponse.json({ schools });
  } catch (e) {
    console.error('Error in API route:', e);
    return NextResponse.json({ error: 'Failed to fetch schools' }, { status: 500 });
  }
}