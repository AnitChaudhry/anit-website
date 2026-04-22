'use client'

export default function SceneLabel({ number, title }: { number: number; title: string }) {
  return (
    <div style={{
      position: 'fixed',
      top: '2rem',
      left: '2rem',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    }}>
      <span style={{
        fontSize: '0.7rem',
        color: 'var(--accent2)',
        fontWeight: 700,
        letterSpacing: '0.15em',
        fontFamily: 'monospace',
      }}>
        {String(number).padStart(2, '0')} / 12
      </span>
      <div style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.15)' }} />
      <span style={{ fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.1em' }}>
        {title.toUpperCase()}
      </span>
    </div>
  )
}
