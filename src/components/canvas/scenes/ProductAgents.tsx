'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Product agents — 5 floating glass-like cards orbiting a central
 * command symbol. Represents "5 AI agents, one command".
 */
export default function ProductAgents({
  position = [0, 0, 0] as [number, number, number],
}) {
  const groupRef = useRef<THREE.Group>(null)
  const centerRef = useRef<THREE.Mesh>(null)
  const cardRefs = useRef<(THREE.Group | null)[]>([])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) groupRef.current.rotation.y = t * 0.08

    // Each card floats slightly out of phase
    cardRefs.current.forEach((c, i) => {
      if (!c) return
      c.position.y = Math.sin(t * 0.6 + i) * 0.15
      c.rotation.y = Math.sin(t * 0.4 + i * 0.5) * 0.1
    })

    if (centerRef.current) {
      const s = 1 + Math.sin(t * 1.5) * 0.1
      centerRef.current.scale.setScalar(s)
    }
  })

  const labels = ['ANLYST', 'RESRCH', 'WRITER', 'CODER', 'REVIEW']
  const colors = ['#6c63ff', '#00d4ff', '#f5a623', '#6c63ff', '#00d4ff']

  return (
    <group position={position}>
      <group ref={groupRef}>
        {/* 5 cards in a ring */}
        {[0, 1, 2, 3, 4].map((i) => {
          const a = (i / 5) * Math.PI * 2
          const r = 2.4
          return (
            <group
              key={i}
              ref={(el) => { cardRefs.current[i] = el }}
              position={[Math.cos(a) * r, 0, Math.sin(a) * r]}
              rotation={[0, -a + Math.PI / 2, 0]}
            >
              <RoundedBox args={[1.0, 1.4, 0.08]} radius={0.08}>
                <meshStandardMaterial
                  color="#0a0a1a"
                  metalness={0.3}
                  roughness={0.5}
                  transparent
                  opacity={0.85}
                  emissive={colors[i]}
                  emissiveIntensity={0.2}
                />
              </RoundedBox>

              {/* Card accent strip at top */}
              <mesh position={[0, 0.55, 0.045]}>
                <boxGeometry args={[0.85, 0.05, 0.01]} />
                <meshBasicMaterial color={colors[i]} />
              </mesh>

              {/* Card "icon" dot */}
              <mesh position={[0, 0.2, 0.045]}>
                <circleGeometry args={[0.15, 24]} />
                <meshBasicMaterial color={colors[i]} transparent opacity={0.9} />
              </mesh>

              {/* Card "content" lines */}
              {[0, 1, 2].map((li) => (
                <mesh key={li} position={[0, -0.15 - li * 0.18, 0.045]}>
                  <boxGeometry args={[0.7 - li * 0.1, 0.02, 0.005]} />
                  <meshBasicMaterial color="#4a4a6a" />
                </mesh>
              ))}
            </group>
          )
        })}
      </group>

      {/* Central command sphere */}
      <mesh ref={centerRef}>
        <sphereGeometry args={[0.32, 24, 24]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.55, 24, 24]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.2} />
      </mesh>

      <pointLight color="#6c63ff" intensity={1.5} distance={12} />
    </group>
  )
}
