import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Country } from '@/models/Country';
import { Course } from '@/models/Course';
import { COUNTRIES, NAV } from '@/data/content';

export async function GET() {
  try {
    await connectToDatabase();
    
    // Check if empty
    const countryCount = await Country.countDocuments();
    if (countryCount === 0) {
      await Country.insertMany(COUNTRIES);
    }
    
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      // NAV[2] is Courses
      const coursesNode = NAV.find(n => n.label === 'Courses');
      if (coursesNode && coursesNode.children) {
        const coursesData = coursesNode.children.map(c => ({
          title: c.label,
          description: c.desc,
          href: c.href,
          category: 'Medical',
          icon: 'book'
        }));
        await Course.insertMany(coursesData);
      }
    }
    
    return NextResponse.json({ success: true, message: 'Seeded countries and courses' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
