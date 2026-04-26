"use client"
import { useRef } from "react"
import { useAmbientCanvas } from "../useAmbientCanvas"

type Bubble = {
  x: number; y: number; r: number;
  dx: number; dy: number;
  alpha: number; pulse: number;
}

/**
 * Glass Particles — small/medium/large bubbles floating upward with
 * subtle pulsing alpha + connecting lines between nearby small ones.
 * Lifted from UpfynAI LoginPage variant 1, recolored to indigo.
 */
export default function GlassParticles({ opacity = 0.85 }: { opacity?: number }) {
  const ref = useRef<{ w: number; h: number; bubbles: Bubble[] }>({ w: 0, h: 0, bubbles: [] })

  const canvasRef = useAmbientCanvas(
    (ctx, w, h) => {
      ref.current.w = w; ref.current.h = h
      ctx.clearRect(0, 0, w, h)
      const bubbles = ref.current.bubbles
      for (const b of bubbles) {
        b.x += b.dx; b.y += b.dy; b.pulse += 0.01
        if (b.y + b.r < 0) { b.y = h + b.r; b.x = Math.random() * w }
        if (b.x < -b.r) b.x = w + b.r
        if (b.x > w + b.r) b.x = -b.r
        const pulseAlpha = b.alpha * (0.7 + 0.3 * Math.sin(b.pulse))
        if (b.r > 8) {
          const grad = ctx.createRadialGradient(b.x, b.y, b.r * 0.3, b.x, b.y, b.r * 1.8)
          grad.addColorStop(0, `rgba(124, 139, 227, ${pulseAlpha * 0.5})`)
          grad.addColorStop(1, "rgba(124, 139, 227, 0)")
          ctx.beginPath()
          ctx.arc(b.x, b.y, b.r * 1.8, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()
        }
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(124, 139, 227, ${pulseAlpha})`
        ctx.fill()
        if (b.r > 5) {
          ctx.beginPath()
          ctx.arc(b.x - b.r * 0.25, b.y - b.r * 0.25, b.r * 0.3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(220, 225, 255, ${pulseAlpha * 0.4})`
          ctx.fill()
        }
      }
      // proximity lines between small bubbles
      for (let i = 0; i < bubbles.length; i++) {
        if (bubbles[i].r > 14) continue
        for (let j = i + 1; j < bubbles.length; j++) {
          if (bubbles[j].r > 14) continue
          const dx = bubbles[i].x - bubbles[j].x
          const dy = bubbles[i].y - bubbles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            ctx.beginPath()
            ctx.moveTo(bubbles[i].x, bubbles[i].y)
            ctx.lineTo(bubbles[j].x, bubbles[j].y)
            ctx.strokeStyle = `rgba(124, 139, 227, ${0.15 * (1 - dist / 130)})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }
    },
    (w, h) => {
      const count = Math.floor((w * h) / 22000) + 18
      ref.current.bubbles = Array.from({ length: count }, () => {
        const sizeRoll = Math.random()
        let r: number
        if (sizeRoll < 0.55) r = 2 + Math.random() * 4
        else if (sizeRoll < 0.85) r = 6 + Math.random() * 12
        else r = 16 + Math.random() * 22
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r,
          dx: (Math.random() - 0.5) * 0.4,
          dy: -(0.15 + Math.random() * 0.5),
          alpha: r > 14 ? 0.05 + Math.random() * 0.05 : r > 5 ? 0.10 + Math.random() * 0.13 : 0.22 + Math.random() * 0.35,
          pulse: Math.random() * Math.PI * 2,
        }
      })
    },
  )

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        opacity,
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
