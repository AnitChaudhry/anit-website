'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Build Nodes — MCP-style code blocks connected with glowing lines.
 * A compact DAG: inputs → transforms → output. Animated data flow.
 * Scene 09.
 */
export default function BuildNodes({
  position = [0, 0, 0] as [number, number, number],
}) {
  const groupRef = useRef<THREE.Group>(null)
  const flowRef = useRef<THREE.Points>(null)

  // 6 node positions in a small graph layout
  const nodes = useMemo<[number, number, number][]>(() => [
    [-2.2, 0.8, 0],   // input A
    [-2.2, -0.8, 0],  // input B
    [-0.2, 0.4, 0.3], // transform 1
    [-0.2, -0.4, 0.3],// transform 2
    [1.8, 0, 0],      // merge
    [3.4, 0, -0.4],   // output
  ], [])

  const edges = useMemo<[number, number][]>(() => [
    [0, 2],
    [1, 3],
    [2, 4],
    [3, 4],
    [4, 5],
  ], [])

  const linePositions = useMemo(() => {
    const pos = new Float32Array(edges.length * 6)
    edges.forEach(([a, b], i) => {
      pos[i * 6] = nodes[a][0]; pos[i * 6 + 1] = nodes[a][1]; pos[i * 6 + 2] = nodes[a][2]
      pos[i * 6 + 3] = nodes[b][0]; pos[i * 6 + 4] = nodes[b][1]; pos[i * 6 + 5] = nodes[b][2]
    })
    return pos
  }, [nodes, edges])

  // Flowing particles along edges — sampled points that move t: 0 → 1
  const flowCount = edges.length * 4
  const flowBase = useMemo(() => new Float32Array(flowCount * 3), [flowCount])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current) groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.12

    if (flowRef.current) {
      const arr = flowRef.current.geometry.attributes.position.array as Float32Array
      let i = 0
      edges.forEach(([a, b], ei) => {
        for (let k = 0; k < 4; k++) {
          const local = ((t * 0.35 + ei * 0.2 + k * 0.25) % 1)
          arr[i * 3] = nodes[a][0] + (nodes[b][0] - nodes[a][0]) * local
          arr[i * 3 + 1] = nodes[a][1] + (nodes[b][1] - nodes[a][1]) * local
          arr[i * 3 + 2] = nodes[a][2] + (nodes[b][2] - nodes[a][2]) * local
          i++
        }
      })
      flowRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  const colors = ['#6c63ff', '#6c63ff', '#00d4ff', '#00d4ff', '#f5a623', '#ffffff']

  return (
    <group ref={groupRef} position={position}>
      {/* Node blocks */}
      {nodes.map((p, i) => (
        <group key={i} position={p}>
          <RoundedBox args={[0.85, 0.5, 0.16]} radius={0.03}>
            <meshStandardMaterial
              color="#0a0a1a"
              metalness={0.4}
              roughness={0.5}
              emissive={colors[i]}
              emissiveIntensity={0.35}
            />
          </RoundedBox>
          {/* Header bar */}
          <mesh position={[0, 0.19, 0.082]}>
            <boxGeometry args={[0.75, 0.08, 0.005]} />
            <meshBasicMaterial color={colors[i]} />
          </mesh>
          {/* Code lines */}
          {[0, 1].map((li) => (
            <mesh key={li} position={[0, 0.05 - li * 0.12, 0.082]}>
              <boxGeometry args={[0.6 - li * 0.15, 0.03, 0.005]} />
              <meshBasicMaterial color="#3a3a5a" />
            </mesh>
          ))}
        </group>
      ))}

      {/* Connecting edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#6c63ff" transparent opacity={0.6} />
      </lineSegments>

      {/* Flowing data particles */}
      <points ref={flowRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[flowBase, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#00d4ff" size={0.2} sizeAttenuation transparent opacity={0.95} />
      </points>

      <pointLight color="#6c63ff" intensity={1.5} distance={10} />
    </group>
  )
}
