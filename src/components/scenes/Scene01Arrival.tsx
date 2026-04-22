'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Scene01Arrival() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current.querySelectorAll('.reveal'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out', delay: 0.3 }
    )
  }, [])

  return (
    <section className="scene content-layer" style={{ minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', maxWidth: 900, padding: '0 2rem' }}>
        {/* Profile photo */}
        <div className="reveal" style={{ marginBottom: '2rem' }}>
          <div style={{
            width: 140,
            height: 140,
            borderRadius: '50%',
            margin: '0 auto',
            overflow: 'hidden',
            border: '3px solid transparent',
            backgroundImage: 'linear-gradient(var(--bg), var(--bg)), linear-gradient(135deg, var(--accent), var(--accent2))',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: '0 0 40px rgba(108,99,255,0.4)',
            position: 'relative',
          }}>
            <img
              src="/profile/anit.jpg"
              alt="Anit Choudhary"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>
        </div>

        <div className="reveal" style={{ marginBottom: '1rem' }}>
          <span style={{
            fontSize: '0.85rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--accent2)',
            fontWeight: 600,
          }}>
            AI Product Manager · Generative AI · Agentic Systems
          </span>
        </div>

        <h1 className="headline reveal" style={{ marginBottom: '1.5rem' }}>
          <span className="accent-text">Anit</span>{' '}
          <span style={{ color: 'var(--text)' }}>Choudhary</span>
        </h1>

        <p className="subhead reveal" style={{ maxWidth: 620, margin: '0 auto 2.5rem' }}>
          Every wave changed the world.<br />
          <span style={{ color: 'var(--text)' }}>He was already on it.</span>
        </p>

        <div className="reveal" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['11,685 Followers', 'OpenAnalyst Inc.', 'IMS Noida'].map(tag => (
            <span key={tag} style={{
              padding: '0.5rem 1.2rem',
              borderRadius: 999,
              border: '1px solid rgba(108,99,255,0.4)',
              fontSize: '0.85rem',
              color: 'var(--muted)',
              background: 'rgba(108,99,255,0.08)',
            }}>{tag}</span>
          ))}
        </div>

        <div className="reveal" style={{ marginTop: '4rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--muted)',
            fontSize: '0.8rem',
            animation: 'bounce 2s infinite',
          }}>
            <span>Scroll to explore</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(6px); opacity: 1; }
        }
      `}</style>
    </section>
  )
}
