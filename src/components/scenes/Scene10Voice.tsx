'use client'

const posts = [
  { file: '/posts/post-01.png', caption: 'Claude Opus 4.7 — The shift from prompts to sustained context', reactions: '9+', impressions: '440' },
  { file: '/posts/post-05.png', caption: 'ChatGPT evolution — 175 reactions · 17 reposts · went viral', reactions: '175', impressions: '513' },
  { file: '/posts/post-04.png', caption: '10x Dev Team — AI development that ships end to end', reactions: '5', impressions: '460' },
  { file: '/posts/post-07.png', caption: 'OpenAnalyst — Let\'s build something extraordinary', reactions: '18', impressions: '839' },
]

export default function Scene10Voice() {
  return (
    <section className="content-layer" style={{ minHeight: '100vh', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="headline" style={{ marginBottom: '1rem' }}>
            While the wave was forming —<br />
            <span className="accent-text">he was already writing</span><br />
            about where it goes.
          </h2>
          <p className="subhead">
            11,685 people listening. Not for what happened.<br />
            <span style={{ color: 'var(--text)' }}>For what comes next.</span>
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
        }}>
          {posts.map((p, i) => (
            <div key={i} style={{
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(108,99,255,0.2)',
              background: 'rgba(255,255,255,0.02)',
              boxShadow: '0 0 30px rgba(108,99,255,0.15)',
              transform: `rotate(${[-1.5, 1, -0.5, 1.5][i]}deg)`,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'rotate(0deg) scale(1.03)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 50px rgba(108,99,255,0.4)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = `rotate(${[-1.5, 1, -0.5, 1.5][i]}deg)`; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 30px rgba(108,99,255,0.15)' }}
            >
              <img src={p.file} alt={p.caption} style={{ width: '100%', display: 'block' }} />
              <div style={{ padding: '1rem 1.2rem' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                  {p.caption}
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent2)' }}>👍 {p.reactions} reactions</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>📊 {p.impressions} impressions</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
