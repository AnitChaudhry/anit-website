import * as THREE from 'three'

/**
 * Generates (and caches) a soft circular sprite texture.
 * Used as `map` on <pointsMaterial /> so points render as round dots
 * with a soft alpha falloff instead of hard colored squares.
 */
let cached: THREE.CanvasTexture | null = null

export function getCircularPointTexture(): THREE.CanvasTexture {
  if (cached) return cached
  if (typeof document === 'undefined') {
    // SSR guard — caller should only hit this on the client
    return null as unknown as THREE.CanvasTexture
  }
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  grad.addColorStop(0.0, 'rgba(255,255,255,1)')
  grad.addColorStop(0.4, 'rgba(255,255,255,0.85)')
  grad.addColorStop(0.8, 'rgba(255,255,255,0.1)')
  grad.addColorStop(1.0, 'rgba(255,255,255,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)
  cached = new THREE.CanvasTexture(canvas)
  cached.needsUpdate = true
  return cached
}
