'use client'

const disciplines = [
  'Product Strategy', 'AI Systems', 'Data-Driven Thinking',
  'Business Management', 'Agentic Workflows', 'Market Insight',
  'Systems Design', 'LLMs & GenAI', 'User Psychology',
]

export default function Scene03Formation() {
  return (
    <section className="scene content-layer" style={{ minHeight: '100vh', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 900, width: '100%', textAlign: 'center' }}>
        <span style={{ fontSize: '0.8rem', letterSpacing: '0.25em', color: 'var(--accent)', textTransform: 'uppercase', fontWeight: 600 }}>
          Institute of Management Studies, Noida
        </span>

        <h2 className="headline" style={{ margin: '1.5rem 0' }}>
          The mind being<br />
          <span className="gold-text">built to read waves.</span>
        </h2>

        <p className="subhead" style={{ maxWidth: 560, margin: '0 auto 4rem' }}>
          Where business thinking met the edge of technology.<br />
          The wave wasn&apos;t visible yet. But you could feel it forming.
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          justifyContent: 'center',
          marginBottom: '4rem',
        }}>
          {disciplines.map((d, i) => (
            <span key={d} style={{
              padding: '0.6rem 1.3rem',
              borderRadius: 999,
              background: `rgba(108,99,255,${0.05 + (i % 3) * 0.04})`,
              border: '1px solid rgba(108,99,255,0.3)',
              fontSize: '0.9rem',
              color: i % 3 === 0 ? 'var(--accent2)' : i % 3 === 1 ? 'var(--accent)' : 'var(--gold)',
              fontWeight: 500,
            }}>{d}</span>
          ))}
        </div>

        <div style={{
          background: 'rgba(108,99,255,0.06)',
          border: '1px solid rgba(108,99,255,0.2)',
          borderRadius: 20,
          padding: '2.5rem',
          maxWidth: 600,
          margin: '0 auto',
        }}>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.7, color: 'var(--text)', fontStyle: 'italic' }}>
            &ldquo;The best product managers don&apos;t just understand users.<br />
            They understand the direction the world is moving in.&rdquo;
          </p>
        </div>
      </div>
    </section>
  )
}
