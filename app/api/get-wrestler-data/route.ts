import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const school = searchParams.get('school');

  if (!school) {
    return NextResponse.json({ error: 'School parameter is required' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("wrestling_tournament");
    const collection = db.collection("wrestler_data");

    const data = await collection.findOne({ schoolName: school });

    if (data) {
      return NextResponse.json({ wrestlerData: data.wrestlerData });
    } else {
      return NextResponse.json({ wrestlerData: null });
    }
  } catch (e) {
    console.error('Error in API route:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}