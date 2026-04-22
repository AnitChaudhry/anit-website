# Anit Website — 12-Scene Storyboard

Reference panels for each waypoint in `ImmersiveCanvas.tsx`. Each panel includes
a ready-to-paste image prompt (Midjourney / SDXL / Story2Board / Sora). Palette
is locked to the site's three-color system: `#00d4ff` cyan (hero), `#6c63ff`
purple (accent), `#f5a623` gold (warmth) — on near-black `#03010a`.

**Shared style suffix (append to every prompt):**
> `cinematic 3D render, volumetric fog, rim lighting, shallow depth of field, painterly but clean, aspect ratio 16:9, deep-space backdrop with soft star field, color palette #00d4ff #6c63ff #f5a623 on #03010a`

---

## 01 — Arrival
- **Camera:** (0, 0.6, 4.2) → looking at character (0, 0.8, 0)
- **Subject:** Anit as stylised avatar standing inside a soft triple-ring portal
- **Beat:** First hello. Intimate, curious.
- **Prompt:** A slender genderless humanoid avatar in deep-space black outfit, glowing cyan outline, stepping forward through three concentric glowing rings, soft violet core behind, front-lit, medium close-up, eye contact with camera.

## 02 — World Changing
- **Camera:** (3, 3, 3.5) upper-right, looking down at (0, 1.5, -1)
- **Subject:** Four rising torus wave-crests stacked like technology epochs (Internet → Mobile → Cloud → AI)
- **Beat:** Epochs cresting one after another.
- **Prompt:** Four translucent glowing wave-crests rising sequentially from dark water, each crest larger and brighter than the last, top-right aerial angle, motion lines of light rising off each wave, sense of unstoppable momentum.

## 03 — Formation
- **Camera:** (3, 0, 2) lower-right, looking at (0, -1, -2)
- **Subject:** Low-poly temple/institution — plinth, four columns, pediment, doorway glowing, five books orbiting
- **Beat:** Where foundations were laid.
- **Prompt:** Minimalist low-poly classical temple at night, four columns lit from within, doorway radiating warm gold light, five softly glowing books drifting in orbit around the structure, camera looking up-left from the steps.

## 04 — Ignition
- **Camera:** (12, 4.5, -4) → looking at (16, 3, -10)
- **Subject:** Bright gold pulsing core, 300 particles radiating outward
- **Beat:** The spark. Pure energy.
- **Prompt:** A blinding gold-white star core suspended in void, 300 radiating embers flung outward in expanding sphere, lens flare, warm amber wash bleeding into deep cyan night, framed from the side at mid-distance.

## 05 — Frontfoot
- **Camera:** (17, 4, -10) → looking at (20, 3, -14)
- **Subject:** Tilted surfboard with accent stripe + arrow-cone tip + 5 ghost-trail spheres
- **Beat:** Riding the wave. Forward-leaning.
- **Prompt:** Sleek cyan-and-purple surfboard angled forward and upward through space, leaving five fading ghost-trail echoes behind it, speed streaks, no rider, composition reads right-to-left diagonal, sense of acceleration.

## 06 — Conviction
- **Camera:** (4, 0, -10) → looking at (0, -1, -14)
- **Subject:** 9-block wall split down the middle, bright purple light streaming through the gap
- **Beat:** Break through what blocks you.
- **Prompt:** A massive cracked stone wall splitting apart down the centre, brilliant purple-violet shaft of light piercing the gap, debris suspended in slow-motion, camera dead-on to the fracture, awe and defiance.

## 07 — Team
- **Camera:** (-8, 3, -13) → looking at (-14, 2, -18)
- **Subject:** Pentagon of 5 nodes (1 gold, 4 cyan) fully inter-connected
- **Beat:** Constellation of collaborators.
- **Prompt:** Five glowing orbs arranged in a pentagon, one gold and four cyan, connected by thin luminous lines forming a complete graph, floating in deep space, soft parallax stars behind, camera approaching from front-right at eye level.

## 08 — Product
- **Camera:** (5, -3, -17) → looking at (10, -5, -22)
- **Subject:** 5 glass agent-cards orbiting a central command sphere
- **Beat:** Agents in formation around the brain.
- **Prompt:** Five translucent frosted-glass cards in a vertical orbit around a central pulsing sphere, each card showing faint UI lines and a colored accent stripe, cyan command sphere at centre, isometric three-quarter view, sci-fi dashboard aesthetic.

## 09 — Build
- **Camera:** (0, -2, -21) → looking at (0, -3, -26)
- **Subject:** 6-node MCP DAG with flowing particles along edges
- **Beat:** Data pipelines, inputs → transforms → output.
- **Prompt:** Six rounded rectangular code-block nodes arranged in a left-to-right DAG graph, each node with a colored header bar and faint code lines inside, bright cyan data particles flowing along the connecting edges, dark workbench backdrop, front-on perspective.

## 10 — Voice
- **Camera:** (0, 1, -8) → looking at (0, 0, -16) — wide establishing, HTML post cards overlay
- **Subject:** Five LinkedIn post screenshots arrayed across the frame (not 3D — HTML overlay)
- **Beat:** Writing in public. The paper trail.
- **Prompt:** Five stacked translucent feed-post cards floating at varying depths across a dark cosmic background, each card glowing softly, slight parallax depth, clean editorial layout, wide panoramic framing.

## 11 — Philosophy
- **Camera:** (0, 6, -6) high, looking down at (0, 0, -12)
- **Subject:** 10 scattered purple nodes, each connected to a bright central white core
- **Beat:** Individual brilliance → collective execution.
- **Prompt:** Ten purple node-spheres scattered in a loose shell, each connected by a thin line to a blindingly bright white core at centre, top-down three-quarter view, converging energy, soft radial glow overall.

## 12 — Invitation
- **Camera:** (0, 0.8, 5) → looking at character (0, 0.8, 0)
- **Subject:** Character again, hand extended, portal dimmed behind
- **Beat:** Full circle. Your move.
- **Prompt:** Same humanoid avatar from panel 01, now facing camera directly with one hand extended outward toward the viewer, triple portal dimmed behind them, soft cyan backlight, intimate medium shot, invitation and warmth.

---

## How to use

### Option A — Batch-generate in Story2Board
1. Clone `DavidDinkevich/Story2Board`
2. Paste the 12 prompts above as the story list in their `run.py`
3. Outputs 12 character-consistent panels in one pass (good for avatar continuity across 01 and 12)

### Option B — Manual per-panel (Midjourney / SDXL / Sora)
Copy each prompt + the shared style suffix. Recommended settings:
- Midjourney: `--ar 16:9 --style raw --stylize 250`
- SDXL: 1024×576, CFG 7, 30 steps, DPM++ 2M Karras
- Sora: aspect 16:9, 5s clip, "cinematic handheld" motion preset

### Option C — Single mega-prompt for reference board
Paste all 12 prompts in one request to Claude/GPT-4V and ask for a 12-up contact sheet description, then feed that to an image model that supports layouts (Midjourney `--ar 4:3` with panel grid).

---

## Cross-reference with code

| # | Scene file | World position | Waypoint |
|---|---|---|---|
| 01 | `scenes/ArrivalPortal.tsx` + `AnitCharacter.tsx` | (0, 0, 0) | (0, 0.6, 4.2) |
| 02 | `scenes/WorldWaves.tsx` | (0, 1.5, -1) | (3, 3, 3.5) |
| 03 | `scenes/FormationBuilding.tsx` | (0, -1.2, -2) | (3, 0, 2) |
| 04 | `scenes/IgnitionCore.tsx` | (16, 3, -10) | (12, 4.5, -4) |
| 05 | `scenes/FrontfootSurfboard.tsx` | (20, 3, -14) | (17, 4, -10) |
| 06 | `scenes/ConvictionWall.tsx` | (0, -1, -14) | (4, 0, -10) |
| 07 | `scenes/TeamConstellation.tsx` | (-14, 2, -18) | (-8, 3, -13) |
| 08 | `scenes/ProductAgents.tsx` | (10, -5, -22) | (5, -3, -17) |
| 09 | `scenes/BuildNodes.tsx` | (0, -3, -26) | (0, -2, -21) |
| 10 | HTML overlay only | — | (0, 1, -8) |
| 11 | `scenes/PhilosophyConverge.tsx` | (0, 0, -12) | (0, 6, -6) |
| 12 | `ArrivalPortal.tsx` + `AnitCharacter.tsx` | (0, 0, 0) | (0, 0.8, 5) |
