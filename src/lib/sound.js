// Lightweight Web Audio sound effects — no audio files needed.
// Tones are synthesised on the fly. A user gesture (button click) precedes
// every timer start, so the AudioContext can resume from a suspended state.

let ctx = null
let muted = false
try {
  muted = localStorage.getItem('clinical-breakout:muted') === '1'
} catch {
  /* ignore */
}

export function isMuted() {
  return muted
}

export function setMuted(v) {
  muted = !!v
  try {
    localStorage.setItem('clinical-breakout:muted', muted ? '1' : '0')
  } catch {
    /* ignore */
  }
}

function audio() {
  if (typeof window === 'undefined') return null
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return null
  if (!ctx) ctx = new AC()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function tone(freq, dur, { when = 0, type = 'sine', vol = 0.15 } = {}) {
  const c = audio()
  if (!c) return
  const t0 = c.currentTime + when
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  gain.gain.setValueAtTime(vol, t0)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(gain)
  gain.connect(c.destination)
  osc.start(t0)
  osc.stop(t0 + dur + 0.02)
}

// Two-note rising cue when a phase timer starts.
export function playStart() {
  if (muted) return
  tone(587, 0.12, { type: 'sine', vol: 0.16 })
  tone(880, 0.16, { when: 0.12, type: 'sine', vol: 0.16 })
}

// Soft per-second tick — plays for the whole timer duration.
export function playTick() {
  if (muted) return
  tone(760, 0.06, { type: 'sine', vol: 0.07 })
}

// Sharper, louder beep for the urgent final stretch (last 20 seconds).
export function playFinalTick() {
  if (muted) return
  tone(1320, 0.09, { type: 'square', vol: 0.16 })
}

// Low buzz when the clock hits zero.
export function playTimeUp() {
  if (muted) return
  tone(320, 0.35, { type: 'sawtooth', vol: 0.18 })
  tone(240, 0.45, { when: 0.18, type: 'sawtooth', vol: 0.18 })
}

// Original spy/agent-style suspense sting played when accepting the mission.
// (An homage to the genre — not the copyrighted theme melody.)
export function playMission() {
  if (muted) return
  const G2 = 98, D4 = 294, F4 = 349, Csh4 = 277
  // driving low ostinato — the tense "gallop"
  ;[0, 0.18, 0.5, 0.68].forEach((w) =>
    tone(G2, 0.16, { when: w, type: 'sawtooth', vol: 0.16 }),
  )
  // two-note accent rise
  tone(D4, 0.18, { when: 0.92, type: 'square', vol: 0.13 })
  tone(F4, 0.22, { when: 1.14, type: 'square', vol: 0.14 })
  // unresolved tail
  tone(Csh4, 0.5, { when: 1.42, type: 'sawtooth', vol: 0.12 })
}
