// AudioManager — singleton Web Audio orchestrator for Parthiv's World.
//
// Why no Howler.js: we have no audio files in this bundle, and procuring
// CC0 samples is out of scope for Phase 5. Instead we synthesize every
// sound directly with Web Audio (oscillators + filtered noise). The public
// surface (footstep/uiPrompt/panelOpen/...) is asset-agnostic, so swapping
// to real samples later is a localized change inside this file.
//
// Browser autoplay policy: AudioContext starts suspended. Call ensureStart()
// from any user gesture handler before triggering anything else.

import type { BuildingId } from '@/data/buildings';

const MUTE_KEY = 'rw.audio.muted';
const MASTER_VOLUME = 0.7;
const BACKGROUND_MUSIC_GAIN = 0.08;

const BUILDING_ZONES: Record<BuildingId, ZoneConfig> = {
  updt: { kind: 'stadium-crowd', gain: 0.55 },
  rmaict: { kind: 'data-pulse', gain: 0.42 },
  du: { kind: 'chatter', gain: 0.24 },
  tech: { kind: 'bell', gain: 0.55 },
  petronas: { kind: 'city', gain: 0.36 },
  forge: { kind: 'hammer', gain: 0.68 },
  lighthouse: { kind: 'waves', gain: 0.5 },
  qard: { kind: 'glass-wind', gain: 0.34 },
  athletic: { kind: 'stadium-crowd', gain: 0.42 },
  archive: { kind: 'whisper', gain: 0.2 },
  zen: { kind: 'water', gain: 0.42 },
  heatmap: { kind: 'heatmap-tones', gain: 0.34 },
  workshop: { kind: 'robot-workshop', gain: 0.4 },
  // The Cartridge — gentle 8-bit electronic shimmer. Reuses the existing
  // data-pulse synth at a quieter gain since the GBA is small.
  gba: { kind: 'data-pulse', gain: 0.22 },
};

interface ZoneConfig {
  kind:
    | 'stadium-crowd'
    | 'hammer'
    | 'waves'
    | 'water'
    | 'whisper'
    | 'city'
    | 'bell'
    | 'chatter'
    | 'glass-wind'
    | 'data-pulse'
    | 'heatmap-tones'
    | 'robot-workshop';
  gain: number;
}

interface ZoneNodes {
  gain: GainNode;
  cleanup?: () => void;
}

function loadMute(): boolean {
  try {
    return localStorage.getItem(MUTE_KEY) === '1';
  } catch {
    return false;
  }
}

function saveMute(m: boolean) {
  try {
    localStorage.setItem(MUTE_KEY, m ? '1' : '0');
  } catch {
    // ignore
  }
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

class AudioManagerImpl {
  ctx: AudioContext | null = null;
  master: GainNode | null = null;
  musicGain: GainNode | null = null;
  ambientGain: GainNode | null = null;
  uiGain: GainNode | null = null;
  footstepGain: GainNode | null = null;
  zoneBus: GainNode | null = null;
  pinkBuffer: AudioBuffer | null = null;
  whiteBuffer: AudioBuffer | null = null;
  muted = loadMute();
  initialized = false;
  zones: Map<BuildingId, ZoneNodes> = new Map();
  activeZone: BuildingId | null = null;
  lastFootstepAt = 0;
  listeners: Set<() => void> = new Set();

  /** Lazy init from a user gesture. Safe to call multiple times. */
  ensureStart() {
    if (this.initialized) return;
    if (typeof window === 'undefined') return;

    const W = window as unknown as { webkitAudioContext?: typeof AudioContext };
    const Ctor = window.AudioContext || W.webkitAudioContext;
    if (!Ctor) return;

    this.ctx = new Ctor();
    this.initialized = true;

    // Master chain: master → destination
    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : MASTER_VOLUME;
    this.master.connect(this.ctx.destination);

    // Sub-buses
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = BACKGROUND_MUSIC_GAIN;
    this.musicGain.connect(this.master);

    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.value = 1.0;
    this.ambientGain.connect(this.master);

    this.uiGain = this.ctx.createGain();
    this.uiGain.gain.value = 1.0;
    this.uiGain.connect(this.master);

    this.footstepGain = this.ctx.createGain();
    this.footstepGain.gain.value = 1.0;
    this.footstepGain.connect(this.master);

    this.zoneBus = this.ctx.createGain();
    this.zoneBus.gain.value = 1.0;
    this.zoneBus.connect(this.master);

    // Pre-bake noise buffers
    this.pinkBuffer = makePinkBuffer(this.ctx, 4);
    this.whiteBuffer = makeWhiteBuffer(this.ctx, 0.3);

    // Start base ambient layer (sporadic birds)
    this.startBirdLoop();
    this.startBackgroundMusic();

    // Resume context if it was suspended
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
  }

  /** Master mute toggle. Crossfades to/from silence. */
  setMuted(m: boolean) {
    this.muted = m;
    saveMute(m);
    if (this.master && this.ctx) {
      const now = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setValueAtTime(this.master.gain.value, now);
      this.master.gain.linearRampToValueAtTime(m ? 0 : MASTER_VOLUME, now + 0.5);
    }
    this.listeners.forEach((cb) => cb());
  }

  isMuted(): boolean {
    return this.muted;
  }

  subscribe(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  // ── Ambient base layers ─────────────────────────────────────────────
  private startBirdLoop() {
    if (!this.ctx) return;
    const schedule = () => {
      if (!this.ctx || !this.ambientGain) return;
      const t = this.ctx.currentTime + 0.05;
      this.birdChirp(t);
      // 6–14 sec between chirps
      const next = 6000 + Math.random() * 8000;
      window.setTimeout(schedule, next);
    };
    window.setTimeout(schedule, 2500);
  }

  private birdChirp(when: number) {
    if (!this.ctx || !this.ambientGain) return;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    const g = this.ctx.createGain();
    const base = 2200 + Math.random() * 1400;
    osc.frequency.setValueAtTime(base, when);
    osc.frequency.exponentialRampToValueAtTime(base * 1.6, when + 0.08);
    osc.frequency.exponentialRampToValueAtTime(base * 0.7, when + 0.16);
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(0.025, when + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, when + 0.22);
    osc.connect(g).connect(this.ambientGain);
    osc.start(when);
    osc.stop(when + 0.3);
  }

  private startBackgroundMusic() {
    if (!this.ctx || !this.musicGain) return;

    const progression = [
      [261.63, 392.0, 523.25],
      [293.66, 440.0, 587.33],
      [329.63, 493.88, 659.25],
      [293.66, 440.0, 587.33],
    ] as const;

    let chordIndex = 0;
    const playChord = () => {
      if (!this.ctx || !this.musicGain) return;
      const t = this.ctx.currentTime;
      const chord = progression[chordIndex % progression.length];
      chordIndex += 1;

      chord.forEach((frequency, idx) => {
        const osc = this.ctx!.createOscillator();
        osc.type = idx === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(frequency, t);
        osc.frequency.linearRampToValueAtTime(frequency * 0.5, t + 3.1);

        const filter = this.ctx!.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 900 + idx * 260;
        filter.Q.value = 0.8;

        const gain = this.ctx!.createGain();
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.linearRampToValueAtTime(BACKGROUND_MUSIC_GAIN / (idx === 0 ? 1.4 : 2.2), t + 0.55);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 3.4);

        osc.connect(filter).connect(gain).connect(this.musicGain!);
        osc.start(t);
        osc.stop(t + 3.6);
      });
    };

    playChord();
    window.setInterval(playChord, 2600);
  }

  // ── Footsteps ───────────────────────────────────────────────────────
  /** Trigger a single footstep on the given surface. Auto-throttled. */
  footstep(surface: 'grass' | 'stone') {
    if (!this.ctx || !this.footstepGain || !this.whiteBuffer) return;
    const now = performance.now();
    if (now - this.lastFootstepAt < 220) return; // throttle to ~4.5/s
    this.lastFootstepAt = now;

    const t0 = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.whiteBuffer;
    src.playbackRate.value = surface === 'stone' ? 1.1 : 0.85;
    const filt = this.ctx.createBiquadFilter();
    filt.type = surface === 'stone' ? 'bandpass' : 'lowpass';
    filt.frequency.value = surface === 'stone' ? 2200 : 900;
    filt.Q.value = surface === 'stone' ? 1.6 : 0.7;
    const g = this.ctx.createGain();
    // ADSR-ish: very short
    const peak = surface === 'stone' ? 0.18 : 0.13;
    const decay = surface === 'stone' ? 0.07 : 0.11;
    // Slight pitch jitter via playbackRate
    src.playbackRate.value *= 0.94 + Math.random() * 0.12;
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(peak, t0 + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + decay);
    src.connect(filt).connect(g).connect(this.footstepGain);
    src.start(t0);
    src.stop(t0 + decay + 0.05);
  }

  // ── UI sounds ───────────────────────────────────────────────────────
  uiPrompt() {
    if (!this.ctx || !this.uiGain) return;
    const t0 = this.ctx.currentTime;
    [880, 1320].forEach((f, i) => {
      const o = this.ctx!.createOscillator();
      o.type = 'sine';
      o.frequency.value = f;
      const g = this.ctx!.createGain();
      const start = t0 + i * 0.04;
      g.gain.setValueAtTime(0, start);
      g.gain.linearRampToValueAtTime(0.08, start + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, start + 0.32);
      o.connect(g).connect(this.uiGain!);
      o.start(start);
      o.stop(start + 0.4);
    });
  }

  panelOpen() {
    if (!this.ctx || !this.uiGain || !this.whiteBuffer) return;
    const t0 = this.ctx.currentTime;
    // Soft "page" — filtered noise sweep
    const src = this.ctx.createBufferSource();
    src.buffer = this.whiteBuffer;
    const filt = this.ctx.createBiquadFilter();
    filt.type = 'lowpass';
    filt.frequency.setValueAtTime(800, t0);
    filt.frequency.exponentialRampToValueAtTime(2400, t0 + 0.18);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.12, t0 + 0.05);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.26);
    src.connect(filt).connect(g).connect(this.uiGain);
    src.start(t0);
    src.stop(t0 + 0.3);

    // Soft thud below it — sine 110→90
    const o = this.ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(140, t0);
    o.frequency.exponentialRampToValueAtTime(80, t0 + 0.16);
    const og = this.ctx.createGain();
    og.gain.setValueAtTime(0, t0);
    og.gain.linearRampToValueAtTime(0.18, t0 + 0.01);
    og.gain.exponentialRampToValueAtTime(0.001, t0 + 0.22);
    o.connect(og).connect(this.uiGain);
    o.start(t0);
    o.stop(t0 + 0.3);
  }

  panelClose() {
    if (!this.ctx || !this.uiGain) return;
    const t0 = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(280, t0);
    o.frequency.exponentialRampToValueAtTime(180, t0 + 0.08);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.1, t0 + 0.005);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.14);
    o.connect(g).connect(this.uiGain);
    o.start(t0);
    o.stop(t0 + 0.2);
  }

  tileHover() {
    if (!this.ctx || !this.uiGain) return;
    const t0 = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    o.type = 'triangle';
    o.frequency.value = 2400;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.025, t0 + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.06);
    o.connect(g).connect(this.uiGain);
    o.start(t0);
    o.stop(t0 + 0.1);
  }

  // ── Building zones ──────────────────────────────────────────────────
  /** Crossfade to the building zone for `id` (or null = base ambient only). */
  enterZone(id: BuildingId | null, intensity = 1) {
    if (id && !this.initialized) this.ensureStart();
    if (!this.ctx || !this.zoneBus) return;
    if (this.ctx.state === 'suspended') void this.ctx.resume();

    const now = this.ctx.currentTime;
    const amount = clamp01(intensity);

    if (id === this.activeZone) {
      if (!id) return;
      const cfg = BUILDING_ZONES[id];
      const z = this.zones.get(id);
      if (!z) return;
      const nextGain = cfg.gain * amount;
      if (Math.abs(z.gain.gain.value - nextGain) < 0.015) return;
      z.gain.gain.cancelScheduledValues(now);
      z.gain.gain.setValueAtTime(z.gain.gain.value, now);
      z.gain.gain.linearRampToValueAtTime(nextGain, now + 0.18);
      return;
    }

    // Fade out previous
    if (this.activeZone) {
      const prev = this.zones.get(this.activeZone);
      if (prev) {
        prev.gain.gain.cancelScheduledValues(now);
        prev.gain.gain.setValueAtTime(prev.gain.gain.value, now);
        prev.gain.gain.linearRampToValueAtTime(0, now + 0.45);
      }
    }
    this.activeZone = id;

    if (!id) return;
    const cfg = BUILDING_ZONES[id];

    // Lazy-build zone on first use
    let z: ZoneNodes | undefined = this.zones.get(id);
    if (!z) {
      const built = this.buildZone(cfg);
      if (built) {
        z = built;
        this.zones.set(id, built);
      }
    }
    if (!z) return;
    z.gain.gain.cancelScheduledValues(now);
    z.gain.gain.setValueAtTime(z.gain.gain.value, now);
    z.gain.gain.linearRampToValueAtTime(cfg.gain * amount, now + 0.45);
  }

  private buildZone(cfg: ZoneConfig): ZoneNodes | null {
    if (!this.ctx || !this.zoneBus || !this.pinkBuffer || !this.whiteBuffer) return null;
    const out = this.ctx.createGain();
    out.gain.value = 0;
    out.connect(this.zoneBus);

    switch (cfg.kind) {
      case 'stadium-crowd': {
        return this.buildCrowdZone(out);
      }
      case 'hammer': {
        const strike = () => {
          if (!this.ctx || !this.whiteBuffer) return;
          const t = this.ctx.currentTime;
          const hit = this.ctx.createBufferSource();
          hit.buffer = this.whiteBuffer;
          const hitFilter = this.ctx.createBiquadFilter();
          hitFilter.type = 'bandpass';
          hitFilter.frequency.value = 1800;
          hitFilter.Q.value = 2.2;
          const hitGain = this.ctx.createGain();
          hitGain.gain.setValueAtTime(0, t);
          hitGain.gain.linearRampToValueAtTime(0.16, t + 0.004);
          hitGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
          hit.connect(hitFilter).connect(hitGain).connect(out);
          hit.start(t);
          hit.stop(t + 0.1);

          [280, 520, 980].forEach((f, i) => {
            const o = this.ctx!.createOscillator();
            o.type = 'square';
            o.frequency.value = f;
            const g = this.ctx!.createGain();
            const peak = 0.18 / (i + 1);
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(peak, t + 0.003);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.42);
            const bp = this.ctx!.createBiquadFilter();
            bp.type = 'bandpass';
            bp.frequency.value = f * (1.2 + i * 0.25);
            bp.Q.value = 7;
            o.connect(bp).connect(g).connect(out);
            o.start(t);
            o.stop(t + 0.48);
          });
        };
        const initial = window.setTimeout(strike, 300);
        const timer = window.setInterval(strike, 1050);
        return {
          gain: out,
          cleanup: () => {
            window.clearTimeout(initial);
            window.clearInterval(timer);
          },
        };
      }
      case 'waves': {
        const src = this.ctx.createBufferSource();
        src.buffer = this.pinkBuffer;
        src.loop = true;
        const lp = this.ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 520;
        const lfo = this.ctx.createOscillator();
        lfo.frequency.value = 0.12;
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.value = 0.25;
        const swell = this.ctx.createGain();
        swell.gain.value = 0.52;
        lfo.connect(lfoGain).connect(swell.gain);
        src.connect(lp).connect(swell).connect(out);
        src.start();
        lfo.start();
        return { gain: out };
      }
      case 'water': {
        const timer = window.setInterval(() => {
          if (!this.ctx) return;
          const t = this.ctx.currentTime + Math.random() * 0.2;
          const o = this.ctx.createOscillator();
          o.type = 'sine';
          const base = 1200 + Math.random() * 1700;
          o.frequency.setValueAtTime(base, t);
          o.frequency.exponentialRampToValueAtTime(base * 0.45, t + 0.2);
          const g = this.ctx.createGain();
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.11, t + 0.006);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.24);
          o.connect(g).connect(out);
          o.start(t);
          o.stop(t + 0.3);
        }, 360);
        return { gain: out, cleanup: () => window.clearInterval(timer) };
      }
      case 'whisper': {
        return this.buildWhisperZone(out);
      }
      case 'city': {
        const src = this.ctx.createBufferSource();
        src.buffer = this.pinkBuffer;
        src.loop = true;
        const hp = this.ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 90;
        const lp = this.ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 620;
        const motion = this.ctx.createGain();
        motion.gain.value = 0.55;
        src.connect(hp).connect(lp).connect(motion).connect(out);
        src.start();
        return { gain: out };
      }
      case 'bell': {
        const ring = () => {
          if (!this.ctx) return;
          const t = this.ctx.currentTime;
          [392, 523.25, 659.25, 784].forEach((f, i) => {
            const o = this.ctx!.createOscillator();
            o.type = 'sine';
            o.frequency.value = f;
            const g = this.ctx!.createGain();
            const peak = 0.14 / (i + 1);
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(peak, t + 0.02);
            g.gain.exponentialRampToValueAtTime(0.001, t + 2.5);
            o.connect(g).connect(out);
            o.start(t);
            o.stop(t + 2.7);
          });
        };
        const initial = window.setTimeout(ring, 650);
        const timer = window.setInterval(ring, 12_000);
        return {
          gain: out,
          cleanup: () => {
            window.clearTimeout(initial);
            window.clearInterval(timer);
          },
        };
      }
      case 'chatter': {
        return this.buildChatterZone(out);
      }
      case 'glass-wind': {
        const src = this.ctx.createBufferSource();
        src.buffer = this.pinkBuffer;
        src.loop = true;
        const hp = this.ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 900;
        const bed = this.ctx.createGain();
        bed.gain.value = 0.35;
        src.connect(hp).connect(bed).connect(out);
        src.start();
        const timer = window.setInterval(() => {
          if (!this.ctx) return;
          const t = this.ctx.currentTime;
          [1046.5, 1318.5].forEach((f, i) => {
            const o = this.ctx!.createOscillator();
            o.type = 'triangle';
            o.frequency.value = f + Math.random() * 80;
            const g = this.ctx!.createGain();
            g.gain.setValueAtTime(0, t + i * 0.08);
            g.gain.linearRampToValueAtTime(0.05, t + i * 0.08 + 0.02);
            g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 1.2);
            o.connect(g).connect(out);
            o.start(t + i * 0.08);
            o.stop(t + i * 0.08 + 1.3);
          });
        }, 3400);
        return { gain: out, cleanup: () => window.clearInterval(timer) };
      }
      case 'data-pulse': {
        const timer = window.setInterval(() => {
          if (!this.ctx) return;
          const t = this.ctx.currentTime;
          const o = this.ctx.createOscillator();
          o.type = 'triangle';
          const base = 620 + Math.random() * 720;
          o.frequency.setValueAtTime(base, t);
          o.frequency.linearRampToValueAtTime(base * 1.35, t + 0.08);
          const g = this.ctx.createGain();
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.08, t + 0.01);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
          o.connect(g).connect(out);
          o.start(t);
          o.stop(t + 0.2);
        }, 420);
        return { gain: out, cleanup: () => window.clearInterval(timer) };
      }
      case 'heatmap-tones': {
        const notes = [523.25, 659.25, 783.99, 987.77, 1174.66];
        let idx = 0;
        const timer = window.setInterval(() => {
          if (!this.ctx) return;
          const t = this.ctx.currentTime;
          const o = this.ctx.createOscillator();
          o.type = 'sine';
          o.frequency.value = notes[idx % notes.length];
          idx += 1;
          const g = this.ctx.createGain();
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.07, t + 0.02);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
          o.connect(g).connect(out);
          o.start(t);
          o.stop(t + 0.5);
        }, 520);
        return { gain: out, cleanup: () => window.clearInterval(timer) };
      }
      case 'robot-workshop': {
        const timer = window.setInterval(() => {
          if (!this.ctx || !this.whiteBuffer) return;
          const t = this.ctx.currentTime;
          const servo = this.ctx.createOscillator();
          servo.type = 'sawtooth';
          const base = 360 + Math.random() * 160;
          servo.frequency.setValueAtTime(base, t);
          servo.frequency.linearRampToValueAtTime(base * 1.8, t + 0.12);
          const servoGain = this.ctx.createGain();
          servoGain.gain.setValueAtTime(0, t);
          servoGain.gain.linearRampToValueAtTime(0.045, t + 0.015);
          servoGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
          servo.connect(servoGain).connect(out);
          servo.start(t);
          servo.stop(t + 0.22);

          const click = this.ctx.createBufferSource();
          click.buffer = this.whiteBuffer;
          const clickFilter = this.ctx.createBiquadFilter();
          clickFilter.type = 'bandpass';
          clickFilter.frequency.value = 2400;
          clickFilter.Q.value = 2.8;
          const clickGain = this.ctx.createGain();
          clickGain.gain.setValueAtTime(0, t + 0.16);
          clickGain.gain.linearRampToValueAtTime(0.04, t + 0.165);
          clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
          click.connect(clickFilter).connect(clickGain).connect(out);
          click.start(t + 0.16);
          click.stop(t + 0.24);
        }, 780);
        return { gain: out, cleanup: () => window.clearInterval(timer) };
      }
    }
  }

  private buildCrowdZone(out: GainNode): ZoneNodes {
    if (!this.ctx || !this.pinkBuffer || !this.whiteBuffer) return { gain: out };

    const bed = this.ctx.createBufferSource();
    bed.buffer = this.pinkBuffer;
    bed.loop = true;

    const band = this.ctx.createBiquadFilter();
    band.type = 'bandpass';
    band.frequency.value = 580;
    band.Q.value = 0.5;

    const low = this.ctx.createBiquadFilter();
    low.type = 'lowpass';
    low.frequency.value = 1800;

    const bedGain = this.ctx.createGain();
    bedGain.gain.value = 0.55;

    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.18;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.12;
    lfo.connect(lfoGain).connect(bedGain.gain);

    bed.connect(band).connect(low).connect(bedGain).connect(out);
    bed.start();
    lfo.start();

    const cheerTimer = window.setInterval(() => {
      if (!this.ctx || !this.whiteBuffer) return;
      const t = this.ctx.currentTime;
      const burst = this.ctx.createBufferSource();
      burst.buffer = this.whiteBuffer;
      const burstFilter = this.ctx.createBiquadFilter();
      burstFilter.type = 'bandpass';
      burstFilter.frequency.value = 1400 + Math.random() * 500;
      burstFilter.Q.value = 1.4;
      const burstGain = this.ctx.createGain();
      burstGain.gain.setValueAtTime(0.0001, t);
      burstGain.gain.linearRampToValueAtTime(0.08, t + 0.05);
      burstGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
      burst.connect(burstFilter).connect(burstGain).connect(out);
      burst.start(t);
      burst.stop(t + 0.7);
    }, 3200);

    return {
      gain: out,
      cleanup: () => {
        window.clearInterval(cheerTimer);
        try {
          bed.stop();
          lfo.stop();
        } catch {
          // Already stopped.
        }
      },
    };
  }

  private buildChatterZone(out: GainNode): ZoneNodes {
    if (!this.ctx || !this.pinkBuffer) return { gain: out };

    const bed = this.ctx.createBufferSource();
    bed.buffer = this.pinkBuffer;
    bed.loop = true;

    const band = this.ctx.createBiquadFilter();
    band.type = 'bandpass';
    band.frequency.value = 1050;
    band.Q.value = 0.8;

    const bedGain = this.ctx.createGain();
    bedGain.gain.value = 0.22;

    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.35;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.06;
    lfo.connect(lfoGain).connect(bedGain.gain);

    bed.connect(band).connect(bedGain).connect(out);
    bed.start();
    lfo.start();

    const murmurTimer = window.setInterval(() => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      const base = 240 + Math.random() * 220;
      osc.frequency.setValueAtTime(base, t);
      osc.frequency.linearRampToValueAtTime(base * (1.15 + Math.random() * 0.12), t + 0.14);
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 900 + Math.random() * 400;
      filter.Q.value = 2.4;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.linearRampToValueAtTime(0.018, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
      osc.connect(filter).connect(gain).connect(out);
      osc.start(t);
      osc.stop(t + 0.32);
    }, 620);

    return {
      gain: out,
      cleanup: () => {
        window.clearInterval(murmurTimer);
        try {
          bed.stop();
          lfo.stop();
        } catch {
          // Already stopped.
        }
      },
    };
  }

  private buildWhisperZone(out: GainNode): ZoneNodes {
    if (!this.ctx || !this.pinkBuffer || !this.whiteBuffer) return { gain: out };

    const bed = this.ctx.createBufferSource();
    bed.buffer = this.pinkBuffer;
    bed.loop = true;

    const high = this.ctx.createBiquadFilter();
    high.type = 'highpass';
    high.frequency.value = 1500;

    const low = this.ctx.createBiquadFilter();
    low.type = 'lowpass';
    low.frequency.value = 4800;

    const bedGain = this.ctx.createGain();
    bedGain.gain.value = 0.12;

    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.24;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.04;
    lfo.connect(lfoGain).connect(bedGain.gain);

    bed.connect(high).connect(low).connect(bedGain).connect(out);
    bed.start();
    lfo.start();

    const sibilanceTimer = window.setInterval(() => {
      if (!this.ctx || !this.whiteBuffer) return;
      const t = this.ctx.currentTime;
      const hiss = this.ctx.createBufferSource();
      hiss.buffer = this.whiteBuffer;
      const hissFilter = this.ctx.createBiquadFilter();
      hissFilter.type = 'highpass';
      hissFilter.frequency.value = 3200 + Math.random() * 800;
      const hissGain = this.ctx.createGain();
      hissGain.gain.setValueAtTime(0.0001, t);
      hissGain.gain.linearRampToValueAtTime(0.035, t + 0.04);
      hissGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
      hiss.connect(hissFilter).connect(hissGain).connect(out);
      hiss.start(t);
      hiss.stop(t + 0.28);
    }, 1100);

    return {
      gain: out,
      cleanup: () => {
        window.clearInterval(sibilanceTimer);
        try {
          bed.stop();
          lfo.stop();
        } catch {
          // Already stopped.
        }
      },
    };
  }
}

// ── Noise buffer helpers ────────────────────────────────────────────
function makeWhiteBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const sr = ctx.sampleRate;
  const length = Math.max(1, Math.floor(seconds * sr));
  const buf = ctx.createBuffer(1, length, sr);
  const ch = buf.getChannelData(0);
  for (let i = 0; i < length; i++) ch[i] = Math.random() * 2 - 1;
  return buf;
}

function makePinkBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  // Voss-McCartney pink noise approximation
  const sr = ctx.sampleRate;
  const length = Math.max(1, Math.floor(seconds * sr));
  const buf = ctx.createBuffer(1, length, sr);
  const ch = buf.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < length; i++) {
    const w = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + w * 0.0555179;
    b1 = 0.99332 * b1 + w * 0.0750759;
    b2 = 0.969 * b2 + w * 0.153852;
    b3 = 0.8665 * b3 + w * 0.3104856;
    b4 = 0.55 * b4 + w * 0.5329522;
    b5 = -0.7616 * b5 - w * 0.016898;
    const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362;
    b6 = w * 0.115926;
    ch[i] = pink * 0.11;
  }
  return buf;
}

export const Audio = new AudioManagerImpl();
