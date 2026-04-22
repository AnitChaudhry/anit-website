'use client'

export default function Scene06Conviction() {
  return (
    <section className="scene content-layer" style={{ minHeight: '100vh', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 800, width: '100%', textAlign: 'center' }}>
        <p className="subhead" style={{ marginBottom: '1rem' }}>The noise faded. One truth remained.</p>

        <div style={{
          background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(0,212,255,0.06))',
          border: '1px solid rgba(108,99,255,0.3)',
          borderRadius: 24,
          padding: '4rem 3rem',
          marginBottom: '3rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(108,99,255,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            color: 'var(--text)',
            marginBottom: '1.5rem',
          }}>
            &ldquo;The barrier was never<br />
            <span className="accent-text">intelligence.</span>
          </h2>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            color: 'var(--text)',
          }}>
            It was always<br />
            <span className="gold-text">accessibility.&rdquo;</span>
          </h2>
        </div>

        <p className="subhead">
          Whoever removes that barrier — owns the next decade.<br />
          <span style={{ color: 'var(--text)', fontWeight: 600 }}>That became the mission.</span>
        </p>

        <div style={{
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          marginTop: '3rem',
          flexWrap: 'wrap',
        }}>
          {[
            { num: '11,685', label: 'Followers Listening' },
            { num: '∞', label: 'People Who Deserve Access' },
            { num: '1', label: 'Core Conviction' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--accent2)' }}>{s.num}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.3rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
