'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getCircularPointTexture } from '@/lib/pointTexture'

/**
 * Philosophy Converge — 10 scattered "smart nodes" all pointing
 * toward a central bright core. Lines converge. Represents
 * "individual brilliance → collective execution".
 * Scene 11.
 */
export default function PhilosophyConverge({
  position = [0, 0, 0] as [number, number, number],
}) {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)

  const nodes = useMemo(() => {
    // 10 nodes in random-ish outer shell
    const seeded = [
      [2.8, 1.5, -0.8],
      [-2.6, 1.2, 0.6],
      [1.8, -1.8, 0.4],
      [-1.9, -1.6, -0.7],
      [3.2, 0.2, 0.8],
      [-3.0, 0.0, -0.4],
      [0.8, 2.4, 0.5],
      [-0.6, -2.5, -0.3],
      [2.0, 1.0, 1.2],
      [-2.2, -0.9, 1.0],
    ] as const
    return seeded.map((p) => new THREE.Vector3(p[0], p[1], p[2]))
  }, [])

  // Lines from each node to the center
  const linePositions = useMemo(() => {
    const pos = new Float32Array(nodes.length * 6)
    nodes.forEach((n, i) => {
      pos[i * 6] = n.x
      pos[i * 6 + 1] = n.y
      pos[i * 6 + 2] = n.z
      pos[i * 6 + 3] = 0
      pos[i * 6 + 4] = 0
      pos[i * 6 + 5] = 0
    })
    return pos
  }, [nodes])

  const nodePositions = useMemo(() => {
    const pos = new Float32Array(nodes.length * 3)
    nodes.forEach((n, i) => {
      pos[i * 3] = n.x
      pos[i * 3 + 1] = n.y
      pos[i * 3 + 2] = n.z
    })
    return pos
  }, [nodes])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.1
    }
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 1.5) * 0.15
      coreRef.current.scale.setScalar(s)
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Converging lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#6c63ff" transparent opacity={0.4} />
      </lineSegments>

      {/* Outer node points */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#6c63ff"
          size={0.38}
          sizeAttenuation
          transparent
          opacity={1}
          map={getCircularPointTexture()}
          alphaTest={0.01}
          depthWrite={false}
        />
      </points>

      {/* Node glow spheres */}
      {nodes.map((n, i) => (
        <mesh key={i} position={n}>
          <sphereGeometry args={[0.13, 12, 12]} />
          <meshBasicMaterial color="#6c63ff" />
        </mesh>
      ))}

      {/* Central bright core — collective execution */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.36, 24, 24]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.65, 24, 24]} />
        <meshBasicMaterial color="#c2b4ff" transparent opacity={0.3} />
      </mesh>

      <pointLight color="#6c63ff" intensity={2} distance={14} />
    </group>
  )
}
