import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { sign } from 'jsonwebtoken';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not set in the environment variables');
}

export async function POST(request: Request) {
  try {
    const { schoolName, password } = await request.json();

    if (!schoolName || !password) {
      return NextResponse.json({ success: false, message: 'School name and password are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("wrestling_tournament");
    const school = await db.collection("schools").findOne({ "School Name": schoolName });

    if (school && school.Password === password) {
      const token = sign({ schoolName }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return NextResponse.json({ success: true, token });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid school or password' }, { status: 401 });
    }
  } catch (e) {
    console.error('Error in login API route:', e);
    return NextResponse.json({ success: false, message: 'Login failed' }, { status: 500 });
  }
}