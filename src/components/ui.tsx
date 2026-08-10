"use client";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Star, X } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { BUSINESS } from "@/data/content";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------ */
/*  Scroll reveal                                                      */
/* ------------------------------------------------------------------ */

const easing = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: easing }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
  };
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easing } },
};

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}

/* Word-by-word text reveal */
export function TextReveal({
  text,
  className,
  delay = 0,
  highlight,
}: {
  text: string;
  className?: string;
  delay?: number;
  highlight?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={cn("inline-block", className)}>
      {words.map((w, i) => {
        const isHi = highlight && w.replace(/[^\w'’]/g, "").toLowerCase() === highlight.toLowerCase();
        return (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom pb-2 pt-2">
            <motion.span
              className={cn("inline-block", isHi && "text-brand")}
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: delay + i * 0.045, ease: easing }}
            >
              {w}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

/* Image that reveals behind a sliding mask, with optional parallax */
export function MaskImage({
  src,
  alt,
  className,
  imgClassName,
  parallax = 0,
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  parallax?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 z-10 bg-ink"
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.15, delay, ease: easing }}
        style={{ originY: 0 }}
      />
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={parallax ? { y, scale: 1 + parallax / 50 } : undefined}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Buttons                                                            */
/* ------------------------------------------------------------------ */

export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy, display: "inline-block" }}
      className={className}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

type BtnProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "dark" | "outline" | "ghost" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: ReactNode;
  type?: "button" | "submit";
};

export function Btn({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  icon,
  type = "button",
}: BtnProps) {
  const router = useRouter();
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight transition-colors duration-300 select-none";
  const sizes = {
    sm: "px-5 py-2.5 text-[13px]",
    md: "px-7 py-3.5 text-[14px]",
    lg: "px-9 py-4.5 text-[15px]",
  };
  const variants = {
    primary: "bg-brand text-white hover:bg-brand-600 shadow-[0_14px_40px_-14px_rgba(193,18,31,0.75)]",
    dark: "bg-ink text-white hover:bg-ink-800 shadow-[0_14px_40px_-16px_rgba(17,24,39,0.8)]",
    outline: "border border-ink/15 text-ink hover:border-ink/40 bg-white/60 backdrop-blur",
    light: "bg-white/10 text-white border border-white/25 backdrop-blur-md hover:bg-white/20",
    ghost: "text-ink hover:text-brand",
  };

  const handle = (e: React.MouseEvent<HTMLElement>) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const id = Date.now();
    setRipples((p) => [...p, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    setTimeout(() => setRipples((p) => p.filter((rp) => rp.id !== id)), 650);
    if (onClick) onClick();
    if (to) router.push(to);
  };

  const inner = (
    <>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/35"
          style={
            {
              left: r.x,
              top: r.y,
              width: 12,
              height: 12,
              transform: "translate(-50%,-50%)",
              animation: "ripple 0.65s cubic-bezier(0.16,1,0.3,1) forwards",
            } as CSSProperties
          }
        />
      ))}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon ?? <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
      </span>
    </>
  );

  const cls = cn(base, sizes[size], variants[variant], className);

  return (
    <Magnetic strength={0.25}>
      <style>{`@keyframes ripple{to{width:420px;height:420px;opacity:0}}`}</style>
      {href ? (
        <a href={href} className={cls} onClick={handle} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
          {inner}
        </a>
      ) : (
        <button type={type} className={cls} onClick={handle}>
          {inner}
        </button>
      )}
    </Magnetic>
  );
}

/* ------------------------------------------------------------------ */
/*  Section furniture                                                  */
/* ------------------------------------------------------------------ */

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <Reveal>
      <span
        className={cn(
          "inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em]",
          dark ? "border-white/15 bg-white/5 text-white" : "border-ink/10 bg-white text-ink",
        )}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-[pulse-ring_3.2s_infinite] rounded-full bg-brand" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
        </span>
        {children}
      </span>
    </Reveal>
  );
}

export function SectionHead({
  eyebrow,
  title,
  highlight,
  sub,
  dark = false,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  sub?: string;
  dark?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center", "max-w-3xl", className)}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "font-display mt-2 text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.1] font-semibold tracking-[-0.03em]",
          dark ? "text-white" : "text-ink",
        )}
      >
        <TextReveal text={title} highlight={highlight} />
      </h2>
      {sub && (
        <Reveal delay={0.12}>
          <p className={cn("mt-2 text-[15px] leading-relaxed font-semibold md:text-[17px]", dark ? "text-white" : "text-ink")}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function Section({
  children,
  id,
  className,
  dark = false,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section id={id} className={cn("relative py-12 md:py-16 lg:py-20", dark && "bg-ink text-white", className)}>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Counter                                                            */
/* ------------------------------------------------------------------ */

export function Counter({
  to,
  suffix = "",
  duration = 2000,
  className,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {val.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function Stars({ n = 5, className }: { n?: number; className?: string }) {
  return (
    <div className={cn("flex gap-1", className)}>
      {Array.from({ length: n }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.09, duration: 0.5, ease: easing }}
        >
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        </motion.span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Marquee                                                            */
/* ------------------------------------------------------------------ */

export function Marquee({
  items,
  className,
  slow = false,
  dark = false,
}: {
  items: string[];
  className?: string;
  slow?: boolean;
  dark?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("mask-fade-x overflow-hidden", className)}>
      <div className={cn("flex w-max items-center gap-14", slow ? "animate-[marquee_65s_linear_infinite]" : "animate-[marquee_38s_linear_infinite]")}>
        {doubled.map((t, i) => (
          <span
            key={i}
            className={cn(
              "font-display flex shrink-0 items-center gap-14 text-[13px] font-semibold tracking-[0.18em] uppercase",
              dark ? "text-white" : "text-ink",
            )}
          >
            {t}
            <span className="h-1 w-1 rounded-full bg-brand" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Lightbox                                                           */
/* ------------------------------------------------------------------ */

export function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: { src: string; title?: string; category?: string }[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % items.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = index !== null ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, items.length, onClose, onIndex]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-6 right-6 z-10 rounded-full border border-white/20 p-3 text-white transition hover:border-white/60 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              onIndex((index - 1 + items.length) % items.length);
            }}
            className="absolute left-4 z-10 rounded-full border border-white/20 p-3 text-white transition hover:border-white/60 hover:text-white md:left-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              onIndex((index + 1) % items.length);
            }}
            className="absolute right-4 z-10 rounded-full border border-white/20 p-3 text-white transition hover:border-white/60 hover:text-white md:right-10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <motion.figure
            key={index}
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easing }}
            className="mx-auto max-h-[86vh] w-[90vw] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {items[index].category === 'Videos' ? (
              <video src={items[index].src} controls autoPlay className="max-h-[74vh] w-full rounded-2xl object-contain" />
            ) : (
              <img src={items[index].src} alt={items[index].title ?? ""} className="max-h-[74vh] w-full rounded-2xl object-contain" />
            )}
            <figcaption className="mt-5 flex items-center justify-between text-white">
              <span className="font-display text-base font-semibold">{items[index].title}</span>
              <span className="text-[11px] tracking-[0.2em] uppercase">
                {items[index].category} · {index + 1}/{items.length}
              </span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Brand logo (recreated from the Dronacharya identity)               */
/* ------------------------------------------------------------------ */

export function Logo({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      aria-label={`${BUSINESS.name} — home`}
      className="group flex items-center text-left"
    >
      <img
        src="/logo.png"
        alt={`${BUSINESS.name} Logo`}
        className={cn(
          "h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105",
          compact && "h-10",
          dark && "brightness-0 invert"
        )}
      />
    </button>
  );
}

/* Simple hairline divider with animated draw */
export function Rule({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: easing }}
      style={{ originX: 0 }}
      className={cn("h-px w-full", dark ? "bg-white/12" : "bg-ink/10", className)}
    />
  );
}
