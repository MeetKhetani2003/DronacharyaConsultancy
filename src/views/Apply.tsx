"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, FileUp, PartyPopper, X } from "lucide-react";
import { useState } from "react";
import PageHero from "@/components/PageHero";
import { Btn, Reveal, Section } from "@/components/ui";
import { useRouter } from "next/navigation";
import { BUSINESS, COUNTRIES, MEDIA } from "@/data/content";
import { cn } from "@/utils/cn";

const STEPS = [
  "Personal Details",
  "Academic Details",
  "NEET Information",
  "Preferred Country",
  "Budget",
  "Documents",
  "Review",
];

const BUDGETS = [
  { label: "Under ₹15 Lakh", note: "Kazakhstan · Russia" },
  { label: "₹15 – 25 Lakh", note: "Russia · Bangladesh · India (Govt.)" },
  { label: "₹25 – 40 Lakh", note: "Georgia · Philippines · Mauritius" },
  { label: "₹40 Lakh +", note: "India (Deemed/Private) · Germany" },
];

const DOCS = ["Class 10 Marksheet", "Class 12 Marksheet", "NEET Scorecard", "Passport / ID Proof", "Passport Photo"];

type Data = {
  name: string;
  phone: string;
  email: string;
  city: string;
  dob: string;
  gender: string;
  board: string;
  passYear: string;
  pcb: string;
  neetStatus: string;
  neetScore: string;
  neetYear: string;
  countries: string[];
  budget: string;
  docs: { [key: string]: File | null };
  notes: string;
};

const initial: Data = {
  name: "",
  phone: "",
  email: "",
  city: "",
  dob: "",
  gender: "",
  board: "",
  passYear: "",
  pcb: "",
  neetStatus: "",
  neetScore: "",
  neetYear: "",
  countries: [],
  budget: "",
  docs: {},
  notes: "",
};

export default function ApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(initial);
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dir, setDir] = useState(1);

  const set = (k: keyof Data, v: string | string[]) => setData((d) => ({ ...d, [k]: v }));
  const toggle = (k: "countries", v: string) =>
    setData((d) => ({ ...d, [k]: d[k].includes(v) ? d[k].filter((x) => x !== v) : [...d[k], v] }));
  const setDoc = (docType: string, file: File | null) => {
    setData((d) => ({ ...d, docs: { ...d.docs, [docType]: file } }));
  };

  const submitApplication = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('phone', data.phone);
      formData.append('email', data.email);
      formData.append('city', data.city);
      formData.append('dob', data.dob);
      formData.append('gender', data.gender);
      formData.append('board', data.board);
      formData.append('passYear', data.passYear);
      formData.append('pcb', data.pcb);
      formData.append('neetStatus', data.neetStatus);
      formData.append('neetScore', data.neetScore);
      formData.append('neetYear', data.neetYear);
      formData.append('countries', JSON.stringify(data.countries));
      formData.append('budget', data.budget);
      formData.append('notes', data.notes);
      
      Object.keys(data.docs).forEach((docType) => {
        const file = data.docs[docType];
        if (file) {
          formData.append(docType, file);
        }
      });
      
      const res = await fetch('/api/apply', {
        method: 'POST',
        body: formData
      });
      
      if (res.ok) {
        setDone(true);
      } else {
        alert('Failed to submit application. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const go = (d: number) => {
    setDir(d);
    setStep((s) => Math.min(Math.max(s + d, 0), STEPS.length - 1));
    window.scrollTo({ top: 260, behavior: "smooth" });
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <>
      <PageHero
        crumb="Apply Now"
        eyebrow="Admission Application · Intake 2026"
        title="Seven short steps to your medical seat."
        highlight="seven"
        sub="Complete the application and a senior counsellor will call you within one working day with a written shortlist."
        image={MEDIA.gradGroup}
      />

      <Section className="bg-mist">
        <div className="container-x">
          {done ? (
            <Reveal>
              <div className="mx-auto max-w-2xl rounded-[32px] border border-ink/[0.07] bg-white p-10 text-center md:p-16">
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 180, damping: 14 }}
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10 text-success"
                >
                  <PartyPopper className="h-9 w-9" />
                </motion.span>
                <h2 className="font-display mt-8 text-[30px] leading-tight font-semibold text-ink">
                  Application submitted{data.name ? `, ${data.name.split(" ")[0]}` : ""}.
                </h2>
                <p className="mx-auto mt-4 max-w-md text-[14.5px] leading-relaxed font-semibold text-ink">
                  Your file has reached our admission desk. A senior counsellor will call you within one working day.
                  For anything urgent, reach us on {BUSINESS.phone}.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-4">
                  <Btn href={BUSINESS.whatsapp}>Chat on WhatsApp</Btn>
                  <Btn onClick={() => router.push("/")} variant="outline">
                    Back to Home
                  </Btn>
                </div>
              </div>
            </Reveal>
          ) : (
            <div className="mx-auto max-w-4xl">
              {/* progress */}
              <div className="rounded-[28px] border border-ink/[0.07] bg-white p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] tracking-[0.2em] text-ink uppercase">
                    Step {step + 1} of {STEPS.length}
                  </p>
                  <p className="font-display text-[15px] font-medium text-brand">{STEPS[step]}</p>
                </div>
                <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-ink/[0.07]">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-brand"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <div className="mt-5 hidden justify-between gap-1 md:flex">
                  {STEPS.map((s, i) => (
                    <button
                      key={s}
                      onClick={() => {
                        setDir(i > step ? 1 : -1);
                        setStep(i);
                      }}
                      className={cn(
                        "flex-1 text-left text-[10.5px] tracking-[0.12em] uppercase transition-colors",
                        i <= step ? "text-ink" : "text-ink hover:text-ink",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* steps */}
              <div className="mt-6 overflow-hidden rounded-[28px] border border-ink/[0.07] bg-white p-7 md:p-11">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.div
                    key={step}
                    custom={dir}
                    initial={{ opacity: 0, x: dir * 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: dir * -40 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {step === 0 && (
                      <Grid>
                        <Field label="Full Name" value={data.name} onChange={(v) => set("name", v)} placeholder="Student's full name" />
                        <Field label="Phone Number" value={data.phone} onChange={(v) => set("phone", v)} placeholder="+91 00000 00000" />
                        <Field label="Email Address" value={data.email} onChange={(v) => set("email", v)} placeholder="you@email.com" />
                        <Field label="City / District" value={data.city} onChange={(v) => set("city", v)} placeholder="Bhilwara" />
                        <Field label="Date of Birth" value={data.dob} onChange={(v) => set("dob", v)} placeholder="DD / MM / YYYY" />
                        <Chips label="Gender" options={["Male", "Female", "Other"]} value={data.gender} onChange={(v) => set("gender", v)} />
                      </Grid>
                    )}

                    {step === 1 && (
                      <Grid>
                        <Chips
                          label="Board"
                          options={["CBSE", "RBSE", "ICSE", "State Board", "Other"]}
                          value={data.board}
                          onChange={(v) => set("board", v)}
                        />
                        <Field label="Year of Passing (Class 12)" value={data.passYear} onChange={(v) => set("passYear", v)} placeholder="2025" />
                        <Field label="PCB Percentage" value={data.pcb} onChange={(v) => set("pcb", v)} placeholder="e.g. 82%" />
                        <Field label="School / College Name" value={data.notes} onChange={(v) => set("notes", v)} placeholder="Institution name" />
                      </Grid>
                    )}

                    {step === 2 && (
                      <Grid>
                        <Chips
                          label="NEET Status"
                          options={["Qualified", "Appeared – Result Awaited", "Appearing This Year", "Not Appeared"]}
                          value={data.neetStatus}
                          onChange={(v) => set("neetStatus", v)}
                        />
                        <Field label="NEET Score" value={data.neetScore} onChange={(v) => set("neetScore", v)} placeholder="e.g. 468" />
                        <Field label="NEET Attempt Year" value={data.neetYear} onChange={(v) => set("neetYear", v)} placeholder="2026" />
                      </Grid>
                    )}

                    {step === 3 && (
                      <div>
                        <Label>Preferred Destinations (select any)</Label>
                        <div className="mt-4 flex flex-wrap gap-2.5">
                          {[
                            "India", "Georgia", "Kazakhstan", "Bangladesh", 
                            "Philippines", "Germany", "Mauritius", "Kyrgyzstan", 
                            "Uzbekistan", "Armenia", "Nepal", "Egypt", 
                            "Italy", "France", "Poland", "China", 
                            "Tajikistan", "Malaysia", "Ukraine"
                          ].map((c) => {
                            const on = data.countries.includes(c);
                            return (
                              <button
                                key={c}
                                onClick={() => toggle("countries", c)}
                                className={cn(
                                  "rounded-full border px-4 py-2.5 text-[13px] font-medium transition-all duration-300",
                                  on 
                                    ? "border-brand bg-brand text-white shadow-md shadow-brand/20" 
                                    : "border-ink/15 bg-white text-ink hover:border-ink/30 hover:bg-mist/50"
                                )}
                              >
                                {c}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {step === 4 && (
                      <div>
                        <Label>Total Budget for the Course</Label>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          {BUDGETS.map((b) => (
                            <button
                              key={b.label}
                              onClick={() => set("budget", b.label)}
                              className={cn(
                                "rounded-2xl border p-6 text-left transition-all duration-400",
                                data.budget === b.label
                                  ? "border-brand bg-brand/[0.04] shadow-[0_20px_50px_-32px_rgba(193,18,31,0.7)]"
                                  : "border-ink/[0.08] hover:border-ink/25",
                              )}
                            >
                              <p className="font-display text-[18px] font-semibold text-ink">{b.label}</p>
                              <p className="mt-1.5 text-[12.5px] font-semibold text-ink">{b.note}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 5 && (
                      <div>
                        <Label>Upload Documents (optional at this stage)</Label>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          {DOCS.map((d) => {
                            const file = data.docs[d];
                            const on = !!file;
                            return (
                              <label
                                key={d}
                                className={cn(
                                  "flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed p-5 text-left transition-all duration-400",
                                  on ? "border-success bg-success/[0.05]" : "border-ink/15 hover:border-brand/50",
                                )}
                              >
                                <input
                                  type="file"
                                  accept=".pdf, .jpg, .jpeg"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    if (file && file.size > 5 * 1024 * 1024) {
                                      alert('File size must be under 5 MB');
                                      return;
                                    }
                                    setDoc(d, file);
                                  }}
                                />
                                <span
                                  className={cn(
                                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                                    on ? "bg-success text-white" : "bg-mist text-ink",
                                  )}
                                >
                                  {on ? <CheckCircle2 className="h-5 w-5" /> : <FileUp className="h-5 w-5" />}
                                </span>
                                <span>
                                  <span className="block text-[14px] font-medium text-ink">{d}</span>
                                  <span className="block text-[12px] font-semibold text-ink line-clamp-1">
                                    {on ? file.name : "PDF / JPG · up to 5 MB"}
                                  </span>
                                </span>
                              </label>
                            );
                          })}
                        </div>
                        <p className="mt-5 text-[12.5px] font-semibold text-ink">
                          You can also carry originals to our Bhilwara office — our documentation desk verifies everything
                          free of charge.
                        </p>
                      </div>
                    )}

                    {step === 6 && (
                      <div>
                        <Label>Review your application</Label>
                        <div className="mt-5 divide-y divide-ink/[0.06] overflow-hidden rounded-2xl border border-ink/[0.07]">
                          {[
                            ["Name", data.name],
                            ["Phone", data.phone],
                            ["Email", data.email],
                            ["City", data.city],
                            ["Board / Year", [data.board, data.passYear].filter(Boolean).join(" · ")],
                            ["PCB %", data.pcb],
                            ["NEET", [data.neetStatus, data.neetScore].filter(Boolean).join(" · ")],
                            ["Preferred Countries", data.countries.join(", ")],
                            ["Budget", data.budget],
                            ["Documents Ready", Object.keys(data.docs).filter(k => data.docs[k]).join(", ")],
                          ].map(([k, v]) => (
                            <div key={k as string} className="flex items-start justify-between gap-6 px-6 py-4">
                              <span className="text-[11.5px] tracking-[0.14em] text-ink uppercase">{k}</span>
                              <span className="max-w-[60%] text-right text-[13.5px] font-semibold text-ink">
                                {v || <span className="text-ink">—</span>}
                              </span>
                            </div>
                          ))}
                        </div>
                        <label className="mt-6 flex items-start gap-3 text-[13px] font-semibold text-ink">
                          <input type="checkbox" defaultChecked className="mt-1 accent-[#C1121F]" />
                          I authorise Dronacharya Admission Consultancy to contact me regarding admission guidance.
                        </label>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* nav */}
                <div className="mt-10 flex items-center justify-between border-t border-ink/[0.06] pt-7">
                  <button
                    onClick={() => go(-1)}
                    disabled={step === 0}
                    className={cn(
                      "flex items-center gap-2 text-[13px] font-medium tracking-tight transition-colors",
                      step === 0 ? "cursor-not-allowed text-ink" : "text-ink hover:text-brand",
                    )}
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>

                  {step < STEPS.length - 1 ? (
                    <Btn onClick={() => go(1)} icon={<ArrowRight className="h-4 w-4" />}>
                      Continue
                    </Btn>
                  ) : (
                    <Btn onClick={submitApplication} disabled={isSubmitting} size="lg">
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Btn>
                  )}
                </div>
              </div>

              <p className="mt-6 text-center text-[12.5px] font-semibold text-ink">
                Prefer to talk first? Call {BUSINESS.phone} — the first counselling session is free.
              </p>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}

/* ---------------- small form atoms ---------------- */

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-6 sm:grid-cols-2">{children}</div>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-[11px] tracking-[0.2em] text-ink uppercase">{children}</span>;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <div className="relative mt-2.5">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-ink/10 bg-mist px-5 py-3.5 text-[14px] font-semibold text-ink placeholder:text-ink transition focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/15 focus:outline-none"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            aria-label="Clear"
            className="absolute top-1/2 right-4 -translate-y-1/2 text-ink transition hover:text-brand"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </label>
  );
}

function Chips({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={cn(
              "rounded-full border px-4 py-2 text-[12.5px] transition-all duration-300",
              value === o ? "border-brand bg-brand text-white" : "border-ink/12 bg-white text-ink hover:border-ink/30",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
