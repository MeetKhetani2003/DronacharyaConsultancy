"use client";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, Mail, Menu, Phone, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Btn, Logo } from "@/components/ui";
import { BUSINESS, NAV } from "@/data/content";
import { useRoute } from "@/lib/router";
import { cn } from "@/utils/cn";

export default function Navbar() {
  const path = useRoute();
  const router = useRouter();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);


  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  useEffect(() => {
    setMobile(false);
    setOpen(null);
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  // every page opens on a dark cinematic hero — keep the bar transparent until scroll
  const transparent = !scrolled;

  return (
    <>
      {/* utility bar */}
      <div
        className={cn(
          "fixed top-0 right-0 left-0 z-[95] hidden h-9 items-center border-b border-white/10 bg-ink text-[12px] text-white transition-transform duration-500 lg:flex",
          scrolled ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="container-x flex items-center justify-between">
          <p className="tracking-[0.14em] uppercase">
            Rajasthan’s trusted medical admission desk · Est. {BUSINESS.since}
          </p>
          <div className="flex items-center gap-7">
            <a href={BUSINESS.phoneHref} className="flex items-center gap-2 transition hover:text-white">
              <Phone className="h-3.5 w-3.5 text-brand" /> {BUSINESS.phone}
            </a>
            <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2 transition hover:text-white">
              <Mail className="h-3.5 w-3.5 text-brand" /> {BUSINESS.email}
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "fixed right-0 left-0 z-[100] transition-all duration-500",
          scrolled ? "top-0" : "lg:top-9 top-0",
          transparent
            ? "bg-transparent"
            : "border-b border-ink/[0.07] bg-white/85 shadow-[0_8px_40px_-24px_rgba(17,24,39,0.35)] backdrop-blur-xl",
        )}
        onMouseLeave={() => setOpen(null)}
      >
        <div className="container-x flex h-[74px] items-center justify-between">
          <Logo dark={transparent} />

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active = path === item.href || item.children?.some((c) => c.href === path);
              return (
                <div key={item.label} className="relative" onMouseEnter={() => setOpen(item.children ? item.label : null)}>
                  <button
                    onClick={() => router.push(item.href)}
                    className={cn(
                      "group relative px-4 py-2.5 text-[13.5px] font-medium tracking-tight transition-colors",
                      transparent ? "text-white hover:text-white" : "text-ink hover:text-ink",
                      active && (transparent ? "text-white" : "text-ink"),
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute bottom-1 left-4 h-px bg-brand transition-all duration-400",
                        active ? "w-[calc(100%-2rem)]" : "w-0 group-hover:w-[calc(100%-2rem)]",
                      )}
                    />
                  </button>
                </div>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={() => router.push("/contact")}
              className={cn(
                "text-[13.5px] font-medium tracking-tight transition-colors",
                transparent ? "text-white hover:text-white" : "text-ink hover:text-brand",
              )}
            >
              Free Counselling
            </button>
            <Btn to="/apply" size="sm" variant={transparent ? "light" : "primary"}>
              Apply Now
            </Btn>
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setMobile(true)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border transition lg:hidden",
              transparent ? "border-white/25 text-white" : "border-ink/10 text-ink",
            )}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {open && NAV.find((n) => n.label === open)?.children && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 left-0 hidden border-t border-ink/[0.06] bg-white/95 backdrop-blur-2xl lg:block"
            >
              <div className="container-x grid grid-cols-4 gap-2 py-8">
                {NAV.find((n) => n.label === open)!.children!.map((c, i) => (
                  <motion.button
                    key={c.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.4 }}
                    onClick={() => {
                      router.push(c.href);
                      setOpen(null);
                    }}
                    className="group rounded-2xl border border-transparent p-5 text-left transition-all duration-400 hover:border-ink/[0.07] hover:bg-mist"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-[15px] font-medium text-ink">{c.label}</span>
                      <ArrowUpRight className="h-4 w-4 text-ink transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
                    </div>
                    <p className="mt-2 text-[12.5px] leading-relaxed font-semibold text-ink">{c.desc}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-ink lg:hidden"
          >
            <div className="grid-lines-dark absolute inset-0 opacity-40" />
            <div className="relative flex h-full flex-col">
              <div className="container-x flex h-[74px] items-center justify-between">
                <Logo dark />
                <button
                  aria-label="Close menu"
                  onClick={() => setMobile(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="container-x hide-scrollbar flex-1 overflow-y-auto py-8">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.45 }}
                    className="border-b border-white/10 py-4"
                  >
                    <button
                      onClick={() => router.push(item.href)}
                      className="font-display text-2xl font-semibold tracking-tight text-white"
                    >
                      {item.label}
                    </button>
                    {item.children && (
                      <div className="mt-3 flex flex-col gap-2.5">
                        {item.children.map((c) => (
                          <button
                            key={c.href}
                            onClick={() => router.push(c.href)}
                            className="text-left text-[13.5px] font-semibold text-white"
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
                <div className="mt-8 flex flex-col gap-3">
                  <Btn to="/apply" variant="primary" className="w-full">
                    Apply Now
                  </Btn>
                  <Btn href={BUSINESS.phoneHref} variant="light" icon={<Phone className="h-4 w-4" />} className="w-full">
                    {BUSINESS.phone}
                  </Btn>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
