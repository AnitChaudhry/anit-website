'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Torus } from '@react-three/drei'
import * as THREE from 'three'

export default function FloatingRing({ radius = 3, color = '#6c63ff', speed = 0.3, tilt = 0.4 }: {
  radius?: number; color?: string; speed?: number; tilt?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * speed
      ref.current.rotation.x = tilt + Math.sin(clock.getElapsedTime() * 0.3) * 0.1
    }
  })
  return (
    <Torus ref={ref} args={[radius, 0.015, 16, 120]}>
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </Torus>
  )
}
