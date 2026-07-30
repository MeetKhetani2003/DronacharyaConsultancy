"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp, Phone } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { BUSINESS } from "@/data/content";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen bg-white pb-[72px] lg:pb-0">
      <Loader show={loading} />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <FloatingCta />
      <MobileBar />
    </div>
  );
}

function Loader({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="grid-lines-dark absolute inset-0 opacity-30" />
          <div className="relative text-center">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-deva text-[34px] leading-none text-brand md:text-[46px]"
            >
              {BUSINESS.devanagari}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="font-display mt-4 text-[10px] tracking-[0.42em] text-white uppercase md:text-[11px]"
            >
              Admission Consultancy
            </motion.p>
            <div className="mx-auto mt-8 h-px w-52 overflow-hidden bg-white/12">
              <motion.div
                className="h-full bg-brand"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-5 text-[10px] tracking-[0.3em] text-white uppercase"
            >
              Since 2003
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX, originX: 0 }}
      className="fixed top-0 right-0 left-0 z-[150] h-[2px] bg-brand"
      aria-hidden
    />
  );
}

function CursorGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[140] hidden h-[420px] w-[420px] rounded-full opacity-[0.055] blur-[90px] transition-transform duration-300 ease-out lg:block"
      style={{
        left: pos.x - 210,
        top: pos.y - 210,
        background: "radial-gradient(circle, #C1121F 0%, transparent 65%)",
      }}
    />
  );
}

function FloatingCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-5 bottom-24 z-[130] flex flex-col items-end gap-3 lg:bottom-8">
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white/90 text-ink shadow-[0_16px_40px_-20px_rgba(17,24,39,0.5)] backdrop-blur transition hover:border-brand hover:text-brand"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={BUSINESS.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex h-13 w-13 items-center justify-center rounded-full bg-success p-3.5 text-white shadow-[0_18px_44px_-18px_rgba(22,163,74,0.9)] transition-transform duration-300 hover:scale-110"
      >
        <span className="absolute inset-0 animate-[pulse-ring_3.2s_infinite] rounded-full bg-success/50" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="relative h-6 w-6"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

      <a
        href={BUSINESS.phoneHref}
        aria-label="Call us"
        className="hidden h-13 w-13 items-center justify-center rounded-full bg-brand p-3.5 text-white shadow-[0_18px_44px_-18px_rgba(193,18,31,0.9)] transition-transform duration-300 hover:scale-110 lg:flex"
      >
        <Phone className="h-5 w-5" />
      </a>
    </div>
  );
}

function MobileBar() {
  const router = useRouter();
  return (
    <div className="fixed right-0 bottom-0 left-0 z-[125] border-t border-ink/[0.07] bg-white/92 px-4 py-3 backdrop-blur-xl lg:hidden">
      <div className="flex items-center gap-3">
        <a
          href={BUSINESS.phoneHref}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/12 py-3 text-[13px] font-medium text-ink"
        >
          <Phone className="h-4 w-4 text-brand" /> Call Now
        </a>
        <button
          onClick={() => router.push("/apply")}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand py-3 text-[13px] font-medium text-white shadow-[0_14px_34px_-16px_rgba(193,18,31,0.9)]"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
