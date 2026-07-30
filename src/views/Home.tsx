"use client";
import {
  Countries,
  Faq,
  FinalCta,
  IndiaTracks,
  LatestNews,
  Newspapers,
  Scholarships,
  Services,
  SuccessStories,
  Testimonials,
  Universities,
} from "@/sections/HomeBottom";
import { AboutSplit, AchievementBand, Hero, Process, Timeline, TrustBar, WhyChooseUs } from "@/sections/HomeTop";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <AboutSplit />
      <Process />
      <Services />
      <AchievementBand />
      <Universities />
      <Scholarships />
      <WhyChooseUs />
      <Countries />
      <Newspapers />
      <LatestNews />
      <IndiaTracks />
      <SuccessStories />
      <Testimonials />
      <Timeline />
      <Faq compact />
      <FinalCta />
    </>
  );
}
