# Parthiv's World

An interactive portfolio built as a small world instead of a conventional personal website.

Live site: https://parthivfarazi.vercel.app  
Repository: https://github.com/parthivFarazi/self-portfolio

## What this project is

This project turns a resume into a place.

Instead of a landing page followed by a few generic sections, the portfolio is presented as a walkable island where each major part of Parthiv Farazi's story becomes its own building, landmark, or environment:

- UPDT becomes a soccer stadium.
- Georgia Tech becomes a stylized Tech Tower.
- About Me becomes the Petronas Twin Towers.
- Contact becomes a lighthouse.
- Projects become outer-ring structures like a greenhouse, archive, zen garden, workshop, and even a Game Boy cartridge.

The result is not "a website with some 3D on top." It is a portfolio whose navigation, storytelling, and visual identity are all tied to the same world metaphor.

The project also supports two different ways of consuming the same content:

- **Quick View** for someone who wants a fast, recruiter-friendly scan.
- **Exploration Mode** for someone willing to walk through the world and open the same panels in a more memorable format.

That "two speeds, same content" idea is the backbone of the whole codebase.

## The core idea

The site is designed around a simple product decision:

> Different visitors want different levels of depth, but the content should stay consistent.

That led to three top-level experiences:

| Mode | Purpose | What the visitor gets |
| --- | --- | --- |
| Landing | Orientation | A clear explanation of the two modes and a fast way into either one |
| Quick View | Speed | A flat, dashboard-like overview of work, projects, story, and contact |
| Exploration Mode | Memorability | A playable isometric island where each portfolio section is a building |

The same panel components are reused across Quick View and Exploration Mode. That means the site is not maintaining two separate versions of the portfolio. It is maintaining one content system with two presentation layers.

## The story of this project

This version of the portfolio was built in a fast, phase-based sprint between **May 15, 2026** and **May 20, 2026**, based on the repository history.

It started with a design brief and rough prototype material stored in [`design/`](design/):

- [`design/resume-world-design-brief.md`](design/resume-world-design-brief.md) contains the original vision for the world, buildings, mood, and content mapping.
- [`design/prototype/`](design/prototype/) contains early HTML/JSX design explorations.

The design brief already contained the important idea: a dreamlike floating island, a Sims-meets-Ghibli aesthetic, and a portfolio where every major item had its own structure.

From there, the implementation evolved in distinct phases visible in git history:

### Phase 0: Design capture

- Initial design prototype and extracted brief were checked into the repo.
- This preserved intent before production code existed.
- The project started from an articulated narrative and visual system, not from components looking for a theme.

### Phase 1: Playable world skeleton

- A basic isometric world was built first.
- The project established the camera, movement, island layout, and the idea that visitors would navigate spatially instead of scrolling through sections.
- This phase answered the most important feasibility question early: "Can the portfolio feel good as a world at all?"

### Phase 2: Content architecture

- A building registry and panel registry were introduced.
- A full vertical slice was built around UPDT first.
- Then all major panels were ported into the new system.

This was the moment the project stopped being just an experiment and became a real portfolio application. The content model, not just the visuals, started to solidify.

### Phase 3: World identity

- The island terrain, plaza, paths, materials, lighting foundation, and procedural buildings were added.
- Landmark structures such as Tech Tower and the Petronas-inspired About section were shaped into recognizable silhouettes.
- The player avatar was upgraded from a placeholder into a character that read as Parthiv.

This phase is where the project got its personality. It stopped being a tech demo and started feeling like a place with its own geography.

### Phase 4: Atmosphere and feel

- Decorative systems were added: trees, lanterns, rocks, flowers, particles, birds, distant islands, clouds.
- Camera breathing, camera approach zoom, and lighting/post-processing polish were layered in.
- Performance issues were addressed as soon as atmosphere started becoming expensive.

This is a recurring theme in the repo: whenever polish was added, performance constraints were revisited immediately rather than saved for the very end.

### Phase 5: Accessibility, content density, and launch polish

- Mobile touch controls were added.
- Panels were made responsive through scaled fixed-layout rendering.
- Audio, loading states, analytics, social metadata, and deployment settings were added.
- Quick View matured into a first-class route rather than a side experiment.
- Later iterations refined minimap behavior, readability, panel copy, and visual clarity.

The final shape of the project came from this phase: not just a world that looked good, but a portfolio that could actually be used by a recruiter on desktop or mobile without getting lost.

## What the world represents

The portfolio is organized in rings around the spawn plaza.

### Inner ring

The closest buildings communicate the most active and central work:

| Building | Meaning |
| --- | --- |
| UPDT. Soccer Stadium | Co-founder and CTO work on AI soccer analytics |
| RMAICT Tower | AI internship work on document intelligence |
| Delta Upsilon | The baseball stat-tracking app / Pong project |

### Mid ring

The next layer contains the core identity pieces of the portfolio:

| Building | Meaning |
| --- | --- |
| Tech Tower | Education |
| Petronas Twin Towers | About Me / personal background |
| The Forge | Skills and tools |
| The Lighthouse | Contact |

### Outer ring

The outer ring holds the broader project archive:

| Building | Meaning |
| --- | --- |
| Qard Greenhouse | Fintech frontend work |
| Athletic Stadium | College football valuation project |
| Whispering Archive | Semantic quote retrieval system |
| Zen Garden | Mental-health journaling app |
| Heatmap Garden | Off-ball soccer analytics |
| Robot's Workshop | Early robotics origin project |
| The Cartridge | Game Boy Advance game project |

This layout is not arbitrary. The closer something is to spawn, the more central it is to the current professional story.

## How it was made

### 1. App shell and routing

The app is a Vite + React + TypeScript single-page application.

Top-level route handling lives in [`src/App.tsx`](src/App.tsx). There is no external routing library here because the project only needs three routes and they are all tightly controlled:

- `/` -> landing
- `/quick` -> quick view
- `/explore` -> world mode

Each route is lazy loaded:

- [`src/routes/LandingRoute.tsx`](src/routes/LandingRoute.tsx)
- [`src/routes/QuickRoute.tsx`](src/routes/QuickRoute.tsx)
- [`src/routes/ExploreRoute.tsx`](src/routes/ExploreRoute.tsx)

That keeps the initial page lighter and delays the 3D world until someone actually asks for it.

### 2. A single source of truth for portfolio locations

The most important content file in the repo is [`src/data/buildings.ts`](src/data/buildings.ts).

Each building definition includes:

- a stable `id`
- human-readable labels
- a one-line subtitle
- ring placement
- world position
- geometric footprint
- trigger radius
- modal panel size

That one file connects multiple systems:

- the world layout
- the proximity detection logic
- the building labels
- the minimap
- the camera framing behavior
- the modal panel dimensions

Because of that, adding a new portfolio item is not "just make a card." It is "teach the world a new landmark."

### 3. A content system reused in two modes

The panels are the real content payload of the site.

Each building has a themed panel component inside [`src/components/panels/`](src/components/panels/). Those panels are loaded through [`src/components/panels/panelRegistry.ts`](src/components/panels/panelRegistry.ts), which lazy-loads the matching React component for a building id.

That registry is used in two separate places:

- [`src/components/ui/BuildingDialog.tsx`](src/components/ui/BuildingDialog.tsx) for Exploration Mode
- [`src/components/quick-view/QuickView.tsx`](src/components/quick-view/QuickView.tsx) for Quick View

This is the project's cleanest architectural decision:

- the island and the dashboard are two ways to open the same portfolio panels
- copy changes only need to be made once
- visual storytelling can diverge while content stays consistent

### 4. The 3D world

The world scene is assembled in [`src/world/Scene.tsx`](src/world/Scene.tsx).

The scene is composed from:

- [`src/world/Island.tsx`](src/world/Island.tsx)
- [`src/world/Plaza.tsx`](src/world/Plaza.tsx)
- [`src/world/buildings/Buildings.tsx`](src/world/buildings/Buildings.tsx)
- [`src/world/decorations/Decorations.tsx`](src/world/decorations/Decorations.tsx)
- [`src/world/atmosphere/Atmosphere.tsx`](src/world/atmosphere/Atmosphere.tsx)
- [`src/world/lighting.tsx`](src/world/lighting.tsx)
- [`src/world/PostFX.tsx`](src/world/PostFX.tsx)

The building layer is especially important. [`src/world/buildings/Buildings.tsx`](src/world/buildings/Buildings.tsx) acts as a dispatcher that:

- reads every building from the shared building data file
- keeps far-away buildings as lightweight placeholders
- lazily swaps in the custom building component when the player gets near

That LOD-style behavior matters because the world contains many custom structures and visual polish layers.

### 5. Camera and movement

The camera is one of the strongest "feel" systems in the project.

[`src/world/IsometricCamera.tsx`](src/world/IsometricCamera.tsx) does more than just sit at an angle:

- it keeps an orthographic isometric view
- it follows the player smoothly
- it subtly "breathes" to avoid a dead static look
- it zooms in slightly when the player approaches a building
- it biases upward near tall structures so towers stay framed well

Movement and interaction live in [`src/world/Player.tsx`](src/world/Player.tsx).

That file handles:

- keyboard movement
- touch joystick input
- collision against building footprints
- island boundary constraints
- walking animation
- footstep audio
- proximity checks
- zone labels
- preloading nearby panels

Nearby building detection is intentionally simple and reliable: [`src/hooks/useProximity.ts`](src/hooks/useProximity.ts) finds the nearest building inside its trigger radius. For a portfolio, clarity beats overengineering.

### 6. Panel design strategy

The portfolio panels are not fluid layouts in the normal responsive-web sense.

They were authored as fixed-dimension compositions and then scaled uniformly to fit smaller screens. That behavior is implemented in [`src/components/ui/ResponsivePanel.tsx`](src/components/ui/ResponsivePanel.tsx).

This decision preserved the designed look of:

- parchment-style education panels
- dark sci-fi analytics panels
- dashboard grids
- posters, stats, ribbons, badges, and screenshot frames

Instead of rewriting every panel into a fully fluid mobile layout, the repo preserves composition and scales the whole piece down when needed.

That tradeoff fits the product well because these panels behave more like designed slides or exhibits than ordinary article sections.

### 7. Quick View

Quick View is not a reduced version of the portfolio. It is the fast mode.

[`src/components/quick-view/QuickView.tsx`](src/components/quick-view/QuickView.tsx) organizes the same portfolio into:

- grouped tiles
- headline stats
- a clearer recruiter-oriented scan path
- modal panel opening behavior that mirrors the world mode

This route exists because an interactive world is memorable, but not every visitor wants to navigate a world just to understand someone's background.

The landing page says it directly: "a portfolio in two speeds."

### 8. Audio

Audio is handled in [`src/audio/AudioManager.ts`](src/audio/AudioManager.ts) and unlocked on first gesture in [`src/main.tsx`](src/main.tsx).

The audio system mixes:

- Web Audio API synthesis for UI feedback, footsteps, and several ambient cues
- bundled sampled loops for music, crowd, chatter, and whispers
- zone-based audio changes depending on which building the player is near

Credits and licensing notes are documented in [`src/audio/CREDITS.md`](src/audio/CREDITS.md).

This is a smart fit for the project: it adds atmosphere without requiring a huge library of heavy sound assets.

### 9. Performance decisions

This repo repeatedly chooses pragmatism over purity.

Key examples:

- Route-level lazy loading keeps the explore bundle off the landing page until needed.
- The building dispatcher keeps distant structures as simple placeholders.
- Panel components are lazy loaded on demand.
- The world supports a `liteWorld` mode that disables expensive effects on smaller or coarse-pointer devices.
- Vite is configured to dedupe `three` so React Three Fiber and postprocessing share the same instance.
- Screenshots are imported as compressed assets, with many project images stored in `images-webp/`.

The build still contains a large Explore chunk, but the code is already structured so that the heavy part is deferred until someone actively enters the island.

### 10. Deployment

The site is deployed on Vercel as a static SPA.

[`vercel.json`](vercel.json) configures:

- `npm install`
- `npm run build`
- `dist/` as the output directory
- a rewrite to `index.html` for SPA routing

Vercel Analytics is mounted in [`src/main.tsx`](src/main.tsx).

## Repository structure

```text
.
|-- design/
|   |-- prototype/                 # early design/prototype files
|   |-- quick-view/                # quick-view handoff material
|   `-- resume-world-design-brief.md
|-- images/                        # source image assets
|-- images-webp/                   # optimized web assets used in panels
|-- public/
|   |-- audio/
|   |-- quick-view/
|   |-- resume.pdf
|   |-- og-image.jpg
|   |-- robots.txt
|   `-- sitemap.xml
|-- src/
|   |-- audio/
|   |-- components/
|   |   |-- panels/
|   |   |-- quick-view/
|   |   `-- ui/
|   |-- constants/
|   |-- data/
|   |-- hooks/
|   |-- routes/
|   |-- state/
|   `-- world/
|       |-- atmosphere/
|       |-- buildings/
|       `-- decorations/
|-- index.html
|-- package.json
|-- vercel.json
`-- vite.config.ts
```

## Notable files

If you want to understand the project quickly, start here:

- [`src/App.tsx`](src/App.tsx) - top-level route shell
- [`src/data/buildings.ts`](src/data/buildings.ts) - the main portfolio world model
- [`src/world/Scene.tsx`](src/world/Scene.tsx) - world composition
- [`src/world/Player.tsx`](src/world/Player.tsx) - movement, collisions, proximity, panel preloading
- [`src/world/IsometricCamera.tsx`](src/world/IsometricCamera.tsx) - camera behavior
- [`src/components/panels/panelRegistry.ts`](src/components/panels/panelRegistry.ts) - lazy panel loading
- [`src/components/quick-view/QuickView.tsx`](src/components/quick-view/QuickView.tsx) - the fast-mode portfolio UI
- [`src/components/ui/BuildingDialog.tsx`](src/components/ui/BuildingDialog.tsx) - modal panel renderer
- [`src/audio/AudioManager.ts`](src/audio/AudioManager.ts) - synthesized and sampled audio control
- [`design/resume-world-design-brief.md`](design/resume-world-design-brief.md) - original design intent

## Running the project locally

### Requirements

- Node.js
- npm

### Install

```bash
npm install
```

### Start the dev server

```bash
npm run dev
```

The default dev server is configured in [`vite.config.ts`](vite.config.ts) to use port `5273`.

### Production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Bundle analysis

```bash
npm run build:analyze
```

This writes a bundle report to `dist/stats.html`.

### Useful dev toggles

- Add `?lite=1` to force the lighter world mode.
- Add `?lite=0` to force the full post-processing path.
- In development, `window.__game` exposes the Zustand store for debugging.
- In development, `window.__r3f` exposes the active renderer, scene, and camera.

## Controls

### Desktop

- `WASD` to move
- `E` to interact / open a nearby panel
- `Esc` to close a panel

### Mobile / touch

- Drag the joystick to move
- Tap the `E` button to open or close a panel
- Use the speaker button in the HUD to mute or unmute audio

## How to extend the portfolio

To add a new project or story location cleanly:

1. Add the building metadata in [`src/data/buildings.ts`](src/data/buildings.ts).
2. Create the 3D structure in [`src/world/buildings/`](src/world/buildings/).
3. Register the building loader in [`src/world/buildings/Buildings.tsx`](src/world/buildings/Buildings.tsx).
4. Create the portfolio panel in [`src/components/panels/`](src/components/panels/).
5. Register the panel in [`src/components/panels/panelRegistry.ts`](src/components/panels/panelRegistry.ts).
6. Add a tile in Quick View inside [`src/components/quick-view/QuickView.tsx`](src/components/quick-view/QuickView.tsx) if it should appear there.
7. Import screenshots or artwork through [`src/components/panels/panelImages.ts`](src/components/panels/panelImages.ts) when needed.

That separation keeps the content model, 3D representation, and flat UI representation aligned.

## Why this portfolio matters

The interesting part of this project is not only that it is "interactive."

The interesting part is that it tries to answer a real portfolio problem:

- How do you make technical work memorable without hiding the substance?
- How do you let busy people skim quickly without flattening everything into a resume clone?
- How do you make a personal website feel authored instead of assembled?

This repo's answer is:

- keep the content real
- keep the architecture disciplined
- let the presentation be ambitious

## Future directions

If this project keeps evolving, the most natural next steps would be:

- deeper panel prefetching and chunking for the Explore route
- richer minimap or world guidance without losing the sense of discovery
- more polished animation transitions between landing, quick view, and world
- additional ambient sound samples replacing more synthesized placeholders
- a cleaner authoring workflow for panel content updates

## Credits

- Built with React, TypeScript, Vite, React Three Fiber, Drei, Framer Motion, Zustand, and Vercel.
- Audio sample notes and licenses live in [`src/audio/CREDITS.md`](src/audio/CREDITS.md).
- Original world direction is documented in [`design/resume-world-design-brief.md`](design/resume-world-design-brief.md).

## Final note

This project is best understood as a portfolio product, not just a frontend exercise.

It combines narrative design, spatial UI, interactive graphics, motion, audio, content strategy, and deployment discipline into one personal site. The code matters, but the bigger point is that the code is in service of a very specific story: turning a resume into a world that people can remember.
