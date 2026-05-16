# Audio Credits — Resume World

## Current implementation

**No external audio files are bundled.** Every sound in this build is
synthesized at runtime via the Web Audio API in `AudioManager.ts`:

- **Wind** — pink noise → lowpass filter with slow LFO modulation
- **Golden-hour pad** — 3 detuned sine/triangle oscillators at 110/220/330 Hz
- **Sporadic birds** — short sine sweeps at 2.2–3.6 kHz, fired every 6–14 sec
- **Grass footstep** — short pink-noise burst → lowpass 900 Hz
- **Stone footstep** — short white-noise burst → bandpass 2.2 kHz
- **UI prompt** — two-tone chime 880 → 1320 Hz
- **Panel open** — filtered noise sweep + 140 → 80 Hz sine "thud"
- **Panel close** — 280 → 180 Hz sine pop
- **Tile hover** — 2.4 kHz triangle tick
- **Per-building zones** — filtered pink noise variants per kind
  (`crowd`, `waves`, `whisper`, `city`, `chatter`, `glass-wind`, `server-hum`)
  and short event-driven tones (`hammer`, `water`, `bell`)

This satisfies the Phase 5 audio brief without bundling licensed samples.

## Why no sample files

Procuring CC0 / royalty-free samples for 10+ unique sounds is out of scope
for this iteration and would inflate the bundle by ~1–3 MB. Web Audio
synthesis is zero-asset and fully offline.

## How to upgrade to real samples (future)

Every public method on `Audio` (`footstep`, `uiPrompt`, `panelOpen`,
`panelClose`, `tileHover`, `enterZone`) is the only call site. Swap
the implementation of one method at a time to use a loaded `AudioBuffer`
from a file — no other code needs to change.

Recommended sources for replacement clips (all permissive licenses):

| Sound | Suggested source |
|---|---|
| Soft wind loop | freesound.org #244942 ("Wind in trees", CC0) |
| Distant birds | freesound.org #321750 ("Forest birds ambience", CC BY) |
| Grass footstep | freesound.org #480606 ("Grass footstep", CC0) |
| Stone footstep | freesound.org #346103 ("Stone floor footstep", CC0) |
| Page turn | freesound.org #345830 ("Soft page turn", CC0) |
| Soft click | freesound.org #270545 ("Click 6", CC0) |
| Stadium crowd | BBC Sound Effects archive, "Football crowd murmur" (RF) |
| Blacksmith hammer | freesound.org #382641 ("Anvil strikes", CC0) |
| Ocean waves | freesound.org #178367 ("Beach waves loop", CC0) |
| Water trickle | freesound.org #341984 ("Fountain trickle", CC0) |
| Library whispers | freesound.org #267149 ("Library ambience", CC BY) |
| City background | freesound.org #321725 ("Distant city traffic", CC0) |
| Bell chime | freesound.org #339809 ("Clock tower bell", CC0) |
| Glass wind chimes | freesound.org #277021 ("Wind chime soft", CC0) |
| Server room hum | freesound.org #339858 ("Server room hum", CC0) |

When swapping a sample in, store the loaded `AudioBuffer` on the
`AudioManagerImpl` instance (e.g. `this.footstepGrassBuffer = ...`) and
play it through the existing per-bus gain nodes (`footstepGain`,
`uiGain`, `zoneBus`) — the master-bus mute/persist behavior is already
wired up.

## Mute control

- Click the **speaker icon** in the top HUD bar (or tap on mobile)
- State persists in `localStorage['rw.audio.muted']`
- Master gain crossfades over 500 ms when toggled
