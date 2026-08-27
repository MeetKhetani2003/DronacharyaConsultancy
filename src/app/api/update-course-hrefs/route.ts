import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Course } from '@/models/Course';

export async function GET() {
  try {
    await connectToDatabase();
    const courses = await Course.find({ href: '#' });
    
    for (const c of courses) {
      const slug = c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      c.href = `/courses/${slug}`;
      await c.save();
    }
    
    return NextResponse.json({ success: true, message: 'Updated course hrefs' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
