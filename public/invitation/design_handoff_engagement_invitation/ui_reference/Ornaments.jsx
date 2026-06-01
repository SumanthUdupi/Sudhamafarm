/* ════════ Ornaments.jsx — shared visual vocabulary ════════
   Deity attribute icons, kolam corners, garlands, rules,
   wave dividers, and ambient petal/mote layers.
   Exports everything to window for cross-file use. */

const { useEffect, useRef, useState } = React;

/* ── Pancha-Deva deity attribute icons (kumkum + brass) ── */
function Chakra(p) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...p}>
      <circle cx="24" cy="24" r="20" stroke="#800020" strokeWidth="1.9"/>
      <circle cx="24" cy="24" r="12" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3.5 2.5" opacity=".8"/>
      <circle cx="24" cy="24" r="5" fill="#800020"/>
      <circle cx="24" cy="24" r="2.8" fill="#D4AF37"/>
      <line x1="24" y1="4" x2="24" y2="18" stroke="#800020" strokeWidth="2"/>
      <line x1="24" y1="30" x2="24" y2="44" stroke="#800020" strokeWidth="2"/>
      <line x1="4" y1="24" x2="18" y2="24" stroke="#800020" strokeWidth="2"/>
      <line x1="30" y1="24" x2="44" y2="24" stroke="#800020" strokeWidth="2"/>
      <line x1="10.3" y1="10.3" x2="19.2" y2="19.2" stroke="#800020" strokeWidth="1.6"/>
      <line x1="28.8" y1="28.8" x2="37.7" y2="37.7" stroke="#800020" strokeWidth="1.6"/>
      <line x1="37.7" y1="10.3" x2="28.8" y2="19.2" stroke="#800020" strokeWidth="1.6"/>
      <line x1="10.3" y1="37.7" x2="19.2" y2="28.8" stroke="#800020" strokeWidth="1.6"/>
    </svg>
  );
}
function Trishul(p) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...p}>
      <line x1="24" y1="8" x2="24" y2="42" stroke="#800020" strokeWidth="2.4"/>
      <path d="M24 16 Q14 11 12 7 Q14 13 24 18Z" fill="#800020"/>
      <path d="M24 16 Q34 11 36 7 Q34 13 24 18Z" fill="#800020"/>
      <line x1="15" y1="27" x2="33" y2="27" stroke="#800020" strokeWidth="2.2"/>
      <line x1="15" y1="30" x2="33" y2="30" stroke="#800020" strokeWidth="1" opacity=".5"/>
      <ellipse cx="24" cy="38" rx="5" ry="2" stroke="#D4AF37" strokeWidth="1.4" fill="none"/>
      <circle cx="24" cy="38" r="1.4" fill="#D4AF37" opacity=".7"/>
    </svg>
  );
}
function Murali(p) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...p}>
      <rect x="5" y="22" width="38" height="5" rx="2.5" fill="#800020" transform="rotate(-16 24 24)"/>
      <circle cx="13" cy="23" r="1.8" fill="#D4AF37" transform="rotate(-16 24 24)"/>
      <circle cx="19" cy="23" r="1.8" fill="#D4AF37" transform="rotate(-16 24 24)"/>
      <circle cx="25" cy="23" r="1.8" fill="#D4AF37" transform="rotate(-16 24 24)"/>
      <circle cx="31" cy="23" r="1.8" fill="#D4AF37" transform="rotate(-16 24 24)"/>
      <text x="30" y="13" fontSize="8" fill="#EAA221" opacity=".75" fontFamily="serif">&#9834;</text>
      <text x="36" y="8" fontSize="6" fill="#EAA221" opacity=".5" fontFamily="serif">&#9835;</text>
      <circle cx="8" cy="26" r="2.2" fill="#D4AF37" opacity=".6" transform="rotate(-16 24 24)"/>
    </svg>
  );
}
function Vel(p) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...p}>
      <line x1="24" y1="10" x2="24" y2="44" stroke="#800020" strokeWidth="2.4"/>
      <polygon points="24,4 28,14 24,20 20,14" fill="#800020"/>
      <polygon points="24,4 28,14 24,20 20,14" stroke="#D4AF37" strokeWidth=".8" fill="none"/>
      <path d="M13 22 Q18 19 24 22 Q30 19 35 22 L33 24 Q30 22 24 24 Q18 22 15 24 Z" fill="#800020"/>
      <circle cx="24" cy="40" r="4" stroke="#D4AF37" strokeWidth="1.4" fill="none"/>
      <circle cx="24" cy="40" r="1.8" fill="#D4AF37" opacity=".65"/>
    </svg>
  );
}
function Gada(p) {
  return (
    <svg viewBox="0 0 48 48" fill="none" {...p}>
      <line x1="24" y1="18" x2="24" y2="44" stroke="#800020" strokeWidth="2.6"/>
      <ellipse cx="24" cy="12" rx="10" ry="10" fill="#800020"/>
      <ellipse cx="24" cy="12" rx="7.2" ry="7.2" fill="#D4AF37" opacity=".55"/>
      <circle cx="24" cy="12" r="3.5" fill="#800020"/>
      <circle cx="24" cy="12" r="1.5" fill="#D4AF37" opacity=".7"/>
      <line x1="18" y1="26" x2="30" y2="26" stroke="#D4AF37" strokeWidth="1.3" opacity=".65"/>
      <line x1="18" y1="31" x2="30" y2="31" stroke="#D4AF37" strokeWidth="1.3" opacity=".65"/>
      <line x1="18" y1="36" x2="30" y2="36" stroke="#D4AF37" strokeWidth="1" opacity=".4"/>
    </svg>
  );
}

const DEITIES = [
  { C: Chakra, kn: 'ವಿಷ್ಣು' },
  { C: Trishul, kn: 'ಶಿವ' },
  { C: Murali, kn: 'ಕೃಷ್ಣ' },
  { C: Vel, kn: 'ಸ್ಕಂದ' },
  { C: Gada, kn: 'ಹನುಮಂತ' },
];

function DeityRow() {
  return (
    <div className="deity-row" role="list" aria-label="Five presiding deities">
      {DEITIES.map(({ C, kn }, i) => (
        <div className="deity" role="listitem" key={i}>
          <C aria-hidden="true" />
          <span className="deity-name" lang="kn">{kn}</span>
        </div>
      ))}
    </div>
  );
}

/* brass monochrome variant for the dark closing footer */
function DeityRowBrass() {
  const brassify = (node) => node; // icons drawn at small size; tint via CSS filter below
  return (
    <div className="close-deity-row" aria-hidden="true" style={{ filter: 'grayscale(1) sepia(1) saturate(3) hue-rotate(5deg) brightness(1.15)' }}>
      {DEITIES.map(({ C }, i) => <C key={i} width="26" height="26" />)}
    </div>
  );
}

function KolamCorner({ pos }) {
  return (
    <svg className={`corner ${pos}`} width="90" height="90" viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path d="M8 8 L8 56 Q8 8 56 8 Z" stroke="#D4AF37" strokeWidth="1.4" fill="rgba(212,175,55,.09)"/>
      <circle cx="8" cy="8" r="4" fill="#D4AF37"/>
      <circle cx="32" cy="8" r="3" fill="#EAA221" opacity=".5"/>
      <circle cx="8" cy="32" r="3" fill="#EAA221" opacity=".5"/>
      <path d="M8 8 Q20 15 15 26 Q8 18 8 8Z" fill="rgba(212,175,55,.3)"/>
      <path d="M8 8 Q15 20 26 15 Q18 8 8 8Z" fill="rgba(212,175,55,.3)"/>
      <path d="M8 28 Q22 20 30 8" stroke="#D4AF37" strokeWidth=".9" opacity=".55"/>
    </svg>
  );
}

function Garland({ bottom }) {
  return (
    <svg className={`hero-garland ${bottom ? 'bottom' : ''}`} width="280" height="30" viewBox="0 0 280 30" aria-hidden="true">
      <path d="M0 15 Q35 5 70 15 Q105 25 140 15 Q175 5 210 15 Q245 25 280 15" stroke="#EAA221" strokeWidth="1.7" fill="none"/>
      <circle cx="70" cy="15" r="4.5" fill="#EAA221" opacity=".85"/>
      <circle cx="140" cy="15" r="5" fill="#D4AF37"/>
      <circle cx="210" cy="15" r="4.5" fill="#EAA221" opacity=".85"/>
      <circle cx="35" cy="9" r="3" fill="#FFC30B" opacity=".55"/>
      <circle cx="105" cy="21" r="3" fill="#FFC30B" opacity=".55"/>
      <circle cx="175" cy="9" r="3" fill="#FFC30B" opacity=".55"/>
      <circle cx="245" cy="21" r="3" fill="#FFC30B" opacity=".55"/>
    </svg>
  );
}

function Rule({ gem = '✦', color }) {
  return <div className="rule"><span className="rule-gem" style={color ? { color } : null}>{gem}</span></div>;
}

function WaveDivider({ bg, path, fill }) {
  return (
    <div className="divider" style={{ background: bg }} aria-hidden="true">
      <svg viewBox="0 0 1440 65" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d={path} fill={fill} />
      </svg>
    </div>
  );
}

/* Ambient falling petals (Glow) */
function Petals({ count = 22 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const COLORS = ['rgba(212,175,55,.65)', 'rgba(234,162,33,.6)', 'rgba(255,195,11,.5)', 'rgba(128,0,32,.45)', 'rgba(244,231,199,.55)'];
    for (let i = 0; i < count; i++) {
      const s = 5 + Math.random() * 11;
      const p = document.createElement('span');
      p.className = 'petal';
      p.style.cssText = [
        `--s:${s}px`, `--c:${COLORS[(Math.random() * COLORS.length) | 0]}`,
        `--dur:${7 + Math.random() * 10}s`, `--delay:${Math.random() * 12}s`,
        `--r0:${-30 + Math.random() * 60}deg`, `--r1:${180 + Math.random() * 180}deg`,
        `--dx:${-80 + Math.random() * 160}px`, `--op:${0.35 + Math.random() * 0.45}`,
        `left:${Math.random() * 100}%`,
      ].join(';');
      el.appendChild(p);
    }
    return () => { el.innerHTML = ''; };
  }, [count]);
  return <div className="petals" ref={ref} aria-hidden="true" />;
}

/* Ambient floating motes (Folio) */
function Motes({ count = 16 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const colors = ['rgba(234,162,33,.85)', 'rgba(212,175,55,.8)', 'rgba(255,195,11,.7)', 'rgba(114,47,55,.6)', 'rgba(244,231,199,.5)'];
    for (let i = 0; i < count; i++) {
      const sz = 2 + Math.random() * 5;
      const m = document.createElement('div');
      m.className = 'mote';
      m.style.cssText = [
        `width:${sz}px`, `height:${sz}px`, `left:${Math.random() * 100}%`, `top:${15 + Math.random() * 72}%`,
        `background:${colors[(Math.random() * colors.length) | 0]}`,
        `--d:${9 + Math.random() * 11}s`, `--dl:${Math.random() * 9}s`, `--op:${(0.025 + Math.random() * 0.055).toFixed(3)}`,
      ].join(';');
      el.appendChild(m);
    }
    return () => { el.innerHTML = ''; };
  }, [count]);
  return <div ref={ref} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true" />;
}

Object.assign(window, { Chakra, Trishul, Murali, Vel, Gada, DEITIES, DeityRow, DeityRowBrass, KolamCorner, Garland, Rule, WaveDivider, Petals, Motes });
