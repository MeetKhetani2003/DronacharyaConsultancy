"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function PageHero({
  eyebrow,
  title,
  highlight,
  sub,
  image,
  crumb,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  sub?: string;
  image: string;
  crumb: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const words = title.split(" ");
  const router = useRouter();

  return (
    <section ref={ref} className="relative flex min-h-[62vh] items-end overflow-hidden bg-ink pt-40 pb-16 md:min-h-[70vh] md:pb-24">
      <motion.img
        style={{ y }}
        src={image}
        alt=""
        className="absolute inset-0 h-[118%] w-full object-cover opacity-45"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/60" />
      <div className="grid-lines-dark absolute inset-0 opacity-40" />

      <div className="container-x relative">
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-2 text-[11.5px] tracking-[0.16em] text-white uppercase"
        >
          <button onClick={() => router.push("/")} className="transition hover:text-white">
            Home
          </button>
          <ChevronRight className="h-3 w-3" />
          <span className="text-brand">{crumb}</span>
        </motion.nav>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-8 text-[11px] tracking-[0.28em] text-white uppercase"
        >
          {eyebrow}
        </motion.p>

        <h1 className="font-display mt-5 max-w-4xl text-[clamp(2.3rem,5.6vw,4.4rem)] leading-[1.02] font-extralight tracking-[-0.035em] text-white">
          {words.map((w, i) => (
            <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom pb-2 pt-2">
              <motion.span
                className={
                  highlight && w.replace(/[^\w'’]/g, "").toLowerCase() === highlight.toLowerCase()
                    ? "inline-block text-brand italic"
                    : "inline-block"
                }
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                {w}
                {i < words.length - 1 ? "\u00A0" : ""}
              </motion.span>
            </span>
          ))}
        </h1>

        {sub && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-7 max-w-2xl text-[15px] leading-relaxed font-semibold text-white md:text-[17px]"
          >
            {sub}
          </motion.p>
        )}
      </div>
    </section>
  );
}
