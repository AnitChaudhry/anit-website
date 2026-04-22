'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getCircularPointTexture } from '@/lib/pointTexture'

export default function NeuralNetwork({ nodeCount = 40, spread = 6 }: { nodeCount?: number; spread?: number }) {
  const groupRef = useRef<THREE.Group>(null)

  const { nodes, edges } = useMemo(() => {
    const nodes = Array.from({ length: nodeCount }, () => new THREE.Vector3(
      (Math.random() - 0.5) * spread * 2,
      (Math.random() - 0.5) * spread,
      (Math.random() - 0.5) * spread
    ))
    const edges: [THREE.Vector3, THREE.Vector3][] = []
    for (let i = 0; i < nodeCount; i++) {
      const connections = Math.floor(Math.random() * 3) + 1
      for (let j = 0; j < connections; j++) {
        const target = Math.floor(Math.random() * nodeCount)
        if (target !== i && nodes[i].distanceTo(nodes[target]) < spread * 0.8) {
          edges.push([nodes[i], nodes[target]])
        }
      }
    }
    return { nodes, edges }
  }, [nodeCount, spread])

  const linePositions = useMemo(() => {
    const pos = new Float32Array(edges.length * 6)
    edges.forEach(([a, b], i) => {
      pos[i * 6] = a.x; pos[i * 6 + 1] = a.y; pos[i * 6 + 2] = a.z
      pos[i * 6 + 3] = b.x; pos[i * 6 + 4] = b.y; pos[i * 6 + 5] = b.z
    })
    return pos
  }, [edges])

  const nodePositions = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3)
    nodes.forEach((n, i) => { pos[i * 3] = n.x; pos[i * 3 + 1] = n.y; pos[i * 3 + 2] = n.z })
    return pos
  }, [nodes, nodeCount])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.08
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#6c63ff" transparent opacity={0.25} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#00d4ff"
          size={0.22}
          sizeAttenuation
          transparent
          opacity={0.9}
          map={getCircularPointTexture()}
          alphaTest={0.01}
          depthWrite={false}
        />
      </points>
    </group>
  )
}
