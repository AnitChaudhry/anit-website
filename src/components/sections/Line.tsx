"use client"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import Wave from "@/components/fx/backgrounds/Wave"

// We removed the per-clause scroll-driven opacity fade. The quote now reads
// at full cream from the start — no more gray-washed italic clause. The
// orb still drifts on scroll for ambient motion.

/**
 * The "one line" beat — a quiet editorial moment between Work and Connect.
 * Two clauses fade in sequentially as the user scrolls. Tall by design:
 * needs vertical room for the progressive reveal to actually happen.
 */
export default function Line() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.1"],
  })

  const orbY = useTransform(scrollYProgress, [0, 1], [-120, 120])

  return (
    <section
      ref={ref}
      className="relative px-6 md:px-12 lg:px-20 py-44 md:py-64 flex items-center justify-center"
      style={{ minHeight: "100vh", overflow: "visible" }}
    >
      <motion.div
        aria-hidden
        style={{ y: orbY }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120vh] w-[120vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        <div
          className="float-orb h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,139,227,0.32) 0%, rgba(124,139,227,0.08) 30%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      {/* Ambient — wave layers kept very faint so they read as motion, not pattern. */}
      <Wave opacity={0.18} />

      <div className="relative mx-auto max-w-5xl text-center">
        <span className="block font-mono text-xs tracking-[0.28em] text-cream-muted uppercase mb-12 md:mb-16">
          05 · Conviction
        </span>
        <p
          className="font-serif italic"
          style={{
            fontSize: "clamp(2rem, 5.5vw, 4.6rem)",
            lineHeight: 1.18,
            letterSpacing: "-0.025em",
            color: "#FFFFFF",
          }}
        >
          <span className="inline" style={{ color: "#FFFFFF" }}>
            The barrier was never intelligence.
          </span>{" "}
          <span className="inline">
            It was always{" "}
            <span
              style={{
                color: "#FFD166",
                textShadow: "0 0 24px rgba(255, 209, 102, 0.45)",
              }}
            >
              accessibility
            </span>
            .
          </span>
        </p>
        <span className="block mt-12 md:mt-16 font-mono text-[10px] tracking-[0.28em] text-cream-muted/60 uppercase">
          — Anit Choudhary
        </span>
      </div>
    </section>
  )
}
