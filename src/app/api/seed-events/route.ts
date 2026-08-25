import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Event from '@/models/Event';

const SUCCESS_STORIES = [
  { title: "NEET Counselling Seminar 2025", place: "Bhilwara", image: "/media/image-17.jpeg" },
  { title: "Parents' Orientation Session", place: "R.C. Vyas Colony Office", image: "/media/image-13.jpeg" },
  { title: "Pre-Departure Briefing", place: "Batch of 2025", image: "/media/image-18.jpeg" },
  { title: "MBBS Abroad Education Fair", place: "Rajasthan", image: "/media/image-20.jpeg" },
  { title: "Graduation Felicitation", place: "Returning Doctors", image: "/media/image-9.jpeg" },
  { title: "University Delegation Visit", place: "Partner Universities", image: "/media/image-19.jpeg" },
  { title: "Student Send-off Ceremony", place: "Delhi Airport", image: "/media/image-4.jpeg" },
  { title: "Clinical Campus Tour", place: "Teaching Hospital", image: "/media/image-7.jpeg" },
];

export async function GET() {
  await connectToDatabase();
  await Event.deleteMany({});
  await Event.insertMany(SUCCESS_STORIES);
  return NextResponse.json({ success: true, message: 'Seeded events' });
}
