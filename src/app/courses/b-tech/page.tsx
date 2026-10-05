import PageHero from "@/components/PageHero";
import { MEDIA } from "@/data/content";
import { FinalCta, Faq, Testimonials } from "@/sections/HomeBottom";
import { Process } from "@/sections/HomeTop";
import { Section, SectionHead, Btn, Reveal, Stagger, StaggerItem } from "@/components/ui";
import { CheckCircle2, GraduationCap, ArrowRight, UserCheck, BookOpen, Target, Plane, ShieldCheck, HelpCircle } from "lucide-react";
import { cn } from "@/utils/cn";

export default function BTechMbaAdmissionsPage() {
  return (
    <>
      <PageHero
        crumb="Engineering & Management"
        eyebrow="Courses"
        title="B.Tech, BBA, MBA & Designing Courses in India & Abroad"
        highlight="India & Abroad"
        sub="Planning your future after Class 12 PCM? Get expert guidance for Engineering, B.Tech admissions, and entrance exams."
        image={MEDIA.counselling2}
      />

      <Section className="bg-mist relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-brand/10 blur-[120px]" />
        
        <div className="container-x relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <SectionHead
                  eyebrow="Career Guidance"
                  title="Engineering & Career Guidance After 12th PCM"
                />
                <p className="mt-6 text-[16px] leading-relaxed text-ink/80 font-medium">
                  Planning your future after Class 12 PCM? Get expert guidance for Engineering, B.Tech admissions, and entrance exams. Our team helps students choose the right college and career path based on their interests, marks, and budget.
                </p>

                <div className="mt-10">
                  <h3 className="text-xl font-display font-semibold mb-5 flex items-center gap-2">
                    <BookOpen className="text-brand w-6 h-6" />
                    Exams We Guide For
                  </h3>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2">
                    {["IIT-JEE", "CUET", "IIST", "NEST", "COMEDK", "BBA & B.Des Entrance Exams"].map((exam, i) => (
                      <li key={i} className="flex items-center gap-2 text-ink/80 font-medium text-[14.5px]">
                        <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                        {exam}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-ink/[0.08] shadow-sm relative">
                <h3 className="text-2xl font-display font-semibold mb-6">Why Choose Dronacharya?</h3>
                <ul className="space-y-4">
                  {[
                    "One-to-One Career Counselling",
                    "Expert Admission Guidance",
                    "Entrance Exam Form Filling Support",
                    "College & Course Selection Assistance",
                    "Personalized Mentorship",
                    "Post-Admission Support",
                    "Internship & Placement Guidance"
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                        <ArrowRight className="w-3.5 h-3.5 text-brand" />
                      </div>
                      <span className="font-semibold text-ink/85">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-x">
          <SectionHead
            eyebrow="Our Methodology"
            title="7C Framework"
            sub="Our unique 7C Framework helps students make informed career decisions."
            align="center"
          />
          
          <Stagger className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Choice & Chances", icon: Target },
              { title: "Course & Career", icon: GraduationCap },
              { title: "College Counselling Concept", icon: BookOpen },
              { title: "Country, City, College & Course", icon: Plane },
              { title: "Cost & Challenges", icon: ShieldCheck },
              { title: "Commitment & Comfort", icon: UserCheck },
              { title: "Counselling & Career Planning", icon: HelpCircle },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={i} className={cn("p-6 rounded-2xl border border-ink/[0.08] bg-white", i === 6 && "sm:col-span-2 lg:col-span-1")}>
                  <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-semibold text-lg">{item.title}</h4>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </Section>

      <Section className="bg-ink text-white">
        <div className="container-x max-w-4xl text-center">
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
            <UserCheck className="w-10 h-10 text-brand-light" />
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6">Mentorship by Atul Bapna Sir</h2>
          <p className="text-[17px] leading-relaxed text-white/80 font-medium max-w-2xl mx-auto">
            With over 23 years of experience in career counselling and student guidance, Atul Bapna Sir has helped thousands of students make successful academic and career decisions.
          </p>
          
          <div className="mt-12 p-8 md:p-10 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
            <h3 className="font-display text-2xl font-medium mb-4">Start your journey today</h3>
            <p className="text-white/70 mb-8">Start your journey towards a successful career with expert counselling and admission guidance.</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Btn href="tel:9829092225" variant="primary" size="lg" className="w-full sm:w-auto">
                📞 98290-92225
              </Btn>
              <Btn href="tel:9610068666" variant="outline" size="lg" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
                📞 96100-68666
              </Btn>
            </div>
          </div>
        </div>
      </Section>

      <Process />
      <Testimonials />
      <Faq compact />
      <FinalCta />
    </>
  );
}
