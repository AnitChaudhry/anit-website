'use client'
import ParticleWave from './ParticleWave'
import NeuralNetwork from './NeuralNetwork'
import FloatingRing from './FloatingRing'
import AnitCharacter from './AnitCharacter'
import ArrivalPortal from './scenes/ArrivalPortal'
import WorldWaves from './scenes/WorldWaves'
import FormationBuilding from './scenes/FormationBuilding'
import IgnitionCore from './scenes/IgnitionCore'
import FrontfootSurfboard from './scenes/FrontfootSurfboard'
import ConvictionWall from './scenes/ConvictionWall'
import TeamConstellation from './scenes/TeamConstellation'
import ProductAgents from './scenes/ProductAgents'
import BuildNodes from './scenes/BuildNodes'
import PhilosophyConverge from './scenes/PhilosophyConverge'

/**
 * All 3D content that lives in the world at once.
 *
 * Each scene-specific object is placed at a unique world-space
 * coordinate. The camera (see ImmersiveCanvas.tsx WAYPOINTS) physically
 * travels to each one as scroll progresses.
 *
 * The positions below MUST stay in sync with the waypoints' lookAt
 * targets — editing one without the other will break the framing.
 */
export default function SceneObjects() {
  return (
    <>
      {/* 01 / 12 — Arrival & Invitation — character + portal (origin) */}
      <group position={[0, 0, 0]}>
        <AnitCharacter position={[0, -0.7, 0]} />
        <ArrivalPortal position={[0, 0, 0]} />
      </group>

      {/* 02 — World Changing — 4 wave crests near origin, above-back */}
      <WorldWaves position={[0, 1.5, -1]} />

      {/* 03 — Formation — building silhouette off-left, lower */}
      <FormationBuilding position={[0, -1.2, -2]} />

      {/* 04 — Ignition — bright core far to the right */}
      <IgnitionCore position={[16, 3, -10]} />

      {/* 05 — Frontfoot — surfboard even further right, deeper in */}
      <FrontfootSurfboard position={[20, 3, -14]} />

      {/* 06 — Conviction — cracked wall ahead-low, center depth */}
      <ConvictionWall position={[0, -1, -14]} />

      {/* 07 — Team — constellation back-left */}
      <TeamConstellation position={[-14, 2, -18]} />

      {/* 08 — Product — 5-card agent orbit */}
      <ProductAgents position={[10, -5, -22]} />

      {/* 09 — Build — MCP code nodes deep center-back */}
      <BuildNodes position={[0, -3, -26]} />

      {/* 11 — Philosophy — converging nodes high-back */}
      <PhilosophyConverge position={[0, 0, -12]} />

      {/* ============================================================ */}
      {/* AMBIENT WORLD — backdrop filling the space between anchors   */}
      {/* ============================================================ */}

      {/* Backdrop neural network — large and subtle */}
      <group position={[0, 0, -8]}>
        <NeuralNetwork nodeCount={45} spread={11} />
      </group>

      {/* Particle fabric — three depth layers for parallax */}
      <group position={[0, 0, -2]}>
        <ParticleWave count={2000} color="#6c63ff" amplitude={1.2} speed={0.25} />
      </group>
      <group position={[5, 0, -15]}>
        <ParticleWave count={1400} color="#00d4ff" amplitude={1.3} speed={0.4} />
      </group>
      <group position={[-8, 2, -20]}>
        <ParticleWave count={1000} color="#f5a623" amplitude={1} speed={0.3} />
      </group>

      {/* Two quiet orbital rings around the character */}
      <group position={[0, 0, 0]}>
        <FloatingRing radius={4} color="#00d4ff" speed={0.08} tilt={0.6} />
      </group>
      <group position={[0, 0, 0]}>
        <FloatingRing radius={6.5} color="#6c63ff" speed={-0.05} tilt={1.0} />
      </group>
    </>
  )
}
