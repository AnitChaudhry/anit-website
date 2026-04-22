'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getCircularPointTexture } from '@/lib/pointTexture'

/**
 * Ignition core — a bright pulsing singularity representing the
 * ChatGPT launch moment. Intense glow + radiating particles.
 */
export default function IgnitionCore({
  position = [0, 0, 0] as [number, number, number],
}) {
  const coreRef = useRef<THREE.Mesh>(null)
  const haloRef = useRef<THREE.Mesh>(null)
  const pointsRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const count = 300
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const r = 0.8 + Math.random() * 1.6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 1.8) * 0.15
      coreRef.current.scale.setScalar(s)
    }
    if (haloRef.current) {
      const s = 1 + Math.sin(t * 1.2 + 0.5) * 0.1
      haloRef.current.scale.setScalar(s)
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.15
      pointsRef.current.rotation.x = t * 0.08
    }
  })

  return (
    <group position={position}>
      {/* Radiating point cloud */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#f5a623"
          size={0.1}
          sizeAttenuation
          transparent
          opacity={0.9}
          map={getCircularPointTexture()}
          alphaTest={0.01}
          depthWrite={false}
        />
      </points>

      {/* Outer halo */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[1.2, 24, 24]} />
        <meshBasicMaterial color="#f5a623" transparent opacity={0.12} />
      </mesh>

      {/* Bright core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshBasicMaterial color="#fff2c0" />
      </mesh>

      {/* Point light at core — actual illumination */}
      <pointLight color="#f5a623" intensity={3} distance={18} />
    </group>
  )
}
