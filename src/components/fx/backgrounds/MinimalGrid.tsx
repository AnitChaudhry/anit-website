"use client"
import { useRef } from "react"
import { useAmbientCanvas } from "../useAmbientCanvas"

type Cross = {
  x: number; y: number; size: number;
  dx: number; dy: number;
  alpha: number; rotation: number; rotSpeed: number;
}

/**
 * Minimal Grid — a sparse field of slowly drifting + rotating crosshair
 * marks layered over a faint dot grid. Subtle, doesn't compete.
 * Lifted from UpfynAI LoginPage variant 2, recolored to cream/indigo.
 */
export default function MinimalGrid({ opacity = 0.65 }: { opacity?: number }) {
  const ref = useRef<{ crosses: Cross[] }>({ crosses: [] })

  const canvasRef = useAmbientCanvas(
    (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h)
      for (const c of ref.current.crosses) {
        c.x += c.dx; c.y += c.dy; c.rotation += c.rotSpeed
        if (c.x < -50) c.x = w + 50
        if (c.x > w + 50) c.x = -50
        if (c.y < -50) c.y = h + 50
        if (c.y > h + 50) c.y = -50
        ctx.save()
        ctx.translate(c.x, c.y)
        ctx.rotate(c.rotation)
        ctx.strokeStyle = `rgba(124, 139, 227, ${c.alpha})`
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.moveTo(-c.size, 0); ctx.lineTo(c.size, 0)
        ctx.moveTo(0, -c.size); ctx.lineTo(0, c.size)
        ctx.stroke()
        ctx.restore()
      }
    },
    (w, h) => {
      const count = Math.max(8, Math.round((w * h) / 80000))
      ref.current.crosses = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: 14 + Math.random() * 22,
        dx: (Math.random() - 0.5) * 0.18,
        dy: (Math.random() - 0.5) * 0.18,
        alpha: 0.07 + Math.random() * 0.10,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.0028,
      }))
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
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(232,229,214,0.45) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  )
}
