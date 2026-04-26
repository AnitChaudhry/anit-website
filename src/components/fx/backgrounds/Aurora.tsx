"use client"
import { useRef } from "react"
import { useAmbientCanvas } from "../useAmbientCanvas"

/**
 * Aurora — 5 flowing horizontal bands sweeping across the section.
 * Lifted from UpfynAI LoginPage variant 4, recolored to indigo.
 */
export default function Aurora({ opacity = 0.85 }: { opacity?: number }) {
  const tRef = useRef(0)
  const canvasRef = useAmbientCanvas((ctx, w, h) => {
    ctx.clearRect(0, 0, w, h)
    tRef.current += 0.003
    const t = tRef.current
    for (let band = 0; band < 5; band++) {
      const baseY = h * (0.15 + band * 0.16)
      ctx.beginPath()
      for (let x = 0; x <= w; x += 3) {
        const wave1 = Math.sin(x * 0.004 + t * (1 + band * 0.3)) * 60
        const wave2 = Math.cos(x * 0.002 + t * 0.8 + band) * 40
        const wave3 = Math.sin(x * 0.001 + t * 0.5 + band * 2) * 25
        const y = baseY + wave1 + wave2 + wave3
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.lineWidth = 50 + band * 15
      const alpha = 0.10 - band * 0.012
      // hue 220-260 = indigo→violet range
      const hue = 224 + band * 6
      ctx.strokeStyle = `hsla(${hue}, 70%, 65%, ${alpha})`
      ctx.lineCap = "round"
      ctx.stroke()
      ctx.lineWidth = 3 + band
      ctx.strokeStyle = `hsla(${hue}, 80%, 78%, ${alpha * 2.5})`
      ctx.stroke()
    }
  })

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0" style={{ opacity }}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
