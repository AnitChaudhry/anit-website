'use client'

const labels = [
  'Arrival', 'World Changing', 'Formation', 'Ignition',
  'Frontfoot', 'Conviction', 'Team', 'Product',
  'Build', 'Voice', 'Philosophy', 'Invitation',
]

export default function NavDots({ current, onNav }: { current: number; onNav: (i: number) => void }) {
  return (
    <nav style={{
      position: 'fixed',
      right: '1.5rem',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      alignItems: 'center',
    }}>
      {labels.map((label, i) => (
        <button
          key={i}
          onClick={() => onNav(i)}
          title={label}
          style={{
            all: 'unset',
            width: current === i ? 10 : 7,
            height: current === i ? 10 : 7,
            borderRadius: '50%',
            background: current === i ? 'var(--accent2)' : 'rgba(255,255,255,0.2)',
            boxShadow: current === i ? '0 0 10px var(--accent2)' : 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'block',
          }}
          aria-label={`Go to scene ${i + 1}: ${label}`}
        />
      ))}
    </nav>
  )
}
