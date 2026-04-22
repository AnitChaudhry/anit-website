'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Torus } from '@react-three/drei'
import * as THREE from 'three'

/**
 * World Waves — 4 curved crests representing tech waves
 * Internet → Mobile → Cloud → AI. Each glows a different color.
 * Scene 02.
 */
export default function WorldWaves({
  position = [0, 0, 0] as [number, number, number],
}) {
  const groupRef = useRef<THREE.Group>(null)
  const refs = [
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
  ]

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) groupRef.current.rotation.z = Math.sin(t * 0.15) * 0.04
    refs.forEach((r, i) => {
      if (r.current) {
        r.current.position.y = Math.sin(t * 0.5 + i * 0.8) * 0.15
        r.current.rotation.y = Math.sin(t * 0.25 + i) * 0.08
      }
    })
  })

  // Four crests — scale grows with each wave (Internet → AI)
  const waves = [
    { scale: 0.9, color: '#6c63ff', offset: -2.4, depth: -1.5 }, // Internet (purple)
    { scale: 1.05, color: '#00d4ff', offset: -0.8, depth: -2.5 }, // Mobile (cyan)
    { scale: 1.25, color: '#f5a623', offset: 0.9, depth: -3.8 },  // Cloud (gold)
    { scale: 1.5, color: '#ffffff', offset: 2.8, depth: -5.2 },   // AI (white, the newest)
  ]

  return (
    <group ref={groupRef} position={position}>
      {waves.map((w, i) => (
        <Torus
          key={i}
          ref={refs[i]}
          args={[w.scale, 0.04, 14, 64, Math.PI]}
          position={[w.offset, 0, w.depth]}
          rotation={[0, 0, 0]}
        >
          <meshBasicMaterial color={w.color} transparent opacity={0.8} />
        </Torus>
      ))}

      {/* Faint glow points on each crest ridge */}
      {waves.map((w, i) => (
        <mesh key={`g-${i}`} position={[w.offset, w.scale, w.depth]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshBasicMaterial color={w.color} />
        </mesh>
      ))}
    </group>
  )
}
