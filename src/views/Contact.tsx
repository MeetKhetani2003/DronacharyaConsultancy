"use client";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";
import PageHero from "@/components/PageHero";
import { Btn, Reveal, Section, SectionHead } from "@/components/ui";
import { MEDIA } from "@/data/content";
import { useBusiness } from "@/app/ClientLayout";
import { cn } from "@/utils/cn";

const interests = ["MBBS in India", "MBBS Abroad", "NEET Counselling", "Scholarship", "Education Loan", "Other"];

export default function ContactPage() {
  const BUSINESS = useBusiness();
  const [sent, setSent] = useState(false);
  const [interest, setInterest] = useState(interests[0]);

  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Bhilwara, Rajasthan"
        title="Let’s plan your admission, in person or online."
        highlight="admission"
        sub="Walk into our office with your NEET scorecard, or start with a call. The first counselling session is always free."
        image={MEDIA.counselling4}
      />

      <Section className="bg-white">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* details */}
          <div className="lg:col-span-5">
            <SectionHead eyebrow="Get in Touch" title="Our admission desk is open six days a week." />

            <div className="mt-11 space-y-4">
              {[
                {
                  Icon: MapPin,
                  label: "Head Office",
                  value: `${BUSINESS.addressLine1}, ${BUSINESS.addressLine2}, ${BUSINESS.addressLine3}`,
                },
                { Icon: Phone, label: "Phone", value: BUSINESS.phone, href: BUSINESS.phoneHref },
                { Icon: MessageCircle, label: "WhatsApp", value: BUSINESS.phone, href: BUSINESS.whatsapp },
                { Icon: Mail, label: "Email", value: BUSINESS.email, href: `mailto:${BUSINESS.email}` },
              ].map(({ Icon, label, value, href }, i) => (
                <Reveal key={label} delay={i * 0.07}>
                  <a
                    href={href ?? "#"}
                    target={href?.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-start gap-5 rounded-2xl border border-ink/[0.07] bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_26px_60px_-34px_rgba(17,24,39,0.45)]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist text-accent transition-all duration-500 group-hover:bg-brand group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[11px] tracking-[0.18em] text-ink uppercase">{label}</span>
                      <span className="mt-1.5 block text-[14.5px] leading-relaxed font-semibold text-ink">{value}</span>
                    </span>
                  </a>
                </Reveal>
              ))}

              <Reveal delay={0.3}>
                <div className="rounded-2xl border border-ink/[0.07] bg-mist p-6">
                  <span className="flex items-center gap-3 text-[11px] tracking-[0.18em] text-ink uppercase">
                    <Clock className="h-4 w-4 text-brand" /> Office Hours
                  </span>
                  <div className="mt-4 space-y-2">
                    {BUSINESS.hours.map((h) => (
                      <div key={h.day} className="flex items-center justify-between text-[13.5px] font-semibold text-ink">
                        <span>{h.day}</span>
                        <span className="text-ink">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-[32px] border border-ink/[0.07] bg-mist p-8 md:p-11">
                <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative flex min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <CheckCircle2 className="h-14 w-14 text-success" />
                    <h3 className="font-display mt-7 text-[26px] font-semibold text-ink">Enquiry received.</h3>
                    <p className="mt-3 max-w-sm text-[14.5px] leading-relaxed font-semibold text-ink">
                      A senior counsellor will contact you within one working day. For urgent admission queries, call{" "}
                      {BUSINESS.phone}.
                    </p>
                    <div className="mt-8">
                      <Btn onClick={() => setSent(false)} variant="outline" size="sm">
                        Send Another Enquiry
                      </Btn>
                    </div>
                  </motion.div>
                ) : (
                  <form
                    className="relative space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const name = formData.get('name');
                      const phone = formData.get('phone');
                      const email = formData.get('email');
                      const message = formData.get('message');
                      const text = \`New Enquiry from \${name}\\nPhone: \${phone}\\nEmail: \${email}\\nInterest: \${interest}\\nMessage: \${message}\`;
                      const whatsappUrl = \`https://wa.me/\${BUSINESS.phone.replace(/\\D/g, '')}?text=\${encodeURIComponent(text)}\`;
                      window.open(whatsappUrl, '_blank');
                      setSent(true);
                    }}
                  >
                    <p className="font-display text-[22px] font-semibold text-ink">Book your free counselling</p>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field name="name" label="Student Name" placeholder="Full name" required />
                      <Field name="phone" label="Phone Number" placeholder="+91 00000 00000" type="tel" required />
                      <Field name="email" label="Email Address" placeholder="you@email.com" type="email" required />
                      <Field name="city" label="City" placeholder="Bhilwara" />
                    </div>

                    <div>
                      <span className="text-[11px] tracking-[0.18em] text-ink uppercase">I’m interested in</span>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {interests.map((x) => (
                          <button
                            key={x}
                            type="button"
                            onClick={() => setInterest(x)}
                            className={cn(
                              "rounded-full border px-4 py-2 text-[12.5px] transition-all duration-300",
                              interest === x
                                ? "border-brand bg-brand text-white"
                                : "border-ink/12 bg-white text-ink hover:border-ink/30",
                            )}
                          >
                            {x}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] tracking-[0.18em] text-ink uppercase">Message</span>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="NEET score, preferred country, budget…"
                        className="mt-2.5 w-full resize-none rounded-2xl border border-ink/10 bg-white px-5 py-4 text-[14px] font-semibold text-ink placeholder:text-ink transition focus:border-brand focus:ring-2 focus:ring-brand/15 focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <Btn type="submit" size="lg" icon={<Send className="h-4 w-4" />}>
                        Send Enquiry
                      </Btn>
                      <span className="text-[12.5px] font-semibold text-ink">
                        We reply within one working day · No spam, ever.
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <section className="relative">
        <div className="h-[460px] w-full overflow-hidden border-y border-ink/[0.07]">
          <iframe
            title="Dronacharya Admission Consultancy — Google Map"
            src={BUSINESS.mapEmbed}
            loading="lazy"
            className="h-full w-full grayscale-[0.35] transition-all duration-700 hover:grayscale-0"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.18em] text-ink uppercase">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2.5 w-full rounded-2xl border border-ink/10 bg-white px-5 py-3.5 text-[14px] font-semibold text-ink placeholder:text-ink transition focus:border-brand focus:ring-2 focus:ring-brand/15 focus:outline-none"
      />
    </label>
  );
}
