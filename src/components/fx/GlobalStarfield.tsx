"use client"
import { useEffect, useRef } from "react"

interface Star {
  x: number; y: number; r: number;
  a: number;
  phase: number;
  speed: number;
}

const STAR_DENSITY = 1 / 2400
const CURSOR_RADIUS = 220
const CURSOR_SPEED_BOOST = 7
const CURSOR_BRIGHT_BOOST = 0.7

/**
 * Cursor-reactive starfield as a fixed full-viewport background.
 * Lifted from CharClaw's Starfield. Tracks `mousemove` on the window
 * (so the cursor effect works no matter which section is in view) and
 * brightens / accelerates twinkle for stars within CURSOR_RADIUS px.
 */
export default function GlobalStarfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const starsRef = useRef<Star[]>([])
  const cursorRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -10000, y: -10000, active: false,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0

    const seedStars = () => {
      const count = Math.max(160, Math.round(w * h * STAR_DENSITY))
      const stars: Star[] = []
      for (let i = 0; i < count; i++) {
        const big = Math.random() < 0.08
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: big ? Math.random() * 1.1 + 1.0 : Math.random() * 0.8 + 0.3,
          a: Math.random() * 0.55 + 0.3,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.0007 + 0.0002,
        })
      }
      starsRef.current = stars
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seedStars()
    }

    const onMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX
      cursorRef.current.y = e.clientY
      cursorRef.current.active = true
    }
    const onLeave = () => { cursorRef.current.active = false }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const { x: cx, y: cy, active } = cursorRef.current
      const R2 = CURSOR_RADIUS * CURSOR_RADIUS
      ctx.fillStyle = "rgba(232,229,214,1)"
      for (const s of starsRef.current) {
        let prox = 0
        if (active) {
          const dx = s.x - cx
          const dy = s.y - cy
          const d2 = dx * dx + dy * dy
          if (d2 < R2) {
            const k = 1 - Math.sqrt(d2) / CURSOR_RADIUS
            prox = k * k
          }
        }
        const speed = s.speed * (1 + prox * (CURSOR_SPEED_BOOST - 1))
        const wobble = (Math.sin(s.phase + t * speed) + 1) / 2
        const baseAlpha = s.a * (0.45 + 0.55 * wobble)
        const alpha = Math.min(1, baseAlpha + prox * CURSOR_BRIGHT_BOOST)
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener("resize", resize, { passive: true })
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseleave", onLeave, { passive: true })
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  )
}
