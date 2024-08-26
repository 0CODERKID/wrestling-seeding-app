import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { schoolName, wrestlerData } = await request.json();
    
    if (!schoolName || !wrestlerData) {
      return NextResponse.json({ message: "School name and wrestler data are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("wrestling_tournament");
    const collection = db.collection("wrestler_data");

    const result = await collection.updateOne(
      { schoolName: schoolName },
      { $set: { schoolName: schoolName, wrestlerData: wrestlerData } },
      { upsert: true }
    );

    if (result.upsertedCount > 0 || result.modifiedCount > 0) {
      return NextResponse.json({ message: "Data submitted successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "No changes were made" }, { status: 200 });
    }
  } catch (e) {
    console.error('Error in API route:', e);
    return NextResponse.json({ message: "Error submitting data", error: e.message }, { status: 500 });
  }
}