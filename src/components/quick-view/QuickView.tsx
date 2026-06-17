import { MotionConfig, motion } from 'framer-motion';
import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { getBuilding, type BuildingId } from '@/data/buildings';
import { AvatarPortrait } from './Avatar';
import { Thumb, type ThumbKind } from './Thumb';
import { Audio } from '@/audio/AudioManager';
import { useGame } from '@/state/gameStore';
import { useDialogFocus } from '@/hooks/useDialogFocus';
import { useOverlayScrollHint } from '@/hooks/useOverlayScrollHint';
import { ResponsivePanel, usePanelScale } from '../ui/ResponsivePanel';
import { PanelZoom } from '../ui/PanelZoom';
import { getLazyPanel, preloadPanel } from '../panels/panelRegistry';
import './quick-view.css';

type DashboardGroup = 'work' | 'projects' | 'about';

interface QuickViewDashboardProps {
  onOpenWorld: () => void;
  onBackHome: () => void;
}

interface DashboardTileData {
  id: string;
  group: DashboardGroup;
  title: string;
  role: string;
  sub: string;
  tag: string;
  chip?: string;
  thumb: ThumbKind;
  panelId: BuildingId;
}

const DASH_BUILDINGS: DashboardTileData[] = [
  {
    id: 'updt',
    group: 'work',
    title: 'UPDT. Stadium',
    role: 'Co-founder & CTO',
    sub: 'AI soccer analytics platform',
    tag: 'Company | 2026-present',
    chip: 'updt.pro',
    thumb: 'updt',
    panelId: 'updt',
  },
  {
    id: 'qard',
    group: 'work',
    title: 'Qard Greenhouse',
    role: 'Founding Frontend Developer',
    sub: 'Interactive 3D credit-card system',
    tag: 'Fintech | Jun-Aug 2025',
    chip: '200+ users',
    thumb: 'qard',
    panelId: 'qard',
  },
  {
    id: 'rmaict',
    group: 'work',
    title: 'RMAICT Tower',
    role: 'AI Engineer Intern',
    sub: 'Receipt-to-JSON with Donut',
    tag: 'AI | May-Aug 2024',
    chip: '1,000+ receipts',
    thumb: 'rmaict',
    panelId: 'rmaict',
  },
  {
    id: 'pong',
    group: 'projects',
    title: 'Pong Frat',
    role: 'Baseball automation app',
    sub: 'React Native | Expo | Supabase',
    tag: 'Project | Nov-Jan',
    chip: '70+ users',
    thumb: 'pong',
    panelId: 'du',
  },
  {
    id: 'football',
    group: 'projects',
    title: 'Athletic Stadium',
    role: 'CFB valuation models',
    sub: 'Featured in The Athletic',
    tag: 'Project | 2025-present',
    chip: '60+ schools',
    thumb: 'football',
    panelId: 'athletic',
  },
  {
    id: 'archive',
    group: 'projects',
    title: 'Whispering Archive',
    role: 'Semantic quote retrieval',
    sub: 'FAISS | Gemma-3 | PACE H100',
    tag: 'Project | Nov 2025',
    chip: '490k+ quotes',
    thumb: 'archive',
    panelId: 'archive',
  },
  {
    id: 'zen',
    group: 'projects',
    title: 'Zen Garden',
    role: 'Soothe journaling app',
    sub: 'React Native | FastAPI | GPT-4',
    tag: 'Project | May-Jul 2025',
    chip: '90%+ tests',
    thumb: 'zen',
    panelId: 'zen',
  },
  {
    id: 'heatmap',
    group: 'projects',
    title: 'Heatmap Garden',
    role: 'xGenius off-ball impact',
    sub: 'US Soccer Federation data',
    tag: 'Project | Apr 2025',
    chip: '4 datasets',
    thumb: 'heatmap',
    panelId: 'heatmap',
  },
  {
    id: 'workshop',
    group: 'projects',
    title: "Robot's Workshop",
    role: 'Solar litter-picking robot',
    sub: 'Arduino | C++ | Fusion 360',
    tag: 'Origin | 2021',
    chip: 'the start',
    thumb: 'workshop',
    panelId: 'workshop',
  },
  {
    id: 'gba',
    group: 'projects',
    title: 'The Cartridge',
    role: 'Game Boy Advance · arcade game',
    sub: 'C | GBA hardware | DMA graphics',
    tag: 'Project | April 2025',
    chip: '60 FPS',
    thumb: 'gba',
    panelId: 'gba',
  },
  {
    id: 'about',
    group: 'about',
    title: 'Petronas Towers',
    role: 'About me',
    sub: 'Kuala Lumpur to Atlanta',
    tag: 'Story',
    thumb: 'about',
    panelId: 'petronas',
  },
  {
    id: 'edu',
    group: 'about',
    title: 'Tech Tower',
    role: 'Education',
    sub: 'B.S. CS | Georgia Tech | Dec 2026',
    tag: 'Education',
    thumb: 'edu',
    panelId: 'tech',
  },
  {
    id: 'forge',
    group: 'about',
    title: 'The Forge',
    role: 'Skills',
    sub: 'Languages | frameworks | AI/ML | DevOps',
    tag: 'Skills',
    thumb: 'forge',
    panelId: 'forge',
  },
  {
    id: 'lighthouse',
    group: 'about',
    title: 'The Lighthouse',
    role: 'Contact',
    sub: 'Email | GitHub | LinkedIn | UPDT',
    tag: 'Contact',
    thumb: 'lighthouse',
    panelId: 'lighthouse',
  },
];

const STATS = [
  ['200+', 'Qard users', 'fintech launch | 30 days'],
  ['70+', 'Pong active users', 'cross-platform | replaced paper'],
  ['490k+', 'Quotes indexed', 'semantic search | H100 cluster'],
  ['60+', 'NCAA schools', 'valuation models | The Athletic'],
  ['1,000+', 'Receipts processed', 'Donut model | RMAICT'],
  ['updt.pro', 'Live product', 'AI soccer analytics platform'],
] as const;

export function QuickViewDashboard({ onOpenWorld, onBackHome }: QuickViewDashboardProps) {
  // Panel state lives in the shared game store so App can mirror it into
  // the URL (/quick/updt) — shareable links, refresh-safe, Back closes it.
  const openPanel = useGame((s) => s.activeBuildingId);
  const setOpenPanel = useGame((s) => s.openBuilding);
  const closePanel = useGame((s) => s.closeBuilding);
  const mainRef = useRef<HTMLElement>(null);
  // Mobile "scroll for more" hint — visible while the user is near the top
  // of a scrollable dashboard, hidden once they begin scrolling.
  const [showScrollHint, setShowScrollHint] = useState(false);

  useEffect(() => {
    if (!openPanel) return undefined;
    Audio.panelOpen();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePanel();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      Audio.panelClose();
    };
  }, [openPanel, closePanel]);

  // Lock the dashboard scroll while a panel is open — touch swipes over the
  // modal otherwise chain into the page behind it and lose the reader's spot.
  useEffect(() => {
    const el = mainRef.current;
    if (!el || !openPanel) return undefined;
    const prevOverflow = el.style.overflow;
    el.style.overflow = 'hidden';
    return () => {
      el.style.overflow = prevOverflow;
    };
  }, [openPanel]);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return undefined;
    const update = () => {
      const scrollable = el.scrollHeight - el.clientHeight > 80;
      setShowScrollHint(scrollable && el.scrollTop < 40);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
    <main className="qv-dashboard" ref={mainRef}>
      <div className="qv-dashboard-glow" aria-hidden="true" />
      <div className="qv-dashboard-shell">
        <nav className="qv-dashboard-nav" aria-label="Quick View navigation">
          <button className="qv-brand qv-brand-button" type="button" onClick={onBackHome}>
            <Sigil />
            <span>PF | Portfolio | Quick View</span>
          </button>
          <div className="qv-nav-actions">
            <a
              className="qv-resume-link qv-resume-link--nav"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="qv-resume-link__arrow" aria-hidden="true">↓</span>
              <span>Resume PDF</span>
            </a>
            <button className="qv-home-button" type="button" onClick={onBackHome}>
              Home Screen
            </button>
            <button className="qv-mode-button" type="button" onClick={onOpenWorld}>
              Switch to Exploration -&gt;
            </button>
          </div>
        </nav>

        <IdentityStrip />

        <h2 className="qv-small-heading">The numbers, briefly</h2>
        <section className="qv-stats-grid" aria-label="Headline stats">
          {STATS.map(([n, k, c]) => (
            <StatCard key={k} n={n} k={k} c={c} big={n === 'updt.pro'} />
          ))}
        </section>

        <DashboardSection
          title="The Work"
          subtitle="Where I am most of the time"
          tiles={DASH_BUILDINGS.filter((b) => b.group === 'work')}
          layout="work"
          onOpen={setOpenPanel}
        />
        <DashboardSection
          title="Projects"
          subtitle="Things I built because I wanted to"
          tiles={DASH_BUILDINGS.filter((b) => b.group === 'projects')}
          layout="projects"
          onOpen={setOpenPanel}
        />
        <DashboardSection
          title="About Me"
          subtitle="Story, school, skills, hello"
          tiles={DASH_BUILDINGS.filter((b) => b.group === 'about')}
          layout="about"
          onOpen={setOpenPanel}
        />

        <footer className="qv-footer">
          <span>Built by PF | 2026 | same panels as the exploration mode</span>
          <span>parthivfarazi@icloud.com | +1 (404) 203-5379</span>
        </footer>
      </div>

      <div className="qv-scroll-hint" data-hidden={!showScrollHint || !!openPanel} aria-hidden="true">
        <span>Scroll for more</span>
        <span className="qv-scroll-hint__chev">↓</span>
      </div>

      {/* Deliberately NOT wrapped in AnimatePresence: exit animations left
          the unmount at framer's mercy, and a re-render during the exit
          could strand the overlay at opacity 0 as an invisible wall over
          the page. Closing is instant; opening still animates. */}
      {openPanel ? (
        <DashboardPanelOverlay
          key={openPanel}
          id={openPanel}
          onClose={closePanel}
          onHome={onBackHome}
        />
      ) : null}
    </main>
    </MotionConfig>
  );
}

function DashboardSection({
  title,
  subtitle,
  tiles,
  layout,
  onOpen,
}: {
  title: string;
  subtitle: string;
  tiles: DashboardTileData[];
  layout: DashboardGroup;
  onOpen: (id: BuildingId) => void;
}) {
  return (
    <section className="qv-section" aria-labelledby={`qv-${layout}-title`}>
      <div className="qv-section-header">
        <div>
          <h2 id={`qv-${layout}-title`}>{title}</h2>
          <span>{subtitle}</span>
        </div>
        <strong>{tiles.length} tiles</strong>
      </div>
      <div className={`qv-tile-grid qv-tile-grid-${layout}`}>
        {tiles.map((tile) => (
          <DashboardTile key={tile.id} tile={tile} layout={layout} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

function DashboardTile({ tile, layout, onOpen }: { tile: DashboardTileData; layout: DashboardGroup; onOpen: (id: BuildingId) => void }) {
  return (
    <button
      className={`qv-tile qv-tile-${layout}`}
      type="button"
      onClick={() => onOpen(tile.panelId)}
      onMouseEnter={() => {
        Audio.tileHover();
        preloadPanel(tile.panelId);
      }}
      onFocus={() => preloadPanel(tile.panelId)}
    >
      <div className="qv-tile-thumb">
        <Thumb kind={tile.thumb} w="100%" h="100%" />
        {tile.chip ? <span className="qv-chip">{tile.chip}</span> : null}
        <span className="qv-tile-tag">{tile.tag}</span>
      </div>
      <div className="qv-tile-body">
        <div>
          <h3>{tile.title}</h3>
          <p className="qv-tile-role">{tile.role}</p>
          <p className="qv-tile-sub">{tile.sub}</p>
        </div>
        <span className="qv-tile-affordance">
          <span>Press to open</span>
          <span className="qv-tile-affordance-arrow" aria-hidden="true">-&gt;</span>
        </span>
      </div>
    </button>
  );
}

function DashboardPanelOverlay({ id, onClose, onHome }: { id: BuildingId; onClose: () => void; onHome: () => void }) {
  const def = getBuilding(id);
  const Panel = getLazyPanel(id);
  const dialogRef = useDialogFocus<HTMLDivElement>(true);
  const fit = usePanelScale(def.panelSize.w, def.panelSize.h);
  // Desktop-only: phones fit the whole panel, nothing scrolls.
  const showScrollHint = useOverlayScrollHint(dialogRef, !fit.isMobile);
  const goHome = () => {
    onClose();
    onHome();
  };

  return (
    <motion.div
      ref={dialogRef}
      className="qv-panel-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={def.name}
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      style={{ overscrollBehavior: 'contain' }}
      onClick={onClose}
    >
      <div className="qv-panel-backdrop" aria-hidden="true" />
      {fit.isMobile ? (
        /* Phones: the postcard view — whole panel visible, pinch /
           double-tap / magnifier to read. */
        <div
          className="qv-panel-zoom-area"
          onClick={(event) => event.stopPropagation()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: '100%', height: '100%' }}
          >
            <PanelZoom fitScale={fit.scale}>
              <Suspense fallback={<QuickPanelLoading width={def.panelSize.w} height={def.panelSize.h} />}>
                <div className="qv-panel-stage">
                  <ResponsivePanel width={def.panelSize.w} height={def.panelSize.h}>
                    <Panel width={def.panelSize.w} height={def.panelSize.h} />
                  </ResponsivePanel>
                </div>
              </Suspense>
            </PanelZoom>
          </motion.div>
        </div>
      ) : (
        <div className="qv-panel-track">
          <motion.div
            className="qv-panel-stage"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <Suspense fallback={<QuickPanelLoading width={def.panelSize.w} height={def.panelSize.h} />}>
              <ResponsivePanel width={def.panelSize.w} height={def.panelSize.h}>
                <Panel width={def.panelSize.w} height={def.panelSize.h} />
              </ResponsivePanel>
            </Suspense>
          </motion.div>
        </div>
      )}
      <button type="button" className="qv-panel-close" aria-label="Close panel" data-autofocus onClick={onClose}>
        x
      </button>
      {!fit.isMobile && (
        <button type="button" className="qv-panel-home" onClick={goHome}>
          Home Screen
        </button>
      )}
      {/* Cue that the panel continues below the fold — only when it actually
          overflows, gone after the first scroll. */}
      {showScrollHint && (
        <div className="qv-panel-scroll-hint" aria-hidden="true">
          Scroll for more ↓
        </div>
      )}
    </motion.div>
  );
}

function QuickPanelLoading({ width, height }: { width: number; height: number }) {
  return (
    <ResponsivePanel width={width} height={height}>
      <div
        style={{
          width,
          height,
          display: 'grid',
          placeItems: 'center',
          background:
            'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.18), transparent 24%), linear-gradient(180deg, #fbf3da 0%, #ead9b4 100%)',
          color: '#2a1a0e',
          fontFamily: 'var(--rw-sans)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ font: '11px "JetBrains Mono", monospace', letterSpacing: '.24em', textTransform: 'uppercase', color: '#7a5a30' }}>
            Loading panel
          </div>
          <div style={{ marginTop: 10, font: 'italic 30px var(--rw-serif)' }}>Pulling the card...</div>
        </div>
      </div>
    </ResponsivePanel>
  );
}

function IdentityStrip() {
  return (
    <section className="qv-identity" aria-label="Portfolio identity">
      <div className="qv-identity-avatar">
        <AvatarPortrait size={118} />
      </div>
      <div className="qv-identity-copy">
        <h1>Parthiv Farazi</h1>
        <p>
          Co-founder & CTO at <strong>UPDT.</strong> | CS @ Georgia Tech &apos;26 | building things at the intersection of sports, AI, and product
        </p>
        <div className="qv-locations">
          <span>
            <Pin c="#a8553c" /> Atlanta, GA
          </span>
          <span>
            <Pin c="#6fd5e0" /> Born in Bangladesh · Raised in Malaysia
          </span>
        </div>
      </div>
      <div className="qv-links" aria-label="Quick links">
        <QuickLink href="mailto:parthivfarazi@icloud.com" label="Email">Mail</QuickLink>
        <QuickLink href="https://github.com/parthivFarazi" label="GitHub">GH</QuickLink>
        <QuickLink href="https://www.linkedin.com/in/parthiv-farazi-1aba8b223/" label="LinkedIn">in</QuickLink>
        <QuickLink href="https://updt.pro" label="UPDT website">UPDT</QuickLink>
      </div>
    </section>
  );
}

function StatCard({ n, k, c, big = false }: { n: string; k: string; c: string; big?: boolean }) {
  return (
    <div className={big ? 'qv-stat qv-stat-big' : 'qv-stat'}>
      <div className="qv-stat-number">{n}</div>
      <div className="qv-stat-label">{k}</div>
      <div className="qv-stat-context">{c}</div>
    </div>
  );
}

function QuickLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  const isExternal = href.startsWith('http');
  return (
    <a
      className="qv-link-button"
      href={href}
      aria-label={label}
      title={label}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
    >
      {children}
    </a>
  );
}

function Sigil() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 16 L8 8 L12 12 L16 8 L16 16" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Pin({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 12 14" width="10" height="12" aria-hidden="true">
      <path d="M6 0 Q1 0 1 5 Q1 10 6 14 Q11 10 11 5 Q11 0 6 0 Z" fill={c} stroke="rgba(0,0,0,.4)" strokeWidth=".5" />
      <circle cx="6" cy="5" r="1.8" fill="#fffaee" />
    </svg>
  );
}
