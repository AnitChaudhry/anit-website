'use client'

const agents = [
  { name: 'Data Engineer', icon: '⚙️', color: '#6c63ff', desc: 'Cleans, structures and prepares raw data' },
  { name: 'Statistician', icon: '📐', color: '#00d4ff', desc: 'Runs analysis and finds patterns' },
  { name: 'Visualizer', icon: '📊', color: '#f5a623', desc: 'Builds interactive dashboards' },
  { name: 'Reporter', icon: '📝', color: '#6c63ff', desc: 'Generates business-ready reports' },
  { name: 'Strategist', icon: '🎯', color: '#00d4ff', desc: 'Delivers prioritized recommendations' },
]

export default function Scene08Product() {
  return (
    <section className="scene content-layer" style={{ minHeight: '100vh', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 1000, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="headline" style={{ marginBottom: '1rem' }}>
            The product he&apos;s<br />
            <span className="accent-text">shaping.</span>
          </h2>
          <p className="subhead">5 AI agents. One command. Full clarity.</p>
        </div>

        {/* Flow visualization */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <div style={{
            padding: '1rem 2rem',
            background: 'rgba(245,166,35,0.1)',
            border: '1px solid rgba(245,166,35,0.3)',
            borderRadius: 12,
            fontSize: '0.9rem',
            color: 'var(--gold)',
            fontWeight: 600,
          }}>
            📁 Your Data
          </div>
          <span style={{ color: 'var(--muted)', fontSize: '1.5rem' }}>→</span>
          <div style={{
            padding: '1rem 2rem',
            background: 'rgba(108,99,255,0.1)',
            border: '1px solid rgba(108,99,255,0.3)',
            borderRadius: 12,
            fontSize: '0.9rem',
            color: 'var(--accent)',
            fontWeight: 600,
          }}>
            🤖 AI Agents
          </div>
          <span style={{ color: 'var(--muted)', fontSize: '1.5rem' }}>→</span>
          <div style={{
            padding: '1rem 2rem',
            background: 'rgba(0,212,255,0.1)',
            border: '1px solid rgba(0,212,255,0.3)',
            borderRadius: 12,
            fontSize: '0.9rem',
            color: 'var(--accent2)',
            fontWeight: 600,
          }}>
            ✨ Clarity
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {agents.map((a, i) => (
            <div key={a.name} style={{
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid ${a.color}33`,
              borderRadius: 16,
              padding: '1.5rem',
              textAlign: 'center',
              transition: 'transform 0.3s ease',
              animationDelay: `${i * 0.1}s`,
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{a.icon}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: a.color, marginBottom: '0.5rem' }}>{a.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.5 }}>{a.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p className="subhead">
            No complex setup. No overwhelming dashboards.<br />
            <span style={{ color: 'var(--text)', fontWeight: 600, fontSize: '1.2rem' }}>Just clarity.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
