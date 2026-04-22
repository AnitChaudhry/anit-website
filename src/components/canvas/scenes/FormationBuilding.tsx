'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Formation Building — low-poly IMS Noida institutional silhouette:
 * base, 4 columns, triangular pediment, + floating books orbiting.
 * Scene 03.
 */
export default function FormationBuilding({
  position = [0, 0, 0] as [number, number, number],
}) {
  const booksRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!booksRef.current) return
    booksRef.current.rotation.y = clock.getElapsedTime() * 0.15
  })

  const stone = '#c8b896'
  const stoneDark = '#8a7b5e'
  const accent = '#f5a623'

  return (
    <group position={position}>
      {/* Base plinth */}
      <RoundedBox args={[5.5, 0.4, 2.5]} radius={0.04} position={[0, -0.2, 0]}>
        <meshStandardMaterial color={stoneDark} roughness={0.85} />
      </RoundedBox>

      {/* 4 columns */}
      {[-1.8, -0.6, 0.6, 1.8].map((x, i) => (
        <mesh key={i} position={[x, 0.8, 0.8]}>
          <cylinderGeometry args={[0.16, 0.18, 1.8, 16]} />
          <meshStandardMaterial color={stone} roughness={0.8} />
        </mesh>
      ))}

      {/* Entablature (flat beam across columns) */}
      <mesh position={[0, 1.85, 0.8]}>
        <boxGeometry args={[4.6, 0.24, 0.4]} />
        <meshStandardMaterial color={stoneDark} roughness={0.85} />
      </mesh>

      {/* Pediment (triangular roof) */}
      <mesh position={[0, 2.35, 0.8]} rotation={[0, 0, 0]}>
        <coneGeometry args={[2.6, 0.8, 3]} />
        <meshStandardMaterial color={stoneDark} roughness={0.85} />
      </mesh>

      {/* Main body behind columns */}
      <RoundedBox args={[4.4, 2.0, 0.4]} radius={0.02} position={[0, 0.8, 0.1]}>
        <meshStandardMaterial color={stone} roughness={0.9} />
      </RoundedBox>

      {/* Glowing doorway */}
      <mesh position={[0, 0.4, 0.31]}>
        <boxGeometry args={[0.5, 0.9, 0.02]} />
        <meshBasicMaterial color={accent} transparent opacity={0.65} />
      </mesh>

      {/* Floating books orbiting above */}
      <group ref={booksRef} position={[0, 3.2, 0]}>
        {[0, 1, 2, 3, 4].map((i) => {
          const a = (i / 5) * Math.PI * 2
          const r = 1.6
          const colors = ['#6c63ff', '#00d4ff', '#f5a623', '#6c63ff', '#00d4ff']
          return (
            <group
              key={i}
              position={[Math.cos(a) * r, Math.sin(a * 0.8) * 0.25, Math.sin(a) * r]}
              rotation={[0, -a, 0.3]}
            >
              <RoundedBox args={[0.28, 0.4, 0.06]} radius={0.01}>
                <meshStandardMaterial color={colors[i]} roughness={0.7} />
              </RoundedBox>
            </group>
          )
        })}
      </group>

      {/* Soft warm light */}
      <pointLight color={accent} intensity={1.2} distance={8} position={[0, 2, 1]} />
    </group>
  )
}
