'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { getCircularPointTexture } from '@/lib/pointTexture'

export default function ParticleWave({ count = 3000, color = '#6c63ff', amplitude = 1.5, speed = 0.4 }: {
  count?: number
  color?: string
  amplitude?: number
  speed?: number
}) {
  const mesh = useRef<THREE.Points>(null)

  const [positions, randoms] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const rnd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
      rnd[i] = Math.random()
    }
    return [pos, rnd]
  }, [count])

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.getElapsedTime() * speed
    const pos = mesh.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const ix = i * 3
      const x = positions[ix]
      const z = positions[ix + 2]
      pos[ix + 1] = positions[ix + 1] + Math.sin(x * 0.5 + t + randoms[i] * 6) * amplitude * 0.3
        + Math.sin(z * 0.3 + t * 0.7) * amplitude * 0.2
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
    mesh.current.rotation.y = t * 0.05
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[new Float32Array(positions), 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.12}
        transparent
        opacity={0.75}
        sizeAttenuation
        map={getCircularPointTexture()}
        alphaTest={0.01}
        depthWrite={false}
      />
    </points>
  )
}
