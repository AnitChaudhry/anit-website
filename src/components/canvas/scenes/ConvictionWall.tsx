'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Conviction Wall — a cracked barrier split down the middle,
 * bright purple light streaming through the gap.
 * "The barrier was never intelligence. It was accessibility."
 * Scene 06.
 */
export default function ConvictionWall({
  position = [0, 0, 0] as [number, number, number],
}) {
  const leftRef = useRef<THREE.Group>(null)
  const rightRef = useRef<THREE.Group>(null)
  const lightRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    // Gentle drift apart
    if (leftRef.current) leftRef.current.position.x = -1.3 + Math.sin(t * 0.4) * 0.05
    if (rightRef.current) rightRef.current.position.x = 1.3 - Math.sin(t * 0.4) * 0.05
    if (lightRef.current) {
      const s = 1 + Math.sin(t * 1.5) * 0.2
      lightRef.current.scale.y = s
    }
  })

  const wallColor = '#2a2a3a'
  const wallDark = '#1a1a2a'

  // Build wall blocks — 3 rows × some columns per side
  const blocks = (side: 1 | -1) =>
    Array.from({ length: 9 }, (_, i) => {
      const row = Math.floor(i / 3)
      const col = i % 3
      const xOffset = side * (col * 0.7 + 0.3)
      const yOffset = (row - 1) * 0.9
      return { xOffset, yOffset, idx: i }
    })

  return (
    <group position={position}>
      {/* LEFT half of the wall */}
      <group ref={leftRef} position={[-1.3, 0, 0]}>
        {blocks(-1).map(({ xOffset, yOffset, idx }) => (
          <RoundedBox
            key={idx}
            args={[0.65, 0.85, 0.35]}
            radius={0.02}
            position={[xOffset, yOffset, 0]}
          >
            <meshStandardMaterial
              color={idx % 2 === 0 ? wallColor : wallDark}
              roughness={0.95}
            />
          </RoundedBox>
        ))}
      </group>

      {/* RIGHT half of the wall */}
      <group ref={rightRef} position={[1.3, 0, 0]}>
        {blocks(1).map(({ xOffset, yOffset, idx }) => (
          <RoundedBox
            key={idx}
            args={[0.65, 0.85, 0.35]}
            radius={0.02}
            position={[xOffset, yOffset, 0]}
          >
            <meshStandardMaterial
              color={idx % 2 === 0 ? wallDark : wallColor}
              roughness={0.95}
            />
          </RoundedBox>
        ))}
      </group>

      {/* Light streaming through the gap */}
      <mesh ref={lightRef} position={[0, 0, -0.2]}>
        <planeGeometry args={[0.8, 3.0]} />
        <meshBasicMaterial color="#c2b4ff" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>

      {/* Inner bright core */}
      <mesh position={[0, 0, -0.3]}>
        <planeGeometry args={[0.35, 2.7]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>

      {/* Actual illumination */}
      <pointLight color="#6c63ff" intensity={2.5} distance={12} position={[0, 0, 0.5]} />
    </group>
  )
}
