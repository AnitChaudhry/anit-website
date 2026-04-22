'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Frontfoot Surfboard — pointed surfboard leaning forward,
 * with a trailing glow to imply motion/momentum.
 * Scene 05.
 */
export default function FrontfootSurfboard({
  position = [0, 0, 0] as [number, number, number],
}) {
  const boardRef = useRef<THREE.Group>(null)
  const trailRefs = useRef<(THREE.Mesh | null)[]>([])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (boardRef.current) {
      boardRef.current.position.y = Math.sin(t * 0.8) * 0.15
      boardRef.current.rotation.z = Math.sin(t * 0.4) * 0.06
    }
    trailRefs.current.forEach((tr, i) => {
      if (!tr) return
      const mat = tr.material as THREE.MeshBasicMaterial
      mat.opacity = 0.25 + Math.sin(t * 2 + i * 0.6) * 0.15
    })
  })

  return (
    <group position={position}>
      {/* Surfboard — elongated, pointed, tilted forward */}
      <group ref={boardRef} rotation={[0, 0, -0.18]}>
        <RoundedBox args={[0.9, 0.12, 4.0]} radius={0.06}>
          <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.2} />
        </RoundedBox>

        {/* Accent stripe running the length */}
        <mesh position={[0, 0.07, 0]}>
          <boxGeometry args={[0.08, 0.005, 3.6]} />
          <meshBasicMaterial color="#00d4ff" />
        </mesh>

        {/* Tip glow (leading edge) */}
        <mesh position={[0, 0.07, 1.95]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshBasicMaterial color="#00d4ff" />
        </mesh>

        {/* Forward-pointing arrow head */}
        <mesh position={[0, 0.07, 2.2]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.22, 0.4, 3]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.8} />
        </mesh>
      </group>

      {/* Trailing spray — ghosted trails behind the board */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          ref={(el) => { trailRefs.current[i] = el }}
          position={[Math.sin(i * 0.6) * 0.3, -0.05 - i * 0.02, -1.8 - i * 0.6]}
        >
          <sphereGeometry args={[0.25 - i * 0.03, 10, 10]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.25} />
        </mesh>
      ))}

      <pointLight color="#00d4ff" intensity={1.2} distance={8} />
    </group>
  )
}
