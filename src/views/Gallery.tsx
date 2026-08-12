"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Expand, Video } from "lucide-react";
import { useMemo, useState } from "react";
import PageHero from "@/components/PageHero";
import { Lightbox, Section, SectionHead } from "@/components/ui";
import { MEDIA } from "@/data/content";
import { FinalCta } from "@/sections/HomeBottom";
import { cn } from "@/utils/cn";

const getYouTubeId = (url: string) => {
  if (typeof url !== 'string') return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : null;
};

const GALLERY_CATEGORIES = ["All", "Photos", "Videos"];

interface GalleryItem {
  title: string;
  category: string;
  src: string;
}

export default function GalleryPage({ initialItems = [] }: { initialItems?: GalleryItem[] }) {
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<number | null>(null);

  const items = useMemo(() => (cat === "All" ? initialItems : initialItems.filter((g) => g.category === cat)), [cat, initialItems]);

  return (
    <>
      <PageHero
        crumb="Gallery"
        eyebrow="Events · Seminars · Students · Press"
        title="Twenty-three years, seen through our lens."
        highlight="lens"
        image={MEDIA.seminar4}
      />

      <Section className="bg-white">
        <div className="container-x">
          <SectionHead eyebrow="Gallery" title="Filter the archive." align="center" />

          <div className="mt-12 flex flex-wrap justify-center gap-2.5">
            {GALLERY_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "relative overflow-hidden rounded-full border px-5 py-2.5 text-[12.5px] font-medium tracking-tight transition-all duration-400",
                  cat === c
                    ? "border-brand bg-brand text-white shadow-[0_14px_34px_-16px_rgba(193,18,31,0.8)]"
                    : "border-ink/10 text-ink hover:border-ink/30 hover:text-ink",
                )}
              >
                {c}
                <span className="ml-2 text-[10.5px] opacity-60">
                  {c === "All" ? initialItems.length : initialItems.filter((g) => g.category === c).length}
                </span>
              </button>
            ))}
          </div>

          <motion.div layout className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4 [&>*]:mb-5">
            <AnimatePresence mode="popLayout">
              {items.map((g, i) => (
                <motion.button
                  key={`${g.src}-${g.title}-${i}`}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.55, delay: (i % 6) * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setOpen(i)}
                  className={cn(
                    "img-zoom group relative block w-full overflow-hidden rounded-2xl border border-ink/[0.06] break-inside-avoid bg-ink/5",
                    i % 5 === 0 ? "aspect-[3/4]" : i % 7 === 3 ? "aspect-square" : "aspect-[4/3]",
                  )}
                >
                  {g.category === 'Videos' ? (
                    getYouTubeId(g.src) ? (
                      <img src={`https://img.youtube.com/vi/${getYouTubeId(g.src)}/maxresdefault.jpg`} onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${getYouTubeId(g.src)}/hqdefault.jpg` }} className="h-full w-full object-cover" />
                    ) : (
                      <video src={g.src} className="h-full w-full object-cover" preload="metadata" />
                    )
                  ) : (
                    <img src={g.src} alt={g.title} loading="lazy" className="h-full w-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/55" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                    {g.category === 'Videos' ? <Video className="h-6 w-6 text-white mb-2" /> : <Expand className="h-5 w-5 text-white" />}
                    <p className="font-display mt-3 px-4 text-center text-[14px] font-semibold text-white">{g.title}</p>
                    <p className="mt-1 text-[10.5px] tracking-[0.18em] text-white uppercase">{g.category}</p>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </Section>

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
      <FinalCta />
    </>
  );
}
