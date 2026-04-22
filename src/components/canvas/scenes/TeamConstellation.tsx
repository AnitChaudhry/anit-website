'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getCircularPointTexture } from '@/lib/pointTexture'

/**
 * Team constellation — 5 glowing nodes (OpenAnalyst core team)
 * connected with lines, gently rotating. Represents collaboration.
 */
export default function TeamConstellation({
  position = [0, 0, 0] as [number, number, number],
}) {
  const groupRef = useRef<THREE.Group>(null)

  const nodes = useMemo(() => {
    // 5 nodes arranged in a loose pentagon
    const r = 2.2
    return Array.from({ length: 5 }, (_, i) => {
      const a = (i / 5) * Math.PI * 2
      return new THREE.Vector3(
        Math.cos(a) * r,
        Math.sin(a * 1.3) * 0.6,
        Math.sin(a) * r,
      )
    })
  }, [])

  const linePositions = useMemo(() => {
    // Connect every node to every other node
    const segs: number[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        segs.push(nodes[i].x, nodes[i].y, nodes[i].z)
        segs.push(nodes[j].x, nodes[j].y, nodes[j].z)
      }
    }
    return new Float32Array(segs)
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
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.12
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.1
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Connecting lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#00d4ff" transparent opacity={0.4} />
      </lineSegments>

      {/* Node points */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#00d4ff"
          size={0.45}
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
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshBasicMaterial color={i === 0 ? '#f5a623' : '#00d4ff'} />
        </mesh>
      ))}

      <pointLight color="#00d4ff" intensity={1.5} distance={10} />
    </group>
  )
}
