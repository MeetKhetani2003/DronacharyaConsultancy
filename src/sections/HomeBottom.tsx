"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef, type ReactNode } from "react";
import { getTestimonials, getUniversities, getFaqs, getEvents } from '@/app/admin/dashboard/actions';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Building2,
  Clock3,
  Compass,
  FileText,
  Globe2,
  GraduationCap,
  Landmark,
  Luggage,
  Map,
  MessageCircle,
  Minus,
  Phone,
  Plane,
  Play,
  Plus,
  Quote,
  School,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Video,
  Wallet,
} from "lucide-react";
import {
  Btn,
  Lightbox,
  MaskImage,
  Reveal,
  Rule,
  Section,
  SectionHead,
  Stagger,
  StaggerItem,
  Stars,
} from "@/components/ui";
import { COUNTRIES, FAQS, INDIA_TRACKS, MEDIA, NEWS, NEWSPAPERS, SCHOLARSHIPS, SERVICES, SUCCESS_STORIES, UNIVERSITIES } from "@/data/content";
import { useBusiness } from "@/app/ClientLayout";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";

const svcIcons: Record<string, ReactNode> = {
  users: <Users className="h-5 w-5" />,
  school: <School className="h-5 w-5" />,
  file: <FileText className="h-5 w-5" />,
  award: <Award className="h-5 w-5" />,
  wallet: <Wallet className="h-5 w-5" />,
  plane: <Plane className="h-5 w-5" />,
  home: <Building2 className="h-5 w-5" />,
  luggage: <Luggage className="h-5 w-5" />,
  compass: <Compass className="h-5 w-5" />,
  shield: <ShieldCheck className="h-5 w-5" />,
  landmark: <Landmark className="h-5 w-5" />,
  building: <Building2 className="h-5 w-5" />,
  globe: <Globe2 className="h-5 w-5" />,
  map: <Map className="h-5 w-5" />,
  target: <Target className="h-5 w-5" />,
};

/* ================================================================== */
/*  COUNTRIES                                                          */
/* ================================================================== */

export function Countries({ full = false }: { full?: boolean }) {
  const BUSINESS = useBusiness();
  const router = useRouter();
  const list = full ? COUNTRIES : COUNTRIES.slice(0, 8);
  return (
    <Section id="countries" className="bg-white">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead
            eyebrow="Study Destinations"
            title="Eight countries. One uncompromising standard of recognition."
          // sub="Every destination we recommend is NMC-listed and WHO/WDOMS registered — verified before a single application is filed."
          />
          <Reveal delay={0.12}>
            <Btn to="/countries" variant="outline">
              Compare Countries
            </Btn>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((c) => (
            <StaggerItem key={c.name} className="h-full">
              <article className="group card-lift relative h-full overflow-hidden rounded-3xl border border-ink/[0.07] bg-white">
                <div className="img-zoom relative aspect-[16/9] overflow-hidden bg-mist">
                  <img src={c.image} alt={`MBBS in ${c.name}`} loading="lazy" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent opacity-50" />
                  <span className="absolute top-4 left-4 rounded-full border border-white/30 bg-ink/40 px-3 py-1 text-[11px] font-medium tracking-[0.16em] text-white uppercase backdrop-blur-md">
                    {c.flag} {c.name}
                  </span>
                </div>
                <div className="flex flex-col p-6">
                  <p className="mb-5 text-[13.5px] leading-relaxed font-semibold text-ink">
                    {c.highlight}
                  </p>
                  <div className="space-y-3">
                    {[
                      { k: "Total Fees", v: c.fees },
                      { k: "Duration", v: c.duration },
                      { k: "Eligibility", v: c.eligibility },
                      { k: "Recognition", v: c.recognition },
                      { k: "Medium", v: c.medium },
                    ].map((row) => (
                      <div key={row.k} className="flex items-start justify-between gap-4 border-b border-ink/[0.06] pb-2.5 last:border-0">
                        <span className="text-[11px] font-semibold tracking-[0.14em] text-ink/70 uppercase">{row.k}</span>
                        <span className="text-right text-[12.5px] font-semibold text-ink">{row.v}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => router.push("/apply")}
                    className="group/btn mt-5 flex w-full items-center justify-between rounded-full border border-ink/10 px-5 py-3 text-[12.5px] font-semibold text-ink transition-all duration-400 hover:border-brand hover:bg-brand hover:text-white"
                  >
                    Apply for {c.name}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

/* ================================================================== */
/*  MBBS INDIA                                                         */
/* ================================================================== */

export function IndiaTracks() {
  const BUSINESS = useBusiness();
  const [active, setActive] = useState(0);
  return (
    <Section id="mbbs-india" className="bg-mist">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <SectionHead
            eyebrow="MBBS in India"
            title="Every Indian admission route, decoded."
            sub="Government, private, deemed, All India Quota and state counselling — we have navigated all of them for 23 consecutive admission seasons."
          />
          <Reveal delay={0.2}>
            <div className="relative mt-10 overflow-hidden rounded-3xl">
              <MaskImage src={MEDIA.campusWalk} alt="Indian medical college campus" className="aspect-[16/11] w-full" parallax={4} />
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Btn to="/mbbs-india" variant="dark">
                MBBS India Guide
              </Btn>
              <Btn to="/contact" variant="outline">
                Rank Analysis
              </Btn>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-4 sm:grid-cols-2">
            {INDIA_TRACKS.map((t, i) => (
              <motion.button
                key={t.title}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border p-7 text-left transition-all duration-500",
                  active === i
                    ? "border-brand/30 bg-white shadow-[0_28px_60px_-34px_rgba(17,24,39,0.45)]"
                    : "border-ink/[0.07] bg-white/60 hover:bg-white",
                )}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-full transition-all duration-500",
                      active === i ? "bg-brand text-white" : "bg-mist text-accent",
                    )}
                  >
                    {svcIcons[t.icon]}
                  </span>
                  <span className="text-[11px] tracking-[0.14em] text-ink uppercase">{t.metric}</span>
                </div>
                <h3 className="font-display mt-6 text-[17px] font-medium text-ink">{t.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed font-semibold text-ink">{t.text}</p>
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px bg-brand transition-all duration-500",
                    active === i ? "w-full" : "w-0",
                  )}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================== */
/*  SERVICES                                                           */
/* ================================================================== */

export function Services() {
  const BUSINESS = useBusiness();
  return (
    <Section id="services" className="bg-white">
      <div className="container-x">
        <SectionHead
          eyebrow="What We Do"
          title="A complete admission department, working only for your family."
          align="center"
        />
        <Stagger className="mt-1 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {SERVICES.map((s, i) => (
            <StaggerItem key={s.title} className="h-full">
              <div
                className={cn(
                  "group card-lift relative h-full overflow-hidden rounded-3xl border border-ink/[0.07] p-7",
                  i % 5 === 0 ? "bg-ink text-white" : "bg-white",
                )}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl transition-opacity duration-700",
                    i % 5 === 0 ? "bg-brand/40 opacity-60" : "bg-brand/10 opacity-0 group-hover:opacity-100",
                  )}
                />
                <span
                  className={cn(
                    "relative flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500",
                    i % 5 === 0 ? "bg-white/10 text-white" : "bg-mist text-accent group-hover:bg-brand group-hover:text-white",
                  )}
                >
                  {svcIcons[s.icon]}
                </span>
                <h3 className={cn("font-display relative mt-7 text-[16.5px] font-medium", i % 5 === 0 ? "text-white" : "text-ink")}>
                  {s.title}
                </h3>
                <p className={cn("relative mt-2.5 text-[13.5px] leading-relaxed font-semibold", i % 5 === 0 ? "text-white" : "text-ink")}>
                  {s.text}
                </p>
                <span className="relative mt-6 flex items-center gap-1.5 text-[11px] tracking-[0.16em] text-brand uppercase opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Included <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

/* ================================================================== */
/*  SUCCESS STORIES (masonry + horizontal rail)                        */
/* ================================================================== */

export function SuccessStories() {
  const BUSINESS = useBusiness();
  const [open, setOpen] = useState<number | null>(null);
  const [eventsList, setEventsList] = useState<any[]>([]);

  useEffect(() => {
    getEvents().then((res) => {
      if (res.success && res.data) setEventsList(res.data);
    });
  }, []);

  const list = eventsList.length > 0 ? eventsList : SUCCESS_STORIES;

  return (
    <Section className="bg-mist">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead
            eyebrow="Success Stories"
            title="Seminars, send-offs and the moments in between."
            sub="Two decades of counselling camps, education fairs, pre-departure briefings and felicitation ceremonies across Rajasthan."
          />
          <Reveal delay={0.12}>
            <Btn to="/gallery" variant="outline">
              Full Gallery
            </Btn>
          </Reveal>
        </div>

        <div className="mt-2 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {list.map((s, i) => (
            <Reveal key={s.title + i} delay={(i % 3) * 0.08}>
              <button
                onClick={() => setOpen(i)}
                className={cn(
                  "img-zoom group relative block w-full overflow-hidden rounded-3xl border border-ink/[0.06] text-left aspect-[4/3]"
                )}
              >
                <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                <div className="absolute right-5 bottom-5 left-5 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                  <p className="font-display text-[15px] font-medium text-white">{s.title}</p>
                  <p className="mt-1 text-[11.5px] tracking-[0.14em] text-white uppercase">{s.place}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <Lightbox
        items={list.map((s) => ({ src: s.image, title: s.title, category: s.place }))}
        index={open}
        onClose={() => setOpen(null)}
        onIndex={setOpen}
      />
    </Section>
  );
}

/* ================================================================== */
/*  NEWSPAPER COVERAGE                                                 */
/* ================================================================== */

export function Newspapers() {
  const BUSINESS = useBusiness();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Section className="bg-white">
      <div className="container-x">
        <SectionHead eyebrow="In The Press" title="Twenty-three years, documented in print." align="center" />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {NEWSPAPERS.map((n, i) => (
            <Reveal key={n.title} delay={i * 0.08}>
              <button
                onClick={() => setOpen(i)}
                className="group block h-full w-full [perspective:1400px]"
                aria-label={`Open press clipping: ${n.title}`}
              >
                <div className="relative h-full rounded-2xl border border-ink/[0.08] bg-mist p-3 transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(-9deg)_rotateX(4deg)_translateY(-8px)]">
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={n.image}
                      alt={n.title}
                      loading="lazy"
                      className="aspect-[3/4] w-full object-contain bg-white grayscale transition-all duration-700 group-hover:grayscale-0"
                    />
                  </div>
                  <div className="px-2 py-5">
                    <p className="text-[10.5px] tracking-[0.2em] text-brand uppercase">{n.paper}</p>
                    <p className="font-display mt-2 text-[14.5px] leading-snug font-medium text-ink">{n.title}</p>
                    <p className="mt-2 text-[12px] font-semibold text-ink">{n.date}</p>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <Lightbox
        items={NEWSPAPERS.map((n) => ({ src: n.image, title: n.title, category: `${n.paper} · ${n.date}` }))}
        index={open}
        onClose={() => setOpen(null)}
        onIndex={setOpen}
      />
    </Section>
  );
}

/* ================================================================== */
/*  TESTIMONIALS                                                       */
/* ================================================================== */

export function Testimonials() {
  const BUSINESS = useBusiness();
  const [i, setI] = useState(0);
  const [testimonialsList, setTestimonialsList] = useState<any[]>([]);

  useEffect(() => {
    getTestimonials().then(res => {
      if (res.success && res.data && res.data.length > 0) {
        setTestimonialsList(res.data);
      }
    });
  }, []);

  if (testimonialsList.length === 0) return null;

  const t = testimonialsList[i];
  const go = (d: number) => setI((p) => (p + d + testimonialsList.length) % testimonialsList.length);

  return (
    <Section className="bg-mist">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead eyebrow="Testimonials" title="Students became doctors. Parents became family." />
          <Reveal delay={0.1}>
            <div className="flex items-center gap-5">
              <div className="rounded-2xl border border-ink/[0.07] bg-white px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="font-display text-[22px] font-semibold text-ink">4.9</span>
                  <div>
                    <Stars />
                    <p className="mt-1 text-[11px] tracking-[0.12em] text-ink uppercase">428 Google Reviews</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink transition hover:border-brand hover:bg-brand hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink transition hover:border-brand hover:bg-brand hover:text-white"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid items-center gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={t.name}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col rounded-3xl border border-ink/[0.07] bg-white p-9 md:p-12"
              >
                <div className="flex items-start justify-between gap-6">
                  <Quote className="h-9 w-9 text-brand" />
                  <span className="flex items-center gap-2 rounded-full border border-ink/10 px-3.5 py-1.5 text-[10.5px] tracking-[0.16em] text-ink uppercase">
                    <Play className="h-3 w-3 fill-brand text-brand" /> Video Story
                  </span>
                </div>
                <p className="font-display mt-8 text-[19px] leading-[1.55] font-semibold text-ink md:text-[26px]">
                  “{t.quote}”
                </p>
                <div className="mt-10 flex items-center gap-4">
                  <img src={t.image || MEDIA.gradJoy} alt={t.name} loading="lazy" className="h-14 w-14 rounded-full object-cover" />
                  <div>
                    <p className="font-display text-[15px] font-medium text-ink">{t.name}</p>
                    <p className="text-[12.5px] font-semibold text-ink">{t.role || 'Medical Student'}</p>
                    <p className="text-[11.5px] tracking-[0.12em] text-ink uppercase">{t.city || t.university}</p>
                  </div>
                  <div className="ml-auto hidden md:block">
                    <Stars />
                  </div>
                </div>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-4">
            <div className="hide-scrollbar grid max-h-[400px] grid-cols-3 gap-3 overflow-y-auto lg:max-h-[460px] lg:grid-cols-2">
              {testimonialsList.map((x, idx) => (
                <button
                  key={x.name + idx}
                  onClick={() => setI(idx)}
                  aria-label={`Show testimonial from ${x.name}`}
                  className={cn(
                    "img-zoom group relative overflow-hidden rounded-2xl border transition-all duration-500",
                    idx === i ? "border-brand ring-2 ring-brand/25" : "border-ink/[0.07] opacity-70 hover:opacity-100",
                  )}
                >
                  <img src={x.image || MEDIA.gradJoy} alt={x.name} loading="lazy" className="aspect-square h-full w-full object-cover" />
                  <span className="absolute inset-0 flex items-center justify-center bg-ink/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand">
                      <Play className="h-3.5 w-3.5 fill-current" />
                    </span>
                  </span>
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-2.5 text-left text-[10.5px] font-semibold text-white">
                    {x.name.split(" ").slice(0, 2).join(" ")}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================== */
/*  UNIVERSITIES CAROUSEL                                              */
/* ================================================================== */

export function Universities() {
  const BUSINESS = useBusiness();
  const rail = useRef<HTMLDivElement>(null);
  const scrollBy = (d: number) => rail.current?.scrollBy({ left: d * 420, behavior: "smooth" });
  const [open, setOpen] = useState<number | null>(null);
  const [universitiesList, setUniversitiesList] = useState<any[]>([]);

  useEffect(() => {
    getUniversities().then(res => {
      if (res.success && res.data) setUniversitiesList(res.data);
    });
  }, []);

  if (universitiesList.length === 0) return null;

  return (
    <Section id="universities" className="overflow-hidden bg-white">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead
            eyebrow="Partner Universities"
            title="Campuses we know personally — not from a brochure."
            sub="Rankings, recognition and real fee structures for the medical universities where our students study today."
          />
          <Reveal delay={0.12}>
            <div className="flex gap-2">
              <button
                onClick={() => scrollBy(-1)}
                aria-label="Scroll left"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink transition hover:border-brand hover:bg-brand hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollBy(1)}
                aria-label="Scroll right"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink transition hover:border-brand hover:bg-brand hover:text-white"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <div
        ref={rail}
        style={{ paddingInline: "max(1.5rem, calc((100vw - 1280px) / 2 + 2.5rem))" }}
        className="hide-scrollbar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
      >
        {universitiesList.map((u, i) => (
          <motion.article
            key={u.name}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="group card-lift w-[300px] shrink-0 snap-start overflow-hidden rounded-3xl border border-ink/[0.07] bg-white sm:w-[360px]"
          >
            <button
              onClick={() => setOpen(i)}
              className="img-zoom relative aspect-[16/11] overflow-hidden w-full text-left cursor-pointer"
            >
              <img src={u.image} alt={u.name} loading="lazy" className="h-full w-full object-cover" />
            </button>
            <div className="p-7">

              <h3 className="font-display mt-3 min-h-[52px] text-[18px] leading-snug font-medium text-ink">{u.name}</h3>
              <Rule className="my-5" />
              <div className="flex items-center justify-between text-[12.5px]">
                <span className="font-semibold text-ink">{u.recognition}</span>

              </div>
            </div>
          </motion.article>
        ))}
      </div>
      <Lightbox
        items={universitiesList.map((u) => ({ src: u.image, title: u.name, category: `${u.flag} ${u.country}` }))}
        index={open}
        onClose={() => setOpen(null)}
        onIndex={setOpen}
      />
    </Section>
  );
}

/* ================================================================== */
/*  SCHOLARSHIPS                                                       */
/* ================================================================== */

export function Scholarships() {
  const BUSINESS = useBusiness();
  return (
    <Section id="scholarships" dark className="overflow-hidden">
      <div className="grid-lines-dark absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-brand/15 blur-[160px]" />
      <div className="container-x relative">
        <SectionHead
          dark
          eyebrow="Scholarships"
          title="Merit should never be limited by a fee structure."
          sub="Four active scholarship programmes for Dronacharya students — reviewed by our panel and partner universities every intake."
          align="center"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {SCHOLARSHIPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-8 backdrop-blur-sm transition-all duration-600 hover:-translate-y-1.5 hover:border-brand/40">
                <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-brand/25 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
                <div className="relative flex items-start justify-between gap-6">
                  <div>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-brand">
                      <Sparkles className="h-5 w-5" />
                    </span>
                    <h3 className="font-display mt-6 text-[21px] font-semibold text-white">{s.title}</h3>
                  </div>
                  <span className="rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-[12px] font-medium whitespace-nowrap text-white">
                    {s.amount}
                  </span>
                </div>

                <div className="relative mt-7 space-y-5">
                  {/* @ts-ignore */}
                  {s.description && (
                    <div>
                      <p className="text-[10.5px] tracking-[0.2em] text-white uppercase">Description</p>
                      <p className="mt-1.5 text-[13.5px] font-semibold text-white">{/* @ts-ignore */ s.description}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-[10.5px] tracking-[0.2em] text-white uppercase">Eligibility</p>
                    <p className="mt-1.5 text-[13.5px] font-semibold text-white">{s.eligibility}</p>
                  </div>
                  <div>
                    <p className="text-[10.5px] tracking-[0.2em] text-white uppercase">Benefits</p>
                    <ul className="mt-2 space-y-1.5">
                      {s.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-[13.5px] font-semibold text-white">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* @ts-ignore */}
                  {s.process && (
                    <div>
                      <p className="text-[10.5px] tracking-[0.2em] text-white uppercase">Application Process</p>
                      <p className="mt-1.5 text-[13.5px] font-semibold text-white">{/* @ts-ignore */ s.process}</p>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 text-center">
            <Btn to="/apply" size="lg">
              Check My Scholarship Eligibility
            </Btn>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ================================================================== */
/*  NEWS                                                               */
/* ================================================================== */

export function LatestNews({ limit = 3 }: { limit?: number }) {
  const BUSINESS = useBusiness();
  return (
    <Section id="news" className="bg-white">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead eyebrow="Latest News" title="Admission updates that actually affect your seat." />
          <Reveal delay={0.12}>
            <Btn to="/news" variant="outline">
              All Updates
            </Btn>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {NEWS.slice(0, limit).map((n) => (
            <StaggerItem key={n.title} className="h-full">
              <article className="group card-lift flex h-full flex-col overflow-hidden rounded-3xl border border-ink/[0.07] bg-white">
                <div className="img-zoom relative aspect-[16/10] overflow-hidden">
                  <img src={n.image} alt={n.title} loading="lazy" className="h-full w-full object-cover" />
                  <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[10.5px] font-medium tracking-[0.16em] text-brand uppercase backdrop-blur">
                    {n.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center gap-4 text-[11.5px] text-ink">
                    <span>{n.date}</span>
                    <span className="flex items-center gap-1.5">
                      <Clock3 className="h-3 w-3" /> {n.read}
                    </span>
                  </div>
                  <h3 className="font-display mt-4 text-[18px] leading-snug font-medium text-ink transition-colors duration-300 group-hover:text-brand">
                    {n.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[13.5px] leading-relaxed font-semibold text-ink">{n.excerpt}</p>
                  <span className="mt-6 flex items-center gap-2 text-[12px] tracking-[0.14em] text-ink uppercase transition-colors group-hover:text-brand">
                    Read Article <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

/* ================================================================== */
/*  FAQ                                                                */
/* ================================================================== */

export function Faq({ compact = false }: { compact?: boolean }) {
  const BUSINESS = useBusiness();
  const [open, setOpen] = useState<number | null>(0);
  const [faqList, setFaqList] = useState<any[]>([]);

  useEffect(() => {
    getFaqs().then((res) => {
      if (res.success && res.data) {
        setFaqList(compact ? res.data.slice(0, 6) : res.data);
      }
    });
  }, [compact]);

  const list = faqList.length > 0 ? faqList : (compact ? FAQS.slice(0, 6) : FAQS);

  return (
    <Section id="faq" className="bg-mist">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-4">
          <SectionHead eyebrow="FAQ" title="Questions parents ask us first." />
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-col gap-4">
              <a
                href={BUSINESS.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-5 rounded-[20px] bg-[#22c55e] px-6 py-5 text-white shadow-[0_8px_30px_-12px_rgba(34,197,94,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(34,197,94,0.7)]"
              >
                <MessageCircle className="h-8 w-8 shrink-0 stroke-[1.5]" />
                <div>
                  <p className="font-display text-[17px] font-semibold tracking-wide">Chat on WhatsApp</p>
                  <p className="mt-1 text-[13.5px] font-medium text-white/90">Chat instantly with a counselor</p>
                </div>
              </a>
              <a
                href={BUSINESS.phoneHref}
                className="group flex items-center gap-5 rounded-[20px] bg-[#0ea5e9] px-6 py-5 text-white shadow-[0_8px_30px_-12px_rgba(14,165,233,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(14,165,233,0.7)]"
              >
                <Phone className="h-8 w-8 shrink-0 stroke-[1.5]" />
                <div>
                  <p className="font-display text-[17px] font-semibold tracking-wide">Get Instant Callback</p>
                  <p className="mt-1 text-[13.5px] font-medium text-white/90">We call you at your convenience</p>
                </div>
              </a>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <div className="overflow-hidden rounded-3xl border border-ink/[0.07] bg-white">
            {list.map((f, i) => (
              <div key={f.q} className="border-b border-ink/[0.06] last:border-0">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="group flex w-full items-center justify-between gap-6 px-7 py-6 text-left md:px-9"
                >
                  <span
                    className={cn(
                      "font-display text-[15.5px] leading-snug font-medium transition-colors md:text-[17px]",
                      open === i ? "text-brand" : "text-ink group-hover:text-brand",
                    )}
                  >
                    {f.q}
                  </span>
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-400",
                      open === i ? "rotate-180 border-brand bg-brand text-white" : "border-ink/10 text-ink",
                    )}
                  >
                    {open === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-7 pb-7 text-[14px] leading-relaxed font-semibold text-ink md:px-9 md:pr-20">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ================================================================== */
/*  FINAL CTA                                                          */
/* ================================================================== */

export function FinalCta() {
  const BUSINESS = useBusiness();
  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div className="absolute inset-0 opacity-25">
        <img src={MEDIA.gradToss} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/85 to-ink" />
      <div className="grid-lines-dark absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand/20 blur-[160px]" />

      <div className="container-x relative text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] tracking-[0.22em] text-white uppercase">
            <GraduationCap className="h-3.5 w-3.5 text-brand" /> Admissions Open · Intake {new Date().getFullYear()}
          </span>
        </Reveal>
        <h2 className="font-display mx-auto mt-8 max-w-4xl text-[clamp(2.2rem,5.4vw,4.2rem)] leading-[1.03] font-extralight tracking-[-0.035em] text-white">
          Ready to start your <span className="text-brand italic">medical journey?</span>
        </h2>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-7 max-w-xl text-[15px] leading-relaxed font-semibold text-white md:text-[17px]">
            Book your free counselling today. Bring your NEET scorecard — leave with a written college shortlist,
            a budget plan and a clear timeline.
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
            <Btn to="/apply" size="lg">
              Apply Now
            </Btn>
            <Btn href={BUSINESS.phoneHref} size="lg" variant="light">
              Call {BUSINESS.phone}
            </Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
