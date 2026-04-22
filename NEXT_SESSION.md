# Next Session — Rebuild Plan

## What shipped this session (clean slate)

- Deleted all 3D garbage: particles, stars, crude character, 10 scene
  geometries, neural net, floating rings, MainCanvas, legacy
  `src/components/scenes/Scene0*.tsx`.
- Gutted `page.tsx` so there is no 3D canvas — the backdrop is now a
  fixed subtle radial-gradient div. Lightweight, nothing to render.
- Rewrote `SceneOverlay.tsx` positioning: every scene uses a single
  uniform model — vertically centred, padded off the viewport by a
  `clamp(1.5rem, 6vw, 5rem)` gutter, horizontal alignment driven only by
  `align`. No more scattered per-scene `position` objects. Text can't
  clip or touch the edge.
- Scene 10 (Voice) marked `wide: true` so its 5-post strip gets
  `min(1040px, 92vw)` instead of the normal `min(58ch, 92vw)`.

## The core problem this did NOT fix

The site is still "read 12 paragraphs over a dark gradient." That's
better than the 3D trash, but it's not a portfolio that stops people.
Enricmor.eu's trick — the one this project must reproduce to earn the
same feel — is:

> **ONE world. Camera dollies forward along a single axis. Each scroll
> beat isn't a teleport to a new location — it's a new depth layer
> being revealed as the camera advances through the same scene.
> Parallax between layers sells the feeling of "scrolling INTO the
> image." You're not visiting 12 rooms, you're falling into one
> painting.**

We built 12 rooms. We have to rebuild as one painting.

## Next session — the rebuild

### Architecture: forward-dolly + depth layers

Single camera trajectory: `camera.position.z` dollies linearly from
`0 → −60` as scroll progresses `0 → 1`. Tiny sway on `x`/`y`
(`±0.3` max) for life, nothing that breaks the forward motion.

Instead of 12 scene-objects at scattered coordinates, place **depth
layers** along the z-axis. Each layer is a full-bleed 2D plane at a
fixed depth. As the camera advances, each plane grows larger on
screen, then passes the camera. The next plane becomes visible
behind it. Parallax is free — near layers pan faster than far ones
because perspective.

```
  camera ──► z:  0     −5    −10   −15   −20   −25   …   −60
                 │     │     │     │     │     │         │
   plane 01 ─────┘     │     │     │     │     │         │
   plane 02 ───────────┘     │     │     │     │         │
   plane 03 ─────────────────┘     │     │     │         │
   plane 04 ───────────────────────┘     │     │         │
   …                                                       │
   plane 12 ───────────────────────────────────────────────┘
```

### Layer content — pick one path

1. **Generated imagery (recommended).** Use `STORYBOARD.md` prompts
   in Midjourney / SDXL. One 4K still per scene → 12 PNGs in
   `public/scenes/`. Each plane textures one PNG. Cost: ~$0.60 on
   Replicate or ~1hr in Midjourney.

2. **Photography you already have.** If you have 12 strong images
   (work screenshots, photos, design artefacts), use those. Drop
   them in `public/scenes/scene-01.png … scene-12.png`.

3. **Pure typographic planes.** Each layer is a high-contrast text
   block (headline as massive type) rendered to texture. No
   imagery. Ships fastest, evaluates the motion alone.

Pick before starting next session. The plumbing is identical.

### Implementation checklist

1. Re-add `ImmersiveCanvas.tsx` (minimal):
   - `<Canvas>` with camera at `[0, 0, 0]`, fov 55
   - One `<PerspectiveCamera makeDefault>`
   - A `CameraRig` that reads `scrollProgressRef` and sets
     `camera.position.z = -scrollProgress * 60` plus smoothed sway
   - No fog, no stars, no lights (unlit materials)
2. Create `src/components/canvas/SceneLayer.tsx`:
   - Props: `imageUrl`, `z`, `scale` (size of the plane in world units)
   - Renders a `<mesh>` with `<planeGeometry args={[scale*aspect, scale]}>`
     and `<meshBasicMaterial map={texture} transparent />`
3. `SceneObjects.tsx` (new, thin):
   - Maps 12 entries from a `SCENE_LAYERS` array → 12 `<SceneLayer>`
     components at `z = -i * 5 - 2` (first layer just ahead of
     camera start, then every 5 units deeper)
4. Keep `scrollChoreography.ts` as is. It already emits the right
   per-scene opacity for the HTML overlay.
5. Delete the radial-gradient backdrop in `page.tsx` — the camera's
   black void behind the furthest plane IS the backdrop.
6. Remove `showPhoto` / profile photo from Scene 01 overlay — the
   plane's image IS the hero visual, no floating circle needed.

### Acceptance bar for next session

Scroll top → bottom with no text visible. Does it feel like you're
*moving through a space*? If yes, then layer the text back on. If no,
the camera speed or layer spacing is wrong — tune, don't add more
stuff.

Non-goal: do not re-add particles, stars, or decorative geometry. If
the answer ever feels like "add more", the architecture is wrong.

## Other debts to clear

- **Tailwind leftovers in globals.css** (`.scene`, `.headline`,
  `.subhead`, `.nav-dot`, etc.) — none used after the rewrite.
  Delete them and keep only `:root` tokens + body reset.
- **NavDots component** — verify it still works with the new
  centered layout. It's fine visually on the right edge.
- **Three.js packages** — still installed (`three`, `@react-three/fiber`,
  `@react-three/drei`). Needed for the rebuild above, so keep them.
- **Reference repos** at `D:\Anit Website\reference-repos\{cinematic-3d-portfolio,
  daksh-nahar-portfolio, three-altitudes}` — study `cameraKeyframes.ts`
  patterns before coding.

## If the image-plane approach also feels flat

Fallback: **single hero scene** (one plane, one image), static
page with scroll-driven typography. Linear/Vercel-style. Cut the
12-scene narrative entirely and lead with one striking image + one
paragraph. Portfolios don't need 12 scenes; they need 1 that lands.
