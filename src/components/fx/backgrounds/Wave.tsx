"use client"
import { useRef } from "react"
import { useAmbientCanvas } from "../useAmbientCanvas"

/**
 * Wave — 4 stacked flowing wave layers filled with indigo gradients.
 * Lifted from UpfynAI LoginPage variant 3, recolored to indigo.
 */
export default function Wave({ opacity = 0.7 }: { opacity?: number }) {
  const tRef = useRef(0)
  const canvasRef = useAmbientCanvas((ctx, w, h) => {
    ctx.clearRect(0, 0, w, h)
    tRef.current += 0.004
    const t = tRef.current
    for (let layer = 0; layer < 4; layer++) {
      const offset = layer * 0.9
      const alpha = 0.14 - layer * 0.025
      ctx.beginPath()
      ctx.moveTo(0, h)
      for (let x = 0; x <= w; x += 3) {
        const y =
          h * (0.35 + layer * 0.1) +
          Math.sin(x * 0.003 + t + offset) * 90 +
          Math.sin(x * 0.007 + t * 1.3 + offset) * 50 +
          Math.cos(x * 0.002 + t * 0.7 + offset) * 70
        ctx.lineTo(x, y)
      }
      ctx.lineTo(w, h)
      ctx.closePath()
      const grad = ctx.createLinearGradient(0, h * 0.2, w, h * 0.8)
      grad.addColorStop(0, `rgba(124, 139, 227, ${alpha})`)
      grad.addColorStop(0.5, `rgba(155, 170, 240, ${alpha * 1.3})`)
      grad.addColorStop(1, `rgba(108, 122, 201, ${alpha})`)
      ctx.fillStyle = grad
      ctx.fill()
    }
  })

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
