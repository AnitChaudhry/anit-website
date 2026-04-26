"use client"
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"

/**
 * Giant "Anit" wordmark fixed behind every section, rotating in 3D
 * (rotateY around the vertical axis with perspective) as the user scrolls.
 *
 * Hidden during the Hero (which has its own static giant "A"). The
 * wordmark fades in once the scroll passes Hero, then continues its
 * 3D spin across the rest of the page.
 *
 * Because scrollYProgress is reactive to scroll, scrolling up reduces
 * progress → reverses the rotation naturally.
 */
export default function RotatingWordmark() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  // One full Y-axis revolution across the full page scroll. Forward on
  // scroll-down, naturally reverses on scroll-up.
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360])
  // Gradual fade-in across the elastic Hero→Journey transition. Stays
  // invisible during Hero (0..6%), then ramps up smoothly until ~22% so
  // it appears subtly as the user scrolls into the rest of the page.
  const opacity = useTransform(scrollYProgress, [0.06, 0.22], [0, 1])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden"
      style={{ perspective: "1400px" }}
    >
      <motion.span
        style={{
          rotateY: reduce ? 0 : rotateY,
          opacity: reduce ? 1 : opacity,
          fontFamily: "var(--font-instrument-serif), Georgia, serif",
          fontStyle: "italic",
          fontSize: "min(40vw, 75vh)",
          color: "rgba(232, 229, 214, 0.0565)",
          letterSpacing: "-0.04em",
          lineHeight: 0.85,
          fontWeight: 400,
          willChange: "transform, opacity",
          userSelect: "none",
          transformStyle: "preserve-3d",
          backfaceVisibility: "visible",
        }}
        className="block select-none"
      >
        Anit
      </motion.span>
    </div>
  )
}
