'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Torus } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Arrival portal — a halo of glowing rings + soft core light
 * that frames the character on Scene 01 / Scene 12.
 */
export default function ArrivalPortal({
  position = [0, 0, 0] as [number, number, number],
}) {
  const ringA = useRef<THREE.Mesh>(null)
  const ringB = useRef<THREE.Mesh>(null)
  const ringC = useRef<THREE.Mesh>(null)
  const core = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ringA.current) { ringA.current.rotation.z = t * 0.25 }
    if (ringB.current) { ringB.current.rotation.z = -t * 0.18 }
    if (ringC.current) { ringC.current.rotation.z = t * 0.12 }
    if (core.current) {
      const s = 1 + Math.sin(t * 1.2) * 0.08
      core.current.scale.setScalar(s)
    }
  })

  return (
    <group position={position}>
      {/* Soft glowing core behind character */}
      <mesh ref={core} position={[0, 1, -0.5]}>
        <sphereGeometry args={[0.9, 24, 24]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.08} />
      </mesh>

      {/* Three concentric portal rings */}
      <Torus ref={ringA} args={[1.8, 0.02, 16, 128]} position={[0, 1, -0.3]} rotation={[0, 0, 0]}>
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.65} />
      </Torus>
      <Torus ref={ringB} args={[2.3, 0.015, 16, 128]} position={[0, 1, -0.3]} rotation={[0.3, 0, 0]}>
        <meshBasicMaterial color="#6c63ff" transparent opacity={0.5} />
      </Torus>
      <Torus ref={ringC} args={[2.9, 0.01, 16, 128]} position={[0, 1, -0.3]} rotation={[-0.2, 0.1, 0]}>
        <meshBasicMaterial color="#f5a623" transparent opacity={0.35} />
      </Torus>
    </group>
  )
}
