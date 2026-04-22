'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import SceneOverlay from '@/components/ui/SceneOverlay'
import NavDots from '@/components/ui/NavDots'
import SceneLabel from '@/components/ui/SceneLabel'
import { getCurrentSegmentIndex, NUM_SCENES } from '@/lib/scrollChoreography'

// Scene metadata used by <SceneLabel> in the bottom-left chrome.
const sceneLabels = [
  'The Arrival',
  'The World Changing',
  'The Formation',
  'The Ignition',
  'The Frontfoot',
  'The Conviction',
  'The Team',
  'The Product',
  'The Build',
  'The Voice',
  'The Philosophy',
  'The Invitation',
]

// 12 scenes × 100vh each = 1200vh of scrollable height.
// NUM_SCENES is shared with the overlay's choreography so label and overlay stay aligned.
const TOTAL_SCENES = NUM_SCENES

/**
 * The home page is a three-layer composition:
 *
 *   1. Fixed full-screen R3F canvas (z-index 0, pointer-events: none)
 *   2. Fixed HTML overlay layer (z-index 10, pointer-events: none)
 *      — text blocks fade in/out at specific scroll ranges.
 *   3. An invisible tall scroll container (height: 1200vh, z-index 1)
 *      — this is the only element that actually consumes scroll space.
 *
 * Shared state is a single scroll-progress ref (0..1) that both the
 * canvas (camera lerp) and overlay (opacity curves) read from.
 */
export default function Home() {
  // Shared scroll progress (0..1). A ref — mutated every frame, no re-renders.
  const scrollProgressRef = useRef(0)

  // Currently-active scene index, used only for scene label + nav dot state.
  const [currentScene, setCurrentScene] = useState(0)

  useEffect(() => {
    let rafId = 0

    const computeProgress = () => {
      const maxScroll =
        (document.documentElement.scrollHeight || document.body.scrollHeight) -
        window.innerHeight
      const raw = maxScroll > 0 ? window.scrollY / maxScroll : 0
      const clamped = Math.min(Math.max(raw, 0), 1)
      scrollProgressRef.current = clamped

      // Use the same segmentation as SceneOverlay so label/overlay agree
      // on which scene is currently "active" (fixes voice/philosophy bleed).
      const active = getCurrentSegmentIndex(clamped)
      setCurrentScene((prev) => (prev === active ? prev : active))
    }

    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        computeProgress()
        rafId = 0
      })
    }

    // Prime immediately so a refresh mid-page renders correctly.
    computeProgress()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', computeProgress)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', computeProgress)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Nav-dot click → scroll to the scene's stop-zone center (localT = 0.5
  // within the segment). Matches the overlay's dwell phase so text is
  // fully visible when the user lands.
  const navigateTo = useCallback((idx: number) => {
    const target = Math.min(Math.max(idx, 0), TOTAL_SCENES - 1)
    const maxScroll =
      (document.documentElement.scrollHeight || document.body.scrollHeight) -
      window.innerHeight
    const normalized = (target + 0.5) / TOTAL_SCENES
    window.scrollTo({ top: normalized * maxScroll, behavior: 'smooth' })
  }, [])

  return (
    <main style={{ background: 'var(--bg)', position: 'relative' }}>
      {/* Layer 1 — Fixed backdrop. Subtle radial gradient, no 3D.
          Next session will replace this with one full-bleed image per scene
          (see NEXT_SESSION.md). */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(108,99,255,0.08), transparent 60%), ' +
            'radial-gradient(ellipse at 70% 80%, rgba(0,212,255,0.06), transparent 55%), ' +
            'var(--bg)',
        }}
      />

      {/* Layer 2 — Fixed HTML overlay. Text fades in/out per scene. */}
      <SceneOverlay scrollProgressRef={scrollProgressRef} />

      {/* Fixed UI chrome — scene label (bottom-left) + nav dots (right) */}
      <SceneLabel
        number={currentScene + 1}
        title={sceneLabels[currentScene]}
      />
      <NavDots current={currentScene} onNav={navigateTo} />

      {/* Layer 3 — Invisible tall scroll container.
          This is what actually provides scroll height; everything else is fixed. */}
      <div
        aria-hidden="true"
        style={{
          position: 'relative',
          width: '100%',
          height: `${TOTAL_SCENES * 100}vh`,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
    </main>
  )
}
