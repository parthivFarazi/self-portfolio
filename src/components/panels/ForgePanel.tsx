import type { PanelProps } from './UPDTPanel';

export function ForgePanel({ width = 760, height = 780 }: PanelProps) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(ellipse at 50% 30%, #0e1a3a 0%, #050a1c 70%, #02050e 100%)',
      fontFamily: 'var(--rw-sans)', color: '#cdf3e2',
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(111,213,224,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(111,213,224,.1) 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: .8 }}/>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(111,213,224,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(111,213,224,.06) 1px, transparent 1px)', backgroundSize: '128px 128px', opacity: 1 }}/>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 20%, rgba(245,217,122,.16), transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(224,126,195,.1), transparent 50%)' }}/>
      {([[80, 60], [220, 140], [560, 80], [640, 280], [120, 380], [480, 460], [320, 600], [680, 520]] as Array<[number, number]>).map(([x, y], i) => (
        <div key={i} style={{ position: 'absolute', left: x, top: y, width: 2, height: 2, borderRadius: '50%', background: '#f5d97a', boxShadow: '0 0 8px #f5d97a, 0 0 16px rgba(245,217,122,.6)', opacity: .7 }}/>
      ))}

      <div style={{ position: 'relative', padding: '28px 32px', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ font: '10.5px "JetBrains Mono", monospace', letterSpacing: '.22em', color: '#f5d97a', textTransform: 'uppercase' }}>
            The Forge · skills · DWG-007
          </div>
          <div style={{ font: '10.5px "JetBrains Mono", monospace', letterSpacing: '.18em', color: 'rgba(205,243,226,.55)' }}>
            P. FARAZI · SCALE 1:1
          </div>
        </div>
        <h1 style={{ font: 'italic 44px/1 var(--rw-serif)', margin: '8px 0 4px', color: '#fffaee' }}>Every language,<br/>forged.</h1>
        <div style={{ font: '15px/1.45 var(--rw-sans, system-ui)', color: 'rgba(255,250,238,.78)', margin: '2px 0 4px', maxWidth: '52ch' }}>
          The languages, frameworks, and tools I work with.
        </div>
        <div style={{ font: '11px "JetBrains Mono", monospace', color: 'rgba(205,243,226,.65)' }}>
          The tools on the wall — picked up over four years of building.
        </div>

        <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <AnvilGlyph/>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, #f5d97a, transparent)', opacity: .6 }}/>
        </div>

        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, flex: 1 }}>
          <Shelf label="Languages" accent="#f5d97a" items={[
            { name: 'Python' }, { name: 'TypeScript' }, { name: 'JavaScript' },
            { name: 'C++' }, { name: 'Java' }, { name: 'SQL' }, { name: 'Bash' },
          ]}/>
          <Shelf label="Frameworks" accent="#6fd5e0" items={[
            { name: 'React' }, { name: 'Next.js' }, { name: 'React Native' },
            { name: 'FastAPI' }, { name: 'Three.js' }, { name: 'Framer Motion' },
            { name: 'Expo' }, { name: 'Tailwind' },
          ]}/>
          <Shelf label="AI / ML" accent="#e07ec3" items={[
            { name: 'PyTorch' }, { name: 'Hugging Face' }, { name: 'FAISS' },
            { name: 'Donut' }, { name: 'Gemma-3' }, { name: 'OpenCV' },
            { name: 'OpenAI API' }, { name: 'NumPy' },
          ]}/>
          <Shelf label="DevOps & Data" accent="#94e2c0" items={[
            { name: 'GCP' }, { name: 'Firebase' }, { name: 'Supabase' },
            { name: 'PostgreSQL' }, { name: 'Docker' }, { name: 'GitHub Actions' },
            { name: 'PACE H100' }, { name: 'Linux' },
          ]}/>
        </div>

        <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px dashed rgba(245,217,122,.3)', display: 'flex', justifyContent: 'space-between', font: '10px "JetBrains Mono", monospace', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(245,217,122,.55)' }}>
          <span>Forged · ATL · 2022 — present</span>
          <span>33 tools · 4 disciplines</span>
        </div>
      </div>
    </div>
  );
}

function AnvilGlyph() {
  return (
    <svg viewBox="0 0 32 22" width="32" height="22">
      <path d="M3 10 L29 10 L26 14 L22 14 L22 18 L10 18 L10 14 L6 14 Z" fill="#f5d97a" opacity=".9"/>
      <rect x="14" y="18" width="4" height="3" fill="#f5d97a" opacity=".9"/>
      <rect x="11" y="2" width="10" height="5" fill="#94e2c0" opacity=".9"/>
      <rect x="15" y="6" width="2" height="4" fill="#94e2c0" opacity=".9"/>
      <circle cx="26" cy="6" r="1" fill="#f5d97a"/>
      <circle cx="6" cy="4" r="1" fill="#f5d97a" opacity=".7"/>
    </svg>
  );
}

function Shelf({ label, accent, items }: { label: string; accent: string; items: Array<{ name: string }> }) {
  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(180deg, rgba(20,30,46,.55), rgba(10,20,32,.65))',
      border: `1px solid ${accent}44`,
      boxShadow: `0 0 18px ${accent}1a, inset 0 0 0 1px rgba(255,255,255,.03)`,
      padding: '12px 14px 14px',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <span style={{ position: 'absolute', top: -1, left: -1, width: 8, height: 8, borderTop: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }}/>
      <span style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, borderTop: `2px solid ${accent}`, borderRight: `2px solid ${accent}` }}/>
      <span style={{ position: 'absolute', bottom: -1, left: -1, width: 8, height: 8, borderBottom: `2px solid ${accent}`, borderLeft: `2px solid ${accent}` }}/>
      <span style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, borderBottom: `2px solid ${accent}`, borderRight: `2px solid ${accent}` }}/>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 6, height: 6, background: accent, boxShadow: `0 0 8px ${accent}` }}/>
        <div style={{ font: '10px "JetBrains Mono", monospace', letterSpacing: '.22em', color: accent, textTransform: 'uppercase' }}>{label}</div>
      </div>

      <div style={{ height: 1, background: `linear-gradient(90deg, ${accent}88, transparent)`, opacity: .7 }}/>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {items.map((it, i) => <SkillEmblem key={i} name={it.name} accent={accent}/>)}
      </div>
    </div>
  );
}

function SkillEmblem({ name, accent }: { name: string; accent: string }) {
  return (
    <div style={{
      position: 'relative',
      padding: '4px 9px 4px 22px',
      font: '10.5px "JetBrains Mono", monospace',
      letterSpacing: '.04em',
      color: '#fffaee',
      background: 'linear-gradient(180deg, rgba(245,217,122,.06), rgba(245,217,122,.02))',
      border: `1px solid ${accent}66`,
      boxShadow: `inset 0 0 8px ${accent}1a, 0 0 6px ${accent}22`,
      clipPath: 'polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)',
    }}>
      <div style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', width: 6, height: 6, background: accent, boxShadow: `0 0 6px ${accent}`, borderRadius: 1 }}/>
      {name}
    </div>
  );
}
