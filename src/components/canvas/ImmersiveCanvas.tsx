'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Preload } from '@react-three/drei'
import { Suspense, useRef, type MutableRefObject } from 'react'
import * as THREE from 'three'
import SceneObjects from './SceneObjects'

type Waypoint = [number, number, number, number, number, number]

/**
 * 12 camera waypoints — one per scene.
 * Format: [x, y, z, lookAtX, lookAtY, lookAtZ]
 *
 * Coordinates are tuned to frame the scene-specific focal objects
 * placed in SceneObjects.tsx. Editing one without the other will
 * break the narrative flow — keep them in sync.
 *
 * The arc travels: character (scene 01) → arc right past waves →
 * ignition core at (16, 3, -10) → back through product/team/build →
 * return to character (scene 12 = full circle).
 */
const WAYPOINTS: Waypoint[] = [
  // 01 Arrival — close hero shot on character + portal (origin)
  [0, 0.6, 4.2, 0, 0.8, 0],

  // 02 World Changing — pull up-right to frame the 4 wave crests at (0,1.5,-1)
  [3, 3, 3.5, 0, 1.5, -1],

  // 03 Formation — drop down-right to frame the institution at (0,-1.2,-2)
  [3, 0, 2, 0, -1, -2],

  // 04 Ignition — fly far right to the bright core at (16, 3, -10)
  [12, 4.5, -4, 16, 3, -10],

  // 05 Frontfoot — continue right past ignition to the surfboard at (20,3,-14)
  [17, 4, -10, 20, 3, -14],

  // 06 Conviction — swing back through center, framing the wall at (0,-1,-14)
  [4, 0, -10, 0, -1, -14],

  // 07 Team — approach the constellation at (-14, 2, -18)
  [-8, 3, -13, -14, 2, -18],

  // 08 Product — fly to the agent ring at (10, -5, -22)
  [5, -3, -17, 10, -5, -22],

  // 09 Build — drop further back, framing the MCP graph at (0,-3,-26)
  [0, -2, -21, 0, -3, -26],

  // 10 Voice — wide establishing shot at mid-depth (HTML cards read over this)
  [0, 1, -8, 0, 0, -16],

  // 11 Philosophy — high, pulled-back overview of converging nodes at (0,0,-12)
  [0, 6, -6, 0, 0, -12],

  // 12 Invitation — return home, close on character (full circle)
  [0, 0.8, 5, 0, 0.8, 0],
]

const LAST_INDEX = WAYPOINTS.length - 1

type ScrollRef = MutableRefObject<number>

function CameraRig({ scrollProgressRef }: { scrollProgressRef: ScrollRef }) {
  const targetPos = useRef(new THREE.Vector3(
    WAYPOINTS[0][0], WAYPOINTS[0][1], WAYPOINTS[0][2],
  ))
  const targetLook = useRef(new THREE.Vector3(
    WAYPOINTS[0][3], WAYPOINTS[0][4], WAYPOINTS[0][5],
  ))
  const currentLook = useRef(new THREE.Vector3(
    WAYPOINTS[0][3], WAYPOINTS[0][4], WAYPOINTS[0][5],
  ))

  useFrame(({ camera }) => {
    const progress = scrollProgressRef.current * LAST_INDEX
    const sceneIndex = Math.floor(progress)
    const t = progress - sceneIndex

    // Smoothstep the scene-local t for gentler ease-in/out between waypoints.
    const eased = t * t * (3 - 2 * t)

    const fromIdx = Math.min(Math.max(sceneIndex, 0), LAST_INDEX)
    const toIdx = Math.min(fromIdx + 1, LAST_INDEX)
    const from = WAYPOINTS[fromIdx]
    const to = WAYPOINTS[toIdx]

    targetPos.current.set(
      from[0] + (to[0] - from[0]) * eased,
      from[1] + (to[1] - from[1]) * eased,
      from[2] + (to[2] - from[2]) * eased,
    )
    targetLook.current.set(
      from[3] + (to[3] - from[3]) * eased,
      from[4] + (to[4] - from[4]) * eased,
      from[5] + (to[5] - from[5]) * eased,
    )

    camera.position.lerp(targetPos.current, 0.08)
    currentLook.current.lerp(targetLook.current, 0.08)
    camera.lookAt(currentLook.current)
  })

  return null
}

export default function ImmersiveCanvas({
  scrollProgressRef,
}: {
  scrollProgressRef: ScrollRef
}) {
  return (
    <Canvas
      camera={{
        position: [WAYPOINTS[0][0], WAYPOINTS[0][1], WAYPOINTS[0][2]],
        fov: 55,
        near: 0.1,
        far: 200,
      }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        {/* Depth fog — distant scenes fade into the void */}
        <fog attach="fog" args={['#03010a', 15, 55]} />

        {/* Lighting — keyed cyan hero light + cooler fill + warm rim */}
        <ambientLight intensity={0.35} />
        <pointLight position={[2, 3, 4]} intensity={1.5} color="#00d4ff" distance={15} />
        <pointLight position={[-3, 2, 3]} intensity={0.8} color="#6c63ff" distance={12} />
        <pointLight position={[0, -1, 3]} intensity={0.5} color="#f5a623" distance={10} />

        {/* Deep-space backdrop */}
        <Stars
          radius={120}
          depth={60}
          count={3500}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />

        <SceneObjects />
        <CameraRig scrollProgressRef={scrollProgressRef} />

        <Preload all />
      </Suspense>
    </Canvas>
  )
}
