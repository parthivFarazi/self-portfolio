import type { ReactNode } from 'react';
import { Slot, P2Header } from './_shared';
import { panelImages } from './panelImages';

export interface PanelProps {
  width?: number;
  height?: number;
}

const CYAN = '#6fd5e0';
const MINT = '#94e2c0';
const MAGENTA = '#e07ec3';
const GOLD = '#f5d97a';
const TEXT_DIM = 'rgba(205,243,226,.78)';
const TEXT_MED = 'rgba(205,243,226,.65)';

export function UPDTPanel({ width = 820, height = 980 }: PanelProps) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(ellipse at 50% 0%, #14242e 0%, #050a10 100%)',
      fontFamily: 'var(--rw-sans)', color: '#cdf3e2',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Background grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(148,226,192,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,226,192,.05) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }}/>

      {/* ── Top status bar ─────────────────────────────────────────── */}
      <div style={{ position: 'relative', padding: '20px 28px 14px', borderBottom: `1px solid ${CYAN}22`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <span style={{ font: '900 28px "JetBrains Mono", monospace', letterSpacing: '4px', color: MINT }}>UPDT.</span>
          <span style={{ font: '10px "JetBrains Mono", monospace', letterSpacing: '.22em', color: CYAN, textTransform: 'uppercase' }}>ScoutPro · build 2.4</span>
        </div>
        <div style={{ display: 'flex', gap: 18, font: '10.5px "JetBrains Mono", monospace', color: TEXT_MED, letterSpacing: '.14em', textTransform: 'uppercase' }}>
          <span><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7cd17a', display: 'inline-block', marginRight: 6 }}/>Live · CV tracking</span>
          <span>co-founder · p.farazi</span>
        </div>
      </div>

      {/* ── Header row: title + subtitle + CREATE-X badge ─────────── */}
      <div style={{ position: 'relative', padding: '14px 28px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 18, flexShrink: 0 }}>
        <div style={{ flex: 1 }}>
          <P2Header
            kicker="UPDT · soccer analytics platform"
            kickerColor={TEXT_DIM}
            titleColor="#fffaee"
            title={<>From video<br/>to decisions.</>}
            subtitle="An AI platform that turns soccer broadcast footage into scouting data."
            subtitleColor="rgba(255,250,238,0.78)"
            meta="Co-founder & Primary Technical Engineer · updt.pro · 2025 — Present · Atlanta, GA"
            metaColor={TEXT_DIM}
          />
        </div>
        <CreateXBadge />
      </div>

      {/* ── Screenshot grid: hero + 2 stacked ──────────────────────── */}
      <div style={{ position: 'relative', padding: '6px 28px 0', flexShrink: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 12 }}>
          <HoloFrame>
            <div style={{ font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.18em', color: CYAN, textTransform: 'uppercase' }}>scoutpro · player search</div>
            <Slot id="updt-scoutpro" w={400} h={228} placeholder="ScoutPro dashboard · screenshot" shape="rounded" radius={4} fit="contain" src={panelImages.updt.playerSearch}/>
          </HoloFrame>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <HoloFrame magenta>
              <div style={{ font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.18em', color: MAGENTA, textTransform: 'uppercase' }}>CV · player + ball tracking</div>
              <Slot id="updt-cv" w={260} h={102} placeholder="CV tracking · clip frame" shape="rounded" radius={4} src={panelImages.updt.playerTracking}/>
            </HoloFrame>
            <HoloFrame>
              <div style={{ font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.18em', color: CYAN, textTransform: 'uppercase' }}>game prep + team analysis</div>
              <Slot id="updt-tactics" w={260} h={102} placeholder="tactics · screenshot" shape="rounded" radius={4} src={panelImages.updt.tacticalPattern}/>
            </HoloFrame>
          </div>
        </div>
      </div>

      {/* ── Four content quadrants (technical breadth) ─────────────── */}
      <div style={{ position: 'relative', padding: '12px 28px 0', flexShrink: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Quadrant
            label="01 · CO-FOUNDER CONTEXT"
            accent={MINT}
            body={<>
              Co-founded with a <b>UEFA B-licensed analyst</b>. I own CV/ML, infra, and product end-to-end.
            </>}
          />
          <Quadrant
            label="02 · COMPUTER VISION"
            accent={MAGENTA}
            body={<>
              <b>YOLOv8</b> player + ball detection. Custom-trained on <b>100+ hand-labeled clips</b>. Tuned for motion blur, white-line confusion, and noisy broadcasts.
            </>}
          />
          <Quadrant
            label="03 · PITCH GEOMETRY"
            accent={CYAN}
            body={<>
              <b>Keypoint detection + homography</b>. Broadcast → tactical coordinates. Survives pans, zooms, partial views. Analyst-in-the-loop QA.
            </>}
          />
          <Quadrant
            label="04 · INFRASTRUCTURE"
            accent={GOLD}
            body={<>
              Trained on <b>GT PACE ICE</b> (H100 · Slurm · CUDA). Stack: <b>FastAPI · Supabase/Postgres · Cloudflare R2</b>.
            </>}
          />
        </div>
      </div>

      {/* ── Miguel Berry deployment callout ─────────────────────────── */}
      <div style={{ position: 'relative', padding: '12px 28px 0', flexShrink: 0 }}>
        <div style={{
          padding: '12px 16px',
          background: `linear-gradient(90deg, ${CYAN}18, ${MINT}10)`,
          border: `1px solid ${CYAN}88`,
          boxShadow: `0 0 24px ${CYAN}33, inset 0 0 0 1px rgba(255,255,255,.04)`,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <span style={{ font: '20px var(--rw-serif)', color: GOLD, flexShrink: 0 }}>🏆</span>
          <div style={{ font: '13px/1.45 var(--rw-sans)', color: '#fffaee' }}>
            <b style={{ color: CYAN, letterSpacing: '.06em', textTransform: 'uppercase', font: '700 10.5px "JetBrains Mono", monospace', display: 'block', marginBottom: 4 }}>In the field</b>
            Earlier scouting workflow supported real-world player evaluation — including analysis related to <b style={{ color: GOLD }}>Miguel Berry during Charlotte Battery scouting</b>.
          </div>
        </div>
      </div>

      {/* ── Footer: stat strip + Visit updt.pro CTA ─────────────────── */}
      <div style={{
        position: 'relative',
        marginTop: 'auto',
        padding: '14px 28px 22px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 16,
        borderTop: `1px solid ${CYAN}22`,
        flexShrink: 0,
      }}>
        <div style={{
          display: 'flex', gap: 14, flexWrap: 'wrap',
          font: '10px "JetBrains Mono", monospace',
          letterSpacing: '.14em',
          textTransform: 'uppercase',
          color: TEXT_MED,
        }}>
          <Pill>100+ labeled clips</Pill>
          <Pill>H100 cluster</Pill>
          <Pill>CREATE-X</Pill>
          <Pill>UEFA B-licensed co-founder</Pill>
        </div>
        <a
          href="https://updt.pro"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            minHeight: 44, padding: '0 18px',
            background: `linear-gradient(180deg, ${MINT} 0%, ${CYAN} 100%)`,
            color: '#06141a',
            font: '700 13px var(--rw-sans)',
            letterSpacing: '.06em',
            textDecoration: 'none',
            border: `1px solid ${MINT}`,
            borderRadius: 4,
            boxShadow: `0 0 20px ${CYAN}66, 0 3px 0 #2a8a8a, inset 0 0 0 1px rgba(255,255,255,.4)`,
            transition: 'transform .12s ease, box-shadow .15s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 0 30px ${CYAN}99, 0 5px 0 #2a8a8a, inset 0 0 0 1px rgba(255,255,255,.5)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 0 20px ${CYAN}66, 0 3px 0 #2a8a8a, inset 0 0 0 1px rgba(255,255,255,.4)`;
          }}
        >
          <span>Visit updt.pro</span>
          <span style={{ font: '15px var(--rw-serif)' }}>↗</span>
        </a>
      </div>
    </div>
  );
}

// ── Subcomponents ────────────────────────────────────────────────────

function CreateXBadge() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '8px 12px',
      background: 'rgba(245,217,122,.08)',
      border: `1px solid ${GOLD}88`,
      boxShadow: `0 0 12px ${GOLD}33, inset 0 0 0 1px rgba(255,255,255,.04)`,
      flexShrink: 0,
      maxWidth: 220,
    }}>
      <img
        src={panelImages.updt.createX}
        alt="CREATE-X Georgia Tech logo"
        style={{ height: 36, width: 'auto', display: 'block', filter: 'drop-shadow(0 0 6px rgba(245,217,122,.3))' }}
      />
      <div>
        <div style={{ font: '700 9.5px "JetBrains Mono", monospace', letterSpacing: '.16em', color: GOLD, textTransform: 'uppercase' }}>CREATE-X</div>
        <div style={{ font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.1em', color: TEXT_DIM, marginTop: 2 }}>Georgia Tech</div>
      </div>
    </div>
  );
}

function Quadrant({ label, accent, body }: { label: string; accent: string; body: ReactNode }) {
  return (
    <div style={{
      padding: '10px 12px',
      background: `linear-gradient(135deg, ${accent}12, transparent 70%)`,
      border: `1px solid ${accent}55`,
      boxShadow: `inset 0 0 0 1px rgba(255,255,255,.03), 0 0 16px ${accent}1a`,
      position: 'relative',
    }}>
      {/* Corner ticks */}
      <span style={{ position: 'absolute', top: -1, left: -1, width: 8, height: 8, borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }}/>
      <span style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, borderTop: `2px solid ${accent}`, borderRight: `2px solid ${accent}` }}/>
      <span style={{ position: 'absolute', bottom: -1, left: -1, width: 8, height: 8, borderBottom: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }}/>
      <span style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, borderBottom: `2px solid ${accent}`, borderRight: `2px solid ${accent}` }}/>

      <div style={{ font: '700 9.5px "JetBrains Mono", monospace', letterSpacing: '.18em', color: accent, marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ font: '11.5px/1.4 var(--rw-sans)', color: '#fffaee', opacity: 0.92 }}>
        {body}
      </div>
    </div>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span style={{
      padding: '5px 10px',
      border: `1px solid ${MINT}44`,
      background: `${MINT}0c`,
      color: TEXT_DIM,
      borderRadius: 2,
    }}>
      {children}
    </span>
  );
}

function HoloFrame({ children, magenta }: { children: ReactNode; magenta?: boolean }) {
  const c = magenta ? MAGENTA : CYAN;
  return (
    <div style={{
      padding: 10,
      background: `linear-gradient(135deg, rgba(${magenta ? '224,126,195' : '111,213,224'},.06), transparent 70%)`,
      border: `1px solid ${c}66`,
      boxShadow: `0 0 20px ${c}22, inset 0 0 0 1px rgba(255,255,255,.04)`,
      display: 'flex', flexDirection: 'column', gap: 6,
      position: 'relative',
    }}>
      <span style={{ position: 'absolute', top: -1, left: -1, width: 10, height: 10, borderTop: `2px solid ${c}`, borderLeft: `2px solid ${c}` }}/>
      <span style={{ position: 'absolute', top: -1, right: -1, width: 10, height: 10, borderTop: `2px solid ${c}`, borderRight: `2px solid ${c}` }}/>
      <span style={{ position: 'absolute', bottom: -1, left: -1, width: 10, height: 10, borderBottom: `2px solid ${c}`, borderLeft: `2px solid ${c}` }}/>
      <span style={{ position: 'absolute', bottom: -1, right: -1, width: 10, height: 10, borderBottom: `2px solid ${c}`, borderRight: `2px solid ${c}` }}/>
      {children}
    </div>
  );
}
