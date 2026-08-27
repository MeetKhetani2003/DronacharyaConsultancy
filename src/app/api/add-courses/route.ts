import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Course } from '@/models/Course';

export async function GET() {
  try {
    await connectToDatabase();
    
    const coursesToAdd = [
      {
        title: "B.Tech",
        description: "Engineering & Technology",
        href: "#",
        category: "General",
        icon: "book"
      },
      {
        title: "BBA",
        description: "Business Administration",
        href: "#",
        category: "General",
        icon: "book"
      }
    ];

    for (const course of coursesToAdd) {
      const exists = await Course.findOne({ title: course.title });
      if (!exists) {
        await new Course(course).save();
      }
    }

    return NextResponse.json({ success: true, message: 'Added BBA and B.Tech courses' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
