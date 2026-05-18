# Audio Credits — Resume World

## Current implementation

Most sounds in this build are synthesized at runtime via the Web Audio API
in `AudioManager.ts`. The human-voice proximity zones use bundled Mixkit
MP3 samples because procedural voice synthesis did not read as human.

- **Sporadic birds** — short sine sweeps at 2.2–3.6 kHz, fired every 6–14 sec
- **Background music** — bundled Mixkit stock music loop, played at low volume
  across the full site after the first user gesture
- **Grass footstep** — short pink-noise burst → lowpass 900 Hz
- **Stone footstep** — short white-noise burst → bandpass 2.2 kHz
- **UI prompt** — two-tone chime 880 → 1320 Hz
- **Panel open** — filtered noise sweep + 140 → 80 Hz sine "thud"
- **Panel close** — 280 → 180 Hz sine pop
- **Tile hover** — 2.4 kHz triangle tick
- **Per-building proximity zones** — distance-faded ambience:
  Mixkit sampled crowd, chatter, and whisper loops; synthesized forge hammer
  strikes, waves, water trickles, city bed, bell chimes, glass chimes,
  data pulses, heatmap tones, and robot-workshop servo clicks.

Bundled voice/crowd samples:

| Use | File | Source |
|---|---|---|
| Background music | `public/audio/mixkit-smooth-meditation-324.mp3` | Mixkit “Smooth Meditation” by Arulo |
| Stadium crowd | `public/audio/mixkit-huge-crowd-cheering-victory.mp3` | Mixkit “Huge crowd cheering victory” |
| Conversational chatter | `public/audio/mixkit-people-indoors-ambience.mp3` | Mixkit “People indoors ambience” |
| Archive whispers | `public/audio/mixkit-male-conspiracy-voices-whispers.mp3` | Mixkit “Male conspiracy voices whispers” |

Mixkit stock music and sound effects are published under their respective
Mixkit Free Licenses. Mixkit describes these assets as royalty-free for
commercial and personal projects, with no attribution required.

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
