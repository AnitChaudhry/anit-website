"use client"
import { motion, useInView, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import GlassParticles from "@/components/fx/backgrounds/GlassParticles"

type Beat = {
  year: string
  title: string
  body: string
}

const BEATS: Beat[] = [
  {
    year: "2017",
    title: "The Formation",
    body: "I studied at the Institute of Management Studies, Noida — where business thinking met the edge of technology. The habit of asking what the next layer of the stack would even need.",
  },
  {
    year: "Nov 2022",
    title: "The Ignition",
    body: "ChatGPT shipped. Within a week my conviction was set: this is the wave. Get on it. Now.",
  },
  {
    year: "2023",
    title: "The Frontfoot",
    body: "Frontfoot isn't speed — it's attention. Reading what hasn't been named yet. Building with MCP before most teams knew the acronym.",
  },
  {
    year: "2024",
    title: "The Team",
    body: "I joined OpenAnalyst Inc. — the team building the agentic-analyst stack. Not watching the wave. Joining the team building the board.",
  },
  {
    year: "2024 →",
    title: "The Voice",
    body: "11,685 followers and counting. I write weekly about where this wave goes — Claude releases, agentic patterns, the next software shape.",
  },
  {
    year: "Now",
    title: "The Build",
    body: "I'm shipping 10x developer tools — agents that take work end-to-end, idea → spec → merged PR. The barrier was never intelligence. It was always accessibility.",
  },
]

/* ── A single beat: alternates left/right, scales up when centered in view, fades on entry/exit ── */
function JourneyBeat({ beat, index }: { beat: Beat; index: number }) {
  const isLeft = index % 2 === 0
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15%" })

  // Scroll-progress 0 → 1 across this beat passing through the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  // Zoom-focus arc — much more pronounced. Pulls back hard on entry,
  // dramatically zooms when centered, recedes on exit.
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.78, 1.18, 1.18, 0.86])
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.25, 1, 1, 0.4])
  // Active-dot highlight — bigger glow ring when focused.
  const dotScale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.55, 2.0, 2.0, 0.7])
  const dotGlow = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [
      "0 0 0 0 rgba(124,139,227,0)",
      "0 0 0 8px rgba(124,139,227,0.22), 0 0 36px rgba(124,139,227,0.75)",
      "0 0 0 8px rgba(124,139,227,0.22), 0 0 36px rgba(124,139,227,0.75)",
      "0 0 0 0 rgba(124,139,227,0)",
    ],
  )

  return (
    <div ref={ref} className="relative grid grid-cols-12 gap-2 md:gap-6 py-8 md:py-10">
      {/* Mobile / single-col fallback */}
      <div className="col-span-12 md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.05 * index, ease: [0.16, 1, 0.3, 1] }}
          className="pl-6 border-l border-white/[0.08]"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-cream-muted">
            {beat.year}
          </span>
          <h3
            className="font-serif italic mt-2 mb-2"
            style={{
              fontSize: "clamp(1.5rem, 6vw, 2rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#E8E5D6",
            }}
          >
            {beat.title}
          </h3>
          <p className="text-[14px] leading-[1.65] text-cream-soft">{beat.body}</p>
        </motion.div>
      </div>

      {/* Desktop zigzag */}
      <div className="hidden md:block md:col-span-5">
        {isLeft && (
          <motion.div
            style={{ scale, opacity, transformOrigin: "right center" }}
            className="text-right pr-4 md:pr-5"
            data-beat="left"
          >
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-cream-muted">
              {beat.year}
            </span>
            <h3
              className="font-serif italic mt-3 mb-3"
              style={{
                fontSize: "clamp(1.6rem, 2.4vw, 2.6rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: "#E8E5D6",
              }}
            >
              {beat.title}
            </h3>
            <p className="text-[15px] leading-[1.7] text-cream-soft ml-auto" style={{ maxWidth: "32ch" }}>
              {beat.body}
            </p>
          </motion.div>
        )}
      </div>

      {/* Center dot — sits on the spine, scales + glows when this beat is focused */}
      <div className="hidden md:flex md:col-span-2 justify-center relative">
        <motion.span
          style={{ scale: dotScale, boxShadow: dotGlow }}
          className="relative mt-2 inline-block h-3 w-3 rounded-full"
          aria-hidden
        >
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, #B7C0F5 0%, #7C8BE3 60%, #4d59a8 100%)",
            }}
          />
        </motion.span>
      </div>

      <div className="hidden md:block md:col-span-5">
        {!isLeft && (
          <motion.div
            style={{ scale, opacity, transformOrigin: "left center" }}
            className="text-left pl-4 md:pl-5"
            data-beat="right"
          >
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-cream-muted">
              {beat.year}
            </span>
            <h3
              className="font-serif italic mt-3 mb-3"
              style={{
                fontSize: "clamp(1.6rem, 2.4vw, 2.6rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: "#E8E5D6",
              }}
            >
              {beat.title}
            </h3>
            <p className="text-[15px] leading-[1.7] text-cream-soft" style={{ maxWidth: "32ch" }}>
              {beat.body}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function Journey() {
  const timelineRef = useRef<HTMLDivElement>(null)
  // Track scroll across the full timeline so we can fill the spine.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 60%", "end 60%"],
  })
  const lineFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section
      id="journey"
      className="relative px-6 md:px-12 lg:px-20 pt-28 md:pt-40 pb-20 overflow-hidden"
    >
      <div
        aria-hidden
        className="float-orb-3 pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 h-[80vh] w-[80vh] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,139,227,0.18) 0%, rgba(124,139,227,0.05) 30%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />
      <GlassParticles opacity={0.45} />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 md:mb-20"
        >
          <span className="font-mono text-xs tracking-[0.28em] text-cream-muted uppercase">
            01 · Journey
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
            Every wave changed everything.{" "}
            <em className="italic block mt-1" style={{ color: "#9AA5E0" }}>
              I was already on it.
            </em>
          </h2>
        </motion.div>

        {/* Timeline — desktop has a center spine with scroll-driven fill */}
        <div ref={timelineRef} className="relative">
          {/* Static faint spine */}
          <div
            aria-hidden
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/[0.07]"
          />
          {/* Scroll-progress fill — grows as user scrolls down the timeline */}
          <motion.div
            aria-hidden
            style={{ height: lineFill, boxShadow: "0 0 12px rgba(124,139,227,0.5)" }}
            className="hidden md:block absolute left-1/2 top-0 w-[2px] -translate-x-1/2 origin-top"
          >
            <div
              className="h-full w-full rounded-full"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(124,139,227,0.0) 0%, rgba(124,139,227,0.85) 25%, rgba(155,170,240,0.95) 100%)",
              }}
            />
          </motion.div>

          {BEATS.map((beat, i) => (
            <JourneyBeat key={beat.title} beat={beat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
