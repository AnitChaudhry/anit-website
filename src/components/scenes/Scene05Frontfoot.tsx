'use client'

const contrasts = [
  { reactive: 'Learns about a tool after everyone tweets about it', frontfoot: 'Spots the signal before it has a name' },
  { reactive: 'Waits for the use case to be obvious', frontfoot: 'Builds the use case before consensus forms' },
  { reactive: 'Adopts MCP when it\'s standard', frontfoot: 'Writes about MCP when most don\'t know it exists' },
  { reactive: 'Joins the agentic wave when it\'s safe', frontfoot: 'Bets on agent-native software before the market does' },
]

export default function Scene05Frontfoot() {
  return (
    <section className="scene content-layer" style={{ minHeight: '100vh', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 1000, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="headline" style={{ marginBottom: '1rem' }}>
            Frontfoot isn&apos;t speed.<br />
            <span className="accent-text">It&apos;s attention.</span>
          </h2>
          <p className="subhead">Reading what hasn&apos;t been named yet.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Headers */}
          <div style={{ padding: '1.2rem 2rem', background: 'rgba(255,100,100,0.08)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ff6b6b', fontWeight: 700 }}>
              ⏳ Reactive
            </span>
          </div>
          <div style={{ padding: '1.2rem 2rem', background: 'rgba(108,99,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.06)', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent2)', fontWeight: 700 }}>
              ⚡ Frontfoot
            </span>
          </div>

          {contrasts.map((row, i) => (
            <>
              <div key={`r${i}`} style={{
                padding: '1.5rem 2rem',
                background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent',
                borderBottom: i < contrasts.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                fontSize: '0.95rem',
                color: 'var(--muted)',
                lineHeight: 1.6,
              }}>
                {row.reactive}
              </div>
              <div key={`f${i}`} style={{
                padding: '1.5rem 2rem',
                background: i % 2 === 0 ? 'rgba(108,99,255,0.04)' : 'rgba(108,99,255,0.02)',
                borderBottom: i < contrasts.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                borderLeft: '1px solid rgba(108,99,255,0.15)',
                fontSize: '0.95rem',
                color: 'var(--text)',
                lineHeight: 1.6,
                fontWeight: 500,
              }}>
                {row.frontfoot}
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  )
}
