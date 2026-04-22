'use client'

export default function Scene04Ignition() {
  return (
    <section className="scene content-layer" style={{ minHeight: '100vh', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 900, width: '100%', textAlign: 'center' }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(0,212,255,0.08)',
          border: '1px solid rgba(0,212,255,0.3)',
          borderRadius: 999,
          padding: '0.5rem 1.5rem',
          fontSize: '0.8rem',
          color: 'var(--accent2)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontWeight: 600,
          marginBottom: '2rem',
        }}>
          November 2022
        </div>

        <h2 className="headline" style={{ marginBottom: '1.5rem' }}>
          The{' '}<span className="accent-text">ignition</span><br />
          moment.
        </h2>

        <p className="subhead" style={{ maxWidth: 600, margin: '0 auto 3rem' }}>
          ChatGPT launched. The world said: <em>&ldquo;Interesting.&rdquo;</em><br />
          <span style={{ color: 'var(--text)', fontWeight: 600 }}>He said: &ldquo;This is the wave. Get on it. Now.&rdquo;</span>
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          maxWidth: 800,
          margin: '0 auto',
        }}>
          {[
            { icon: '⚡', label: 'LLMs', desc: 'Language models that reason, write, and code' },
            { icon: '🤖', label: 'Agents', desc: 'AI that takes actions, not just answers' },
            { icon: '🔗', label: 'Agentic Workflows', desc: 'Multi-step tasks running autonomously' },
          ].map(item => (
            <div key={item.label} style={{
              background: 'rgba(108,99,255,0.06)',
              border: '1px solid rgba(108,99,255,0.2)',
              borderRadius: 16,
              padding: '2rem',
              transition: 'all 0.3s ease',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent2)', marginBottom: '0.5rem' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <p className="subhead" style={{ marginTop: '3rem' }}>
          Not a trend to observe.<br />
          <span style={{ color: 'var(--text)' }}>A paradigm shift to ride.</span>
        </p>
      </div>
    </section>
  )
}
