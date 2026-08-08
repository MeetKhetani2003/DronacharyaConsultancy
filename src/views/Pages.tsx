"use client";
import { useState } from "react";
import { Calendar, CheckCircle2, AlertTriangle, Scale, FileText, XCircle, Clock, Users, Brain, HeartHandshake, IndianRupee, ShieldAlert, GraduationCap, Gavel, HelpCircle, FileQuestion, BookOpen, AlertCircle, X } from "lucide-react";
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const transparencyData = [
    {
      metric: "OMR Sheet",
      neet: { available: true, desc: "Candidates can download their OMR Response Sheet." },
      upsc: { available: true, desc: "Question paper published after examination." },
      fmge: { available: false, desc: "Candidates are not allowed to see or download OMR Sheet." }
    },
    {
      metric: "Answer Key",
      neet: { available: true, desc: "Provisional & Final Answer Key are published." },
      upsc: { available: true, desc: "Official Answer Key is published after examination process." },
      fmge: { available: false, desc: "No official answer key. No way to verify correct answers." }
    },
    {
      metric: "Response Sheet",
      neet: { available: true, desc: "Candidates can download their Response Sheet." },
      upsc: { available: true, desc: "Evaluation pattern & marking scheme are transparent." },
      fmge: { available: false, desc: "Candidates cannot access their Response Sheet." }
    },
    {
      metric: "Marks & Score",
      neet: { available: true, desc: "Detailed scorecard with marks & percentile is provided." },
      upsc: { available: true, desc: "Marks, cut-off & final result are published on official website." },
      fmge: { available: false, desc: "Only Pass/Fail result. No marks, no scorecard." }
    },
    {
      metric: "Accountability",
      neet: { available: true, desc: "All India Rank, Category Rank & Cut-off are published." },
      upsc: { available: true, desc: "High level of accountability & grievance redressal." },
      fmge: { available: false, desc: "No independent review or transparency in evaluation process." }
    }
  ];

  return (
    <>
      <PageHero
        crumb="NExT"
        eyebrow="One Nation · One Policy · One Exam"
        title="Why is NExT still not implemented?"
        highlight="not implemented"
        sub="The reality of delayed justice, lack of transparency in FMGE, and our demand for equal opportunity for all medical graduates."
        image={MEDIA.labScientist}
      />

      <Section className="bg-white">
        <div className="container-x">
          <SectionHead 
            eyebrow="The Timeline" 
            title="A 7-Year Wait for Justice" 
            align="center"
          />
          <div className="mt-16 grid gap-8 md:grid-cols-5">
            <Reveal delay={0.1}>
              <div className="card-lift flex h-full flex-col rounded-3xl border border-ink/[0.07] bg-mist/50 p-6 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center self-center rounded-full bg-brand/10 text-brand">
                  <span className="font-display font-bold">2018</span>
                </div>
                <h3 className="font-display text-lg font-medium text-ink">Government Vision</h3>
                <p className="mt-3 text-[13px] font-semibold text-ink/70">"One Nation, One Policy, One Exam, One Opportunity."</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="card-lift flex h-full flex-col rounded-3xl border border-ink/[0.07] bg-mist/50 p-6 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center self-center rounded-full bg-brand/10 text-brand">
                  <span className="font-display font-bold">2019</span>
                </div>
                <h3 className="font-display text-lg font-medium text-ink">NExT Introduced</h3>
                <p className="mt-3 text-[13px] font-semibold text-ink/70">Common Exit Exam, Common Licence, Common Standard proposed.</p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="card-lift flex h-full flex-col rounded-3xl border border-ink/[0.07] bg-mist/50 p-6 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center self-center rounded-full bg-brand/10 text-brand">
                  <span className="font-display font-bold">2021</span>
                </div>
                <h3 className="font-display text-lg font-medium text-ink">FMGL Regulations</h3>
                <p className="mt-3 text-[13px] font-semibold text-ink/70">Everywhere FMGE / NExT mandated.</p>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="card-lift flex h-full flex-col rounded-3xl border border-ink/[0.07] bg-mist/50 p-6 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center self-center rounded-full bg-brand/10 text-brand">
                  <span className="font-display font-bold">2024</span>
                </div>
                <h3 className="font-display text-lg font-medium text-ink">Schedule Released</h3>
                <p className="mt-3 text-[13px] font-semibold text-ink/70">NMC released NExT Step-1 Schedule for Indian Medical Students.</p>
              </div>
            </Reveal>
            <Reveal delay={0.5}>
              <div className="card-lift flex h-full flex-col rounded-3xl border border-brand bg-brand/5 p-6 text-center shadow-[0_0_20px_rgba(var(--color-brand),0.15)]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center self-center rounded-full bg-brand text-white">
                  <span className="font-display font-bold">TODAY</span>
                </div>
                <h3 className="font-display text-lg font-bold text-brand">Still No NExT</h3>
                <p className="mt-3 text-[13px] font-bold text-ink">After 7 years, we are still waiting.</p>
              </div>
            </Reveal>
          </div>

          <div className="mt-16 rounded-3xl bg-ink p-10 text-center text-white">
            <h3 className="font-display text-2xl font-medium">We have only one question:</h3>
            <p className="mt-4 text-xl font-bold text-brand">If Government introduced NExT for ALL Medical Graduates... THEN WHY HAS IT NOT BEEN IMPLEMENTED?</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/10 p-5">
                <Clock className="h-8 w-8 text-white/80" />
                <p className="text-sm font-medium">Years of gap after MBBS due to unfair delay</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/10 p-5">
                <HeartHandshake className="h-8 w-8 text-white/80" />
                <p className="text-sm font-medium">Family responsibilities & financial burden</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/10 p-5">
                <Brain className="h-8 w-8 text-white/80" />
                <p className="text-sm font-medium">Emotional stress & social pressure</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/10 p-5">
                <GraduationCap className="h-8 w-8 text-white/80" />
                <p className="text-sm font-medium">We only want a fair chance to serve India</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-mist">
        <div className="container-x">
          <SectionHead 
            eyebrow="The Reality" 
            title="Transparency in NEET & UPSC vs FMGE" 
            align="center"
          />
          <Reveal delay={0.15}>
            <div className="mt-14 overflow-x-auto rounded-3xl border border-ink/[0.07] bg-white shadow-sm">
              <table className="w-full min-w-[900px] text-left">
                <thead>
                  <tr className="border-b border-ink/[0.07] bg-mist/60">
                    <th className="px-6 py-5 text-[12px] tracking-[0.15em] text-ink uppercase">Parameter</th>
                    <th className="px-6 py-5 text-[12px] tracking-[0.15em] text-ink uppercase">NEET (UG & PG)</th>
                    <th className="px-6 py-5 text-[12px] tracking-[0.15em] text-ink uppercase">UPSC (CSE)</th>
                    <th className="px-6 py-5 text-[12px] tracking-[0.15em] text-red-600 uppercase bg-red-50">FMGE</th>
                  </tr>
                </thead>
                <tbody>
                  {transparencyData.map((row) => (
                    <tr key={row.metric} className="border-b border-ink/[0.05] last:border-0 hover:bg-mist/40 transition-colors">
                      <td className="px-6 py-5 font-display text-[15px] font-bold text-ink whitespace-nowrap">
                        {row.metric}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-start gap-3">
                          {row.neet.available ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" /> : <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />}
                          <span className="text-[13.5px] font-medium text-ink">{row.neet.desc}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-start gap-3">
                          {row.upsc.available ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" /> : <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />}
                          <span className="text-[13.5px] font-medium text-ink">{row.upsc.desc}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 bg-red-50/50">
                        <div className="flex items-start gap-3">
                          {row.fmge.available ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" /> : <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />}
                          <span className="text-[13.5px] font-bold text-red-600">{row.fmge.desc}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <Reveal delay={0.2}>
              <div className="rounded-3xl border border-ink/[0.07] bg-white p-8 shadow-sm h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-mist text-ink">
                    <IndianRupee className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-medium text-ink">Exam Fee Comparison</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-ink/5 pb-4">
                    <span className="font-medium text-ink/80">UPSC CSE (Prelims)</span>
                    <span className="font-bold text-success">₹ 100 / ₹ 0</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-ink/5 pb-4">
                    <span className="font-medium text-ink/80">NEET UG</span>
                    <span className="font-bold text-ink">₹ 1,000 - ₹ 1,700</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-ink/5 pb-4">
                    <span className="font-medium text-ink/80">NEET PG</span>
                    <span className="font-bold text-ink">₹ 3,500</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold text-red-600">FMGE</span>
                    <span className="font-black text-2xl text-red-600">₹ 7,080</span>
                  </div>
                  <p className="text-[11px] font-medium text-red-600/80 text-right uppercase tracking-wider">(₹ 6,000 + GST @ 18%)</p>
                </div>
                <div className="mt-8 rounded-2xl bg-red-50 p-5 border border-red-100">
                  <p className="text-sm font-bold text-red-700 text-center">FMGE examination fee is significantly higher than many other national examinations.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="rounded-3xl border border-ink/[0.07] bg-white p-8 shadow-sm flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-mist text-ink">
                      <Scale className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-xl font-medium text-ink">The Inequality</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-ink/10 p-5 flex gap-5 items-center bg-mist/50">
                      <div className="h-14 w-14 shrink-0 rounded-full bg-success/20 flex items-center justify-center text-success">
                        <span className="font-bold text-lg">125</span>
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-ink">125 Marks in NEET</p>
                        <p className="text-[13.5px] font-medium text-ink/70 mt-1 leading-relaxed">Will get MBBS seat in India at the cost of <span className="font-bold text-ink bg-white px-2 py-0.5 rounded shadow-sm mx-1">₹ 1 Crore</span> and more.</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center -my-2 relative z-10">
                      <span className="bg-ink text-white text-[11px] font-black px-4 py-1.5 rounded-full tracking-widest shadow-md">VS</span>
                    </div>
                    
                    <div className="rounded-2xl border border-red-200 p-5 flex gap-5 items-center bg-red-50/50">
                      <div className="h-14 w-14 shrink-0 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <span className="font-bold text-lg">500+</span>
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-red-700">500+ Marks in NEET</p>
                        <p className="text-[13.5px] font-medium text-red-700/80 mt-1 leading-relaxed">Students are not getting MBBS seat in India because they are not born with a golden spoon.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-ink/5">
                  <h4 className="font-display text-lg font-bold text-center text-brand">Is this the Right to Education?</h4>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container-x">
          <div className="rounded-[40px] bg-brand text-white p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 opacity-5 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
              <Scale className="w-96 h-96" />
            </div>
            
            <h2 className="font-display text-3xl md:text-5xl font-black mb-4 tracking-tight">IMPLEMENT NExT</h2>
            <p className="text-lg md:text-2xl font-bold mb-12 text-white/90 tracking-wide">FOR ALL MEDICAL GRADUATES</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14 relative z-10">
              <div className="flex flex-col items-center gap-4 group">
                <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-white/20">
                  <Users className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <span className="block font-bold tracking-wider text-[13px] uppercase mb-1">Equal Opportunity</span>
                  <span className="block text-[12px] font-medium text-white/70">For every graduate</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 group">
                <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-white/20">
                  <Scale className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <span className="block font-bold tracking-wider text-[13px] uppercase mb-1">Equal Standards</span>
                  <span className="block text-[12px] font-medium text-white/70">Same rules & system</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 group">
                <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-white/20">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <span className="block font-bold tracking-wider text-[13px] uppercase mb-1">One Licensing Exam</span>
                  <span className="block text-[12px] font-medium text-white/70">NExT for all</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 group">
                <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-white/20">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <span className="block font-bold tracking-wider text-[13px] uppercase mb-1">One System</span>
                  <span className="block text-[12px] font-medium text-white/70">One country, one system</span>
                </div>
              </div>
            </div>

            <div className="inline-block bg-white text-brand font-black px-8 py-4 rounded-full text-[15px] md:text-[17px] shadow-xl mb-8 tracking-widest relative z-10">
              DELAYED JUSTICE IS DENIED JUSTICE
            </div>
            
            <p className="font-display text-lg md:text-xl font-medium mt-2 text-white/90 relative z-10">
              We are FMGs, not foreigners. We seek justice.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-mist/50">
        <div className="container-x">
          <SectionHead 
            eyebrow="Campaign Posters" 
            title="Voices for NExT Implementation" 
            align="center"
          />
          <div className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              "/next/WhatsApp Image 2026-08-08 at 4.42.48 PM (1).jpeg",
              "/next/WhatsApp Image 2026-08-08 at 4.42.48 PM.jpeg",
              "/next/WhatsApp Image 2026-08-08 at 4.42.49 PM (1).jpeg",
              "/next/WhatsApp Image 2026-08-08 at 4.42.49 PM.jpeg",
              "/next/WhatsApp Image 2026-08-08 at 4.42.50 PM (1).jpeg",
              "/next/WhatsApp Image 2026-08-08 at 4.42.50 PM.jpeg",
              "/next/WhatsApp Image 2026-08-08 at 4.42.51 PM.jpeg",
            ].map((src, idx) => (
              <Reveal key={idx} delay={(idx % 3) * 0.1}>
                <div 
                  className="break-inside-avoid rounded-3xl overflow-hidden border border-ink/[0.05] shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => setSelectedImage(src)}
                >
                  <img src={src} alt={`NExT Campaign Poster ${idx + 1}`} loading="lazy" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/70 hover:text-white transition-colors p-2"
            onClick={() => setSelectedImage(null)}
            aria-label="Close fullscreen image"
          >
            <X className="w-10 h-10" />
          </button>
          <img 
            src={selectedImage} 
            alt="Fullscreen view" 
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

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
