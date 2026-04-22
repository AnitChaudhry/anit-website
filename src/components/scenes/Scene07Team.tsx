'use client'

export default function Scene07Team() {
  return (
    <section className="scene content-layer" style={{ minHeight: '100vh', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 900, width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.25em', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 600 }}>
              OpenAnalyst Inc.
            </span>
            <h2 className="headline" style={{ margin: '1rem 0 1.5rem' }}>
              He didn&apos;t just<br />
              watch the wave.<br />
              <span className="accent-text">He joined the team</span><br />
              building the board.
            </h2>
            <p className="subhead" style={{ marginBottom: '2rem' }}>
              AI Product Manager. Core team. Inside the engine room.
              Driving strategy and product for the platform removing the barrier.
            </p>
            <a
              href="https://openanalyst.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.8rem 2rem',
                borderRadius: 999,
                background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
              }}
            >
              Visit OpenAnalyst ↗
            </a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { icon: '🤖', title: 'AI Product Manager', desc: 'Translating vision into product — roadmaps, priorities, and execution' },
              { icon: '🎯', title: 'Core Team', desc: 'Not on the sidelines. At the table where decisions are made' },
              { icon: '📊', title: 'Data Democratization', desc: 'Making AI-powered analytics accessible to everyone, not just engineers' },
            ].map(item => (
              <div key={item.title} style={{
                background: 'rgba(108,99,255,0.06)',
                border: '1px solid rgba(108,99,255,0.2)',
                borderRadius: 16,
                padding: '1.5rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
              }}>
                <span style={{ fontSize: '1.8rem' }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '0.3rem' }}>{item.title}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
