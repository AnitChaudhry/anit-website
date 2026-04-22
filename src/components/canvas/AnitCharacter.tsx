'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

export default function AnitCharacter({ position = [0, 0, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null)
  const floatRef = useRef(0)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    floatRef.current = clock.getElapsedTime()
    // Gentle float up/down
    groupRef.current.position.y = position[1] + Math.sin(floatRef.current * 0.8) * 0.12
    // Subtle sway
    groupRef.current.rotation.y = Math.sin(floatRef.current * 0.4) * 0.08
  })

  const jacketColor = '#1a2a4a'    // dark navy jacket
  const shirtColor = '#ffffff'
  const skinColor = '#c68642'       // warm skin tone
  const pantsColor = '#2c3e50'      // dark jeans
  const shoeColor = '#1a1a1a'
  const backpackColor = '#2c2c2c'
  const backpackStrap = '#1a1a1a'
  const glassColor = '#111111'
  const glassLens = '#1a3a5c'
  const accentBlue = '#00d4ff'

  return (
    <group ref={groupRef} position={position} scale={1.1}>

      {/* === HEAD === */}
      <group position={[0, 1.72, 0]}>
        {/* Face */}
        <mesh castShadow>
          <sphereGeometry args={[0.22, 20, 20]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>

        {/* Hair - dark, slightly spiky */}
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.22, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial color="#1a0f00" roughness={0.9} />
        </mesh>

        {/* Sunglasses frame */}
        <mesh position={[0, 0.04, 0.19]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.32, 0.06, 0.01]} />
          <meshStandardMaterial color={glassColor} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Left lens */}
        <mesh position={[-0.09, 0.04, 0.2]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.12, 0.07, 0.005]} />
          <meshStandardMaterial color={glassLens} transparent opacity={0.85} metalness={0.3} />
        </mesh>
        {/* Right lens */}
        <mesh position={[0.09, 0.04, 0.2]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.12, 0.07, 0.005]} />
          <meshStandardMaterial color={glassLens} transparent opacity={0.85} metalness={0.3} />
        </mesh>
        {/* Nose */}
        <mesh position={[0, -0.04, 0.21]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color={skinColor} roughness={0.8} />
        </mesh>
      </group>

      {/* === NECK === */}
      <mesh position={[0, 1.48, 0]}>
        <cylinderGeometry args={[0.07, 0.08, 0.12, 12]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>

      {/* === TORSO — Jacket === */}
      <group position={[0, 1.1, 0]}>
        <RoundedBox args={[0.55, 0.65, 0.28]} radius={0.04} castShadow>
          <meshStandardMaterial color={jacketColor} roughness={0.8} />
        </RoundedBox>
        {/* Jacket collar / zipper line */}
        <mesh position={[0, 0.1, 0.14]}>
          <boxGeometry args={[0.04, 0.35, 0.01]} />
          <meshStandardMaterial color="#333" roughness={0.6} />
        </mesh>
        {/* Jacket white inner shirt visible */}
        <mesh position={[0, -0.05, 0.145]}>
          <boxGeometry args={[0.14, 0.2, 0.005]} />
          <meshStandardMaterial color={shirtColor} roughness={0.9} />
        </mesh>
        {/* Small glowing accent line on jacket */}
        <mesh position={[-0.2, 0.15, 0.14]}>
          <boxGeometry args={[0.015, 0.08, 0.005]} />
          <meshStandardMaterial color={accentBlue} emissive={accentBlue} emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* === BACKPACK === */}
      <group position={[0, 1.1, -0.24]}>
        {/* Main body */}
        <RoundedBox args={[0.38, 0.52, 0.18]} radius={0.04} castShadow>
          <meshStandardMaterial color={backpackColor} roughness={0.85} />
        </RoundedBox>
        {/* Top handle */}
        <mesh position={[0, 0.29, 0.04]}>
          <boxGeometry args={[0.1, 0.04, 0.04]} />
          <meshStandardMaterial color="#333" roughness={0.9} />
        </mesh>
        {/* Front pocket */}
        <mesh position={[0, -0.08, 0.1]}>
          <boxGeometry args={[0.26, 0.2, 0.01]} />
          <meshStandardMaterial color="#222" roughness={0.9} />
        </mesh>
        {/* Pocket zipper */}
        <mesh position={[0, 0.01, 0.106]}>
          <boxGeometry args={[0.22, 0.015, 0.005]} />
          <meshStandardMaterial color="#555" metalness={0.5} roughness={0.4} />
        </mesh>
        {/* Water bottle visible on side */}
        <mesh position={[0.21, -0.05, 0.04]}>
          <cylinderGeometry args={[0.04, 0.04, 0.22, 10]} />
          <meshStandardMaterial color="#aaddff" transparent opacity={0.7} roughness={0.2} metalness={0.1} />
        </mesh>
        {/* Straps */}
        <mesh position={[-0.12, 0.05, 0.1]}>
          <boxGeometry args={[0.05, 0.55, 0.025]} />
          <meshStandardMaterial color={backpackStrap} roughness={0.9} />
        </mesh>
        <mesh position={[0.12, 0.05, 0.1]}>
          <boxGeometry args={[0.05, 0.55, 0.025]} />
          <meshStandardMaterial color={backpackStrap} roughness={0.9} />
        </mesh>
      </group>

      {/* === LEFT ARM === */}
      <group position={[-0.35, 1.08, 0]} rotation={[0.15, 0, -0.15]}>
        {/* Upper arm */}
        <mesh position={[0, -0.18, 0]} castShadow>
          <capsuleGeometry args={[0.07, 0.24, 8, 12]} />
          <meshStandardMaterial color={jacketColor} roughness={0.8} />
        </mesh>
        {/* Forearm */}
        <mesh position={[-0.04, -0.48, 0.06]} rotation={[0.3, 0, 0.1]} castShadow>
          <capsuleGeometry args={[0.055, 0.22, 8, 12]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
        {/* Hand */}
        <mesh position={[-0.05, -0.68, 0.12]}>
          <sphereGeometry args={[0.062, 10, 10]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
      </group>

      {/* === RIGHT ARM === */}
      <group position={[0.35, 1.08, 0]} rotation={[0.1, 0, 0.12]}>
        <mesh position={[0, -0.18, 0]} castShadow>
          <capsuleGeometry args={[0.07, 0.24, 8, 12]} />
          <meshStandardMaterial color={jacketColor} roughness={0.8} />
        </mesh>
        <mesh position={[0.04, -0.46, 0.04]} rotation={[0.2, 0, -0.08]} castShadow>
          <capsuleGeometry args={[0.055, 0.22, 8, 12]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
        <mesh position={[0.06, -0.65, 0.1]}>
          <sphereGeometry args={[0.062, 10, 10]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>
      </group>

      {/* === WAIST / BELT === */}
      <mesh position={[0, 0.77, 0]}>
        <boxGeometry args={[0.56, 0.06, 0.3]} />
        <meshStandardMaterial color="#1a1a2a" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.77, 0.16]}>
        <boxGeometry args={[0.08, 0.06, 0.01]} />
        <meshStandardMaterial color="#888" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* === LEFT LEG === */}
      <group position={[-0.14, 0.52, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.09, 0.38, 8, 12]} />
          <meshStandardMaterial color={pantsColor} roughness={0.85} />
        </mesh>
        {/* Lower leg */}
        <mesh position={[0, -0.44, 0]} castShadow>
          <capsuleGeometry args={[0.075, 0.34, 8, 12]} />
          <meshStandardMaterial color={pantsColor} roughness={0.85} />
        </mesh>
        {/* Shoe */}
        <mesh position={[0, -0.68, 0.06]}>
          <boxGeometry args={[0.14, 0.1, 0.24]} />
          <meshStandardMaterial color={shoeColor} roughness={0.7} />
        </mesh>
      </group>

      {/* === RIGHT LEG === */}
      <group position={[0.14, 0.52, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.09, 0.38, 8, 12]} />
          <meshStandardMaterial color={pantsColor} roughness={0.85} />
        </mesh>
        <mesh position={[0, -0.44, 0]} castShadow>
          <capsuleGeometry args={[0.075, 0.34, 8, 12]} />
          <meshStandardMaterial color={pantsColor} roughness={0.85} />
        </mesh>
        <mesh position={[0, -0.68, 0.06]}>
          <boxGeometry args={[0.14, 0.1, 0.24]} />
          <meshStandardMaterial color={shoeColor} roughness={0.7} />
        </mesh>
      </group>

      {/* === GLOW AURA === */}
      <mesh position={[0, 1.0, 0]}>
        <sphereGeometry args={[0.85, 16, 16]} />
        <meshStandardMaterial
          color={accentBlue}
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}
