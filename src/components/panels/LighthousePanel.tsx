import type { PanelProps } from './UPDTPanel';

export function LighthousePanel({ width = 760, height = 780 }: PanelProps) {
  return (
    <div style={{
      width, height, position: 'relative', overflow: 'hidden',
      background: 'repeating-linear-gradient(8deg, #5a3a22 0 22px, #4a2e1c 22px 24px, #6a4628 24px 46px), #4a2e1c',
      fontFamily: 'var(--rw-sans)',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 0%, rgba(245,217,122,.32), transparent 50%)' }}/>
      <div style={{ position: 'absolute', top: -120, right: -200, width: 600, height: 700, background: 'linear-gradient(225deg, rgba(245,217,122,.18), transparent 60%)', transform: 'rotate(8deg)', pointerEvents: 'none' }}/>

      <div style={{
        position: 'absolute', left: 32, top: 36, width: 430, minHeight: height - 200,
        background: 'linear-gradient(180deg, #fbf3da, #f1e6c0)',
        boxShadow: '0 14px 28px rgba(0,0,0,.55), inset 0 0 40px rgba(120,80,40,.08)',
        transform: 'rotate(-2deg)',
        padding: '84px 36px 40px 38px',
      }}>
        <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%) rotate(4deg)' }}>
          <LighthouseSeal/>
        </div>
        {/* Header row dropped below the wax seal so the two never collide */}
        <div style={{ position: 'absolute', top: 48, left: 18, font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.22em', textTransform: 'uppercase', color: '#7a5a30' }}>
          The Lighthouse · contact
        </div>
        <div style={{ position: 'absolute', top: 48, right: 18, font: '9.5px "JetBrains Mono", monospace', letterSpacing: '.16em', color: '#7a5a30' }}>
          ATL
        </div>

        <h1 style={{ font: 'italic 36px/1.05 var(--rw-serif)', margin: '0 0 10px', color: '#2a1a0e' }}>
          If you're reading this,<br/>let's talk.
        </h1>

        <div style={{ font: '19px/1.6 "Caveat", cursive', color: '#2a1a0e' }}>
          <p style={{ margin: 0 }}>
            Hope you had a fun experience in this portfolio. Please feel free to contact me through any of these means. Looking forward to hearing from you!
          </p>
        </div>

        <div style={{ marginTop: 18, font: '32px/1 "Caveat", cursive', color: '#2a1a0e' }}>— Parthiv</div>
        <div style={{ marginTop: 6, font: '10.5px "JetBrains Mono", monospace', letterSpacing: '.16em', textTransform: 'uppercase', color: '#7a5a30' }}>
          parthiv farazi · cto · updt.pro
        </div>

        <div style={{ marginTop: 18, padding: '14px 16px', background: 'rgba(255,255,255,.45)', border: '1px dashed #c8b585', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ContactLine icon="✉" label="Write to" value="parthivfarazi@icloud.com" href="mailto:parthivfarazi@icloud.com"/>
          <ContactLine icon="☎" label="Call" value="(+1) 404 · 203 · 5379" href="tel:+14042035379"/>
          <ContactLine icon="◐" label="Find on the web" value="updt.pro" href="https://updt.pro" external/>
          <ContactLine icon="✦" label="GitHub" value="github.com/parthivFarazi" href="https://github.com/parthivFarazi" external/>
          <ContactLine icon="❖" label="LinkedIn" value="Parthiv Farazi" href="https://www.linkedin.com/in/parthiv-farazi-1aba8b223/" external/>
        </div>

        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 100% 0%, rgba(120,70,20,.1), transparent 30%), radial-gradient(ellipse at 0% 100%, rgba(120,70,20,.1), transparent 30%)' }}/>
      </div>

      <div style={{
        position: 'absolute', right: 32, top: 220, width: 250, height: 380,
        background: '#1a1410',
        borderRadius: 10,
        boxShadow: '0 14px 28px rgba(0,0,0,.55), inset 0 0 0 4px #2a2018, inset 0 0 24px rgba(0,0,0,.6)',
        transform: 'rotate(3deg)',
        padding: 12,
      }}>
        <div style={{
          position: 'absolute', inset: 12,
          background: 'radial-gradient(ellipse at 50% 40%, #0a1a14 0%, #050a08 100%)',
          borderRadius: 4,
          boxShadow: 'inset 0 0 32px rgba(124,209,122,.18)',
          overflow: 'hidden',
          font: '11px/1.5 "JetBrains Mono", monospace',
          color: '#7cd17a',
          padding: '12px 14px',
        }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,0,0,.18) 2px 3px)', pointerEvents: 'none' }}/>
          <div style={{ color: '#94e2c0' }}>$ contact --who parthiv</div>
          <div style={{ color: 'rgba(124,209,122,.65)', marginTop: 6 }}>{'>'} resolving handles…</div>
          <div style={{ marginTop: 8 }}><span style={{ color: '#f5d97a' }}>email</span>  parthivfarazi@icloud.com</div>
          <div><span style={{ color: '#f5d97a' }}>phone</span>  +1 404 203 5379</div>
          <div><span style={{ color: '#f5d97a' }}>web  </span>  updt.pro</div>
          <div><span style={{ color: '#f5d97a' }}>gh   </span>  parthivFarazi</div>
          <div><span style={{ color: '#f5d97a' }}>in   </span>  Parthiv Farazi</div>
          <div style={{ marginTop: 10, color: 'rgba(124,209,122,.65)' }}>{'>'} status: <span style={{ color: '#7cd17a' }}>online</span></div>
          <div style={{ color: 'rgba(124,209,122,.65)' }}>{'>'} latency: warm</div>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center' }}>
            <span>$ </span>
            <span style={{ marginLeft: 2, width: 7, height: 14, background: '#7cd17a', boxShadow: '0 0 6px #7cd17a', display: 'inline-block', animation: 'blink 1s steps(2) infinite' }}/>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: -4, left: 24, font: '8px "JetBrains Mono", monospace', letterSpacing: '.2em', color: '#f5d97a' }}>
          ◉ LIGHTHOUSE-01
        </div>
      </div>

      <svg viewBox="0 0 120 16" width="120" height="16" style={{ position: 'absolute', right: 60, top: 620, transform: 'rotate(-12deg)', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,.5))' }}>
        <rect x="0" y="6" width="80" height="4" fill="#2a1a0e"/>
        <rect x="80" y="6" width="20" height="4" fill="#b3a369"/>
        <path d="M100 6 L100 10 L116 8 Z" fill="#1a1410"/>
        <rect x="6" y="4" width="6" height="8" fill="#c44a3a"/>
      </svg>

      <div style={{ position: 'absolute', left: 32, bottom: 36, width: 90, height: 56, padding: 4, background: '#fbf3da', boxShadow: '0 4px 8px rgba(0,0,0,.4)', transform: 'rotate(-6deg)',
        backgroundImage: 'radial-gradient(circle at 0 0, transparent 4px, #fbf3da 4px), radial-gradient(circle at 100% 0, transparent 4px, #fbf3da 4px)',
      }}>
        <div style={{
          width: '100%', height: '100%',
          background: 'linear-gradient(180deg, #ffd4a3 0%, #b3dfd7 100%)',
          position: 'relative',
          display: 'grid', placeItems: 'center',
        }}>
          <MiniLighthouse/>
          <div style={{ position: 'absolute', bottom: 2, left: 0, right: 0, textAlign: 'center', font: '8px "JetBrains Mono", monospace', color: '#2a1a0e', letterSpacing: '.18em' }}>USD · 0.67</div>
        </div>
      </div>

      <style>{`@keyframes blink { 0%,49% {opacity:1} 50%,100% {opacity:0} }`}</style>
    </div>
  );
}

function ContactLine({ icon, label, value, href, external }: {
  icon: string; label: string; value: string; href: string; external?: boolean;
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '20px 110px 1fr', alignItems: 'baseline', gap: 6 }}>
      <span style={{ font: '14px var(--rw-serif)', color: '#c44a3a' }}>{icon}</span>
      <span style={{ font: '10px "JetBrains Mono", monospace', letterSpacing: '.16em', textTransform: 'uppercase', color: '#7a5a30' }}>{label}</span>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        style={{
          font: '18px "Caveat", cursive', color: '#2a1a0e',
          textDecoration: 'underline',
          textUnderlineOffset: 3,
          textDecorationColor: 'rgba(122,90,48,.5)',
          // Hit area hugs the text instead of stretching across the grid cell.
          justifySelf: 'start',
          // Inline styles can't express :focus-visible — keep the default
          // focus ring but tint it to the panel's seal red.
          outlineColor: '#c44a3a',
        }}
      >{value}</a>
    </div>
  );
}

function LighthouseSeal() {
  return (
    <div style={{ width: 56, height: 56, position: 'relative' }}>
      <div style={{ position: 'absolute', inset: -2, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,30,20,.45), transparent 60%)', filter: 'blur(3px)' }}/>
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #d35a4a 0%, #9a2a1a 60%, #5a1208 100%)',
        boxShadow: 'inset 0 -6px 8px rgba(0,0,0,.5), inset 0 3px 6px rgba(255,180,160,.35), 0 3px 6px rgba(0,0,0,.4)',
        display: 'grid', placeItems: 'center',
      }}>
        <svg viewBox="0 0 24 24" width="22" height="22" style={{ color: '#3a0a04' }}>
          <rect x="10" y="6" width="4" height="14" fill="currentColor"/>
          <path d="M8 6 L16 6 L14 4 L10 4 Z" fill="currentColor"/>
          <rect x="11" y="2" width="2" height="2" fill="currentColor"/>
          <path d="M8 8 L16 8 M8 12 L16 12" stroke="#fff" strokeWidth=".4" opacity=".4"/>
          <circle cx="12" cy="5" r=".8" fill="#f5d97a"/>
        </svg>
      </div>
    </div>
  );
}

function MiniLighthouse() {
  return (
    <svg viewBox="0 0 50 56" width="50" height="44">
      <rect x="20" y="20" width="10" height="32" fill="#fffaee"/>
      <rect x="20" y="26" width="10" height="3" fill="#c44a3a"/>
      <rect x="20" y="32" width="10" height="3" fill="#c44a3a"/>
      <path d="M18 20 L32 20 L30 16 L20 16 Z" fill="#2a1a0e"/>
      <rect x="22" y="10" width="6" height="6" fill="#f5d97a"/>
      <path d="M22 10 L28 10 L26 6 L24 6 Z" fill="#2a1a0e"/>
      <path d="M28 13 L46 4 L46 22 Z" fill="#f5d97a" opacity=".35"/>
      <rect x="0" y="52" width="50" height="4" fill="#3a4a3e"/>
    </svg>
  );
}
