"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Award,
  ClipboardList,
  Compass,
  FileText,
  Globe2,
  Heart,
  History,
  Home as HomeIcon,
  MousePointer2,
  Plane,
  Quote,
  ShieldCheck,
  Stethoscope,
  Target,
  Users,
} from "lucide-react";
import { useRef, type ReactNode } from "react";
import { Btn, Counter, Marquee, MaskImage, Reveal, Section, SectionHead, Stagger, StaggerItem } from "@/components/ui";
import { BUSINESS, HERO_CARDS, MEDIA, PROCESS, STATS, TIMELINE, TRUST_MARQUEE, WHY_US } from "@/data/content";

const heroIcons: Record<string, ReactNode> = {
  stethoscope: <Stethoscope className="h-4 w-4" />,
  globe: <Globe2 className="h-4 w-4" />,
  award: <Award className="h-4 w-4" />,
  target: <Target className="h-4 w-4" />,
  plane: <Plane className="h-4 w-4" />,
};

const whyIcons: Record<string, ReactNode> = {
  history: <History className="h-5 w-5" />,
  users: <Users className="h-5 w-5" />,
  award: <Award className="h-5 w-5" />,
  clipboard: <ClipboardList className="h-5 w-5" />,
  file: <FileText className="h-5 w-5" />,
  plane: <Plane className="h-5 w-5" />,
  home: <HomeIcon className="h-5 w-5" />,
  compass: <Compass className="h-5 w-5" />,
  heart: <Heart className="h-5 w-5" />,
  shield: <ShieldCheck className="h-5 w-5" />,
};

/* ================================================================== */
/*  HERO                                                               */
/* ================================================================== */

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink">
      {/* video */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={MEDIA.heroPoster}
        >
          <source src={MEDIA.heroVideo} type="video/mp4" />
        </video>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/70" />
      <div className="grid-lines-dark absolute inset-0 opacity-40" />
      <div className="noise pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay" />

      <motion.div style={{ opacity: fade }} className="relative pt-32 pb-0">
        <div className="container-x grid items-end gap-12 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}>
              <span className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[11px] font-medium tracking-[0.22em] text-white uppercase backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                Trusted Medical Admissions · Since {BUSINESS.since}
              </span>
            </motion.div>

            <h1 className="font-display mt-8 text-[clamp(2.6rem,6.6vw,5.4rem)] leading-[0.98] font-extralight tracking-[-0.04em] text-white">
              {["Your Dream", "Medical Career", "Starts Here"].map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.1, delay: 0.25 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {i === 1 ? (
                      <span className="font-semibold text-white">
                        Medical <span className="text-brand italic">Career</span>
                      </span>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.75 }}
              className="mt-8 max-w-xl text-[15px] leading-relaxed font-semibold text-white md:text-[17px]"
            >
              Trusted MBBS admission consultancy since 2003 — helping students secure admission in India’s and abroad’s
              best medical universities, with complete support from counselling to licensing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Btn to="/apply" size="lg">
                Apply Now
              </Btn>
              <Btn to="/contact" size="lg" variant="light">
                Free Counselling
              </Btn>
            </motion.div>
          </div>

          {/* floating cards */}
          <div className="lg:col-span-5">
            <div className="hide-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-2 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-3 lg:overflow-visible lg:px-0">
              {HERO_CARDS.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.9, delay: 1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={i === 4 ? "lg:col-span-2" : ""}
                >
                  <div
                    className="group min-w-[178px] rounded-2xl border border-white/12 bg-white/[0.055] p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/50 hover:bg-white/[0.09]"
                    style={{ animation: `float ${6 + i}s ease-in-out ${i * 0.4}s infinite` }}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/15 text-brand transition group-hover:bg-brand group-hover:text-white">
                      {heroIcons[c.icon]}
                    </span>
                    <p className="font-display mt-4 text-[15px] font-medium text-white">{c.title}</p>
                    <p className="mt-1 text-[12px] font-semibold text-white">{c.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* stats strip */}
        <div className="relative border-t border-white/10 bg-ink/40 backdrop-blur-md">
          <div className="container-x grid grid-cols-2 divide-white/10 md:grid-cols-4 md:divide-x">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 + i * 0.1 }}
                className="px-2 py-7 md:px-8"
              >
                <p className="font-display text-[clamp(1.9rem,3.2vw,2.7rem)] leading-none font-semibold text-white">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-[12px] tracking-[0.16em] text-white uppercase">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-[10.5rem] left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white lg:flex"
      >
        <MousePointer2 className="h-4 w-4 animate-bounce" />
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}

/* ================================================================== */
/*  TRUST                                                              */
/* ================================================================== */

export function TrustBar() {
  return (
    <section className="border-b border-ink/[0.06] bg-white py-10">
      <div className="container-x">
        <p className="mb-7 text-center text-[11px] tracking-[0.28em] text-ink uppercase">
          Recognitions · Medical Universities · Parents’ Trust
        </p>
      </div>
      <Marquee items={TRUST_MARQUEE} />
    </section>
  );
}

/* ================================================================== */
/*  ABOUT + TIMELINE                                                   */
/* ================================================================== */

export function AboutSplit() {
  return (
    <Section id="about" className="bg-white">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="relative lg:col-span-6">
          <MaskImage
            src={MEDIA.counselling}
            alt="Counselling session at Dronacharya Admission Consultancy"
            className="aspect-[4/5] w-full rounded-[28px]"
            parallax={5}
          />
          {/* <div className="absolute -right-4 -bottom-10 hidden w-56 md:block lg:-right-12">
            <MaskImage
              src={MEDIA.labStudent}
              alt="Medical student in laboratory"
              className="aspect-[4/5] w-full rounded-[22px] border-8 border-white shadow-[0_30px_70px_-30px_rgba(17,24,39,0.4)]"
              delay={0.25}
            />
          </div> */}
          <Reveal delay={0.4}>
            <div className="absolute -top-6 -left-4 rounded-2xl border border-ink/[0.07] bg-white/90 px-6 py-5 shadow-[0_24px_60px_-30px_rgba(17,24,39,0.45)] backdrop-blur lg:-left-10">
              <p className="font-display text-[2.2rem] leading-none font-semibold text-brand">
                <Counter to={23} suffix="+" />
              </p>
              <p className="mt-1.5 text-[11px] tracking-[0.18em] text-ink uppercase">Years of Legacy</p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <SectionHead
            eyebrow="About Dronacharya"
            title="Guiding medical aspirants for over two decades."
            sub="Since 2003, Dronacharya MBBS Consultancy has been one of Rajasthan’s oldest and most trusted overseas education consultancies. We provide complete support — from admission and scholarships to travel, accommodation and licensing guidance."
          />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed font-semibold text-ink">
              Our mission is to make quality medical education accessible, affordable and stress-free for every student
              aspiring to build a successful medical career — in India or anywhere in the world.
            </p>
          </Reveal>

          <Stagger className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2" delay={0.15}>
            {[
              "NMC & WHO recognised universities only",
              "Written, transparent fee structures",
              "In-house documentation & visa desk",
              "On-ground support after admission",
            ].map((t) => (
              <StaggerItem key={t}>
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span className="text-[14.5px] font-semibold text-ink">{t}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.3}>
            <div className="mt-11 flex flex-wrap items-center gap-4">
              <Btn to="/about" variant="dark">
                Our Story
              </Btn>
              <Btn href={BUSINESS.phoneHref} variant="outline" icon={<Quote className="h-4 w-4" />}>
                Talk to a Counsellor
              </Btn>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section className="bg-mist">
      <div className="container-x">
        <SectionHead eyebrow="Our Journey" title="A legacy written one admission at a time." align="center" />

        <div ref={ref} className="relative mx-auto mt-20 max-w-4xl">
          <div className="absolute top-0 bottom-0 left-[19px] w-px bg-ink/10 md:left-1/2" />
          <motion.div style={{ height }} className="absolute top-0 left-[19px] w-px bg-brand md:left-1/2" />

          {TIMELINE.map((t, i) => (
            <div
              key={t.year}
              className={`relative mb-14 flex gap-8 pl-14 md:mb-20 md:pl-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
            >
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-2 left-[13px] h-3 w-3 rounded-full border-2 border-brand bg-white md:left-1/2 md:-ml-[6px]"
              />
              <div className={`md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                <Reveal y={22}>
                  <span className="font-display text-[13px] tracking-[0.22em] text-brand uppercase">{t.year}</span>
                  <h3 className="font-display mt-2 text-[22px] leading-tight font-semibold text-ink md:text-[26px]">{t.title}</h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed font-semibold text-ink">{t.text}</p>
                </Reveal>
              </div>
              <div className="hidden md:block md:w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ================================================================== */
/*  WHY CHOOSE US                                                      */
/* ================================================================== */

export function WhyChooseUs() {
  return (
    <Section className="bg-white">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead
            eyebrow="Why Choose Us"
            title="Ten reasons families have trusted us for 23 years."
            highlight="trusted"
          />
          <Reveal delay={0.15}>
            <Btn to="/services" variant="outline">
              Explore Services
            </Btn>
          </Reveal>
        </div>

        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-ink/[0.07] bg-ink/[0.07] sm:grid-cols-2 lg:grid-cols-5">
          {WHY_US.map((w) => (
            <StaggerItem key={w.title} className="h-full">
              <div className="group relative h-full overflow-hidden bg-white p-7 transition-colors duration-500 hover:bg-mist">
                <div className="absolute inset-x-0 -top-px h-px scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mist text-accent transition-all duration-500 group-hover:bg-brand group-hover:text-white">
                  {whyIcons[w.icon]}
                </span>
                <h3 className="font-display mt-6 text-[16px] leading-snug font-medium text-ink">{w.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed font-semibold text-ink">{w.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}

/* ================================================================== */
/*  ADMISSION PROCESS                                                  */
/* ================================================================== */

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 70%"] });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section dark className="overflow-hidden">
      <div className="grid-lines-dark absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute top-1/3 -left-32 h-[400px] w-[400px] rounded-full bg-accent/20 blur-[150px]" />
      <div className="container-x relative">
        <SectionHead
          dark
          eyebrow="Admission Process"
          title="Seven guided steps from first question to first lecture."
          align="center"
        />

        <div ref={ref} className="">
          <div className="relative mb-10 hidden h-px w-full bg-white/12 lg:block">
            <motion.div style={{ width }} className="absolute inset-y-0 left-0 bg-brand" />
          </div>

          <div className="hide-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 lg:mx-0 lg:grid lg:grid-cols-7 lg:gap-4 lg:overflow-visible lg:px-0">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group w-[240px] shrink-0 snap-start lg:w-auto"
              >
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-brand/40 hover:bg-white/[0.07]">
                  <span className="font-display text-[12px] tracking-[0.2em] text-brand">{p.step}</span>
                  <h3 className="font-display mt-4 text-[15.5px] leading-snug font-medium text-white">{p.title}</h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed font-semibold text-white">{p.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
            <Btn to="/apply">Start My Application</Btn>
            <Btn href={BUSINESS.whatsapp} variant="light">
              WhatsApp a Counsellor
            </Btn>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function AchievementBand() {
  return (
    <section className="relative overflow-hidden bg-mist py-16">
      <div className="container-x">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="px-2 text-center md:px-6">
                <p className="font-display text-[clamp(2.2rem,4.5vw,3.4rem)] leading-none font-extralight text-ink">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-[12px] tracking-[0.18em] text-ink uppercase">{s.label}</p>
                <p className="mt-1 text-[12px] font-semibold text-brand">{s.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
