'use client'

const stack = [
  { label: 'MCP', desc: 'Model Context Protocol — tools, memory, handoffs', status: 'Building with it' },
  { label: 'A2A', desc: 'Agent-to-Agent communication protocols', status: 'Already designing for it' },
  { label: 'Agentic Loops', desc: 'Recurring, self-scheduling agent workflows', status: 'Shipped with /loop' },
  { label: 'Multi-Agent Swarms', desc: '5 specialist agents coordinating in parallel', status: 'Deployed in production' },
  { label: 'Agent-Native Software', desc: 'Systems built for humans AND agents', status: 'The bet he\'s already making' },
]

export default function Scene09Build() {
  return (
    <section className="scene content-layer" style={{ minHeight: '100vh', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 900, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="headline" style={{ marginBottom: '1rem' }}>
            Before most teams knew<br />
            <span className="accent-text">what MCP was</span> —<br />
            he was building with it.
          </h2>
          <p className="subhead">That&apos;s what frontfoot looks like in practice.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {stack.map((item, i) => (
            <div key={item.label} style={{
              display: 'grid',
              gridTemplateColumns: '140px 1fr auto',
              gap: '1.5rem',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(108,99,255,0.15)',
              borderRadius: 14,
              padding: '1.2rem 1.8rem',
              borderLeft: `3px solid ${['var(--accent)', 'var(--accent2)', 'var(--gold)'][i % 3]}`,
            }}>
              <div style={{
                fontWeight: 800,
                fontSize: '1rem',
                color: ['var(--accent)', 'var(--accent2)', 'var(--gold)'][i % 3],
                fontFamily: 'monospace',
              }}>
                {item.label}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                {item.desc}
              </div>
              <div style={{
                fontSize: '0.75rem',
                padding: '0.3rem 0.8rem',
                borderRadius: 999,
                background: 'rgba(0,212,255,0.1)',
                color: 'var(--accent2)',
                border: '1px solid rgba(0,212,255,0.2)',
                whiteSpace: 'nowrap',
                fontWeight: 600,
              }}>
                {item.status}
              </div>
            </div>
          ))}
        </div>

        <p className="subhead" style={{ textAlign: 'center', marginTop: '3rem' }}>
          The teams running agentic systems today<br />
          will have compounding advantages by Q4.
        </p>
      </div>
    </section>
  )
}
