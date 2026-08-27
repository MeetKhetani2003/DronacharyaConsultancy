import { notFound } from 'next/navigation';
import PageHero from "@/components/PageHero";
import { MEDIA } from "@/data/content";
import { FinalCta, Faq, Testimonials, Services } from "@/sections/HomeBottom";
import { WhyChooseUs, Process } from "@/sections/HomeTop";
import connectToDatabase from '@/lib/mongodb';
import { Course } from '@/models/Course';

export default async function GenericCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  await connectToDatabase();
  const course = await Course.findOne({ href: `/courses/${resolvedParams.slug}` }).lean();

  if (!course) {
    notFound();
  }

  return (
    <>
      <PageHero
        crumb={course.title}
        eyebrow={course.category || "Course"}
        title={course.title + " Admissions & Guidance"}
        highlight="Admissions"
        sub={course.description || "Expert counselling and admission support for your career goals."}
        image={MEDIA.counselling2}
      />
      <WhyChooseUs />
      <Process />
      <Services />
      <Testimonials />
      <Faq compact />
      <FinalCta />
    </>
  );
}
