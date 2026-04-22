'use client'

const waves = [
  { era: '1995', label: 'The Internet', desc: 'Rewired connection', color: '#6c63ff' },
  { era: '2007', label: 'Mobile', desc: 'Rewired access', color: '#00d4ff' },
  { era: '2012', label: 'Cloud & Big Data', desc: 'Rewired scale', color: '#f5a623' },
  { era: '2017', label: 'Machine Learning', desc: 'Rewired prediction', color: '#6c63ff' },
  { era: '2022', label: 'Generative AI', desc: 'Rewired intelligence', color: '#00d4ff' },
  { era: 'Now', label: 'Agentic Systems', desc: 'Rewiring software itself', color: '#f5a623' },
]

export default function Scene02WorldChanging() {
  return (
    <section className="scene content-layer" style={{ minHeight: '100vh', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 1000, width: '100%' }}>
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h2 className="headline" style={{ marginBottom: '1rem' }}>
            He watched every<br />
            <span className="accent-text">wave come in.</span>
          </h2>
          <p className="subhead">Not from shore. From inside it.</p>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'linear-gradient(180deg, var(--accent), var(--accent2), transparent)',
            transform: 'translateX(-50%)',
          }} />

          {waves.map((w, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
              marginBottom: '3rem',
              position: 'relative',
            }}>
              <div style={{
                width: '44%',
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${w.color}33`,
                borderRadius: 16,
                padding: '1.5rem 2rem',
                position: 'relative',
                boxShadow: `0 0 30px ${w.color}15`,
              }}>
                <div style={{ fontSize: '0.75rem', color: w.color, fontWeight: 700, letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
                  {w.era}
                </div>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.3rem' }}>
                  {w.label}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{w.desc}</div>

                {/* Node dot on timeline */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  [i % 2 === 0 ? 'right' : 'left']: '-2.5rem',
                  transform: 'translateY(-50%)',
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: w.color,
                  boxShadow: `0 0 12px ${w.color}`,
                }} />
              </div>
            </div>
          ))}
        </div>

        <p className="subhead" style={{ textAlign: 'center', marginTop: '2rem' }}>
          And every single time —{' '}
          <span style={{ color: 'var(--text)', fontWeight: 600 }}>he wasn&apos;t watching from shore.</span>
        </p>
      </div>
    </section>
  )
}
