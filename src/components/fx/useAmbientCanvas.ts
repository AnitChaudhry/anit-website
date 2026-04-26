"use client"
import { useEffect, useRef } from "react"

/**
 * Mounts a canvas, runs a draw loop, and pauses the rAF when off-screen.
 * The `draw` callback receives (ctx, w, h, t) and is called every frame
 * the canvas is in view.
 *
 * Returns the ref to attach to a <canvas>.
 */
export function useAmbientCanvas(
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void,
  /** Optional setup hook fired on resize — use to seed particles. */
  setup?: (w: number, h: number) => void,
) {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number>(0)
  const visibleRef = useRef<boolean>(true)
  // Stable callbacks across renders.
  const drawFn = useRef(draw)
  const setupFn = useRef(setup)
  useEffect(() => {
    drawFn.current = draw
    setupFn.current = setup
  })

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0,
      h = 0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth || canvas.parentElement?.clientWidth || window.innerWidth
      h = canvas.clientHeight || canvas.parentElement?.clientHeight || window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      setupFn.current?.(w, h)
    }

    const tick = (t: number) => {
      if (visibleRef.current) {
        drawFn.current(ctx, w, h, t)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    // Pause rAF when off-screen.
    const io = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries[0]?.isIntersecting ?? true
      },
      { rootMargin: "20%" },
    )
    io.observe(canvas)

    resize()
    window.addEventListener("resize", resize, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("resize", resize)
      io.disconnect()
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return ref
}
