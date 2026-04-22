'use client'
import {
  useEffect,
  useRef,
  type CSSProperties,
  type MutableRefObject,
} from 'react'
import { getSceneOpacity, NUM_SCENES } from '@/lib/scrollChoreography'

type ScrollRef = MutableRefObject<number>

type PostCard = {
  file: string
  caption: string
  reactions: string
  impressions: string
}

type CTA = {
  label: string
  href: string
  accent?: 'purple' | 'cyan' | 'gold'
}

type SceneContent = {
  eyebrow?: string
  headline: string
  sub?: string
  accent?: 'purple' | 'cyan' | 'gold'
  position: CSSProperties
  align?: 'left' | 'right' | 'center'
  /** If true, block captures pointer events so links/buttons work */
  interactive?: boolean
  cta?: CTA[]
  postCards?: PostCard[]
  /** Show profile photo inline (Scene 01) */
  showPhoto?: boolean
}

const SCENES: SceneContent[] = [
  // 01 Arrival
  {
    eyebrow: 'Anit Choudhary',
    headline: 'AI Product Manager',
    sub: 'Generative AI · Agentic Systems\nEvery wave changed the world. He was already on it.',
    accent: 'cyan',
    align: 'left',
    showPhoto: true,
    position: {
      top: '50%',
      left: '6vw',
      transform: 'translateY(-50%)',
      maxWidth: '46ch',
    },
  },
  // 02 World Changing
  {
    eyebrow: 'The World Changing',
    headline: 'The world has changed\nmultiple times',
    sub: 'And each time —\nhe was already on it.',
    accent: 'purple',
    align: 'left',
    position: { top: '20vh', left: '6vw', maxWidth: '42ch' },
  },
  // 03 Formation
  {
    eyebrow: 'The Formation',
    headline: 'Institute of Management Studies, Noida',
    sub: 'Where business thinking met the edge of technology.',
    accent: 'gold',
    align: 'right',
    position: { bottom: '14vh', right: '6vw', maxWidth: '44ch' },
  },
  // 04 Ignition
  {
    eyebrow: 'November 2022',
    headline: 'The ignition moment.',
    sub: 'ChatGPT launched.\n"This is the wave. Get on it. Now."',
    accent: 'gold',
    align: 'center',
    position: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '50ch',
      textAlign: 'center',
    },
  },
  // 05 Frontfoot
  {
    eyebrow: 'The Frontfoot',
    headline: "Frontfoot isn't speed.\nIt's attention.",
    sub: "Reading what hasn't been named yet.",
    accent: 'cyan',
    align: 'right',
    position: {
      top: '50%',
      right: '6vw',
      transform: 'translateY(-50%)',
      maxWidth: '42ch',
    },
  },
  // 06 Conviction
  {
    eyebrow: 'The Conviction',
    headline: '"The barrier was never intelligence."',
    sub: 'It was always accessibility.',
    accent: 'purple',
    align: 'left',
    position: { bottom: '16vh', left: '6vw', maxWidth: '46ch' },
  },
  // 07 Team
  {
    eyebrow: 'The Team',
    headline: 'OpenAnalyst Inc.',
    sub: "He didn't just watch the wave.\nHe joined the team building the board.",
    accent: 'cyan',
    align: 'left',
    position: { top: '22vh', left: '6vw', maxWidth: '44ch' },
  },
  // 08 Product
  {
    eyebrow: 'The Product',
    headline: 'No complex setup.\nNo overwhelming dashboards.',
    sub: 'Just clarity.\n5 AI agents. One command.',
    accent: 'gold',
    align: 'right',
    position: {
      top: '50%',
      right: '6vw',
      transform: 'translateY(-50%)',
      maxWidth: '44ch',
    },
  },
  // 09 Build
  {
    eyebrow: 'The Build',
    headline: 'Before most teams knew what MCP was —',
    sub: 'he was building with it.',
    accent: 'purple',
    align: 'left',
    position: { bottom: '18vh', left: '6vw', maxWidth: '46ch' },
  },
  // 10 Voice — headline left, post cards to the right
  {
    eyebrow: 'The Voice',
    headline: '11,685 followers.',
    sub: 'While the wave was forming —\nhe was already writing about where it goes.',
    accent: 'cyan',
    align: 'left',
    position: {
      top: '50%',
      left: '6vw',
      transform: 'translateY(-50%)',
      maxWidth: '90vw',
    },
    postCards: [
      { file: '/posts/post-01.png', caption: 'Claude Opus 4.7 — more than a routine refresh', reactions: '9+', impressions: '440' },
      { file: '/posts/post-02.png', caption: "Smart people can't work together — rethink coordination", reactions: '12', impressions: '389' },
      { file: '/posts/post-03.png', caption: "The next software wave isn't built by humans just for humans", reactions: '22', impressions: '612' },
      { file: '/posts/post-04.png', caption: '10x Dev Team — ships end-to-end', reactions: '5', impressions: '460' },
      { file: '/posts/post-05.png', caption: "OpenAnalyst — Let's build something extraordinary", reactions: '175', impressions: '839' },
    ],
  },
  // 11 Philosophy
  {
    eyebrow: 'The Philosophy',
    headline: "Smart people can't work together easily.",
    sub: "The leader's real work is turning individual brilliance\ninto collective execution.",
    accent: 'purple',
    align: 'left',
    position: { top: '24vh', left: '6vw', maxWidth: '50ch' },
  },
  // 12 Invitation — interactive so CTA links work
  {
    eyebrow: 'The Invitation',
    headline: 'Every wave changed everything.',
    sub: "The next layer of the stack is being built right now.\nLet's shape it together.",
    accent: 'gold',
    align: 'center',
    interactive: true,
    cta: [
      { label: 'Connect on LinkedIn', href: 'https://www.linkedin.com/in/anitchoudhary/', accent: 'cyan' },
      { label: 'View OpenAnalyst', href: 'https://openanalyst.com', accent: 'gold' },
      { label: 'Send Email', href: 'mailto:tools@openanalyst.com', accent: 'purple' },
    ],
    position: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '56ch',
      textAlign: 'center',
    },
  },
]

const TOTAL = SCENES.length
if (TOTAL !== NUM_SCENES) {
  // Guardrail: SCENES array length must match the choreography constant.
  // If this ever fires in dev, update NUM_SCENES in src/lib/scrollChoreography.ts.
  console.warn(`SceneOverlay: SCENES has ${TOTAL} entries but choreography expects ${NUM_SCENES}`)
}

const ACCENT_COLORS: Record<NonNullable<SceneContent['accent']>, string> = {
  purple: 'var(--accent)',
  cyan: 'var(--accent2)',
  gold: 'var(--gold)',
}

export default function SceneOverlay({
  scrollProgressRef,
}: {
  scrollProgressRef: ScrollRef
}) {
  const blockRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let rafId = 0
    let running = true

    const tick = () => {
      if (!running) return
      const progress = scrollProgressRef.current
      for (let i = 0; i < TOTAL; i++) {
        const el = blockRefs.current[i]
        if (!el) continue
        const op = getSceneOpacity(progress, i)
        const rounded = Math.round(op * 1000) / 1000
        if (el.dataset.op !== String(rounded)) {
          el.style.opacity = String(rounded)
          el.style.visibility = rounded > 0.001 ? 'visible' : 'hidden'
          el.dataset.op = String(rounded)
        }
      }
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      running = false
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [scrollProgressRef])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      {SCENES.map((scene, i) => {
        const accentColor = ACCENT_COLORS[scene.accent ?? 'cyan']
        const textAlign: CSSProperties['textAlign'] =
          scene.align === 'center'
            ? 'center'
            : scene.align === 'right'
              ? 'right'
              : 'left'

        return (
          <div
            key={i}
            ref={(el) => { blockRefs.current[i] = el }}
            style={{
              position: 'absolute',
              opacity: 0,
              visibility: 'hidden',
              willChange: 'opacity',
              color: 'var(--text)',
              textAlign,
              transition: 'opacity 120ms linear, visibility 120ms linear',
              pointerEvents: scene.interactive ? 'auto' : 'none',
              ...scene.position,
            }}
          >
            {/* Profile photo — Scene 01 only */}
            {scene.showPhoto && (
              <div style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                overflow: 'hidden',
                border: `2px solid ${accentColor}`,
                marginBottom: '1.5rem',
                boxShadow: `0 0 20px ${accentColor}55`,
              }}>
                <img
                  src="/profile/anit.jpg"
                  alt="Anit Choudhary"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            )}

            {scene.eyebrow && (
              <div
                style={{
                  fontSize: '0.72rem',
                  fontFamily: 'monospace',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: accentColor,
                  marginBottom: '1rem',
                  fontWeight: 700,
                }}
              >
                {scene.eyebrow}
              </div>
            )}

            <h2
              style={{
                fontSize: 'clamp(2.2rem, 5.2vw, 4.6rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                marginBottom: scene.sub ? '1.25rem' : 0,
                whiteSpace: 'pre-line',
                background: `linear-gradient(135deg, var(--text), ${accentColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {scene.headline}
            </h2>

            {scene.sub && (
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.7vw, 1.3rem)',
                  lineHeight: 1.65,
                  color: 'var(--muted)',
                  whiteSpace: 'pre-line',
                  fontWeight: 400,
                  marginBottom: scene.postCards || scene.cta ? '2rem' : 0,
                }}
              >
                {scene.sub}
              </p>
            )}

            {/* Post cards — Scene 10 */}
            {scene.postCards && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 150px)',
                gap: '0.75rem',
                marginTop: '0.5rem',
              }}>
                {scene.postCards.map((p, pi) => (
                  <div
                    key={pi}
                    style={{
                      borderRadius: 10,
                      overflow: 'hidden',
                      border: '1px solid rgba(108,99,255,0.25)',
                      background: 'rgba(0,0,0,0.4)',
                      backdropFilter: 'blur(8px)',
                      transform: `rotate(${([-1.8, 0.8, -0.4, 1.2, -1.0])[pi]}deg)`,
                    }}
                  >
                    <img
                      src={p.file}
                      alt={p.caption}
                      style={{ width: '100%', display: 'block' }}
                    />
                    <div style={{ padding: '0.5rem 0.6rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.65rem', color: 'var(--accent2)' }}>
                          👍 {p.reactions}
                        </span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>
                          📊 {p.impressions}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA buttons — Scene 12 */}
            {scene.cta && (
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                justifyContent: scene.align === 'center' ? 'center' : 'flex-start',
                marginTop: '0.5rem',
              }}>
                {scene.cta.map((btn, bi) => {
                  const btnColor = ACCENT_COLORS[btn.accent ?? 'cyan']
                  return (
                    <a
                      key={bi}
                      href={btn.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        padding: '0.6rem 1.4rem',
                        borderRadius: 999,
                        border: `1px solid ${btnColor}`,
                        color: btnColor,
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        textDecoration: 'none',
                        background: `${btnColor}15`,
                        backdropFilter: 'blur(8px)',
                        transition: 'background 0.2s, box-shadow 0.2s',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={e => {
                        const t = e.currentTarget as HTMLAnchorElement
                        t.style.background = `${btnColor}30`
                        t.style.boxShadow = `0 0 20px ${btnColor}55`
                      }}
                      onMouseLeave={e => {
                        const t = e.currentTarget as HTMLAnchorElement
                        t.style.background = `${btnColor}15`
                        t.style.boxShadow = 'none'
                      }}
                    >
                      {btn.label}
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
