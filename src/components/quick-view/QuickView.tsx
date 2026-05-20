import { AnimatePresence, motion } from 'framer-motion';
import { Suspense, useEffect, useState, type ReactNode } from 'react';
import { getBuilding, type BuildingId } from '@/data/buildings';
import { AvatarFront } from './Avatar';
import { Thumb, type ThumbKind } from './Thumb';
import { Audio } from '@/audio/AudioManager';
import { ResponsivePanel } from '../ui/ResponsivePanel';
import { getLazyPanel, preloadPanel } from '../panels/panelRegistry';
import './quick-view.css';

type DashboardGroup = 'work' | 'projects' | 'about';

interface LandingPageProps {
  onOpenQuick: () => void;
  onOpenWorld: () => void;
}

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
    title: 'Twin Towers',
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

export function LandingPage({ onOpenQuick, onOpenWorld }: LandingPageProps) {
  return (
    <main className="qv-landing">
      <div className="qv-grain" aria-hidden="true" />
      <div className="qv-sun" aria-hidden="true" />
      <SoftCloud x={80} y={128} scale={1.1} />
      <SoftCloud x={820} y={190} scale={0.85} />
      <SoftCloud x={1160} y={292} scale={0.95} />

      <nav className="qv-landing-nav" aria-label="Portfolio shortcuts">
        <span className="qv-brand">
          <Sigil />
          <span>PF | Portfolio</span>
        </span>
        <a
          className="qv-resume-link"
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download="parthiv-farazi-resume.pdf"
        >
          <span className="qv-resume-link__arrow" aria-hidden="true">↓</span>
          <span>Resume PDF</span>
        </a>
      </nav>

      <section className="qv-hero">
        <div className="qv-eyebrow">A portfolio | in two speeds</div>
        <h1>Hi, I&apos;m Parthiv.</h1>
        <p>
          CS at Georgia Tech. Co-founder & CTO of <strong>UPDT.</strong>, an AI soccer analytics platform.
          Atlanta-based, originally Kuala Lumpur. I build at the intersection of sports, AI, and product.
        </p>
      </section>

      <aside className="qv-polaroid" aria-label="Portrait of Parthiv Farazi">
        <div className="qv-polaroid-art">
          <img
            className="qv-polaroid-photo"
            src="/quick-view/self-portrait.jpg"
            alt="Parthiv Farazi at Bobby Dodd Stadium"
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="qv-polaroid-caption">Parthiv, in person.</div>
      </aside>

      <section className="qv-choice-grid" aria-label="Choose portfolio mode">
        <ChoiceCard
          kicker="See everything at a glance | ~2 min"
          title="Quick View"
          desc="A single scannable page with stats, work, projects, story, and contact."
          preview={<DashboardMini />}
          cta="Open Quick View"
          accent="gold"
          onClick={onOpenQuick}
        />
        <ChoiceCard
          kicker="Walk through the world | ~10 min"
          title="Exploration Mode"
          desc="Move through the island and open the same themed panels inside each building."
          preview={<IslandMini />}
          cta="Enter the Island"
          accent="sage"
          onClick={onOpenWorld}
        />
      </section>

      <div className="qv-bottom-note">
        <span>Either way, same panels, same content, same person.</span>
        <a
          className="qv-built-link"
          href="https://github.com/parthivFarazi/self-portfolio"
          target="_blank"
          rel="noopener noreferrer"
        >
          How I built this →
        </a>
      </div>
    </main>
  );
}

export function QuickViewDashboard({ onOpenWorld, onBackHome }: QuickViewDashboardProps) {
  const [openPanel, setOpenPanel] = useState<BuildingId | null>(null);

  useEffect(() => {
    if (!openPanel) return undefined;
    Audio.panelOpen();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenPanel(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      Audio.panelClose();
    };
  }, [openPanel]);

  return (
    <main className="qv-dashboard">
      <div className="qv-dashboard-glow" aria-hidden="true" />
      <div className="qv-dashboard-shell">
        <nav className="qv-dashboard-nav" aria-label="Quick View navigation">
          <button className="qv-brand qv-brand-button" type="button" onClick={onBackHome}>
            <Sigil />
            <span>PF | Portfolio | Quick View</span>
          </button>
          <div className="qv-nav-actions">
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

      <AnimatePresence>
        {openPanel ? (
          <DashboardPanelOverlay
            key={openPanel}
            id={openPanel}
            onClose={() => setOpenPanel(null)}
            onHome={onBackHome}
          />
        ) : null}
      </AnimatePresence>
    </main>
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
          <span>Open panel</span>
          <span>-&gt;</span>
        </span>
      </div>
    </button>
  );
}

function DashboardPanelOverlay({ id, onClose, onHome }: { id: BuildingId; onClose: () => void; onHome: () => void }) {
  const def = getBuilding(id);
  const Panel = getLazyPanel(id);
  const goHome = () => {
    onClose();
    onHome();
  };

  return (
    <motion.div
      className="qv-panel-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      <motion.div
        className="qv-panel-stage"
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <Suspense fallback={<QuickPanelLoading width={def.panelSize.w} height={def.panelSize.h} />}>
          <ResponsivePanel width={def.panelSize.w} height={def.panelSize.h}>
            <Panel width={def.panelSize.w} height={def.panelSize.h} />
          </ResponsivePanel>
        </Suspense>
      </motion.div>
      <button type="button" className="qv-panel-close" aria-label="Close panel" onClick={onClose}>
        x
      </button>
      <button type="button" className="qv-panel-home" onClick={goHome}>
        Home Screen
      </button>
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
        <AvatarFront size={118} />
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
            <Pin c="#6fd5e0" /> Originally Kuala Lumpur
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

function ChoiceCard({
  kicker,
  title,
  desc,
  preview,
  cta,
  accent,
  onClick,
}: {
  kicker: string;
  title: string;
  desc: string;
  preview: ReactNode;
  cta: string;
  accent: 'gold' | 'sage';
  onClick: () => void;
}) {
  return (
    <button className={`qv-choice qv-choice-${accent}`} type="button" onClick={onClick}>
      <div className="qv-choice-copy">
        <span>{kicker}</span>
        <h2>{title}</h2>
        <p>{desc}</p>
        <strong>{cta} -&gt;</strong>
      </div>
      <div className="qv-choice-preview">{preview}</div>
    </button>
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

function SoftCloud({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <svg
      viewBox="0 0 240 80"
      width={240 * scale}
      height={80 * scale}
      className="qv-cloud"
      style={{ left: x, top: y }}
      aria-hidden="true"
    >
      <ellipse cx="60" cy="50" rx="50" ry="22" fill="#fffaee" />
      <ellipse cx="120" cy="40" rx="62" ry="28" fill="#fffaee" />
      <ellipse cx="180" cy="48" rx="48" ry="22" fill="#fffaee" />
      <ellipse cx="90" cy="30" rx="30" ry="14" fill="#fffaee" opacity=".85" />
    </svg>
  );
}

function DashboardMini() {
  return (
    <svg viewBox="0 0 200 150" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect width="200" height="150" fill="#fcf2d8" />
      <rect x="8" y="10" width="184" height="22" fill="#f9efd1" stroke="#d4c178" strokeWidth=".5" />
      <circle cx="22" cy="21" r="6" fill="#d9a779" />
      <rect x="34" y="16" width="60" height="3" fill="#2a1a0e" />
      <rect x="34" y="22" width="80" height="2" fill="#7a5a30" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x={8 + i * 31} y="40" width="29" height="22" fill="#f9efd1" stroke="#d4c178" strokeWidth=".4" />
          <rect x={11 + i * 31} y="44" width="14" height="6" fill="#b3a369" />
          <rect x={11 + i * 31} y="52" width="20" height="2" fill="#7a5a30" />
          <rect x={11 + i * 31} y="56" width="16" height="2" fill="#7a5a30" opacity=".6" />
        </g>
      ))}
      {[0, 1, 2].map((c) => (
        <g key={`w${c}`}>
          <rect x={8 + c * 64} y="68" width="60" height="28" fill="#f9efd1" stroke="#d4c178" strokeWidth=".5" />
          <rect x={10 + c * 64} y="70" width="28" height="22" fill="#e8d5a8" />
        </g>
      ))}
      {[0, 1, 2, 3, 4, 5].map((c) => (
        <g key={`p${c}`}>
          <rect x={8 + (c % 3) * 64} y={102 + Math.floor(c / 3) * 22} width="60" height="18" fill="#f9efd1" stroke="#d4c178" strokeWidth=".4" />
          <rect x={10 + (c % 3) * 64} y={104 + Math.floor(c / 3) * 22} width="18" height="14" fill="#e8d5a8" />
        </g>
      ))}
    </svg>
  );
}

function IslandMini() {
  return (
    <svg viewBox="0 0 200 150" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <linearGradient id="qv-island-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd9a8" />
          <stop offset="100%" stopColor="#c8dfd6" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="url(#qv-island-sky)" />
      <circle cx="160" cy="30" r="14" fill="#fff1c8" opacity=".75" />
      <rect x="0" y="100" width="200" height="50" fill="#7eb86a" />
      <rect x="0" y="100" width="200" height="3" fill="#a8d49f" />
      <rect x="0" y="115" width="200" height="4" fill="#c8b585" />
      <rect x="22" y="62" width="20" height="38" fill="#a8553c" />
      <path d="M22 62 L32 50 L42 62 Z" fill="#3a4652" />
      <rect x="58" y="50" width="14" height="50" fill="#cfd8dc" />
      <line x1="65" y1="50" x2="65" y2="42" stroke="#1a1410" strokeWidth=".7" />
      <ellipse cx="100" cy="98" rx="22" ry="6" fill="#3a4652" />
      <ellipse cx="100" cy="94" rx="20" ry="5" fill="#94e2c0" />
      <rect x="140" y="68" width="16" height="32" fill="#6fd5e0" />
      <rect x="170" y="76" width="14" height="24" fill="#857a5a" />
      <circle cx="98" cy="106" r="3" fill="#1a1410" />
      <rect x="96" y="108" width="4" height="6" fill="#f6f1e4" />
      <rect x="36" y="42" width="14" height="6" rx="2" fill="rgba(15,15,12,.85)" />
      <path d="M40 48 L43 52 L46 48 Z" fill="rgba(15,15,12,.85)" />
    </svg>
  );
}
