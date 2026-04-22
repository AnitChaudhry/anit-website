'use client'

export default function Scene12Invitation() {
  return (
    <section className="scene content-layer" style={{ minHeight: '100vh', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 800, width: '100%', textAlign: 'center' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            margin: '0 auto 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            boxShadow: '0 0 40px rgba(108,99,255,0.5)',
          }}>
            🌊
          </div>
        </div>

        <h2 className="headline" style={{ marginBottom: '1.5rem' }}>
          Every wave<br />
          <span className="accent-text">changed everything.</span>
        </h2>

        <p className="subhead" style={{ maxWidth: 560, margin: '0 auto 1.5rem' }}>
          The ones who shaped the world weren&apos;t the ones who reacted.<br />
          <span style={{ color: 'var(--text)', fontWeight: 600 }}>They were the ones already in position.</span>
        </p>

        <p style={{ fontSize: '1.2rem', color: 'var(--text)', marginBottom: '3rem', lineHeight: 1.8 }}>
          The next layer of the stack is being built <em>right now.</em><br />
          Agent-native. Accessible. Built for humans and agents alike.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}>
          <a
            href="https://www.linkedin.com/in/anit-choudhary-984994149/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '1rem 2.5rem',
              borderRadius: 999,
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1rem',
              textDecoration: 'none',
              boxShadow: '0 0 30px rgba(108,99,255,0.4)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.05)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 50px rgba(108,99,255,0.6)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 30px rgba(108,99,255,0.4)' }}
          >
            Connect on LinkedIn
          </a>
          <a
            href="mailto:anit@openanalyst.com"
            style={{
              padding: '1rem 2.5rem',
              borderRadius: 999,
              background: 'transparent',
              border: '2px solid rgba(108,99,255,0.5)',
              color: 'var(--text)',
              fontWeight: 700,
              fontSize: '1rem',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent2)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent2)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(108,99,255,0.5)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text)' }}
          >
            Email Anit
          </a>
          <a
            href="https://openanalyst.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '1rem 2.5rem',
              borderRadius: 999,
              background: 'rgba(245,166,35,0.1)',
              border: '2px solid rgba(245,166,35,0.4)',
              color: 'var(--gold)',
              fontWeight: 700,
              fontSize: '1rem',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(245,166,35,0.2)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(245,166,35,0.1)' }}
          >
            See OpenAnalyst ↗
          </a>
        </div>

        <div className="glow-line" />
        <p style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--muted)' }}>
          Anit Choudhary · AI Product Manager · OpenAnalyst Inc. · Noida, India
        </p>
      </div>
    </section>
  )
}
