'use client'

export default function Scene11Philosophy() {
  return (
    <section className="scene content-layer" style={{ minHeight: '100vh', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: 900, width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <h2 className="headline" style={{ marginBottom: '1.5rem' }}>
              The{' '}<span className="gold-text">philosophy</span><br />
              behind the work.
            </h2>
            <p className="subhead" style={{ marginBottom: '2rem' }}>
              Intelligence alone doesn&apos;t build great products.<br />
              Coordination does.
            </p>
            <div style={{
              background: 'rgba(245,166,35,0.06)',
              border: '1px solid rgba(245,166,35,0.2)',
              borderRadius: 16,
              padding: '2rem',
              marginBottom: '1.5rem',
            }}>
              <p style={{ fontSize: '1rem', color: 'var(--text)', lineHeight: 1.8, fontStyle: 'italic' }}>
                &ldquo;Smart people can&apos;t work together easily.<br />
                The leader&apos;s real work is turning individual brilliance<br />
                into collective execution.&rdquo;
              </p>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>
              Inspired by Jack Ma&apos;s principle on leadership and coordination.
            </p>

            {/* Personality cards */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ textAlign: 'center' }}>
                <img src="/profile/spunky1.jpg" alt="Luffy energy" style={{ width: 70, height: 70, borderRadius: 12, objectFit: 'cover', border: '2px solid rgba(108,99,255,0.4)' }} />
                <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.4rem' }}>The energy</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <img src="/profile/spunky2.jpg" alt="GitHub" style={{ width: 70, height: 70, borderRadius: 12, objectFit: 'cover', border: '2px solid rgba(0,212,255,0.4)' }} />
                <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.4rem' }}>The builder</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <img src="/profile/anit.jpg" alt="Anit" style={{ width: 70, height: 70, borderRadius: 12, objectFit: 'cover', objectPosition: 'top', border: '2px solid rgba(245,166,35,0.4)' }} />
                <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.4rem' }}>The human</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { principle: 'Clarity over cleverness', desc: 'The best ideas are the ones everyone can act on' },
              { principle: 'Build in public', desc: 'Sharing the journey compounds the learning for everyone' },
              { principle: 'Execution over benchmarks', desc: 'Reliability over long horizons beats raw intelligence' },
              { principle: 'Access is the product', desc: 'If it requires expertise to use — it\'s not finished' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '1rem',
                padding: '1.2rem',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 12,
              }}>
                <div style={{
                  width: 6,
                  flexShrink: 0,
                  borderRadius: 999,
                  background: ['var(--accent)', 'var(--accent2)', 'var(--gold)', 'var(--accent)'][i],
                  alignSelf: 'stretch',
                  minHeight: 40,
                }} />
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '0.25rem', fontSize: '0.95rem' }}>
                    {item.principle}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
