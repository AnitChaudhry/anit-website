"use client"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import ConstellationField from "@/components/fx/ConstellationField"
import { asset } from "@/lib/basePath"

/**
 * Hero with pronounced parallax — three depth layers that move at very
 * different speeds as the user scrolls past. Pure transform-based, no canvas.
 *
 *   far  : two huge soft indigo orbs (slow, large translate)
 *   mid  : a faint giant initial "A" watermark (medium translate)
 *   near : the actual headline + photo + CTA (slight translate, opacity fade)
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Pronounced depth: far orbs travel up to 480px, mid 220px, near 60px.
  const farY = useTransform(scrollYProgress, [0, 1], [0, 480])
  const midY = useTransform(scrollYProgress, [0, 1], [0, 220])
  const nearY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden px-6 md:px-12 lg:px-20"
    >
      {/* FAR — two giant blurred indigo orbs, both slowly drifting */}
      <motion.div
        aria-hidden
        style={{ y: farY }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="float-orb absolute -left-40 top-[-10%] h-[70vh] w-[70vh] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,139,227,0.50) 0%, rgba(124,139,227,0.10) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="float-orb-2 absolute right-[-8%] top-[35%] h-[80vh] w-[80vh] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,139,227,0.40) 0%, rgba(124,139,227,0.08) 45%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </motion.div>

      {/* Ambient — drifting indigo dots with proximity lines (the version Anit liked) */}
      <ConstellationField className="z-[1]" opacity={0.5} />

      {/* MID — Hero-only giant "A" watermark with parallax drift. The
          global rotating "Anit" wordmark is hidden during Hero so this
          is the only big mark visible here. */}
      <motion.div
        aria-hidden
        style={{ y: midY }}
        className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
      >
        <span
          className="font-serif italic select-none"
          style={{
            fontSize: "clamp(20rem, 55vw, 48rem)",
            color: "rgba(232, 229, 214, 0.045)",
            lineHeight: 0.85,
            letterSpacing: "-0.05em",
          }}
        >
          A
        </span>
      </motion.div>

      {/* NEAR — actual content */}
      <motion.div
        style={{ y: nearY, opacity: fade }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-between py-10 md:py-14"
      >
        {/* top nav */}
        <nav className="flex items-center justify-between">
          <span
            className="font-mono text-xs tracking-[0.25em] text-cream-muted uppercase"
          >
            Anit Choudhary
          </span>
          <div className="hidden md:flex gap-10 text-sm text-cream-soft">
            <a href="#journey" className="hover:text-cream transition-colors">Journey</a>
            <a href="#work" className="hover:text-cream transition-colors">Work</a>
            <a href="#connect" className="hover:text-cream transition-colors">Connect</a>
          </div>
        </nav>

        {/* center: headline + photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 py-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 text-xs text-cream-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-accent animate-pulse" />
              AI Product Manager · OpenAnalyst Inc.
            </p>
            <h1
              className="font-serif"
              style={{
                fontSize: "clamp(3.5rem, 9vw, 8rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                color: "#E8E5D6",
              }}
            >
              Building the next
              <br />
              <em className="italic" style={{ color: "#9AA5E0" }}>agentic</em> wave.
            </h1>
            <p className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-cream-soft">
              I&apos;m shipping agentic systems at OpenAnalyst, building 10x developer
              tools, and writing about where this wave goes for 11K+ followers.
              Reading what hasn&apos;t been named yet.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#connect"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-cream px-7 text-sm font-medium text-black transition-all hover:gap-3 hover:bg-white"
              >
                Let&apos;s build
                <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
              </a>
              <a
                href="#journey"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/12 px-7 text-sm text-cream-soft transition-colors hover:bg-white/[0.04] hover:text-cream"
              >
                See the journey
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex justify-center lg:justify-end"
          >
            <div className="relative h-80 w-80 md:h-[420px] md:w-[420px]">
              {/* outer aura */}
              <div
                className="absolute -inset-12 rounded-full opacity-80"
                style={{
                  background:
                    "radial-gradient(circle, rgba(124,139,227,0.55) 0%, rgba(124,139,227,0.12) 35%, transparent 65%)",
                  filter: "blur(40px)",
                }}
              />
              {/* inner glass ring */}
              <div
                aria-hidden
                className="absolute -inset-2 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(232,229,214,0.35) 0%, rgba(124,139,227,0.20) 50%, rgba(0,0,0,0.0) 100%)",
                  padding: "1px",
                  WebkitMask:
                    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
              <div
                className="relative h-full w-full overflow-hidden rounded-full"
                style={{
                  border: "1px solid rgba(232,229,214,0.18)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.18), 0 30px 80px -20px rgba(124,139,227,0.4)",
                }}
              >
                <Image
                  src={asset("/profile/anit-hero.jpeg")}
                  alt="Anit Choudhary"
                  fill
                  sizes="320px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* bottom: scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.25em] text-cream-muted"
        >
          <span>New Delhi · India</span>
          <span>2026</span>
        </motion.div>
      </motion.div>
    </section>
  )
}
