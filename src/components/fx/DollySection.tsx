"use client"
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import { useRef } from "react"

/**
 * Wraps a section with scroll-driven scale + opacity so it feels like a
 * camera dollying through it. Off-screen above and below, the section sits
 * slightly back (scale 0.92, opacity 0.5); centered, it's at full presence
 * (1.0 / 1.0); leaving, it recedes a touch (0.96 / 0.7).
 *
 * Auto-disables for prefers-reduced-motion and on small viewports
 * (where the effect is more jitter than depth).
 */
export default function DollySection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  // Track this element's progress through the viewport (0 entering bottom → 1 exiting top)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Opacity-only camera-approach feel. Scale was causing a visible
  // hairline between sections (the wrapped section painted slightly
  // smaller than its layout box, exposing body bg at section edges).
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.65, 1, 1, 0.8])

  if (reduce) {
    return <div ref={ref}>{children}</div>
  }

  return (
    <motion.div ref={ref} style={{ opacity, willChange: "opacity" }}>
      {children}
    </motion.div>
  )
}
