/**
 * Scroll-choreography helper — each of the 12 scenes is split into three phases:
 *   motion (0 → 22%)   camera entering, overlay fading in
 *   stop   (22 → 78%)  camera "dwelling" on the waypoint, overlay at full opacity
 *   resume (78 → 100%) camera leaving, overlay fading out
 *
 * Pattern adapted from CR2509/cinematic-3d-portfolio — it prevents two scenes'
 * overlay text from being simultaneously at full opacity and gives each scene
 * a clear readable beat even though the camera itself keeps moving.
 *
 * Scene 0 skips the motion phase (must be visible at page load, offset = 0).
 * Scene N-1 skips the resume phase (must stay visible at offset = 1).
 */

export const NUM_SCENES = 12

const SEGMENT_WIDTH = 1 / NUM_SCENES
const STOP_ZONE_START = 0.22
const STOP_ZONE_END = 0.78

export type SegmentPhase = 'motion' | 'stop' | 'resume'

export function getCurrentSegmentIndex(offset: number): number {
  return Math.min(Math.max(0, Math.floor(offset * NUM_SCENES)), NUM_SCENES - 1)
}

export function getSegmentPhase(offset: number): SegmentPhase {
  const i = getCurrentSegmentIndex(offset)
  const start = i * SEGMENT_WIDTH
  const localT = (offset - start) / SEGMENT_WIDTH
  if (localT < STOP_ZONE_START) return 'motion'
  if (localT < STOP_ZONE_END) return 'stop'
  return 'resume'
}

/** Per-scene overlay opacity 0..1 for the given global scroll offset. */
export function getSceneOpacity(offset: number, sceneIndex: number): number {
  const segStart = sceneIndex * SEGMENT_WIDTH
  const segEnd = segStart + SEGMENT_WIDTH
  if (offset < segStart || offset > segEnd) return 0

  const localT = (offset - segStart) / SEGMENT_WIDTH
  const isFirst = sceneIndex === 0
  const isLast = sceneIndex === NUM_SCENES - 1

  if (!isFirst && localT < STOP_ZONE_START) {
    return localT / STOP_ZONE_START
  }
  if (!isLast && localT > STOP_ZONE_END) {
    return 1 - (localT - STOP_ZONE_END) / (1 - STOP_ZONE_END)
  }
  return 1
}
