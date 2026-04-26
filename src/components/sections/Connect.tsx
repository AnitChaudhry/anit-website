"use client"
import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowUpRight, Mail, Globe } from "lucide-react"
import { asset } from "@/lib/basePath"

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

// Lucide removed brand icons in recent versions — inline SVG keeps it simple.
function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

type LinkItem = {
  label: string
  detail: string
  href: string
  icon: React.ReactNode
}

const EMAIL = "Getintouch.anit@gmail.com"
const EMAIL_SUBJECT = "Hey Anit — let's build"
const EMAIL_BODY =
  "Hi Anit,\n\nFound you via your site. Quick context on me:\n\nWhat I'd love to chat about:\n\n— "
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  EMAIL,
)}&su=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  EMAIL_SUBJECT,
)}&body=${encodeURIComponent(EMAIL_BODY)}`

const LINKS: LinkItem[] = [
  {
    label: "LinkedIn",
    detail: "/in/anit-choudhary-984994149  ·  11K+ followers",
    href: "https://www.linkedin.com/in/anit-choudhary-984994149/",
    icon: <LinkedinIcon size={20} />,
  },
  {
    label: "Email",
    detail: `${EMAIL}  ·  opens a draft`,
    href: GMAIL_COMPOSE,
    icon: <Mail size={20} />,
  },
  {
    label: "OpenAnalyst",
    detail: "openanalyst.com  ·  the agentic-analyst stack",
    href: "https://openanalyst.com",
    icon: <Globe size={20} />,
  },
  {
    label: "GitHub",
    detail: "github.com/AnitChaudhry  ·  10x-Analyst-Loop & more",
    href: "https://github.com/AnitChaudhry/",
    icon: <GithubIcon size={20} />,
  },
]

function SpunkyMascot() {
  const ref = useRef<HTMLDivElement>(null)
  const [angle, setAngle] = useState(0)
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (window.innerWidth < 768) return
    const onMove = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const deg = Math.atan2(dy, dx) * (180 / Math.PI)
      setAngle(Math.max(-18, Math.min(18, deg / 6)))
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])
  return (
    <motion.div
      ref={ref}
      aria-hidden
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.2 }}
      animate={{ y: [0, -6, 0] }}
      whileHover={{ scale: 1.15, rotate: [0, -8, 8, -4, 0] }}
      style={{ transition: "transform 200ms ease" }}
      className="hidden md:block absolute left-6 md:left-12 lg:left-20 bottom-24 z-30"
    >
      <motion.div
        animate={{ rotate: angle }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
        className="relative h-20 w-20 overflow-hidden rounded-full"
        style={{
          border: "1px solid rgba(232,229,214,0.25)",
          boxShadow: "0 8px 24px -8px rgba(124,139,227,0.5)",
        }}
      >
        <Image src={asset("/profile/spunky1.jpg")} alt="" fill sizes="80px" className="object-cover" />
      </motion.div>
    </motion.div>
  )
}

// Cinematic background video — lifted from CharClaw-App's App.tsx.
// CDN-hosted MP4, autoplays muted, sits behind a darkening overlay.
const CHARCLAW_VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"

export default function Connect() {
  return (
    <section
      id="connect"
      className="relative px-6 md:px-12 lg:px-20 pt-40 md:pt-56 pb-24"
      style={{ overflow: "visible" }}
    >
      {/* Footer video — full-width strip at the bottom of Connect.
          object-cover with object-position bottom keeps the lower portion
          (boys / flowers / ground) in frame; the upper portion (sky) is
          cropped, but its edge is hidden by a tall gradient that dissolves
          into the page bg + GlobalStarfield. No contained "box" rectangle.
          The Starfield's twinkle continues seamlessly through the upper
          area, replicating the video's own sky stars. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 bottom-0 z-0 overflow-hidden"
        style={{ height: "80vh" }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="video-breathe absolute inset-0 h-full w-full object-cover opacity-95"
          style={{ objectPosition: "center bottom" }}
        >
          <source src={CHARCLAW_VIDEO_SRC} type="video/mp4" />
        </video>
        {/* Tall top-fade — soft dissolve from page bg to transparent across
            the upper third, so the cropped sky edge is invisible. */}
        <div
          className="absolute inset-x-0 top-0 h-[42vh]"
          style={{
            background:
              "linear-gradient(to bottom, #0a0c18 0%, rgba(10,12,24,0.92) 18%, rgba(10,12,24,0.65) 42%, rgba(10,12,24,0.35) 70%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-20 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-28"
        >
          <span className="font-mono text-xs tracking-[0.28em] text-cream-muted uppercase">
            06 · Connect
          </span>
          <h2
            className="font-serif mt-8 max-w-3xl"
            style={{
              fontSize: "clamp(2.6rem, 6.5vw, 5.5rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
              color: "#E8E5D6",
            }}
          >
            The next layer is being built right now.{" "}
            <em className="italic block mt-2" style={{ color: "#9AA5E0" }}>
              Let&apos;s shape it.
            </em>
          </h2>
        </motion.div>

        <div className="border-t border-white/[0.07]">
          {LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              onClick={(e) => {
                if (link.label !== "Email") return
                if (typeof navigator === "undefined") return
                const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent)
                if (isMobile) {
                  e.preventDefault()
                  window.location.href = MAILTO
                }
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-center justify-between gap-6 border-b border-white/[0.07] py-12 md:py-16 transition-colors hover:bg-white/[0.02] -mx-6 md:-mx-12 lg:-mx-20 px-6 md:px-12 lg:px-20"
            >
              <div className="flex items-center gap-6 md:gap-10">
                <span className="text-cream-muted">{link.icon}</span>
                <div>
                  <p
                    className="font-serif italic"
                    style={{
                      fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                      lineHeight: 1.0,
                      letterSpacing: "-0.025em",
                      color: "#E8E5D6",
                    }}
                  >
                    {link.label}
                  </p>
                  <p className="mt-2 text-xs md:text-sm text-cream-muted font-mono tracking-wider">
                    {link.detail}
                  </p>
                </div>
              </div>
              <ArrowUpRight
                size={32}
                className="text-cream-muted transition-all duration-300 group-hover:text-cream group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-12"
              />
            </motion.a>
          ))}
        </div>

        {/* Footer chrome — each line lives in a translucent glass pill so
            it stays readable over the video bg. */}
        <div className="mt-20 flex flex-wrap gap-3 md:gap-4 items-center justify-between text-[10px] md:text-xs font-mono uppercase tracking-[0.28em]">
          {[
            { label: "© 2026 Anit Choudhary" },
            { label: "New Delhi · India" },
            { label: "Built with conviction." },
            {
              label: "Source on GitHub →",
              href: "https://github.com/AnitChaudhry/anit-website",
            },
          ].map((item) => {
            const cls =
              "inline-flex items-center rounded-full px-4 py-2 backdrop-blur-md transition-colors hover:bg-white/[0.10]"
            const style = {
              color: "#FFFFFF",
              background: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.10)",
              boxShadow:
                "inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 4px 16px rgba(0, 0, 0, 0.25)",
            } as const
            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cls}
                style={style}
              >
                {item.label}
              </a>
            ) : (
              <span key={item.label} className={cls} style={style}>
                {item.label}
              </span>
            )
          })}
        </div>
      </div>

      <SpunkyMascot />
    </section>
  )
}
