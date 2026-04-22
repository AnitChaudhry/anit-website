'use client'
import { Canvas } from '@react-three/fiber'
import { Stars, Preload, OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import ParticleWave from './ParticleWave'
import NeuralNetwork from './NeuralNetwork'
import FloatingRing from './FloatingRing'
import AnitCharacter from './AnitCharacter'

export default function MainCanvas({ scene }: { scene: number }) {
  return (
    <div className="canvas-wrapper">
      <Canvas camera={{ position: [0, 1.2, 7], fov: 55 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 8, 5]} intensity={1.2} color="#6c63ff" />
          <pointLight position={[-5, 3, 4]} intensity={0.8} color="#00d4ff" />
          <pointLight position={[0, -2, 6]} intensity={0.4} color="#f5a623" />

          <Stars radius={120} depth={60} count={4000} factor={4} saturation={0} fade speed={0.5} />

          {/* Scene 1 — 3D character + particles */}
          {scene === 0 && <AnitCharacter position={[2.5, -1.2, 0]} />}
          {scene === 0 && <ParticleWave count={3000} color="#6c63ff" amplitude={2} speed={0.3} />}
          {scene === 0 && <FloatingRing radius={4} color="#00d4ff" speed={0.15} tilt={0.6} />}
          {scene === 0 && <FloatingRing radius={6} color="#6c63ff" speed={-0.08} tilt={1.0} />}

          {/* Scene 2 — timeline waves */}
          {scene === 1 && <ParticleWave count={5000} color="#f5a623" amplitude={3} speed={0.5} />}

          {/* Scene 3 — constellation */}
          {scene === 2 && <NeuralNetwork nodeCount={30} spread={5} />}
          {scene === 2 && <FloatingRing radius={3.5} color="#f5a623" speed={0.2} tilt={0.3} />}

          {/* Scene 4 — neural ignition */}
          {scene === 3 && <NeuralNetwork nodeCount={80} spread={8} />}
          {scene === 3 && <ParticleWave count={2000} color="#00d4ff" amplitude={1} speed={0.8} />}

          {/* Scene 5 — conviction */}
          {scene === 4 && <ParticleWave count={1500} color="#6c63ff" amplitude={0.5} speed={0.2} />}

          {/* Scene 6 — frontfoot */}
          {scene === 5 && <ParticleWave count={3000} color="#00d4ff" amplitude={2} speed={0.6} />}
          {scene === 5 && <FloatingRing radius={5} color="#6c63ff" speed={0.12} tilt={0.8} />}

          {/* Scene 7 — team */}
          {scene === 6 && <NeuralNetwork nodeCount={50} spread={7} />}

          {/* Scene 8 — product */}
          {scene === 7 && <ParticleWave count={3000} color="#f5a623" amplitude={1.5} speed={0.4} />}
          {scene === 7 && <FloatingRing radius={4} color="#00d4ff" speed={0.18} tilt={0.5} />}

          {/* Scene 9 — build */}
          {scene === 8 && <NeuralNetwork nodeCount={60} spread={9} />}
          {scene === 8 && <ParticleWave count={1500} color="#6c63ff" amplitude={0.8} speed={0.5} />}

          {/* Scene 10 — voice */}
          {scene === 9 && <ParticleWave count={4000} color="#00d4ff" amplitude={1.2} speed={0.35} />}
          {scene === 9 && <FloatingRing radius={5.5} color="#f5a623" speed={0.1} tilt={0.7} />}

          {/* Scene 11 — philosophy */}
          {scene === 10 && <NeuralNetwork nodeCount={45} spread={6} />}
          {scene === 10 && <FloatingRing radius={4.5} color="#6c63ff" speed={-0.15} tilt={0.9} />}

          {/* Scene 12 — horizon */}
          {scene === 11 && <AnitCharacter position={[3, -1.2, -1]} />}
          {scene === 11 && <ParticleWave count={6000} color="#6c63ff" amplitude={2.5} speed={0.25} />}
          {scene === 11 && <ParticleWave count={2000} color="#00d4ff" amplitude={1.5} speed={0.45} />}
          {scene === 11 && <FloatingRing radius={3} color="#f5a623" speed={0.2} tilt={0.4} />}
          {scene === 11 && <FloatingRing radius={7} color="#00d4ff" speed={-0.06} tilt={1.2} />}

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
