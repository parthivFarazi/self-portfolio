// AudioManager — singleton Web Audio orchestrator for Resume World.
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

const BUILDING_ZONES: Partial<Record<BuildingId, ZoneConfig>> = {
  updt: { kind: 'crowd', gain: 0.08, color: 'warm' },
  forge: { kind: 'hammer', gain: 0.07 },
  lighthouse: { kind: 'waves', gain: 0.10 },
  zen: { kind: 'water', gain: 0.10 },
  archive: { kind: 'whisper', gain: 0.06 },
  petronas: { kind: 'city', gain: 0.06 },
  tech: { kind: 'bell', gain: 0.0 }, // chimes via timer, not constant tone
  du: { kind: 'chatter', gain: 0.05 },
  qard: { kind: 'glass-wind', gain: 0.05 },
  rmaict: { kind: 'server-hum', gain: 0.05 },
};

interface ZoneConfig {
  kind:
    | 'crowd'
    | 'hammer'
    | 'waves'
    | 'water'
    | 'whisper'
    | 'city'
    | 'bell'
    | 'chatter'
    | 'glass-wind'
    | 'server-hum';
  gain: number;
  color?: 'warm' | 'cool';
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

class AudioManagerImpl {
  ctx: AudioContext | null = null;
  master: GainNode | null = null;
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
  bellTimer: number | null = null;
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

    // Start base ambient layers (wind + warm pad + sporadic birds)
    this.startWind();
    this.startGoldenPad();
    this.startBirdLoop();

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
  private startWind() {
    if (!this.ctx || !this.ambientGain || !this.pinkBuffer) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.pinkBuffer;
    src.loop = true;
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 540;
    lp.Q.value = 0.6;
    const g = this.ctx.createGain();
    g.gain.value = 0;
    src.connect(lp).connect(g).connect(this.ambientGain);
    src.start();
    // Slow modulation of cutoff for "breathing" wind
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.06;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 180;
    lfo.connect(lfoGain).connect(lp.frequency);
    lfo.start();
    // Fade in
    g.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 1.6);
  }

  private startGoldenPad() {
    if (!this.ctx || !this.ambientGain) return;
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = 110;
    osc1.detune.value = -8;
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = 220;
    osc2.detune.value = +5;
    const osc3 = this.ctx.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.value = 330;
    osc3.detune.value = -3;
    const g = this.ctx.createGain();
    g.gain.value = 0;
    const sub1 = this.ctx.createGain();
    sub1.gain.value = 0.55;
    const sub2 = this.ctx.createGain();
    sub2.gain.value = 0.22;
    const sub3 = this.ctx.createGain();
    sub3.gain.value = 0.10;
    osc1.connect(sub1).connect(g);
    osc2.connect(sub2).connect(g);
    osc3.connect(sub3).connect(g);
    g.connect(this.ambientGain);
    osc1.start();
    osc2.start();
    osc3.start();
    g.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 2.0);
  }

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
  enterZone(id: BuildingId | null) {
    if (!this.ctx || !this.zoneBus) return;
    if (id === this.activeZone) return;

    // Fade out previous
    if (this.activeZone) {
      const prev = this.zones.get(this.activeZone);
      if (prev) {
        const now = this.ctx.currentTime;
        prev.gain.gain.cancelScheduledValues(now);
        prev.gain.gain.setValueAtTime(prev.gain.gain.value, now);
        prev.gain.gain.linearRampToValueAtTime(0, now + 1.2);
      }
    }
    this.activeZone = id;

    if (!id) return;
    const cfg = BUILDING_ZONES[id];
    if (!cfg) return;

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
    const now = this.ctx.currentTime;
    z.gain.gain.cancelScheduledValues(now);
    z.gain.gain.setValueAtTime(z.gain.gain.value, now);
    z.gain.gain.linearRampToValueAtTime(cfg.gain, now + 1.2);
  }

  private buildZone(cfg: ZoneConfig): ZoneNodes | null {
    if (!this.ctx || !this.zoneBus || !this.pinkBuffer || !this.whiteBuffer) return null;
    const out = this.ctx.createGain();
    out.gain.value = 0;
    out.connect(this.zoneBus);

    switch (cfg.kind) {
      case 'crowd': {
        const src = this.ctx.createBufferSource();
        src.buffer = this.pinkBuffer;
        src.loop = true;
        const lp = this.ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 800;
        const hp = this.ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 220;
        src.connect(hp).connect(lp).connect(out);
        src.start();
        return { gain: out };
      }
      case 'hammer': {
        // Periodic clang via metallic tones every ~1.5s
        const timer = window.setInterval(() => {
          if (!this.ctx) return;
          const t = this.ctx.currentTime;
          [320, 480, 720].forEach((f, i) => {
            const o = this.ctx!.createOscillator();
            o.type = 'square';
            o.frequency.value = f;
            const g = this.ctx!.createGain();
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(0.06, t + 0.002);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
            const f1 = this.ctx!.createBiquadFilter();
            f1.type = 'bandpass';
            f1.frequency.value = f * (1 + i * 0.2);
            o.connect(f1).connect(g).connect(out);
            o.start(t);
            o.stop(t + 0.3);
          });
        }, 1500 + Math.random() * 800);
        return { gain: out, cleanup: () => window.clearInterval(timer) };
      }
      case 'waves': {
        // Slow LFO'd pink noise
        const src = this.ctx.createBufferSource();
        src.buffer = this.pinkBuffer;
        src.loop = true;
        const lp = this.ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 420;
        const lfo = this.ctx.createOscillator();
        lfo.frequency.value = 0.12;
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.value = 0.5;
        const swell = this.ctx.createGain();
        swell.gain.value = 0.5;
        lfo.connect(lfoGain).connect(swell.gain);
        src.connect(lp).connect(swell).connect(out);
        src.start();
        lfo.start();
        return { gain: out };
      }
      case 'water': {
        // Trickling — quick high-pitched drips at random intervals
        const timer = window.setInterval(() => {
          if (!this.ctx) return;
          const t = this.ctx.currentTime + Math.random() * 0.4;
          const o = this.ctx.createOscillator();
          o.type = 'sine';
          const base = 1200 + Math.random() * 1600;
          o.frequency.setValueAtTime(base, t);
          o.frequency.exponentialRampToValueAtTime(base * 0.5, t + 0.18);
          const g = this.ctx.createGain();
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.05, t + 0.005);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
          o.connect(g).connect(out);
          o.start(t);
          o.stop(t + 0.3);
        }, 700);
        return { gain: out, cleanup: () => window.clearInterval(timer) };
      }
      case 'whisper': {
        const src = this.ctx.createBufferSource();
        src.buffer = this.pinkBuffer;
        src.loop = true;
        const bp = this.ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 1400;
        bp.Q.value = 1.8;
        src.connect(bp).connect(out);
        src.start();
        return { gain: out };
      }
      case 'city': {
        const src = this.ctx.createBufferSource();
        src.buffer = this.pinkBuffer;
        src.loop = true;
        const lp = this.ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 380;
        src.connect(lp).connect(out);
        src.start();
        return { gain: out };
      }
      case 'bell': {
        // Periodic chime every ~60s while zone is active
        const timer = window.setInterval(() => {
          if (!this.ctx) return;
          const t = this.ctx.currentTime;
          [440, 660, 880].forEach((f, i) => {
            const o = this.ctx!.createOscillator();
            o.type = 'sine';
            o.frequency.value = f;
            const g = this.ctx!.createGain();
            const peak = 0.04 / (i + 1);
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(peak, t + 0.01);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);
            o.connect(g).connect(out);
            o.start(t);
            o.stop(t + 2.4);
          });
        }, 60_000);
        // Bell is gain=0 in config — its events are self-amplified
        out.gain.value = 1;
        return { gain: out, cleanup: () => window.clearInterval(timer) };
      }
      case 'chatter': {
        const src = this.ctx.createBufferSource();
        src.buffer = this.pinkBuffer;
        src.loop = true;
        const bp = this.ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 700;
        bp.Q.value = 1.0;
        src.connect(bp).connect(out);
        src.start();
        return { gain: out };
      }
      case 'glass-wind': {
        const src = this.ctx.createBufferSource();
        src.buffer = this.pinkBuffer;
        src.loop = true;
        const bp = this.ctx.createBiquadFilter();
        bp.type = 'highpass';
        bp.frequency.value = 600;
        src.connect(bp).connect(out);
        src.start();
        return { gain: out };
      }
      case 'server-hum': {
        const o = this.ctx.createOscillator();
        o.type = 'sawtooth';
        o.frequency.value = 60;
        const lp = this.ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 220;
        const g = this.ctx.createGain();
        g.gain.value = 0.6;
        o.connect(lp).connect(g).connect(out);
        o.start();
        return { gain: out };
      }
    }
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
