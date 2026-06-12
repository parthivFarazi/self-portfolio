import type { ReactNode } from 'react';
import '@/components/quick-view/quick-view.css';

export default function LandingRoute({
  onOpenQuick,
  onOpenWorld,
  onPreloadQuick,
  onPreloadWorld,
}: {
  onOpenQuick: () => void;
  onOpenWorld: () => void;
  onPreloadQuick?: () => void;
  onPreloadWorld?: () => void;
}) {
  return (
    <main className="qv-landing">
      <div className="qv-grain" aria-hidden="true" />
      <div className="qv-sun" aria-hidden="true" />
      <SoftCloud left={80} y={128} scale={1.1} />
      <SoftCloud left="55%" y={190} scale={0.85} />
      <SoftCloud right="3%" y={292} scale={0.95} />

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
          Born in Bangladesh and raised in Malaysia, now Atlanta-based. I build at the intersection of sports, AI, and product.
        </p>
      </section>

      <aside className="qv-polaroid" aria-label="Portrait of Parthiv Farazi">
        <div className="qv-polaroid-art">
          <img
            className="qv-polaroid-photo"
            src="/quick-view/self-portrait.webp"
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
          onHover={onPreloadQuick}
        />
        <ChoiceCard
          kicker="Walk through the world | ~10 min"
          title="Exploration Mode"
          desc="Move through the island and open the same themed panels inside each building."
          preview={<IslandMini />}
          cta="Enter the World"
          accent="sage"
          onClick={onOpenWorld}
          onHover={onPreloadWorld}
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

function ChoiceCard({
  kicker,
  title,
  desc,
  preview,
  cta,
  accent,
  onClick,
  onHover,
}: {
  kicker: string;
  title: string;
  desc: string;
  preview: ReactNode;
  cta: string;
  accent: 'gold' | 'sage';
  onClick: () => void;
  onHover?: () => void;
}) {
  return (
    <button
      className={`qv-choice qv-choice-${accent}`}
      type="button"
      onClick={onClick}
      onMouseEnter={onHover}
      onFocus={onHover}
    >
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

function Sigil() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 16 L8 8 L12 12 L16 8 L16 16" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SoftCloud({
  left,
  right,
  y,
  scale = 1,
}: {
  left?: number | string;
  right?: number | string;
  y: number;
  scale?: number;
}) {
  return (
    <svg
      viewBox="0 0 240 80"
      width={240 * scale}
      height={80 * scale}
      className="qv-cloud"
      style={{ left, right, top: y }}
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
        <linearGradient id="landing-island-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd9a8" />
          <stop offset="100%" stopColor="#c8dfd6" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="url(#landing-island-sky)" />
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
