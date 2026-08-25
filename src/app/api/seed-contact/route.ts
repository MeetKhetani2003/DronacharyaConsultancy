import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import ContactDetail from '@/models/ContactDetail';
import { BUSINESS } from '@/data/content';

export async function GET() {
  await connectToDatabase();
  await ContactDetail.deleteMany({});
  
  const entries = Object.entries(BUSINESS).map(([key, value]) => ({
    key,
    value: typeof value === 'string' || typeof value === 'number' ? String(value) : JSON.stringify(value),
  }));

  await ContactDetail.insertMany(entries);
  return NextResponse.json({ success: true, message: 'Seeded Contact Details' });
}
