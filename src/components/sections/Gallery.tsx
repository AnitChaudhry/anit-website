"use client"
import { motion, useInView } from "motion/react"
import { useRef } from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { asset } from "@/lib/basePath"

const LINKEDIN_URL = "https://www.linkedin.com/in/anit-choudhary-984994149/"

const POSTS = [
  asset("/posts/post-01.jpeg"),
  asset("/posts/post-02.jpeg"),
  asset("/posts/post-03.jpeg"),
  asset("/posts/post-04.jpeg"),
  asset("/posts/post-05.jpeg"),
]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-15%" })
  const reel = [...POSTS, ...POSTS]

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative pt-32 md:pt-44 pb-28 md:pb-36 overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 md:mb-20 flex items-end justify-between gap-8 flex-wrap"
        >
          <div>
            <span className="font-mono text-xs tracking-[0.28em] text-cream-muted uppercase">
              04 · Gallery
            </span>
            <h2
              className="font-serif mt-6 max-w-3xl"
              style={{
                fontSize: "clamp(2.4rem, 6vw, 5rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                color: "#E8E5D6",
              }}
            >
              Posts that{" "}
              <em className="italic" style={{ color: "#9AA5E0" }}>
                made builders argue.
              </em>
            </h2>
          </div>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-cream-muted transition-colors hover:text-cream"
          >
            All on LinkedIn
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </motion.div>
      </div>

      <div
        className="gallery-marquee relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)",
        }}
      >
        <div className="gallery-track flex gap-5 md:gap-6 w-max py-2">
          {reel.map((src, i) => (
            <a
              key={`${src}-${i}`}
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open LinkedIn post ${(i % POSTS.length) + 1}`}
              className="group relative block shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
              style={{
                width: "clamp(220px, 28vw, 360px)",
                boxShadow: "0 20px 60px -30px rgba(0,0,0,0.6)",
              }}
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 28vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,12,24,0) 50%, rgba(10,12,24,0.85) 100%)",
                }}
              />
              <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-cream opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                Open
                <ArrowUpRight size={12} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
