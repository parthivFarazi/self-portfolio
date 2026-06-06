# Parthiv's World — Design Brief for Parthiv Farazi

> Extracted from the original design-phase chat transcript (May 15, 2026). Canonical reference for content + visual direction.

## The Project

Parthiv Farazi — CS @ Georgia Tech (graduating Dec 2026), Atlanta-based, originally lived in Kuala Lumpur. Co-founder & CTO of Update Analytics (UPDT.), an AI-driven soccer analytics platform. Targeting Software Engineering roles.

Interactive web portfolio where recruiters control a small avatar (looks like Parthiv) and walk around a dreamlike island. Every job, project, and section of the resume has its own dedicated, architecturally distinct building. Recruiters walk up to a building and step inside to learn about that piece of the story.

## Aesthetic Vision

**The Sims meets Studio Ghibli, on a floating dream island.**

- **Camera:** classic top-down isometric (Sims 1/2 angle, ~30° pitch, slight orthographic feel)
- **Style:** semi-realistic 3D — real shadows, ambient occlusion, depth, soft volumetric light. Not pixel art, not chibi, not flat low-poly. Think a polished Sims 4 build-mode screenshot crossed with Ghibli's painterly skies.
- **Lighting:** late-afternoon golden hour. Long soft shadows, warm rim light, glowing window interiors.
- **Sky:** pastel gradient (peach → lavender → teal) with one or two distant floating islands in the background as atmospheric depth.

## The World

The island mixes grounded realism and soft futurism. Cobblestone paths, lanterns, koi ponds, and trees blend with holographic glass towers, GPU racks, drones, and floating data displays. Every building stands on its own visually — no two share a silhouette.

## Layout — Spawn-Centric

The avatar spawns at the center of the island on a small plaza with a "Welcome" sign and a map pedestal.

**INNER RING** — closest to spawn, the three buildings that define the active core:
1. **UPDT. Soccer Stadium** — directly north of spawn (centerpiece, largest)
2. **RMAICT Tower** — east of spawn
3. **Delta Upsilon (Pong Frat House)** — south of spawn

**MID RING** — resume essentials, visible from spawn:
4. **The Tech Tower** (Education)
5. **The Petronas Towers** (About Me)
6. **The Forge** (Skills)
7. **The Lighthouse** (Contact)

**OUTER RING** — projects, scattered around the island's edge with winding paths:
8. **The Qard Greenhouse**
9. **The Athletic Stadium** (College Football Valuation)
10. **The Whispering Archive** (Embedding-Based Quote Retrieval)
11. **The Zen Garden** (Soothe)
12. **The Heatmap Garden** (xGenius)
13. **The Robot's Workshop** (Litter-Picking Robot)

A main loop path connects them all with smaller branching paths to the outer ring.

## Color Palette

- **Grass:** rich, slightly desaturated green (~`#6db862`) with painterly variation
- **Paths:** warm cream stone (~`#e8d5a8`)
- **Realistic builds:** warm browns, terracotta, mossy greens, brick
- **Futuristic accents:** soft cyan, magenta, mint
- **Interior light:** golden amber
- **Georgia Tech gold** (`#b3a369`) as a recurring accent

## The Buildings

### Inner Ring

**1. UPDT. Soccer Stadium — Company / CTO**
Largest, most prominent. Modern soccer stadium with translucent glass walls revealing a holographic pitch inside — player tracking dots, passing networks, animated heatmaps. UPDT-branded drones circle above. "UPDT." logo glows on the facade. Strongly futuristic.

**2. RMAICT Tower — AI Internship (Kuala Lumpur)**
Futuristic glass-and-steel high-rise with a Malaysian-inspired base — songket-pattern tilework, tropical greenery climbing partway up, amber lanterns. Upper floors: OCR scan beams visible through windows, ghostly paper receipts being digitized, faint Donut model neural diagram hovering above the roof.

**3. Delta Upsilon (Pong Frat House) — Baseball Automation App**
Two-story Greek revival fraternity house. White fluted columns, wide front porch, "ΔΥ" letters on the pediment, red Solo cups on the railing, "ΔΥ" welcome mat. Through the front window: a beer pong table with floating baseballs and cups showing live game scores. Small baseball diamond on the front lawn.

### Mid Ring

**4. The Tech Tower — Education**
Stylized homage to Georgia Tech's Tech Tower — Victorian red brick clock tower, white trim, gold "TECH" letters on top glowing softly. Plaza paved in GT gold. Floating bookshelf of coursework visible through the doorway.

**5. The Petronas Towers — About Me**
Stylized rendition of KLCC Petronas Towers — twin silver shafts, ribbed metallic facade, double-decker sky bridge at floors 41–42, tapered tops with slender pinnacles. Base: wooden welcome bench, globe with two glowing pins (KL + Atlanta), doormat "PF". Warm gold window lights.

**6. The Forge — Skills**
Half medieval blacksmith, half AI lab. Floating glowing language icons (Python, Java, C++, JS, etc.) hammered on an anvil that's actually a glowing GPU. Small H100 rack hums in the back. Sparks fly. Chimney puffs warm light.

**7. The Lighthouse — Contact**
Tall stone lighthouse at the island's edge, beam sweeping the clouds below. Base: vintage red mailbox, small UPDT-branded delivery drone, glowing terminal screen on a post showing social handles.

### Outer Ring

**8. The Qard Greenhouse — Fintech Frontend**
Futuristic geodesic greenhouse with sleek glass panels and a clean white frame. Inside: a garden of floating "Qard flowers" — each bloom is a tiny rotating 3D credit card. Soft neon trim, water feature, glowing "qard.dev" sign.

**9. The Athletic Stadium — College Football Valuation**
Mini college football stadium with painted yard lines, floating banners for Big Ten / SEC / ACC / Big 12. A magazine page hovering above the 50-yard line. Floating valuation numbers and dollar signs drift around the upper deck.

**10. The Whispering Archive — Quote Retrieval System**
Small ancient stone library with a glowing dome. Glowing quote-tags drift through the air like fireflies. Through the windows: an H100 GPU rack tucked between bookshelves. Ivy and brass plaques outside.

**11. The Zen Garden — Soothe (Mental Health App)**
Not a building. Japanese-inspired meditation garden — raked sand, koi pond, cherry tree with soft pulsing petals, stone bench with an open journal. The journal's pages occasionally glow.

**12. The Heatmap Garden — xGenius**
Ornamental flower garden where the flowers are planted in heatmap patterns — clusters of red/orange/yellow showing high-impact zones, cooling to blue at edges. Soccer ball at the center on a pedestal. Floating data placard above explaining the ORIS metric.

**13. The Robot's Workshop — Litter-Picking Robot**
Small, weathered wooden shed on a quiet corner. The original solar-powered litter robot rolls slowly across the grass outside. Inside: workbench with an Arduino board, CAD sketches pinned to the wall, small Malaysian flag.

## The Character

South Asian man, early twenties, semi-realistic Sims-proportioned avatar.

- Hair: short, dark black, neatly cut close on the sides, fuller on top
- Facial hair: short, well-groomed dark beard, clean jaw lines
- Skin: warm medium-tan
- Build: average build/height, confident upright posture
- Expression: warm, approachable smile

**Default outfit:**
- White button-down shirt, sleeves rolled to forearms
- Khaki/tan chinos with black leather belt
- Clean white sneakers or brown loafers
- **Signature:** bright Georgia Tech gold wristband on the left wrist (the visual through-line)
- Carrying: small laptop tucked under one arm

**Animations needed:** walking sprites for four directions, idle (stretch / glance at phone / arms-crossed), subtle building-entry pose.

## Reference Cues

The Sims 4 build mode · Studio Ghibli backgrounds (Castle in the Sky) · Stardew Valley warmth · Monument Valley geometry · Animal Crossing: New Horizons island layout · Death Stranding's minimalist UI · UPDT's own ScoutPro dashboard · Football Manager data viz · the actual Petronas Towers and Tech Tower as architectural references

---

## Content Bank

### Petronas Towers (About Me)

Hey, I'm Parthiv Farazi — a CS major at Georgia Tech (graduating Dec 2026) and Co-founder & CTO of Update Analytics (UPDT.). I grew up between Kuala Lumpur and Atlanta and I build things that sit at the intersection of sports, AI, and product. Most of my work comes from the same instinct: data should turn into decisions. Whether it's a soccer scouting platform, a baseball logging app, or an ML pipeline for quote retrieval — I like building things people actually use.

### Tech Tower (Education)

**Georgia Institute of Technology** — B.S. Computer Science (Expected Dec 2026)

Coursework: Data Structures · Algorithms · Discrete Math · OOP · Operating Systems · Algorithm Design & Analysis · Software Engineering · Linear Algebra · Machine Learning · Artificial Intelligence · Combinatorics · Systems and Networks · Cognitive Science

### UPDT. Stadium (Company)

**Co-founder & CTO — Update Analytics (UPDT.)** · 2026–Present · updt.pro

Building an AI-driven soccer analytics platform for clubs, scouts, and academies — taking raw match data and video, turning it into decisions.

- **ScoutPro:** player search, AI chatbot, league scatterplots, side-by-side comparisons, shortlists
- **Computer Vision Tracking:** automated player and ball tracking from any broadcast or tactical camera feed
- **Tactical Pattern Detection:** pressing patterns, build-up tendencies, transition sequences
- **Automated Match Reports:** post-match analysis delivered in hours, not days

### Qard Greenhouse (Frontend)

**Founding Frontend Developer — Qard (Fintech Startup)** · Jun–Aug 2025 · qard.dev

- Led design and development of Qard's production landing page; grew to 200+ users in under a month
- Built an interactive 3D card system in Three.js + Framer Motion, increasing average session duration by 40%
- Lazy-loaded heavy 3D assets, cutting initial page load by 35%

### RMAICT Tower (AI Internship)

**AI Engineer Intern — RMAICT International** · Kuala Lumpur · May–Aug 2024

- Used Hugging Face's Donut model to convert 1,000+ receipt images into structured JSON, reducing manual entry by 3 hours
- Initiated a transfer learning project extending the receipt model to invoices, saving another 2 hours

### Delta Upsilon / Pong Frat House (Project)

**Pong Baseball Automation App** · Nov 2025 – Jan 2026
React Native · Expo Go · Supabase · PostgreSQL

- Built and deployed a cross-platform mobile automation app, actively used by 70+ users across multiple locations
- Scalable Supabase backend with secure auth, real-time data access, and persistent cloud storage
- Replaced a paper-based logging system that required 2+ hours of post-game data entry

### The Athletic Stadium (Project)

**College Football Valuation** · Jan 2025 – Present
Python · Pandas · Excel · Valuation Models

- Partnered with Georgia Tech Athletics, with analyses to be featured in The Athletic
- Built valuation models for NCAA football programs across the Big Ten, SEC, ACC, and Big 12
- Applied adjusted media rights modeling, GDP deflators, and free cash flow projections to benchmark 60+ schools

### Whispering Archive (Project)

**Embedding-Based Quote Retrieval System** · Nov 2025
Python · FAISS · Hugging Face · PyTorch · Slurm HPC

- Engineered a semantic search system using FAISS + Gemma-3 embeddings, indexing 490k+ quotes with millisecond nearest-neighbor retrieval
- Parallelized inference on Georgia Tech's PACE H100 cluster, optimizing Slurm scripts and GPU memory usage

### Zen Garden (Project)

**Soothe — AI Mental Health App** · May–Jul 2025
React Native · FastAPI · Firebase · GCP · GPT-4

- Cross-platform journaling app using GPT-4 for personalized prompts, mood analysis, and wellness recommendations
- Led requirements engineering; deployed via Firebase, GCP App Engine, Firestore
- Maintained 90%+ unit test coverage with CI/CD via GitHub Actions

### Heatmap Garden (Project)

**xGenius** · April 2025
Python · Pandas · Matplotlib · Seaborn

- Developed a multi-stage Python pipeline to calculate Off-Ball Run Impact Score (ORIS) from 4 raw match datasets provided by the U.S. Soccer Federation
- Analyzed 1,000+ player movements per game; built heatmaps, bar charts, and scatter plots to identify high-impact match phases

### Robot's Workshop (Project)

**Litter-Picking Robot** · Jan–Apr 2021 · Kuala Lumpur
C++ · Arduino IDE · TinkerCAD · Fusion360

- Designed and built an automated, solar-powered litter-picking robot for local soccer fields, picking up 2 lbs of litter per session
- Reduced manual litter-picking labor by 3 hours; prototyped in TinkerCAD and Fusion360, programmed in C++

### The Forge (Skills)

**Languages:** Python · Java · C++ · C · Assembly · JavaScript · TypeScript · HTML/CSS · SQL
**Frameworks:** Django · Tailwind · React Native · FastAPI · Spring Boot · JUnit · Expo · Next.js
**AI/ML:** Hugging Face · FAISS · OpenAI GPT-4 · PyTorch · Gemma-3
**3D / Frontend:** Three.js · Framer Motion
**DevOps:** Docker · GitHub Actions · GCP · CI/CD · Slurm HPC · PACE Cluster (H100s)
**Data:** Supabase · Firebase · PostgreSQL · Pandas · Matplotlib

### The Lighthouse (Contact)

- Email: parthivfarazi@icloud.com
- Phone: +1 (404) 203-5379
- GitHub: github.com/parthivFarazi
- LinkedIn: linkedin.com/in/parthiv-farazi
- Company: updt.pro
