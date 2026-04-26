"use client"
import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import MinimalGrid from "@/components/fx/backgrounds/MinimalGrid"

type Item = {
  number: string
  title: string
  blurb: string
  bullets: string[]
  link: { label: string; href: string }
}

const ITEMS: Item[] = [
  {
    number: "01",
    title: "OpenAnalyst Inc.",
    blurb:
      "5 AI agents. One command. The agentic-analyst stack — no complex setup, no overwhelming dashboards. Just clarity.",
    bullets: [
      "Agentic data analyst, end-to-end",
      "MCP-native from day one",
      "Quiet UX. No dashboard bloat.",
    ],
    link: { label: "View OpenAnalyst", href: "https://openanalyst.com" },
  },
  {
    number: "02",
    title: "10x Developer Tools",
    blurb:
      "Agents that ship end-to-end PRs. Built before most teams knew what MCP was. Idea → spec → merge in one loop.",
    bullets: [
      "Specs that survive a real ship",
      "Tooling that takes the work the whole way",
      "Compounding leverage, not feature counts",
    ],
    link: { label: "See the work", href: "https://www.linkedin.com/in/anitchoudhary/" },
  },
  {
    number: "03",
    title: "The Voice",
    blurb:
      "11,685 followers on LinkedIn. I write weekly about where this wave goes — agentic patterns, Claude releases, the next software shape.",
    bullets: [
      "Claude release notes, decoded",
      "Agentic patterns from the field",
      "Posts that make builders argue",
    ],
    link: { label: "Read on LinkedIn", href: "https://www.linkedin.com/in/anitchoudhary/" },
  },
]

function WorkCard({ item, index }: { item: Item; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-12%" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
      className="card-depth h-full flex flex-col rounded-2xl p-7 md:p-8 min-h-[420px]"
    >
      <span className="font-mono text-[10px] tracking-[0.28em] text-cream-muted uppercase">
        {item.number}
      </span>
      <h3
        className="mt-4 font-serif italic"
        style={{
          fontSize: "clamp(1.6rem, 2.2vw, 2.4rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          color: "#E8E5D6",
        }}
      >
        {item.title}
      </h3>
      <p className="mt-5 text-[15px] leading-[1.65] text-cream-soft">{item.blurb}</p>
      <ul className="mt-6 flex flex-col gap-2.5">
        {item.bullets.map((b, i) => (
          <li key={i} className="flex gap-3 text-[13px] leading-relaxed text-cream-muted">
            <span className="text-indigo-accent select-none">→</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <a
        href={item.link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-auto pt-8 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-cream-muted transition-colors hover:text-cream"
      >
        {item.link.label}
        <ArrowUpRight
          size={14}
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>
    </motion.div>
  )
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-15%" })
  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative px-6 md:px-12 lg:px-20 pt-32 md:pt-44 pb-28 md:pb-36 overflow-hidden"
    >
      <MinimalGrid opacity={0.4} />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 md:mb-20"
        >
          <span className="font-mono text-xs tracking-[0.28em] text-cream-muted uppercase">
            03 · Work
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
            Three things{" "}
            <em className="italic" style={{ color: "#9AA5E0" }}>
              I&apos;m shipping right now.
            </em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {ITEMS.map((item, i) => (
            <WorkCard key={item.number} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
