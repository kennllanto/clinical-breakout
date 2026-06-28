// Themed SVG illustrations for the Vasoactive Breakout.
// All colours reference CSS custom properties (var(--accent) etc.) so the art
// auto-recolours if the theme changes. Vector = crisp at any size, tiny, animatable.

export function HeroArt() {
  return (
    <svg className="art hero-art" viewBox="0 0 420 150" role="img"
         aria-label="ICU bedside monitor with ECG trace, IV pole and a lock">
      <defs>
        <linearGradient id="screenG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0c2230" />
          <stop offset="1" stopColor="#081722" />
        </linearGradient>
        <linearGradient id="bagG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent-2)" stopOpacity="0.85" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* IV pole + bag (left) */}
      <line x1="40" y1="16" x2="40" y2="138" stroke="var(--line)" strokeWidth="3" strokeLinecap="round" />
      <path d="M40 16 h26" stroke="var(--line)" strokeWidth="3" strokeLinecap="round" />
      <rect x="52" y="24" width="28" height="40" rx="7" fill="url(#bagG)" stroke="var(--accent-2)" strokeOpacity="0.5" />
      <line x1="66" y1="64" x2="66" y2="92" stroke="var(--accent-2)" strokeWidth="1.5" strokeDasharray="2 4" className="iv-drip" />
      <circle cx="66" cy="78" r="1.6" fill="var(--accent-2)" className="iv-drop" />

      {/* Monitor */}
      <rect x="96" y="20" width="220" height="110" rx="12" fill="#0a1722" stroke="var(--line)" />
      <rect x="106" y="30" width="200" height="74" rx="7" fill="url(#screenG)" stroke="var(--line)" strokeOpacity="0.6" />
      {/* ECG trace */}
      <polyline
        className="ecg"
        points="110,72 132,72 140,72 146,52 152,92 160,40 168,72 196,72 206,72 214,60 222,84 230,72 258,72 266,72 274,54 280,90 288,40 296,72 302,72"
        fill="none" stroke="var(--accent-2)" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
      {/* vitals readouts */}
      <rect x="112" y="110" width="40" height="14" rx="3" fill="#0a1722" stroke="var(--line)" />
      <text x="118" y="120" fontSize="9" fill="var(--accent-2)" fontFamily="monospace">98</text>
      <rect x="158" y="110" width="46" height="14" rx="3" fill="#0a1722" stroke="var(--line)" />
      <text x="164" y="120" fontSize="9" fill="var(--warn)" fontFamily="monospace">88/44</text>
      <rect x="210" y="110" width="40" height="14" rx="3" fill="#0a1722" stroke="var(--line)" />
      <text x="216" y="120" fontSize="9" fill="var(--danger)" fontFamily="monospace">58</text>

      {/* Lock badge (right) */}
      <g transform="translate(348,52)">
        <circle cx="22" cy="26" r="34" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeOpacity="0.4" />
        <path d="M10 24 v-6 a12 12 0 0 1 24 0 v6" fill="none" stroke="var(--accent-2)" strokeWidth="3.5" strokeLinecap="round" />
        <rect x="6" y="24" width="32" height="24" rx="5" fill="var(--accent)" stroke="var(--accent-2)" />
        <circle cx="22" cy="35" r="3.4" fill="#052420" />
        <rect x="20.6" y="35" width="2.8" height="7" rx="1.4" fill="#052420" />
      </g>
    </svg>
  )
}

// Per-level scene, keyed by level index (0..3).
export function LevelArt({ index = 0 }) {
  const scenes = [level1, level2, level3, level4]
  const Scene = scenes[index] || level1
  return (
    <svg className="art level-art" viewBox="0 0 120 120" role="img" aria-hidden>
      <Scene />
    </svg>
  )
}

// L1 — Post-Op Stabilization: IV bag, drip, arterial waveform
function level1() {
  return (
    <g>
      <circle cx="60" cy="60" r="54" fill="var(--accent)" fillOpacity="0.08" />
      <rect x="38" y="20" width="30" height="40" rx="8" fill="var(--accent)" fillOpacity="0.55" stroke="var(--accent-2)" />
      <path d="M53 24 v32" stroke="#fff" strokeOpacity="0.25" />
      <line x1="53" y1="60" x2="53" y2="86" stroke="var(--accent-2)" strokeWidth="2" strokeDasharray="2 4" className="iv-drip" />
      <circle cx="53" cy="74" r="2" fill="var(--accent-2)" className="iv-drop" />
      <polyline points="34,98 50,98 56,86 62,104 70,90 86,98" fill="none" stroke="var(--danger)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="86" cy="98" r="2.6" fill="var(--danger)" />
    </g>
  )
}

// L2 — Septic shock: thermometer + rising lactate bars
function level2() {
  return (
    <g>
      <circle cx="60" cy="60" r="54" fill="var(--warn)" fillOpacity="0.08" />
      {/* thermometer */}
      <rect x="34" y="24" width="10" height="50" rx="5" fill="#0a1722" stroke="var(--line)" />
      <rect x="36" y="44" width="6" height="30" rx="3" fill="var(--danger)" />
      <circle cx="39" cy="82" r="9" fill="var(--danger)" />
      {/* rising bars (lactate) */}
      <rect x="62" y="78" width="9" height="16" rx="2" fill="var(--accent-2)" fillOpacity="0.7" />
      <rect x="74" y="66" width="9" height="28" rx="2" fill="var(--warn)" fillOpacity="0.85" />
      <rect x="86" y="50" width="9" height="44" rx="2" fill="var(--danger)" />
      <path d="M60 96 h40" stroke="var(--line)" />
      <path d="M64 60 l30 -18" stroke="var(--danger)" strokeWidth="2" strokeDasharray="3 3" />
      <path d="M92 40 l4 0 0 6" stroke="var(--danger)" strokeWidth="2" fill="none" />
    </g>
  )
}

// L3 — Myocardial dysfunction: heart with downward EF arrow
function level3() {
  return (
    <g>
      <circle cx="60" cy="60" r="54" fill="var(--danger)" fillOpacity="0.08" />
      <path d="M60 92 C30 70 30 44 46 40 C54 38 60 44 60 50 C60 44 66 38 74 40 C90 44 90 70 60 92 Z"
            fill="var(--danger)" fillOpacity="0.65" stroke="var(--danger)" />
      <polyline points="38,60 50,60 55,50 60,70 66,56 72,60 84,60" fill="none" stroke="#fff" strokeOpacity="0.8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* down arrow = falling EF */}
      <g transform="translate(86,40)">
        <line x1="0" y1="-8" x2="0" y2="14" stroke="var(--warn)" strokeWidth="3" strokeLinecap="round" />
        <path d="M-5 7 L0 15 L5 7" fill="none" stroke="var(--warn)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </g>
  )
}

// L4 — Refractory shock: methylene blue vial + droplet
function level4() {
  return (
    <g>
      <circle cx="60" cy="60" r="54" fill="#3b6cff" fillOpacity="0.10" />
      {/* vial */}
      <rect x="44" y="26" width="22" height="14" rx="3" fill="#0a1722" stroke="var(--line)" />
      <path d="M47 40 v40 a8 8 0 0 0 8 8 h0 a8 8 0 0 0 8 -8 v-40 Z" fill="#0a1722" stroke="var(--line)" />
      <path d="M47 60 v20 a8 8 0 0 0 8 8 h0 a8 8 0 0 0 8 -8 v-20 Z" fill="#2f6bff" fillOpacity="0.8" />
      <ellipse cx="55" cy="60" rx="8" ry="2.4" fill="#5b8cff" fillOpacity="0.7" />
      {/* big droplet */}
      <path d="M86 50 C86 50 96 64 96 72 a10 10 0 1 1 -20 0 C76 64 86 50 86 50 Z"
            fill="#3b6cff" fillOpacity="0.85" stroke="#5b8cff" />
      <circle cx="82" cy="74" r="3" fill="#fff" fillOpacity="0.5" />
    </g>
  )
}

export function VictoryArt() {
  return (
    <svg className="art victory-art" viewBox="0 0 160 120" role="img" aria-label="Trophy with a steady heartbeat">
      <g className="spark"><circle cx="24" cy="26" r="2.5" fill="var(--accent-2)" /></g>
      <g className="spark s2"><circle cx="138" cy="34" r="2" fill="var(--warn)" /></g>
      <g className="spark s3"><circle cx="40" cy="14" r="1.8" fill="var(--success)" /></g>
      <g className="spark s4"><circle cx="120" cy="16" r="2.4" fill="var(--accent)" /></g>
      {/* trophy */}
      <path d="M58 34 h44 v10 a22 22 0 0 1 -44 0 Z" fill="var(--warn)" fillOpacity="0.9" stroke="#caa14a" />
      <path d="M58 36 h-10 a10 10 0 0 0 10 12" fill="none" stroke="#caa14a" strokeWidth="3" />
      <path d="M102 36 h10 a10 10 0 0 1 -10 12" fill="none" stroke="#caa14a" strokeWidth="3" />
      <rect x="74" y="62" width="12" height="14" fill="var(--warn)" fillOpacity="0.9" />
      <rect x="64" y="76" width="32" height="8" rx="3" fill="#caa14a" />
      {/* heartbeat across the cup */}
      <polyline points="60,40 72,40 76,32 81,50 86,38 92,40 100,40" fill="none" stroke="#052420" strokeOpacity="0.6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Decorative lock glyph for the lock-screen header.
export function LockGlyph({ open = false }) {
  return (
    <svg className={`art lock-glyph ${open ? 'open' : ''}`} viewBox="0 0 48 56" role="img" aria-hidden>
      <path className="shackle" d="M12 26 v-7 a12 12 0 0 1 24 0 v7" fill="none"
            stroke="var(--accent-2)" strokeWidth="4" strokeLinecap="round" />
      <rect x="7" y="24" width="34" height="28" rx="6" fill="var(--accent)" stroke="var(--accent-2)" />
      <circle cx="24" cy="36" r="4" fill="#052420" />
      <rect x="22.2" y="36" width="3.6" height="9" rx="1.8" fill="#052420" />
    </svg>
  )
}
