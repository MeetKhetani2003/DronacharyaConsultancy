"use client";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { Logo, Marquee, Rule } from "@/components/ui";
import { useRouter } from "next/navigation";
import { SERVICES } from "@/data/content";
import { useBusiness } from "@/app/ClientLayout";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "MBBS in India", href: "/mbbs-india" },
  { label: "MBBS Abroad", href: "/mbbs-abroad" },
  { label: "Universities", href: "/universities" },
  { label: "Scholarships", href: "/scholarships" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Gallery", href: "/gallery" },
  { label: "Latest News", href: "/news" },
  { label: "FAQ", href: "/faq" },
];

const footerCountries = [
  { name: "India", flag: "🇮🇳" },
  { name: "Georgia", flag: "🇬🇪" },
  { name: "Kazakhstan", flag: "🇰🇿" },
  { name: "Bangladesh", flag: "🇧🇩" },
  { name: "Philippines", flag: "🇵🇭" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "Mauritius", flag: "🇲🇺" },
  { name: "Kyrgyzstan", flag: "🇰🇬" },
  { name: "Uzbekistan", flag: "🇺🇿" },
  { name: "Armenia", flag: "🇦🇲" },
  { name: "Nepal", flag: "🇳🇵" },
  { name: "Egypt", flag: "🇪🇬" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "France", flag: "🇫🇷" },
  { name: "Poland", flag: "🇵🇱" },
  { name: "China", flag: "🇨🇳" },
  { name: "Tajikistan", flag: "🇹🇯" },
  { name: "Malaysia", flag: "🇲🇾" },
  { name: "Ukraine", flag: "🇺🇦" },
];

const socials: { label: string; path: string }[] = [
  {
    label: "Facebook",
    path: "M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z",
  },
  {
    label: "Instagram",
    path: "M12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8zM7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3zm9.8 3.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM12 6.9a5.1 5.1 0 1 1 0 10.2 5.1 5.1 0 0 1 0-10.2z",
  },
  {
    label: "YouTube",
    path: "M21.6 7.6a2.5 2.5 0 0 0-1.8-1.8C18.2 5.4 12 5.4 12 5.4s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.6C2 9.2 2 12 2 12s0 2.8.4 4.4a2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.4.4-4.4s0-2.8-.4-4.4zM10 15V9l5.2 3L10 15z",
  },
  {
    label: "LinkedIn",
    path: "M6.9 8.2H3.6V21h3.3V8.2zM5.2 3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8zM20.4 13.6c0-3.4-1.8-5-4.3-5-1.9 0-2.8 1.1-3.3 1.8V8.2H9.5V21h3.3v-7c0-1.5.9-2.3 2-2.3s1.9.7 1.9 2.3v7h3.7v-7.4z",
  },
];

export default function Footer() {
  const BUSINESS = useBusiness();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="grid-lines-dark absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-brand/15 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-accent/20 blur-[150px]" />

      <div className="relative">
        <div className="border-b border-white/10 py-6">
          <Marquee dark slow items={["MBBS in India", "MBBS Abroad", "NEET Guidance", "Scholarships", "Visa Assistance", "Education Loan", "Hostel Support", "Career Counselling"]} />
        </div>

        <div className="container-x grid gap-14 py-20 lg:grid-cols-12">
          {/* brand + newsletter */}
          <div className="lg:col-span-4">
            <Logo dark />
            <p className="mt-7 max-w-sm text-[14.5px] leading-relaxed font-semibold text-white">
              Since 2003, one of Rajasthan’s oldest and most trusted overseas education consultancies — guiding medical
              aspirants from the first counselling session to the day they wear the white coat.
            </p>

            <div className="mt-9">
              <p className="text-[11px] tracking-[0.24em] text-white uppercase">Admission Newsletter</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSent(true);
                }}
                className="group mt-4 flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] p-1.5 pl-5 backdrop-blur transition focus-within:border-brand/60"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-transparent text-[13.5px] font-semibold text-white placeholder:text-white focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white transition hover:bg-brand-600"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
              {sent && (
                <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 text-[12.5px] text-success">
                  Thank you — NEET & counselling updates are on their way.
                </motion.p>
              )}
            </div>

            <div className="mt-9 flex gap-3">
              {socials.map(({ path, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white transition-all duration-400 hover:-translate-y-1 hover:border-brand hover:bg-brand hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* links */}
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-5">
            <FooterCol title="Quick Links">
              {quickLinks.slice(0, 6).map((l) => (
                <FooterLink key={l.href} label={l.label} onClick={() => router.push(l.href)} />
              ))}
            </FooterCol>
            <FooterCol title="Services">
              {SERVICES.slice(0, 6).map((s) => (
                <FooterLink key={s.title} label={s.title} onClick={() => router.push("/services")} />
              ))}
            </FooterCol>
            <FooterCol title="Countries">
              {footerCountries.map((c) => (
                <FooterLink key={c.name} label={`${c.flag}  ${c.name}`} onClick={() => router.push("/countries")} />
              ))}
            </FooterCol>
          </div>

          {/* contact + map */}
          <div className="lg:col-span-3">
            <p className="text-[11px] tracking-[0.24em] text-white uppercase">Head Office</p>
            <ul className="mt-6 space-y-5 text-[13.5px] font-semibold text-white">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>
                  {BUSINESS.addressLine1}
                  <br />
                  {BUSINESS.addressLine2}
                  <br />
                  {BUSINESS.addressLine3}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <a href={BUSINESS.phoneHref} className="transition hover:text-white">
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <a href={`mailto:${BUSINESS.email}`} className="transition hover:text-white">
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>
                  {BUSINESS.hours[0].day}
                  <br />
                  {BUSINESS.hours[0].time}
                </span>
              </li>
            </ul>

            <div className="mt-7 overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="Dronacharya Admission Consultancy location"
                src={BUSINESS.mapEmbed}
                loading="lazy"
                className="h-40 w-full grayscale-[0.5] contrast-[1.1]"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <Rule dark />
        <div className="container-x flex flex-col items-center justify-between gap-4 py-7 text-[12.5px] font-semibold text-white md:flex-row">
          <p>
            © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-6">
            <span className="cursor-pointer transition hover:text-white">Privacy Policy</span>
            <span className="cursor-pointer transition hover:text-white">Terms of Service</span>
            <span className="cursor-pointer transition hover:text-white">Disclaimer</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] tracking-[0.24em] text-white uppercase">{title}</p>
      <ul className="mt-6 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <li>
      <button
        onClick={onClick}
        className="group flex items-center gap-2 text-[13.5px] font-semibold text-white transition-colors hover:text-white"
      >
        <span className="h-px w-0 bg-brand transition-all duration-400 group-hover:w-3" />
        {label}
      </button>
    </li>
  );
}
