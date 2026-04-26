"use client"
import { useEffect, useRef } from "react"

type Props = {
  /** Tailwind / inline classes for the wrapping container. */
  className?: string
  /** Base color used for dots (rgb triplet). */
  color?: [number, number, number]
  /** Density divisor — bigger = fewer dots. Default 24000. */
  density?: number
  /** Max distance to draw a connecting line between two particles. */
  connectDist?: number
  /** Overall canvas opacity. */
  opacity?: number
}

/**
 * Lightweight ambient canvas — drifting dots with proximity lines.
 * Single rAF loop, no React renders, ~60 lines of paint code.
 *
 * Inspired by the Glass / Constellation backgrounds in the user's
 * UpfynAI LoginPage — but recolored to the site's indigo accent so
 * the motion reads as part of the same visual world.
 */
export default function ConstellationField({
  className = "",
  color = [124, 139, 227],
  density = 24000,
  connectDist = 140,
  opacity = 0.55,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = 0,
      h = 0
    type P = { x: number; y: number; vx: number; vy: number; r: number }
    let particles: P[] = []
    const colorTuple = `${color[0]},${color[1]},${color[2]}`
    const connectSq = connectDist * connectDist

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(90, Math.floor((w * h) / density) + 18)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
      }))
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < connectSq) {
            const a = (1 - d2 / connectSq) * 0.18
            ctx.strokeStyle = `rgba(${colorTuple},${a})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${colorTuple},0.55)`
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [color, density, connectDist])

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ opacity }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
