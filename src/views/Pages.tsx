"use client";
import { Calendar, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Btn, MaskImage, Reveal, Section, SectionHead, Stagger, StaggerItem } from "@/components/ui";
import { COUNTRIES, MEDIA, UNIVERSITIES } from "@/data/content";
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
import { AboutSplit, AchievementBand, Process, Timeline, WhyChooseUs } from "@/sections/HomeTop";

/* ------------------------------------------------------------------ */

export function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="Established 2003 · Bhilwara, Rajasthan"
        title="Two decades of putting families before paperwork."
        highlight="families"
        sub="Dronacharya MBBS Consultancy is one of Rajasthan’s oldest and most trusted overseas education consultancies — built on transparency, verified universities and lifelong student support."
        image={MEDIA.counselling3}
      />
      <AboutSplit />

      <Section className="bg-white">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHead eyebrow="Our Philosophy" title="A guru’s role is to remove uncertainty." highlight="uncertainty" />
            <Reveal delay={0.15}>
              <p className="mt-7 text-[15px] leading-relaxed font-semibold text-ink">
                The name Dronacharya belongs to the greatest teacher of the Mahabharata — the one who shaped ordinary
                students into extraordinary achievers. That is the standard we hold ourselves to every admission season.
              </p>
            </Reveal>
            <Stagger className="mt-10 space-y-5">
              {[
                "Only NMC-listed, WHO/WDOMS registered universities are recommended.",
                "Every fee structure is issued in writing, with no hidden charges.",
                "Documentation is audited twice before it leaves our office.",
                "Support continues long after the student lands on campus.",
              ].map((t) => (
                <StaggerItem key={t}>
                  <div className="flex items-start gap-3.5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    <span className="text-[14.5px] font-semibold text-ink">{t}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.25}>
              <div className="mt-11">
                <Btn to="/contact" variant="dark">
                  Visit Our Office
                </Btn>
              </div>
            </Reveal>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            <MaskImage src={MEDIA.seminar1} alt="Counselling seminar" className="aspect-[3/4] rounded-3xl sm:mt-12" parallax={4} />
            <MaskImage src={MEDIA.gradGroup} alt="Graduation ceremony" className="aspect-[3/4] rounded-3xl" delay={0.15} parallax={4} />
          </div>
        </div>
      </Section>

      <Timeline />
      <WhyChooseUs />
      <AchievementBand />
      <Testimonials />
      <FinalCta />
    </>
  );
}

/* ------------------------------------------------------------------ */

export function MbbsIndiaPage() {
  const rows = [
    { k: "NEET UG Exam", v: "May 2026 (tentative)" },
    { k: "Result Declaration", v: "June 2026" },
    { k: "AIQ Counselling (MCC)", v: "July – October 2026" },
    { k: "State Counselling", v: "July – November 2026" },
    { k: "Deemed University Rounds", v: "Aligned with MCC schedule" },
    { k: "Stray Vacancy Round", v: "October – November 2026" },
  ];
  return (
    <>
      <PageHero
        crumb="MBBS in India"
        eyebrow="Government · Private · Deemed"
        title="Your Indian medical seat, planned rank by rank."
        highlight="rank"
        sub="AIQ and state counselling strategy, choice-filling architecture and category planning from a team that has worked 23 consecutive admission seasons."
        image={MEDIA.campusWalk}
      />
      <IndiaTracks />

      <Section className="bg-white">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHead eyebrow="Counselling Calendar" title="Know every date before it matters." />
            <Reveal delay={0.15}>
              <p className="mt-6 text-[15px] leading-relaxed font-semibold text-ink">
                Missing a registration window costs more seats every year than a low rank does. We track each round and
                remind you at every checkpoint.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-9">
                <Btn to="/apply">Get My Counselling Plan</Btn>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-ink/[0.07]">
              {rows.map((r, i) => (
                <Reveal key={r.k} delay={i * 0.05}>
                  <div className="flex items-center justify-between gap-6 border-b border-ink/[0.06] bg-white px-7 py-5 transition-colors last:border-0 hover:bg-mist">
                    <span className="font-display text-[15px] font-medium text-ink">{r.k}</span>
                    <span className="text-[13.5px] font-semibold text-ink">{r.v}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Faq compact />
      <FinalCta />
    </>
  );
}

/* ------------------------------------------------------------------ */

export function MbbsAbroadPage() {
  return (
    <>
      <PageHero
        crumb="MBBS Abroad"
        eyebrow="8 Countries · 100+ Universities"
        title="A globally recognised medical degree, within reach."
        highlight="recognised"
        sub="NMC-listed universities, English-medium programmes, transparent budgets and licensing support from your first year to FMGE / NExT."
        image={MEDIA.labMicroscopes}
      />
      <Countries full />
      <Process />
      <Universities />
      <Scholarships />
      <Faq compact />
      <FinalCta />
    </>
  );
}

/* ------------------------------------------------------------------ */

export function CountriesPage() {
  return (
    <>
      <PageHero
        crumb="Countries"
        eyebrow="Compare Destinations"
        title="Fees, duration, eligibility and recognition — side by side."
        highlight="recognition"
        image={MEDIA.uni3}
      />
      <Countries full />

      <Section className="bg-mist">
        <div className="container-x">
          <SectionHead eyebrow="Quick Comparison" title="One table, every decision." align="center" />
          <Reveal delay={0.15}>
            <div className="mt-14 overflow-x-auto rounded-3xl border border-ink/[0.07] bg-white">
              <table className="w-full min-w-[820px] text-left">
                <thead>
                  <tr className="border-b border-ink/[0.07] bg-mist/60">
                    {["Country", "Total Fees", "Duration", "Recognition", "Medium", "Intake"].map((h) => (
                      <th key={h} className="px-6 py-5 text-[11px] tracking-[0.18em] text-ink uppercase">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COUNTRIES.map((c) => (
                    <tr key={c.name} className="border-b border-ink/[0.05] transition-colors last:border-0 hover:bg-mist/60">
                      <td className="px-6 py-5 font-display text-[15px] font-medium text-ink">
                        {c.flag} {c.name}
                      </td>
                      <td className="px-6 py-5 text-[13.5px] font-semibold text-ink">{c.fees}</td>
                      <td className="px-6 py-5 text-[13.5px] font-semibold text-ink">{c.duration}</td>
                      <td className="px-6 py-5 text-[13.5px] font-semibold text-ink">{c.recognition}</td>
                      <td className="px-6 py-5 text-[13.5px] font-semibold text-ink">{c.medium}</td>
                      <td className="px-6 py-5 text-[13.5px] font-semibold text-brand">{c.intake}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}

/* ------------------------------------------------------------------ */

export function UniversitiesPage() {
  return (
    <>
      <PageHero
        crumb="Universities"
        eyebrow="Partner Network"
        title="Campuses verified by us, chosen for you."
        highlight="verified"
        image={MEDIA.uni1}
      />
      <Universities />

      <Section className="bg-mist">
        <div className="container-x">
          <SectionHead eyebrow="Full Directory" title="Recognition and fees at a glance." align="center" />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-2">
            {UNIVERSITIES.map((u) => (
              <StaggerItem key={u.name} className="h-full">
                <div className="card-lift flex h-full items-center gap-6 rounded-3xl border border-ink/[0.07] bg-white p-5">
                  <div className="img-zoom h-28 w-28 shrink-0 overflow-hidden rounded-2xl">
                    <img src={u.image} alt={u.name} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] tracking-[0.16em] text-brand uppercase">
                      {u.flag} {u.country} · {u.rank}
                    </p>
                    <h3 className="font-display mt-2 text-[17px] leading-snug font-medium text-ink">{u.name}</h3>
                    <p className="mt-2 text-[12.5px] font-semibold text-ink">
                      {u.recognition} · <span className="text-ink">{u.fees}</span>
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}

/* ------------------------------------------------------------------ */

export function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Services"
        eyebrow="End-to-End Support"
        title="Ten services. One continuous relationship."
        highlight="continuous"
        sub="From the first counselling session to your medical licence — every step is handled in-house by people you can meet in person."
        image={MEDIA.counselling2}
      />
      <Services />
      <Process />
      <WhyChooseUs />
      <FinalCta />
    </>
  );
}

/* ------------------------------------------------------------------ */

export function ScholarshipsPage() {
  return (
    <>
      <PageHero
        crumb="Scholarships"
        eyebrow="Financial Support"
        title="Grants that make a medical degree possible."
        highlight="possible"
        sub="Merit awards, girl-child grants, early-bird advantages and direct university funding — reviewed every intake."
        image={MEDIA.gradJoy}
      />
      <Scholarships />
      <Faq compact />
      <FinalCta />
    </>
  );
}

/* ------------------------------------------------------------------ */

export function SuccessStoriesPage() {
  return (
    <>
      <PageHero
        crumb="Success Stories"
        eyebrow="Alumni & Families"
        title="Five thousand journeys, one shared beginning."
        highlight="journeys"
        image={MEDIA.gradToss}
      />
      <SuccessStories />
      <AchievementBand />
      <Testimonials />
      <Newspapers />
      <FinalCta />
    </>
  );
}

/* ------------------------------------------------------------------ */

export function NewsPage() {
  return (
    <>
      <PageHero
        crumb="Latest News"
        eyebrow="Admission Intelligence"
        title="NEET, counselling and university updates."
        highlight="counselling"
        image={MEDIA.labScientist}
      />
      <LatestNews limit={6} />
      <FinalCta />
    </>
  );
}

/* ------------------------------------------------------------------ */

export function FaqPage() {
  return (
    <>
      <PageHero
        crumb="FAQ"
        eyebrow="Answers"
        title="Everything a parent needs to know."
        highlight="parent"
        image={MEDIA.seminar2}
      />
      <Faq />
      <FinalCta />
    </>
  );
}

/* ------------------------------------------------------------------ */

export function EventsPage() {
  return (
    <>
      <PageHero
        crumb="Events"
        eyebrow="Seminars & Workshops"
        title="Meet our experts in your city."
        highlight="experts"
        sub="Join our upcoming seminars for direct interactions with university delegates and our senior counsellors."
        image={MEDIA.seminar1}
      />
      
      <Section className="bg-mist">
        <div className="container-x max-w-3xl text-center">
          <SectionHead eyebrow="Schedule" title="Upcoming Events" align="center" />
          <Reveal delay={0.15}>
            <div className="mt-14 rounded-3xl border border-ink/[0.07] bg-white p-12 shadow-sm">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-mist text-brand">
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="font-display text-xl font-medium text-ink">No upcoming events right now</h3>
                <p className="text-center text-[14.5px] leading-relaxed font-semibold text-ink">
                  We are currently planning our next schedule of seminars. Check back later or contact us directly to arrange a free one-on-one counselling session.
                </p>
                <div className="mt-4">
                  <Btn to="/contact" variant="primary">
                    Book Free Counselling
                  </Btn>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
      
      <FinalCta />
    </>
  );
}

/* ------------------------------------------------------------------ */

export function NextPage() {
  return (
    <>
      <PageHero
        crumb="NExT"
        eyebrow="Medical Licensing"
        title="Prepare for the National Exit Test."
        highlight="National Exit Test"
        sub="Comprehensive guidance and resources for medical graduates."
        image={MEDIA.labScientist}
      />
      <Section className="bg-white">
        <div className="container-x py-20 text-center">
          <h2 className="font-display text-2xl font-medium text-ink">NExT details coming soon.</h2>
        </div>
      </Section>
      <FinalCta />
    </>
  );
}

/* ------------------------------------------------------------------ */

export function CoachingPage() {
  return (
    <>
      <PageHero
        crumb="Coaching"
        eyebrow="Dronacharya Academy"
        title="Expert coaching for medical aspirants."
        highlight="Expert coaching"
        image={MEDIA.counselling2}
      />
      <Section className="bg-white">
        <div className="container-x py-20 text-center">
          <h2 className="font-display text-2xl font-medium text-ink">Coaching details coming soon.</h2>
        </div>
      </Section>
      <FinalCta />
    </>
  );
}

/* ------------------------------------------------------------------ */

export function SchoolCollegePage() {
  return (
    <>
      <PageHero
        crumb="Our Institutions"
        eyebrow="Education Network"
        title="Dronacharya Schools & College."
        highlight="Schools"
        image={MEDIA.campusWalk}
      />
      <Section className="bg-mist">
        <div className="container-x">
          <SectionHead eyebrow="Our Network" title="Institutions of Excellence" align="center" />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            <StaggerItem className="h-full">
              <div className="card-lift flex h-full flex-col justify-between rounded-3xl border border-ink/[0.07] bg-white p-8 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-mist text-brand">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-display text-[18px] font-medium text-ink">Dronacharya Global School</h3>
                  <p className="text-[13.5px] font-semibold text-ink">Address: Dronacharya Global School, Harni Mahadev Main Road, Bhilwara.</p>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem className="h-full">
              <div className="card-lift flex h-full flex-col justify-between rounded-3xl border border-ink/[0.07] bg-white p-8 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-mist text-brand">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-display text-[18px] font-medium text-ink">Little Ducklings School</h3>
                  <p className="text-[13.5px] font-semibold text-ink">Address: 4-A-8, Sector 4, R.C. Vyas Colony, Bhilwara.</p>
                </div>
              </div>
            </StaggerItem>
            <StaggerItem className="h-full">
              <div className="card-lift flex h-full flex-col justify-between rounded-3xl border border-ink/[0.07] bg-white p-8 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-mist text-brand">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-display text-[18px] font-medium text-ink">College - Dronacharya</h3>
                  <p className="text-[13.5px] font-semibold text-ink">Premier education and facilities.</p>
                </div>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
